import { siteConfig } from "@/data/siteConfig";
import { serviceDetailData } from "@/data/ServiceDetailData";
import { blogPosts } from "@/data/BlogPostsData";
import { intentLandingPages } from "@/data/IntentLandingPagesData";
import { portfolioProjects } from "@/data/PortfolioProjectsData";
import type { MetadataRoute } from "next";
import { seoPages } from "@/data/SeoPagesData";

export default function sitemap(): MetadataRoute.Sitemap {
  const routeConfig: Array<{
    path: string;
    lastModified?: string;
    changeFrequency: "weekly" | "monthly" | "yearly";
    priority: number;
  }> = [
      { path: "", lastModified: "2026-09-14", changeFrequency: "weekly", priority: 1 },
      { path: "/about", lastModified: "2026-09-14", changeFrequency: "monthly", priority: 0.8 },
      { path: "/service", lastModified: "2026-09-14", changeFrequency: "monthly", priority: 0.85 },
      { path: "/portfolio", lastModified: "2026-09-14", changeFrequency: "monthly", priority: 0.85 },
      { path: "/blog", lastModified: "2026-09-12", changeFrequency: "weekly", priority: 0.8 },
      { path: "/contact", changeFrequency: "monthly", priority: 0.75 },
      { path: "/pricing", changeFrequency: "monthly", priority: 0.78 },
      { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
      { path: "/terms", lastModified: "2026-09-12", changeFrequency: "yearly", priority: 0.3 },
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
      ...(route.lastModified ? { lastModified: route.lastModified } : {}),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }));

  const articleRoutes = blogPosts.map((post) => ({
      url: `${siteConfig.siteUrl}${post.path}`,
      lastModified: post.updatedAt || post.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }));

  const portfolioRoutes = portfolioProjects.map((project) => ({
      url: `${siteConfig.siteUrl}${project.path}`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }));

  return [...routes, ...articleRoutes, ...portfolioRoutes, ...seoPages.map((page) => ({
    url: `${siteConfig.siteUrl}${page.path}`,
    ...(page.publishedAt ? { lastModified: page.publishedAt } : {}),
  }))];
}
