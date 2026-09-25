import SeoContentPage, { seoContentMetadata } from '@/components/seo/SeoContentPage';

const path = '/about/rahul-reddy-adelli';

export const metadata = seoContentMetadata(path);

export default function Page() {
  return <SeoContentPage path={path} />;
}
