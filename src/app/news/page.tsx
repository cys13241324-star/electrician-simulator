import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "별의 소식지",
  description:
    "교재가 무거운 날에도 0개보다 1개. 같은 전기기능사 개념을 인스타·유튜브·신문·게임 등 익숙한 포맷으로 다시 만나, 지치지 않고 합격까지 가도록 돕는 학습 콘텐츠 모음입니다.",
};

type CategoryId =
  | "sns"
  | "broadcast"
  | "read"
  | "learn"
  | "play"
  | "life";

type NewsCard = {
  id: string;
  category: CategoryId;
  title: string;
  subtitle: string;
  desc: string;
  href: string;
  badge: string;
  accent: string;       // tailwind gradient classes
  tileBg: string;       // thumbnail background
  tileContent: React.ReactNode;
};

type CategoryMeta = {
  id: CategoryId;
  emoji: string;
  label: string;
  blurb: string;
};

const categories: CategoryMeta[] = [
  {
    id: "sns",
    emoji: "💬",
    label: "SNS · 소셜",
    blurb: "피드 넘기듯 가볍게 — 인스타·X·단톡방 형식으로 풀어낸 짧은 학습 콘텐츠.",
  },
  {
    id: "broadcast",
    emoji: "🎬",
    label: "방송 · 미디어",
    blurb: "보고 들으며 익히기 — 유튜브·팟캐스트·라디오·라이브 방송 콘셉트.",
  },
  {
    id: "read",
    emoji: "📰",
    label: "읽을거리 · 출판",
    blurb: "차분히 읽어 내려가기 — 신문·매거진·만화·블로그·문서 형식.",
  },
  {
    id: "learn",
    emoji: "🎓",
    label: "강의 · 자료",
    blurb: "정공법으로 학습하기 — 강의 덱·검색·전시·자료 형식.",
  },
  {
    id: "play",
    emoji: "🎮",
    label: "즐기며 학습",
    blurb: "놀이처럼 익히기 — 게임·방탈출·탐정·영화 콘셉트.",
  },
  {
    id: "life",
    emoji: "🧭",
    label: "일상 속 콘셉트",
    blurb: "생활 장면으로 비틀어 보기 — 채용·숙소·여권·자판기 등 일상 인터페이스.",
  },
];

