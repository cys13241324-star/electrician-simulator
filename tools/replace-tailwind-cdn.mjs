/**
 * public/samples/*.html 전 파일의 cdn.tailwindcss.com 스크립트 태그를
 * 로컬 빌드된 정적 CSS link로 교체.
 *
 * before: <script src="https://cdn.tailwindcss.com"></script>
 * after:  <link rel="stylesheet" href="/samples/_tailwind.css">
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const DIR = "public/samples";
const CDN_TAG = '<script src="https://cdn.tailwindcss.com"></script>';
const LOCAL_TAG = '<link rel="stylesheet" href="/samples/_tailwind.css">';

const files = (await readdir(DIR)).filter((f) => f.endsWith(".html"));
let touched = 0;
let untouched = 0;

for (const f of files) {
  const path = join(DIR, f);
  const orig = await readFile(path, "utf-8");
  if (!orig.includes(CDN_TAG)) {
    untouched++;
    continue;
  }
  const replaced = orig.replaceAll(CDN_TAG, LOCAL_TAG);
  await writeFile(path, replaced);
  touched++;
}

console.log(`Touched: ${touched}, Untouched (no CDN tag): ${untouched}`);
