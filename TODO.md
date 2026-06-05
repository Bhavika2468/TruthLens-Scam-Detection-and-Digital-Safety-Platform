# ScamShield AI - Build Tracker

## Planned Phases

### Phase 1 — Architecture and folder structure
- [ ] Scaffold Next.js (TypeScript, App Router)
- [ ] Configure TailwindCSS + dark mode premium styling baseline
- [ ] Create monorepo-style folders: apps/web, packages/db, packages/scanner, packages/types
- [ ] Add route skeletons for Landing, Dashboard, Scanner, Reports, Community, Analytics, Profile, Settings
- [ ] Add README with run instructions

### Phase 2 — Database schema (Prisma)
- [ ] Create Prisma schema with required models
- [ ] Add seed script for Threat Categories
- [ ] Add migrations setup

### Phase 3 — Authentication
- [ ] Configure Auth.js/NextAuth with Prisma adapter
- [ ] Implement sign-up / login pages
- [ ] Add route protection

### Phase 4 — Universal scan engine
- [ ] Implement scanner package interface + rules-based v1 engine
- [ ] Implement upload intake for text/url/image/pdf/video (v1 stubs)
- [ ] Compute Risk/Trust scores + category + confidence
- [ ] Return detailed explanation evidence breakdown
- [ ] Persist scans + reports

### Phase 5 — Frontend dashboard
- [ ] Implement authenticated dashboard
- [ ] Scan history UI + report viewer navigation
- [ ] Charts for risk trends and category distribution

### Phase 6 — Reports system
- [ ] Report page with evidence breakdown, recommendations, safety checklist
- [ ] Save report flow

### Phase 7 — Community database
- [ ] Community submissions + listing/search
- [ ] Public view of submitted scam reports

### Phase 8 — Analytics
- [ ] Threat map/analytics charts (category distribution, trends)

### Phase 9 — Export system
- [ ] Export report as Markdown
- [ ] Export report as PDF

### Phase 10 — Deployment readiness
- [ ] Dockerfile + docker-compose (web + postgres)
- [ ] .env.example and production build instructions
- [ ] Add basic CI scripts (lint/typecheck/build)

