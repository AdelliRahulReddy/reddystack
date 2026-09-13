# SEO Context Lite

## Positioning
Reddystack is Rahul Reddy Adelli's independent digital service business in Hyderabad, serving India and worldwide. Primary services: Meta Ads, Google Ads, Ad Creatives, AI UGC-Style Videos, Website Development, SEO & Local SEO. Apps, MVPs, chatbots, and automation are secondary.

## Entity Model
- sitewide: `Organization`
- sitewide: `WebSite`
- service pages: `Service`
- blog posts: `BlogPosting`
- portfolio pages: `CreativeWork`
- do not make site primarily `LocalBusiness`

## Messaging Priorities
- founder-led
- affordable but credible
- Hyderabad-based
- India and worldwide
- six core services above; custom quotes with advertising spend separate
- clear scope
- premium execution

## Prefer Words
- affordable
- founder-led
- premium execution
- clear scope
- SEO-ready
- practical delivery

## Avoid
- cheap
- best agency
- hype without proof
- thin AI SEO pages
- unnatural city stuffing

## Implemented
- global metadata + schema
- robots + sitemap
- homepage FAQ schema from visible FAQ data
- service FAQ schema from visible service data
- blog/service/portfolio detail metadata and page schema
- 110 canonical public URLs across core pages, services, intent pages, portfolio, articles, topic hubs, and the founder profile; no current location pages
- six `/blog/{topic}` hubs with nested guides from `seo-pages.json`
- founder profile at `/about/rahul-reddy-adelli`
- separate founder and business profiles in Organization schema
- branded Next.js file-based icons, the approved three-piece SVG symbol, and `reddystack-share-v4.png` for default/service social previews; regenerate derived assets with `node scripts/build-brand-assets.mjs`

## Current Intent Pages
- website development services
- affordable website development
- website development under Rs. 10,000
- mobile app development services
- custom web application development services
- how much does a website cost in India
- website redesign services
- landing page development for lead generation
- affordable website development for startups
- SEO website development for small businesses
- MVP development for startup founders
- AI automation services for small teams
- AI chatbot development

## Verification
- Check current routes in `sitemap.ts`, `SeoPagesData.ts`, and `IntentLandingPagesData.ts`; historical aliases above may redirect.
- Build, then run `scripts/check-seo-routes.mjs` and `scripts/check-ui-contracts.mjs` against the production server.
- Set `SEO_CHECK_BASE` for live verification after deployment.
- Sitemap modification dates must reflect actual edits, not build time.
- Google chooses sitelinks and snippets; schema and submission cannot guarantee them.
- Update Search Console only under the account/property that owns Reddystack.

## Internal Linking Expectations
- homepage -> services, portfolio, blog, contact
- service pages -> related blog, case study, contact CTA
- blog posts -> matching service + project/contact

## Trust Gaps
- only publish testimonials and ad-campaign results with evidence and permission; the site currently shows delivery commitments instead
- clearer outcomes
- stronger case-study proof
- aligned external profiles

## Full Originals
- `docs/AI_SEO_PLAYBOOK.md`
