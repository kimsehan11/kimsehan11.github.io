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

test("intro keeps the portfolio entry link without the KS corner button", async () => {
  const intro = await readFile(join(output, "index.html"), "utf8");
  assert.doesNotMatch(intro, /<a\b[^>]*class="[^"]*\bmark\b/);
  assert.match(intro, /<a\b[^>]*class="enter-link"[^>]*href="\/main\/"/);
  const main = await readFile(join(output, "main/index.html"), "utf8");
  assert.match(main, /class="mark mark-light main-ks"/);
});

test("portfolio labels use the 2024–2026 range", async () => {
  const intro = await readFile(join(output, "index.html"), "utf8");
  const main = await readFile(join(output, "main/index.html"), "utf8");
  assert.match(intro, /SELECTED WORKS — 2024–2026/);
  assert.match(main, /PORTFOLIO \/ 2024–2026/);
});

test("main navigation contains only PROJECT, PROFILE and GITHUB", async () => {
  const main = await readFile(join(output, "main/index.html"), "utf8");
  const menu = main.match(/<nav\b[^>]*class="hex-wheel"[^>]*>([\s\S]*?)<\/nav>/);
  assert.ok(menu, "Expected a semantic navigation landmark");
  const links = [...menu[1].matchAll(/<a\b([^>]+)><span>([^<]+)<\/span><\/a>/g)];
  assert.equal((menu[1].match(/<a\b/g) ?? []).length, 3);
  assert.deepEqual(links.map((link) => link[2]), ["PROJECT", "PROFILE", "GITHUB"]);
  const destinations = ["/project/", "/profile/", "https://github.com/kimsehan11"];
  links.forEach((link, index) => {
    assert.ok(link[1].includes(`href="${destinations[index]}"`));
    assert.ok(link[1].includes(`class="hex-segment hs-${index + 1}"`));
  });
  assert.match(links[2][1], /target="_blank"/);
  assert.match(links[2][1], /rel="noreferrer"/);
  assert.doesNotMatch(main, /<span>(?:CONCEPT|LAB|RESEARCH)<\/span>|href="\/concept\/?"/);
  assert.ok(!exported.has("concept/index.html"), "The removed Concept page should not be published");
  const profile = await readFile(join(output, "profile/index.html"), "utf8");
  assert.match(profile, /숭실대학교 HUMANE Lab/);
});

test("three menu sectors are equally spaced, focusable and respect reduced motion", async () => {
  const css = await readFile(join(root, "app/globals.css"), "utf8");
  const sectors = [...css.matchAll(/\.hs-(\d)\{--angle:(\d+)deg;/g)].map((match) => [Number(match[1]), Number(match[2])]);
  assert.deepEqual(sectors, [[1, 0], [2, 120], [3, 240]]);
  assert.match(css, /\.hex-wheel:hover,\.hex-wheel:focus-within\{animation-play-state:paused\}/);
  assert.match(css, /\.hex-segment:focus-visible span\{outline:2px solid/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)\{\.hex-wheel\{animation:none\}/);
});

test("menu uses a neutral palette with contrasting labels and focus rings", async () => {
  const css = await readFile(join(root, "app/globals.css"), "utf8");
  const colors = [...css.matchAll(/\.hs-\d\{--angle:\d+deg;--color:(#[\da-f]{6});--label:(#[\da-f]{6})\}/g)];
  assert.deepEqual(colors.map((match) => match[1]), ["#26272b", "#a7a9ae", "#e6e7e9"]);
  const luminance = (hex) => {
    const channels = hex.slice(1).match(/../g).map((channel) => {
      const value = parseInt(channel, 16) / 255;
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };
  for (const [, background, label] of colors) {
    const light = Math.max(luminance(background), luminance(label));
    const dark = Math.min(luminance(background), luminance(label));
    assert.ok((light + 0.05) / (dark + 0.05) >= 4.5, "Menu labels must remain readable");
  }
  assert.match(css, /\.hex-segment span\{[^}]*color:var\(--label\)/);
  assert.match(css, /\.hex-segment:focus-visible span\{outline:2px solid currentColor/);
});

test("profile keeps AI and deployment skills without the backend card", async () => {
  const profile = await readFile(join(output, "profile/index.html"), "utf8");
  assert.match(profile, /<h3>AI \/ DATA<\/h3>/);
  assert.match(profile, /<h3>DEV \/ DEPLOY<\/h3>/);
  assert.doesNotMatch(profile, /<h3>BACKEND<\/h3>|Django|FastAPI|MySQL/);
});

test("profile places the portrait below the name and uses unhighlighted two-line introductions", async () => {
  const profile = await readFile(join(output, "profile/index.html"), "utf8");
  assert.match(profile, /<h1>KIM SEHAN<\/h1><img\b[^>]*class="resume-portrait"[^>]*src="\/profile\/kim-sehan\.jpg"[^>]*alt="김세한 프로필 사진"/);
  assert.doesNotMatch(profile, /<mark\b/);
  const lines = [...profile.matchAll(/<span class="resume-intro-line">([^<]+)<\/span>/g)].map((match) => match[1]);
  assert.equal(lines.length, 6);
  assert.ok(lines[0].endsWith("AI 엔지니어입니다."));
  assert.ok(lines[1].startsWith("언어·이미지·검색"));
  for (let index = 0; index < lines.length; index += 2) {
    assert.ok(lines[index + 1].length > lines[index].length, "The second line should be longer than the first");
  }
  assert.ok(exported.has("profile/kim-sehan.jpg"));
});

test("exports all portfolio routes as directly accessible HTML", async () => {
  assert.equal(slugs.length, 3);
  const pages = ["index.html", "main/index.html", "profile/index.html", "project/index.html", "404.html", ...slugs.map((slug) => `project/${slug}/index.html`)];
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
