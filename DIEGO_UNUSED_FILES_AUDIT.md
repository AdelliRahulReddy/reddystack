# Diego Cleanup Candidate Files

Date: 2026-04-28

Status: Phase 1 deletion partially completed on 2026-04-28 after owner confirmation.

This file tracks what was removed and what still needs confirmation/access before deletion.

## Cleanup update — 2026-09-12

Removed unused `three.js`, `webgl.js`, and `charming.js` plus their barrel exports after checking all source and asset references. Also removed `hover-reveal.css`, which was not imported. The entries below describe the earlier audit; these four files are no longer pending. Active GSAP plugins and globally loaded styles remain in place.

## Method

- Built a static import graph from all active Next App Router entrypoints in `src/app`.
- Included `src/styles/index.scss` because it globally loads Diego CSS/Sass.
- Resolved `@/*` and `@/assets/*` imports.
- Cross-checked public asset references and current production build output.

Key finding: many old Diego demo files are unused, but the largest speed wins are likely from plugin and global CSS cleanup, not just deleting unused TSX files.

## Removed High-Confidence Source Files

These files were not reached from the active Next route/import graph and were removed.

- `src/components/homes/home/SkillAreaHomeOne.tsx`
- `src/data/ArticleData.ts`
- `src/svg/about/BrandIcon.tsx`
- `src/svg/home-2/YoutubeIconHeorAreaHomeTwo.tsx`
- `src/svg/home-3/DownArrowIcon.tsx`
- `src/svg/home/AwardIcons/AwardLeftArrowIcon.tsx`
- `src/svg/home/AwardIcons/AwardUpArrowIcon.tsx`
- `src/svg/home/FooterIcons/BehanceIconFooter.tsx`
- `src/svg/home/FooterIcons/GoogleIconFooter.tsx`
- `src/svg/home/FooterIcons/InstagramIconFooter.tsx`
- `src/svg/home/HeroIcons/HeroBehanceIcon.tsx`
- `src/svg/home/HeroIcons/HeroGoogleIcon.tsx`
- `src/svg/home/PortfolioIcons/RitghtArrowIconPortfolio.tsx`
- `src/svg/home/PortfolioIcons/UpArrowIconPortfolio.tsx`
- `src/svg/icons/Facebook.tsx`
- `src/svg/icons/Twitter.tsx`
- `src/svg/service/ServiceBrandingIcon.tsx`
- `src/svg/service/ServiceUiIcon.tsx`
- `src/utils/animatedHeadline.js`
- `src/types/wowjs.d.ts`

Still pending because the filesystem denied deletion:

- `src/components/about/BrandAreaAbout.tsx`
- `src/components/blog/BlogArea.tsx`
- `src/components/blog/index.tsx`

Keep for now:

- `src/types/bootstrap-js.d.ts` because `src/layouts/Wrapper.tsx` dynamically imports Bootstrap JS.

## Empty Local Route Folders

These folders are empty locally and are not tracked by Git, but they can be removed from the workspace for cleanliness.

- `src/app/[...not-found]`
- `src/app/ai-automation-services-for-small-teams`
- `src/app/blog-details`
- `src/app/blog-sidebar`
- `src/app/mobile-app-development-services`
- `src/app/portfolio-details`
- `src/app/seo-website-development-for-small-businesses`
- `src/app/service-details`
- `src/app/social-media-marketing`
- `src/app/website-development-services`
- `src/app/website-maintenance-services`

## Removed Public Asset Files

These public assets had no reachable reference from active routes/styles after excluding references inside unused source files and were removed.

- `public/assets/img/blog/icon.svg`
- `public/assets/img/blog/quote.svg`
- `public/assets/img/course/logo/figma.png`
- `public/assets/img/cv/mycv.docx`
- `public/assets/img/cv/mycv.pdf`
- `public/assets/img/hero/hero-hand.png`
- `public/assets/img/portfolio-details-2/icon.svg`

Still pending because the filesystem denied deletion:

