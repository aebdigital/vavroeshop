import type { MetadataRoute } from "next";

const siteUrl = "https://www.vavrostav.sk";

export default function robots(): MetadataRoute.Robots {
  return {
    host: siteUrl,
    rules: {
      allow: "/",
      userAgent: "*",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
