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
    answer: "Getting customers to enquire: landing pages and websites, Facebook & Instagram ads, ad images, getting found on Google, and making sure every enquiry reaches you. We choose what fits your main goal.",
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
    answer: "Prices for Indian businesses are public on the pricing page, in rupees. Projects outside India get a written quote before work begins. Ad spend and platform fees are separate, and your business keeps its own accounts.",
  },
  {
    id: 5,
    tab_id: "Faq5",
    question: "Can you guarantee results?",
    answer: "We do not promise a number of leads, sales or rankings: those depend on your offer, market and budget. The main offer for Indian businesses carries a written promise about going live with first enquiries; see the pricing page.",
  },
  {
    id: 6,
    tab_id: "Faq6",
    question: "How do I start?",
    answer: "Share your website, goal, one problem, and any budget or timing limits. You do not need to choose a service first.",
  }
];
