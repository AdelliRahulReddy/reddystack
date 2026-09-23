export type HomeFaqItem = {
  id: number;
  tab_id: string;
  question: string;
  answer: string;
};

export const homeFaqItems: HomeFaqItem[] = [
  {
    id: 1,
    tab_id: "Faq1",
    question: "What can ReddyStack help with?",
    answer: "ReddyStack helps with websites, SEO, Meta and Google Ads, ad creative, AI video, and automation. We choose what fits your main goal.",
  },
  {
    id: 2,
    tab_id: "Faq2",
    question: "Who is ReddyStack for?",
    answer: "Founders, growing brands, and established teams with a clear offer and one important digital growth problem.",
  },
  {
    id: 3,
    tab_id: "Faq3",
    question: "How does the work start?",
    answer: "We agree on one goal, review the current setup, and define the scope and baseline before building or testing.",
  },
  {
    id: 4,
    tab_id: "Faq4",
    question: "How much does it cost?",
    answer: "Each project gets a custom quote before work begins. Advertising spend and platform fees are separate; your business keeps ownership of its accounts.",
  },
  {
    id: 5,
    tab_id: "Faq5",
    question: "Can you guarantee results?",
    answer: "No. Results depend on your offer, market, budget, and sales process. I commit to the agreed work, clear reporting, and an honest review.",
  },
  {
    id: 6,
    tab_id: "Faq6",
    question: "How do I start?",
    answer: "Share your website, goal, one problem, and any budget or timing limits. You do not need to choose a service first.",
  }
];
