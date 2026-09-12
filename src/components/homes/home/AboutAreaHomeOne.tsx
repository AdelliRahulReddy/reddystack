
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import useMedia from 'react-use/lib/useMedia';
import award_img from "@/assets/img/about/award-icon.svg";
import aboutAnimation from "@/assets/lottie/AboutReddystack.json";
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
  subtitle: "About Reddystack",
  award_title: "Founder-led by Rahul Reddy",
  award_des: "Based in Hyderabad, serving India and global clients",
  about_des: <>Founder-led by Rahul Reddy Adelli, Reddystack helps small businesses and growing brands attract customers through <span>ads, creative content, websites, and SEO.</span> Based in Hyderabad and working remotely across India and worldwide, we bring <span>clear scope, direct communication, and practical delivery</span> to every project.</>,
  counter_data: [
    { id: 1, count: 15, text: "Projects In Development" },
    { id: 2, count: 6, text: "Years of Learning" },
    { id: 3, count: 50, text: "Solutions Shipped" }
  ],
}

const { subtitle, award_title, award_des, about_des, counter_data } = about_content

const AboutAreaHomeOne = () => {
  const animation = useRef<LottieRefCurrentProps>(null);
  const reducedMotion = useMedia('(prefers-reduced-motion: reduce)', true);
  useEffect(() => {
    if (reducedMotion) animation.current?.pause(); else animation.current?.play();
  }, [reducedMotion]);
  return (
    <>
      <section className="tp-about-area fix">
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
                        <Lottie
                          lottieRef={animation}
                          autoplay={!reducedMotion}
                          aria-hidden="true"
                          animationData={aboutAnimation}
                          loop={true}
                          className="tp-about-lottie-player"
                          rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
                          style={{ width: '100%', height: '100%' }}
                        />
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
                      <h4 className="tp-about-award-title">{award_title}</h4>
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
                              </span>+
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
