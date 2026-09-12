'use client';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import BlogSidebar from './BlogSidebar';
import ArticleSearch from './ArticleSearch';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useVideoModal } from '@/provider/VideoProvider';
import { getSidebarListingPosts } from '@/data/BlogPostsData';

const SideBlogPostBoxArea = () => {
  const { playVideo } = useVideoModal();
  const articleData = getSidebarListingPosts();
  const [selectedCategoryKey, setSelectedCategoryKey] = useState('all');
  const filteredArticles = useMemo(
    () =>
      selectedCategoryKey === 'all'
        ? articleData
        : articleData.filter((item) => item.categoryKey === selectedCategoryKey),
    [articleData, selectedCategoryKey],
  );
  return (
    <>
      <section className="postbox__area tp-blog-sidebar-sticky-area pb-120 black-bg-3">
        <div className="container">
          <div className="row">
            <div className="col-xxl-8 col-xl-8 col-lg-8">
              <div className="postbox__wrapper">
                <div className="d-lg-none"><ArticleSearch /></div>
                {filteredArticles.map((item, i) =>
                  <article className="postbox__item mb-60" key={i}>
                    {(!item.sidebarVariant || item.sidebarVariant === 'image') &&
                      <div className="postbox__thumb">
                        <Link href={item.path}>
                          <Image src={item.cardImage} style={{ height: 'auto' }} alt={item.title} />
                        </Link>
                        <div className="postbox__date">
                          <span>{item.monthShort}</span>
                          <h5>{item.day}</h5>
                        </div>
                      </div>
                    }
                    {item.sidebarVariant === 'video' &&
                      <div className="postbox__thumb without-gsap" id="without-gsap">
                        <Link href={item.path}>
                          <Image src={item.cardImage} style={{ height: 'auto' }} alt={item.title} />
                        </Link>
                        <div className="postbox__date">
                          <span>{item.monthShort}</span>
                          <h5>{item.day}</h5>
                        </div>
                        <div className="postbox__play-btn">
                          <button type="button" aria-label="Play article video" onClick={()=>playVideo(item.videoId || "qmGYnJgCW1o")} className="popup-video"
                            style={{ cursor: "pointer" }}
                          ><i className="fa-sharp fa-solid fa-play"></i></button>
                        </div>
                      </div>
                    }
                    {item.sidebarVariant === 'slider' &&
                      <div className="postbox__thumb w-img">
                        <div className="postbox__date">
                          <span>{item.monthShort}</span>
                          <h5>{item.day}</h5>
                        </div>
                        <div className="postbox__thumb-slider p-relative">
                          <Swiper
                            loop={false}
                            autoplay={true}
                            modules={[Navigation]}
                            navigation={{
                              nextEl: ".postbox-arrow-next",
                              prevEl: ".postbox-arrow-prev",
                            }}
                            breakpoints={{
                              '1400': {
                                slidesPerView: 1,
                              },
                              '1200': {
                                slidesPerView: 1,
                              },
                              '992': {
                                slidesPerView: 1,
                              },
                              '768': {
                                slidesPerView: 1,
                              },
                              '576': {
                                slidesPerView: 1,
                              },
                              '0': {
                                slidesPerView: 1,
                              },
                            }}
                            className="swiper-container postbox__thumb-slider-active">
                            {item.sliderImages?.map((slide, slide_i) =>
                              <SwiperSlide key={slide_i} className="swiper-slide">
                                <Image src={slide} style={{ height: 'auto' }} alt={item.title} />
                              </SwiperSlide>
                            )}
                          </Swiper>
                          <div className="postbox__slider-arrow-wrap d-none d-sm-block">
                            <button type="button" aria-label="Previous article image" className="postbox-arrow-prev">
                              <i className="fa-sharp fa-solid fa-arrow-left"></i>
                            </button>
                            <button type="button" aria-label="Next article image" className="postbox-arrow-next">
                              <i className="fa-sharp fa-solid fa-arrow-right"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    }
                    <div className="postbox__content">
                      <div className="postbox__meta">
                        <span>{item.categoryLabel}</span>
                        <i></i>
                        <span>{item.commentsCount} {item.commentsCount === 1 ? 'Comment' : 'Comments'}</span>
                      </div>
                      <h3 className="postbox__title">
                        <Link href={item.path}>{item.title}</Link>
                      </h3>
                      <div className="postbox__text">
                        <p>{item.excerpt}</p>
                      </div>
                      <div className="postbox__read-more">
                        <Link href={item.path} className="tp-btn-border-lg">Read: {item.title}</Link>
                      </div>
                    </div>
                  </article>
                )}

              </div>
            </div>
            <BlogSidebar
              selectedCategoryKey={selectedCategoryKey}
              onCategorySelect={setSelectedCategoryKey}
              showAllCategory={true}
              archiveFilterMode={true}
            />

          </div>
        </div>
      </section>


    </>
  );
};

export default SideBlogPostBoxArea;
