export default function SettingsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-xl [background:linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_0_34px_rgba(236,72,153,0.10)]">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-black/20 px-4 py-2 ring-1 ring-pink-500/20 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_24px_rgba(236,72,153,0.65)]" />
              <span className="text-xs font-medium text-pink-200">Preferences</span>
              <span className="text-xs text-zinc-400">Settings</span>
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">Settings</h1>
            <p className="mt-2 text-sm text-zinc-400">Phase 3: account settings and security options.</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-black/20 p-4 ring-1 ring-white/10">
            <div className="text-sm font-medium text-zinc-200">Scan defaults</div>
            <div className="mt-2 text-sm text-zinc-400">Choose which signals to prioritize.</div>
          </div>
          <div className="rounded-xl bg-black/20 p-4 ring-1 ring-white/10">
            <div className="text-sm font-medium text-zinc-200">Privacy</div>
            <div className="mt-2 text-sm text-zinc-400">Control how scans are stored and shared.</div>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-black/20 p-4 ring-1 ring-pink-500/20">
          <div className="text-sm font-medium text-zinc-100">Placeholder UI</div>
          <div className="mt-2 text-sm text-zinc-400">Wire forms when Phase 3 is implemented.</div>
        </div>
      </div>
    </main>
  );
}



