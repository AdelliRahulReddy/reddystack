export const markets = [
  { code: "us", name: "United States", href: "/us", hreflang: "en-US", openGraphLocale: "en_US", ipCountry: "US" },
  { code: "au", name: "Australia", href: "/au", hreflang: "en-AU", openGraphLocale: "en_AU", ipCountry: "AU" },
  { code: "ca", name: "Canada", href: "/ca", hreflang: "en-CA", openGraphLocale: "en_CA", ipCountry: "CA" },
  { code: "uk", name: "United Kingdom", href: "/uk", hreflang: "en-GB", openGraphLocale: "en_GB", ipCountry: "GB" },
  { code: "ae", name: "United Arab Emirates", href: "/ae", hreflang: "en-AE", openGraphLocale: "en_AE", ipCountry: "AE" },
  { code: "sg", name: "Singapore", href: "/sg", hreflang: "en-SG", openGraphLocale: "en_SG", ipCountry: "SG" },
  { code: "in", name: "India", href: "/in", hreflang: "en-IN", openGraphLocale: "en_IN", ipCountry: "IN" },
] as const;

export type MarketCode = (typeof markets)[number]["code"];
export type Market = (typeof markets)[number];

export const marketByCode = Object.fromEntries(
  markets.map((market) => [market.code, market]),
) as Record<MarketCode, Market>;

export function getMarketByCode(code: string | undefined): Market | undefined {
  return markets.find((market) => market.code === code);
}

export function marketForIpCountry(countryCode: string | null | undefined): Market | undefined {
  const normalized = countryCode?.trim().toUpperCase();
  return markets.find((market) => market.ipCountry === normalized);
}
