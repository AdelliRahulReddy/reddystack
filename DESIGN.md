# ReddyStack — DESIGN

## Principles (decided — these do not change with a redesign)
- Simple plain English. A business owner with no marketing knowledge must
  understand every page in one read. No jargon without a plain explanation.
- Price first. Prices are visible, not "call for quote". One-time vs monthly
  is always labelled. Ad spend is always shown as separate ("paid to Meta").
- Honest proof. Client work and portfolio work are visually separated and
  labelled. Testimonials section stays hidden until real ones exist.
- Mobile-first. Most visitors arrive on phones, from ads. Thumb-reachable
  buttons, WhatsApp button always visible, forms short (name, business,
  phone, what you need, message).

## Design direction (decided: light, owner's word 2026-10-25)
- One light system on every public page, country pages included: bone
  background, near-black ink, white cards with a visible edge and soft
  shadow, one marigold fill on buttons (dark ink text on it), and a darker
  amber for any accent text or link. Sora for headings, DM Sans for text,
  one type scale, one button, one card, one section rhythm. Tokens live in
  `src/styles/globals.css` (scoped by `.site-theme`; /admin keeps its own).
- Plain words first: headlines say what the owner gets ("More customer
  enquiries, set up in 7 days"); offer names appear only as small labels.
- Motion explains, never decorates: the ad → message → enquiry explainer is
  CSS only and shows a complete still picture with reduced motion.
- Every mock or sample carries a visible "Example" label.
- Changes to this direction still go through the design skills in
  `.agents/skills/` (frontend-design, design-taste-frontend, ui-ux-pro-max,
  impeccable, ui-styling, design-system, hallmark, better-interface,
  emil-design-eng, web-design-guidelines) and the owner's word.
- Guardrails that hold in any redesign: numbers in Indian format (₹14,999).
  Dates in IST. No fake counters ("500+ happy clients" is banned — it would
  be a lie). No graphic eating the headline (the old site's exact fault).
  Body text and buttons pass 4.5:1 contrast; marigold is never used as
  small text on a light background.

## Pages (content order — the look of each section follows the skills)
- Home: hero (site_content hero row) → Sprint box → services preview →
  works preview → guarantee → FAQ preview → enquiry form.
- Services: one card per active service — price, includes, excludes,
  delivery time, billing badge.
- Calculator: left = tick services + options; right = live totals
  (one-time / monthly / ad spend estimate) + quote reference + WhatsApp send.
- Works: "Client work" group, then "Portfolio" group. Each card: title,
  what was built, link where public.
- Process: 4 steps — pick → 50% advance → we build → report. Async rule
  stated: written updates, no daily calls needed.
- FAQ: from faqs table. Contact: form + WhatsApp + email + response promise.
