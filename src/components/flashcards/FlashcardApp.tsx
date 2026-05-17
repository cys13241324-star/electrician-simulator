"use client";

import { useEffect, useMemo, useState } from "react";
import { presetCards } from "@/lib/flashcards/data";
import type { Flashcard, Subject } from "@/lib/flashcards/types";
import {
  loadFavorites,
  toggleFavorite as toggleFav,
  loadProgress,
  recordProgress,
  resetProgress,
  needsReview,
  summarize,
  type ProgressMap,
  type CardStatus,
} from "@/lib/flashcards/favorites";
import CardStudy from "./CardStudy";
import CardList from "./CardList";

type View = "study" | "list";
type SubjectFilter = "all" | Subject;

const SUBJECTS: SubjectFilter[] = ["all", "전기이론", "전기기기", "전기설비"];

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function FlashcardApp() {
  const [view, setView] = useState<View>("study");
  const [subjectFilter, setSubjectFilter] = useState<SubjectFilter>("all");
  const [starredOnly, setStarredOnly] = useState(false);
  const [dueOnly, setDueOnly] = useState(false);
  const [shuffleOn, setShuffleOn] = useState(false);
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState<ProgressMap>({});
  const [deck, setDeck] = useState<Flashcard[]>(presetCards);
  const [hydrated, setHydrated] = useState(false);

  // localStorage 동기화 (클라이언트 마운트 시)
  useEffect(() => {
    setFavorites(loadFavorites());
    setProgress(loadProgress());
    setHydrated(true);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return presetCards.filter((c) => {
      if (subjectFilter !== "all" && c.subject !== subjectFilter) return false;
      if (starredOnly && !favorites.has(c.id)) return false;
      if (dueOnly && !needsReview(progress, c.id)) return false;
      if (q) {
        const hay = `${c.front} ${c.back} ${c.topic} ${c.subject}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [subjectFilter, starredOnly, dueOnly, query, favorites, progress]);

  // 필터가 바뀌면 학습 덱도 새로 짜기 (현재 학습 중이면 끊김 → 의도된 동작)
  useEffect(() => {
    setDeck(shuffleOn ? shuffle(filtered) : filtered);
  }, [filtered, shuffleOn]);

  const stats = useMemo(
    () => summarize(progress, presetCards.map((c) => c.id)),
    [progress],
  );
  const filteredStats = useMemo(
    () => summarize(progress, filtered.map((c) => c.id)),
    [progress, filtered],
  );

  function startFromCard(card: Flashcard) {
    const base = filtered;
    const idx = base.findIndex((c) => c.id === card.id);
    if (idx < 0) {
      setDeck(shuffleOn ? shuffle(base) : base);
    } else {
      const ordered = [...base.slice(idx), ...base.slice(0, idx)];
      setDeck(ordered);
    }
    setView("study");
  }

  function startAll() {
    setDeck(shuffleOn ? shuffle(filtered) : filtered);
    setView("study");
  }

  /** 오늘 복습: 복습 권장 카드만 모아 학습 시작. */
  function startReview() {
    const due = presetCards.filter((c) => {
      if (subjectFilter !== "all" && c.subject !== subjectFilter) return false;
      return needsReview(progress, c.id);
    });
    setDeck(shuffle(due));
    setView("study");
  }

  function handleToggleFavorite(id: string) {
    setFavorites((prev) => toggleFav(prev, id));
  }

  function handleRate(id: string, status: CardStatus) {
    setProgress((prev) => recordProgress(prev, id, status));
  }

  function handleResetProgress() {
    setProgress(resetProgress());
  }

  function handleReplayUnknown(ids: string[]) {
    const map = new Map(presetCards.map((c) => [c.id, c]));
    const replayDeck = ids
      .map((id) => map.get(id))
      .filter((c): c is Flashcard => Boolean(c));
    setDeck(replayDeck);
    setView("study");
  }

  function handleStartChapter(chapterCards: Flashcard[]) {
    setDeck(shuffleOn ? shuffle(chapterCards) : chapterCards);
    setView("study");
  }

  const dueCount = stats.due;

  return (
    <main className="mx-auto max-w-5xl px-5 py-9 sm:px-6 sm:py-10">
      {/* 헤더 */}
      <header className="mb-6">
        <p className="text-xs font-semibold tracking-[0.2em] text-blue-600">
          FLIP CARD
        </p>
        <div className="mt-1.5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-[1.7rem] font-bold leading-tight text-zinc-900 sm:text-3xl">
              전기기능사 플립 암기카드
            </h1>
            <p className="mt-1.5 text-sm text-zinc-500">
              핵심 개념 {presetCards.length}장을 뒤집으며 익히고, 헷갈리는 카드는
              다시 복습하세요.
            </p>
          </div>

          <div className="inline-flex shrink-0 rounded-full bg-zinc-100 p-1">
            <TabBtn active={view === "study"} onClick={() => setView("study")}>
              학습
            </TabBtn>
            <TabBtn active={view === "list"} onClick={() => setView("list")}>
              카드 목록
            </TabBtn>
          </div>
        </div>
      </header>

      {/* 진도 대시보드 */}
      <ProgressDashboard
        stats={stats}
        dueCount={dueCount}
        hydrated={hydrated}
        onStartReview={startReview}
        onReset={handleResetProgress}
      />

      {/* 필터·검색 (스티키) */}
      <section className="sticky top-2 z-20 mb-7 rounded-2xl border border-zinc-100 bg-white/85 p-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70 sm:p-4">
        <div className="flex flex-wrap items-center gap-2">
          {SUBJECTS.map((s) => (
            <Chip
              key={s}
              active={subjectFilter === s}
              onClick={() => setSubjectFilter(s)}
            >
              {s === "all" ? "전체" : s}
            </Chip>
          ))}
          <span className="mx-1 hidden h-5 w-px bg-zinc-200 sm:inline-block" />
          <Toggle
            on={starredOnly}
            onClick={() => setStarredOnly((v) => !v)}
            icon={starredOnly ? "★" : "☆"}
          >
            별 카드
          </Toggle>
          <Toggle
            on={dueOnly}
            onClick={() => setDueOnly((v) => !v)}
            icon="🔁"
          >
            복습 필요
          </Toggle>
          <Toggle on={shuffleOn} onClick={() => setShuffleOn((v) => !v)} icon="🔀">
            셔플
          </Toggle>

          <div className="relative ml-auto w-full sm:w-56">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
              ⌕
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="카드 검색…"
              aria-label="카드 검색"
              className="w-full rounded-full border border-zinc-200 bg-zinc-50 py-1.5 pl-8 pr-3 text-sm text-zinc-800 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="mt-2.5 flex items-center gap-2 px-1 text-xs text-zinc-500">
          <span>
            현재 조건{" "}
            <strong className="text-zinc-800">{filtered.length}</strong>장
          </span>
          {hydrated && filtered.length > 0 && (
            <>
              <span className="text-zinc-300">·</span>
              <span>
                암기 완료 {filteredStats.known} / 복습 {filteredStats.due}
              </span>
            </>
          )}
          {(starredOnly || dueOnly || query || subjectFilter !== "all") && (
            <button
              type="button"
              onClick={() => {
                setStarredOnly(false);
                setDueOnly(false);
                setQuery("");
                setSubjectFilter("all");
              }}
              className="ml-auto rounded-full px-2 py-0.5 font-medium text-zinc-500 underline-offset-2 hover:text-zinc-800 hover:underline"
            >
              필터 초기화
            </button>
          )}
        </div>
      </section>

      {view === "study" ? (
        <CardStudy
          deck={deck}
          favorites={favorites}
          progress={progress}
          onToggleFavorite={handleToggleFavorite}
          onRate={handleRate}
          onExit={() => setView("list")}
          onReplayUnknown={handleReplayUnknown}
        />
      ) : (
        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-zinc-500">
              카드를 눌러 그 지점부터 학습을 시작할 수 있어요.
            </p>
            <button
              type="button"
              onClick={startAll}
              disabled={filtered.length === 0}
              className="rounded-full bg-gradient-to-br from-blue-500 to-violet-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:from-blue-600 hover:to-violet-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
            >
              전체 {filtered.length}장 학습 시작 →
            </button>
          </div>
          <CardList
            cards={filtered}
            favorites={favorites}
            progress={progress}
            subjectScope={subjectFilter}
            onPick={startFromCard}
            onToggleFavorite={handleToggleFavorite}
            onStartChapter={handleStartChapter}
          />
        </div>
      )}
    </main>
  );
}

/* ---------------------------------------------------------------- */

function ProgressDashboard({
  stats,
  dueCount,
  hydrated,
  onStartReview,
  onReset,
}: {
  stats: ReturnType<typeof summarize>;
  dueCount: number;
  hydrated: boolean;
  onStartReview: () => void;
  onReset: () => void;
}) {
  const pct = stats.masteredPct;
  // 도넛 (SVG conic 대신 stroke-dasharray)
  const R = 26;
  const C = 2 * Math.PI * R;
  const dash = (pct / 100) * C;

  return (
    <section className="mb-7 grid gap-3 sm:grid-cols-[auto_1fr] sm:items-stretch">
      <div className="flex items-center gap-4 rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
        <div className="relative h-[68px] w-[68px] shrink-0">
          <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
            <circle
              cx="32"
              cy="32"
              r={R}
              fill="none"
              stroke="#f1f1f4"
              strokeWidth="8"
            />
            <circle
              cx="32"
              cy="32"
              r={R}
              fill="none"
              stroke="url(#fcGrad)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${hydrated ? dash : 0} ${C}`}
              className="transition-all duration-700 ease-out"
            />
            <defs>
              <linearGradient id="fcGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-zinc-900">
              {hydrated ? `${pct}%` : "–"}
            </span>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wider text-zinc-400">
            전체 진도
          </p>
          <p className="mt-0.5 text-lg font-bold text-zinc-900">
            {hydrated ? (
              <>
                {stats.known}
                <span className="text-sm font-medium text-zinc-400">
                  {" "}
                  / {stats.total}장 암기
                </span>
              </>
            ) : (
              <span className="text-sm font-medium text-zinc-400">
                불러오는 중…
              </span>
            )}
          </p>
          {hydrated && (
            <button
              type="button"
              onClick={onReset}
              className="mt-1 text-[11px] text-zinc-400 underline-offset-2 hover:text-zinc-600 hover:underline"
            >
              진도 초기화
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-between gap-3 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/70 via-white to-violet-50/50 p-5 shadow-sm sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <Stat label="암기 완료" value={hydrated ? stats.known : 0} tone="emerald" />
          <span className="h-8 w-px bg-zinc-200" />
          <Stat label="복습 필요" value={hydrated ? dueCount : 0} tone="amber" />
          <span className="h-8 w-px bg-zinc-200" />
          <Stat
            label="아직 안 본 카드"
            value={hydrated ? stats.unseen : stats.total}
            tone="zinc"
          />
        </div>
        <button
          type="button"
          onClick={onStartReview}
          disabled={!hydrated || dueCount === 0}
          className="shrink-0 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:hover:translate-y-0"
        >
          {hydrated && dueCount > 0
            ? `오늘 복습 ${dueCount}장 →`
            : "복습 완료 🎉"}
        </button>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "emerald" | "amber" | "zinc";
}) {
  const color =
    tone === "emerald"
      ? "text-emerald-600"
      : tone === "amber"
        ? "text-amber-600"
        : "text-zinc-500";
  return (
    <div>
      <p className={`text-xl font-bold tabular-nums ${color}`}>{value}</p>
      <p className="mt-0.5 text-[11px] font-medium text-zinc-500">{label}</p>
    </div>
  );
}

function TabBtn({
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
      className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
        active
          ? "bg-white text-zinc-900 shadow-sm"
          : "text-zinc-600 hover:text-zinc-900"
      }`}
    >
      {children}
    </button>
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
          ? "bg-zinc-900 text-white shadow-sm"
          : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
      }`}
    >
      {children}
    </button>
  );
}

function Toggle({
  on,
  onClick,
  icon,
  children,
}: {
  on: boolean;
  onClick: () => void;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
        on
          ? "bg-amber-100 text-amber-800 ring-1 ring-amber-200"
          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
      }`}
    >
      <span aria-hidden>{icon}</span>
      {children}
    </button>
  );
}
