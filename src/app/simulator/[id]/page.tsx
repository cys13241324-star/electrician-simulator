import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SimulatorFrame from "@/components/SimulatorFrame";
import { MathText } from "@/components/Math";
import { getSimulator, simulators } from "@/lib/simulators";

export async function generateStaticParams() {
  return simulators.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const sim = getSimulator(id);
  if (!sim) return { title: "시뮬레이터" };
  return {
    title: `${sim.title} 시뮬레이터`,
    description: sim.description,
  };
}

export default async function SimulatorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sim = getSimulator(id);
  if (!sim) notFound();

  const hasInteractive = sim.status === "available" && Boolean(sim.htmlPath);
  const hasFormula = Boolean(sim.formula?.length);
  const hasExample = Boolean(sim.example);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <Header />

      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-8 sm:px-6 sm:py-10">
        {/* 브레드크럼 + 액션 */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <nav
            aria-label="위치"
            className="flex items-center gap-1.5 text-xs text-zinc-500"
          >
            <Link
              href="/simulator"
              className="rounded-md px-1.5 py-0.5 font-medium transition hover:bg-zinc-200/60 hover:text-zinc-800"
            >
              시뮬레이터
            </Link>
            <span aria-hidden>›</span>
            <span className="font-semibold text-zinc-700">{sim.subject}</span>
            <span aria-hidden>›</span>
            <span className="truncate text-zinc-500">{sim.topic}</span>
          </nav>
          {hasInteractive && (
            <a
              href={sim.htmlPath}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50"
            >
              새 창에서 열기 ↗
            </a>
          )}
        </div>

        {/* 타이틀 */}
        <header className="mb-7 flex items-start gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl border border-zinc-200 bg-white text-4xl shadow-sm">
            {sim.emoji}
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-wider text-indigo-600">
              {sim.subject} · {sim.topic}
            </p>
            <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              {sim.title}
            </h1>
            <p className="mt-2.5 max-w-2xl text-sm leading-7 text-zinc-600">
              {sim.description}
            </p>
          </div>
        </header>

        {/* 시뮬레이터 또는 준비중 안내 */}
        {hasInteractive ? (
          <section className="mb-10" aria-label="인터랙티브 시뮬레이터">
            <SimulatorFrame src={sim.htmlPath!} title={sim.title} />
            <p className="mt-3 text-center text-xs text-zinc-400">
              슬라이더와 입력값을 직접 바꿔보며 변화를 관찰하세요 · 전체화면을
              권장합니다
            </p>
          </section>
        ) : (
          <section className="mb-10 rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-10 text-center">
            <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold tracking-wider text-amber-800">
              🛠️ 준비중
            </span>
            <h2 className="mt-4 text-xl font-bold text-zinc-900">
              인터랙티브 시뮬은 곧 추가됩니다
            </h2>
            {hasFormula && (
              <p className="mt-2 text-sm text-zinc-600">
                그 동안 아래 핵심 공식으로 미리 학습해 두세요.
              </p>
            )}
          </section>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 핵심 공식 */}
          {hasFormula && (
            <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-white p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-bold tracking-wider text-white">
                  📐 핵심 공식
                </span>
                <h2 className="text-base font-bold text-zinc-900 sm:text-lg">
                  꼭 외워야 하는 공식
                </h2>
              </div>
              <div className="mt-5 space-y-4">
                {sim.formula!.map((f, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm"
                  >
                    <p className="text-xs font-semibold tracking-wider text-blue-700">
                      {f.name}
                    </p>
                    <div className="mt-3 overflow-x-auto rounded-xl bg-blue-50 px-4 py-3 text-base text-blue-900 ring-1 ring-blue-100 sm:text-lg">
                      <MathText>{f.expression}</MathText>
                    </div>
                    <p className="mt-3 text-xs leading-6 text-zinc-600">
                      <MathText>{f.meaning}</MathText>
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 예제 풀이 */}
          {hasExample && (
            <section className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50/60 to-white p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-600 px-2.5 py-1 text-[11px] font-bold tracking-wider text-white">
                  ✏️ 예제 풀이
                </span>
                <h2 className="text-base font-bold text-zinc-900 sm:text-lg">
                  기출 유형으로 확인하기
                </h2>
              </div>

              <div className="mt-5 rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold leading-7 text-zinc-800">
                  <MathText>{sim.example!.question}</MathText>
                </p>

                <div className="mt-4">
                  <p className="text-[11px] font-bold tracking-wider text-zinc-400">
                    주어진 값
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {sim.example!.given.map((g, i) => (
                      <li
                        key={i}
                        className="rounded-lg bg-zinc-50 px-2.5 py-1 text-xs text-zinc-700 ring-1 ring-zinc-100"
                      >
                        <MathText>{g}</MathText>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <p className="text-[11px] font-bold tracking-wider text-zinc-400">
                    풀이
                  </p>
                  <ol className="mt-2 space-y-1.5">
                    {sim.example!.solution.map((s, i) => (
                      <li
                        key={i}
                        className="flex gap-2.5 text-sm leading-7 text-zinc-700"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">
                          {i + 1}
                        </span>
                        <span className="overflow-x-auto">
                          <MathText>{s}</MathText>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 ring-1 ring-emerald-100">
                  <p className="text-[11px] font-bold tracking-wider text-emerald-700">
                    정답
                  </p>
                  <p className="mt-1 text-base font-bold text-emerald-900">
                    <MathText>{sim.example!.answer}</MathText>
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* 하단 내비게이션 */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/simulator"
            className="rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50"
          >
            ← 다른 시뮬레이터 둘러보기
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
