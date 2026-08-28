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

test("three menu sectors keep rotating on hover and focus while respecting reduced motion", async () => {
  const css = await readFile(join(root, "app/globals.css"), "utf8");
  const sectors = [...css.matchAll(/\.hs-(\d)\{--angle:(\d+)deg;/g)].map((match) => [Number(match[1]), Number(match[2])]);
  assert.deepEqual(sectors, [[1, 0], [2, 120], [3, 240]]);
  assert.match(css, /\.hex-wheel\{[^}]*animation:hex-turn 125s linear infinite/);
  assert.doesNotMatch(css, /animation-play-state:\s*paused/);
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

test("hairstyle results keep conversation and showcase images in independent columns", async () => {
  const html = await readFile(join(output, "project/hairstyle-is-all-you-need/index.html"), "utf8");
  const results = html.match(/<section class="project-section project-section--results">([\s\S]*?)<\/section>/)?.[1];
  assert.ok(results, "Expected the Hairstyle results section");
  const groups = [...results.matchAll(/data-image-group="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(groups, ["conversation", "showcase"]);
  const conversation = results.split('data-image-group="conversation"')[1].split('data-image-group="showcase"')[0];
  const showcase = results.split('data-image-group="showcase"')[1];
  const sources = (markup) => [...markup.matchAll(/<img\b[^>]*src="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(sources(conversation), [
    "/projects/hairstyle/chat-user-photo-cropped-v2.png",
    "/projects/hairstyle/chat-request-upscaled.png",
    "/projects/hairstyle/personalized-recommendation.png",
  ]);
  assert.deepEqual(sources(showcase), [
    "/projects/hairstyle/style-gallery.png",
    "/projects/hairstyle/virtual-try-on-female.png",
    "/projects/hairstyle/virtual-try-on-male.png",
  ]);
  assert.match(conversation, /헤어스타일 생성 요청 예시/);
  assert.match(conversation, /추천 결과 및 대화 내용/);
  assert.match(showcase, /<figcaption>갤러리<\/figcaption>/);
  assert.match(showcase, /<figcaption>3D 뷰 예시<\/figcaption>/);
  for (const slug of slugs.filter((slug) => slug !== "hairstyle-is-all-you-need")) {
    const other = await readFile(join(output, `project/${slug}/index.html`), "utf8");
    assert.doesNotMatch(other, /data-image-group=/);
  }
});

test("results columns shrink to fit and do not share fixed image rows or heights", async () => {
  const css = await readFile(join(root, "app/globals.css"), "utf8");
  assert.match(css, /\.project-image-column\{display:flex;flex-direction:column;gap:20px;min-width:0\}/);
  assert.match(css, /\.project-section--results \.project-section-images\{[^}]*grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(css, /\.project-section--results \.project-section-grid>\*\{min-width:0\}/);
  assert.match(css, /\.project-section--results \.project-section-images figure img\{width:100%;max-width:100%;height:auto;max-height:none;object-fit:contain\}/);
  assert.doesNotMatch(css, /minmax\((?:250|280|340)px|\.result-[\w-]+\{[^}]*grid-row:/);
  assert.match(css, /@media\(max-width:1200px\)\{\s*\.project-section--results \.project-section-grid\{grid-template-columns:minmax\(0,1fr\)/);
  assert.match(css, /\.project-section-images,\.project-section--results \.project-section-images\{grid-template-columns:1fr\}/);
});

test("hairstyle demo uses the paper-style button in the left overview", async () => {
  const html = await readFile(join(output, "project/hairstyle-is-all-you-need/index.html"), "utf8");
  const overview = html.match(/<section class="sheet-content">([\s\S]*?)<\/section>/)?.[1];
  assert.ok(overview);
  const left = overview.split('<p class="sheet-label">MY WORK</p>')[0];
  assert.match(left, /<a class="sheet-paper sheet-demo" href="https:\/\/youtu\.be\/_GqkF_I5t7A" target="_blank" rel="noreferrer" aria-label="YouTube에서 시연 영상 보기">DEMO VIDEO/);
  const knowledge = await readFile(join(output, "project/knowledge-conflicts/index.html"), "utf8");
  assert.match(knowledge, /class="sheet-paper" href="https:\/\/arxiv\.org\/abs\/2410\.07176"[^>]*>ASTUTE RAG PAPER/);
  assert.doesNotMatch(knowledge, /sheet-demo/);
});

test("hairstyle covers README design details while keeping the code flow and excluding ERD", async () => {
  const html = await readFile(join(output, "project/hairstyle-is-all-you-need/index.html"), "utf8");
  for (const text of [
    "뷰티 산업의 변화", "프로젝트의 필요성", "최신 트렌드 정보",
    "상세 데이터 구축", "QA 캐시 시스템", "기장 인지 알고리즘", "가중치 기반 추천", "응답 히스토리",
    "화이트밸런스", "퍼스널 컬러", "평가 데이터셋 구축", "GPT-4o", "Answer Relevancy",
    "dragonkue/snowflake-arctic-embed-l-v2.0-ko", "Dongjin-kr/ko-reranker",
    "gpt-5.2-chat-latest", "IdentiFace", "SkinToneClassifier", "SAFMN", "gpt-image-1", "Face Lift",
  ]) {
    assert.ok(html.includes(text), "Missing README detail: " + text);
  }
  assert.match(html, /<h2>1-5\. 실제 코드 플로우<\/h2>/);
  assert.match(html, /class="project-code-flow"/);
  assert.match(html, /<h2>1-6\. 평가 및 최적화<\/h2>/);
  assert.deepEqual([...html.matchAll(/<h2>([^<]+)<\/h2>/g)].map((match) => match[1]), [
    "1-1. 프로젝트 개요", "1-2. 시스템 아키텍처", "1-3. 핵심 설계",
    "1-4. 모델 선정", "1-5. 실제 코드 플로우", "1-6. 평가 및 최적화", "1-7. 결과",
  ]);
  assert.equal((html.match(/class="project-section project-section--results"/g) ?? []).length, 1);
  assert.doesNotMatch(html, /서비스 시연|시연 영상 — YouTube에서 보기/);
  assert.doesNotMatch(html, /<img\b[^>]*src="[^"]*(?:erd|evaluation)[^"]*"|<h[23]>[^<]*ERD/);
});

test("README tables preserve all reported models, settings and evaluation scores as text", async () => {
  const html = await readFile(join(output, "project/hairstyle-is-all-you-need/index.html"), "utf8");
  const tables = new Map([...html.matchAll(/<table class="project-table"><caption>([^<]+)<\/caption>([\s\S]*?)<\/table>/g)]
    .map(([, title, markup]) => [title, markup]));
  const expected = [
    ["기술 스택", 7], ["RAG 모델 및 검색 설정", 5], ["에이전트·얼굴 분석·이미지 합성 모델", 7],
    ["Recommendation Evaluation", 9], ["Image Generation Evaluation", 5],
  ];
  assert.deepEqual([...tables.keys()], expected.map(([title]) => title));
  for (const [title, count] of expected) {
    const table = tables.get(title);
    assert.match(table, /<th scope="col">/);
    const rows = table.match(/<tbody>([\s\S]*?)<\/tbody>/)?.[1];
    assert.equal((rows.match(/<tr>/g) ?? []).length, count);
    assert.equal((rows.match(/<th scope="row">/g) ?? []).length, count);
  }
  const rag = tables.get("RAG 모델 및 검색 설정");
  for (const [key, value] of [["Chunk size", "200"], ["Overlap", "100"], ["Top K", "2"]]) {
    assert.ok(rag.includes('<th scope="row">' + key + '</th><td>' + value + '</td>'));
  }
  const recommendation = tables.get("Recommendation Evaluation");
  for (const [metric, score] of [["Context Recall", "0.75"], ["Context Precision", "0.94"], ["MRR", "0.97"], ["NDCG", "0.94"], ["Faithfulness", "0.91"]]) {
    assert.ok(recommendation.includes("<td>" + metric + "</td><td>" + score + "</td>"));
  }
  assert.match(recommendation, /<td>20초<\/td>/);
  const generation = tables.get("Image Generation Evaluation");
  assert.match(generation, /<td>CLIP-IQA<\/td><td>0\.82<\/td>/);
  assert.match(generation, /<td>ArcFace<\/td><td>0\.80<\/td>/);
  assert.match(generation, /<td>60초<\/td>/);
});

test("README background assets remain without duplicate result and demo images", async () => {
  const html = await readFile(join(output, "project/hairstyle-is-all-you-need/index.html"), "utf8");
  for (const name of ["Mckinsey.png", "popularity.png"]) {
    assert.ok(html.includes('src="/projects/hairstyle/readme/' + name + '"'));
  }
  assert.doesNotMatch(html, /<img[^>]*src="\/projects\/hairstyle\/readme\/(?:sample|demo_thumbnail)\.png"/);
  assert.equal((html.match(/<a[^>]*href="https:\/\/youtu\.be\/_GqkF_I5t7A"/g) ?? []).length, 1);
  const css = await readFile(join(root, "app/globals.css"), "utf8");
  assert.match(css, /\.project-table\{width:100%;table-layout:fixed/);
  assert.match(css, /\.project-table-wrap\{max-width:100%;overflow-x:auto\}/);
  assert.match(css, /\.project-section--reference \.project-section-images \.overview-wide img\{height:auto;max-height:none\}/);
});

test("knowledge follows the presentation order and preserves the paper and presentation links", async () => {
  const html = await readFile(join(output, "project/knowledge-conflicts/index.html"), "utf8");
  assert.deepEqual([...html.matchAll(/<h2>([^<]+)<\/h2>/g)].map((match) => match[1]), [
    "2-1. 연구 목표", "2-2. Astute RAG 소개", "2-3. 구축 방식 — 의사코드",
    "2-4. 구축 방식 — Retrieval Augment", "2-5. 구축 방식 — Internal Passages",
    "2-6. 구축 방식 — Combine Passages", "2-7. 구축 방식 — Consolidation",
    "2-8. 구축 방식 — Finalize Answer", "2-9. Experiment — 데이터셋과 비교 조건",
    "2-10. Experiment 1 — Accuracy 측정", "2-11. Experiment 1 — 논문과 재현 결과",
    "2-12. Experiment 1 — 결과 차이 해석", "2-13. Experiment 2 — 검색 품질별 강건성",
    "2-14. Project Conclusion",
  ]);
  assert.match(html, /class="sheet-paper" href="https:\/\/arxiv\.org\/abs\/2410\.07176"/);
  assert.match(html, /class="sheet-presentation" href="https:\/\/docs\.google\.com\/presentation\/d\/1EEn4TS_AIj_fciUa4-jtFux3lafq9xPP_jzAAeani5E\/edit\?usp=sharing"/);
  assert.ok(html.indexOf('class="sheet-presentation"') < html.indexOf('class="sheet-github"'));
  for (const detail of ["I don’t know", "source: external", "source: internal", "Jason Lee", "Zachary Levi", "LLM-as-a-judge", "gold_answer", "&lt;ANSWER&gt;", "80~90%", "코퍼스"]) {
    assert.ok(html.includes(detail), "Missing presentation detail: " + detail);
  }
  assert.doesNotMatch(html, /README|sheet-demo/);
  assert.doesNotMatch(html, /발표|PROJECT PRESENTATION/);
  assert.match(html, /<span>PROJECT DETAILS<\/span>/);
  const captions = [...html.matchAll(/<(?:figcaption|caption)>([^<]+)<\/(?:figcaption|caption)>/g)].map((match) => match[1]);
  assert.ok(captions.includes("KNOWLEDGE CONSOLIDATION"));
  assert.ok(captions.includes("평가 데이터셋"));
  assert.ok(captions.every((caption) => !caption.includes("발표자료 p.")));
});

test("knowledge separates paper and reproduction results with all per-dataset values", async () => {
  const html = await readFile(join(output, "project/knowledge-conflicts/index.html"), "utf8");
  const tables = new Map([...html.matchAll(/<table class="project-table"><caption>([^<]+)<\/caption>([\s\S]*?)<\/table>/g)]
    .map(([, title, markup]) => [title, [...markup.matchAll(/<tbody>([\s\S]*?)<\/tbody>/g)][0][1]]));
  assert.equal(tables.size, 7);
  const expected = [
    ["논문 — Claude 3.5 Sonnet (20240620)", [["47.1","82.0","50.4","29.8","54.5"],["44.4","76.7","58.0","36.0","55.5"],["52.2","84.1","60.1","44.4","61.7"]]],
    ["논문 — Mistral-Large (2407), 128B", [["46.8","79.5","43.7","24.7","51.1"],["43.1","77.4","55.9","36.0","54.7"],["50.2","82.7","58.4","42.1","59.9"]]],
    ["논문 — Mistral-Nemo (2407), 12B", [["29.8","67.8","34.3","23.0","40.2"],["39.3","66.8","49.0","32.6","48.3"],["42.7","73.9","49.3","32.6","51.3"]]],
    ["재현 — Mistral-Nemo (2407), 12B", [["31.2","72.8","47.9","28.5","45.1"],["41.9","85.8","56.7","54.6","59.8"],["49.6","91.6","61.7","62.7","66.4"]]],
    ["논문 — Gemini 1.5 Pro (002)", [["44.8","80.2","45.8","25.3","51.3"],["42.7","76.0","55.2","33.7","53.7"],["50.2","81.6","58.0","40.5","59.2"]]],
    ["재현 — Gemini-2.5 Flash", [["37.3","88.9","57.9","40.8","56.2"],["40.4","86.6","60.5","56.5","61.0"],["50.8","95.0","69.3","65.8","70.2"]]],
  ];
  for (const [title, values] of expected) {
    const body = tables.get(title);
    assert.ok(body, "Missing table: " + title);
    const rows = [...body.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(([, row]) => [...row.matchAll(/<td>([^<]+)<\/td>/g)].map((match) => match[1]));
    assert.deepEqual(rows, values, title);
    assert.deepEqual([...body.matchAll(/<th scope="row">([^<]+)<\/th>/g)].map((match) => match[1]), ["No RAG", "Baseline RAG", "Astute RAG"]);
  }
  assert.match(html, /동일 모델의 절대 수치를 재현한 비교가 아니라/);
  assert.match(html, /6\.6%p/);
  assert.match(html, /9\.2%p/);
});

test("knowledge retains complete source diagrams and prompts without cropping them", async () => {
  const html = await readFile(join(output, "project/knowledge-conflicts/index.html"), "utf8");
  const expected = [
    "knowledge-conflict.jpg", "astute-overview.jpg", "pseudo-code.jpg", "internal-prompt.jpg",
    "internal-generation.jpg", "combine-call.jpg", "combine-function.jpg", "consolidation.jpg",
    "finalize-answer.jpg", "accuracy-example.jpg", "corpus-updates.jpg", "precision-example.jpg",
    "precision-groups.png", "robustness-paper.jpg", "robustness-reproduction.jpg",
  ];
  for (const name of expected) {
    assert.ok(html.includes('src="/projects/knowledge-conflicts/slides/' + name + '"'), name);
  }
  const css = await readFile(join(root, "app/globals.css"), "utf8");
  assert.match(css, /\.modal-02 \.project-section-images \.overview-wide>div,\.modal-02 \.project-section-images \.overview-wide img\{height:auto;max-height:none\}/);
  assert.match(css, /\.modal-02 \.project-section--reference \.project-table\{min-width:560px\}/);
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
