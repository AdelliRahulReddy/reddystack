'use client'
import Link from 'next/link';
import { type JSX, useEffect, useRef, useState } from 'react';
import HeroArrowIcon from '@/svg/home/HeroIcons/HeroArrowIcon';
import { HeroSocialLinks } from '@/components/common/SocialLinks';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import heroAnimation from '@/assets/lottie/hero-animation.json';
interface DataType {
  slide_text: string[];
  sub_title: string;
  title_1: string;
  sm_info: JSX.Element;
  btn_text: JSX.Element;
}

const hero_content: DataType = {
  slide_text: [
    "Meta Ads",
    "Google Ads",
    "Ad Creatives",
    "AI UGC-Style Videos",
    "Website Development",
    "SEO & Local SEO",
  ],
  sub_title: "DIGITAL MARKETING & WEBSITES",
  title_1: "Ads, Creative & Websites That Grow Your Business.",
  sm_info: <>
    Reach more customers with Meta & Google Ads, ad creatives, AI UGC-style videos, websites, and SEO.
  </>,
  btn_text: <>Let’s <br /> Talk</>,
}
const {
  slide_text,
  sub_title,
  title_1,
  sm_info,
  btn_text
} = hero_content;

const HeroAreaHome = () => {
  const animation = useRef<LottieRefCurrentProps>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => { animation.current?.pause(); setPaused(true); };
    if (motion.matches) syncMotion();
    motion.addEventListener('change', syncMotion);
    return () => motion.removeEventListener('change', syncMotion);
  }, []);
  return (
    <>

      <section className="tp-hero-area p-relative tp-btn-trigger z-index-1 fix theme-bg-2">
        <div className="tp-hero-social-wrapper">
          <span className="tp-hero-social-bar"></span>
          <div className="tp-hero-social">
            <HeroSocialLinks />
          </div>
        </div>
        <div className="tp-hero-shape">
          <div className="tp-hero-shape-1 background-white-mode" style={{ backgroundImage: 'url(/assets/img/hero/hero-overlay.png)' }}></div>
          <div className="tp-hero-shape-1 background-dark-mode" style={{ backgroundImage: 'url(/assets/img/hero/hero-overlay-2.png)' }}></div>
          <span className="tp-hero-shape-2"></span>
        </div>
        <div className="tp-hero-bottom-text-wrapper" aria-hidden="true">
          <div className="tp-hero-bottom-text">
            {slide_text.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
          <div className="tp-hero-bottom-text">
            {slide_text.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
        <div className="container">
          <div className="row tp-hero-row">
            <div className="col-xl-7 col-lg-7 col-md-12">
              <div className="tp-hero-left-wrapper">
                <div className="tp-hero-content p-relative z-index-1">
                  <span className="singleLine">{sub_title}</span>
                  <h1 className="tp-hero-title tp_title_anim">
                    <strong className="tp-hero-title-static">{title_1}</strong>
                  </h1>
                  <p>{sm_info}</p>
                  <div className="tp-hero-btn d-flex align-items-center flex-wrap gap-3">
                    <div className="tp-hover-btn-wrapper tp-btn-bounce">
                      <Link href="/contact" className="tp-hover-btn tp-hover-btn-item tp-btn-circle square">
                        <span className="tp-btn-circle-text" >
                          {btn_text}
                        </span>
                        <span className="tp-btn-circle-arrow">
                          <HeroArrowIcon />
                        </span>
                        <i className="tp-btn-circle-dot"></i>
                      </Link>
                    </div>
                    <Link href="/service" className="tp-btn-border-sm border-0 px-2 text-decoration-underline">
                      Explore Services
                    </Link>
                  </div>
                  <div className="tp-hero-scroll smooth">
                    <a className="pointer" href="#tp-sv" aria-label="Scroll to services">
                      <span className="tp-hero-scroll-bar"></span>
                      <span className="tp-hero-scroll-mouse"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-12">
              <div className="tp-hero-thumb-wrapper text-center text-lg-end p-relative z-index-1">
                <div className="tp-hero-thumb-shape">
                  <span className="tp-hero-thumb-shape-3"></span>
                </div>
                <button type="button" className="tp-hero-thumb p-0 border-0 bg-transparent"
                  aria-label={paused ? 'Play illustration' : 'Pause illustration'}
                  title={paused ? 'Play illustration' : 'Pause illustration'}
                  onClick={() => { if (paused) animation.current?.play(); else animation.current?.pause(); setPaused(!paused); }}>
                  <Lottie
                    lottieRef={animation}
                    aria-hidden="true"
                    animationData={heroAnimation}
                    loop={true}
                    className="tp-hero-lottie"
                    // Trim unused canvas below the base, then align the artwork to the bottom.
                    rendererSettings={{ viewBoxSize: '0 0 1600 1164', preserveAspectRatio: 'xMidYMax meet' }}
                    style={{ width: '100%', height: '100%' }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroAreaHome;
