import type { Metadata } from "next";
import type { StaticImageData } from "next/image";

import heroWebsite from "@/assets/img/portfolio/port-inner-up-1.jpg";
import heroAutomation from "@/assets/img/portfolio/port-inner-up-5.jpg";
import heroMvp from "@/assets/img/portfolio/port-inner-up-2.jpg";
import {
  buildCanonicalUrl,
  buildOpenGraph,
  buildSeoImage,
  buildTwitterCard,
  schemaIds,
} from "@/data/siteConfig";
import type { ServiceDetail } from "@/data/ServiceDetailData";
import { getPortfolioProject } from "@/data/PortfolioProjectsData";
import { getBlogPost } from "@/data/BlogPostsData";

type IntentFaqItem = {
  question: string;
  answer: string;
  some_features: string[];
};

type IntentProcessStep = {
  label: string;
  text: string;
};

type IntentLandingPage = {
  slug: string;
  path: string;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  shortTitle: string;
  headline: string;
  intro: string;
  heroHighlights: string[];
  fitTitle: string;
  fitIntro: string;
  fitBullets: string[];
  includedTitle: string;
  includedBullets: string[];
  processTitle: string;
  processSteps: IntentProcessStep[];
  whyTitle: string;
  whyParagraphs: string[];
  pricingTitle: string;
  pricingText: string;
  finalCtaTitle: string;
  finalCtaText: string;
  faqItems: IntentFaqItem[];
  relatedServiceSlug: string;
  relatedBlogSlug: string;
  relatedProjectSlug: string;
  keywords?: string[];
  heroImage: StaticImageData;
  accent: {
    primary: string;
    secondary: string;
    glow: string;
  };
};

