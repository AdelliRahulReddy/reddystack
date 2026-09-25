import ServicesIndexView from '@/components/views/ServicesIndexView';
import { buildBreadcrumbSchema, buildPageMetadata } from '@/data/siteConfig';


export const metadata = buildPageMetadata("services");


const index = () => {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/service' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicesIndexView />
    </>
  );
};

export default index;
