/* eslint-disable @next/next/no-img-element */

import type { ReactNode } from "react";

import Link from "next/link";

import { HeroSlideshow } from "@/components/hero-slideshow";
import { HeroParallaxImage } from "@/components/hero-parallax-image";
import { PageTransition } from "@/components/page-transition";
import { SectionIndicator } from "@/components/section-indicator";
import { SiteHeader } from "@/components/site-header";
import {
  contactDetails,
  footerLinkGroups,
  homePage,
  type LegalPageData,
  siteBrand,
  type ServicePageData,
  socialLinks,
} from "@/lib/site-content";

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex bg-[var(--color-soft)] px-2 py-1 text-sm font-medium uppercase tracking-[0.08em] text-black/80">
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-3 font-display text-[clamp(2.8rem,4vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-black">
      {children}
    </h2>
  );
}

function HeroButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      className="inline-flex items-center justify-center bg-[var(--color-accent)] px-10 py-5 text-sm font-extrabold uppercase tracking-[0.06em] text-black transition-transform hover:-translate-y-0.5"
      href={href}
    >
      {label}
    </Link>
  );
}

function ServiceGallery({
  images,
  title,
}: {
  images: ServicePageData["sections"][number]["images"];
  title: string;
}) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {images.map((image) => (
        <figure className="overflow-hidden bg-neutral-200" key={image.src}>
          <img
            alt={image.alt || title}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
            loading="lazy"
            src={image.src}
          />
        </figure>
      ))}
    </div>
  );
}

function SocialIcon({ icon }: { icon: (typeof socialLinks)[number]["icon"] }) {
  switch (icon) {
    case "facebook":
      return (
        <svg aria-hidden className="h-5 w-5" fill="none" viewBox="0 0 24 24">
          <path
            d="M13.5 21v-7h2.6l.4-3h-3V9.1c0-.9.3-1.6 1.7-1.6h1.5V4.8c-.3 0-1.2-.1-2.4-.1-2.4 0-4 1.4-4 4.2V11H8v3h2.3v7h3.2Z"
            fill="currentColor"
          />
        </svg>
      );
    case "instagram":
      return (
        <svg aria-hidden className="h-5 w-5" fill="none" viewBox="0 0 24 24">
          <rect height="14" rx="4" stroke="currentColor" strokeWidth="1.8" width="14" x="5" y="5" />
          <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="16.5" cy="7.5" fill="currentColor" r="1" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg aria-hidden className="h-5 w-5" fill="none" viewBox="0 0 24 24">
          <path
            d="M12 4.2a7.7 7.7 0 0 0-6.7 11.5L4 20l4.4-1.2A7.8 7.8 0 1 0 12 4.2Z"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path
            d="M9.4 8.8c.2-.4.4-.4.6-.4h.6c.2 0 .4 0 .5.4l.5 1.4c.1.2.1.4 0 .6l-.4.6c-.1.2-.1.3 0 .5.3.5.9 1.2 1.8 1.6.2.1.4.1.5 0l.6-.5c.2-.1.4-.1.6 0l1.3.6c.3.1.4.3.4.5v.6c0 .2 0 .5-.4.6-.5.2-1.4.3-2.6-.2-1-.5-2.3-1.5-3.1-2.8-.8-1.3-1-2.3-.8-2.9Z"
            fill="currentColor"
          />
        </svg>
      );
    case "tiktok":
      return (
        <svg aria-hidden className="h-5 w-5" fill="none" viewBox="0 0 24 24">
          <path
            d="M14 5v8.2a3.7 3.7 0 1 1-2.6-3.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.9"
          />
          <path
            d="M14 5c.8 1.8 2 2.9 4 3.3"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.9"
          />
        </svg>
      );
    case "map":
      return (
        <svg aria-hidden className="h-5 w-5" fill="none" viewBox="0 0 24 24">
          <path
            d="M12 21s5-5.6 5-10a5 5 0 1 0-10 0c0 4.4 5 10 5 10Z"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <circle cx="12" cy="11" fill="currentColor" r="1.8" />
        </svg>
      );
    default:
      return null;
  }
}

