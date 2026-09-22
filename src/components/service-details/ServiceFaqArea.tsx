'use client';
import React, { useState } from 'react';
import Image from 'next/image';

import shape_1 from "@/assets/img/services/shape/services-shape-1.png";
import shape_2 from "@/assets/img/services/shape/services-shape-2.png";
import type { ServiceDetail } from '@/data/ServiceDetailData';

type ServiceFaqAreaProps = {
  service: ServiceDetail;
};

const capsuleColors = [
  { backgroundColor: "var(--tp-green-2)", color: "var(--tp-common-black)" },
  { backgroundColor: "var(--tp-pink-2)", color: "var(--tp-common-black)" },
  { backgroundColor: "var(--tp-green-2)", color: "var(--tp-common-black)" },
  { backgroundColor: "var(--tp-blue-2)", color: "var(--tp-common-white)" },
] as const;

const ServiceFaqArea = ({ service }: ServiceFaqAreaProps) => {
  const [active, setActive] = useState(0);

  const handleItemClick = (index: number) => {
    setActive(index);
  };

  return (
    <section className="tp-services-area tp-services-bg-text-animation fix black-bg-3">
      <div className="container container-large">
        <div className="tp-services-inner pb-195 p-relative z-index-1">
          <span className="tp-services-inner-border tp-vertical-line transition-3"></span>
          <span className="tp-services-inner-border right tp-vertical-line transition-3"></span>

          <div className="tp-services-bottom-text tp-services-bg-text">
            <p>FAQs</p>
          </div>

          <div className="row gx-0">
            <div className="col-xl-6 col-lg-7">
              <div
                className="tp-services-wrapper tp-services-capsule-wrapper p-relative pt-100 pr-70"
                style={{ paddingTop: "100px" }}
                data-tp-throwable-scene="true"
              >
                <div className="tp-section-title-wrapper tp_text_anim mb-170">
                  <div className="tp-section-title-inner p-relative">
                    <span className="tp-section-subtitle">FAQs</span>
                    <h2 className="tp-section-title tp_title_anim">
                      {service.presentation?.faqTitle ?? (
                        <>
                          Questions About <br /> {service.title}
                        </>
                      )}
                    </h2>
                  </div>
                  <p>{service.presentation?.faqDescription ?? `Clear answers for teams exploring ${service.title.toLowerCase()} with ReddyStack.`}</p>
                </div>

                <div className="tp-services-capsule-item-wrapper">
                  {(service.presentation?.faqHighlights ?? service.categories).slice(0, 4).map((item, index) => (
                    <p key={item} data-tp-throwable-el="">
                      <span
                        className="tp-services-capsule-item"
                        style={capsuleColors[index % capsuleColors.length]}
                      >
                        {item}
                      </span>
                    </p>
                  ))}

                  {(service.presentation?.showFaqShapes ?? true) ? (
                    <>
                      <p data-tp-throwable-el="">
                        <span className="">
                          <Image src={shape_1} alt={`${service.title} faq shape one`} />
                        </span>
                      </p>
                      <p data-tp-throwable-el="">
                        <span className="">
                          <Image src={shape_2} alt={`${service.title} faq shape two`} />
                        </span>
                      </p>
                    </>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-lg-5">
              <div className="tp-services-accordion tp-accordion tp-accordion-2 pl-70 p-relative" style={{ marginTop: "90px" }}>
                <span className="tp-services-accordion-border"></span>
                <div className="accordion" id={`faqAccordion-${service.slug}`}>
                  {service.faqItems.map((item, index) => (
                    <div
                      key={`${service.slug}-${item.question}`}
                      onClick={() => handleItemClick(index)}
                      className={`accordion-item tp-services-accordion-item ${active === index ? 'active' : ''}`}
                    >
                      <h2 className="accordion-header" id={`heading-${service.slug}-${index}`}>
                        <button
                          className={`accordion-button ${index === 0 ? '' : 'collapsed'}`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse-${service.slug}-${index}`}
                          aria-expanded={index === 0}
                          aria-controls={`collapse-${service.slug}-${index}`}
                          tabIndex={0}
                        >
                          <span className="flex-shrink-0">0{index + 1}</span>
                          {item.question}
                        </button>
                      </h2>
                      <div
                        id={`collapse-${service.slug}-${index}`}
                        className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                        aria-labelledby={`heading-${service.slug}-${index}`}
                        data-bs-parent={`#faqAccordion-${service.slug}`}
                      >
                        <div className="accordion-body">
                          <p>{item.answer}</p>
                          <ul>
                            {item.some_features.map((feature) => (
                              <li key={feature}>{feature}</li>
                            ))}
                          </ul>
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
  );
};

export default ServiceFaqArea;
