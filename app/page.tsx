import type { Metadata } from "next";

import { HomePageView, PageShell } from "@/components/site-shell";
import { homePage } from "@/lib/site-content";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  description: homePage.description,
  openGraph: {
    description: homePage.description,
    images: [{ alt: homePage.title, url: homePage.heroImages[0] }],
    title: homePage.title,
  },
};

export default async function HomePage() {
  return (
    <PageShell>
      <HomePageView />
    </PageShell>
  );
}
