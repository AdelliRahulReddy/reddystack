import TrustPage from "@/components/trust/TrustPage";
import Wrapper from "@/layouts/Wrapper";
import { getTrustPage, getTrustPageSeo } from "@/data/TrustPagesData";
import {
  buildBreadcrumbSchema,
  buildPageMetadata,
  buildCanonicalUrl,
  schemaIds,
} from "@/data/siteConfig";

const page = getTrustPage("revision-policy");

export const metadata = buildPageMetadata(page.metaKey);

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${buildCanonicalUrl("/revision-policy")}#webpage`,
  name: getTrustPageSeo("revision-policy").title,
  url: buildCanonicalUrl("/revision-policy"),
  description: getTrustPageSeo("revision-policy").description,
  isPartOf: {
    "@id": schemaIds.website,
  },
  about: {
    "@id": schemaIds.organization,
  },
};

const RevisionPolicyRoute = () => {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: page.title, path: "/revision-policy" },
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

export default RevisionPolicyRoute;
