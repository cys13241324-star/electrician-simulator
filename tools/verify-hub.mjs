/**
 * 허브 카드에 추가된 "자세히" 버튼 + 모달 렌더링 검증.
 * 1) /hub 캡처 → 자세히 버튼 4개 보이는지
 * 2) 시뮬레이터 버튼 클릭 → 모달 열림 → 스샷 캡처
 */
import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const OUT = "tools/hub-verification";

import { mkdir } from "node:fs/promises";

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push("console.error: " + msg.text());
  });

  console.log("▶ /hub 로딩");
  await page.goto(BASE + "/hub", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(800);

  const buttons = await page.locator('button[aria-label*="기능 소개 열기"]').count();
  console.log(`  자세히 버튼: ${buttons}개 (기대값 4)`);

  await page.screenshot({ path: `${OUT}/hub-with-buttons.png`, fullPage: false });
  console.log("  ✓ hub-with-buttons.png");

  console.log("▶ 시뮬레이터 자세히 클릭 → 모달");
  await page
    .locator('button[aria-label="인터랙티브 시뮬레이터 기능 소개 열기"]')
    .click();
  await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/modal-simulator-1.png`, fullPage: false });
  console.log("  ✓ modal-simulator-1.png");

  // 다음 스샷으로 이동
  await page.locator('button[aria-label="다음 스크린샷"]').click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/modal-simulator-2.png`, fullPage: false });
  console.log("  ✓ modal-simulator-2.png (2번째 스샷)");

  // ESC 로 닫기
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);
  const stillOpen = await page.locator('[role="dialog"]').count();
  console.log(`  ESC 닫기: ${stillOpen === 0 ? "✓" : "✗ 여전히 " + stillOpen + "개 열림"}`);

  console.log("▶ CBT 자세히 클릭");
  await page.locator('button[aria-label="CBT 모의고사 기능 소개 열기"]').click();
  await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/modal-cbt.png`, fullPage: false });
  console.log("  ✓ modal-cbt.png");

  await browser.close();

  if (errors.length > 0) {
    console.log("\n⚠ 콘솔 에러:");
    errors.forEach((e) => console.log("  - " + e));
    process.exitCode = 1;
  } else {
    console.log("\n✓ 콘솔 에러 0");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
