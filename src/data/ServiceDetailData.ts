import type { StaticImageData } from 'next/image';

import serviceThumbnail from '@/assets/img/services/sv-details.jpg';
import serviceThumbOne from '@/assets/img/services/sv-details-1.jpg';
import serviceThumbTwo from '@/assets/img/services/sv-details-2.jpg';

export type ServiceDetailPresentation = {
  showVisuals?: boolean;
  showSidebar?: boolean;
  faqTitle?: string;
  faqDescription?: string;
  faqHighlights?: string[];
  showFaqShapes?: boolean;
};

export type ServiceAnswerSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type ServiceProcessStep = {
  label: string;
  text: string;
};

export type ServiceDetail = {
  slug: string;
  path: string;
  subtitle: string;
  title: string;
  introPrimary: string;
  introSecondary: string;
  overviewPrimary: string;
  overviewSecondary: string;
  features: string[];
  closingSummary: string;
  sideTitle: string;
  categories: string[];
  highlightTitle: [string, string];
  highlightText: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: StaticImageData;
  supportingImages?: [StaticImageData, StaticImageData];
  presentation?: ServiceDetailPresentation;
  answerSections?: ServiceAnswerSection[];
  processTitle?: string;
  processSteps?: ServiceProcessStep[];
  pricingTitle?: string;
  pricingText?: string;
  finalCtaTitle?: string;
  finalCtaText?: string;
  relatedLinks?: { title: string; path: string }[];
  faqItems: {
    question: string;
    answer: string;
    some_features: string[];
  }[];
};

const sharedImages = {
  heroImage: serviceThumbnail,
  supportingImages: [serviceThumbOne, serviceThumbTwo] as [StaticImageData, StaticImageData],
};

