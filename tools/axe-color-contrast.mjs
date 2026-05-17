/**
 * color-contrast 위반 노드 전수 — 어떤 클래스/색이 문제인지 패턴 파악.
 */
import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const routes = [
  "/simulator/ohms-law", "/flashcards", "/cbt", "/cbt/exams",
  "/cbt/study", "/cbt/wrong-notes", "/news",
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

const patternCount = new Map();
let totalCount = 0;
const rawSamples = [];

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
      runOnly: ["color-contrast"],
    });
  });
  for (const v of res.violations) {
    for (const n of v.nodes) {
      totalCount++;
      if (rawSamples.length < 3) {
        rawSamples.push({ route, summary: n.failureSummary, html: n.html.slice(0, 200) });
      }
      // 클래스 패턴 추출 — text-* + bg-*
      const cls = (n.html.match(/class="([^"]*)"/) || [, ""])[1];
      const textColor = (cls.match(/text-(zinc|gray|slate|stone|neutral|indigo|blue|emerald|red|orange|yellow|pink|violet|fuchsia|rose|cyan|teal|sky|amber|lime)-\d+/) || [, ""])[0] || "white";
      const bgColor = (cls.match(/bg-(zinc|gray|slate|stone|neutral|indigo|blue|emerald|red|orange|yellow|pink|violet|fuchsia|rose|cyan|teal|sky|amber|lime|white)-?\d*/) || [, ""])[0] || "inherit";
      const key = `${textColor} on ${bgColor}`;
      const entry = patternCount.get(key) || { count: 0, samples: [], routes: new Set() };
      entry.count++;
      entry.routes.add(route);
      if (entry.samples.length < 4) entry.samples.push(`${route} :: ${n.html.slice(0, 120)}`);
      patternCount.set(key, entry);
    }
  }
}

await browser.close();

console.log(`Total violations: ${totalCount}\n`);
console.log("=== Raw samples ===");
for (const s of rawSamples) {
  console.log(`\n[${s.route}]`);
  console.log("HTML: " + s.html);
  console.log("Summary: " + s.summary);
}
console.log("\n=== Patterns ===");
const sorted = [...patternCount.entries()].sort((a, b) => b[1].count - a[1].count);
for (const [key, e] of sorted) {
  console.log(`[${e.count}x] ${key}  routes: ${[...e.routes].slice(0,3).join(', ')}${e.routes.size>3?' +'+(e.routes.size-3):''}`);
  for (const s of e.samples) {
    console.log(`  ${s}`);
  }
}
