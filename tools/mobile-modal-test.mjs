/**
 * 모바일 뷰포트에서 FeatureModal 동작 + 가로 스크롤 + 닫기 동작 검증.
 */
import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push("console: " + m.text().slice(0, 100));
});

await page.goto("http://localhost:3000/hub", { waitUntil: "networkidle" });
await page.waitForTimeout(500);

console.log("▶ 자세히 버튼 클릭");
await page.locator('button[aria-label="인터랙티브 시뮬레이터 기능 소개 열기"]').click();
await page.waitForSelector('[role="dialog"]');
await page.waitForTimeout(500);

// 모달이 뷰포트 안에 잘 들어가는지
const modalBox = await page.locator('[role="dialog"]').boundingBox();
console.log(`  모달 박스: ${modalBox.width}x${modalBox.height} @ (${modalBox.x}, ${modalBox.y})`);
console.log(`  뷰포트 안 적합: ${modalBox.width <= 390 ? "✓" : "✗ 너비 초과"}`);

await page.screenshot({ path: "tools/mobile-check/m_modal_open.png", fullPage: false });

// 배경 클릭으로 닫기
await page.locator('[aria-hidden="false"]').first().click({ position: { x: 10, y: 10 } });
await page.waitForTimeout(500);
const stillOpen = await page.locator('[role="dialog"]').count();
console.log(`  배경 클릭 닫기: ${stillOpen === 0 ? "✓" : "✗"}`);

await browser.close();
if (errors.length) {
  console.log("\n⚠ 에러:");
  errors.forEach((e) => console.log("  " + e));
} else {
  console.log("\n✓ 에러 0");
}