function SiteFooter() {
  const navigationLinks = footerLinkGroups[0]?.links ?? [];
  const legalLinks = footerLinkGroups[1]?.links ?? [];

  return (
    <footer className="relative overflow-hidden bg-[var(--color-dark)] text-white" id="contact">
      <div aria-hidden className="absolute inset-0">
        <img
          alt=""
          className="h-full w-full object-cover opacity-25"
          src={homePage.heroImages[0]}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.7)_0%,rgba(5,5,5,0.78)_24%,rgba(5,5,5,0.9)_58%,rgba(5,5,5,0.98)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_38%)]" />
      </div>

      <div className="site-container relative z-10 py-16 sm:py-20">
        <div className="pb-10">
          <img
            alt={siteBrand.alt}
            className="w-[165px] bg-white p-4 sm:w-[200px]"
            src={siteBrand.logo}
          />
        </div>

        <div className="grid gap-12 border-t border-white/10 pt-12 md:grid-cols-2 xl:grid-cols-[1fr_0.9fr_0.9fr_1.2fr]">
          <div>
            <h3 className="text-3xl font-semibold tracking-[-0.03em] text-white">Navigácia</h3>
            <ul className="mt-6 space-y-3 text-lg text-white/80">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link className="transition-colors hover:text-white" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-3xl font-semibold tracking-[-0.03em] text-white">Legal</h3>
            <ul className="mt-6 space-y-3 text-lg text-white/80">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link className="transition-colors hover:text-white" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-3xl font-semibold tracking-[-0.03em] text-white">Adresa</h3>
            <div className="mt-6 space-y-2 text-lg text-white/80">
              {contactDetails.address.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-semibold tracking-[-0.03em] text-white">Kontakt</h3>
            <div className="mt-6 space-y-2 text-lg text-white/80">
              <p className="font-semibold text-white">{contactDetails.company}</p>
              <p>
                <a className="transition-colors hover:text-white" href={`mailto:${contactDetails.email}`}>
                  {contactDetails.email}
                </a>
              </p>
              <p>
                <a className="transition-colors hover:text-white" href={contactDetails.phoneHref}>
                  {contactDetails.phone}
                </a>
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  aria-label={link.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                  href={link.href}
                  key={link.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  <SocialIcon icon={link.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/65 md:flex-row md:items-center md:justify-between">
          <p>Copyright © 2026 Vavrostav s.r.o.</p>
          <a
            className="transition-colors hover:text-white"
            href="https://aebdigital.sk/"
            rel="noreferrer"
            target="_blank"
          >
            Tvorba stránky - AEB Digital
          </a>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black">
      <SiteHeader />
      <PageTransition>
        {children}
        <SiteFooter />
      </PageTransition>
    </div>
  );
}

export function HomePageView() {
  const titleLines = homePage.heroTitle.split("\n");

  return (
    <main>
      <section
        className="relative min-h-screen overflow-hidden"
        data-no-reveal
      >
        <HeroSlideshow images={homePage.heroImages} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(25,23,20,0.72)_0%,rgba(25,23,20,0.58)_48%,rgba(115,60,48,0.42)_100%)]" />
        <div className="absolute inset-y-0 left-0 w-[84%] bg-white/6 [clip-path:polygon(0_0,66%_0,80%_100%,0_100%)]" />

        <div className="relative z-10 flex min-h-screen items-center">
          <div className="site-container pb-16 pt-32 md:pt-36 lg:pb-20 lg:pt-40">
            <div className="max-w-[900px]">
              <h1 className="font-display text-[clamp(3.1rem,7vw,5.75rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-white">
                {titleLines.map((line) => (
                  <span className="block" key={line}>
                    {line}
                  </span>
                ))}
              </h1>

              <div className="mt-8 flex flex-col gap-7 md:flex-row md:items-end md:gap-12">
                <p className="max-w-[34rem] text-lg leading-8 text-white/85 md:text-[1.15rem]">
                  {homePage.heroSubtitle}
                </p>
                <div className="shrink-0">
                  <HeroButton href={homePage.heroButton.href} label={homePage.heroButton.label} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 -mt-20 border-b border-black/10 bg-white shadow-[0_-18px_44px_rgba(15,15,15,0.12)] sm:-mt-24">
        <div className="site-container flex flex-wrap items-center justify-center gap-x-10 gap-y-6 py-8">
          {homePage.partners.map((partner) =>
            partner.kind === "image" ? (
              <img
                alt={partner.alt}
                className="h-8 w-auto object-contain sm:h-10"
                key={partner.src}
                src={partner.src}
              />
            ) : (
              <div className="flex items-center gap-2 text-[1.7rem] font-semibold tracking-[-0.03em]" key={partner.label}>
                <span className="inline-block h-3 w-3 bg-[#005baa]" />
                <span>{partner.label}</span>
              </div>
            ),
          )}
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="site-container">
          <SectionEyebrow>O nás</SectionEyebrow>
          <SectionTitle>Naše služby</SectionTitle>
        </div>

        <div className="mx-auto mt-10 max-w-[1512px]">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {homePage.services.map((service) => (
              <Link
                className="group relative isolate flex min-h-[20rem] items-end overflow-hidden sm:min-h-[26rem] xl:min-h-[34rem]"
                href={service.href}
                key={service.href}
              >
                <img
                  alt={service.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  src={service.image}
                />
                <div className="absolute inset-0 bg-black/28 transition-colors duration-500 group-hover:bg-black/16" />
                <div className="relative z-10 p-8">
                  <h3 className="font-display text-[2.1rem] font-semibold leading-none tracking-[-0.05em] text-white sm:text-[2.5rem]">
                    {service.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white pb-24">
        <div className="site-container grid gap-12 xl:grid-cols-[0.96fr_1.04fr]">
          <div>
            <SectionEyebrow>O nás</SectionEyebrow>
            <SectionTitle>{homePage.about.title}</SectionTitle>

            <div className="mt-7 max-w-[42rem] space-y-5 text-[1.05rem] leading-8 text-black/80">
              {homePage.about.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 overflow-hidden bg-neutral-200">
              <img
                alt="Tepelné čerpadlo počas montáže"
                className="h-full w-full object-cover"
                src={homePage.about.leftImage}
              />
            </div>
          </div>

          <div className="pt-2 xl:pt-0">
            <div className="overflow-hidden bg-neutral-200">
              <img
                alt="Bosch zariadenie a tím Vavrostav"
                className="h-full w-full object-cover"
                src={homePage.about.rightImage}
              />
            </div>

            <div className="mt-10 max-w-[44rem] space-y-5 text-[1.05rem] leading-8 text-black/80">
              {homePage.about.rightText.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-black/10 pt-8">
              {homePage.about.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-[2.7rem] font-semibold leading-none tracking-[-0.07em] text-black sm:text-[3.3rem]">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-lg font-semibold leading-7 text-black">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export function ServicePageView({ page }: { page: ServicePageData }) {
  return (
    <main className="bg-white">
      <section className="relative min-h-[25rem] overflow-hidden sm:min-h-[31rem]" data-no-reveal>
        <HeroParallaxImage src={page.heroImage} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-y-0 left-0 w-[84%] bg-white/7 [clip-path:polygon(0_0,68%_0,83%_100%,0_100%)]" />

        <div className="relative z-10 flex min-h-[25rem] items-end pt-28 sm:min-h-[31rem] sm:pt-32">
          <div className="site-container pb-12 sm:pb-20">
            <div className="max-w-[980px]">
              <h1 className="font-display text-[clamp(3rem,6vw,5.25rem)] font-semibold leading-[0.95] tracking-[-0.08em] text-white">
                {page.title}
              </h1>
              <div className="mt-6 flex max-w-[720px] items-center gap-6 border-t border-white/60 pt-6">
                <HeroButton href="/kontakt" label="Kontakt" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="site-container flex gap-12">
          <div className="min-w-0 flex-1 space-y-16 sm:space-y-24">
            {page.sections.map((section) => (
              <section className="section-anchor" id={section.id} key={section.id}>
                <SectionEyebrow>Služba</SectionEyebrow>
                <SectionTitle>{section.title}</SectionTitle>

                <div className="mt-7 max-w-[78rem] space-y-5 text-[1.05rem] leading-8 text-black/80">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <ServiceGallery images={section.images} title={section.title} />
              </section>
            ))}
          </div>

          {page.sections.length > 1 ? (
            <SectionIndicator items={page.sections.map(({ id, title }) => ({ id, label: title }))} />
          ) : null}
        </div>
      </section>
    </main>
  );
}

function isLegalHeading(block: string) {
  if (block.startsWith("Článok")) {
    return true;
  }

  if (block.endsWith("?")) {
    return true;
  }

  if (block.endsWith(":") && block.length <= 40) {
    return true;
  }

  return /^[A-ZÁČĎÉÍĽĹŇÓÔŔŠŤÚÝŽ0-9 .-]{4,}$/.test(block);
}

export function LegalPageView({ page }: { page: LegalPageData }) {
  return (
    <main className="bg-white">
      <section className="border-b border-black/10 pb-20 pt-32 sm:pb-24 sm:pt-36">
        <div className="site-container">
          <SectionEyebrow>Legal</SectionEyebrow>
          <SectionTitle>{page.title}</SectionTitle>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="site-container">
          <article className="legal-copy mx-auto max-w-[1100px]">
            {page.intro ? <p className="text-xl leading-8 text-black/85">{page.intro}</p> : null}

            <div className="mt-8 space-y-5">
              {page.blocks.map((block) =>
                isLegalHeading(block) ? (
                  <h3
                    className="font-display text-3xl font-semibold tracking-[-0.04em] text-black"
                    key={block}
                  >
                    {block}
                  </h3>
                ) : (
                  <p className="text-[1.02rem] leading-8 text-black/78" key={block}>
                    {block}
                  </p>
                ),
              )}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
