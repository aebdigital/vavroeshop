import type { MetadataRoute } from "next";

import { getAllSitePaths } from "@/lib/site-content";

const siteUrl = "https://www.vavrostav.sk";

export default function sitemap(): MetadataRoute.Sitemap {
  return getAllSitePaths().map((path) => ({
    changeFrequency: path === "/" ? "weekly" : "monthly",
    lastModified: new Date(),
    priority: path === "/" ? 1 : path === "/kontakt" ? 0.9 : 0.8,
    url: `${siteUrl}${path}/`.replace(/\/+$/, "/"),
  }));
}
