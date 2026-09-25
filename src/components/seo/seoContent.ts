import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getSeoPage, seoPages, type SeoContentPage } from '@/data/SeoPagesData';
import { buildBreadcrumbSchema, buildCanonicalUrl, buildOpenGraph, buildTwitterCard, schemaIds, siteConfig } from '@/data/siteConfig';

export type Crumb = { name: string; path: string };

export function seoContentMetadata(path: string): Metadata {
  const page = getSeoPage(path);
  if (!page) notFound();
  const title = page.title + ' | ' + siteConfig.brandName;
  const url = buildCanonicalUrl(path);
  return {
    title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: buildOpenGraph({
      title,
      description: page.description,
      url,
      type: page.kind === 'guide' ? 'article' : 'website',
      ...(page.publishedAt
        ? { publishedTime: page.publishedAt, modifiedTime: page.updatedAt || page.publishedAt }
        : {}),
    }),
    twitter: buildTwitterCard({ title, description: page.description }),
  };
}

const rootLabels: Record<string, string> = {
  '/blog': 'Insights',
  '/service': 'Capabilities',
  '/about': 'About',
  '/website-development': 'Website development',
};

/** Everything a view needs for an SEO content page: the page, its ancestors, related guides and JSON-LD. */
export function getSeoContext(path: string) {
  const page = getSeoPage(path);
  if (!page) notFound();

  const parents: Crumb[] = [];
  let parentPath = page.parent;
  while (parentPath !== '/') {
    const parent = getSeoPage(parentPath);
    parents.unshift({
      name: parent?.title || rootLabels[parentPath] || parentPath.split('/').pop()!,
      path: parentPath,
    });
    parentPath = parent?.parent || '/';
  }

  const existingLinkPaths = new Set(page.sections.flatMap((section) => (section.links || []).map((link) => link.path)));
  const relatedGuides: SeoContentPage[] =
    page.kind === 'guide'
      ? seoPages
          .filter((c) => c.kind === 'guide' && c.parent === page.parent && c.path !== path && !existingLinkPaths.has(c.path))
          .slice(0, 2)
      : [];

  const url = buildCanonicalUrl(path);
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type':
      page.kind === 'guide'
        ? 'BlogPosting'
        : page.kind === 'profile'
          ? 'ProfilePage'
          : page.kind === 'hub'
            ? 'CollectionPage'
            : 'WebPage',
    '@id': url + '#webpage',
    url,
    name: page.title,
    description: page.description,
    isPartOf: { '@id': schemaIds.website },
    ...(page.kind === 'guide'
      ? {
          headline: page.title,
          datePublished: page.publishedAt,
          dateModified: page.updatedAt || page.publishedAt,
          author: {
            '@type': 'Person',
            '@id': buildCanonicalUrl('/about/rahul-reddy-adelli') + '#person',
            name: siteConfig.ownerName,
            jobTitle: 'Founder',
            url: buildCanonicalUrl('/about/rahul-reddy-adelli'),
            worksFor: { '@id': schemaIds.organization },
          },
          publisher: { '@id': schemaIds.organization },
          mainEntityOfPage: url,
        }
      : page.kind === 'profile'
        ? {
            mainEntity: {
              '@type': 'Person',
              name: siteConfig.ownerName,
              jobTitle: 'Founder',
              worksFor: { '@id': schemaIds.organization },
            },
          }
        : {}),
  };

  const schemaJson = JSON.stringify([
    pageSchema,
    buildBreadcrumbSchema([{ name: 'Home', path: '/' }, ...parents, { name: page.title, path }]),
  ]).replace(/</g, '\\u003c');

  return { page, parents, relatedGuides, schemaJson };
}
