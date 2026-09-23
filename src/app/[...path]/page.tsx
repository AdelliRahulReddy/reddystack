import SeoContentPage, { seoContentMetadata } from '@/components/seo/SeoContentPage';
import { seoPages } from '@/data/SeoPagesData';
import MarketLandingPage from '@/components/country/MarketLandingPage';
import { getMarketByCode, markets } from '@/data/MarketConfig';
import { marketMetadata } from '@/data/MarketSeo';

type Props = { params: Promise<{ path: string[] }> };
export function generateStaticParams() {
  return [
    ...seoPages.filter((page) => !page.path.startsWith('/blog/') && !page.path.startsWith('/service/')).map((page) => ({ path: page.path.slice(1).split('/') })),
    ...markets.map((market) => ({ path: [market.code] })),
  ];
}
export async function generateMetadata({ params }: Props) {
  const segments = (await params).path;
  const market = segments.length === 1 ? getMarketByCode(segments[0]) : undefined;
  return market ? marketMetadata(market) : seoContentMetadata(`/${segments.join('/')}`);
}
export default async function Page({ params }: Props) {
  const segments = (await params).path;
  const market = segments.length === 1 ? getMarketByCode(segments[0]) : undefined;
  return market ? <MarketLandingPage market={market} /> : <SeoContentPage path={`/${segments.join('/')}`} />;
}
