import type { StaticImageData } from "next/image";
import type { Metadata } from "next";

export const siteSeo = {
  siteName: "ReddyStack",
  siteNameAlternates: ["Reddystack", "reddystack.com"],
  defaultTitle: "ReddyStack | Proof-First Digital Growth Studio",
  defaultDescription:
    "ReddyStack is a proof-first digital growth studio led by Rahul Reddy, connecting web, search, paid acquisition, creative, tracking, and automation.",
  creatorHandle: "@reddystack",
  logoPath: "/assets/img/logo/reddystack-symbol.png",
  ogImagePath: "/assets/img/social/reddystack-proof-first.png",
  ogImageAlt: "ReddyStack — One problem. One connected stack. Proof before scale.",
  contentUpdatedAt: "2026-09-22",
} as const;

export const siteConfig = {
  brandName: siteSeo.siteName,
  ownerName: "Rahul Reddy Adelli",
  titleSuffix: siteSeo.siteName,
  description: siteSeo.defaultDescription,
  keywords: [
  "ReddyStack",
  "proof-first digital growth studio",
  "digital growth systems",
  "website and landing page development",
  "SEO and search visibility",
  "Meta and Google Ads",
  "conversion tracking",
  "AI-assisted automation",
  "Rahul Reddy",
  "Hyderabad"
],
  email: "thereddystack@gmail.com",
  phoneDisplay: "+91 7207022577",
  phoneHref: "+917207022577",
  location: "Hyderabad, India",
  mapUrl: "https://www.google.com/maps/search/Hyderabad%2C%20India",
  businessStructure: "Founder-led proof-first digital growth studio operated by Rahul Reddy Adelli",
  registrationStatus: "Not registered as a private limited company, LLP, or OPC",
  taxStatus: "GST details will be provided when applicable",
  siteUrl: "https://www.reddystack.com",
  serviceAreas: ["Hyderabad", "India", "Worldwide"],
  serviceTypes: [
  "Digital growth diagnostics",
  "Website and landing page development",
  "SEO and search visibility",
  "Meta and Google Ads",
  "Creative and conversion assets",
  "Tracking and analytics",
  "AI automation"
],
  socialLinks: {
    email: "mailto:thereddystack@gmail.com",
    whatsapp: "https://wa.me/917207022577",
    google: "https://www.google.com/search?q=reddystack",
    instagram: "https://www.instagram.com/reddy.stack/",
    x: "https://x.com/reddystack",
    telegram: "https://t.me/reddy_stack",
    youtube: "https://www.youtube.com/results?search_query=reddystack",
    linkedin: "https://www.linkedin.com/in/rahulreddyadelli",
    github: "https://github.com/AdelliRahulReddy",
  },
} as const;

type PageSeoConfig = {
  title: string;
  description: string;
  path: string;
  canonicalPath?: string;
  ogType?: "website" | "article";
  robots?: Metadata["robots"];
};

