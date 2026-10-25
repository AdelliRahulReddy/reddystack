# ReddyStack — PROGRESS (append-only build log)

- 2026-09-26: live site v2.0.0 (Next.js, dark design, US/UK proof-first
  positioning, custom quotes, no database).
- 2026-10-23: Founder Skill Board (3x FUND IF, 4.7/10) + Competitors
  (gap: exclusive enquiries from a client-owned asset, baseline report,
  named person, fixed price, no lock-in) for the India enquiry stack.
- 2026-10-25: Supabase project `reddystack` (lclgzoishrlhgocgfyln) created;
  18 tables + seed (6 services, Enquiry Sprint ₹14,999, works) verified;
  RLS policies + grants applied; admin owner row (thereddystack@gmail.com).
- 2026-10-25: build 1 parts 1–4 (OpenCode): public pages (services,
  calculator, works, process, FAQ) + full /admin (dashboard, services,
  enquiries, works, content, settings) reading/writing Supabase.
  Gates green: lint 0/0, build success (134 routes), tests 10/10,
  typecheck clean. Sync proof: owner confirmed price changes reflect on
  the site; test rows deleted, DB clean (0 quotes, 0 enquiries).
- 2026-10-25: structure cleanup (owner-approved): root docs = AGENTS,
  PRD, ARCHITECTURE, DESIGN, RULES, TASKS, PROGRESS; docs/ trimmed to
  README, CODEBASE, AI_SEO_PLAYBOOK, BUSINESS_PROFILE; deleted
  context/, CODEX_README, September US/UK SEO research files, and stale
  test output. File-size law enforced by scripts/check-file-size.mjs.
- OPEN: homepage rewrite to the India enquiry stack (owner-approved
  2026-10-25; old deep pages stay in footer as legacy/SEO content;
  foreign clients in phase 2 after Indian proof).
- 2026-10-25: homepage rewrite DONE (owner-approved). Homepage + /pricing
  + nav now read Supabase: hero/positioning from site_content, Enquiry
  Sprint from bundles, service prices from services, works (client vs
  portfolio) from works, guarantee from settings, FAQs from faqs. Removed
  US/UK copy (Proof Sprint/Stack Build/Operate, custom-quote language),
  the visitor-country "Visiting from …?" banner (+ /api/visitor-country +
  CountrySuggestion), and PricingData. Market pages (/us /uk …) keep the
  legacy HomeV3 as SEO content. Gates green (lint 0/0, build success,
  tests 10/10, typecheck clean). Note: services."Landing page (Basic)"
  is ₹5,989 in the DB (seed was ₹4,999) — a leftover owner test change to
  confirm/restore.
- 2026-10-25: build 1 SHIPPED live (owner word "Ship build 1 live now"): commit f9dc520 pushed to main on github.com/AdelliRahulReddy/reddystack; Vercel env vars (NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY) added by owner; live verified: /calculator shows all 6 services with exact prices, homepage hero + Enquiry Sprint ₹14,999.
- 2026-10-25: Landing page (Basic) price restored ₹5,989 → ₹4,999 (owner decision; the ₹5,989 was a sync-proof test leftover).
- 2026-10-25: 25 agent skills installed in .agents/skills/ (provenance in SOURCES.md); mandatory-skills rule added to AGENTS.md.
- 2026-10-25: root docs standardised (one file, one job, no repeats, no pointers to deleted files): AGENTS.md 146 → 65 lines, PRD.md reframed to live + next builds, ARCHITECTURE.md corrected (RLS done, live on Vercel, real folder map), DESIGN.md corrected (current look NOT final; design changes must follow the design skills), RULES.md + rule 11 (docs standard).
