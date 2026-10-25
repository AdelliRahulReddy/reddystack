// Plain-words copy for the offer, written for a business owner with no
// marketing background. Wording only: names, prices and the guarantee itself
// always come from the database (bundles, services, settings).

export const offerHeadline = 'More customer enquiries, set up in 7 days.';

export const offerSentence =
  'We set up a simple page, run Facebook & Instagram ads for you, and make sure every WhatsApp chat, call and form reaches you.';

/** Public display name of the lead offer. The database bundle name is unchanged; pages show this label. */
export const planLabel = '7-day enquiry plan';

/** What the lead offer includes, in plain words (the database description stays the formal version). */
export const offerIncludes = [
  { title: 'Your enquiry page', body: 'One tap to WhatsApp, call or a form.' },
  { title: 'Facebook & Instagram ads', body: 'One campaign, shown to people near you.' },
  { title: 'Ad images made for you', body: 'In your colours, with your offer.' },
  { title: 'Every enquiry tracked', body: 'You see which ad brought it.' },
  { title: '7 days of improvements', body: 'Written updates, no daily calls.' },
  { title: 'One plain report', body: 'Spend, enquiries and what to do next.' },
] as const;

/** The customer journey the explainer animates. */
export const journeySteps = [
  { title: 'A customer sees your ad', body: 'On Facebook or Instagram, near where you work.' },
  { title: 'They message, call or fill a form', body: 'WhatsApp, a call or a short form.' },
  { title: 'The enquiry reaches your phone', body: 'With the ad it came from, ready to reply.' },
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