const cards: NewsCard[] = [
  {
    id: "instagram",
    category: "sns",
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
    category: "broadcast",
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
    category: "read",
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
  {
    id: "kakao",
    category: "sns",
    title: "스터디 카톡방",
    subtitle: "전기기능사 합격 스터디",
    desc: "단톡방 대화로 풀어낸 합격 준비기. 공지·투표·이모지·답장까지. 폰 화면 그대로 옮긴 듯한 분위기.",
    href: "/news/news-kakao.html",
    badge: "KAKAO",
    accent: "from-yellow-300 to-yellow-500",
    tileBg: "bg-gradient-to-br from-[#abc1d1] to-[#7d92a8]",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
        <div className="rounded-2xl rounded-tl-md bg-white px-3 py-1.5 text-[10px] text-zinc-800 shadow">옴의 법칙은 V=IR! 🔥</div>
        <div className="self-end rounded-2xl rounded-tr-md bg-[#fee500] px-3 py-1.5 text-[10px] text-zinc-900 shadow">기억했어요 ✨</div>
        <div className="rounded-2xl rounded-tl-md bg-white px-3 py-1.5 text-[10px] text-zinc-800 shadow">D-23 화이팅 💪</div>
      </div>
    ),
  },
  {
    id: "webtoon",
    category: "read",
    title: "전기왕 김전공",
    subtitle: "네이버웹툰 풍 학습 만화",
    desc: "콧수염 강사 + 의인화된 V·I·R 캐릭터 + 4컷 만화. 어려운 이론도 웹툰으로 보면 쉬워져요.",
    href: "/news/news-webtoon.html",
    badge: "WEBTOON",
    accent: "from-emerald-400 to-cyan-500",
    tileBg: "bg-white",
    tileContent: (
      <div className="absolute inset-0 grid grid-cols-2 gap-1 p-3 text-[#111]">
        <div className="rounded border-2 border-[#111] bg-zinc-50 flex items-center justify-center text-xs font-black">⚡</div>
        <div className="rounded border-2 border-[#111] bg-yellow-100 flex items-center justify-center text-[10px] font-bold">유레카!</div>
        <div className="rounded border-2 border-[#111] bg-blue-50 flex items-center justify-center text-xs font-black">V=IR</div>
        <div className="rounded border-2 border-[#111] bg-pink-50 flex items-center justify-center text-[10px] font-bold">합격 🎉</div>
      </div>
    ),
  },
  {
    id: "blog",
    category: "read",
    title: "전기기능사 합격 일지",
    subtitle: "電 — 합격 후기 블로그",
    desc: "벨로그·티스토리 풍 학습 블로그. 목차·코드 블록·표·읽기 진행률 바. 3개월 독학 합격 후기 한 편.",
    href: "/news/news-blog.html",
    badge: "BLOG",
    accent: "from-[#12b886] to-emerald-600",
    tileBg: "bg-white",
    tileContent: (
      <div className="absolute inset-0 flex flex-col justify-center p-5 text-zinc-900">
        <div className="text-[10px] font-semibold text-[#12b886]">합격 후기 · 14분 분량</div>
        <div className="mt-2 text-base font-serif font-bold leading-tight">옴의 법칙만 알아도 합격! 3개월 독학 합격 후기</div>
        <div className="mt-3 flex flex-wrap gap-1 text-[9px] text-zinc-500">
          <span className="rounded bg-zinc-100 px-1.5 py-0.5">#합격후기</span>
          <span className="rounded bg-zinc-100 px-1.5 py-0.5">#독학</span>
        </div>
      </div>
    ),
  },
  {
    id: "twitter",
    category: "sns",
    title: "전기 X 타임라인",
    subtitle: "@addto_electric",
    desc: "트위터/X 풍 짧은 학습 트윗. 핀 고정 트윗·스레드·리트윗·인증마크까지. 출퇴근길 한 입.",
    href: "/news/news-twitter.html",
    badge: "X",
    accent: "from-zinc-700 to-zinc-900",
    tileBg: "bg-black",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div className="text-5xl font-black">𝕏</div>
        <div className="mt-2 text-[10px] tracking-widest opacity-70">TIMELINE · THREAD</div>
      </div>
    ),
  },
  {
    id: "discord",
    category: "sns",
    title: "전기기능사 합격방",
    subtitle: "Discord 서버",
    desc: "디스코드 풍 서버. 채널·DM·임베드·코드블록·이모지 반응. 실시간 학습 커뮤니티 분위기.",
    href: "/news/news-discord.html",
    badge: "DISCORD",
    accent: "from-[#5865f2] to-indigo-700",
    tileBg: "bg-[#36393f]",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5865f2] text-2xl">💬</div>
        <div className="mt-3 text-xs font-bold tracking-widest opacity-90">SERVER · CHANNELS</div>
      </div>
    ),
  },
  {
    id: "magazine",
    category: "read",
    title: "ELECTRIC 매거진",
    subtitle: "電氣 · 月刊",
    desc: "Vogue/National Geographic 풍 9페이지 인쇄 매거진. 표지·특집·인터뷰·인포그래픽·칼럼.",
    href: "/news/news-magazine.html",
    badge: "MAGAZINE",
    accent: "from-[#c4302b] to-[#4a1f2b]",
    tileBg: "bg-[#f7f2ea]",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-[#1a1a1a]">
        <div className="text-[10px] tracking-[0.3em] opacity-70">MAY 2026 · No.137</div>
        <div className="mt-1 font-serif text-3xl font-black tracking-tight">ELECTRIC</div>
        <div className="mt-1 text-[10px] tracking-widest opacity-70 font-serif">電氣 · 月刊</div>
        <div className="mt-3 h-px w-12 bg-[#c4302b]" />
        <div className="mt-3 text-[11px] font-serif leading-snug text-center italic">
          전기기능사, 다시 뜨거워졌다
        </div>
      </div>
    ),
  },
  {
    id: "podcast",
    category: "broadcast",
    title: "전기야 놀자",
    subtitle: "Spotify 풍 팟캐스트",
    desc: "주간 팟캐스트. 옴의 법칙·키르히호프·콘덴서 등 EP.12 + 재생목록·하단 플레이어.",
    href: "/news/news-podcast.html",
    badge: "PODCAST",
    accent: "from-[#1db954] to-emerald-700",
    tileBg: "bg-[#121212]",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1db954] text-3xl">▶</div>
        <div className="mt-3 text-xs font-bold tracking-widest text-[#1db954]">EP.12 · 32:14</div>
      </div>
    ),
  },
  {
    id: "tv",
    category: "broadcast",
    title: "ELECTRIC NEWS 24",
    subtitle: "TV 방송 뉴스",
    desc: "CNN/KBS 풍 24시간 뉴스 채널. BREAKING 헤드라인 · 로어3 · 티커 자막 · 시청률 표.",
    href: "/news/news-tv.html",
    badge: "TV NEWS",
    accent: "from-[#e10600] to-red-900",
    tileBg: "bg-[#05070b]",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-white">
        <div className="mb-2 flex items-center gap-2">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-red-500" />
          <span className="text-[10px] font-bold tracking-widest text-red-400">LIVE · BREAKING</span>
        </div>
        <div className="font-black tracking-tight text-lg">EN24</div>
        <div className="mt-1 text-[10px] tracking-widest opacity-70">ELECTRIC NEWS</div>
        <div className="mt-2 text-[10px] text-center opacity-90">합격률 사상 최고치</div>
      </div>
    ),
  },
  {
    id: "radio",
    category: "broadcast",
    title: "전기파장 88.5 FM",
    subtitle: "라디오 방송",
    desc: "FM 라디오 스튜디오 풍. 회전 다이얼·VU 미터·청취자 사연·음악 큐 시트. ON AIR 깜빡임.",
    href: "/news/news-radio.html",
    badge: "RADIO",
    accent: "from-amber-500 to-orange-700",
    tileBg: "bg-[#0a0705]",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-amber-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-red-500" />
          <span className="text-[10px] font-bold tracking-widest text-red-400">ON AIR</span>
        </div>
        <div className="font-mono text-3xl font-black tracking-tight">88.5</div>
        <div className="mt-1 text-[10px] tracking-widest opacity-70">FM · STUDIO</div>
      </div>
    ),
  },
  {
    id: "notion",
    category: "read",
    title: "Notion 학습 노트",
    subtitle: "3개월 합격 마스터플랜",
    desc: "노션 워크스페이스 풍 학습 노트. 콜아웃·토글·체크박스·LaTeX 코드 블록·데이터베이스.",
    href: "/news/news-notion.html",
    badge: "NOTION",
    accent: "from-zinc-600 to-zinc-800",
    tileBg: "bg-white",
    tileContent: (
      <div className="absolute inset-0 flex flex-col justify-center p-4 text-zinc-900">
        <div className="text-3xl mb-1">⚡</div>
        <div className="text-sm font-bold leading-tight">3개월 합격 마스터플랜</div>
        <div className="mt-2 flex gap-1 text-[9px]">
          <span className="rounded bg-blue-100 px-1.5 py-0.5 text-blue-700">#합격일정</span>
          <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-zinc-700">D-27</span>
        </div>
        <div className="mt-3 h-1 w-full rounded bg-zinc-200">
          <div className="h-full w-[70%] rounded bg-emerald-500" />
        </div>
      </div>
    ),
  },
  {
    id: "naver-cafe",
    category: "sns",
    title: "전기기능사 합격카페",
    subtitle: "네이버 카페 게시판",
    desc: "네이버 카페 풍 자격증 카페. 142,894명 회원 · 게시판 · 등급 별★ · 매니저 뱃지 · 댓글.",
    href: "/news/news-naver-cafe.html",
    badge: "NAVER CAFE",
    accent: "from-[#03c75a] to-green-700",
    tileBg: "bg-white",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        <div className="text-2xl font-black italic text-[#03c75a]">NAVER</div>
        <div className="mt-2 text-[10px] font-bold text-zinc-700">전기기능사 합격카페</div>
        <div className="mt-2 text-[9px] text-zinc-500">회원 142,894 · 새글 87</div>
        <div className="mt-2 flex gap-1">
          <span className="rounded bg-red-100 px-1.5 py-0.5 text-[8px] font-bold text-red-700">HOT</span>
          <span className="rounded bg-[#03c75a] px-1.5 py-0.5 text-[8px] font-bold text-white">공지</span>
        </div>
      </div>
    ),
  },
  {
    id: "newsletter",
    category: "sns",
    title: "addto Weekly",
    subtitle: "이메일 뉴스레터 Vol.42",
    desc: "Gmail 풍 inbox + Substack 본문. 주간 학습 뉴스레터 · SVG 차트 · 콜아웃 · 풀쿼트.",
    href: "/news/news-newsletter.html",
    badge: "NEWSLETTER",
    accent: "from-blue-500 to-blue-700",
    tileBg: "bg-[#f6f8fc]",
    tileContent: (
      <div className="absolute inset-0 flex flex-col p-4 text-zinc-800">
        <div className="text-xs text-blue-600 font-bold">addto Weekly · Vol.42</div>
        <div className="mt-2 text-sm font-serif font-bold leading-tight">옴의 법칙, 다시 외워야 할 5가지 이유</div>
        <div className="mt-2 text-[9px] text-zinc-500">14,328 구독자 · 5분 읽기</div>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-600 text-white text-xs font-bold">✉</div>
          <div className="text-[9px] text-zinc-500">inbox · 받은편지함</div>
        </div>
      </div>
    ),
  },
  {
    id: "course",
    category: "learn",
    title: "ElecAcademy 강의",
    subtitle: "전기기능사 합격 마스터",
    desc: "Coursera/인프런 풍 온라인 강의. 87강·38시간·★4.9·12,847 수강생·할인 카운트다운.",
    href: "/news/news-course.html",
    badge: "COURSE",
    accent: "from-violet-600 to-purple-800",
    tileBg: "bg-white",
    tileContent: (
      <div className="absolute inset-0 flex flex-col justify-center p-4 text-zinc-900">
        <div className="text-[10px] font-bold text-violet-700">★ 4.9 · 12,847명 수강</div>
        <div className="mt-2 text-sm font-bold leading-tight">전기기능사 합격 마스터 강의</div>
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-base font-black text-violet-700">189,000원</span>
          <span className="text-[9px] line-through text-zinc-400">299,000원</span>
        </div>
        <div className="mt-1 text-[9px] text-zinc-500">87강 · 38시간 · 평생수강</div>
      </div>
    ),
  },
  {
    id: "comic",
    category: "read",
    title: "ELECTRIC HEROES",
    subtitle: "Marvel/DC 풍 만화책 Vol.1",
    desc: "캡틴 옴·닥터 키르히호프·변압맨이 도시를 구한다. 4페이지 만화 + SFX 폭발 + 페이지 넘김.",
    href: "/news/news-comic.html",
    badge: "COMIC",
    accent: "from-red-600 via-yellow-500 to-blue-600",
    tileBg: "bg-[#f4ecd8]",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-[#14110d]">
        <div className="text-xs font-bold tracking-widest text-red-700">VOL.1</div>
        <div className="mt-1 font-black text-base leading-tight">ELECTRIC<br/>HEROES</div>
        <div className="mt-2 text-3xl">⚡</div>
        <div className="mt-1 text-[9px] font-bold text-yellow-700">BAM! POW! ZAP!</div>
      </div>
    ),
  },
  {
    id: "movie",
    category: "play",
    title: "감전: THE LAST CONDUCTOR",
    subtitle: "영화 상세 페이지",
    desc: "네이버 영화/IMDB 풍. 큰 SVG 포스터·트레일러 플레이어·★9.6·예매 1위·명대사·박스오피스.",
    href: "/news/news-movie.html",
    badge: "MOVIE",
    accent: "from-yellow-500 to-yellow-700",
    tileBg: "bg-[#04050a]",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-yellow-300">
        <div className="text-[10px] tracking-widest opacity-70">⚡ ELECTRIC CINEMA</div>
        <div className="mt-1 font-black text-sm leading-tight text-center">감전<br/>THE LAST CONDUCTOR</div>
        <div className="mt-2 text-[10px] text-yellow-500">★ 9.6 · 예매 1위</div>
        <div className="mt-1 text-[9px] opacity-60">2026.07.24 OPEN</div>
      </div>
    ),
  },
  {
    id: "game",
    category: "play",
    title: "전기 RPG",
    subtitle: "Elden Ring 풍 학습 게임",
    desc: "캐릭터 Lv.50·퀘스트·인벤토리·스킬트리·5개 던전·NPC·길드 랭킹. 레벨을 올리듯 이론을 쌓아가요.",
    href: "/news/news-game.html",
    badge: "GAME",
    accent: "from-amber-500 to-yellow-700",
    tileBg: "bg-[#0a0e14]",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-amber-300">
        <div className="text-[10px] tracking-widest opacity-70">LEVEL 50</div>
        <div className="mt-1 font-black text-base leading-tight">전기 견습공</div>
        <div className="mt-2 h-1 w-20 rounded bg-zinc-800 overflow-hidden">
          <div className="h-full w-[62%] bg-amber-400" />
        </div>
        <div className="mt-1 text-[9px] text-amber-500">XP 8,420 / 13,500</div>
      </div>
    ),
  },
  {
    id: "museum",
    category: "learn",
    title: "NMEC 박물관",
    subtitle: "전기의 역사: From Ohm to IoT",
    desc: "국립 박물관 풍 전시. 정전기→옴→키르히호프→패러데이→에디슨vs테슬라→현대 IoT. 체험 전시.",
    href: "/news/news-museum.html",
    badge: "MUSEUM",
    accent: "from-amber-700 to-amber-900",
    tileBg: "bg-[#f0e8d8]",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-[#3d2817]">
        <div className="text-2xl">🏛️</div>
        <div className="mt-1 font-serif text-xs font-bold tracking-widest">NMEC</div>
        <div className="mt-1 text-[10px] font-serif italic opacity-70">From Ohm to IoT</div>
        <div className="mt-2 h-px w-12 bg-[#b48a4a]" />
        <div className="mt-2 text-[9px] font-serif">전기의 역사 특별 전시</div>
      </div>
    ),
  },
  {
    id: "wikipedia",
    category: "read",
    title: "위키백과 — 전기기능사",
    subtitle: "Wikipedia 한국어판 항목",
    desc: "위키 풍 한국어 항목. 시험 과목·역사·합격 통계 표·각주·다른 언어 링크·[편집] 태그.",
    href: "/news/news-wikipedia.html",
    badge: "WIKI",
    accent: "from-zinc-500 to-zinc-700",
    tileBg: "bg-white",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-zinc-900">
        <div className="font-serif text-xl font-bold tracking-tight">위키백과</div>
        <div className="mt-1 text-[10px] tracking-widest opacity-60">Wikipedia</div>
        <div className="mt-3 h-px w-16 bg-zinc-300" />
        <div className="mt-3 text-[11px] font-serif text-center leading-snug">전기기능사<br/><span className="text-[9px] opacity-60">(자격증)</span></div>
      </div>
    ),
  },
  {
    id: "ai-chat",
    category: "sns",
    title: "AI 학습 챗봇",
    subtitle: "ChatGPT/Claude 풍",
    desc: "AI 챗봇으로 학습. 모델 선택·타이핑 효과·코드/수식/표 답변·답변 좋음/나쁨·새 대화.",
    href: "/news/news-ai-chat.html",
    badge: "AI CHAT",
    accent: "from-emerald-500 to-teal-700",
    tileBg: "bg-[#0a0a0a]",
    tileContent: (
      <div className="absolute inset-0 flex flex-col justify-center p-4 text-white">
        <div className="text-[10px] tracking-widest opacity-60">GPT-4o · Claude Sonnet 4.6</div>
        <div className="mt-2 rounded-lg bg-zinc-800 p-2 text-[10px]">옴의 법칙 외우기 어려워요</div>
        <div className="mt-2 text-[10px] leading-relaxed">
          <span className="text-emerald-300">AI:</span> 단계별로 설명드릴게요.<br/>
          1️⃣ V=IR ↓ 분류<span className="animate-pulse">▌</span>
        </div>
      </div>
    ),
  },
  {
    id: "livestream",
    category: "broadcast",
    title: "스파크쌤 LIVE",
    subtitle: "Twitch 풍 라이브 방송",
    desc: "라이브 스트리밍. 1,247명 시청 · 실시간 채팅 자동 메시지·도네이션 토스트·구독 토글.",
    href: "/news/news-livestream.html",
    badge: "LIVE",
    accent: "from-[#9146ff] to-purple-800",
    tileBg: "bg-[#0e0e10]",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-red-500" />
          <span className="text-[10px] font-bold tracking-widest text-red-400">LIVE</span>
        </div>
        <div className="text-2xl">🎮</div>
        <div className="mt-2 text-xs font-bold">스파크쌤 LIVE</div>
        <div className="mt-1 text-[9px] text-[#9146ff]">👁 1,247</div>
      </div>
    ),
  },
  {
    id: "resume",
    category: "read",
    title: "김합격 이력서",
    subtitle: "LinkedIn 풍 포트폴리오",
    desc: "전기기능사 합격자 이력서. 경력·자격증·기술 막대·프로젝트·추천서·다크모드·인쇄.",
    href: "/news/news-resume.html",
    badge: "RESUME",
    accent: "from-blue-600 to-indigo-800",
    tileBg: "bg-white",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-zinc-900">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-2xl">⚡</div>
        <div className="mt-2 text-sm font-bold">김합격</div>
        <div className="mt-1 text-[10px] text-blue-600">전기기능사 · 전기 기술자</div>
        <div className="mt-2 h-1 w-20 rounded bg-zinc-200">
          <div className="h-full w-[90%] rounded bg-blue-600" />
        </div>
        <div className="mt-1 text-[8px] text-zinc-500">회로 분석 90%</div>
      </div>
    ),
  },
  {
    id: "search",
    category: "learn",
    title: "Google 검색 결과",
    subtitle: "\"전기기능사 합격하는 법\"",
    desc: "구글 검색 결과 페이지. 10+ 결과·동영상·PAA·지식 패널·관련 검색·페이지네이션.",
    href: "/news/news-search.html",
    badge: "SEARCH",
    accent: "from-blue-500 via-red-500 to-yellow-500",
    tileBg: "bg-white",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-zinc-900">
        <div className="font-black text-2xl">
          <span className="text-blue-500">G</span>
          <span className="text-red-500">o</span>
          <span className="text-yellow-500">o</span>
          <span className="text-blue-500">g</span>
          <span className="text-green-500">l</span>
          <span className="text-red-500">e</span>
        </div>
        <div className="mt-3 w-full max-w-[140px] rounded-full border border-zinc-300 px-3 py-1 text-[9px] text-zinc-500">
          🔍 전기기능사 합격...
        </div>
        <div className="mt-2 text-[9px] text-zinc-500">약 1,247,000개 결과</div>
      </div>
    ),
  },
  {
    id: "presentation",
    category: "learn",
    title: "전기 강의 슬라이드",
    subtitle: "PPT · Keynote 강의 덱 풍",
    desc: "16:9 강의 슬라이드 14장 — 옴부터 합격 후기까지. 키보드 ←→로 넘기고, F로 풀스크린, N으로 발표자 노트.",
    href: "/news/news-presentation.html",
    badge: "PRESENTATION",
    accent: "from-indigo-500 to-blue-700",
    tileBg: "bg-white",
    tileContent: (
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-[200px] rounded-md border border-zinc-200 bg-white p-3 shadow-md" style={{ aspectRatio: "16 / 9" }}>
          <div className="text-[10px] font-bold tracking-widest text-indigo-600">CHAPTER 01</div>
          <div className="mt-1 text-[11px] font-black leading-tight text-zinc-900">옴의 법칙</div>
          <div className="mt-0.5 text-[8px] text-zinc-500">V = I × R · 전기기능사 합격 강의</div>
          <div className="absolute bottom-2 left-3 right-3 h-1 rounded bg-zinc-100">
            <div className="h-full w-[35%] rounded bg-indigo-500" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "documentary",
    category: "broadcast",
    title: "전류의 시대",
    subtitle: "전기플릭스 오리지널 다큐멘터리",
    desc: "Netflix 풍 다큐 작품 페이지. ★ 9.4 · 8 에피소드 · 시즌 1. 옴부터 IoT까지 — 가상의 학습 다큐 시리즈.",
    href: "/news/news-documentary.html",
    badge: "DOCUMENTARY",
    accent: "from-red-600 to-red-900",
    tileBg: "bg-[#141414]",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div className="font-black text-6xl leading-none text-[#e50914]">E</div>
        <div className="mt-3 text-[11px] font-black tracking-[0.2em] text-white">THE AGE OF</div>
        <div className="text-[11px] font-black tracking-[0.2em] text-white">CURRENTS</div>
        <div className="mt-2 text-[9px] tracking-widest text-zinc-400">★ 9.4 · S1 · 8 EP</div>
      </div>
    ),
  },
  {
    id: "boarding-pass",
    category: "life",
    title: "합격 보딩패스",
    subtitle: "ELECTRICITY AIRLINES · LRN → PSS",
    desc: "공항 탑승권 콘셉트로 풀어낸 합격증. 바코드·QR·짐 태그·라운지 패스, 다음 자격증으로 가는 환승편까지.",
    href: "/news/news-boarding-pass.html",
    badge: "BOARDING PASS",
    accent: "from-sky-400 to-blue-600",
    tileBg: "bg-gradient-to-br from-sky-200 to-blue-300",
    tileContent: (
      <div className="absolute inset-0 flex items-center justify-center p-3">
        <div className="flex w-full max-w-[200px] overflow-hidden rounded-md bg-white shadow-md">
          <div className="flex-1 p-2">
            <div className="text-[8px] font-bold tracking-widest text-sky-600">BOARDING PASS</div>
            <div className="mt-1 flex items-baseline gap-1 font-black text-zinc-900">
              <span className="text-base">LRN</span>
              <span className="text-[10px]">→</span>
              <span className="text-base">PSS</span>
            </div>
            <div className="mt-1 text-[7px] text-zinc-500">FLIGHT EE-2026 · GATE 03</div>
          </div>
          <div className="border-l border-dashed border-zinc-300 p-2">
            <div className="flex h-full items-center">
              <div className="flex gap-px">
                <div className="h-8 w-px bg-zinc-900" />
                <div className="h-8 w-0.5 bg-zinc-900" />
                <div className="h-8 w-px bg-zinc-900" />
                <div className="h-8 w-1 bg-zinc-900" />
                <div className="h-8 w-px bg-zinc-900" />
                <div className="h-8 w-0.5 bg-zinc-900" />
                <div className="h-8 w-px bg-zinc-900" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "notebook",
    category: "read",
    title: "합격 노트",
    subtitle: "손글씨 학습 노트북 9페이지",
    desc: "Bullet Journal 풍 손글씨 학습 노트. 옴·키르히호프·변압기·RLC·결선·안전·합격 일기·다짐까지. 키보드 ←→로 페이지 넘김.",
    href: "/news/news-notebook.html",
    badge: "NOTEBOOK",
    accent: "from-amber-200 to-amber-500",
    tileBg: "bg-[#f5ecd6]",
    tileContent: (
      <div className="absolute inset-0 p-3">
        <div
          className="relative h-full w-full rounded-sm bg-[#fdf6e3] shadow-inner"
          style={{
            backgroundImage:
              "linear-gradient(to right, transparent 22px, #e8b4b4 22px, #e8b4b4 23px, transparent 23px), repeating-linear-gradient(to bottom, transparent 0, transparent 14px, #d9c89a 14px, #d9c89a 15px)",
          }}
        >
          <div className="absolute left-7 top-3 font-serif italic text-zinc-700" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
            <div className="text-base font-bold">V = I R</div>
            <div className="mt-1 inline-block bg-yellow-300/70 px-1 text-[10px]">옴의 법칙 ✏️</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "recipe",
    category: "read",
    title: "옴의 법칙 풀코스",
    subtitle: "요리 레시피 풍 학습 카드",
    desc: "만개의레시피 풍 학습 레시피 카드. 재료(공식)·단계 7개·평점·후기·비슷한 레시피 4가지까지.",
    href: "/news/news-recipe.html",
    badge: "RECIPE",
    accent: "from-amber-200 via-rose-400 to-red-600",
    tileBg: "bg-[#fbf6ee]",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-[#3a2418]">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-inner ring-1 ring-amber-100">
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-amber-200 to-amber-400" />
          <div className="relative font-serif text-base font-black italic">V=IR</div>
        </div>
        <div className="mt-2 text-[11px] text-amber-500 tracking-widest">★★★★★</div>
        <div className="mt-1 text-[10px] font-bold">30분 완성</div>
      </div>
    ),
  },
  {
    id: "real-estate",
    category: "life",
    title: "스파크쌤 부동산",
    subtitle: "전기기능사 학습 매물 · 네이버 부동산 풍",
    desc: "옴아파트·키르히호프빌라·변압기타워 매물 시세. 동네별 합격률·지도 핀·즐겨찾기까지 — 학습을 부동산으로.",
    href: "/news/news-real-estate.html",
    badge: "REAL ESTATE",
    accent: "from-emerald-400 to-emerald-700",
    tileBg: "bg-white",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-zinc-900">
        <svg viewBox="0 0 24 32" className="h-9 w-7">
          <path
            d="M12 0C6 0 2 4 2 10c0 7 10 22 10 22s10-15 10-22c0-6-4-10-10-10z"
            fill="#10b981"
          />
          <circle cx="12" cy="10" r="3.5" fill="white" />
        </svg>
        <div className="mt-1 rounded bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700">전기이론구</div>
        <div className="mt-2 w-full max-w-[150px] rounded border border-zinc-200 bg-white p-2 shadow-sm">
          <div className="text-[9px] font-bold text-zinc-900">옴아파트 102동</div>
          <div className="text-[8px] text-zinc-500">전용 84㎡ · 12층</div>
          <div className="mt-1 text-[10px] font-black text-emerald-700">전세 12,000</div>
        </div>
      </div>
    ),
  },
  {
    id: "job-listing",
    category: "life",
    title: "스파크쌤 잡코리아",
    subtitle: "전기기능사 우대 채용 정보",
    desc: "사람인 풍 가상 채용 페이지. 스파크빌딩·볼트일렉트릭·전류기술 등 9개 회사 채용 공고 + 직무·지역 필터.",
    href: "/news/news-job-listing.html",
    badge: "JOB",
    accent: "from-blue-500 to-blue-700",
    tileBg: "bg-white",
    tileContent: (
      <div className="absolute inset-0 flex items-center justify-center p-3">
        <div className="w-full max-w-[180px] rounded-md border border-zinc-200 bg-white p-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-[9px] font-bold text-zinc-700">스파크빌딩</div>
            <span className="rounded bg-red-500 px-1.5 py-0.5 text-[8px] font-bold text-white">채용중</span>
          </div>
          <div className="mt-1.5 text-[10px] font-black text-zinc-900">전기기능사 우대</div>
          <div className="mt-1 flex flex-wrap gap-1 text-[8px] text-zinc-600">
            <span className="rounded bg-blue-50 px-1.5 py-0.5 text-blue-700">신입환영</span>
            <span className="rounded bg-zinc-100 px-1.5 py-0.5">전기기능사 우대</span>
          </div>
          <div className="mt-2 text-[8px] text-zinc-500">서울 강남구 · 정규직</div>
        </div>
      </div>
    ),
  },
  {
    id: "movie-ticket",
    category: "play",
    title: "스파크 시네마",
    subtitle: "전기 학습 시네마 페스티벌 2026",
    desc: "CGV 풍 가상 영화관. 옴의 법칙·전류의 흐름·테슬라 vs 에디슨 등 8편 + 좌석 선택·결제 UI까지.",
    href: "/news/news-movie-ticket.html",
    badge: "MOVIE",
    accent: "from-red-600 to-red-900",
    tileBg: "bg-[#1a1a1a]",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-white">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 shadow-lg">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white"><path d="M8 5v14l11-7z" /></svg>
        </div>
        <div className="mt-3 font-black text-sm tracking-[0.2em]">SPARK CINEMA</div>
        <div className="mt-2 grid grid-cols-6 gap-0.5">
          <div className="h-1.5 w-1.5 rounded-sm bg-zinc-600" />
          <div className="h-1.5 w-1.5 rounded-sm bg-red-500" />
          <div className="h-1.5 w-1.5 rounded-sm bg-zinc-600" />
          <div className="h-1.5 w-1.5 rounded-sm bg-zinc-600" />
          <div className="h-1.5 w-1.5 rounded-sm bg-red-500" />
          <div className="h-1.5 w-1.5 rounded-sm bg-zinc-600" />
          <div className="h-1.5 w-1.5 rounded-sm bg-zinc-600" />
          <div className="h-1.5 w-1.5 rounded-sm bg-zinc-600" />
          <div className="h-1.5 w-1.5 rounded-sm bg-zinc-600" />
          <div className="h-1.5 w-1.5 rounded-sm bg-zinc-600" />
          <div className="h-1.5 w-1.5 rounded-sm bg-zinc-600" />
          <div className="h-1.5 w-1.5 rounded-sm bg-zinc-600" />
        </div>
        <div className="mt-1 text-[8px] tracking-widest text-zinc-400">SCREEN</div>
      </div>
    ),
  },
  {
    id: "catalog",
    category: "read",
    title: "스파크쌤 카탈로그",
    subtitle: "2026 학습 제품 카탈로그 No.014",
    desc: "이케아·무지 풍 미니멀 카탈로그. 옴의 법칙 사전·키르히호프 노트북·변압기 머그컵 등 12종 학습 제품.",
    href: "/news/news-catalog.html",
    badge: "CATALOG",
    accent: "from-stone-300 to-stone-500",
    tileBg: "bg-[#fbfaf7]",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-stone-700">
        <div className="text-[9px] tracking-[0.3em] text-stone-400">No.014 · 2026</div>
        <div className="mt-1 font-serif text-sm font-bold italic">책상 위의 작은 변전소</div>
        <div className="mt-3 flex items-end gap-2">
          <svg viewBox="0 0 12 16" className="h-8 w-6">
            <rect x="1" y="1" width="10" height="14" fill="#d6d3d1" stroke="#78716c" strokeWidth="0.4" />
            <line x1="3" y1="4" x2="9" y2="4" stroke="#78716c" strokeWidth="0.3" />
            <line x1="3" y1="6" x2="9" y2="6" stroke="#78716c" strokeWidth="0.3" />
            <line x1="3" y1="8" x2="9" y2="8" stroke="#78716c" strokeWidth="0.3" />
          </svg>
          <svg viewBox="0 0 14 14" className="h-8 w-8">
            <path d="M2 4 H10 V11 H2 Z" fill="#e7e5e4" stroke="#78716c" strokeWidth="0.4" />
            <path d="M10 6 Q13 6 13 8 Q13 10 10 10" fill="none" stroke="#78716c" strokeWidth="0.4" />
            <text x="6" y="9" fontSize="3" fill="#78716c" textAnchor="middle" fontFamily="serif">V</text>
          </svg>
          <svg viewBox="0 0 14 10" className="h-6 w-8">
            <rect x="1" y="2" width="12" height="7" fill="#d6d3d1" stroke="#78716c" strokeWidth="0.4" />
            <line x1="1" y1="4" x2="13" y2="4" stroke="#78716c" strokeWidth="0.3" />
          </svg>
        </div>
        <div className="mt-2 h-px w-10 bg-stone-300" />
        <div className="mt-1 text-[8px] font-serif italic text-stone-500">SPARK CATALOG</div>
      </div>
    ),
  },
  {
    id: "airbnb",
    category: "life",
    title: "스파크비앤비",
    subtitle: "전기기능사 학습 합숙소 — 합격까지 머무는 곳",
    desc: "Airbnb 풍 가상 숙소 예약. 옴의 펜션·키르히호프 룸·변압기 빌라 10곳 + 지도·캘린더·예약 UI.",
    href: "/news/news-airbnb.html",
    badge: "STAY",
    accent: "from-pink-500 to-rose-700",
    tileBg: "bg-white",
    tileContent: (
      <div className="absolute inset-0 flex items-center justify-center p-3">
        <div className="w-full max-w-[180px] rounded-xl border border-zinc-200 bg-white p-3 shadow-sm">
          <div className="flex items-start justify-between">
            <svg viewBox="0 0 24 22" className="h-7 w-7">
              <path d="M12 2 L2 11 L4 11 L4 20 L20 20 L20 11 L22 11 Z" fill="#fda4af" stroke="#e11d48" strokeWidth="0.6" />
              <rect x="10" y="14" width="4" height="6" fill="#e11d48" />
            </svg>
            <span className="text-pink-500 text-base">♥</span>
          </div>
          <div className="mt-1.5 text-[10px] font-bold text-zinc-900">옴의 펜션</div>
          <div className="mt-0.5 text-[8px] text-zinc-500">★ 4.92 · 슈퍼호스트</div>
          <div className="mt-1.5 text-[10px] font-black text-zinc-900">₩89,000 <span className="text-[8px] font-normal text-zinc-500">/박</span></div>
        </div>
      </div>
    ),
  },
  {
    id: "arcade",
    category: "play",
    title: "스파크 아케이드",
    subtitle: "전기 학습 게임존 · INSERT COIN",
    desc: "80년대 오락실 풍 학습 게임 라인업. 옴 인베이더스·테트리스 옴·키르히호프 퍼즐·RLC 리듬 8종 + 명예의 전당.",
    href: "/news/news-arcade.html",
    badge: "ARCADE",
    accent: "from-cyan-400 via-pink-500 to-yellow-400",
    tileBg: "bg-black",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-white">
        <div
          className="font-mono font-black text-sm tracking-[0.2em] text-cyan-300"
          style={{ textShadow: "0 0 4px #22d3ee, 0 0 8px #ec4899" }}
        >
          SPARK
        </div>
        <div
          className="font-mono font-black text-sm tracking-[0.2em] text-pink-400"
          style={{ textShadow: "0 0 4px #ec4899, 0 0 8px #facc15" }}
        >
          ARCADE
        </div>
        <svg viewBox="0 0 16 12" className="mt-2 h-6 w-8">
          <rect x="7" y="0" width="2" height="2" fill="#facc15" />
          <rect x="5" y="2" width="2" height="2" fill="#facc15" />
          <rect x="9" y="2" width="2" height="2" fill="#facc15" />
          <rect x="3" y="4" width="2" height="2" fill="#22d3ee" />
          <rect x="5" y="4" width="6" height="2" fill="#22d3ee" />
          <rect x="11" y="4" width="2" height="2" fill="#22d3ee" />
          <rect x="1" y="6" width="14" height="2" fill="#ec4899" />
          <rect x="3" y="8" width="2" height="2" fill="#ec4899" />
          <rect x="11" y="8" width="2" height="2" fill="#ec4899" />
        </svg>
        <div className="mt-2 animate-pulse font-mono text-[9px] font-bold tracking-widest text-yellow-300">
          INSERT COIN
        </div>
      </div>
    ),
  },
  {
    id: "mobile-app",
    category: "sns",
    title: "스파크쌤 합격 학습 앱",
    subtitle: "모바일 학습 앱 인터페이스",
    desc: "5개 화면 mockup(홈·학습·퀴즈·프로필·알림) + 가상 다운로드 카운터·리뷰. Duolingo 풍 학습 앱 풀 인터페이스.",
    href: "/news/news-mobile-app.html",
    badge: "MOBILE APP",
    accent: "from-green-400 to-emerald-600",
    tileBg: "bg-white",
    tileContent: (
      <div className="absolute inset-0 flex items-center justify-center p-3">
        <div className="relative flex items-center gap-3">
          <svg viewBox="0 0 40 72" className="h-24 w-14">
            <rect x="1" y="1" width="38" height="70" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="0.6" />
            <rect x="4" y="6" width="32" height="58" rx="2" fill="#ecfdf5" />
            <rect x="6" y="10" width="20" height="3" rx="0.5" fill="#10b981" />
            <rect x="6" y="16" width="28" height="6" rx="1" fill="#a7f3d0" />
            <rect x="6" y="24" width="28" height="6" rx="1" fill="#bbf7d0" />
            <rect x="6" y="32" width="28" height="6" rx="1" fill="#a7f3d0" />
            <rect x="6" y="58" width="28" height="3" rx="0.5" fill="#10b981" />
            <circle cx="20" cy="68" r="1" fill="#475569" />
          </svg>
          <div className="flex flex-col items-center">
            <div className="text-5xl">⚡</div>
            <div className="mt-2 rounded-md bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-700 shadow-sm">
              Lv.7 · 12일 연속
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "car-dashboard",
    category: "learn",
    title: "스파크 모터스 모델E",
    subtitle: "전기차 계기판 · 학습 합격 드라이브",
    desc: "테슬라 풍 전기차 대시보드. 속도(학습 속도)·배터리(집중도)·미니맵(학습 로드맵) + 트립 컴퓨터·음악·진단.",
    href: "/news/news-car-dashboard.html",
    badge: "DASHBOARD",
    accent: "from-cyan-400 to-blue-700",
    tileBg: "bg-[#0a0f1a]",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-cyan-300">
        <div
          className="font-mono text-[10px] tracking-[0.4em] text-cyan-400"
          style={{ textShadow: "0 0 6px #22d3ee" }}
        >
          DRIVE OS
        </div>
        <svg viewBox="0 0 60 36" className="mt-2 h-14 w-24">
          <path
            d="M6 30 A24 24 0 0 1 54 30"
            stroke="#1e3a5f"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M6 30 A24 24 0 0 1 42 9"
            stroke="#22d3ee"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 3px #22d3ee)" }}
          />
          <text
            x="30"
            y="27"
            fontSize="10"
            fill="#22d3ee"
            textAnchor="middle"
            fontFamily="monospace"
            fontWeight="bold"
          >
            72
          </text>
        </svg>
        <div
          className="mt-1 font-mono text-xs font-black tracking-widest text-cyan-300"
          style={{ textShadow: "0 0 4px #22d3ee" }}
        >
          D-72
        </div>
      </div>
    ),
  },
  {
    id: "postcard",
    category: "read",
    title: "From the Road to 合格",
    subtitle: "합격으로 가는 길에서 보낸 엽서",
    desc: "OHM CITY·VOLTAGE BEACH·HERTZ STATION 등 6도시에서 보낸 빈티지 엽서. 앞뒷면 토글 + 우표 모달 + 엽서 작성.",
    href: "/news/news-postcard.html",
    badge: "POSTCARD",
    accent: "from-amber-200 to-stone-500",
    tileBg: "bg-[#f3e6c4]",
    tileContent: (
      <div className="absolute inset-0 flex items-center justify-center p-3">
        <div className="relative w-full max-w-[200px] rotate-[-2deg] rounded-sm bg-[#fbf3dc] p-3 shadow-md ring-1 ring-amber-700/20">
          <div className="absolute right-2 top-2">
            <svg viewBox="0 0 18 22" className="h-9 w-8">
              <rect x="0.5" y="0.5" width="17" height="21" fill="#fff8e1" stroke="#7a5418" strokeWidth="0.5" strokeDasharray="0.6 0.6" />
              <circle cx="9" cy="10" r="4" fill="#b8161a" />
              <text x="9" y="12" fontSize="4" fill="#fff8e1" textAnchor="middle" fontFamily="serif" fontWeight="bold">⚡</text>
              <text x="9" y="19" fontSize="2" fill="#7a5418" textAnchor="middle" fontFamily="serif">OHM</text>
            </svg>
          </div>
          <div
            className="font-serif text-base italic text-amber-900"
            style={{ fontFamily: "'Brush Script MT', cursive" }}
          >
            Greetings
          </div>
          <div className="mt-1 text-[9px] font-serif text-stone-600">from OHM CITY</div>
          <div className="mt-3 flex items-center gap-1">
            <div className="rotate-[-12deg] rounded-full border-2 border-red-700/60 px-1.5 py-0.5 font-mono text-[7px] font-black tracking-widest text-red-700/70">
              POSTED
            </div>
            <div className="h-px flex-1 bg-stone-400/40" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "food-delivery",
    category: "life",
    title: "스파크 잇츠",
    subtitle: "전기 학습 메뉴 배달 앱",
    desc: "옴라면·키르히호프 피자·변압기 버거 10개 음식점 + 장바구니·결제·주문 추적까지. 학습을 음식으로 비유한 배달 앱.",
    href: "/news/news-food-delivery.html",
    badge: "DELIVERY",
    accent: "from-yellow-400 via-orange-500 to-red-600",
    tileBg: "bg-white",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-zinc-900">
        <div className="inline-block rounded-full bg-yellow-400 px-2.5 py-0.5 text-[9px] font-black tracking-widest text-zinc-900 shadow-sm">
          배달 30분
        </div>
        <div className="mt-2 text-5xl">🍜</div>
        <div className="mt-2 font-black text-base tracking-tight">
          <span className="text-orange-500">SPARK</span>
          <span className="text-zinc-400">·</span>
          <span className="text-red-600">EATS</span>
        </div>
        <div className="mt-2 flex items-center gap-1 text-[9px] font-bold text-zinc-600">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
          배달중 · 라이더 이동 중
        </div>
      </div>
    ),
  },
  {
    id: "terminal",
    category: "learn",
    title: "sparkssaem CLI",
    subtitle: "개발자 터미널 풍 학습 인터페이스",
    desc: "ANSI 컬러 터미널에서 learn/quiz/simulator 명령어 자동 시퀀스 + 사용자 입력. JetBrains Mono로 풀어낸 CLI 학습.",
    href: "/news/news-terminal.html",
    badge: "CLI",
    accent: "from-green-400 to-emerald-700",
    tileBg: "bg-[#0a0a0a]",
    tileContent: (
      <div className="absolute inset-0 flex flex-col p-3 font-mono text-[10px] leading-snug text-green-400">
        <div className="mb-1 flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
          <span className="inline-block h-2 w-2 rounded-full bg-yellow-400" />
          <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
          <span className="ml-1 text-[8px] tracking-widest text-zinc-500">~/sparkssaem</span>
        </div>
        <div className="text-zinc-400">user@spark:~$ <span className="text-green-400">sparkssaem --help</span></div>
        <div className="text-zinc-500">  learn, quiz, simulator</div>
        <div className="text-zinc-400">user@spark:~$ <span className="text-cyan-400">learn ohm</span></div>
        <div className="text-green-400">  ✓ V = I × R</div>
        <div className="mt-0.5">
          <span className="text-zinc-400">$ </span>
          <span className="inline-block h-3 w-2 translate-y-0.5 animate-pulse bg-green-400" />
        </div>
      </div>
    ),
  },
  {
    id: "flyer",
    category: "read",
    title: "스파크 마트 전단지",
    subtitle: "이번 주 특가 · 5/15~5/21",
    desc: "노랑·빨강 톤 마트 전단지 풍 학습 제품 특가. 옴의 법칙 1L·키르히호프 라면·합격 쿠키 등 19개 상품 + 쿠폰.",
    href: "/news/news-flyer.html",
    badge: "FLYER",
    accent: "from-yellow-400 to-red-600",
    tileBg: "bg-[#fbf6dc]",
    tileContent: (
      <div className="absolute inset-0 flex items-center justify-center p-3">
        <div className="relative w-full max-w-[180px] rotate-[-2deg] rounded-sm bg-[#f5e8c2] p-3 shadow-md ring-1 ring-amber-700/20">
          <div className="absolute -right-2 -top-2 flex h-14 w-14 rotate-12 items-center justify-center rounded-full bg-red-600 text-center font-black text-white shadow-md ring-2 ring-yellow-300">
            <div className="leading-none">
              <div className="text-base">50</div>
              <div className="text-[8px] tracking-widest">%OFF</div>
            </div>
          </div>
          <div className="inline-block rounded-sm bg-red-600 px-1.5 py-0.5 text-[9px] font-black tracking-widest text-yellow-200 shadow-sm">
            특가!
          </div>
          <div className="mt-2 font-serif text-[10px] font-bold leading-tight text-red-700">옴의 법칙 1L</div>
          <div className="mt-2 inline-block rounded-sm border border-red-700 bg-yellow-200 px-2 py-0.5 font-mono text-[10px] font-black text-red-700">
            ₩ 1,200
          </div>
          <div className="mt-1 text-[8px] font-bold tracking-widest text-red-700/70 line-through">₩2,400</div>
        </div>
      </div>
    ),
  },
  {
    id: "science-fair",
    category: "learn",
    title: "ELECTRIC SCIENCE FAIR 2026",
    subtitle: "전기 학습 과학 박람회",
    desc: "5/20~24 가상 박람회 — 옴 실험실·테슬라 코일 라이브 등 부스 10개 + 입장권·타임테이블·후원사.",
    href: "/news/news-science-fair.html",
    badge: "EXPO",
    accent: "from-sky-400 to-emerald-500",
    tileBg: "bg-white",
    tileContent: (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-br from-sky-400 to-emerald-500" />
        <svg viewBox="0 0 12 16" className="absolute left-5 top-2 h-8 w-6 drop-shadow-sm">
          <ellipse cx="6" cy="6" rx="5" ry="5.6" fill="#ec4899" />
          <path d="M6 11 L5.4 13 L6.6 13 Z" fill="#831843" />
          <path d="M6 13 Q5.6 14.5 6 16 Q6.4 14.5 6 13" stroke="#831843" strokeWidth="0.4" fill="none" />
        </svg>
        <svg viewBox="0 0 12 16" className="absolute right-5 top-3 h-7 w-5 drop-shadow-sm">
          <ellipse cx="6" cy="6" rx="5" ry="5.6" fill="#facc15" />
          <path d="M6 11 L5.4 13 L6.6 13 Z" fill="#713f12" />
          <path d="M6 13 Q5.6 14.5 6 16 Q6.4 14.5 6 13" stroke="#713f12" strokeWidth="0.4" fill="none" />
        </svg>
        <div className="relative mt-2 flex flex-col items-center text-white">
          <div className="font-black text-2xl tracking-tight drop-shadow-md">ESF 2026</div>
          <div className="mt-0.5 text-[9px] font-bold tracking-widest opacity-90">SCIENCE FAIR</div>
        </div>
        <div className="relative mt-auto inline-block rounded-full bg-emerald-600 px-3 py-1 text-[10px] font-black tracking-widest text-white shadow-sm">
          5/20-24
        </div>
      </div>
    ),
  },
  {
    id: "manga",
    category: "read",
    title: "電気アドベンチャー Vol.壱",
    subtitle: "ELECTRIC ADVENTURES · 일본 만화책",
    desc: "흑백 일본 만화 — 김전기·패러데이 후예·옴 박사 등장 18컷. 우→좌 페이지 넘김 + 양면 펼침 + 효과음.",
    href: "/news/news-manga.html",
    badge: "MANGA",
    accent: "from-stone-200 to-zinc-500",
    tileBg: "bg-[#f3ecd9]",
    tileContent: (
      <div className="absolute inset-0 p-3">
        <div
          className="relative h-full w-full rounded-sm border border-zinc-700 bg-[#efe5cb] shadow-inner"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 40%, rgba(0,0,0,0.06) 0 1px, transparent 1px), radial-gradient(circle at 70% 70%, rgba(0,0,0,0.04) 0 1px, transparent 1px)",
            backgroundSize: "4px 4px, 5px 5px",
          }}
        >
          <div className="absolute left-1 top-1 right-1/2 bottom-1/2 border border-zinc-800 bg-[#f3ecd9]">
            <div className="flex h-full items-center justify-center">
              <svg viewBox="0 0 20 12" className="h-5 w-8">
                <path d="M2 6 L6 2 L8 5 L11 1 L14 7 L18 3" stroke="#0a0a0a" strokeWidth="0.8" fill="none" />
              </svg>
            </div>
          </div>
          <div className="absolute left-1/2 top-1 right-1 bottom-1/2 ml-0.5 border border-zinc-800 bg-[#efe5cb]">
            <div
              className="flex h-full items-center justify-center font-black italic text-[#0a0a0a]"
              style={{ fontFamily: "'Bangers', 'Impact', sans-serif", textShadow: "1px 1px 0 #f3ecd9" }}
            >
              <span className="rotate-[-8deg] text-xl tracking-tight">ZAP!</span>
            </div>
          </div>
          <div className="absolute left-1 top-1/2 right-1 bottom-1 mt-0.5 border border-zinc-800 bg-[#f3ecd9]">
            <div className="flex h-full items-center justify-center">
              <div className="text-center font-serif text-[#0a0a0a]">
                <div className="text-[9px] tracking-widest">電気アドベンチャー</div>
                <div className="mt-0.5 text-base font-black">Vol.壱</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "cafe-menu",
    category: "life",
    title: "스파크 카페",
    subtitle: "전기 학습 카페 메뉴 · EST. 2026",
    desc: "옴 에스프레소·키르히호프 마키아토·변압기 라테 등 13음료 4디저트. 카트·옵션·라떼아트 갤러리·멤버십 4티어.",
    href: "/news/news-cafe-menu.html",
    badge: "CAFE",
    accent: "from-amber-700 to-amber-900",
    tileBg: "bg-[#f5ecdb]",
    tileContent: (
      <div className="absolute inset-0 flex items-center justify-center gap-3 p-3 text-amber-900">
        <div className="flex flex-col items-center">
          <div className="font-serif text-2xl font-black tracking-tight" style={{ fontFamily: "'Playfair Display', 'Times New Roman', serif" }}>
            SPARK
          </div>
          <div className="mt-0.5 text-[8px] font-bold tracking-[0.35em] text-amber-800/80">
            CAFE · EST 2026
          </div>
          <div className="mt-1 h-px w-12 bg-amber-700/60" />
          <div className="mt-1 font-mono text-[10px] font-bold text-amber-800">₩4,500</div>
        </div>
        <svg viewBox="0 0 32 36" className="h-16 w-14">
          <path d="M6 10 H24 V24 Q24 30 15 30 Q6 30 6 24 Z" fill="#fffdf6" stroke="#78350f" strokeWidth="0.9" />
          <path d="M24 13 Q30 14 30 18 Q30 22 24 22" fill="none" stroke="#78350f" strokeWidth="0.9" />
          <ellipse cx="15" cy="11" rx="9" ry="1.6" fill="#7c2d12" />
          <path d="M11 5 Q11 7 12 8" fill="none" stroke="#78350f" strokeWidth="0.8" />
          <path d="M15 4 Q15 6 16 7" fill="none" stroke="#78350f" strokeWidth="0.8" />
          <path d="M19 5 Q19 7 20 8" fill="none" stroke="#78350f" strokeWidth="0.8" />
        </svg>
      </div>
    ),
  },
  {
    id: "library",
    category: "read",
    title: "스파크 도서관",
    subtitle: "OPAC · 한국 십진 분류 카탈로그",
    desc: "옴의 법칙 입문·키르히호프 완전정복 등 16권 + KDC 10분류 + 회원증 + 대출 영수증·반납 카운트다운.",
    href: "/news/news-library.html",
    badge: "LIBRARY",
    accent: "from-amber-800 to-emerald-900",
    tileBg: "bg-[#f4ebd7]",
    tileContent: (
      <div className="absolute inset-0 flex items-center justify-center gap-3 p-3 text-amber-900">
        <div className="flex flex-col items-center">
          <div className="font-serif text-2xl font-black tracking-tight" style={{ fontFamily: "'Playfair Display', 'Times New Roman', serif" }}>
            LIBRARY
          </div>
          <div className="mt-0.5 text-[8px] font-bold tracking-[0.35em] text-amber-800/80">
            OPAC · KDC
          </div>
          <div className="mt-1 h-px w-12 bg-amber-700/60" />
          <div className="mt-1 inline-block rounded-sm bg-amber-800 px-1.5 py-0.5 font-mono text-[9px] font-bold text-amber-50">
            KDC 500
          </div>
        </div>
        <svg viewBox="0 0 28 34" className="h-16 w-12">
          <rect x="2" y="2" width="24" height="30" fill="#fde68a" stroke="#78350f" strokeWidth="0.6" />
          <rect x="4" y="5" width="6" height="24" fill="#9a3412" stroke="#451a03" strokeWidth="0.5" />
          <rect x="11" y="5" width="6" height="24" fill="#166534" stroke="#052e16" strokeWidth="0.5" />
          <rect x="18" y="5" width="6" height="24" fill="#1e3a8a" stroke="#0c1f4d" strokeWidth="0.5" />
          <line x1="5" y1="10" x2="9" y2="10" stroke="#fcd34d" strokeWidth="0.4" />
          <line x1="12" y1="10" x2="16" y2="10" stroke="#fcd34d" strokeWidth="0.4" />
          <line x1="19" y1="10" x2="23" y2="10" stroke="#fcd34d" strokeWidth="0.4" />
        </svg>
      </div>
    ),
  },
  {
    id: "call-center",
    category: "life",
    title: "스파크 상담 센터",
    subtitle: "전기 학습 콜센터 상담",
    desc: "김상담(LV.7) 시니어 상담사 — 통화 #1248 진행 중. 대시보드·음성 파형·AI 보조·일일 통계 만족도까지.",
    href: "/news/news-call-center.html",
    badge: "CALL CENTER",
    accent: "from-blue-500 to-emerald-600",
    tileBg: "bg-white",
    tileContent: (
      <div className="absolute inset-0 flex items-center justify-center gap-3 p-3">
        <svg viewBox="0 0 36 32" className="h-16 w-16">
          <path
            d="M6 18 V14 a12 12 0 0 1 24 0 v4"
            fill="none"
            stroke="#2563eb"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <rect x="3" y="17" width="7" height="10" rx="1.5" fill="#2563eb" />
          <rect x="26" y="17" width="7" height="10" rx="1.5" fill="#2563eb" />
          <path
            d="M26 27 V29 a2 2 0 0 1 -2 2 H20"
            fill="none"
            stroke="#2563eb"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="19" cy="31" r="1.4" fill="#2563eb" />
        </svg>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
            </span>
            <span className="text-[9px] font-bold tracking-[0.25em] text-red-600">통화 ON</span>
          </div>
          <div className="mt-1.5 rounded-sm border border-zinc-300 bg-zinc-50 px-2 py-0.5 font-mono text-xs font-bold text-zinc-800">
            00:03:42
          </div>
          <div className="mt-1 font-mono text-[8px] tracking-widest text-blue-600">
            #1248
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "game-pass",
    category: "play",
    title: "SPARK GAME PASS",
    subtitle: "전기 학습 게임 구독 · 142 게임",
    desc: "옴 인베이더스 II·키르히호프 미스터리 디럭스 등 12게임 + 신작 배너·도전과제·4티어 구독 등급.",
    href: "/news/news-game-pass.html",
    badge: "GAME PASS",
    accent: "from-cyan-400 via-pink-500 to-lime-400",
    tileBg: "bg-[#0a0e1a]",
    tileContent: (
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 18% 25%, rgba(255,255,255,0.85), transparent), radial-gradient(1px 1px at 70% 18%, rgba(34,211,238,0.7), transparent), radial-gradient(1px 1px at 45% 75%, rgba(236,72,153,0.6), transparent), radial-gradient(1px 1px at 85% 60%, rgba(163,230,53,0.65), transparent)",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center gap-3 p-3">
          <div className="flex flex-col items-center">
            <div
              className="font-black text-xl tracking-tight text-[#22d3ee] drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
              style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}
            >
              GAME
            </div>
            <div
              className="font-black text-xl tracking-tight text-[#ec4899] drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"
              style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}
            >
              PASS
            </div>
            <div className="mt-1 font-mono text-[9px] font-bold tracking-widest text-[#a3e635] drop-shadow-[0_0_4px_rgba(163,230,53,0.7)]">
              142 게임
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-12 w-12">
              <path
                d="M12 2 L7 7 H4 V10 L7 13 V18 L12 22 L17 18 V13 L20 10 V7 H17 Z"
                fill="#22d3ee"
                stroke="#67e8f9"
                strokeWidth="0.5"
                style={{ filter: "drop-shadow(0 0 4px rgba(34,211,238,0.7))" }}
              />
              <rect x="10" y="9" width="4" height="4" fill="#ec4899" />
              <rect x="9" y="14" width="2" height="2" fill="#a3e635" />
              <rect x="13" y="14" width="2" height="2" fill="#a3e635" />
            </svg>
            <svg viewBox="0 0 28 16" className="h-7 w-12">
              <rect
                x="2"
                y="3"
                width="24"
                height="10"
                rx="5"
                fill="#1f2937"
                stroke="#a3e635"
                strokeWidth="0.6"
                style={{ filter: "drop-shadow(0 0 3px rgba(163,230,53,0.6))" }}
              />
              <circle cx="8" cy="8" r="1.3" fill="#22d3ee" />
              <circle cx="11" cy="8" r="1.3" fill="#ec4899" />
              <rect x="17" y="6.5" width="3" height="1" fill="#a3e635" />
              <rect x="18" y="5" width="1" height="4" fill="#a3e635" />
              <circle cx="22.5" cy="8" r="0.9" fill="#facc15" />
            </svg>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "live-coding",
    category: "broadcast",
    title: "@spark_live · 스파크쌤 라이브",
    subtitle: "전기 학습 라이브 코딩 스트림",
    desc: "VS Code 풍 가짜 에디터에서 옴의 법칙 계산기 자동 타이핑 + LIVE 채팅·도네이션 알림·시청자 자동 변동.",
    href: "/news/news-live-coding.html",
    badge: "LIVE",
    accent: "from-purple-500 to-cyan-400",
    tileBg: "bg-[#0e0e10]",
    tileContent: (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 flex flex-col gap-2 p-3">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.9)]" />
            <span className="rounded bg-red-600 px-1.5 py-0.5 font-mono text-[9px] font-black tracking-widest text-white">
              LIVE
            </span>
            <span className="font-mono text-[9px] tracking-widest text-cyan-300">spark_live</span>
          </div>
          <div className="flex-1 rounded border border-zinc-700/60 bg-[#1e1e1e] p-1.5 font-mono text-[8px] leading-tight">
            <div className="text-zinc-500">1  function ohm(v, r) {"{"}</div>
            <div className="text-zinc-300">2    return <span className="text-cyan-400">v</span> / <span className="text-cyan-400">r</span>;</div>
            <div className="text-zinc-500">3  {"}"}</div>
            <div className="text-zinc-300">4  ohm(<span className="text-amber-300">12</span>, <span className="text-amber-300">4</span>);</div>
          </div>
          <div className="flex items-center gap-1">
            <div className="rounded-2xl rounded-bl-sm bg-purple-600/90 px-2 py-0.5 font-mono text-[8px] text-white">
              GG 형!
            </div>
            <div className="rounded-2xl rounded-bl-sm bg-purple-500/80 px-2 py-0.5 font-mono text-[8px] text-white">
              027명 시청
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "debate",
    category: "broadcast",
    title: "SPARK DEBATE · 스파크 토론 광장",
    subtitle: "전기 학습 가상 토론 방송",
    desc: "옴 vs 키르히호프·직류 vs 교류 등 3 주제 + 패널 4명 + 사회자 + 시청자 투표·실시간 채팅·박수 게이지.",
    href: "/news/news-debate.html",
    badge: "DEBATE",
    accent: "from-red-500 via-yellow-400 to-blue-700",
    tileBg: "bg-[#0a0a14]",
    tileContent: (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.9)]" />
            <span className="rounded bg-red-600 px-1.5 py-0.5 font-mono text-[9px] font-black tracking-widest text-white">
              ON AIR
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-10 w-10">
              <rect x="9" y="3" width="6" height="11" rx="3" fill="#fbbf24" stroke="#78350f" strokeWidth="0.6" />
              <path d="M6 12 a6 6 0 0 0 12 0" fill="none" stroke="#fbbf24" strokeWidth="1.2" />
              <line x1="12" y1="18" x2="12" y2="22" stroke="#fbbf24" strokeWidth="1.2" />
              <rect x="8" y="21" width="8" height="1.5" rx="0.5" fill="#fbbf24" />
              <circle cx="11" cy="6" r="0.5" fill="#78350f" />
              <circle cx="13" cy="6" r="0.5" fill="#78350f" />
              <circle cx="11" cy="9" r="0.5" fill="#78350f" />
              <circle cx="13" cy="9" r="0.5" fill="#78350f" />
            </svg>
            <div className="font-mono">
              <div className="text-[9px] font-bold tracking-widest text-yellow-300">EP.027</div>
              <div className="text-[8px] tracking-widest text-blue-300">옴 vs 키르히호프</div>
            </div>
          </div>
          <div className="w-full max-w-[150px] rounded bg-black/60 px-2 py-1 font-mono text-[8px] tracking-widest text-yellow-200 ring-1 ring-yellow-500/30">
            <span className="text-red-400">●</span> 시청자 1,247명 · 라이브 자막
          </div>
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
        {/* 히어로 — 왜 존재하는가 */}
        <header className="mb-12">
          <p className="text-xs font-semibold tracking-widest text-indigo-600">
            ⭐ 별의 콘텐츠
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-4xl">
            전기기능사 별의 소식지
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-zinc-800 sm:text-xl">
            교재가 무거운 날에도, 0개보다 1개.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base">
            자격증 공부에서 떨어지는 사람의 상당수는 실력이 모자라서가 아니라
            끝까지 가지 못해서예요. 같은 개념을 계속 같은 방식으로만 보면
            누구나 지칩니다. 그래서 이 소식지는 똑같은 전기 이론을 인스타 피드,
            유튜브 채널, 신문, 게임 같은{" "}
            <strong className="font-semibold text-zinc-800">
              {cards.length}가지 익숙한 포맷
            </strong>
            으로 다시 풀어 두었어요. 더 많은 정보를 주려는 게 아니라,
            <strong className="font-semibold text-zinc-800">
              {" "}끝까지 갈 이유
            </strong>
            를 하나 더 만들어 두려는 거예요.
          </p>
        </header>

        {/* 학습자가 얻는 것 3가지 */}
        <section
          aria-labelledby="why-title"
          className="mb-12 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2
            id="why-title"
            className="text-sm font-semibold tracking-widest text-zinc-400"
          >
            이 소식지로 얻는 것
          </h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-3">
            <div>
              <div className="text-2xl" aria-hidden>
                🔁
              </div>
              <h3 className="mt-3 text-base font-bold text-zinc-900">
                같은 개념, 다른 각도
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-zinc-600">
                옴의 법칙 하나도 피드로, 영상으로, 기사로 다시 만나요.
                여러 맥락에서 반복 노출되면 외운 게 아니라
                <strong className="font-semibold text-zinc-800">
                  {" "}기억에 남습니다.
                </strong>
              </p>
            </div>
            <div>
              <div className="text-2xl" aria-hidden>
                🪶
              </div>
              <h3 className="mt-3 text-base font-bold text-zinc-900">
                낮아진 시작 부담
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-zinc-600">
                교재를 펴기엔 지친 날에도 카드 하나는 넘길 수 있어요.
                공부의 정서적 비용을 낮춰{" "}
                <strong className="font-semibold text-zinc-800">
                  손이 가게
                </strong>{" "}
                만듭니다.
              </p>
            </div>
            <div>
              <div className="text-2xl" aria-hidden>
                📈
              </div>
              <h3 className="mt-3 text-base font-bold text-zinc-900">
                끊기지 않는 학습
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-zinc-600">
                &lsquo;오늘 공부 못 함&rsquo;을 &lsquo;오늘 한 카드는 봄&rsquo;으로 바꿔요.
                작게라도 이어가는 것이{" "}
                <strong className="font-semibold text-zinc-800">
                  합격까지 가는 힘
                </strong>
                이에요.
              </p>
            </div>
          </div>
        </section>

        {/* 어떻게 활용하면 좋은지 */}
        <section
          aria-labelledby="how-title"
          className="mb-12 rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/60 p-6 sm:p-7"
        >
          <h2
            id="how-title"
            className="text-sm font-semibold tracking-widest text-zinc-400"
          >
            이렇게 써보세요
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm leading-6 text-zinc-600">
            <li className="flex gap-2.5">
              <span className="select-none text-indigo-500" aria-hidden>
                —
              </span>
              <span>
                주력은 교재·시뮬레이터. 소식지는{" "}
                <strong className="font-semibold text-zinc-800">
                  쉬어가며 복습하는 보조 채널
                </strong>
                로 쓰세요.
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="select-none text-indigo-500" aria-hidden>
                —
              </span>
              <span>
                집중이 안 풀리는 날엔 끌리는 포맷 하나만 골라 가볍게 넘겨도
                충분해요. <strong className="font-semibold text-zinc-800">완독이 목표가 아닙니다.</strong>
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="select-none text-indigo-500" aria-hidden>
                —
              </span>
              <span>
                이미 본 개념을 다른 포맷으로 또 만나면 그냥 넘기지 말고,
                <strong className="font-semibold text-zinc-800">
                  {" "}머릿속으로 한 번 설명
                </strong>
                해 보세요. 그게 진짜 복습이에요.
              </span>
            </li>
          </ul>
          <p className="mt-5 text-sm font-medium text-zinc-500">
            아래는 {cards.length}개 콘텐츠를 6가지 결로 묶어 둔 거예요.
            오늘의 기분에 맞는 곳부터 들어가 보세요. ↓
          </p>
        </section>

        {/* 카테고리 바로가기 */}
        <nav
          aria-label="카테고리 바로가기"
          className="mb-12 flex flex-wrap gap-2 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
        >
          {categories.map((cat) => {
            const count = cards.filter((c) => c.category === cat.id).length;
            return (
              <a
                key={cat.id}
                href={`#cat-${cat.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold text-zinc-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
              >
                <span aria-hidden>{cat.emoji}</span>
                {cat.label}
                <span className="ml-0.5 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-bold text-zinc-400">
                  {count}
                </span>
              </a>
            );
          })}
        </nav>

        {/* 카테고리별 섹션 */}
        <div className="space-y-16">
          {categories.map((cat) => {
            const items = cards.filter((c) => c.category === cat.id);
            if (items.length === 0) return null;
            return (
              <section
                key={cat.id}
                id={`cat-${cat.id}`}
                aria-labelledby={`cat-${cat.id}-title`}
                className="scroll-mt-24"
              >
                {/* 섹션 헤더 */}
                <div className="mb-6 border-b border-zinc-200 pb-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl" aria-hidden>
                      {cat.emoji}
                    </span>
                    <h2
                      id={`cat-${cat.id}-title`}
                      className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl"
                    >
                      {cat.label}
                    </h2>
                    <span className="text-xs font-semibold text-zinc-400">
                      {items.length}개
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    {cat.blurb}
                  </p>
                </div>

                {/* 카드 그리드 */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((c) => (
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
                          열어보기{" "}
                          <span className="transition group-hover:translate-x-0.5">
                            ↗
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* 하단 안내 */}
        <p className="mt-16 rounded-2xl border border-dashed border-zinc-200 bg-white p-5 text-center text-xs leading-6 text-zinc-500">
          📝 각 소식지는 새 탭에서 열려요. 형식은 제각각이지만 다루는 주제는 모두 전기기능사 합격을 위한 학습 자료예요.
          <br />
          (등장하는 댓글·구독자 수·발행 호수는 콘셉트 연출용이에요.)
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
