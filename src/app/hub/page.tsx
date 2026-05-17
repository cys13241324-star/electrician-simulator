import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HubCardInfoButton from "@/components/hub/HubCardInfoButton";

export const metadata: Metadata = {
  title: "허브 — 전기기능사 학습",
  description: "시뮬레이터 · 소식지 · 플립카드 · CBT 를 한 페이지에서.",
};

type CardStatus = "live" | "soon";

type HubCard = {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  href: string;
  status: CardStatus;
  badge: string;
  accent: string; // pill gradient
  tileBg: string; // thumbnail background
  tileContent: React.ReactNode;
  cta: string;
  lightTile?: boolean; // 밝은 타일(어두운 텍스트) — 사진 처리 톤 분기
};

const cards: HubCard[] = [
  {
    id: "simulator",
    title: "인터랙티브 시뮬레이터",
    subtitle: "Simulator · 지금 이용 가능",
    desc: "전기력선·변압기·회전 자계·RLC 위상 등 손으로 만져보는 시뮬. 슬라이더를 움직이면 즉시 반응합니다.",
    href: "/simulator",
    status: "live",
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
    subtitle: "News · 지금 이용 가능",
    desc: "인스타 피드·유튜브 채널·신문 — 같은 학습 내용을 50가지 친숙한 콘셉트로 다시 만나는 보조 채널.",
    href: "/news",
    status: "live",
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
    subtitle: "Flashcards · 지금 이용 가능",
    desc: "전기기능사 핵심 343장. 앞면 문제 → 뒷면 해설. SRS(간격 반복) 알고리즘으로 잊을 때쯤 다시.",
    href: "/flashcards",
    status: "live",
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
          343 CARDS · SRS
        </div>
      </div>
    ),
    cta: "암기카드 열기",
  },
  {
    id: "cbt",
    title: "CBT 모의고사",
    subtitle: "CBT · 지금 이용 가능",
    desc: "실전 환경 60문항. 시간 측정·자동 채점·약점 분석까지. 시험장 그대로의 인터페이스로 연습.",
    href: "/cbt",
    status: "live",
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
    cta: "CBT 풀기",
  },
  {
    id: "guide",
    title: "학습 가이드",
    subtitle: "Guide · 준비 중",
    desc: "시험 일정·과목 구성·합격 전략·학습 루틴. 처음 시작하는 분을 위한 안내문 (작성 중).",
    href: "#",
    status: "soon",
    badge: "GUIDE",
    accent: "from-emerald-400 via-teal-500 to-cyan-600",
    tileBg: "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100",
    lightTile: true,
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
    href: "#",
    status: "soon",
    badge: "STORIES",
    accent: "from-amber-400 via-orange-500 to-red-500",
    tileBg: "bg-gradient-to-br from-amber-50 via-orange-50 to-rose-100",
    lightTile: true,
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
        <header className="relative mb-10 overflow-hidden rounded-2xl border border-zinc-200 bg-white px-6 py-8 shadow-sm sm:px-8 sm:py-10">
          {/* 은은한 실사진 배경 — 거의 워터마크 수준 (장식용, next/image 대신 <img> 의도) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hub/img/hero.jpg"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 blur-[1px] saturate-75"
          />
          {/* 밝은 워시 — 기존 어두운 텍스트 대비 복원 */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/85 via-white/70 to-indigo-50/80" />
          <div className="relative">
            <p className="text-xs font-semibold tracking-widest text-indigo-600 [text-shadow:0_1px_3px_rgba(255,255,255,0.8)]">
              ⚡ HUB
            </p>
            <h1 className="mt-2 bg-gradient-to-r from-indigo-600 via-sky-500 to-cyan-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
              전기기능사 학습 허브
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-700 [text-shadow:0_1px_3px_rgba(255,255,255,0.7)] sm:text-base">
              시뮬레이터·소식지·플립카드·CBT — 흩어진 학습 콘텐츠의 한 입구.
              지금 이용 가능한 것부터 바로 시작하세요.
            </p>
          </div>
        </header>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => {
            const soon = c.status === "soon";
            const inner = (
              <>
                {/* 썸네일 영역 */}
                <div className={`relative h-44 overflow-hidden ${c.tileBg}`}>
                  {/* (1) 실사진 배경 — 흐린 질감으로만 사용 (장식용) */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/hub/img/${c.id}.jpg`}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className={`pointer-events-none absolute inset-0 h-full w-full scale-105 object-cover blur-[2px] transition duration-500 group-hover:scale-110 ${
                      c.lightTile
                        ? "opacity-25 saturate-[.6] group-hover:opacity-30"
                        : "opacity-35 saturate-50 group-hover:opacity-45"
                    }`}
                  />
                  {/* (2) 타일 본래 색 재오버레이 — 대비 복원 */}
                  {c.lightTile ? (
                    <div
                      className={`pointer-events-none absolute inset-0 ${c.tileBg} opacity-80`}
                    />
                  ) : (
                    <div
                      className={`pointer-events-none absolute inset-0 ${c.tileBg} opacity-70 mix-blend-multiply`}
                    />
                  )}
                  {/* (3) 스크림 그라데이션 — 톤별 분기 */}
                  <div
                    className={`pointer-events-none absolute inset-0 ${
                      c.lightTile
                        ? "bg-gradient-to-t from-white/55 via-white/10 to-white/35"
                        : "bg-gradient-to-t from-black/55 via-black/15 to-black/25"
                    }`}
                  />
                  {/* (4) tileContent/badge/텍스트 — 최상단 + text-shadow */}
                  <div
                    className={`absolute inset-0 ${
                      c.lightTile
                        ? "[text-shadow:0_1px_4px_rgba(255,255,255,0.7)]"
                        : "[text-shadow:0_1px_6px_rgba(0,0,0,0.55)]"
                    }`}
                  >
                    {c.tileContent}
                  </div>
                  <div className="absolute left-3 top-3">
                    <span
                      className={`inline-block rounded-full bg-gradient-to-r ${c.accent} px-2.5 py-1 text-[10px] font-bold tracking-widest text-white shadow-sm`}
                    >
                      {c.badge}
                    </span>
                  </div>
                  <div className="absolute right-3 top-3">
                    {soon ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-zinc-900/65 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm backdrop-blur-sm">
                        준비 중
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/85 px-2 py-0.5 text-[10px] font-bold text-emerald-700 shadow-sm backdrop-blur-sm">
                        ● 이용 가능
                      </span>
                    )}
                  </div>
                  {soon && (
                    <div className="absolute inset-0 bg-zinc-900/35" />
                  )}
                </div>
                {/* 본문 */}
                <div className="p-5">
                  <h3
                    className={`text-base font-bold ${
                      soon
                        ? "text-zinc-500"
                        : "text-zinc-900 group-hover:text-indigo-700"
                    }`}
                  >
                    {c.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-zinc-500">
                    {c.subtitle}
                  </p>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-700">
                    {c.desc}
                  </p>
                  <div
                    className={`mt-4 inline-flex items-center gap-1 text-xs font-semibold ${
                      soon ? "text-zinc-400" : "text-indigo-600"
                    }`}
                  >
                    {c.cta}{" "}
                    {!soon && (
                      <span className="transition group-hover:translate-x-0.5">
                        →
                      </span>
                    )}
                  </div>
                </div>
              </>
            );

            const base =
              "block overflow-hidden rounded-2xl border bg-white shadow-sm";

            if (soon) {
              return (
                <div
                  key={c.id}
                  aria-disabled="true"
                  className={`${base} cursor-not-allowed border-zinc-200 opacity-75 select-none`}
                >
                  {inner}
                </div>
              );
            }

            return (
              <div
                key={c.id}
                className={`group relative ${base} border-zinc-200 transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl`}
              >
                <Link href={c.href} className="block">
                  {inner}
                </Link>
                <HubCardInfoButton cardId={c.id} />
              </div>
            );
          })}
        </div>

        {/* 하단 안내 */}
        <p className="mt-10 rounded-2xl border border-dashed border-zinc-200 bg-white p-5 text-center text-xs leading-6 text-zinc-500">
          🔗 <strong className="font-semibold text-zinc-700">시뮬레이터·소식지·플립카드·CBT</strong>
          모두 같은 사이트 안에서 바로 열립니다. 학습 가이드·합격 후기는 준비 중입니다.
        </p>
      </main>
      <Footer />
    </div>
  );
}
