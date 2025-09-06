import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl;
  const now = new Date();

  const routes = [
    { url: "/", changeFrequency: "daily", priority: 1 },
    { url: "/about", changeFrequency: "yearly", priority: 0.5 },
    { url: "/dashboard", changeFrequency: "monthly", priority: 0.3 },
  ] as const;

  return routes.map((r) => ({
    url: new URL(r.url, base).toString(),
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
