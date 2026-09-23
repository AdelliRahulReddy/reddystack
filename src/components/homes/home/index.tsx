"use client";
import React from "react";
import HeaderOne from "@/layouts/headers/HeaderOne";
import HeroAreaHome from "./HeroAreaHome";
import BrandAreaHomeOne from "./BrandAreaHomeOne";
import ServiceAreaHomeOne from "./ServiceAreaHomeOne";
import MarqueeAreaHomeOne from "./MarqueeAreaHomeOne";
import AboutAreaHomeOne from "./AboutAreaHomeOne";
import TestimonialAreaHomeTwo from "../home-2/TestimonialAreaHomeTwo";
import TestimonialAreaHomeOne from "./TestimonialAreaHomeOne";
import PriceAreaHomeOne from "./PriceAreaHomeOne";
import FaqAreaHomeOne from "./FaqAreaHomeOne";
import FooterOne from "@/layouts/footers/FooterOne";
import type { Market } from "@/data/MarketConfig";
import { marketPages } from "@/data/MarketPageData";
import MarketFocusArea from "@/components/country/MarketFocusArea";


const HomeOne = ({ market }: { market?: Market }) => {
  const marketPage = market ? marketPages[market.code] : undefined;

  return (
    <>
      <HeaderOne />
      <div
        id="smooth-wrapper"
        className="tp-page-wrapper theme-bg"
        style={{ backgroundImage: `url(/assets/img/bg/distort-bg.png)` }}
      >
        <div id="smooth-content">
          <main id="main-content" tabIndex={-1}>
            <HeroAreaHome content={marketPage?.hero} />
            {!market && <BrandAreaHomeOne />}
            {marketPage && market && <MarketFocusArea marketName={market.name} focus={marketPage.focus} />}
            <ServiceAreaHomeOne />
            <MarqueeAreaHomeOne />
            <AboutAreaHomeOne />
            <TestimonialAreaHomeTwo />
            <TestimonialAreaHomeOne />
            <PriceAreaHomeOne style={Boolean(market)} />
            <FaqAreaHomeOne />
          </main>
          <FooterOne />
        </div>
      </div>
    </>
  );
};

export default HomeOne;
