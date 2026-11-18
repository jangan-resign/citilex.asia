import { MetadataRoute } from "next";
import { seoServicePages } from "../lib/seo-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://citilex.asia";
  const now = new Date();

  const serviceEntries: MetadataRoute.Sitemap = seoServicePages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...serviceEntries,
    {
      url: `${baseUrl}/portofolio`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/kontak`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
