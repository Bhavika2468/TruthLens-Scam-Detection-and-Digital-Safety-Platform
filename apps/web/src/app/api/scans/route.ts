import { NextResponse } from 'next/server';

// Phase 4 placeholder universal scan engine.
// IMPORTANT: Keep this endpoint functional even if Prisma/DB isn't available,
// so the UI always shows a Trust Report.
export async function POST(req: Request) {
  const contentType = req.headers.get('content-type') || '';

  let inputText: string | undefined;
  let inputUrl: string | undefined;
  let inputImageProvided = false;

  // --- JSON parsing (preferred) ---
  try {
    // Some clients send JSON without perfect content-type; parse as text then JSON.
    const raw = await req.text();
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        const maybeText = (parsed as any).text;
        const maybeUrl = (parsed as any).url;
        if (typeof maybeText === 'string') inputText = maybeText;
        if (typeof maybeUrl === 'string') inputUrl = maybeUrl;
      }
    }
  } catch {
    // ignore; will fall back to multipart if applicable
  }

  // --- Multipart parsing (fallback) ---
  if (contentType.includes('multipart/form-data')) {
    try {
      const form = await req.formData();
      const t = form.get('text');
      const u = form.get('url');
      const img = form.get('image');

      inputText = typeof t === 'string' ? t : inputText;
      inputUrl = typeof u === 'string' ? u : inputUrl;
      inputImageProvided = !!img;
    } catch {
      // ignore
    }
  }

  const text = (inputText || '').trim();
  const url = (inputUrl || '').trim();
  const imageProvided = inputImageProvided;

  // Always compute report (UI must be responsive)
  const hasPhrases = (phrases: string[]) => {
    const combined = text.toLowerCase();
    return phrases.some((p) => combined.includes(p));
  };

  let riskScore = 22;
  let trustScore = 78;
  let category = 'Impersonation Scam';
  let confidence = 0.56;

  if (url) {
    const u = url.toLowerCase();
    if (u.includes('login') || u.includes('verify') || u.includes('secure')) {
      riskScore += 18;
      trustScore -= 10;
      category = 'Phishing';
      confidence = 0.66;
    }
    if (u.includes('.xyz') || u.includes('.top') || u.includes('bit.ly')) {
      riskScore += 22;
      trustScore -= 16;
      category = 'Suspicious Website';
      confidence = 0.68;
    }
  }

  if (imageProvided) {
    riskScore += 24;
    trustScore -= 18;
    category = 'Suspicious Image / Screenshot';
    confidence = 0.62;

    if (url) confidence += 0.04;
  }

  if (hasPhrases(['otp', 'one time password', 'urgent', 'act now', 'wire transfer', 'gift card', 'crypto'])) {
    riskScore += 34;
    trustScore -= 24;
    category = 'OTP Scam';
    confidence = 0.72;
  }

  if (hasPhrases(['job offer', 'internship', 'registration fee', 'unrealistic salary'])) {
    riskScore += 30;
    trustScore -= 20;
    category = 'Fake Job Offer';
    confidence = 0.7;
  }

  riskScore = Math.max(0, Math.min(100, riskScore));
  trustScore = Math.max(0, Math.min(100, trustScore));

  const explanation = {
    summary:
      'This is a Phase 4 placeholder report. Real detection heuristics/ML integrations will replace this scoring.',
    evidence: [
      ...(url ? [`URL pattern review: ${url}`] : []),
      ...(text ? ['Text pattern review: analyzed provided text heuristically.'] : []),
      ...(imageProvided ? ['Image analysis placeholder: OCR/deepfake/screenshot indicators to be added.'] : []),
    ],
    whyFlagged: [
      ...(url ? 'URL contains login/verify-like cues or suspicious TLD patterns.' : []),
      ...(text ? 'Message contains common scam phrasing (urgency/OTP/financial request markers).' : []),
      ...(imageProvided ? 'Uploaded screenshot/image may contain scam phrasing or manipulated content (placeholder).' : []),
    ],
    recommendedActions: [
      'Do not share OTP/credentials.',
      'Verify sender/domain independently.',
      'Use official support channels.',
      'Avoid forwarding screenshots to untrusted parties.',
    ],
  };

  // Try to persist to DB, but never fail the UI if Prisma/DB is misconfigured.
  const scanId = `scan_${Date.now()}`;

  try {
    const { prisma } = await import('../../../lib/prisma');
    const userId = 'demo_user';

    const scan = await prisma.scan.create({
      data: {
        userId,
        inputType: url ? 'URL' : text ? 'TEXT' : 'TEXT',
        inputText: text || null,
        inputUrl: url || null,
        status: 'COMPLETED',
        riskScore,
        trustScore,
        confidence,
        threatCategories: {
          // If Prisma is strict about ThreatCategory enum type,
          // cast for now (Phase 2 will finalize schema).
          create: [{ category: category as any }],
        },
        report: {
          create: {
            summary: explanation.summary,
            explanation,
            recommendations: explanation.recommendedActions,
            safetyChecklist: [],
            // If the schema requires additional fields (e.g., user relation), Phase 2 will add them.
          } as any,
        },
      },
    });

    return NextResponse.json({
      ok: true,
      report: {
        id: scan.id,
        createdAt: scan.createdAt.toISOString(),
        output: {
          riskScore: scan.riskScore,
          trustScore: scan.trustScore,
          threatCategory: category,
          confidence: scan.confidence,
          explanation,
        },
      },
    });
  } catch {
    // Prisma failure (you’re seeing query_engine-windows.dll issues).
    // Return JSON report so website works.
    return NextResponse.json({
      ok: true,
      report: {
        id: scanId,
        createdAt: new Date().toISOString(),
        output: {
          riskScore,
          trustScore,
          threatCategory: category,
          confidence,
          explanation,
        },
      },
      warning: 'DB unavailable; returned non-persisted placeholder report.',
    });
  }
}

