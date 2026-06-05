'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type ScanSummary = {
  id: string;
  createdAt: string;
  riskScore: number;
  threatCategory: string;
};

function getRecentHistory(): ScanSummary[] {
  try {
    if (typeof window === 'undefined') return [];
    // Dashboard reads this key written by /scanner
    const raw = window.localStorage.getItem('scamshield_recent_scans');

    if (!raw) return [];
    const parsed = JSON.parse(raw) as ScanSummary[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((x) => x && typeof x.id === 'string')
      .slice(0, 20)
      .map((x) => ({
        id: x.id,
        createdAt: x.createdAt,
        riskScore: Number(x.riskScore) || 0,
        threatCategory: x.threatCategory || '—',
      }));
  } catch {
    return [];
  }
}


function getSessionEmail(): string | null {
  try {
    if (typeof window === 'undefined') return null;
    const raw = window.localStorage.getItem('scamshield_session');
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { email?: string };
    return parsed.email || null;
  } catch {
    return null;
  }
}

export default function DashboardPage() {
  const router = useRouter();

  const [email, setEmail] = useState<string | null>(null);
  const [history, setHistory] = useState<ScanSummary[]>([]);

  useEffect(() => {
    setEmail(getSessionEmail());
    setHistory(getRecentHistory());


    // Protected route placeholder until Phase 3 real auth is wired.
    const hasCookie = document.cookie
      .split(';')
      .map((c) => c.trim())
      .some((c) => c.startsWith('scamshield_session='));

    if (!hasCookie) router.push('/auth/login');
  }, []);



  const topThreat = useMemo(() => {
    const map = new Map<string, number>();
    for (const h of history) map.set(h.threatCategory, (map.get(h.threatCategory) || 0) + 1);
    let best: { k: string; v: number } | null = null;
    for (const [k, v] of map.entries()) {
      if (!best || v > best.v) best = { k, v };
    }
    return best?.k || '—';
  }, [history]);

  const totalScans = history.length;
  const threatsDetected = history.filter((h) => h.riskScore >= 50).length;
  const avgRisk = totalScans ? Math.round(history.reduce((a, b) => a + b.riskScore, 0) / totalScans) : 0;

  return (
<main className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute -bottom-56 left-10 h-[520px] w-[520px] rounded-full bg-pink-500/15 blur-3xl" />
        <div className="absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-purple-500/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(236,72,153,0.16),transparent_55%)]" />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-black/25 px-3 py-1 ring-1 ring-pink-500/25 shadow-[0_0_0_1px_rgba(236,72,153,0.12),0_0_28px_rgba(236,72,153,0.14)]">
            <span className="h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_24px_rgba(236,72,153,0.65)]" />
            <span className="text-xs font-medium text-pink-200">TruthLens</span>
            <span className="text-xs text-zinc-400">Dashboard</span>
          </div>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Hi{email ? `, ${email}` : ''}</h1>
          <p className="mt-2 text-sm text-zinc-400">
            See how trust is built: run scans, review reports, and track scam trends.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <button
            type="button"
            onClick={() => {
              // Placeholder logout until Phase 3 real auth
              document.cookie = `scamshield_session=; path=/; max-age=0; SameSite=Lax; Secure`;
              if (typeof window !== 'undefined') window.localStorage.removeItem('scamshield_session');
              router.push('/');
            }}
            className="rounded-xl bg-black/30 px-4 py-3 text-sm font-medium text-pink-200 ring-1 ring-pink-500/30 shadow-[0_0_24px_rgba(236,72,153,0.20)] hover:bg-black/40"
          >
            Logout
          </button>

          <Link
            href="/scanner"
            className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-3 text-sm font-semibold text-black shadow-[0_0_24px_rgba(236,72,153,0.25)] ring-1 ring-white/10 hover:opacity-95"
          >
            Start a scan
          </Link>

        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { t: 'Total Scans', v: totalScans },
          { t: 'Threats Detected', v: threatsDetected },
          { t: 'Avg Risk', v: avgRisk },
        ].map((x) => (
          <div key={x.t} className="rounded-2xl bg-black/20 p-5 ring-1 ring-pink-500/20 shadow-[0_0_0_1px_rgba(236,72,153,0.18),0_0_34px_rgba(236,72,153,0.14)]">
            <div className="text-xs text-zinc-400">{x.t}</div>
            <div className="mt-2 text-3xl font-semibold">{x.v}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 lg:col-span-2">
          <div className="flex items-center justify-between">

            <div>
              <div className="text-sm font-medium text-zinc-200">Feature preview</div>
              <div className="mt-1 text-xs text-zinc-500">What TruthLens will do next</div>
            </div>
            <div className="rounded-xl bg-black/30 px-3 py-2 text-xs text-zinc-300 ring-1 ring-white/10">Live demo</div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { title: 'Universal Scan', desc: 'Text, URL, Image → Risk/Trust + Evidence.' },
              { title: 'Explainable Reports', desc: 'Why flagged + recommended actions.' },
              { title: 'Community Database', desc: 'Public searchable scam submissions.' },
              { title: 'Threat Analytics', desc: 'Charts: category distribution and trends.' },
            ].map((f) => (
              <div key={f.title} className="rounded-xl bg-black/30 p-4 ring-1 ring-white/10">
                <div className="text-sm font-medium text-zinc-100">{f.title}</div>
                <div className="mt-1 text-xs text-zinc-400">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

          <div className="rounded-2xl bg-black/25 p-5 ring-1 ring-pink-500/25 shadow-[0_0_0_1px_rgba(236,72,153,0.15),0_0_32px_rgba(236,72,153,0.12)]">
          <div className="text-sm font-medium text-zinc-200">Top Threat Category</div>
          <div className="mt-2 text-2xl font-semibold text-zinc-100">{topThreat}</div>
          <div className="mt-2 text-xs text-zinc-500">Based on your recent (placeholder) scan history.</div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-zinc-200">Recent scans</div>
            <div className="mt-1 text-xs text-zinc-500">View your scan results.</div>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs text-zinc-500">
              <tr>
                <th className="px-2 py-2">Time</th>
                <th className="px-2 py-2">Threat</th>
                <th className="px-2 py-2">Risk</th>
                <th className="px-2 py-2">Open</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {history.map((h) => (
                <tr key={h.id} className="hover:bg-white/5">
                  <td className="px-2 py-3 text-zinc-300">{new Date(h.createdAt).toLocaleString()}</td>
                  <td className="px-2 py-3 text-zinc-200">{h.threatCategory}</td>
                  <td className="px-2 py-3">
                    <span className="rounded-full bg-black/30 px-2 py-1 ring-1 ring-white/10">
                      {h.riskScore}/100
                    </span>
                  </td>
                  <td className="px-2 py-3">
                    <a href={`/reports/${encodeURIComponent(h.id)}`} className="text-pink-200 hover:text-pink-100">
                      View report
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

