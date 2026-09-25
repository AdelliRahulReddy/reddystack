import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import BlogDetails from '@/components/blog-details';
import Wrapper from '@/layouts/Wrapper';
import SeoContentPage, { seoContentMetadata } from '@/components/seo/SeoContentPage';
import { getSeoPage, seoPages } from '@/data/SeoPagesData';
import {
  blogPosts,
  getAdjacentBlogPosts,
  getBlogPost,
  getRelatedBlogPosts,
} from '@/data/BlogPostsData';
import {
  buildBlogPostingSchema,
  buildBreadcrumbSchema,
  buildCanonicalUrl,
  buildOpenGraph,
  buildSeoImage,
  buildAssetUrl,
  buildTwitterCard,
} from '@/data/siteConfig';

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return [...blogPosts.map((post) => ({
    slug: post.slug,
  })), ...seoPages.filter((page) => page.path.startsWith('/blog/') && page.kind === 'hub').map((page) => ({ slug: page.path.split('/')[2] }))];
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (getSeoPage(`/blog/${slug}`)) return seoContentMetadata(`/blog/${slug}`);
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: 'Insight | ReddyStack',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalUrl = buildCanonicalUrl(post.path);

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: buildOpenGraph({
      title: post.metaTitle,
      description: post.metaDescription,
      type: 'article',
      url: canonicalUrl,
      images: [buildSeoImage(post.heroImage, post.title)],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author.name],
    }),
    twitter: buildTwitterCard({
      title: post.metaTitle,
      description: post.metaDescription,
      images: [buildAssetUrl(post.heroImage)],
    }),
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  if (getSeoPage(`/blog/${slug}`)) return <SeoContentPage path={`/blog/${slug}`} />;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const { previousPost, nextPost } = getAdjacentBlogPosts(slug);
  const [relatedPost] = getRelatedBlogPosts(slug, 1);

  if (!previousPost || !nextPost) {
    notFound();
  }

  const blogPostingSchema = buildBlogPostingSchema(post);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/blog' },
    { name: post.title, path: post.path },
  ]);

  return (
    <Wrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <BlogDetails
        post={post}
        previousPost={previousPost}
        nextPost={nextPost}
        relatedPost={relatedPost || null}
      />
    </Wrapper>
  );
};

export default BlogPostPage;
