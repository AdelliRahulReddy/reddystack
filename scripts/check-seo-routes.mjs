import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const base = process.env.SEO_CHECK_BASE || 'http://localhost:3187';
const origin = 'https://www.reddystack.com';
const socialRedirect = await fetch(`${base}/social-media-marketing`, { redirect: 'manual' });
assert.equal(socialRedirect.status, 308, 'Legacy social marketing URL must redirect permanently');
assert.equal(new URL(socialRedirect.headers.get('location'), base).pathname, '/service', 'Redirect to the relevant service overview');
const sitemapResponse = await fetch(`${base}/sitemap.xml`);
assert.equal(sitemapResponse.status, 200, 'Sitemap must load');
const xml = await sitemapResponse.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap URLs');
for (const path of ['/blog/meta-ads', '/blog/meta-ads/facebook-ads-audit-checklist', '/about/rahul-reddy-adelli']) {
  const response = await fetch(`${base}${path}`, { redirect: 'manual' });
  assert.equal(response.status, 200, `${path} must resolve`);
  assert.ok(urls.includes(`${origin}${path}`), `${path} must be in the sitemap`);
}

const titles = new Map();
const descriptions = new Map();
const iconCss = await readFile(new URL('../public/assets/css/font-awesome-pro.css', import.meta.url), 'utf8');
const pages = JSON.parse(await readFile(new URL('../src/data/seo-pages.json', import.meta.url), 'utf8'));
for (const page of pages) {
  assert.match(page.path, /^\/[a-z0-9]+(?:[/-][a-z0-9]+)*$/, `Clean slug: ${page.path}`);
  assert.ok(urls.includes(`${origin}${page.path}`), `Unlisted page: ${page.path}`);
  const ancestors = new Set([page.path]);
  let parent = page.parent;
  while (parent !== '/') {
    assert.ok(!ancestors.has(parent), `Parent cycle: ${page.path}`);
    ancestors.add(parent);
    assert.ok(urls.includes(`${origin}${parent}`), `Missing parent: ${parent}`);
    parent = pages.find((candidate) => candidate.path === parent)?.parent || '/';
  }
  for (const link of page.sections.flatMap((section) => section.links || [])) {
    if (link.path.startsWith('/')) assert.ok(urls.includes(`${origin}${link.path}`), `Unpublished link: ${page.path} -> ${link.path}`);
    else assert.match(link.path, /^https:\/\//, 'External references must use HTTPS');
  }
}
for (const url of urls) {
  assert.ok(url.startsWith(`${origin}/`), `Wrong sitemap origin: ${url}`);
  const path = new URL(url).pathname;
  const response = await fetch(`${base}${path}`, { redirect: 'manual' });
  assert.equal(response.status, 200, `${path}: status`);
  const html = await response.text();
  for (const match of html.matchAll(/class="([^"]*)"/g)) {
    for (const name of match[1].split(/\s+/).filter((name) => name.startsWith('fa-') && name !== 'fa-sharp')) {
      assert.ok(iconCss.includes(`.${name}`), `${path}: missing icon definition ${name}`);
    }
  }
  assert.doesNotMatch(html, /(?:blog-list-avata-1|user24|user-1|avata-[123]|port-details-2|ab-circle-img|footer-circle-img|contact-flower(?:-text)?|sv-details(?:-[12])?|services-slider-[1-4]|blog-details-big-img|blog-standard-[1-4]|blog-list-[1-7](?:-[12])?|blog-[123](?:-[123]){0,2}|sidebar-[12]|hero-img|logo-black)(?:\.|%2E)/i, `${path}: retired template image reference`);
  for (const [attribute, tag] of [['property', 'og:image'], ['name', 'twitter:image']]) {
    const image = html.match(new RegExp(`<meta ${attribute}="${tag}" content="([^"]+)"`))?.[1];
    assert.ok(image?.startsWith(`${origin}/`), `${path}: ${tag} must use an absolute site image URL`);
    assert.ok(!image.includes('/hero/hero-img.png'), `${path}: ${tag} still uses the Diego portrait`);
    assert.doesNotMatch(image, /reddystack-share-v[123]/, `${path}: ${tag} still uses a retired brand card`);
  }
  assert.ok(!html.includes('/assets/img/logo/logo-black.png'), `${path}: outdated Diego logo reference`);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${path}: one H1`);
  assert.ok(!/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/.test(html), `${path}: noindex`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.equal(canonical && new URL(canonical).href, new URL(url).href, `${path}: canonical`);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  assert.ok(title, `${path}: title missing`);
  assert.match(title, /Reddystack/, `${path}: title must identify the brand`);
  assert.ok(!titles.has(title), `${path}: duplicate title with ${titles.get(title)}`);
  titles.set(title, path);
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert.ok(description, `${path}: description missing`);
  assert.ok(!descriptions.has(description), `${path}: duplicate description with ${descriptions.get(description)}`);
  descriptions.set(description, path);
  for (const [attribute, prefix] of [['property', 'og'], ['name', 'twitter']]) {
    assert.equal(html.match(new RegExp(`<meta ${attribute}="${prefix}:title" content="([^"]+)"`))?.[1], title, `${path}: ${prefix} title`);
    assert.equal(html.match(new RegExp(`<meta ${attribute}="${prefix}:description" content="([^"]+)"`))?.[1], description, `${path}: ${prefix} description`);
  }
  assert.match(html, /<meta name="googlebot" content="[^"]*max-image-preview:large/, `${path}: inherit image-preview permission`);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((match) => JSON.parse(match[1]));
  const organization = schemas.find((schema) => schema['@type'] === 'Organization');
  assert.equal(organization?.['@id'], `${origin}/#organization`, `${path}: publisher identity`);
  assert.equal(organization.logo?.url, `${origin}/assets/img/logo/reddystack-symbol.png`, `${path}: approved organization logo`);
  assert.match(html, /reddystack-symbol[^"\s<>]*\.svg/, `${path}: approved visible brand symbol`);
  assert.equal(organization.hasOfferCatalog?.['@type'], 'OfferCatalog', `${path}: service catalog schema`);
  assert.ok(!organization.makesOffer, `${path}: OfferCatalog is not an Offer`);
  assert.equal(organization.founder.url, `${origin}/about/rahul-reddy-adelli`, `${path}: founder profile`);
}
for (const path of ['/blog/not-a-real-category', '/blog/meta-ads/not-a-real-guide', '/blog/google-ads/facebook-ads-audit-checklist', '/service/meta-ads/not-a-service', '/locations/not-a-market']) {
  assert.equal((await fetch(`${base}${path}`, { redirect: 'manual' })).status, 404, `${path}: must be 404`);
}
console.log(`Verified ${urls.length} sitemap pages: status, canonical, unique branded metadata, social cards, H1, indexability, publisher schema and unknown-route 404s.`);
