
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { LottieRefCurrentProps } from 'lottie-react';
import useMedia from 'react-use/lib/useMedia';
import award_img from "@/assets/img/about/award-icon.svg";
import { useInView } from 'react-intersection-observer';
import Count from '@/components/common/Count';


type DataType = {
  subtitle: string;
  award_title: string;
  award_des: string;
  about_des: React.JSX.Element;
  counter_data: {
    id: number;
    count: number;
    text: string;
  }[];
}


const about_content: DataType = {
  subtitle: "About ReddyStack",
  award_title: "Built and led by Rahul Reddy",
  award_des: "Independent proof-first studio · Hyderabad · Worldwide",
  about_des: <>I&apos;m Rahul Reddy Adelli, an independent growth partner in Hyderabad. I work directly with you, focus on the main business problem, and explain what changed. <span>AI supports delivery; I remain accountable for the work.</span></>,
  counter_data: [
    { id: 1, count: 4, text: "Method Stages" },
    { id: 2, count: 1, text: "Connected Stack" },
    { id: 3, count: 1, text: "Accountable Lead" }
  ],
}

const { subtitle, award_title, award_des, about_des, counter_data } = about_content

const AboutAreaHomeOne = () => {
  const { ref, inView } = useInView({ rootMargin: '200px' });
  const [artwork, setArtwork] = useState<{ Player: typeof import('lottie-react').default; data: object } | null>(null);
  const animation = useRef<LottieRefCurrentProps>(null);
  const reducedMotion = useMedia('(prefers-reduced-motion: reduce)', true);
  useEffect(() => {
    if (!inView || artwork) return;
    const controller = new AbortController();
    Promise.all([
      import('lottie-react'),
      fetch('/assets/lottie/AboutReddystack.json', { signal: controller.signal }).then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      }),
    ]).then(([{ default: Player }, data]) => {
      if (!controller.signal.aborted) setArtwork({ Player, data });
    }).catch(error => {
      if (!controller.signal.aborted) console.error('Could not load the About illustration', error);
    });
    return () => controller.abort();
  }, [inView, artwork]);
  useEffect(() => {
    if (reducedMotion || !inView) animation.current?.pause(); else animation.current?.play();
  }, [reducedMotion, artwork, inView]);
  return (
    <>
      <section ref={ref} className="tp-about-area fix">
        <div className="container container-large">
          <div className="tp-about-inner pt-145 pb-80" style={{ paddingTop: "145px", paddingBottom: "80px" }}>
            <span className="tp-about-inner-border transition-3"></span>
            <div className="row">
              <div className="col-xl-5 col-lg-5">
                <div className="tp-about-wrapper">
                  <div className="tp-section-title-wrapper p-relative mb-45">
                    <span className="tp-section-subtitle-bg">{subtitle}</span>
                    <span className="tp-section-subtitle tp-section-subtitle-1 tp-about-subtitle">{subtitle}</span>
                  </div>
                  <div className="tp-about-thumb-wrapper p-relative z-index-1">
                    <div className="tp-about-thumb p-relative z-index-1">
                      <div className="tp-about-thumb-bg-shape include-bg"
                        style={{ backgroundImage: 'url(/assets/img/about/shape/about-shape-1.png)' }}></div>
                      <div className="tp-about-lottie-frame">
                        {artwork && <artwork.Player
                          lottieRef={animation}
                          autoplay={!reducedMotion && inView}
                          onDOMLoaded={() => animation.current?.setSubframe(false)}
                          aria-hidden="true"
                          animationData={artwork.data}
                          loop={true}
                          className="tp-about-lottie-player"
                          rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
                          style={{ width: '100%', height: '100%' }}
                        />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-7 col-lg-7">
                <div className="tp-about-desc">
                  <div className="tp-about-award d-inline-block">
                    <div className="tp-about-award-icon d-inline-block" style={{ marginRight: "15px" }}>
                      <span>
                        <Image src={award_img} alt="" />
                      </span>
                    </div>
                    <div className="tp-about-award-content d-inline-block">
                      <h3 className="tp-about-award-title">{award_title}</h3>
                      <p>{award_des}</p>
                    </div>
                  </div>
                  <div className="tp-about-desc-content mb-40">
                    <p>{about_des}</p>
                  </div>
                  <div className="tp-about-fact">
                    <div className="row">
                      {counter_data.map((item, index) => (
                        <div key={index} className="col-md-4 col-sm-6 mb-30">
                          <div className="tp-about-fact-item">
                            <h4 className="d-flex">
                              <span className="purecounter">
                                <Count number={item.count} />
                              </span>
                            </h4>
                            <p>{item.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutAreaHomeOne;
