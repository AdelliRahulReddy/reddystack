import { pageSeo, siteConfig } from "@/data/siteConfig";

export type TrustPageSlug = "privacy-policy" | "terms" | "revision-policy";

export type TrustPageData = {
  slug: TrustPageSlug;
  title: string;
  subtitle: string;
  metaKey: "privacyPolicy" | "terms" | "revisionPolicy";
  intro: string;
  sections: {
    title: string;
    body: string[];
    bullets?: string[];
    links?: { title: string; path: string }[];
  }[];
};

export const trustPages: Record<TrustPageSlug, TrustPageData> = {
  "privacy-policy": {
    slug: "privacy-policy",
    title: "Privacy Policy",
    subtitle: "Trust and data handling",
    metaKey: "privacyPolicy",
    intro:
      "This policy explains how Reddystack handles information shared through the website, contact form, email, WhatsApp, analytics, and project communication.",
    sections: [
      {
        title: "Information Reddystack may collect",
        body: [
          "When you contact Reddystack, the site may collect the details you choose to submit, such as name, email, business or project name, project message, selected services, and budget range. Enquiries also include the service page you came from and an enquiry reference so we can understand and follow up on your request.",
          "The website may also use analytics tools such as GA4 to understand page visits, events, device type, and general traffic patterns. Do not send sensitive personal, payment, or private account information through the contact form.",
        ],
      },
      {
        title: "How the information is used",
        body: [
          "Submitted information is used to respond to inquiries, understand project scope, prepare quotes, improve the website, and keep communication relevant to the request.",
          "Reddystack does not publish private inquiry details as testimonials, case studies, or public results without permission.",
        ],
      },
      {
        title: "Current tools and future updates",
        body: [
          "Reddystack currently uses direct website inquiries, email, WhatsApp, and website analytics to understand requests and improve the site.",
          "If Reddystack adds payment gateways, CRM tools, advertising pixels, newsletters, client portals, or other processors later, this page will be updated with the actual tools and relevant handling rules.",
        ],
      },
    ],
  },
  terms: {
    slug: "terms",
    title: "Terms of Service",
    subtitle: "Website and service terms",
    metaKey: "terms",
    intro:
      "These terms explain the basic conditions for using the Reddystack website and requesting scoped digital service work.",
    sections: [
      {
        title: "Website use",
        body: [
          "The Reddystack website provides information about ads, creative content, AI UGC-style videos, websites, SEO, pricing, and portfolio work. Apps, MVPs, chatbots, and automation are additional services available on request.",
          "Information on the website is not a guarantee of results, rankings, revenue, traffic, or platform approval.",
        ],
      },
      {
        title: "Project scope",
        body: [
          "Service work should be confirmed through an agreed scope, timeline, deliverables, exclusions, and price before work starts.",
          "Changes outside the agreed scope may require a revised quote, timeline, or separate phase.",
        ],
      },
      {
        title: "Business identity",
        body: [
          `${siteConfig.brandName} is currently presented as an ${siteConfig.businessStructure.toLowerCase()} based in ${siteConfig.location}.`,
          `${siteConfig.brandName} is ${siteConfig.registrationStatus.toLowerCase()}. ${siteConfig.taxStatus}. Udyam or MSME details will be shown only after registration is completed.`,
        ],
      },
      {
        title: "Communication, approvals, and third-party tools",
        body: [
          "Project communication may happen through email, WhatsApp, calls, documents, or shared workspaces depending on the agreed scope. Client feedback, approvals, content, credentials, and access details should be provided on time so the work can move through planning, build, review, and launch without avoidable delay.",
          "Some projects may depend on third-party services such as hosting platforms, analytics, forms, payment providers, email tools, automation tools, AI services, or domain providers. Those services remain subject to their own terms, pricing, limits, outages, and approval rules.",
        ],
      },
    ],
  },
  "revision-policy": {
    slug: "revision-policy",
    title: "Revision and Refund Policy",
    subtitle: "Scope, revisions, and cancellations",
    metaKey: "revisionPolicy",
    intro:
      "This page gives practical guidance for revisions, cancellations, and refunds on scoped Reddystack digital service work.",
    sections: [
      {
        title: "Revisions",
        body: [
          "Revision rounds should be defined in the project scope before work starts. Revisions usually cover changes inside the agreed direction, not new pages, features, integrations, or a different strategy.",
          "Requests outside the agreed scope may need a separate quote or a later phase.",
        ],
      },
      {
        title: "Refunds and cancellations",
        body: [
          "Because this is custom service work, refund eligibility depends on the project stage, work already completed, and the written agreement for that scope.",
          "If a project is cancelled before work starts, the refund or adjustment should follow the agreed payment terms for that project.",
        ],
      },
      {
        title: "Current refund and revision approach",
        body: [
          "Revision rounds depend on the selected plan and must be written into the project scope before work starts. Starter scopes usually include limited revisions; larger builds should use milestone-based review points.",
          "Refunds may be provided according to the agreed scope, payment stage, and work already completed. If a project is cancelled before work starts, the payment can be refunded or adjusted according to the written agreement, excluding direct payment gateway or transfer costs when applicable.",
        ],
      },
    ],
  },
};

export function getTrustPage(slug: TrustPageSlug) {
  return trustPages[slug];
}

export function getTrustPageSeo(slug: TrustPageSlug) {
  return pageSeo[trustPages[slug].metaKey];
}
