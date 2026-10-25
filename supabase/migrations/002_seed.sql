-- ReddyStack seed 001: services, bundle, works, settings (2026-10-25)
-- Prices approved in discussion; works classified by Rahul 2026-10-25.

INSERT INTO services (name, slug, description, includes, excludes, delivery_time, billing_type, base_price, sort_order) VALUES
('Landing page (Basic)', 'landing-page-basic',
 'One page, one job: turn visitors into enquiries.',
 'Headline + offer + WhatsApp/call/form buttons + tracking setup', 'Dashboard; multi-page site', '3-5 days', 'one_time', 4999, 1),
('Landing page (Next.js)', 'landing-page-nextjs',
 'Fast, SEO-ready landing page on a modern framework that can grow into a full site.',
 'Everything in Basic + Next.js build + SEO basics + speed optimisation', 'Dashboard', '5-7 days', 'one_time', 9999, 2),
('Website (multi-page)', 'website',
 'Full website for your business: home, services, about, contact and more.',
 'Up to 6 pages + enquiry form + WhatsApp buttons + basic SEO', 'Admin panel; booking system', '2-3 weeks', 'one_time', 24999, 3),
('Admin panel', 'admin-panel',
 'Your own control room: manage content, prices, enquiries and users.',
 'Login + dashboard + content/price/enquiry management', 'Custom integrations beyond scope', '2-4 weeks', 'one_time', 19999, 4),
('Meta ads management', 'meta-ads',
 'Facebook + Instagram ads that bring enquiries, managed monthly.',
 'Campaign setup + image creatives + weekly async optimisation + plain report', 'Ad spend (paid directly to Meta)', 'Live within days of intake', 'monthly', 9999, 5),
('SEO', 'seo',
 'Get found on Google: profile, pages and rankings, month by month.',
 'Google Business Profile + on-page SEO + rank tracking + monthly report', 'Paid ads', 'First movement in 4-8 weeks', 'monthly', 7999, 6)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO service_options (service_id, option_name, extra_price, description) VALUES
((SELECT id FROM services WHERE slug = 'landing-page-basic'), 'Add dashboard to control content', 19999, 'Admin panel add-on for this page'),
((SELECT id FROM services WHERE slug = 'landing-page-nextjs'), 'Add dashboard to control content', 19999, 'Admin panel add-on for this page');

INSERT INTO bundles (name, slug, description, fixed_price, guarantee_text) VALUES
('Enquiry Sprint', 'enquiry-sprint',
 'Your own landing page + one Meta campaign + image creatives + tracking + 7 days of async optimisation + one plain report. Sold on enquiries, not activities.',
 14999,
 'Not live with first enquiries in the agreed window? We work free until it is.')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO works (title, work_type, client_name, description, link, sort_order) VALUES
('ReelsXpress platform', 'client', 'ReelsXpress',
 'Full booking platform built with AI: admin panel, customer website, creator app and customer app — live with real users.', 'https://reelsxpress.com', 1),
('Manamantha 2.0 event ad', 'client', 'Manamantha',
 'Meta ad campaign for a live music event in Kondapur, Hyderabad.', '', 2),
('Asli Routine website', 'portfolio', '',
 'Own brand website: independent truth for Indian personal care (in validation).', 'https://asliroutine.com', 3)
ON CONFLICT DO NOTHING;

INSERT INTO settings (key, value) VALUES
('whatsapp_number', '917207022577'),
('email', 'thereddystack@gmail.com'),
('advance_percent', '50'),
('guarantee_text', 'Not live with first enquiries in the agreed window? We work free until it is.')
ON CONFLICT (key) DO NOTHING;

INSERT INTO site_content (section, title, body) VALUES
('hero', 'One stack between your ad and your enquiry.',
 'ReddyStack builds the full enquiry stack for Indian businesses — the page, the tracking, and the ads — built and run by one founder, live in days.'),
('positioning', 'ENQUIRY stack for Indian businesses',
 'WhatsApp, calls, Instagram DMs, forms — whichever door your customers actually use. India-wide, with Hyderabad as home ground.')
ON CONFLICT (section) DO NOTHING;
