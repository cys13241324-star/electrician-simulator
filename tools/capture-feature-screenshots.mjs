/**
 * 기능 소개 팝업용 스크린샷 캡처.
 * 사용: dev 서버(:3000) 떠있는 상태에서 `node tools/capture-feature-screenshots.mjs`
 * 결과: public/screenshots/feature-popup/*.png
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const BASE = "http://localhost:3000";
const OUT_DIR = "public/screenshots/feature-popup";

const shots = [
  // 시뮬레이터
  { name: "simulator-list", url: "/simulator", viewport: { width: 1280, height: 800 } },
  { name: "simulator-detail", url: "/simulator/ohms-law", viewport: { width: 1280, height: 900 } },
  // 플립카드
  { name: "flashcards-deck", url: "/flashcards", viewport: { width: 1280, height: 800 } },
  // CBT
  { name: "cbt-landing", url: "/cbt", viewport: { width: 1280, height: 800 } },
  { name: "cbt-exams", url: "/cbt/exams", viewport: { width: 1280, height: 800 } },
  // 별의 소식지
  { name: "news-list", url: "/news", viewport: { width: 1280, height: 800 } },
];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  console.log(`▶ ${shots.length}장 캡처 시작 → ${OUT_DIR}/`);

  for (const shot of shots) {
    const ctx = await browser.newContext({
      viewport: shot.viewport,
      deviceScaleFactor: 2, // 레티나 품질
      locale: "ko-KR",
    });
    const page = await ctx.newPage();
    try {
      await page.goto(BASE + shot.url, { waitUntil: "networkidle", timeout: 30000 });
      // 이미지·폰트 렌더 안정화
      await page.waitForTimeout(800);
      const outPath = join(OUT_DIR, `${shot.name}.png`);
      await page.screenshot({ path: outPath, fullPage: false });
      console.log(`  ✓ ${shot.name}.png`);
    } catch (err) {
      console.log(`  ✗ ${shot.name}: ${err.message}`);
    } finally {
      await ctx.close();
    }
  }
  await browser.close();
  console.log("완료.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
