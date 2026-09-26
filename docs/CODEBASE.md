# Reddystack codebase

Updated: 2026-09-26. Runtime source takes precedence over historical planning documents. The root `AGENTS.md` has the rules; this file has detail.

## Business and delivery

Reddystack is Rahul Reddy Adelli's independent digital services business in Hyderabad, serving India and worldwide. The six primary services are Meta Ads, Google Ads, Ad Creatives, AI UGC-Style Videos, Website Development, and SEO & Local SEO. Apps, MVPs, chatbots, and automation are additional services. Quotes define scope and revisions; advertising spend is separate.

The portfolio documents development work, including client projects and internal tools. It is not evidence of advertising results. All six projects are personal or demo work and every card and project page says so. Do not add attributed quotes, ratings, or performance claims without supporting evidence and permission. The About page's numbers describe the studio's structure (4 method stages, 1 stack, 1 lead), not clients or results.

## Runtime architecture

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, shadcn/ui (Radix), Motion, GSAP ScrollTrigger, Lenis; versions are locked in `package-lock.json`. Sass remains only for two CSS modules.
- No database, auth, CMS, server actions, checkout, or durable lead store.
- `src/app/layout.tsx` loads fonts, `src/styles/globals.css`, Organization/WebSite schema, analytics and the country suggestion.
- `src/app/(site)/layout.tsx` wraps every page in `SiteChrome`: skip link, scroll progress, cursor (fine pointers), `RevealObserver`, header, `<main id="main">`, footer, all inside `SmoothScroll` (the only Lenis instance, driving GSAP's ticker; disabled for touch and reduced motion).
- `src/app/template.tsx` animates client-side navigations with Motion. The first render is not hidden.
- Route files own metadata, content lookup and page schema. Views in `src/components/views` own presentation; shared blocks live in `src/components/blocks`.
- The homepage (`src/components/home-v3/HomeV3.tsx`) is a server component. Interactivity lives in client islands: `HomeScenes` (pointer and scroll scenes, renders nothing), `DiagnosticTabs`, `Clocks`.
- Styles: Tailwind utilities and tokens in `globals.css` (`@theme`), plus `home-v3.module.scss` and `illustrations.module.scss` inside `@layer components`, so utilities always win. The site is dark-only.
- Motion safety: global reduced-motion CSS; `RevealObserver` only hides reveal content after hydration, pauses SMIL for reduced motion and pauses off-screen decoration (`svg` and `[data-anim]` without `data-onscreen`).

## Content ownership

| Content | File |
| --- | --- |
| Identity, contacts, metadata builders, structured data | `src/data/siteConfig.ts` |
| Nine service details, six primary services and service FAQs | `src/data/ServiceDetailData.ts` |
| Homepage FAQs and FAQ schema input | `src/data/HomeFaqData.ts` |
| Eight historical articles | `src/data/BlogPostsData.ts` |
| 57 guides, six topic hubs, founder profile | `src/data/seo-pages.json`, `SeoPagesData.ts` |
| 14 intent landing pages | `src/data/IntentLandingPagesData.ts` |
| Six development projects | `src/data/PortfolioProjectsData.ts` |
| Privacy, terms, revision policy | `src/data/TrustPagesData.ts` |

## Routes

The sitemap has 118 canonical public URLs: 111 content URLs (ten core/trust pages, nine service details, 14 intent pages, six projects, eight historical articles, 57 guides, six hubs and a founder profile) plus seven market pages.

- All pages live in the `src/app/(site)` route group; the group name is not part of the URL.
- Core: `/`, `/about`, `/service`, `/portfolio`, `/blog`, `/contact`, `/pricing`, `/privacy-policy`, `/terms`, `/revision-policy`.
- Markets: `/us`, `/uk`, `/au`, `/ca`, `/ae`, `/sg`, `/in` are explicit static routes rendering `MarketLandingPage`.
- Details: `/service/[slug]`, `/portfolio/[slug]`, `/about/rahul-reddy-adelli`.
- Articles/hubs: `/blog/[slug]`; guides: `/blog/[slug]/[article]`.
- `/blog?q=...` performs server-side search over old articles and new guides; `/blog?category=` filters articles. Results are noindex and retain the archive canonical.
- Intent pages render `ServiceDetailView` through `buildIntentServiceDetail`, illustrated by their parent service.
- `next.config.js` handles old URLs. `/social-media-marketing` redirects to `/service`. Unknown paths render `src/app/not-found.tsx`.
- `/robots.txt`, `/sitemap.xml`, `/llms.txt` derive from shared site/content data.

## Homepage and visual system

The homepage sections are: hero (pointer-driven 3D stack, signal flow, clocks), marquee, diagnostic tabs, market focus (market pages only), capability stack with sticky highlighting, process wave, selected work, engagements, founder, FAQ and CTA band. Content comes from `homeContent.ts`, `HomeFaqData.ts` and `FeaturedPortfolioProjects.ts`.

Design tokens (see `globals.css`): ink `#141318`, graphite `#1c1b21`, raised `#25242b`, charcoal `#302f35`, ivory `#f7f4eb`, muted `#a8a5b3`, faint `#8f8c99`, violet `#7654e8`, violet-soft `#9c82f2`, lime `#d2ed7a`, coral `#ff765e`. Sora SemiBold headings/wordmark, DM Sans body, JetBrains Mono labels. Keep the original three-colour symbol (`BrandSymbol`).

Every service has an animated SVG illustration (`ServiceIllustrations.tsx`); the web, creative and automation drawings are shared with the homepage. On phones and touch screens the homepage hero plays its entrance and then holds still, to keep the main thread free.

`assets/brand/` contains editable/source brand exports, not runtime page assets. Runtime symbols, images and sharing cards live under `public/assets/img`. The current default sharing card is `reddystack-share-v4.png`. Portfolio JPEGs were re-encoded in place (same size, format and URL) in September 2026.

## Contact and analytics

`src/components/contact/ContactForm.tsx` (react-hook-form + yup, shadcn fields) validates required fields and POSTs JSON to `/api/contact`. The Node.js handler validates again, escapes HTML and sends via Resend. Budgets are offered in USD, GBP and INR (`contactOptions.ts`); the currency defaults to the visitor's saved market, and the API accepts exactly the listed values.

- Required settings: `RESEND_API_KEY`; optional `CONTACT_TO_EMAIL`, `RESEND_FROM_EMAIL`. Never commit credentials.
- Maximums: name 100, email 254, company 200, message 4000 characters; up to nine services; actual request body 24 KiB. Budget/services must match known choices.
- Same-origin browser requests, JSON content type and an empty honeypot are enforced.
- Application throttling: three validated send attempts per client per ten minutes, and twenty per instance. Only Vercel's overwritten client-IP header is trusted; other hosts share the conservative client bucket. IP keys are hashed and expired entries removed.
- These limits are per process and reset on cold starts. They are not a distributed quota; configure a shared edge limiter if traffic scales or abuse spans instances.
- Errors log an event, request ID and failure category without email addresses, message text, API keys or raw provider messages. The response includes the request ID for investigation.
- Failed sends retain form values and expose a direct email fallback. No enquiry is persisted in a database or browser storage. Resend acceptance is not proof of final mailbox delivery; monitor provider delivery events.
- Google Analytics uses `NEXT_PUBLIC_GA_MEASUREMENT_ID` or the existing default ID. It tracks page views and contact actions. Production delivery/analytics must be checked separately from local rendering.
- Service and intent-page quote links pass an editable service choice and a source pathname to `/contact`; query variants retain the `/contact` canonical. External URLs and query strings are excluded from source attribution.
- Accepted enquiries include a shared request ID in the response and email. `contact_form_submit` carries `lead_id`, `source_page`, service and budget, without the name, email or message. This means provider acceptance, not a qualified lead, delivered email or sale. Contact-link clicks are weaker intent signals.

### Sales measurement

- In the Reddystack GA4 property, mark `contact_form_submit` as a key event and register `source_page` and `selected_services` as event-scoped custom dimensions. Do not register the unique `lead_id` as a high-cardinality reporting dimension.
- Keep a private lead sheet outside this public repository with columns: enquiry reference, date, service, source page, qualified, quote amount/currency, status (new/quoted/won/lost), won revenue/currency. Update it from real enquiries and outcomes; do not label clicks or accepted forms as revenue.
- Review Google organic impressions/clicks in Search Console separately from GA4 organic sessions and enquiries. Compare landing pages by qualified leads and won revenue, not impressions alone.
- Before relying on production delivery, confirm `CONTACT_TO_EMAIL` is `thereddystack@gmail.com` (or absent, using the site default), keep `RESEND_FROM_EMAIL` on a verified sending domain, and inspect Resend delivery events. Local tests do not prove mailbox delivery.
- Hosting changes on 2026-09-14: apex `reddystack.com` now uses a 308 redirect to `www.reddystack.com`; `CONTACT_TO_EMAIL` was corrected from `hello@reddystack.com` to `thereddystack@gmail.com` for all environments. The sender remains `Reddystack <hello@reddystack.com>`. Environment changes require a new deployment.

## Verification

From the repository root:

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

Use `SEO_CHECK_BASE` for another server. The browser check requires an installed `agent-browser` CLI (override its executable with `AGENT_BROWSER_BIN`). Contact tests replace the email provider; browser tests intercept submission, so neither sends an enquiry. Browser checks cover no-JS content, button contrast, keyboard tabs, FAQ, repeated navigation, mobile menu and overflow, contact validation and failure recovery, service preselection, currency budgets, analytics without PII and reduced motion. Inspect screenshots at 1440px and 390px, with motion on and off, as well.

Do not claim deployment, delivery, rankings, accessibility compliance or performance scores from a build alone. Follow the root `AGENTS.md` for edit and push authorization.
