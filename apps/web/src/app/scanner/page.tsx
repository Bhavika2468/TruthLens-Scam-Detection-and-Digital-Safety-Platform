'use client';


import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';


type ScanResponse =
  | {
      ok: false;
      error: string;
    }
  | {
      ok: true;
      report: {
        id: string;
        createdAt: string;
        input: { textProvided: boolean; urlProvided: boolean; imageProvided: boolean };
        output: {
          riskScore: number;
          trustScore: number;
          threatCategory: string;
          confidence: number;
          explanation: {
            summary: string;
            evidence: string[];
            whyFlagged: string[];
            recommendedActions: string[];
          };
        };
      };
    };

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export default function ScannerPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'text' | 'url' | 'image'>('text');

  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const risk = useMemo(() => {
    const r = result && 'ok' in result && result.ok ? result.report.output.riskScore : 0;
    return clamp(r, 0, 100);
  }, [result]);

  const trust = useMemo(() => {
    const t = result && 'ok' in result && result.ok ? result.report.output.trustScore : 0;
    return clamp(t, 0, 100);
  }, [result]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (mode === 'text') {
      const trimmed = text.trim();
      if (!trimmed) {
        setError('Enter text to scan.');
        return;
      }
    }

    if (mode === 'url') {
      const trimmed = url.trim();
      if (!trimmed) {
        setError('Enter a website URL to scan.');
        return;
      }
    }

    setLoading(true);
    try {
      const payload =
        mode === 'text'
          ? { text }
          : { url };

      const res = await fetch('/api/scans', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // Always try to read server details so we can show meaningful errors.
      const contentType = res.headers.get('content-type') || '';
      let data: any = null;
      if (contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text().catch(() => '');
        data = { error: text || 'Non-JSON response from server' };
      }

      const typed = data as ScanResponse;
      if (!res.ok) {
        setResult({ ok: false, error: (typed as any)?.error || `Scan failed (HTTP ${res.status})` });
      } else {
        setResult(typed);
        const report = (typed as any)?.report;
        if (report?.id) {
          // Persist recent scans so Dashboard can show history (Phase 4 placeholder).
          try {
            const prevRaw = window.localStorage.getItem('scamshield_recent_scans');
            const prev = prevRaw ? (JSON.parse(prevRaw) as any[]) : [];
            const next = [
              {
                id: report.id,
                createdAt: report.createdAt,
                riskScore: report.output?.riskScore,
                threatCategory: report.output?.threatCategory,
              },
              ...prev,
            ].slice(0, 20);
            window.localStorage.setItem('scamshield_recent_scans', JSON.stringify(next));
          } catch {
            // ignore storage errors
          }
          // Keep user on this page and show analysis immediately (no navigation yet).
        }

      }
    } catch (err: any) {
      setResult({
        ok: false,
        error:
          err?.message || 'Network error while scanning. Check if the dev server is running and /api/scans is reachable.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      {/* Premium cyber background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute -bottom-56 left-10 h-[520px] w-[520px] rounded-full bg-pink-500/15 blur-3xl" />
        <div className="absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-purple-500/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(236,72,153,0.14),transparent_55%)]" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
          <span className="h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_24px_rgba(236,72,153,0.65)]" />
                  <span className="text-xs font-medium text-pink-200">TruthLens</span>
          <span className="text-xs text-zinc-400">• Trust verification</span>
        </div>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Universal Scam Scanner
        </h1>

        <p className="text-sm text-zinc-300 sm:text-base">
          Paste suspicious content and get a detailed trust report.
        </p>
      </div>


      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        {/* Form */}
        <section className="lg:col-span-2">
          <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-zinc-200">Input type</div>
                <div className="mt-1 text-xs text-zinc-500">Text or URL (Phase 4 v1)</div>
              </div>
              <div className="flex flex-wrap gap-2 rounded-xl bg-black/30 p-1 ring-1 ring-white/10">
                <button
                  type="button"
                  onClick={() => setMode('text')}
                  className={
                    'rounded-lg px-3 py-2 text-xs sm:text-sm transition ' +
                    (mode === 'text'
                      ? 'bg-pink-500/20 text-pink-100 ring-1 ring-pink-500/30'
                      : 'text-zinc-400 hover:text-zinc-200')
                  }
                >
                  Text
                </button>
                <button
                  type="button"
                  onClick={() => setMode('url')}
                  className={
                    'rounded-lg px-3 py-2 text-xs sm:text-sm transition ' +
                    (mode === 'url'
                      ? 'bg-purple-500/20 text-purple-100 ring-1 ring-purple-500/30'
                      : 'text-zinc-400 hover:text-zinc-200')
                  }
                >
                  URL
                </button>
                <button
                  type="button"
                  onClick={() => setMode('image')}
                  className={
                    'rounded-lg px-3 py-2 text-xs sm:text-sm transition ' +
                    (mode === 'image'
                      ? 'bg-fuchsia-500/20 text-fuchsia-100 ring-1 ring-fuchsia-500/30'
                      : 'text-zinc-400 hover:text-zinc-200')
                  }
                >
                  Image
                </button>
              </div>
            </div>


            <form onSubmit={onSubmit} className="mt-5 space-y-4">
              {mode === 'text' ? (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-300">Suspicious message</label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={7}
                    placeholder="Paste text from SMS/WhatsApp/email or any suspicious message..."
                    className="w-full resize-none rounded-xl bg-black/30 p-3 text-sm text-zinc-100 ring-1 ring-white/10 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-pink-400/40"
                  />
                </div>
              ) : mode === 'url' ? (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-300">Website URL</label>
                  <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/login"
                    inputMode="url"
                    className="w-full rounded-xl bg-black/30 p-3 text-sm text-zinc-100 ring-1 ring-white/10 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-400/40"
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="text-xs font-medium text-zinc-300">Upload screenshot / image</label>

                  <div className="rounded-xl bg-black/25 p-4 ring-1 ring-white/10">
                    <div className="text-xs text-zinc-400">JPG/PNG/WebP supported (Phase 4 placeholder scoring).</div>

                    <div className="mt-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const f = e.target.files?.[0] || null;
                          setImageFile(f);
                        }}
                        className="block w-full cursor-pointer text-sm text-zinc-400 file:mr-3 file:rounded-full file:border-0 file:bg-pink-500/20 file:px-3 file:py-2 file:text-xs file:font-medium file:text-pink-100 file:ring-1 file:ring-pink-500/30 hover:file:bg-pink-500/25"
                      />
                    </div>

                    {imageFile ? (
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium text-zinc-100">{imageFile.name}</div>
                          <div className="text-xs text-zinc-500">{Math.round(imageFile.size / 1024)} KB</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setImageFile(null)}
                          className="rounded-lg bg-white/5 px-3 py-2 text-xs text-zinc-200 ring-1 ring-white/10 hover:bg-white/10"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="mt-3 text-xs text-zinc-500">No file selected.</div>
                    )}
                  </div>

                  <div className="text-xs text-zinc-500">Tip: include the scam message area for better OCR later (Phase 6+).</div>
                </div>
              )}


              {error ? <div className="text-sm text-red-400">{error}</div> : null}

              <button
                disabled={loading}
                className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-zinc-100 ring-1 ring-white/10 transition hover:bg-white/15 disabled:opacity-60"
              >
                {loading ? 'Scanning…' : 'Run Trust Analysis'}
              </button>

              <div className="text-xs text-zinc-500">
                Note: File/photo/video/PDF support is planned for Phase 4+; this v1 page supports Text/URL scanning.
              </div>
            </form>
          </div>
        </section>

        {/* Results */}
        <section className="lg:col-span-3">
          <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-zinc-200">Trust Report</div>
                <div className="mt-1 text-xs text-zinc-500">Risk score, trust score, and explainability</div>
              </div>
              {result && 'ok' in result && result.ok ? (
                <div className="rounded-xl bg-black/30 px-3 py-1 text-xs text-zinc-300">
                  {new Date(result.report.createdAt).toLocaleString()}
                </div>
              ) : null}
            </div>

            {!result ? (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {['Risk Score', 'Trust Score', 'Threat Category', 'Confidence'].map((t) => (
                  <div key={t} className="rounded-2xl bg-black/30 p-4 ring-1 ring-white/10">
                    <div className="text-xs text-zinc-500">{t}</div>
                    <div className="mt-2 text-2xl font-semibold text-zinc-200">—</div>
                  </div>
                ))}
              </div>
            ) : 'ok' in result && !result.ok ? (
              <div className="mt-8 rounded-2xl bg-red-500/10 p-4 text-sm text-red-200 ring-1 ring-red-500/20">
                {result.error}
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-black/30 p-4 ring-1 ring-white/10">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-zinc-500">Risk Score</div>
                      <div className="text-xs font-medium text-zinc-300">{risk}/100</div>
                    </div>
                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-red-400"
                        style={{ width: `${risk}%` }}
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl bg-black/30 p-4 ring-1 ring-white/10">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-zinc-500">Trust Score</div>
                      <div className="text-xs font-medium text-zinc-300">{trust}/100</div>
                    </div>
                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-emerald-400"
                        style={{ width: `${trust}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-black/30 p-4 ring-1 ring-white/10">
                    <div className="text-xs text-zinc-500">Threat Category</div>
                    <div className="mt-2 text-lg font-semibold text-zinc-100">{result.report.output.threatCategory}</div>
                  </div>
                  <div className="rounded-2xl bg-black/30 p-4 ring-1 ring-white/10">
                    <div className="text-xs text-zinc-500">Confidence</div>
                    <div className="mt-2 text-lg font-semibold text-zinc-100">{Math.round(result.report.output.confidence * 100)}%</div>
                  </div>
                </div>

                <div className="rounded-2xl bg-black/30 p-4 ring-1 ring-white/10">
                  <div className="text-sm font-medium text-zinc-200">Why it was flagged</div>
                  <p className="mt-2 text-sm text-zinc-300">{result.report.output.explanation.summary}</p>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <div className="text-xs font-medium text-zinc-400">Evidence</div>
                      <ul className="mt-2 space-y-1 text-sm text-zinc-300">
                        {result.report.output.explanation.evidence.map((x, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" />
                            <span>{x}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="text-xs font-medium text-zinc-400">Recommended actions</div>
                      <ul className="mt-2 space-y-1 text-sm text-zinc-300">
                        {result.report.output.explanation.recommendedActions.map((x, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            <span>{x}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <div className="text-xs text-zinc-500">Scan ID</div>
                  <div className="mt-1 font-mono text-sm text-zinc-200">{result.report.id}</div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

