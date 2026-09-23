import type { MarketCode } from "@/data/MarketConfig";

export type MarketPageData = {
  title: string;
  description: string;
  subtitle: string;
  intro: string;
  sections: {
    title: string;
    body: string[];
    bullets?: string[];
    links?: { title: string; path: string }[];
  }[];
};

export const marketPages: Record<MarketCode, MarketPageData> = {
  us: {
    title: "Digital growth support for US businesses",
    description: "Website development, SEO, paid campaigns, creative and tracking for US businesses, delivered remotely by ReddyStack from Hyderabad, India.",
    subtitle: "United States · Remote delivery from Hyderabad, India",
    intro: "ReddyStack connects your website, search, paid acquisition, creative and tracking around one clear business problem. Rahul Reddy leads projects remotely from Hyderabad, India.",
    sections: [
      {
        title: "Start where growth gets stuck",
        body: [
          "A Proof Sprint can focus on one funnel or delivery problem, record the starting point and set the next decision. If your website and campaigns are handled separately, the review can check how the page, message, channel and measurement fit together.",
          "The scope is agreed before work starts. The goal is a useful finding and a clear next step, not a promise of a particular result.",
        ],
        bullets: ["Which states or service areas can you actually serve?", "Which enquiry or sale action should the site measure?"],
      },
      {
        title: "Choose only the work you need",
        body: ["An engagement can include one capability or connect several around the same goal."],
        bullets: ["Website and landing page development", "SEO and local SEO", "Google Ads and Meta Ads", "Ad creative and AI-assisted UGC-style videos", "Conversion tracking and practical automation"],
        links: [{ title: "See all capabilities", path: "/service" }],
      },
      {
        title: "Agree the details before delivery",
        body: [
          "Remote work starts with a written scope, required access and assets, timeline, and approval contact. Quotes are custom. Advertising spend and third-party subscriptions are separate unless the agreed quote says otherwise.",
        ],
        links: [{ title: "Review ways to work", path: "/pricing" }, { title: "Discuss a project", path: "/contact" }],
      },
    ],
  },
  au: {
    title: "Digital growth support for Australian businesses",
    description: "Founder-led website, search, advertising, creative and measurement support for Australian businesses, delivered remotely from India.",
    subtitle: "Australia · Remote delivery from Hyderabad, India",
    intro: "ReddyStack helps Australian businesses plan and deliver connected website, search, paid campaign, creative and tracking work. Rahul Reddy leads projects remotely from Hyderabad, India.",
    sections: [
      {
        title: "Make remote handoffs clear",
        body: [
          "Good remote delivery needs a shared brief, one approval contact and agreed feedback windows. A Proof Sprint can first define the problem, review the relevant pages or campaigns, and document what should happen next.",
          "This gives both sides a clear decision point before a wider build or ongoing work is scoped.",
        ],
        bullets: ["Which Australian locations are in scope?", "Who reviews work, and when should feedback be ready?"],
      },
      {
        title: "Connect the pieces that affect the same goal",
        body: ["ReddyStack can scope website or landing page development, SEO, Google Ads, Meta Ads, creative, AI-assisted UGC-style video, conversion tracking and automation."],
        links: [{ title: "Explore ReddyStack capabilities", path: "/service" }],
      },
      {
        title: "Set scope, approvals and costs in writing",
        body: [
          "Before work begins, agree the deliverables, timing, required access, review stages and price. Quotes are custom to the scope. Advertising spend, hosting and paid tools are separate unless included in the written quote.",
        ],
        links: [{ title: "How engagements work", path: "/pricing" }, { title: "Start a project conversation", path: "/contact" }],
      },
    ],
  },
  ca: {
    title: "Digital growth support for Canadian businesses",
    description: "Plan website, SEO, paid acquisition and measurement work with ReddyStack, a founder-led digital studio based in Hyderabad, India.",
    subtitle: "Canada · Remote delivery from Hyderabad, India",
    intro: "ReddyStack works remotely with Canadian businesses on website development, search, paid acquisition, creative and measurement. Rahul Reddy leads the work from Hyderabad, India.",
    sections: [
      {
        title: "Set a baseline before adding more activity",
        body: [
          "A focused review can look at the page people land on, the action they should take and whether that action is measured. The agreed baseline helps decide whether the next step is a website change, search work, campaign work or a combination.",
          "A Proof Sprint keeps this first decision within a defined scope and timeline.",
        ],
        bullets: ["Which provinces or service areas should the page cover?", "Should customer content be in English, French or both?"],
      },
      {
        title: "Build around the agreed audience and offer",
        body: ["Project briefs can define the intended audience, service area, offer, language, conversion action and reporting needs before pages or campaigns are produced."],
        links: [{ title: "View services and capabilities", path: "/service" }],
      },
      {
        title: "Keep responsibilities visible",
        body: [
          "The written scope identifies deliverables, approvals, access and price. Quotes are custom. Media spend, hosting and paid third-party tools are separate unless specifically included.",
        ],
        links: [{ title: "See engagement options", path: "/pricing" }, { title: "Contact ReddyStack", path: "/contact" }],
      },
    ],
  },
  uk: {
    title: "Digital growth support for UK businesses",
    description: "Website development, SEO, paid campaigns and measurement for UK businesses, delivered remotely by founder-led ReddyStack in India.",
    subtitle: "United Kingdom · Remote delivery from Hyderabad, India",
    intro: "ReddyStack connects website, search, paid acquisition, creative and tracking work for UK businesses. Rahul Reddy leads each engagement remotely from Hyderabad, India.",
    sections: [
      {
        title: "Put the website and acquisition plan together",
        body: [
          "When a page, search activity and paid campaigns are planned in isolation, it can be hard to see what needs attention first. A focused Proof Sprint can review one journey, document the evidence available and define a practical next step.",
          "Further implementation is scoped only after the problem and responsibilities are clear.",
        ],
        bullets: ["Is the offer for one local area or customers across the UK?", "Should pages use UK spelling and terminology?"],
      },
      {
        title: "Scope the right capabilities",
        body: ["Work can cover website and landing page development, SEO, Google Ads, Meta Ads, creative, AI-assisted UGC-style video, conversion tracking or automation."],
        links: [{ title: "Explore capabilities", path: "/service" }],
      },
      {
        title: "Agree the working plan up front",
        body: [
          "Each remote engagement sets out deliverables, review points, timing, access and price before production. Quotes are custom; advertising spend and third-party tools are separate unless the written scope includes them.",
        ],
        links: [{ title: "Review ways to work", path: "/pricing" }, { title: "Discuss your project", path: "/contact" }],
      },
    ],
  },
  ae: {
    title: "Digital growth support for UAE businesses",
    description: "Remote website, search, paid campaign, creative and tracking support for UAE businesses from founder-led ReddyStack in Hyderabad, India.",
    subtitle: "United Arab Emirates · Remote delivery from Hyderabad, India",
    intro: "ReddyStack supports UAE businesses remotely with connected website, search, paid acquisition, creative and tracking work. Rahul Reddy leads projects from Hyderabad, India.",
    sections: [
      {
        title: "Define the market before building",
        body: [
          "The project brief should identify the audience, service area, language, offer, conversion action and advertising account before pages or campaigns are planned. These details help set a useful scope without assuming the same setup fits every business.",
          "A Proof Sprint can clarify one priority and document the evidence needed for the next decision.",
        ],
        bullets: ["Which emirate or service area is included?", "Does the customer journey need English, Arabic or both?"],
      },
      {
        title: "Connect delivery across the journey",
        body: ["Depending on the brief, work can include website or landing page development, SEO, Google Ads, Meta Ads, creative, AI-assisted UGC-style video, conversion tracking and automation."],
        links: [{ title: "See the full capability list", path: "/service" }],
      },
      {
        title: "Confirm scope and costs clearly",
        body: [
          "ReddyStack agrees deliverables, access, review stages, timeline and price before work starts. Quotes are custom. Advertising spend and paid third-party services are separate unless the quote states otherwise.",
        ],
        links: [{ title: "Explore ways to work", path: "/pricing" }, { title: "Talk through a project", path: "/contact" }],
      },
    ],
  },
  sg: {
    title: "Digital growth support for Singapore businesses",
    description: "Focused website, search, paid acquisition and measurement work for Singapore businesses, delivered remotely by ReddyStack from India.",
    subtitle: "Singapore · Remote delivery from Hyderabad, India",
    intro: "ReddyStack helps Singapore businesses connect web, search, paid acquisition, creative and tracking work around a defined goal. Rahul Reddy leads engagements remotely from Hyderabad, India.",
    sections: [
      {
        title: "Keep the first project focused",
        body: [
          "A Proof Sprint gives one business problem a clear scope, starting point and decision. It can establish whether the next useful step is a landing page, search improvement, campaign setup, creative test or better measurement.",
          "This avoids committing to a wider build before the priority is understood.",
        ],
        bullets: ["Is the offer for Singapore or a wider regional audience?", "Which customer action and campaign geography should be measured?"],
      },
      {
        title: "Bring related capabilities together",
        body: ["ReddyStack can deliver website and landing page development, SEO, Google Ads, Meta Ads, ad creative, AI-assisted UGC-style videos, conversion tracking and practical automation."],
        links: [{ title: "Review available capabilities", path: "/service" }],
      },
      {
        title: "Know what is included",
        body: [
          "The project agreement sets the deliverables, timing, approvals, access and price. Quotes are custom. Advertising spend, hosting and other paid tools are separate unless included in writing.",
        ],
        links: [{ title: "Compare ways to work", path: "/pricing" }, { title: "Start a conversation", path: "/contact" }],
      },
    ],
  },
  in: {
    title: "Digital growth support for businesses across India",
    description: "Founder-led website, SEO, paid campaign, creative and tracking support across India, led from ReddyStack's base in Hyderabad.",
    subtitle: "India · Hyderabad-based, working remotely across the country",
    intro: "ReddyStack is led by Rahul Reddy from Hyderabad and works remotely with businesses across India. Website, search, paid acquisition, creative and tracking work can be scoped together around one clear business problem.",
    sections: [
      {
        title: "Start with the business problem",
        body: [
          "A Proof Sprint can review one issue, record what is happening now and set a practical next step. For a local business, the brief can define its service area and enquiry route; for a broader business, it can define the pages, audience and channels that matter.",
          "No specific lead, ranking or revenue result is promised.",
        ],
        bullets: ["Which cities or service areas can the business genuinely serve?", "Does the page need local SEO or additional language content?"],
      },
      {
        title: "Choose the right mix of work",
        body: ["Projects may include website and landing page development, SEO and local SEO, Google Ads, Meta Ads, creative, AI-assisted UGC-style video, conversion tracking or automation."],
        links: [{ title: "Explore ReddyStack capabilities", path: "/service" }],
      },
      {
        title: "Keep scope and spend clear",
        body: [
          "Before work begins, agree the deliverables, approval process, timing and custom quote. Advertising spend and paid third-party services are separate unless the written scope includes them.",
        ],
        links: [{ title: "See ways to work", path: "/pricing" }, { title: "Discuss a project", path: "/contact" }],
      },
    ],
  },
};
