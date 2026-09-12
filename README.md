# Reddystack

Reddystack is Rahul Reddy Adelli's digital services website: Meta Ads, Google Ads, Ad Creatives, AI UGC-Style Videos, Website Development, and SEO & Local SEO.

[Production website](https://www.reddystack.com)

Built with Next.js App Router, React, TypeScript, Sass, and GSAP. The contact endpoint uses Resend.

## Local development

```sh
npm ci
npm run dev -- --port 3187
```

## Production verification

```sh
npm run build
npm run start -- --port 3187
node scripts/check-seo-routes.mjs
node scripts/check-ui-contracts.mjs
npx eslint src scripts
```

Use `SEO_CHECK_BASE` to check a different server. Environment files and credentials stay outside Git.

Content lives in `src/data`; shared metadata and organization details live in `src/data/siteConfig.ts`. Branded article covers live in `public/assets/img/insights`, and the default sharing card lives in `public/assets/img/social`.

The site retains its original template layout and source attribution. See `AGENTS.md` and `AGENT_SOURCE_RULES.md` before changing the design.
