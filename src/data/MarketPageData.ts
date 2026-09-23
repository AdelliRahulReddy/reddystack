import type { MarketCode } from "@/data/MarketConfig";

export type MarketHeroContent = {
  slide_text: string[];
  sub_title: string;
  title_before: string;
  title_accent: string;
  title_after: string;
  sm_info: string;
  btn_text: string;
  btn_href: string;
  secondary_text: string;
  secondary_href: string;
  trust_points: string[];
};

export type MarketFocusItem = { title: string; body: string };
export type MarketFocusContent = {
  eyebrow: string;
  title: string;
  intro: string;
  items: MarketFocusItem[];
};

export type MarketPageData = {
  title: string;
  description: string;
  hero: MarketHeroContent;
  focus: MarketFocusContent;
};

const heroTrustPoints = ["Founder-led", "Remote from Hyderabad, India", "Scope agreed first"];

export const marketPages: Record<MarketCode, MarketPageData> = {
  us: {
    title: "Digital growth support for US businesses",
    description: "Founder-led website, SEO and paid campaign support for US businesses, delivered remotely from Hyderabad, India. Clear scope and measurement.",
    hero: {
      slide_text: ["United States", "Diagnose", "Build", "Prove", "Scale"],
      sub_title: "UNITED STATES · REMOTE DELIVERY FROM INDIA",
      title_before: "A clearer digital growth path for ",
      title_accent: "US businesses",
      title_after: ".",
      sm_info: "Websites, search, paid acquisition and creative—led directly by Rahul Reddy from Hyderabad, India. Start with one defined problem and a clear way to measure progress.",
      btn_text: "Start a Project",
      btn_href: "/contact",
      secondary_text: "See Selected Work",
      secondary_href: "/portfolio",
      trust_points: heroTrustPoints,
    },
    focus: {
      eyebrow: "US market focus",
      title: "Start with the customers you can serve.",
      intro: "A useful US landing page makes clear who the business serves, what it offers and what a visitor should do next.",
      items: [
        { title: "Set the coverage", body: "Choose the states, metro areas or local service zones the business can genuinely serve. Match page content and campaign targeting to that footprint." },
        { title: "Use US market language", body: "Use US English. Show USD pricing only when the amount and offer are confirmed; ReddyStack project quotes remain custom to the agreed scope." },
        { title: "Measure the next step", body: "Choose the action that matters—call, quote request, booking or sale—and make the landing page and campaign support that action." },
      ],
    },
  },
  au: {
    title: "Digital growth support for Australian businesses",
    description: "Founder-led website, search and campaign support for Australian businesses, delivered remotely from Hyderabad, India with a clear scope.",
    hero: {
      slide_text: ["Australia", "Diagnose", "Build", "Prove", "Scale"],
      sub_title: "AUSTRALIA · REMOTE DELIVERY FROM INDIA",
      title_before: "Connect with customers across ",
      title_accent: "Australia",
      title_after: ".",
      sm_info: "Plan websites, search, paid campaigns and creative around the Australian customers and regions your business can actually serve.",
      btn_text: "Start a Project",
      btn_href: "/contact",
      secondary_text: "See Selected Work",
      secondary_href: "/portfolio",
      trust_points: heroTrustPoints,
    },
    focus: {
      eyebrow: "Australian market focus",
      title: "Set a clear Australian service area.",
      intro: "State and territory coverage, local language and a realistic review plan help keep a remote project focused.",
      items: [
        { title: "Define the regions", body: "Name the states, territories or cities included. Build location pages and campaign targets only for places the business serves." },
        { title: "Plan the handoffs", body: "Agree who reviews work and when feedback is due, taking the business's local working hours and remote delivery from India into account." },
        { title: "Match the message", body: "Use Australian English and keep the page, offer and campaign consistent for the selected audience." },
      ],
    },
  },
  ca: {
    title: "Digital growth support for Canadian businesses",
    description: "Founder-led website, SEO and paid acquisition support for Canadian businesses, delivered remotely from Hyderabad, India.",
    hero: {
      slide_text: ["Canada", "Diagnose", "Build", "Prove", "Scale"],
      sub_title: "CANADA · REMOTE DELIVERY FROM INDIA",
      title_before: "Digital growth for ",
      title_accent: "Canadian businesses",
      title_after: ".",
      sm_info: "Connect your website, search, paid acquisition and creative around the provinces, audiences and enquiries that matter to your business.",
      btn_text: "Start a Project",
      btn_href: "/contact",
      secondary_text: "See Selected Work",
      secondary_href: "/portfolio",
      trust_points: heroTrustPoints,
    },
    focus: {
      eyebrow: "Canadian market focus",
      title: "Plan for the provinces you serve.",
      intro: "A clear regional scope helps your website and campaigns speak to the right audience without claiming coverage you do not offer.",
      items: [
        { title: "Choose the service areas", body: "Identify the provinces, cities or metro areas included. Tie local pages and targeting to the business's real coverage." },
        { title: "Choose the page language", body: "Set the language for each audience before writing. Add another language only when translation and review are part of the agreed scope." },
        { title: "Keep the offer clear", body: "Use Canadian terminology and show CAD pricing only when the amount is confirmed. Project quotes are custom to the agreed work." },
      ],
    },
  },
  uk: {
    title: "Digital growth support for UK businesses",
    description: "Founder-led website, SEO and campaign support for UK businesses, delivered remotely from Hyderabad, India with a clear scope.",
    hero: {
      slide_text: ["United Kingdom", "Diagnose", "Build", "Prove", "Scale"],
      sub_title: "UNITED KINGDOM · REMOTE DELIVERY FROM INDIA",
      title_before: "A clearer digital path for ",
      title_accent: "UK businesses",
      title_after: ".",
      sm_info: "Website, search, paid acquisition and creative work shaped around your UK audience, led directly by Rahul Reddy from Hyderabad, India.",
      btn_text: "Start a Project",
      btn_href: "/contact",
      secondary_text: "See Selected Work",
      secondary_href: "/portfolio",
      trust_points: heroTrustPoints,
    },
    focus: {
      eyebrow: "UK market focus",
      title: "Start with your actual UK coverage.",
      intro: "The right starting point depends on whether you serve a local area, a UK region or customers across the country.",
      items: [
        { title: "Set the geographic scope", body: "Choose the towns, regions or UK-wide areas the business can serve before pages or campaigns are planned." },
        { title: "Use UK wording", body: "Keep spelling, terminology and any displayed pricing consistent with the intended UK audience." },
        { title: "Track a useful action", body: "Choose one measurable next step—such as an enquiry, call or booking—and connect the landing page to it." },
      ],
    },
  },
  ae: {
    title: "Digital growth support for UAE businesses",
    description: "Founder-led website, search and campaign support for UAE businesses, delivered remotely from Hyderabad, India.",
    hero: {
      slide_text: ["United Arab Emirates", "Diagnose", "Build", "Prove", "Scale"],
      sub_title: "UNITED ARAB EMIRATES · REMOTE DELIVERY FROM INDIA",
      title_before: "A focused customer journey for ",
      title_accent: "UAE customers",
      title_after: ".",
      sm_info: "Plan your website, search, paid campaigns and creative around the emirates, audience and enquiry route your business is ready to serve.",
      btn_text: "Start a Project",
      btn_href: "/contact",
      secondary_text: "See Selected Work",
      secondary_href: "/portfolio",
      trust_points: heroTrustPoints,
    },
    focus: {
      eyebrow: "UAE market focus",
      title: "Define the emirate and audience.",
      intro: "Clear market choices keep location content and campaign targeting tied to the actual offer and sales process.",
      items: [
        { title: "Choose the service area", body: "Name the emirate or cities included. Avoid implying UAE-wide coverage if the business serves a smaller area." },
        { title: "Set the language plan", body: "Decide which languages the customer journey needs. Translation and review should be agreed before translated content is published." },
        { title: "Match the enquiry route", body: "Use the actual call, form, booking or sales route customers can follow, then agree how that action will be measured." },
      ],
    },
  },
  sg: {
    title: "Digital growth support for Singapore businesses",
    description: "Founder-led website, search and paid acquisition support for Singapore businesses, delivered remotely from Hyderabad, India.",
    hero: {
      slide_text: ["Singapore", "Diagnose", "Build", "Prove", "Scale"],
      sub_title: "SINGAPORE · REMOTE DELIVERY FROM INDIA",
      title_before: "Connect digital growth with ",
      title_accent: "Singapore",
      title_after: ".",
      sm_info: "Connect website, search, paid campaigns and creative for Singapore customers—or for a wider regional audience when that is the real goal.",
      btn_text: "Start a Project",
      btn_href: "/contact",
      secondary_text: "See Selected Work",
      secondary_href: "/portfolio",
      trust_points: heroTrustPoints,
    },
    focus: {
      eyebrow: "Singapore market focus",
      title: "Choose local or regional reach.",
      intro: "A local campaign and a regional campaign need different pages, targeting and measures. Define the intended market before building.",
      items: [
        { title: "Name the audience", body: "Decide whether the offer is for Singapore only or also for selected regional markets. Reflect that choice in the page and targeting." },
        { title: "Keep the offer consistent", body: "Use language and terminology that fit the intended audience, and keep the same offer across the page and campaign." },
        { title: "Measure the response", body: "Set one clear lead or sales action and use it consistently across the landing page, campaign and reporting." },
      ],
    },
  },
  in: {
    title: "Digital growth support for businesses across India",
    description: "Founder-led website, SEO and paid campaign support across India, led from Hyderabad with clear scope and measurement.",
    hero: {
      slide_text: ["India", "Diagnose", "Build", "Prove", "Scale"],
      sub_title: "INDIA · HYDERABAD-BASED · WORKING ACROSS THE COUNTRY",
      title_before: "Build clearer digital foundations in ",
      title_accent: "India",
      title_after: ".",
      sm_info: "Plan SEO-ready websites, local search and campaigns around the cities, regions and customers your business can genuinely serve.",
      btn_text: "Start a Project",
      btn_href: "/contact",
      secondary_text: "See Selected Work",
      secondary_href: "/portfolio",
      trust_points: heroTrustPoints,
    },
    focus: {
      eyebrow: "India market focus",
      title: "Choose the cities and regions you serve.",
      intro: "A local business and an all-India offer need different search pages and campaign coverage. Start with the service area you can deliver.",
      items: [
        { title: "Set real coverage", body: "Choose the cities or regions the business can serve. Use local SEO for genuine local coverage and broader content only when the offer supports it." },
        { title: "Choose the language", body: "Use English or another language that fits the customers. Add translated pages only when the content can be properly reviewed." },
        { title: "Connect the enquiry path", body: "Choose how customers should respond—call, WhatsApp, quote request or booking—and make that action easy to find and measure." },
      ],
    },
  },
};
