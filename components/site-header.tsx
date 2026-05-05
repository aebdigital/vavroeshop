"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { mainNav, siteBrand } from "@/lib/site-content";

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/30 bg-white/44 shadow-[0_18px_50px_rgba(17,17,17,0.08)] backdrop-blur-[24px]">
      <div className="site-container flex h-16 items-center justify-between gap-6 sm:h-24 sm:gap-8">
        <Link
          aria-label="Vavrostav domov"
          className="shrink-0"
          href="/"
          onClick={() => setIsOpen(false)}
        >
          <span className="relative block aspect-[1024/329] w-[148px] sm:w-[210px] lg:w-[250px]">
            <Image
              alt={siteBrand.alt}
              className="object-contain"
              fill
              priority
              sizes="(min-width: 1024px) 250px, (min-width: 640px) 210px, 148px"
              src={siteBrand.logo}
            />
          </span>
        </Link>

        <nav aria-label="Hlavná navigácia" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[15px] font-bold tracking-[-0.02em] text-black">
            {mainNav.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    className={`border-b-2 pb-1 transition-colors ${
                      active ? "border-black text-black" : "border-transparent text-black hover:border-black/50"
                    }`}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link href="/kosik" aria-label="Košík" className={`flex items-center gap-2 border-b-2 pb-1 transition-colors ${isActivePath(pathname, "/kosik") ? "border-black text-black" : "border-transparent text-black hover:border-black/50"}`}>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0L5 21h14m-12 0a2 2 0 104 0 2 2 0 00-4 0zm8 0a2 2 0 104 0 2 2 0 00-4 0z" />
                </svg>
              </Link>
            </li>
          </ul>
        </nav>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Zatvoriť menu" : "Otvoriť menu"}
          className="inline-flex h-10 w-10 items-center justify-center text-black lg:hidden"
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          <span className="relative h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition ${isOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-5 bg-current transition ${isOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute left-0 top-[14px] h-0.5 w-5 bg-current transition ${
                isOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`overflow-hidden transition-[max-height,opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          isOpen ? "max-h-[28rem] opacity-100 translate-y-0" : "pointer-events-none max-h-0 opacity-0 -translate-y-3"
        }`}
      >
        <nav
          aria-label="Mobilná navigácia"
          className="border-t border-black/8 bg-white/62 backdrop-blur-[24px]"
          id="mobile-navigation"
        >
          <div className="site-container py-4">
            <ul className="space-y-1">
              {mainNav.map((item, index) => {
                const active = isActivePath(pathname, item.href);

                return (
                  <li
                    className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                    }`}
                    key={item.href}
                    style={{ transitionDelay: isOpen ? `${index * 45}ms` : "0ms" }}
                  >
                    <Link
                      className={`block rounded-2xl px-4 py-3 text-base font-bold tracking-[-0.02em] ${
                        active ? "bg-[var(--color-accent)] text-black" : "text-black/72"
                      }`}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li
                className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
                style={{ transitionDelay: isOpen ? `${mainNav.length * 45}ms` : "0ms" }}
              >
                <Link
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-bold tracking-[-0.02em] ${isActivePath(pathname, "/kosik") ? "bg-[var(--color-accent)] text-black" : "text-black/72"}`}
                  href="/kosik"
                  onClick={() => setIsOpen(false)}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0L5 21h14m-12 0a2 2 0 104 0 2 2 0 00-4 0zm8 0a2 2 0 104 0 2 2 0 00-4 0z" />
                  </svg>
                  Košík
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
