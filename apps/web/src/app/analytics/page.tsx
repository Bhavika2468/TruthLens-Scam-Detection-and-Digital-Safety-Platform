export default function AnalyticsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 ring-1 ring-white/10 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_24px_rgba(236,72,153,0.65)]" />
            <span className="text-xs font-medium text-pink-200">Threat Map</span>
            <span className="text-xs text-zinc-400">Analytics</span>
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Threat Analytics</h1>
          <p className="mt-2 text-sm text-zinc-400">Phase 8: charts for trends & category distribution.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-xl [background:linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_0_34px_rgba(236,72,153,0.10)]">
          <div className="text-sm font-medium text-zinc-200">Category distribution</div>
          <div className="mt-2 h-32 rounded-xl bg-black/20 ring-1 ring-white/10 flex items-center justify-center text-sm text-zinc-500">
            Chart placeholder
          </div>
        </div>
        <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-xl [background:linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_0_34px_rgba(236,72,153,0.10)]">
          <div className="text-sm font-medium text-zinc-200">Risk trends</div>
          <div className="mt-2 h-32 rounded-xl bg-black/20 ring-1 ring-white/10 flex items-center justify-center text-sm text-zinc-500">
            Chart placeholder
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-black/20 p-6 ring-1 ring-pink-500/20 backdrop-blur-xl shadow-[0_0_0_1px_rgba(236,72,153,0.14),0_0_40px_rgba(236,72,153,0.10)]">
        <div className="text-sm font-medium text-zinc-100">Threat insights</div>
        <div className="mt-2 text-sm text-zinc-400">
          Phase 8 will connect scan + community data and render real analytics.
        </div>
      </div>
    </main>
  );
}



