import Link from 'next/link';
import React from 'react';

import ServiceArrowIcon from '@/svg/service/ServiceArrowIcon';
import ServiceDevelopmentIcon from '@/svg/service/ServiceDevelopmentIcon';
import ServiceMobileIcon from '@/svg/service/ServiceMobileIcon';
import ServiceSoftwareIcon from '@/svg/service/ServiceSoftwareIcon';
import ServiceWebIcon from '@/svg/service/ServiceWebIcon';
import StarIcon from '@/svg/service/StarIcon';
import { serviceDetailData, primaryServices, primaryServiceSlugs } from '@/data/ServiceDetailData';

interface DataType {
  description: React.JSX.Element;
  service_data: {
    id: number;
    icon: React.JSX.Element;
    title: string;
    href: string;
  }[];
}

const getIntentIcon = (relatedServiceSlug: string) => {
  switch (relatedServiceSlug) {
    case 'applications':
      return <ServiceMobileIcon />;
    case 'mvp-builds':
      return <ServiceDevelopmentIcon />;
    case 'ai-automations':
      return <ServiceSoftwareIcon />;
    default:
      return <ServiceWebIcon />;
  }
};

const service_info_content: DataType = {
  description: <>ReddyStack specialises in solving one measurable digital growth problem with a connected set of capabilities.</>,
  service_data: primaryServices.map((service, index) => ({ id: index + 1, icon: <ServiceWebIcon />, title: service.title, href: service.path })),
};

const { description, service_data } = service_info_content;

const ServiceInfoArea = () => {
  return (
    <div className="sv-inner__info-area pt-120 pb-90 black-bg-3">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-9">
            <div className="sv-inner__info-title-box mb-90">
              <h4 className="sv-inner__info-title tp_title_anim">
                {description}
              </h4>
              <p>Buyers should not need to diagnose their own channel before asking for help. Start with the commercial goal, the current setup, what has already been tried, and where the system appears to break. Rahul uses that evidence to identify the first useful scope.</p>
              <p>The stack may include a website or landing page, technical and on-page search work, Meta or Google campaigns, creative assets, conversion tracking, analytics, or automation. These are components—not six mandatory services and not a promise that every problem needs every tool.</p>
              <p>Each capability page explains possible deliverables and boundaries. The final proposal connects them around one problem and confirms ownership, access, approvals, costs, checks, reporting, and what happens after delivery.</p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-9">
            <div className="row mb-100">
              <div className="col-xl-4">
                <div className="sv-inner__info-service">
                  <h4 className="sv-inner__left-title">
                    <span>
                      <StarIcon />
                    </span>{' '}
                    Core Capabilities
                  </h4>
                </div>
              </div>
              <div className="col-xl-8">
                <div className="sv-inner__service-category-wrap">
                  {service_data.map((item, i) => (
                    <div key={i} className="sv-inner__service-category">
                      <Link className="d-flex align-items-center justify-content-between" href={item.href}>
                        <div className="sv-inner__service-category-content">
                          <span>
                            {item.icon}
                          </span>
                          <span>{item.title}</span>
                        </div>
                        <div className="sv-inner__service-category-link">
                          <span>
                            <ServiceArrowIcon />
                          </span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-4">
                <div className="sv-inner__info-service">
                  <h4 className="sv-inner__left-title">
                    <span>
                      <StarIcon />
                    </span>{' '}
                    Extended Capabilities
                  </h4>
                </div>
              </div>
              <div className="col-xl-8">
                <div className="sv-inner__service-category-wrap">
                  {serviceDetailData.filter((service) => !primaryServiceSlugs.includes(service.slug)).map((page) => (
                    <div key={page.slug} className="sv-inner__service-category">
                      <Link className="d-flex align-items-center justify-content-between" href={page.path}>
                        <div className="sv-inner__service-category-content">
                          <span>
                            {getIntentIcon(page.slug)}
                          </span>
                          <span>{page.title}</span>
                        </div>
                        <div className="sv-inner__service-category-link">
                          <span>
                            <ServiceArrowIcon />
                          </span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceInfoArea;
