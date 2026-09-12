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


const HomeOne = () => {
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
            <HeroAreaHome />
            <BrandAreaHomeOne />
            <ServiceAreaHomeOne />
            <MarqueeAreaHomeOne />
            <AboutAreaHomeOne />
            <TestimonialAreaHomeTwo />
            <TestimonialAreaHomeOne />
            <PriceAreaHomeOne />
            <FaqAreaHomeOne />
          </main>
          <FooterOne />
        </div>
      </div>
    </>
  );
};

export default HomeOne;
