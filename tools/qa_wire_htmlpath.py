"""QA iter1: available 상태인데 htmlPath 누락된 등록부 항목에 htmlPath 연결.

simulators.ts 를 엔트리 블록 단위로 파싱해서, 대상 id 이고 htmlPath 가
없으면 status 라인 바로 뒤에 htmlPath 를 삽입한다. UTF-8 명시 처리.
"""
import re
import sys
import pathlib

SRC = pathlib.Path("src/lib/simulators.ts")
text = SRC.read_text(encoding="utf-8")
lines = text.split("\n")

# 고아 HTML 파일에서 도출한 대상 id (flashcards 제외 — 시뮬레이터 아님)
targets = {
    "arc-furnace", "capacitor-series-parallel", "capacitor", "current-divider",
    "eddy-current", "electroplating", "faraday-law", "hall-effect", "hysteresis",
    "impedance-vector", "inductor-series-parallel", "inductor", "lenz-law",
    "norton", "rc-transient", "rl-transient", "rms-average",
    "single-phase-induction", "solenoid-field", "superposition", "thevenin",
    "three-phase-power", "toroidal-field", "transformer-inrush", "voltage-divider",
}

out = []
i = 0
fixed = []
skipped_has_path = []
not_found = set(targets)
n = len(lines)
while i < n:
    line = lines[i]
    m = re.match(r'\s+id: "([^"]+)",\s*$', line)
    if not m or m.group(1) not in targets:
        out.append(line)
        i += 1
        continue
    sid = m.group(1)
    not_found.discard(sid)
    # 이 엔트리의 끝(다음 "  }," )까지 수집
    entry = [line]
    j = i + 1
    while j < n and not re.match(r'\s+\},\s*$', lines[j]):
        entry.append(lines[j])
        j += 1
    if j < n:
        entry.append(lines[j])  # 닫는 },
    block = "\n".join(entry)
    if "htmlPath:" in block:
        skipped_has_path.append(sid)
        out.extend(entry)
    else:
        # status 라인 뒤에 htmlPath 삽입
        inserted = False
        for k, e in enumerate(entry):
            out.append(e)
            if not inserted and re.match(r'\s+status: "[^"]+",\s*$', e):
                indent = re.match(r'(\s+)', e).group(1)
                out.append(f'{indent}htmlPath: "/samples/simulator-{sid}.html",')
                inserted = True
        if inserted:
            fixed.append(sid)
        else:
            # status 라인이 없으면 변경 없이 그대로 둠 (안전)
            skipped_has_path.append(sid + "(no-status)")
    i = j + 1

SRC.write_text("\n".join(out), encoding="utf-8")
print(f"fixed ({len(fixed)}): {sorted(fixed)}")
print(f"already had htmlPath / skipped ({len(skipped_has_path)}): {sorted(skipped_has_path)}")
print(f"id not found in registry ({len(not_found)}): {sorted(not_found)}")
