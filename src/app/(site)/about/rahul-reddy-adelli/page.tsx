import FounderView from '@/components/views/FounderView';
import { getSeoContext, seoContentMetadata } from '@/components/seo/seoContent';

const path = '/about/rahul-reddy-adelli';

export const metadata = seoContentMetadata(path);

export default function Page() {
  return <FounderView ctx={getSeoContext(path)} />;
}