export const intentLandingPages: IntentLandingPage[] = [
  {
    slug: "website-development-services",
    path: "/website-development",
    navLabel: "Website Development Services",
    metaTitle: "Website Development Services | ReddyStack",
    metaDescription:
      "Founder-led website development services for startups and businesses that need affordable, SEO-ready websites, landing pages, and service pages.",
    eyebrow: "Website Development Services",
    shortTitle: "website development services",
    headline: "Website development services for businesses that need visibility, trust, and leads.",
    intro:
      "ReddyStack builds business websites, service websites and landing pages with clear content, mobile layouts and a checked enquiry path. You work directly with Rahul to agree the pages, functionality and launch requirements.",
    heroHighlights: [
      "SEO-ready website development for service businesses and startups",
      "Responsive pages built around clarity, speed, and inquiries",
      "Founder-led delivery for India and worldwide clients",
    ],
    fitTitle: "When this website scope fits",
    fitIntro:
      "Start with the questions a customer needs answered before contacting you: what you offer, where it is available, what the work involves and how to take the next step.",
    fitBullets: [
      "You need a business website, service website, portfolio or focused landing page.",
      "The brief needs to cover content, search foundations, mobile use, forms and measurement.",
      "You want to agree deliverables and responsibilities directly with the person doing the work."
    ],
    includedTitle: "What website development can include",
    includedBullets: [
      "Homepage, service pages, landing pages, contact flow, and core conversion sections",
      "Responsive website development for mobile, tablet, and desktop users",
      "On-page SEO setup including titles, descriptions, headings, sitemap, schema, and internal links",
      "Lead forms, WhatsApp or email contact paths, GA4 tracking, and launch checks",
      "Optional redesign or content structure improvements after launch",
    ],
    processTitle: "How the website build is approached",
    processSteps: [
      {
        label: "01. Plan pages",
        text: "Map the offer, services, keywords, buyer questions, and pages that deserve dedicated structure.",
      },
      {
        label: "02. Build clearly",
        text: "Create the website around fast scanning, responsive execution, SEO hygiene, and conversion flow.",
      },
      {
        label: "03. Launch and improve",
        text: "Ship with analytics, sitemap, schema, and a practical path for future content or service-page expansion.",
      },
    ],
    whyTitle: "Define what each page needs to do",
    whyParagraphs: [
      "A useful page list includes a purpose, not just a name. A service page might explain eligibility, scope, common exclusions and how a quote is prepared. A contact page should tell the visitor what information to provide and show whether the enquiry was sent. Those details are part of the build brief.",
      "Content readiness affects the work. Identify who supplies product facts, photographs, service descriptions and policy information. If copywriting or asset sourcing is required, include it explicitly. A website cannot accurately fill gaps in the business offer by borrowing claims or testimonials from elsewhere.",
      "For an existing business, review current URLs and any pages that already receive enquiries. Preserve useful addresses or map them to appropriate replacements. Search setup includes understandable titles, headings and internal links, but those foundations alone do not guarantee that a page will rank.",
      "Acceptance should cover a complete visit: arrive on a phone, understand the offer, navigate with a keyboard where appropriate and submit a valid enquiry. Check the error path too. The handover should identify domain and hosting access, renewals, content editing and the support actually included after launch."
    ],
    pricingTitle: "Website development pricing approach",
    pricingText:
      "A quote should state page types, content responsibilities, forms, integrations, migration, revisions and launch support. Domain registration, hosting, licences and ongoing maintenance are separate costs where applicable. Share the existing website, a proposed page list and the customer action you want; those inputs are more useful than asking for a price based only on page count.",
    finalCtaTitle: "Share the website you need to build.",
    finalCtaText:
      "If you need website development services with clear scope, SEO foundations, and practical delivery, start with the business goal and ReddyStack will shape the right first version.",
    faqItems: [
      {
        question: "What is included in website development services?",
        answer:
          "Website development can include page planning, responsive design, frontend build, content structure, SEO setup, forms, analytics, schema, sitemap, and launch checks. The exact scope depends on the business goal.",
        some_features: ["Responsive Build", "SEO Setup", "Lead Forms"],
      },
      {
        question: "Can ReddyStack build affordable business websites?",
        answer:
          "Yes. ReddyStack can keep the first version affordable by controlling scope, focusing on essential pages, and prioritizing the sections that improve credibility and inquiries.",
        some_features: ["Affordable Scope", "Business Website", "Founder-led"],
      },
      {
        question: "Are the websites SEO-ready from launch?",
        answer:
          "Yes. SEO foundations such as headings, metadata, internal links, sitemap, schema, performance checks, and crawl-friendly page structure are planned into the website build.",
        some_features: ["Metadata", "Schema", "Internal Links"],
      },
      {
        question: "Do you work with clients outside Hyderabad?",
        answer:
          "Yes. ReddyStack is based in Hyderabad and is available for remote projects across India and worldwide. Scope, review contacts and communication arrangements are agreed before work starts.",
        some_features: ["Hyderabad", "India", "Worldwide"],
      },
    ],
    relatedServiceSlug: "seo-websites",
    relatedBlogSlug: "how-seo-websites-help-startups-get-better-leads",
    relatedProjectSlug: "kalyamram",
    keywords: [
      "website development services",
      "website development company",
      "business website development",
      "responsive website development services",
      "SEO website development",
    ],
    heroImage: heroWebsite,
    accent: {
      primary: "#00cc97",
      secondary: "#121212",
      glow: "rgba(0, 204, 151, 0.24)",
    },
  },
  {
    slug: "affordable-website-development",
    path: "/affordable-website-development",
    navLabel: "Affordable Website Development",
    metaTitle: "Affordable Website Development | ReddyStack",
    metaDescription:
      "Affordable website development for startups and small businesses that need clear scope, SEO-ready structure, responsive design, and practical launch support.",
    eyebrow: "Affordable Website Development",
    shortTitle: "affordable website development",
    headline: "Affordable website development without making the site look or feel cheap.",
    intro:
      "ReddyStack helps startups, small businesses, and founder-led teams build affordable websites that still feel credible, load cleanly, and support real inquiries. The approach is to control scope, prioritize useful pages, and avoid paying for features the first version does not need.",
    heroHighlights: [
      "Affordable business websites with clear launch scope",
      "SEO-ready structure, responsive build, and contact tracking",
      "Designed for startups, service brands, and small teams",
    ],
    fitTitle: "A focused first website",
    fitIntro:
      "This page is for businesses that need a professional website on a practical budget. The goal is to use the budget on the parts that improve trust, search readiness, and lead flow.",
    fitBullets: [
      "You need a first business website or better service website without overbuilding",
      "You want a clean launch page, portfolio, or small website with real SEO basics",
      "You need transparent scope before deciding what should wait for phase two",
    ],
    includedTitle: "What an affordable website should still include",
    includedBullets: [
      "Clear homepage structure with offer, proof, services, and contact path",
      "Responsive design that works properly on mobile and desktop",
      "Basic on-page SEO, sitemap, metadata, schema, and analytics setup",
      "Contact form, email or WhatsApp paths, and lead-tracking events",
      "A practical upgrade path for more service pages, blogs, or custom features later",
    ],
    processTitle: "How the budget stays controlled",
    processSteps: [
      {
        label: "01. Choose essentials",
        text: "Separate the pages and features needed for launch from the ideas that can wait.",
      },
      {
        label: "02. Build the core",
        text: "Focus budget on credibility, mobile experience, SEO foundations, and lead capture.",
      },
      {
        label: "03. Improve later",
        text: "Leave the structure ready for more pages, content, and features after the business validates demand.",
      },
    ],
    whyTitle: "Spend the first budget on a complete customer journey",
    whyParagraphs: [
      "Start by separating necessary work from preferences. A clear service explanation, readable mobile page, working contact path and accurate business details belong in the first release. A large animation library, a custom member area or several near-identical pages may not. Removing an unnecessary feature saves more than rushing essential checks.",
      "Supplying approved copy and usable images can reduce production work. It also avoids late changes caused by missing information. Make a small content sheet for each page: its purpose, main message, facts, image and contact action. Agree who reviews it and collect feedback in one place.",
      "Compare proposals against the same brief. One price may include writing, form delivery, launch checks and handover while another covers only assembly. Ask about recurring costs and who owns the domain. A cheap first invoice can still leave a business dependent on an account it cannot access.",
      "A sensible next phase has a reason. Add another service page when it answers a distinct customer need, or a booking integration when the existing enquiry process becomes difficult to operate. Keep a record of those deferred items so the first release stays focused without pretending it includes everything."
    ],
    pricingTitle: "Affordable pricing approach",
    pricingText:
      "The budget is agreed against a defined page list and functionality. A narrow scope with ready content can cost less than a site requiring research, migration or custom integrations. Confirm domain, hosting, paid tools, revisions and support in writing so the total cost is understandable before work starts.",
    finalCtaTitle: "Discuss the essentials and your budget.",
    finalCtaText:
      "If you need affordable website development with clear priorities, share the goal and ReddyStack will help shape the smallest useful version.",
    faqItems: [
      {
        question: "Can affordable website development still include SEO?",
        answer:
          "Yes. Even a lean website should include SEO basics such as headings, metadata, sitemap, schema, internal links, performance checks, and crawl-friendly structure.",
        some_features: ["SEO Basics", "Metadata", "Sitemap"],
      },
      {
        question: "What should be avoided in a low-budget website?",
        answer:
          "Avoid paying for unnecessary features too early, but do not skip mobile usability, clear messaging, forms, analytics, and SEO foundations. Those basics make the website commercially useful.",
        some_features: ["Mobile UX", "Analytics", "Clear Messaging"],
      },
      {
        question: "Is affordable website development good for startups?",
        answer:
          "Yes. Startups often need a focused first version that explains the offer, earns trust, and starts collecting inquiries before the website expands.",
        some_features: ["Startups", "First Version", "Lead Capture"],
      },
      {
        question: "Can the website be upgraded later?",
        answer:
          "Yes. A focused first version can later grow into more service pages, blog content, case studies, landing pages, or custom app features when the business needs them.",
        some_features: ["Upgrade Path", "Service Pages", "Content Growth"],
      },
    ],
    relatedServiceSlug: "seo-websites",
    relatedBlogSlug: "how-seo-websites-help-startups-get-better-leads",
    relatedProjectSlug: "kalyamram",
    keywords: [
      "affordable website development",
      "affordable website design",
      "affordable website development for small business",
      "startup website development",
      "budget website development",
    ],
    heroImage: heroWebsite,
    accent: {
      primary: "#ffdb59",
      secondary: "#121212",
      glow: "rgba(255, 219, 89, 0.24)",
    },
  },
  {
    slug: "website-development-under-10000",
    path: "/website-development-under-10000",
    navLabel: "Website Development Under 10000",
    metaTitle: "Website Development Under 10000 | ReddyStack",
    metaDescription:
      "Website development under 10000 for focused launch pages, starter websites, portfolios, and simple business sites with clear scope.",
    eyebrow: "Budget Website Development",
    shortTitle: "website development under 10000",
    headline: "Website development under 10000 for focused first launches.",
    intro:
      "A budget below Rs. 10,000 needs a tightly defined website scope. ReddyStack can discuss a simple landing page, starter portfolio or basic business page within that boundary, subject to reviewing the content and required functionality.",
    heroHighlights: [
      "Useful for one-page websites, starter pages, and small portfolios",
      "Clear scope so the budget is realistic from the beginning",
      "Contact path, responsive structure, and basic launch hygiene included where possible",
    ],
    fitTitle: "A starter site with limited scope",
    fitIntro:
      "This page is for founders, freelancers, local businesses, and small teams that need a simple but credible web presence before investing in a larger website.",
    fitBullets: [
      "You need a simple one-page website or launch page quickly",
      "You can keep content, pages, animations, and integrations limited",
      "You want a starter website now and a stronger SEO website later",
    ],
    includedTitle: "What can realistically fit under Rs. 10,000",
    includedBullets: [
      "One-page website or focused landing page with essential sections",
      "Mobile-friendly layout, basic page metadata, and clear contact action",
      "Simple portfolio, founder profile, local business page, or offer page",
      "Basic form or WhatsApp/email contact path depending on the setup",
      "Upgrade guidance for service pages, SEO content, blog, or custom features later",
    ],
    processTitle: "How the under Rs. 10,000 scope works",
    processSteps: [
      {
        label: "01. Limit scope",
        text: "Decide one goal, one page type, and the minimum content needed to make the page credible.",
      },
      {
        label: "02. Build fast",
        text: "Use a focused structure that prioritizes message clarity, mobile fit, and contact action.",
      },
      {
        label: "03. Plan upgrade",
        text: "Keep a practical path for adding service pages, stronger SEO, tracking, or custom sections later.",
      },
    ],
    whyTitle: "What to settle before accepting a small fixed budget",
    whyParagraphs: [
      "Decide whether Rs. 10,000 is the build budget or the total amount available, including domain, hosting and any paid tools. Those are different constraints. A proposal should state the currency, applicable charges and included work; the budget in this page title is not an automatic price for every website.",
      "A realistic brief might be one page with an introduction, a small service list, supplied photographs and one contact action. Use approved content and a limited design direction. Confirm whether a form is required or whether an email or WhatsApp link meets the need. Each option needs an appropriate check before release.",
      "An online store, customer login, custom dashboard, multilingual content or substantial migration changes the project. If those are necessary, discuss a larger scope instead of promising them inside a starter build. Search basics can be included, but an ongoing SEO campaign is separate work.",
      "Keep a written list of what will be delivered, the review rounds and who supplies content. At handover, confirm access to the domain and hosting, how contact messages arrive and who handles later edits. A small budget still needs a working mobile page and a clear path for a visitor to reach the business."
    ],
    pricingTitle: "Budget website pricing approach",
    pricingText:
      "Whether the project fits below Rs. 10,000 depends on the final brief and content readiness. Request a written quote before treating that amount as an offer. Domain, hosting, subscriptions and any work outside the agreed starter scope should be identified separately.",
    finalCtaTitle: "Start lean, then grow the website when the business needs it.",
    finalCtaText:
      "If you need a website under Rs. 10,000, share the exact goal and ReddyStack will tell you what can fit honestly within the budget.",
    faqItems: [
      {
        question: "Can I get a website under Rs. 10,000?",
        answer:
          "It may be possible for a tightly scoped one-page site, starter portfolio or landing page with ready content. Share the exact requirements and confirm a written quote; this page does not offer every website at a fixed price below Rs. 10,000.",
        some_features: ["One-page Website", "Starter Portfolio", "Focused Scope"],
      },
      {
        question: "Will a budget website rank on Google immediately?",
        answer:
          "No website can guarantee immediate rankings. A budget website can include basic SEO hygiene, but stronger rankings usually need service pages, useful content, links, indexing time, and ongoing improvements.",
        some_features: ["SEO Hygiene", "Indexing", "Content Growth"],
      },
      {
        question: "What is not included under Rs. 10,000?",
        answer:
          "Complex custom design, multi-page SEO strategy, dashboards, payment systems, CMS setup, advanced animations, and deep copywriting usually need a larger scope.",
        some_features: ["Scope Limits", "Custom Features", "Larger Build"],
      },
      {
        question: "Can I upgrade the budget website later?",
        answer:
          "Yes. The starter site can later grow into a larger SEO website with more service pages, blogs, portfolio proof, tracking, and conversion improvements.",
        some_features: ["Upgrade Later", "SEO Website", "Service Pages"],
      },
    ],
    relatedServiceSlug: "seo-websites",
    relatedBlogSlug: "landing-pages-vs-seo-websites-what-should-you-launch-first",
    relatedProjectSlug: "kalyamram",
    keywords: [
      "website development under 10000",
      "website under 10000",
      "low budget website development",
      "starter website development",
      "one page website development",
    ],
    heroImage: heroWebsite,
    accent: {
      primary: "#19b3f1",
      secondary: "#121212",
      glow: "rgba(25, 179, 241, 0.24)",
    },
  },
  {
    slug: "mobile-app-development-services",
    path: "/app-development",
    navLabel: "App Development Services",
    metaTitle: "App Development Services | ReddyStack",
    metaDescription:
      "Mobile app development services for founders and businesses that need lean product scoping, mobile-first flows, MVP builds, and practical launch support.",
    eyebrow: "Mobile App Development Services",
    shortTitle: "mobile app development services",
    headline: "Mobile app development services for founders who need a usable first release.",
    intro:
      "Plan and build a mobile-first product around the task users need to complete. ReddyStack helps define the first release, screens, data and integrations before committing to a platform or feature list.",
    heroHighlights: [
      "Mobile-first product planning and app flow structure",
      "MVP app development with lean release scope",
      "Founder-led delivery for early-stage and business app ideas",
    ],
    fitTitle: "When a mobile workflow is needed",
    fitIntro:
      "This page is for founders, service businesses, and internal teams that need a mobile-first app, MVP, or product workflow without turning version one into an oversized build.",
    fitBullets: [
      "You need to validate an app idea with a focused first release",
      "You need mobile-first workflows, screens, user journeys, or app planning",
      "You want a practical path from idea to MVP before investing in a larger product",
    ],
    includedTitle: "What mobile app development can include",
    includedBullets: [
      "App idea scoping, feature prioritization, and release planning",
      "Mobile-first user flows, screens, and onboarding structure",
      "MVP implementation support for core journeys and launch-ready demos",
      "Backend or integration planning where the product needs real workflow depth",
      "Post-launch iteration guidance based on user feedback and business goals",
    ],
    processTitle: "How the mobile app build stays lean",
    processSteps: [
      {
        label: "01. Define use case",
        text: "Clarify what the user must do in the first version and what can wait.",
      },
      {
        label: "02. Shape flows",
        text: "Map mobile-first screens, states, and core actions around the main user journey.",
      },
      {
        label: "03. Launch version one",
        text: "Build a usable release, demo, or MVP that can earn feedback before scope expands.",
      },
    ],
    whyTitle: "Choose the delivery format for the actual task",
    whyParagraphs: [
      "A mobile-friendly web application may cover a workflow people open through a link. A native mobile app introduces different distribution, device and maintenance requirements. Discuss offline use, camera or location access, notifications and app-store delivery before assuming one format includes the other.",
      "Map the full journey from first visit to completion. For a hypothetical appointment product, this includes choosing a slot, confirming details, receiving confirmation and cancelling under the agreed rules. A collection of polished screens does not establish that the booking and notification logic work.",
      "Mobile testing needs realistic conditions. Consider a slow connection, a user leaving and returning to the app, denied device permissions and an interrupted submission. Make error messages understandable and avoid asking the user to repeat information that the product has already accepted.",
      "The release scope should name account ownership, backend services, supported devices, distribution requirements and post-launch responsibilities. Store review or third-party approval cannot be promised as a fixed outcome. The useful first version is the one that completes the agreed job and gives the owner a manageable way to support it."
    ],
    pricingTitle: "Mobile app pricing approach",
    pricingText:
      "The estimate depends on the delivery platform, workflows, roles, device features, backend and integrations. A browser-based demo and an app-store release are different projects. Hosting, platform accounts, usage charges and ongoing updates should be visible alongside the implementation quote.",
    finalCtaTitle: "Build the mobile app version that can actually launch.",
    finalCtaText:
      "If you need mobile app development services or an MVP app build, start with the core user journey and ReddyStack will help scope version one.",
    faqItems: [
      {
        question: "Does ReddyStack build full mobile apps or only MVPs?",
        answer:
          "ReddyStack can support MVP app builds, mobile-first product flows, and practical application builds. The recommended scope depends on the product stage and the user journey.",
        some_features: ["MVP App", "Product Flows", "Application Build"],
      },
      {
        question: "Can you help plan app features before development?",
        answer:
          "Yes. Feature planning, user flows, release scope, and screen-level priorities are part of the app development process when the idea needs clearer shape.",
        some_features: ["Feature Planning", "User Flows", "Release Scope"],
      },
      {
        question: "Is mobile app development useful for internal tools?",
        answer:
          "Yes. Some businesses need mobile-first internal tools for field teams, operations, lead handling, or repeated workflows. The build should match the real behavior users need.",
        some_features: ["Internal Tools", "Operations", "Mobile-first UX"],
      },
      {
        question: "How do I know if I need an app instead of a website?",
        answer:
          "An app makes sense when users need repeated actions, saved state, dashboards, account logic, or workflows. A website is usually better when the main need is discovery, trust, and lead generation.",
        some_features: ["Website vs App", "User State", "Workflows"],
      },
    ],
    relatedServiceSlug: "applications",
    relatedBlogSlug: "when-to-build-an-application-instead-of-a-website",
    relatedProjectSlug: "gitwall-app",
    keywords: [
      "mobile app development services",
      "MVP app development",
      "app development services",
      "mobile first application development",
      "startup app development",
    ],
    heroImage: heroMvp,
    accent: {
      primary: "#ff759c",
      secondary: "#121212",
      glow: "rgba(255, 117, 156, 0.24)",
    },
  },
  {
    slug: "custom-web-application-development-services",
    path: "/custom-web-application-development-services",
    navLabel: "Custom Web Application Development Services",
    metaTitle: "Custom Web Application Development Services | ReddyStack",
    metaDescription:
      "Custom web application development services for dashboards, internal tools, portals, workflow systems, and MVP products with practical scope.",
    eyebrow: "Custom Web Application Development",
    shortTitle: "custom web application development",
    headline: "Custom web application development services for workflows that need more than a website.",
    intro:
      "ReddyStack builds custom web applications, dashboards, internal tools, portals, and workflow systems for teams that need users to do something, not just read information. The work starts with process clarity, then turns the core flow into a usable product surface.",
    heroHighlights: [
      "Custom web apps, dashboards, portals, and internal tools",
      "Workflow-first planning for real business actions",
      "Practical development scope for startups and growing teams",
    ],
    fitTitle: "When users need to manage records",
    fitIntro:
      "This page is for businesses that have outgrown manual spreadsheets, static pages, or disconnected tools and need a custom web app that supports real workflows.",
    fitBullets: [
      "You need dashboards, admin panels, portals, or workflow tools",
      "Users need accounts, saved data, repeated actions, or approvals",
      "You want to scope the first useful version before building a larger platform",
    ],
    includedTitle: "What custom web app development can include",
    includedBullets: [
      "Workflow mapping, user roles, screen planning, and release boundaries",
      "Dashboard, portal, admin, or internal-tool interface development",
      "Form-driven processes, data handling, authentication planning, and integrations",
      "MVP-style delivery so the first version launches without unnecessary complexity",
      "Iteration support after real users start exposing gaps and improvements",
    ],
    processTitle: "How the web app is scoped",
    processSteps: [
      {
        label: "01. Map workflow",
        text: "Understand what users need to do, what data moves, and where current manual work breaks.",
      },
      {
        label: "02. Define version one",
        text: "Choose the smallest useful product surface: roles, screens, actions, and essential logic.",
      },
      {
        label: "03. Build usable flow",
        text: "Implement the core web application so the team can use it, test it, and improve from reality.",
      },
    ],
    whyTitle: "Write the workflow rules before building the dashboard",
    whyParagraphs: [
      "List the records the application manages and the people allowed to use them. For a hypothetical approval tool, an employee submits a request, a manager approves it and an administrator corrects account details. Those roles require different actions and visibility, even if they share a similar screen.",
      "Decide how each record changes state. What happens when a request is edited after approval, submitted twice or withdrawn? Which changes need a history? These questions determine the data and permission checks. They are more important to a working application than the number of dashboard widgets.",
      "Use a representative workflow as the first build slice. Include validation, an empty state, a failed operation and the final confirmation. Where another service is involved, decide what a timeout means and how to retry without duplicating the action. Test with more than one role and with records belonging to different users.",
      "Handover should cover access, deployment, backup responsibilities, exports and how errors reach the operator. Any data migration needs a clear source and checks for missing or duplicate records. Extra workflows can follow later, but the first one should already be safe and practical to operate."
    ],
    pricingTitle: "Custom web application pricing approach",
    pricingText:
      "Price depends on rules, roles, data, integrations and operational requirements as well as screens. A limited internal tool is a different scope from a customer-facing subscription product. The proposal should separate implementation from hosting, external services, data migration and maintenance where relevant.",
    finalCtaTitle: "Turn the workflow into a web app people can use.",
    finalCtaText:
      "If your business needs a custom web application, dashboard, portal, or internal tool, start with the workflow and ReddyStack will shape a practical first release.",
    faqItems: [
      {
        question: "What counts as a custom web application?",
        answer:
          "A custom web application is a browser-based product where users perform actions such as logging in, submitting data, managing workflows, viewing dashboards, approving requests, or using internal tools.",
        some_features: ["Dashboards", "Portals", "Internal Tools"],
      },
      {
        question: "Is a web app different from a normal website?",
        answer:
          "Yes. A website mainly explains and converts. A web app supports repeated actions, account logic, workflows, saved data, or operational tasks.",
        some_features: ["Website vs Web App", "User Actions", "Saved Data"],
      },
      {
        question: "Can a custom web app start as an MVP?",
        answer:
          "Yes. Many custom web apps should start as MVPs so the first version validates the workflow before the product expands into more roles, reports, or integrations.",
        some_features: ["MVP", "Workflow Validation", "Version One"],
      },
      {
        question: "Can ReddyStack build internal business tools?",
        answer:
          "Yes. ReddyStack can support internal tools, dashboards, portals, and workflow interfaces when the business needs a cleaner system than spreadsheets or scattered manual steps.",
        some_features: ["Business Tools", "Dashboards", "Workflow Systems"],
      },
    ],
    relatedServiceSlug: "applications",
    relatedBlogSlug: "how-to-plan-application-features-before-development-starts",
    relatedProjectSlug: "multi-format-converter",
    keywords: [
      "custom web application development services",
      "custom web application development",
      "custom web app development",
      "web application development services",
      "internal tool development",
    ],
    heroImage: heroMvp,
    accent: {
      primary: "#19b3f1",
      secondary: "#121212",
      glow: "rgba(25, 179, 241, 0.24)",
    },
  },
  {
    slug: "how-much-does-a-website-cost-in-india",
    path: "/how-much-does-a-website-cost-in-india",
    navLabel: "How Much Does a Website Cost in India?",
    metaTitle: "How Much Does a Website Cost in India? | ReddyStack",
    metaDescription:
      "Clear website cost guidance for India, covering static websites, business websites, landing pages, redesigns, and custom website development.",
    eyebrow: "Website Cost Guide",
    shortTitle: "website cost in India",
    headline: "How much does a website cost in India for a serious business launch?",
    intro:
      "A website quote is only useful when you know what it buys. In India, as elsewhere, content, functionality, migration and ongoing costs can matter more than page count. This guide explains how to prepare a brief and compare proposals without treating an unsourced price range as a market rate.",
    heroHighlights: [
      "Static website cost: usually lower when scope is simple",
      "Business website cost: depends on pages, copy, SEO, and conversion flow",
      "Custom website cost: higher when workflows, dashboards, or integrations are needed",
    ],
    fitTitle: "Prepare a brief before comparing prices",
    fitIntro:
      "This guide is for startups, small businesses, and founder-led teams that need a clear view of website development cost in India before starting a project.",
    fitBullets: [
      "You need a credible website but do not know what budget range is realistic",
      "You are comparing static website cost, dynamic website cost, and custom development cost",
      "You want a site that is SEO-ready, mobile-friendly, and built around inquiries",
    ],
    includedTitle: "The work to include in a comparable estimate",
    includedBullets: [
      "Landing page: message, supplied or written copy, layout, form or contact action, tracking and launch checks.",
      "Business website: page types, service content, navigation, mobile behaviour, search setup and enquiry delivery.",
      "Online store: catalogue, product variations, payments, shipping, taxes and order-management requirements.",
      "Custom application: roles, permissions, records, integrations and the complete workflows users must finish.",
      "Redesign: existing-page inventory, content migration, redirects, form checks and release responsibilities."
    ],
    processTitle: "How to estimate website pricing",
    processSteps: [
      {
        label: "01. Define scope",
        text: "List the pages, sections, forms, and integrations the first version actually needs.",
      },
      {
        label: "02. Separate must-haves",
        text: "Split essential launch requirements from future additions so the quote does not expand too early.",
      },
      {
        label: "03. Price for outcome",
        text: "Compare quotes by clarity, SEO readiness, performance, and conversion flow instead of page count alone.",
      },
    ],
    whyTitle: "Compare the same deliverables and the total cost",
    whyParagraphs: [
      "Send each provider the same brief. State the page list, examples of the content, required integrations and who supplies copy and images. Ask for exclusions as well as inclusions. A proposal for a layout assembled from supplied content is not directly comparable with one that includes research, writing and migration.",
      "Separate one-time work from recurring costs. Domain renewal, hosting, premium tools, email delivery and support may appear on different bills. Ask who owns each account and what happens if you move providers. Paying for a site should not leave you unable to access the assets needed to operate it.",
      "Use actual quote figures in a simple calculation. As an illustration only, a Rs. 20,000 build plus Rs. 4,000 of stated first-year recurring charges totals Rs. 24,000 before any separately applicable charges. These figures are not ReddyStack prices or a market benchmark; they show why the initial build fee is only part of the comparison.",
      "When the total is too high, reduce a named part of the scope: fewer page types, ready-to-use content or a simpler workflow. Keep the requirements that make the release usable, including mobile checks, working forms and clear ownership. Ask for a revised quote showing exactly what changed."
    ],
    pricingTitle: "Pricing guidance",
    pricingText:
      "ReddyStack provides a custom quote after reviewing the brief. There is no single standard price for a landing page, store, redesign and custom application. Share the site or idea, required pages, available content, integrations and budget boundary to get a scope you can compare.",
    finalCtaTitle: "Get a clear website scope before deciding the budget.",
    finalCtaText:
      "If you want to understand the right website cost for your startup, small business, or service brand, share the project goal and ReddyStack will help shape a practical scope.",
    faqItems: [
      {
        question: "What is the average website development cost in India?",
        answer:
          "This page does not claim a verified market average. Quotes vary with content, page types, functionality, migration and support. Prepare one brief, request itemised proposals and compare the total first-year cost as well as the build fee.",
        some_features: ["Website Cost", "India Pricing", "Business Website"],
      },
      {
        question: "What is the difference between static website cost and dynamic website cost?",
        answer:
          "A static website is usually cheaper because the content and functionality are simpler. A dynamic website costs more when it includes dashboards, logins, CMS features, integrations, or custom user workflows.",
        some_features: ["Static Website", "Dynamic Website", "Custom Scope"],
      },
      {
        question: "How much does a landing page cost in India?",
        answer:
          "A focused landing page often starts lower than a full website, but pricing still depends on copy, design detail, forms, tracking, and whether it needs SEO or ad-campaign support.",
        some_features: ["Landing Page", "Lead Generation", "Tracking"],
      },
      {
        question: "Why do website design charges vary between developers?",
        answer:
          "Charges vary because some quotes include only design and build, while others include content structure, SEO basics, speed work, forms, analytics, launch support, and revision time.",
        some_features: ["Design Charges", "SEO Setup", "Launch Support"],
      },
      {
        question: "Can ReddyStack help choose the right website budget?",
        answer:
          "Yes. ReddyStack can review the goal, pages, features, and launch timeline, then suggest a practical scope that avoids both underbuilding and unnecessary overbuilding.",
        some_features: ["Clear Scope", "Founder-led", "Practical Budget"],
      },
    ],
    relatedServiceSlug: "seo-websites",
    relatedBlogSlug: "landing-pages-vs-seo-websites-what-should-you-launch-first",
    relatedProjectSlug: "kalyamram",
    heroImage: heroWebsite,
    accent: {
      primary: "#ffdb59",
      secondary: "#121212",
      glow: "rgba(255, 219, 89, 0.24)",
    },
  },
  {
    slug: "website-redesign-services",
    path: "/website-redesign-services",
    navLabel: "Website Redesign Services",
    metaTitle: "Website Redesign Services | ReddyStack",
    metaDescription:
      "Founder-led website redesign services for businesses that need clearer messaging, better SEO structure, faster performance, and stronger inquiry flow.",
    eyebrow: "Website Redesign Services",
    shortTitle: "website redesign services",
    headline: "Website redesign services for sites that need better clarity, SEO, and lead flow.",
    intro:
      "Improve an existing website's content, navigation and enquiry experience while accounting for the pages and links it already has. ReddyStack scopes redesign work around the problems you can identify on the current site.",
    heroHighlights: [
      "Improve website structure before changing visuals",
      "Repair weak messaging, page hierarchy, and CTAs",
      "Keep redesign scope practical and launch-ready",
    ],
    fitTitle: "Problems a redesign can address",
    fitIntro:
      "This page is for teams that already have a website but need it to communicate better, feel more credible, and support search visibility or inquiries more clearly.",
    fitBullets: [
      "Your current website looks dated or generic",
      "Visitors do not understand your services quickly enough",
      "The site has weak SEO structure, slow pages, or unclear inquiry paths",
    ],
    includedTitle: "What a practical redesign usually includes",
    includedBullets: [
      "Homepage and service-section restructuring around real buyer questions",
      "Updated messaging, CTA flow, and page hierarchy",
      "SEO hygiene, metadata review, internal links, and crawl-friendly structure",
      "Performance cleanup, responsive checks, and launch support",
      "Optional migration from a weak template or older website setup",
    ],
    processTitle: "How the redesign is scoped",
    processSteps: [
      {
        label: "01. Audit",
        text: "Review the current website, page purpose, SEO gaps, content quality, and conversion path.",
      },
      {
        label: "02. Rebuild",
        text: "Restructure the pages and messaging before polishing visuals so the redesign has a business reason.",
      },
      {
        label: "03. Relaunch",
        text: "Ship the improved website with cleaner SEO foundations, analytics, and practical post-launch checks.",
      },
    ],
    whyTitle: "Preserve useful paths while fixing the weak ones",
    whyParagraphs: [
      "Before changing the design, list existing URLs, important downloads, forms and integrations. Review available search and analytics data to understand which pages people actually use. A page with an unattractive layout may still answer an important question or receive relevant links; replacing the site should not erase that value accidentally.",
      "Give each old URL a decision: retain it, improve it, merge it into a relevant page or retire it appropriately. Where an address changes, plan a relevant redirect and update internal links. Sending every old page to the homepage can leave visitors unable to find what they expected.",
      "Review content with the business owner. Remove outdated services, unsupported claims and old contact information. Rewrite pages around current customer questions, including eligibility, process and exclusions. The point is to make the offer more understandable, not merely to place the same vague copy in a newer layout.",
      "Test the release against a checklist of old and new journeys. Confirm the live forms reach the right recipient, important links work and the site behaves on smaller screens. Keep a record of launch changes and agree who will monitor issues afterward. Search positions can change, so a redesign proposal should not promise to preserve every ranking."
    ],
    pricingTitle: "Redesign pricing approach",
    pricingText:
      "Scope depends on the existing site, content condition, integrations, migration and the extent of rebuilding. A visual refresh, a content rewrite and a platform move involve different work. Share the current URL and the problems you want resolved so the quote can name the affected pages and release checks.",
    finalCtaTitle: "Turn an unclear website into a stronger business asset.",
    finalCtaText:
      "If your current website is not explaining the offer clearly or creating enough inquiries, start with a focused redesign review.",
    faqItems: [
      {
        question: "When should a business redesign its website?",
        answer:
          "A redesign is worth considering when the site looks outdated, loads slowly, fails to explain services clearly, has weak SEO structure, or does not generate enough serious inquiries.",
        some_features: ["Outdated Website", "SEO Structure", "Lead Flow"],
      },
      {
        question: "Is website redesign different from building a new website?",
        answer:
          "Yes. A redesign starts from an existing site and decides what should be kept, rewritten, restructured, or rebuilt. A new website usually starts from a blank scope.",
        some_features: ["Existing Site", "Rebuild Scope", "Content Review"],
      },
      {
        question: "Can a redesign improve SEO?",
        answer:
          "Yes, if the redesign fixes headings, metadata, page hierarchy, internal links, speed, content clarity, and crawl issues. Visual changes alone do not guarantee SEO improvement.",
        some_features: ["Metadata", "Internal Links", "Performance"],
      },
      {
        question: "How much does a website redesign cost?",
        answer:
          "Redesign cost depends on page count, content changes, SEO repair, design depth, and whether the existing technical setup can be reused. ReddyStack scopes redesign work around the smallest useful relaunch.",
        some_features: ["Redesign Cost", "Page Count", "SEO Repair"],
      },
    ],
    relatedServiceSlug: "seo-websites",
    relatedBlogSlug: "landing-pages-vs-seo-websites-what-should-you-launch-first",
    relatedProjectSlug: "reelsxpress",
    heroImage: heroWebsite,
    accent: {
      primary: "#00cc97",
      secondary: "#121212",
      glow: "rgba(0, 204, 151, 0.24)",
    },
  },
  {
    slug: "landing-page-development-for-lead-generation",
    path: "/landing-page-development-for-lead-generation",
    navLabel: "Landing Page Development Services",
    metaTitle: "Landing Page Development Services | ReddyStack",
    metaDescription:
      "Landing page development services for lead generation, SaaS launches, app landing pages, service offers, and campaign pages that need clear conversion flow.",
    eyebrow: "Lead Generation Landing Pages",
    shortTitle: "landing page development",
    headline: "Landing page development services for campaigns that need clearer leads.",
    intro:
      "Build a focused page for one offer, with the information a visitor needs and a checked route to an enquiry. ReddyStack can include copy structure, responsive development, forms and agreed tracking in the scope.",
    heroHighlights: [
      "Focused page structure for one offer or campaign",
      "Lead forms, analytics, and conversion-aware CTAs",
      "Useful for SaaS, app, service, and payment-enabled landing pages",
    ],
    fitTitle: "One offer and a clear next action",
    fitIntro:
      "This page is for businesses that do not need a full website for a campaign, but do need a focused page that explains one offer clearly and captures serious interest.",
    fitBullets: [
      "You need a SaaS landing page or app landing page for a launch",
      "You want a lead generation landing page for a service or campaign",
      "You need forms, tracking, clear CTAs, and faster launch execution",
    ],
    includedTitle: "What a lead-focused landing page includes",
    includedBullets: [
      "One clear offer, audience, and conversion action",
      "Hero, proof, benefits, process, FAQ, and contact/lead form sections",
      "Analytics and event tracking for lead actions",
      "Responsive execution for mobile and desktop visitors",
      "Optional payment gateway or lightweight workflow handoff when needed",
    ],
    processTitle: "How the landing page is planned",
    processSteps: [
      {
        label: "01. Offer",
        text: "Define the one thing the page must sell, explain, or validate.",
      },
      {
        label: "02. Message",
        text: "Shape the headline, proof, benefits, and CTA around one visitor intent.",
      },
      {
        label: "03. Track",
        text: "Launch with forms, analytics, and event tracking so leads can be measured.",
      },
    ],
    whyTitle: "Connect the ad promise to the enquiry and follow-up",
    whyParagraphs: [
      "A campaign page should answer the question that brought the visitor there. If the ad promises a particular service, area or starting offer, the page needs to explain those details clearly. A generic homepage can force the visitor to work out whether the offer applies to them.",
      "Use proof you can substantiate. A new business can explain its process, show labelled demo work and describe deliverables without inventing testimonials. Include the practical details that help someone decide: who the service fits, what is excluded, how a quote works and what happens after contact.",
      "Ask for the information needed to respond, without turning the form into a long interview. Decide where submissions go, how the user sees success and what happens after an error. If the next step is WhatsApp or a call, a click records interest; it does not by itself prove a conversation or qualified lead occurred.",
      "The page is only one part of the campaign. Assign someone to respond and record enquiry quality so later changes have a basis. A split test needs a clear question and enough relevant traffic; changing the design every few days on a low-volume campaign may produce little useful evidence."
    ],
    pricingTitle: "Landing page pricing approach",
    pricingText:
      "The quote depends on message development, assets, form behaviour, tracking and integrations. A payment or booking workflow should be specified separately rather than assumed to be a simple button. Advertising spend, campaign management and ongoing tests are included only when expressly agreed.",
    finalCtaTitle: "Launch a landing page built around one clear action.",
    finalCtaText:
      "If you need a SaaS landing page, app landing page, service landing page, or lead generation page, start with the offer and campaign goal.",
    faqItems: [
      {
        question: "What is a lead generation landing page?",
        answer:
          "It is a focused page built around one offer and one conversion action, such as submitting a form, booking a call, joining a waitlist, or requesting a quote.",
        some_features: ["Lead Form", "Single Offer", "Conversion"],
      },
      {
        question: "Is a landing page different from a full website?",
        answer:
          "Yes. A landing page is usually built for one campaign or offer, while a website explains the broader business, services, trust signals, and long-term search structure.",
        some_features: ["Campaign Page", "Website", "Search Structure"],
      },
      {
        question: "Can a landing page include payment gateway setup?",
        answer:
          "Yes, when the offer needs direct payment or booking flow. The scope depends on the payment provider, checkout flow, and confirmation requirements.",
        some_features: ["Payment Gateway", "Checkout", "Booking"],
      },
      {
        question: "Can you build SaaS or mobile app landing pages?",
        answer:
          "Yes. ReddyStack can build SaaS landing pages, app launch pages, waitlist pages, and validation pages with clear messaging and lead tracking.",
        some_features: ["SaaS Landing Page", "App Landing Page", "Waitlist"],
      },
    ],
    relatedServiceSlug: "seo-websites",
    relatedBlogSlug: "landing-pages-vs-seo-websites-what-should-you-launch-first",
    relatedProjectSlug: "reelsxpress",
    keywords: [
      "landing page development services",
      "landing page development",
      "lead generation landing page",
      "SaaS landing page development",
      "app landing page development",
    ],
    heroImage: heroWebsite,
    accent: {
      primary: "#19b3f1",
      secondary: "#121212",
      glow: "rgba(25, 179, 241, 0.24)",
    },
  },
  {
    slug: "affordable-website-development-for-startups",
    path: "/affordable-website-development-for-startups",
    navLabel: "Affordable Website Development for Startups",
    metaTitle: "Affordable Website Development for Startups | ReddyStack",
    metaDescription:
      "Founder-led affordable website development for startups that need SEO-ready structure, sharp positioning, and a practical launch path.",
    eyebrow: "Startup Website Landing Page",
    shortTitle: "Affordable website development",
    headline: "A focused first website for your startup.",
    intro:
      "Launch a startup website that explains the current product or service, its intended customer and the next useful action. ReddyStack keeps the first scope focused on what the business can truthfully offer today.",
    heroHighlights: [
      "Founder-led execution from Rahul Reddy",
      "Clear scope before design and build begin",
      "SEO-ready structure, copy, and conversion flow",
    ],
    fitTitle: "A website for an early-stage offer",
    fitIntro:
      "This page is for teams that need a website to explain the offer clearly, look trustworthy fast, and start generating better conversations without turning a simple launch into a months-long project.",
    fitBullets: [
      "You are testing how to explain a new product or service.",
      "You need a useful launch page or a clearer replacement for an existing site.",
      "You want to agree what belongs in the first release and what can wait."
    ],
    includedTitle: "What the build usually includes",
    includedBullets: [
      "Homepage and service-page structure shaped around real buyer questions",
      "SEO foundations, performance setup, and crawl-friendly page hierarchy",
      "Conversion-aware sections, inquiry paths, and launch support",
      "Messaging guidance so the site explains the business in one pass",
    ],
    processTitle: "How the project stays practical",
    processSteps: [
      {
        label: "01. Scope",
        text: "Define the pages, audience, and action path before visual detail expands the project.",
      },
      {
        label: "02. Position",
        text: "Tighten the message so the startup looks credible, clear, and commercially useful from day one.",
      },
      {
        label: "03. Launch",
        text: "Ship a responsive, SEO-ready website with a cleaner path to inquiries and next steps.",
      },
    ],
    whyTitle: "Make an early-stage business understandable",
    whyParagraphs: [
      "Start with the audience and offer. A waitlist, a paid service and a product ready for signup need different pages. Say clearly what is available now and what is planned. If access is limited or the product is a demo, visitors should understand that before submitting their details.",
      "A startup without clients can still provide useful evidence: a working demonstration, screenshots of the actual product, a clearly labelled personal project or an explanation of the process. Do not substitute invented logos, customer counts or outcome claims for that information.",
      "Keep the first page structure manageable. Explain the problem, show how the offer addresses it, answer the common objections and provide one appropriate next step. Add legal and contact information suited to the actual operation. A pricing table should reflect an offer the business is ready to honour.",
      "Plan how the site changes after launch. Keep control of the domain and hosting, nominate a content owner and record the enquiries or signup questions that reveal confusion. New pages should respond to those needs rather than a desire to look like a much larger company."
    ],
    pricingTitle: "Pricing approach",
    pricingText:
      "A startup quote depends on the launch goal, content readiness, pages and integrations. A waitlist page and a working product account system are different scopes. State the budget and the evidence you need from the first release so optional work can be deferred deliberately.",
    finalCtaTitle: "Launch a startup website that feels credible from the first screen.",
    finalCtaText:
      "If you need an affordable website with better positioning, stronger SEO foundations, and a founder-led build path, start with a project brief.",
    faqItems: [
      {
        question: "Can an affordable startup website still look premium?",
        answer:
          "Yes. The key is controlled scope and strong structure. ReddyStack focuses the budget on the pages, messaging, and UX that directly improve credibility and inquiries.",
        some_features: ["Controlled Scope", "Premium UX", "Credibility"],
      },
      {
        question: "Is this only for Hyderabad startups?",
        answer:
          "No. ReddyStack is based in Hyderabad and works with startups across India and worldwide through a remote-friendly delivery process.",
        some_features: ["Hyderabad", "India", "Worldwide"],
      },
      {
        question: "Will the website be SEO-ready from launch?",
        answer:
          "Yes. The structure, page hierarchy, speed, and on-page SEO foundations are planned into the build instead of being treated as an afterthought.",
        some_features: ["SEO-ready", "Page Hierarchy", "Performance"],
      },
    ],
    relatedServiceSlug: "seo-websites",
    relatedBlogSlug: "how-seo-websites-help-startups-get-better-leads",
    relatedProjectSlug: "kalyamram",
    heroImage: heroWebsite,
    accent: {
      primary: "#ffdb59",
      secondary: "#121212",
      glow: "rgba(255, 219, 89, 0.24)",
    },
  },
  {
    slug: "seo-website-development-for-small-businesses",
    path: "/seo-services",
    navLabel: "SEO Services for Small Businesses",
    metaTitle: "SEO Services for Small Businesses | ReddyStack",
    metaDescription:
      "SEO services for small businesses that need better visibility, clearer service pages, and founder-led practical delivery.",
    eyebrow: "Search-Focused Service Page",
    shortTitle: "SEO services for small businesses",
    headline: "SEO services for small businesses that need visibility and clearer lead flow.",
    intro:
      "ReddyStack provides SEO services for small businesses that want stronger search visibility, cleaner service-page structure, and a more direct route from discovery to inquiry.",
    heroHighlights: [
      "Search-ready page structure from the start",
      "Better service-page clarity for real buyers",
      "Hyderabad-based, serving India and worldwide",
    ],
    fitTitle: "When service pages need more clarity",
    fitIntro:
      "If the website should help people discover your services, understand what you do quickly, and contact you with higher intent, the build needs stronger SEO structure and better page planning from day one.",
    fitBullets: [
      "Small businesses with multiple services or offers",
      "Teams that want organic growth without messy page architecture",
      "Brands replacing unclear websites with a more useful acquisition asset",
    ],
    includedTitle: "What the service usually includes",
    includedBullets: [
      "Keyword-aware service page planning and cleaner page hierarchy",
      "Conversion-focused copy structure, CTAs, and inquiry paths",
      "On-page SEO setup, technical hygiene, and performance tuning",
      "Responsive execution that keeps the message clear on mobile and desktop",
    ],
    processTitle: "How the work is approached",
    processSteps: [
      {
        label: "01. Search intent",
        text: "Map what buyers are likely searching for and decide which pages deserve dedicated visibility.",
      },
      {
        label: "02. Structure",
        text: "Build a page system that supports rankings, trust, and conversion instead of forcing everything onto one page.",
      },
      {
        label: "03. Conversion",
        text: "Tighten the site so visitors can understand the offer quickly and move toward contact with less hesitation.",
      },
    ],
    whyTitle: "Give each useful service a page that answers the buyer",
    whyParagraphs: [
      "List the services customers actually ask for and the places you can serve. Group overlapping topics where one page can answer them properly. A separate page makes sense when the service or customer question is distinct; repeating the same text with another location name adds little useful information.",
      "A service page should cover the work, who it suits, the process, exclusions and a realistic next step. Use real business details and available evidence. A clear description of what you do is more useful than repeatedly calling the business the best or leading provider.",
      "Review technical access alongside the content. Important pages should be available, linked from relevant parts of the site and represented by the intended canonical address. Search Console can help investigate discovery and indexing, but submitting a sitemap or requesting indexing does not force Google to include a page.",
      "Measure relevant queries, page visibility, clicks and successful enquiries over a period appropriate to the traffic. Separate the completion of SEO work from its eventual search outcome. For eligible businesses, Google Business Profile and accurate local details can form another part of the scope; online-only businesses need a different approach."
    ],
    pricingTitle: "Pricing approach",
    pricingText:
      "The scope may be an audit, implementation on existing pages, a new site or ongoing support. Price depends on the pages, content gaps, technical condition and genuine business locations. Agree who implements recommendations and what reporting is included; rankings and enquiry volumes are not guaranteed.",
    finalCtaTitle: "Turn your website into a cleaner visibility and inquiry asset.",
    finalCtaText:
      "If your small business needs stronger SEO page structure and clearer service positioning, start with a scoped website plan.",
    faqItems: [
      {
        question: "Do small businesses really need SEO-ready service pages?",
        answer:
          "Yes. Service pages help search engines understand what you offer and help buyers land on the exact page that answers their question.",
        some_features: ["Service Pages", "Search Visibility", "Lead Intent"],
      },
      {
        question: "Is this different from just redesigning the website?",
        answer:
          "Yes. The focus is not only visual improvement. The build also improves page structure, search relevance, and conversion clarity.",
        some_features: ["Structure", "Search Relevance", "Conversion"],
      },
      {
        question: "Can this work for businesses outside Hyderabad?",
        answer:
          "Yes. ReddyStack is based in Hyderabad but supports businesses across India and international markets through remote-first delivery.",
        some_features: ["Hyderabad", "India", "International"],
      },
    ],
    relatedServiceSlug: "seo-local-seo",
    relatedBlogSlug: "landing-pages-vs-seo-websites-what-should-you-launch-first",
    relatedProjectSlug: "reelsxpress",
    keywords: [
      "SEO services for small businesses",
      "SEO services in India",
      "SEO services in Hyderabad",
      "SEO website development",
      "small business SEO services",
    ],
    heroImage: heroWebsite,
    accent: {
      primary: "#00cc97",
      secondary: "#121212",
      glow: "rgba(0, 204, 151, 0.24)",
    },
  },
  {
    slug: "mvp-development-for-startup-founders",
    path: "/mvp-development-for-startup-founders",
    navLabel: "MVP Development for Startups",
    metaTitle: "MVP Development for Startups | ReddyStack",
    metaDescription:
      "MVP development for startups and founders who need lean scoping, faster validation, and practical delivery.",
    eyebrow: "Founder MVP Landing Page",
    shortTitle: "MVP development",
    headline: "MVP development for startups that need validation without overbuilding.",
    intro:
      "Build a first product release around one user, one important job and a question you need answered. ReddyStack helps turn an idea into a bounded scope with a usable journey and explicit release checks.",
    heroHighlights: [
      "Lean scope around what users actually need first",
      "Founder-led execution with faster decisions",
      "Built for India and worldwide startup teams",
    ],
    fitTitle: "A first release with a defined purpose",
    fitIntro:
      "This page is for startup founders, operators, and early teams that need to validate an idea, test demand, or launch a cleaner first release without carrying unnecessary feature weight.",
    fitBullets: [
      "Founders launching a first usable product to real users",
      "Teams that need validation, demos, or early traction faster",
      "Product ideas that need sharper scope before engineering expands too early",
    ],
    includedTitle: "What the MVP build usually includes",
    includedBullets: [
      "Lean feature scoping around the core user journey",
      "Screen and workflow planning for a realistic first release",
      "Founder-led delivery using AI-assisted build workflows where useful",
      "Post-launch iteration thinking so version one can evolve cleanly",
    ],
    processTitle: "How the MVP stays lean",
    processSteps: [
      {
        label: "01. Decide",
        text: "Define the one user outcome the first release must support before secondary ideas start expanding the scope.",
      },
      {
        label: "02. Build",
        text: "Shape the core flows, screens, and release structure around clarity, not feature volume.",
      },
      {
        label: "03. Validate",
        text: "Launch a usable first version with a cleaner path to feedback, traction, or investor-facing demos.",
      },
    ],
    whyTitle: "Define what the first release should teach you",
    whyParagraphs: [
      "Write the assumption in a form you can investigate. For example, will small service businesses submit a structured request instead of explaining it through several messages? The first version needs to support that behaviour and capture useful feedback. It may not need a complex analytics dashboard or every feature on the roadmap.",
      "Separate a presentation prototype from a release used by real people. A prototype can demonstrate an intended flow. A working release must handle actual records, permissions, failures and any payment obligations it introduces. The proposal should name which deliverable you are buying.",
      "Manual operations can be a sensible early choice when they are visible and owned. A founder might review submissions manually before an automated routing system is justified. Record the time and exceptions involved so the next development decision is based on the work, not a guess.",
      "At release, agree how users get help, who monitors errors and how feedback is recorded. Look for repeated obstacles and completed tasks rather than treating every suggestion as a feature requirement. The next phase should follow what the first release teaches you; the build itself cannot guarantee demand or investment."
    ],
    pricingTitle: "Pricing approach",
    pricingText:
      "MVP cost depends on complete workflows, roles, data, integrations and release expectations. State what can be manual, what must work automatically and what is outside the first release. Hosting, provider fees and later iterations should be identified separately.",
    finalCtaTitle: "Ship the MVP that earns better feedback instead of more confusion.",
    finalCtaText:
      "If you need a founder-led MVP build with faster validation and less feature waste, start with the core release plan.",
    faqItems: [
      {
        question: "Can you help reduce unnecessary MVP features?",
        answer:
          "Yes. Scope control is one of the main parts of the service. The first version should prove the idea, not carry every possible feature.",
        some_features: ["Scope Control", "Validation", "Lean Build"],
      },
      {
        question: "Is this only for venture-backed startups?",
        answer:
          "No. It also fits bootstrapped founders, internal product ideas, and early teams that need a usable first version with practical delivery.",
        some_features: ["Bootstrapped Founders", "Internal Products", "Early Teams"],
      },
      {
        question: "Can this support founders outside India?",
        answer:
          "Yes. ReddyStack is based in Hyderabad and supports founders across India and worldwide through remote execution.",
        some_features: ["Hyderabad", "India", "Worldwide"],
      },
    ],
    relatedServiceSlug: "mvp-builds",
    relatedBlogSlug: "what-a-founder-led-mvp-launch-needs-before-release",
    relatedProjectSlug: "gitwall-app",
    keywords: [
      "MVP development for startups",
      "MVP development services",
      "startup MVP development",
      "founder MVP development",
      "lean MVP build",
    ],
    heroImage: heroMvp,
    accent: {
      primary: "#ff759c",
      secondary: "#121212",
      glow: "rgba(255, 117, 156, 0.24)",
    },
  },
  {
    slug: "ai-automation-services-for-small-teams",
    path: "/ai-automation",
    navLabel: "AI Automation Services",
    metaTitle: "AI Automation Services for Small Teams | ReddyStack",
    metaDescription:
      "AI automation services for small teams that need faster operations, better workflow consistency, and founder-led practical delivery.",
    eyebrow: "Operations Automation Page",
    shortTitle: "AI automation services",
    headline: "AI automation services for small teams that need less manual work and better operational flow.",
    intro:
      "ReddyStack helps small teams design practical AI automations for repetitive business work. The focus is operational usefulness: clearer workflows, faster responses, and less time lost to manual follow-up.",
    heroHighlights: [
      "Workflow-first automation instead of novelty demos",
      "Prompt engineering and handoff logic where it matters",
      "Practical systems for lean teams across India and worldwide",
    ],
    fitTitle: "Repeated work with a checkable result",
    fitIntro:
      "This page is for founders, operators, and lean teams who want to reduce repetitive work, improve consistency, and create faster internal or client-facing processes without hiring for every repeated task.",
    fitBullets: [
      "Teams handling repeated lead, content, or operations workflows",
      "Businesses that need automations connected to existing tools and forms",
      "Operators who want better consistency without replacing everything at once",
    ],
    includedTitle: "What the automation work usually includes",
    includedBullets: [
      "Workflow mapping around repetitive business actions",
      "Prompt logic and AI-assisted process design for common paths",
      "Automation setup for lead handling, operations, and content workflows",
      "Optional lightweight front-end layers when users need a cleaner interaction",
    ],
    processTitle: "How the work stays practical",
    processSteps: [
      {
        label: "01. Map",
        text: "Identify the repeated tasks, handoffs, and delays that actually deserve automation.",
      },
      {
        label: "02. Design",
        text: "Shape the logic so the automation is useful, trackable, and maintainable instead of brittle.",
      },
      {
        label: "03. Integrate",
        text: "Connect the workflow into real operations, forms, or customer handling where the time savings matter.",
      },
    ],
    whyTitle: "Choose a repeated task with a clear correct outcome",
    whyParagraphs: [
      "Good starting candidates have regular inputs and a result someone can check: sorting enquiries, preparing a draft from approved facts or summarising an internal record. A process with changing rules and no owner usually needs clarification before automation.",
      "Walk through several recent examples, including one that went wrong. Identify missing information, duplicate messages and decisions requiring judgement. Use fixed rules for predictable steps. Introduce AI where interpretation is useful, with validation before the output changes a record or reaches a customer.",
      "Agree the approval boundary. A draft response can wait for a person; a simple internal notification may be sent automatically if that is authorised. The system should have limited access, a failure notification and a clear way to pause it. An instruction inside a customer message should not be able to change those permissions.",
      "Measure the remaining review and correction work, provider costs and failure rate alongside any time saved. Start with a limited volume and expand only after the workflow behaves predictably. Assign an operator who can respond when an integration or business rule changes."
    ],
    pricingTitle: "Pricing approach",
    pricingText:
      "The estimate depends on connected tools, data, branching, approval steps and failure recovery. Usage charges and subscriptions may recur even when no development is happening. Share expected volume and existing tools so the proposal can explain both implementation and operating costs.",
    finalCtaTitle: "Turn repeated work into a cleaner system your team can actually use.",
    finalCtaText:
      "If your team is losing time to manual follow-up, content handling, or scattered ops, start with a practical automation brief.",
    faqItems: [
      {
        question: "Are AI automations useful for very small teams?",
        answer:
          "Yes. Small teams often feel the time cost of repeated manual work most intensely, which makes focused automation especially valuable.",
        some_features: ["Small Teams", "Time Savings", "Automation"],
      },
      {
        question: "Can automations work with our existing tools?",
        answer:
          "Yes. ReddyStack can connect automations to existing forms, workflows, and lightweight interfaces when the goal is to reduce friction rather than rebuild everything.",
        some_features: ["Existing Tools", "Forms", "Workflows"],
      },
      {
        question: "Do you work only with Hyderabad-based companies?",
        answer:
          "No. ReddyStack is based in Hyderabad and works with teams across India and international markets through remote-friendly delivery.",
        some_features: ["Hyderabad", "India", "International"],
      },
    ],
    relatedServiceSlug: "ai-automations",
    relatedBlogSlug: "ai-automations-small-teams-can-actually-use",
    relatedProjectSlug: "telegram-auto-reply-bot",
    heroImage: heroAutomation,
    accent: {
      primary: "#19b3f1",
      secondary: "#121212",
      glow: "rgba(25, 179, 241, 0.24)",
    },
  },
  {
    slug: "ai-chatbot-development",
    path: "/ai-chatbot-development",
    navLabel: "AI Chatbot Development Services",
    metaTitle: "AI Chatbot Development Services | ReddyStack",
    metaDescription:
      "AI chatbot development services for websites, lead handling, support flows, and small-team workflows with practical scope and honest limitations.",
    eyebrow: "AI Chatbot Service Page",
    shortTitle: "AI chatbot development",
    headline: "AI chatbot development services for lead handling, support, and practical business workflows.",
    intro:
      "Build a website assistant for a defined set of questions, useful enquiry collection and a clear handoff to a person. ReddyStack scopes the knowledge, allowed actions and fallback behaviour before choosing the chatbot setup.",
    heroHighlights: [
      "Website chatbots for lead capture and support routing",
      "Prompt logic, fallback messages, and human handoff paths",
      "Built for small teams that need practical automation, not novelty demos",
    ],
    fitTitle: "Common questions and clear handoffs",
    fitIntro:
      "This page is for founders, service businesses, and small teams that want a chatbot to answer common questions, collect useful lead context, or reduce repetitive response work without pretending automation can replace every human conversation.",
    fitBullets: [
      "You need a website chatbot connected to contact, WhatsApp, or inquiry flow",
      "You want clearer response logic for repeated questions and lead qualification",
      "You need honest fallback handling when the bot should send the user to a person",
    ],
    includedTitle: "What AI chatbot development can include",
    includedBullets: [
      "Conversation mapping around common buyer questions and support intents",
      "Prompt design, response rules, fallback logic, and escalation paths",
      "Lead qualification questions and contact handoff to form, email, or WhatsApp",
      "Website integration planning and testing for mobile-first visitors",
      "Analytics-ready events where the chatbot is part of a lead generation flow",
    ],
    processTitle: "How the chatbot build stays useful",
    processSteps: [
      {
        label: "01. Map questions",
        text: "List the real questions users ask and decide which answers should be automated.",
      },
      {
        label: "02. Design flow",
        text: "Shape the conversation, lead fields, fallbacks, and handoff points around useful outcomes.",
      },
      {
        label: "03. Test and refine",
        text: "Check the chatbot on mobile and desktop so answers stay clear and escalation is easy.",
      },
    ],
    whyTitle: "Make the bot's limits useful to the visitor",
    whyParagraphs: [
      "Begin with questions people actually ask and approved answers about the business. Service eligibility, coverage, opening hours and the quoting process are useful candidates. Identify who keeps those answers current. A chatbot cannot reliably explain a changing offer when its source material is outdated.",
      "Decide what happens when the answer is missing or uncertain. The assistant can say it cannot confirm a detail and offer a contact route, rather than inventing a price or availability. Keep that human contact route easy to find even when the bot is working normally.",
      "For enquiry collection, ask only for information needed for the agreed handoff and explain what happens next. A visitor entering an email address is not permission for unrelated actions. If the bot connects to account data or tools, permissions and validation need to be enforced by the application, not merely requested in the prompt.",
      "Test conflicting requests, unsupported questions, long messages and mobile use. Review transcripts only within the agreed data-handling arrangements. Track whether people reach a useful answer or handoff, not just how many messages they exchange. Repeated confusion is a reason to improve the source content or flow."
    ],
    pricingTitle: "AI chatbot pricing approach",
    pricingText:
      "Scope depends on knowledge sources, conversation paths, integrations, permitted actions and monitoring needs. A question-answering assistant is different from a bot that changes bookings or accesses private accounts. Hosting, model usage, provider subscriptions and ongoing content updates should be stated separately where applicable.",
    finalCtaTitle: "Build a chatbot that helps users reach the next step faster.",
    finalCtaText:
      "If you need AI chatbot development for lead handling or support, start with the questions users ask most often and ReddyStack will shape the right first version.",
    faqItems: [
      {
        question: "What can an AI chatbot do for a small business website?",
        answer:
          "An AI chatbot can answer common questions, collect lead context, guide users to the right service, and hand conversations to a form, email, or WhatsApp when human follow-up is needed.",
        some_features: ["Lead Capture", "Common Questions", "Human Handoff"],
      },
      {
        question: "Can a chatbot replace support completely?",
        answer:
          "No. A chatbot should handle repeated questions and simple routing, but important sales, support, or exception cases still need a clear human handoff.",
        some_features: ["Honest Limits", "Support Routing", "Fallbacks"],
      },
      {
        question: "Can the chatbot connect with existing contact flows?",
        answer:
          "Yes. The chatbot can be planned around contact forms, email, WhatsApp, or other lightweight handoff paths when the goal is to reduce friction for users.",
        some_features: ["Forms", "WhatsApp", "Email Handoff"],
      },
      {
        question: "Do you build chatbot content and prompt logic?",
        answer:
          "Yes. Conversation structure, answer guidelines, prompt logic, fallback handling, and testing are part of the work when they are needed for the chatbot to be useful.",
        some_features: ["Prompt Logic", "Conversation Design", "Testing"],
      },
    ],
    relatedServiceSlug: "ai-automations",
    relatedBlogSlug: "ai-automations-small-teams-can-actually-use",
    relatedProjectSlug: "telegram-auto-reply-bot",
    keywords: [
      "AI chatbot development",
      "website chatbot development",
      "AI chatbot for small business",
      "lead generation chatbot",
      "customer support chatbot",
    ],
    heroImage: heroAutomation,
    accent: {
      primary: "#19b3f1",
      secondary: "#121212",
      glow: "rgba(25, 179, 241, 0.24)",
    },
  },
];

