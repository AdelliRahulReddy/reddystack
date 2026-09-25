import ArticleView from '@/components/views/ArticleView';
import FounderView from '@/components/views/FounderView';
import HubView, { hubService } from '@/components/views/HubView';
import { getServiceDetail } from '@/data/ServiceDetailData';
import { getSeoContext, seoContentMetadata } from './seoContent';

export { seoContentMetadata };

/** Renders an entry from seo-pages.json with the view for its kind (guide, hub or profile). */
export default function SeoContentPage({ path }: { path: string }) {
  const ctx = getSeoContext(path);
  const { page, parents, relatedGuides } = ctx;

  if (page.kind === 'profile') return <FounderView ctx={ctx} />;
  if (page.kind === 'hub') return <HubView ctx={ctx} />;

  const hub = parents[parents.length - 1];
  const service = getServiceDetail(hubService[page.parent.split('/')[2] ?? ''] ?? '');
  const contactParams = new URLSearchParams({ ...(service ? { service: service.contactService || service.slug } : {}), source: path });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ctx.schemaJson }} />
      <ArticleView
        article={{
          title: page.title,
          label: hub?.name ?? 'Insights',
          intro: page.intro,
          crumbs: [{ name: 'Home', href: '/' }, ...parents.map((p) => ({ name: p.name, href: p.path })), { name: page.title }],
          byline: page.kind === 'guide',
          publishedAt: page.publishedAt,
          updatedAt: page.updatedAt,
          sections: page.sections,
          related: relatedGuides.map((g) => ({ title: g.title, path: g.path, note: g.description })),
          relatedService: service ? { title: service.title, path: service.path } : undefined,
          cta: {
            href: `/contact?${contactParams}`,
            title: 'Want a second pair of eyes on it?',
            body: 'Send what you are seeing and what you have already checked. Rahul will say what to look at first, and whether a Proof Sprint makes sense.',
          },
        }}
      />
    </>
  );
}
