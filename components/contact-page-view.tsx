import { HeroParallaxImage } from "@/components/hero-parallax-image";
import { ContactForm } from "@/components/contact-form";
import { contactDetails, homePage, socialLinks } from "@/lib/site-content";

function ContactCard({
  label,
  value,
  href,
}: {
  href?: string;
  label: string;
  value: string;
}) {
  const content = href ? (
    <a className="transition-colors hover:text-black" href={href} rel="noreferrer" target={href.startsWith("http") ? "_blank" : undefined}>
      {value}
    </a>
  ) : (
    value
  );

  return (
    <div className="rounded-[1.75rem] border border-black/10 bg-white p-6 shadow-[0_14px_40px_rgba(17,17,17,0.06)]">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/45">{label}</p>
      <div className="mt-3 text-xl font-semibold tracking-[-0.03em] text-black">{content}</div>
    </div>
  );
}

export function ContactPageView() {
  return (
    <main className="bg-white">
      <section className="relative min-h-[24rem] overflow-hidden sm:min-h-[28rem]" data-no-reveal>
        <HeroParallaxImage src={homePage.heroImages[0]} />
        <div className="absolute inset-0 bg-black/52" />
        <div className="absolute inset-y-0 left-0 w-[84%] bg-white/7 [clip-path:polygon(0_0,66%_0,82%_100%,0_100%)]" />

        <div className="relative z-10 flex min-h-[24rem] items-end pt-28 sm:min-h-[28rem] sm:pt-32">
          <div className="site-container pb-12 sm:pb-16">
            <div className="max-w-[980px]">
              <h1 className="font-display text-[clamp(3rem,6vw,5.25rem)] font-semibold leading-[0.95] tracking-[-0.08em] text-white">
                Kontakt
              </h1>
              <p className="mt-5 max-w-[34rem] text-lg leading-8 text-white/82">
                Zavolajte nám alebo pošlite správu a ozveme sa vám späť.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="site-container grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <ContactCard label="Spoločnosť" value={contactDetails.company} />
              <ContactCard label="Telefón" value={contactDetails.phone} href={contactDetails.phoneHref} />
              <ContactCard label="Email" value={contactDetails.email} href={`mailto:${contactDetails.email}`} />
              <ContactCard
                label="Adresa"
                value={`${contactDetails.address[0]}, ${contactDetails.address[1]}`}
                href={contactDetails.mapHref}
              />
            </div>

            <div className="rounded-[2rem] border border-black/10 bg-black p-8 text-white shadow-[0_22px_60px_rgba(17,17,17,0.12)] sm:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/55">Fakturačné údaje</p>
                  <div className="mt-5 space-y-3 text-lg leading-8 text-white/82">
                    <p className="text-2xl font-semibold text-white">{contactDetails.company}</p>
                    <p>{contactDetails.address[0]}</p>
                    <p>{contactDetails.address[1]}</p>
                    <p>IČO {contactDetails.ico}</p>
                    <p>DIČ {contactDetails.dic}</p>
                    <p>IČ DPH {contactDetails.icDph}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/55">Sociálne siete</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {socialLinks.map((link) => (
                      <a
                        className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                        href={link.href}
                        key={link.href}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-[var(--color-dark)] p-8 shadow-[0_22px_60px_rgba(17,17,17,0.12)] sm:p-10" id="kontakt-formular">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-t border-black/10">
        <div className="h-[28rem] w-full bg-neutral-100 sm:h-[34rem] lg:h-[40rem]">
          <iframe
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={contactDetails.mapEmbedSrc}
            title="Mapa Vavrostav"
          />
        </div>
      </section>
    </main>
  );
}
