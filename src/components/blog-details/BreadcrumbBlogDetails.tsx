import React from 'react';
import Image from 'next/image';
import type { BlogPost } from '@/data/BlogPostsData';

type BreadcrumbBlogDetailsProps = {
  post: BlogPost;
};

const BreadcrumbBlogDetails = ({ post }: BreadcrumbBlogDetailsProps) => {
  return (
    <>
      <div className="blog-details__area blog-details__customize rs-blog-article-hero rs-page-hero black-bg-3">
        <div className="container">
          <div className="row">
            <div className="blog-list__title-box">
              <div className="blog-list__text-sm">
                <span className="category">{post.categoryLabel}</span>
                <i className="fa-regular fa-angle-right"></i>
                <span>{post.title}</span>
              </div>
              <h1 className="blog-list__title tp-char-animation">{post.title}</h1>
            </div>
            <div className="blog-details__meta mb-70">
              <span><Image src={post.author.avatar} width={46} height={46} style={{ objectFit: 'cover', borderRadius: '50%' }} alt={post.author.name} /><i>{post.author.name}</i></span>
              <span>{post.displayDate}</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
        <div className="blog-details__big-thumb text-center h-auto">
          <Image className="h-auto" src={post.heroImage} sizes="100vw" alt={post.title} />
        </div>
      </div>
    </>
  );
};

export default BreadcrumbBlogDetails;
