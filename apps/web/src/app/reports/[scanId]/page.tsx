'use client';

import React, { useEffect, useState } from 'react';

type ReportResponse =
  | {
      ok: false;
      error: string;
    }
  | {
      ok: true;
      report: {
        id: string;
        createdAt: string;
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

export default function ReportPage({
  params,
}: {
  params: { scanId: string };
}) {
  const [data, setData] = useState<ReportResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function run() {
      setLoading(true);
      try {
        const url = `/api/scans/${encodeURIComponent(params.scanId)}`;
        const res = await fetch(url, { method: 'GET' });
        const json = (await res.json()) as ReportResponse;
        if (!mounted) return;
        setData(json);
      } catch {
        if (!mounted) return;
        setData({ ok: false, error: 'Failed to load report.' });
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    run();

    return () => {
      mounted = false;
    };
  }, [params.scanId]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 ring-1 ring-white/10 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_24px_rgba(236,72,153,0.65)]" />
            <span className="text-xs font-medium text-pink-200">Report</span>
            <span className="text-xs text-zinc-400">Scan details</span>
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Trust Report</h1>
          <p className="mt-2 text-sm text-zinc-400">Scan ID: {params.scanId}</p>
        </div>
      </div>

      {loading ? (
        <div className="mt-10 text-sm text-zinc-400">Loading report…</div>
      ) : !data || !('ok' in data) ? null : data.ok ? (
        <>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl bg-black/20 p-6 ring-1 ring-pink-500/20 backdrop-blur-xl shadow-[0_0_0_1px_rgba(236,72,153,0.14),0_0_40px_rgba(236,72,153,0.10)]">
              <div className="text-sm font-medium text-zinc-200">Risk Score</div>
              <div className="mt-2 text-4xl font-semibold">{data.report.output.riskScore}/100</div>
              <div className="mt-2 text-sm text-zinc-400">Higher means more suspicious.</div>
            </div>

            <div className="rounded-2xl bg-black/20 p-6 ring-1 ring-white/10 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_0_34px_rgba(236,72,153,0.08)] lg:col-span-2">
              <div className="text-sm font-medium text-zinc-200">Explanation & Evidence</div>
              <div className="mt-4 space-y-3">
                <div className="rounded-xl bg-black/30 ring-1 ring-white/10 p-4">
                  <div className="text-xs font-medium text-zinc-400">Summary</div>
                  <div className="mt-2 text-sm text-zinc-200">{data.report.output.explanation.summary}</div>
                </div>

                <div className="rounded-xl bg-black/30 ring-1 ring-white/10 p-4">
                  <div className="text-xs font-medium text-zinc-400">Threat category</div>
                  <div className="mt-2 text-sm text-zinc-200">{data.report.output.threatCategory}</div>
                  <div className="mt-1 text-xs text-zinc-500">Confidence: {Math.round(data.report.output.confidence * 100)}%</div>
                </div>

                <div className="rounded-xl bg-black/30 ring-1 ring-white/10 p-4">
                  <div className="text-xs font-medium text-zinc-400">Evidence</div>
                  <ul className="mt-2 list-disc pl-5 text-sm text-zinc-200 space-y-1">
                    {data.report.output.explanation.evidence.map((x, i) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl bg-black/20 p-6 ring-1 ring-white/10 backdrop-blur-xl lg:col-span-1">
              <div className="text-sm font-medium text-zinc-200">Trust Score</div>
              <div className="mt-2 text-4xl font-semibold">{data.report.output.trustScore}/100</div>
              <div className="mt-2 text-sm text-zinc-400">Higher means safer.</div>
            </div>

            <div className="mt-0 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-xl [background:linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] lg:col-span-2">
              <div className="text-sm font-medium text-zinc-200">Recommendations</div>
              <div className="mt-2 text-sm text-zinc-400">Actions to reduce risk immediately.</div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {data.report.output.explanation.recommendedActions.map((x, i) => (
                  <div key={i} className="rounded-xl bg-black/20 p-4 ring-1 ring-pink-500/20">
                    {x}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          {/* Always keep the Trust Report look for demo/presentation. */}
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl bg-black/20 p-6 ring-1 ring-pink-500/20 backdrop-blur-xl shadow-[0_0_0_1px_rgba(236,72,153,0.14),0_0_40px_rgba(236,72,153,0.10)]">
              <div className="text-sm font-medium text-zinc-200">Risk Score</div>
              <div className="mt-2 text-4xl font-semibold">—/100</div>
              <div className="mt-2 text-sm text-zinc-400">Trust report unavailable.</div>
            </div>

            <div className="rounded-2xl bg-black/20 p-6 ring-1 ring-white/10 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_0_34px_rgba(236,72,153,0.08)] lg:col-span-2">
              <div className="text-sm font-medium text-zinc-200">Explanation & Evidence</div>
              <div className="mt-4 rounded-xl bg-red-500/10 ring-1 ring-red-500/20 p-4">
                <div className="text-xs font-medium text-red-200">Scan report unavailable</div>
                <div className="mt-2 text-sm text-zinc-200">{data.error}</div>
                <div className="mt-2 text-xs text-zinc-400">
                  For a guaranteed demo, run the scan again right before presenting.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl bg-black/20 p-6 ring-1 ring-white/10 backdrop-blur-xl lg:col-span-1">
              <div className="text-sm font-medium text-zinc-200">Trust Score</div>
              <div className="mt-2 text-4xl font-semibold">—/100</div>
              <div className="mt-2 text-sm text-zinc-400">Trust report unavailable.</div>
            </div>

            <div className="mt-0 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-xl [background:linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] lg:col-span-2">
              <div className="text-sm font-medium text-zinc-200">Recommendations</div>
              <div className="mt-2 text-sm text-zinc-400">General safety steps:</div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  'Do not share OTP/credentials.',
                  'Verify sender/domain independently.',
                  'Use official support channels.',
                  'Avoid forwarding suspicious screenshots.'
                ].map((x, i) => (
                  <div key={i} className="rounded-xl bg-black/20 p-4 ring-1 ring-pink-500/20">
                    {x}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}




