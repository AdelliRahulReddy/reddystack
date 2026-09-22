import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ServiceDetails from '@/components/service-details';
import Wrapper from '@/layouts/Wrapper';
import {
  getAdjacentServices,
  getServiceDetail,
  serviceDetailData,
} from '@/data/ServiceDetailData';
import {
  buildAssetUrl,
  buildBreadcrumbSchema,
  buildCanonicalUrl,
  buildFAQPageSchema,
  buildOpenGraph,
  buildSeoImage,
  buildServiceSchema,
  buildTwitterCard,
} from '@/data/siteConfig';

type ServiceDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return serviceDetailData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceDetail(slug);

  if (!service) {
    return {
      title: 'Service | ReddyStack',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalUrl = buildCanonicalUrl(service.path);

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    openGraph: buildOpenGraph({
      title: service.metaTitle,
      description: service.metaDescription,
      url: canonicalUrl,
      images: [buildSeoImage(service.heroImage, service.title)],
    }),
    twitter: buildTwitterCard({
      title: service.metaTitle,
      description: service.metaDescription,
      images: [buildAssetUrl(service.heroImage)],
    }),
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

const ServiceDetailPage = async ({ params }: ServiceDetailPageProps) => {
  const { slug } = await params;
  const service = getServiceDetail(slug);

  if (!service) {
    notFound();
  }

  const { previousService, nextService } = getAdjacentServices(slug);

  if (!previousService || !nextService) {
    notFound();
  }

  const serviceSchema = buildServiceSchema(service);
  const faqSchema = buildFAQPageSchema(service.faqItems, service.path);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/service' },
    { name: service.title, path: service.path },
  ]);

  return (
    <Wrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <ServiceDetails
        service={service}
        previousService={previousService}
        nextService={nextService}
      />
    </Wrapper>
  );
};

export default ServiceDetailPage;
