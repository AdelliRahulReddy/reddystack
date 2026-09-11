
'use client';
import React from 'react';
import Link from 'next/link';
import UseHoverReveal from '@/hooks/UseHoverReveal';

interface DataType {
  title: string;
  bg_img: string;
  href: string;
}

const info_data: DataType[] = [
  { title: "Ad Campaigns", bg_img: "/assets/img/about/ab-1.png", href: "/service/meta-ads" },
  { title: "Creative Content", bg_img: "/assets/img/about/ab-2.png", href: "/service/ad-creatives" },
  { title: "Websites", bg_img: "/assets/img/about/ab-3.png", href: "/service/seo-websites" },
  { title: "SEO Strategy", bg_img: "/assets/img/about/ab-4.png", href: "/website-development" }
]


const AboutInfo = () => {
  const { handleMouseMove } = UseHoverReveal();
  return (
    <>
      <div id="about-info-area" className="ab-info__area black-bg-3 pb-160">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="ab-info__text">

                <div>
                  I&apos;m Rahul <span className="line"></span> founder of Reddystack, based in Hyderabad. I work directly with small businesses and growing brands, bringing clear planning and hands-on delivery to

                  {info_data.map((item, index) =>
                    <React.Fragment key={index}>
                      <Link className="tp-hover-reveal-item" href={item.href} onMouseMove={(event) => handleMouseMove(event, '.tp-hover-reveal-item')}>
                        {item.title}
                        <span></span>
                        <div className="tp-hover-reveal-bg" style={{ backgroundImage: `url(${item.bg_img})` }}></div>
                      </Link>, {' '}
                    </React.Fragment>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutInfo;
