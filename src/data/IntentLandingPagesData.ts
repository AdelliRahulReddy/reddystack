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
    metaTitle: "Website Development Services | Reddystack",
    metaDescription:
      "Founder-led website development services for startups and businesses that need affordable, SEO-ready websites, landing pages, and service pages.",
    eyebrow: "Website Development Services",
    shortTitle: "website development services",
    headline: "Website development services for businesses that need visibility, trust, and leads.",
    intro:
      "Reddystack provides website development services for startups, small businesses, founders, and service brands that need a credible online presence without unnecessary agency overhead. The work covers SEO-ready structure, responsive design, clear service pages, lead forms, analytics, and launch support.",
    heroHighlights: [
      "SEO-ready website development for service businesses and startups",
      "Responsive pages built around clarity, speed, and inquiries",
      "Founder-led delivery for India and worldwide clients",
    ],
    fitTitle: "Best fit for teams searching for website development services with practical scope and premium execution.",
    fitIntro:
      "This page is for businesses that need a serious website, not just a visual template. The build is planned around buyer intent, page hierarchy, mobile experience, and the path from search visit to inquiry.",
    fitBullets: [
      "You need a business website, service website, portfolio site, or launch-ready landing page",
      "You want website development that includes SEO basics, speed, forms, and tracking from the start",
      "You prefer clear scope and founder-led execution instead of a bloated agency process",
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
    whyTitle: "Why a service website needs more than a template",
    whyParagraphs: [
      "A template can make a website look complete, but rankings and leads usually depend on structure: clear headings, focused service pages, useful FAQs, fast loading, and internal links that help search engines understand the business.",
      "Reddystack keeps website development founder-led so scope stays tight and useful. The focus is affordable execution that still feels credible, performs well, and gives Google and AI search systems a clearer service entity to understand.",
    ],
    pricingTitle: "Website development pricing approach",
    pricingText:
      "Pricing depends on page count, content depth, design detail, SEO scope, forms, and integrations. Simple sites can stay lean, while service websites with stronger SEO structure or custom sections need more planning and build time.",
    finalCtaTitle: "Build a website that can rank, explain, and convert.",
    finalCtaText:
      "If you need website development services with clear scope, SEO foundations, and practical delivery, start with the business goal and Reddystack will shape the right first version.",
    faqItems: [
      {
        question: "What is included in website development services?",
        answer:
          "Website development can include page planning, responsive design, frontend build, content structure, SEO setup, forms, analytics, schema, sitemap, and launch checks. The exact scope depends on the business goal.",
        some_features: ["Responsive Build", "SEO Setup", "Lead Forms"],
      },
      {
        question: "Can Reddystack build affordable business websites?",
        answer:
          "Yes. Reddystack can keep the first version affordable by controlling scope, focusing on essential pages, and prioritizing the sections that improve credibility and inquiries.",
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
          "Yes. Reddystack is based in Hyderabad and works with clients across India and worldwide through a remote-friendly delivery process.",
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
    metaTitle: "Affordable Website Development | Reddystack",
    metaDescription:
      "Affordable website development for startups and small businesses that need clear scope, SEO-ready structure, responsive design, and practical launch support.",
    eyebrow: "Affordable Website Development",
    shortTitle: "affordable website development",
    headline: "Affordable website development without making the site look or feel cheap.",
    intro:
      "Reddystack helps startups, small businesses, and founder-led teams build affordable websites that still feel credible, load cleanly, and support real inquiries. The approach is to control scope, prioritize useful pages, and avoid paying for features the first version does not need.",
    heroHighlights: [
      "Affordable business websites with clear launch scope",
      "SEO-ready structure, responsive build, and contact tracking",
      "Designed for startups, service brands, and small teams",
    ],
    fitTitle: "Best fit for teams comparing affordable website development without wanting a generic low-quality build.",
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
    whyTitle: "Why affordable should mean focused, not weak",
    whyParagraphs: [
      "A weak low-cost website usually cuts the wrong things: structure, copy, mobile polish, SEO basics, and tracking. That makes the site cheaper at first but less useful after launch.",
      "Reddystack treats affordable website development as scope control. The site should start lean, but the foundation still needs to be credible enough for search engines, AI search tools, and real buyers to understand.",
    ],
    pricingTitle: "Affordable pricing approach",
    pricingText:
      "Affordable website pricing depends on pages, content, forms, SEO setup, and design depth. Reddystack can start with a lean scope for simple sites and expand only when the business case is clear.",
    finalCtaTitle: "Launch a focused website that does the important work first.",
    finalCtaText:
      "If you need affordable website development with clear priorities, share the goal and Reddystack will help shape the smallest useful version.",
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
    metaTitle: "Website Development Under 10000 | Reddystack",
    metaDescription:
      "Website development under 10000 for focused launch pages, starter websites, portfolios, and simple business sites with clear scope.",
    eyebrow: "Budget Website Development",
    shortTitle: "website development under 10000",
    headline: "Website development under 10000 for focused first launches.",
    intro:
      "Reddystack can support website development under 10000 when the scope is focused: a simple landing page, portfolio, starter business page, or basic online presence. The goal is to be honest about what fits the budget while still protecting clarity, mobile usability, and contact flow.",
    heroHighlights: [
      "Useful for one-page websites, starter pages, and small portfolios",
      "Clear scope so the budget is realistic from the beginning",
      "Contact path, responsive structure, and basic launch hygiene included where possible",
    ],
    fitTitle: "Best fit for businesses searching for budget website development or a website under 10000.",
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
    whyTitle: "What a budget website should and should not promise",
    whyParagraphs: [
      "A website under Rs. 10,000 should not promise enterprise-level design depth, full SEO campaigns, custom dashboards, or complex integrations. Those require more planning and build time.",
      "It can still be useful when the scope is honest. Reddystack keeps budget websites focused on a clear offer, responsive execution, and a direct contact path so the first web presence has a real business purpose.",
    ],
    pricingTitle: "Budget website pricing approach",
    pricingText:
      "Under Rs. 10,000 works best for simple launch pages, starter portfolios, or basic business pages with limited scope. If the project needs multiple pages, deeper SEO content, integrations, or custom design systems, it should be scoped as a larger website build.",
    finalCtaTitle: "Start lean, then grow the website when the business needs it.",
    finalCtaText:
      "If you need a website under Rs. 10,000, share the exact goal and Reddystack will tell you what can fit honestly within the budget.",
    faqItems: [
      {
        question: "Can I get a website under Rs. 10,000?",
        answer:
          "Yes, if the scope is simple. A one-page website, starter portfolio, or focused landing page can fit this range when content, sections, animations, and integrations stay limited.",
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
    metaTitle: "App Development Services | Reddystack",
    metaDescription:
      "Mobile app development services for founders and businesses that need lean product scoping, mobile-first flows, MVP builds, and practical launch support.",
    eyebrow: "Mobile App Development Services",
    shortTitle: "mobile app development services",
    headline: "Mobile app development services for founders who need a usable first release.",
    intro:
      "Reddystack helps founders and businesses plan and build mobile-first product experiences, MVPs, and application flows with practical scope. The focus is not feature volume. It is the first version users can understand, use, and give feedback on.",
    heroHighlights: [
      "Mobile-first product planning and app flow structure",
      "MVP app development with lean release scope",
      "Founder-led delivery for early-stage and business app ideas",
    ],
    fitTitle: "Best fit for teams comparing mobile app development services before building a full product.",
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
    whyTitle: "Why app development should start with scope",
    whyParagraphs: [
      "Many app builds become expensive because version one tries to act like a mature platform. A better first release focuses on the core user outcome, the minimum workflow, and enough polish to be trusted.",
      "Reddystack approaches mobile app development through founder-led product thinking, so decisions stay tied to validation, usability, and a realistic launch path.",
    ],
    pricingTitle: "Mobile app pricing approach",
    pricingText:
      "Mobile app development pricing depends on screens, roles, integrations, backend logic, authentication, data flows, and launch requirements. A simple MVP app costs less than a multi-role product with deep workflows.",
    finalCtaTitle: "Build the mobile app version that can actually launch.",
    finalCtaText:
      "If you need mobile app development services or an MVP app build, start with the core user journey and Reddystack will help scope version one.",
    faqItems: [
      {
        question: "Does Reddystack build full mobile apps or only MVPs?",
        answer:
          "Reddystack can support MVP app builds, mobile-first product flows, and practical application builds. The recommended scope depends on the product stage and the user journey.",
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
    metaTitle: "Custom Web Application Development Services | Reddystack",
    metaDescription:
      "Custom web application development services for dashboards, internal tools, portals, workflow systems, and MVP products with practical scope.",
    eyebrow: "Custom Web Application Development",
    shortTitle: "custom web application development",
    headline: "Custom web application development services for workflows that need more than a website.",
    intro:
      "Reddystack builds custom web applications, dashboards, internal tools, portals, and workflow systems for teams that need users to do something, not just read information. The work starts with process clarity, then turns the core flow into a usable product surface.",
    heroHighlights: [
      "Custom web apps, dashboards, portals, and internal tools",
      "Workflow-first planning for real business actions",
      "Practical development scope for startups and growing teams",
    ],
    fitTitle: "Best fit for teams searching for custom web application development services with clear product thinking.",
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
    whyTitle: "Why custom web apps need product discipline",
    whyParagraphs: [
      "Custom web applications can become expensive when every possible feature enters version one. Strong scoping keeps the product focused on the workflow that creates real value.",
      "Reddystack combines website clarity, product planning, and founder-led delivery so custom web application development stays practical instead of turning into a long unclear build.",
    ],
    pricingTitle: "Custom web application pricing approach",
    pricingText:
      "Pricing depends on user roles, screens, data models, integrations, permissions, and workflow complexity. A lightweight internal tool has a different scope from a customer-facing product or full SaaS platform.",
    finalCtaTitle: "Turn the workflow into a web app people can use.",
    finalCtaText:
      "If your business needs a custom web application, dashboard, portal, or internal tool, start with the workflow and Reddystack will shape a practical first release.",
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
        question: "Can Reddystack build internal business tools?",
        answer:
          "Yes. Reddystack can support internal tools, dashboards, portals, and workflow interfaces when the business needs a cleaner system than spreadsheets or scattered manual steps.",
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
    metaTitle: "How Much Does a Website Cost in India? | Reddystack",
    metaDescription:
      "Clear website cost guidance for India, covering static websites, business websites, landing pages, redesigns, and custom website development.",
    eyebrow: "Website Cost Guide",
    shortTitle: "website cost in India",
    headline: "How much does a website cost in India for a serious business launch?",
    intro:
      "Website cost in India depends on scope, content, design depth, SEO structure, integrations, and how much custom work the business needs. Reddystack helps founders and businesses choose a practical website budget instead of paying for bloated scope or underbuilt template work.",
    heroHighlights: [
      "Static website cost: usually lower when scope is simple",
      "Business website cost: depends on pages, copy, SEO, and conversion flow",
      "Custom website cost: higher when workflows, dashboards, or integrations are needed",
    ],
    fitTitle: "Best fit for founders comparing website creation cost, design charges, and realistic launch scope.",
    fitIntro:
      "This guide is for startups, small businesses, and founder-led teams that need a clear view of website development cost in India before starting a project.",
    fitBullets: [
      "You need a credible website but do not know what budget range is realistic",
      "You are comparing static website cost, dynamic website cost, and custom development cost",
      "You want a site that is SEO-ready, mobile-friendly, and built around inquiries",
    ],
    includedTitle: "Common website cost ranges in India",
    includedBullets: [
      "Simple landing page or one-page website: often Rs. 10,000 to Rs. 35,000 depending on copy, design, and form setup",
      "Static business website: often Rs. 25,000 to Rs. 75,000 for a clear homepage, service sections, contact flow, and basic SEO",
      "SEO-ready small business website: often Rs. 50,000 to Rs. 1,50,000 when service pages, stronger content structure, and performance work are included",
      "Custom website or web app: often Rs. 1,50,000+ when dashboards, logins, integrations, or custom workflows are part of the build",
      "Website redesign: pricing depends on whether the work is visual cleanup, content restructuring, SEO repair, or full rebuild",
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
    whyTitle: "Why cost varies so much",
    whyParagraphs: [
      "A low-cost website usually keeps scope narrow: fewer pages, simpler visuals, limited content work, and fewer integrations. That can be enough for a first presence, but it may not support search visibility or serious lead generation.",
      "A stronger website budget usually covers positioning, page structure, responsive execution, SEO foundations, performance, forms, and launch support. Reddystack keeps the work founder-led so the budget goes into useful scope instead of unnecessary agency overhead.",
    ],
    pricingTitle: "Pricing guidance",
    pricingText:
      "The practical answer is to price the website around the business goal. A launch page, a service website, a redesign, and a custom web app are different projects. Reddystack starts by clarifying the outcome, then scopes the smallest useful version that can still look credible and convert.",
    finalCtaTitle: "Get a clear website scope before deciding the budget.",
    finalCtaText:
      "If you want to understand the right website cost for your startup, small business, or service brand, share the project goal and Reddystack will help shape a practical scope.",
    faqItems: [
      {
        question: "What is the average website development cost in India?",
        answer:
          "For a simple business website, many projects fall between Rs. 25,000 and Rs. 1,50,000. The final cost depends on page count, design quality, content work, SEO setup, forms, performance, and custom functionality.",
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
        question: "Can Reddystack help choose the right website budget?",
        answer:
          "Yes. Reddystack can review the goal, pages, features, and launch timeline, then suggest a practical scope that avoids both underbuilding and unnecessary overbuilding.",
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
    metaTitle: "Website Redesign Services | Reddystack",
    metaDescription:
      "Founder-led website redesign services for businesses that need clearer messaging, better SEO structure, faster performance, and stronger inquiry flow.",
    eyebrow: "Website Redesign Services",
    shortTitle: "website redesign services",
    headline: "Website redesign services for sites that need better clarity, SEO, and lead flow.",
    intro:
      "Reddystack helps businesses redesign outdated, unclear, or underperforming websites into cleaner, SEO-ready digital assets. The work focuses on structure, messaging, performance, and conversion instead of surface-level visual changes only.",
    heroHighlights: [
      "Improve website structure before changing visuals",
      "Repair weak messaging, page hierarchy, and CTAs",
      "Keep redesign scope practical and launch-ready",
    ],
    fitTitle: "Best fit for businesses comparing website redesign services and redesign packages.",
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
    whyTitle: "Why redesign work should not be only visual",
    whyParagraphs: [
      "Many redesigns fail because they make the site look newer without fixing the reason users were confused. Reddystack treats copy, hierarchy, speed, and contact flow as part of the redesign.",
      "The delivery is founder-led and scoped around practical outcomes: clearer pages, better search readiness, and a website that supports real business conversations.",
    ],
    pricingTitle: "Redesign pricing approach",
    pricingText:
      "Website redesign packages depend on the size of the current site, how much content needs rewriting, whether SEO repair is required, and how much rebuild work is needed. The goal is a cleaner website that earns trust faster, not a cosmetic refresh.",
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
          "Redesign cost depends on page count, content changes, SEO repair, design depth, and whether the existing technical setup can be reused. Reddystack scopes redesign work around the smallest useful relaunch.",
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
    metaTitle: "Landing Page Development Services | Reddystack",
    metaDescription:
      "Landing page development services for lead generation, SaaS launches, app landing pages, service offers, and campaign pages that need clear conversion flow.",
    eyebrow: "Lead Generation Landing Pages",
    shortTitle: "landing page development",
    headline: "Landing page development services for campaigns that need clearer leads.",
    intro:
      "Reddystack builds landing page development services for founders, service businesses, SaaS ideas, app launches, and campaigns that need focused messaging, tracking, forms, and a direct route from visitor attention to inquiry.",
    heroHighlights: [
      "Focused page structure for one offer or campaign",
      "Lead forms, analytics, and conversion-aware CTAs",
      "Useful for SaaS, app, service, and payment-enabled landing pages",
    ],
    fitTitle: "Best fit for teams comparing landing page development services and lead generation pages.",
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
    whyTitle: "Why landing pages work best when focused",
    whyParagraphs: [
      "A landing page should not behave like a smaller homepage. It needs one offer, one audience, and one action path so visitors are not forced to interpret too much.",
      "Reddystack builds landing pages with practical conversion structure, SEO-aware content when useful, and tracking that helps you understand whether the campaign is working.",
    ],
    pricingTitle: "Landing page pricing approach",
    pricingText:
      "Landing page cost depends on copy, design depth, form logic, tracking, number of sections, and whether extra workflow or payment setup is needed. The goal is a page that can launch fast without feeling generic.",
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
          "Yes. Reddystack can build SaaS landing pages, app launch pages, waitlist pages, and validation pages with clear messaging and lead tracking.",
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
    metaTitle: "Affordable Website Development for Startups | Reddystack",
    metaDescription:
      "Founder-led affordable website development for startups that need SEO-ready structure, sharp positioning, and a practical launch path.",
    eyebrow: "Startup Website Landing Page",
    shortTitle: "Affordable website development",
    headline: "Affordable website development for startups that still needs to feel premium.",
    intro:
      "Reddystack helps early-stage startups launch credible websites without wasting budget on bloated scope. The work stays founder-led, SEO-ready, and structured for real inquiries from India and worldwide.",
    heroHighlights: [
      "Founder-led execution from Rahul Reddy",
      "Clear scope before design and build begin",
      "SEO-ready structure, copy, and conversion flow",
    ],
    fitTitle: "Best fit for startups that need a strong first website without agency overhead.",
    fitIntro:
      "This page is for teams that need a website to explain the offer clearly, look trustworthy fast, and start generating better conversations without turning a simple launch into a months-long project.",
    fitBullets: [
      "Early-stage startups validating positioning and outreach",
      "Founder-led teams replacing a weak brochure site or no site at all",
      "Businesses that need an affordable launch with premium execution and room to grow",
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
    whyTitle: "Why Reddystack is a good fit here",
    whyParagraphs: [
      "Affordable should not mean generic. Reddystack keeps the delivery lean by controlling scope, reducing rework, and focusing on the pages that actually matter for a startup launch.",
      "The process is founder-led, based in Hyderabad, and built to support clients across India and worldwide. That means the communication stays direct and the website stays aligned to the business goal instead of template leftovers.",
    ],
    pricingTitle: "Pricing approach",
    pricingText:
      "Most startup website work starts with clear page scope, launch requirements, and the level of SEO structure needed. The goal is not to promise the cheapest site, but to keep the first version commercially useful and realistically priced.",
    finalCtaTitle: "Launch a startup website that feels credible from the first screen.",
    finalCtaText:
      "If you need an affordable website with better positioning, stronger SEO foundations, and a founder-led build path, start with a project brief.",
    faqItems: [
      {
        question: "Can an affordable startup website still look premium?",
        answer:
          "Yes. The key is controlled scope and strong structure. Reddystack focuses the budget on the pages, messaging, and UX that directly improve credibility and inquiries.",
        some_features: ["Controlled Scope", "Premium UX", "Credibility"],
      },
      {
        question: "Is this only for Hyderabad startups?",
        answer:
          "No. Reddystack is based in Hyderabad and works with startups across India and worldwide through a remote-friendly delivery process.",
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
    metaTitle: "SEO Services for Small Businesses | Reddystack",
    metaDescription:
      "SEO services for small businesses that need better visibility, clearer service pages, and founder-led practical delivery.",
    eyebrow: "Search-Focused Service Page",
    shortTitle: "SEO services for small businesses",
    headline: "SEO services for small businesses that need visibility and clearer lead flow.",
    intro:
      "Reddystack provides SEO services for small businesses that want stronger search visibility, cleaner service-page structure, and a more direct route from discovery to inquiry.",
    heroHighlights: [
      "Search-ready page structure from the start",
      "Better service-page clarity for real buyers",
      "Hyderabad-based, serving India and worldwide",
    ],
    fitTitle: "Best fit for businesses that need more than a brochure site.",
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
    whyTitle: "Why Reddystack is a good fit here",
    whyParagraphs: [
      "Small-business websites often fail because the structure is generic, not because the design is ugly. Reddystack treats hierarchy, copy flow, and SEO readiness as part of the same decision.",
      "The delivery stays founder-led and practical. Based in Hyderabad and working with clients across India and worldwide, the build focuses on clarity, speed, and pages that support real lead generation.",
    ],
    pricingTitle: "Pricing approach",
    pricingText:
      "Pricing usually depends on how many service pages need dedicated structure, how much content shaping is required, and whether the launch is a fresh build or a redesign. The goal is affordable, practical delivery with long-term SEO value.",
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
          "Yes. Reddystack is based in Hyderabad but supports businesses across India and international markets through remote-first delivery.",
        some_features: ["Hyderabad", "India", "International"],
      },
    ],
    relatedServiceSlug: "seo-websites",
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
    metaTitle: "MVP Development for Startups | Reddystack",
    metaDescription:
      "MVP development for startups and founders who need lean scoping, faster validation, and practical delivery.",
    eyebrow: "Founder MVP Landing Page",
    shortTitle: "MVP development",
    headline: "MVP development for startups that need validation without overbuilding.",
    intro:
      "Reddystack provides MVP development for startups and founders that need to ship first versions with lean scope, practical product thinking, and faster delivery. The goal is a usable product that reaches proof, feedback, or traction without bloated release plans.",
    heroHighlights: [
      "Lean scope around what users actually need first",
      "Founder-led execution with faster decisions",
      "Built for India and worldwide startup teams",
    ],
    fitTitle: "Best fit for founders who need version one in market, not trapped in planning.",
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
    whyTitle: "Why Reddystack is a good fit here",
    whyParagraphs: [
      "MVP work fails when the founder vision and build process drift apart. Reddystack keeps the work close to the business intent with founder-led execution and controlled scope.",
      "Based in Hyderabad and serving India and worldwide, the process is designed for startup speed: clear decisions, practical delivery, and product flows that are strong enough to test in the real world.",
    ],
    pricingTitle: "Pricing approach",
    pricingText:
      "MVP pricing depends on the number of core flows, product complexity, and how much release planning is needed before execution. The priority is a lean first version with clear scope, not an oversized roadmap.",
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
          "Yes. Reddystack is based in Hyderabad and supports founders across India and worldwide through remote execution.",
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
    metaTitle: "AI Automation Services for Small Teams | Reddystack",
    metaDescription:
      "AI automation services for small teams that need faster operations, better workflow consistency, and founder-led practical delivery.",
    eyebrow: "Operations Automation Page",
    shortTitle: "AI automation services",
    headline: "AI automation services for small teams that need less manual work and better operational flow.",
    intro:
      "Reddystack helps small teams design practical AI automations for repetitive business work. The focus is operational usefulness: clearer workflows, faster responses, and less time lost to manual follow-up.",
    heroHighlights: [
      "Workflow-first automation instead of novelty demos",
      "Prompt engineering and handoff logic where it matters",
      "Practical systems for lean teams across India and worldwide",
    ],
    fitTitle: "Best fit for small teams with repeated tasks and scattered handoffs.",
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
    whyTitle: "Why Reddystack is a good fit here",
    whyParagraphs: [
      "Small-team automation should reduce friction, not add another layer of complexity. Reddystack approaches AI automation as an operations service, not as hype around tools.",
      "The work is founder-led from Hyderabad and supports clients across India and worldwide. That keeps the implementation practical, direct, and tied to actual business workflow improvement.",
    ],
    pricingTitle: "Pricing approach",
    pricingText:
      "Automation pricing usually depends on workflow complexity, number of handoff paths, and how many tools or front-end layers need to be connected. The goal is measurable practical delivery, not experimental bloat.",
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
          "Yes. Reddystack can connect automations to existing forms, workflows, and lightweight interfaces when the goal is to reduce friction rather than rebuild everything.",
        some_features: ["Existing Tools", "Forms", "Workflows"],
      },
      {
        question: "Do you work only with Hyderabad-based companies?",
        answer:
          "No. Reddystack is based in Hyderabad and works with teams across India and international markets through remote-friendly delivery.",
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
    metaTitle: "AI Chatbot Development Services | Reddystack",
    metaDescription:
      "AI chatbot development services for websites, lead handling, support flows, and small-team workflows with practical scope and honest limitations.",
    eyebrow: "AI Chatbot Service Page",
    shortTitle: "AI chatbot development",
    headline: "AI chatbot development services for lead handling, support, and practical business workflows.",
    intro:
      "Reddystack builds AI chatbot development services for businesses that need faster first responses, cleaner lead qualification, and simpler support handoffs. The work starts with the real questions users ask, then shapes the chatbot flow, prompt logic, fallback paths, and contact handoff around practical business use.",
    heroHighlights: [
      "Website chatbots for lead capture and support routing",
      "Prompt logic, fallback messages, and human handoff paths",
      "Built for small teams that need practical automation, not novelty demos",
    ],
    fitTitle: "Best fit for businesses that need a chatbot tied to a real workflow.",
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
    whyTitle: "Why chatbot projects need scope discipline",
    whyParagraphs: [
      "A chatbot is only useful when it reduces friction. If it gives vague answers, hides the contact path, or tries to handle tasks it cannot support reliably, it can make the visitor experience worse.",
      "Reddystack keeps chatbot work focused on practical use cases: answering common questions, collecting lead context, routing users, and helping lean teams respond faster without adding fragile automation.",
    ],
    pricingTitle: "AI chatbot pricing approach",
    pricingText:
      "Pricing depends on the number of conversation paths, knowledge depth, integrations, analytics needs, and whether the chatbot is part of a wider website or automation build. Simple inquiry chatbots cost less than workflow-connected assistants.",
    finalCtaTitle: "Build a chatbot that helps users reach the next step faster.",
    finalCtaText:
      "If you need AI chatbot development for lead handling or support, start with the questions users ask most often and Reddystack will shape the right first version.",
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
      faqDescription: `Clear answers for teams exploring ${page.shortTitle.toLowerCase()} with Reddystack.`,
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
      ...(project ? [{ title: `Development example: ${project.title}`, path: project.path }] : []),
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
