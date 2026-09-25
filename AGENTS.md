# ReddyStack agent instructions

Updated: 2026-09-25. This is the only agent instructions file. Other documentation lives in `docs/`; paths are relative to the repo root. This file takes precedence over older docs (`docs/AGENT_SOURCE_RULES.md`, `docs/CODEBASE.md`, `docs/context/*`) where they conflict. Runtime source takes precedence over all docs.

Use short, direct answers by default. Keep technical detail exact. Expand only when asked.

## Authority

The owner (Rahul Reddy Adelli) has granted agents full control of this repository.

- Edit any file without asking first: code, design, content, data, config, docs, and scripts.
- Design changes, including new layouts and moving away from Diego template patterns, are allowed. They must still fit the brand system below and be verified visually.
- Commit, push, and deploy are allowed once the verification steps below pass. State in the handoff what was pushed or deployed.
- Still ask before doing anything that cannot be undone, or anything outside this repo: deleting Git history, rotating or exposing credentials, changing DNS, hosting, Resend, GA4, or Search Console settings, or spending money.
- Never commit secrets. Env files stay out of Git.

## Quality standard

- Work at a senior level across design, frontend, backend, security, accessibility, SEO, performance, and deployment. Apply relevant skills; do not claim expertise or verification without evidence.
- Understand the existing implementation and business goal before changing it. Trace the affected flow end to end.
- Keep implementations simple, avoid unnecessary dependencies, and never ship generic, unfinished, or visually inconsistent work.
- Design as a system: consistent colour, contrast, typography, spacing, hierarchy, and responsive behaviour. Review the whole page, not only the edited component, in both themes and at desktop and mobile sizes.
- Find and fix observable issues before handing back. If the standard cannot be reached with the available tools or information, stop that part and say exactly what is missing.
- Report only what was actually verified. A passing build does not prove visual quality, delivery, rankings, or performance.

## Business context

- ReddyStack: Rahul Reddy Adelli's founder-led, independent digital services business, delivered remotely from Hyderabad, India.
- Priority clients: the US and UK. The site also has market pages for Australia, Canada, UAE, Singapore, and India.
- Primary services: Meta Ads, Google Ads, Ad Creatives, AI UGC-style Videos, Website Development, SEO & Local SEO. Apps, MVPs, chatbots, and automation are secondary.
- Pricing: custom quotes; advertising spend is separate from fees.
- Trust: no testimonials, ratings, or ad-performance claims without evidence and permission. The portfolio shows development work, not campaign results.
- Voice: founder-led, clear scope, practical, credible. Avoid "cheap", "best agency", unproven hype, thin AI SEO pages, and city stuffing.

## Stack and structure

- Next.js 16 App Router (see the Next.js note at the end of this file), React 19, TypeScript, Sass, Bootstrap 5, GSAP. Build uses webpack (`next build --webpack`).
- No database, auth, CMS, or server actions. API routes: `/api/contact` (Resend email) and `/api/visitor-country` (country suggestion).
- Homepage (`src/app/page.tsx`) and market pages (`/us`, `/uk`, `/au`, `/ca`, `/ae`, `/sg`, `/in`) render the custom `src/app/prototype/PrototypeExperience.tsx`, styled by `prototype.module.scss`. `/prototype` is the same experience with noindex metadata.
- Market routes resolve through `src/app/[...path]/page.tsx` → `src/components/country/MarketLandingPage.tsx`. `CountrySuggestion` (in `layout.tsx`) offers the visitor's market page; choices are stored via `src/utils/marketPreference`.
- Other pages (about, service, portfolio, blog, contact, pricing, trust, intent pages) still use Diego template components in `src/components/`. The original template is at `C:\Users\adell\Documents\diego-next-js` for reference.
- Brand (dark mode): charcoal `#302F35`, ivory `#F7F4EB`, violet `#7654E8`, lime `#D2ED7A`; Sora SemiBold headings/wordmark, DM Sans body. Keep the three-colour symbol and the light/dark switch. Shared dark styling: `src/styles/_brand.scss`. `@/assets/*` maps to `public/assets/*`.
- Animations: plain GSAP reveals with matchMedia cleanup and reduced-motion support. Do not reintroduce SplitText without full validation.

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
| Homepage FAQs | `HomeFaqData.ts` |
| Contact categories and budgets | `contactOptions.ts` |
| Privacy, terms, revision policy | `TrustPagesData.ts` |

Sitemap, `robots.txt`, and `llms.txt` are generated from this data. Old URLs redirect in `next.config.js`. Sitemap dates must reflect real edits, not build time.

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

Set `SEO_CHECK_BASE` to check another server. The browser check needs the `agent-browser` CLI (`AGENT_BROWSER_BIN` to override). Contact and browser checks do not send email. Also inspect screenshots of changed pages in both themes at desktop and mobile widths.

## Further reading

Open only when needed:

- `docs/CODEBASE.md`: contact limits, analytics, sales measurement
- `docs/context/SEO_CONTEXT_LITE.md`, `docs/AI_SEO_PLAYBOOK.md`, `docs/SEO_KEYWORDS.md`: SEO work
- `docs/AGENT_SOURCE_RULES.md`: Diego template patterns (reference only; its approval requirements are superseded by the Authority section above)

Keep this file current: when a change makes something here wrong, update this file in the same change.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
