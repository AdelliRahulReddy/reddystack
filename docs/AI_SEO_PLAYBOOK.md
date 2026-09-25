# Reddystack SEO and AI discoverability

Updated: 2026-09-14. This supersedes the older development-first positioning.

## Positioning

Reddystack is Rahul Reddy Adelli's independent digital services business in Hyderabad, serving India and worldwide. Lead with Meta Ads, Google Ads, Ad Creatives, AI UGC-Style Videos, Website Development, and SEO & Local SEO. Apps, MVPs, chatbots, and automation remain secondary.

Use clear scope, founder-led communication and custom quotes. Advertising spend is separate from management fees. Avoid claims of guaranteed rankings, sales, lead volumes, or AI recommendations.

## Entity and content rules

- Sitewide identity: Organization and WebSite. Founder: Person, with a profile at `/about/rahul-reddy-adelli`.
- Service pages: Service; articles: BlogPosting; topic hubs: CollectionPage; projects: CreativeWork.
- Do not add LocalBusiness or ProfessionalService solely to imply a registered agency or physical customer-facing office.
- Keep visible FAQ answers and FAQ schema driven by the same data.
- Preserve eight historical article URLs; publish new guides under `/blog/{topic}/{article}` with a relevant topic hub.
- Each page needs distinct useful content, one primary search intent, a clear title/description, one H1 and a canonical URL.
- Internal search results are noindex. The former `/prototype` route was removed in September 2026.
- Use actual edit dates, not build timestamps, in sitemap entries.
- Default social previews use `reddystack-share-v4.png`; use approved brand icons.

## Proof and conversion

Published development projects demonstrate development work. Do not present them as ad-campaign case studies. Add campaign results or testimonials only when their evidence, attribution and publication permission are available. The delivery carousel describes our process rather than unverified client endorsements. AI-presenter videos must not be presented as genuine customer testimonials.

Link articles to the matching service and useful next step. Service pages should explain deliverables, boundaries and how to enquire. Avoid thin location pages and repeated keyword variants created only to increase URL count.

## Technical verification

The current content sources produce 110 sitemap URLs. See `CODEBASE.md` and `context/SEO_CONTEXT_LITE.md` for route ownership.

Build and run `scripts/check-seo-routes.mjs` plus `scripts/check-ui-contracts.mjs` against the fresh production server. Check redirects for intent alignment and unknown routes for real 404s. Verify the public deployment separately after release; check indexing only in the Search Console property owned by Reddystack.

Robots permissions, structured data and `llms.txt` help describe the website. They do not guarantee crawling, rich results, sitelinks, rankings or inclusion in AI answers. Historical research in `SEO_KEYWORDS.md` and `SEO_FIX_PLAN_Reddystack.md` is reference material, not a current list of required pages.
