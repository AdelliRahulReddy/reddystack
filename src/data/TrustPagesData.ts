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
    subtitle: "Website data handling · Updated 23 September 2026",
    metaKey: "privacyPolicy",
    intro:
      "This page explains the information used when you browse ReddyStack or contact Rahul through the website, email or WhatsApp. It describes the current website workflow; any additional data handling for a project should be discussed as part of that project's scope.",
    sections: [
      {
        "title": "Information you send with an enquiry",
        "body": [
          "The contact form asks for your name, email, business or project name, message, budget range and selected services. It also includes the source page and an enquiry reference so the request can be understood and followed up. Information you send directly by email or WhatsApp is part of that conversation.",
          "Share only what is needed to explain the work. Do not put passwords, payment-card details, identity documents or private customer records into the enquiry form. If a project needs access to an account or more detailed material, the method and permissions should be agreed separately."
        ]
      },
      {
        "title": "How an enquiry reaches ReddyStack",
        "body": [
          "The website sends validated form submissions through Resend to the ReddyStack contact inbox. The message contains the submitted details, source page and enquiry reference. The contact-form endpoint does not create a separate enquiry database; delivery and the resulting email conversation involve the email services used.",
          "The website is hosted on Vercel. The form uses a short-lived request counter to limit repeated submissions; on Vercel, it derives the counter key from the supplied client-IP header using a hash. Form delivery errors are logged with a reference and error category rather than the full submitted message."
        ]
      },
      {
        "title": "Analytics and contact-action measurement",
        "body": [
          "The website uses Google Analytics 4 to understand page visits, traffic sources, device information and recorded interactions. It records actions such as contact-link clicks and successful form submissions. A contact-link click is a navigation action, not proof that a conversation or sale occurred.",
          "The site's custom form-submission event includes the selected services, selected budget, source page and enquiry reference. It does not intentionally include the submitted name, email or message. Analytics and hosting providers process technical information under their own arrangements; avoid placing sensitive information in a page URL or query string."
        ]
      },
      {
        title: "Country suggestions and saved preference",
        body: [
          "On Vercel, the website may use the country code supplied in the request to suggest a matching country page. The suggestion does not redirect you. The website feature returns only a supported country code and does not store or log your raw IP address; Vercel may process request data under its own hosting arrangements. No suggestion is shown when country information is unavailable or unsupported.",
          "If you choose a country or dismiss a suggestion, that choice is saved in this browser's local storage so the prompt does not keep returning. It stays there until you choose another option or clear the website's browser storage. The stored preference is not sent as an analytics event.",
        ],
      },
      {
        "title": "Why the information is used",
        "body": [
          "Enquiry details are used to respond, understand requirements, prepare a quote and keep project communication connected to the request. Website measurement helps identify which pages and contact paths are being used. ReddyStack does not publish private enquiry details as testimonials, portfolio results or case studies without permission.",
          "Project communications and email records are different from the website's temporary request counter. Do not assume that closing the page deletes a sent message or removes records held by an email or analytics provider."
        ]
      },
      {
        "title": "Questions, corrections and changes",
        "body": [
          "Contact Rahul through the published contact details if you need to correct an enquiry or discuss information you have shared. Give enough context to identify the conversation, such as its subject or reference, without sending additional sensitive material unnecessarily.",
          "A link to WhatsApp, email or another website opens a separate service with its own data-handling rules. If ReddyStack adds a CRM, newsletter, payment system or other data workflow, this page should be updated to reflect the actual implementation."
        ],
        "links": [
          {
            "title": "Contact ReddyStack about your information",
            "path": "/contact"
          }
        ]
      }
    ],
  },
  terms: {
    slug: "terms",
    title: "Terms of Service",
    subtitle: "Website and service terms · Updated 16 September 2026",
    metaKey: "terms",
    intro:
      "These terms explain the basic conditions for using the ReddyStack website and requesting scoped digital service work.",
    sections: [
      {
        title: "Website use",
        body: [
          "The ReddyStack website explains a proof-first digital growth method, connected capabilities, ways to work, portfolio items, and practical insights. A proposal selects only the web, search, paid acquisition, creative, tracking, automation, or product work required by the agreed problem.",
          "Information on the website is not a guarantee of results, rankings, revenue, traffic, or platform approval.",
        ],
      },
      {
        title: "Project scope",
        body: [
          "Submitting an enquiry starts a scope discussion; it does not automatically start a paid project. Service work should be confirmed through an agreed scope, timeline, deliverables, exclusions and price before work starts. The agreement should identify the content and access required from the business and the person responsible for approval.",
          "Changes outside the agreed scope may require a revised quote, timeline or separate phase. Describe the additional work and its effect before proceeding. A website build, an advertising campaign and an ongoing support arrangement are different scopes, even when they relate to the same business.",
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
          "Project communication may happen through email, WhatsApp, calls, documents or shared workspaces depending on the agreed scope. Keep approvals and material changes in an identifiable written record. Content, feedback and account access are dependencies to agree before a timeline is confirmed; do not send passwords or private customer records through the public enquiry form.",
          "Some projects may depend on third-party services such as hosting platforms, analytics, forms, payment providers, email tools, automation tools, AI services, or domain providers. Those services remain subject to their own terms, pricing, limits, outages, and approval rules.",
        ],
      },
      {
        title: "Content, claims and supplied assets",
        body: [
          "Business details, prices, service areas, product claims and supplied assets need approval for the intended use. Identify any licensing or permission limits before production. A generated presenter or demonstration should not be presented as a real customer's experience when it is not.",
          "The portfolio currently contains personal and demo projects. Guide examples and calculations illustrate a method; they are not paid client results or forecasts. Platform references should be checked for the specific live use because requirements can change.",
        ],
      },
      {
        title: "Ownership, handover and continuing costs",
        body: [
          "The proposal should state account ownership, required access and the files or information included at handover. Domains, hosting and advertising accounts should remain accessible to the business. Source files, licences and third-party assets may have specific delivery or usage conditions that need to be identified in the scope.",
          "Advertising spend, domain renewal, hosting, paid tools and usage-based services are separate costs unless expressly included. Ongoing maintenance, new content, monitoring and optimisation should also be agreed explicitly rather than assumed to continue after a one-time project.",
        ],
        links: [{ title: "Review pricing and scope", path: "/pricing" }, { title: "Revision and refund guidance", path: "/revision-policy" }],
      },
    ],
  },
  "revision-policy": {
    slug: "revision-policy",
    title: "Revision and Refund Policy",
    subtitle: "Scope, revisions and cancellations · Updated 16 September 2026",
    metaKey: "revisionPolicy",
    intro:
      "Revision and cancellation arrangements belong in the written project agreement. This page explains the questions to settle before work starts and how to describe a request clearly. It does not replace the specific scope and payment terms agreed for your project.",
    sections: [
      {
        "title": "Agree review points before production",
        "body": [
          "The scope should identify the deliverables, revision rounds, approval contact and stages at which feedback is collected. A website may be reviewed by page or milestone; a video may have a script, sample and final-edit review. The project agreement determines the actual stages.",
          "Consolidated feedback helps avoid conflicting changes. Identify the page, asset or version, explain what needs changing and connect the request to the approved brief. If several people need to approve the work, agree who supplies the final combined response."
        ]
      },
      {
        "title": "Refinements and changes of scope",
        "body": [
          "A refinement stays within the agreed direction. Examples might include adjusting approved wording or changing an image to another supplied asset. A new page, integration, video language, workflow or different creative concept can add scope. These examples illustrate the distinction; the written brief decides what is included.",
          "Requests outside the scope may need a revised quote, timeline or later phase. Discuss those effects before extra work begins. A request described as a small edit can still affect other pages or integrations, so the impact should be checked rather than assumed."
        ]
      },
      {
        "title": "Report a delivery problem clearly",
        "body": [
          "If something does not behave as agreed, explain the expected result, the actual result and the steps that reproduce it. Include the relevant page or asset version and device where useful. Avoid sending private records or account passwords as evidence.",
          "This helps distinguish a delivery issue from a new preference or changed requirement. The applicable correction, revision and support arrangements follow the project agreement; a general enquiry through this site does not establish an unlimited support commitment."
        ]
      },
      {
        "title": "Refunds and cancellations",
        "body": [
          "For custom service work, refund eligibility depends on the written agreement, payment stage and work already completed. If a project is cancelled before work starts, any refund or adjustment follows the agreed payment terms. Direct payment-gateway or transfer costs may be excluded where the agreement provides for them.",
          "For a cancellation request, identify the project, the work approved and delivered so far, payments made and the outcome you are requesting. Any refund amount, remaining delivery or handover should be confirmed for that project. This page does not promise an automatic percentage or a fixed refund timeline."
        ]
      },
      {
        "title": "Resolve uncertainty before accepting a quote",
        "body": [
          "Ask about revision rounds, changed briefs, cancelled work, third-party charges and post-delivery support before starting. These details are easier to agree while the deliverables and responsibilities are being defined.",
          "Use the published contact route for a project-specific question. Keep the written scope and approved changes together so both sides can refer to the same record."
        ],
        "links": [
          {
            "title": "Discuss a project or revision",
            "path": "/contact"
          },
          {
            "title": "Pricing and scope guidance",
            "path": "/pricing"
          }
        ]
      }
    ],
  },
};

export function getTrustPage(slug: TrustPageSlug) {
  return trustPages[slug];
}

export function getTrustPageSeo(slug: TrustPageSlug) {
  return pageSeo[trustPages[slug].metaKey];
}
