export type LayerKey = 'web' | 'search' | 'paid' | 'creative' | 'tracking' | 'automation';

export const stackLayers: { key: LayerKey; label: string }[] = [
  { key: 'web', label: 'Website' },
  { key: 'search', label: 'Search' },
  { key: 'paid', label: 'Paid ads' },
  { key: 'creative', label: 'Creative' },
  { key: 'tracking', label: 'Tracking' },
  { key: 'automation', label: 'Automation' },
];

export type Problem = {
  id: 'visibility' | 'conversion' | 'measurement';
  letter: string;
  title: string;
  detail: string;
  firstStep: string;
  body: string;
  layers: LayerKey[];
};

export const problems: Problem[] = [
  {
    id: 'visibility',
    letter: 'A',
    title: "People aren't finding us",
    detail: 'Search and local discovery feel quiet.',
    firstStep: 'Check what customers see when they search.',
    body: 'Audit search visibility, local listings and the pages that should rank. Fix the foundations first, then decide whether paid search should fill the gap while SEO catches up.',
    layers: ['web', 'search', 'paid'],
  },
  {
    id: 'conversion',
    letter: 'B',
    title: "Visitors aren't enquiring",
    detail: 'Traffic arrives, then leaves.',
    firstStep: 'Review the journey from first click to enquiry.',
    body: 'Walk the path a real visitor takes: the ad or search result, the landing page, the offer and the form. Fix the weakest step before buying more traffic.',
    layers: ['web', 'creative', 'tracking'],
  },
  {
    id: 'measurement',
    letter: 'C',
    title: "We can't tell what's working",
    detail: "Spend and enquiries don't connect.",
    firstStep: 'Check the tracking before raising ad spend.',
    body: 'Confirm which enquiries come from which channel, repair the events that matter and agree one number to judge the next test by.',
    layers: ['tracking', 'paid', 'automation'],
  },
];

export type Capability = {
  key: LayerKey;
  kicker: string;
  title: string;
  body: string;
  links: { title: string; href: string }[];
};

export const capabilities: Capability[] = [
  {
    key: 'web',
    kicker: '01 — FOUNDATION',
    title: 'Website & landing pages',
    body: 'Fast, clear pages that explain who you help and what to do next. Built so ads and search have somewhere worth sending people.',
    links: [
      { title: 'Website development', href: '/service/seo-websites' },
      { title: 'Landing pages', href: '/landing-page-development-for-lead-generation' },
      { title: 'Redesigns', href: '/website-redesign-services' },
    ],
  },
  {
    key: 'search',
    kicker: '02 — DISCOVERY',
    title: 'SEO & local search',
    body: 'Technical fixes, useful pages and local visibility, so the right people find you while they are already looking.',
    links: [
      { title: 'SEO & Local SEO', href: '/service/seo-local-seo' },
      { title: 'SEO services', href: '/seo-services' },
    ],
  },
  {
    key: 'paid',
    kicker: '03 — ACQUISITION',
    title: 'Meta & Google Ads',
    body: 'Campaigns with a clear offer, a budget boundary and a measured goal. Ad spend stays in your account and under your control.',
    links: [
      { title: 'Meta Ads', href: '/service/meta-ads' },
      { title: 'Google Ads', href: '/service/google-ads' },
      { title: 'PPC audit', href: '/ppc-audit' },
    ],
  },
  {
    key: 'creative',
    kicker: '04 — PERSUASION',
    title: 'Ad creative & AI video',
    body: 'Static ads and AI UGC-style videos made to test one message against another, with AI use stated openly.',
    links: [
      { title: 'Ad creatives', href: '/service/ad-creatives' },
      { title: 'AI UGC-style videos', href: '/service/ai-ugc-videos' },
    ],
  },
  {
    key: 'tracking',
    kicker: '05 — EVIDENCE',
    title: 'Tracking & analytics',
    body: 'Conversion events you can trust, tied to real enquiries, so decisions come from evidence rather than dashboards alone.',
    links: [{ title: 'Discuss tracking', href: '/contact?service=seo-websites&source=/' }],
  },
  {
    key: 'automation',
    kicker: '06 — LEVERAGE',
    title: 'AI automation & builds',
    body: 'Chatbots, lead routing and small internal tools that remove repeated work once the process is clear.',
    links: [
      { title: 'AI automation', href: '/ai-automation' },
      { title: 'Chatbots', href: '/ai-chatbot-development' },
      { title: 'MVPs', href: '/service/mvp-builds' },
    ],
  },
];

export const processSteps = [
  { n: '01', title: 'Diagnose', body: 'Agree one goal, review the current setup and record a baseline.', output: 'scope & quote' },
  { n: '02', title: 'Build', body: 'Make the fix: a page, a campaign, a tracking plan or a workflow.', output: 'working build' },
  { n: '03', title: 'Prove', body: "Run it, read the real signal and write down what it does and doesn't show.", output: 'evidence review' },
  { n: '04', title: 'Scale', body: 'Put more budget or scope behind only what earned it.', output: 'next decision' },
] as const;

export const engagements = [
  {
    id: 'sprint',
    kind: 'Bounded',
    title: 'Proof Sprint',
    body: 'Solve or test one clear growth problem, then review the evidence together.',
    points: ['One problem, one decision', 'Baseline recorded first', 'Evidence summary at the end'],
    cta: 'Discuss a sprint',
    href: '/contact?service=proof-sprint&source=/',
    featured: true,
  },
  {
    id: 'build',
    kind: 'Project',
    title: 'Stack Build',
    body: 'Build the connected pieces your plan needs: site, search, ads, creative or tracking.',
    points: ['Several layers, one plan', 'Defined deliverables', 'Clean handover of accounts'],
    cta: 'Plan a build',
    href: '/contact?service=seo-websites&source=/',
    featured: false,
  },
  {
    id: 'operate',
    kind: 'Ongoing',
    title: 'Operate & Improve',
    body: "Review results on a set rhythm and improve what's working.",
    points: ['Agreed priorities', 'Regular reporting', 'Tests, not guesses'],
    cta: 'Discuss ongoing work',
    href: '/contact?service=not_sure&source=/',
    featured: false,
  },
] as const;

export const signals = [
  { label: '“plumber near me”', color: 'var(--lime)', pos: { left: '3%', top: '9%' }, delay: '-1s' },
  { label: 'Meta · reel view', color: 'var(--violet-soft)', pos: { right: '3%', top: '15%' }, delay: '-3s' },
  { label: 'Google · ad click', color: 'var(--coral)', pos: { left: '3%', top: '66%' }, delay: '-2s' },
  { label: 'Newsletter reply', color: 'var(--ivory)', pos: { right: '3%', top: '77%' }, delay: '-4s' },
  { label: 'Referral link', color: 'var(--lime)', pos: { left: '18%', top: '93%' }, delay: '-5s' },
] as const;

export const marqueeItems = [
  'Websites & landing pages',
  'SEO & local search',
  'Meta Ads',
  'Google Ads',
  'Ad creative',
  'AI UGC-style video',
  'Conversion tracking',
  'AI automation',
];
