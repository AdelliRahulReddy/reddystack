Repo-local Codex efficiency setup.

What this does:
- keeps responses concise by default in local Codex sessions
- points Codex to compressed repo context first
- keeps all project documentation in `docs/`

Files:
- root `AGENTS.md` holds all agent instructions
- `docs/context/PROJECT_CONTEXT_LITE.md`
- `docs/context/SEO_CONTEXT_LITE.md`

How to use:
- open Codex in this repo
- Codex reads and follows the root `AGENTS.md`
- ask for `normal mode` or `detailed mode` when you want more depth

What not to compress:
- user-facing copy
- blog/landing/portfolio content
- nuanced PM or UX decisions unless you explicitly want terse output
