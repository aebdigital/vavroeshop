import type { Metadata } from "next";
import { Epilogue, Inter } from "next/font/google";
import "lenis/dist/lenis.css";

import { SiteEffects } from "@/components/site-effects";
import { contactDetails, siteBrand, socialLinks } from "@/lib/site-content";
import "./globals.css";

const display = Epilogue({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const body = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = "https://www.vavrostav.sk";
const defaultDescription =
  "Vavrostav - kúrenárske práce, klimatizácie, vodoinštalatérske práce a odpady na mieru.";
const defaultOgImage = "/assets/uploads/2025/05/IMG_4086.jpg";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  applicationName: "Vavrostav",
  description: defaultDescription,
  icons: {
    apple: "/assets/uploads/2025/06/cropped-Adobe-Express-file-180x180.png",
    icon: [
      { sizes: "32x32", url: "/assets/uploads/2025/06/cropped-Adobe-Express-file-32x32.png" },
      { sizes: "192x192", url: "/assets/uploads/2025/06/cropped-Adobe-Express-file-192x192.png" },
    ],
  },
  keywords: [
    "Vavrostav",
    "kúrenárske práce",
    "tepelné čerpadlá",
    "klimatizácie",
    "vodoinštalatérske práce",
    "odpady a kanalizácie",
    "Lazany",
    "Prievidza",
  ],
  metadataBase: new URL(siteUrl),
  openGraph: {
    description: defaultDescription,
    images: [{ alt: siteBrand.alt, url: defaultOgImage }],
    locale: "sk_SK",
    siteName: "Vavrostav",
    title: "Vavrostav",
    type: "website",
    url: siteUrl,
  },
  title: {
    default: "Vavrostav",
    template: "%s | Vavrostav",
  },
  twitter: {
    card: "summary_large_image",
    description: defaultDescription,
    images: [defaultOgImage],
    title: "Vavrostav",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    address: {
      "@type": "PostalAddress",
      addressCountry: "SK",
      postalCode: "972 11",
      streetAddress: contactDetails.address.join(", "),
    },
    email: contactDetails.email,
    image: `${siteUrl}${defaultOgImage}`,
    logo: `${siteUrl}${siteBrand.logo}`,
    name: contactDetails.company,
    sameAs: socialLinks.map((link) => link.href),
    telephone: contactDetails.phone,
    url: siteUrl,
  };

  return (
    <html lang="sk">
      <body className={`${display.variable} ${body.variable}`}>
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
          type="application/ld+json"
        />
        <SiteEffects />
        {children}
      </body>
    </html>
  );
}
