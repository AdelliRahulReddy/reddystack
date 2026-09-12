'use client'
import React from 'react';
import useMedia from 'react-use/lib/useMedia';
import Slider from "react-slick";

const marquee_data = [
  "Meta Ads",
  "Google Ads",
  "Ad Creatives",
  "AI UGC-Style Videos",
  "Website Development",
  "SEO & Local SEO"
];

const setting = {
  speed: 7000,
  autoplay: true,
  autoplaySpeed: 0,
  centerMode: true,
  cssEase: 'linear',
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true,
  infinite: true,
  initialSlide: 1,
  arrows: false,
  buttons: false,
  focusOnSelect: true,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
      }
    },
    {
      breakpoint: 992,
      settings: {
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      }
    }
  ]
}

const MarqueeAreaHomeOne = () => {
  const reducedMotion = useMedia('(prefers-reduced-motion: reduce)', true);
  return (
    <>
      <div className="tp-marquee-area z-index-5">
        <div className="tp-marquee-wrapper">
          <div className="tp-marquee-slider fix">
            <Slider {...setting} autoplay={!reducedMotion} className="tp-marquee-slider-active d-flex align-items-center ">
              {marquee_data.map((item, index) => (
                <div key={index} className="tp-marquee-item">
                  <p>{item}</p>
                </div>
              ))}
            </Slider>

          </div>
        </div>
      </div>
    </>
  );
};

export default MarqueeAreaHomeOne;
