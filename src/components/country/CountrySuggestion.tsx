"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, domAnimation, LazyMotion } from "motion/react";
import * as m from "motion/react-m";
import { Button, ButtonArrow } from "@/components/ui/button";
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

  return (
    <LazyMotion features={domAnimation}>
    <AnimatePresence>
      {suggestedMarket && (
        <m.aside
          key={suggestedMarket.code}
          role="status"
          aria-live="polite"
          aria-label="Country suggestion"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 z-[80] max-w-[380px] rounded-[22px] border border-line-strong bg-graphite/92 p-5 text-ivory shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)] backdrop-blur-xl sm:bottom-6 sm:left-6 sm:right-auto"
        >
          <p className="flex items-start gap-3 text-[15px] leading-snug">
            <span aria-hidden="true" className="mt-1.5 size-2 flex-none animate-pulse-dot rounded-full bg-lime shadow-[0_0_0_4px_rgb(210_237_122/0.16)]" />
            <span>Visiting from {suggestedMarket.name}? View the ReddyStack page for your country.</span>
          </p>
          <div className="mt-4 flex flex-wrap gap-2 pl-5">
            <Button asChild size="sm">
              <Link href={suggestedMarket.href} onClick={() => saveMarketChoice(suggestedMarket.code)}>
                View {suggestedMarket.name} <ButtonArrow />
              </Link>
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                dismissCountrySuggestion(suggestedMarket.code);
                setSuggestion(null);
              }}
            >
              Dismiss
            </Button>
          </div>
        </m.aside>
      )}
    </AnimatePresence>
    </LazyMotion>
  );
}
