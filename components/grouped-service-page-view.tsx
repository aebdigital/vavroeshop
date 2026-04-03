import type { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

import { HeroParallaxImage } from "@/components/hero-parallax-image";
import { LightboxGallery } from "@/components/lightbox-gallery";
import {
  buildSubserviceHref,
  type GroupedServicePageData,
  type GroupedServiceSubpageData,
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
    <h2 className="mt-3 font-display text-[clamp(2.8rem,4vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-black">
      {children}
    </h2>
  );
}

function SidebarLink({
  active,
  href,
  label,
}: {
  active: boolean;
  href: string;
  label: string;
}) {
  return (
    <Link
      className={`block rounded-2xl px-4 py-3 text-base font-semibold tracking-[-0.02em] transition-colors ${
        active
          ? "bg-[var(--color-accent)] text-black"
          : "text-black/72 hover:bg-black/4 hover:text-black"
      }`}
      href={href}
    >
      {label}
    </Link>
  );
}

function OverviewCards({ page }: { page: GroupedServicePageData }) {
  return (
    <div className="mt-12 grid gap-5 md:grid-cols-2">
      {page.subservices.map((subservice) => {
        const image = subservice.images?.[0]?.src ?? page.heroImage;

        return (
          <Link
            className="group overflow-hidden rounded-[1.9rem] border border-black/10 bg-white shadow-[0_18px_50px_rgba(17,17,17,0.07)] transition-transform hover:-translate-y-1"
            href={buildSubserviceHref(page.slug, subservice.slug)}
            key={subservice.slug}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
              <Image
                alt={subservice.title}
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                src={image}
              />
            </div>
            <div className="p-6">
              <h3 className="font-display text-[2rem] font-semibold leading-[0.98] tracking-[-0.05em] text-black">
                {subservice.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-black/72">{subservice.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function GroupedServicePageView({
  page,
  subservice,
}: {
  page: GroupedServicePageData;
  subservice?: GroupedServiceSubpageData | null;
}) {
  const activePath = subservice ? buildSubserviceHref(page.slug, subservice.slug) : `/${page.slug}`;

  return (
    <main className="bg-white">
      <section className="relative min-h-[28rem] overflow-hidden sm:min-h-[34rem]" data-no-reveal>
        <HeroParallaxImage src={page.heroImage} />
        <div className="absolute inset-0 bg-black/52" />
        <div className="absolute inset-y-0 left-0 w-[84%] bg-white/7 [clip-path:polygon(0_0,66%_0,82%_100%,0_100%)]" />

        <div className="relative z-10 flex min-h-[28rem] items-end pt-28 sm:min-h-[34rem] sm:pt-32">
          <div className="site-container pb-12 sm:pb-16">
            <div className="max-w-[980px]">
              <h1 className="font-display text-[clamp(2.7rem,6vw,5.25rem)] font-semibold leading-[0.95] tracking-[-0.08em] text-white">
                {page.title}
              </h1>
              <div className="mt-6 flex max-w-[720px] items-center gap-6 border-t border-white/60 pt-6">
                <Link
                  className="inline-flex items-center justify-center bg-[var(--color-accent)] px-10 py-5 text-sm font-extrabold uppercase tracking-[0.06em] text-black transition-transform hover:-translate-y-0.5"
                  href="/kontakt"
                >
                  Kontakt
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="site-container grid gap-10 xl:grid-cols-[18rem_minmax(0,1fr)] xl:gap-16">
          <aside className="min-w-0 xl:sticky xl:top-32 xl:self-start">
            <div className="rounded-[2rem] border border-black/10 bg-[linear-gradient(180deg,rgba(245,245,245,0.85)_0%,rgba(255,255,255,1)_100%)] p-5 shadow-[0_18px_50px_rgba(17,17,17,0.06)] sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/45">Podslužby</p>
              <nav aria-label={`${page.title} navigácia`} className="mt-5 space-y-2">
                <SidebarLink active={activePath === `/${page.slug}`} href={`/${page.slug}`} label="Prehľad" />
                {page.subservices.map((item) => (
                  <SidebarLink
                    active={activePath === buildSubserviceHref(page.slug, item.slug)}
                    href={buildSubserviceHref(page.slug, item.slug)}
                    key={item.slug}
                    label={item.title}
                  />
                ))}
              </nav>
            </div>
          </aside>

          <div className="min-w-0">
            {subservice ? (
              <section>
                <SectionEyebrow>Služba</SectionEyebrow>
                <SectionTitle>{subservice.title}</SectionTitle>

                <div className="mt-7 max-w-[72rem] space-y-5 text-[1.05rem] leading-8 text-black/80">
                  {subservice.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {subservice.images ? (
                  <LightboxGallery images={subservice.images} title={subservice.title} />
                ) : null}
              </section>
            ) : (
              <section>
                <SectionEyebrow>Služba</SectionEyebrow>
                <SectionTitle>{page.title}</SectionTitle>

                <div className="mt-7 max-w-[72rem] space-y-5 text-[1.05rem] leading-8 text-black/80">
                  {page.overview.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <OverviewCards page={page} />
              </section>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
