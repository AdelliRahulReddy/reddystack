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
    question: "What is the starting price for a ReddyStack website?",
    answer:
      "A focused starter website can start at Rs. 9,999 when the scope is limited to a simple one-page build or starter presence. Small business websites usually start from Rs. 14,999, and SEO-ready multi-page builds usually start from Rs. 24,999 depending on content depth and sections.",
  },
  {
    question: "How are app and MVP projects priced?",
    answer:
      "App and MVP pricing depends on screens, user flows, roles, integrations, backend logic, and launch requirements. Small MVP scopes usually start from Rs. 49,999+ after the first useful release is defined.",
  },
  {
    question: "Do prices include SEO setup?",
    answer:
      "SEO-ready builds can include metadata, heading structure, sitemap, schema, internal links, speed checks, and crawlability basics. Ongoing SEO campaigns or content retainers should be scoped separately.",
  },
  {
    question: "Can ReddyStack work with clients outside India?",
    answer:
      "Yes. ReddyStack is online-first and can work with startups, creators, founders, and small businesses across India and worldwide through a remote-friendly process.",
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
    { name: "Pricing", path: "/pricing" },
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
