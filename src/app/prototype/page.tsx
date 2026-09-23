import type { Metadata } from 'next';

import { featuredPortfolioProjects } from '@/data/FeaturedPortfolioProjects';
import PrototypeExperience from './PrototypeExperience';

export const metadata: Metadata = {
  title: { absolute: 'ReddyStack — Rahul Reddy, Independent Growth Partner' },
  description: 'Rahul Reddy helps growing brands connect SEO, websites, paid ads, and creative around one clear business goal.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function GrowthStudioPrototype() {
  return <PrototypeExperience projects={featuredPortfolioProjects} />;
}
