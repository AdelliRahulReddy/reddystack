import HeaderFour from "@/layouts/headers/HeaderFour";
import FooterOne from "@/layouts/footers/FooterOne";
import type { TrustPageData } from "@/data/TrustPagesData";
import Link from "next/link";
import type { ReactNode } from 'react';

type TrustPageProps = {
  page: Pick<TrustPageData, 'title' | 'subtitle' | 'intro' | 'sections'>;
  breadcrumbs?: { name: string; path: string }[];
  className?: string;
  children?: ReactNode;
  byline?: { name: string; role: string; href: string };
};

const TrustPage = ({ page, breadcrumbs, className, children, byline }: TrustPageProps) => {
  return (
    <>
      <HeaderFour />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main id="main-content" className="rs-subpage" tabIndex={-1}>
            <section className={`service-details__area service-details__space rs-trust-page black-bg-3 ${className || ''}`.trim()}>
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="service-details__title-box mb-40">
                      {breadcrumbs && (
                        <nav className="blog-list__text-sm mb-25" aria-label="Breadcrumb">
                          {breadcrumbs.map((item, index) => (
                            <span key={item.path}>{index > 0 && ' / '}<Link href={item.path}>{item.name}</Link></span>
                          ))}
                        </nav>
                      )}
                      <span className="service-details__subtitle tp-char-animation">
                        {page.subtitle}
                      </span>
                      <h1 className="service-details__title tp-char-animation">
                        {page.title}
                      </h1>
                    </div>
                  </div>
                  <div className="offset-xl-2 col-xl-8 col-lg-9">
                    <div className="service-details__banner-text mb-80">
                      <p className="tp_title_anim">{page.intro}</p>
                    </div>
                    {byline && (
                      <p className="blog-list__text-sm mb-40">
                        Written by <Link href={byline.href}>{byline.name}</Link> · {byline.role}
                      </p>
                    )}
                    <div className="service-details__left-wrap">
                      {children}
                      {page.sections.map((section) => (
                        <section key={section.title} className="service-details__left-text pb-20">
                          <h2 className="tp-section-title-3 mb-25">{section.title}</h2>
                          {section.body.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                          {(section.bullets || section.links) && (
                            <div className="service-details__fea-list">
                              <ul>
                                {section.bullets?.map((item) => <li key={item}>{item}</li>)}
                                {section.links?.map((link) => <li key={link.path}><Link href={link.path}>{link.title}</Link></li>)}
                              </ul>
                            </div>
                          )}
                        </section>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <FooterOne style={true} />
        </div>
      </div>
    </>
  );
};

export default TrustPage;
