# Project Context Lite

## Snapshot
- project: `Reddystack`
- type: marketing/portfolio site
- stack: Next.js App Router, React 19, TypeScript, Sass, Bootstrap 5, GSAP
- backend: only `/api/contact`
- no DB, auth, CMS, server actions

## Core Rules
- primary offering: Meta Ads, Google Ads, Ad Creatives, AI UGC-Style Videos, Website Development, SEO & Local SEO
- audience: local service businesses and growing brands; founder-led by Rahul Reddy
- pricing: custom quotes; advertising spend separate from management fees
- apps, MVPs, chatbots, and automation remain secondary services
- local review first; do not push until the user explicitly approves the final version
- approved dark-mode brand palette: charcoal `#302F35`, ivory `#F7F4EB`, violet `#7654E8`, lime `#D2ED7A`; Sora SemiBold headings/wordmark and DM Sans body. Keep the original three-colour symbol; coral stays in the symbol. Retain the light/dark switch and page layouts.
- shared approved dark styling lives in `src/styles/_brand.scss`; template base/light tokens remain in `public/assets/scss/utils/_colors.scss`. The `/prototype` route uses the same shared styles, with noindex metadata.
- frontend must follow `docs/AGENT_SOURCE_RULES.md`
- source template: `C:\Users\adell\Documents\diego-next-js`
- no custom redesign unless user approves
- prefer source structure, classes, spacing, and SCSS

## Source Of Truth
- site config / schema / metadata: `src/data/siteConfig.ts`
- homepage FAQ: `src/data/HomeFaqData.ts`
- service details + service FAQ: `src/data/ServiceDetailData.ts`
- blog content: `src/data/BlogPostsData.ts`
- service-topic hubs, new guides and founder profile: `src/data/seo-pages.json`, routed through `SeoPagesData.ts`
- portfolio content: `src/data/PortfolioProjectsData.ts`

## Active Routes
- `/`
- `/about`
- `/service`
- `/service/[slug]`
- `/portfolio`
- `/portfolio/[slug]`
- `/blog`
- `/blog/[slug]`
- `/contact`

## Extra SEO Routes
- `/website-development-services`
- `/affordable-website-development`
- `/website-development-under-10000`
- `/mobile-app-development-services`
- `/custom-web-application-development-services`
- `/how-much-does-a-website-cost-in-india`
- `/website-redesign-services`
- `/website-maintenance-services`
- `/landing-page-development-for-lead-generation`
- `/affordable-website-development-for-startups`
- `/seo-website-development-for-small-businesses`
- `/mvp-development-for-startup-founders`
- `/ai-automation-services-for-small-teams`

## Homepage
- entry: `src/app/page.tsx`
- shell: `src/components/homes/home/index.tsx`
- featured projects: `src/components/homes/home-2/TestimonialAreaHomeTwo.tsx`
- project data: `src/data/PortfolioProjectsData.ts`

## Service Detail
- entry: `src/app/service/[slug]/page.tsx`
- shell: `src/components/service-details/index.tsx`
- sections: `ServiceDetailsArea`, `ServiceFaqArea`, `NavigationArea`

## Blog
- archive uses sidebar flow, not alternate tabbed archive
- real detail route is `/blog/[slug]`
- new guide route is `/blog/[slug]/[article]`; six `/blog/{topic}` hubs link all new guides
- preserve the eight historical article URLs; do not create flat aliases for new nested guides
- run `node scripts/check-seo-routes.mjs` against a production build on port 3187 (or set `SEO_CHECK_BASE`)

## Portfolio
- real detail route is `/portfolio/[slug]`
- preserve Diego middle image pattern on detail pages unless user asks otherwise

## Animation Note
- local text animation helpers use plain GSAP reveals
- avoid reintroducing SplitText unless fully validated

## User Sensitivity
- user dislikes blind design changes
- user expects PM-style judgment, not just implementation
- verify alignment before changing UI
