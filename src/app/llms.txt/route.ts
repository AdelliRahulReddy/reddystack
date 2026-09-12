import { intentLandingPages } from "@/data/IntentLandingPagesData";
import { blogPosts } from "@/data/BlogPostsData";
import { seoPages } from "@/data/SeoPagesData";
import { portfolioProjects } from "@/data/PortfolioProjectsData";
import { serviceDetailData, primaryServices, primaryServiceSlugs } from "@/data/ServiceDetailData";
import { siteConfig } from "@/data/siteConfig";

const line = (title: string, path: string, description: string) =>
  `- [${title}](${siteConfig.siteUrl}${path}): ${description}`;

export function GET() {
  const sections = [
    "# Reddystack",
    "",
    `> ${siteConfig.description}`,
    "",
    "Founder-led by Rahul Reddy Adelli, Reddystack serves local service businesses and growing brands from Hyderabad across India and worldwide. Apps, MVPs, chatbots, and automation are additional services available on request. Use the canonical pages below for service details and scope.",
    "",
    "## Core Pages",
    line("Home", "/", "Overview of Reddystack services, proof, FAQs, and contact paths."),
    line("About", "/about", "Founder background and the Reddystack delivery approach."),
    line("Services", "/service", "Meta Ads, Google Ads, Ad Creatives, AI UGC-style Videos, Website Development, and SEO & Local SEO."),
    line("Pricing", "/pricing", "Custom quotes, scope, deliverables, and separate platform costs."),
    line("Portfolio", "/portfolio", "Selected shipped projects and digital product work."),
    line("Insights", "/blog", "Guides about ads, creative production, AI video, websites and SEO."),
    line("Founder", "/about/rahul-reddy-adelli", "Rahul Reddy Adelli and the Reddystack delivery approach."),
    line("Contact", "/contact", "Project inquiry page for new work."),
    "",
    "## Primary Services",
    ...primaryServices.map((service) =>
      line(service.title, service.path, service.metaDescription),
    ),
    "",
    "## Additional Services",
    ...serviceDetailData.filter((service) => !primaryServiceSlugs.includes(service.slug)).map((service) =>
      line(service.title, service.path, service.metaDescription),
    ),
    "",
    "## Related Service Guides",
    ...intentLandingPages.map((page) =>
      line(page.navLabel, page.path, page.metaDescription),
    ),
    "",
    "## Articles",
    ...blogPosts.map((post) => line(post.title, post.path, post.metaDescription)),
    ...seoPages.filter((page) => page.kind === 'guide' || page.kind === 'hub').map((page) => line(page.title, page.path, page.description)),
    "",
    "## Projects",
    ...portfolioProjects.map((project) =>
      line(project.title, project.path, project.metaDescription),
    ),
    "",
    "## Trust Pages",
    line("Privacy Policy", "/privacy-policy", "How Reddystack handles inquiry, analytics, and contact data."),
    line("Terms of Service", "/terms", "Basic website and scoped service terms."),
    line("Revision and Refund Policy", "/revision-policy", "Guidance for revisions, cancellations, and refunds on scoped service work."),
    "",
    "## Contact",
    `- Email: ${siteConfig.email}`,
    `- Phone: ${siteConfig.phoneDisplay}`,
    `- Location: ${siteConfig.location}`,
  ];

  return new Response(`${sections.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
