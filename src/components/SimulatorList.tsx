"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Simulator, Subject } from "@/lib/simulators";
import { CHAPTERS, ALL_SUBJECTS } from "@/lib/chapters";

type Props = { simulators: Simulator[] };

type SubjectFilter = "all" | Subject;
const SUBJECT_FILTERS: SubjectFilter[] = ["all", ...ALL_SUBJECTS];

const SUBJECT_STYLE: Record<
  Subject,
  { chip: string; emoji: string; ring: string; accent: string }
> = {
  전기이론: {
    chip: "bg-blue-100 text-blue-700",
    emoji: "⚡",
    ring: "ring-blue-100",
    accent: "text-blue-700",
  },
  전기기기: {
    chip: "bg-violet-100 text-violet-700",
    emoji: "🔧",
    ring: "ring-violet-100",
    accent: "text-violet-700",
  },
  전기설비: {
    chip: "bg-amber-100 text-amber-700",
    emoji: "🏗️",
    ring: "ring-amber-100",
    accent: "text-amber-700",
  },
};

export default function SimulatorList({ simulators }: Props) {
  const [subjectScope, setSubjectScope] = useState<SubjectFilter>("all");

  const groups = useMemo(() => {
    const subjectsToShow: Subject[] =
      subjectScope === "all" ? ALL_SUBJECTS : [subjectScope];
    return subjectsToShow.flatMap((subject) =>
      CHAPTERS[subject]
        .map((chapter) => ({
          subject,
          chapter,
          items: simulators.filter(
            (s) => s.subject === subject && s.topic === chapter,
          ),
        }))
        .filter((g) => g.items.length > 0),
    );
  }, [simulators, subjectScope]);

  const totalInScope = groups.reduce((sum, g) => sum + g.items.length, 0);
  const availableInScope = groups.reduce(
    (sum, g) => sum + g.items.filter((s) => s.status === "available").length,
    0,
  );

  return (
    <div>
      {/* 헤더 */}
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-wider text-indigo-600">
            SIMULATOR
          </p>
          <h1 className="mt-1 text-2xl font-bold text-zinc-900 sm:text-3xl">
            전기기능사 이론 시뮬레이터
          </h1>
          <p className="mt-1 text-sm text-zinc-600">
            전체 {simulators.length}개 · 이용 가능 {availableInScope} · 현재 조건{" "}
            {totalInScope}개
          </p>
        </div>
      </header>

      {/* 과목 필터 */}
      <section className="mb-8 rounded-3xl border border-zinc-100 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          {SUBJECT_FILTERS.map((s) => (
            <Chip
              key={s}
              active={subjectScope === s}
              onClick={() => setSubjectScope(s)}
            >
              {s === "all" ? "전체" : s}
            </Chip>
          ))}
        </div>
      </section>

      {groups.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-zinc-200 bg-white p-12 text-center">
          <p className="text-4xl">🧐</p>
          <p className="mt-3 text-sm text-zinc-600">
            조건에 맞는 시뮬레이터가 없어요.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {groups.map((g) => (
            <ChapterSection
              key={`${g.subject}-${g.chapter}`}
              subject={g.subject}
              chapter={g.chapter}
              items={g.items}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ChapterSection({
  subject,
  chapter,
  items,
}: {
  subject: Subject;
  chapter: string;
  items: Simulator[];
}) {
  const [open, setOpen] = useState(true);
  const style = SUBJECT_STYLE[subject];
  const availableCount = items.filter((s) => s.status === "available").length;

  return (
    <section className="rounded-3xl border border-zinc-100 bg-white p-4 shadow-sm sm:p-5">
      <header className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "챕터 접기" : "챕터 펼치기"}
          className="flex flex-1 items-center gap-3 text-left"
        >
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-xs text-zinc-500 transition ${
              open ? "rotate-90" : ""
            }`}
          >
            ▶
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${style.chip}`}
          >
            {style.emoji} {subject}
          </span>
          <h3 className="text-base font-bold text-zinc-900 sm:text-lg">
            {chapter}
          </h3>
          <span className="text-xs font-medium text-zinc-500">
            {items.length}개{availableCount < items.length && (
              <>
                {" "}
                · 이용가능 {availableCount}
              </>
            )}
          </span>
        </button>
      </header>

      {open && (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((sim) => (
            <SimCard key={sim.id} sim={sim} style={style} />
          ))}
        </div>
      )}
    </section>
  );
}

function SimCard({
  sim,
  style,
}: {
  sim: Simulator;
  style: { chip: string; emoji: string; ring: string; accent: string };
}) {
  const available = sim.status === "available";
  return (
    <Link
      href={`/simulator/${sim.id}`}
      className={`group relative flex h-full flex-col rounded-2xl border border-zinc-100 bg-zinc-50/60 p-4 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md ring-1 ${style.ring}`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-2xl leading-none">{sim.emoji}</span>
        {available ? (
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
            이용가능
          </span>
        ) : (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
            준비중
          </span>
        )}
      </div>
      <h4 className="mt-3 text-sm font-bold leading-snug text-zinc-900 group-hover:text-indigo-700">
        {sim.title}
      </h4>
      <p className="mt-1 line-clamp-2 flex-1 text-xs leading-5 text-zinc-500">
        {sim.description}
      </p>
      <span
        className={`mt-3 text-xs font-semibold transition group-hover:translate-x-0.5 ${style.accent}`}
      >
        {available ? "체험하기 →" : "공식 보기 →"}
      </span>
    </Link>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
        active
          ? "bg-zinc-900 text-white"
          : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
      }`}
    >
      {children}
    </button>
  );
}