export const serviceDetailData: ServiceDetail[] = [
{
  "slug": "meta-ads",
  "path": "/service/meta-ads",
  "subtitle": "Facebook & Instagram Campaigns",
  "title": "Meta Ads",
  "introPrimary": "Reach potential customers on Facebook and Instagram with campaigns built around your offer and business goals.",
  "introSecondary": "For local businesses and growing brands, with direct support from Rahul Reddy.",
  "overviewPrimary": "We review your offer, audience, existing account, and campaign goal before launch. Campaigns can support enquiries, online sales, or awareness depending on the agreed scope.",
  "overviewSecondary": "Your business retains ownership of its advertising account. We agree account access, tracking requirements, campaign assets, and reporting before work begins.",
  "features": [
    "Campaign planning and audience research",
    "Facebook and Instagram campaign setup",
    "Conversion tracking checks",
    "Ongoing optimisation and agreed reporting"
  ],
  "closingSummary": "Tell us about your business and goals to get a custom quote.",
  "sideTitle": "What We Can Help With",
  "categories": [
    "Campaign planning and audience research",
    "Facebook and Instagram campaign setup",
    "Conversion tracking checks",
    "Ongoing optimisation and agreed reporting"
  ],
  "highlightTitle": [
    "Meta Ads",
    "for your business"
  ],
  "highlightText": "Reach potential customers on Facebook and Instagram with campaigns built around your offer and business goals.",
  "metaTitle": "Meta Ads Management Services | Reddystack",
  "relatedLinks": [{ "title": "Meta Ads guides and checklists", "path": "/blog/meta-ads" }],
  "metaDescription": "Reach potential customers on Facebook and Instagram with campaigns built around your offer and business goals.",
  "presentation": {
    "showVisuals": false,
    "showSidebar": true,
    "faqTitle": "Meta Ads Questions",
    "faqDescription": "Scope, expectations, and next steps.",
    "showFaqShapes": false
  },
  "pricingTitle": "Custom Quotes",
  "pricingText": "Fees depend on the agreed deliverables, timeline, and support. Your quote states inclusions, exclusions, revisions, and separate platform or tool costs.",
  "processTitle": "How We Work",
  "processSteps": [
    {
      "label": "Agree the brief",
      "text": "Review your business, goals, assets, and budget."
    },
    {
      "label": "Prepare and review",
      "text": "Create the agreed work and get your feedback."
    },
    {
      "label": "Deliver and improve",
      "text": "Check the deliverables and agree any ongoing support."
    }
  ],
  "faqItems": [
    {
      "question": "Does the management fee include ad spend?",
      "answer": "No. Advertising spend is separate from campaign management and any creative production fees. Your quote identifies each cost. Results depend on the offer, audience, budget, website, and market conditions.",
      "some_features": [
        "Campaign planning and audience research",
        "Facebook and Instagram campaign setup",
        "Conversion tracking checks"
      ]
    },
    {
      "question": "How do we get started?",
      "answer": "Use the enquiry form or WhatsApp to share your goal and current website or profile. We will discuss the scope before providing a custom quote.",
      "some_features": [
        "Your Goals",
        "Clear Scope",
        "Custom Quote"
      ]
    }
  ],
  heroImage: serviceThumbnail
},
{
  "slug": "google-ads",
  "path": "/service/google-ads",
  "subtitle": "Campaign Setup & Optimisation",
  "title": "Google Ads",
  "introPrimary": "Connect with people looking for your products or services through Google Ads campaigns and conversion tracking.",
  "introSecondary": "For local businesses and growing brands, with direct support from Rahul Reddy.",
  "overviewPrimary": "We review search intent, your offer, landing pages, and budget to choose a campaign scope that fits your business. Tracking is checked before performance is assessed.",
  "overviewSecondary": "Ongoing work focuses on relevant traffic and the actions that matter to your business. Reporting and review frequency are agreed in your proposal.",
  "features": [
    "Goal and keyword planning",
    "Campaign setup and ad copy",
    "Conversion tracking checks",
    "Search-term review, optimisation, and reporting"
  ],
  "closingSummary": "Tell us about your business and goals to get a custom quote.",
  "sideTitle": "What We Can Help With",
  "categories": [
    "Goal and keyword planning",
    "Campaign setup and ad copy",
    "Conversion tracking checks",
    "Search-term review, optimisation, and reporting"
  ],
  "highlightTitle": [
    "Google Ads",
    "for your business"
  ],
  "highlightText": "Connect with people looking for your products or services through Google Ads campaigns and conversion tracking.",
  "metaTitle": "Google Ads Management Services | Reddystack",
  "relatedLinks": [{ "title": "Google Ads guides and checklists", "path": "/blog/google-ads" }],
  "metaDescription": "Connect with people looking for your products or services through Google Ads campaigns and conversion tracking.",
  "presentation": {
    "showVisuals": false,
    "showSidebar": true,
    "faqTitle": "Google Ads Questions",
    "faqDescription": "Scope, expectations, and next steps.",
    "showFaqShapes": false
  },
  "pricingTitle": "Custom Quotes",
  "pricingText": "Fees depend on the agreed deliverables, timeline, and support. Your quote states inclusions, exclusions, revisions, and separate platform or tool costs.",
  "processTitle": "How We Work",
  "processSteps": [
    {
      "label": "Agree the brief",
      "text": "Review your business, goals, assets, and budget."
    },
    {
      "label": "Prepare and review",
      "text": "Create the agreed work and get your feedback."
    },
    {
      "label": "Deliver and improve",
      "text": "Check the deliverables and agree any ongoing support."
    }
  ],
  "faqItems": [
    {
      "question": "Do I need a website or landing page?",
      "answer": "Most campaigns need a suitable destination and a clear conversion action. We review your existing website first; landing page work can be quoted separately when needed.",
      "some_features": [
        "Goal and keyword planning",
        "Campaign setup and ad copy",
        "Conversion tracking checks"
      ]
    },
    {
      "question": "How do we get started?",
      "answer": "Use the enquiry form or WhatsApp to share your goal and current website or profile. We will discuss the scope before providing a custom quote.",
      "some_features": [
        "Your Goals",
        "Clear Scope",
        "Custom Quote"
      ]
    }
  ],
  heroImage: serviceThumbnail
},
{
  "slug": "ad-creatives",
  "path": "/service/ad-creatives",
  "subtitle": "Design, Editing, Copy & Scripts",
  "title": "Ad Creatives",
  "introPrimary": "Turn your offer into ad images, promotional designs, edited videos, and copy for your campaigns.",
  "introSecondary": "For local businesses and growing brands, with direct support from Rahul Reddy.",
  "overviewPrimary": "We start with your audience, offer, brand assets, and campaign objective. The brief defines formats, dimensions, quantities, and the message each asset should communicate.",
  "overviewSecondary": "You review the proposed direction before the final assets are prepared. Filming, stock assets, voiceovers, source files, and usage rights are included only when specified in the quote.",
  "features": [
    "Ad images and promotional designs",
    "Video editing and platform formats",
    "Ad copy, hooks, and scripts",
    "Agreed versions and revision rounds"
  ],
  "closingSummary": "Tell us about your business and goals to get a custom quote.",
  "sideTitle": "What We Can Help With",
  "categories": [
    "Ad images and promotional designs",
    "Video editing and platform formats",
    "Ad copy, hooks, and scripts",
    "Agreed versions and revision rounds"
  ],
  "highlightTitle": [
    "Ad Creatives",
    "for your business"
  ],
  "highlightText": "Turn your offer into ad images, promotional designs, edited videos, and copy for your campaigns.",
  "metaTitle": "Ad Creative Services | Reddystack",
  "relatedLinks": [{ "title": "Ad creative briefs, scripts and examples", "path": "/blog/ad-creatives" }],
  "metaDescription": "Turn your offer into ad images, promotional designs, edited videos, and copy for your campaigns.",
  "presentation": {
    "showVisuals": false,
    "showSidebar": true,
    "faqTitle": "Ad Creatives Questions",
    "faqDescription": "Scope, expectations, and next steps.",
    "showFaqShapes": false
  },
  "pricingTitle": "Custom Quotes",
  "pricingText": "Fees depend on the agreed deliverables, timeline, and support. Your quote states inclusions, exclusions, revisions, and separate platform or tool costs.",
  "processTitle": "How We Work",
  "processSteps": [
    {
      "label": "Agree the brief",
      "text": "Review your business, goals, assets, and budget."
    },
    {
      "label": "Prepare and review",
      "text": "Create the agreed work and get your feedback."
    },
    {
      "label": "Deliver and improve",
      "text": "Check the deliverables and agree any ongoing support."
    }
  ],
  "faqItems": [
    {
      "question": "How many designs or revisions are included?",
      "answer": "The quote specifies the number of assets, versions, formats, and revision rounds. Additional concepts or changes outside the agreed brief can be quoted separately.",
      "some_features": [
        "Ad images and promotional designs",
        "Video editing and platform formats",
        "Ad copy, hooks, and scripts"
      ]
    },
    {
      "question": "How do we get started?",
      "answer": "Use the enquiry form or WhatsApp to share your goal and current website or profile. We will discuss the scope before providing a custom quote.",
      "some_features": [
        "Your Goals",
        "Clear Scope",
        "Custom Quote"
      ]
    }
  ],
  heroImage: serviceThumbnail
},
{
  "slug": "ai-ugc-videos",
  "path": "/service/ai-ugc-videos",
  "subtitle": "AI Presenters, Demos & Explainers",
  "title": "AI UGC-Style Videos",
  "introPrimary": "Explain your product or service through conversational AI-presenter videos designed for ads and social content.",
  "introSecondary": "For local businesses and growing brands, with direct support from Rahul Reddy.",
  "overviewPrimary": "We agree the script, presenter style, language, length, and intended use before production. You can supply product footage, screenshots, and brand assets to support the story.",
  "overviewSecondary": "These are AI-generated, creator-style videos. They are not presented as genuine customer testimonials or real customer experiences. Presenter permissions and asset rights are checked for the agreed use.",
  "features": [
    "AI-presenter videos",
    "Product demonstrations using supplied assets",
    "Service explainer scripts",
    "Editing, captions, and agreed export formats"
  ],
  "closingSummary": "Tell us about your business and goals to get a custom quote.",
  "sideTitle": "What We Can Help With",
  "categories": [
    "AI-presenter videos",
    "Product demonstrations using supplied assets",
    "Service explainer scripts",
    "Editing, captions, and agreed export formats"
  ],
  "highlightTitle": [
    "AI UGC-Style Videos",
    "for your business"
  ],
  "highlightText": "Explain your product or service through conversational AI-presenter videos designed for ads and social content.",
  "metaTitle": "AI UGC-Style Video Production Services | Reddystack",
  "relatedLinks": [{ "title": "AI video workflows and production checklists", "path": "/blog/ai-ugc-videos" }],
  "metaDescription": "Explain your product or service through conversational AI-presenter videos designed for ads and social content.",
  "presentation": {
    "showVisuals": false,
    "showSidebar": true,
    "faqTitle": "AI UGC-Style Videos Questions",
    "faqDescription": "Scope, expectations, and next steps.",
    "showFaqShapes": false
  },
  "pricingTitle": "Custom Quotes",
  "pricingText": "Fees depend on the agreed deliverables, timeline, and support. Your quote states inclusions, exclusions, revisions, and separate platform or tool costs.",
  "processTitle": "How We Work",
  "processSteps": [
    {
      "label": "Agree the brief",
      "text": "Review your business, goals, assets, and budget."
    },
    {
      "label": "Prepare and review",
      "text": "Create the agreed work and get your feedback."
    },
    {
      "label": "Deliver and improve",
      "text": "Check the deliverables and agree any ongoing support."
    }
  ],
  "faqItems": [
    {
      "question": "Is this the same as hiring a real UGC creator?",
      "answer": "No. This service uses AI presenters and production tools. Live filming and human creator partnerships are separate scopes; the final content should accurately represent the product and the presenter.",
      "some_features": [
        "AI-presenter videos",
        "Product demonstrations using supplied assets",
        "Service explainer scripts"
      ]
    },
    {
      "question": "How do we get started?",
      "answer": "Use the enquiry form or WhatsApp to share your goal and current website or profile. We will discuss the scope before providing a custom quote.",
      "some_features": [
        "Your Goals",
        "Clear Scope",
        "Custom Quote"
      ]
    }
  ],
  heroImage: serviceThumbnail
},
{
  "slug": "seo-local-seo",
  "path": "/service/seo-local-seo",
  "subtitle": "Website Optimisation & Local Visibility",
  "title": "SEO & Local SEO",
  "introPrimary": "Help customers find your business through website optimisation and Google Business Profile management.",
  "introSecondary": "For local businesses and growing brands, with direct support from Rahul Reddy.",
  "overviewPrimary": "We review your website, services, target locations, and existing search presence. Priorities are based on the gaps that affect how customers find and understand your business.",
  "overviewSecondary": "Local SEO can include accurate business information, profile updates, service information, and a practical review-request process. Work is scoped around your actual locations and business details.",
  "features": [
    "Website and technical SEO review",
    "On-page content and metadata optimisation",
    "Google Business Profile management",
    "Local visibility checks and agreed reporting"
  ],
  "closingSummary": "Tell us about your business and goals to get a custom quote.",
  "sideTitle": "What We Can Help With",
  "categories": [
    "Website and technical SEO review",
    "On-page content and metadata optimisation",
    "Google Business Profile management",
    "Local visibility checks and agreed reporting"
  ],
  "highlightTitle": [
    "SEO & Local SEO",
    "for your business"
  ],
  "highlightText": "Help customers find your business through website optimisation and Google Business Profile management.",
  "metaTitle": "SEO & Local SEO Services | Reddystack",
  "relatedLinks": [{ "title": "SEO and Local SEO guides", "path": "/blog/seo-local-seo" }],
  "metaDescription": "Help customers find your business through website optimisation and Google Business Profile management.",
  "presentation": {
    "showVisuals": false,
    "showSidebar": true,
    "faqTitle": "SEO & Local SEO Questions",
    "faqDescription": "Scope, expectations, and next steps.",
    "showFaqShapes": false
  },
  "pricingTitle": "Custom Quotes",
  "pricingText": "Fees depend on the agreed deliverables, timeline, and support. Your quote states inclusions, exclusions, revisions, and separate platform or tool costs.",
  "processTitle": "How We Work",
  "processSteps": [
    {
      "label": "Agree the brief",
      "text": "Review your business, goals, assets, and budget."
    },
    {
      "label": "Prepare and review",
      "text": "Create the agreed work and get your feedback."
    },
    {
      "label": "Deliver and improve",
      "text": "Check the deliverables and agree any ongoing support."
    }
  ],
  "faqItems": [
    {
      "question": "Can you guarantee a ranking or a result date?",
      "answer": "No. Search performance depends on competition, website condition, content, and platform changes. We agree the work and reporting, then review progress over time without promising a particular position.",
      "some_features": [
        "Website and technical SEO review",
        "On-page content and metadata optimisation",
        "Google Business Profile management"
      ]
    },
    {
      "question": "How do we get started?",
      "answer": "Use the enquiry form or WhatsApp to share your goal and current website or profile. We will discuss the scope before providing a custom quote.",
      "some_features": [
        "Your Goals",
        "Clear Scope",
        "Custom Quote"
      ]
    }
  ],
  heroImage: serviceThumbnail
},
  {
    slug: 'seo-websites',
    path: '/service/seo-websites',
    subtitle: 'Business Websites, Online Stores & Landing Pages',
    title: 'Website Development',
    introPrimary:
      'Business websites, online stores, and landing pages that explain your offer and make it easy to enquire or buy.',
    introSecondary:
      'For startups, local businesses, and founder-led brands. Mobile usability, search visibility, and contact paths are planned from the start.',
    overviewPrimary:
      'We plan your pages around customer needs and relevant search terms, then build for clear navigation, fast loading, and straightforward enquiries.',
    overviewSecondary:
      'Your proposal defines pages, content, integrations, and launch support. Landing pages and additional service pages can be included in the agreed scope.',
    features: [
      'Keyword-aware website development, site structure, and service page planning',
      'Responsive business websites, online stores, and landing pages',
      'On-page SEO setup, performance tuning, and crawl-friendly markup',
      'Conversion-focused sections, CTAs, forms, and launch support',
    ],
    closingSummary:
      'Best for businesses that want a website that looks premium, supports organic growth, and helps turn visits into real project conversations.',
    sideTitle: 'Included Capabilities',
    categories: [
      'Website Development',
      'SEO Website Design',
      'Landing Pages',
      'Service Pages',
      'Performance Setup',
    ],
    highlightTitle: ['Search-ready', 'websites'],
    highlightText:
      'Built for brands that need visibility, clarity, and stronger conversion from their online presence.',
    metaTitle: 'SEO-Ready Website Development | Reddystack',
    relatedLinks: [{ title: 'Website development briefs and launch checklists', path: '/blog/website-development' }, { title: 'Business website development services', path: '/website-development' }],
    metaDescription:
      'SEO website development services by Reddystack for startups and small businesses that need responsive websites, service pages, performance, and lead-ready structure.',
    faqItems: [
      {
        question: 'What is included in an SEO website build?',
        answer:
          'Reddystack covers structure, service page planning, responsive build quality, on-page SEO setup, performance tuning, and conversion-aware page sections so the website is useful for both search and lead generation.',
        some_features: ['Site Structure', 'On-page SEO', 'Performance'],
      },
      {
        question: 'Is this for new websites or redesigns?',
        answer:
          'It can support both. The service fits new builds, strategic redesigns, and businesses that need a cleaner website foundation with stronger visibility and messaging.',
        some_features: ['New Builds', 'Redesigns', 'Visibility'],
      },
      {
        question: 'Do landing pages and service pages fit inside this service?',
        answer:
          'Yes. Landing pages, service page systems, and launch support can sit inside this service when the website needs better positioning, clearer content hierarchy, or stronger lead flow.',
        some_features: ['Landing Pages', 'Service Pages', 'Launch Support'],
      },
      {
        question: 'Who is this best for?',
        answer:
          'This service is best for startups, local businesses, and founder-led brands that need an affordable but credible website with stronger search readiness and clearer inquiry paths.',
        some_features: ['Startups', 'Local Businesses', 'Founder-led Brands'],
      },
    ],
    ...sharedImages,
  },
  {
    slug: 'applications',
    path: '/service/applications',
    subtitle: 'Product Builds',
    title: 'Web & Mobile Applications',
    introPrimary:
      'Web and mobile applications at Reddystack are built for founders and businesses that need functional digital products, not just polished mockups. The focus is on planning what matters, building the right flows, and shipping something people can actually use.',
    introSecondary:
      'This service is ideal for internal tools, customer-facing apps, and product ideas that need a practical build path with founder-led execution.',
    overviewPrimary:
      'The work covers product architecture, screen planning, feature prioritization, and implementation support so the application is easier to build, easier to explain, and easier to operate after launch. Core journeys are shaped first, then the rest of the build follows real use cases instead of speculation.',
    overviewSecondary:
      'This can support web applications, mobile-first application flows, founder dashboards, internal tools, and product systems that need clean execution without bloated scope.',
    features: [
      'Custom web application architecture and screen-by-screen flow planning',
      'Feature prioritization for real product releases',
      'Founder-led build direction for web apps, mobile apps, and internal tools',
      'Launch-ready implementation support and iteration planning',
    ],
    closingSummary:
      'Best for teams that need usable applications shipped with clarity, not endless planning or design-heavy detours.',
    sideTitle: 'Included Capabilities',
    categories: [
      'Custom Web Apps',
      'Mobile Apps',
      'Internal Tools',
      'Application Logic',
      'Launch Support',
    ],
    highlightTitle: ['Launch-ready', 'applications'],
    highlightText:
      'Built for products that need a working application, a cleaner build path, and faster execution.',
    metaTitle: 'Web & Mobile Application Development Services | Reddystack',
    metaDescription:
      'Custom web and mobile application development services by Reddystack for dashboards, internal tools, MVP products, and launch-ready workflows.',
    faqItems: [
      {
        question: 'Do you build internal tools and client-facing applications?',
        answer:
          'Yes. The service can support internal tools, customer-facing apps, founder dashboards, and product flows that need clear planning and practical implementation.',
        some_features: ['Internal Tools', 'Client-facing Apps', 'Dashboards'],
      },
      {
        question: 'Can you help plan features before development starts?',
        answer:
          'Yes. Feature planning is part of the service. Reddystack helps define user flows, release scope, and screen-level priorities before deeper implementation begins.',
        some_features: ['Feature Planning', 'User Flows', 'Release Scope'],
      },
      {
        question: 'Is this only for mobile apps?',
        answer:
          'No. This service supports web applications, mobile-first application flows, and product systems where the user journey matters more than forcing one platform label.',
        some_features: ['Web Apps', 'Mobile-first Flows', 'Product Systems'],
      },
      {
        question: 'What stage should a product idea be in?',
        answer:
          'The service works best when the core problem is clear and the build needs practical direction. It fits early product ideas, internal operations tools, and teams that need cleaner execution without bloated scope.',
        some_features: ['Early Product Ideas', 'Operations Tools', 'Practical Direction'],
      },
    ],
    ...sharedImages,
  },
  {
    slug: 'mvp-builds',
    path: '/service/mvp-builds',
    subtitle: 'Startup Launches',
    title: 'MVP Builds',
    introPrimary:
      'MVP Builds at Reddystack are for founders who need to validate an idea quickly without shipping a messy product. The emphasis is on scope control, fast execution, and building only what helps the product reach proof, feedback, or traction.',
    introSecondary:
      'This service fits startup launches, founder ideas, internal tools, and experiments that need a usable version in market instead of endless planning cycles.',
    overviewPrimary:
      'The workflow covers lean feature scoping, Vibe Coding-assisted execution, core user journey planning, and release structure that keeps the product understandable to early users. The build stays focused so launch happens faster and iteration stays practical after release.',
    overviewSecondary:
      'This is built for early traction, real user feedback, founder demos, and first-version launches where speed matters but the product still needs to feel coherent.',
    features: [
      'Lean feature scoping for first-release products',
      'Rapid execution with Vibe Coding and AI-assisted workflows',
      'Core onboarding, user journeys, and launch-ready release planning',
      'Iteration-friendly structure for post-launch learning',
    ],
    closingSummary:
      'Best for founders who want to launch fast, validate clearly, and avoid overbuilding before the product has earned it.',
    sideTitle: 'Included Capabilities',
    categories: [
      'Vibe Coding',
      'Rapid Validation',
      'Launch Planning',
      'MVP Scope',
      'Founder-led Delivery',
    ],
    highlightTitle: ['Fast-moving', 'MVP builds'],
    highlightText:
      'Built for validation, early traction, and sharper founder execution without unnecessary complexity.',
    metaTitle: 'MVP Development Services | Reddystack',
    metaDescription:
      'MVP development services by Reddystack for startup founders that need lean scoping, faster validation, product flows, and founder-led delivery.',
    faqItems: [
      {
        question: 'What makes an MVP different from a full product build?',
        answer:
          'An MVP is scoped around validation, speed, and the core user journey. The goal is to launch something useful quickly without carrying unnecessary complexity into version one.',
        some_features: ['Validation', 'Core Journey', 'Lean Scope'],
      },
      {
        question: 'Can you help founders avoid overbuilding?',
        answer:
          'Yes. Scope control is a core part of this service. Reddystack helps reduce unnecessary features so the first release can reach proof, feedback, or traction faster.',
        some_features: ['Scope Control', 'Faster Launch', 'Clear Priorities'],
      },
      {
        question: 'Is this only for startup ideas?',
        answer:
          'No. MVP Builds also fit internal tools, founder experiments, and early product concepts that need a usable first version in market instead of long planning cycles.',
        some_features: ['Startup Ideas', 'Internal Tools', 'Experiments'],
      },
      {
        question: 'What happens after the first version launches?',
        answer:
          'The build is structured for iteration. Once the first version is live, the next step is usually learning from user behavior, tightening the core flow, and deciding what earns a place in the next release.',
        some_features: ['Iteration', 'User Feedback', 'Next Release'],
      },
    ],
    ...sharedImages,
  },
  {
    slug: 'ai-automations',
    path: '/service/ai-automations',
    subtitle: 'Workflow Systems',
    title: 'AI Automations',
    introPrimary:
      'AI Automations at Reddystack help businesses reduce repetitive work, improve execution speed, and turn manual processes into repeatable systems. The focus is not novelty for its own sake, but practical automation that removes friction from real operations.',
    introSecondary:
      'This service is ideal for founders, lean teams, and operators who want faster turnaround without hiring for every repetitive task or relying on scattered tools.',
    overviewPrimary:
      'The work covers workflow mapping, automation planning, Prompt Engineering, and implementation across customer handling, content operations, and internal processes. The goal is to make repetitive business actions more consistent, trackable, and easier to scale.',
    overviewSecondary:
      'Automations can also be paired with lightweight interfaces, forms, landing pages, or custom logic when the workflow needs a clearer front end for users, clients, or internal team members.',
    features: [
      'Workflow mapping for repetitive business operations',
      'Prompt Engineering and AI-assisted process design',
      'Automation setup for lead handling, ops, and content workflows',
      'Practical systems that reduce follow-up and manual friction',
    ],
    closingSummary:
      'Best for businesses that want to save time, improve consistency, and scale execution with more practical systems.',
    sideTitle: 'Included Capabilities',
    categories: [
      'Prompt Engineering',
      'Workflow Design',
      'Internal Ops',
      'Lead Handling',
      'AI Automation',
    ],
    highlightTitle: ['Practical', 'automation systems'],
    highlightText:
      'Built to reduce manual work and help lean teams move faster with better operational flow.',
    metaTitle: 'AI Automation Services | Reddystack',
    metaDescription:
      'AI automation services by Reddystack for small teams that need workflow design, prompt engineering, lead handling, and practical business automation systems.',
    faqItems: [
      {
        question: 'What kinds of automations can Reddystack build?',
        answer:
          'The service can support lead handling, internal operations, content workflows, prompt-driven outputs, and repetitive business processes that need clearer handoffs and less manual follow-up.',
        some_features: ['Lead Handling', 'Internal Ops', 'Content Workflows'],
      },
      {
        question: 'Can automations work with existing tools and forms?',
        answer:
          'Yes. Automations can be connected to existing workflows, forms, lightweight interfaces, and business logic when the goal is to reduce friction instead of replacing everything at once.',
        some_features: ['Existing Tools', 'Forms', 'Business Logic'],
      },
      {
        question: 'Is this useful for small teams?',
        answer:
          'Yes. This service is especially useful for founders, operators, and lean teams that want more consistency and faster execution without hiring for every repeated task.',
        some_features: ['Lean Teams', 'Consistency', 'Execution Speed'],
      },
      {
        question: 'Can an automation include a front-end experience too?',
        answer:
          'Yes. When useful, automations can be paired with lightweight front-end flows, landing pages, or custom interaction layers so the workflow is easier for clients, users, or internal team members to use.',
        some_features: ['Front-end Flows', 'Landing Pages', 'Custom Interaction'],
      },
    ],
    ...sharedImages,
  },
];

export const primaryServiceSlugs = ["meta-ads", "google-ads", "ad-creatives", "ai-ugc-videos", "seo-websites", "seo-local-seo"];
export const primaryServices = primaryServiceSlugs.map((slug) => serviceDetailData.find((service) => service.slug === slug)!);

export function getServiceDetail(slug: string) {
  return serviceDetailData.find((service) => service.slug === slug);
}

export function getAdjacentServices(slug: string) {
  const services = primaryServiceSlugs.includes(slug) ? primaryServices : serviceDetailData.filter((service) => !primaryServiceSlugs.includes(service.slug));
  const currentIndex = services.findIndex((service) => service.slug === slug);

  if (currentIndex === -1) {
    return {
      previousService: null,
      nextService: null,
    };
  }

  const previousService =
    services[(currentIndex - 1 + services.length) % services.length];
  const nextService = services[(currentIndex + 1) % services.length];

  return {
    previousService,
    nextService,
  };
}
