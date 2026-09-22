'use client';
import Link from 'next/link';
import React, { useEffect, useRef, useState, type JSX } from 'react';
import Image, { StaticImageData } from 'next/image';
import { getRecentBlogPosts } from '@/data/BlogPostsData';

interface DataType {
  subtitle: string;
  title: React.JSX.Element;
  priceing_data: {
    tab_id: string;
    tab_content: string;
    tab_items?: {
      time?: string;
      info_1?: string;
      info_2?: string | JSX.Element;
      price?: string;
      btn_text?: string;
      img?: StaticImageData;
      path?: string;
      course_meta?: string;
      course_title?: string;
      new_price?: string;
      old_price?: string;
      offer?: string;
      date?: string;
      title?: string;
      category?: string;
    }[];
  }[]
}

const featuredBlogPosts = getRecentBlogPosts(3);

const price_content: DataType = {
  subtitle: "Ways to Work",
  title: <>Start Focused. <br /> Scale With Evidence.</>,
  priceing_data: [
    {
      tab_id: "home",
      tab_content: "Pricing",
      tab_items: [
  {
    "time": "Proof Sprint",
    "info_1": "One problem · bounded scope",
    "info_2": "Establish the baseline, fix or test one important bottleneck, and leave with evidence for the next decision.",
    "btn_text": "Discuss a Proof Sprint",
    "path": "/contact"
  },
  {
    "time": "Stack Build",
    "info_1": "Connected implementation",
    "info_2": "Combine only the website, search, paid, creative, tracking, or automation work required by the agreed problem.",
    "btn_text": "Plan a Stack Build",
    "path": "/contact"
  },
  {
    "time": "Operate & Improve",
    "info_1": "Ongoing evidence loop",
    "info_2": "Run agreed tests, review meaningful outcomes, improve the working system, and change priorities when the evidence changes.",
    "btn_text": "Discuss Ongoing Work",
    "path": "/contact"
  }
]
    },
    {
      tab_id: "blog",
      tab_content: "Blog",
      tab_items: featuredBlogPosts.map((post) => ({
        img: post.cardImage,
        date: post.displayDate,
        title: post.title,
        category: post.categoryLabel,
        path: post.path,
      })),
    }
  ]
}

const { subtitle, title, priceing_data } = price_content

type PriceAreaHomeOneProps = {
  style?: boolean;
};

