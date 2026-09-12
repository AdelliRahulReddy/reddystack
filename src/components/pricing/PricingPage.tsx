import HeaderFour from "@/layouts/headers/HeaderFour";
import FooterOne from "@/layouts/footers/FooterOne";
import PriceAreaHomeOne from "@/components/homes/home/PriceAreaHomeOne";
import ServiceFaqArea from "@/components/service-details/ServiceFaqArea";
import type { ServiceDetail } from "@/data/ServiceDetailData";
import heroWebsite from "@/assets/img/portfolio/port-inner-up-1.jpg";

const pricingFaqService: ServiceDetail = {
  slug: "pricing", path: "/pricing", subtitle: "Pricing and Scope", title: "Custom Quotes",
  introPrimary: "Every quote reflects your goals and agreed deliverables.", introSecondary: "",
  overviewPrimary: "", overviewSecondary: "", features: [], closingSummary: "", sideTitle: "",
  categories: ["Ads", "Creative", "Websites", "SEO"], highlightTitle: ["Clear", "scope"], highlightText: "",
  metaTitle: "Custom Quotes | Reddystack", metaDescription: "Scope and pricing for ads, creative, videos, websites, and SEO.",
  heroImage: heroWebsite,
  presentation: { faqTitle: "Pricing Questions", faqDescription: "What to expect before you start.", faqHighlights: ["Scope", "Deliverables", "Costs"], showFaqShapes: false },
  faqItems: [
    { question: "How much will my project cost?", answer: "We provide a custom quote after understanding your goals, deliverables, timeline, and required support. There is no automatic package selection.", some_features: ["Custom Quote", "Agreed Scope"] },
    { question: "Does an ads quote include advertising spend?", answer: "Advertising spend is separate from our campaign management fee. The proposal will distinguish platform spend, management, and any creative production costs.", some_features: ["Ad Spend", "Management Fee", "Creative Costs"] },
    { question: "Is the work one-off or ongoing?", answer: "Websites and creative production can be scoped as projects. Campaign management and SEO can be scoped as ongoing work. Deliverables, reporting, and review points are agreed before starting.", some_features: ["Project Work", "Ongoing Support"] },
    { question: "What about revisions and third-party costs?", answer: "Your quote sets out revision rounds, inclusions, exclusions, and any separate costs such as hosting, domains, stock assets, or paid tools before work starts.", some_features: ["Revisions", "Inclusions", "Third-party Costs"] }
  ]
};

const PricingPage = () => {
  return (
    <>
      <HeaderFour />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main id="main-content" tabIndex={-1}>
            <section className="service-details__area service-details__space pt-200 pb-80 black-bg-3">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="service-details__title-box mb-40">
                      <span className="service-details__subtitle tp-char-animation">
                        Pricing
                      </span>
      <h1 className="service-details__title tp-char-animation">
                        A clear quote for your business goals.
                      </h1>
                    </div>
                  </div>
                  <div className="offset-xl-4 col-xl-5 col-lg-8">
                    <div className="service-details__banner-text">
                      <p className="mb-30 tp_title_anim">
                        Tell us what you want to achieve. We scope ads, creative content, AI videos, websites, and SEO around your goals, timeline, and budget.
                      </p>
                      <p className="tp_title_anim">
                        You receive clear deliverables, fees, exclusions, and review points before work begins. Apps, MVPs, chatbots, and automation are also available on request.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <PriceAreaHomeOne style={true} />
            <ServiceFaqArea service={pricingFaqService} />
          </main>
          <FooterOne style={true} />
        </div>
      </div>
    </>
  );
};

export default PricingPage;
