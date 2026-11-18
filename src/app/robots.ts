import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/app/", "/cms/", "/api/", "/login"],
    },
    sitemap: "https://citilex.asia/sitemap.xml",
  };
}
