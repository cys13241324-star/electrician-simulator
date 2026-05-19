# 계측기 톤 전체 전환 진행 추적

기준: `STYLE_SPEC_INSTRUMENT.md` / 캐논 레퍼런스: `simulator-circuit-builder.html`
규칙: 로컬만(커밋·푸시 X), 표현만 변경(계산·기능 불변), 한글 UTF-8 보존.
모드: **전부 자율 완주 후 일괄 보고** (사용자 지시). 표기 [x] 완료 / [ ] 대기

## ✅ 기준작
- [x] circuit-builder — 계측기 톤 + 병렬회로 버그수정 (사용자 승인)

## Wave 1 (24) ✅ 완료 (U+FFFD 0, twinkle 0)
circuit-breaker, grounding, ohms-law, kirchhoff, voltage-divider, current-divider, series-parallel, thevenin, norton, superposition, max-power-transfer, rc-transient, rl-transient, rlc-resonance, capacitor, inductor, capacitor-series-parallel, inductor-series-parallel, electric-field, faraday-law, lenz-law, hall-effect, impedance-vector, rms-average

## Wave 2 (25) — 자계·전력전자·측정  ✅ 완료 (U+FFFD 0, twinkle 0, 라우트 200)
A: electromagnet, solenoid-field, toroidal-field, eddy-current, hysteresis, skin-effect, parallel-wires, electroplating
B: power-factor, three-phase-power, three-phase-imbalance, harmonic-thd, harmonic-filter, buck-boost-converter, dc-motor-pwm, igbt-switching
C: multimeter, clamp-meter, wattmeter, wheatstone-bridge, insulation-test, earth-tester, smart-meter, thermal-imaging, fault-analysis

## Wave 3 (24) — 전기설비/계통/기기 ①  ✅ 완료 (U+FFFD 0, 라우트 200; C배치 6개는 .stars{display:none} 무력화 방식 — 시각 동일)
A: arc-flash, arc-furnace, autotransformer, dc-machine-types, dc-machine, distance-relay, earth-leakage-body, earthing-system
B: ess-bess, ev-charger, fuel-cell, fuse-curve, gis-substation, induction-motor, lightning-arrester, microgrid
C: motor-speed-control, motor-starting, oltc, partial-discharge, plc-ladder, pumped-storage, regenerative-braking, relay-protection

## Wave 4 (24) — 전기기기·변압기·신재생 ②  ✅ 완료 (U+FFFD 0, 라우트 200)
A: safety-elcb, scott-connection, single-phase-induction, solar-pv-mppt, star-delta-starter, statcom, svc, synchronizing
B: synchronous-condenser, synchronous, thermal-overload, transformer-connection, transformer-cooling, transformer-efficiency, transformer-inrush, transformer-ratio
C: transformer-tap, transmission-loss, ups-system, vector-group, wind-turbine, wire-size, wireless-power, wiring-practice

## 로그
- Wave 1 완료: 24/24, U+FFFD 0, 라우트 200, twinkle 잔존 0
- 별건 완료: 플립카드 다음카드 버그 수정(FlashcardApp deck 재생성 의존성 분리), CBT 대시보드 삼각형스탯 제거+정리
