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
  subtitle: "THE REDDYSTACK METHOD",
  title: <>From Bottleneck <br /> to Evidence</>,
  sm_info: <>One accountable process across <br /> every capability and engagement.</>,
  btn_text: <>Bring one growth problem. <span>Start here</span></>,
  service_data: [
    {
      id: 1,
      icon: <StrategyIcno />,
      title: <>Diagnose <br /> the Bottleneck</>,
      sm_des: <>Clarify the commercial goal, inspect the current setup, <br /> and establish a useful baseline.</>,
      tag_1: "Problem",
      tag_2: "Baseline",
    },
    {
      id: 2,
      icon: <LeadershipIcon />,
      title: <>Build <br /> the Right Stack</>,
      sm_des: <>Select and connect only the pages, search, paid, creative, <br /> tracking, or automation work the problem needs.</>,
      tag_1: "Scope",
      tag_2: "Ownership",
    },
    {
      id: 3,
      icon: <DevelopmentIcon />,
      title: <>Prove <br /> What Changed</>,
      sm_des: <>Check the implementation, compare against the baseline, <br /> and document evidence and limitations.</>,
      tag_1: "Evidence",
      tag_2: "Learning",
    },
    {
      id: 4,
      icon: <DevelopmentIcon />,
      title: <>Scale <br /> the Evidence</>,
      sm_des: <>Continue, expand, revise, or stop based on what the work <br /> actually showed—not on activity alone.</>,
      tag_1: "Decision",
      tag_2: "Next Move",
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
