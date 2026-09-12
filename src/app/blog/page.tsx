import BlogSidebar from '@/components/blog-sidebar';
import Wrapper from '@/layouts/Wrapper';
import React from 'react';
import { buildBreadcrumbSchema, buildPageMetadata } from '@/data/siteConfig';
import { blogPosts } from '@/data/BlogPostsData';
import { seoPages } from '@/data/SeoPagesData';
import TrustPage from '@/components/trust/TrustPage';
import ArticleSearch from '@/components/blog-sidebar/ArticleSearch';


type Props = { searchParams: Promise<{ q?: string | string[] }> };
const queryFrom = (q?: string | string[]) => (Array.isArray(q) ? q[0] : q || '').trim().slice(0, 120);
export async function generateMetadata({ searchParams }: Props) {
  const query = queryFrom((await searchParams).q);
  return { ...buildPageMetadata('blog'), ...(query ? { title: 'Search articles | Reddystack', robots: { index: false, follow: true } } : {}) };
}


const index = async ({ searchParams }: Props) => {
  const query = queryFrom((await searchParams).q);
  if (query) {
    const terms = query.toLowerCase().split(/\s+/);
    const results = [
      ...blogPosts.map((post) => ({ title: post.title, path: post.path, text: `${post.title} ${post.excerpt} ${post.tags.join(' ')}` })),
      ...seoPages.filter((page) => page.kind === 'guide').map((page) => ({ title: page.title, path: page.path, text: `${page.title} ${page.description}` })),
    ].filter((page) => terms.every((term) => page.text.toLowerCase().includes(term)));
    return <Wrapper><TrustPage breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Insights', path: '/blog' }]} page={{
      title: 'Search articles', subtitle: 'Reddystack Insights', intro: `${results.length} ${results.length === 1 ? 'article' : 'articles'} found for “${query}”.`,
      sections: [{ title: results.length ? 'Matching articles' : 'No articles found', body: results.length ? [] : ['Try a service name such as Meta Ads, SEO or website development.'], links: results }, { title: 'Browse all topics', body: [], links: [{ title: 'Return to Insights', path: '/blog' }] }],
    }}><ArticleSearch query={query} /></TrustPage></Wrapper>;
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
