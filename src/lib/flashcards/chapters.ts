import type { Subject } from "./types";

/**
 * 전기기능사 필기 교재 표준 분류 — 과목당 8 챕터.
 * 카드 데이터의 `topic` 필드 값이 이 목록 안에 들어가야 챕터 그룹으로 표시됩니다.
 */
export const CHAPTERS: Record<Subject, string[]> = {
  전기이론: [
    "직류회로",
    "정전기",
    "자기·자기회로",
    "전자기 유도",
    "교류회로",
    "3상 교류",
    "비정현파 교류",
    "회로망 정리",
  ],
  전기기기: [
    "직류기",
    "변압기",
    "유도전동기",
    "동기기",
    "정류·전력변환",
    "제어기기",
    "특수기기",
    "시험·정격",
  ],
  전기설비: [
    "전선·케이블",
    "배선재료·공구",
    "배선공사",
    "옥내배선",
    "접지",
    "피뢰·보호",
    "차단기·보호장치",
    "변전·배전",
  ],
};

export const ALL_SUBJECTS: Subject[] = ["전기이론", "전기기기", "전기설비"];

/** 카드의 topic이 정의된 챕터 중 어디에 속하는지. 안 속하면 null. */
export function subjectOfChapter(chapter: string): Subject | null {
  for (const subject of ALL_SUBJECTS) {
    if (CHAPTERS[subject].includes(chapter)) return subject;
  }
  return null;
}
