import IntentLandingPage from "@/components/intent-pages/IntentLandingPage";
import Wrapper from "@/layouts/Wrapper";
import {
  buildIntentLandingPageMetadata,
  buildIntentLandingPageSchema,
  getIntentLandingPage,
} from "@/data/IntentLandingPagesData";
import { buildFAQPageSchema } from "@/data/siteConfig";

const page = getIntentLandingPage("website-development-under-10000");

if (!page) {
  throw new Error("Intent landing page data missing for website development under 10000");
}

export const metadata = buildIntentLandingPageMetadata(page);

const WebsiteDevelopmentUnder10000Page = () => {
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

export default WebsiteDevelopmentUnder10000Page;
