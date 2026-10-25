# ReddyStack — ARCHITECTURE

## Stack
- Next.js (App Router) + TypeScript. One app serves public site + /admin.
- Supabase (Postgres + Auth) as the only backend. Project ref
  lclgzoishrlhgocgfyln, https://lclgzoishrlhgocgfyln.supabase.co,
  region ap-south-1. NEVER the ReddyWatch project (nhhubbhghigtjmhxzqam)
  or any ReelsXpress project.
- Hosting: Vercel at ship time only, on the owner's word. The current live
  reddystack.com is NOT replaced until the owner says ship.

## Data flow (the sync rule)
Public pages and admin both read/write the same Supabase tables. There is
no second copy of prices, services, works or content anywhere in code.
- Public reads: services, service_options, bundles, works, faqs,
  site_content, settings (public-safe rows only).
- Public writes: enquiries, quotes, quote_items (insert only).
- Admin writes: everything above, behind Supabase Auth + admin_users check.
- RLS (to be set in build 1): public read on catalogue/content tables;
  anon insert on enquiries/quotes/quote_items; all other writes require an
  authenticated owner. Until RLS is set, the admin login gate is the only
  protection — say so plainly in the build report.

## Tables (18, created by migration 001, seeded by 002 — read, don't guess)
services, service_options, bundles, enquiries, quotes, quote_items, clients,
orders, client_reports, works, testimonials (EMPTY by design), faqs,
site_content, pages_seo, keywords, stats_daily, settings, admin_users.
Money is whole INR integers. Status enums are enforced by CHECK constraints.

## Environments
- .env.local (gitignored, owner pastes keys himself): NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY. Never commit, never print, never chat.
- Local dev: npm run dev. Production: Vercel env vars, same names.

## Folder map (see folder structure in the build brief)
- src/app: routes (public + admin). src/components: reusable UI.
- src/lib: supabase clients + one query module per table group.
- src/types: shared types. tests: paired tests per logic module.
- supabase/migrations: copies of 001 + 002 (source of truth is the live DB;
  migrations are the record, not a re-run target).
