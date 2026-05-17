/**
 * ResultView 의 빈출/난이도 분석 섹션 시각 확인 — localStorage 가짜 응시 기록 주입.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

await mkdir("tools/cbt-shots", { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 1800 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();

// 일단 도메인 등록을 위해 한 번 방문
await page.goto("http://localhost:3000/cbt", { waitUntil: "networkidle" });

// 가짜 attempt 주입 — 60문항 중 일부 정답
const fakeAttempt = {
  examId: "exam-1",
  examineeName: "테스터",
  startedAt: Date.now() - 50 * 60 * 1000,
  endsAt: Date.now() - 10 * 60 * 1000,
  // 답안: 1번~30번까지 정답으로 가정, 나머지는 1번 찍기
  answers: Array.from({ length: 60 }, (_, i) => (i < 38 ? null : 1)),
  checked: Array(60).fill(false),
  submittedAt: Date.now() - 5 * 60 * 1000,
};

// 실제 정답을 알기 위해 exam 정보 가져와서 일부 정답 채우기
await page.evaluate((attempt) => {
  // 답안 1번 찍어버리기 후 임의로 60% 정답률 만들기
  const ans = [];
  for (let i = 0; i < 60; i++) {
    if (i < 40) ans.push(((i % 4) + 1));
    else ans.push(null);
  }
  attempt.answers = ans;
  localStorage.setItem("cbt-attempt-exam-1", JSON.stringify(attempt));
}, fakeAttempt);

await page.goto("http://localhost:3000/cbt/exam-1/result", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.screenshot({ path: "tools/cbt-shots/result-with-analysis.png", fullPage: true });
console.log("✓ result-with-analysis.png");

await browser.close();
