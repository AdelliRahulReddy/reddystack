'use client';
import Link from 'next/link'; 
import Image from 'next/image';
import React, { type JSX } from 'react';
import brandLogo from "@/assets/img/logo/reddystack-symbol.svg";
import service_shape_1 from "@/assets/img/portfolio/shape-1.png";
import service_shape_2 from "@/assets/img/portfolio/shape-2.png";
import service_star_icon from "@/assets/img/portfolio/star.png";
import StrategyIcno from '@/svg/home-3/StrategyIcno';
import LeadershipIcon from '@/svg/home-3/LeadershipIcon';
import DevelopmentIcon from '@/svg/home-3/DevelopmentIcon';

interface DataType {
  subtitle: string;
  title: React.JSX.Element;
  sm_info: React.JSX.Element;
  btn_text: React.JSX.Element;
  service_data: {
    id: number;
    icon: JSX.Element;
    title: React.JSX.Element;
    sm_des: React.JSX.Element;
    tag_1: string;
    tag_2: string;
  }[];
}


const service_content: DataType = {
  subtitle: "HOW WE WORK",
  title: <>From Your Goal <br /> to Delivery</>,
  sm_info: <>Clear scope, direct communication, <br /> and work built around your business.</>,
  btn_text: <>Ready to start your project? <span>Let&apos;s Talk</span></>,
  service_data: [
    {
      id: 1,
      icon: <StrategyIcno />,
      title: <>Discovery <br /> & Strategy</>,
      sm_des: <>We review your goals, audience, offer, <br /> and budget before agreeing the scope.</>,
      tag_1: "Research",
      tag_2: "Planning",
    },
    {
      id: 2,
      icon: <LeadershipIcon />,
      title: <>Create <br /> & Launch</>,
      sm_des: <>We prepare campaigns, creative, or website work <br /> for your review before launch.</>,
      tag_1: "Your Feedback",
      tag_2: "Clear Deliverables",
    },
    {
      id: 3,
      icon: <DevelopmentIcon />,
      title: <>Launch <br /> & Optimize</>,
      sm_des: <>We check the agreed work, review results, <br /> and plan improvements where needed.</>,
      tag_1: "Reporting",
      tag_2: "Performance",
    },
  ]
}

const { subtitle, title, sm_info, btn_text, service_data } = service_content

type ServiceAreaHomeThreeProps = {
  style?: boolean;
};

const ServiceAreaHomeThree = ({ style }: ServiceAreaHomeThreeProps) => {
  return (
    <>
      <div id="service" className={`tp-service-3__area services-panel-area tp-service-3__overlay-bg ${style ? 'sv-iiner__customize' : ''} black-bg-2 pt-150 pb-125 z-index-1`}>

        <div className="tp-service-3__circle-img">
          <span className="text-img">
            <Image src={brandLogo} width={120} height={120} alt="ReddyStack logo" />
          </span>
          <div className="shape d-none d-lg-block">
            <svg width="260" height="70" viewBox="0 0 260 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M68.7285 34.1352C48.3941 10.6976 13.8796 0.514191 0 0.514191C93.4783 0.514191 276.081 -0.642708 258.863 0.514191C236.79 1.99739 217.224 6.94161 191.137 34.1352C140.468 93.9609 98.3272 68.2507 68.7285 34.1352Z" fill="currentcolor" />
            </svg>
          </div>
        </div>

        <div className="tp-service-3__shape-1">
          <Image src={service_shape_1} alt="" />
        </div>
        <div className="tp-service-3__shape-2 d-none d-lg-block">
          <Image src={service_shape_2} alt="" />
        </div>
        <div className="tp-service-3__shape-3">
          <Image data-speed="1.2" src={service_star_icon} alt="" />
        </div>
        
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-5">
              <div className="tp-service-3__title-box services-panel-pin">
                <span className="tp-section-subtitle-3 tp_title_anim">{subtitle}</span>
                <h3 className="tp-section-title-3 tp_title_anim">{title}</h3>
                <p className="tp_title_anim">{sm_info}</p>
              </div>
            </div>
            <div className="col-xl-7 col-lg-7">
              <div className="tp-service-3__right-wrap">

                {service_data.map((item, i) => (
                  <div key={i} className="tp-service-3__item d-flex align-items-start mb-25 services-panel">
                    <div className="tp-service-3__icon">
                      <span>
                        {item.icon}
                      </span>
                    </div>
                    <div className="tp-service-3__content">
                      <h3 className="tp-service-3__content-title">
                        <Link href="/service">{item.title}</Link>
                      </h3>
                      <p>{item.sm_des}</p>
                      <div className="tp-service-3__content-tag">
                        <span className="mr-5">{item.tag_1}</span>
                        <span>{item.tag_2}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="tp-service-3__btn-box">
                  <Link href="/contact">{btn_text}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default ServiceAreaHomeThree;
