import type { Metadata } from "next";

import { PageShell } from "@/components/site-shell";
import { ShopPageView } from "@/components/shop-page-view";

export const metadata: Metadata = {
  title: "Obchod",
  description:
    "Nákup klimatizácií, tepelných čerpadiel, záhradného sortimentu a ďalšieho tovaru od Vavrostav.",
  alternates: { canonical: "/obchod/" },
};

export const dynamic = "force-dynamic";

export default function ShopPage() {
  return (
    <PageShell>
      <ShopPageView />
    </PageShell>
  );
}
