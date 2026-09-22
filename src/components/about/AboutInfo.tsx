
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
  { title: "digital foundations", bg_img: "/assets/img/about/ab-3.png", href: "/service/seo-websites" },
  { title: "search visibility", bg_img: "/assets/img/about/ab-4.png", href: "/service/seo-local-seo" },
  { title: "paid acquisition", bg_img: "/assets/img/about/ab-1.png", href: "/service/meta-ads" },
  { title: "automation systems", bg_img: "/assets/img/about/ab-2.png", href: "/service/ai-automations" }
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
                  I&apos;m <Link href="/about/rahul-reddy-adelli">Rahul Reddy</Link> <span className="line"></span> I built ReddyStack as a proof-first studio. We begin with one important growth problem, connect only the capabilities it needs, and use evidence to decide what happens next across

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
