import type { Metadata } from "next";
import { PageShell } from "@/components/site-shell";
import { CartPageView } from "@/components/cart-page-view";

export const metadata: Metadata = {
  title: "Košík",
  description: "Váš nákupný košík – Vavrostav e-shop.",
};

export const dynamic = "force-dynamic";

export default function CartPage() {
  return (
    <PageShell>
      <CartPageView />
    </PageShell>
  );
}
