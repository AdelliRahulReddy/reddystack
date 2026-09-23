import type { MarketCode } from "@/data/MarketConfig";

const marketChoiceKey = "reddystack.market-choice.v1";
const dismissedSuggestionKey = "reddystack.country-suggestion-dismissed.v1";

export type MarketChoice = MarketCode | "global";

export function readMarketChoice(): MarketChoice | null {
  try {
    const value = window.localStorage.getItem(marketChoiceKey);
    return value === "global" || (value && Object.prototype.hasOwnProperty.call(marketCodeSet, value))
      ? value as MarketChoice
      : null;
  } catch {
    return null;
  }
}

export function saveMarketChoice(choice: MarketChoice) {
  try {
    window.localStorage.setItem(marketChoiceKey, choice);
  } catch {
    // Country links still work when browser storage is unavailable.
  }
}

export function wasSuggestionDismissed(code: MarketCode): boolean {
  try {
    return window.localStorage.getItem(dismissedSuggestionKey) === code;
  } catch {
    return false;
  }
}

export function dismissCountrySuggestion(code: MarketCode) {
  try {
    window.localStorage.setItem(dismissedSuggestionKey, code);
  } catch {
    // Dismissal remains effective for the current render if storage is unavailable.
  }
}

const marketCodeSet: Record<string, true> = {
  us: true,
  au: true,
  ca: true,
  uk: true,
  ae: true,
  sg: true,
  in: true,
};
