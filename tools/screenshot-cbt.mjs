import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

await mkdir("tools/cbt-shots", { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 1400 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto("http://localhost:3000/cbt/exams", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.screenshot({ path: "tools/cbt-shots/exams-with-focus.png", fullPage: true });
console.log("✓ exams-with-focus.png");

await page.goto("http://localhost:3000/cbt/focus-freq-high/take", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.screenshot({ path: "tools/cbt-shots/focus-taker.png", fullPage: false });
console.log("✓ focus-taker.png");

await browser.close();