export type IntentLandingPageSlug = (typeof intentLandingPages)[number]["slug"];
export type { IntentLandingPage };

export function getIntentLandingPage(slug: IntentLandingPageSlug) {
  return intentLandingPages.find((page) => page.slug === slug);
}

function buildHighlightTitle(shortTitle: string): [string, string] {
  const words = shortTitle.split(" ");

  if (words.length === 1) {
    return [words[0], "Launch"];
  }

  return [words[0], words.slice(1).join(" ")];
}

export function buildIntentServiceDetail(page: IntentLandingPage): ServiceDetail {
  const project = getPortfolioProject(page.relatedProjectSlug);
  const relatedBlog = getBlogPost(page.relatedBlogSlug);
  const conciseHighlights = page.faqItems
    .flatMap((item) => item.some_features)
    .slice(0, 5);

  return {
    slug: page.slug,
    path: page.path,
    contactService: page.relatedServiceSlug,
    subtitle: page.eyebrow,
    title: page.navLabel,
    introPrimary: page.intro,
    introSecondary: page.fitIntro,
    overviewPrimary: page.whyParagraphs[0] || page.pricingText,
    overviewSecondary: page.whyParagraphs[1] || page.finalCtaText,
    features: page.includedBullets,
    closingSummary: page.pricingText,
    sideTitle: "Service Scope",
    categories: conciseHighlights.length ? conciseHighlights : page.heroHighlights,
    highlightTitle: buildHighlightTitle(page.shortTitle),
    highlightText: page.finalCtaText,
    metaTitle: page.metaTitle,
    metaDescription: page.metaDescription,
    heroImage: page.heroImage,
    presentation: {
      faqTitle: `Questions About ${page.shortTitle}`,
      faqDescription: `Clear answers for teams exploring ${page.shortTitle.toLowerCase()} with ReddyStack.`,
      faqHighlights: conciseHighlights.slice(0, 3),
    },
    answerSections: [
      {
        title: page.fitTitle,
        bullets: page.fitBullets,
      },
      {
        title: page.includedTitle,
        bullets: page.includedBullets,
      },
      {
        title: page.whyTitle,
        paragraphs: page.whyParagraphs,
      },
    ],
    processTitle: page.processTitle,
    processSteps: page.processSteps,
    pricingTitle: page.pricingTitle,
    pricingText: page.pricingText,
    finalCtaTitle: page.finalCtaTitle,
    finalCtaText: page.finalCtaText,
    relatedLinks: [
      ...(page.relatedServiceSlug === 'seo-websites' ? [{ title: 'Website development guides and checklists', path: '/blog/website-development' }] : []),
      ...(page.relatedServiceSlug === 'seo-local-seo' ? [{ title: 'SEO & Local SEO guides', path: '/blog/seo-local-seo' }] : []),
      ...(relatedBlog ? [{ title: 'Guide: ' + relatedBlog.title, path: relatedBlog.path }] : []),
      ...(project ? [{ title: 'Development example: ' + project.title, path: project.path }] : []),
    ],
    faqItems: page.faqItems,
  };
}

