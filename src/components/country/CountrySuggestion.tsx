"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { marketForIpCountry, markets, type Market } from "@/data/MarketConfig";
import {
  dismissCountrySuggestion,
  readMarketChoice,
  saveMarketChoice,
  wasSuggestionDismissed,
} from "@/utils/marketPreference";

export default function CountrySuggestion() {
  const pathname = usePathname();
  // The suggestion is tied to the path it was fetched for, so a route change hides it without resetting state.
  const [suggestion, setSuggestion] = useState<{ market: Market; path: string | null } | null>(null);
  const suggestedMarket = suggestion?.path === pathname ? suggestion.market : null;

  useEffect(() => {
    if (markets.some((market) => pathname === market.href || pathname?.startsWith(`${market.href}/`))) {
      return;
    }
    if (readMarketChoice()) return;

    let cancelled = false;
    fetch("/api/visitor-country", { cache: "no-store", credentials: "same-origin" })
      .then((response) => response.ok ? response.json() as Promise<{ country: string | null }> : null)
      .then((result) => {
        if (cancelled || !result?.country) return;
        const market = marketForIpCountry(result.country);
        if (!market || wasSuggestionDismissed(market.code)) return;
        setSuggestion({ market, path: pathname });
      })
      .catch(() => {
        // Location suggestions are optional. The country selector remains available.
      });

    return () => { cancelled = true; };
  }, [pathname]);

  if (!suggestedMarket) return null;

  return (
    <aside className="tp-country-suggestion" role="status" aria-live="polite" aria-label="Country suggestion">
      <p className="tp-country-suggestion__copy">
        Visiting from {suggestedMarket.name}? View the ReddyStack page for your country.
      </p>
      <div className="tp-country-suggestion__actions">
        <Link
          className="tp-country-suggestion__accept"
          href={suggestedMarket.href}
          onClick={() => saveMarketChoice(suggestedMarket.code)}
        >
          View {suggestedMarket.name}
        </Link>
        <button
          className="tp-country-suggestion__dismiss"
          type="button"
          onClick={() => {
            dismissCountrySuggestion(suggestedMarket.code);
            setSuggestion(null);
          }}
        >
          Dismiss
        </button>
      </div>
    </aside>
  );
}
