/**
 * public/screenshots/feature-popup/*.png → *.webp 변환
 * 사이즈·압축 결과 보고.
 */
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

const DIR = "public/screenshots/feature-popup";

const files = (await readdir(DIR)).filter((f) => f.endsWith(".png"));
let beforeTotal = 0;
let afterTotal = 0;

for (const f of files) {
  const src = join(DIR, f);
  const dst = join(DIR, f.replace(/\.png$/, ".webp"));
  const before = (await stat(src)).size;
  await sharp(src).webp({ quality: 82, effort: 6 }).toFile(dst);
  const after = (await stat(dst)).size;
  beforeTotal += before;
  afterTotal += after;
  const pct = ((1 - after / before) * 100).toFixed(0);
  console.log(`${f} → .webp  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB  (-${pct}%)`);
}

console.log(`\n총: ${(beforeTotal / 1024).toFixed(0)}KB → ${(afterTotal / 1024).toFixed(0)}KB  (-${((1 - afterTotal / beforeTotal) * 100).toFixed(0)}%)`);
