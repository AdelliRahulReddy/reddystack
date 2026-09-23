'use client';
import React, { useState } from 'react';

import { homeFaqItems } from '@/data/HomeFaqData';

interface DataType {
  subtitle: string;
  title: React.JSX.Element;
  sm_des: React.JSX.Element;
}

const faq_content: DataType = {
  subtitle: "FAQs",
  title: <>What to Know Before We Start</>,
  sm_des: <>Simple answers about services, scope, costs, and results.</>,
};

const { subtitle, title, sm_des } = faq_content;

const FaqAreaHomeOne = () => {
  const [active, setActive] = useState(0);

  const handleItemClick = (index: number) => {
    setActive(index);
  };

  return (
    <section className="tp-services-area tp-services-bg-text-animation fix">
      <div className="container container-large">
        <div className="tp-services-inner pt-120 pb-120 p-relative z-index-1">
          <span className="tp-services-inner-border tp-vertical-line transition-3"></span>
          <span className="tp-services-inner-border right tp-vertical-line transition-3"></span>

          <div className="tp-services-bottom-text tp-services-bg-text">
            <p>Questions</p>
          </div>

          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className="tp-section-title-wrapper text-center tp_text_anim mb-60">
                <div className="tp-section-title-inner p-relative">
                  <span className="tp-section-subtitle">{subtitle}</span>
                  <h3 className="tp-section-title tp_title_anim">{title}</h3>
                </div>
                <p>{sm_des}</p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className="tp-services-accordion tp-accordion tp-accordion-2 p-relative">
                <div className="accordion" id="faqAccordionHome">
                  {homeFaqItems.map((item, i) => (
                    <div
                      key={item.tab_id}
                      onClick={() => handleItemClick(i)}
                      className={`accordion-item tp-services-accordion-item ${active === i ? 'active' : ''}`}
                    >
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
                          <span className="flex-shrink-0">0{item.id}</span>
                          {item.question}
                        </button>
                      </h2>
                      <div
                        id={`collapse${item.tab_id}`}
                        className={`accordion-collapse collapse ${i === 0 ? 'show' : ''}`}
                        aria-labelledby={`heading${item.tab_id}`}
                        data-bs-parent="#faqAccordionHome"
                      >
                        <div className="accordion-body">
                          <p>{item.answer}</p>
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

export default FaqAreaHomeOne;
