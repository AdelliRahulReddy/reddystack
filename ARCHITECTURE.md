# ReddyStack — ARCHITECTURE

## Stack
- Next.js (App Router) + TypeScript. One app serves public site + /admin.
- Supabase (Postgres + Auth) as the only backend. Project ref
  lclgzoishrlhgocgfyln, https://lclgzoishrlhgocgfyln.supabase.co,
  region ap-south-1. NEVER the ReddyWatch project (nhhubbhghigtjmhxzqam)
  or any ReelsXpress project.
- Hosting: Vercel. The live reddystack.com runs this build (shipped
  2026-10-25 on the owner's word).

## Data flow (the sync rule)
Public pages and admin both read/write the same Supabase tables. There is
no second copy of prices, services, works or content anywhere in code.
- Public reads: services, service_options, bundles, works, faqs,
  site_content, settings (public-safe rows only).
- Public writes: enquiries, quotes, quote_items (insert only).
- Admin writes: everything above, behind Supabase Auth + admin_users check.
- RLS (applied 2026-10-25, migration 003_rls.sql, verified): public read
  on catalogue/content tables; anon insert on enquiries/quotes/quote_items;
  all other writes require an authenticated owner.

## Tables (18, created by migration 001, seeded by 002 — read, don't guess)
services, service_options, bundles, enquiries, quotes, quote_items, clients,
orders, client_reports, works, testimonials (EMPTY by design), faqs,
site_content, pages_seo, keywords, stats_daily, settings, admin_users.
Money is whole INR integers. Status enums are enforced by CHECK constraints.

## Environments
- .env.local (gitignored, owner pastes keys himself): NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY. Never commit, never print, never chat.
- Local dev: npm run dev. Production: Vercel env vars, same names.

## Folder map (checked against the real tree 2026-10-25)
- src/app: routes (public + admin). src/components: reusable UI.
  src/data: legacy hardcoded content for the old pages (new pages read
  Supabase, not this).
- src/lib: supabase clients + one query module per table group, with tests
  next to the code (src/lib/*.test.ts).
- src/types: shared types. src/styles, src/utils: styles + helpers.
- supabase/migrations: 001_tables.sql + 002_seed.sql + 003_rls.sql (the
  live DB is the source of truth; migrations are the record, not a re-run
  target).
