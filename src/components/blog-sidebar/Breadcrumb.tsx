
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
              <p>Use the topic guides to work through a specific decision: plan an ad budget, diagnose unsuitable leads, prepare a creative brief or check a website before launch. Each collection links to practical checklists and examples. The older articles below cover websites, application planning, MVPs and automation.</p>
              <p>Examples and calculations explain a method; they are not client results or forecasts. Where a guide discusses a platform rule, check the linked official reference before making a live change because requirements can change. For your own review, keep a note of the starting problem, the evidence and the change you decide to make.</p>
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
