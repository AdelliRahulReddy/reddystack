import TrustPage from "@/components/trust/TrustPage";
import Wrapper from "@/layouts/Wrapper";
import { getTrustPage, getTrustPageSeo } from "@/data/TrustPagesData";
import {
  buildBreadcrumbSchema,
  buildPageMetadata,
  buildCanonicalUrl,
  schemaIds,
} from "@/data/siteConfig";

const page = getTrustPage("terms");

export const metadata = buildPageMetadata(page.metaKey);

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${buildCanonicalUrl("/terms")}#webpage`,
  name: getTrustPageSeo("terms").title,
  url: buildCanonicalUrl("/terms"),
  description: getTrustPageSeo("terms").description,
  isPartOf: {
    "@id": schemaIds.website,
  },
  about: {
    "@id": schemaIds.organization,
  },
};

const TermsRoute = () => {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: page.title, path: "/terms" },
  ]);

  return (
    <Wrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <TrustPage page={page} />
    </Wrapper>
  );
};

export default TermsRoute;
