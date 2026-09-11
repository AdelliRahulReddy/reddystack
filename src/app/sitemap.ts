import { siteConfig } from "@/data/siteConfig";
import { serviceDetailData } from "@/data/ServiceDetailData";
import { blogPosts } from "@/data/BlogPostsData";
import { intentLandingPages } from "@/data/IntentLandingPagesData";
import { portfolioProjects } from "@/data/PortfolioProjectsData";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routeConfig: Array<{
    path: string;
    changeFrequency: "weekly" | "monthly" | "yearly";
    priority: number;
  }> = [
      { path: "", changeFrequency: "weekly", priority: 1 },
      { path: "/about", changeFrequency: "monthly", priority: 0.8 },
      { path: "/service", changeFrequency: "monthly", priority: 0.85 },
      { path: "/portfolio", changeFrequency: "monthly", priority: 0.85 },
      { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
      { path: "/contact", changeFrequency: "monthly", priority: 0.75 },
      { path: "/pricing", changeFrequency: "monthly", priority: 0.78 },
      { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
      { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
      { path: "/revision-policy", changeFrequency: "yearly", priority: 0.3 },
      ...serviceDetailData.map((service) => ({ path: service.path, changeFrequency: "monthly" as const, priority: 0.8 })),
      ...intentLandingPages.map((page) => ({
        path: page.path,
        changeFrequency: "monthly" as const,
        priority: page.slug === "website-development-services" ? 0.86 : 0.78,
      })),
    ];

  const routes = routeConfig.map((route) => ({
      url: route.path === "" ? `${siteConfig.siteUrl}/` : `${siteConfig.siteUrl}${route.path}`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }));

  const articleRoutes = blogPosts.map((post) => ({
      url: `${siteConfig.siteUrl}${post.path}`,
      lastModified: post.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }));

  const portfolioRoutes = portfolioProjects.map((project) => ({
      url: `${siteConfig.siteUrl}${project.path}`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }));

  return [...routes, ...articleRoutes, ...portfolioRoutes];
}
