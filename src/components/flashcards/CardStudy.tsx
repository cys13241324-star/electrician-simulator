"use client";

import { useEffect, useState } from "react";
import type { Flashcard } from "@/lib/flashcards/types";
import { MathText } from "@/components/Math";

type Props = {
  deck: Flashcard[];
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  onExit: () => void;
  onReplayUnknown: (ids: string[]) => void;
};

export default function CardStudy({
  deck,
  favorites,
  onToggleFavorite,
  onExit,
  onReplayUnknown,
}: Props) {
  const [queue, setQueue] = useState<Flashcard[]>(deck);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(0);
  const [unknownIds, setUnknownIds] = useState<string[]>([]);

  useEffect(() => {
    setQueue(deck);
    setFlipped(false);
    setDone(0);
    setUnknownIds([]);
  }, [deck]);

  const card = queue[0];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement) return;
      if (e.code === "Space") {
        e.preventDefault();
        if (!card) return;
        setFlipped((v) => !v);
      } else if (e.key === "1" && flipped) rate("unknown");
      else if (e.key === "2" && flipped) rate("known");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipped, queue]);

  function rate(result: "unknown" | "known") {
    if (!card) return;
    if (result === "unknown") {
      setUnknownIds((arr) => (arr.includes(card.id) ? arr : [...arr, card.id]));
      setQueue((q) => {
        const [head, ...rest] = q;
        return head ? [...rest, head] : q;
      });
    } else {
      setQueue((q) => q.slice(1));
    }
    setDone((d) => d + 1);
    setFlipped(false);
  }

  if (!card) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-10 text-center shadow-sm">
        <p className="text-5xl">🎉</p>
        <h2 className="mt-5 text-2xl font-bold text-emerald-900">
          모든 카드를 다 봤어요
        </h2>
        <p className="mt-3 text-emerald-800">
          이번 세션에서 {done}회 응답 ·{" "}
          <span className="font-semibold">모르겠음 {unknownIds.length}장</span>
        </p>
        <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:justify-center">
          {unknownIds.length > 0 && (
            <button
              type="button"
              onClick={() => onReplayUnknown(unknownIds)}
              className="rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-rose-600"
            >
              모르겠다 한 {unknownIds.length}장 다시 풀기 →
            </button>
          )}
          <button
            type="button"
            onClick={onExit}
            className="rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:-translate-y-0.5 hover:bg-zinc-50"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const remaining = queue.length;
  const total = deck.length;
  const progress = Math.min(100, (done / Math.max(total, 1)) * 100);
  const isFav = favorites.has(card.id);

  return (
    <div className="mx-auto max-w-3xl">
      {/* 상단 진행률 */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onExit}
          className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
        >
          ← 목록
        </button>
        <p className="text-sm font-medium text-zinc-600">
          남은 카드 <strong className="text-zinc-900">{remaining}</strong> · 응답{" "}
          {done}
        </p>
      </div>
      <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-zinc-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 카드 (3D flip) */}
      <div className="relative">
        {/* 별 토글 (절대 위치, flip 외부) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(card.id);
          }}
          aria-label={isFav ? "별 표시 해제" : "별 표시"}
          className={`absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full transition hover:scale-110 ${
            isFav
              ? "bg-amber-100 text-amber-500"
              : "bg-zinc-100 text-zinc-400 hover:bg-amber-50 hover:text-amber-400"
          }`}
        >
          <span className="text-base">{isFav ? "★" : "☆"}</span>
        </button>

        <button
          type="button"
          onClick={() => setFlipped((v) => !v)}
          aria-label={flipped ? "앞면으로 돌아가기" : "답 보기"}
          className="block w-full text-left [perspective:1400px]"
        >
          <div
            key={card.id}
            className={`relative grid transition-transform duration-500 ease-out [transform-style:preserve-3d] ${
              flipped ? "[transform:rotateY(180deg)]" : ""
            }`}
            style={{ animation: "flashUp 280ms ease-out" }}
          >
            {/* 앞면 */}
            <div className="col-start-1 row-start-1 rounded-3xl border border-zinc-100 bg-gradient-to-br from-white via-blue-50/30 to-violet-50/40 p-10 shadow-md transition sm:p-14 [backface-visibility:hidden]">
              <p className="text-xs font-semibold tracking-wider text-blue-600">
                {card.subject} · {card.topic}
              </p>
              <div className="mt-6 flex min-h-[220px] items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl font-bold leading-relaxed text-zinc-900 sm:text-3xl">
                    <MathText>{card.front}</MathText>
                  </h2>
                  <p className="mt-8 text-xs text-zinc-400">
                    카드를 클릭하거나 Space — 답 보기
                  </p>
                </div>
              </div>
            </div>

            {/* 뒷면 */}
            <div className="col-start-1 row-start-1 rounded-3xl border border-zinc-100 bg-white p-10 shadow-md transition sm:p-14 [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <p className="text-xs font-semibold tracking-wider text-blue-600">
                {card.subject} · {card.topic}
              </p>
              <p className="mt-6 text-xs font-bold tracking-wider text-blue-600">
                답
              </p>
              <div className="mt-3 whitespace-pre-line text-lg leading-9 text-zinc-900 sm:text-xl">
                <MathText>{card.back}</MathText>
              </div>

              {card.example && (
                <div className="mt-8 rounded-2xl bg-gradient-to-br from-amber-50 to-white p-5 ring-1 ring-amber-100">
                  <p className="text-xs font-bold tracking-wider text-amber-700">
                    예제
                  </p>
                  <p className="mt-2 text-sm leading-7 text-zinc-800 sm:text-base">
                    <MathText>{card.example.question}</MathText>
                  </p>
                  <p className="mt-3 text-xs font-bold tracking-wider text-emerald-700">
                    정답
                  </p>
                  <p className="mt-1 text-sm font-semibold text-emerald-700 sm:text-base">
                    <MathText>{card.example.answer}</MathText>
                  </p>
                </div>
              )}
            </div>
          </div>
        </button>
      </div>

      {/* 액션 */}
      {flipped && (
        <div
          className="mt-6 grid grid-cols-2 gap-3"
          style={{ animation: "flashUp 280ms ease-out 220ms backwards" }}
        >
          <button
            type="button"
            onClick={() => rate("unknown")}
            className="rounded-2xl border-2 border-rose-200 bg-white px-6 py-5 text-base font-semibold text-rose-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-rose-50"
          >
            😣 모르겠음
            <span className="ml-2 text-xs text-rose-400">1</span>
          </button>
          <button
            type="button"
            onClick={() => rate("known")}
            className="rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 px-6 py-5 text-base font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:from-blue-600 hover:to-violet-600"
          >
            🙂 알겠음
            <span className="ml-2 text-xs text-white/70">2</span>
          </button>
        </div>
      )}
    </div>
  );
}