export function getAdjacentIntentServiceDetails(slug: IntentLandingPageSlug) {
  const currentIndex = intentLandingPages.findIndex((page) => page.slug === slug);

  if (currentIndex === -1) {
    return {
      previousPage: null,
      nextPage: null,
    };
  }

  const previousPage =
    intentLandingPages[
      (currentIndex - 1 + intentLandingPages.length) % intentLandingPages.length
    ];
  const nextPage = intentLandingPages[(currentIndex + 1) % intentLandingPages.length];

  return {
    previousPage: buildIntentServiceDetail(previousPage),
    nextPage: buildIntentServiceDetail(nextPage),
  };
}

export function buildIntentLandingPageMetadata(page: IntentLandingPage): Metadata {
  const canonicalUrl = buildCanonicalUrl(page.path);

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    openGraph: buildOpenGraph({
      title: page.metaTitle,
      description: page.metaDescription,
      url: canonicalUrl,
      images: [buildSeoImage(page.heroImage, page.headline)],
    }),
    twitter: buildTwitterCard({
      title: page.metaTitle,
      description: page.metaDescription,
      images: [buildSeoImage(page.heroImage, page.headline).url],
    }),
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export function buildIntentLandingPageSchema(page: IntentLandingPage) {
  const canonicalUrl = buildCanonicalUrl(page.path);
  const serviceId = `${canonicalUrl}#service`;
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        name: page.metaTitle,
        url: canonicalUrl,
        description: page.metaDescription,
        keywords: page.keywords?.join(", "),
        about: {
          "@id": serviceId,
        },
        mainEntity: {
          "@id": serviceId,
        },
        breadcrumb: {
          "@id": breadcrumbId,
        },
        isPartOf: {
          "@id": schemaIds.website,
        },
        primaryImageOfPage: buildSeoImage(page.heroImage, page.headline).url,
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: page.navLabel,
        serviceType: page.shortTitle,
        description: page.metaDescription,
        url: canonicalUrl,
        areaServed: "Worldwide",
        audience: {
          "@type": "Audience",
          audienceType: "Startups, creators, small businesses, founders, and online-first teams",
        },
        provider: {
          "@id": schemaIds.organization,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: buildCanonicalUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: buildCanonicalUrl("/service"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: page.navLabel,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };
}
