// Budget brackets the enquirer chooses from. They describe the enquirer's budget, not ReddyStack prices.
// INR titles are unchanged from earlier versions so past enquiries and reports stay comparable.
export const contactBudgetOptions = [
  { id: "under_25k", title: "Under ₹25k" },
  { id: "25k_50k", title: "₹25k–₹50k" },
  { id: "50k_1l", title: "₹50k–₹1L" },
  { id: "1l_250k", title: "₹1L–₹2.5L" },
  { id: "above_250k", title: "₹2.5L+" },
] as const;

/** Every budget value the API accepts (besides "Not specified"). */
export const contactBudgetTitles: string[] = contactBudgetOptions.map((option) => option.title);
