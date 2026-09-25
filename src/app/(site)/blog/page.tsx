import BlogIndexView from '@/components/views/BlogIndexView';
import { buildBreadcrumbSchema, buildPageMetadata, siteSeo } from '@/data/siteConfig';
import { blogCategories, blogPosts } from '@/data/BlogPostsData';
import { seoPages } from '@/data/SeoPagesData';

type Props = { searchParams: Promise<{ q?: string | string[]; category?: string | string[] }> };
const queryFrom = (value?: string | string[]) => (Array.isArray(value) ? value[0] : value || '').trim().slice(0, 120);
const categoryFrom = (value?: string | string[]) => (Array.isArray(value) ? value[0] : value || '').trim().slice(0, 80);

const categoryLabelFor = (categoryKey: string) =>
  blogCategories.find((category) => category.key === categoryKey)?.label || 'Category';

export async function generateMetadata({ searchParams }: Props) {
  const params = await searchParams;
  const query = queryFrom(params.q);
  const categoryKey = categoryFrom(params.category);
  const categoryLabel = categoryLabelFor(categoryKey);
  const title = categoryKey
    ? categoryLabel + ' articles | ' + siteSeo.siteName
    : 'Search articles | ' + siteSeo.siteName;

  return {
    ...buildPageMetadata('blog'),
    ...(query || categoryKey
      ? { title, robots: { index: false, follow: true } }
      : {}),
  };
}

const index = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const query = queryFrom(params.q);
  const categoryKey = categoryFrom(params.category);
  const categoryLabel = categoryLabelFor(categoryKey);

  if (query || categoryKey) {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const categoryPosts = categoryKey
      ? blogPosts.filter((post) => post.categoryKey === categoryKey)
      : blogPosts;
    const searchablePages = categoryKey
      ? []
      : seoPages
          .filter((page) => page.kind === 'guide')
          .map((page) => ({ title: page.title, path: page.path, text: page.title + ' ' + page.description, note: page.description, kind: 'Guide' }));
    const results = [
      ...categoryPosts.map((post) => ({
        title: post.title,
        path: post.path,
        text: post.title + ' ' + post.excerpt + ' ' + post.tags.join(' '),
        note: post.excerpt,
        kind: post.categoryLabel,
      })),
      ...searchablePages,
    ].filter((page) => terms.every((term) => page.text.toLowerCase().includes(term)));

    const resultLinks = results.map(({ title, path, note, kind }) => ({ title, path, note, kind }));
    const heading = categoryKey ? categoryLabel + ' articles' : 'Search articles';
    const intro = results.length + ' ' + (results.length === 1 ? 'article' : 'articles') +
      (categoryKey ? ' in ' + categoryLabel : '') +
      (query ? ' found for “' + query + '”.' : '.');

    return (
      <BlogIndexView mode="results" query={query} categoryKey={categoryKey} heading={heading} summary={intro} results={resultLinks} />
    );
  }

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/blog' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogIndexView mode="index" />
    </>
  );
};

export default index;
