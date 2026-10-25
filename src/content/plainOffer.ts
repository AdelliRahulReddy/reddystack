// Plain-words copy for the offer, written for a business owner with no
// marketing background. Wording only: names, prices and the guarantee itself
// always come from the database (bundles, services, settings).

export const offerHeadline = 'More customer enquiries, set up in 7 days.';

export const offerSentence =
  'We set up a simple page, run Facebook & Instagram ads for you, and make sure every WhatsApp chat, call and form reaches you.';

/** What the lead offer includes, in plain words (the database description stays the formal version). */
export const offerIncludes = [
  { title: 'Your own enquiry page', body: 'A simple page, or a direct WhatsApp route, that says what you offer and lets customers reach you in one tap.' },
  { title: 'Facebook & Instagram ads', body: 'One ad campaign shown to people near you who are likely to buy.' },
  { title: 'Ad images made for you', body: 'Ready-to-run images for the ads, in your colours and with your offer.' },
  { title: 'You see every enquiry', body: 'Set up so you know which ad brought each WhatsApp chat, call or form.' },
  { title: '7 days of improvements', body: 'We keep improving the ads for 7 days and send written updates. No daily calls needed.' },
  { title: 'One plain report', body: 'What was spent, how many enquiries came in, and what to do next.' },
] as const;

/** The customer journey the explainer animates. */
export const journeySteps = [
  { title: 'A customer sees your ad', body: 'On Facebook or Instagram, near where you work.' },
  { title: 'They message, call or fill a form', body: 'Whichever is easiest for them: WhatsApp, a call or a short form.' },
  { title: 'You get the enquiry', body: 'On your phone, with the ad it came from, ready to reply.' },
] as const;

/** Plain names for the doors a customer can use. */
export const enquiryDoors = ['WhatsApp chats', 'Phone calls', 'Instagram messages', 'Form fills'] as const;

/** How a project runs (Process page and homepage). The advance percentage comes from settings. */
export const processSteps = [
  { title: 'Tell us what you need', body: 'Pick the services in the price calculator, or just describe your business. We agree the exact work and price before anything starts.' },
  { title: 'Pay the advance', body: 'The advance books the work. The rest is paid on delivery.' },
  { title: 'We build and run it', body: 'We do the work and send written updates as we go. You review at agreed points, with no daily calls needed.' },
  { title: 'You get the report', body: 'You receive everything agreed, plus a plain summary of what was done and what to check next.' },
] as const;
