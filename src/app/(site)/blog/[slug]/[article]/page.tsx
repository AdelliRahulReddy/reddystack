import SeoContentPage, { seoContentMetadata } from '@/components/seo/SeoContentPage';
import { seoPages } from '@/data/SeoPagesData';

type Props = { params: Promise<{ slug: string; article: string }> };
export function generateStaticParams() {
  return seoPages.filter((page) => page.kind === 'guide').map((page) => ({ slug: page.path.split('/')[2], article: page.path.split('/')[3] }));
}
export async function generateMetadata({ params }: Props) { const { slug, article } = await params; return seoContentMetadata(`/blog/${slug}/${article}`); }
export default async function Page({ params }: Props) { const { slug, article } = await params; return <SeoContentPage path={`/blog/${slug}/${article}`} />; }
