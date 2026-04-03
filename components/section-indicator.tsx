"use client";

import { useEffect, useState } from "react";

type SectionIndicatorItem = {
  id: string;
  label: string;
};

type SectionIndicatorProps = {
  items: SectionIndicatorItem[];
};

export function SectionIndicator({ items }: SectionIndicatorProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

        if (visibleEntries[0]) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -50% 0px",
        threshold: [0.2, 0.45, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, [items]);

  return (
    <aside className="hidden xl:block xl:w-[220px]">
      <div className="sticky top-32 rounded-2xl bg-white/90 p-5 shadow-[0_12px_35px_rgba(17,17,17,0.12)] backdrop-blur-sm">
        <nav aria-label="Sekcie služby">
          <ul className="space-y-3">
            {items.map((item) => {
              const active = item.id === activeId;

              return (
                <li key={item.id}>
                  <a
                    className={`block text-lg font-semibold transition-colors ${
                      active ? "text-[var(--color-accent-deep)]" : "text-black"
                    }`}
                    href={`#${item.id}`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
