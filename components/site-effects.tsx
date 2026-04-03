"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const REVEAL_SELECTOR =
  "section, article, h1, h2, h3, h4, p, ul, ol, li, figure, form, blockquote, .reveal-target";

export function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      return;
    }

    const lenis = new Lenis({
      anchors: {
        offset: -110,
      },
      autoRaf: true,
      duration: 1.15,
      lerp: 0.09,
      smoothWheel: true,
      stopInertiaOnNavigate: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scope = document.querySelector<HTMLElement>("[data-page-motion-scope]");

    if (!scope) {
      return;
    }

    const elements = Array.from(scope.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)).filter(
      (element) => !element.closest("[data-no-reveal]"),
    );

    if (reducedMotion) {
      elements.forEach((element) => {
        element.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target as HTMLElement;
          element.classList.add("is-visible");
          observer.unobserve(element);
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.12,
      },
    );

    elements.forEach((element, index) => {
      element.classList.add("reveal-on-scroll");
      element.style.setProperty("--reveal-delay", `${Math.min((index % 8) * 45, 260)}ms`);
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
