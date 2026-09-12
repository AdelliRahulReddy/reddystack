# Agent Source Rules

Last updated: 2026-04-10

## Primary source template

For frontend/UI implementation work in this repo, the primary source template is:

`C:\Users\adell\Documents\diego-next-js`

## Working rule

Default to the source template first.

Do not introduce custom code, custom wrappers, custom classes, custom layout logic, custom color logic, or custom visual behavior unless one of these is true:

- the user explicitly asks for a new design direction
- the source template does not support the requested change
- the user explicitly approves a custom implementation

## Expected workflow before editing frontend code

1. Find the equivalent file or section in `C:\Users\adell\Documents\diego-next-js`.
2. Reuse the source structure, classes, spacing, typography, and SCSS patterns.
3. Prefer text, data, asset, and small class-name changes over structural rewrites.
4. Only move beyond source patterns if the user clearly wants a new design or approves custom code.

## What to preserve from source

- component structure
- class names
- SCSS selectors
- typography system
- spacing rhythm
- color variables
- button styles
- section layout behavior

## What is usually allowed without special approval

- replacing copy
- changing prices/content/data
- swapping images/assets
- updating links
- updating SEO/config values
- switching to an existing source-supported class or selector

## What is not allowed by default

- adding new visual wrappers just to force-fit an asset
- inventing new styling systems when source styles already exist
- introducing custom section layouts
- changing typography or color treatment outside the source system
- solving design problems with ad hoc inline styling when the source already has a pattern

## If a request seems to require custom code

First check whether the same effect already exists somewhere in:

`C:\Users\adell\Documents\diego-next-js`

If yes:

- copy the pattern from source

If no:

- pause and confirm that a custom implementation is acceptable before proceeding

## Repo-specific reminder

This project is a customized Diego-based site. The user wants future edits to stay visually and structurally aligned with the Diego source until they explicitly ask for a new design.
