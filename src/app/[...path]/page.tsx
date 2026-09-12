import SeoContentPage, { seoContentMetadata } from '@/components/seo/SeoContentPage';
import { seoPages } from '@/data/SeoPagesData';

type Props = { params: Promise<{ path: string[] }> };
export function generateStaticParams() {
  return seoPages.filter((page) => !page.path.startsWith('/blog/') && !page.path.startsWith('/service/')).map((page) => ({ path: page.path.slice(1).split('/') }));
}
export async function generateMetadata({ params }: Props) { return seoContentMetadata(`/${(await params).path.join('/')}`); }
export default async function Page({ params }: Props) { return <SeoContentPage path={`/${(await params).path.join('/')}`} />; }
