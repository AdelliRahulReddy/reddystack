# ReddyStack agent skills — SOURCES

Installed 2026-10-25 into `C:\projects\reddystack\.agents\skills\` (25 folders).
Method: shallow git clones of the source repos, skill folder copied verbatim,
except where noted. Every folder verified to contain a top-level SKILL.md
with a unique `name:` field (one known alias: react-best-practices folder's
internal name is vercel-react-best-practices, same as the ReelsXpress install).

## Design (10)
- frontend-design — anthropics/skills, skills/frontend-design
- design-taste-frontend — Leonxlnx/taste-skill, skills/taste-skill
  (folder name taste-skill, SKILL.md name design-taste-frontend)
- ui-ux-pro-max — nextlevelbuilder/ui-ux-pro-max-skill,
  .claude/skills/ui-ux-pro-max (includes data/ + scripts/ for local lookup)
- impeccable — pbakaus/impeccable, .agents/skills/impeccable
- ui-styling — nextlevelbuilder/ui-ux-pro-max-skill, .claude/skills/ui-styling
  (SUBSTITUTE: the registry's high-end-visual-design no longer ships as a
  folder in the current taste-skill repo; its job is covered by
  design-taste-frontend v2. ui-styling is the same repo's shadcn/Tailwind
  implementation skill, directly useful for this stack.)
- emil-design-eng — emilkowalski/skills, skills/emil-design-eng
- web-design-guidelines — vercel-labs/agent-skills, skills/web-design-guidelines
- design-system — nextlevelbuilder/ui-ux-pro-max-skill, .claude/skills/design-system
  (SUBSTITUTE: the registry's minimalist-ui no longer ships as a folder in
  the current taste-skill repo; design-system covers the system/token side.)
- hallmark — Nutlope/hallmark, skills/hallmark
- better-interface — jakubkrehel/skills, skills/better-interface
  (SUBSTITUTE: the older make-interfaces-feel-better name is folded into the
  author's better-* suite; better-interface is its interface-polish skill.)

## Creative (3)
- canvas-design — anthropics/skills, skills/canvas-design
- brandkit — Leonxlnx/imagegen-skills, skills/brandkit
- ad-creative — coreyhaines31/marketingskills, skills/ad-creative

## Business (4)
- meta-ads — arnabbagxd/Brand-building-skills, skills/meta-ads
- google-ads — arnabbagxd/Brand-building-skills, skills/google-ads
- founder-offer — founder-skill (Jakeschincariol/founder-skill),
  skills/founder-offer
- founder-marketing — founder-skill, skills/founder-marketing

## Performance (3)
- next-bundle-optimizer — vercel/next.js, skills/next-bundle-optimizer
- react-best-practices — vercel-labs/agent-skills, skills/react-best-practices
- ponytail — DietrichGebert/ponytail, skills/ponytail
  (Note: ponytail's self-activation uses a SessionStart hook in its plugin
  form; as a plain skill folder it works when invoked by name.)

## SEO (2)
- claude-seo — AgriciDaniel/claude-seo, skills/ tree (26 sub-skills)
  (Top-level SKILL.md in this folder is a locally written index pointing at
  the sub-skills; sub-skill content is the vendor's original.)
- seo-audit — coreyhaines31/marketingskills, skills/seo-audit

## Core (3)
- supabase — supabase/agent-skills, skills/supabase
- supabase-postgres-best-practices — supabase/agent-skills,
  skills/supabase-postgres-best-practices
- deploy-to-vercel — vercel-labs/agent-skills, skills/deploy-to-vercel

## Safety check (2026-10-25)
Top-level SKILL.md files scanned for install-via-curl, destructive commands
and credential exfiltration patterns: no hits. The only matches were benign
(a "do not curl" instruction, token-scope guidance, and form-field example
code). Script files present only in: ui-ux-pro-max (18), design-system (7),
impeccable (5), ui-styling (4), design-taste-frontend (3),
deploy-to-vercel (2) — the skills' own local lookup/verify scripts.
