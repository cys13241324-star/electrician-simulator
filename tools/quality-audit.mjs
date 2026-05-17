/**
 * 전 라우트 런타임 무결성 점검:
 * - HTTP 200 + 본문 사이즈
 * - 콘솔 에러/경고
 * - JS 페이지에러
 * - 깨진 이미지/네트워크 응답 (4xx/5xx)
 * - 접근성 위반(axe-core)
 * 결과: tools/audit-report.json + 표준출력 요약
 */
import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";

const BASE = "http://localhost:3000";

const routes = [
  "/", "/hub", "/simulator", "/simulator/ohms-law",
  "/simulator/rlc-resonance", "/simulator/arc-furnace",
  "/flashcards", "/cbt", "/cbt/exams", "/cbt/study", "/cbt/wrong-notes",
  "/news",
];

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    locale: "ko-KR",
  });

  const report = { generated: new Date().toISOString(), routes: [] };

  for (const route of routes) {
    const page = await ctx.newPage();
    const consoleMsgs = [];
    const pageErrors = [];
    const networkFails = [];

    page.on("console", (msg) => {
      if (msg.type() === "error" || msg.type() === "warning") {
        consoleMsgs.push({ type: msg.type(), text: msg.text().slice(0, 300) });
      }
    });
    page.on("pageerror", (err) => {
      pageErrors.push({ message: err.message.slice(0, 300), stack: (err.stack || "").split("\n")[1] });
    });
    page.on("response", (resp) => {
      const status = resp.status();
      if (status >= 400) {
        networkFails.push({ url: resp.url(), status });
      }
    });

    let status = 0;
    try {
      const resp = await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 30000 });
      status = resp ? resp.status() : 0;
      await page.waitForTimeout(800);
    } catch (e) {
      pageErrors.push({ message: "navigation: " + e.message });
    }

    // 접근성 자동 검사 — axe-core 인라인 주입
    let axeViolations = [];
    try {
      await page.addScriptTag({
        url: "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.0/axe.min.js",
      });
      const res = await page.evaluate(async () => {
        // @ts-expect-error - axe is injected
        return await window.axe.run(document, {
          resultTypes: ["violations"],
          runOnly: ["wcag2a", "wcag2aa"],
        });
      });
      axeViolations = (res.violations || []).map((v) => ({
        id: v.id,
        impact: v.impact,
        help: v.help,
        nodes: v.nodes.length,
      }));
    } catch (e) {
      axeViolations = [{ id: "axe-load-failed", help: e.message }];
    }

    report.routes.push({
      route,
      status,
      consoleMsgs,
      pageErrors,
      networkFails,
      axeViolations,
    });

    const errSummary = `${consoleMsgs.length}c/${pageErrors.length}p/${networkFails.length}n/${axeViolations.length}a`;
    console.log(`${status === 200 ? "✓" : "✗"} ${status} ${route.padEnd(28)} ${errSummary}`);
    await page.close();
  }

  await browser.close();
  await writeFile("tools/audit-report.json", JSON.stringify(report, null, 2));
  console.log("\n→ tools/audit-report.json 저장");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
