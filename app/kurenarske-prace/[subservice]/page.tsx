import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GroupedServicePageView } from "@/components/grouped-service-page-view";
import { PageShell } from "@/components/site-shell";
import {
  getGroupedServiceStaticParams,
  getGroupedServiceSubpage,
} from "@/lib/site-content";

const groupSlug = "kurenarske-prace";

type HeatingSubservicePageProps = {
  params: Promise<{
    subservice: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getGroupedServiceStaticParams(groupSlug);
}

export async function generateMetadata({
  params,
}: HeatingSubservicePageProps): Promise<Metadata> {
  const { subservice } = await params;
  const result = getGroupedServiceSubpage(groupSlug, subservice);

  if (!result) {
    return {
      title: "Kurenárske práce",
    };
  }

  return {
    alternates: {
      canonical: `/${groupSlug}/${subservice}/`,
    },
    description: result.subservice.description,
    openGraph: {
      description: result.subservice.description,
      images: [{ alt: result.subservice.title, url: result.page.heroImage }],
      title: `${result.subservice.title} | ${result.page.title}`,
    },
    title: result.subservice.title,
  };
}

export default async function HeatingSubservicePage({
  params,
}: HeatingSubservicePageProps) {
  const { subservice } = await params;
  const result = getGroupedServiceSubpage(groupSlug, subservice);

  if (!result) {
    notFound();
  }

  return (
    <PageShell>
      <GroupedServicePageView page={result.page} subservice={result.subservice} />
    </PageShell>
  );
}
