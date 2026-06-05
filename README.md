# TruthLens — Scam Detection & Digital Safety Platform

TruthLens helps users identify potential scams and learn digital-safety best practices.

## Features
- Scam/scammer content scanning (API)
- Scan history and reports
- User authentication (login/signup)
- Modular monorepo structure (apps + packages)

## Tech Stack
- **Next.js (App Router)**
- **TypeScript**
- **Prisma** (database layer)
- **Tailwind CSS**

## Project Structure
- `apps/web` — Next.js web application
- `packages/db` — Prisma/DB package
- `packages/types` — shared types

## Getting Started
> Commands assume you have Node.js installed.

1. Install dependencies
   - Root:
     - `npm install`
   - Web app:
     - `cd apps/web && npm install`

2. Configure environment variables
- Create a `.env` file where your app expects it (typically under `apps/web`).
- Ensure Prisma DB connection string is set (e.g., `DATABASE_URL`).

3. Run database (if needed)
- Prisma migrations / seeding are available in the `packages/db` package.

4. Start the dev server
- `npm run dev`

## Scripts
- From root, check `package.json` for available scripts.

## Notes
- This repository is deployed/hosted independently from any local machine configuration.
- If you get Prisma errors, confirm `DATABASE_URL` and run migrations.

## License
See `LICENSE`.

