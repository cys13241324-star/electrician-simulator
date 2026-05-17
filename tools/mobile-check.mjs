/**
 * 모바일 뷰포트(390x844, iPhone 14)에서 주요 라우트 스샷 + a11y.
 * 깨진 레이아웃·가로 스크롤·뭉개진 버튼 찾기.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = "http://localhost:3000";
const OUT = "tools/mobile-check";

const routes = [
  "/hub", "/simulator", "/simulator/ohms-law",
  "/flashcards", "/cbt", "/news",
];

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
});

for (const route of routes) {
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push("console: " + m.text().slice(0, 100));
  });
  try {
    await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(500);
    const name = route.replace(/\//g, "_") || "_root";
    await page.screenshot({ path: `${OUT}/m${name}.png`, fullPage: false });
    // 가로 스크롤 체크 — body 너비 > 뷰포트 너비
    const overflow = await page.evaluate(() => {
      const docW = document.documentElement.scrollWidth;
      const winW = window.innerWidth;
      return { docW, winW, overflowed: docW > winW };
    });
    const mark = overflow.overflowed ? "⚠ overflow" : "✓";
    console.log(`${mark} ${route.padEnd(28)} ${overflow.docW}/${overflow.winW}px ${errors.length ? `  err: ${errors[0].slice(0,80)}` : ""}`);
  } catch (e) {
    console.log(`✗ ${route} ${e.message}`);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log(`\n→ 스샷: ${OUT}/`);
