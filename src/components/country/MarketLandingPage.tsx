import MarketPreference from "@/components/country/MarketPreference";
import { marketPageSchema } from "@/data/MarketSeo";
import type { Market } from "@/data/MarketConfig";
import { buildBreadcrumbSchema, buildFAQPageSchema } from "@/data/siteConfig";
import { homeFaqItems } from "@/data/HomeFaqData";
import { featuredPortfolioProjects } from "@/data/FeaturedPortfolioProjects";
import HomeV3 from "@/components/home-v3/HomeV3";

export default function MarketLandingPage({ market }: { market: Market }) {
  const faqSchema = buildFAQPageSchema(homeFaqItems, market.href);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: market.name, path: market.href },
  ]);

  return (
    <>
      <MarketPreference code={market.code} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(marketPageSchema(market)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeV3 projects={featuredPortfolioProjects} market={market} />
    </>
  );
}