export const pageSeo = {
  home: {
    title: siteSeo.defaultTitle,
    description: siteSeo.defaultDescription,
    path: "/",
  },
  about: {
    title: "About Rahul Reddy & ReddyStack | Proof-First Studio",
    description:
      "Meet Rahul Reddy and learn how ReddyStack diagnoses, builds, proves, and improves connected digital growth systems with direct founder accountability.",
    path: "/about",
  },
  services: {
    title: "Capabilities | ReddyStack Digital Growth Studio",
    description:
      "Explore the capabilities ReddyStack combines around one growth problem: websites, search, paid acquisition, creative, tracking, and automation.",
    path: "/service",
  },
  portfolio: {
    title: "Work & Proof | Selected ReddyStack Builds",
    description:
      "Review clearly labelled ReddyStack build work, including websites, product interfaces, and automation projects without invented client or performance claims.",
    path: "/portfolio",
  },
  blog: {
    title: "Insights | ReddyStack Proof-First Growth Studio",
    description:
      "Practical ReddyStack guides about web, search, paid acquisition, creative testing, measurement, AI-assisted delivery, and automation.",
    path: "/blog",
  },
  contact: {
    title: "Start With One Growth Problem | Contact ReddyStack",
    description:
      "Share one digital growth problem with Rahul Reddy. Start with a focused proof sprint, connected build, or ongoing improvement engagement.",
    path: "/contact",
  },
  pricing: {
    title: "Ways to Work | Proof Sprint to Scale | ReddyStack",
    description:
      "Understand ReddyStack engagements: a focused Proof Sprint, a connected Stack Build, or ongoing Operate and Improve support with clear scope.",
    path: "/pricing",
  },
  privacyPolicy: {
    title: "Privacy Policy | ReddyStack",
    description:
      "Read how ReddyStack handles website inquiries, contact form details, analytics, cookies, and communication data.",
    path: "/privacy-policy",
  },
  terms: {
    title: "Terms of Service | ReddyStack",
    description:
      "Read the terms for using ReddyStack and commissioning proof sprints, connected digital builds, ongoing optimisation, and related services.",
    path: "/terms",
  },
  revisionPolicy: {
    title: "Revision and Refund Policy | ReddyStack",
    description:
      "Review ReddyStack project revision, cancellation, and refund guidance for scoped digital service work.",
    path: "/revision-policy",
  },
  blogDetail: {
    title: "Insight Details | ReddyStack",
    description:
      "Explore practical ReddyStack insights on proof-first digital growth, search, paid acquisition, measurement, product execution, and AI-assisted delivery.",
    path: "/blog-details",
    ogType: "article",
  },
  portfolioDetail: {
    title: "Project Details | ReddyStack",
    description:
      "Review a detailed ReddyStack build breakdown, including the problem, scope, implementation decisions, evidence, and stated limitations.",
    path: "/portfolio-details",
  },
  blogSidebar: {
    title: "Insights | ReddyStack Proof-First Growth Studio",
    description:
      "Practical guides about web, search, paid acquisition, creative testing, measurement, and automation.",
    path: "/blog-sidebar",
    canonicalPath: "/blog",
    robots: {
      index: false,
      follow: false,
    },
  },
  homeThree: {
    title: "Home Preview | ReddyStack",
    description: siteSeo.defaultDescription,
    path: "/home-3",
    canonicalPath: "/",
    robots: {
      index: false,
      follow: false,
    },
  },
  notFound: {
    title: "Page Not Found | ReddyStack",
    description:
      "The page could not be found. Explore the ReddyStack method, connected capabilities, work, and practical growth insights.",
    path: "/404",
    robots: {
      index: false,
      follow: false,
    },
  },
} satisfies Record<string, PageSeoConfig>;

export type PageSeoKey = keyof typeof pageSeo;

export const buildCanonicalUrl = (path: string = "/") =>
  path === "/" ? `${siteConfig.siteUrl}/` : `${siteConfig.siteUrl}${path}`;

type SeoImageInput = StaticImageData | string;

type SeoImageMeta = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

export const buildAssetUrl = (asset: SeoImageInput) => {
  const assetPath = typeof asset === "string" ? asset : asset.src;

  if (assetPath.startsWith("http://") || assetPath.startsWith("https://")) {
    return assetPath;
  }

  return assetPath.startsWith("/")
    ? `${siteConfig.siteUrl}${assetPath}`
    : `${siteConfig.siteUrl}/${assetPath}`;
};

export const buildSeoImage = (
  image: SeoImageInput,
  alt: string,
  fallbackDimensions: { width: number; height: number } = { width: 1200, height: 630 },
): SeoImageMeta => ({
  url: buildAssetUrl(image),
  width: typeof image === "string" ? fallbackDimensions.width : image.width,
  height: typeof image === "string" ? fallbackDimensions.height : image.height,
  alt,
});

export const buildOpenGraph = (options: {
  title?: string;
  description?: string;
  type?: "website" | "article";
  url?: string;
  images?: SeoImageMeta[];
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}) => ({
  type: options.type || "website",
  locale: "en_US",
  url: options.url || siteConfig.siteUrl,
  title: options.title || siteSeo.defaultTitle,
  description: options.description || siteSeo.defaultDescription,
  siteName: siteSeo.siteName,
  images: options.images || [
    buildSeoImage(
      siteSeo.ogImagePath,
      siteSeo.ogImageAlt,
    ),
  ],
  publishedTime: options.publishedTime,
  modifiedTime: options.modifiedTime,
  authors: options.authors,
});

