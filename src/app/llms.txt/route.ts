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
    "# ReddyStack",
    "",
    `> ${siteConfig.description}`,
    "",
    "ReddyStack is a proof-first digital growth studio built and led by Rahul Reddy Adelli from Hyderabad, serving companies in India and worldwide. It starts with one measurable growth problem, connects only the capabilities required, and records evidence before recommending more scope or budget. AI supports delivery transparently while Rahul remains accountable. Use the canonical pages below for the method, capabilities, work, and engagement details.",
    "",
    "## Core Pages",
    line("Home", "/", "ReddyStack positioning, connected capabilities, proof-first method, engagement models, work, FAQs, and contact paths."),
    line("About", "/about", "Rahul Reddy, operating principles, transparent AI use, and the ReddyStack accountability model."),
    line("Capabilities", "/service", "Web, search, paid acquisition, creative, tracking, automation, and product capabilities selected around one growth problem."),
    line("Ways to Work", "/pricing", "Proof Sprint, Stack Build, and Operate and Improve engagement models with custom scope."),
    line("Work", "/portfolio", "Clearly labelled personal and demo builds with context, implementation decisions, and stated limitations."),
    line("Insights", "/blog", "Practical guides about web, search, paid acquisition, creative testing, measurement, and automation."),
    line("Founder", "/about/rahul-reddy-adelli", "Rahul Reddy Adelli and the ReddyStack delivery approach."),
    line("Contact", "/contact", "Start with one digital growth problem; no service selection is required before enquiry."),
    "",
    "## Core Capabilities",
    ...primaryServices.map((service) =>
      line(service.title, service.path, service.metaDescription),
    ),
    "",
    "## Extended Capabilities",
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
    line("Privacy Policy", "/privacy-policy", "How ReddyStack handles inquiry, analytics, and contact data."),
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
