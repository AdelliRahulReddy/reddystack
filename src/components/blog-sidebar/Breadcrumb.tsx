
import React from 'react';
import Link from 'next/link';
import { seoPages } from '@/data/SeoPagesData';

const Breadcrumb = () => {
  return (
    <>
      <div className="blog-standard__area pt-200 black-bg-3">
        <div className="container">
          <div className="row">
            <div className="blog-list__title-box">
              <span className="blog-list__subtitle tp-char-animation">Insights Archive</span>
              <h1 className="blog-list__title tp-char-animation">Ideas for ads, creative,<br /> websites, and SEO.</h1>
              <nav className="tagcloud mt-30" aria-label="Guide topics">
                {seoPages.filter((page) => page.kind === 'hub' && page.parent === '/blog').map((page) => (
                  <Link key={page.path} href={page.path}>{page.title}</Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Breadcrumb;
