import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import PortfolioDetails from '@/components/portfolio-details';
import Wrapper from '@/layouts/Wrapper';
import {
  getAdjacentPortfolioProjects,
  getPortfolioProject,
  portfolioProjects,
} from '@/data/PortfolioProjectsData';
import {
  buildAssetUrl,
  buildBreadcrumbSchema,
  buildCanonicalUrl,
  buildCreativeWorkSchema,
  buildOpenGraph,
  buildSeoImage,
  buildTwitterCard,
} from '@/data/siteConfig';

type PortfolioProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PortfolioProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioProject(slug);

  if (!project) {
    return {
      title: 'Project | ReddyStack',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalUrl = buildCanonicalUrl(project.path);

  return {
    title: project.metaTitle,
    description: project.metaDescription,
    openGraph: buildOpenGraph({
      title: project.metaTitle,
      description: project.metaDescription,
      url: canonicalUrl,
      images: [buildSeoImage(project.listingImage, project.title)],
    }),
    twitter: buildTwitterCard({
      title: project.metaTitle,
      description: project.metaDescription,
      images: [buildAssetUrl(project.listingImage)],
    }),
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

const PortfolioProjectPage = async ({ params }: PortfolioProjectPageProps) => {
  const { slug } = await params;
  const project = getPortfolioProject(slug);

  if (!project) {
    notFound();
  }

  const { previousProject, nextProject } = getAdjacentPortfolioProjects(slug);

  if (!previousProject || !nextProject) {
    notFound();
  }

  const creativeWorkSchema = buildCreativeWorkSchema(project);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: project.title, path: project.path },
  ]);

  return (
    <Wrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(creativeWorkSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <PortfolioDetails
        project={project}
        previousProject={previousProject}
        nextProject={nextProject}
      />
    </Wrapper>
  );
};

export default PortfolioProjectPage;
