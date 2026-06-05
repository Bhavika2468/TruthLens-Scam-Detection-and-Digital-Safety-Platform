import Link from 'next/link';

export default function LandingPage() {
  return (
<main className="min-h-screen bg-gradient-to-b from-fuchsia-950 via-black to-purple-950 text-zinc-100 font-['Times_New_Roman']">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute -bottom-56 left-10 h-[520px] w-[520px] rounded-full bg-pink-500/15 blur-3xl" />
        <div className="absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-purple-500/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(236,72,153,0.14),transparent_55%)]" />
      </div>

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10">
            <span className="absolute inset-0 bg-gradient-to-br from-pink-500/25 via-purple-500/20 to-cyan-400/20" />
            <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-lg bg-black/30 ring-1 ring-white/10">
              <span className="text-[12px] font-extrabold tracking-tight text-pink-100">T</span>
            </span>
          </div>
          <div>
            <div className="text-sm font-semibold">TruthLens</div>

            <div className="text-xs text-zinc-400">Scam Detection • Digital Safety</div>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <a className="text-sm text-zinc-300 hover:text-zinc-100" href="#features">Features</a>
          <a className="text-sm text-zinc-300 hover:text-zinc-100" href="#how">How it works</a>
          <a className="text-sm text-zinc-300 hover:text-zinc-100" href="#faq">FAQ</a>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            className="rounded-xl bg-white/5 px-3 py-2 text-sm text-zinc-200 ring-1 ring-white/10 hover:bg-white/10"
            href="/scanner"
          >
            Try Scanner
          </Link>
          <Link
            className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 text-sm font-semibold text-black ring-1 ring-white/10 hover:opacity-95"
            href="/auth/login"
          >
            Sign in
          </Link>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
              <span className="relative flex h-4 w-4 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-25 blur" />
                <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500/25 to-purple-500/25 ring-1 ring-white/10">
                  <span className="text-[10px] font-bold tracking-tight text-pink-100">T</span>
                </span>
              </span>
              <span className="text-xs font-medium text-pink-200">AI Trust Verification</span>
              <span className="text-xs text-zinc-400">• Digital Trust & Cyber Safety</span>
            </div>


            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Scam detection you can trust.
              <span className="block bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Scan. Verify. Prevent fraud.
              </span>
            </h1>

            <p className="mt-4 text-base text-zinc-300 sm:text-lg">
              TruthLens helps individuals and organizations detect phishing, fake job offers,
              suspicious websites, suspicious screenshots, and social engineering attempts.
              Get a Risk Score + Trust Report with evidence and recommended actions.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/auth/login"
                className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 px-5 py-3 text-sm font-semibold text-black shadow-[0_0_24px_rgba(236,72,153,0.25)] ring-1 ring-white/10 hover:opacity-95"
              >
                Start free
              </Link>
              <Link
                href="/scanner"
                className="rounded-xl bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-200 ring-1 ring-white/10 hover:bg-white/10"
              >
                See how it works
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[{ k: '0-100', v: 'Risk Score' }, { k: '0-100', v: 'Trust Score' }, { k: 'Explain', v: 'Evidence' }].map((x) => (
                <div key={x.v} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <div className="text-sm font-semibold text-zinc-100">{x.k}</div>
                  <div className="mt-1 text-xs text-zinc-400">{x.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Product demo */}
          <div className="relative">
            <div className="rounded-3xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur">
              <div className="flex items-center justify-between gap-3 rounded-2xl bg-black/30 px-4 py-3 ring-1 ring-white/10">
                <div>
                  <div className="text-sm font-medium text-zinc-200">Live Trust Preview</div>
                  <div className="text-xs text-zinc-500">Placeholder scoring (Phase 4 v1)</div>
                </div>
                <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-200 ring-1 ring-emerald-500/20">
                  Verified
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  { label: 'Risk Score', value: '64/100', tone: 'bg-red-400' },
                  { label: 'Trust Score', value: '36/100', tone: 'bg-emerald-400' },
                  { label: 'Threat Category', value: 'Phishing', tone: 'bg-purple-400' },
                  { label: 'Confidence', value: '72%', tone: 'bg-cyan-400' },
                ].map((c) => (
                  <div key={c.label} className="rounded-2xl bg-black/25 p-4 ring-1 ring-white/10">
                    <div className="text-xs text-zinc-400">{c.label}</div>
                    <div className="mt-2 text-lg font-semibold text-zinc-100">{c.value}</div>
                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <div className={`h-full rounded-full ${c.tone}`} style={{ width: '72%' }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 rounded-2xl bg-black/25 p-4 ring-1 ring-white/10">
                <div className="text-sm font-medium text-zinc-200">Why it was flagged</div>
                <p className="mt-2 text-sm text-zinc-300">
                  Detected urgency/credential cues and suspicious link patterns (placeholder).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6">
        <h2 className="text-2xl font-semibold">Features</h2>
        <p className="mt-2 text-sm text-zinc-400">Designed like a premium cyber product.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { t: 'Universal Scan Engine', d: 'Text, URL, and file intake (v1 placeholder for now).' },
            { t: 'Threat Explanation', d: 'Evidence breakdown + recommended actions for every scan.' },
            { t: 'Community Safety', d: 'Submit reports and help others verify scam activity.' },
          ].map((x) => (
            <div key={x.t} className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
              <div className="text-sm font-semibold">{x.t}</div>
              <div className="mt-2 text-sm text-zinc-400">{x.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { n: '1', t: 'Sign in', d: 'Create an account to save scans & reports.' },
            { n: '2', t: 'Scan', d: 'Paste suspicious text or URL. (Image/PDF planned next).' },
            { n: '3', t: 'Trust report', d: 'Get risk/trust scores with explanations & safety steps.' },
          ].map((x) => (
            <div key={x.n} className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
              <div className="text-xs text-pink-200">Step {x.n}</div>
              <div className="mt-1 text-lg font-semibold text-zinc-100">{x.t}</div>
              <div className="mt-2 text-sm text-zinc-400">{x.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <h2 className="text-2xl font-semibold">FAQ</h2>
        <div className="mt-6 space-y-3">
          {[
            { q: 'Is this 100% accurate?', a: 'No. It provides risk/trust signals with evidence so you can verify safely.' },
            { q: 'Can I export reports?', a: 'Export system is planned (PDF/Markdown) in later phases.' },
            { q: 'Do you store my scans?', a: 'With sign-in, scans can be stored in your history. (DB connector may require setup).' },
          ].map((x) => (
            <div key={x.q} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
              <div className="text-sm font-semibold">{x.q}</div>
              <div className="mt-2 text-sm text-zinc-400">{x.a}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 text-sm text-zinc-400 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="font-semibold text-zinc-200">TruthLens</span> — Scam Detection & Digital Trust.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-zinc-200">Privacy</a>
            <a href="#" className="hover:text-zinc-200">Terms</a>
            <a href="#" className="hover:text-zinc-200">Support</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

