import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

import type { ServiceDetail } from '@/data/ServiceDetailData';

type ServiceDetailsAreaProps = {
  service: ServiceDetail;
};

const ServiceDetailsArea = ({ service }: ServiceDetailsAreaProps) => {
  const [supportingImageOne, supportingImageTwo] = service.supportingImages ?? [];
  const showVisuals = service.presentation?.showVisuals ?? true;
  const showSidebar = service.presentation?.showSidebar ?? true;
  const leftColumnClass = showSidebar ? 'col-xl-7 col-lg-7' : 'col-xl-12 col-lg-12';
  const bannerColumnClass = 'col-xl-8 col-lg-10';

  return (
    <div className="service-details__area service-details__space pt-160 pb-90 black-bg-3">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="service-details__title-box mb-30">
              <span className="service-details__subtitle tp-char-animation">{service.subtitle}</span>
              <h1 className="service-details__title tp-char-animation">{service.title}</h1>
            </div>
          </div>
          <div className="row">
            <div className={bannerColumnClass}>
              <div className="service-details__banner-text mb-50">
                <p className="mb-15 tp_title_anim">{service.introPrimary}</p>
                <p className="tp_title_anim">{service.introSecondary}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showVisuals ? (
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <div className="service-details__tab-wrapper text-center mb-120">
                <div className="service-details__tab-thumb">
                  <Image src={service.heroImage} style={{ height: 'auto' }} sizes="100vw" alt={service.title} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="container">
        <div className="row">
          <div className={leftColumnClass}>
            <div className="service-details__left-wrap">
              {service.answerSections ? (
                service.answerSections.map((section) => (
                  <section key={section.title} className="service-details__left-text pb-20">
                    <h2 className="tp-section-title-3 mb-25">{section.title}</h2>
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.bullets ? (
                      <div className="service-details__fea-list">
                        <ul>
                          {section.bullets.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </section>
                ))
              ) : (
                <>
                  <div className="service-details__left-text pb-20">
                    <p className="text-1 tp_title_anim">{service.overviewPrimary}</p>
                    <p>{service.overviewSecondary}</p>
                  </div>
                  <div className="service-details__fea-list">
                    <ul>
                      {service.features.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {service.processSteps ? (
                <section className="service-details__left-text pb-20">
                  <h2 className="tp-section-title-3 mb-25">{service.processTitle}</h2>
                  <div className="service-details__fea-list">
                    <ul>
                      {service.processSteps.map((step) => (
                        <li key={step.label}>
                          <strong>{step.label}</strong> {step.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              ) : null}

              {service.pricingText ? (
                <section className="service-details__left-text pb-20">
                  <h2 className="tp-section-title-3 mb-25">{service.pricingTitle}</h2>
                  <p>{service.pricingText}</p>
                  <Link href="/pricing">View pricing and scope guidance</Link>
                </section>
              ) : null}

              {showVisuals && supportingImageOne && supportingImageTwo ? (
                <div className="service-details__sm-thumb-wrap mb-60">
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 mb-20">
                      <div className="service-details__sm-thumb">
                        <Image src={supportingImageOne} style={{ height: 'auto' }} alt={`${service.title} detail`} />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 mb-20">
                      <div className="service-details__sm-thumb">
                        <Image src={supportingImageTwo} style={{ height: 'auto' }} alt={`${service.title} supporting visual`} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {service.relatedLinks && (
                <section className="service-details__left-text pb-20">
                  <h2 className="tp-section-title-3 mb-25">Related guides and services</h2>
                  <div className="service-details__fea-list">
                    <ul>{service.relatedLinks.map((link) => <li key={link.path}><Link href={link.path}>{link.title}</Link></li>)}</ul>
                  </div>
                </section>
              )}
              <div className="service-details__left-text">
                {service.finalCtaTitle ? (
                  <h2 className="tp-section-title-3 mb-25">{service.finalCtaTitle}</h2>
                ) : null}
                <p>{service.finalCtaText || service.closingSummary}</p>
                <div className="d-flex flex-wrap gap-3 mt-30">
                  <Link className="tp-btn-white" href="/contact">
                    Start Your Project
                    <span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M4.9297 10.3651C5.12061 10.2162 5.29376 10.043 5.64006 9.69671L9.95722 5.37954C10.0616 5.27517 10.0138 5.0954 9.87438 5.04702C9.36479 4.87022 8.70189 4.53829 8.0818 3.9182C7.46171 3.29811 7.12978 2.63521 6.95299 2.12562C6.9046 1.98617 6.72483 1.9384 6.62046 2.04278L2.30329 6.35994L2.30328 6.35995C1.95699 6.70624 1.78385 6.87939 1.63494 7.0703C1.45928 7.29551 1.30868 7.53919 1.18581 7.79701C1.08164 8.01558 1.00421 8.24789 0.849336 8.71249L0.649225 9.31283L0.331026 10.2674L0.0326691 11.1625C-0.0435433 11.3911 0.0159628 11.6432 0.186379 11.8136C0.356795 11.984 0.608868 12.0435 0.837505 11.9673L1.73258 11.669L2.68717 11.3508L3.28751 11.1507C3.75211 10.9958 3.98442 10.9184 4.20299 10.8142C4.46082 10.6913 4.70449 10.5407 4.9297 10.3651Z"
                          fill="currentcolor"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {showSidebar ? (
            <div className="col-xl-5 col-lg-5">
              <div className="service-details__right-wrap fix p-relative">
                <div className="service-details__rotate-text">
                  <span>{service.sideTitle}</span>
                </div>
                <div className="service-details__right-category">
                  {service.categories.map((item, index) => (
                    <span key={index} className={index === 1 ? 'active' : undefined}>
                      {item}
                    </span>
                  ))}
                </div>
                <div className="service-details__right-text-box">
                  <h4>
                    {service.highlightTitle[0]} <br /> {service.highlightTitle[1]}
                  </h4>
                  <p className="mb-20">{service.highlightText}</p>
                  <Link className="tp-btn-white" href="/contact">
                    Let&apos;s Talk
                    <span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M4.9297 10.3651C5.12061 10.2162 5.29376 10.043 5.64006 9.69671L9.95722 5.37954C10.0616 5.27517 10.0138 5.0954 9.87438 5.04702C9.36479 4.87022 8.70189 4.53829 8.0818 3.9182C7.46171 3.29811 7.12978 2.63521 6.95299 2.12562C6.9046 1.98617 6.72483 1.9384 6.62046 2.04278L2.30329 6.35994L2.30328 6.35995C1.95699 6.70624 1.78385 6.87939 1.63494 7.0703C1.45928 7.29551 1.30868 7.53919 1.18581 7.79701C1.08164 8.01558 1.00421 8.24789 0.849336 8.71249L0.649225 9.31283L0.331026 10.2674L0.0326691 11.1625C-0.0435433 11.3911 0.0159628 11.6432 0.186379 11.8136C0.356795 11.984 0.608868 12.0435 0.837505 11.9673L1.73258 11.669L2.68717 11.3508L3.28751 11.1507C3.75211 10.9958 3.98442 10.9184 4.20299 10.8142C4.46082 10.6913 4.70449 10.5407 4.9297 10.3651Z"
                          fill="currentcolor"
                        />
                        <path
                          d="M11.3089 4.02783C12.2304 3.10641 12.2304 1.61249 11.3089 0.691067C10.3875 -0.230356 8.89359 -0.230356 7.97217 0.691067L7.83337 0.82986C7.69944 0.963792 7.63876 1.15087 7.67222 1.3373C7.69327 1.45458 7.73229 1.62603 7.80327 1.83063C7.94522 2.23979 8.21329 2.77689 8.7182 3.2818C9.22311 3.78671 9.76021 4.05478 10.1694 4.19673C10.374 4.26772 10.5454 4.30673 10.6627 4.32778C10.8491 4.36124 11.0362 4.30056 11.1701 4.16663L11.3089 4.02783Z"
                          fill="currentcolor"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsArea;
