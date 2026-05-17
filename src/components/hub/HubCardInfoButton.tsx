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
      "전기력선·RLC 공진·회전 자계·변압기 — 슬라이더를 움직이면 수식과 파형이 바로 바뀝니다. 글로만 보던 이론을 직접 만져보며 익혀보세요. 시뮬레이터 98개로 전기이론·전기기기·전기설비를 모두 다룹니다.",
    shots: [
      {
        src: `${SHOTS}/simulator-list.webp`,
        alt: "시뮬레이터 목록 화면",
        caption: "과목별로 둘러보거나 검색으로 바로 찾기",
      },
      {
        src: `${SHOTS}/simulator-detail.webp`,
        alt: "옴의 법칙 시뮬 상세 화면",
        caption: "옴의 법칙 — 슬라이더로 V·R을 조절하면 I와 P가 곧바로 계산됩니다",
      },
    ],
    tips: [
      "검색창에 '공진', '옴' 같은 키워드를 넣으면 빠르게 찾을 수 있어요",
      "각 시뮬 페이지에는 예제·공식·설명이 함께 표시됩니다",
      "과목 필터로 원하는 분야의 시뮬만 좁혀 보세요",
    ],
    href: "/simulator",
    cta: "시뮬레이터 열기",
  },
  flipcard: {
    title: "플립 암기카드",
    badge: "FLIPCARDS",
    accent: "from-pink-500 via-fuchsia-500 to-violet-600",
    description:
      "전기기능사 핵심 391장을 앞면 문제 → 뒷면 해설로 빠르게 회독합니다. 진도와 과목 필터, 오늘 복습할 카드까지 알아서 챙겨줘요.",
    shots: [
      {
        src: `${SHOTS}/flashcards-deck.webp`,
        alt: "플립카드 학습 화면",
        caption: "진도 0%에서 출발해 과목·카테고리로 좁혀가며 학습",
      },
    ],
    tips: [
      "카드를 누르거나 Space 키로 앞뒤를 뒤집습니다",
      "별표·복습 필요 카드만 모아 약점을 집중 공략하세요",
      "오늘 복습할 카드는 자동으로 앞쪽에 모입니다",
    ],
    href: "/flashcards",
    cta: "암기카드 열기",
  },
  cbt: {
    title: "CBT 모의고사",
    badge: "CBT",
    accent: "from-blue-500 via-indigo-500 to-indigo-700",
    description:
      "실전 시험과 같은 환경에서 60문항·60분 타이머로 풀어보세요. 채점·해설·약점 분석·오답 노트까지 한 자리에서 끝납니다. 시험장 가기 전 감 잡기 좋아요.",
    shots: [
      {
        src: `${SHOTS}/cbt-landing.webp`,
        alt: "CBT 메인 화면",
        caption: "모의고사·학습·오답노트로 가는 입구",
      },
      {
        src: `${SHOTS}/cbt-exams.webp`,
        alt: "모의고사 목록 화면",
        caption: "회차별로 골라 응시하거나 결과를 다시 볼 수 있습니다",
      },
    ],
    tips: [
      "응시 중에는 우측 패널에서 남은 시간과 진행도를 확인할 수 있어요",
      "끝난 뒤에는 오답만 모아 한 번에 복습할 수 있습니다",
      "AI 해설(코치)은 환경변수 설정 시 사용 가능",
    ],
    href: "/cbt",
    cta: "CBT 풀기",
  },
  news: {
    title: "별의 소식지",
    badge: "NEWS",
    accent: "from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    description:
      "같은 학습 내용을 인스타 피드·유튜브·신문·잡지 같은 50가지 익숙한 형태로 다시 만나는 보조 채널입니다. 딱딱한 이론도 친근한 매체로 한 번 더 보면 자연스럽게 손에 익어요.",
    shots: [
      {
        src: `${SHOTS}/news-list.webp`,
        alt: "소식지 목록 화면",
        caption: "50개 콘셉트가 카드로. 끌리는 것부터 가볍게 들춰보세요",
      },
    ],
    tips: [
      "한 콘셉트당 1~2분이면 충분해요. 틈틈이 가볍게 보기 좋습니다",
      "메인 학습(시뮬·플립·CBT)을 보조하는 용도로 활용하세요",
      "다시 방문하면 이미 본 콘텐츠는 자동으로 접힙니다",
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
