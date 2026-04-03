import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GroupedServicePageView } from "@/components/grouped-service-page-view";
import { PageShell } from "@/components/site-shell";
import { getGroupedServicePage } from "@/lib/site-content";

const groupSlug = "vodoinstalaterske-prace";

export function generateMetadata(): Metadata {
  const page = getGroupedServicePage(groupSlug);

  if (!page) {
    return {
      title: "Vodoinštalatérske práce",
    };
  }

  return {
    alternates: {
      canonical: `/${groupSlug}/`,
    },
    description: page.description,
    openGraph: {
      description: page.description,
      images: [{ alt: page.title, url: page.heroImage }],
      title: page.title,
    },
    title: page.title,
  };
}

export default function WaterServicesPage() {
  const page = getGroupedServicePage(groupSlug);

  if (!page) {
    notFound();
  }

  return (
    <PageShell>
      <GroupedServicePageView page={page} />
    </PageShell>
  );
}
