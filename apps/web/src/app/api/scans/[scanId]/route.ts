import { NextResponse } from 'next/server';

// Phase-4 connectivity fix: the report page needs a way to fetch reports.
// Until Phase-2 persistence (Prisma) is implemented, we keep reports in-memory.
// Note: in-memory data resets on server restart.

type ScanReport = {
  id: string;
  createdAt: string;
  input: {
    textProvided: boolean;
    urlProvided: boolean;
    imageProvided: boolean;
  };
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

// Shared runtime store (module-scoped).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalForReports = globalThis as any;
if (!globalForReports.__scamshield_reports__) {
  globalForReports.__scamshield_reports__ = new Map<string, ScanReport>();
}

function reportStore(): Map<string, ScanReport> {
  return globalForReports.__scamshield_reports__ as Map<string, ScanReport>;
}

export async function GET(
  _req: Request,
  ctx: { params: { scanId: string } }
) {
  const scanId = ctx.params.scanId;
  const report = reportStore().get(scanId);

  if (!report) {
    // Fallback: if the scan exists under another in-memory store due to hot reload/server mismatch,
    // return a deterministic placeholder explanation so the UI still shows analysis cards.
    return NextResponse.json(
      {
        ok: false,
        error: 'Report not found. Restarted server or in-memory reports cleared. Please run the scan again.',
        scanId,
      },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true, report });
}

