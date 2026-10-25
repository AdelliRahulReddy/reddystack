# ReddyStack design review — 2026-10-25

Review only. No code was changed, and nothing was committed, pushed or deployed.
Reviewed: the live site at https://www.reddystack.com (desktop 1440px and phone 390px), the page code in `src/`, and the 10 design skills in `.agents/skills/`.
The current look is treated as a draft to judge, not the decided design (DESIGN.md).

---

## 1. One-screen summary

**Fix first (these break the offer or the rules, before any redesign):**
1. The Contact page still sells the old US/UK offer. It shows budgets in **US dollars by default**, lists "Proof Sprint" and **"AI-Assisted Video"** as services (RULES.md rule 4 says no AI video), and ends with "working with US & UK teams".
2. The **FAQ page is empty** on the live site: a heading with no questions. The FAQ table was never filled. The homepage FAQ section is hidden for the same reason.
3. The Enquiry Sprint box's main button, **"Build your quote", sends people to the calculator, but the calculator does not offer the Enquiry Sprint.** The main offer has no next step.
4. The homepage enquiry form asks for **email, not phone**. Your Indian visitors arrive from ads on phones and expect a WhatsApp or call back. DESIGN.md already says the form should ask for phone.
5. On phones, the only always-visible action is the floating WhatsApp bubble. The header button is hidden below 460px, the bubble covers text, and the calculator's total is about 3.5 screens below the first service.

**Top 5 design improvements (ranked by impact):** see section 4.
1. A phone-first action bar (WhatsApp, Call, Get quote) to replace the floating bubble.
2. A homepage first screen that shows the offer and price: "Enquiry Sprint, ₹14,999 one-time".
3. Real pictures of the real work (screenshots of ReelsXpress and Asli Routine, the Manamantha ad creative, your own photo) in place of grids of text cards.
4. Drop the generic "AI-made" look: mono uppercase labels, scrambling labels, coloured accent words, glass pill menu, glow blobs, cards on every section.
5. Shorter forms with phone first, and a calculator that includes the Sprint and keeps the total visible on phones.

**Top 5 new sections:** see section 6.
1. "Your 7 days": a day-by-day Sprint timeline.
2. A full guarantee: what "first enquiries" and "agreed window" mean, and how to claim.
3. An honest comparison: ReddyStack vs lead-listing apps vs big agencies vs freelancers.
4. "What you own": page, domain, ad account and tracking, all in your name.
5. A free enquiry check: send your Instagram, Google profile or website link and get a written check.

**Needs owner decision:** listed in section 9.

---

## 2. What was checked, and what was not

| Checked | How |
| --- | --- |
| Homepage, /pricing, /services, /works, /calculator, /process, /faq, /contact, /about | Live site, page text and screenshots at 1440px and 390px |
| Phone layout facts (button positions, total position, header button) | Measured in the live page with JavaScript at 390×844 |
| Page and component code | `src/components/views`, `src/components/blocks`, `src/components/site`, `src/components/contact`, `src/data/contactOptions.ts`, `src/styles/globals.css` |
| /admin | Code only (`src/app/admin`, `src/components/admin`) |
| Skill-backed direction | `ui-ux-pro-max` design-system search run for this brief |

**Not verified:**
- /admin in the running app. It needs your sign-in, which I don't enter.
- Reduced-motion rendering. The code respects it (`RevealObserver.tsx:33`, `Cursor.tsx`, `MagneticButton.tsx`, `SmoothScroll.tsx`, `template.tsx`), but I did not view it with reduced motion switched on.
- The taste-skill inspector (`inspect.mjs`) and Hallmark's `sloplint`. Review only, so I did not run them. Run them before any redesign is shipped.
- Real phones and speed numbers. Speed causes are listed from code only (section 8).

**Prices:** the live prices match the brief (₹14,999 / ₹4,999 / ₹9,999 / ₹24,999 / ₹19,999 / ₹9,999 a month / ₹7,999 a month). **No price mismatch found.**

---

## 3. Page-by-page review

### Whole site (look and system)

The skills name the current look almost exactly as their "generated page" defaults:

