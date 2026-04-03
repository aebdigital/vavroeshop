import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

export type SitePage = {
  lang: string;
  title: string;
  description: string | null;
  html: string;
};

const SITE_PAGES_PATH = path.join(process.cwd(), "data", "site-pages.json");

const readSitePages = cache(async (): Promise<Record<string, SitePage>> => {
  const raw = await readFile(SITE_PAGES_PATH, "utf8");
  return JSON.parse(raw) as Record<string, SitePage>;
});

export function normalizeRouteFromParts(parts: string[] = []): string {
  const cleanedParts = parts.map((part) => part.trim()).filter(Boolean);

  if (cleanedParts.length === 0) {
    return "/";
  }

  return `/${cleanedParts.join("/")}/`;
}

export async function getSitePageByParts(parts: string[] = []) {
  const pages = await readSitePages();
  const route = normalizeRouteFromParts(parts);

  return {
    route,
    page: pages[route] ?? null,
  };
}

export async function getStaticSlugParams() {
  const pages = await readSitePages();

  return Object.keys(pages)
    .filter((route) => route !== "/")
    .map((route) => ({
      slug: route
        .replace(/^\/|\/$/g, "")
        .split("/")
        .filter(Boolean),
    }));
}
