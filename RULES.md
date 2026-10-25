# ReddyStack — RULES (our rules, non-negotiable)

1. ONE folder: C:\projects\reddystack. No worktree folders, no second copies.
   Branches are fine inside it; work on `dev`, ship to `main` only on the
   owner's word. Only Muse merges dev → main, and only when told "ship it".
2. ONE source of truth: Supabase project lclgzoishrlhgocgfyln. Never hardcode
   a price, service, work or content string in page code — read the database.
   Never touch ReddyWatch or ReelsXpress projects, code or databases.
3. HONESTY: no fake clients, results, testimonials or numbers. Client vs
   portfolio labelling is never blurred. Testimonials stay empty until real.
4. NO AI VIDEO: no paid AI video tools, no video promises, until the owner
   funds it or credits arrive.
5. NO SECRETS in code, logs, commits or chat. .env.local is gitignored.
   Keys are pasted by the owner from the Supabase dashboard only.
6. SMALL FILES: one logic per file, ~50–250 lines, 400 ceiling, named after
   its logic, paired test where behaviour matters. No duplicate tests, no
   trivial tests.
7. TESTS ONCE AT THE END: finish all changes first, then one gate pass
   (typecheck + build + tests) run by the builder agent, with exact counts
   reported. Muse audits diffs, reports and live proofs — Muse does not run
   tests itself.
8. NO SHIP WITHOUT THE OWNER'S WORD: no merge, deploy, publish or production
   write without explicit owner approval for that exact step.
9. PLAIN NAMES in owner-facing updates: features in plain words, never
   run/batch/pack numbering.
10. SHORT SIMPLE UPDATES: one point at a time, plain English, status during
    long work — the owner does not read long reports.
11. DOCS STANDARD: each root file owns one topic and nothing else. When a
    change makes a doc wrong, update that doc in the same change. Never point
    to a deleted file or deleted code, and never repeat another file's
    content — point to it instead.
