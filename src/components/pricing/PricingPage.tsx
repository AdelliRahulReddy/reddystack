import HeaderFour from "@/layouts/headers/HeaderFour";
import FooterOne from "@/layouts/footers/FooterOne";
import PriceAreaHomeOne from "@/components/homes/home/PriceAreaHomeOne";
import ServiceFaqArea from "@/components/service-details/ServiceFaqArea";
import type { ServiceDetail } from "@/data/ServiceDetailData";
import heroWebsite from "@/assets/img/portfolio/port-inner-up-1.jpg";

const pricingFaqService: ServiceDetail = {
  slug: "pricing", path: "/pricing", subtitle: "Ways to Work", title: "Proof Sprint to Scale",
  introPrimary: "Every quote starts with one problem, a defined scope, and a realistic evidence plan.", introSecondary: "",
  overviewPrimary: "", overviewSecondary: "", features: [], closingSummary: "", sideTitle: "",
  categories: ["Proof Sprint", "Stack Build", "Operate & Improve"], highlightTitle: ["Proof-first", "engagements"], highlightText: "",
  metaTitle: "Ways to Work | ReddyStack", metaDescription: "Proof Sprints, connected Stack Builds, and ongoing improvement engagements from ReddyStack.",
  heroImage: heroWebsite,
  presentation: { faqTitle: "Pricing Questions", faqDescription: "What to expect before you start.", faqHighlights: ["Scope", "Deliverables", "Costs"], showFaqShapes: false },
  faqItems: [
    {
      "question": "Which engagement should I start with?",
      "answer": "Start with the problem, not the package. A Proof Sprint fits one important unknown or bottleneck. A Stack Build fits a defined implementation that needs several connected capabilities. Operate and Improve fits a working system that needs ongoing testing and decisions. Rahul recommends the smallest engagement that can still produce a useful result.",
      "some_features": [
        "Proof Sprint",
        "Stack Build",
        "Operate & Improve"
      ]
    },
    {
      "question": "What does a Proof Sprint include?",
      "answer": "The sprint defines one decision, establishes the current baseline, completes a focused audit, build, fix, or test, and records the evidence and limitations. Its output depends on the problem and can include a landing path, search repair, tracking check, campaign test, creative comparison, or workflow prototype. It is bounded work, not an unlimited trial retainer.",
      "some_features": [
        "One Problem",
        "Focused Work",
        "Evidence Summary"
      ]
    },
    {
      "question": "Are media spend and platform costs included?",
      "answer": "No unless the proposal explicitly states otherwise. Advertising spend, hosting, domains, paid tools, stock, model usage, and other third-party costs remain visible and separate from ReddyStack fees. The client keeps ownership of the relevant accounts and approves spending boundaries before launch.",
      "some_features": [
        "Platform Spend",
        "Third-Party Costs",
        "Client Ownership"
      ]
    },
    {
      "question": "Is the work one-off or ongoing?",
      "answer": "A Proof Sprint and Stack Build can be bounded projects. Operate and Improve is ongoing work with agreed priorities, reporting, and review periods. A completed project does not silently include indefinite monitoring, optimisation, new assets, or support; the proposal states what continues and what ends at handover.",
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
          <main id="main-content" className="rs-subpage" tabIndex={-1}>
            <section className="service-details__area service-details__space rs-pricing-hero black-bg-3">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="service-details__title-box mb-40">
                      <span className="service-details__subtitle tp-char-animation">
                        Ways to Work
                      </span>
      <h1 className="service-details__title tp-char-animation">
                        Start focused. Scale with evidence.
                      </h1>
                    </div>
                  </div>
                  <div className="offset-xl-4 col-xl-5 col-lg-8">
                    <div className="service-details__banner-text">
                      <p className="mb-30 tp_title_anim">
                        ReddyStack offers three engagement shapes: a focused Proof Sprint, a connected Stack Build, and ongoing Operate and Improve support. The right starting point depends on the decision you need to make, the current evidence, and how much implementation is required.
                      </p>
                      <p className="tp_title_anim">
                        Every quote names the problem, baseline, deliverables, access, approvals, revisions, exclusions, separate costs, evidence plan, and handover. Prices come after the scope is understood; no package hides media spend, platform costs, or client responsibilities.
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
