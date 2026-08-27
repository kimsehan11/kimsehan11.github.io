import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { extname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = join(root, "out");

async function filesWithin(directory, prefix = "") {
  const entries = await readdir(directory, { withFileTypes: true });
  const groups = await Promise.all(entries.map(async (entry) => {
    assert.ok(!entry.isSymbolicLink(), `Unexpected symlink: ${entry.name}`);
    const relative = `${prefix}${entry.name}`;
    return entry.isDirectory()
      ? filesWithin(join(directory, entry.name), `${relative}/`)
      : [relative];
  }));
  return groups.flat();
}

const exported = new Set(await filesWithin(output));
const htmlFiles = [...exported].filter((file) => file.endsWith(".html"));
const projectSource = await readFile(join(root, "app/data/projects.ts"), "utf8");
const slugs = [...projectSource.matchAll(/\bslug:\s*"([^"]+)"/g)].map((match) => match[1]);

test("exports all portfolio routes as directly accessible HTML", async () => {
  assert.equal(slugs.length, 3);
  const pages = ["index.html", "main/index.html", "concept/index.html", "profile/index.html", "project/index.html", "404.html", ...slugs.map((slug) => `project/${slug}/index.html`)];
  for (const page of pages) {
    assert.ok(exported.has(page), `Missing page: ${page}`);
    const html = await readFile(join(output, page), "utf8");
    assert.match(html, /<html[^>]*lang="ko"/);
    assert.match(html, /<title>[^<]+<\/title>/);
    assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
  }
});

test("every local link, image and script resolves inside the static export", async () => {
  let checked = 0;
  for (const page of htmlFiles) {
    const html = await readFile(join(output, page), "utf8");
    const pageUrl = new URL(page.replace(/index\.html$/, ""), "https://kimsehan11.github.io/");
    for (const [, reference] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const url = new URL(reference.replaceAll("&amp;", "&"), pageUrl);
      if (url.origin !== pageUrl.origin) continue;
      const path = decodeURIComponent(url.pathname).replace(/^\//, "");
      const candidates = [path, `${path.replace(/\/$/, "")}/index.html`];
      if (!path) candidates.push("index.html");
      assert.ok(candidates.some((candidate) => exported.has(candidate)), `${page}: broken reference ${reference}`);
      checked++;
    }
  }
  assert.ok(checked > 50, "Expected page navigation and project images to be checked");
});

test("preserves every public asset byte for byte", async () => {
  for (const file of await filesWithin(join(root, "public"))) {
    assert.ok(exported.has(file), `Missing public asset: ${file}`);
    assert.deepEqual(await readFile(join(output, file)), await readFile(join(root, "public", file)), `Asset changed: ${file}`);
  }
});

test("exports only website files, with Jekyll disabled and client assets present", () => {
  assert.ok(exported.has(".nojekyll"));
  assert.ok([...exported].some((file) => file.startsWith("_next/static/") && extname(file) === ".js"));
  assert.ok([...exported].some((file) => file.startsWith("_next/static/") && extname(file) === ".css"));
  for (const file of exported) {
    assert.doesNotMatch(file, /(^|\/)(?:\.git|\.openai|\.env[^/]*|node_modules)(?:\/|$)/);
    assert.doesNotMatch(file, /AI_포트폴리오_면접_대비|package-lock\.json/);
  }
});
