import Wrapper from "@/layouts/Wrapper";
import TrustPage from "@/components/trust/TrustPage";
import MarketPreference from "@/components/country/MarketPreference";
import { marketPages } from "@/data/MarketPageData";
import { marketPageSchema } from "@/data/MarketSeo";
import type { Market } from "@/data/MarketConfig";
import { buildBreadcrumbSchema } from "@/data/siteConfig";

export default function MarketLandingPage({ market }: { market: Market }) {
  const page = marketPages[market.code];
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
      <TrustPage
        page={page}
        className="tp-market-page"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: market.name, path: market.href },
        ]}
      />
    </Wrapper>
  );
}
