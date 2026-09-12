import type { StaticImageData } from 'next/image';

import authorAvatar from '@/assets/img/hero/ab-hero-1.jpg';
import blogCoverOne from '@/assets/img/insights/how-seo-websites-help-startups-get-better-leads.png';
import blogCoverTwo from '@/assets/img/insights/landing-pages-vs-seo-websites-what-should-you-launch-first.png';
import blogCoverThree from '@/assets/img/insights/when-to-build-an-application-instead-of-a-website.png';
import blogCoverFour from '@/assets/img/insights/how-to-plan-application-features-before-development-starts.png';
import blogCoverFive from '@/assets/img/insights/how-to-scope-an-mvp-without-overbuilding.png';
import blogCoverSix from '@/assets/img/insights/what-a-founder-led-mvp-launch-needs-before-release.png';
import blogCoverSeven from '@/assets/img/insights/ai-automations-small-teams-can-actually-use.png';
import blogCoverEight from '@/assets/img/insights/prompt-engineering-for-business-workflows-that-save-time.png';

import { siteConfig } from '@/data/siteConfig';

export const blogCategories = [
  { key: 'seo-websites', label: 'SEO Websites' },
  { key: 'applications', label: 'Applications' },
  { key: 'mvp-builds', label: 'MVP Builds' },
  { key: 'ai-automations', label: 'AI Automations' },
] as const;

export type BlogCategoryKey = (typeof blogCategories)[number]['key'];

export type BlogPost = {
  slug: string;
  path: string;
  categoryKey: BlogCategoryKey;
  categoryLabel: string;
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  displayDate: string;
  monthShort: string;
  day: string;
  publishedAt: string;
  readTime: string;
  commentsCount: number;
  author: {
    name: string;
    role: string;
    avatar: StaticImageData;
    bio: string;
  };
  cardImage: StaticImageData;
  heroImage: StaticImageData;
  detailImage: StaticImageData;
  sidebarImage: StaticImageData;
  leadParagraphs: [string, string];
  sectionTitle: string;
  sectionParagraphsBeforeImage: string[];
  sectionParagraphsAfterImage: string[];
  quote: string;
  closingParagraphs: string[];
  tags: string[];
  sidebarVariant?: 'image' | 'video' | 'slider';
  sliderImages?: StaticImageData[];
  videoId?: string;
};

