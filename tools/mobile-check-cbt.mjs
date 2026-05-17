import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

await mkdir("tools/mobile-check", { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
});

// CBT exams 페이지 (focus 카드 신설)
const p1 = await ctx.newPage();
await p1.goto("http://localhost:3000/cbt/exams", { waitUntil: "networkidle" });
await p1.waitForTimeout(800);
const ov1 = await p1.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
await p1.screenshot({ path: "tools/mobile-check/m_cbt_exams.png", fullPage: false });
console.log(`/cbt/exams overflow=${ov1}`);

// 플립카드 list 모드 (UX fix 검증)
const p2 = await ctx.newPage();
await p2.goto("http://localhost:3000/flashcards", { waitUntil: "networkidle" });
await p2.waitForTimeout(500);
// 카드 목록 탭 클릭
const tabButton = await p2.locator('button:has-text("카드 목록")').first();
await tabButton.click();
await p2.waitForTimeout(500);
await p2.screenshot({ path: "tools/mobile-check/m_flashcards_list.png", fullPage: false });
console.log(`/flashcards card list captured`);

await browser.close();
