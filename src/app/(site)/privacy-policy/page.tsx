import TrustView from "@/components/views/TrustView";
import { getTrustPage, getTrustPageSeo } from "@/data/TrustPagesData";
import {
  buildBreadcrumbSchema,
  buildPageMetadata,
  buildCanonicalUrl,
  schemaIds,
} from "@/data/siteConfig";

const page = getTrustPage("privacy-policy");

export const metadata = buildPageMetadata(page.metaKey);

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${buildCanonicalUrl("/privacy-policy")}#webpage`,
  name: getTrustPageSeo("privacy-policy").title,
  url: buildCanonicalUrl("/privacy-policy"),
  description: getTrustPageSeo("privacy-policy").description,
  isPartOf: {
    "@id": schemaIds.website,
  },
  about: {
    "@id": schemaIds.organization,
  },
};

const PrivacyPolicyRoute = () => {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: page.title, path: "/privacy-policy" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <TrustView page={page} path="/privacy-policy" />
    </>
  );
};

export default PrivacyPolicyRoute;
