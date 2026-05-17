import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "CBT 모의고사",
  description:
    "전기기능사 CBT 모의고사 5회차. 실제 시험 환경 그대로, 60문항 60분, 자동 채점과 과목별 분석.",
};

import Footer from "@/components/Footer";
import SubTabs from "@/components/cbt/SubTabs";
import TextbookFloatingPopup from "@/components/TextbookFloatingPopup";
import { buildFocusId, countByFocus, mockExamSummaries } from "@/lib/cbt/mockData";
import type { Difficulty, ExamStatus, Frequency } from "@/lib/cbt/types";
import { TARGET_YEAR_RANGE } from "@/lib/cbt/curriculum";

const statusStyles: Record<ExamStatus, string> = {
  응시대기: "bg-zinc-100 text-zinc-700",
  응시중: "bg-amber-100 text-amber-800",
  완료: "bg-emerald-100 text-emerald-800",
};

export default function CbtExamsPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <SubTabs active="exams" />

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold tracking-wide text-blue-600">CBT 응시</p>
          <h1 className="mt-2 text-2xl font-bold text-zinc-900 sm:text-3xl">
            전기기능사 CBT 모의고사
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            대상 연도 <strong>{TARGET_YEAR_RANGE}</strong> · 실제 시험과 동일한
            환경으로 응시하고 자동 채점·과목별 분석을 받아보세요.
          </p>
        </div>

        {/* Spec strip */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "문항 수", value: "60문항" },
            { label: "제한 시간", value: "60분" },
            { label: "합격 기준", value: "36문항 이상" },
            { label: "과목 과락", value: "없음" },
          ].map((spec) => (
            <div
              key={spec.label}
              className="rounded-xl border border-zinc-200 bg-white px-4 py-3"
            >
              <p className="text-xs text-zinc-500">{spec.label}</p>
              <p className="mt-0.5 text-lg font-bold text-zinc-900">
                {spec.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <span className="text-base leading-none">⚠️</span>
          <p>
            <strong className="font-semibold">응시 안내</strong> · 시험 시작
            후에는 일시정지가 불가합니다. 제한 시간이 끝나면 작성된 답안이
            자동으로 제출됩니다.
          </p>
        </div>

        {/* 집중 응시 — 빈출도·난이도별 골라 풀기 */}
        <section className="mb-10">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-zinc-900 sm:text-xl">
                🎯 집중 응시
              </h2>
              <p className="mt-1 text-sm text-zinc-600">
                빈출도나 난이도별로 골라 풀어볼 수 있어요. 약점만 집중해서
                다지고 싶을 때 좋습니다.
              </p>
            </div>
          </div>
          <FocusGrid />
        </section>

        <div className="mb-4">
          <h2 className="text-lg font-bold text-zinc-900 sm:text-xl">
            📝 회차별 모의고사
          </h2>
          <p className="mt-1 text-sm text-zinc-600">
            실전 시험과 같은 60문항·60분 구성으로 응시합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockExamSummaries.map((exam) => {
            const isStarted = exam.status !== "응시대기";
            const buttonLabel =
              exam.status === "완료"
                ? "결과 보기"
                : exam.status === "응시중"
                  ? "이어서 응시"
                  : "응시하기";
            const href =
              exam.status === "완료"
                ? `/cbt/${exam.id}/result`
                : `/cbt/${exam.id}/take`;

            return (
              <div
                key={exam.id}
                className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <span className="text-[10px] font-medium leading-none">
                        회차
                      </span>
                      <span className="text-lg font-bold leading-tight">
                        {exam.round}
                      </span>
                    </span>
                    <div>
                      <p className="text-xs font-medium text-zinc-500">
                        전기기능사
                      </p>
                      <h3 className="mt-0.5 text-lg font-semibold text-zinc-900">
                        CBT 모의고사 {exam.round}회
                      </h3>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[exam.status]}`}
                  >
                    {exam.status}
                  </span>
                </div>

                <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg bg-zinc-50 px-3 py-2.5">
                    <dt className="text-xs text-zinc-500">문항 수</dt>
                    <dd className="mt-0.5 font-semibold text-zinc-900">
                      {exam.totalQuestions}문항
                    </dd>
                  </div>
                  <div className="rounded-lg bg-zinc-50 px-3 py-2.5">
                    <dt className="text-xs text-zinc-500">제한 시간</dt>
                    <dd className="mt-0.5 font-semibold text-zinc-900">
                      {exam.durationMinutes}분
                    </dd>
                  </div>
                </dl>

                <Link
                  href={href}
                  className={`mt-6 flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition ${
                    isStarted
                      ? "bg-zinc-900 text-white hover:bg-zinc-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {buttonLabel}
                  <span className="transition group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
      <TextbookFloatingPopup />
    </div>
  );
}

type FocusCard = {
  filter: { frequency?: Frequency; difficulty?: Difficulty };
  label: string;
  desc: string;
  emoji: string;
  tone: string; // tailwind 색조 prefix (예: "rose")
};

const FOCUS_CARDS: FocusCard[] = [
  {
    filter: { frequency: "high" },
    label: "빈출 문제만",
    desc: "시험에서 자주 출제되는 핵심 문항만 모아 빠르게 점검합니다.",
    emoji: "🔥",
    tone: "rose",
  },
  {
    filter: { frequency: "medium" },
    label: "보통 빈출 문제",
    desc: "출제 빈도가 보통인 문항으로 폭을 넓혀 학습합니다.",
    emoji: "📘",
    tone: "blue",
  },
  {
    filter: { difficulty: "easy" },
    label: "쉬운 문제만",
    desc: "기본 개념·정의 위주의 문항으로 감을 잡습니다.",
    emoji: "🌱",
    tone: "emerald",
  },
  {
    filter: { difficulty: "medium" },
    label: "보통 난이도",
    desc: "실전 평균 수준의 문항으로 균형 있게 연습합니다.",
    emoji: "⚖️",
    tone: "indigo",
  },
  {
    filter: { difficulty: "hard" },
    label: "어려운 문제만",
    desc: "계산·고난도 문항으로 약점을 집중 공략합니다.",
    emoji: "🎯",
    tone: "violet",
  },
  {
    filter: { frequency: "high", difficulty: "hard" },
    label: "빈출 × 어려운 문제",
    desc: "꼭 맞혀야 하는 빈출 고난도 문항만 추려서.",
    emoji: "💎",
    tone: "amber",
  },
];

const TONE_STYLES: Record<string, { bg: string; ring: string; text: string; btn: string }> = {
  rose: {
    bg: "bg-rose-50",
    ring: "ring-rose-100",
    text: "text-rose-700",
    btn: "bg-rose-600 hover:bg-rose-700",
  },
  blue: {
    bg: "bg-blue-50",
    ring: "ring-blue-100",
    text: "text-blue-700",
    btn: "bg-blue-600 hover:bg-blue-700",
  },
  emerald: {
    bg: "bg-emerald-50",
    ring: "ring-emerald-100",
    text: "text-emerald-700",
    btn: "bg-emerald-600 hover:bg-emerald-700",
  },
  indigo: {
    bg: "bg-indigo-50",
    ring: "ring-indigo-100",
    text: "text-indigo-700",
    btn: "bg-indigo-600 hover:bg-indigo-700",
  },
  violet: {
    bg: "bg-violet-50",
    ring: "ring-violet-100",
    text: "text-violet-700",
    btn: "bg-violet-600 hover:bg-violet-700",
  },
  amber: {
    bg: "bg-amber-50",
    ring: "ring-amber-100",
    text: "text-amber-700",
    btn: "bg-amber-600 hover:bg-amber-700",
  },
};

function FocusGrid() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {FOCUS_CARDS.map((card) => {
        const count = countByFocus(card.filter);
        const tone = TONE_STYLES[card.tone];
        const disabled = count === 0;
        const id = buildFocusId(card.filter);
        const minutes = Math.min(60, Math.max(10, Math.round(count * 1.5)));
        return (
          <div
            key={card.label}
            className={`flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 ring-1 ${tone.ring} transition hover:-translate-y-0.5 hover:shadow-md`}
          >
            <div className="flex items-start gap-3">
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${tone.bg}`}
                aria-hidden
              >
                {card.emoji}
              </span>
              <div className="flex-1">
                <h3 className={`text-base font-bold ${tone.text}`}>
                  {card.label}
                </h3>
                <p className="mt-1 text-xs leading-5 text-zinc-600">
                  {card.desc}
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className={`rounded-lg px-2.5 py-1.5 ${tone.bg}`}>
                <p className="text-[10px] text-zinc-500">문항</p>
                <p className={`mt-0.5 font-bold ${tone.text}`}>{count}문항</p>
              </div>
              <div className={`rounded-lg px-2.5 py-1.5 ${tone.bg}`}>
                <p className="text-[10px] text-zinc-500">예상 시간</p>
                <p className={`mt-0.5 font-bold ${tone.text}`}>약 {minutes}분</p>
              </div>
            </div>
            {disabled ? (
              <p className="mt-4 rounded-lg bg-zinc-50 px-3 py-2 text-center text-xs text-zinc-500">
                지금은 해당 문항이 없어요
              </p>
            ) : (
              <Link
                href={`/cbt/${id}/take`}
                className={`mt-4 inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${tone.btn}`}
              >
                응시 시작
                <span aria-hidden>→</span>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
