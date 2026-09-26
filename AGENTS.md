# ReddyStack agent instructions

Updated: 2026-09-26. This is the only agent instructions file. Other documentation lives in `docs/`; paths are relative to the repo root. This file takes precedence over older docs where they conflict. Runtime source takes precedence over all docs.

Use short, direct answers by default. Keep technical detail exact. Expand only when asked.

## Authority

The owner (Rahul Reddy Adelli) has granted agents full control of this repository.

- Edit any file without asking first: code, design, content, data, config, docs, and scripts.
- Design changes are allowed. They must fit the design system below and be verified visually.
- Commit, push, and deploy are allowed once the verification steps below pass. State in the handoff what was pushed or deployed.
- Still ask before doing anything that cannot be undone, or anything outside this repo: deleting Git history, rotating or exposing credentials, changing DNS, hosting, Resend, GA4, or Search Console settings, or spending money.
- Never commit secrets. Env files stay out of Git.

## Quality standard

- Work at a senior level across design, frontend, backend, security, accessibility, SEO, performance, and deployment. Do not claim expertise or verification without evidence.
- Understand the existing implementation and business goal before changing it. Trace the affected flow end to end.
- Keep implementations simple, avoid unnecessary dependencies, and never ship generic, unfinished, or visually inconsistent work.
- Design as a system: consistent colour, contrast, typography, spacing, hierarchy, motion and responsive behaviour. Review the whole page, not only the edited component, at desktop (1440px) and mobile (390px) widths, with motion on and with reduced motion.
- Find and fix observable issues before handing back. If the standard cannot be reached with the available tools or information, stop that part and say exactly what is missing.
- Report only what was actually verified. A passing build does not prove visual quality, delivery, rankings, or performance.

## Business context

- ReddyStack: Rahul Reddy Adelli's founder-led growth studio, delivered remotely from Hyderabad, India. It connects websites, SEO and local search, Meta and Google Ads, ad creative and AI UGC-style video, tracking and AI automation around one growth problem.
- Priority clients: the US and UK. Market pages also exist for Australia, Canada, UAE, Singapore and India.
- Offers: Proof Sprint → Stack Build → Operate & Improve. Custom quotes; advertising spend and third-party costs are separate.
- Honesty rules (non-negotiable): the six portfolio projects are personal or demo work and must stay labelled that way. No invented testimonials, ratings, client results, stats, availability claims or prices. Budget brackets on the contact form describe the enquirer's budget, not ReddyStack prices.
- Voice: founder-led, clear scope, practical, credible. Avoid "cheap", "best agency", unproven hype, thin AI SEO pages and city stuffing.

## Stack

- Next.js 16 App Router (see the Next.js note at the end), React 19, TypeScript. Build uses webpack (`next build --webpack`).
- Tailwind CSS v4 (`@tailwindcss/postcss`) with theme tokens in `src/styles/globals.css`; shadcn/ui primitives in `src/components/ui` (`components.json`); lucide-react icons.
- Motion (`motion/react`, loaded through `LazyMotion` + `domAnimation`) for page transitions and small UI transitions. GSAP ScrollTrigger + Lenis for scroll scenes.
- Sass is still used by two CSS modules: `home-v3.module.scss` (homepage) and `illustrations.module.scss`. Both sit in `@layer components` so Tailwind utilities win.
- No database, auth, CMS or server actions. API routes: `/api/contact` (Resend email) and `/api/visitor-country` (country suggestion).
- The site is dark-only. There is no theme toggle, Bootstrap, jQuery, Font Awesome or template CSS; do not reintroduce them.

## Structure

- `src/app/layout.tsx`: fonts (Sora local, DM Sans, JetBrains Mono), `globals.css`, site JSON-LD, analytics, `CountrySuggestion`.
- `src/app/(site)/layout.tsx`: every page renders inside `SiteChrome` (header, footer, the single Lenis instance, cursor, scroll progress, reveal observer). The route group does not change URLs.
- `src/app/template.tsx`: Motion page transition. Only client-side navigations animate; the first server render is never hidden.
- `src/app/not-found.tsx`: 404, rendered with `SiteChrome`.
- Route files own metadata, canonical, hreflang and JSON-LD; `src/components/views/*` own presentation. Keep those responsibilities separate.

| Area | Files |
| --- | --- |
| Site frame | `src/components/site/` (SiteChrome, SiteHeader, SiteFooter, SmoothScroll, RevealObserver, Cursor, ScrollProgress, BrandSymbol, navigation) |
| Shared blocks | `src/components/blocks/` (PageHero, SectionHead, SplitText, Eyebrow, CtaBand, Faq, ProjectCard, ServiceCard, EngagementCards, ProcessTimeline, TableOfContents, ParallaxImage, ScrubText, MagneticButton) |
| Page views | `src/components/views/` (services index/detail, about, founder, portfolio index/detail, pricing, blog index, hub, article, blog post, trust, contact) |
| Homepage | `src/components/home-v3/` (server `HomeV3` with client islands `HomeScenes`, `DiagnosticTabs`, `Clocks`) |
| Illustrations | `src/components/illustrations/ServiceIllustrations.tsx` (one per service slug; reuses the homepage drawings) |
| SEO content pages | `src/components/seo/` (`seoContent.ts` builds metadata, breadcrumbs and JSON-LD; `SeoContentPage` picks the view by kind) |

