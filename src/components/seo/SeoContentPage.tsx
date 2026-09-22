import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TrustPage from '@/components/trust/TrustPage';
import Wrapper from '@/layouts/Wrapper';
import { getSeoPage } from '@/data/SeoPagesData';
import { buildBreadcrumbSchema, buildCanonicalUrl, buildOpenGraph, buildTwitterCard, schemaIds, siteConfig } from '@/data/siteConfig';

export function seoContentMetadata(path: string): Metadata {
  const page = getSeoPage(path);
  if (!page) notFound();
  const title = `${page.title} | ${siteConfig.siteName}`;
  const url = buildCanonicalUrl(path);
  return {
    title, description: page.description,
    alternates: { canonical: url },
    openGraph: buildOpenGraph({ title, description: page.description, url, type: page.kind === 'guide' ? 'article' : 'website', ...(page.publishedAt ? { publishedTime: page.publishedAt, modifiedTime: page.updatedAt || page.publishedAt } : {}) }),
    twitter: buildTwitterCard({ title, description: page.description }),
  };
}

export default function SeoContentPage({ path }: { path: string }) {
  const page = getSeoPage(path);
  if (!page) notFound();
  const parents = [];
  let parentPath = page.parent;
  const rootLabels: Record<string, string> = { '/blog': 'Insights', '/service': 'Services', '/about': 'About', '/website-development': 'Website development' };
  while (parentPath !== '/') {
    const parent = getSeoPage(parentPath);
    parents.unshift({ name: parent?.title || rootLabels[parentPath] || parentPath.split('/').pop()!, path: parentPath });
    parentPath = parent?.parent || '/';
  }
  const url = buildCanonicalUrl(path);
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': page.kind === 'guide' ? 'BlogPosting' : page.kind === 'profile' ? 'ProfilePage' : page.kind === 'hub' ? 'CollectionPage' : 'WebPage',
    '@id': `${url}#webpage`, url, name: page.title, description: page.description,
    isPartOf: { '@id': schemaIds.website },
    ...(page.kind === 'guide' ? {
      headline: page.title, datePublished: page.publishedAt, dateModified: page.updatedAt || page.publishedAt,
      author: { '@type': 'Organization', '@id': schemaIds.organization, name: siteConfig.brandName, url: siteConfig.siteUrl },
      publisher: { '@id': schemaIds.organization }, mainEntityOfPage: url,
    } : page.kind === 'profile' ? {
      mainEntity: { '@type': 'Person', name: siteConfig.ownerName, jobTitle: 'Founder', worksFor: { '@id': schemaIds.organization } },
    } : {}),
  };
  return (
    <Wrapper>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([pageSchema, buildBreadcrumbSchema([{ name: 'Home', path: '/' }, ...parents, { name: page.title, path }])]).replace(/</g, '\\u003c') }} />
      <TrustPage page={page} breadcrumbs={[{ name: 'Home', path: '/' }, ...parents]} />
    </Wrapper>
  );
}
