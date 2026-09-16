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
    {
      "question": "What information makes a quote useful?",
      "answer": "Send the current website or product, the problem to solve, the deliverables you expect and any budget or deadline boundary. Include the content and account access already available. For a website, name the page types and integrations; for creative, name the concepts and versions; for campaigns, describe the offer, market and total test budget. Missing inputs should be identified before the plan is agreed.",
      "some_features": [
        "Brief",
        "Available Assets",
        "Dependencies"
      ]
    },
    {
      "question": "Does an ads quote include advertising spend?",
      "answer": "Advertising spend is separate from setup or management fees. The proposal should distinguish platform spend, campaign work, creative production and landing-page or tracking changes. Consider those costs together when setting a budget. The business retains its advertising account and should understand the spending boundary and approval process before launch.",
      "some_features": [
        "Ad Spend",
        "Management",
        "Creative Costs"
      ]
    },
    {
      "question": "What recurring costs should I plan for?",
      "answer": "Depending on the project, recurring costs can include domain renewal, hosting, paid tools, model or automation usage and ongoing support. Ask which accounts you own, who receives renewal notices and which charges depend on usage. A one-time build fee does not automatically cover these costs indefinitely; the written proposal identifies what is included.",
      "some_features": [
        "Renewals",
        "Usage Costs",
        "Account Ownership"
      ]
    },
    {
      "question": "Is the work one-off or ongoing?",
      "answer": "A website build, creative batch or audit can be a bounded project. Campaign management, content production and SEO maintenance can be ongoing work with agreed deliverables and review periods. State whether implementation follows an audit and whether post-launch fixes or monitoring are included. Do not assume that a handover includes continuing optimisation.",
      "some_features": [
        "Project Scope",
        "Review Periods",
        "Support"
      ]
    },
    {
      "question": "What happens when the brief changes?",
      "answer": "First compare the request with the approved scope. A correction or refinement inside the agreed direction differs from a new page, workflow, language or creative concept. If the request adds work, discuss the revised deliverables, price and timing before proceeding. Revision rounds, approval contacts and exclusions belong in the original proposal so there is a shared reference.",
      "some_features": [
        "Revisions",
        "Change Scope",
        "Approval"
      ]
    },
    {
      "question": "Can we start with a smaller budget?",
      "answer": "A smaller first phase can work when it still completes a useful task. For example, one well-defined service page may be a better starting point than several unfinished pages. Share the actual budget and identify what can wait. A revised scope should remove named optional work while retaining the checks needed for the agreed deliverable to function.",
      "some_features": [
        "First Phase",
        "Priorities",
        "Clear Exclusions"
      ]
    }
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
                        A useful quote names the work, the inputs it depends on and the checks needed before delivery. Share your website or idea, the customer action you want, available assets and any budget or deadline boundary. Ads, creative content, AI videos, websites and SEO each need a different scope.
                      </p>
                      <p className="tp_title_anim">
                        Compare proposals using the same brief: deliverables, revisions, access, exclusions, recurring costs and handover. A lower price may cover fewer tasks, so check what remains your responsibility. Apps, MVPs, chatbots and automation are also available on request, with their workflows and operating costs agreed separately.
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
