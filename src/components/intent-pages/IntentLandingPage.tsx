import FooterOne from "@/layouts/footers/FooterOne";
import HeaderFour from "@/layouts/headers/HeaderFour";
import NavigationArea from "@/components/service-details/NavigationArea";
import ServiceDetailsArea from "@/components/service-details/ServiceDetailsArea";
import ServiceFaqArea from "@/components/service-details/ServiceFaqArea";
import {
  buildIntentServiceDetail,
  getAdjacentIntentServiceDetails,
  type IntentLandingPage as IntentLandingPageData,
} from "@/data/IntentLandingPagesData";

type IntentLandingPageProps = {
  page: IntentLandingPageData;
};

const IntentLandingPage = ({ page }: IntentLandingPageProps) => {
  const service = buildIntentServiceDetail(page);
  const { previousPage, nextPage } = getAdjacentIntentServiceDetails(page.slug);

  if (!previousPage || !nextPage) {
    return null;
  }

  return (
    <>
      <HeaderFour />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main id="main-content" className="rs-subpage" tabIndex={-1}>
            <ServiceDetailsArea service={service} />
            <ServiceFaqArea service={service} />
            <NavigationArea
              previousService={previousPage}
              nextService={nextPage}
            />
          </main>
          <FooterOne style={true} />
        </div>
      </div>
    </>
  );
};

export default IntentLandingPage;
