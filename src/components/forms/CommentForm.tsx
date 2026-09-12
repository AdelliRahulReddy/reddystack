import Link from 'next/link';
export default function CommentForm() {
  return <div className="postbox__comment-form">
    <h2 className="postbox__comment-form-title">Have a question about this article?</h2>
    <p>Contact Reddystack to discuss your question or project.</p>
    <Link href="/contact" className="tp-btn-border-md">Ask Reddystack</Link>
  </div>;
}
