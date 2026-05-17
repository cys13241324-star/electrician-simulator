# 시뮬레이터 품질 점검 (QA) 진행 현황

자가 진행 루프가 관리하는 파일. 매 iteration마다 갱신·커밋.

## ⚙️ 루프 운영 규칙 (매 iteration 필수 준수)

1. 점검·수정 후 변경분을 커밋한다.
2. **커밋 직후 반드시 `git -C D:\webpage-simulator push origin main` 실행** —
   사용자 요청(2026-05-17): 매 iteration 결과를 GitHub에 즉시 반영.
   (이 저장소는 Vercel 자동배포 연결 가능성 있음 → 푸시 시 재배포될 수 있음, 의도된 동작)
3. push 실패 시(인증·충돌 등) 루프를 멈추지 말고, QA_PROGRESS.md에 실패 사실을
   기록한 뒤 다음 iteration 계속 진행. 사용자가 다음 응답에서 볼 수 있게 보고.

## 점검 항목
1. `simulators.ts` 등록부 ↔ 실제 HTML 파일 일치 (htmlPath 연결, 고아 파일)
2. HTML 구문/렌더 동작
3. 공식·계산 정확성
4. 발견 이슈 수정
5. **레이아웃 현황 기록만 (수정 금지)** — 각 시뮬의 컨트롤 패널 배치를
   `[3col-우측 / 1col-스택 / 기타]` 로 분류해 아래 "레이아웃 인벤토리"에 적기.
   실제 UX 보완(우측 sticky 배치)은 루프 종료 후 사용자와 함께 진행 예정이므로
   루프는 절대 레이아웃을 변경하지 말 것 — 관찰·목록화만.

## 레이아웃 인벤토리 (관찰 전용, iteration마다 누적)
| 시뮬레이터 | 컨트롤 배치 | 비고 |
|---|---|---|
| (iteration 진행되며 채워짐) | | |

## 진행 로그

### Iteration 1 — 2026-05-17 — 등록부 일치 일괄 점검 ✅
- 발견: `available` 상태인데 `htmlPath` 누락된 항목 다수 (HTML은 존재하나 사이트에서 깨짐)
- 조치: **20개 항목에 `htmlPath` 연결** (capacitor, current-divider, faraday-law,
  inductor, lenz-law, norton, rc-transient, rl-transient, rms-average,
  solenoid-field, superposition, thevenin, three-phase-power, toroidal-field,
  voltage-divider, eddy-current, hysteresis, impedance-vector,
  capacitor-series-parallel, inductor-series-parallel)
- 도구: `tools/qa_wire_htmlpath.py` (UTF-8 안전, 멱등)
- 검증: diff=20삽입만, 한글 무결, U+FFFD 0, 중괄호 1508/1508 균형
- 상태: 완료

### ⚠️ 다음 iteration 대상 — 등록부 항목 자체가 없는 고아 HTML 5개
HTML 파일은 있으나 simulators.ts 에 id 항목이 아예 없어 완전 접근 불가:
- `simulator-arc-furnace.html`
- `simulator-electroplating.html`
- `simulator-hall-effect.html`
- `simulator-single-phase-induction.html`
- `simulator-transformer-inrush.html`
→ 각 HTML 내용을 읽어 제목·과목·토픽·공식·예제 메타데이터를 채운
  완전한 등록부 엔트리를 신규 추가해야 함 (iteration당 1개 권장).

## 남은 작업
- [ ] 위 고아 5개 → 등록부 엔트리 신규 추가 (iteration 2~6)
- [ ] 이후 시뮬레이터별 심층 점검(HTML 렌더·공식 검증) 순차 진행
- [ ] `flashcards.html` 은 시뮬레이터 아님 — 점검 대상 제외
