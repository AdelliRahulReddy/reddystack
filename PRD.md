# ReddyStack — PRD (Product Requirements Document)

## What this is
The rebuilt reddystack.com: a founder-led growth-marketing studio website for
Indian businesses, plus its admin panel. One product, two faces: the public
site that sells, and the admin panel that controls it. Both read ONE Supabase
database — the site never stores its own copy of prices, services or works.

## Who it is for
- Buyer: an Indian local/service business owner who wants enquiries
  (WhatsApp chats, calls, Instagram DMs, form fills — whichever door their
  customers use). India-wide; Hyderabad is home ground, not a limit.
- Owner: Adelli Rahul Reddy, one person, night-shift job, a few async hours
  a day. Everything must be runnable by him alone.

## The offer (locked by Founder Skill steps 1–2 + owner decisions)
- Positioning: "ENQUIRY stack for Indian businesses."
- Hero line: "One stack between your ad and your enquiry."
- Lead box: Enquiry Sprint, ₹14,999 one-time (page + Meta campaign + image
  creatives + tracking + 7 days async optimisation + report), with the
  guarantee: not live with first enquiries in the agreed window → work free
  until it is. Ad spend extra, paid directly to Meta.
- À-la-carte (price calculator): Landing Basic ₹4,999; Landing Next.js
  ₹9,999; Website ₹24,999; Admin panel ₹19,999; Meta ads ₹9,999/month;
  SEO ₹7,999/month. Dashboard add-on +₹19,999 on landing pages.
- Prices rise after 3–5 real client works with showable results.
- No AI video (no budget for paid AI video tools).

## Public site (live)
Home, Services (public prices), Calculator, Works, Process, FAQ, Contact.
Enquiry form + WhatsApp button on every page. Calculator creates a quote +
enquiry in the database and offers WhatsApp send. Works are split into
"Client work" (ReelsXpress, Manamantha) and "Portfolio" (Asli, demos) —
never mixed, never relabelled.

## Admin panel (live, /admin, owner only)
Dashboard counts; services + options + prices editing; enquiries pipeline
(new → contacted → quoted → won → lost) with notes + follow-up date; works
manager; site content + FAQ editing (CMS inside admin); settings editing.
Admin edits appear on the public site + calculator with no code change.

## Next builds (their tables already exist in the database)
Client report portal UI, rank-tracking UI, visitor-analytics UI, payments /
invoices UI, blog engine.

## Success test (owner's word, not a feeling)
1. Change a price in admin → public site + calculator show the new price.
2. Submit a test enquiry + a test calculator quote → both appear in admin.
3. A stranger can read the site and answer: what it costs, what they get,
   and what happens after they pay — without calling anyone.
