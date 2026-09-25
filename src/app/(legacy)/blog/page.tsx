import BlogSidebar from '@/components/blog-sidebar';
import Wrapper from '@/layouts/Wrapper';
import React from 'react';
import { buildBreadcrumbSchema, buildPageMetadata, siteSeo } from '@/data/siteConfig';
import { blogCategories, blogPosts } from '@/data/BlogPostsData';
import { seoPages } from '@/data/SeoPagesData';
import TrustPage from '@/components/trust/TrustPage';
import ArticleSearch from '@/components/blog-sidebar/ArticleSearch';

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
          .map((page) => ({ title: page.title, path: page.path, text: page.title + ' ' + page.description }));
    const results = [
      ...categoryPosts.map((post) => ({
        title: post.title,
        path: post.path,
        text: post.title + ' ' + post.excerpt + ' ' + post.tags.join(' '),
      })),
      ...searchablePages,
    ].filter((page) => terms.every((term) => page.text.toLowerCase().includes(term)));

    const resultLinks = results.map(({ title, path }) => ({ title, path }));
    const heading = categoryKey ? categoryLabel + ' articles' : 'Search articles';
    const intro = results.length + ' ' + (results.length === 1 ? 'article' : 'articles') +
      (categoryKey ? ' in ' + categoryLabel : '') +
      (query ? ' found for “' + query + '”.' : '.');

    return (
      <Wrapper>
        <TrustPage
          breadcrumbs={[
            { name: 'Home', path: '/' },
            { name: 'Insights', path: '/blog' },
          ]}
          page={{
            title: heading,
            subtitle: siteSeo.siteName + ' Insights',
            intro,
            sections: [
              {
                title: resultLinks.length ? 'Matching articles' : 'No articles found',
                body: resultLinks.length
                  ? []
                  : ['Try another topic or return to the main Insights page.'],
                links: resultLinks,
              },
              {
                title: 'Browse all topics',
                body: [],
                links: [{ title: 'Return to Insights', path: '/blog' }],
              },
            ],
          }}
        >
          <ArticleSearch query={query} />
        </TrustPage>
      </Wrapper>
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
      <Wrapper>
        <BlogSidebar />
      </Wrapper>
    </>
  );
};

export default index;
