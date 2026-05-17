"use client";

import { useEffect, useMemo, useState } from "react";
import { presetCards } from "@/lib/flashcards/data";
import type { Flashcard, Subject } from "@/lib/flashcards/types";
import { loadFavorites, toggleFavorite as toggleFav } from "@/lib/flashcards/favorites";
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
  const [shuffleOn, setShuffleOn] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [deck, setDeck] = useState<Flashcard[]>(presetCards);

  // localStorage 동기화 (클라이언트 마운트 시)
  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  const filtered = useMemo(() => {
    return presetCards.filter((c) => {
      if (subjectFilter !== "all" && c.subject !== subjectFilter) return false;
      if (starredOnly && !favorites.has(c.id)) return false;
      return true;
    });
  }, [subjectFilter, starredOnly, favorites]);

  // 필터가 바뀌면 학습 덱도 새로 짜기 (현재 학습 중이면 끊김 → 의도된 동작)
  useEffect(() => {
    setDeck(shuffleOn ? shuffle(filtered) : filtered);
  }, [filtered, shuffleOn]);

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

  function handleToggleFavorite(id: string) {
    setFavorites((prev) => toggleFav(prev, id));
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

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      {/* 헤더 */}
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-wider text-blue-600">
            FLIP CARD
          </p>
          <h1 className="mt-1 text-2xl font-bold text-zinc-900 sm:text-3xl">
            전기기능사 플립 암기카드
          </h1>
          <p className="mt-1 text-sm text-zinc-600">
            전체 {presetCards.length}장 · 현재 조건 {filtered.length}장
          </p>
        </div>

        <div className="inline-flex rounded-full bg-zinc-100 p-1">
          <TabBtn active={view === "study"} onClick={() => setView("study")}>
            학습
          </TabBtn>
          <TabBtn active={view === "list"} onClick={() => setView("list")}>
            카드 목록
          </TabBtn>
        </div>
      </header>

      {/* 필터·토글 */}
      <section className="mb-8 rounded-3xl border border-zinc-100 bg-white p-4 shadow-sm sm:p-5">
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
          <span className="mx-2 hidden h-5 w-px bg-zinc-200 sm:inline-block" />
          <Toggle
            on={starredOnly}
            onClick={() => setStarredOnly((v) => !v)}
            icon={starredOnly ? "★" : "☆"}
          >
            별 카드만
          </Toggle>
          <Toggle
            on={shuffleOn}
            onClick={() => setShuffleOn((v) => !v)}
            icon="🔀"
          >
            셔플
          </Toggle>
        </div>
      </section>

      {view === "study" ? (
        <CardStudy
          deck={deck}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onExit={() => setView("list")}
          onReplayUnknown={handleReplayUnknown}
        />
      ) : (
        <div>
          <div className="mb-6 flex items-center justify-end">
            <button
              type="button"
              onClick={startAll}
              disabled={filtered.length === 0}
              className="rounded-full bg-gradient-to-br from-blue-500 to-violet-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:from-blue-600 hover:to-violet-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
            >
              전체 학습 시작 →
            </button>
          </div>
          <CardList
            cards={filtered}
            favorites={favorites}
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
          ? "bg-zinc-900 text-white"
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
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
        on
          ? "bg-amber-100 text-amber-800"
          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
      }`}
    >
      <span>{icon}</span>
      {children}
    </button>
  );
}
