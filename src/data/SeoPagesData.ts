import content from './seo-pages.json';
import type { TrustPageData } from './TrustPagesData';

export type SeoContentPage = Pick<TrustPageData, 'title' | 'subtitle' | 'intro' | 'sections'> & {
  path: string;
  parent: string;
  description: string;
  kind: 'guide' | 'hub' | 'service' | 'location' | 'profile';
  publishedAt?: string;
  updatedAt?: string;
};

export const seoPages = content as SeoContentPage[];
export const getSeoPage = (path: string) => seoPages.find((page) => page.path === path);
