/**
 * 접근성 위반 상세(target selector + html) 노드별 추출.
 */
import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const routes = ["/flashcards", "/simulator/ohms-law"];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

for (const route of routes) {
  await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(500);
  await page.addScriptTag({
    url: "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.0/axe.min.js",
  });
  const res = await page.evaluate(async () => {
    // @ts-expect-error
    return await window.axe.run(document, {
      resultTypes: ["violations"],
      runOnly: ["wcag2a", "wcag2aa"],
    });
  });
  console.log(`\n=== ${route} ===`);
  for (const v of res.violations) {
    if (v.id !== "aria-progressbar-name" && v.id !== "scrollable-region-focusable")
      continue;
    console.log(`\n[${v.id}] ${v.impact}: ${v.description}`);
    v.nodes.forEach((n, i) => {
      console.log(`  Node ${i + 1}:`);
      console.log(`    target: ${n.target.join(" > ")}`);
      console.log(`    html: ${n.html.slice(0, 200)}`);
      console.log(`    failureSummary: ${n.failureSummary}`);
    });
  }
}

await browser.close();
