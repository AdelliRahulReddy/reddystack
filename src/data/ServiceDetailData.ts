import type { StaticImageData } from 'next/image';

import serviceThumbnail from '@/assets/img/social/reddystack-share-v4.png';

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
  updatedAt?: string;
  contactService?: string;
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
};

export const serviceDetailData: ServiceDetail[] = [
{
    answerSections: [
      {
        "title": "Start with an offer the business can deliver",
        "paragraphs": [
          "Before building a campaign, we discuss the product or service, the customer, the delivery area and what happens after an enquiry. A local service accepting bookings needs a different setup from a shop taking online payments. We also agree what counts as a useful result: a relevant enquiry, a booking or a completed order.",
          "Bring any existing account, website, creative assets and recent enquiry records. If the offer is still changing, a smaller test with one clear message is easier to learn from than several campaigns promoting different things."
        ]
      },
      {
        "title": "What campaign work can include",
        "paragraphs": [
          "The proposal identifies the campaigns, assets, tracking checks and review frequency. Creative production and landing-page changes are separate pieces of work unless included in the scope."
        ],
        "bullets": [
          "Review the existing account, available assets, audience and geographic coverage.",
          "Prepare campaign structure, agreed ad copy and supplied or commissioned creative.",
          "Check the intended form, website event or purchase path before launch.",
          "Review delivery, spend, creative response and enquiry quality at agreed intervals."
        ]
      },
      {
        "title": "Look past the cost of a form submission",
        "paragraphs": [
          "A low-cost lead is useful only if it fits the business. For example, a repair enquiry outside your service area or a request for a product you do not sell should not be treated as a success just because the form was submitted. Agree a simple way to record relevant, unreachable, duplicate and unsuitable enquiries.",
          "That feedback helps distinguish an advertising problem from a weak offer, confusing page or slow response. Reports should connect spend and recorded actions with what your business learned, while making gaps in tracking visible. No fixed lead volume, revenue or return is promised."
        ]
      },
      {
        "title": "Access, approvals and handover",
        "paragraphs": [
          "The advertising account remains owned by your business. Access should be granted through the platform's permissions rather than by sending passwords. Confirm who can approve copy, product claims, budgets and changes before launch.",
          "At handover or the end of a management period, the agreed campaign work and reporting should be understandable to the account owner. Ongoing optimisation, new creative and extra campaigns require an agreed scope; a setup project does not silently include indefinite management."
        ]
      }
    ],
    updatedAt: "2026-09-16",
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
  "pricingText": "The quote separates campaign setup or management from ad spend, creative production and website work. Scope depends on the offers, markets, campaign count, available assets and reporting required. Advertising spend is paid separately; increasing that spend does not guarantee more suitable customers. Share a realistic test budget and any existing account so the proposal can match the work.",
  "processTitle": "How We Work",
  "processSteps": [
    {
      "label": "Define the test.",
      "text": "Agree the offer, audience, destination, budget boundary and action to measure."
    },
    {
      "label": "Prepare for approval.",
      "text": "Check access and tracking, build the agreed ads and review claims and creative with you."
    },
    {
      "label": "Review actual outcomes.",
      "text": "Compare delivery and recorded actions with enquiry feedback, then agree the next change."
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
    answerSections: [
      {
        "title": "Match the campaign to the customer's search",
        "paragraphs": [
          "We begin with what your business sells, who can buy it and which locations you can serve. Someone searching for an emergency repair has a different need from someone comparing training courses or buying parts. Those distinctions shape keywords, exclusions, ad wording and the destination page.",
          "If you already advertise, share the existing account and the business outcome of recent enquiries. Rebuilding everything is not automatically the right first step. An account review can identify useful history, tracking problems and spending on searches that do not fit the offer."
        ]
      },
      {
        "title": "An agreed setup and management scope",
        "bullets": [
          "Goal, service-area and keyword planning for the selected offer.",
          "Campaign setup, ad copy and relevant destination-page review.",
          "Checks of the actions used for reporting, including a successful enquiry or purchase where applicable.",
          "Review of available search terms, exclusions, spend and recorded outcomes.",
          "A dated record of changes and reporting at the frequency stated in the proposal."
        ],
        "paragraphs": [
          "New landing pages, product feeds, extensive tracking repairs and creative production are included only if specified. The initial review should make those dependencies clear before a launch date is agreed."
        ]
      },
      {
        "title": "Define a useful conversion before paying for traffic",
        "paragraphs": [
          "Opening a contact page, clicking a phone number and completing an enquiry are different actions. A campaign report needs to distinguish them. The business also needs a way to record whether an enquiry was relevant and whether it became a sale; an advertising platform cannot know every offline outcome by itself.",
          "Consider a hypothetical campaign with many form submissions but few customers. The next step could be clearer pricing, tighter service-area information or faster follow-up, rather than simply lowering the cost per click. Decisions should use both campaign evidence and the sales process."
        ]
      },
      {
        "title": "Budget and ownership remain visible",
        "paragraphs": [
          "Your business retains the advertising account and pays advertising spend separately from the service fee. We agree permissions, approval contacts and budget boundaries before changes are made. You should be able to see what is running and where the traffic goes.",
          "A competitive search market can make a broad campaign unaffordable for a small test. In that situation, the discussion is about a narrower service, location or goal. No proposal should turn a limited budget into a guarantee of ranking, enquiries or revenue."
        ]
      }
    ],
    updatedAt: "2026-09-16",
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
  "pricingText": "Setup and ongoing management are quoted against the number of offers, campaign scope, tracking work and reporting needs. Google advertising spend is separate. Landing-page builds, feeds and substantial measurement repairs should be named in the quote if required. A realistic proposal states these costs before asking you to commit to a campaign.",
  "processTitle": "How We Work",
  "processSteps": [
    {
      "label": "Review demand and scope.",
      "text": "Map the actual services, eligible locations, existing account and landing pages."
    },
    {
      "label": "Check the path to an enquiry.",
      "text": "Prepare ads and tracking, test the agreed actions and obtain launch approval."
    },
    {
      "label": "Review relevance and outcomes.",
      "text": "Use available search terms and enquiry feedback to guide changes within the agreed budget."
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
    answerSections: [
      {
        "title": "Turn the offer into a production brief",
        "paragraphs": [
          "A request for five ads still leaves most of the important decisions open. We first agree who should respond, what is being offered, what evidence supports it and what the viewer should do next. Product availability, price conditions and the destination link need to match the message.",
          "Bring your logo, brand guidance, product photographs, usable footage and examples of the style you prefer. If an asset is missing, decide whether it will be supplied, filmed, licensed or created before approving the production scope."
        ]
      },
      {
        "title": "Specify the deliverables precisely",
        "bullets": [
          "Static images, promotional graphics, edited video or a defined combination.",
          "Concept count, copy variations, video lengths and requested export formats.",
          "Hooks, scripts, captions and calls to action included in the brief.",
          "Review stages, revision rounds and the person providing consolidated feedback.",
          "Any filming, stock, voiceover, source-file delivery or usage rights expressly included in the quote."
        ],
        "paragraphs": [
          "A resize adapts an approved concept to another format. A new message, new footage or a different offer can require a new concept. Naming the distinction makes both the price and the review process clearer."
        ]
      },
      {
        "title": "Review the message before polishing every frame",
        "paragraphs": [
          "For a video, approve the script and planned shots before the full edit. For a static ad, approve the message and visual direction before a set of variations. Check that the product is recognisable, the claim is supportable and the important text survives a small screen.",
          "Final review should use the intended placement preview as well as the exported file. Captions, platform controls and cropping can obscure details that looked fine in an editing window. The handoff should identify which file belongs to which placement."
        ]
      },
      {
        "title": "Make each variation useful to test",
        "paragraphs": [
          "A useful variation answers a question. For example, does showing a product in use explain the offer better than listing features? Changing the headline, footage, offer and destination together makes it difficult to identify what helped.",
          "Creative production does not itself include media buying or establish campaign performance. If testing support is part of the project, agree the comparison, naming and reporting first. Engagement, enquiries and sales answer different questions; a popular video is not proof of a profitable campaign."
        ]
      }
    ],
    updatedAt: "2026-09-16",
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
  "pricingText": "Creative fees depend on the number of concepts and versions, asset availability, editing requirements, languages and revision scope. Filming, paid stock, voiceovers and source files should be listed separately where applicable. Ad spend and campaign management are not included unless the proposal explicitly adds them.",
  "processTitle": "How We Work",
  "processSteps": [
    {
      "label": "Brief and collect assets.",
      "text": "Agree the offer, message, formats, quantities and permission to use the supplied material."
    },
    {
      "label": "Approve the direction.",
      "text": "Review the concept or script before producing the full set of assets."
    },
    {
      "label": "Check and deliver.",
      "text": "Apply agreed revisions and check final files, captions, crops and destination details."
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
    answerSections: [
      {
        "title": "Where an AI presenter is useful",
        "paragraphs": [
          "An AI presenter can introduce a service, explain a process or narrate supplied product footage. The format is useful when you need a repeatable presentation and have accurate material to work from. It should be described as generated or AI-assisted where required by the intended use and platform.",
          "It cannot supply a real customer's experience. A script claiming that the presenter bought a product, visited a business or achieved a personal result would be inappropriate if that never happened. If the message needs a genuine testimonial or physical demonstration, plan real participation and footage."
        ]
      },
      {
        "title": "Agree the script and source material",
        "bullets": [
          "Presenter style, script, pronunciation, language, length and intended publishing channel.",
          "Approved product images, interface recordings, service facts and brand assets.",
          "Editing, captions, music or voice requirements and export versions.",
          "Permissions for any identifiable person, voice, likeness or licensed material.",
          "Sample approval and revision boundaries before multiple versions are produced."
        ],
        "paragraphs": [
          "A product demonstration should use accurate visuals of the product. Generated footage must not invent buttons, packaging, features or results that a buyer will expect to receive."
        ]
      },
      {
        "title": "Review one sample before scaling production",
        "paragraphs": [
          "Check names and numbers aloud. Review facial movement, cuts, pacing, captions and whether the presenter is pointing at the right thing. A short sample can reveal a pronunciation or visual problem before it is repeated across an entire batch.",
          "For another language, review meaning, local availability, currency and the destination page as well as the translation. A fluent-sounding voice is not evidence that the commercial message is accurate. Your approval contact should understand the language used."
        ]
      },
      {
        "title": "Publishing needs its own checks",
        "paragraphs": [
          "Before delivery, agree the intended usage and review the current rules of the publishing platform. Disclosure, rights and factual accuracy are separate checks. Labelling a clip as AI-generated does not fix an unsupported product claim or a fabricated endorsement.",
          "The deliverable is the agreed video asset and production work. Advertising approval, reach and conversion results depend on factors outside the edit and are not guaranteed. Campaign setup or testing can be discussed as a separate scope."
        ]
      }
    ],
    updatedAt: "2026-09-16",
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
  "pricingText": "The quote depends on script length, presenter and voice requirements, supplied assets, editing complexity, languages and version count. Extra generations, changed scripts after approval and third-party licences can affect scope. The proposal should identify what is included and who approves each stage before production starts.",
  "processTitle": "How We Work",
  "processSteps": [
    {
      "label": "Confirm the use case.",
      "text": "Decide what the presenter can truthfully explain and what needs real supplied footage."
    },
    {
      "label": "Approve script and sample.",
      "text": "Check the facts, pronunciation, style and permissions before full production."
    },
    {
      "label": "Deliver reviewed versions.",
      "text": "Check captions, localization, export formats and the agreed publishing requirements."
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
  "updatedAt": "2026-09-16",
  "subtitle": "Website Optimisation & Local Visibility",
  "title": "SEO & Local SEO",
  "introPrimary": "Make it easier for customers to find your services and send an enquiry. Start with a review of your website, search visibility, and Google Business Profile where your business is eligible.",
  "introSecondary": "Work directly with Rahul Reddy Adelli, based in Hyderabad and supporting businesses across India and worldwide. We agree the pages, locations, deliverables, and reporting before work starts.",
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
  "metaTitle": "SEO & Local SEO for Small Businesses | Reddystack",
  "relatedLinks": [
    {
      "title": "Google Business Profile optimisation checklist",
      "path": "/blog/seo-local-seo/google-business-profile-optimization-checklist"
    },
    {
      "title": "SEO for a service-area business",
      "path": "/blog/seo-local-seo/service-area-business-seo"
    },
    {
      "title": "Local SEO costs and scope",
      "path": "/blog/seo-local-seo/local-seo-cost-india"
    },
    {
      "title": "Meet Rahul Reddy Adelli",
      "path": "/about/rahul-reddy-adelli"
    }
  ],
  "metaDescription": "Founder-led SEO and local SEO for small businesses. Website audits, service-page improvements, eligible Google Business Profiles, and clear enquiry reporting.",
  "presentation": {
    "showVisuals": false,
    "showSidebar": true,
    "faqTitle": "SEO & Local SEO Questions",
    "faqDescription": "Scope, expectations, and next steps.",
    "showFaqShapes": false
  },
  "answerSections": [
    {
      "title": "Who this service is for",
      "paragraphs": [
        "Local service businesses need customers to understand what they offer, where they work, and how to contact them. We can review an existing website or plan search requirements alongside a new website build.",
        "A storefront and a business that visits customers need different location information. Online-only businesses can use website SEO; Google Business Profile work depends on eligibility for in-person customer contact. Coverage should reflect the places you actually serve."
      ]
    },
    {
      "title": "What your SEO scope can include",
      "paragraphs": [
        "Choose the work that addresses your current gaps. The quote identifies which of these deliverables are included and whether changes are implemented by Reddystack or handed to your developer."
      ],
      "bullets": [
        "Technical review: inspect agreed pages for indexing, crawl access, canonical URLs, redirects, sitemap coverage, and mobile loading issues.",
        "Service-page improvements: clarify the offer, page titles, headings, service areas, internal links, and the next step for an enquiry.",
        "Google Business Profile review: check eligibility, business details, categories, hours, services, website links, and duplicate-profile concerns.",
        "Local consistency: review agreed directory listings and business details, with a process for requesting reviews from real customers.",
        "Measurement: establish a Search Console baseline and check Analytics tracking for successful enquiries separately from contact-button clicks."
      ]
    },
    {
      "title": "A practical audit you can act on",
      "paragraphs": [
        "An audit should explain the page or profile affected, the evidence, the recommended change, its priority, and how to check the result. Agree an initial set of important service pages before expanding the work.",
        "Illustrative audit entry, not a client result: a service page is discovered but not indexed. Check its live availability and canonical URL, review whether it answers the customer's question, and confirm relevant pages link to it. After making the agreed improvements, request indexing and check for a crawl and indexing decision. Google decides whether and when to index it."
      ]
    },
    {
      "title": "What progress reporting covers",
      "paragraphs": [
        "Review the agreed pages, relevant search queries, impressions, clicks, and successful enquiries alongside a dated change log. Where tracking is available, separate live-site visits from development traffic and test submissions.",
        "A click is not automatically a customer. Compare enquiry quality with your own business records, and use longer reporting periods when traffic is low. Reporting frequency and ongoing optimisation are agreed in the scope."
      ]
    },
    {
      "title": "Choose improvements the business can maintain",
      "paragraphs": [
        "A useful service page needs current information about the actual work: who it suits, where it is available, what is included and how a quote is prepared. More pages are worthwhile when they answer distinct questions. Repeating the same copy with different location names does not explain a business's real coverage.",
        "Keep a record of approved business details and who can update the website, profiles and directory listings. Changes to hours, services or contact information should be reflected consistently. Reviews should come from real customers describing their own experience; demo work and illustrative examples should be labelled as such.",
        "Before agreeing ongoing work, distinguish one-time repairs from regular maintenance. An audit, an implemented fix and a later change in search traffic are three separate things. Reporting should make the completed work and the evidence for subsequent decisions easy to understand."
      ]
    }
  ],
  "pricingTitle": "A quote based on your website and locations",
  "pricingText": "Scope depends on the number of pages and genuine business locations, the condition of the website, access, and whether you need an audit, implementation, or ongoing support. Your quote states deliverables, exclusions, revisions, timing, and any separate tool costs. Advertising spend and paid campaigns are separate from this SEO service.",
  "processTitle": "From the first review to implementation",
  "processSteps": [
    {
      "label": "1. Share your starting point.",
      "text": "Send your website, profile link if you have one, actual service areas, main services, and the enquiries you want to receive."
    },
    {
      "label": "2. Agree the priorities and access.",
      "text": "Confirm the audit and implementation scope. Keep ownership of your domain, website, and Google accounts; grant the access needed for the agreed work."
    },
    {
      "label": "3. Implement, check, and report.",
      "text": "Review content with you, check the changed pages and enquiry path, and record the baseline and completed work for the next progress review."
    }
  ],
  "faqItems": [
    {
      "question": "Do I need a Google Business Profile for website SEO?",
      "answer": "No. Website SEO can help an online-only business. Google Business Profiles are for eligible businesses that meet customers in person, either at a qualifying location or by visiting customers. We check eligibility before including profile work.",
      "some_features": [
        "Website SEO",
        "Eligibility Check",
        "Actual Service Areas"
      ]
    },
    {
      "question": "Is this an audit or an ongoing monthly service?",
      "answer": "It can be an audit, agreed implementation work, or ongoing support. The quote identifies the pages and profiles covered, who makes each change, and the reporting schedule. A new website or paid advertising campaign is scoped separately.",
      "some_features": [
        "Defined Deliverables",
        "Implementation Scope",
        "Agreed Reporting"
      ]
    },
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
      "answer": "Share your website, Google Business Profile link if applicable, main services, and actual service areas through the enquiry form. Rahul will review the starting point with you before agreeing the scope and providing a custom quote.",
      "some_features": [
        "Your Goals",
        "Clear Scope",
        "Custom Quote"
      ]
    }
  ],
  "finalCtaTitle": "Share your website and service areas",
  "finalCtaText": "Tell Rahul what you offer, where you work, and what you want to improve. Include your website and profile links so the conversation starts with your actual business.",
  heroImage: serviceThumbnail
},
  {
    pricingText: "The estimate depends on page types, content readiness, integrations, migration and support. Domain, hosting, paid tools and maintenance should be visible in the proposal. A smaller first release can be sensible when it covers a complete customer journey; removing essential form checks or accessibility is not a useful cost saving.",
    pricingTitle: "Quote the functionality as well as the pages",
    processSteps: [
      {
        "label": "Map pages and responsibilities.",
        "text": "Agree the content, functionality, assets and people needed for the build."
      },
      {
        "label": "Build and review the journeys.",
        "text": "Review actual pages and interactions, with feedback consolidated at agreed stages."
      },
      {
        "label": "Check launch and handover.",
        "text": "Test forms, links, devices and launch settings, then document the agreed access and support."
      }
    ],
    processTitle: "From brief to checked release",
    answerSections: [
      {
        "title": "Plan the pages around real customer questions",
        "paragraphs": [
          "A business website needs to explain what you do, who it is for, what the work involves and how to enquire. We use those questions to plan the page list and navigation. A campaign landing page, a service website and an online store need different content and different acceptance checks.",
          "Bring existing URLs, your service details, photographs, brand assets and the action you want visitors to take. If the project replaces a live site, existing pages and links need to be accounted for before changing the structure."
        ]
      },
      {
        "title": "What the agreed build can cover",
        "bullets": [
          "Page planning, content structure and a responsive interface for the selected scope.",
          "Service pages, landing pages, product pages or other explicitly agreed templates.",
          "Page titles, headings, internal links and crawl-friendly technical foundations.",
          "Forms and integrations with defined success and failure behaviour.",
          "Mobile, accessibility and performance checks alongside launch and handover requirements."
        ],
        "paragraphs": [
          "Copywriting, migration, ecommerce, booking systems, multilingual content and custom account areas should be named individually. Calling a project a five-page website does not describe the work hidden behind a payment or booking button."
        ]
      },
      {
        "title": "Test the enquiry path as well as the design",
        "paragraphs": [
          "A form that looks finished can still send mail to the wrong address, clear a message after a failure or count every button click as a lead. The project should define what successful delivery means and what the visitor sees when something goes wrong.",
          "Review small screens, keyboard access, readable labels and the actual content. Large media and third-party widgets need a reason to be there. Performance work should focus on the visitor's experience, with measurements used to identify specific problems rather than as a substitute for testing."
        ]
      },
      {
        "title": "Keep the website operable after launch",
        "paragraphs": [
          "The business should retain ownership of its domain, hosting and relevant accounts. Agree who can change content, who receives enquiries and who handles renewals. Handover should cover the assets and access included in the project.",
          "A launch is not a guarantee of search traffic. Search visibility also depends on useful content, competition and ongoing maintenance. Backups, updates, new pages and post-launch support need explicit ownership and scope so the site can remain useful after the initial build."
        ]
      }
    ],
    updatedAt: "2026-09-16",
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
    relatedLinks: [{ title: 'Website development briefs and launch checklists', path: '/blog/website-development' }, { title: 'Business website development services', path: '/website-development' }, { title: 'Development example: KalyamRam portfolio website', path: '/portfolio/kalyamram' }, { title: 'Development example: ReelsXpress booking platform', path: '/portfolio/reelsxpress' }],
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
    pricingText: "Applications are quoted by workflows, roles, data, integrations and platform requirements. Payment handling, offline use, migration and app-store delivery can change the scope substantially. The proposal should also separate hosting, usage-based services and ongoing maintenance from implementation.",
    pricingTitle: "What changes the estimate",
    processSteps: [
      {
        "label": "Map the work.",
        "text": "Identify users, records, permissions and the most important complete journey."
      },
      {
        "label": "Review a working slice.",
        "text": "Build the main flow with realistic data and agree feedback before adding more features."
      },
      {
        "label": "Check release readiness.",
        "text": "Verify permissions and failure paths, then agree deployment, handover and support."
      }
    ],
    processTitle: "How an application is scoped",
    answerSections: [
      {
        "title": "When a website is no longer enough",
        "paragraphs": [
          "A website explains an offer and captures interest. An application usually maintains state: who signed in, what they are allowed to see, which record changed and what happens next. Examples include internal dashboards, customer portals and booking workflows.",
          "Describe the work currently done in spreadsheets, messages or separate tools. Include the exceptions: a cancelled booking, a duplicate request or a user who leaves the business. Those details reveal more about the required application than a list of attractive screens."
        ]
      },
      {
        "title": "Define the rules behind each screen",
        "bullets": [
          "User roles, sign-in and permission boundaries for each action.",
          "Data fields, validation, record ownership and how information is corrected.",
          "The main workflow and its empty, loading, error and completion states.",
          "Notifications and integrations, including what happens when a provider is unavailable.",
          "Administration, support, deployment and agreed handover requirements."
        ],
        "paragraphs": [
          "Web, mobile-first web and native mobile delivery are different scopes. Device features, offline needs, distribution and maintenance should guide the choice. A responsive website should not be described as an app-store application unless that delivery is actually included."
        ]
      },
      {
        "title": "Build one complete workflow before adding breadth",
        "paragraphs": [
          "For a hypothetical booking tool, a useful first slice includes availability, a valid booking, confirmation and cancellation rules. A calendar screen alone does not prove the process works. Tests should also cover two people trying to reserve the same resource and a failed notification.",
          "Release review needs representative data and more than the developer's account. A user should not be able to read or change another person's records merely by changing a link. The exact checks depend on the application's data and permissions, but they belong in the build scope."
        ]
      },
      {
        "title": "Plan who operates the application",
        "paragraphs": [
          "Agree who receives error reports, handles user questions, manages account access and pays for hosting or external services. Backups are useful only when restoration and responsibility are understood. Export and handover requirements should be discussed before the data model becomes difficult to change.",
          "Further features, ongoing maintenance and response expectations need a separate agreement where they extend beyond delivery. A clear first release gives you something usable and a better basis for deciding what to build next."
        ]
      }
    ],
    updatedAt: "2026-09-16",
    slug: 'applications',
    path: '/service/applications',
    subtitle: 'Product Builds',
    title: 'Web & Mobile Applications',
    introPrimary:
      "Build a web or mobile application around a job people need to complete: manage a request, update a record, book a resource or use a product account.",
    introSecondary:
      "The first step is to define users, permissions and the complete workflow. Platform choice and features follow that scope.",
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
    pricingText: "The quote depends on the core workflow, permissions, integrations, data and release requirements. A prototype for a presentation and a product handling real user accounts are different deliverables. Hosting, external services and subsequent feature work are identified separately in the proposal.",
    pricingTitle: "Scope determines the first-release cost",
    processSteps: [
      {
        "label": "Choose the test.",
        "text": "Agree the target user, problem, learning goal and essential workflow."
      },
      {
        "label": "Build and check.",
        "text": "Implement the workflow, review it with realistic examples and verify important failure paths."
      },
      {
        "label": "Release and observe.",
        "text": "Agree operating responsibilities, feedback collection and what would justify another iteration."
      }
    ],
    processTitle: "A bounded first release",
    answerSections: [
      {
        "title": "Name the assumption the release should test",
        "paragraphs": [
          "An MVP is useful when it answers a business question. Will a particular customer use this workflow? Can they complete it without explanation? Is the output useful enough to return for? A long list of features can delay those answers without making the test stronger.",
          "Start with one user type and one complete task. For a hypothetical request marketplace, that might be submitting a request and receiving a relevant response. Recommendations, loyalty points and a complex dashboard can wait until the main exchange has a reason to exist."
        ]
      },
      {
        "title": "Separate manual operations from essential safeguards",
        "paragraphs": [
          "Some early work can happen manually, such as reviewing a request or sending an approved update. State those manual steps openly and assign an owner. They let you test demand without building every administrative screen.",
          "Permission checks, valid records, clear payment behaviour and protection against losing user work are different. They are part of making the first version usable. A reduced scope should narrow the product, not leave users guessing whether their submission or payment succeeded."
        ],
        "bullets": [
          "One agreed core journey and a short list of release requirements.",
          "Explicit manual steps, exclusions and follow-up responsibilities.",
          "A way to observe completion and collect useful feedback.",
          "Acceptance checks for the main journey and important failure cases."
        ]
      },
      {
        "title": "Use AI-assisted development with review",
        "paragraphs": [
          "AI-assisted tools can help produce code and explore implementation options, but generated output still needs review. The project is judged by the working behaviour, permissions and maintainability of the release, not by how quickly a screen can be produced.",
          "Keep third-party services and technical choices understandable. A simple implementation that the owner can operate is more valuable than a collection of experimental tools with unclear costs or access. Any material limitations should be visible at handover."
        ]
      },
      {
        "title": "Decide what happens after the first users",
        "paragraphs": [
          "Record what people tried, where they stopped and what help they needed. A small sample can reveal usability problems, but it does not automatically establish demand or product-market fit. Combine observations with conversations and the business's actual acquisition process.",
          "The next release should respond to evidence: a repeated obstacle, a missing operational step or a feature customers actually need. New ideas can stay in a backlog until there is a reason to prioritise them."
        ]
      }
    ],
    updatedAt: "2026-09-16",
    slug: 'mvp-builds',
    path: '/service/mvp-builds',
    subtitle: 'Startup Launches',
    title: 'MVP Builds',
    introPrimary:
      "Turn a product idea into a first release that lets a real user complete the job you want to test.",
    introSecondary:
      "We define the essential workflow, the learning goal and the release boundaries before expanding the feature list.",
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
    pricingText: "Cost depends on connected systems, permissions, data complexity, approval steps and failure handling. Model usage, automation subscriptions and other third-party charges are separate where applicable. Share the expected volume and existing tools so recurring costs and operating responsibilities can be discussed before implementation.",
    pricingTitle: "Quote the workflow and its operation",
    processSteps: [
      {
        "label": "Document a real example.",
        "text": "Identify inputs, output requirements, exceptions and the current owner."
      },
      {
        "label": "Build a limited workflow.",
        "text": "Use rules where possible and add AI only for the parts that need interpretation."
      },
      {
        "label": "Check and hand over.",
        "text": "Test failures and duplicates, then document approval, monitoring and recovery steps."
      }
    ],
    processTitle: "From a manual task to a checked workflow",
    answerSections: [
      {
        "title": "Map the process before choosing a tool",
        "paragraphs": [
          "Bring a recent example of the work: where it arrives, who handles it, which systems it touches and what a correct result looks like. Include the awkward cases, such as missing information, duplicate messages and requests that need judgement.",
          "A fixed rule may solve part of the problem more reliably than a model. For example, routing a form by its selected service does not require AI. Summarising a long free-text request may benefit from AI, provided the summary is checked before it drives an important action."
        ]
      },
      {
        "title": "Define the automation's boundary",
        "bullets": [
          "The trigger, accepted inputs and systems the workflow may access.",
          "Validation, duplicate handling and the required output format.",
          "Actions allowed automatically and actions held for human approval.",
          "Logs, failure notifications and a way to pause or recover the process.",
          "Account ownership, data handling and usage-based platform costs."
        ],
        "paragraphs": [
          "An enquiry-drafting workflow, for example, can prepare a suggested response while keeping the actual send under human control. That boundary should be explicit rather than left to a prompt to infer."
        ]
      },
      {
        "title": "Test exceptions before expanding volume",
        "paragraphs": [
          "Use normal examples and deliberate failures: empty fields, contradictory instructions, an unavailable provider and the same event delivered twice. The workflow should not create two records or send two messages because a retry occurred.",
          "AI output can be incomplete or incorrect even when it sounds confident. Check required fields and source facts before passing the result onward. Customer messages and imported documents are inputs to process, not permission to change the workflow's rules or expose private data."
        ]
      },
      {
        "title": "Measure the work that remains",
        "paragraphs": [
          "Compare the previous handling time with the time spent reviewing, correcting and recovering automated work. A process that generates drafts quickly but requires extensive repairs may not be saving useful effort. Start with a bounded workflow so this is easy to observe.",
          "Agree who monitors failures and updates the process when a form, API or business rule changes. Ongoing operation is separate from a one-time implementation unless the proposal includes it. The business should retain access to the accounts needed to operate or pause the workflow."
        ]
      }
    ],
    updatedAt: "2026-09-16",
    slug: 'ai-automations',
    path: '/service/ai-automations',
    subtitle: 'Workflow Systems',
    title: 'AI Automations',
    introPrimary:
      "Automate a repetitive business process with clear inputs, checked outputs and a person responsible when something needs attention.",
    introSecondary:
      "Suitable starting points include enquiry routing, draft preparation, record updates and internal summaries. The workflow decides whether AI is useful.",
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
