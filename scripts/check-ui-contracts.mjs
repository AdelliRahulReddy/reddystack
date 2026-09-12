import assert from 'node:assert/strict';

const base = process.env.SEO_CHECK_BASE || 'http://localhost:3187';
const home = await (await fetch(base)).text();
assert.match(home, /aria-label="Open menu"/, 'Menu triggers must have an accessible name');
assert.match(home, /href="#main-content"/, 'Keyboard users need a skip link');
assert.match(home, /id="main-content"/, 'The skip destination must exist');
assert.ok(!home.includes('id="loading"'), 'Server-rendered content must not be covered until JavaScript loads');
const search = await (await fetch(`${base}/blog?q=facebook+ads+audit`)).text();
assert.match(search, /name="robots" content="[^"]*noindex/, 'Internal search results must not be indexed');
assert.match(search, /href="\/blog\/meta-ads\/facebook-ads-audit-checklist"/, 'Search must find the new guides');
const empty = await (await fetch(`${base}/blog?q=zznonexistenttopiczz`)).text();
assert.match(empty, /No articles found/, 'Unmatched searches need an honest empty state');
const oldArticle = await (await fetch(`${base}/blog/how-seo-websites-help-startups-get-better-leads`)).text();
assert.ok(!oldArticle.includes('Leave a Reply'), 'Do not expose the non-persisting comment form');
assert.match(oldArticle, /action="\/blog"/, 'Article search must submit to the search route');
console.log('Verified navigation labels, skip target, server-visible content, real search, search noindex and article feedback route.');