export const buildTwitterCard = (options: {
  title?: string;
  description?: string;
  images?: string[];
}) => ({
  card: "summary_large_image" as const,
  title: options.title || siteSeo.defaultTitle,
  description: options.description || siteSeo.defaultDescription,
  creator: siteSeo.creatorHandle,
  images: options.images || [buildAssetUrl(siteSeo.ogImagePath)],
});

export const buildPageMetadata = (pageKey: PageSeoKey): Metadata => {
  const page: PageSeoConfig = pageSeo[pageKey];
  const canonicalUrl = buildCanonicalUrl(page.canonicalPath || page.path);

  return {
    title: page.title,
    description: page.description,
    ...(page.robots ? { robots: page.robots } : {}),
    openGraph: buildOpenGraph({
      title: page.title,
      description: page.description,
      type: page.ogType,
      url: canonicalUrl,
    }),
    twitter: buildTwitterCard({
      title: page.title,
      description: page.description,
    }),
    alternates: {
      canonical: canonicalUrl,
    },
  };
};

const founderProfileLinks = [
  siteConfig.socialLinks.linkedin,
  siteConfig.socialLinks.github,
];

const businessProfileLinks = [
  siteConfig.socialLinks.instagram,
  siteConfig.socialLinks.x,
  siteConfig.socialLinks.telegram,
];

export const schemaIds = {
  organization: `${siteConfig.siteUrl}/#organization`,
  website: `${siteConfig.siteUrl}/#website`,
  offerCatalog: `${siteConfig.siteUrl}/#offer-catalog`,
} as const;

export const engagementOffers = [
  {
    name: "Proof Sprint",
    description:
      "A bounded engagement that establishes the baseline, addresses one important digital growth problem, and records the evidence needed for the next decision.",
  },
  {
    name: "Stack Build",
    description:
      "A connected implementation combining only the web, search, paid acquisition, creative, tracking, or automation capabilities required by the agreed problem.",
  },
  {
    name: "Operate and Improve",
    description:
      "Ongoing testing, measurement, and improvement for a working digital growth system with priorities and reporting agreed in advance.",
  },
] as const;

const serviceOfferCatalog = {
  "@type": "OfferCatalog",
  "@id": schemaIds.offerCatalog,
  name: "ReddyStack engagement models",
  url: buildCanonicalUrl("/pricing"),
  itemListElement: engagementOffers.map((offer) => ({
    "@type": "Offer",
    name: offer.name,
    url: buildCanonicalUrl("/pricing"),
    description: "Custom quote based on agreed scope and deliverables.",
    itemOffered: {
      "@type": "Service",
      name: offer.name,
      serviceType: offer.name,
      description: offer.description,
    },
  })),
} as const;

export const serviceOfferCatalogSchema = {
  "@context": "https://schema.org",
  ...serviceOfferCatalog,
} as const;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": schemaIds.organization,
  name: siteSeo.siteName,
  slogan: "One problem. One connected stack. Proof before scale.",
  url: siteConfig.siteUrl,
  logo: {
    "@type": "ImageObject",
    url: buildAssetUrl(siteSeo.logoPath),
  },
  description: siteSeo.defaultDescription,
  founder: {
    "@type": "Person",
    name: siteConfig.ownerName,
    url: buildCanonicalUrl("/about/rahul-reddy-adelli"),
    sameAs: founderProfileLinks,
  },
  email: siteConfig.email,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.phoneHref,
    email: siteConfig.email,
    contactType: "sales",
    areaServed: "Worldwide",
    availableLanguage: ["English", "Hindi", "Telugu"],
  },
  areaServed: "Worldwide",
  knowsAbout: [
    ...siteConfig.serviceTypes,
    "Proof-first digital growth",
    "Digital growth diagnostics",
    "AI-assisted delivery",
    "AI chatbot development",
    "Conversion optimization",
    "MVP development",
    "App development",
  ],
  hasOfferCatalog: serviceOfferCatalog,
  sameAs: businessProfileLinks,
} as const;

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": schemaIds.website,
  name: siteSeo.siteName,
  alternateName: [...siteSeo.siteNameAlternates],
  url: siteConfig.siteUrl,
  description: siteSeo.defaultDescription,
  publisher: {
    "@id": schemaIds.organization,
  },
} as const;

