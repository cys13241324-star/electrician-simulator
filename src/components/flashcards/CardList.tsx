"use client";

import { useMemo, useState } from "react";
import type { Flashcard, Subject } from "@/lib/flashcards/types";
import { CHAPTERS, ALL_SUBJECTS } from "@/lib/flashcards/chapters";
import { MathText } from "@/components/Math";

type Props = {
  cards: Flashcard[];
  favorites: Set<string>;
  subjectScope: "all" | Subject;
  onPick: (card: Flashcard) => void;
  onToggleFavorite: (id: string) => void;
  onStartChapter: (cards: Flashcard[]) => void;
};

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

export default function CardList({
  cards,
  favorites,
  subjectScope,
  onPick,
  onToggleFavorite,
  onStartChapter,
}: Props) {
  const groups = useMemo(() => {
    const subjectsToShow: Subject[] =
      subjectScope === "all" ? ALL_SUBJECTS : [subjectScope];
    return subjectsToShow.flatMap((subject) =>
      CHAPTERS[subject]
        .map((chapter) => ({
          subject,
          chapter,
          cards: cards.filter(
            (c) => c.subject === subject && c.topic === chapter,
          ),
        }))
        .filter((g) => g.cards.length > 0),
    );
  }, [cards, subjectScope]);

  if (groups.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-zinc-200 bg-white p-12 text-center">
        <p className="text-4xl">🧐</p>
        <p className="mt-3 text-sm text-zinc-600">
          조건에 맞는 카드가 없어요. 필터를 바꿔보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {groups.map((g) => (
        <ChapterSection
          key={`${g.subject}-${g.chapter}`}
          subject={g.subject}
          chapter={g.chapter}
          cards={g.cards}
          favorites={favorites}
          onPick={onPick}
          onToggleFavorite={onToggleFavorite}
          onStart={() => onStartChapter(g.cards)}
        />
      ))}
    </div>
  );
}

function ChapterSection({
  subject,
  chapter,
  cards,
  favorites,
  onPick,
  onToggleFavorite,
  onStart,
}: {
  subject: Subject;
  chapter: string;
  cards: Flashcard[];
  favorites: Set<string>;
  onPick: (c: Flashcard) => void;
  onToggleFavorite: (id: string) => void;
  onStart: () => void;
}) {
  const [open, setOpen] = useState(true);
  const style = SUBJECT_STYLE[subject];

  return (
    <section className="rounded-3xl border border-zinc-100 bg-white p-4 shadow-sm sm:p-5">
      {/* 챕터 헤더 */}
      <header className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "챕터 접기" : "챕터 펼치기"}
          className="flex flex-1 items-center gap-3 text-left"
        >
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs transition ${
              open ? "rotate-90" : ""
            } bg-zinc-100 text-zinc-500`}
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
            {cards.length}장
          </span>
        </button>

        <button
          type="button"
          onClick={onStart}
          className={`flex-shrink-0 rounded-full bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold transition hover:-translate-y-0.5 hover:bg-zinc-900 hover:text-white ${style.accent}`}
        >
          이 챕터만 학습 →
        </button>
      </header>

      {/* 카드 그리드 */}
      {open && (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const isFav = favorites.has(card.id);
            return (
              <div
                key={card.id}
                className={`group relative rounded-2xl border border-zinc-100 bg-zinc-50/60 p-4 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md ring-1 ${style.ring}`}
              >
                <button
                  type="button"
                  onClick={() => onToggleFavorite(card.id)}
                  aria-label={isFav ? "별 표시 해제" : "별 표시"}
                  className={`absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full transition hover:scale-110 ${
                    isFav
                      ? "bg-amber-100 text-amber-500"
                      : "bg-white text-zinc-300 opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {isFav ? "★" : "☆"}
                </button>
                <button
                  type="button"
                  onClick={() => onPick(card)}
                  className="block w-full pr-8 text-left"
                >
                  <p className="line-clamp-3 text-sm font-bold leading-6 text-zinc-900 group-hover:text-blue-700">
                    <MathText>{card.front}</MathText>
                  </p>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
