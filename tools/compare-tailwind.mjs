/**
 * Tailwind CDN vs 정적 CSS 시각 비교.
 * before: 원본 (CDN) / after: 변경된 (정적 CSS) 같은 페이지 캡처해 비교.
 */
import { chromium } from "playwright";
import { readFile, writeFile, copyFile } from "node:fs/promises";

const HTML = "public/samples/simulator-ohms-law.html";
const BACKUP = "/tmp/ohms-original.html";
const URL = "http://localhost:3000/samples/simulator-ohms-law.html";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });

// 1. Before (CDN)
let page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(1500);
await page.screenshot({ path: "tools/tailwind-before.png", fullPage: false });
console.log("✓ before (CDN)");
await page.close();

// 2. Replace + after (local CSS)
const original = await readFile(HTML, "utf-8");
const replaced = original.replace(
  '<script src="https://cdn.tailwindcss.com"></script>',
  '<link rel="stylesheet" href="/samples/_tailwind.css">'
);
if (original === replaced) {
  console.log("✗ CDN script not found");
  process.exit(1);
}
await writeFile(HTML, replaced);
console.log("  → replaced CDN with local CSS");

page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(1500);
await page.screenshot({ path: "tools/tailwind-after.png", fullPage: false });
console.log("✓ after (local CSS)");
await page.close();

// 3. Restore original for now
await copyFile(BACKUP, HTML);
console.log("  → restored original");

await browser.close();
