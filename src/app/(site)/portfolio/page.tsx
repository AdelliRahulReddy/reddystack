import PortfolioIndexView from '@/components/views/PortfolioIndexView';
import { buildBreadcrumbSchema, buildPageMetadata } from '@/data/siteConfig';


export const metadata = buildPageMetadata("portfolio");


const index = () => {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PortfolioIndexView />
    </>
  );
};

export default index;
