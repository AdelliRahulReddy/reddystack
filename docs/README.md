# ReddyStack — docs index

Docs live here only when they are current. Root docs are the authority;
everything in `docs/` is supporting detail. If a doc below contradicts a
root doc, the root doc wins.

## Root docs (read first)
- `../PRD.md` — what we build, the offer, prices, success test
- `../ARCHITECTURE.md` — Next.js + Supabase, the sync rule, RLS
- `../DESIGN.md` — simple English, price-first, mobile-first
- `../RULES.md` — the 10 non-negotiable rules
- `../TASKS.md` — build checklist
- `../PROGRESS.md` — build log (append-only)
- `../AGENTS.md` — agent instructions (2026-10-25 supersession note on top)

## Supporting docs
- `CODEBASE.md` — runtime architecture, route/content ownership
  (2026-10-25 note at the end: Supabase/Auth/CMS now exist; `src/data`
  content is being replaced by database reads)
- `AI_SEO_PLAYBOOK.md` — SEO + honesty rules (positioning section is
  superseded — see the 2026-10-25 note at the end; schema/honesty rules
  still apply)
- `BUSINESS_PROFILE.md` — business identity + Google Business Profile notes
  (2026-10-25 note at the end: GBP is back in scope for India local SEO)

## Deleted 2026-10-25 (structure cleanup, owner-approved)
- `context/` (PROJECT_CONTEXT_LITE, SEO_CONTEXT_LITE) — replaced by root docs
- `CODEX_README.md` — Codex-specific; this repo builds with OpenCode now
- `SEO_KEYWORDS.md`, `SEO_KEYWORD_MAP.md`, `SEO_FIX_PLAN_Reddystack.md` —
  September US/UK research + worldwide positioning; India-first SEO will be
  researched fresh (old volumes/rules do not transfer)
- `../test-results/performance/review.md` — generated test output
