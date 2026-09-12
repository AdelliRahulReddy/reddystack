'use client';
import React from 'react';
import Image, { StaticImageData } from 'next/image';

import Link from 'next/link';
import ArticleSearch from './ArticleSearch';
import {
  getBlogCategoryCounts,
  getRecentBlogPosts,
  getUniqueBlogTags,
} from '@/data/BlogPostsData';


interface DataType {
  category_title: string;
  category_list: {
    key: string;
    title: string;
    items: number;
  }[];
  post_title: string;
  post_list: {
    id: string;
    img: StaticImageData;
    title: string;
    category: string;
    date: string;
    path: string;
  }[];
  tag_title: string;
  tags: {
    title: string;
    link: string;
  }[];
}


const sidebar_content: DataType = {
  category_title: "Category",
  category_list: getBlogCategoryCounts(),
  post_title: "Recent Post",
  post_list: getRecentBlogPosts(2).map((post, index) => ({
    id: `${post.slug}-${index}`,
    img: post.sidebarImage,
    title: post.title,
    category: post.categoryLabel.toUpperCase(),
    date: post.displayDate,
    path: post.path,
  })),
  tag_title: "Tags",
  tags: getUniqueBlogTags().map((tag) => ({ title: tag, link: `/blog?q=${encodeURIComponent(tag)}` })),
}

const { category_title, category_list, post_title, post_list, tag_title, tags } = sidebar_content

type BlogSidebarProps = {
  selectedCategoryKey?: string;
  onCategorySelect?: (categoryKey: string) => void;
  showAllCategory?: boolean;
  archiveFilterMode?: boolean;
};

const BlogSidebar = ({
  selectedCategoryKey,
  onCategorySelect,
  showAllCategory = false,
  archiveFilterMode = false,
}: BlogSidebarProps) => {
  const categoryItems = showAllCategory
    ? [
      {
        key: 'all',
        title: 'All',
        items: category_list.reduce((total, item) => total + item.items, 0),
      },
      ...category_list,
    ]
    : category_list;

  return (
    <>
      <div className="col-xxl-4 col-xl-4 col-lg-4">
        <div className={`sidebar__wrapper ${archiveFilterMode ? '' : 'tp-blog-sidebar-sticky'}`.trim()}>
          <div className={`sidebar__widget mb-60 ${archiveFilterMode ? 'd-none d-lg-block' : ''}`}>
            <div className="sidebar__widget-content">
              <h3 className="sidebar__widget-title">Search Here</h3>
              <ArticleSearch />
            </div>
          </div>
          <div className="sidebar__widget mb-60">
            <h3 className="sidebar__widget-title">{category_title}</h3>
            <div className="sidebar__widget-content">
              <ul>
                {categoryItems.map((item) => (
                  <li key={item.key}>
                    {onCategorySelect ? (
                      <a
                        role="button"
                        onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onCategorySelect(item.key); } }}
                        tabIndex={0}
                        onClick={(event) => {
                          event.preventDefault();
                          onCategorySelect(item.key);
                        }}
                        style={{
                          cursor: 'pointer',
                          color:
                            selectedCategoryKey === item.key ? 'var(--tp-common-white)' : undefined,
                        }}
                      >
                        {item.title}<span>({item.items})</span>
                      </a>
                    ) : (
                      <Link href="/blog">{item.title}<span>({item.items})</span></Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="sidebar__widget mb-60">
            <h3 className="sidebar__widget-title">{post_title}</h3>
            <div className="sidebar__widget-content">
              <div className="sidebar__post rc__post">
                {post_list.map((item, index) => (
                  <div key={index} className="rc__post mb-30 d-flex align-items-center">
                    <div className="rc__post-thumb mr-20">
                      <Link href={item.path}><Image src={item.img} alt={item.title} /></Link>
                    </div>
                    <div className="rc__post-content">
                      <h3 className="rc__post-title">
                        <Link href={item.path}>{item.title}</Link>
                      </h3>
                      <div className="rc__meta d-flex align-items-center">
                        <span>{item.category}</span>
                        <span className="text-2"><i>.</i>{item.date}</span>
                      </div>
                    </div>
                  </div>

                ))}
              </div>
            </div>
          </div>
          {!archiveFilterMode && (
            <div className="sidebar__widget mb-60">
              <h3 className="sidebar__widget-title">{tag_title}</h3>
              <div className="sidebar__widget-content">
                <div className="tagcloud">
                  {tags.map((item, index) => (
                    <Link href={item.link} key={index} title={item.title}>{item.title}</Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogSidebar;


