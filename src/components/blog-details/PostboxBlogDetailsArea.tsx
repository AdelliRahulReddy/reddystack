import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Linkedin from '@/svg/icons/Linkedin';
import XIcon from '@/svg/icons/XIcon';
import TelegramIcon from '@/svg/icons/TelegramIcon';

import CommentForm from '../forms/CommentForm';
import BlogSidebar from '../blog-sidebar/BlogSidebar';
import type { BlogPost } from '@/data/BlogPostsData';
import { siteConfig } from '@/data/siteConfig';

type PostboxBlogDetailsAreaProps = {
  post: BlogPost;
  previousPost: BlogPost;
  nextPost: BlogPost;
  relatedPost: BlogPost | null;
};

const socialLinks = [
  {
    id: 1,
    label: 'X',
    icon: <XIcon />,
    link: siteConfig.socialLinks.x,
  },
  {
    id: 2,
    label: 'LinkedIn',
    icon: <Linkedin />,
    link: siteConfig.socialLinks.linkedin,
  },
  {
    id: 3,
    label: 'Telegram',
    icon: <TelegramIcon />,
    link: siteConfig.socialLinks.telegram,
  },
] as const;

const relatedPageByCategory = {
  'seo-websites': {
    title: 'website development services',
    path: '/website-development',
  },
  applications: {
    title: 'custom web application development',
    path: '/custom-web-application-development-services',
  },
  'mvp-builds': {
    title: 'MVP development services',
    path: '/mvp-development-for-startup-founders',
  },
  'ai-automations': {
    title: 'AI automation services',
    path: '/ai-automation',
  },
} as const;

