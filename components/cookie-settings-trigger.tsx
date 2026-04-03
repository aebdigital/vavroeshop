"use client";

import type { ReactNode } from "react";

import { COOKIE_SETTINGS_EVENT } from "@/lib/cookie-consent";

type CookieSettingsTriggerProps = {
  children: ReactNode;
  className?: string;
};

export function CookieSettingsTrigger({ children, className }: CookieSettingsTriggerProps) {
  return (
    <button
      aria-haspopup="dialog"
      className={className}
      onClick={() => window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))}
      type="button"
    >
      {children}
    </button>
  );
}
