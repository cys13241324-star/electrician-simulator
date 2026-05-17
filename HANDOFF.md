# 작업 핸드오프 (2026-05-17)

> 다음 세션에서 이 파일부터 읽으면 됩니다. 전기기능사 학습 서비스 멀티 저장소 작업 인수인계.

## 저장소 지도 (중요 — 작업 전 폴더·remote 확인)

| 폴더 | GitHub remote | 배포 | 용도 |
|---|---|---|---|
| `D:\webpage` | electrician-exam | (본사이트) | 원래 통합 사이트 (구버전 기능 보유) |
| `D:\webpage-simulator` | electrician-simulator | **electrician-simulator.vercel.app** | **현재 메인.** 시뮬+소식지+플립+CBT 전부 통합됨 |
| `D:\webpage-flashcards` | electrician-flashcards | 미연결 | 플립카드 343장 원본(백업) |
| `D:\webpage-cbt` | electrician-cbt | 미연결 | CBT 원본(백업) |

→ 실서비스는 **webpage-simulator 하나**로 통합 완료. flashcards/cbt 저장소는 백업용.

## 이번 세션 완료된 것 (전부 커밋·푸시됨)

- **플립카드 343장 확장**: webpage-flashcards `1c6478d` (전기이론88+전기기기95+전기설비97+기존63), 24챕터 표준분류
- **통합**: 플립카드·CBT를 webpage-simulator로 통합 `8b309c9` → 한 사이트에서 `/flashcards` `/cbt` `/simulator` `/news` `/hub` 전부 열림 (113 페이지 빌드 정상)
- **허브 정리**: `/hub` 죽은 링크 제거+상태모델 `af3680c`, 통합 후 내부링크 연결 `8b309c9`
- **첫 화면**: `/` → `/hub` 리다이렉트 `4f18be5` (`src/app/page.tsx`)
- **QA 루프 완료·종료**: 시뮬레이터 고아 5/5 등록, 등록부↔HTML 98:98 전수일치, 공식·구조 무결성 전부 통과 `9b2d310` (QA_PROGRESS.md 참고)
- **멀티에이전트 디벨롭 사이클1**: 시뮬 `9eb1903` / CBT `087dcad` / 플립 `1ad52fd` UX 디벨롭 + QA-1·QA-2 통과
- **소식지**: 75→50개 정리 + 매니페스토 + 톤다운 + 재방문자 접기 + Pexels 카드 커버·가독성
- **허브 이미지**: `68865f3` Pexels 7장 + 4겹 가독성 레이어

## 소식지 콘텐츠 페이지 실사진 교체 — ✅ 완료 (2026-05-17)

3그룹 에이전트 전부 통합·푸시·빌드검증 완료:
- **B그룹** `afbb2ce` — magazine(화보12)·movie·kakao·passport, 17이미지
- **C그룹** `47b4afa` — recipe·photo-studio, 3이미지
- **A그룹** `7b10527` — airbnb·auction·food-delivery 등 9개, 25이미지
- 총 ~45 신규 이미지(~3.3MB), `public/news/img/`, 출처 `CREDITS-A/B/C.md`
- 원칙: photo-role 자리만 실사진, UI 골격·테마·동적SVG·명명인물·정보아이콘은 의도적 보존(스킵 다수 — 매체 패러디 SVG아트가 곧 디자인)
- 전체 `npm run build` 통과(/news 정상), 작업트리 클린
- 참고 함정(다음에 또 Pexels 쓸 때): 일반 node는 `.env.local` 자동로드 안 함 → 파일 직접 파싱해 `PEXELS_API_KEY` 읽을 것. 키는 `.env.local` 에 정상 존재(gitignore, 커밋·노출 금지).
- 미추적 잡파일(`0002.png`, `src/app/*/_fetch-*.mjs`)은 수집 스크립트·스샷 — 배포 무관, 커밋 안 함.

## 열린 스레드 (기억할 것)

- **UX 프로토타입 보관**: `git stash@{0}` 에 휘트스톤 우측 sticky 컨트롤 프로토타입. 시뮬 컨트롤이 스크롤해야 보이는 문제 → 사용자와 함께 보완 예정([[project-simulator-control-ux]] 메모리).
- **CBT AI 기능**: `/api/ai/coach`·`explain` 은 Vercel 환경변수 `GOOGLE_GENERATIVE_AI_API_KEY` 설정해야 작동(빌드·핵심기능엔 무관).
- **소식지 고아 HTML**: 카드 없는 news-*.html 5개(graduation-album 등) — 정리할지 미정.
- **루프**: 전부 종료됨. QA 루프 정상 완료 종료, 멀티에이전트 오케스트레이션 루프도 사용자 지시로 마무리 — **재예약 안 함, 도는 것 없음**. (이전에 걸린 ScheduleWakeup 1건이 한 번 깨어날 수 있으나 새 작업 없이 종료됨.)
- **소식지 실사진 교체 완료** — 위 섹션 참고. 더 손댈 미완 작업 없음.

## 재개 방법

1. 이 파일 + `QA_PROGRESS.md` + Claude 메모리(MEMORY.md) 확인
2. 소식지 실사진 교체가 미완이면: webpage-simulator `git status` 로 에이전트 미커밋분 확인 → 그룹별 검증(U+FFFD 0, 빌드) 후 타깃 커밋·푸시, 또는 깨끗하면 재투입(키 파싱법 위 함정 참고)
3. 전체 `npm run build` 통과 확인 후 푸시 → electrician-simulator.vercel.app 자동 재배포
