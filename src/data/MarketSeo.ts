import type { Metadata } from "next";
import { buildCanonicalUrl, buildOpenGraph, buildTwitterCard, siteConfig } from "@/data/siteConfig";
import { markets, type Market } from "@/data/MarketConfig";
import { marketPages } from "@/data/MarketPageData";

export const marketLanguageAlternates = {
  ...Object.fromEntries(markets.map((market) => [market.hreflang, buildCanonicalUrl(market.href)])),
  "x-default": buildCanonicalUrl("/"),
};

export function marketMetadata(market: Market): Metadata {
  const page = marketPages[market.code];
  const title = `${page.title} | ReddyStack`;
  const url = buildCanonicalUrl(market.href);

  return {
    title,
    description: page.description,
    alternates: {
      canonical: url,
      languages: marketLanguageAlternates,
    },
    openGraph: {
      ...buildOpenGraph({ title, description: page.description, url }),
      locale: market.openGraphLocale,
    },
    twitter: buildTwitterCard({ title, description: page.description }),
  };
}

export const marketRootLanguageAlternates = marketLanguageAlternates;

export function marketPageSchema(market: Market) {
  const page = marketPages[market.code];
  const url = buildCanonicalUrl(market.href);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    isPartOf: { "@id": `${siteConfig.siteUrl}/#website` },
    about: { "@id": `${siteConfig.siteUrl}/#organization` },
    inLanguage: market.hreflang,
  };
}
