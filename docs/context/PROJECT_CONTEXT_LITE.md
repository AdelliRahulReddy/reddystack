# Project Context Lite

## Snapshot
- project: `Reddystack`
- type: marketing/portfolio site
- stack: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Motion, GSAP ScrollTrigger, Lenis
- backend: only `/api/contact`
- no DB, auth, CMS, server actions

## Core Rules
- primary offering: Meta Ads, Google Ads, Ad Creatives, AI UGC-Style Videos, Website Development, SEO & Local SEO
- audience: local service businesses and growing brands; founder-led by Rahul Reddy
- pricing: custom quotes; advertising spend separate from management fees
- apps, MVPs, chatbots, and automation remain secondary services
- redesign work happens on a branch and is reviewed by Rahul before merging to main or deploying
- dark-only brand system: ink `#141318`, charcoal `#302F35`, ivory `#F7F4EB`, violet `#7654E8`, lime `#D2ED7A`, coral `#FF765E`; Sora SemiBold headings/wordmark, DM Sans body, JetBrains Mono labels. Keep the three-colour symbol.
- tokens live in `src/styles/globals.css`; shared blocks in `src/components/blocks`; page views in `src/components/views`
- the six portfolio projects are personal/demo work and stay labelled that way

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
- `/pricing`, `/privacy-policy`, `/terms`, `/revision-policy`
- `/about/rahul-reddy-adelli`

## Extra SEO Routes
- `/website-development`
- `/affordable-website-development`
- `/website-development-under-10000`
- `/app-development`
- `/custom-web-application-development-services`
- `/how-much-does-a-website-cost-in-india`
- `/website-redesign-services`
- `/landing-page-development-for-lead-generation`
- `/affordable-website-development-for-startups`
- `/seo-services`
- `/mvp-development-for-startup-founders`
- `/ai-automation`
- `/ai-chatbot-development`

## Homepage
- entry: `src/app/(site)/page.tsx` → `src/components/home-v3/HomeV3.tsx` (server component with client islands)
- market pages `/us` `/uk` `/au` `/ca` `/ae` `/sg` `/in` render the same homepage with market copy
- featured projects: `src/data/FeaturedPortfolioProjects.ts`; labelled personal/demo; not proof of ad-campaign results
- no testimonials or ratings; diagnostic tabs support arrow, Home and End keys

## Service Detail
- `/service/[slug]` and the 13 intent pages share `src/components/views/ServiceDetailView.tsx`
- each service has an animated illustration in `src/components/illustrations/ServiceIllustrations.tsx`

## Blog
- `/blog` index with server-side search (`?q=`) and category filter (`?category=`), noindex results
- historical articles at `/blog/[slug]`; guides at `/blog/[slug]/[article]`; six `/blog/{topic}` hubs link all guides
- guides, articles and policies share `src/components/views/ArticleView.tsx` (contents rail, prose, related links)
- preserve the eight historical article URLs; do not create flat aliases for nested guides

## Portfolio
- `/portfolio` and `/portfolio/[slug]`; every card and page carries the "Personal / demo" badge

## Animation Note
- scroll scenes use GSAP ScrollTrigger with one Lenis instance (`src/components/site/SmoothScroll.tsx`)
- reveals are CSS-driven via `RevealObserver`; content stays visible without JS and with reduced motion
- off-screen decoration pauses automatically (`svg` and `[data-anim]`)

## Contact and Verification
- Contact API enforces body/field limits, allowed choices, origin, honeypot and per-instance throttling.
- Throttling resets on cold starts; use a shared edge limiter when traffic scales. There is no durable enquiry store.
- Failure logs contain a request ID and category, not enquiry content. Failed forms retain text and show an email fallback.
- Run `scripts/check-contact.mjs`, then build and run the SEO, UI-contract and browser scripts against a fresh server.
- `scripts/check-browser.mjs` uses the installed agent-browser CLI; see `docs/CODEBASE.md`.

## User Sensitivity
- user dislikes blind design changes
- user expects PM-style judgment, not just implementation
- verify alignment before changing UI; show screenshots at desktop and mobile widths
