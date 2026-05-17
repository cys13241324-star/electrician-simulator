"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "news_manifesto_seen";

/**
 * 매니페스토(왜 만드는가) 레이어의 접기/펼치기 래퍼.
 *
 * - 첫 방문: 펼친 상태로 시작하고 localStorage에 방문 플래그 기록.
 * - 재방문: 접힌 상태로 시작 → 바로 카테고리/카드로 갈 수 있게.
 * - SSR/초기 CSR 렌더는 항상 "펼침"으로 그려 하이드레이션 불일치를 피하고,
 *   마운트 후 localStorage를 보고 재방문자면 접는다(레이아웃 시프트 최소화).
 */
export default function ManifestoSection({
  children,
}: {
  children: React.ReactNode;
}) {
  // 초기 렌더(SSR + 첫 CSR)는 펼침 기준 → 하이드레이션 일치.
  const [open, setOpen] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = window.localStorage.getItem(STORAGE_KEY) === "1";
      if (!seen) {
        window.localStorage.setItem(STORAGE_KEY, "1");
      }
    } catch {
      // localStorage 사용 불가(프라이빗 모드 등) → 펼친 상태 유지.
    }
    if (seen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage 하이드레이션 (외부 시스템 동기화, React 공식 권장 패턴)
      setOpen(false);
    }
    setHydrated(true);
  }, []);

  return (
    <div className="mb-12">
      {open ? (
        <>
          <div>{children}</div>
          {/* 펼친 상태에서 다시 접기 (재방문 후 다시 펼친 경우 등) */}
          {hydrated && (
            <div className="-mt-6 mb-2 flex justify-center">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-500 transition hover:border-zinc-300 hover:text-zinc-700"
                aria-expanded={true}
              >
                <span aria-hidden>↑</span>
                소개 접기
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-500 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
            aria-expanded={false}
          >
            <span aria-hidden>⭐</span>
            이 소식지를 왜 만들었는지 보기
          </button>
        </div>
      )}
    </div>
  );
}
