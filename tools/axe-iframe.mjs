/**
 * 시뮬 iframe 내부 axe 검사 — content document를 직접 evaluate.
 */
import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const routes = [
  "/simulator/rlc-resonance",
  "/simulator/arc-furnace",
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });

for (const route of routes) {
  const page = await ctx.newPage();
  await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(1500); // iframe load

  // 페이지 전체 axe (iframe은 cross-origin 아니라 traverse 가능)
  await page.addScriptTag({
    url: "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.0/axe.min.js",
  });
  const res = await page.evaluate(async () => {
    // @ts-expect-error
    return await window.axe.run(document, {
      resultTypes: ["violations"],
      runOnly: ["color-contrast"],
    });
  });

  console.log(`\n=== ${route} ===`);
  for (const v of res.violations) {
    for (const n of v.nodes) {
      console.log(`  ${n.html.slice(0, 200)}`);
      console.log(`    target: ${n.target.join(" > ")}`);
      console.log(`    ${n.failureSummary.split("\n")[1] || ""}`);
    }
  }

  // iframe 내부 직접 axe (각 frame 별도)
  for (const frame of page.frames()) {
    if (frame === page.mainFrame()) continue;
    try {
      await frame.addScriptTag({
        url: "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.0/axe.min.js",
      });
      const fres = await frame.evaluate(async () => {
        // @ts-expect-error
        return await window.axe.run(document, {
          resultTypes: ["violations"],
          runOnly: ["color-contrast"],
        });
      });
      console.log(`  iframe: ${frame.url().split('/').pop()}`);
      for (const v of fres.violations) {
        for (const n of v.nodes) {
          console.log(`    ${n.html.slice(0, 200)}`);
          console.log(`      ${n.failureSummary.split("\n")[1] || ""}`);
        }
      }
    } catch (e) {
      console.log(`  iframe error: ${e.message}`);
    }
  }

  await page.close();
}

await browser.close();
