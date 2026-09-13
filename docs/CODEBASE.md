# Reddystack codebase

Updated: 2026-09-14. Runtime source takes precedence over historical planning documents.

## Business and delivery

Reddystack is Rahul Reddy Adelli's independent digital services business in Hyderabad, serving India and worldwide. The six primary services are Meta Ads, Google Ads, Ad Creatives, AI UGC-Style Videos, Website Development, and SEO & Local SEO. Apps, MVPs, chatbots, and automation are additional services. Quotes define scope and revisions; advertising spend is separate.

The portfolio documents development work, including client projects and internal tools. It is not evidence of advertising results. The former testimonial carousel now explains delivery commitments; do not restore attributed quotes, ratings, or performance claims without supporting evidence and permission. Homepage/about counters use actual portfolio and service counts.

## Runtime architecture

- Next.js App Router, React 19, TypeScript, Sass, Bootstrap, GSAP, Lottie; versions are locked in `package-lock.json`.
- No database, auth, CMS, server actions, checkout, or durable lead store.
- `src/app/layout.tsx` loads fonts, shared styles, Organization/WebSite schema, analytics, theme and video providers.
- Route files own metadata, content lookup and page schema. Feature components own presentation.
- `src/layouts/Wrapper.tsx` initializes Bootstrap and route animations, manages scroll reset, toasts and the skip link. A GSAP matchMedia context cleans route-created animations and respects reduced motion. Button listeners and Matter observers/runners have explicit disposal.
- `src/hooks/UseThemeCheck.ts` manages dark/light preferences. Prototype preferences are separate.
- Keep Diego structure/classes and the approved palette; read `AGENT_SOURCE_RULES.md` before UI work.

## Content ownership

| Content | File |
| --- | --- |
| Identity, contacts, metadata builders, structured data | `src/data/siteConfig.ts` |
| Nine service details, six primary services and service FAQs | `src/data/ServiceDetailData.ts` |
| Homepage FAQs and FAQ schema input | `src/data/HomeFaqData.ts` |
| Eight historical articles | `src/data/BlogPostsData.ts` |
| 57 guides, six topic hubs, founder profile | `src/data/seo-pages.json`, `SeoPagesData.ts` |
| 13 intent landing pages | `src/data/IntentLandingPagesData.ts` |
| Six development projects | `src/data/PortfolioProjectsData.ts` |
| Privacy, terms, revision policy | `src/data/TrustPagesData.ts` |

## Routes

The sitemap has 110 canonical public URLs: ten core/trust pages, nine service details, 13 intent pages, six projects, eight historical articles, 57 guides, six hubs, and a founder profile.

- Core: `/`, `/about`, `/service`, `/portfolio`, `/blog`, `/contact`, `/pricing`, `/privacy-policy`, `/terms`, `/revision-policy`.
- Details: `/service/[slug]`, `/portfolio/[slug]`.
- Articles/hubs: `/blog/[slug]`; new guides: `/blog/[slug]/[article]`.
- `/blog?q=...` performs server-side search over old articles and new guides; results are noindex and retain the archive canonical.
- `/[...path]` resolves remaining data-defined pages, currently `/about/rahul-reddy-adelli`; unknown paths call `notFound()`.
- Intent pages use the existing service-detail components through `buildIntentServiceDetail`.
- `next.config.js` handles old URLs. `/social-media-marketing` redirects to `/service`.
- `/prototype` reuses the homepage with shared styling, noindex metadata, and no sitemap entry. It is a public route, not access-controlled.
- `/robots.txt`, `/sitemap.xml`, `/llms.txt` derive from shared site/content data.

## Homepage and visual system

`src/app/page.tsx` renders `src/components/homes/home/index.tsx` inside Wrapper. The sections are hero, delivery strip, services, marquee, founder/about, selected development work, delivery expectations, pricing/blog tabs, FAQs and footer.

The featured project component retains its historical name `home-2/TestimonialAreaHomeTwo.tsx`. `TestimonialAreaHomeOne.tsx` now shows the delivery process using the existing carousel layout, with previous/next buttons. Pricing tabs are React-controlled with Tab, arrow, Home and End keyboard support.

Shared approved dark styling lives in `src/styles/_brand.scss`: charcoal #302F35, ivory #F7F4EB, violet #7654E8, lime #D2ED7A. Sora headings/wordmark and DM Sans body; keep the original three-colour symbol. Light mode retains the source design. Styles are loaded through `src/styles/index.scss`; `@/assets/*` resolves to `public/assets/*`.

`assets/brand/` contains editable/source brand exports and earlier concepts, not runtime page assets. Runtime symbols, images and sharing cards live under `public/assets/img`. The current default sharing card is `reddystack-share-v4.png`.

## Contact and analytics

`ContactArea` supplies selected services to `ContactForm`, which validates required fields and POSTs JSON to `/api/contact`. The Node.js handler validates again, escapes HTML and sends via Resend.

- Required settings: `RESEND_API_KEY`; optional `CONTACT_TO_EMAIL`, `RESEND_FROM_EMAIL`. Never commit credentials.
- Maximums: name 100, email 254, company 200, message 4000 characters; eight services; actual request body 24 KiB. Budget/services must match known choices.
- Same-origin browser requests, JSON content type and an empty honeypot are enforced.
- Application throttling: three validated send attempts per client per ten minutes, and twenty per instance. Only Vercel's overwritten client-IP header is trusted; other hosts share the conservative client bucket. IP keys are hashed and expired entries removed.
- These limits are per process and reset on cold starts. They are not a distributed quota; configure a shared edge limiter if traffic scales or abuse spans instances.
- Errors log an event, request ID and failure category without email addresses, message text, API keys or raw provider messages. The response includes the request ID for investigation.
- Failed sends retain form values and expose a direct email fallback. No enquiry is persisted in a database or browser storage. Resend acceptance is not proof of final mailbox delivery; monitor provider delivery events.
- Google Analytics uses `NEXT_PUBLIC_GA_MEASUREMENT_ID` or the existing default ID. It tracks page views and contact actions. Production delivery/analytics must be checked separately from local rendering.

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

Use `SEO_CHECK_BASE` for another server. The browser check requires an installed `agent-browser` CLI (override its executable with `AGENT_BROWSER_BIN`). Contact tests replace the email provider; browser tests intercept submission, so neither sends an enquiry. Browser checks cover hover contrast/errors, keyboard tabs, repeated navigation, mobile menus/overflow and failure recovery. Inspect screenshots in both themes and desktop/mobile sizes as well.

Do not claim deployment, delivery, rankings, accessibility compliance or performance scores from a build alone. Follow `docs/AGENTS.md` for edit and push authorization.
