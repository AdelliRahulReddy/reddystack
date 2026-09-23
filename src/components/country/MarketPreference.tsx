"use client";

import { useEffect } from "react";
import type { MarketCode } from "@/data/MarketConfig";
import { saveMarketChoice } from "@/utils/marketPreference";

export default function MarketPreference({ code }: { code: MarketCode }) {
  useEffect(() => {
    saveMarketChoice(code);
  }, [code]);

  return null;
}