const rahulAuthor = {
  name: 'Rahul Reddy',
  role: 'Founder, Reddystack',
  avatar: authorAvatar,
  bio: 'Rahul Reddy leads Reddystack with a founder-led, execution-first approach to SEO websites, applications, MVP builds, and AI-assisted systems that help real businesses ship faster.',
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-seo-websites-help-startups-get-better-leads',
    path: '/blog/how-seo-websites-help-startups-get-better-leads',
    categoryKey: 'seo-websites',
    categoryLabel: 'SEO Websites',
    title: 'How SEO Websites Bring Startups Better Leads',
    excerpt:
      'A search-ready website should not just publish pages. It should help the right people discover you, understand what you do, and convert into project inquiries.',
    metaTitle: 'How SEO Websites Help Startups Get Better Leads | Reddystack',
    metaDescription:
      'Learn how SEO websites improve discovery, message clarity, and lead generation for startups that need more than a brochure site.',
    displayDate: 'April 11, 2026',
    monthShort: 'Apr',
    day: '11',
    publishedAt: '2026-04-11',
    readTime: '6 min read',
    commentsCount: 2,
    author: rahulAuthor,
    cardImage: blogCoverOne,
    heroImage: blogCoverOne,
    detailImage: blogCoverOne,
    sidebarImage: blogCoverOne,
    leadParagraphs: [
      'A lot of startup websites are visually acceptable but commercially weak. They launch with generic page structure, unclear service messaging, and no real search strategy behind them. That usually means the site looks finished while failing to generate qualified inbound opportunities.',
      'An SEO website fixes that by treating structure, content, search intent, and conversion flow as part of the build itself. The homepage, service pages, internal linking, page speed, and contact journey all work together to help the business get discovered and understood faster.',
    ],
    sectionTitle: 'What changes when SEO is built into the website from day one?',
    sectionParagraphsBeforeImage: [
      'The biggest difference is planning. Instead of designing pages first and thinking about search later, the site architecture starts with what people are actually searching for, what questions they need answered, and what pages should exist to support that journey.',
      'That usually leads to clearer service pages, stronger calls to action, better content hierarchy, and cleaner internal linking. The result is a website that can support rankings and conversions at the same time instead of forcing you to choose one over the other.',
    ],
    sectionParagraphsAfterImage: [
      'For startups, this matters because every page has to do more work. If your website is one of the few owned assets you fully control, it should support visibility, positioning, and lead capture without needing heavy manual follow-up.',
      'The practical goal is simple: attract the right traffic, reduce confusion, and make it easier for someone to become an inquiry, a booking, or a qualified lead.',
    ],
    quote:
      'An SEO website is not a content patch on top of a design. It is a build decision that changes how the whole site performs.',
    closingParagraphs: [
      'That is why Reddystack treats SEO websites as a build service, not as a separate add-on. The architecture, messaging, and technical structure all need to work together early.',
      'For founder-led brands and small teams, that usually creates a more useful website, cleaner growth loops, and a stronger lead pipeline without overcomplicating the stack.',
    ],
    tags: ['SEO Strategy', 'Website Build', 'Lead Generation'],
    sidebarVariant: 'image',
  },
  {
    slug: 'landing-pages-vs-seo-websites-what-should-you-launch-first',
    path: '/blog/landing-pages-vs-seo-websites-what-should-you-launch-first',
    categoryKey: 'seo-websites',
    categoryLabel: 'SEO Websites',
    title: 'Landing Pages vs SEO Websites',
    excerpt:
      'Both landing pages and SEO websites can help a business grow, but they solve different problems. The right choice depends on speed, offer clarity, and traffic strategy.',
    metaTitle: 'Landing Pages vs SEO Websites: What Should You Launch First? | Reddystack',
    metaDescription:
      'Understand when a landing page is enough and when a full SEO website is the better investment for lead generation and growth.',
    displayDate: 'April 7, 2026',
    monthShort: 'Apr',
    day: '07',
    publishedAt: '2026-04-07',
    readTime: '5 min read',
    commentsCount: 1,
    author: rahulAuthor,
    cardImage: blogCoverTwo,
    heroImage: blogCoverTwo,
    detailImage: blogCoverTwo,
    sidebarImage: blogCoverTwo,
    leadParagraphs: [
      'A landing page is usually the better first move when the offer is narrow, the campaign is immediate, and the business mainly needs one clear action. It is fast to launch and easier to test when you already know what the visitor should do next.',
      'A full SEO website makes more sense when the business has multiple services, wants stronger search visibility, or needs a more durable content structure that can grow with the company over time.',
    ],
    sectionTitle: 'Choose based on business need, not on page count',
    sectionParagraphsBeforeImage: [
      'If you are validating an offer, running paid traffic, or booking calls around one clear service, a landing page can move faster and reduce distraction. The visitor gets one path, one story, and one action.',
      'If you need to rank for multiple services, build trust across different buyer questions, or create a better long-term brand presence, the single-page route starts to become limiting. That is usually the point where an SEO website becomes the smarter foundation.',
    ],
    sectionParagraphsAfterImage: [
      'This is not just a design decision. It is a distribution and conversion decision. The page type should match how people will find you and how much context they need before they commit.',
      'In practice, many businesses start with one strong landing page and then grow into a structured SEO website as the offer sharpens and content needs expand.',
    ],
    quote:
      'The better question is not “Which looks better?” It is “Which launch format fits the business goal right now?”',
    closingParagraphs: [
      'At Reddystack, the decision usually comes down to urgency, scope, and traffic source. A small launch should stay lean. A long-term acquisition asset needs stronger structure.',
      'Picking the right one first saves time, avoids rework, and helps the build stay commercially useful instead of becoming a design exercise.',
    ],
    tags: ['Landing Pages', 'SEO Websites', 'Launch Strategy'],
    sidebarVariant: 'video',
    videoId: 'qmGYnJgCW1o',
  },
  {
    slug: 'when-to-build-an-application-instead-of-a-website',
    path: '/blog/when-to-build-an-application-instead-of-a-website',
    categoryKey: 'applications',
    categoryLabel: 'Applications',
    title: 'When to Build an Application',
    excerpt:
      'Not every product needs an application first. But once the user needs repeat actions, account logic, or workflow depth, a website alone stops being enough.',
    metaTitle: 'When to Build an Application Instead of a Website | Reddystack',
    metaDescription:
      'Learn the signals that tell you a product or business needs an application instead of just a marketing website.',
    displayDate: 'April 3, 2026',
    monthShort: 'Apr',
    day: '03',
    publishedAt: '2026-04-03',
    readTime: '7 min read',
    commentsCount: 0,
    author: rahulAuthor,
    cardImage: blogCoverThree,
    heroImage: blogCoverThree,
    detailImage: blogCoverThree,
    sidebarImage: blogCoverThree,
    leadParagraphs: [
      'A website is mainly for explanation, positioning, and conversion. An application is for action. The difference becomes obvious when users need dashboards, recurring interactions, saved data, permissions, or step-by-step workflows that a marketing site cannot realistically handle.',
      'A lot of founders build too much application logic too early. Others stay on brochure-style websites for too long and force people through awkward manual processes. The right answer depends on the behavior the user actually needs to complete.',
    ],
    sectionTitle: 'Look for repeated user actions, not just feature ambition',
    sectionParagraphsBeforeImage: [
      'If the product requires sign-in, user state, form-driven workflows, internal tools, or repeated operational tasks, you are usually past website territory. That is where an application starts creating leverage because the product needs interaction, not just information.',
      'The opposite is also true. If most of the work is still educating the buyer, generating leads, or validating the offer, forcing an application build too soon usually slows the business down and creates unnecessary complexity.',
    ],
    sectionParagraphsAfterImage: [
      'The strongest path is often sequencing. Start with the website when clarity and demand are the main challenges. Move into the application once user behavior justifies the added complexity.',
      'That gives the business a cleaner build path and reduces the risk of sinking time into features before the core problem is well understood.',
    ],
    quote:
      'Applications become necessary when the user journey depends on repeated actions, stored state, or workflow depth that a website cannot support cleanly.',
    closingParagraphs: [
      'For Reddystack clients, the key decision is not what feels more impressive. It is which product surface matches the real business stage and user need.',
      'That keeps the implementation lean, the roadmap clearer, and the end result easier to launch with confidence.',
    ],
    tags: ['Applications', 'Product Planning', 'Build Decisions'],
    sidebarVariant: 'slider',
    sliderImages: [blogCoverThree, blogCoverThree, blogCoverThree],
  },
  {
    slug: 'how-to-plan-application-features-before-development-starts',
    path: '/blog/how-to-plan-application-features-before-development-starts',
    categoryKey: 'applications',
    categoryLabel: 'Applications',
    title: 'How to Plan Application Features Before Development Starts',
    excerpt:
      'Feature planning is not about making a longer list. It is about reducing ambiguity before engineering time gets spent in the wrong places.',
    metaTitle: 'How to Plan Application Features Before Development Starts | Reddystack',
    metaDescription:
      'A practical guide to prioritizing application features, user flows, and release scope before development begins.',
    displayDate: 'March 29, 2026',
    monthShort: 'Mar',
    day: '29',
    publishedAt: '2026-03-29',
    readTime: '6 min read',
    commentsCount: 3,
    author: rahulAuthor,
    cardImage: blogCoverFour,
    heroImage: blogCoverFour,
    detailImage: blogCoverFour,
    sidebarImage: blogCoverFour,
    leadParagraphs: [
      'A weak planning phase usually shows up later as missed deadlines, unclear product decisions, or features that looked useful on paper but do not improve the user journey. The earlier the scope is clarified, the less waste the build will carry.',
      'Good application planning does not try to define everything forever. It focuses on key flows, core roles, critical screens, and release boundaries so the first version is understandable to both the team and the user.',
    ],
    sectionTitle: 'Define the first release around one useful user outcome',
    sectionParagraphsBeforeImage: [
      'Before development starts, the team should know what the user is trying to achieve, what actions matter most, and which screens are essential for that outcome. That becomes the base for deciding which features belong in version one and which can wait.',
      'When every feature is treated as urgent, planning stops being strategic. The product becomes harder to estimate, harder to explain, and harder to ship cleanly.',
    ],
    sectionParagraphsAfterImage: [
      'A better process is to map the primary user flow, identify blockers, and create a lean first release around that one path. Secondary features can still be valuable, but they should not control the schedule.',
      'This is where founder-led execution helps. The build stays aligned to business intent instead of drifting into abstract product wish lists.',
    ],
    quote:
      'Feature planning is not about writing more items. It is about protecting the release from ambiguity and unnecessary scope.',
    closingParagraphs: [
      'Reddystack treats this step as part of delivery, not an optional pre-project ritual. Better planning shortens the path to something usable.',
      'That usually means clearer implementation, better launch confidence, and fewer expensive pivots in the middle of development.',
    ],
    tags: ['Feature Planning', 'Applications', 'Founder-Led Delivery'],
    sidebarVariant: 'image',
  },
  {
    slug: 'how-to-scope-an-mvp-without-overbuilding',
    path: '/blog/how-to-scope-an-mvp-without-overbuilding',
    categoryKey: 'mvp-builds',
    categoryLabel: 'MVP Builds',
    title: 'How to Scope an MVP Without Overbuilding',
    excerpt:
      'Most MVPs fail scope before they fail market. The goal is not to build less randomly. It is to build only what earns the right to exist in version one.',
    metaTitle: 'How to Scope an MVP Without Overbuilding | Reddystack',
    metaDescription:
      'Learn how to scope an MVP around validation, release speed, and core user value instead of feature bloat.',
    displayDate: 'March 25, 2026',
    monthShort: 'Mar',
    day: '25',
    publishedAt: '2026-03-25',
    readTime: '6 min read',
    commentsCount: 1,
    author: rahulAuthor,
    cardImage: blogCoverFive,
    heroImage: blogCoverFive,
    detailImage: blogCoverFive,
    sidebarImage: blogCoverFive,
    leadParagraphs: [
      'An MVP should answer one clear business question. Can users understand the product, complete the core journey, and show enough signal to justify iteration? When scope is shaped around that question, the release gets faster and the product stays easier to improve later.',
      'Overbuilding happens when founders try to satisfy future edge cases before version one has even faced real users. The result is usually slower launch, weaker feedback, and a product that still has not proven its core value.',
    ],
    sectionTitle: 'Scope around proof, not around possibility',
    sectionParagraphsBeforeImage: [
      'A solid MVP includes the minimum feature set required for the product to be useful, testable, and understandable. Anything outside that core path should have a clear reason for existing in the first release.',
      'That means prioritizing the main flow, the basic onboarding logic, the necessary data states, and enough polish to make the product credible without pretending it is fully mature.',
    ],
    sectionParagraphsAfterImage: [
      'This is also where execution speed matters. If the team can move fast with a controlled scope, launch happens sooner and the product starts learning earlier.',
      'That is one reason Reddystack leans into AI-assisted workflows and Vibe Coding when it helps accelerate a focused MVP build without lowering clarity.',
    ],
    quote:
      'The first version wins when it proves the core value quickly, not when it simulates a finished product.',
    closingParagraphs: [
      'Good MVP scope is disciplined. It protects the product from premature complexity and keeps the launch focused on evidence instead of assumptions.',
      'That gives founders a better chance of learning from the market while there is still enough speed and budget left to adapt.',
    ],
    tags: ['MVP Builds', 'Validation', 'Lean Scope'],
    sidebarVariant: 'image',
  },
  {
    slug: 'what-a-founder-led-mvp-launch-needs-before-release',
    path: '/blog/what-a-founder-led-mvp-launch-needs-before-release',
    categoryKey: 'mvp-builds',
    categoryLabel: 'MVP Builds',
    title: 'What a Founder-Led MVP Launch Needs Before Release',
    excerpt:
      'Shipping fast matters, but a first launch still needs the basics in place: positioning, flows, fallback plans, and a clear next-step path after users arrive.',
    metaTitle: 'What a Founder-Led MVP Launch Needs Before Release | Reddystack',
    metaDescription:
      'A practical pre-launch checklist for founder-led MVPs that need clarity, speed, and fewer avoidable launch issues.',
    displayDate: 'March 19, 2026',
    monthShort: 'Mar',
    day: '19',
    publishedAt: '2026-03-19',
    readTime: '5 min read',
    commentsCount: 0,
    author: rahulAuthor,
    cardImage: blogCoverSix,
    heroImage: blogCoverSix,
    detailImage: blogCoverSix,
    sidebarImage: blogCoverSix,
    leadParagraphs: [
      'A founder-led MVP launch does not need enterprise ceremony, but it still needs discipline. The product should have a clear promise, a usable flow, and enough internal visibility that issues can be caught and handled quickly after release.',
      'Launches break down when the team is focused only on coding the product and forgets the surrounding pieces: onboarding clarity, error handling, response flows, support expectations, and what happens after someone first uses the product.',
    ],
    sectionTitle: 'Launch readiness is more than finishing development',
    sectionParagraphsBeforeImage: [
      'Before release, the team should know the core user journey, the conversion goal, the minimum onboarding experience, and how feedback will be captured. That is the operational side of a launch, and it matters as much as the interface itself.',
      'Founders also need a simple decision rule for what counts as success in the early days. That could be signups, booked calls, completed workflows, or some other direct signal tied to the product’s intended value.',
    ],
    sectionParagraphsAfterImage: [
      'The benefit of founder-led execution is speed. Decisions happen faster, tradeoffs stay visible, and release blockers are easier to remove. But speed still works best when the launch has a defined shape.',
      'That is why the cleanest MVP releases usually feel simple on the surface and well controlled behind the scenes.',
    ],
    quote:
      'A fast MVP launch still needs a plan for what the user sees, what the team watches, and what happens next after the first interaction.',
    closingParagraphs: [
      'At Reddystack, release planning is treated as part of the build. It helps the first version land with more confidence and fewer preventable mistakes.',
      'That makes the launch more useful as a learning event instead of just a deadline that got hit.',
    ],
    tags: ['MVP Launch', 'Founder-Led Execution', 'Release Planning'],
    sidebarVariant: 'image',
  },
  {
    slug: 'ai-automations-small-teams-can-actually-use',
    path: '/blog/ai-automations-small-teams-can-actually-use',
    categoryKey: 'ai-automations',
    categoryLabel: 'AI Automations',
    title: 'AI Automations Small Teams Can Actually Use',
    excerpt:
      'The best automations are not flashy demos. They remove repetitive work, reduce follow-up delay, and give small teams more operational consistency.',
    metaTitle: 'AI Automations Small Teams Can Actually Use | Reddystack',
    metaDescription:
      'Practical AI automation ideas for lean teams that want to save time, reduce manual steps, and improve operational flow.',
    displayDate: 'March 14, 2026',
    monthShort: 'Mar',
    day: '14',
    publishedAt: '2026-03-14',
    readTime: '6 min read',
    commentsCount: 4,
    author: rahulAuthor,
    cardImage: blogCoverSeven,
    heroImage: blogCoverSeven,
    detailImage: blogCoverSeven,
    sidebarImage: blogCoverSeven,
    leadParagraphs: [
      'Small teams rarely need experimental AI for the sake of experimentation. They need systems that handle repetitive tasks, reduce missed follow-up, and make operations less dependent on memory or manual checklists.',
      'That could mean routing leads, drafting replies, organizing internal requests, turning form inputs into structured next steps, or helping content and support workflows move faster with less friction.',
    ],
    sectionTitle: 'Practical automation starts with workflow clarity',
    sectionParagraphsBeforeImage: [
      'The first step is not picking tools. It is understanding where the current process loses time, consistency, or visibility. Once that is clear, automation can be designed around a real operational need instead of a generic AI trend.',
      'For many businesses, the best early wins are around intake, follow-up, content operations, internal task movement, and structured response generation. These are repetitive enough to benefit from automation and common enough to matter quickly.',
    ],
    sectionParagraphsAfterImage: [
      'This is why Reddystack treats AI automations as workflow systems. The value is not the model alone. The value is the handoff logic, the trigger, the output quality, and the business action that becomes easier after the automation runs.',
      'Small improvements in these areas often have a bigger payoff than one large but fragile automation attempt.',
    ],
    quote:
      'AI automation becomes useful when it removes real operational friction, not when it adds another clever layer to an already messy process.',
    closingParagraphs: [
      'Lean teams benefit most from systems that are simple to trust and easy to maintain. That usually means a smaller, more focused automation stack with clear business intent.',
      'The result is faster execution, fewer dropped tasks, and a workflow that is easier to scale without adding unnecessary headcount.',
    ],
    tags: ['AI Automations', 'Small Teams', 'Operational Workflows'],
    sidebarVariant: 'image',
  },
  {
    slug: 'prompt-engineering-for-business-workflows-that-save-time',
    path: '/blog/prompt-engineering-for-business-workflows-that-save-time',
    categoryKey: 'ai-automations',
    categoryLabel: 'AI Automations',
    title: 'Prompt Engineering for Business Workflows That Save Time',
    excerpt:
      'Prompt engineering becomes commercially useful when it improves workflow quality, reduces back-and-forth, and creates more consistent outputs in day-to-day operations.',
    metaTitle: 'Prompt Engineering for Business Workflows That Save Time | Reddystack',
    metaDescription:
      'See how prompt engineering supports better AI workflows for content, operations, support, and internal process execution.',
    displayDate: 'March 8, 2026',
    monthShort: 'Mar',
    day: '08',
    publishedAt: '2026-03-08',
    readTime: '5 min read',
    commentsCount: 2,
    author: rahulAuthor,
    cardImage: blogCoverEight,
    heroImage: blogCoverEight,
    detailImage: blogCoverEight,
    sidebarImage: blogCoverEight,
    leadParagraphs: [
      'Prompt engineering is often framed like a trick for getting better chatbot answers. In a business context, it is more useful than that. It becomes part of workflow design, especially when a team wants outputs that are more structured, more reusable, and easier to trust.',
      'That matters in operations, support, content, lead handling, and internal documentation. The goal is not just a “better answer.” The goal is a better process that produces more consistent outputs with less manual rewriting.',
    ],
    sectionTitle: 'Good prompts are workflow assets, not one-off experiments',
    sectionParagraphsBeforeImage: [
      'When prompts are written inside a workflow, they should reflect the real task, the business context, and the expected output format. That makes them easier to reuse across intake forms, internal assistants, content systems, and automation sequences.',
      'Weak prompts create noisy outputs and extra cleanup work. Strong prompts reduce ambiguity and make AI more practical inside the team’s actual process.',
    ],
    sectionParagraphsAfterImage: [
      'This is where prompt engineering overlaps with automation design. The prompt is one part of the system, but it becomes more valuable when it is connected to triggers, data inputs, approvals, and clear next actions.',
      'For businesses, that usually means time saved, cleaner handoffs, and less inconsistency across repeated tasks.',
    ],
    quote:
      'Prompt engineering matters most when it improves the workflow around the answer, not just the answer itself.',
    closingParagraphs: [
      'That is why Reddystack treats prompt engineering as part of practical delivery. It should support operations, not exist as an isolated AI experiment.',
      'Used correctly, it becomes a leverage layer inside automation systems that lean teams can actually maintain.',
    ],
    tags: ['Prompt Engineering', 'AI Workflows', 'Automation Systems'],
    sidebarVariant: 'image',
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogCategoriesWithPosts() {
  return blogCategories.map((category) => ({
    ...category,
    posts: blogPosts.filter((post) => post.categoryKey === category.key),
  }));
}

export function getRecentBlogPosts(limit = 3) {
  return blogPosts.slice(0, limit);
}

export function getUniqueBlogTags(limit = 8) {
  return Array.from(new Set(blogPosts.flatMap((post) => post.tags))).slice(0, limit);
}

export function getAdjacentBlogPosts(slug: string) {
  const currentIndex = blogPosts.findIndex((post) => post.slug === slug);

  if (currentIndex === -1) {
    return {
      previousPost: null,
      nextPost: null,
    };
  }

  return {
    previousPost: blogPosts[(currentIndex - 1 + blogPosts.length) % blogPosts.length],
    nextPost: blogPosts[(currentIndex + 1) % blogPosts.length],
  };
}

export function getRelatedBlogPosts(slug: string, limit = 1) {
  const currentPost = getBlogPost(slug);

  if (!currentPost) {
    return [];
  }

  const sameCategoryPosts = blogPosts.filter(
    (post) => post.slug !== slug && post.categoryKey === currentPost.categoryKey,
  );

  if (sameCategoryPosts.length >= limit) {
    return sameCategoryPosts.slice(0, limit);
  }

  const fallbackPosts = blogPosts.filter(
    (post) => post.slug !== slug && post.categoryKey !== currentPost.categoryKey,
  );

  return [...sameCategoryPosts, ...fallbackPosts].slice(0, limit);
}

export function getSidebarListingPosts() {
  return blogPosts;
}

export function getBlogCategoryCounts() {
  return blogCategories.map((category) => ({
    key: category.key,
    title: category.label,
    items: blogPosts.filter((post) => post.categoryKey === category.key).length,
  }));
}

export const blogSocialLinks = [
  {
    id: 1,
    title: 'X',
    link: siteConfig.socialLinks.x,
  },
  {
    id: 2,
    title: 'LinkedIn',
    link: siteConfig.socialLinks.linkedin,
  },
  {
    id: 3,
    title: 'Telegram',
    link: siteConfig.socialLinks.telegram,
  },
] as const;
