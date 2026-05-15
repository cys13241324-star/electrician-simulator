import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "별의 소식지",
  description: "전기기능사 학습 사이트의 별도 콘텐츠 — 인스타·유튜브·신문 콘셉트로 풀어낸 학습 자료.",
};

type NewsCard = {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  href: string;
  badge: string;
  accent: string;       // tailwind gradient classes
  tileBg: string;       // thumbnail background
  tileContent: React.ReactNode;
};

const cards: NewsCard[] = [
  {
    id: "instagram",
    title: "전기 인스타",
    subtitle: "@addto_electric",
    desc: "피드·스토리·릴스 형식으로 풀어낸 전기 이론. 짧고 시각적이고, 손가락 한 번에 다음 카드.",
    href: "/news/news-instagram.html",
    badge: "INSTAGRAM",
    accent: "from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    tileBg: "bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div className="text-6xl">📸</div>
        <div className="mt-2 text-xs font-bold tracking-widest opacity-90">FEED · STORY · REELS</div>
      </div>
    ),
  },
  {
    id: "youtube",
    title: "전기 유튜브 채널",
    subtitle: "addto 전기기능사 학습",
    desc: "채널 아트·동영상 카드·재생목록·댓글 — 학습 채널 형식. 옴의 법칙부터 3상 결선까지.",
    href: "/news/news-youtube.html",
    badge: "YOUTUBE",
    accent: "from-red-500 to-red-700",
    tileBg: "bg-[#0f0f0f]",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div className="flex items-center gap-2">
          <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-[#ff0000]">
            <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white"><path d="M8 5v14l11-7z" /></svg>
          </div>
        </div>
        <div className="mt-3 text-xs font-bold tracking-widest opacity-90 text-white">addto 전기학습</div>
      </div>
    ),
  },
  {
    id: "newspaper",
    title: "전기 일보",
    subtitle: "電氣日報 · The Electric Daily",
    desc: "전통 일간지 형식. 헤드라인·기사·만평·인터뷰·합격률 추이. 한 장에 시험 동향이 다 들어있어요.",
    href: "/news/news-newspaper.html",
    badge: "NEWSPAPER",
    accent: "from-amber-700 to-amber-900",
    tileBg: "bg-[#f6f0e2]",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-[#1a1a1a]">
        <div className="text-[10px] tracking-[0.3em] opacity-70">2026.05.15 · 제2026-137호</div>
        <div className="mt-1 font-serif text-2xl font-black tracking-tight">電氣日報</div>
        <div className="mt-1 text-[10px] tracking-widest opacity-70">THE ELECTRIC DAILY</div>
        <div className="mt-3 h-px w-16 bg-[#b8161a]" />
        <div className="mt-3 text-[11px] font-bold leading-snug text-center">
          2026 전기기능사<br/>합격률 사상 최고
        </div>
      </div>
    ),
  },
];

export default function NewsIndexPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-12">
        {/* 헤더 */}
        <header className="mb-10">
          <p className="text-xs font-semibold tracking-widest text-indigo-600">
            ⭐ 별의 콘텐츠
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            전기기능사 별의 소식지
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base">
            교재·시뮬레이터 외에 즐겁게 학습할 수 있는 별도 콘텐츠. 인스타 피드, 유튜브 채널,
            그리고 신문 — 같은 내용을 세 가지 콘셉트로 풀어냈어요.
          </p>
        </header>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <a
              key={c.id}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="group block overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl"
            >
              {/* 썸네일 영역 */}
              <div className={`relative h-44 ${c.tileBg}`}>
                {c.tileContent}
                <div className="absolute left-3 top-3">
                  <span
                    className={`inline-block rounded-full bg-gradient-to-r ${c.accent} px-2.5 py-1 text-[10px] font-bold tracking-widest text-white shadow-sm`}
                  >
                    {c.badge}
                  </span>
                </div>
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
                  열어보기 <span className="transition group-hover:translate-x-0.5">↗</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* 하단 안내 */}
        <p className="mt-10 rounded-2xl border border-dashed border-zinc-200 bg-white p-5 text-center text-xs leading-6 text-zinc-500">
          📝 각 소식지는 새 탭에서 열려요. 콘셉트는 다르지만 다루는 주제는 전부 전기기능사 합격을 위한 학습 자료입니다.
          <br />
          (가짜 댓글·구독자 수·발행 호수는 콘셉트 연출용이에요.)
        </p>

        {/* 다른 페이지로 */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/simulator"
            className="rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
          >
            ← 시뮬레이터로
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
