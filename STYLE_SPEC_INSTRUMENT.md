# 계측기 톤 스타일 기준 (Instrument Tone) — 시뮬레이터 공용 표준

> 승인 기준작(canonical reference): `public/samples/simulator-circuit-builder.html`
> 새 시뮬을 이 톤으로 변환할 때 **반드시 circuit-builder.html을 먼저 Read** 해서 그대로 따른다.
> 목표 인상: "게이밍 네온"이 아니라 **Falstad circuitjs / LTspice / Multisim / 오실로스코프 계측 장비** 같은 전문 엔지니어링 도구.

## 반드시 적용 (DO)
- `<head>`: `<link rel="stylesheet" href="/samples/_tailwind.css">` 유지, MathJax + GSAP CDN 유지(수식·차분한 모션).
- 배경: 보라 우주 그라데이션·`.stars` 별 반짝임 **완전 제거**. 대신 그래파이트 `linear-gradient(180deg,#11161d,#0d1117)`.
- CSS 변수 팔레트(circuit-builder의 `:root` 그대로 차용):
  `--bg-0:#0d1117; --bg-1:#11161d; --panel:#131922; --panel-2:#161d27;`
  `--border:rgba(148,163,184,0.16); --border-soft:rgba(148,163,184,0.10);`
  `--grid:rgba(125,211,252,0.055); --grid-strong:rgba(125,211,252,0.10);`
  `--teal:#5eddd6; --amber:#e0a458; --slate-txt:#c4ccd6; --ink:#aab4c0;`
- 시각화 캔버스/도면 영역: `#0b0f15` 바탕 + **오실로스코프 모눈 그리드**(20px 미세 + 100px 강조, circuit-builder의 `#circuit` background 규칙 복붙).
- 패널: 글래스모피즘·네온 그라데이션 보더 제거 → `.instrument` 솔리드 카드(차분한 1px 보더, 약한 inset/elevation).
- 선/그래프: 두꺼운 레이저 글로우·형광 점선·강한 drop-shadow 제거 → 정밀한 얇은 선(1.4~1.8px). 흐름 표현은 SPICE풍 절제된 작은 이동 점만(아주 약한 글로우만 허용).
- 수치 readout: 모노스페이스(멀티미터/스코프 디스플레이 톤). 슬라이더는 회색 트랙 + 무채색 thumb.
- 모션: GSAP 진입은 남기되 차분하게(튀는 bounce·과한 stagger 금지). pulseRing/twinkle 류 과한 마이크로 인터랙션 제거 또는 아주 은은하게.
- 색: 네온 난사 금지. 절제된 계측 팔레트(청록 teal/호박 amber/연회색) + 상태색만 포인트. 가독성 최우선.

## 절대 금지 (DON'T)
- 계산식·수치·물리 로직·시뮬 기능 변경 금지. **표현/스타일/도면 좌표만** 변경.
- 한글 깨짐 금지: 반드시 Read→Edit/Write 도구만 사용. PowerShell Get-Content/Set-Content 금지.
- `<link _tailwind.css>` 제거 금지. 단일 자기완결 HTML 유지.
- 도면에서 선·심볼 동일선상 겹침(collinear overlap) 금지 — 깨끗한 스키매틱.
- git commit/push 금지(사용자 로컬 검수 후 일괄).

## 변환 후 자가검증
1. `grep -c $'�' 파일` == 0 (인코딩 깨짐 없음)
2. `<script>` 문법 OK(node 파싱), html/body/태그 균형
3. 기능·계산 로직 무변경 트레이스
4. 라우트 200: `http://localhost:3000/simulator/<id>`
