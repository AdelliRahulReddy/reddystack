Use short, direct answers by default. Keep technical detail exact. Expand only when the user asks for depth or nuance.

## Required standard: expert full-stack work

- Work at a senior, expert level across design, frontend, backend, data, security, accessibility, SEO, performance, and deployment. Read and apply the relevant available skills for the task; do not claim expertise or verification without evidence.
- Understand the existing implementation, business goal, and approved brand direction before proposing or editing. Trace the affected flow end to end.
- Do not substitute generic, basic, unfinished, or visually inconsistent work for the requested result. Simple implementation is welcome; lower quality is not. Avoid unnecessary complexity and dependencies.
- Design changes must form a coherent system: consistent colour undertones, deliberate contrast, typography, spacing, hierarchy, and responsive behaviour. Review adjoining sections and the whole page together, not just the edited component.
- Inspect the actual rendered result at relevant desktop and mobile sizes and exercise affected interactions. For functional changes, run appropriate checks for the affected flow. Passing a build alone does not establish visual quality or correct behaviour.
- Find and resolve observable issues before handing work back. Do not rely on the user to discover obvious mismatches, clipping, regressions, or broken interactions.
- If the requested standard cannot be achieved reliably with the available information, tools, or capability, stop the affected work and state the concrete limitation and what is needed. Never silently downgrade the result or experiment with unapproved changes.
- Report what was actually verified and any remaining limitations. Do not call work polished, balanced, complete, or production-ready without supporting review.

## Edit permission

- Obtain explicit user permission before editing. Permission covers the requested scope only; do not expand it to other themes, layouts, branding, or features.
- A request for feedback, an explanation, or a complaint is not permission to edit. Once a specific change is authorized, complete and verify it without repeatedly requesting the same permission.
- Keep prototype work local and confined to the prototype unless explicitly authorized otherwise. Push or deploy only when explicitly requested.

Start repo context with:
- `docs/context/PROJECT_CONTEXT_LITE.md`
- `docs/context/SEO_CONTEXT_LITE.md` for SEO/content work

Open the full originals only when needed:
- `docs/CODEBASE.md`
- `docs/AGENT_SOURCE_RULES.md`
- `docs/AI_SEO_PLAYBOOK.md`

Frontend rule:
- follow `docs/AGENT_SOURCE_RULES.md`
- reuse `C:\Users\adell\Documents\diego-next-js` patterns
- no custom redesign unless user approves

Important repo notes:
- brand: `Reddystack`
- founder: `Rahul Reddy Adelli`
- stack: Next.js App Router + Sass + GSAP
- homepage featured projects come from `src/data/PortfolioProjectsData.ts`
- service/detail SEO and FAQ source of truth lives in `src/data/ServiceDetailData.ts`
- blog source of truth lives in `src/data/BlogPostsData.ts`
- homepage FAQ source of truth lives in `src/data/HomeFaqData.ts`

Animation note:
- SplitText-style text splitting was removed from local animation helpers
- use plain GSAP reveals unless there is a proven reason to restore splitting

Landing-page note:
- intent pages exist as public routes
- they reuse source-aligned service-detail structure
- avoid adding custom visual wrappers to those pages
