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
import { mockExamSummaries } from "@/lib/cbt/mockData";
import type { ExamStatus } from "@/lib/cbt/types";
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
