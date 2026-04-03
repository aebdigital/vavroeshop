import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalPageView, PageShell, ServicePageView } from "@/components/site-shell";
import { getSitePageBySlugParts, getStaticSlugParams } from "@/lib/site-content";

type SitePageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return getStaticSlugParams();
}

export async function generateMetadata({ params }: SitePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSitePageBySlugParts(slug);

  if (!page) {
    return {
      title: "Vavrostav",
    };
  }

  return {
    alternates: {
      canonical: `/${page.slug}/`,
    },
    description: page.description,
    openGraph: {
      description: page.description,
      images:
        page.kind === "service"
          ? [{ alt: page.title, url: page.heroImage }]
          : [{ alt: page.title, url: "/assets/uploads/2025/05/IMG_4086.jpg" }],
      title: page.title,
    },
    title: page.title,
  };
}

export default async function SitePage({ params }: SitePageProps) {
  const { slug } = await params;
  const page = getSitePageBySlugParts(slug);

  if (!page) {
    notFound();
  }

  return (
    <PageShell>
      {page.kind === "service" ? <ServicePageView page={page} /> : <LegalPageView page={page} />}
    </PageShell>
  );
}
