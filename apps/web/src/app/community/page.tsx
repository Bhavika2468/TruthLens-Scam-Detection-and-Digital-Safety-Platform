export default function CommunityPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 ring-1 ring-white/10 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_24px_rgba(236,72,153,0.65)]" />
            <span className="text-xs font-medium text-pink-200">Community</span>
            <span className="text-xs text-zinc-400">Scam database</span>
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Community Scam Database</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Phase 7: public searchable database of community reports.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-xl [background:linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_0_34px_rgba(236,72,153,0.10)]">
          <div className="text-sm font-medium text-zinc-200">Trust signals</div>
          <div className="mt-2 text-sm text-zinc-400">
            Verified evidence, category tags, and recommended actions.
          </div>
        </div>
        <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-xl [background:linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_0_34px_rgba(236,72,153,0.10)]">
          <div className="text-sm font-medium text-zinc-200">Search & filter</div>
          <div className="mt-2 text-sm text-zinc-400">
            Find scams by category, keywords, and date.
          </div>
        </div>
        <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-xl [background:linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_0_34px_rgba(236,72,153,0.10)]">
          <div className="text-sm font-medium text-zinc-200">Community submissions</div>
          <div className="mt-2 text-sm text-zinc-400">
            Contribute new scam reports with evidence links or screenshots.
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-black/20 p-6 ring-1 ring-pink-500/20 backdrop-blur-xl shadow-[0_0_0_1px_rgba(236,72,153,0.14),0_0_40px_rgba(236,72,153,0.10)]">
        <div className="text-sm font-medium text-zinc-100">UI placeholder</div>
        <div className="mt-2 text-sm text-zinc-400">
          Add submission form + public list when Phase 7 is implemented.
        </div>
      </div>
    </main>
  );
}