| What the site does now | Skill that flags it | Where |
| --- | --- | --- |
| Near-black ground with a single bright acid-lime accent plus violet glow | frontend-design (AI default #2), design-taste-frontend ("no gradients", "no glows") | `src/styles/globals.css` tokens; `PageHero.tsx` grid lines and violet radial glow |
| Small uppercase monospace labels with a dot above every heading ("● LEAD OFFER", "● SERVICES") | frontend-design (default #5), hallmark floor rule 9, design-taste-frontend ("no eyebrows", "no monospace") | `blocks/Eyebrow.tsx`, `SectionHead.tsx`, used on every section |
| Labels that scramble into random letters on scroll. The screenshots caught "QRAFFIER", "4XG XMISAI4DK" and "5M04N7+E" in place of real labels | frontend-design (motion only to draw attention), better-interface (meaning should never depend on motion) | `site/RevealObserver.tsx` `scramble()` |
| One word in each headline coloured lime ("actually built.", "runs.", "stack.") | frontend-design, hallmark floor rule 3, design-taste-frontend ("no styled accent word") | `PageHero.tsx` `accent` prop, used by every inner page |
| Every section is the same rounded, bordered card (28px and 40px corners) | frontend-design (SaaS card kit #4), design-taste-frontend ("no rows of identical cards"; "neighbouring sections must not share a layout") | Home, Services, Works, Process, Calculator, Contact |
| Glass pill menu bar with blur | design-taste-frontend ("no glass, no floating pill navigation") | `site/SiteHeader.tsx` |
| Arrows glued to button text ("Get started →", "See it ↗") | hallmark floor rule 10, frontend-design (default #5) | `ui/button.tsx` `ButtonArrow`, cards |
| Three typefaces (Sora, DM Sans, JetBrains Mono) | design-taste-frontend ("two at most, usually one") | `app/layout.tsx` |
| Custom cursor, magnetic button, smooth scroll, scroll progress bar, split-letter headings and scramble, all at once | frontend-design ("one orchestrated moment… scattered effects read as AI-generated"), emil-design-eng ("should this animate at all?") | `site/SiteChrome.tsx` |
| No real pictures anywhere on the homepage or Works page | design-taste-frontend (at least 4 real pictures; "show, do not describe"), hallmark ("show, do not describe") | `HomeView.tsx`, `WorksView.tsx` |

Why it matters for this buyer: a Hyderabad clinic or coaching-centre owner arriving from a Meta ad gets about 5 seconds. The current look reads like a tech start-up template. It does not read as "one person who will get me WhatsApp enquiries for ₹14,999". The design-taste critique's "cover the logo" test fails: swap the name, and this could be any agency's dark template.

### Homepage

- **First screen.** The headline is strong and short. But the first screen never says what it costs or what the visitor gets. The ₹14,999 price starts at 1,034px on a phone, below the first screen. design-taste-frontend (copy rule): "the first screen answers the visitor's first question in large type… what it is and what it costs". PRD success test 3 asks the same.
- **"Get started"** says nothing about what happens. It scrolls to the Sprint box. frontend-design: "A CTA says exactly what happens when it is used."
- **Hero buttons** fade in after a 0.3s delay over 1s (`PageHero.tsx` actions). The heading stays visible, which is good for speed (LCP), but the action arrives last. On a phone it also sits near the fold (top at 472px of 844px).
- **The small label** "ENQUIRY stack for Indian businesses" has one word in capitals, which reads as a typo. It is also an eyebrow, which the skills ban.
- **Sprint box.** The description is one long line joined with "+". It is the most important content on the site and should be a list of the six things you get, each with a plain one-line meaning. The price panel does not say "Ad spend extra, paid directly to Meta", although DESIGN.md says ad spend is "always shown as separate". The Sprint box's main button goes to the calculator, where the Sprint does not exist (see section 1).
- **Services preview** repeats all six full service cards from /services. On a phone the homepage is 7,374px, about 8.7 screens. design-taste-frontend: "neighbouring sections must not share a layout". A compact price list on the homepage (name, one line, price, "one-time" or "per month") with the full cards on /services would halve the length.
- **Section headings** are set very large inside half the page width, so "Built, and labelled honestly." breaks onto 4 lines at 1440px and the guarantee onto 4 lines at 390px. design-taste-frontend house rule: headlines two lines or fewer at every width. The split-letter reveal was caught mid-animation with letters overlapping ("Everything, with / a public price.").
- **Works preview.** Keeping client work and portfolio separate is good and must stay. But the cards are text only, and Manamantha has no link and no picture. "Built with AI" on ReelsXpress may raise doubt for a buyer. See section 7.
- **Guarantee block.** This is the strongest trust message, but it sits below the works, and "agreed window" is never defined. See section 6, item 2.
- **FAQ section** is missing because the table is empty.
- **Enquiry form.** It asks for name, business, **email** and a long question label. The guidance (DESIGN.md: "name, business, phone, what you need, message"; ui-ux-pro-max forms: "progressive disclosure… overwhelm upfront") points to phone, not email. The WhatsApp number is printed in monospace with no "+91 " spacing.

### /services and /pricing

- These are two pages with the same hero headline, "Plain prices, no surprises." /pricing is the newer India page (Sprint plus services plus FAQ), yet it is **not in the header**. The footer lists it under "More", next to the old pages. /services is in the header but has no Sprint. Pick one and redirect the other (NEEDS OWNER DECISION, which name to keep).
- Each card's "Build this in the calculator" opens the calculator **without that service ticked**. Pass the service so it arrives pre-ticked. Small effort.
- Includes and excludes are one line each, joined with "+". Make them short lists. "Delivery: 3-5 days" is in small grey uppercase monospace, but delivery time is a buying fact and deserves normal text.
- Add-on prices such as the dashboard add-on (+₹19,999) only appear after ticking in the calculator. Consider showing "Add-ons available" on the card.

### /calculator

- The **Enquiry Sprint is not selectable**, so the lead offer can't be quoted here.
- **On a phone, the "Your quote" total is at 2,959px, about 3.5 screens below the first service.** A visitor who ticks a service sees no total change. Add a fixed bottom bar on phones: "One-time ₹X · Monthly ₹Y · See quote". ui-ux-pro-max (touch and feedback), design-taste-frontend ("the live thing… works on a phone with a thumb").
- To get the WhatsApp quote link, the visitor must fill four required fields (name, business, phone, email). Email adds friction for a WhatsApp-first buyer. Suggest name, business and phone, with email optional.
- The calculator is the site's one real "live thing", which design-taste-frontend calls the most memorable element. It deserves a homepage entry point ("Tick what you need, see your price") rather than living only as a nav item.
- The floating WhatsApp bubble covers card text on a phone. It was seen over "call/form" in the first card.

### /works

- The honest split ("Built for clients" vs "Our own projects") is right. Keep it in any redesign.
- **No pictures.** Real, honest material exists: ReelsXpress screens, the Asli Routine site, and the Manamantha ad creative (if the client agrees). design-taste-frontend ranks the project's own pictures first. A software project's own interface fragments count as real pictures.
- Each card should say **what was built** in 3 short lines (pages, features, channel), with no results claimed. Results only appear once real and permitted.
- No enquiry action at the end of the page. The visitor hits the footer.

### /process

- Grammar: **"50% pay the advance."** reads wrong. Body text says **"A small percentage up front"**, but 50% is not small. Plain fix: "Pay 50% to start" / "Half up front books the work. The other half is paid on delivery." (wording only; the percentage still comes from settings).
- Four identical cards with "STEP 1" monospace labels. A real ordered sequence is fine here (frontend-design allows numbering for true sequences), but the page is thin. It doesn't show the Sprint's 7 days, what you need to send, or when you hear back. See section 6, item 1.
- No call to action at the end.

### /faq

- **Empty on live.** The table has no rows (`supabase/migrations/002_seed.sql` seeds none). The page shows "Before you get in touch." over nothing. That is worse than no page.
- The empty FAQ list still emits an **empty FAQPage structured-data block** on /, /faq and /pricing (`buildFAQPageSchema` in `src/data/siteConfig.ts:494`). Google Search Console may flag it.
- Fix: you write 8–10 real answers in Admin → Content (cost, ad spend, what "enquiry" means, timeline, what you need from me, payment, refunds, who owns the page and ad account, Telugu/Hindi support if true). Until then, hide the section heading and skip the schema when empty.

### /contact

- **Old offer copy, live today:** "Bring one growth problem.", the services "Proof Sprint", "Paid Acquisition — Google", **"AI-Assisted Video"** (against rule 4), "Automation or Product Build"; budgets default to **USD** with USD/GBP/INR switches; "A written recommendation: Proof Sprint, Stack Build…"; "Remote from Hyderabad, working with US & UK teams." Files: `src/components/views/ContactView.tsx`, `src/components/contact/ContactForm.tsx` (`currencyForMarket()` defaults to USD), `src/data/contactOptions.ts`. These strings are also hardcoded. RULES.md rule 2 says content comes from the database.
- The form is long: 9 service chips, 4 fields, a currency switch and 5 budget chips. There is no phone field.
- The inline portrait inside the headline and the glass panel with a shadow are decoration (design-taste-frontend: no glass, no resting shadows).
- WhatsApp and phone use the hardcoded number in `siteConfig`, not the settings table.

### /about (in the header)

- Still the old "Proof-First Studio", "WORKING WITH US & UK", "Growth diagnostics… AI workflows… Product builds". It doesn't mention the Enquiry Sprint or India-wide. It also lists your current day job and employer by name, which is an owner choice (section 9).

### Footer

- A "Markets" column (Global, United States, United Kingdom, Australia, Canada, UAE, Singapore, India) sends Indian visitors to US/UK pages. It contradicts India-first. PROGRESS.md keeps those pages for SEO, but they don't need a spot in every footer.
- The tagline is still "A founder-led growth studio connecting web, search, ads, creative, tracking and automation."
- The giant outlined "ReddyStack" wordmark changes colour on hover: decoration on a page where most visitors use touch.

### Header and phone navigation

- "Start a project" is **hidden below 460px** (`SiteHeader.tsx`, `max-[460px]:hidden`). Phones get a menu button only.
- The menu has 6 links plus Contact, with Pricing missing. ui-ux-pro-max (navigation): keep the main menu at 5 or fewer and lead with the money pages.
- The floating WhatsApp button (`site/WhatsAppButton.tsx`) uses `siteConfig.socialLinks.whatsapp`, not the settings table. If you change the number in admin, the button keeps the old one, while the footer updates.

---

## 4. Design improvements, ranked by impact

| # | What to change | Why (skill) | Page / file | Effort |
| --- | --- | --- | --- | --- |
| 1 | **Phone action bar.** On phones, a fixed bottom bar with three thumb-sized buttons: "WhatsApp", "Call", "Get price". It replaces the floating bubble, never covers text (adds bottom padding), and reads the number from settings. On desktop, keep one header button. | ui-ux-pro-max priority 2 (touch targets, thumb reach) and 9 (navigation); DESIGN.md ("WhatsApp button always visible", "thumb-reachable"); better-interface (control hiding content is HIGH) | `site/WhatsAppButton.tsx`, `site/SiteHeader.tsx`, `site/SiteChrome.tsx` | Small |
| 2 | **First screen sells the offer.** Headline stays. Under it: one plain line with what you get, then "Enquiry Sprint · ₹14,999 one-time · ad spend paid directly to Meta". Primary button "WhatsApp Rahul" or "Get my Sprint plan"; second "See what's included". Buttons visible at once, no fade. | design-taste-frontend copy rules (first screen answers what it costs; one primary action named for what it does); hallmark floor 12 (headline, sentence and action visible without scrolling); PRD success test 3 | `views/HomeView.tsx`, `blocks/PageHero.tsx`, `site_content` hero row | Small |
| 3 | **Fix the dead ends.** Add the Sprint to the calculator (or point the Sprint button to a Sprint enquiry instead). Pre-tick the service from /services. End Works, Process and FAQ with one enquiry action. | ui-ux-pro-max funnel pattern ("each step: mini-CTA, final: main CTA"); frontend-design ("an empty screen is an invitation to act") | `blocks/SprintBox.tsx`, `views/CalculatorView.tsx`, `views/ServicesPricingView.tsx`, `ProcessView.tsx`, `WorksView.tsx` | Medium |
| 4 | **Shorter forms, phone first.** Every form asks: name, business, phone (WhatsApp), "What do you want more of?" as 4 tap-chips (WhatsApp chats / calls / Instagram DMs / form fills), and an optional message. Email optional. One form component reused on home, contact and calculator. | DESIGN.md form rule; ui-ux-pro-max priority 8 (forms: progressive disclosure, no overwhelm); frontend-design (labels say what they are, plainly) | `views/HomeEnquiryForm.tsx`, `contact/ContactForm.tsx`, `views/CalculatorView.tsx` | Medium |
| 5 | **Calculator total always in view on phones**, as a sticky bottom summary that opens the quote form. | ui-ux-pro-max (loading/feedback, touch); design-taste-frontend ("the live thing… works on a phone with a thumb") | `views/CalculatorView.tsx` | Small |
| 6 | **Real pictures of real work.** Screenshots of ReelsXpress (admin, customer site, apps), Asli Routine and the Manamantha ad creative (with permission), plus one real photo of you. Same crop ratio, square corners, captions saying what each shows. Never a stock "client". | design-taste-frontend imagery order (project's own first; floor of 4 real pictures); hallmark ("show, do not describe"; floor 8, never an invented logo or case study) | `views/WorksView.tsx`, homepage works preview, `works` table (add an image field) | Medium |
| 7 | **Remove the template tells.** Delete eyebrows and the scramble effect, the lime accent word in headlines, mono labels, glass pill menu, grid lines and glow blobs, the custom cursor and magnetic button. Keep one motion moment (for example the Sprint price panel settling in) and button press feedback. | frontend-design (5 defaults, "spend your boldness in one place"); design-taste-frontend house rules; hallmark floor 3, 9, 10; emil-design-eng animation framework | `blocks/Eyebrow.tsx`, `SectionHead.tsx`, `PageHero.tsx`, `site/Cursor.tsx`, `MagneticButton.tsx`, `RevealObserver.tsx`, `SiteHeader.tsx`, `globals.css` | Medium |
| 8 | **Choose a real direction** (section 5) and rebuild the pages from it with one ground, one ink and one accent, one or two typefaces, and different layouts for neighbouring sections. | frontend-design (two-pass plan, token system); design-taste-frontend (draw a direction, find the idea); impeccable ("redesign replaces; never polish the discarded look"); design-system (primitive → semantic → component tokens) | Whole site; `globals.css`, all views | Big |
| 9 | **Headlines two lines or fewer at every width.** Cut words or widen the measure; section heads no larger than the page needs. | design-taste-frontend house rule 1; hallmark floor 5 | `SectionHead.tsx`, homepage guarantee | Small |
| 10 | **Sprint box as a real offer card:** six deliverables as a list, each with a one-line meaning; price panel with "one-time", "ad spend extra, paid directly to Meta", the guarantee and "50% to start". | DESIGN.md ("ad spend always shown as separate"); design-taste-frontend ("price with what it includes"); founder-offer (clear value stack) | `blocks/SprintBox.tsx`, `bundles` table (includes as list) | Small |
| 11 | **Homepage services as a compact price list.** One row per service; full cards stay on /services. Cuts the phone homepage roughly in half. | design-taste-frontend ("no rows of identical cards", section variety); hallmark (about 80 words per screen) | `views/HomeView.tsx` | Small |
| 12 | **One pricing page.** Merge /services and /pricing (keep one, redirect the other) and put it in the header. **NEEDS OWNER DECISION** on the name. | ui-ux-pro-max navigation (no overloaded nav, predictable structure); claude-seo (avoid duplicate pages) | `navigation.ts`, `(site)/pricing`, `(site)/services` | Small |
| 13 | **Footer as a close, not a sitemap.** Name, one line, WhatsApp/Call/Email, the main pages. Move "Markets" and old pages into one "Other pages" link or a sitemap page. | design-taste-frontend ("the footer is a designed close, not a sitemap") | `site/SiteFooter.tsx` | Small |

---

## 5. Direction proposals (NEEDS OWNER DECISION)

The skills ask for an idea taken from the subject, not the category. In design-taste-frontend's words: "On this page, [something that belongs to the subject] becomes [the device]". Three honest options. Your choice, then the builder runs the skills' own tools (taste-skill `draw.mjs`, Hallmark `theme.mjs deal`) to deal the exact palette and type. I did not run those here.

**A. "The rate card" (light, price-first). Recommended.**
Idea: the printed rate list on an Indian shop counter, or the carbon-copy bill book, becomes the page. Prices are set big like a rate card, and the guarantee looks like a stamped promise. One clean paper-white ground, one dark ink, one strong accent, no cards. Each service is a row on the card.
Why: it is the most "this subject only" idea, puts price first (DESIGN.md), and reads as trustworthy to an Indian shop owner. The ui-ux-pro-max search for this brief returned a light, high-contrast "Swiss/minimal" style with a funnel pattern.
Catch: **AGENTS.md says the site is dark-only.** Choosing this needs your word to change that rule. Avoid cream with terracotta, which frontend-design names as an AI default.

**B. "The enquiry arriving" (dark, refined).**
Idea: the moment a customer's WhatsApp message lands becomes the hero. A real, built-in-HTML WhatsApp-style thread, **clearly labelled "Example"**, shows ad → page → message. One dark ground with no glow, one ink, one accent that is **not** WhatsApp green (to avoid brand confusion), and real screenshots below.
Why: keeps the dark-only rule and shows the product doing its one job (hallmark "signature").
Catch: an example chat must never look like a real client's chat.

**C. "Keep the dark, remove the template" (smallest step).**
Keep today's structure. Apply improvements 1–7 and 9–13, cut the palette to one accent, drop the third typeface, add real pictures.
Why: fastest. Catch: impeccable warns "never split the difference into polish on the discarded look". This is a clean-up, not a direction, and the design-taste critique would still score it as "tidy but anonymous".

Whichever you pick: client work and portfolio stay separate, no invented numbers, Indian number format, content stays visible without JavaScript, reduced motion respected.

---

## 6. New sections to add (honest, India-first, mobile-first)

Ordered by how much each should help a business owner trust and enquire. Each is built only from the real offer.

| # | Section | What it says (real content only) | Where | Effort | Decision |
| --- | --- | --- | --- | --- | --- |
| 1 | **"Your 7 days" Sprint timeline** | Day by day: intake call or form → page live → campaign live → daily async tweaks → report. What **you** must send (logo, photos, offer, Meta access) and by when. When you hear from Rahul (in IST). | Homepage after the Sprint box; replaces most of /process | Medium | **NEEDS OWNER DECISION**: the exact days and reply times you can keep |
| 2 | **The guarantee, in full** | Define "first enquiries" (for example, a real message, call or form from the ad), "agreed window" (a number of days after you receive everything), what's excluded (ad spend, delays waiting on the client, Meta account bans), and how to claim. A big plain sentence, then 4 short lines. | Homepage, its own section near the price; /pricing | Small | **NEEDS OWNER DECISION**: these definitions are a promise, so you set them |
| 3 | **Honest comparison** | Columns: ReddyStack Sprint / lead-listing apps / big agency / freelancer. Rows: who owns the page and ad account, whether enquiries are exclusive to you, price shown upfront, lock-in, who you talk to, how you get updates. Facts about ReddyStack only; others described by category, never named. From PROGRESS.md's competitor gap. | Homepage or /pricing | Small | **NEEDS OWNER DECISION**: category names and the wording about others |
| 4 | **"What you own"** | Your page, your domain, your Meta ad account and pixel, your enquiry data: all in your name, and you keep them if you stop. Already a principle on /about ("client-owned foundations"). | Homepage, near the guarantee | Small | Confirm it is true for every service |
| 5 | **Free enquiry check (lead magnet)** | "Send your Instagram, Google Business Profile or website link on WhatsApp. Rahul replies with a written check of how a customer can reach you: what is missing and what to fix first." A WhatsApp button with a pre-filled message. No made-up scores. | Homepage, before the form; also good as an ad destination | Small | **NEEDS OWNER DECISION**: whether you can deliver it, and in how many hours |
| 6 | **Who this is for, and not for** | For businesses where a customer messages or calls before buying (clinics, coaching, salons, events, local services, real estate). Not for: online-checkout shops, businesses wanting guaranteed lead counts, anyone without an ad budget. | Homepage after the hero, or /pricing | Small | **NEEDS OWNER DECISION**: the list of business types |
| 7 | **Meet the person** | Your real photo, name, Hyderabad, "you talk to me, not an account manager", working hours and reply time in IST, languages you speak with clients. | Homepage near the form; /about rewritten around it | Small | **NEEDS OWNER DECISION**: hours, reply time, languages, whether to mention the day job |
| 8 | **Sample report** | What "one plain report" looks like: a blank layout labelled "Sample layout, not a client result", listing what it covers (spend, enquiries, cost per enquiry, what changed, what next). | /pricing, Sprint box link | Small | Owner confirms the report contents |
| 9 | **Ad spend, explained** | Plain explanation: you pay Meta directly from your own card or UPI; ReddyStack never holds it; how to choose a daily budget. Any suggested minimum is a number, so it is your call. | /pricing, calculator ad-spend field help | Small | **NEEDS OWNER DECISION**: any suggested amount |
| 10 | **How payment works** | 50% to start (from settings), the rest on delivery, payment methods (UPI or bank), invoice and GST status, refund or cancel terms. | /pricing, /process | Small | **NEEDS OWNER DECISION**: payment methods, GST, refund policy |
| 11 | **Real work, explained** | One detail page per real project: ReelsXpress (what was built, screenshots), Manamantha (the ad creative, the channel, what was delivered; no results unless real and permitted). | /works, homepage works preview | Medium | Client permission for screenshots and names |

---

## 7. Other improvements

### Wording (plain English)

| Now | Suggested | Where |
| --- | --- | --- |
| "ENQUIRY stack for Indian businesses" | "For Indian businesses that want more enquiries" (or remove the label) | Homepage hero label (`site_content` positioning row) |
| "Get started" | "WhatsApp Rahul" / "Get my Sprint plan" | Homepage hero |
| "Sold on enquiries, not activities." | "You pay for a working enquiry route, not for hours." | Sprint description (`bundles` row) |
| "7 days of async optimisation" | "7 days of daily tweaks to the ads, with written updates" | Sprint description |
| "50% pay the advance." / "A small percentage up front" | "Pay 50% to start." / "Half books the work. The other half is paid on delivery." | `ProcessView.tsx` |
| "Full booking platform built with AI" | "Full booking platform: admin panel, customer website, creator app and customer app, live with real users." (drop "built with AI"; it invites "so anyone could do it") | ReelsXpress `works` row; **owner decision** |
| "Own brand website: independent truth for Indian personal care (in validation)" | "Our own personal-care brand site, still being tested." | Asli Routine `works` row |
| "Bring one growth problem." | "Tell me what you want more of." | `ContactView.tsx` |
| "Start a project" | "Get a quote" or "WhatsApp" | Header |
| "Delivery: Live within days of intake" | "Live within X days of getting your details" (a real number) | Meta ads `services` row; **owner decision** |
| "What do you want more of — calls, WhatsApp chats, or form fills?" (as a long field label) | Label "What do you want more of?" plus 4 tap-chips | Homepage form |

### Navigation

- Header: put **Pricing** in (after merging with Services), then Calculator, Work, How it works, FAQ. Move About into the footer until it's rewritten. Max 5 links (ui-ux-pro-max).
- Phones: bottom action bar (improvement 1). The full-screen menu can stay.
- Remove "Markets" from the footer (section 3).
- Hide /faq from the menu until it has answers, or fill it first.

### Honesty and consistency

- All contact numbers should come from the settings table (floating button, header menu, contact page, footer), so admin edits reach every place (RULES.md rule 2).
- The homepage guarantee line "your accounts stay in your name" is a good claim. Make sure it is true for every service before it becomes a full section (6.4).
- Ad-spend wording says "paid to Meta" everywhere. Good. Keep it in the Sprint price panel too.

### Speed: likely causes only (fixing them is a separate job)

- **Every public page waits on Supabase per visit.** `createSupabaseServerClient()` reads cookies (`src/lib/supabase/server.ts`), which makes each page render per request, and the homepage makes 7 queries (`(site)/page.tsx`). Public prices and content could be cached and refreshed when admin saves.
- **Heavy always-on client scripts on every page:** Lenis smooth scroll + GSAP ScrollTrigger, Motion page transitions (`app/template.tsx`), custom cursor, magnetic button, scroll progress, reveal, split-text and scramble observers (`site/SiteChrome.tsx`).
- **Three web fonts** with five weights in total, including a monospace face used only for labels (`app/layout.tsx`).
- **Hero action buttons** wait 1.3s to appear (CSS delay), which makes the page feel slow even when it isn't.
- The grid-line and blurred-glow backgrounds in every hero (`PageHero.tsx`, `ContactView.tsx`) cost paint time on low-end Android phones.
- A Sass dependency is still installed for the old homepage's module styles (`home-v3.module.scss`, used only by legacy market pages).
- Admin pages use `force-dynamic` and sequential client refreshes after each save (`router.refresh()`). That's fine for one user, but it adds waiting on every edit.

### SEO side-notes (claude-seo / seo-audit not run in full)

- An empty FAQPage structured-data block is emitted on /, /faq and /pricing (section 3, /faq).
- /about's page title is still "Proof-First Studio". /contact's title is "Start With One Growth Problem".
- /services and /pricing compete for the same "prices" intent.

---

## 8. /admin, daily usability

Reviewed from code only (you need to sign in to see it).

| # | Problem you would hit daily | Severity | Suggested fix | File | Effort |
| --- | --- | --- | --- | --- | --- |
| 1 | **The Enquiry Sprint (bundles table) cannot be edited in admin.** Its price, description and guarantee can only change in the database directly. PRD: "Change a price in admin → site shows the new price." | High | Add a "Lead offer" editor next to Services | `components/admin/ServicesEditor.tsx` or a new bundles editor; `app/admin/(panel)/services` | Medium |
| 2 | **Phone and email on an enquiry are plain text.** To reply you copy the number into WhatsApp by hand. | High | "WhatsApp" (wa.me with a pre-filled greeting), "Call" and "Email" buttons on each enquiry | `components/admin/EnquiriesPipeline.tsx` | Small |
| 3 | **Deleting an FAQ has no confirmation and no undo.** One mis-tap removes it. | High (better-interface trigger) | Confirm step, or a hide-first-then-delete flow | `components/admin/ContentEditor.tsx` `remove()` | Small |
| 4 | **Failed saves are silent** for FAQs, works and site content (the result is ignored). In Enquiries, a failed save just doesn't show "Saved." | High (better-interface: "an error that names no way to recover") | Show "Couldn't save, try again" next to the button | `ContentEditor.tsx`, `WorksManager.tsx`, `EnquiriesPipeline.tsx` | Small |
| 5 | **Follow-up dates are stored but never surfaced.** Nothing shows "follow up today". | Medium | Dashboard card "Follow-ups due today / overdue", sorted list | `app/admin/(panel)/page.tsx`, `lib/stats.ts` | Small |
| 6 | **Calculator quotes don't show totals in the enquiry.** You see items but not the one-time and monthly totals or the quote reference the customer has. | Medium | Show quote reference and totals on calculator enquiries | `EnquiriesPipeline.tsx`, `lib/enquiries.ts` | Small |
| 7 | Dashboard counts and latest enquiries are not clickable. | Low | Link each status count and each latest enquiry to the filtered list | `app/admin/(panel)/page.tsx` | Small |
| 8 | Every enquiry is a tall card with notes and date fields open, so the list gets long fast. There's no search. | Medium | A compact list (name, business, source, status, follow-up) that expands; search by name or phone | `EnquiriesPipeline.tsx` | Medium |
| 9 | Statuses show as raw lowercase words ("new", "won"), and "Saved." never clears. | Low | Capitalised labels with colour plus text; clear the message after a few seconds | `EnquiriesPipeline.tsx` | Small |
| 10 | No "View site" link, and no preview of how a content or price edit looks before saving. | Low | "View on site" link per section | `app/admin/(panel)/layout.tsx` | Small |
| 11 | The admin uses the marketing site's dark, rounded-card styling. design-taste-frontend's app-screen rules prefer quiet borders, compact tables and small labels for work screens. | Low | Restyle with the chosen direction's app variant later | `components/admin/*` | Medium |

---

## 9. Needs owner decision

1. **Design direction:** A (light "rate card", needs the dark-only rule in AGENTS.md changed), B (dark "enquiry arriving"), or C (dark clean-up).
2. **Guarantee details:** what counts as "first enquiries", how long the "agreed window" is, exclusions, how to claim.
3. **Sprint day-by-day timeline** and the reply times you can keep with a night-shift job.
4. **Comparison section:** whether to include it, and how to describe lead-listing apps and agencies (by category, not by name).
5. **Free enquiry check:** whether to offer it and the reply time.
6. **Who-it's-for list** of business types.
7. **Meet-the-person section:** your photo, hours, languages, and whether the About page keeps naming your day job and employer.
8. **Pricing page name:** keep /pricing or /services (merge and redirect the other).
9. **Ad spend guidance:** whether to suggest any minimum daily budget (price-adjacent).
10. **Payment terms:** payment methods, GST invoicing, refund and cancel policy.
11. **Wording on works:** dropping "built with AI" from ReelsXpress; client permission for screenshots of ReelsXpress and Manamantha.
12. **FAQ content:** the 8–10 real answers to enter in Admin → Content.
13. **Old pages:** whether the US/UK market pages and "Markets" footer stay linked from the India site.
14. **Meta ads delivery time:** a real number to replace "live within days of intake".

---

## 10. Skills used

frontend-design, design-taste-frontend (house rules, critique passes, copy rules), ui-ux-pro-max (priority table, design-system search for this brief), impeccable (modes: Persuade for public pages, Operate for admin; redesign vs refinement), ui-styling and design-system (token layers, shadcn/Tailwind idiom), hallmark (the Floor), better-interface (severity ladder and escalation triggers), emil-design-eng (animation decision framework, reduced motion, hover on touch), web-design-guidelines (its rules are fetched online at review time; not fetched for this review, so its checks are covered only through the overlapping items above).
