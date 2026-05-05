import type { Metadata } from "next";
import { PageShell } from "@/components/site-shell";
import { CheckoutPageView } from "@/components/checkout-page-view";

export const metadata: Metadata = {
  title: "Pokladňa",
  description: "Dokončite svoju objednávku – Vavrostav e-shop.",
};

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  return (
    <PageShell>
      <CheckoutPageView />
    </PageShell>
  );
}
