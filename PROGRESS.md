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
- 2026-10-25: design-review fixes on branch dev (not committed, not deployed): contact page India-first (INR budgets only, service chips read from bundles + services, phone required, email optional; API + scripts/check-contact.mjs in sync); About page India-first story (employer history unchanged); FAQ honest empty state + no empty FAQPage schema; Enquiry Sprint selectable in the calculator (?pick=<slug> pre-selects; quote_items stores the Sprint line price-only, no bundle column yet); homepage form phone-first; hero shows the Sprint price; header button on phones; phone bottom bar (WhatsApp / Call / Get quote) replaces the floating button below 961px; calculator phone total bar; enquiry close on services/works/process/faq/pricing; works cards show image_url when set; admin lead-offer editor (bundles). Gates: typecheck clean, lint 0/0 (.agents/** now ignored), tests 13/13 (10 existing + 3 new), check-contact pass, build success (134 routes), check-seo-routes 118 pages pass. check-ui-contracts and check-browser fail on old-homepage ids (hv3-*), stale since the homepage rewrite.

- 2026-10-25: full public-site redesign on branch dev (not committed, not deployed). One system for every public page: dark charcoal ground, warm ink, one marigold action colour (scoped to the public site via `.site-theme`; /admin unchanged), Sora + DM Sans only, one type scale, one button, one card, one section rhythm. Plain-words homepage (offer headline, price, promise and one action on the first phone screen), animated "ad → message → enquiry" explainer (CSS only, reduced-motion safe), labelled examples (enquiry page, message, weekly report), work showcase with clean picture slots, one menu (Home, Services, Pricing, Works, Process, FAQ, Contact + Enquire), one footer with country links, breadcrumbs on inner pages, every page ends with an enquiry step. Country pages keep their routes and market copy on the shared template. Removed: smooth scroll, GSAP scenes, custom cursor, scramble/split text, glow and grid backgrounds, page transitions, old homepage template and illustrations (gsap, lenis, motion, sass now unused but still installed). Homepage JS ~1,039 KB → ~822 KB unpacked; fonts 4 → 3. Gates: typecheck clean, lint 0/0, tests 13/13, check-contact pass, build 134/134, check-seo-routes 118 pages pass. Report: docs/redesign-2026-10-25.md.
- 2026-10-25: public site converted to LIGHT on branch dev (owner decision; not committed, not deployed). Tokens only, same layout, words, explainer, examples, menu, footer, country pages and phone bar: bone background #f6f4ef, ink #1c1915 (16:1), muted #5c564c (6.7:1), white cards with a visible edge + soft shadow (`shadow-card`), marigold #f2b13a fill with dark ink on buttons (9.6:1), darker amber #8a5a00 for accent text and links (5.5:1), input borders #8f8677 (3.3:1). /admin keeps its dark look (public tokens scoped by `.site-theme`). AGENTS.md dark-only line and DESIGN.md direction updated; TASKS.md design-direction item ticked. Gates: typecheck clean, lint 0/0, tests 13/13, check-contact pass, build 134/134. Measured contrast on 14 pages (1,600+ text elements): lowest 4.94:1, no real failures.
