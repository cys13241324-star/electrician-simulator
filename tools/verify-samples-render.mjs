/**
 * 정적 Tailwind 적용 후 시뮬레이터 4종 시각 확인.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

await mkdir("tools/samples-render", { recursive: true });

const samples = [
  "simulator-ohms-law",
  "simulator-rlc-resonance",
  "simulator-arc-furnace",
  "simulator-electric-field",
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });

for (const s of samples) {
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push("console: " + m.text().slice(0, 100));
  });
  page.on("response", (r) => {
    if (r.status() >= 400) errors.push(`HTTP ${r.status()} ${r.url()}`);
  });
  await page.goto(`http://localhost:3000/samples/${s}.html`, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `tools/samples-render/${s}.png`, fullPage: false });
  console.log(`${errors.length ? "✗" : "✓"} ${s}  errors: ${errors.length}`);
  errors.slice(0, 3).forEach(e => console.log("  " + e.slice(0, 120)));
  await page.close();
}

await browser.close();
