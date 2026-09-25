import IntentLandingPage from "@/components/intent-pages/IntentLandingPage";
import Wrapper from "@/layouts/Wrapper";
import {
  buildIntentLandingPageMetadata,
  buildIntentLandingPageSchema,
  getIntentLandingPage,
} from "@/data/IntentLandingPagesData";
import { buildFAQPageSchema } from "@/data/siteConfig";

const page = getIntentLandingPage("landing-page-development-for-lead-generation");

if (!page) {
  throw new Error("Intent landing page data missing for landing page development");
}

export const metadata = buildIntentLandingPageMetadata(page);

const LandingPageDevelopmentForLeadGenerationPage = () => {
  const faqSchema = buildFAQPageSchema(page.faqItems, page.path);
  const pageSchema = buildIntentLandingPageSchema(page);

  return (
    <Wrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <IntentLandingPage page={page} />
    </Wrapper>
  );
};

export default LandingPageDevelopmentForLeadGenerationPage;
