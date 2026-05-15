import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* 헤더 */}
        <header className="mb-6 flex items-start justify-between gap-3">
          <Link
            href="/simulator"
            className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
          >
            ← 목록
          </Link>
          {hasInteractive && (
            <a
              href={sim.htmlPath}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-700 hover:bg-zinc-50"
            >
              새 창 ↗
            </a>
          )}
        </header>

        <section className="mb-8 flex items-start gap-4">
          <span className="text-4xl leading-none">{sim.emoji}</span>
          <div>
            <p className="text-xs font-semibold tracking-wider text-indigo-600">
              {sim.subject} · {sim.topic}
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              {sim.title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
              {sim.description}
            </p>
          </div>
        </section>

        {/* 시뮬레이터 또는 준비중 안내 */}
        {hasInteractive ? (
          <section className="mb-10 overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-sm">
            <iframe
              src={sim.htmlPath}
              title={sim.title}
              className="h-[80vh] w-full bg-white"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
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

        {/* 핵심 공식 */}
        {hasFormula && (
          <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-bold tracking-wider text-white">
                📐 핵심 공식
              </span>
              <h2 className="text-base font-bold text-zinc-900 sm:text-lg">
                꼭 외워야 하는 공식
              </h2>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              {sim.formula!.map((f, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm"
                >
                  <p className="text-xs font-semibold tracking-wider text-blue-700">
                    {f.name}
                  </p>
                  <div className="mt-3 rounded-xl bg-blue-50 px-4 py-3 text-base text-blue-900 ring-1 ring-blue-100 sm:text-lg">
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
      </main>

      <Footer />
    </div>
  );
}
