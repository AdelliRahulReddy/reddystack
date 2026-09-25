import MarketLandingPage from "@/components/country/MarketLandingPage";
import { getMarketByCode } from "@/data/MarketConfig";
import { marketMetadata } from "@/data/MarketSeo";

const market = getMarketByCode("in")!;

export const metadata = marketMetadata(market);

export default function Page() {
  return <MarketLandingPage market={market} />;
}
