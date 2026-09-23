"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { markets } from "@/data/MarketConfig";
import { saveMarketChoice } from "@/utils/marketPreference";

type CountryChoiceLinksProps = {
  heading?: string;
  className?: string;
  collapsible?: boolean;
};

export default function CountryChoiceLinks({
  heading = "Choose a country or region",
  className = "",
  collapsible = false,
}: CountryChoiceLinksProps) {
  const pathname = usePathname();
  const links = (
    <ul className="list-unstyled d-flex flex-wrap gap-3 mb-0">
      <li>
        <Link href="/" aria-current={pathname === "/" ? "page" : undefined} onClick={() => saveMarketChoice("global")}>
          Global (English)
        </Link>
      </li>
      {markets.map((market) => (
        <li key={market.code}>
          <Link
            href={market.href}
            aria-current={pathname === market.href ? "page" : undefined}
            onClick={() => saveMarketChoice(market.code)}
          >
            {market.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <nav className={`tp-country-links ${className}`.trim()} aria-label={heading}>
      {collapsible ? (
        <details>
          <summary>{heading}</summary>
          {links}
        </details>
      ) : (
        <>
          <p>{heading}</p>
          {links}
        </>
      )}
    </nav>
  );
}
