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

export const contactBudgetOptions = [
  { id: "under_25k", title: "Under ₹25k" },
  { id: "25k_50k", title: "₹25k–₹50k" },
  { id: "50k_1l", title: "₹50k–₹1L" },
  { id: "1l_250k", title: "₹1L–₹2.5L" },
  { id: "above_250k", title: "₹2.5L+" },
] as const;

export const contactBudgetTitles = contactBudgetOptions.map(
  (budget) => budget.title,
);
