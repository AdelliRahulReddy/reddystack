import ArticleView from '@/components/views/ArticleView';
import type { TrustPageData } from '@/data/TrustPagesData';

/** Privacy policy, terms and revision policy on the reading layout. */
export default function TrustView({ page, path }: { page: TrustPageData; path: string }) {
  return (
    <ArticleView
      article={{
        title: page.title,
        label: page.subtitle,
        intro: page.intro,
        crumbs: [{ name: 'Home', href: '/' }, { name: page.title }],
        sections: page.sections,
        cta: { href: `/contact?source=${path}`, title: 'Questions about this policy?', body: 'Ask Rahul directly. Policies are part of the written scope for every project.' },
      }}
    />
  );
}
