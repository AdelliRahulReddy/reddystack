import ArticleView from '@/components/views/ArticleView';
import type { BlogPost } from '@/data/BlogPostsData';

const relatedPageByCategory: Record<BlogPost['categoryKey'], { title: string; path: string }> = {
  'seo-websites': { title: 'website development services', path: '/website-development' },
  applications: { title: 'custom web application development', path: '/custom-web-application-development-services' },
  'mvp-builds': { title: 'MVP development services', path: '/mvp-development-for-startup-founders' },
  'ai-automations': { title: 'AI automation services', path: '/ai-automation' },
};

type Props = { post: BlogPost; previous: BlogPost; next: BlogPost; related: BlogPost | null };

/** The eight historical articles, on the same reading layout as the guides. */
export default function BlogPostView({ post, previous, next, related }: Props) {
  return (
    <ArticleView
      article={{
        title: post.title,
        label: post.categoryLabel,
        intro: post.excerpt,
        crumbs: [{ name: 'Home', href: '/' }, { name: 'Insights', href: '/blog' }, { name: post.title }],
        byline: true,
        publishedAt: post.publishedAt,
        updatedAt: post.updatedAt,
        heroImage: post.heroImage,
        lede: [...post.leadParagraphs],
        sections: [
          {
            title: post.sectionTitle,
            body: post.sectionParagraphsBeforeImage,
            // Several posts reuse the cover as the body image; show it once.
            image: post.detailImage.src !== post.heroImage.src ? { src: post.detailImage, alt: post.title } : undefined,
            bodyAfter: post.sectionParagraphsAfterImage,
            quote: post.quote,
          },
          { body: post.closingParagraphs },
        ],
        tags: post.tags,
        relatedService: relatedPageByCategory[post.categoryKey],
        related: related ? [{ title: related.title, path: related.path, note: related.excerpt }] : undefined,
        relatedTitle: 'Related article',
        previous: { title: previous.title, path: previous.path },
        next: { title: next.title, path: next.path },
        cta: { href: `/contact?source=${post.path}` },
        toc: false,
      }}
    />
  );
}
