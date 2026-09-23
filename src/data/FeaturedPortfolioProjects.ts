import { portfolioProjects } from '@/data/PortfolioProjectsData';

const featuredProjectSlugs = ['reelsxpress', 'bachelor-brother', 'kalyamram'];

export const featuredPortfolioProjects = featuredProjectSlugs
  .map((slug) => portfolioProjects.find((project) => project.slug === slug))
  .filter((project): project is (typeof portfolioProjects)[number] => Boolean(project))
  .map((project) => ({
    slug: project.slug,
    path: project.path,
    title: project.title,
    category: project.category,
    year: project.year,
    client: project.client,
    role: project.role,
    summary: project.summary,
    image: {
      src: project.listingImage.src,
      width: project.listingImage.width,
      height: project.listingImage.height,
    },
  }));
