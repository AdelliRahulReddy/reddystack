import Wrapper from "@/layouts/Wrapper";
import HomeOne from "@/components/homes/home";
import MarketPreference from "@/components/country/MarketPreference";
import { marketPageSchema } from "@/data/MarketSeo";
import type { Market } from "@/data/MarketConfig";
import { buildBreadcrumbSchema } from "@/data/siteConfig";

export default function MarketLandingPage({ market }: { market: Market }) {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: market.name, path: market.href },
  ]);

  return (
    <Wrapper>
      <MarketPreference code={market.code} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(marketPageSchema(market)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <HomeOne market={market} />
    </Wrapper>
  );
}
