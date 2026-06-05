# TruthLens — Scam Detection & Digital Safety Platform

TruthLens is a web platform that helps users identify suspicious scam/phishing content and generate a **Trust Report** with risk/trust scores, evidence, and recommended safety actions.

---

## Website Features (as shipped in this repo)

### 1) Landing / Marketing
- Route: `/` (`apps/web/src/app/page.tsx`)
- Explains the product and routes users to **Try Scanner** and **Sign in**.

### 2) Universal Scam Scanner (v1 placeholder scoring)
- Route: `/scanner` (`apps/web/src/app/scanner/page.tsx`)
- User can scan:
  - **Text** (paste suspicious message)
  - **URL** (paste website link)
  - **Image** (upload screenshot/image)
- Calls API endpoint:
  - `POST /api/scans` (`apps/web/src/app/api/scans/route.ts`)
- Response includes:
  - `riskScore`, `trustScore`, `threatCategory`, `confidence`
  - `explanation.summary`
  - `explanation.evidence[]`
  - `explanation.whyFlagged[]`
  - `explanation.recommendedActions[]`

### 3) Scan persistence (best-effort)
- The API attempts to persist scans using Prisma.
- If DB is misconfigured/unavailable, the UI still works and returns a placeholder report.
- Key file:
  - `apps/web/src/lib/prisma.ts`

### 4) Reports
- Route: `/reports/[scanId]` (`apps/web/src/app/reports/[scanId]/page.tsx`)
- Displays a previously generated report (when available).

### 5) Auth (Login/Signup)
- Routes under:
  - `/auth/login`
  - `/auth/signup`

---

## User Flow
1. User signs up / signs in.
2. User opens **Scanner** and provides suspicious input (text/url/image).
3. System analyzes input and generates a Trust Report.
4. Report can be stored in history (DB-enabled) and viewed via report pages.

---

## Architecture (High-level)

### Monorepo layout
- `apps/web`
  - Next.js (App Router)
  - UI pages and API routes
- `packages/db`
  - Prisma schema + DB utilities
- `packages/types`
  - Shared types (if used)

### Request flow (Scanner)
- Browser submits input → `POST /api/scans`
- API builds a report (heuristic placeholder scoring for v1)
- API returns JSON to the UI
- If Prisma is configured, the scan is saved and can be fetched via report routes.

---

## API Endpoints (most important)
- `POST /api/scans`
  - File: `apps/web/src/app/api/scans/route.ts`
  - Accepts JSON body (preferred) and also attempts multipart parsing as fallback.
- `GET /api/scans/[scanId]` (if implemented in repo)
  - File: `apps/web/src/app/api/scans/[scanId]/route.ts`

---

## Tech Stack
Frontend:

Next.js 15 App Router
TypeScript
Tailwind CSS
shadcn/ui
Framer Motion
Recharts

Backend:

Next.js API Routes
PostgreSQL
Prisma ORM

---

## Project Structure
- `apps/web` — Next.js web application
- `packages/db` — Prisma schema, migrations/seed, DB client
- `packages/types` — shared types

---

## Getting Started

1) Install dependencies
- Root:
  - `npm install`
- Web app:
  - `cd apps/web && npm install`

2) Configure environment variables
- Create a `.env` (location depends on your setup; commonly under `apps/web`).
- Make sure `DATABASE_URL` is set if you want scan persistence.

3) Run the dev server
- `npm run dev`

---

## Notes
- The scanner is designed to remain functional even if Prisma/DB is unavailable.
- If you see Prisma-related errors, verify `DATABASE_URL` and Prisma schema setup.

---