- `public/assets/img/new-img/big-img/big-img.jpg`
- `public/assets/img/new-img/svg/icon.svg`
- `public/assets/img/new-img/text-slider/shape-1.png`
- `public/assets/img/new-img/text-slider/shape-2.png`
- `public/assets/img/offcanvas/offcanvas-1.jpg`
- `public/assets/img/offcanvas/offcanvas-2.jpg`
- `public/assets/img/offcanvas/offcanvas-3.jpg`
- `public/assets/img/portfolio/2/portfolio-2.jpg`
- `public/assets/img/portfolio/3/portfolio-2.jpg`
- `public/assets/img/portfolio/icon.svg`
- `public/assets/img/portfolio/image/portfolio-2.jpg`
- `public/assets/img/portfolio/overly-bg.png`
- `public/assets/img/skill/ai.png`
- `public/assets/img/skill/angular.png`
- `public/assets/img/skill/figma.png`
- `public/assets/img/skill/html.png`
- `public/assets/img/skill/in.png`
- `public/assets/img/skill/nodejs.png`
- `public/assets/img/skill/photoshop.png`
- `public/assets/img/skill/sketch.png`
- `public/assets/img/skill/vue.png`
- `public/assets/img/skill/webflow.png`
- `public/assets/img/skill/wp.png`
- `public/assets/img/skill/xd.png`
- `public/assets/img/testimonial/avata/avata-1.png`
- `public/assets/img/webgl/1.jpg`
- `public/assets/img/webgl/3.jpg`

## High-Impact Bundle Cleanup Candidates

These are reachable today because of imports/exports, so they should not be deleted directly. They need small code edits first.

- `src/plugins/index.js`
  - Remove unused exports for `WebGL`, `THREE`, and `chroma`.
- `public/assets/plugins/three.js`
  - Very large Diego/WebGL dependency. Current build output contains `THREE`, so this is likely hurting JS size.
- `public/assets/plugins/webgl.js`
  - Depends on `three.js`; no active Reddystack feature appears to need it.
- `public/assets/plugins/charming.js`
  - Exported as `chroma` but not used by active code.
- `public/assets/plugins/gsap-split-text.js`
  - `SplitText` is still imported/registered in `src/layouts/Wrapper.tsx`, but local animation helpers no longer use SplitText-style text splitting.
- `src/utils/scrollSmother.js`
  - Looks like a duplicate/no-op copy of ScrollSmoother. `Wrapper.tsx` already imports `ScrollSmoother` from `@/plugins`.

## CSS/Sass Prune Candidates

These Sass/CSS files are globally loaded through `src/styles/index.scss` and Diego's `public/assets/scss/main.scss`. Remove only after visual testing because global class dependencies are easy to miss.

- `public/assets/css/fullpage.css`
- `public/assets/css/pagepiling.css`
- `public/assets/css/nice-select.css`
- `public/assets/css/hover-reveal.css`
- `public/assets/scss/components/_animatedHeadline.scss`
- `public/assets/scss/components/_hotspot.scss`
- `public/assets/scss/components/_magicCursor.scss`
- `public/assets/scss/components/_rangeSlider.scss`
- `public/assets/scss/components/_search.scss`
- `public/assets/scss/components/_theme-settings.scss`
- `public/assets/scss/layout/header/_header-2.scss`
- `public/assets/scss/layout/footer/_footer-2.scss`
- `public/assets/scss/layout/pages/_course.scss`
- `public/assets/scss/layout/pages/_home-4.scss`
- `public/assets/scss/layout/pages/_home-5.scss`
- `public/assets/scss/layout/pages/_home-slider.scss`

Keep for now:

- `public/assets/css/font-awesome-pro.css` because active components still use `fa-*` icon classes.
- `public/assets/scss/layout/header/_header-3.scss` because `HeaderFour` uses `tp-header-3__*` class names.
- `public/assets/scss/layout/header/_header-4.scss` because `HeaderFour` also uses header-4 styles.

## Repo-Only Cleanup Candidates

These do not affect the deployed site speed directly, but they bloat the repository.

- `documentation/`
- `repomix-output.xml`
- `live-home-cli.png`
- `live-light-theme-forced.png`
- `local-home-cli.png`
- `localhost-light-theme.png`
- `www-live-home.png`
- `.codex/*.png`
- `.codex/*.log`

Keep:

- `.codex/context/PROJECT_CONTEXT_LITE.md`
- `.codex/context/SEO_CONTEXT_LITE.md`
- `.codex/README.md`

## Suggested Removal Order After Confirmation

1. Finish the pending access-denied deletions above.
2. Build and run route checks.
3. Refactor `src/plugins/index.js` and `src/layouts/Wrapper.tsx` to remove unused plugin imports.
4. Build again and compare JS chunk sizes.
5. Prune Sass/CSS only in small groups with visual checks on homepage, service pages, blog, portfolio, pricing, contact, and mobile nav.
6. Remove repo-only artifacts separately.

## Verification Needed Before Deleting

- `npm.cmd run build`
- Focused route smoke test for `/`, `/service`, `/blog`, `/portfolio`, `/pricing`, `/contact`
- Mobile menu check
- Theme toggle check
- Homepage animation check
- Blog detail and portfolio detail visual check
