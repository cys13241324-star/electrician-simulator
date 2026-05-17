"use client";

import { useState } from "react";
import FeatureModal, { type FeatureModalContent } from "./FeatureModal";

const SHOTS = "/screenshots/feature-popup";

const CONTENT: Record<string, FeatureModalContent> = {
  simulator: {
    title: "인터랙티브 시뮬레이터",
    badge: "SIMULATOR",
    accent: "from-cyan-400 via-sky-500 to-indigo-700",
    description:
      "전기력선·RLC 공진·회전 자계·변압기까지 — 슬라이더를 움직이면 수식과 파형이 실시간으로 반응합니다. 글로만 외우던 전기 이론을 눈으로 확인하세요. 총 98개 시뮬, 전기이론·전기기기·전기설비 전 과목 커버.",
    shots: [
      {
        src: `${SHOTS}/simulator-list.webp`,
        alt: "시뮬레이터 목록 화면",
        caption: "98개 시뮬을 과목별로 탐색 + 검색",
      },
      {
        src: `${SHOTS}/simulator-detail.webp`,
        alt: "옴의 법칙 시뮬 상세 화면",
        caption: "예: 옴의 법칙 — 슬라이더로 V/R 조절, I·P 실시간 계산",
      },
    ],
    tips: [
      "검색창에 \"공진\", \"옴\" 등 키워드 입력 → 빠른 탐색",
      "각 시뮬 페이지에 예제·공식·설명이 함께 표시",
      "전과목 필터로 분야별 시뮬 좁히기",
    ],
    href: "/simulator",
    cta: "시뮬레이터 열기",
  },
  flipcard: {
    title: "플립 암기카드",
    badge: "FLIPCARDS",
    accent: "from-pink-500 via-fuchsia-500 to-violet-600",
    description:
      "전기기능사 핵심 343장. 앞면 문제 → 뒷면 해설로 빠르게 회독하세요. 진도 추적·과목 필터·복습 큐가 자동으로 관리됩니다.",
    shots: [
      {
        src: `${SHOTS}/flashcards-deck.webp`,
        alt: "플립카드 학습 화면",
        caption: "진도 0% → 343장 시작, 과목/카테고리 필터 지원",
      },
    ],
    tips: [
      "카드 클릭(또는 Space) → 앞↔뒤 뒤집기",
      "별·복습 필요 카테고리로 약점 카드 모아보기",
      "오늘 복습 큐가 자동 우선순위 정렬",
    ],
    href: "/flashcards",
    cta: "암기카드 열기",
  },
  cbt: {
    title: "CBT 모의고사",
    badge: "CBT",
    accent: "from-blue-500 via-indigo-500 to-indigo-700",
    description:
      "실전 시험과 동일한 환경에서 60문항 · 60분 타이머로 풀어보세요. 자동 채점·해설·약점 분석·오답 노트까지 한 자리에서. 시험장에 가기 전 실전 감각 점검.",
    shots: [
      {
        src: `${SHOTS}/cbt-landing.webp`,
        alt: "CBT 메인 화면",
        caption: "CBT 허브 — 모의고사·학습·오답노트로 분기",
      },
      {
        src: `${SHOTS}/cbt-exams.webp`,
        alt: "모의고사 목록 화면",
        caption: "회차별 모의고사 선택 → 응시·재응시·결과 확인",
      },
    ],
    tips: [
      "응시 중 우측 패널: 남은 시간·문항 진행도",
      "응시 종료 후 오답만 모아 한 번에 복습",
      "AI 해설(코치) — 환경변수 설정 시 활성",
    ],
    href: "/cbt",
    cta: "CBT 풀기",
  },
  news: {
    title: "별의 소식지",
    badge: "NEWS",
    accent: "from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    description:
      "같은 학습 내용을 인스타 피드·유튜브 채널·신문·잡지 등 50가지 친숙한 콘셉트로 재구성한 보조 채널. 딱딱한 이론을 친근한 매체로 한 번 더 만나며 자연스럽게 익숙해지세요.",
    shots: [
      {
        src: `${SHOTS}/news-list.webp`,
        alt: "소식지 목록 화면",
        caption: "50개 콘셉트를 카드로 — 끌리는 것부터 클릭",
      },
    ],
    tips: [
      "한 콘셉트당 1~2분 소요 — 부담 없이 틈틈이",
      "본 학습(시뮬·플립·CBT)의 보조용",
      "재방문 시 '이미 본 것 접기' 자동 적용",
    ],
    href: "/news",
    cta: "소식지 보기",
  },
};

type Props = {
  cardId: string;
};

export default function HubCardInfoButton({ cardId }: Props) {
  const [open, setOpen] = useState(false);
  const content = CONTENT[cardId];
  if (!content) return null;

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          // 카드 전체 Link 클릭과 분리 — 모달만 열기
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        aria-label={`${content.title} 기능 소개 열기`}
        className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-zinc-700 shadow-sm backdrop-blur-sm transition hover:bg-white hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M6 5.2v3M6 3.5v.01"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        자세히
      </button>
      <FeatureModal
        open={open}
        onClose={() => setOpen(false)}
        content={content}
      />
    </>
  );
}
