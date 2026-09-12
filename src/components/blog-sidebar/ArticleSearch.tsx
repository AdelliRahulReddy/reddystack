export default function ArticleSearch({ query = '' }: { query?: string }) {
  return (
    <form action="/blog" method="get" role="search" className="sidebar__search mb-40">
      <div className="sidebar__search-input-2">
        <input type="search" name="q" aria-label="Search articles" placeholder="Search articles…" defaultValue={query} maxLength={120} />
        <button type="submit" aria-label="Search articles">→</button>
      </div>
    </form>
  );
}
