import PricingPage from "@/components/pricing/PricingPage";
import Wrapper from "@/layouts/Wrapper";
import {
  buildBreadcrumbSchema,
  buildFAQPageSchema,
  buildPageMetadata,
  buildCanonicalUrl,
  pageSeo,
  schemaIds,
  serviceOfferCatalogSchema,
} from "@/data/siteConfig";

export const metadata = buildPageMetadata("pricing");

const pricingFaqItems = [
  {
    question: "Which engagement should I start with?",
    answer:
      "Start with the problem, not the package. A Proof Sprint fits one important unknown or bottleneck. A Stack Build fits a defined implementation that needs several connected capabilities. Operate and Improve fits a working system that needs ongoing testing and decisions. Rahul recommends the smallest engagement that can still produce a useful result.",
  },
  {
    question: "What does a Proof Sprint include?",
    answer:
      "The sprint defines one decision, establishes the current baseline, completes a focused audit, build, fix, or test, and records the evidence and limitations. Its output depends on the problem and can include a landing path, search repair, tracking check, campaign test, creative comparison, or workflow prototype. It is bounded work, not an unlimited trial retainer.",
  },
  {
    question: "Are media spend and platform costs included?",
    answer:
      "No unless the proposal explicitly states otherwise. Advertising spend, hosting, domains, paid tools, stock, model usage, and other third-party costs remain visible and separate from ReddyStack fees. The client keeps ownership of the relevant accounts and approves spending boundaries before launch.",
  },
  {
    question: "Is the work one-off or ongoing?",
    answer:
      "A Proof Sprint and Stack Build can be bounded projects. Operate and Improve is ongoing work with agreed priorities, reporting, and review periods. A completed project does not silently include indefinite monitoring, optimisation, new assets, or support; the proposal states what continues and what ends at handover.",
  },
];

const pricingPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${buildCanonicalUrl("/pricing")}#webpage`,
  name: pageSeo.pricing.title,
  url: buildCanonicalUrl("/pricing"),
  description: pageSeo.pricing.description,
  isPartOf: {
    "@id": schemaIds.website,
  },
  about: {
    "@id": schemaIds.offerCatalog,
  },
};

const PricingRoute = () => {
  const faqSchema = buildFAQPageSchema(pricingFaqItems, "/pricing");
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Ways to Work", path: "/pricing" },
  ]);

  return (
    <Wrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceOfferCatalogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PricingPage />
    </Wrapper>
  );
};

export default PricingRoute;
