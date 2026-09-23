'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';

import shape_1 from "@/assets/img/services/shape/services-shape-1.png";
import shape_2 from "@/assets/img/services/shape/services-shape-2.png";


interface DataType {
  subtitle: string;
  title: React.JSX.Element;
  sm_des: React.JSX.Element;
  accordion_data: {
    id: number;
    tab_id: string;
    path: string;
    question: string;
    answer: string;
    some_features: string[];
    linkLabel: string;
  }[];
}

const service_content: DataType = {
  subtitle: "The Connected Stack",
  title: <>Build What the <br /> Problem Needs</>,
  sm_des: <>We choose the right mix of website, search, ads, and creative work for one clear growth goal.</>,
  accordion_data: [
    {
      id: 1, tab_id: "One", path: "/service/seo-websites", question: "Foundation",
      answer: "Create clear pages, enquiry paths, and tracking before growing traffic.",
      some_features: ["Website & landing pages", "Enquiry paths", "Tracking"],
      linkLabel: "Explore Website Development"
    },
    {
      id: 2, tab_id: "Two", path: "/service/seo-local-seo", question: "Discovery",
      answer: "Help the right customers find you through search and local SEO.",
      some_features: ["Technical SEO", "Search content", "Local SEO"],
      linkLabel: "Explore SEO"
    },
    {
      id: 3, tab_id: "Three", path: "/service/meta-ads", question: "Acquisition",
      answer: "Test Meta or Google Ads with a clear offer and conversion tracking.",
      some_features: ["Meta Ads", "Google Ads", "Ad creative"],
      linkLabel: "Explore Paid Ads"
    },
    {
      id: 4, tab_id: "Four", path: "/service/ai-automations", question: "Systems",
      answer: "Automate repeat work or build tools when a real business need calls for it.",
      some_features: ["Workflows", "AI-assisted tools", "Apps & MVPs"],
      linkLabel: "Explore Automation"
    }
  ]
}
const { subtitle, title, sm_des, accordion_data } = service_content;


const ServiceAreaHomeOne = () => {
  const [active, setActive] = useState(0);

  const handleItemClick = (index: number) => {
    setActive(index);
  }

  return (
    <>
      <section className="tp-services-area tp-sv tp-services-bg-text-animation fix" id="tp-sv">
        <div className="container container-large">
          <div className="tp-services-inner pb-100 p-relative z-index-1">

            <span className="tp-services-inner-border tp-vertical-line transition-3"></span>
            <span className="tp-services-inner-border right tp-vertical-line transition-3"></span>

            <div className="tp-services-bottom-text tp-services-bg-text">
              <p>Capabilities</p>
            </div>
            <div className="row gx-0">

              <div className="col-xl-6 col-lg-7">
                <div className="tp-services-wrapper tp-services-capsule-wrapper p-relative pt-100 pr-30">
                  <div className="tp-section-title-wrapper tp_text_anim mb-30">
                    <div className="tp-section-title-inner p-relative">
                      <span className="tp-section-subtitle">{subtitle}</span>
                      <h2 className="tp-section-title tp_title_anim">{title}</h2>
                    </div>
                    <p>{sm_des}</p>
                  </div>

                  <div className="tp-services-capsule-field">
                    <div className="tp-services-capsule-item-wrapper" data-tp-throwable-scene="true">
                      <p data-tp-throwable-el="">
                        <span className="tp-services-capsule-item" style={{ backgroundColor: "var(--tp-green-2)", color: "var(--tp-common-black)" }}>Website Development</span>
                      </p>
                      <p data-tp-throwable-el="">
                        <span className="tp-services-capsule-item" style={{ backgroundColor: "var(--tp-pink-2)", color: "var(--tp-common-black)" }}>SEO & Local SEO</span>
                      </p>
                      <p data-tp-throwable-el="">
                        <span className="tp-services-capsule-item" style={{ backgroundColor: "var(--tp-green-2)", color: "var(--tp-common-black)" }}>Meta Ads</span>
                      </p>
                      <p data-tp-throwable-el="">
                        <span className="tp-services-capsule-item" style={{ backgroundColor: "var(--tp-blue-2)", color: "var(--tp-common-white)" }}>Google Ads</span>
                      </p>
                      <p data-tp-throwable-el="">
                        <span className="tp-services-capsule-item" style={{ backgroundColor: "var(--tp-pink-2)", color: "var(--tp-common-black)" }}>Ad Creatives</span>
                      </p>
                      <p data-tp-throwable-el="">
                        <span className="tp-services-capsule-item" style={{ backgroundColor: "var(--tp-green-2)", color: "var(--tp-common-black)" }}>AI Video Ads</span>
                      </p>
                      {/* Keep the image shapes at the bottom */}
                      <p className="tp-services-capsule-shape" data-tp-throwable-el="">
                        <span className="">
                          <Image src={shape_1} alt="" />
                        </span>
                      </p>
                      <p className="tp-services-capsule-shape" data-tp-throwable-el="">
                        <span className="">
                          <Image src={shape_2} alt="" />
                        </span>
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              <div className="col-xl-6 col-lg-5">
                <div className="tp-services-accordion tp-accordion tp-accordion-2 pl-70 p-relative" style={{ marginTop: "90px" }}>
                  <span className="tp-services-accordion-border"></span>
                  <div className="accordion" id="accordionExample">

                    {accordion_data.map((item, i) => (
                      <div key={i} onClick={() => handleItemClick(i)} className={`accordion-item tp-services-accordion-item ${active === i ? 'active' : ''}`}>
                        <h2 className="accordion-header" id={`heading${item.tab_id}`}>
                          <button
                            className={`accordion-button ${i === 0 ? '' : 'collapsed'}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${item.tab_id}`}
                            aria-expanded={i === 0}
                            aria-controls={`collapse${item.tab_id}`}
                            tabIndex={0}
                          >
                            <span>0{item.id}</span>
                            {item.question}
                          </button>
                        </h2>
                        <div
                          id={`collapse${item.tab_id}`}
                          className={`accordion-collapse collapse ${i === 0 ? 'show' : ''}`}
                          aria-labelledby={`heading${item.tab_id}`}
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <p>{item.answer}</p>
                            <ul>
                              {item.some_features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                              ))}
                            </ul>
                            <div className="pt-20">
                              <Link href={item.path} className="tp-btn-border-sm">
                                {item.linkLabel}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <span className="accordion-item-border"></span>
                      </div>
                    ))}

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

export default ServiceAreaHomeOne;
