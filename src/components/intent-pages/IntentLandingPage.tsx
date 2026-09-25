import ServiceDetailView from "@/components/views/ServiceDetailView";
import {
  buildIntentServiceDetail,
  getAdjacentIntentServiceDetails,
  type IntentLandingPage as IntentLandingPageData,
} from "@/data/IntentLandingPagesData";

type IntentLandingPageProps = {
  page: IntentLandingPageData;
};

/** Intent landing pages share the service template, illustrated by their parent service. */
const IntentLandingPage = ({ page }: IntentLandingPageProps) => {
  const service = buildIntentServiceDetail(page);
  const { previousPage, nextPage } = getAdjacentIntentServiceDetails(page.slug);

  if (!previousPage || !nextPage) {
    return null;
  }

  return (
    <ServiceDetailView
      service={service}
      previous={previousPage}
      next={nextPage}
      illustrationSlug={page.relatedServiceSlug}
    />
  );
};

export default IntentLandingPage;
