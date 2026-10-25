# ReddyStack agent instructions

## Where truth lives (read these, don't re-guess)
- PRD.md — what the site must do and sell.
- ARCHITECTURE.md — stack, database, data flow.
- DESIGN.md — look, wording, page shapes.
- RULES.md — the 10 non-negotiables.
- TASKS.md + PROGRESS.md — what is done, what is open.
- `.agents/skills/SOURCES.md` — the 25 installed skills and where each came from.
If this file ever disagrees with one of those, the other file wins for its own topic. The 2026-10-25 India-first direction (India-wide target, public prices, Supabase backend) overrides any older line anywhere in this repo.

## Authority
- Owner: Adelli Rahul Reddy. Agents have full control of this repository: edit any file without asking first — code, design, content, data, config, docs, scripts.
- Commit, push, and deploy ONLY on the owner's explicit word for that exact step. State in the handoff what was pushed or deployed.
- Ask before anything that cannot be undone, or anything outside this repo: deleting Git history, rotating or exposing credentials, changing DNS, hosting, Resend, GA4, or Search Console settings, or spending money.
- Never commit secrets. Env files stay out of Git.

## Mandatory skills rule
Skills live in `.agents/skills/` (25 folders). Before starting any build, fix, redesign or audit task, read the matching skill(s) first and follow them:
- Design / redesign / new page: frontend-design + design-taste-frontend; system choices: ui-ux-pro-max; premium finish: impeccable; shadcn/Tailwind implementation: ui-styling; motion: emil-design-eng; accessibility/UX check: web-design-guidelines.
- Database / RLS / auth: supabase + supabase-postgres-best-practices.
- Speed / bloat: next-bundle-optimizer + ponytail (smallest change that fully works; never add a dependency for a few lines).
- SEO: claude-seo + seo-audit.
- Ads / creative: meta-ads, google-ads, ad-creative; brand: brandkit, canvas-design.
- Offer / marketing: founder-offer, founder-marketing.
Never invent a design system, price, SEO rule or ad structure a skill already covers. If no skill covers the task, say so and continue with PRD.md / ARCHITECTURE.md / DESIGN.md / RULES.md.

## Stack (detail in ARCHITECTURE.md)
- Next.js 16 App Router, React 19, TypeScript; build uses webpack (`next build --webpack`).
- Tailwind CSS v4 + shadcn/ui primitives; lucide-react icons; Motion for transitions; GSAP ScrollTrigger + Lenis for scroll scenes.
- Supabase (Postgres + Auth) as the only backend. Hosting: Vercel, at ship time only, on the owner's word.
- The public site is light (owner decision, 2026-10-25): bone background, near-black ink, one marigold fill on actions and a darker amber for accent text, tokens in `src/styles/globals.css` scoped by `.site-theme`. /admin keeps its own dark look. No theme toggle, Bootstrap, jQuery, Font Awesome or template CSS; do not reintroduce them.

## Quality bar
- Work at a senior level across design, frontend, backend, security, accessibility, SEO, performance, and deployment. Do not claim expertise or verification without evidence.
- Understand the existing implementation and business goal before changing it. Trace the affected flow end to end. Keep implementations simple; never ship generic, unfinished, or visually inconsistent work.
- Design as a system: consistent colour, contrast, typography, spacing, hierarchy, motion and responsive behaviour. Review the whole page, not only the edited component, at desktop (1440px) and mobile (390px) widths, with motion on and with reduced motion.
- Respect `prefers-reduced-motion` everywhere. Content must be visible without JavaScript. Protect LCP: no full-screen loaders, never fade hero text from opacity 0, hero headings server-rendered.
- Find and fix observable issues before handing back. If the standard cannot be reached, stop that part and say exactly what is missing.
- Report only what was actually verified. A passing build does not prove visual quality, delivery, rankings, or performance.

## Verification (from the repo root, before any push or deploy)
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
Set `SEO_CHECK_BASE` to check another server. The browser check needs the `agent-browser` CLI. Contact and browser checks do not send email. Also inspect screenshots of changed pages at 1440px and 390px, with motion on and with reduced motion.

Keep this file current: when a change makes something here wrong, update this file in the same change.

<!-- BEGIN:nextjs-agent-rules -->



# This is NOT the Next.js you know



This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.



This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.



<!-- END:nextjs-agent-rules -->
