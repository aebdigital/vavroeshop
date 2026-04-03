"use client";

import type { ReactNode } from "react";

import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="page-transition" data-page-motion-scope key={pathname}>
      {children}
    </div>
  );
}
