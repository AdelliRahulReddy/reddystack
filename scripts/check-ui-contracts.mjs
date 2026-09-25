import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const base = process.env.SEO_CHECK_BASE || 'http://localhost:3187';
const get = async (path) => (await fetch(`${base}${path}`)).text();

// The site is dark-only and has one design system: no template CSS, toggles or loaders.
const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
for (const name of ['bootstrap', 'jquery', 'wowjs', 'react-slick', 'swiper', 'lottie-react', 'react-toastify']) {
  assert.ok(!pkg.dependencies[name], `${name} must not return: the template stack was removed`);
}

const home = await get('/');
assert.match(home, /<h1[^>]*id="hv3-title"/, 'The hero heading must be server-rendered');
assert.match(home, /id="hv3-tab-visibility"[^>]*tabindex="0"/i, 'Initial diagnostic tab must be keyboard reachable');
assert.ok(!home.includes('Real feedback from people'), 'Unverified testimonial claims must not be published');
assert.match(home, /Open menu</, 'Menu triggers must have an accessible name');
assert.match(home, /href="#main"/, 'Keyboard users need a skip link');
assert.match(home, /<main id="main"/, 'The skip destination must exist');
assert.ok(!home.includes('id="loading"'), 'Server-rendered content must not be covered until JavaScript loads');
assert.ok(!/tp-theme|theme-toggle/.test(home), 'The light/dark toggle was removed; the site is dark-only');
assert.match(home, /Personal \/ demo/, 'Homepage work must be labelled as personal or demo');

// Portfolio honesty: every project page says it is personal or demo work.
for (const slug of ['kalyamram', 'multi-format-converter', 'telegram-auto-reply-bot', 'gitwall-app', 'reelsxpress', 'bachelor-brother']) {
  assert.match(await get(`/portfolio/${slug}`), /Personal \/ demo/, `${slug}: must be labelled personal / demo`);
}

// Contact: budgets in three currencies, without JavaScript-only content.
const contact = await get('/contact');
assert.match(contact, /aria-label="Budget currency"/, 'Budget currency choice must be labelled');
for (const code of ['USD', 'GBP', 'INR']) assert.match(contact, new RegExp(`>${code}<`), `${code} budgets must be offered`);
assert.match(contact, /id="contact-website"/, 'Keep the honeypot field');

const search = await get('/blog?q=facebook+ads+audit');
assert.match(search, /name="robots" content="[^"]*noindex/, 'Internal search results must not be indexed');
assert.match(search, /href="\/blog\/meta-ads\/facebook-ads-audit-checklist"/, 'Search must find the new guides');
const empty = await get('/blog?q=zznonexistenttopiczz');
assert.match(empty, /No articles found/, 'Unmatched searches need an honest empty state');
const oldArticle = await get('/blog/how-seo-websites-help-startups-get-better-leads');
assert.ok(!oldArticle.includes('Leave a Reply'), 'Do not expose the non-persisting comment form');
assert.match(oldArticle, /action="\/blog"/, 'Article search must submit to the search route');
const guide = await get('/blog/meta-ads/facebook-ads-audit-checklist');
assert.match(guide, /On this page/, 'Guides need a table of contents');
console.log('Verified dark-only system, server-rendered hero, skip target, honesty labels, currency budgets, real search, search noindex and article search.');