const PriceAreaHomeOne = ({ style }: PriceAreaHomeOneProps) => {
  const [activeTab, setActiveTab] = useState("home");
  const activeRef = useRef<HTMLButtonElement>(null);
  const marker = useRef<HTMLSpanElement>(null);

  // handleActive
  const handleActive = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (activeTab && activeRef.current && activeRef.current.classList.contains("active") && marker.current) {
      marker.current.style.left = activeRef.current.offsetLeft + "px";
      marker.current.style.width = activeRef.current.offsetWidth + "px";
    }
  }, [activeTab]);


  return (
    <>
      <section className={`${style ? 'sv-inner__price-area sv-inner__price-customize black-bg-3' : 'tp-pcb-area pt-80'} pb-70`}>
        {style ? null
          :
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-8 col-lg-8">
                <div className="tp-section-title-wrapper mb-30 text-start text-md-center">
                  <div className="tp-section-title-inner tp_title_anim p-relative">
                    <span className="tp-section-subtitle">{subtitle}</span>
                    <h3 className="tp-section-title">{title}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              {style ?
                <div className="sv-inner__price-title-box text-center">
                  <h4 className="tp-section-title-3 tp_title_anim">Ways to Work</h4>
                  <p className="tp_title_anim">Proof Sprint, Stack Build, or ongoing improvement—each quoted with a defined problem, scope, evidence plan, and ownership.</p>
                </div>
                :
                <div className="tp-pcb-tab blog-btn-tab d-flex justify-content-center mb-80">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    {priceing_data.map((item, index) =>
                      <li key={index} className="nav-items" role="presentation">
                        <button
                          className={`nav-links ${activeTab === item.tab_id ? "active" : ""}`}
                          id={`${item.tab_id}-tab`}
                          type="button"
                          role="tab"
                          aria-controls={item.tab_id}
                          ref={activeTab === item.tab_id ? activeRef : null}
                          onClick={() => handleActive(item.tab_id)}
                          onKeyDown={(event) => {
                            if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
                            event.preventDefault();
                            const next = event.key === 'Home' ? 0 : event.key === 'End' ? priceing_data.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + priceing_data.length) % priceing_data.length;
                            handleActive(priceing_data[next].tab_id);
                            document.getElementById(`${priceing_data[next].tab_id}-tab`)?.focus();
                          }}
                          aria-selected={activeTab === item.tab_id}
                          tabIndex={activeTab === item.tab_id ? 0 : -1}
                        >
                          {item.tab_content}
                        </button>
                      </li>
                    )}
                  </ul>
                  <span ref={marker} id="blog-btn-bg"></span>
                </div>
              }
            </div>
          </div>
          <div className="tp-pcb-tab-wrapper">
            <div className="row">
              <div className="tab-content" id="myTabContent">
                {priceing_data.map((item, i) =>
                  <div key={i}
                    className={`tab-pane fade ${activeTab === item.tab_id ? "active show" : ""}`}
                    id={item.tab_id} role="tabpanel" aria-labelledby={`${item.tab_id}-tab`}>

                    {item.tab_id === "home" &&
                      <div className="tp-price-inner">
                        <div className="row">
                          {item.tab_items?.map((inner_item, inner_i) =>
                            <div key={inner_i} className="col-xl-4 col-lg-4 col-md-6 mb-70">
                              <div className="tp-price-item">
                                <div className={`tp-price-head ${inner_i === 2 ? "mb-125" : "mb-100"} text-center`}>
                                  <h4 className="tp-price-head-title">{inner_item.time}</h4>
                                  <span>{inner_item.info_1}</span>
                                </div>

                                <div className={`tp-price-body ${inner_i === 2 ? "" : "mb-35"} text-center`}>
                                  <span className={`${inner_i === 2 ? "tp-price-text" : inner_i === 1 ? "tp-price-radius-border" : ""}`}>
                                    {inner_item.info_2}
                                  </span>
                                  {inner_item.price ? <h4 className="tp-price-body-title">{inner_item.price}</h4> : null}
                                </div>

                                <div className="tp-price-btn-box text-center">
                                  <Link
                                    className={`${style ? "tp-btn-price-white" : inner_i === 2 ? "tp-btn-price-border" : "tp-btn-price"}`} href={inner_item.path || "/contact"}>
                                    <div>
                                      <span>{inner_item.btn_text}</span>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    }

                    {item.tab_id === "blog" &&
                      <div className="tp-blog-inner">
                        <div className="row gx-45">
                          {item.tab_items?.map((inner_item, index) =>
                            <div key={index} className="col-xl-4 col-lg-4 mb-70">
                              <div className="tp-blog-item">
                                <div className="tp-blog-thumb fix">
                                  <Link href={inner_item.path || '/blog'}>
                                    {inner_item.img ? (
                                      <Image className="w-100" src={inner_item.img} alt={inner_item.title || 'Blog post'} />
                                    ) : null}
                                  </Link>
                                </div>
                                <div className="tp-blog-content">
                                  <h4 className="tp-blog-title-sm">
                                    <Link href={inner_item.path || '/blog'}>{inner_item.title}</Link></h4>
                                  <div className="tp-blog-meta d-flex justify-content-between align-items-center">
                                    <span>{inner_item.date}</span>
                                    <span><Link href={inner_item.path || '/blog'}>{inner_item.category}</Link></span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    }
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PriceAreaHomeOne;
