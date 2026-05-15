import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "허브 — 전기기능사 학습",
  description: "시뮬레이터 · 플립카드 · CBT · 소식지를 한 페이지에서.",
};

type HubCard = {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  href: string;
  external: boolean;
  badge: string;
  accent: string;       // pill gradient
  tileBg: string;       // thumbnail background
  tileContent: React.ReactNode;
  cta: string;
};

const cards: HubCard[] = [
  {
    id: "simulator",
    title: "인터랙티브 시뮬레이터",
    subtitle: "Simulator · 내부 페이지",
    desc: "전기력선·변압기·회전 자계·RLC 위상 등 손으로 만져보는 시뮬. 슬라이더를 움직이면 즉시 반응합니다.",
    href: "/simulator",
    external: false,
    badge: "SIMULATOR",
    accent: "from-cyan-400 via-sky-500 to-indigo-700",
    tileBg: "bg-gradient-to-br from-slate-900 via-sky-900 to-indigo-900",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div className="text-6xl drop-shadow-[0_0_18px_rgba(56,189,248,0.6)]">⚡</div>
        <div className="mt-2 text-xs font-bold tracking-widest text-cyan-200/90">
          INTERACTIVE PHYSICS
        </div>
        {/* faint grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(125,211,252,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(125,211,252,0.4) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>
    ),
    cta: "시뮬레이터 열기",
  },
  {
    id: "news",
    title: "별의 소식지",
    subtitle: "News · 내부 페이지",
    desc: "인스타 피드·유튜브 채널·신문 — 같은 학습 내용을 세 가지 콘셉트로 풀어낸 별도 콘텐츠.",
    href: "/news",
    external: false,
    badge: "NEWS",
    accent: "from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    tileBg: "bg-gradient-to-br from-rose-400 via-fuchsia-500 to-violet-600",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div className="text-6xl drop-shadow-[0_0_18px_rgba(244,114,182,0.6)]">⭐</div>
        <div className="mt-2 text-xs font-bold tracking-widest opacity-90">
          INSTA · YOUTUBE · DAILY
        </div>
      </div>
    ),
    cta: "소식지 보기",
  },
  {
    id: "flipcard",
    title: "플립 암기카드",
    subtitle: "Flashcards · 외부 사이트",
    desc: "전기기능사 핵심 62장. 앞면 문제 → 뒷면 해설. SRS(간격 반복) 알고리즘으로 잊을 때쯤 다시.",
    href: "http://localhost:3101",
    external: true,
    badge: "FLIPCARDS",
    accent: "from-pink-500 via-fuchsia-500 to-violet-600",
    tileBg: "bg-gradient-to-br from-pink-500 via-fuchsia-600 to-violet-700",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div className="relative">
          <div className="absolute -left-3 -top-2 h-20 w-14 -rotate-12 rounded-md bg-white/20 backdrop-blur-sm" />
          <div className="absolute -right-3 -top-1 h-20 w-14 rotate-6 rounded-md bg-white/30 backdrop-blur-sm" />
          <div className="relative flex h-20 w-14 items-center justify-center rounded-md bg-white text-3xl text-violet-700 shadow-xl">
            🃏
          </div>
        </div>
        <div className="mt-4 text-xs font-bold tracking-widest opacity-95">
          62 CARDS · SRS
        </div>
      </div>
    ),
    cta: "새 탭에서 열기",
  },
  {
    id: "cbt",
    title: "CBT 모의고사",
    subtitle: "CBT · 외부 사이트",
    desc: "실전 환경 60문항. 시간 측정·자동 채점·약점 분석까지. 시험장 그대로의 인터페이스로 연습.",
    href: "http://localhost:3100",
    external: true,
    badge: "CBT",
    accent: "from-blue-500 via-indigo-500 to-indigo-700",
    tileBg: "bg-gradient-to-br from-blue-700 via-indigo-700 to-indigo-900",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div className="flex items-center gap-1.5">
          <div className="text-5xl">🖥️</div>
        </div>
        <div className="mt-2 rounded bg-white/15 px-2 py-0.5 font-mono text-[11px] tracking-wider text-blue-100 backdrop-blur-sm">
          60문항 · 60분
        </div>
        <div className="mt-2 text-[10px] font-bold tracking-widest opacity-80">
          REAL EXAM ENVIRONMENT
        </div>
      </div>
    ),
    cta: "새 탭에서 열기",
  },
  {
    id: "guide",
    title: "학습 가이드",
    subtitle: "Guide · 준비 중",
    desc: "시험 일정·과목 구성·합격 전략·학습 루틴. 처음 시작하는 분을 위한 안내문 (작성 중).",
    href: "/simulator",
    external: false,
    badge: "GUIDE",
    accent: "from-emerald-400 via-teal-500 to-cyan-600",
    tileBg: "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-teal-800">
        <div className="text-6xl">🧭</div>
        <div className="mt-2 text-xs font-bold tracking-widest opacity-80">
          START HERE
        </div>
      </div>
    ),
    cta: "곧 공개",
  },
  {
    id: "stories",
    title: "합격 후기",
    subtitle: "Stories · 준비 중",
    desc: "이 사이트로 공부해 합격한 분들의 이야기. 학습 루틴·실수담·꿀팁 모음 (작성 중).",
    href: "/simulator",
    external: false,
    badge: "STORIES",
    accent: "from-amber-400 via-orange-500 to-red-500",
    tileBg: "bg-gradient-to-br from-amber-50 via-orange-50 to-rose-100",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-orange-700">
        <div className="text-6xl">🎉</div>
        <div className="mt-2 text-xs font-bold tracking-widest opacity-80">
          PASS STORIES
        </div>
      </div>
    ),
    cta: "곧 공개",
  },
];

export default function HubPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-12">
        {/* 헤더 */}
        <header className="mb-10">
          <p className="text-xs font-semibold tracking-widest text-indigo-600">
            ⚡ HUB
          </p>
          <h1 className="mt-2 bg-gradient-to-r from-indigo-600 via-sky-500 to-cyan-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
            전기기능사 학습 허브
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base">
            시뮬레이터·플립카드·CBT·소식지 — 흩어진 콘텐츠를 한 페이지에서. 카드를
            클릭하면 해당 학습 도구로 바로 이동합니다.
          </p>
        </header>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => {
            const inner = (
              <>
                {/* 썸네일 영역 */}
                <div className={`relative h-44 overflow-hidden ${c.tileBg}`}>
                  {c.tileContent}
                  <div className="absolute left-3 top-3">
                    <span
                      className={`inline-block rounded-full bg-gradient-to-r ${c.accent} px-2.5 py-1 text-[10px] font-bold tracking-widest text-white shadow-sm`}
                    >
                      {c.badge}
                    </span>
                  </div>
                  {c.external && (
                    <div className="absolute right-3 top-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/85 px-2 py-0.5 text-[10px] font-bold text-zinc-700 shadow-sm backdrop-blur-sm">
                        ↗ 외부
                      </span>
                    </div>
                  )}
                </div>
                {/* 본문 */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-zinc-900 group-hover:text-indigo-700">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-zinc-500">
                    {c.subtitle}
                  </p>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-700">
                    {c.desc}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600">
                    {c.cta}{" "}
                    <span className="transition group-hover:translate-x-0.5">
                      →
                    </span>
                  </div>
                </div>
              </>
            );

            const className =
              "group block overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl";

            return c.external ? (
              <a
                key={c.id}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className={className}
              >
                {inner}
              </a>
            ) : (
              <Link key={c.id} href={c.href} className={className}>
                {inner}
              </Link>
            );
          })}
        </div>

        {/* 하단 안내 */}
        <p className="mt-10 rounded-2xl border border-dashed border-zinc-200 bg-white p-5 text-center text-xs leading-6 text-zinc-500">
          🔗 플립카드·CBT는 별도 사이트에서 새 탭으로 열립니다. 시뮬레이터·소식지는
          같은 사이트 내부 페이지입니다.
        </p>
      </main>
      <Footer />
    </div>
  );
}