- Homepage `/` and market pages `/us` `/uk` `/au` `/ca` `/ae` `/sg` `/in` render `HomeV3` (markets through `MarketLandingPage`).
- Service and intent pages can set `heading` (a descriptive H1; intent pages use `headline`). Titles, descriptions and H1s follow `docs/SEO_KEYWORD_MAP.md`.
- `ServiceDetailView` serves the 9 `/service/[slug]` pages and the 14 intent pages (including `/ppc-audit`) (via `buildIntentServiceDetail`).
- `ArticleView` serves the 57 guides (`/blog/[slug]/[article]`), the 8 historical articles (`/blog/[slug]`) and the three policies.
- `/blog?q=` and `/blog?category=` are server-side search and filter results (noindex, `/blog` canonical).

## Design system

- Colours (Tailwind tokens): ink `#141318` (page), graphite `#1c1b21`, raised `#25242b`, charcoal `#302f35`, ivory `#f7f4eb`, muted text `#a8a5b3`, faint text `#8f8c99` (lowest contrast allowed: 4.5:1 on ink, graphite and raised), violet `#7654e8`, violet-soft `#9c82f2`, lime `#d2ed7a` (primary), coral `#ff765e`. shadcn semantic tokens map onto these.
- Type: Sora SemiBold (`font-display`) for headings and the wordmark, DM Sans (`font-sans`) for body, JetBrains Mono (`font-mono`, the `.eyebrow` style) for labels.
- Keep the three-piece symbol (`BrandSymbol`). Radii: cards 24–32px, panels 40px, pills full. Easing: `ease-studio`, `ease-expo`.
- Buttons: shadcn `Button` with brand variants (`default` lime, `ghost` outline, `dark`), plus `ButtonArrow`.

## Motion rules

- Respect `prefers-reduced-motion` everywhere: global CSS disables animation, `RevealObserver` pauses SMIL, and GSAP scenes return early.
- Content must be visible without JavaScript. Reveals (`data-reveal`, `data-split`, `data-scramble`) only hide content after `RevealObserver` has hydrated and marked what is already on screen.
- Protect LCP: no full-screen loaders, never fade hero text from opacity 0, and keep hero headings server-rendered.
- Decorative animation pauses off screen: any `svg` or `[data-anim]` element runs only while it has `data-onscreen`. Tag new animated HTML blocks with `data-anim`.
- One Lenis instance (`SmoothScroll`), only for fine pointers without reduced motion. Subscribe with `useSmoothScroll().subscribe`; never create another Lenis.
- GSAP scroll tweens on elements that also have a CSS entrance must use `fromTo`, so they never capture the entrance's first frame.

## Content sources (`src/data/`)

| Content | File |
| --- | --- |
| Identity, contacts, metadata builders, schema | `siteConfig.ts` |
| Markets and market SEO / page copy | `MarketConfig.ts`, `MarketSeo.ts`, `MarketPageData.ts` |
| Service details and service FAQs | `ServiceDetailData.ts` |
| Intent landing pages | `IntentLandingPagesData.ts` |
| Guides, topic hubs, founder profile | `seo-pages.json` via `SeoPagesData.ts` |
| Historical blog articles | `BlogPostsData.ts` |
| Portfolio projects / homepage featured projects | `PortfolioProjectsData.ts`, `FeaturedPortfolioProjects.ts` |
| Homepage FAQs, homepage copy | `HomeFaqData.ts`, `src/components/home-v3/homeContent.ts` |
| Pricing FAQs | `PricingData.ts` (the pricing route's FAQ schema lists the first four) |
| Contact categories and budgets (USD, GBP, INR) | `contactOptions.ts` (the API accepts exactly these values) |
| Privacy, terms, revision policy | `TrustPagesData.ts` |

Sitemap, `robots.txt` and `llms.txt` are generated from this data. Old URLs redirect in `next.config.js`. Sitemap dates must reflect real edits, not build time.

## Verification

From the repo root, before any push or deploy:

```sh
npm run lint
node scripts/check-contact.mjs
npm run build
npm run start -- --port 3187
node scripts/check-seo-routes.mjs
node scripts/check-ui-contracts.mjs
node scripts/check-browser.mjs
npm audit
```

Set `SEO_CHECK_BASE` to check another server. The browser check needs the `agent-browser` CLI (`AGENT_BROWSER_BIN` to override). Contact and browser checks do not send email. Also inspect screenshots of changed pages at 1440px and 390px, with motion on and with reduced motion.

## Further reading

Open only when needed:

- `docs/CODEBASE.md`: architecture detail, contact limits, analytics, sales measurement
- `docs/SEO_KEYWORD_MAP.md`: which page targets which query (Semrush data); check it before changing titles or adding pages
- `docs/context/SEO_CONTEXT_LITE.md`, `docs/AI_SEO_PLAYBOOK.md`, `docs/SEO_KEYWORDS.md`: SEO work

Keep this file current: when a change makes something here wrong, update this file in the same change.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
