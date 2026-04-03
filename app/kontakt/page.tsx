import type { Metadata } from "next";

import { ContactPageView } from "@/components/contact-page-view";
import { PageShell } from "@/components/site-shell";

export const metadata: Metadata = {
  alternates: {
    canonical: "/kontakt/",
  },
  description: "Kontakt na Vavrostav, adresa, telefón, e-mail a mapa.",
  openGraph: {
    description: "Kontakt na Vavrostav, adresa, telefón, e-mail a mapa.",
    images: [{ alt: "Kontakt Vavrostav", url: "/assets/uploads/2025/05/IMG_4086.jpg" }],
    title: "Kontakt",
  },
  title: "Kontakt",
};

export default function ContactPage() {
  return (
    <PageShell>
      <ContactPageView />
    </PageShell>
  );
}
