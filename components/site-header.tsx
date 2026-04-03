"use client";

/* eslint-disable @next/next/no-img-element */

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
      <div className="site-container flex h-24 items-center justify-between gap-8">
        <Link
          aria-label="Vavrostav domov"
          className="shrink-0"
          href="/"
          onClick={() => setIsOpen(false)}
        >
          <img
            alt={siteBrand.alt}
            className="h-auto w-[170px] sm:w-[210px] lg:w-[250px]"
            src={siteBrand.logo}
          />
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
          </ul>
        </nav>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Zatvoriť menu" : "Otvoriť menu"}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white/60 text-black backdrop-blur-xl lg:hidden"
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

      {isOpen ? (
        <nav
          aria-label="Mobilná navigácia"
          className="border-t border-black/10 bg-white/70 backdrop-blur-[24px] lg:hidden"
          id="mobile-navigation"
        >
          <div className="site-container py-5">
            <ul className="space-y-4">
              {mainNav.map((item) => {
                const active = isActivePath(pathname, item.href);

                return (
                  <li key={item.href}>
                    <Link
                      className={`block text-lg font-bold ${
                        active ? "text-black" : "text-black/70"
                      }`}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
