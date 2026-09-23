import { marketForIpCountry } from "@/data/MarketConfig";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  // Trust Vercel's country header only on Vercel; never trust a browser-supplied header elsewhere.
  const countryHeader = process.env.VERCEL === "1"
    ? request.headers.get("x-vercel-ip-country")
    : null;
  const market = marketForIpCountry(countryHeader);

  return Response.json(
    { country: market?.ipCountry ?? null },
    { headers: { "Cache-Control": "private, no-store, max-age=0" } },
  );
}
