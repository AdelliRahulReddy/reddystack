import HeaderFour from '@/layouts/headers/HeaderFour';
import BreadcrumbBlogDetails from './BreadcrumbBlogDetails';
import PostboxBlogDetailsArea from './PostboxBlogDetailsArea';
import FooterFour from '@/layouts/footers/FooterFour';
import type { BlogPost } from '@/data/BlogPostsData';

type BlogDetailsProps = {
  post: BlogPost;
  previousPost: BlogPost;
  nextPost: BlogPost;
  relatedPost: BlogPost | null;
};

const BlogDetails = ({ post, previousPost, nextPost, relatedPost }: BlogDetailsProps) => {
  return (
    <>
      <HeaderFour />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main id="main-content" className="rs-subpage" tabIndex={-1}>
            <BreadcrumbBlogDetails post={post} />
            <PostboxBlogDetailsArea
              post={post}
              previousPost={previousPost}
              nextPost={nextPost}
              relatedPost={relatedPost}
            />
          </main>
          <FooterFour />
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
