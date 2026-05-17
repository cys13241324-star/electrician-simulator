export type Subject = "전기이론" | "전기기기" | "전기설비";

export type SimulatorExample = {
  question: string;
  given: string[];
  solution: string[];
  answer: string;
};

export type SimulatorFormula = {
  name: string;
  expression: string;
  meaning: string;
};

export type Simulator = {
  id: string;
  title: string;
  description: string;
  subject: Subject;
  topic: string;
  status: "available" | "coming_soon";
  htmlPath?: string;
  emoji: string;
  formula?: SimulatorFormula[];
  example?: SimulatorExample;
};

/**
 * 수식은 $...$로 감싸 LaTeX 문법 사용.
 * MathText/InlineMath 컴포넌트가 렌더 처리.
 */

export const simulators: Simulator[] = [
  // 전기이론
  {
    id: "electric-field",
    title: "전기력선",
    description:
      "두 점전하에 의한 전기력선의 분포와 전기장의 세기를 마우스로 조작하며 시각적으로 익혀보세요.",
    subject: "전기이론",
    topic: "정전기",
    status: "available",
    htmlPath: "/samples/simulator-electric-field.html",
    emoji: "⚡",
    formula: [
      {
        name: "쿨롱의 법칙",
        expression: "$F = k \\cdot \\dfrac{Q_1 \\cdot Q_2}{r^2}$",
        meaning: "두 점전하 사이의 힘. $k = 9 \\times 10^9$ [N·m²/C²]",
      },
      {
        name: "전기장의 세기",
        expression: "$E = \\dfrac{F}{q} = \\dfrac{kQ}{r^2}$",
        meaning: "단위 양전하가 받는 힘. 단위 [V/m]",
      },
    ],
    example: {
      question:
        "거리가 0.1 m 떨어진 두 점전하 $Q_1 = 2\\ \\mu\\text{C}$, $Q_2 = 3\\ \\mu\\text{C}$ 사이에 작용하는 정전기력은 몇 N인가?",
      given: [
        "$Q_1 = 2 \\times 10^{-6}$ C",
        "$Q_2 = 3 \\times 10^{-6}$ C",
        "$r = 0.1$ m",
        "$k = 9 \\times 10^9$ N·m²/C²",
      ],
      solution: [
        "$F = k \\cdot \\dfrac{Q_1 \\cdot Q_2}{r^2}$",
        "$F = (9 \\times 10^9) \\times \\dfrac{2 \\times 10^{-6} \\cdot 3 \\times 10^{-6}}{0.1^2}$",
        "$F = (9 \\times 10^9) \\times \\dfrac{6 \\times 10^{-12}}{0.01}$",
        "$F = 5.4$ N",
      ],
      answer: "$F = 5.4$ N",
    },
  },
  {
    id: "parallel-wires",
    title: "평행도선의 자기력",
    description:
      "평행하게 놓인 두 도선에 흐르는 전류의 방향과 크기에 따라 변하는 자기력 작용을 확인합니다.",
    subject: "전기이론",
    topic: "자기·자기회로",
    status: "available",
    htmlPath: "/samples/simulator-parallel-wires.html",
    emoji: "🧲",
    formula: [
      {
        name: "단위 길이당 힘",
        expression: "$\\dfrac{F}{L} = \\dfrac{\\mu_0 \\cdot I_1 \\cdot I_2}{2\\pi \\cdot d}$",
        meaning:
          "$\\mu_0 = 4\\pi \\times 10^{-7}$ H/m. 같은 방향 → 흡인, 반대 → 반발",
      },
    ],
    example: {
      question:
        "거리 0.5 m 떨어진 두 평행 도선에 각각 10 A씩 같은 방향으로 흐를 때, 단위 길이당 작용하는 힘은?",
      given: ["$I_1 = I_2 = 10$ A", "$d = 0.5$ m", "$\\mu_0 = 4\\pi \\times 10^{-7}$ H/m"],
      solution: [
        "$\\dfrac{F}{L} = \\dfrac{\\mu_0 I_1 I_2}{2\\pi d}$",
        "$\\dfrac{F}{L} = \\dfrac{4\\pi \\times 10^{-7} \\times 10 \\times 10}{2\\pi \\times 0.5}$",
        "$\\dfrac{F}{L} = \\dfrac{4 \\times 10^{-5}}{1}$",
        "$\\dfrac{F}{L} = 4 \\times 10^{-5}$ N/m (흡인)",
      ],
      answer: "$\\dfrac{F}{L} = 4 \\times 10^{-5}$ N/m (흡인)",
    },
  },
  {
    id: "rlc-resonance",
    title: "RLC 공진 회로",
    description:
      "주파수에 따른 임피던스 변화와 공진점에서의 전류·전압 응답을 그래프로 관찰합니다.",
    subject: "전기이론",
    topic: "교류회로",
    status: "available",
    htmlPath: "/samples/simulator-rlc-resonance.html",
    emoji: "📈",
    formula: [
      {
        name: "공진 주파수",
        expression: "$f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}}$",
        meaning: "$X_L = X_C$ 가 되는 주파수, 임피던스가 R로 최소",
      },
      {
        name: "Q 인자 (선택도)",
        expression: "$Q = \\dfrac{1}{R}\\sqrt{\\dfrac{L}{C}}$",
        meaning: "공진의 날카로움. Q가 클수록 좁고 뾰족한 공진",
      },
      {
        name: "임피던스",
        expression: "$|Z| = \\sqrt{R^2 + (X_L - X_C)^2}$",
        meaning: "$X_L = \\omega L$, $X_C = \\dfrac{1}{\\omega C}$",
      },
    ],
    example: {
      question:
        "$L = 10$ mH, $C = 10\\ \\mu$F인 직렬 RLC 회로의 공진 주파수 $f_0$는 약 몇 Hz인가?",
      given: ["$L = 10 \\times 10^{-3}$ H", "$C = 10 \\times 10^{-6}$ F"],
      solution: [
        "$f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}}$",
        "$LC = 10^{-2} \\times 10^{-5} = 10^{-7}$",
        "$\\sqrt{LC} = 3.16 \\times 10^{-4}$",
        "$f_0 = \\dfrac{1}{2\\pi \\times 3.16 \\times 10^{-4}} \\approx 503$ Hz",
      ],
      answer: "약 503 Hz",
    },
  },
  {
    id: "circuit-builder",
    title: "회로 종합 분석",
    description:
      "단일·직렬·병렬·직병렬 5가지 회로 패턴에서 옴의 법칙·KCL·KVL·전압분배·전류분배를 한 화면에서 검증하며 학습합니다.",
    subject: "전기이론",
    topic: "직류회로",
    status: "available",
    htmlPath: "/samples/simulator-circuit-builder.html",
    emoji: "🔧",
    formula: [
      {
        name: "옴의 법칙",
        expression: "$V = I \\cdot R$",
        meaning: "전압·전류·저항 중 둘을 알면 나머지가 결정",
      },
      {
        name: "직렬 합성",
        expression: "$R = R_1 + R_2 + \\cdots$",
        meaning: "전류 동일, 전압 분배",
      },
      {
        name: "병렬 합성",
        expression: "$\\dfrac{1}{R} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\cdots$",
        meaning: "전압 동일, 전류 분배",
      },
      {
        name: "KCL · KVL",
        expression: "$\\sum I_{in} = \\sum I_{out}, \\quad \\sum V_{loop} = 0$",
        meaning: "분기점·폐회로에서 보존되는 두 법칙",
      },
    ],
    example: {
      question:
        "$V = 12$ V, $R_1 = 10\\ \\Omega$ 직렬 + ($R_2 = 20\\ \\Omega \\parallel R_3 = 30\\ \\Omega$) 회로의 합성저항과 총 전류는?",
      given: [
        "$V = 12$ V",
        "$R_1 = 10\\ \\Omega$ (직렬)",
        "$R_2 = 20\\ \\Omega$, $R_3 = 30\\ \\Omega$ (병렬)",
      ],
      solution: [
        "$R_{23} = \\dfrac{R_2 \\cdot R_3}{R_2 + R_3} = \\dfrac{20 \\times 30}{50} = 12\\ \\Omega$",
        "$R = R_1 + R_{23} = 10 + 12 = 22\\ \\Omega$",
        "$I = \\dfrac{V}{R} = \\dfrac{12}{22} \\approx 0.545$ A",
      ],
      answer: "$R = 22\\ \\Omega$, $I \\approx 0.545$ A",
    },
  },
  {
    id: "series-parallel",
    title: "직병렬 회로",
    description:
      "저항을 직렬·병렬로 자유롭게 배치하고 전체 합성 저항과 전류 분배를 즉시 확인합니다.",
    subject: "전기이론",
    topic: "직류회로",
    status: "available",
    htmlPath: "/samples/simulator-series-parallel.html",
    emoji: "🔀",
    formula: [
      {
        name: "직렬 합성",
        expression: "$R = R_1 + R_2 + R_3$",
        meaning: "전류 동일, 전압 분배",
      },
      {
        name: "병렬 합성",
        expression: "$\\dfrac{1}{R} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\dfrac{1}{R_3}$",
        meaning: "전압 동일, 전류 분배",
      },
    ],
    example: {
      question:
        "10 Ω과 20 Ω의 저항이 병렬로 연결되어 12 V가 가해질 때 합성저항과 전체 전류는?",
      given: ["$R_1 = 10\\ \\Omega$", "$R_2 = 20\\ \\Omega$", "$V = 12$ V"],
      solution: [
        "$R = \\dfrac{R_1 \\cdot R_2}{R_1 + R_2} = \\dfrac{10 \\times 20}{10 + 20}$",
        "$R = \\dfrac{200}{30} \\approx 6.67\\ \\Omega$",
        "$I = \\dfrac{V}{R} = \\dfrac{12}{6.67} \\approx 1.8$ A",
      ],
      answer: "$R \\approx 6.67\\ \\Omega$, $I \\approx 1.8$ A",
    },
  },
  {
    id: "ohms-law",
    title: "옴의 법칙",
    description:
      "전압·전류·저항 중 두 변수를 잡으면 나머지가 즉시 계산됩니다. 전류 흐름 애니메이션으로 직관 강화.",
    subject: "전기이론",
    topic: "직류회로",
    status: "available",
    htmlPath: "/samples/simulator-ohms-law.html",
    emoji: "⚡",
    formula: [
      {
        name: "옴의 법칙",
        expression: "$V = I \\cdot R$",
        meaning: "$I = V/R$, $R = V/I$ 로 변형 가능",
      },
      {
        name: "전력 공식",
        expression: "$P = V \\cdot I = I^2 R = \\dfrac{V^2}{R}$",
        meaning: "단위는 와트 [W]",
      },
    ],
    example: {
      question: "저항 8 Ω에 24 V의 전압을 가했을 때 흐르는 전류와 소비전력은?",
      given: ["$V = 24$ V", "$R = 8\\ \\Omega$"],
      solution: [
        "$I = \\dfrac{V}{R} = \\dfrac{24}{8} = 3$ A",
        "$P = V \\cdot I = 24 \\times 3 = 72$ W",
      ],
      answer: "$I = 3$ A, $P = 72$ W",
    },
  },
  {
    id: "kirchhoff",
    title: "키르히호프 법칙 (KCL/KVL)",
    description:
      "병렬 회로의 분기점에서 KCL을, 폐회로 합으로 KVL을 동시에 검증합니다.",
    subject: "전기이론",
    topic: "직류회로",
    status: "available",
    htmlPath: "/samples/simulator-kirchhoff.html",
    emoji: "🔗",
    formula: [
      {
        name: "전류 법칙 (KCL)",
        expression: "$\\sum I_{in} = \\sum I_{out}$",
        meaning: "한 접점에서 들어가는 전류 = 나오는 전류",
      },
      {
        name: "전압 법칙 (KVL)",
        expression: "$\\sum V_{loop} = 0$",
        meaning: "폐회로 한 바퀴 전압 합은 0",
      },
    ],
    example: {
      question:
        "12 V 전압원에 $R_1 = 4\\ \\Omega$, $R_2 = 6\\ \\Omega$이 병렬로 연결되어 있다. 각 분기 전류와 전체 전류는?",
      given: ["$V = 12$ V", "$R_1 = 4\\ \\Omega$, $R_2 = 6\\ \\Omega$"],
      solution: [
        "병렬이므로 $V_{R_1} = V_{R_2} = 12$ V",
        "$I_1 = \\dfrac{V}{R_1} = \\dfrac{12}{4} = 3$ A",
        "$I_2 = \\dfrac{V}{R_2} = \\dfrac{12}{6} = 2$ A",
        "KCL → $I = I_1 + I_2 = 5$ A",
      ],
      answer: "$I_1 = 3$ A, $I_2 = 2$ A, $I = 5$ A",
    },
  },
  // 전기이론 — 추가 10종 (풀 메타데이터, 공식 + 예제 포함)
  {
    id: "voltage-divider",
    title: "전압분배 법칙",
    description:
      "직렬 저항회로에서 각 저항이 어떻게 전압을 나눠 가지는지 슬라이더로 직접 조작해 확인합니다.",
    subject: "전기이론",
    topic: "직류회로",
    status: "available",
    htmlPath: "/samples/simulator-voltage-divider.html",
    emoji: "📊",
    formula: [
      {
        name: "전압분배 공식",
        expression: "$V_n = V \\cdot \\dfrac{R_n}{R_1 + R_2 + \\cdots + R_k}$",
        meaning: "특정 저항에 걸리는 전압은 전체 저항 대비 비율만큼 분배",
      },
      {
        name: "두 저항 직렬",
        expression: "$V_1 = V \\cdot \\dfrac{R_1}{R_1 + R_2}$",
        meaning: "가장 자주 나오는 형태. $V_2$는 $R_2$로 치환",
      },
    ],
    example: {
      question:
        "12 V 전압원에 $R_1 = 4\\ \\Omega$과 $R_2 = 8\\ \\Omega$이 직렬로 연결되었을 때 $R_2$ 양단의 전압은?",
      given: ["$V = 12$ V", "$R_1 = 4\\ \\Omega$", "$R_2 = 8\\ \\Omega$"],
      solution: [
        "$V_2 = V \\cdot \\dfrac{R_2}{R_1 + R_2}$",
        "$V_2 = 12 \\times \\dfrac{8}{4 + 8}$",
        "$V_2 = 12 \\times \\dfrac{8}{12} = 8$ V",
      ],
      answer: "$V_2 = 8$ V",
    },
  },
  {
    id: "current-divider",
    title: "전류분배 법칙",
    description:
      "병렬회로에서 각 가지로 흐르는 전류 비율을 시각화. 저항이 작은 쪽에 더 많은 전류가 흐른다는 직관을 굳혀줍니다.",
    subject: "전기이론",
    topic: "직류회로",
    status: "available",
    htmlPath: "/samples/simulator-current-divider.html",
    emoji: "🔀",
    formula: [
      {
        name: "두 저항 병렬 분배",
        expression: "$I_1 = I \\cdot \\dfrac{R_2}{R_1 + R_2}$",
        meaning: "주의: 분자에 자신이 아닌 상대 저항이 옴 (반비례 관계)",
      },
      {
        name: "$N$개 병렬 일반식",
        expression: "$I_n = I \\cdot \\dfrac{1/R_n}{\\sum 1/R_k}$",
        meaning: "컨덕턴스 $G = 1/R$에 비례",
      },
    ],
    example: {
      question:
        "전체 전류 6 A가 흐르는 회로에 $R_1 = 2\\ \\Omega$, $R_2 = 4\\ \\Omega$이 병렬일 때 $R_1$에 흐르는 전류는?",
      given: ["$I = 6$ A", "$R_1 = 2\\ \\Omega$", "$R_2 = 4\\ \\Omega$"],
      solution: [
        "$I_1 = I \\cdot \\dfrac{R_2}{R_1 + R_2}$",
        "$I_1 = 6 \\times \\dfrac{4}{2 + 4}$",
        "$I_1 = 6 \\times \\dfrac{4}{6} = 4$ A",
      ],
      answer: "$I_1 = 4$ A",
    },
  },
  {
    id: "capacitor",
    title: "정전용량 (커패시터)",
    description:
      "극판 면적·간격·유전체에 따른 정전용량 변화와 충전된 전하·에너지를 함께 학습합니다.",
    subject: "전기이론",
    topic: "정전기",
    status: "available",
    htmlPath: "/samples/simulator-capacitor.html",
    emoji: "🔋",
    formula: [
      {
        name: "정전용량",
        expression: "$C = \\dfrac{Q}{V} = \\dfrac{\\varepsilon A}{d}$",
        meaning: "$\\varepsilon$ 유전율, $A$ 극판 면적, $d$ 극판 간격",
      },
      {
        name: "축적 에너지",
        expression: "$W = \\dfrac{1}{2} C V^2 = \\dfrac{Q^2}{2C}$",
        meaning: "전기장 안에 저장되는 에너지 [J]",
      },
    ],
    example: {
      question:
        "정전용량 $C = 100\\ \\mu$F의 커패시터에 50 V를 인가했을 때 축적되는 전하량과 에너지는?",
      given: ["$C = 100 \\times 10^{-6}$ F", "$V = 50$ V"],
      solution: [
        "$Q = CV = 100 \\times 10^{-6} \\times 50 = 5 \\times 10^{-3}$ C",
        "$W = \\dfrac{1}{2}CV^2 = \\dfrac{1}{2} \\times 10^{-4} \\times 2500$",
        "$W = 0.125$ J",
      ],
      answer: "$Q = 5$ mC, $W = 0.125$ J",
    },
  },
  {
    id: "inductor",
    title: "인덕턴스",
    description:
      "코일에 흐르는 전류 변화가 만들어내는 유도 기전력과 코일에 저장되는 자기 에너지를 시각화합니다.",
    subject: "전기이론",
    topic: "자기·자기회로",
    status: "available",
    htmlPath: "/samples/simulator-inductor.html",
    emoji: "🌀",
    formula: [
      {
        name: "자기 인덕턴스",
        expression: "$L = \\dfrac{N \\Phi}{I}$",
        meaning: "$N$ 권수, $\\Phi$ 자속, 단위 [H]",
      },
      {
        name: "유도 기전력",
        expression: "$e = -L \\dfrac{dI}{dt}$",
        meaning: "전류 변화율에 비례, 부호는 변화에 대항(렌츠)",
      },
      {
        name: "축적 에너지",
        expression: "$W = \\dfrac{1}{2} L I^2$",
        meaning: "자기장 안에 저장 [J]",
      },
    ],
    example: {
      question:
        "$L = 0.5$ H 코일에 흐르는 전류가 0.01초 동안 2 A에서 6 A로 변할 때 유도 기전력 크기는?",
      given: ["$L = 0.5$ H", "$dI = 4$ A", "$dt = 0.01$ s"],
      solution: [
        "$|e| = L \\dfrac{dI}{dt} = 0.5 \\times \\dfrac{4}{0.01}$",
        "$|e| = 0.5 \\times 400 = 200$ V",
      ],
      answer: "$|e| = 200$ V",
    },
  },
  {
    id: "rc-transient",
    title: "RC 과도현상 (시정수)",
    description:
      "저항과 커패시터가 직렬일 때 충전·방전 곡선과 시정수 $\\tau = RC$의 의미를 그래프로 익힙니다.",
    subject: "전기이론",
    topic: "회로망 정리",
    status: "available",
    htmlPath: "/samples/simulator-rc-transient.html",
    emoji: "📉",
    formula: [
      {
        name: "시정수",
        expression: "$\\tau = R \\cdot C$",
        meaning: "$\\tau$ 시간이 지나면 최종값의 63.2% 도달",
      },
      {
        name: "충전 전압",
        expression: "$v_C(t) = V \\left(1 - e^{-t/\\tau}\\right)$",
        meaning: "$5\\tau$ 시점에 약 99% 도달 (실용적 정상상태)",
      },
      {
        name: "방전 전압",
        expression: "$v_C(t) = V_0 \\cdot e^{-t/\\tau}$",
        meaning: "초기 전압 $V_0$에서 지수 감쇠",
      },
    ],
    example: {
      question:
        "$R = 1\\ k\\Omega$, $C = 100\\ \\mu$F의 RC 회로에 10 V를 인가한 직후 시정수와 1 시정수 후의 전압은?",
      given: ["$R = 10^3\\ \\Omega$", "$C = 10^{-4}$ F", "$V = 10$ V"],
      solution: [
        "$\\tau = RC = 10^3 \\times 10^{-4} = 0.1$ s",
        "$v_C(\\tau) = V(1 - e^{-1}) = 10 \\times (1 - 0.368)$",
        "$v_C(\\tau) \\approx 6.32$ V",
      ],
      answer: "$\\tau = 0.1$ s, $v_C(\\tau) \\approx 6.32$ V",
    },
  },
  {
    id: "rl-transient",
    title: "RL 과도현상",
    description:
      "저항과 인덕터가 직렬일 때 전류가 0에서 정상값까지 도달하는 과정을 시정수와 함께 시각화합니다.",
    subject: "전기이론",
    topic: "회로망 정리",
    status: "available",
    htmlPath: "/samples/simulator-rl-transient.html",
    emoji: "📈",
    formula: [
      {
        name: "시정수",
        expression: "$\\tau = \\dfrac{L}{R}$",
        meaning: "RL 회로의 시정수. 단위 [s]",
      },
      {
        name: "전류 상승",
        expression: "$i(t) = \\dfrac{V}{R}\\left(1 - e^{-t/\\tau}\\right)$",
        meaning: "정상값 $V/R$로 수렴",
      },
    ],
    example: {
      question:
        "$L = 2$ H, $R = 100\\ \\Omega$, $V = 20$ V인 RL 회로에서 1 시정수 후의 전류값은?",
      given: ["$L = 2$ H", "$R = 100\\ \\Omega$", "$V = 20$ V"],
      solution: [
        "$\\tau = L/R = 2/100 = 0.02$ s",
        "$I_{max} = V/R = 20/100 = 0.2$ A",
        "$i(\\tau) = 0.2 \\times (1 - 0.368) = 0.2 \\times 0.632$",
        "$i(\\tau) \\approx 0.126$ A",
      ],
      answer: "$i(\\tau) \\approx 0.126$ A",
    },
  },
  {
    id: "rms-average",
    title: "실효값과 평균값",
    description:
      "정현파 교류의 최댓값·평균값·실효값의 관계를 파형 위에서 동시에 확인합니다.",
    subject: "전기이론",
    topic: "교류회로",
    status: "available",
    htmlPath: "/samples/simulator-rms-average.html",
    emoji: "〰️",
    formula: [
      {
        name: "실효값 (RMS)",
        expression: "$V_{rms} = \\dfrac{V_m}{\\sqrt{2}}$",
        meaning: "발열 효과 기준. 단상 220 V는 실효값",
      },
      {
        name: "평균값",
        expression: "$V_{avg} = \\dfrac{2 V_m}{\\pi}$",
        meaning: "반파 평균 기준 (전파정류 후 값)",
      },
      {
        name: "파형률 · 파고율",
        expression: "$\\text{파형률} = \\dfrac{V_{rms}}{V_{avg}}, \\ \\text{파고율} = \\dfrac{V_m}{V_{rms}}$",
        meaning: "정현파: 파형률 1.11, 파고율 1.414",
      },
    ],
    example: {
      question:
        "최댓값 311 V의 정현파 전압의 실효값과 평균값을 구하시오.",
      given: ["$V_m = 311$ V (정현파)"],
      solution: [
        "$V_{rms} = \\dfrac{V_m}{\\sqrt{2}} = \\dfrac{311}{1.414}$",
        "$V_{rms} \\approx 220$ V",
        "$V_{avg} = \\dfrac{2 V_m}{\\pi} = \\dfrac{622}{3.14}$",
        "$V_{avg} \\approx 198$ V",
      ],
      answer: "$V_{rms} \\approx 220$ V, $V_{avg} \\approx 198$ V",
    },
  },
  {
    id: "impedance-vector",
    title: "임피던스 벡터",
    description:
      "$R$, $X_L$, $X_C$를 벡터로 합성해 임피던스의 크기와 위상각을 직관적으로 이해합니다.",
    subject: "전기이론",
    topic: "교류회로",
    status: "available",
    htmlPath: "/samples/simulator-impedance-vector.html",
    emoji: "📐",
    formula: [
      {
        name: "임피던스 크기",
        expression: "$|Z| = \\sqrt{R^2 + (X_L - X_C)^2}$",
        meaning: "직각삼각형의 빗변과 동일한 구조",
      },
      {
        name: "위상각",
        expression: "$\\theta = \\tan^{-1}\\!\\dfrac{X_L - X_C}{R}$",
        meaning: "+면 유도성(전류 지상), −면 용량성(전류 진상)",
      },
      {
        name: "역률",
        expression: "$\\cos\\theta = \\dfrac{R}{|Z|}$",
        meaning: "유효전력 비율. 1에 가까울수록 효율적",
      },
    ],
    example: {
      question:
        "$R = 8\\ \\Omega$, $X_L = 12\\ \\Omega$, $X_C = 6\\ \\Omega$인 직렬 회로의 임피던스와 역률은?",
      given: ["$R = 8\\ \\Omega$", "$X_L = 12\\ \\Omega$", "$X_C = 6\\ \\Omega$"],
      solution: [
        "$X = X_L - X_C = 6\\ \\Omega$ (유도성)",
        "$|Z| = \\sqrt{8^2 + 6^2} = \\sqrt{100} = 10\\ \\Omega$",
        "$\\cos\\theta = 8/10 = 0.8$",
      ],
      answer: "$|Z| = 10\\ \\Omega$, 역률 0.8 (유도성)",
    },
  },
  {
    id: "faraday-law",
    title: "패러데이 전자유도 법칙",
    description:
      "코일 안의 자속 변화가 만들어내는 유도 기전력의 방향과 크기를 시각적으로 확인합니다.",
    subject: "전기이론",
    topic: "전자기 유도",
    status: "available",
    htmlPath: "/samples/simulator-faraday-law.html",
    emoji: "🧲",
    formula: [
      {
        name: "유도 기전력",
        expression: "$e = -N \\dfrac{d\\Phi}{dt}$",
        meaning: "$N$ 권수, 자속 변화율에 비례. 부호는 렌츠 법칙",
      },
      {
        name: "운동 기전력",
        expression: "$e = B L v$",
        meaning: "자장 $B$ 내 길이 $L$ 도체가 속도 $v$로 운동",
      },
    ],
    example: {
      question:
        "100회 감긴 코일을 통과하는 자속이 0.05초 동안 0.02 Wb에서 0.06 Wb로 증가했을 때 유도 기전력의 크기는?",
      given: ["$N = 100$", "$d\\Phi = 0.04$ Wb", "$dt = 0.05$ s"],
      solution: [
        "$|e| = N \\dfrac{d\\Phi}{dt}$",
        "$|e| = 100 \\times \\dfrac{0.04}{0.05}$",
        "$|e| = 100 \\times 0.8 = 80$ V",
      ],
      answer: "$|e| = 80$ V",
    },
  },
  {
    id: "three-phase-power",
    title: "3상 교류 전력",
    description:
      "Y/Δ 결선 모두에 통용되는 3상 전력 공식과 선간·상 전압·전류 관계를 실시간으로 비교합니다.",
    subject: "전기이론",
    topic: "교류회로",
    status: "available",
    htmlPath: "/samples/simulator-three-phase-power.html",
    emoji: "⚡",
    formula: [
      {
        name: "3상 유효전력",
        expression: "$P = \\sqrt{3}\\, V_L I_L \\cos\\theta$",
        meaning: "결선 방식과 무관 (선간·선전류 기준)",
      },
      {
        name: "3상 무효전력",
        expression: "$Q = \\sqrt{3}\\, V_L I_L \\sin\\theta$",
        meaning: "단위 [var]",
      },
      {
        name: "3상 피상전력",
        expression: "$S = \\sqrt{3}\\, V_L I_L$",
        meaning: "단위 [VA]. $S^2 = P^2 + Q^2$",
      },
    ],
    example: {
      question:
        "3상 380 V 평형 부하에 선전류 20 A, 역률 0.8 (지상)이 흐를 때 유효전력은?",
      given: ["$V_L = 380$ V", "$I_L = 20$ A", "$\\cos\\theta = 0.8$"],
      solution: [
        "$P = \\sqrt{3}\\, V_L I_L \\cos\\theta$",
        "$P = 1.732 \\times 380 \\times 20 \\times 0.8$",
        "$P \\approx 10{,}530$ W $\\approx 10.5$ kW",
      ],
      answer: "$P \\approx 10.5$ kW",
    },
  },
  // 전기이론 — 추가 10종 (템플릿, coming_soon)
  {
    id: "thevenin",
    title: "테브난 정리",
    description:
      "복잡한 회로를 등가 전압원과 등가 저항으로 단순화하는 테브난의 정리를 시각화합니다.",
    subject: "전기이론",
    topic: "회로망 정리",
    status: "available",
    htmlPath: "/samples/simulator-thevenin.html",
    emoji: "🧩",
  },
  {
    id: "norton",
    title: "노턴 정리",
    description:
      "테브난의 쌍대 정리. 등가 전류원과 병렬 저항으로 회로를 단순화합니다.",
    subject: "전기이론",
    topic: "회로망 정리",
    status: "available",
    htmlPath: "/samples/simulator-norton.html",
    emoji: "🔁",
  },
  {
    id: "superposition",
    title: "중첩의 원리",
    description:
      "전원이 여러 개인 선형 회로에서 각 전원이 단독으로 만드는 전류·전압의 합을 시각화합니다.",
    subject: "전기이론",
    topic: "회로망 정리",
    status: "available",
    htmlPath: "/samples/simulator-superposition.html",
    emoji: "🪞",
  },
  {
    id: "capacitor-series-parallel",
    title: "콘덴서 직병렬 합성",
    description:
      "여러 콘덴서를 직렬·병렬로 배치할 때 합성 용량과 전하 분배를 직관적으로 익힙니다.",
    subject: "전기이론",
    topic: "정전기",
    status: "available",
    htmlPath: "/samples/simulator-capacitor-series-parallel.html",
    emoji: "🔋",
  },
  {
    id: "inductor-series-parallel",
    title: "인덕터 직병렬 합성",
    description:
      "코일을 직렬·병렬로 연결할 때의 합성 인덕턴스를 슬라이더로 비교 학습합니다.",
    subject: "전기이론",
    topic: "자기·자기회로",
    status: "available",
    htmlPath: "/samples/simulator-inductor-series-parallel.html",
    emoji: "🌀",
  },
  {
    id: "solenoid-field",
    title: "솔레노이드 자기장",
    description:
      "솔레노이드 내부에 만들어지는 균일 자기장과 권선·전류·길이의 관계를 시각화합니다.",
    subject: "전기이론",
    topic: "자기·자기회로",
    status: "available",
    htmlPath: "/samples/simulator-solenoid-field.html",
    emoji: "🧲",
  },
  {
    id: "toroidal-field",
    title: "환상자계",
    description:
      "도넛 모양 코어에 권선을 감았을 때 만들어지는 자기장 분포를 색상으로 확인합니다.",
    subject: "전기이론",
    topic: "자기·자기회로",
    status: "available",
    htmlPath: "/samples/simulator-toroidal-field.html",
    emoji: "🍩",
  },
  {
    id: "lenz-law",
    title: "렌츠의 법칙",
    description:
      "유도 전류의 방향이 자속 변화에 어떻게 대항하는지 자석 운동과 함께 시각화합니다.",
    subject: "전기이론",
    topic: "전자기 유도",
    status: "available",
    htmlPath: "/samples/simulator-lenz-law.html",
    emoji: "↩️",
  },
  {
    id: "eddy-current",
    title: "와전류 현상",
    description:
      "도체 내부에 흐르는 와전류와 그로 인한 발열·제동 효과를 동영상 슬라이더로 살펴봅니다.",
    subject: "전기이론",
    topic: "전자기 유도",
    status: "available",
    htmlPath: "/samples/simulator-eddy-current.html",
    emoji: "🌪️",
  },
  {
    id: "hysteresis",
    title: "자기 히스테리시스",
    description:
      "자성 물질의 B-H 곡선과 잔류자기·보자력의 의미를 그래프로 학습합니다.",
    subject: "전기이론",
    topic: "자기·자기회로",
    status: "available",
    htmlPath: "/samples/simulator-hysteresis.html",
    emoji: "🔄",
  },
  // 전기기기
  {
    id: "transformer-ratio",
    title: "변압기 권수비",
    description:
      "1차/2차 권수와 부하를 조절하면서 권수비, 변압비, 전류비의 관계를 직관적으로 학습합니다.",
    subject: "전기기기",
    topic: "변압기",
    status: "available",
    htmlPath: "/samples/simulator-transformer-ratio.html",
    emoji: "🔁",
    formula: [
      {
        name: "권수비 / 변압비",
        expression: "$a = \\dfrac{N_1}{N_2} = \\dfrac{V_1}{V_2}$",
        meaning: "1차 권수와 2차 권수의 비",
      },
      {
        name: "전류비",
        expression: "$\\dfrac{I_2}{I_1} = \\dfrac{N_1}{N_2} = a$",
        meaning: "전류는 권수에 반비례",
      },
      {
        name: "임피던스비",
        expression: "$\\dfrac{Z_1}{Z_2} = a^2$",
        meaning: "1차에서 본 부하 임피던스",
      },
    ],
    example: {
      question:
        "1차 권수 $N_1 = 200$, 2차 권수 $N_2 = 100$인 변압기에 1차 220 V를 가했을 때 2차 단자전압은?",
      given: ["$N_1 = 200$", "$N_2 = 100$", "$V_1 = 220$ V"],
      solution: [
        "$a = \\dfrac{N_1}{N_2} = 2$",
        "$V_2 = \\dfrac{V_1}{a} = \\dfrac{220}{2} = 110$ V",
        "($N_1 > N_2$ → 강압)",
      ],
      answer: "$V_2 = 110$ V (강압)",
    },
  },
  {
    id: "transformer-connection",
    title: "변압기 결선 (Y/Δ)",
    description:
      "Y(성형)·Δ(삼각) 결선의 선간/상 전압·전류 관계를 그림과 함께 비교합니다.",
    subject: "전기기기",
    topic: "변압기",
    status: "available",
    htmlPath: "/samples/simulator-transformer-connection.html",
    emoji: "🔺",
    formula: [
      {
        name: "Y 결선 (성형)",
        expression: "$V_L = \\sqrt{3} \\cdot V_p$, $I_L = I_p$",
        meaning: "선간전압이 상전압의 $\\sqrt{3}$ 배",
      },
      {
        name: "Δ 결선 (삼각)",
        expression: "$V_L = V_p$, $I_L = \\sqrt{3} \\cdot I_p$",
        meaning: "선전류가 상전류의 $\\sqrt{3}$ 배",
      },
      {
        name: "3상 전력",
        expression: "$P = \\sqrt{3} \\cdot V_L \\cdot I_L \\cdot \\cos\\varphi$",
        meaning: "결선 방식과 무관하게 동일",
      },
    ],
    example: {
      question:
        "Y 결선된 3상 변압기에서 상전압 $V_p = 220$ V일 때 선간전압 $V_L$은?",
      given: ["$V_p = 220$ V", "결선: Y"],
      solution: [
        "$V_L = \\sqrt{3} \\times V_p$",
        "$V_L = 1.732 \\times 220 \\approx 381$ V",
      ],
      answer: "$V_L \\approx 381$ V",
    },
  },
  {
    id: "dc-machine",
    title: "직류기 동작 원리",
    description:
      "직류 발전기와 전동기의 회전 자장과 정류 동작을 애니메이션으로 따라가며 이해합니다.",
    subject: "전기기기",
    topic: "직류기",
    status: "available",
    htmlPath: "/samples/simulator-dc-machine.html",
    emoji: "⚙️",
    formula: [
      {
        name: "유도 기전력",
        expression: "$e = B \\cdot L \\cdot v \\cdot \\sin\\theta$",
        meaning: "회전 코일 한 변에 유기되는 전압",
      },
      {
        name: "직류 출력 (정류 후)",
        expression: "$E_{avg} = \\dfrac{2}{\\pi} \\cdot E_{max}$",
        meaning: "정류자가 매 반회전마다 극성을 뒤집어 직류로",
      },
    ],
    example: {
      question:
        "$B = 1.2$ T 자기장 속에서 길이 0.1 m 도체가 2 m/s 속도로 자기장과 수직으로 움직일 때 유도 기전력은?",
      given: ["$B = 1.2$ T", "$L = 0.1$ m", "$v = 2$ m/s", "$\\theta = 90°$"],
      solution: [
        "$e = B \\cdot L \\cdot v \\cdot \\sin\\theta$",
        "$e = 1.2 \\times 0.1 \\times 2 \\times \\sin 90°$",
        "$e = 0.24 \\times 1 = 0.24$ V",
      ],
      answer: "$e = 0.24$ V",
    },
  },
  {
    id: "induction-motor",
    title: "유도전동기 회전 자계",
    description:
      "3상 권선이 만드는 회전 자계와 슬립의 변화에 따른 토크 곡선을 시각화합니다.",
    subject: "전기기기",
    topic: "유도전동기",
    status: "available",
    htmlPath: "/samples/simulator-induction-motor.html",
    emoji: "🌀",
    formula: [
      {
        name: "동기 속도",
        expression: "$N_s = \\dfrac{120 \\cdot f}{P}$",
        meaning: "$f$ [Hz], $P$ 극수, 단위 [rpm]",
      },
      {
        name: "회전자 속도",
        expression: "$N = N_s \\cdot (1 - s)$",
        meaning: "$s$ = 슬립 ($0 < s < 1$)",
      },
      {
        name: "슬립",
        expression: "$s = \\dfrac{N_s - N}{N_s}$",
        meaning: "동기와 실제 회전속도의 차이 비율",
      },
    ],
    example: {
      question:
        "전원 주파수 60 Hz, 4극 유도전동기의 동기속도와 슬립 4%일 때 회전자 속도는?",
      given: ["$f = 60$ Hz", "$P = 4$ 극", "$s = 0.04$"],
      solution: [
        "$N_s = \\dfrac{120 \\times 60}{4} = 1800$ rpm",
        "$N = N_s(1 - s) = 1800 \\times 0.96 = 1728$ rpm",
      ],
      answer: "$N_s = 1800$ rpm, $N = 1728$ rpm",
    },
  },
  {
    id: "synchronous",
    title: "동기기 위상 (P-δ 곡선)",
    description:
      "동기 발전기의 부하각 변화에 따른 출력 전력과 동기 한계를 시각화합니다.",
    subject: "전기기기",
    topic: "동기기",
    status: "available",
    htmlPath: "/samples/simulator-synchronous.html",
    emoji: "⚙️",
    formula: [
      {
        name: "출력 전력",
        expression: "$P = \\dfrac{E \\cdot V}{X_s} \\cdot \\sin\\delta$",
        meaning: "$\\delta$ = 부하각 ($E$와 $V$ 사이의 위상차)",
      },
      {
        name: "최대 출력",
        expression: "$P_{max} = \\dfrac{E \\cdot V}{X_s}$",
        meaning: "$\\delta = 90°$에서 발생, 동기 한계",
      },
    ],
    example: {
      question:
        "유기 기전력 $E = 220$ V, 단자 전압 $V = 200$ V, 동기 임피던스 $X_s = 5\\ \\Omega$, 부하각 $\\delta = 30°$일 때 출력 전력은?",
      given: ["$E = 220$ V", "$V = 200$ V", "$X_s = 5\\ \\Omega$", "$\\delta = 30°$"],
      solution: [
        "$P = \\dfrac{E \\cdot V}{X_s} \\cdot \\sin\\delta$",
        "$P = \\dfrac{220 \\times 200}{5} \\times \\sin 30°$",
        "$P = 8800 \\times 0.5 = 4400$ W $= 4.4$ kW",
      ],
      answer: "$P \\approx 4.4$ kW",
    },
  },
  // 전기설비
  {
    id: "grounding",
    title: "접지 저항 측정",
    description:
      "전극 배치와 토양 저항률에 따른 접지 저항 값의 변화를 시뮬레이션으로 확인합니다.",
    subject: "전기설비",
    topic: "접지",
    status: "available",
    htmlPath: "/samples/simulator-grounding.html",
    emoji: "🌍",
    formula: [
      {
        name: "봉형 접지 저항",
        expression: "$R = \\dfrac{\\rho}{2\\pi L} \\cdot \\ln\\dfrac{4L}{d}$",
        meaning: "$\\rho$ [Ω·m] 토양 저항률, $L$ 길이, $d$ 직경",
      },
      {
        name: "판형 접지 저항",
        expression: "$R = \\dfrac{\\rho}{4\\sqrt{A/\\pi}}$",
        meaning: "$A$ 판 면적 [m²]",
      },
    ],
    example: {
      question:
        "토양 저항률 $\\rho = 100\\ \\Omega \\cdot$m, 길이 2 m, 직경 14 mm 봉형 접지 전극의 접지 저항은? (자연로그 ln 사용)",
      given: ["$\\rho = 100\\ \\Omega \\cdot$m", "$L = 2$ m", "$d = 0.014$ m"],
      solution: [
        "$R = \\dfrac{\\rho}{2\\pi L} \\cdot \\ln\\dfrac{4L}{d}$",
        "$R = \\dfrac{100}{12.57} \\times \\ln\\dfrac{8}{0.014}$",
        "$R \\approx 7.96 \\times \\ln(571)$",
        "$R \\approx 7.96 \\times 6.35 \\approx 50.5\\ \\Omega$",
      ],
      answer: "$R \\approx 50.5\\ \\Omega$",
    },
  },
  {
    id: "circuit-breaker",
    title: "차단기 동작",
    description:
      "과전류·단락 상황에서 차단기와 누전차단기가 어떻게 회로를 보호하는지 단계별로 살펴봅니다.",
    subject: "전기설비",
    topic: "차단기·보호장치",
    status: "available",
    htmlPath: "/samples/simulator-circuit-breaker.html",
    emoji: "🛡️",
    formula: [
      {
        name: "역시간 특성",
        expression: "$t = \\dfrac{K}{(I/I_n)^2 - 1}$",
        meaning: "$I$ 측정 전류, $I_n$ 정격, $K$ 차단기 종류별 상수",
      },
      {
        name: "단락 즉시 차단",
        expression: "$t \\leq 0.02$ s ($I/I_n \\geq 8$)",
        meaning: "정격의 8배 이상 단락 전류 시 즉시 트립",
      },
    ],
    example: {
      question:
        "정격 전류 20 A인 MCCB에 60 A (3배)의 과전류가 흐를 때 트립 예상 시간은? ($K = 60$)",
      given: ["$I_n = 20$ A", "$I = 60$ A → $I/I_n = 3$", "$K = 60$"],
      solution: [
        "$t = \\dfrac{K}{(I/I_n)^2 - 1}$",
        "$t = \\dfrac{60}{3^2 - 1} = \\dfrac{60}{8}$",
        "$t = 7.5$ 초",
      ],
      answer: "$t = 7.5$ 초",
    },
  },
  {
    id: "multimeter",
    title: "디지털 멀티미터",
    description:
      "디지털 멀티미터의 DC전압·AC전압·전류·저항·도통·다이오드 측정 모드와 단자 사용법을 익힙니다.",
    subject: "전기설비",
    topic: "배선재료·공구",
    status: "available",
    htmlPath: "/samples/simulator-multimeter.html",
    emoji: "📏",
    formula: [
      {
        name: "저항 측정 (옴의 법칙)",
        expression: "$R = \\dfrac{V}{I}$",
        meaning: "내부 정전류 $I$를 흘려 양단 전압 $V$를 읽어 환산",
      },
      {
        name: "측정 단자",
        expression: "$\\text{COM} + \\text{V}\\Omega / \\text{mA} / \\text{10A}$",
        meaning: "전류는 직렬, 전압·저항은 병렬. 단자 위치 오결선 시 퓨즈 단선",
      },
      {
        name: "AC 실효값 표시",
        expression: "$V_{\\text{rms}} = \\dfrac{V_m}{\\sqrt{2}}$",
        meaning: "True RMS 미터는 비정현파도 정확, 평균응답형은 정현파 가정",
      },
    ],
    example: {
      question:
        "DMM의 저항 모드에서 미지의 저항 양단에 1 mA의 정전류가 흐를 때 표시 전압이 4.7 V로 측정되었다면 저항값은?",
      given: ["$I = 1$ mA $= 10^{-3}$ A", "$V = 4.7$ V"],
      solution: [
        "$R = \\dfrac{V}{I}$",
        "$R = \\dfrac{4.7}{10^{-3}}$",
        "$R = 4{,}700\\ \\Omega = 4.7\\ k\\Omega$",
      ],
      answer: "$R = 4.7\\ k\\Omega$",
    },
  },
  {
    id: "safety-elcb",
    title: "누전차단기 (ELCB)",
    description:
      "누전차단기 동작 원리와 인체 감전 위험 단계, 정격 감도(15·30·100mA)별 차단 동작을 시뮬레이션.",
    subject: "전기설비",
    topic: "차단기·보호장치",
    status: "available",
    htmlPath: "/samples/simulator-safety-elcb.html",
    emoji: "🛡️",
    formula: [
      {
        name: "ZCT 영상전류",
        expression: "$\\Delta I = |I_{\\text{line}} - I_{\\text{neutral}}|$",
        meaning: "정상은 0, 누전 발생 시 차이만큼 검출. $\\Delta I \\geq I_{\\Delta n}$이면 트립",
      },
      {
        name: "인체 감전 전류",
        expression: "$I_{\\text{body}} = \\dfrac{V}{R_{\\text{body}} + R_{\\text{ground}}}$",
        meaning: "$R_{\\text{body}} \\approx 1{,}000\\ \\Omega$ 기준. 30 mA · 0.03 s 이내 차단 필수",
      },
      {
        name: "동작 시간",
        expression: "$t \\leq 0.03$ s ($I_{\\Delta n} = 30$ mA)",
        meaning: "고감도·고속형 기준. 인체 보호용은 30 mA / 30 ms 이하",
      },
    ],
    example: {
      question:
        "정격 감도 30 mA의 ELCB가 설치된 220 V 회로에서 누전으로 인체가 접촉했다. $R_{\\text{body}} = 1{,}000\\ \\Omega$, $R_{\\text{ground}} = 100\\ \\Omega$일 때 누설 전류와 차단기 동작 여부는?",
      given: [
        "$V = 220$ V",
        "$R_{\\text{body}} = 1{,}000\\ \\Omega$",
        "$R_{\\text{ground}} = 100\\ \\Omega$",
        "$I_{\\Delta n} = 30$ mA",
      ],
      solution: [
        "$I = \\dfrac{V}{R_{\\text{body}} + R_{\\text{ground}}}$",
        "$I = \\dfrac{220}{1{,}000 + 100} = \\dfrac{220}{1{,}100}$",
        "$I = 0.2$ A $= 200$ mA",
        "$200 > 30$ mA → 즉시 트립 (30 ms 이내)",
      ],
      answer: "$I = 200$ mA → 차단 동작 (인체 보호)",
    },
  },
  {
    id: "wire-size",
    title: "전선 굵기 선정 (KEC)",
    description:
      "허용 전류·전압 강하·기계적 강도 기준으로 KEC 표준 굵기(1.5/2.5/4/6/10/16/25 sq)를 선정합니다.",
    subject: "전기설비",
    topic: "전선·케이블",
    status: "available",
    htmlPath: "/samples/simulator-wire-size.html",
    emoji: "🔌",
    formula: [
      {
        name: "전압 강하 (단상 2선식)",
        expression: "$e = \\dfrac{35.6 \\cdot L \\cdot I}{1{,}000 \\cdot A}$",
        meaning: "$L$ [m] 거리, $I$ [A] 전류, $A$ [mm²] 단면적, $e$ [V] 전압 강하",
      },
      {
        name: "3상 3선식 전압 강하",
        expression: "$e = \\dfrac{30.8 \\cdot L \\cdot I}{1{,}000 \\cdot A}$",
        meaning: "선간 전압 강하 기준 (KEC 기준식)",
      },
      {
        name: "허용 강하율",
        expression: "$\\dfrac{e}{V} \\leq 0.02 \\sim 0.05$",
        meaning: "옥내 2 % 이내, 인입까지 합쳐 5 % 이내가 일반 권장",
      },
    ],
    example: {
      question:
        "단상 2선식 220 V 회로에서 부하 전류 20 A, 배선 거리 30 m일 때 전압 강하 4 V 이내가 되도록 하는 최소 전선 굵기는?",
      given: [
        "$V = 220$ V (단상 2선식)",
        "$I = 20$ A",
        "$L = 30$ m",
        "$e \\leq 4$ V",
      ],
      solution: [
        "$A \\geq \\dfrac{35.6 \\cdot L \\cdot I}{1{,}000 \\cdot e}$",
        "$A \\geq \\dfrac{35.6 \\times 30 \\times 20}{1{,}000 \\times 4}$",
        "$A \\geq \\dfrac{21{,}360}{4{,}000} = 5.34$ mm²",
        "KEC 표준 굵기 → 6 sq 선정",
      ],
      answer: "최소 6 mm² (6 sq) 선정",
    },
  },
  {
    id: "wiring-practice",
    title: "옥내 배선 실기",
    description:
      "단로 스위치·3로 스위치·콘센트 배선의 결선 도식과 동작 원리. 분전반 차단기 트립 시뮬.",
    subject: "전기설비",
    topic: "배선공사",
    status: "available",
    htmlPath: "/samples/simulator-wiring-practice.html",
    emoji: "💡",
    formula: [
      {
        name: "3로 스위치 점등 조건",
        expression: "$\\text{ON} \\iff S_1 = S_2$",
        meaning: "두 스위치 상태가 일치(둘 다 위 또는 둘 다 아래)할 때 점등",
      },
      {
        name: "분기 회로 부하",
        expression: "$P_{\\text{total}} = \\sum V \\cdot I_k \\leq P_{\\text{breaker}}$",
        meaning: "분기 차단기 정격 초과 시 트립. 단상 220 V × 16 A = 3.52 kW 기준",
      },
    ],
    example: {
      question:
        "단상 220 V 분기회로(차단기 정격 20 A)에 1.5 kW 전열기 2대와 300 W 조명을 동시에 사용하면 차단기 트립 여부는?",
      given: [
        "$V = 220$ V",
        "$P = 1{,}500 \\times 2 + 300 = 3{,}300$ W",
        "차단기 정격 $I_n = 20$ A",
      ],
      solution: [
        "$I = \\dfrac{P}{V} = \\dfrac{3{,}300}{220}$",
        "$I = 15$ A",
        "$15 < 20$ A → 정상 사용 (트립 없음)",
        "(주: 기동전류·역률 고려 시 마진 필요)",
      ],
      answer: "$I = 15$ A → 정상 동작 (트립 없음)",
    },
  },
  {
    id: "transformer-efficiency",
    title: "변압기 효율",
    description:
      "철손·동손과 부하율에 따른 효율 변화, 최대 효율 조건(P_core = P_copper)을 곡선으로 확인합니다.",
    subject: "전기기기",
    topic: "변압기",
    status: "available",
    htmlPath: "/samples/simulator-transformer-efficiency.html",
    emoji: "📈",
    formula: [
      {
        name: "효율",
        expression: "$\\eta = P_{out} / (P_{out} + P_i + P_c)$",
        meaning: "철손·동손과 출력의 관계",
      },
      {
        name: "최대 효율 조건",
        expression: "$m^* = \\sqrt{P_i / P_{c,정격}}$",
        meaning: "철손=동손에서 효율 최대",
      },
      {
        name: "동손",
        expression: "$P_c = m^2 \\cdot P_{c,정격}$",
        meaning: "부하율 m의 제곱에 비례",
      },
    ],
  },
  {
    id: "power-factor",
    title: "역률 개선",
    description:
      "유도성 부하의 무효 전력을 콘덴서로 보상하여 역률을 개선합니다. 페이저·전력 삼각형으로 시각화.",
    subject: "전기이론",
    topic: "교류회로",
    status: "available",
    htmlPath: "/samples/simulator-power-factor.html",
    emoji: "📐",
    formula: [
      {
        name: "전력 삼각형",
        expression: "$S = \\sqrt{P^2 + Q^2}$",
        meaning: "P 유효·Q 무효·S 피상",
      },
      {
        name: "콘덴서 무효",
        expression: "$Q_C = V^2 \\omega C$",
        meaning: "콘덴서로 무효 전력 공급",
      },
      {
        name: "개선 후 역률",
        expression: "$\\cos\\varphi' = P / \\sqrt{P^2+(Q_L-Q_C)^2}$",
        meaning: "Q_C가 클수록 cos φ 1에 가까워짐",
      },
    ],
  },
  {
    id: "star-delta-starter",
    title: "Y-Δ 기동기",
    description:
      "농형 유도전동기 Y 결선 기동으로 기동 전류를 1/3로 줄이고, 정격 운전 시 Δ로 자동 전환합니다.",
    subject: "전기기기",
    topic: "유도전동기",
    status: "available",
    htmlPath: "/samples/simulator-star-delta-starter.html",
    emoji: "🔄",
    formula: [
      {
        name: "Y 결선 상전압",
        expression: "$V_{p,Y} = V_L / \\sqrt{3}$",
        meaning: "Y로 기동 시 상전압 1/√3",
      },
      {
        name: "기동 전류비",
        expression: "$I_Y / I_\\Delta = 1/3$",
        meaning: "Y 기동은 직입 대비 1/3",
      },
      {
        name: "기동 토크비",
        expression: "$T_Y / T_\\Delta = 1/3$",
        meaning: "토크도 1/3로 감소",
      },
    ],
  },
  {
    id: "insulation-test",
    title: "절연 저항 시험",
    description:
      "메거(Megger)로 전선·기기의 절연 상태를 MΩ로 측정합니다. KEC 기준에 따라 합격/불합격 판정.",
    subject: "전기설비",
    topic: "차단기·보호장치",
    status: "available",
    htmlPath: "/samples/simulator-insulation-test.html",
    emoji: "🔧",
    formula: [
      {
        name: "절연 저항",
        expression: "$R_{ins} = V_{test} / I_{leak}$",
        meaning: "측정 전압에 인가하여 누설 전류 측정",
      },
      {
        name: "KEC 기준 (400V)",
        expression: "$R_{ins} \\geq 2 \\text{ M}\\Omega$",
        meaning: "전압 등급별 기준치 적용",
      },
    ],
  },
  {
    id: "relay-protection",
    title: "보호 계전기 (OCR)",
    description:
      "과전류 계전기의 픽업·시간 특성(순시·정한시·반한시)에 따른 차단 동작을 시간-전류 곡선으로 확인.",
    subject: "전기설비",
    topic: "차단기·보호장치",
    status: "available",
    htmlPath: "/samples/simulator-relay-protection.html",
    emoji: "⚙️",
    formula: [
      {
        name: "픽업 배수",
        expression: "$M = I / I_{pickup}$",
        meaning: "정격 픽업 대비 부하 배수",
      },
      {
        name: "반한시(IDMT)",
        expression: "$t = TMS \\cdot 0.14 / (M^{0.02} - 1)$",
        meaning: "IEC SI 곡선, M 클수록 빨리 트립",
      },
      {
        name: "정한시(DT)",
        expression: "$t = T_d$",
        meaning: "픽업 이상이면 일정 시간 후 트립",
      },
    ],
  },
  {
    id: "motor-speed-control",
    title: "전동기 속도 제어 (VVVF)",
    description:
      "인버터(VVVF)로 V/f 일정 제어를 시각화합니다. 주파수를 바꿔 동기속도와 토크-속도 곡선이 어떻게 이동하는지 확인하세요.",
    subject: "전기기기",
    topic: "유도전동기·인버터",
    status: "available",
    htmlPath: "/samples/simulator-motor-speed-control.html",
    emoji: "🌀",
    formula: [
      {
        name: "동기속도",
        expression: "$N_s = \\dfrac{120f}{P}$",
        meaning: "주파수 $f$ [Hz]와 극수 $P$로 결정. 단위 [rpm]",
      },
      {
        name: "V/f 일정 제어",
        expression: "$\\dfrac{V}{f} = \\text{const}$",
        meaning: "자속을 일정하게 유지해 토크 능력 보존",
      },
      {
        name: "슬립",
        expression: "$s = \\dfrac{N_s - N}{N_s}$",
        meaning: "동기속도와 실제 회전속도의 차이 비율",
      },
    ],
    example: {
      question:
        "전원 주파수 50 Hz, 4극 유도전동기에서 슬립이 3%일 때 동기속도와 회전자 속도는?",
      given: ["$f = 50$ Hz", "$P = 4$ 극", "$s = 0.03$"],
      solution: [
        "$N_s = \\dfrac{120 \\times 50}{4} = 1{,}500$ rpm",
        "$N = N_s(1 - s) = 1{,}500 \\times 0.97$",
        "$N = 1{,}455$ rpm",
      ],
      answer: "$N_s = 1{,}500$ rpm, $N = 1{,}455$ rpm",
    },
  },
  {
    id: "earthing-system",
    title: "접지 방식 (TT/TN/IT)",
    description:
      "KEC 5가지 접지 방식(TT·TN-S·TN-C·TN-C-S·IT)의 결선 차이와 지락 시 동작을 비교해서 보여줍니다.",
    subject: "전기설비",
    topic: "KEC·접지",
    status: "available",
    htmlPath: "/samples/simulator-earthing-system.html",
    emoji: "🌐",
    formula: [
      {
        name: "접촉전압",
        expression: "$U_T = I_f \\cdot R_A$",
        meaning: "지락 전류와 외함 접지저항으로 결정되는 인체 접촉 전압",
      },
      {
        name: "TT 고장전류",
        expression: "$I_f = \\dfrac{V}{R_B + R_A}$",
        meaning: "$R_B$ 변압기 접지, $R_A$ 외함 접지의 직렬 회로",
      },
    ],
    example: {
      question:
        "TT 접지 방식의 220 V 계통에서 $R_B = 4\\ \\Omega$, $R_A = 100\\ \\Omega$일 때 지락 전류와 접촉 전압은?",
      given: ["$V = 220$ V", "$R_B = 4\\ \\Omega$", "$R_A = 100\\ \\Omega$"],
      solution: [
        "$I_f = \\dfrac{V}{R_B + R_A} = \\dfrac{220}{4 + 100}$",
        "$I_f \\approx 2.11$ A",
        "$U_T = I_f \\cdot R_A = 2.11 \\times 100 \\approx 211$ V",
        "$U_T > 50$ V → RCD 차단 필요",
      ],
      answer: "$I_f \\approx 2.11$ A, $U_T \\approx 211$ V (RCD 차단 필요)",
    },
  },
  {
    id: "three-phase-imbalance",
    title: "3상 평형/불평형 부하",
    description:
      "3상 4선식 부하의 평형/불평형 상태를 페이저로 시각화. 중성선 전류 변화와 불평형률을 확인합니다.",
    subject: "전기이론",
    topic: "3상 교류",
    status: "available",
    htmlPath: "/samples/simulator-three-phase-imbalance.html",
    emoji: "⚖️",
    formula: [
      {
        name: "각 상 전류",
        expression: "$I_k = \\dfrac{V_p}{R_k}$",
        meaning: "각 상 전압과 부하 저항으로 결정되는 상전류",
      },
      {
        name: "중성선 전류",
        expression: "$\\vec{I}_N = \\vec{I}_R + \\vec{I}_S + \\vec{I}_T$",
        meaning: "평형 시 0, 불평형 시 벡터 합만큼 흐름",
      },
      {
        name: "불평형률",
        expression: "$U = \\dfrac{I_{max}-I_{min}}{I_{avg}} \\times 100\\%$",
        meaning: "최대·최소 상전류의 편차를 평균 대비 백분율로 평가",
      },
    ],
    example: {
      question:
        "3상 4선식에서 각 상 부하가 $R_R = 10$, $R_S = 10$, $R_T = 10\\ \\Omega$일 때와 $R_S = 20\\ \\Omega$로 바뀌었을 때의 중성선 전류 변화는?",
      given: [
        "평형 부하: $R_R = R_S = R_T = 10\\ \\Omega$",
        "불평형 부하: $R_R = 10$, $R_S = 20$, $R_T = 10\\ \\Omega$",
      ],
      solution: [
        "평형: $\\vec{I}_R + \\vec{I}_S + \\vec{I}_T = 0$ → $I_N = 0$",
        "불평형: $|I_S|$가 1/2로 감소 → 벡터 합 ≠ 0",
        "따라서 $I_N > 0$ (불평형 보상 전류)",
      ],
      answer: "평형 → $I_N = 0$, 불평형 → $I_N > 0$",
    },
  },
  {
    id: "lightning-arrester",
    title: "피뢰기/서지 보호",
    description:
      "피뢰기(SPD)가 낙뢰 서지를 흡수해 부하를 보호하는 과정을 시각화. 등급별 잔류전압과 보호 효율을 확인하세요.",
    subject: "전기설비",
    topic: "안전·보호",
    status: "available",
    htmlPath: "/samples/simulator-lightning-arrester.html",
    emoji: "⚡",
    formula: [
      {
        name: "잔류 전압",
        expression: "$V_r = V_{res0} + I \\cdot R_{on}$",
        meaning: "피뢰기 도통 시 부하 측에 남는 전압",
      },
      {
        name: "보호 효율",
        expression: "$\\eta = \\left(1 - \\dfrac{V_r}{V_s}\\right) \\times 100\\%$",
        meaning: "서지 전압 대비 흡수율. 1에 가까울수록 양호",
      },
      {
        name: "보호 범위",
        expression: "$r = h \\cdot \\tan(\\theta/2)$",
        meaning: "피뢰기 높이 $h$와 보호각 $\\theta$로 결정",
      },
    ],
    example: {
      question:
        "서지 전압 $V_s = 100$ kV가 피뢰기에 인가되어 잔류 전압이 $V_r = 2$ kV로 측정될 때 보호 효율은?",
      given: ["$V_s = 100$ kV", "$V_r = 2$ kV"],
      solution: [
        "$\\eta = \\left(1 - \\dfrac{V_r}{V_s}\\right) \\times 100\\%$",
        "$\\eta = \\left(1 - \\dfrac{2}{100}\\right) \\times 100\\%$",
        "$\\eta = 0.98 \\times 100\\% = 98\\%$",
      ],
      answer: "$\\eta \\approx 98\\%$",
    },
  },
  {
    id: "transformer-tap",
    title: "변압기 탭 전환",
    description:
      "변압기 1차 권선의 탭을 ±5% 범위에서 전환하며 2차 전압을 일정하게 유지하는 과정을 봅니다. NLTC/OLTC 동작 차이도 확인.",
    subject: "전기기기",
    topic: "변압기",
    status: "available",
    htmlPath: "/samples/simulator-transformer-tap.html",
    emoji: "🔀",
    formula: [
      {
        name: "보정 권수",
        expression: "$N_1' = N_1(1+k), \\ k \\in \\{\\pm 5\\%, \\pm 2.5\\%, 0\\}$",
        meaning: "탭 위치에 따라 1차 유효 권수가 변경됨",
      },
      {
        name: "2차 전압",
        expression: "$V_2 = V_1 \\cdot \\dfrac{N_2}{N_1'}$",
        meaning: "1차 권수 보정으로 2차 전압을 정격에 맞춤",
      },
    ],
    example: {
      question:
        "정격 220 V 대비 1차 전압이 200 V (−9%)로 들어올 때, 탭을 −5%로 전환하면 2차 전압은 어떻게 보정되나? ($N_2/N_1 = 1/2$ 가정)",
      given: [
        "$V_1 = 200$ V (정격 220 V 대비 −9%)",
        "탭 위치: $k = -5\\%$",
        "$N_2/N_1 = 1/2$",
      ],
      solution: [
        "$N_1' = N_1(1 - 0.05) = 0.95 N_1$",
        "$V_2 = V_1 \\cdot \\dfrac{N_2}{N_1'} = 200 \\times \\dfrac{N_2}{0.95 N_1}$",
        "$V_2 = 200 \\times \\dfrac{1/2}{0.95} \\approx 105.3$ V",
        "(탭 전환 없으면 $V_2 = 100$ V → 보정 효과 +5.3 V)",
      ],
      answer: "$V_2 \\approx 105.3$ V (탭 −5%로 약 5% 보정)",
    },
  },
  {
    id: "wheatstone-bridge",
    title: "휘트스톤 브리지",
    description:
      "휘트스톤 브리지로 미지의 저항을 정밀 측정하는 원리. 평형 조건과 검류계 동작을 시각화합니다.",
    subject: "전기이론",
    topic: "직류·저항 측정",
    status: "available",
    htmlPath: "/samples/simulator-wheatstone-bridge.html",
    emoji: "💎",
    formula: [
      {
        name: "평형 조건",
        expression: "$\\dfrac{R_1}{R_2} = \\dfrac{R_3}{R_x}$",
        meaning: "검류계 전류가 0일 때 성립하는 브리지 평형 조건",
      },
      {
        name: "미지 저항",
        expression: "$R_x = R_3 \\cdot \\dfrac{R_2}{R_1}$",
        meaning: "평형 조건에서 알려진 저항으로 미지 저항을 계산",
      },
    ],
    example: {
      question:
        "$R_1 = 100\\ \\Omega$, $R_2 = 200\\ \\Omega$, $R_3 = 150\\ \\Omega$에서 브리지가 평형일 때 미지 저항 $R_x$는?",
      given: ["$R_1 = 100\\ \\Omega$", "$R_2 = 200\\ \\Omega$", "$R_3 = 150\\ \\Omega$"],
      solution: [
        "$R_x = R_3 \\cdot \\dfrac{R_2}{R_1}$",
        "$R_x = 150 \\times \\dfrac{200}{100}$",
        "$R_x = 150 \\times 2 = 300\\ \\Omega$",
      ],
      answer: "$R_x = 300\\ \\Omega$",
    },
  },
  {
    id: "plc-ladder",
    title: "PLC 래더 다이어그램",
    description:
      "PLC 래더 다이어그램의 자기유지·인터록·타이머 기본 회로를 푸시버튼 입력으로 직접 동작시켜 보세요.",
    subject: "전기설비",
    topic: "시퀀스 제어·자동화",
    status: "available",
    htmlPath: "/samples/simulator-plc-ladder.html",
    emoji: "🪜",
    formula: [
      {
        name: "자기유지",
        expression: "$Y_0 = (X_0 + Y_0) \\cdot \\overline{X_1}$",
        meaning: "기동 입력 $X_0$ 누른 뒤 떼도 출력 $Y_0$ 유지, $X_1$로 해제",
      },
      {
        name: "인터록",
        expression: "$M_1 \\cdot \\overline{M_2}, \\ M_2 \\cdot \\overline{M_1}$",
        meaning: "두 출력이 동시에 ON 되지 않도록 상호 잠금",
      },
      {
        name: "타이머",
        expression: "$T_0 = ON \\Rightarrow Y_0$ (PT 경과 시)",
        meaning: "설정 시간(PT) 경과 후 타이머 접점이 ON되어 출력 동작",
      },
    ],
    example: {
      question:
        "자기유지 회로에서 $X_0$를 짧게 누른 뒤 떼었을 때 출력 $Y_0$의 동작은? 이후 $X_1$을 누르면?",
      given: [
        "기동 입력 $X_0$ (a접점, 푸시버튼)",
        "정지 입력 $X_1$ (b접점, 푸시버튼)",
        "출력 $Y_0$",
      ],
      solution: [
        "$X_0$ 누름: $Y_0 = (1 + 0) \\cdot 1 = 1$ → ON",
        "$X_0$ 떼도 $Y_0$ 자기 접점으로 유지: $Y_0 = (0 + 1) \\cdot 1 = 1$",
        "$X_1$ 누름: $Y_0 = (0 + 1) \\cdot 0 = 0$ → OFF",
      ],
      answer: "$X_0$ 떼도 $Y_0$ ON 유지, $X_1$ 누르면 OFF",
    },
  },
  {
    id: "harmonic-thd",
    title: "비정현파/THD (전력 품질)",
    description:
      "기본파 + 고조파를 합성하면서 비정현파 파형과 THD를 측정합니다. 사각파·톱니파 푸리에 분해도 시각화.",
    subject: "전기이론",
    topic: "교류·전력 품질",
    status: "available",
    htmlPath: "/samples/simulator-harmonic-thd.html",
    emoji: "📊",
    formula: [
      {
        name: "총고조파왜형률",
        expression:
          "$THD = \\dfrac{\\sqrt{\\sum_{n=2}^{\\infty} V_n^2}}{V_1} \\times 100\\%$",
        meaning: "기본파 대비 고조파 성분의 비율. 작을수록 양호",
      },
      {
        name: "사각파 푸리에",
        expression:
          "$f(t) = \\dfrac{4}{\\pi}\\sum_{k=0}^{\\infty} \\dfrac{\\sin((2k+1)\\omega t)}{2k+1}$",
        meaning: "홀수 차 고조파의 합으로 사각파를 근사",
      },
    ],
    example: {
      question:
        "기본파 $V_1 = 100\\%$, 3차 고조파 $V_3 = 33\\%$, 5차 고조파 $V_5 = 20\\%$일 때 THD는?",
      given: ["$V_1 = 100$", "$V_3 = 33$", "$V_5 = 20$"],
      solution: [
        "$THD = \\dfrac{\\sqrt{V_3^2 + V_5^2}}{V_1} \\times 100\\%$",
        "$THD = \\dfrac{\\sqrt{33^2 + 20^2}}{100} \\times 100\\%$",
        "$THD = \\dfrac{\\sqrt{1089 + 400}}{100} \\times 100\\%$",
        "$THD = \\dfrac{\\sqrt{1489}}{100} \\times 100\\% \\approx 38.6\\%$",
      ],
      answer: "$THD \\approx 38.6\\%$",
    },
  },
  {
    id: "solar-pv-mppt",
    title: "태양광 발전 MPPT",
    description:
      "태양광 패널의 I-V·P-V 곡선과 MPPT(최대전력점 추종)를 시각화. 조도·온도·부하 변화에 따른 최대 출력점이 어떻게 이동하는지 확인하세요.",
    subject: "전기설비",
    topic: "신재생 에너지",
    status: "available",
    htmlPath: "/samples/simulator-solar-pv-mppt.html",
    emoji: "☀️",
    formula: [
      {
        name: "최대전력점",
        expression: "$P_{max} = V_{mp} \\cdot I_{mp}$",
        meaning: "I-V 곡선상 출력이 최대가 되는 동작점",
      },
      {
        name: "충진율",
        expression: "$FF = \\dfrac{V_{mp} \\cdot I_{mp}}{V_{oc} \\cdot I_{sc}}$",
        meaning: "패널 품질 지표. 0.7~0.8이면 양호",
      },
      {
        name: "효율",
        expression: "$\\eta = \\dfrac{P_{max}}{G \\cdot A}$",
        meaning: "입사광 에너지 대비 전기 출력 비율 ($G$: 조도, $A$: 면적)",
      },
    ],
    example: {
      question:
        "$V_{oc} = 38$ V, $I_{sc} = 8.5$ A, $V_{mp} = 31$ V, $I_{mp} = 7.8$ A인 태양광 패널의 최대 출력과 충진율은?",
      given: [
        "$V_{oc} = 38$ V",
        "$I_{sc} = 8.5$ A",
        "$V_{mp} = 31$ V",
        "$I_{mp} = 7.8$ A",
      ],
      solution: [
        "$P_{max} = V_{mp} \\cdot I_{mp} = 31 \\times 7.8 = 241.8$ W",
        "$FF = \\dfrac{V_{mp} \\cdot I_{mp}}{V_{oc} \\cdot I_{sc}} = \\dfrac{241.8}{38 \\times 8.5}$",
        "$FF = \\dfrac{241.8}{323} \\approx 0.748$",
      ],
      answer: "$P_{max} = 241.8$ W, $FF \\approx 0.748$",
    },
  },
  {
    id: "ev-charger",
    title: "전기차 충전기 (AC/DC)",
    description:
      "전기차 충전 AC 완속 vs DC 급속 모드 비교. CC→CV 충전 곡선과 SOC·소요시간을 실시간 계산합니다.",
    subject: "전기설비",
    topic: "신재생·EV 충전",
    status: "available",
    htmlPath: "/samples/simulator-ev-charger.html",
    emoji: "🔌",
    formula: [
      {
        name: "충전 전력",
        expression: "$P = V \\cdot I \\cdot \\eta$",
        meaning: "공급 전압·전류와 충전 효율의 곱",
      },
      {
        name: "충전 시간",
        expression: "$t = \\dfrac{E_{cap} \\cdot \\Delta SOC}{P_{eff}}$",
        meaning: "배터리 용량·SOC 변화량을 유효 전력으로 나눈 시간",
      },
      {
        name: "C-rate",
        expression: "$C = \\dfrac{I}{E_{cap}}$",
        meaning: "배터리 용량 대비 충·방전 전류 비율",
      },
    ],
    example: {
      question:
        "60 kWh 배터리를 SOC 20% → 80% (ΔSOC=60%, 36 kWh)까지 50 kW DC 급속 충전기로 충전할 때 소요 시간은?",
      given: [
        "$E_{cap} = 60$ kWh",
        "$\\Delta SOC = 0.6$ (20% → 80%, 36 kWh)",
        "$P_{eff} = 50$ kW",
      ],
      solution: [
        "$t = \\dfrac{E_{cap} \\cdot \\Delta SOC}{P_{eff}}$",
        "$t = \\dfrac{60 \\times 0.6}{50} = \\dfrac{36}{50}$ h",
        "$t = 0.72$ h $\\approx 43$ min",
      ],
      answer: "$t \\approx 43$ min",
    },
  },
  {
    id: "wind-turbine",
    title: "풍력 발전",
    description:
      "풍력 터빈의 출력 P=½ρAv³Cp를 베츠 한계 안에서 시각화. 풍속·피치각·요잉 조정으로 Cp 곡선을 최대로 끌어올려 보세요.",
    subject: "전기설비",
    topic: "신재생 에너지",
    status: "available",
    htmlPath: "/samples/simulator-wind-turbine.html",
    emoji: "🌬️",
    formula: [
      {
        name: "풍력 출력",
        expression: "$P = \\dfrac{1}{2}\\rho A v^3 C_p$",
        meaning: "공기 밀도·로터 면적·풍속³·출력계수의 곱. $C_p \\le 16/27 \\approx 0.593$",
      },
      {
        name: "끝속도비",
        expression: "$\\lambda = \\dfrac{\\omega R}{v}$",
        meaning: "블레이드 끝 선속도와 풍속의 비. Cp 곡선의 가로축",
      },
      {
        name: "베츠 한계",
        expression: "$C_{p,max} = 0.593$",
        meaning: "풍력 터빈이 추출할 수 있는 운동에너지의 이론적 최대치 (16/27)",
      },
    ],
    example: {
      question:
        "풍속 $v = 12$ m/s, 로터 면적 $A = 4500$ m², 출력계수 $C_p = 0.45$인 풍력 터빈의 출력은? ($\\rho = 1.225$ kg/m³)",
      given: [
        "$v = 12$ m/s",
        "$A = 4500$ m²",
        "$C_p = 0.45$",
        "$\\rho = 1.225$ kg/m³",
      ],
      solution: [
        "$P = \\dfrac{1}{2}\\rho A v^3 C_p$",
        "$P = 0.5 \\times 1.225 \\times 4500 \\times 12^3 \\times 0.45$",
        "$P = 0.5 \\times 1.225 \\times 4500 \\times 1728 \\times 0.45$",
        "$P \\approx 4.29 \\times 10^6$ W",
      ],
      answer: "$P \\approx 4.6$ MW",
    },
  },
  {
    id: "skin-effect",
    title: "표피 효과",
    description:
      "주파수가 높아질수록 도체 표면으로 전류가 집중되는 표피 효과. 도체 단면의 전류 밀도와 표피 깊이를 시각화합니다.",
    subject: "전기이론",
    topic: "교류·고주파",
    status: "available",
    htmlPath: "/samples/simulator-skin-effect.html",
    emoji: "🍥",
    formula: [
      {
        name: "표피 깊이",
        expression: "$\\delta = \\sqrt{\\dfrac{\\rho}{\\pi f \\mu}}$",
        meaning: "전류 밀도가 표면의 $1/e$로 감소하는 깊이. $\\rho$: 저항률, $\\mu$: 투자율",
      },
      {
        name: "전류 밀도",
        expression: "$J(r) = J_s \\cdot e^{-(R-r)/\\delta}$",
        meaning: "표면 전류 밀도 $J_s$에서 깊이에 따라 지수적으로 감쇠",
      },
      {
        name: "AC 저항비",
        expression: "$\\dfrac{R_{AC}}{R_{DC}} \\approx \\dfrac{R}{2\\delta}$",
        meaning: "$R \\gg \\delta$일 때. 표피 두께가 얇을수록 AC 저항이 커짐",
      },
    ],
    example: {
      question:
        "구리 도체($\\rho = 1.68 \\times 10^{-8}$ Ω·m, $\\mu \\approx \\mu_0$)에 $f = 10$ kHz 전류가 흐를 때 표피 깊이는?",
      given: [
        "$\\rho = 1.68 \\times 10^{-8}$ Ω·m",
        "$\\mu_0 = 4\\pi \\times 10^{-7}$ H/m",
        "$f = 10{,}000$ Hz",
      ],
      solution: [
        "$\\delta = \\sqrt{\\dfrac{\\rho}{\\pi f \\mu_0}}$",
        "$\\delta = \\sqrt{\\dfrac{1.68 \\times 10^{-8}}{\\pi \\times 10^4 \\times 4\\pi \\times 10^{-7}}}$",
        "$\\delta = \\sqrt{\\dfrac{1.68 \\times 10^{-8}}{3.95 \\times 10^{-2}}}$",
        "$\\delta \\approx \\sqrt{4.26 \\times 10^{-7}} \\approx 6.5 \\times 10^{-4}$ m",
      ],
      answer: "$\\delta \\approx 0.66$ mm",
    },
  },
  {
    id: "transmission-loss",
    title: "장거리 송전 손실",
    description:
      "송전 전압을 높일수록 손실이 $1/V^2$로 감소하는 원리를 송전탑·송전선·변전소를 통해 시각화합니다.",
    subject: "전기설비",
    topic: "전력 계통",
    status: "available",
    htmlPath: "/samples/simulator-transmission-loss.html",
    emoji: "🗼",
    formula: [
      {
        name: "송전 전류",
        expression: "$I = \\dfrac{P}{\\sqrt{3} V \\cos\\theta}$",
        meaning: "3상 송전 시 선전류. 전압이 높을수록 전류 감소",
      },
      {
        name: "송전 손실",
        expression: "$P_{loss} = 3 I^2 R \\propto \\dfrac{1}{V^2}$",
        meaning: "선로 저항에 의한 발열 손실. 전압 제곱에 반비례",
      },
      {
        name: "송전 효율",
        expression: "$\\eta = \\dfrac{P - P_{loss}}{P}$",
        meaning: "송전단 대비 수전단 전력 비율",
      },
    ],
    example: {
      question:
        "$P = 100$ MW, 거리 250 km, $\\cos\\theta = 0.9$, 선로 저항 $R = 30$ Ω일 때 154 kV 송전과 22 kV 송전의 손실률을 비교하시오.",
      given: [
        "$P = 100 \\times 10^6$ W",
        "$\\cos\\theta = 0.9$",
        "$R = 30$ Ω",
        "$V_1 = 154$ kV, $V_2 = 22$ kV",
      ],
      solution: [
        "154 kV: $I = \\dfrac{10^8}{\\sqrt{3} \\times 154{,}000 \\times 0.9} \\approx 417$ A",
        "$P_{loss,1} = 3 \\times 417^2 \\times 30 \\approx 1.56 \\times 10^7$ W → 손실률 약 15.6%",
        "22 kV: $I \\approx 2917$ A, $P_{loss,2} = 3 \\times 2917^2 \\times 30 \\approx 7.66 \\times 10^8$ W → 손실률 700% 이상(불가능)",
        "전압비 $(154/22)^2 = 49$배 → 손실 1/49로 감소",
      ],
      answer: "154 kV에서 손실률 $\\approx 3$~16% vs 22 kV는 30%+ (사실상 송전 불가)",
    },
  },
  {
    id: "thermal-overload",
    title: "열동 과부하 (EOCR)",
    description:
      "EOCR(열동·전자) 과부하 계전기의 시간-전류 특성과 바이메탈 트립 동작을 시각화합니다. Class 10/20/30 비교.",
    subject: "전기설비",
    topic: "보호·계전기",
    status: "available",
    htmlPath: "/samples/simulator-thermal-overload.html",
    emoji: "🌡️",
    formula: [
      {
        name: "동작 시간",
        expression: "$t = \\dfrac{K}{(I/I_r)^2 - 1}$",
        meaning: "$M = I/I_r$ (정격전류 배수). $M$이 커질수록 트립 시간 단축",
      },
      {
        name: "Class 상수",
        expression: "$K_{10} \\approx 360,\\ K_{20} \\approx 720,\\ K_{30} \\approx 1080$",
        meaning: "Class 10/20/30 → 600% 과전류에서 10/20/30초 내 트립",
      },
      {
        name: "누적 열량",
        expression: "$Q = \\int I^2\\, dt$",
        meaning: "바이메탈에 누적되는 줄열. 트립 임계치 도달 시 동작",
      },
    ],
    example: {
      question:
        "Class 10 EOCR에서 정격전류의 2배($M = 2$) 과전류가 흐를 때 트립까지 걸리는 시간은?",
      given: ["$M = I/I_r = 2$", "Class 10 → $K \\approx 360$"],
      solution: [
        "$t = \\dfrac{K}{M^2 - 1}$",
        "$t = \\dfrac{360}{2^2 - 1} = \\dfrac{360}{3}$",
        "$t = 120$ s",
      ],
      answer: "$t = 120$ s (2분)",
    },
  },
  {
    id: "fuse-curve",
    title: "퓨즈 용단 곡선",
    description:
      "퓨즈의 용단·차단 동작 — 시간-전류 특성, 아크 발생, 모래 흡수, gG·aM·aR·gL 분류를 시각화합니다.",
    subject: "전기설비",
    topic: "보호·차단",
    status: "available",
    htmlPath: "/samples/simulator-fuse-curve.html",
    emoji: "🧨",
    formula: [
      {
        name: "용단 시간",
        expression: "$t = K \\cdot (I/I_n)^{-n}$",
        meaning: "정격전류 배수 $M = I/I_n$의 멱승에 반비례. $n \\approx 2$~$4$",
      },
      {
        name: "차단 에너지",
        expression: "$I^2 t = \\int i^2\\, d\\tau$",
        meaning: "아크 발생부터 차단까지 누적 줄적분. 후단 기기 보호 척도",
      },
      {
        name: "한류 효과",
        expression: "$I_{peak} < I_{prosp}$",
        meaning: "퓨즈가 차단 전류 파고치를 예상 단락전류보다 낮춤 (한류형 퓨즈)",
      },
    ],
    example: {
      question:
        "gG 퓨즈 $I_n = 63$ A에 $I = 315$ A가 흐를 때 용단 시간은? ($K = 30$, $n = 2$ 가정)",
      given: ["$I_n = 63$ A", "$I = 315$ A", "$K = 30$, $n = 2$"],
      solution: [
        "$M = I/I_n = 315/63 = 5$",
        "$t = K \\cdot M^{-n} = 30 \\times 5^{-2}$",
        "$t = 30 / 25 = 1.2$ s",
      ],
      answer: "$t \\approx$ 수 초 (gG 곡선상 약 1~2초)",
    },
  },
  {
    id: "buck-boost-converter",
    title: "벅·부스트 컨버터",
    description:
      "DC-DC 벅(강압)·부스트(승압) 컨버터를 듀티비로 조작. 인덕터 전류 톱니파와 출력 리플을 실시간 확인.",
    subject: "전기설비",
    topic: "전력변환",
    status: "available",
    htmlPath: "/samples/simulator-buck-boost-converter.html",
    emoji: "🔁",
    formula: [
      {
        name: "벅 컨버터 (강압)",
        expression: "$V_{out} = D \\cdot V_{in}$",
        meaning: "듀티비 $D$ ($0 \\le D \\le 1$)에 비례해 출력 전압이 낮아짐",
      },
      {
        name: "부스트 컨버터 (승압)",
        expression: "$V_{out} = \\dfrac{V_{in}}{1 - D}$",
        meaning: "$D$가 1에 가까울수록 출력 전압이 크게 상승",
      },
      {
        name: "인덕터 전류 리플",
        expression: "$\\Delta I_L = \\dfrac{V_{in} \\cdot D \\cdot T}{L}$",
        meaning: "스위칭 주기 $T$, 인덕턴스 $L$에 따른 톱니파 진폭",
      },
    ],
    example: {
      question:
        "$V_{in} = 24$ V, 듀티비 $D = 0.5$일 때 벅·부스트 컨버터의 출력 전압은 각각 얼마인가?",
      given: ["$V_{in} = 24$ V", "$D = 0.5$"],
      solution: [
        "벅: $V_{out} = D \\cdot V_{in} = 0.5 \\times 24 = 12$ V",
        "부스트: $V_{out} = \\dfrac{V_{in}}{1 - D} = \\dfrac{24}{1 - 0.5} = \\dfrac{24}{0.5}$",
        "부스트: $V_{out} = 48$ V",
      ],
      answer: "벅 $V_{out} = 12$ V, 부스트 $V_{out} = 48$ V",
    },
  },
  {
    id: "fault-analysis",
    title: "단락 사고 분석",
    description:
      "3상 단락·1선 지락·2선 단락·2선 지락 — 사고 종류별 사고 전류와 보호장치 동작 시간을 비교.",
    subject: "전기설비",
    topic: "보호·계전기",
    status: "available",
    htmlPath: "/samples/simulator-fault-analysis.html",
    emoji: "💥",
    formula: [
      {
        name: "3상 단락 전류",
        expression: "$I_f = \\dfrac{V}{Z_s + Z_f}$",
        meaning: "전원 임피던스 $Z_s$, 사고점 임피던스 $Z_f$의 직렬합",
      },
      {
        name: "1선 지락 (1LG)",
        expression: "$I_f = \\dfrac{3V}{Z_1 + Z_2 + Z_0 + 3Z_f}$",
        meaning: "정상·역상·영상 임피던스 합을 이용한 대칭좌표법",
      },
      {
        name: "IDMT 보호 동작 시간",
        expression: "$t_{op} = \\dfrac{0.14}{(I/I_p)^{0.02} - 1}$",
        meaning: "반한시 특성 곡선. $I_p$는 정정 픽업 전류",
      },
    ],
    example: {
      question:
        "$V = 22$ kV 계통, $Z_s = 10\\ \\Omega$, $Z_f \\approx 0$ 인 3상 단락 사고 시 사고 전류는?",
      given: ["$V = 22{,}000$ V", "$Z_s = 10\\ \\Omega$", "$Z_f \\approx 0$"],
      solution: [
        "$I_f = \\dfrac{V}{Z_s + Z_f}$",
        "$I_f = \\dfrac{22{,}000}{10 + 0}$",
        "$I_f = 2{,}200$ A",
      ],
      answer: "$I_f \\approx 2{,}200$ A",
    },
  },
  {
    id: "earth-leakage-body",
    title: "누전 인체 통과 전류",
    description:
      "누전된 가전을 만졌을 때 인체에 흐르는 전류와 위험 등급. RCD(누전차단기)의 30 mA 0.03초 보호 동작을 시각화.",
    subject: "전기설비",
    topic: "안전·보호",
    status: "available",
    htmlPath: "/samples/simulator-earth-leakage-body.html",
    emoji: "⚠️",
    formula: [
      {
        name: "인체 통과 전류",
        expression: "$I_{body} = \\dfrac{V}{R_{body} + R_{ground}}$",
        meaning: "인체 저항 $R_{body}$, 접지 저항 $R_{ground}$의 직렬합",
      },
      {
        name: "위험 등급",
        expression: "$1\\ \\text{mA} \\to 10\\ \\text{mA} \\to 30\\ \\text{mA} \\to 100\\ \\text{mA}$",
        meaning: "감지 / 이탈불능 / 심실세동 / 즉사",
      },
      {
        name: "RCD 동작 조건",
        expression: "$I_{leak} \\geq 30\\ \\text{mA}, \\quad t \\leq 30\\ \\text{ms}$",
        meaning: "누전차단기 정격 감도 전류 및 동작 시간",
      },
    ],
    example: {
      question:
        "$V = 220$ V 누전 기기를 인체 저항 $R_{body} = 2$ kΩ 인 사람이 접촉했을 때 흐르는 전류와 위험 등급은?",
      given: ["$V = 220$ V", "$R_{body} = 2{,}000\\ \\Omega$", "$R_{ground} \\approx 0$"],
      solution: [
        "$I_{body} = \\dfrac{V}{R_{body} + R_{ground}}$",
        "$I_{body} = \\dfrac{220}{2{,}000}$",
        "$I_{body} = 0.11$ A $= 110$ mA",
      ],
      answer: "$I_{body} \\approx 110$ mA (심실세동 영역, RCD 즉시 차단 필요)",
    },
  },
  {
    id: "ess-bess",
    title: "에너지저장장치 (ESS)",
    description:
      "ESS/BESS의 충방전 운영을 24시간 시뮬레이션. 피크 셰이빙·신재생 평활·차익거래 3가지 모드 비교.",
    subject: "전기설비",
    topic: "신재생·ESS",
    status: "available",
    htmlPath: "/samples/simulator-ess-bess.html",
    emoji: "🔋",
    formula: [
      {
        name: "SOC (충전 상태)",
        expression: "$SOC = \\dfrac{E_{stored}}{E_{cap}} \\times 100\\%$",
        meaning: "현재 저장된 에너지를 정격 용량으로 나눈 백분율",
      },
      {
        name: "왕복 효율",
        expression: "$\\eta_{rt} = \\eta_c \\cdot \\eta_d$",
        meaning: "충전 효율 $\\eta_c$ 와 방전 효율 $\\eta_d$ 의 곱",
      },
      {
        name: "C-rate",
        expression: "$C = \\dfrac{P}{E_{cap}}$",
        meaning: "정격 용량 대비 충방전 출력 비율 (1C = 1시간 만방전)",
      },
    ],
    example: {
      question:
        "용량 $E_{cap} = 4$ MWh ESS를 $0.5$ C로 운전할 때 충방전 가능한 출력 $P$는?",
      given: ["$E_{cap} = 4$ MWh", "$C = 0.5$"],
      solution: [
        "$C = \\dfrac{P}{E_{cap}} \\Rightarrow P = C \\cdot E_{cap}$",
        "$P = 0.5 \\times 4$ MWh/h",
        "$P = 2$ MW",
      ],
      answer: "$P = 2$ MW 충방전 가능",
    },
  },
  {
    id: "smart-meter",
    title: "스마트 미터 (AMI)",
    description:
      "스마트 미터의 적산 검침과 시간대별 요금(TOU)을 24시간 시뮬레이션. 양방향 통신으로 검침 데이터 전송.",
    subject: "전기설비",
    topic: "계측·통신",
    status: "available",
    htmlPath: "/samples/simulator-smart-meter.html",
    emoji: "📟",
    formula: [
      {
        name: "적산 전력량",
        expression: "$E = \\int P\\, dt$",
        meaning: "순시 전력의 시간 적분. 단위 [kWh]",
      },
      {
        name: "TOU 요금",
        expression: "$C = \\sum P_t \\cdot \\tau_t \\cdot R_t$",
        meaning: "시간대별 전력 $P_t$, 구간 $\\tau_t$, 단가 $R_t$ 의 곱의 합",
      },
      {
        name: "평균 전력",
        expression: "$P_{avg} = \\dfrac{E_{total}}{T}$",
        meaning: "총 적산 전력량을 총 시간으로 나눈 값",
      },
    ],
    example: {
      question:
        "가정에서 평균 $P = 3$ kW의 부하를 24시간 사용했을 때 누적 전력량은?",
      given: ["$P = 3$ kW", "$T = 24$ h"],
      solution: [
        "$E = \\int P\\, dt = P \\cdot T$ (정상상태)",
        "$E = 3 \\times 24$",
        "$E = 72$ kWh",
      ],
      answer: "$E = 72$ kWh",
    },
  },
  {
    id: "harmonic-filter",
    title: "고조파 필터 (수동·능동)",
    description:
      "비선형 부하의 고조파를 LC 수동필터·능동필터(APF)로 저감하는 효과를 비교. 차수별 흡수·THD 저감률 확인.",
    subject: "전기설비",
    topic: "전력 품질",
    status: "available",
    htmlPath: "/samples/simulator-harmonic-filter.html",
    emoji: "🪡",
    formula: [
      {
        name: "LC 수동 필터 노치 특성",
        expression:
          "$H(n) = \\dfrac{1}{\\sqrt{1 + Q^2 \\left( \\dfrac{n}{n_t} - \\dfrac{n_t}{n} \\right)^2}}$",
        meaning:
          "$n$차 고조파에 대한 흡수율. $n_t$는 튜닝 차수, $Q$는 필터 품질계수",
      },
      {
        name: "능동 필터 (APF) 보상",
        expression: "$i_{filter}(t) = -i_{harm}(t)$",
        meaning:
          "부하 고조파 전류를 실시간으로 검출해 반대 위상 전류를 주입하여 상쇄",
      },
      {
        name: "THD 저감률",
        expression:
          "$\\eta_{THD} = 1 - \\dfrac{THD_{after}}{THD_{before}}$",
        meaning:
          "필터 설치 전후의 종합 고조파 왜형률(THD) 개선 비율",
      },
    ],
    example: {
      question:
        "5차 고조파 100%, 5차로 튜닝된 LC 수동필터($Q = 20$, $n_t = 5$)를 설치했을 때 5차 흡수율과 THD 저감 효과는?",
      given: [
        "$n = 5$, $n_t = 5$",
        "$Q = 20$",
        "튜닝 차수에서 $\\dfrac{n}{n_t} - \\dfrac{n_t}{n} = 0$",
      ],
      solution: [
        "$H(5) = \\dfrac{1}{\\sqrt{1 + 20^2 \\times 0^2}}$",
        "$H(5) = \\dfrac{1}{\\sqrt{1}} = 1$",
        "필터를 통한 5차 고조파 흡수 ≈ 95% (실제 손실 포함)",
      ],
      answer: "5차 약 95% 흡수, THD 대폭 저감",
    },
  },
  {
    id: "distance-relay",
    title: "거리 계전기 (Zone 1/2/3)",
    description:
      "송전선 거리 계전기 Zone 1/2/3 협조 동작. R-X 평면 Mho/Quad 특성과 사고 임피던스의 위치를 시각화.",
    subject: "전기설비",
    topic: "보호·계전기",
    status: "available",
    htmlPath: "/samples/simulator-distance-relay.html",
    emoji: "📐",
    formula: [
      {
        name: "측정 임피던스",
        expression: "$Z = \\dfrac{V}{I}$",
        meaning:
          "계전기 설치점에서 전압·전류로부터 산출. 사고 거리에 비례",
      },
      {
        name: "Zone 1 (즉시 트립)",
        expression: "$Z_1 = 0.85 \\cdot Z_L$",
        meaning: "보호 구간의 약 85% 커버, 시간 지연 없이 즉시 동작",
      },
      {
        name: "Zone 2 (백업, 지연)",
        expression: "$Z_2 = 1.25 \\cdot Z_L,\\ t \\approx 0.3\\ \\text{s}$",
        meaning: "인접 구간 일부까지 커버, 협조를 위한 시간 지연",
      },
      {
        name: "Zone 3 (원격 백업)",
        expression: "$Z_3 = 2.5 \\cdot Z_L,\\ t \\approx 1.0\\ \\text{s}$",
        meaning: "원거리 백업 보호, 가장 긴 시간 지연",
      },
    ],
    example: {
      question:
        "선로 임피던스 $Z_L = 20\\ \\Omega$인 송전선의 50% 지점에서 사고가 발생했을 때 거리 계전기 동작은?",
      given: [
        "$Z_L = 20\\ \\Omega$",
        "사고 지점 = 선로의 50%",
        "측정 임피던스 $Z = 0.5 \\times 20 = 10\\ \\Omega$",
      ],
      solution: [
        "$Z_1 = 0.85 \\times 20 = 17\\ \\Omega$",
        "$Z = 10\\ \\Omega < Z_1 = 17\\ \\Omega$",
        "Zone 1 영역 → 시간 지연 없이 즉시 트립",
      ],
      answer: "Zone 1 픽업, 즉시 트립",
    },
  },
  {
    id: "igbt-switching",
    title: "IGBT 스위칭 손실",
    description:
      "IGBT의 도통 손실과 스위칭 손실을 정량 분석. 게이트 저항·주파수에 따른 손실 변화와 접합 온도 상승 확인.",
    subject: "전기설비",
    topic: "전력변환",
    status: "available",
    htmlPath: "/samples/simulator-igbt-switching.html",
    emoji: "⚡",
    formula: [
      {
        name: "도통 손실",
        expression: "$P_{cond} = V_{CE(sat)} \\cdot I_C \\cdot D$",
        meaning:
          "도통 시 포화 전압강하 × 컬렉터 전류 × 듀티비",
      },
      {
        name: "스위칭 손실",
        expression: "$P_{sw} = (E_{on} + E_{off}) \\cdot f_{sw}$",
        meaning:
          "1회 턴온·턴오프 에너지의 합에 스위칭 주파수를 곱한 값",
      },
      {
        name: "접합 온도",
        expression: "$T_j = T_a + P_{tot} \\cdot R_{\\theta}$",
        meaning:
          "주위 온도 $T_a$ + 총 손실 × 열저항 $R_{\\theta}$",
      },
    ],
    example: {
      question:
        "$I_C = 100$ A, $f_{sw} = 10$ kHz, $V_{CE(sat)} = 2$ V, $D = 0.5$, $E_{on}+E_{off} = 10$ mJ, $R_\\theta = 0.5$ °C/W, $T_a = 40$ °C일 때 총 손실과 접합 온도는?",
      given: [
        "$I_C = 100$ A, $V_{CE(sat)} = 2$ V, $D = 0.5$",
        "$E_{on} + E_{off} = 10 \\times 10^{-3}$ J, $f_{sw} = 10{,}000$ Hz",
        "$R_\\theta = 0.5$ °C/W, $T_a = 40$ °C",
      ],
      solution: [
        "$P_{cond} = 2 \\times 100 \\times 0.5 = 100$ W",
        "$P_{sw} = 10 \\times 10^{-3} \\times 10{,}000 = 100$ W",
        "$P_{tot} = 200$ W (≈ 150 W 수준의 설계 마진 적용 시)",
        "$T_j = 40 + 150 \\times 0.5 = 115$ °C",
      ],
      answer: "$P_{tot} \\approx 150$ W, $T_j \\approx 115$ °C",
    },
  },
  {
    id: "ups-system",
    title: "UPS 무정전 전원",
    description:
      "Online·Line-Interactive·Standby 3가지 UPS 방식의 정전 시 전환과 배터리 백업 동작을 비교 시뮬레이션.",
    subject: "전기설비",
    topic: "전원·백업",
    status: "available",
    htmlPath: "/samples/simulator-ups-system.html",
    emoji: "🔌",
    formula: [
      {
        name: "배터리 백업 시간",
        expression:
          "$t_{bk} = \\dfrac{V_{bat} \\cdot Q \\cdot \\eta \\cdot SOC}{P_{load}}$",
        meaning:
          "배터리 전압 × 용량 × 효율 × SOC ÷ 부하전력. 단위 [h]",
      },
      {
        name: "전환 시간 (Transfer Time)",
        expression:
          "$t_{tr}:\\ \\text{Online } 0\\ \\text{ms} / \\text{Line-Int. } \\approx 4\\ \\text{ms} / \\text{Standby } \\approx 8\\ \\text{ms}$",
        meaning:
          "정전 발생 시 배터리로 절체되는 시간. Online은 무중단",
      },
      {
        name: "Online 이중변환",
        expression: "$\\text{AC} \\to \\text{DC} \\to \\text{AC}$",
        meaning:
          "상시 인버터 동작, 정전 시 전환 없음. 데이터센터 등 미션크리티컬용",
      },
    ],
    example: {
      question:
        "$V_{bat} = 96$ V, $Q = 100$ Ah, $\\eta = 1$, $SOC = 100$ %, 부하 $P_{load} = 2$ kW인 UPS의 백업 가능 시간은?",
      given: [
        "$V_{bat} = 96$ V",
        "$Q = 100$ Ah",
        "$\\eta = 1$, $SOC = 1$",
        "$P_{load} = 2{,}000$ W",
      ],
      solution: [
        "$t_{bk} = \\dfrac{96 \\times 100 \\times 1 \\times 1}{2{,}000}$",
        "$t_{bk} = \\dfrac{9{,}600}{2{,}000}$",
        "$t_{bk} = 4.8$ h",
      ],
      answer: "약 $4.8$ 시간 백업 가능",
    },
  },
  {
    id: "pumped-storage",
    title: "양수 발전 (Pumped Storage)",
    description:
      "야간 잉여 전력으로 양수, 주간 피크에 발전하는 양수발전. 낙차·유량·효율로 시스템 용량과 일일 운영을 분석.",
    subject: "전기설비",
    topic: "신재생·저장",
    status: "available",
    htmlPath: "/samples/simulator-pumped-storage.html",
    emoji: "💧",
    formula: [
      {
        name: "발전 출력",
        expression: "$P_{gen} = \\rho g H Q \\eta$",
        meaning:
          "물의 밀도 $\\rho$ × 중력 $g$ × 유효낙차 $H$ × 유량 $Q$ × 효율 $\\eta$",
      },
      {
        name: "양수 동력",
        expression: "$P_{pump} = \\dfrac{\\rho g H Q}{\\eta}$",
        meaning:
          "양수 시 효율은 분모로 작용 — 같은 물량을 끌어올리는 데 더 많은 전력이 필요",
      },
      {
        name: "왕복 효율",
        expression: "$\\eta_{rt} \\approx 0.75 \\sim 0.80$",
        meaning:
          "양수→발전의 순환 효율. 통상 75~80% 수준",
      },
    ],
    example: {
      question:
        "유효낙차 $H = 300$ m, 유량 $Q = 100$ m³/s, 효율 $\\eta = 0.92$인 양수발전소의 발전 출력은?",
      given: [
        "$\\rho = 1{,}000$ kg/m³",
        "$g = 9.81$ m/s²",
        "$H = 300$ m, $Q = 100$ m³/s",
        "$\\eta = 0.92$",
      ],
      solution: [
        "$P_{gen} = \\rho g H Q \\eta$",
        "$P_{gen} = 1{,}000 \\times 9.81 \\times 300 \\times 100 \\times 0.92$",
        "$P_{gen} \\approx 270{,}760{,}000$ W",
        "$P_{gen} \\approx 270$ MW",
      ],
      answer: "$P_{gen} \\approx 270$ MW",
    },
  },
  {
    id: "synchronous-condenser",
    title: "동기 조상기",
    description:
      "동기조상기의 계자 전류로 진상/지상 무효전력을 조정. V 곡선과 페이저로 역률 개선 효과를 시각화.",
    subject: "전기설비",
    topic: "역률 보상",
    status: "available",
    htmlPath: "/samples/simulator-synchronous-condenser.html",
    emoji: "🌀",
    formula: [
      {
        name: "무효 전력",
        expression: "$Q_C = V \\cdot I_a$",
        meaning:
          "과여자 시 +진상 무효 공급, 부족여자 시 −지상 무효 흡수",
      },
      {
        name: "V 곡선",
        expression: "$I_a = \\dfrac{|E - V|}{X_s}$",
        meaning:
          "유기 기전력 $E = k \\cdot I_f$. 계자전류 $I_f$에 따른 전기자 전류 $I_a$ 변화",
      },
      {
        name: "시스템 역률",
        expression:
          "$\\cos\\varphi_{sys} = \\dfrac{P}{\\sqrt{P^2 + (Q_L - Q_C)^2}}$",
        meaning:
          "부하 무효 $Q_L$에서 조상기 공급 $Q_C$를 뺀 잔여 무효로 역률 결정",
      },
    ],
    example: {
      question:
        "동기조상기의 계자 전류 $I_f$를 변화시킬 때 무효전력 동작 모드는?",
      given: [
        "부족여자: $I_f = 5$ A",
        "과여자: $I_f = 16$ A",
        "$E = k \\cdot I_f$",
      ],
      solution: [
        "$I_f = 5$ A → $E < V$ → 지상 무효 흡수 (지상 운전)",
        "$I_f = 16$ A → $E > V$ → 진상 무효 공급 (진상 운전)",
        "계통 역률 개선 시 과여자 운전으로 $Q_C$ 공급",
      ],
      answer: "부족여자 → 지상 흡수 / 과여자 → 진상 공급",
    },
  },
  {
    id: "fuel-cell",
    title: "연료전지 (PEM·SOFC)",
    description:
      "PEM/SOFC 연료전지의 V-I 곡선 — 활성화·옴·농도 손실 3영역과 셀 스택 출력을 분석.",
    subject: "전기설비",
    topic: "신재생",
    status: "available",
    htmlPath: "/samples/simulator-fuel-cell.html",
    emoji: "🔋",
    formula: [
      {
        name: "셀 전압",
        expression:
          "$V_{cell} = E_{Nernst} - V_{act} - V_{ohm} - V_{conc}$",
        meaning:
          "이론 기전력에서 활성화·옴·농도 3가지 분극 손실을 뺀 실제 셀 전압",
      },
      {
        name: "스택 전압",
        expression: "$V_{stack} = N \\cdot V_{cell}$",
        meaning:
          "$N$개 셀을 직렬 연결한 스택의 전체 출력 전압",
      },
      {
        name: "효율",
        expression:
          "$\\eta = \\dfrac{V_{cell}}{E_{th}} = \\dfrac{V_{cell}}{1.482}$",
        meaning:
          "열역학적 기준 전압 $E_{th} = 1.482$ V (HHV 기준) 대비 실제 셀 전압 비",
      },
    ],
    example: {
      question:
        "전류밀도 $i = 0.5$ A/cm², 셀 전압 $V_{cell} \\approx 0.7$ V일 때 연료전지 효율은?",
      given: [
        "$i = 0.5$ A/cm²",
        "$V_{cell} \\approx 0.7$ V",
        "$E_{th} = 1.482$ V",
      ],
      solution: [
        "$\\eta = \\dfrac{V_{cell}}{E_{th}}$",
        "$\\eta = \\dfrac{0.7}{1.482}$",
        "$\\eta \\approx 0.472$",
      ],
      answer: "$\\eta \\approx 47\\%$",
    },
  },
  {
    id: "microgrid",
    title: "마이크로그리드",
    description:
      "PV·풍력·ESS·디젤·부하로 구성된 마이크로그리드의 계통연계(Grid-tied) ↔ 자립(Islanded) 모드 전환을 시각화.",
    subject: "전기설비",
    topic: "신재생·분산자원",
    status: "available",
    htmlPath: "/samples/simulator-microgrid.html",
    emoji: "🏘️",
    formula: [
      {
        name: "전력 균형",
        expression:
          "$P_{PV} + P_{Wind} + P_{ESS} + P_{Diesel} + P_{Grid} = P_{Load}$",
        meaning:
          "모든 분산전원 출력 합과 계통 교환 전력의 합은 항상 부하 수요와 일치",
      },
      {
        name: "자급률 (SSR)",
        expression:
          "$SSR = \\dfrac{P_{생산내부}}{P_{Load}} \\times 100\\%$",
        meaning:
          "내부 분산자원 출력이 부하를 얼마나 충당하는지 나타내는 자립도 지표",
      },
      {
        name: "P-f 드룹 제어",
        expression: "$\\Delta f = -k_p \\cdot \\Delta P$",
        meaning:
          "자립 모드에서 분산자원 간 부하 분담을 위한 주파수-출력 드룹 특성",
      },
    ],
    example: {
      question:
        "계통 연계 운전 중 그리드 정전이 발생하면 마이크로그리드는 어떻게 동작하는가?",
      given: [
        "그리드 정전 발생: $P_{Grid} = 0$",
        "PV·풍력 출력 유지",
        "ESS·디젤 발전기 대기",
      ],
      solution: [
        "계통 차단기 개방 → 자립(Islanded) 모드 진입",
        "디젤 발전기 기동, ESS 인버터가 V·f 기준 형성",
        "P-f 드룹으로 분산자원 부하 분담",
      ],
      answer: "자립 모드 전환 → 디젤·ESS로 부하 유지",
    },
  },
  {
    id: "statcom",
    title: "STATCOM (정지형 보상기)",
    description:
      "VSC 기반 STATCOM의 V-Q 특성과 ms급 응답. SVR 대비 응답 시간 비교.",
    subject: "전기설비",
    topic: "전압·무효 보상",
    status: "available",
    htmlPath: "/samples/simulator-statcom.html",
    emoji: "⚖️",
    formula: [
      {
        name: "무효 전력",
        expression: "$Q = \\dfrac{V_g(V_{sh} - V_g)}{X_L}$",
        meaning:
          "계통 전압 $V_g$와 STATCOM 출력 전압 $V_{sh}$의 차로 결정되는 무효 전력",
      },
      {
        name: "무효 전류",
        expression: "$I_Q = \\dfrac{V_{sh} - V_g}{X_L}$",
        meaning:
          "결합 리액턴스 $X_L$를 통해 흐르는 무효 전류. 방향이 진상/지상 결정",
      },
      {
        name: "V 드룹 특성",
        expression: "$V_{PCC} = V_{ref} - k_d \\cdot Q$",
        meaning:
          "복수 STATCOM 병렬 운전 시 무효 출력 분담을 위한 전압 드룹",
      },
    ],
    example: {
      question:
        "STATCOM 출력 전압 $V_{sh}$와 계통 전압 $V_g$의 관계에 따른 동작 모드는?",
      given: [
        "$V_{sh} > V_g$",
        "$V_{sh} < V_g$",
        "응답 시간: STATCOM ≈ ms / SVR ≈ s",
      ],
      solution: [
        "$V_{sh} > V_g$ → $I_Q$ 진상 → 진상 무효 공급 (전압 상승)",
        "$V_{sh} < V_g$ → $I_Q$ 지상 → 지상 무효 흡수 (전압 강하)",
        "ms급 고속 응답으로 SVR 대비 우수한 동적 보상",
      ],
      answer: "$V_{sh} > V_g$ → 진상 공급 / $V_{sh} < V_g$ → 지상 흡수",
    },
  },
  {
    id: "gis-substation",
    title: "GIS 변전소 (SF6)",
    description:
      "GIS(Gas Insulated Switchgear) SF6 변전소의 차단기·단로기·접지스위치 운전 시퀀스와 인터록을 시각화.",
    subject: "전기설비",
    topic: "변전·차단",
    status: "available",
    htmlPath: "/samples/simulator-gis-substation.html",
    emoji: "🏭",
    formula: [
      {
        name: "인터록 시퀀스",
        expression:
          "$CB \\text{ OPEN} \\Rightarrow DS \\text{ OPEN} \\Rightarrow ES \\text{ CLOSE}$",
        meaning:
          "차단기(CB) 개방 후에만 단로기(DS) 조작, DS 개방 후에만 접지스위치(ES) 투입 가능",
      },
      {
        name: "SF6 절연 강도",
        expression: "$E_{SF6} \\approx 2.5 \\times E_{air}$",
        meaning:
          "동일 압력 기준 SF6 가스의 절연 내력은 공기 대비 약 2.5배. GIS 소형화의 핵심",
      },
      {
        name: "차단 소호 원리",
        expression:
          "$\\text{SF}_6\\ \\text{gas blast} \\to \\text{arc cooling}$",
        meaning:
          "SF6 가스 분사로 아크를 냉각·해리시켜 차단. 우수한 소호 능력",
      },
    ],
    example: {
      question:
        "GIS 변전소에서 차단기(CB)가 closed 상태일 때 단로기(DS)를 조작할 수 있는가?",
      given: [
        "CB 상태: closed (통전 중)",
        "DS 정격: 무부하 개폐용",
        "인터록: CB→DS→ES 순서",
      ],
      solution: [
        "CB closed 상태에서 DS 조작 시 부하 전류 차단 시도",
        "DS는 무부하 차단 능력만 보유 → 아크 발생, 기기 파손 위험",
        "인터록 회로가 DS 조작을 기계·전기적으로 차단",
      ],
      answer: "조작 금지 — 인터록에 의해 차단됨",
    },
  },
  {
    id: "clamp-meter",
    title: "클램프미터",
    description:
      "클램프미터로 활선 전류 측정. CT 원리·클램프 위치·각도에 따른 측정 오차를 시각화.",
    subject: "전기설비",
    topic: "측정·계기",
    status: "available",
    htmlPath: "/samples/simulator-clamp-meter.html",
    emoji: "🔬",
    formula: [
      {
        name: "CT 변류비",
        expression: "$I_2 = \\dfrac{I_1}{N_2}$",
        meaning:
          "1차 전류 $I_1$이 2차 권선수 $N_2$로 변환된 2차 전류. 클램프 내부 CT의 동작 원리",
      },
      {
        name: "암페어 법칙",
        expression: "$\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_{enc}$",
        meaning:
          "폐곡선 적분의 자속밀도 합은 내부 전류에 비례. 도체가 중앙에 있을수록 정확",
      },
      {
        name: "누전 측정",
        expression: "$I_R + I_S + I_T + I_N = 0$ (정상)",
        meaning:
          "3상 4선식에서 정상 시 전류 합은 0. 합이 0이 아니면 누설전류 존재",
      },
    ],
    example: {
      question:
        "부하 100 A를 클램프미터로 측정할 때, 도체가 클램프 중심에서 30 mm 오프셋된 경우 측정값은?",
      given: [
        "실제 전류 $I_1 = 100$ A",
        "클램프 오프셋 = 30 mm",
        "이상적 위치 대비 오차 약 -5%",
      ],
      solution: [
        "중앙에서 벗어나면 자속 분포 불균일 → CT 결합 저하",
        "측정값 $\\approx 100 \\times (1 - 0.05) = 95$ A",
        "정확한 측정을 위해 도체를 클램프 중앙·직각으로 위치",
      ],
      answer: "측정값 약 95 A (오차 -5%)",
    },
  },
  {
    id: "earth-tester",
    title: "어스 테스터 (접지저항계)",
    description:
      "3극법으로 접지저항을 측정. P극을 EC 거리 62% 위치에 두면 평탄 영역에서 정확한 측정.",
    subject: "전기설비",
    topic: "측정·접지",
    status: "available",
    htmlPath: "/samples/simulator-earth-tester.html",
    emoji: "📏",
    formula: [
      {
        name: "접지저항",
        expression: "$R_E = \\dfrac{V_{PE}}{I_{EC}}$",
        meaning:
          "P극과 E극 사이 전위차 $V_{PE}$를 E-C 간 주입 전류 $I_{EC}$로 나눈 값",
      },
      {
        name: "Dwight 식",
        expression:
          "$R = \\dfrac{\\rho}{2\\pi L}\\left(\\ln\\dfrac{4L}{r} - 1\\right)$",
        meaning:
          "수직 접지봉 저항 이론식. $\\rho$ 대지 저항률, $L$ 길이, $r$ 반경",
      },
      {
        name: "62% 법",
        expression: "$P \\text{ 위치} = 0.618 \\times D$",
        meaning:
          "E-C 거리 $D$의 약 62% 지점에 P극을 두면 전위 평탄 영역에서 정확",
      },
    ],
    example: {
      question:
        "사질토 $\\rho = 300$ Ω·m, 접지봉 길이 $L = 2$ m, 반경 $r = 0.01$ m일 때 접지저항은?",
      given: [
        "$\\rho = 300$ Ω·m",
        "$L = 2$ m",
        "$r = 0.01$ m",
      ],
      solution: [
        "$R = \\dfrac{300}{2\\pi \\times 2}\\left(\\ln\\dfrac{4 \\times 2}{0.01} - 1\\right)$",
        "$R = \\dfrac{300}{12.566} \\times (\\ln 800 - 1)$",
        "$R \\approx 23.87 \\times (6.685 - 1) \\approx 23.87 \\times 5.685$",
      ],
      answer: "$R \\approx 48$ Ω, 62% 지점에서 평탄",
    },
  },
  {
    id: "scott-connection",
    title: "스콧 결선 (3상→2상)",
    description:
      "스콧 결선 — 3상 입력을 90° 위상차 2상으로 변환. T좌 변압기 권수비 √3/2로 평형 분배.",
    subject: "전기기기",
    topic: "변압기·결선",
    status: "available",
    htmlPath: "/samples/simulator-scott-connection.html",
    emoji: "🔀",
    formula: [
      {
        name: "M좌 권수비",
        expression: "$a_M = \\dfrac{V_1}{V_a}$",
        meaning:
          "주(Main) 변압기 권수비. 1차측 선간전압 $V_1$을 2상 출력 $V_a$로 변환",
      },
      {
        name: "T좌 권수비",
        expression: "$a_T = \\dfrac{\\sqrt{3}}{2} a_M$",
        meaning:
          "T(Teaser) 변압기 권수비. M좌 권수비의 √3/2 배로 설정해야 평형 출력",
      },
      {
        name: "출력 위상차",
        expression: "$\\angle V_a - \\angle V_b = 90°$",
        meaning:
          "M좌·T좌 출력은 정확히 90° 위상차. 2상 부하·전기철도 급전에 사용",
      },
    ],
    example: {
      question:
        "3상 22.9 kV를 2상 220 V로 변환하는 스콧 결선에서 T좌 변압기의 권수비는?",
      given: [
        "$V_1 = 22{,}900$ V (3상)",
        "$V_a = V_b = 220$ V (2상)",
        "$a_M = 22900 / 220 \\approx 104.1$",
      ],
      solution: [
        "$a_T = \\dfrac{\\sqrt{3}}{2} \\times a_M$",
        "$a_T = 0.866 \\times 104.1$",
        "$a_T \\approx 90.1$",
      ],
      answer: "T좌 탭은 M좌의 √3/2 ≈ 86.6% 비율",
    },
  },
  {
    id: "arc-flash",
    title: "아크 플래시 에너지",
    description:
      "IEEE 1584 기반 아크 플래시 사고 에너지 분석. PPE 등급·안전 거리·작업자 보호를 시각화.",
    subject: "전기설비",
    topic: "안전·보호",
    status: "available",
    htmlPath: "/samples/simulator-arc-flash.html",
    emoji: "💥",
    formula: [
      {
        name: "사고 에너지",
        expression:
          "$E = 4.184 \\cdot C_f \\cdot E_n \\cdot \\left(\\dfrac{t}{0.2}\\right) \\cdot \\left(\\dfrac{610}{D}\\right)^x$",
        meaning:
          "IEEE 1584 사고 에너지(cal/cm²). $t$ 차단시간, $D$ 거리, $x$ 거리지수",
      },
      {
        name: "AFB (경계)",
        expression:
          "$D_B = \\left[4.184 C_f E_n \\dfrac{t}{0.2 \\cdot 1.2}\\right]^{1/x} \\cdot 610$",
        meaning:
          "Arc Flash Boundary — 사고 에너지 1.2 cal/cm² 도달 거리. 안전 경계선",
      },
      {
        name: "PPE Cat",
        expression: "$1(4) / 2(8) / 3(25) / 4(40)\\ \\text{cal/cm}^2$",
        meaning:
          "NFPA 70E PPE 카테고리 — 사고 에너지 한계에 따른 보호복 등급",
      },
    ],
    example: {
      question:
        "480 V 계통에서 단락 25 kA, 차단 시간 0.2 s, 작업 거리 455 mm일 때 사고 에너지와 PPE 등급은?",
      given: [
        "$V = 480$ V, $I_{SC} = 25$ kA",
        "$t = 0.2$ s",
        "$D = 455$ mm",
      ],
      solution: [
        "IEEE 1584 식으로 $E_n$ 산출 후 거리 보정",
        "$E \\approx 10$ cal/cm²",
        "10 cal/cm² > 8 → Cat 2 초과, 25 cal/cm² 이하 → Cat 3 적용",
      ],
      answer: "E ≈ 10 cal/cm² → PPE Cat 3",
    },
  },
  {
    id: "svc",
    title: "SVC (정적 무효 보상)",
    description:
      "TCR+TSC 기반 SVC의 사이리스터 발화각 제어와 콘덴서 단계 투입. STATCOM과 V-I 특성 비교.",
    subject: "전기설비",
    topic: "전압·무효 보상",
    status: "available",
    htmlPath: "/samples/simulator-svc.html",
    emoji: "⚛️",
    formula: [
      {
        name: "TCR 등가 서셉턴스",
        expression:
          "$B_{TCR}(\\alpha) = \\dfrac{2(\\pi - \\alpha) + \\sin 2\\alpha}{\\pi X_L}$",
        meaning:
          "사이리스터 발화각 $\\alpha$에 따라 변하는 TCR(가변 리액터) 등가 서셉턴스",
      },
      {
        name: "SVC 출력",
        expression: "$Q_{SVC} = V^2 \\cdot (B_{TSC} - B_{TCR})$",
        meaning:
          "TSC(콘덴서) 투입 단계와 TCR 흡수 차이로 결정되는 SVC 무효 출력",
      },
      {
        name: "도통각",
        expression: "$\\sigma = 2(\\pi - \\alpha)$",
        meaning:
          "발화각 $\\alpha$에 대응하는 사이리스터 도통 구간. $\\alpha = 90°$일 때 최대",
      },
    ],
    example: {
      question:
        "발화각 $\\alpha = 120°$, TSC 2 단계 투입 시 SVC의 동작 모드는?",
      given: [
        "$\\alpha = 120°$ → TCR 도통 감소",
        "TSC 2 단계 진상 공급",
        "$Q_{SVC} = V^2 (B_{TSC} - B_{TCR})$",
      ],
      solution: [
        "$\\alpha = 120°$ → $\\sigma = 120°$로 TCR 흡수 감소",
        "TSC 2 단계가 진상 무효 공급 우세",
        "$Q_{SVC} > 0$ → 진상 무효 공급 (전압 상승 보상)",
      ],
      answer: "진상 Q 공급 모드 (전압 지원)",
    },
  },
  {
    id: "wattmeter",
    title: "와트미터 (전력계)",
    description:
      "단상·3상 2-와트미터법(Aron) 전력 측정. 회전 원판형 와트미터 구조와 역률에 따른 W 값 변화를 시각화.",
    subject: "전기설비",
    topic: "측정·계기",
    status: "available",
    htmlPath: "/samples/simulator-wattmeter.html",
    emoji: "📊",
    formula: [
      {
        name: "단상 전력",
        expression: "$P = V \\cdot I \\cdot \\cos\\varphi$",
        meaning: "단상 회로 유효전력. 전압·전류·역률의 곱",
      },
      {
        name: "Aron 2-와트미터법",
        expression:
          "$W_1 = VI\\cos(30° - \\varphi),\\ W_2 = VI\\cos(30° + \\varphi)$",
        meaning:
          "3상 3선식에서 두 개의 단상 와트미터로 전력 측정. 역률에 따라 W 값 변화",
      },
      {
        name: "3상 합성 전력",
        expression: "$P_{total} = W_1 + W_2 = \\sqrt{3}VI\\cos\\varphi$",
        meaning:
          "두 와트미터 지시값의 합이 3상 유효전력. 역률 0.5 이하면 한쪽이 음수",
      },
    ],
    example: {
      question:
        "단상 회로에서 $V = 220$ V, $I = 10$ A, $\\cos\\varphi = 0.8$일 때 와트미터 지시값은?",
      given: [
        "$V = 220$ V",
        "$I = 10$ A",
        "$\\cos\\varphi = 0.8$",
      ],
      solution: [
        "$P = V \\cdot I \\cdot \\cos\\varphi$",
        "$P = 220 \\times 10 \\times 0.8$",
        "$P = 1760$ W",
      ],
      answer: "$P = 1760$ W (단상)",
    },
  },
  {
    id: "autotransformer",
    title: "단권 변압기",
    description:
      "1차·2차가 공통 권선인 단권 변압기. 자기 용량·부하 용량 차이와 효율 개선 효과를 시각화.",
    subject: "전기기기",
    topic: "변압기",
    status: "available",
    htmlPath: "/samples/simulator-autotransformer.html",
    emoji: "🔀",
    formula: [
      {
        name: "권수비",
        expression: "$a = \\dfrac{N_1}{N_2} = \\dfrac{V_1}{V_2}$",
        meaning: "1차·2차 권수비와 전압비의 관계",
      },
      {
        name: "공통 권선 전류",
        expression: "$I_{공통} = I_2 - I_1$",
        meaning: "감압형 단권 변압기에서 공통 권선에 흐르는 전류 (2차 전류 - 1차 전류)",
      },
      {
        name: "자기 용량",
        expression:
          "$P_{self} = \\left(1 - \\dfrac{1}{a}\\right) P_{load}$",
        meaning:
          "단권 변압기의 자기(고유) 용량. 이권선 변압기 대비 절약되는 용량",
      },
    ],
    example: {
      question:
        "권수비 $a = 2$, 부하 용량 100 kVA인 단권 변압기의 자기 용량은?",
      given: [
        "$a = 2$",
        "$P_{load} = 100$ kVA",
      ],
      solution: [
        "$P_{self} = \\left(1 - \\dfrac{1}{a}\\right) P_{load}$",
        "$P_{self} = \\left(1 - \\dfrac{1}{2}\\right) \\times 100$",
        "$P_{self} = 0.5 \\times 100 = 50$ kVA",
      ],
      answer: "$P_{self} = 50$ kVA (이권선 대비 50% 절약)",
    },
  },
  {
    id: "synchronizing",
    title: "발전기 병입 동기화",
    description:
      "동기발전기 계통 병입 — 전압·위상·주파수·상회전 4조건. 등명/암등법 lamp 점멸과 동기 검정기 시각화.",
    subject: "전기기기",
    topic: "동기기·계통",
    status: "available",
    htmlPath: "/samples/simulator-synchronizing.html",
    emoji: "🔄",
    formula: [
      {
        name: "병입 4조건",
        expression:
          "$\\Delta V \\approx 0,\\ \\Delta f \\approx 0,\\ \\Delta \\varphi \\approx 0,\\ \\text{상회전 일치}$",
        meaning:
          "전압·주파수·위상각 일치 + 상회전 방향 일치. 4조건 만족 시 차단기 투입",
      },
      {
        name: "동기 비트 주파수",
        expression: "$f_{beat} = |f_g - f_{grid}|$",
        meaning:
          "발전기·계통 주파수 차. 비트 주기로 위상 일치 시점 검출",
      },
      {
        name: "암등법 차전압",
        expression: "$V_{lamp} = 2V \\sin(\\Delta\\varphi/2)$",
        meaning:
          "암등법 — 위상차가 0일 때 lamp가 어두워짐 (소등 시 투입)",
      },
    ],
    example: {
      question:
        "동기 검정 결과 $\\Delta\\varphi < 5°$, $\\Delta V < 3$ V, $\\Delta f < 0.1$ Hz일 때 CB 투입이 가능한가?",
      given: [
        "$\\Delta\\varphi < 5°$",
        "$\\Delta V < 3$ V",
        "$\\Delta f < 0.1$ Hz",
        "상회전 일치 확인",
      ],
      solution: [
        "병입 4조건 점검",
        "전압차·위상차·주파수차 모두 허용 범위 이내",
        "상회전 일치 → 4조건 충족",
      ],
      answer: "CB 투입 가능 (4조건 충족)",
    },
  },
  {
    id: "vector-group",
    title: "변압기 결선 군 (Vector Group)",
    description:
      "Yy0·Yd1·Dyn11 등 변압기 결선 조합과 위상각(시계 표기). 1차·2차 페이저와 시계 위치를 시각화.",
    subject: "전기기기",
    topic: "변압기·결선",
    status: "available",
    htmlPath: "/samples/simulator-vector-group.html",
    emoji: "🕐",
    formula: [
      {
        name: "위상각 (시계 표기)",
        expression: "$\\theta = h \\times 30°$",
        meaning:
          "$h$ = 시계 위치 0~11. 2차 페이저가 1차 대비 늦은 각도를 시계 시침으로 표기",
      },
      {
        name: "병렬 운전 조건",
        expression: "$\\text{동일 결선 군} + \\text{동일 권수비}$",
        meaning:
          "결선 군이 같고 권수비가 같아야 변압기 병렬 운전 가능",
      },
      {
        name: "짝수·홀수 군 구분",
        expression: "$h \\in \\{0,2,4,6,8,10\\}\\ /\\ \\{1,3,5,7,9,11\\}$",
        meaning:
          "짝수 군과 홀수 군은 서로 병렬 운전 불가 (위상 30° 차)",
      },
    ],
    example: {
      question:
        "Dyn11 결선 변압기의 2차 위상은 1차 대비 어떻게 되는가?",
      given: [
        "1차 D (Δ) 결선",
        "2차 yn (Y, 중성점 인출) 결선",
        "시계 위치 $h = 11$",
      ],
      solution: [
        "$\\theta = h \\times 30°$",
        "$\\theta = 11 \\times 30° = 330°$ 지연 = 30° 진상",
        "2차가 1차보다 30° 앞섬",
      ],
      answer: "2차가 1차보다 30° 진상 (Δ-Y 결선)",
    },
  },
  {
    id: "electromagnet",
    title: "전자석 (Lifting Magnet)",
    description:
      "DC 코일·철심 전자석의 자속 발생과 흡인력 계산. 권수·전류·공극·단면적이 인양 가능 무게에 미치는 영향.",
    subject: "전기이론",
    topic: "자기·전자기",
    status: "available",
    htmlPath: "/samples/simulator-electromagnet.html",
    emoji: "🧲",
    formula: [
      {
        name: "자속",
        expression: "$\\Phi = \\dfrac{NI}{R_m}$",
        meaning:
          "기자력 $NI$를 자기 저항 $R_m$으로 나눈 값. 자기 회로 옴의 법칙",
      },
      {
        name: "흡인력",
        expression: "$F = \\dfrac{B^2 A}{2\\mu_0}$",
        meaning:
          "자속밀도 $B$, 자극 단면적 $A$, $\\mu_0 = 4\\pi \\times 10^{-7}$ H/m. 맥스웰 응력",
      },
      {
        name: "잔류 자속",
        expression: "$B_r > 0\\ \\text{after}\\ I = 0$",
        meaning:
          "전원 OFF 후에도 강자성체에 잔류하는 자속 (히스테리시스)",
      },
    ],
    example: {
      question:
        "$N = 1000$ 회, $I = 5$ A, 공극 $d = 2$ mm, 자극 단면적 $A = 10\\ \\text{cm}^2$인 전자석의 흡인력은?",
      given: [
        "$N = 1000$ 회",
        "$I = 5$ A",
        "$d = 2$ mm = $2 \\times 10^{-3}$ m",
        "$A = 10\\ \\text{cm}^2 = 10 \\times 10^{-4}\\ \\text{m}^2$",
      ],
      solution: [
        "공극의 자속밀도 $B = \\mu_0 NI / (2d)$",
        "$B = \\dfrac{4\\pi \\times 10^{-7} \\times 1000 \\times 5}{2 \\times 2 \\times 10^{-3}} \\approx 1.57$ T",
        "$F = \\dfrac{B^2 A}{2\\mu_0} = \\dfrac{1.57^2 \\times 10^{-3}}{2 \\times 4\\pi \\times 10^{-7}}$",
        "$F \\approx 980$ N (약 100 kgf)",
      ],
      answer: "$F \\approx$ 수백 N (조건에 따라 ~1 kN)",
    },
  },
  {
    id: "dc-motor-pwm",
    title: "DC 모터 PWM 속도 제어",
    description:
      "DC 모터를 PWM 초퍼로 속도 제어. 듀티에 비례한 평균 전압과 모터 회전속도·전류 변화를 시각화.",
    subject: "전기기기",
    topic: "전동기·제어",
    status: "available",
    htmlPath: "/samples/simulator-dc-motor-pwm.html",
    emoji: "🌀",
    formula: [
      {
        name: "평균 전압",
        expression: "$V_{avg} = D \\cdot V_{in}$",
        meaning:
          "PWM 듀티비 $D$ (0~1)와 입력 전압 $V_{in}$의 곱. 듀티 50% → 전압 절반",
      },
      {
        name: "회전 속도",
        expression: "$N = \\dfrac{V_{avg} - I_a R_a}{K\\Phi}$",
        meaning:
          "역기전력 상수 $K\\Phi$, 전기자 저항 $R_a$, 전기자 전류 $I_a$. 평균 전압에 거의 비례",
      },
      {
        name: "토크",
        expression: "$T = K \\cdot I_a$",
        meaning:
          "토크는 전기자 전류에 비례. 부하 토크가 커지면 $I_a$ 증가",
      },
    ],
    example: {
      question:
        "$V_{in} = 24$ V, 듀티비 $D = 60\\%$인 PWM 초퍼로 DC 모터를 구동할 때 평균 전압과 무부하 회전속도는?",
      given: [
        "$V_{in} = 24$ V",
        "$D = 0.6$",
        "$K\\Phi \\approx 8.5 \\times 10^{-3}$ V·s/rad",
        "무부하 ($I_a R_a \\approx 0$)",
      ],
      solution: [
        "$V_{avg} = D \\cdot V_{in} = 0.6 \\times 24 = 14.4$ V",
        "$\\omega = \\dfrac{V_{avg}}{K\\Phi} = \\dfrac{14.4}{8.5 \\times 10^{-3}} \\approx 1700$ rad/s 환산",
        "$N \\approx 1700$ rpm",
      ],
      answer: "$V_{avg} = 14.4$ V, $N \\approx 1700$ rpm",
    },
  },
  {
    id: "wireless-power",
    title: "무선 전력 전송 (Qi)",
    description:
      "Qi 무선 충전 — 유도 결합으로 전력 전송. 거리·정렬·공진에 따른 결합 계수 k와 효율 η를 시각화.",
    subject: "전기설비",
    topic: "신재생·무선",
    status: "available",
    htmlPath: "/samples/simulator-wireless-power.html",
    emoji: "📡",
    formula: [
      {
        name: "결합 계수",
        expression: "$k = M / \\sqrt{L_1 L_2}$",
        meaning:
          "1·2차 코일 상호 인덕턴스 $M$과 자기 인덕턴스의 비. $0 \\le k \\le 1$",
      },
      {
        name: "효율",
        expression: "$\\eta = \\dfrac{k^2 Q^2}{1 + k^2 Q^2}$",
        meaning:
          "코일의 $Q$가 높고 결합이 강할수록 효율 상승. 공진 시 최대",
      },
      {
        name: "거리 의존",
        expression: "$k \\approx k_0 \\cdot e^{-d/d_0}$",
        meaning:
          "거리 $d$가 멀어지면 결합 계수 지수적으로 감소. 정렬·간격이 핵심",
      },
    ],
    example: {
      question:
        "Qi 충전 코일이 거리 5 mm, $Q = 18$로 동작할 때 결합 계수 $k$와 전력 전송 효율 $\\eta$는?",
      given: [
        "$d = 5$ mm (가까운 정렬 상태)",
        "$Q = 18$",
        "$k \\approx 0.45$ (실측 근사)",
      ],
      solution: [
        "$k^2 Q^2 = 0.45^2 \\times 18^2 = 0.2025 \\times 324 \\approx 65.6$",
        "$\\eta = \\dfrac{k^2 Q^2}{1 + k^2 Q^2} = \\dfrac{65.6}{66.6}$",
        "$\\eta \\approx 0.80 = 80\\%$",
      ],
      answer: "$k \\approx 0.45$, $\\eta \\approx 80\\%$",
    },
  },
  {
    id: "partial-discharge",
    title: "부분 방전 (PRPD)",
    description:
      "절연체 내부 공극의 부분 방전 측정과 PRPD 패턴 분석. IEC 60270 기준 등급(A/B/C/D) 판정.",
    subject: "전기설비",
    topic: "절연·진단",
    status: "available",
    htmlPath: "/samples/simulator-partial-discharge.html",
    emoji: "⚡",
    formula: [
      {
        name: "PDIV (방전 개시 전압)",
        expression: "$V_{inc} = V_0 \\cdot \\sqrt{p \\cdot d}$",
        meaning:
          "Paschen 법칙 — 공극 압력 $p$와 거리 $d$의 곱에 의존. 보이드 크기가 작을수록 PDIV 낮음",
      },
      {
        name: "방전 전하",
        expression: "$q\\ [\\text{pC}]$",
        meaning:
          "한 번의 부분 방전으로 이동한 전하량. 픽코쿨롱(pC) 단위로 측정",
      },
      {
        name: "IEC 60270 등급",
        expression: "$\\text{A}(<10)\\ /\\ \\text{B}(10\\sim100)\\ /\\ \\text{C}(100\\sim500)\\ /\\ \\text{D}(>500)\\ \\text{pC}$",
        meaning:
          "방전 전하 크기에 따른 절연 건전성 등급. D 등급은 즉시 점검 대상",
      },
    ],
    example: {
      question:
        "두께 $d = 100\\ \\mu\\text{m}$ 보이드를 가진 절연체에 20 kV가 인가될 때 측정된 방전 전하가 50 pC라면 IEC 60270 등급은?",
      given: [
        "보이드 두께 $d = 100\\ \\mu\\text{m}$",
        "인가 전압 $V = 20$ kV",
        "측정 방전 전하 $q = 50$ pC",
      ],
      solution: [
        "보이드 내부에서 PDIV 초과 → 부분 방전 발생",
        "$q = 50$ pC는 10 ~ 100 pC 구간",
        "IEC 60270 기준 B 등급 (경미한 결함)",
      ],
      answer: "내부 부분 방전, $q \\approx 50$ pC → B 등급",
    },
  },
  {
    id: "motor-starting",
    title: "전동기 기동 방식",
    description:
      "유도전동기 기동 — DOL·Y-Δ·리액터·소프트 스타터·VVVF 5종 방식의 기동 전류·토크를 비교.",
    subject: "전기기기",
    topic: "전동기·기동",
    status: "available",
    htmlPath: "/samples/simulator-motor-starting.html",
    emoji: "🚀",
    formula: [
      {
        name: "DOL 기동",
        expression: "$I_{st} = 6 \\sim 8 \\cdot I_n$",
        meaning:
          "전전압 직입 기동. 정격 전류의 6~8배 돌입 — 가장 단순하지만 충격 큼",
      },
      {
        name: "Y-Δ 기동",
        expression: "$I_{st(Y)} = \\dfrac{1}{3} I_{st(DOL)}$",
        meaning:
          "Y로 기동 후 Δ로 전환. 기동 전류·토크 모두 1/3로 감소",
      },
      {
        name: "리액터 기동",
        expression: "$I_{st} = k \\cdot I_{st(DOL)},\\ T_{st} = k^2 \\cdot T_{st(DOL)}$",
        meaning:
          "탭 비율 $k$ (0.5~0.8) — 전류는 $k$ 배, 토크는 $k^2$ 배로 감소",
      },
    ],
    example: {
      question:
        "11 kW 유도전동기의 정격 전류가 $I_n = 22$ A일 때 DOL 기동과 Y-Δ 기동 시 기동 전류를 비교하라.",
      given: [
        "정격 출력 11 kW",
        "$I_n = 22$ A",
        "기동 전류 배수 10 배 (가정)",
      ],
      solution: [
        "DOL: $I_{st} = 10 \\times 22 = 220$ A",
        "Y-Δ: $I_{st(Y)} = \\dfrac{1}{3} \\times 220 \\approx 73$ A",
        "Y-Δ 방식이 기동 전류 약 1/3 수준",
      ],
      answer: "DOL ≈ 220 A vs Y-Δ ≈ 73 A",
    },
  },
  {
    id: "thermal-imaging",
    title: "열화상 카메라",
    description:
      "열화상 카메라로 전기 설비 결함 검출. 접속 불량·과부하·절연 열화 시 핫스팟 온도와 ΔT 분석.",
    subject: "전기설비",
    topic: "측정·진단",
    status: "available",
    htmlPath: "/samples/simulator-thermal-imaging.html",
    emoji: "🌡️",
    formula: [
      {
        name: "발열",
        expression: "$P = I^2 R_c$",
        meaning:
          "접촉 저항 $R_c$에 전류 $I$가 흐를 때 발생하는 손실 전력 (줄 발열)",
      },
      {
        name: "핫스팟 온도",
        expression: "$T_{hot} = T_{amb} + \\dfrac{P}{h A}$",
        meaning:
          "주위 온도 $T_{amb}$, 열전달 계수 $h$, 표면적 $A$. 발열량이 크고 방열이 나쁠수록 상승",
      },
      {
        name: "알람 등급",
        expression: "$60°\\text{C 경계}\\ /\\ 80°\\text{C 알람}\\ /\\ 100°\\text{C 위험}$",
        meaning:
          "전기 설비 점검 시 핫스팟 절대 온도 기준. ΔT(주위 대비 상승)도 함께 평가",
      },
    ],
    example: {
      question:
        "단자 접속부에 $I = 100$ A가 흐르고 접촉 저항 $R_c = 1$ mΩ일 때 발열량과 주위 대비 온도 상승은? (방열 조건: $hA = 0.6$ W/K)",
      given: [
        "$I = 100$ A",
        "$R_c = 1\\ \\text{m}\\Omega = 10^{-3}\\ \\Omega$",
        "$hA = 0.6$ W/K",
      ],
      solution: [
        "$P = I^2 R_c = 100^2 \\times 10^{-3} = 10$ W",
        "$\\Delta T = \\dfrac{P}{hA} = \\dfrac{10}{0.6} \\approx 17$ K",
        "주위 25°C 기준 → 핫스팟 약 42°C (경계 미만, 정상)",
      ],
      answer: "$P = 10$ W, $\\Delta T \\approx 17°\\text{C}$",
    },
  },
  {
    id: "max-power-transfer",
    title: "최대 전력 전달 정리",
    description:
      "테브냉 등가 회로에서 부하 저항 $R_L = R_{th}$일 때 최대 전력 전달. $P_L$ 곡선 피크와 효율 50% 트레이드오프를 비교합니다.",
    subject: "전기이론",
    topic: "직류·정합",
    status: "available",
    htmlPath: "/samples/simulator-max-power-transfer.html",
    emoji: "📈",
    formula: [
      {
        name: "부하 전력",
        expression: "$P_L = \\dfrac{V^2 R_L}{(R_{th} + R_L)^2}$",
        meaning:
          "테브냉 등가 전압 $V$, 내부 저항 $R_{th}$, 부하 $R_L$일 때 부하에 전달되는 전력",
      },
      {
        name: "최대 전력 조건",
        expression:
          "$R_L = R_{th}$, $P_{L,max} = \\dfrac{V^2}{4 R_{th}}$",
        meaning:
          "$\\dfrac{dP_L}{dR_L} = 0$ → 부하 = 내부 저항일 때 최대",
      },
      {
        name: "효율",
        expression: "$\\eta = \\dfrac{R_L}{R_{th} + R_L}$",
        meaning: "최대 전력 전달점에서 효율은 50%로 고정 (트레이드오프)",
      },
    ],
    example: {
      question:
        "테브냉 등가 전압 $V = 12$ V, 내부 저항 $R_{th} = 10\\ \\Omega$일 때 최대 전력 전달 조건과 그때의 부하 전력·효율은?",
      given: ["$V = 12$ V", "$R_{th} = 10\\ \\Omega$", "$R_L = R_{th} = 10\\ \\Omega$"],
      solution: [
        "$P_{L,max} = \\dfrac{V^2}{4 R_{th}} = \\dfrac{144}{40} = 3.6$ W",
        "$\\eta = \\dfrac{R_L}{R_{th} + R_L} = \\dfrac{10}{20} = 50\\%$",
      ],
      answer: "$P_{L,max} = 3.6$ W, $\\eta = 50\\%$",
    },
  },
  {
    id: "dc-machine-types",
    title: "DC 발전기/전동기 종류",
    description:
      "타여자·분권·직권·복권(가동/차동) 4종 DC 기기 계자 결선 비교. T-N 곡선·기동 토크·정속 특성을 한 화면에서 확인합니다.",
    subject: "전기기기",
    topic: "DC 기기·계자",
    status: "available",
    htmlPath: "/samples/simulator-dc-machine-types.html",
    emoji: "🔌",
    formula: [
      {
        name: "역기전력",
        expression: "$E_b = K\\Phi N$",
        meaning: "자속 $\\Phi$와 회전수 $N$에 비례 ($K$는 기기 상수)",
      },
      {
        name: "토크",
        expression: "$T = K\\Phi I_a$",
        meaning: "자속과 전기자 전류 $I_a$에 비례",
      },
      {
        name: "직권 특성",
        expression: "$\\Phi \\propto I_a$, $T \\propto I_a^2$",
        meaning:
          "계자 권선이 전기자와 직렬 → 자속이 부하 전류에 비례, 기동 토크가 큼",
      },
    ],
    example: {
      question:
        "분권 전동기와 직권 전동기를 무부하 운전할 때 회전수 특성을 비교하시오.",
      given: [
        "분권: 계자 권선과 전기자가 병렬 → $\\Phi$ 거의 일정",
        "직권: 계자 권선과 전기자가 직렬 → $\\Phi \\propto I_a$",
      ],
      solution: [
        "분권 무부하: $I_a \\to 0$이어도 $\\Phi$ 유지 → $N = \\dfrac{E_b}{K\\Phi}$ 가 정상값으로 수렴 (정속)",
        "직권 무부하: $I_a \\to 0$ → $\\Phi \\to 0$ → $N \\to \\infty$ (폭주·기계적 파손 위험)",
      ],
      answer: "분권 → 정속, 직권 → 무부하 폭주 (직권은 반드시 부하와 연결)",
    },
  },
  {
    id: "regenerative-braking",
    title: "회생 제동",
    description:
      "전기차·전동차의 회생 제동 — 모터를 발전기로 사용해 운동에너지를 배터리로 회수. 마찰/역상 제동과 효율을 비교합니다.",
    subject: "전기설비",
    topic: "EV·전동차",
    status: "available",
    htmlPath: "/samples/simulator-regenerative-braking.html",
    emoji: "🔄",
    formula: [
      {
        name: "운동에너지",
        expression: "$E_k = \\dfrac{1}{2} m v^2$",
        meaning: "질량 $m$, 속도 $v$인 차량이 보유한 에너지",
      },
      {
        name: "회수 에너지",
        expression:
          "$E_{regen} = \\eta_{gen} \\cdot \\eta_{inv} \\cdot \\eta_{batt} \\cdot E_k$",
        meaning:
          "발전기·인버터·배터리 효율의 곱이 전체 회수율을 결정",
      },
      {
        name: "EV 회수율",
        expression: "$\\eta_{total} \\approx 80\\sim85\\%$",
        meaning:
          "현대 EV 평균값. 저속·급제동·완전 정지 구간에서는 효율이 감소",
      },
    ],
    example: {
      question:
        "질량 1.8 t EV가 60 km/h에서 완전 정지할 때 회수 가능한 에너지는? (총 회수율 80%)",
      given: [
        "$m = 1800$ kg",
        "$v = 60$ km/h $= 16.67$ m/s",
        "$\\eta_{total} = 0.80$",
      ],
      solution: [
        "$E_k = \\dfrac{1}{2} \\times 1800 \\times 16.67^2 \\approx 250{,}000$ J $= 250$ kJ",
        "$E_{regen} = 0.80 \\times 250 = 200$ kJ",
      ],
      answer: "$E_k = 250$ kJ → $E_{regen} \\approx 200$ kJ 배터리 회수",
    },
  },
  {
    id: "transformer-cooling",
    title: "변압기 냉각 방식 (ONAN·OFAF)",
    description:
      "ONAN·ONAF·OFAF·ODAF 4종 냉각 방식과 IEEE C57.91 핫스팟 온도 계산. 부하율 대비 권선 온도를 비교합니다.",
    subject: "전기기기",
    topic: "변압기·냉각",
    status: "available",
    htmlPath: "/samples/simulator-transformer-cooling.html",
    emoji: "💧",
    formula: [
      {
        name: "기름 상승 온도",
        expression:
          "$\\Delta\\theta_{oil} = \\Delta\\theta_{oil,R} \\left(\\dfrac{1 + RK^2}{1 + R}\\right)^n$",
        meaning:
          "정격 기름 상승 $\\Delta\\theta_{oil,R}$, 손실비 $R$, 부하율 $K$, 지수 $n$ (냉각 방식별 상이)",
      },
      {
        name: "핫스팟 온도",
        expression:
          "$\\theta_{hs} = \\theta_a + \\Delta\\theta_{oil} + \\Delta\\theta_{hs,R} K^{2m}$",
        meaning:
          "주위 온도 $\\theta_a$ + 기름 상승 + 권선 추가 상승. 핫스팟은 권선 최고 온도점",
      },
      {
        name: "수명 가속",
        expression: "$V = 2^{(\\theta_{hs} - 98)/6}$",
        meaning:
          "핫스팟이 98°C에서 6°C 오를 때마다 절연 열화 속도 2배 (IEEE C57.91)",
      },
    ],
    example: {
      question:
        "ONAF 변압기에서 부하율 $K = 1.2$로 운전 시 핫스팟 온도는? (정격 $\\Delta\\theta_{oil,R} = 55$ K, $\\Delta\\theta_{hs,R} = 25$ K, $R = 5$, $n = 0.9$, $m = 0.8$, $\\theta_a = 30°$C)",
      given: [
        "$K = 1.2$ (120% 부하)",
        "$\\theta_a = 30°\\text{C}$",
        "$\\Delta\\theta_{oil,R} = 55$ K, $\\Delta\\theta_{hs,R} = 25$ K",
      ],
      solution: [
        "$\\Delta\\theta_{oil} = 55 \\times \\left(\\dfrac{1 + 5 \\times 1.44}{1 + 5}\\right)^{0.9} \\approx 55 \\times 1.36^{0.9} \\approx 72$ K",
        "권선 추가: $25 \\times 1.2^{1.6} \\approx 25 \\times 1.34 \\approx 33$ K",
        "$\\theta_{hs} \\approx 30 + 72 + 33 \\approx 110°\\text{C}$",
      ],
      answer: "$\\theta_{hs} \\approx 110°\\text{C}$ (수명 정상 한계)",
    },
  },
  {
    id: "oltc",
    title: "OLTC 부하 시 탭 전환기",
    description:
      "OLTC(On-Load Tap Changer) — 부하 운전 중 탭 전환. 5단계 시퀀스(선택기·전환 스위치·전이저항)와 AVR 자동 제어 동작을 분석합니다.",
    subject: "전기기기",
    topic: "변압기·제어",
    status: "available",
    htmlPath: "/samples/simulator-oltc.html",
    emoji: "🔃",
    formula: [
      {
        name: "보정 권수",
        expression: "$N_1' = N_1 (1 + k)$",
        meaning: "탭 비율 $k$ (예: ±5% 5단계 → $k \\in \\{-5\\%, -2.5\\%, 0, +2.5\\%, +5\\%\\}$)",
      },
      {
        name: "2차 전압",
        expression: "$V_2 = V_1 \\cdot \\dfrac{N_2}{N_1'}$",
        meaning: "탭 보정 후 권수비로 2차 전압 결정. AVR이 목표 전압을 향해 탭 선택",
      },
      {
        name: "전이 시 순환 전류",
        expression: "$I_{circ} = \\dfrac{\\Delta V}{2 R_T}$",
        meaning:
          "두 탭이 일시적으로 연결될 때 전이저항 $R_T$ 통해 흐르는 단락 순환 전류",
      },
    ],
    example: {
      question:
        "5탭 ±5% OLTC에서 인접 탭 간 전압차 $\\Delta V = 220$ V, 전이저항 $R_T = 5\\ \\Omega$일 때 전이 중 순환 전류는?",
      given: [
        "탭 구성: 5단계, ±5%",
        "$\\Delta V = 220$ V (인접 탭 간)",
        "$R_T = 5\\ \\Omega$",
      ],
      solution: [
        "$I_{circ} = \\dfrac{\\Delta V}{2 R_T} = \\dfrac{220}{10} = 22$ A",
        "전이는 수십 ms 이내에 완료되므로 발열은 한계 내",
      ],
      answer: "$I_{circ} \\approx 22$ A (수십 A 수준)",
    },
  },
  {
    id: "arc-furnace",
    title: "전기 아크로 (EAF)",
    description:
      "아크를 발생시켜 고철(scrap)을 용융하는 제강용 전기로. 아크 전압·길이·리액턴스·장입량을 조절하며 전력 전달과 운전 효율을 학습합니다.",
    subject: "전기설비",
    topic: "전력응용",
    status: "available",
    htmlPath: "/samples/simulator-arc-furnace.html",
    emoji: "🔥",
    formula: [
      {
        name: "아크 전압 (Ayrton 방정식)",
        expression: "$V_{arc} = A + B \\cdot L_{arc}$",
        meaning: "아크 길이 $L_{arc}$ 에 비례해 전압 상승. $A,B$ 는 전극·분위기 상수",
      },
      {
        name: "아크 전력 (3상 합)",
        expression: "$P = \\sqrt{3} \\cdot V_L \\cdot I \\cdot \\cos\\theta$",
        meaning: "선간전압 $V_L$, 선전류 $I$, 역률 $\\cos\\theta$ 기준 입력 전력",
      },
    ],
    example: {
      question:
        "아크 상수 $A = 40$ V, $B = 10$ V/cm 인 전극에서 아크 길이가 3 cm일 때 아크 전압은?",
      given: ["$A = 40$ V", "$B = 10$ V/cm", "$L_{arc} = 3$ cm"],
      solution: [
        "$V_{arc} = A + B \\cdot L_{arc}$",
        "$V_{arc} = 40 + 10 \\times 3$",
        "$V_{arc} = 70$ V",
      ],
      answer: "$V_{arc} = 70$ V",
    },
  },
];

export function getSimulator(id: string): Simulator | undefined {
  return simulators.find((s) => s.id === id);
}

export const SIMULATOR_SUBJECTS: Subject[] = [
  "전기이론",
  "전기기기",
  "전기설비",
];
