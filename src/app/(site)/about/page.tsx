import AboutView from '@/components/views/AboutView';
import { aboutPageSchema, buildBreadcrumbSchema, buildPageMetadata } from '@/data/siteConfig';


export const metadata = buildPageMetadata("about");


const index = () => {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutView />
    </>
  );
};

export default index;
