export const contactCategories = [
  { id: "proof-sprint", title: "Proof Sprint" },
  { id: "meta-ads", title: "Paid Acquisition — Meta" },
  { id: "google-ads", title: "Paid Acquisition — Google" },
  { id: "ad-creatives", title: "Creative & Conversion" },
  { id: "ai-ugc-videos", title: "AI-Assisted Video" },
  { id: "seo-websites", title: "Website & Tracking Foundation" },
  { id: "seo-local-seo", title: "Search Visibility" },
  { id: "additional", title: "Automation or Product Build" },
  { id: "not_sure", title: "Start With the Bottleneck" },
] as const;

export const contactCategoryTitles = contactCategories.map(
  (category) => category.title,
);

// Budget brackets the enquirer chooses from. They describe the enquirer's budget, not ReddyStack prices.
// INR titles are unchanged from earlier versions so past enquiries and reports stay comparable.
export const contactBudgetCurrencies = [
  {
    code: "USD",
    label: "USD",
    options: [
      { id: "usd_under_1k", title: "Under $1,000" },
      { id: "usd_1k_2_5k", title: "$1,000–$2,500" },
      { id: "usd_2_5k_5k", title: "$2,500–$5,000" },
      { id: "usd_5k_10k", title: "$5,000–$10,000" },
      { id: "usd_above_10k", title: "$10,000+" },
    ],
  },
  {
    code: "GBP",
    label: "GBP",
    options: [
      { id: "gbp_under_750", title: "Under £750" },
      { id: "gbp_750_2k", title: "£750–£2,000" },
      { id: "gbp_2k_4k", title: "£2,000–£4,000" },
      { id: "gbp_4k_8k", title: "£4,000–£8,000" },
      { id: "gbp_above_8k", title: "£8,000+" },
    ],
  },
  {
    code: "INR",
    label: "INR",
    options: [
      { id: "under_25k", title: "Under ₹25k" },
      { id: "25k_50k", title: "₹25k–₹50k" },
      { id: "50k_1l", title: "₹50k–₹1L" },
      { id: "1l_250k", title: "₹1L–₹2.5L" },
      { id: "above_250k", title: "₹2.5L+" },
    ],
  },
] as const;

export type ContactCurrency = (typeof contactBudgetCurrencies)[number]["code"];

/** Every budget value the API accepts (besides "Not specified"). */
export const contactBudgetTitles: string[] = contactBudgetCurrencies.flatMap((currency) =>
  currency.options.map((option) => option.title),
);