export const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${buildCanonicalUrl("/")}#webpage`,
  name: pageSeo.home.title,
  url: buildCanonicalUrl("/"),
  description: pageSeo.home.description,
  isPartOf: {
    "@id": schemaIds.website,
  },
  about: {
    "@id": schemaIds.organization,
  },
  primaryImageOfPage: `${siteConfig.siteUrl}${siteSeo.ogImagePath}`,
} as const;

export const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${buildCanonicalUrl("/about")}#webpage`,
  name: pageSeo.about.title,
  url: buildCanonicalUrl("/about"),
  description: pageSeo.about.description,
  isPartOf: {
    "@id": schemaIds.website,
  },
  about: {
    "@id": schemaIds.organization,
  },
  mainEntity: {
    "@type": "Person",
    name: siteConfig.ownerName,
    jobTitle: "Founder",
    worksFor: {
      "@id": schemaIds.organization,
    },
    url: buildCanonicalUrl("/about/rahul-reddy-adelli"),
    sameAs: founderProfileLinks,
  },
} as const;

export const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${buildCanonicalUrl("/contact")}#webpage`,
  name: pageSeo.contact.title,
  url: buildCanonicalUrl("/contact"),
  description: pageSeo.contact.description,
  isPartOf: {
    "@id": schemaIds.website,
  },
  about: {
    "@id": schemaIds.organization,
  },
  mainEntity: {
    "@type": "ContactPoint",
    telephone: siteConfig.phoneHref,
    email: siteConfig.email,
    contactType: "customer service",
    areaServed: [...siteConfig.serviceAreas],
    availableLanguage: ["English", "Hindi", "Telugu"],
  },
} as const;

export const buildBreadcrumbSchema = (
  items: Array<{ name: string; path: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${buildCanonicalUrl(items[items.length - 1]?.path || "/")}#breadcrumb`,
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: buildCanonicalUrl(item.path),
  })),
});

export const buildFAQPageSchema = (
  items: Array<{ question: string; answer: string }>,
  path: string = "/",
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${buildCanonicalUrl(path)}#faq`,
  url: buildCanonicalUrl(path),
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

export const buildBlogPostingSchema = (article: {
  title: string;
  metaDescription: string;
  path: string;
  publishedAt: string;
  updatedAt?: string;
  categoryLabel: string;
  tags: string[];
  heroImage: SeoImageInput;
  author: {
    name: string;
    role: string;
    bio: string;
  };
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": `${buildCanonicalUrl(article.path)}#blogposting`,
  headline: article.title,
  description: article.metaDescription,
  articleSection: article.categoryLabel,
  keywords: article.tags.join(", "),
  datePublished: article.publishedAt,
  dateModified: article.updatedAt || article.publishedAt,
  image: [buildAssetUrl(article.heroImage)],
  mainEntityOfPage: {
    "@id": `${buildCanonicalUrl(article.path)}#webpage`,
  },
  author: {
    "@type": "Person",
    name: article.author.name,
    description: article.author.bio,
    jobTitle: article.author.role,
    url: buildCanonicalUrl("/about/rahul-reddy-adelli"),
  },
  publisher: {
    "@id": schemaIds.organization,
  },
});

export const buildServiceSchema = (service: {
  title: string;
  subtitle: string;
  metaDescription: string;
  path: string;
  categories: string[];
  heroImage: SeoImageInput;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${buildCanonicalUrl(service.path)}#service`,
  name: service.title,
  serviceType: service.title,
  category: service.categories.join(", "),
  description: service.metaDescription,
  url: buildCanonicalUrl(service.path),
  image: buildAssetUrl(service.heroImage),
  areaServed: [...siteConfig.serviceAreas],
  provider: {
    "@id": schemaIds.organization,
  },
  brand: {
    "@type": "Brand",
    name: siteSeo.siteName,
  },
  slogan: service.subtitle,
});

export const buildCreativeWorkSchema = (project: {
  title: string;
  category: string;
  summary: string;
  metaDescription: string;
  path: string;
  year: number;
  services: string[];
  listingImage: SeoImageInput;
}) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "@id": `${buildCanonicalUrl(project.path)}#creative-work`,
  name: project.title,
  description: project.metaDescription || project.summary,
  genre: project.category,
  keywords: project.services.join(", "),
  image: buildAssetUrl(project.listingImage),
  url: buildCanonicalUrl(project.path),
  creator: {
    "@id": schemaIds.organization,
  },
  dateCreated: String(project.year),
});
