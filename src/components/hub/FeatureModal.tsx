"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type FeatureShot = {
  src: string;
  alt: string;
  caption?: string;
};

export type FeatureModalContent = {
  title: string;
  badge: string;
  accent: string; // pill gradient classes
  description: string;
  shots: FeatureShot[];
  tips: string[];
  href: string;
  cta: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  content: FeatureModalContent;
};

export default function FeatureModal({ open, onClose, content }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousActiveRef = useRef<HTMLElement | null>(null);
  const [shotIndex, setShotIndex] = useState(0);

  // 열릴 때 포커스 이동·바디 스크롤 락·이전 포커스 저장
  useEffect(() => {
    if (!open) return;
    previousActiveRef.current = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setShotIndex(0);
    return () => {
      document.body.style.overflow = prevOverflow;
      previousActiveRef.current?.focus?.();
    };
  }, [open]);

  // ESC 닫기 + 좌우 화살표로 스샷 넘기기
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        setShotIndex((i) => Math.min(i + 1, content.shots.length - 1));
      } else if (e.key === "ArrowLeft") {
        setShotIndex((i) => Math.max(i - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, content.shots.length]);

  const onBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  if (!open) return null;
  if (typeof document === "undefined") return null;

  const titleId = `feature-modal-title-${content.badge.toLowerCase()}`;
  const descId = `feature-modal-desc-${content.badge.toLowerCase()}`;
  const shot = content.shots[shotIndex];

  return createPortal(
    <div
      onClick={onBackdropClick}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-zinc-900/60 px-4 py-8 backdrop-blur-sm sm:py-12"
      aria-hidden="false"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="relative flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* 헤더 */}
        <div className="flex items-start justify-between gap-4 border-b border-zinc-100 px-6 py-4">
          <div>
            <span
              className={`inline-block rounded-full bg-gradient-to-r ${content.accent} px-2.5 py-1 text-[10px] font-bold tracking-widest text-white shadow-sm`}
            >
              {content.badge}
            </span>
            <h2
              id={titleId}
              className="mt-2 text-lg font-bold text-zinc-900 sm:text-xl"
            >
              {content.title}
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="rounded-full p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* 본문(스크롤) */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <p
            id={descId}
            className="text-sm leading-7 text-zinc-700 sm:text-[15px]"
          >
            {content.description}
          </p>

          {/* 스샷 */}
          {content.shots.length > 0 && (
            <div className="mt-5">
              <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shot.src}
                  alt={shot.alt}
                  className="block h-auto w-full"
                  loading="lazy"
                />
                {content.shots.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setShotIndex((i) => Math.max(i - 1, 0))
                      }
                      disabled={shotIndex === 0}
                      aria-label="이전 스크린샷"
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2 text-zinc-700 shadow transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M10 3L5 8l5 5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setShotIndex((i) =>
                          Math.min(i + 1, content.shots.length - 1),
                        )
                      }
                      disabled={shotIndex === content.shots.length - 1}
                      aria-label="다음 스크린샷"
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2 text-zinc-700 shadow transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M6 3l5 5-5 5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              {shot.caption && (
                <p className="mt-2 text-center text-xs text-zinc-500">
                  {shot.caption}
                </p>
              )}
              {content.shots.length > 1 && (
                <div className="mt-3 flex items-center justify-center gap-1.5">
                  {content.shots.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setShotIndex(i)}
                      aria-label={`스크린샷 ${i + 1}로 이동`}
                      aria-current={i === shotIndex}
                      className={`h-1.5 rounded-full transition-all ${
                        i === shotIndex
                          ? "w-6 bg-indigo-500"
                          : "w-1.5 bg-zinc-300 hover:bg-zinc-400"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 팁 */}
          {content.tips.length > 0 && (
            <div className="mt-6 rounded-xl bg-zinc-50 p-4">
              <h3 className="text-xs font-bold tracking-widest text-zinc-500">
                💡 사용 팁
              </h3>
              <ul className="mt-2 space-y-1.5 text-sm text-zinc-700">
                {content.tips.map((tip, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-indigo-500">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 푸터(CTA) */}
        <div className="flex items-center justify-end gap-2 border-t border-zinc-100 bg-zinc-50/60 px-6 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100"
          >
            닫기
          </button>
          <Link
            href={content.href}
            className={`rounded-lg bg-gradient-to-r ${content.accent} px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:brightness-110`}
          >
            {content.cta} →
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  );
}
