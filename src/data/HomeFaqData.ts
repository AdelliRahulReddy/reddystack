export type HomeFaqItem = {
  id: number;
  tab_id: string;
  question: string;
  answer: string;
  some_features: string[];
};

export const homeFaqItems: HomeFaqItem[] = [
  {
    id: 1,
    tab_id: "Faq1",
    question: "What does proof-first digital growth mean?",
    answer: "It means ReddyStack starts with the business problem and available evidence before recommending a channel. We establish the current position, choose the smallest credible build or test, record what changed, and use that evidence to decide whether to continue, revise, expand, or stop. Proof is not a guarantee; it is a clearer basis for the next decision.",
    some_features: ["Baseline", "Focused Build", "Evidence", "Next Decision"],
  },
  {
    id: 2,
    tab_id: "Faq2",
    question: "What size of company can work with ReddyStack?",
    answer: "Company size is not the filter. ReddyStack can work with a founder, growing brand, established company, or a focused team inside a larger organisation. The better fit is a real offer, one important digital growth problem, access to the people and accounts needed for the work, and willingness to measure the result honestly.",
    some_features: ["Startups", "Growing Brands", "Established Companies", "Remote Delivery"],
  },
  {
    id: 3,
    tab_id: "Faq3",
    question: "How is ReddyStack different from a general agency?",
    answer: "ReddyStack does not begin by selling six unrelated services or placing every client into the same retainer. Rahul identifies the bottleneck, selects only the capabilities needed, remains the direct point of accountability, and records the evidence behind each next step. Specialists may support a defined requirement later, but responsibility does not disappear behind an account-management layer.",
    some_features: ["Problem First", "Connected Scope", "Direct Accountability"],
  },
  {
    id: 4,
    tab_id: "Faq4",
    question: "How does ReddyStack use AI?",
    answer: "AI can support research, prototyping, development, analysis, production, and repetitive workflows. It is not presented as a substitute for business judgment or as proof of expertise. Rahul remains responsible for checking the work, explaining relevant AI use, protecting access boundaries, and making sure generated content is not presented as a real customer experience when it is not.",
    some_features: ["Transparent Use", "Human Review", "Clear Boundaries"],
  },
  {
    id: 5,
    tab_id: "Faq5",
    question: "What happens in a Proof Sprint?",
    answer: "A Proof Sprint is a bounded first engagement around one decision or bottleneck. It can include an audit, baseline, focused implementation, controlled test, and evidence summary. The exact output depends on the problem: a landing-page path, technical search fix, tracking repair, campaign test, creative comparison, or workflow prototype. It should produce a useful result even when the next decision is not to scale.",
    some_features: ["Defined Problem", "Bounded Scope", "Evidence Summary"],
  },
  {
    id: 6,
    tab_id: "Faq6",
    question: "How do pricing, ownership, and revisions work?",
    answer: "Every engagement receives a custom quote naming the problem, deliverables, evidence plan, client inputs, review rounds, fees, exclusions, and separate platform costs. Your business keeps ownership of its domain, hosting, advertising, analytics, and other core accounts. Additional pages, campaigns, features, or concepts are discussed as scope changes before the work expands.",
    some_features: ["Custom Scope", "Client Ownership", "Clear Changes"],
  },
  {
    id: 7,
    tab_id: "Faq7",
    question: "Can ReddyStack guarantee growth, leads, sales, or rankings?",
    answer: "No. Outcomes also depend on the offer, demand, competition, budget, website, sales process, and follow-through. ReddyStack commits to the agreed work, quality checks, transparent reporting, and an honest interpretation of the evidence. A short spike, one low-cost lead, or a ranking screenshot is not treated as proof of repeatable commercial growth.",
    some_features: ["No False Guarantees", "Meaningful Metrics", "Honest Reporting"],
  },
  {
    id: 8,
    tab_id: "Faq8",
    question: "How do I start?",
    answer: "Send one problem, your website or product link, the outcome you want, what has already been tried, and any budget or deadline boundary. You do not need to choose a service first. Rahul will review whether the next step should be a Proof Sprint, a connected Stack Build, ongoing work, or no engagement yet. Do not send passwords, payment details, or private customer records through the form.",
    some_features: ["One Problem", "Current Evidence", "Clear Next Step"],
  }
];
