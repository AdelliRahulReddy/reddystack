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
  subtitle: "Core Services",
  title: <>Services to Grow <br /> Your Business</>,
  sm_des: <>Reach customers, explain your offer, and turn interest into enquiries with our six core services.</>,
  accordion_data: [
    {
      id: 1, tab_id: "One", path: "/service/meta-ads", question: "Meta Ads",
      answer: "Reach potential customers on Facebook and Instagram with campaigns built around your offer.",
      some_features: ["Facebook & Instagram Campaigns", "Conversion Tracking", "Campaign Optimisation"],
      linkLabel: "Explore Meta Ads"
    },
    {
      id: 2, tab_id: "Two", path: "/service/google-ads", question: "Google Ads",
      answer: "Connect with people searching for your products or services on Google.",
      some_features: ["Campaign Setup", "Conversion Tracking", "Campaign Optimisation"],
      linkLabel: "Explore Google Ads"
    },
    {
      id: 3, tab_id: "Three", path: "/service/ad-creatives", question: "Ad Creatives",
      answer: "Make your offer stand out with visuals, video, and copy tailored to your campaign.",
      some_features: ["Ad Images & Promotional Designs", "Video Editing", "Ad Copy & Scripts"],
      linkLabel: "Explore Ad Creatives"
    },
    {
      id: 4, tab_id: "Four", path: "/service/ai-ugc-videos", question: "AI UGC-Style Videos",
      answer: "Explain your product or service with conversational AI-presenter videos for ads and social content.",
      some_features: ["AI-Presenter Videos", "Product Demos", "Service Explainers"],
      linkLabel: "Explore AI Videos"
    },
    {
      id: 5, tab_id: "Five", path: "/service/seo-websites", question: "Website Development",
      answer: "Give your business an online home that makes it easy for visitors to enquire or buy.",
      some_features: ["Business Websites", "Online Stores", "Landing Pages"],
      linkLabel: "Explore Website Development"
    },
    {
      id: 6, tab_id: "Six", path: "/service/seo-local-seo", question: "SEO & Local SEO",
      answer: "Help customers find your business in Google Search, Maps, and local results.",
      some_features: ["Website Optimisation", "Local SEO", "Google Business Profile Management"],
      linkLabel: "Explore SEO Services"
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
              <p>Services</p>
            </div>
            <div className="row gx-0">

              <div className="col-xl-6 col-lg-7">
                <div className="tp-services-wrapper tp-services-capsule-wrapper p-relative pt-100 pr-30" style={{ paddingTop: "100px", }}
                  data-tp-throwable-scene="true">
                  <div className="tp-section-title-wrapper tp_text_anim mb-170">
                    <div className="tp-section-title-inner p-relative">
                      <span className="tp-section-subtitle">{subtitle}</span>
                      <h2 className="tp-section-title tp_title_anim">{title}</h2>
                    </div>
                    <p>{sm_des}</p>
                  </div>

                  <div className="tp-services-capsule-item-wrapper">
                    <p data-tp-throwable-el="">
                      <span className="tp-services-capsule-item" style={{ backgroundColor: "var(--tp-green-2)", color: "var(--tp-common-black)" }}>Websites</span>
                    </p>
                    <p data-tp-throwable-el="">
                      <span className="tp-services-capsule-item" style={{ backgroundColor: "var(--tp-pink-2)", color: "var(--tp-common-black)" }}>Meta Ads</span>
                    </p>
                    <p data-tp-throwable-el="">
                      <span className="tp-services-capsule-item" style={{ backgroundColor: "var(--tp-green-2)", color: "var(--tp-common-black)" }}>Google Ads</span>
                    </p>
                    <p data-tp-throwable-el="">
                      <span className="tp-services-capsule-item" style={{ backgroundColor: "var(--tp-blue-2)", color: "var(--tp-common-white)" }}>Ad Creatives</span>
                    </p>
                    <p data-tp-throwable-el="">
                      <span className="tp-services-capsule-item" style={{ backgroundColor: "var(--tp-pink-2)", color: "var(--tp-common-black)" }}>Landing Pages</span>
                    </p>
                    <p data-tp-throwable-el="">
                      <span className="tp-services-capsule-item" style={{ backgroundColor: "var(--tp-green-2)", color: "var(--tp-common-black)" }}>Online Stores</span>
                    </p>
                    <p data-tp-throwable-el="">
                      <span className="tp-services-capsule-item" style={{ backgroundColor: "var(--tp-green-2)", color: "var(--tp-common-black)" }}>Ad Copy</span>
                    </p>
                    <p data-tp-throwable-el="">
                      <span className="tp-services-capsule-item" style={{ backgroundColor: "var(--tp-blue-2)", color: "var(--tp-common-white)" }}>SEO & Local SEO</span>
                    </p>
                    <p data-tp-throwable-el="">
                      <span className="tp-services-capsule-item" style={{ backgroundColor: "var(--tp-pink-2)", color: "var(--tp-common-black)" }}>AI UGC Videos</span>
                    </p>
                    <p data-tp-throwable-el="">
                      <span className="tp-services-capsule-item" style={{ backgroundColor: "var(--tp-green-2)", color: "var(--tp-common-black)" }}>Video Editing</span>
                    </p>
                    {/* Keep the image shapes at the bottom */}
                    <p data-tp-throwable-el="">
                      <span className="">
                        <Image src={shape_1} alt="" />
                      </span>
                    </p>
                    <p data-tp-throwable-el="">
                      <span className="">
                        <Image src={shape_2} alt="" />
                      </span>
                    </p>
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