const PostboxBlogDetailsArea = ({
  post,
  previousPost,
  nextPost,
  relatedPost,
}: PostboxBlogDetailsAreaProps) => {
  const relatedPage = relatedPageByCategory[post.categoryKey];

  return (
    <section className="postbox-details__area pt-90 pb-120 black-bg-3">
      <div className="container">
        <div className="row">
          <div className="col-xxl-8 col-xl-8 col-lg-8">
            <div className="postbox-details__wrapper tp-blog-sidebar-sticky-area tp-blog-social-sticky-area p-relative">
              <div className="postbox-details__top-social tp-blog-social-sticky d-none d-xxl-inline-flex">
                {socialLinks.map((item) => (
                  <Link href={item.link} aria-label={item.label} key={item.id} target="_blank" rel="noopener noreferrer">
                    {item.icon}
                  </Link>
                ))}
              </div>

              <div className="postbox-details__text">
                <p className="tp-dropcap pb-10">{post.leadParagraphs[0]}</p>
                <p className="pb-20">{post.leadParagraphs[1]}</p>
              </div>

              <h2 className="postbox-details__title pb-15">{post.sectionTitle}</h2>

              <div className="postbox-details__text pb-40">
                {post.sectionParagraphsBeforeImage.map((paragraph, index) => (
                  <p key={`${post.slug}-before-${index}`}>{paragraph}</p>
                ))}
              </div>

              <div className="postbox-details__thumb pb-55">
                <Image src={post.detailImage} style={{ height: 'auto' }} alt={post.title} />
              </div>

              <div className="postbox-details__text pb-20">
                {post.sectionParagraphsAfterImage.map((paragraph, index) => (
                  <p key={`${post.slug}-after-${index}`}>{paragraph}</p>
                ))}
              </div>

              <div className="postbox-details__qoute p-relative">
                <blockquote>
                  <div className="postbox-details__qoute-icon">
                    <span>
                      <svg width="44" height="38" viewBox="0 0 44 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.5306 0C8.40816 2.95378 0 12.9328 0 25.9454C0 34.2479 3.67347 38 9.06122 38C14.2041 38 17.7959 34.4874 17.7959 29.458C17.7959 24.2689 14.1224 20.6765 8.89796 20.6765C6.36735 20.6765 4.32653 21.5546 2.69388 22.9118C3.26531 13.4916 9.79592 5.02941 19.102 1.83613L18.5306 0ZM43.3469 0C33.3061 2.95378 24.8163 12.9328 24.8163 25.9454C24.8163 34.2479 28.5714 38 33.9592 38C39.102 38 42.6939 34.4874 42.6939 29.458C42.6939 24.2689 39.0204 20.6765 33.7959 20.6765C31.2653 20.6765 29.1429 21.5546 27.5918 22.9118C28.1633 13.4916 34.6939 5.02941 44 1.83613L43.3469 0Z" fill="white" fillOpacity="0.1" />
                      </svg>
                    </span>
                  </div>
                  <div className="postbox-details__qoute-text">
                    <p>{post.quote}</p>
                  </div>
                </blockquote>
              </div>

              <div className="postbox-details__text pt-20 pb-20">
                {post.closingParagraphs.map((paragraph, index) => (
                  <p key={`${post.slug}-closing-${index}`}>{paragraph}</p>
                ))}
              </div>

              <div className="tagcloud pb-35">
                {post.tags.map((tag) => (
                  <Link href={`/blog?q=${encodeURIComponent(tag)}`} key={tag}>{tag}</Link>
                ))}
              </div>

              {relatedPage && (
                <div className="postbox-details__author-info-box mb-70 p-relative">
                  <div className="postbox-details__author-wrap d-flex align-items-center justify-content-between flex-wrap">
                    <div className="postbox-details__author-content">
                      <h4>Related Service</h4>
                      <p>
                        Need similar help for your business? Explore our {relatedPage.title} service.
                      </p>
                    </div>
                    <div className="pt-20 pt-md-0">
                      <Link className="tp-btn-border-md" href={relatedPage.path}>
                        Explore Service
                        <span>
                          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 10L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 1H10V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              <div className="postbox-details__author-info-box mb-95 p-relative">
                <div className="postbox-details__author-wrap d-flex align-items-center">
                  <div className="postbox-details__author-avata">
                    <Image src={post.author.avatar} alt={post.author.name} />
                  </div>
                  <div className="postbox-details__author-content">
                    <h4>{post.author.name}</h4>
                    <p>{post.author.bio}</p>
                  </div>
                </div>
                <div className="postbox-details__author-social-wrap">
                  <div className="postbox-details__author-social-link">
                    {socialLinks.map((item) => (
                      <Link
                        href={item.link} aria-label={item.label}
                        key={item.id}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                      >
                        {item.icon}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <CommentForm />
            </div>
          </div>

          <BlogSidebar />

          {relatedPost && (
            <div className="row">
              <div className="col-xl-12">
                <div className="postbox-details___related-post">
                  <h4 className="postbox-details___related-title">Related Articles</h4>
                  <div className="postbox-details___related-post-box">
                    <div className="postbox-details___related-content-wrap mb-30">
                      <div className="row align-items-center">
                        <div className="col-xl-7 col-lg-6">
                          <h4 className="postbox-details___related-title-sm">
                            <Link href={relatedPost.path}>{relatedPost.title}</Link>
                          </h4>
                        </div>
                        <div className="col-xl-5 col-lg-6">
                          <div className="postbox-details___related-meta">
                            <div className="blog-list__meta-box text-start text-lg-end">
                              <span className="category">{relatedPost.categoryLabel}</span>
                              <span>{relatedPost.displayDate}</span>
                              <span>{relatedPost.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="postbox-details___related-thumb mb-80">
                          <Image data-speed="1.1" src={relatedPost.cardImage} alt={relatedPost.title} />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="porfolio-details__navigation-wrap">
                          <div className="row align-items-center">
                            <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                              <div className="porfolio-details__navigation-content text-center text-md-start">
                                <Link href={previousPost.path}>
                                  <i className="fa-regular fa-arrow-left"></i>
                                  <span>Previous</span>
                                </Link>
                                <h4>{previousPost.title}</h4>
                              </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                              <div className="porfolio-details__navigation-bar text-center">
                                <Link href="/blog" aria-label="View all articles">
                                  <span>
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path opacity="0.5" d="M1 5.21053C1 3.22567 1 2.23323 1.61662 1.61662C2.23323 1 3.22567 1 5.21053 1C7.19539 1 8.18782 1 8.80444 1.61662C9.42105 2.23323 9.42105 3.22567 9.42105 5.21053C9.42105 7.19539 9.42105 8.18782 8.80444 8.80444C8.18782 9.42105 7.19539 9.42105 5.21053 9.42105C3.22567 9.42105 2.23323 9.42105 1.61662 8.80444C1 8.18782 1 7.19539 1 5.21053Z" stroke="white" strokeWidth="1.5" />
                                      <path opacity="0.5" d="M12.5781 16.7896C12.5781 14.8048 12.5781 13.8123 13.1947 13.1957C13.8114 12.5791 14.8038 12.5791 16.7887 12.5791C18.7735 12.5791 19.7659 12.5791 20.3826 13.1957C20.9992 13.8123 20.9992 14.8048 20.9992 16.7896C20.9992 18.7745 20.9992 19.7669 20.3826 20.3835C19.7659 21.0002 18.7735 21.0002 16.7887 21.0002C14.8038 21.0002 13.8114 21.0002 13.1947 20.3835C12.5781 19.7669 12.5781 18.7745 12.5781 16.7896Z" stroke="white" strokeWidth="1.5" />
                                      <path d="M1 16.7896C1 14.8048 1 13.8123 1.61662 13.1957C2.23323 12.5791 3.22567 12.5791 5.21053 12.5791C7.19539 12.5791 8.18782 12.5791 8.80444 13.1957C9.42105 13.8123 9.42105 14.8048 9.42105 16.7896C9.42105 18.7745 9.42105 19.7669 8.80444 20.3835C8.18782 21.0002 7.19539 21.0002 5.21053 21.0002C3.22567 21.0002 2.23323 21.0002 1.61662 20.3835C1 19.7669 1 18.7745 1 16.7896Z" stroke="white" strokeWidth="1.5" />
                                      <path d="M12.5781 5.21053C12.5781 3.22567 12.5781 2.23323 13.1947 1.61662C13.8114 1 14.8038 1 16.7887 1C18.7735 1 19.7659 1 20.3826 1.61662C20.9992 2.23323 20.9992 3.22567 20.9992 5.21053C20.9992 7.19539 20.9992 8.18782 20.3826 8.80444C19.7659 9.42105 18.7735 9.42105 16.7887 9.42105C14.8038 9.42105 13.8114 9.42105 13.1947 8.80444C12.5781 8.18782 12.5781 7.19539 12.5781 5.21053Z" stroke="white" strokeWidth="1.5" />
                                    </svg>
                                  </span>
                                </Link>
                              </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                              <div className="porfolio-details__navigation-content next text-center text-md-end">
                                <Link href={nextPost.path}>
                                  <span>Next</span>
                                  <i className="fa-regular fa-arrow-right"></i>
                                </Link>
                                <h4>{nextPost.title}</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PostboxBlogDetailsArea;
