"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";

import {
  COOKIE_CONSENT_STORAGE_KEY,
  COOKIE_CONSENT_UPDATED_EVENT,
  COOKIE_SETTINGS_EVENT,
  createCookiePreferences,
  parseCookiePreferences,
} from "@/lib/cookie-consent";

type ToggleRowProps = {
  checked: boolean;
  description: string;
  disabled?: boolean;
  label: string;
  onToggle?: () => void;
};

function ToggleRow({ checked, description, disabled = false, label, onToggle }: ToggleRowProps) {
  return (
    <div className="flex items-start justify-between gap-6 rounded-[28px] border border-black/8 bg-[var(--color-soft)]/65 px-5 py-5">
      <div className="max-w-xl">
        <h3 className="text-lg font-semibold tracking-[-0.03em] text-black">{label}</h3>
        <p className="mt-2 text-sm leading-6 text-black/66">{description}</p>
      </div>

      <button
        aria-checked={checked}
        className={`relative mt-1 inline-flex h-8 w-14 shrink-0 items-center rounded-full transition ${
          checked ? "bg-[var(--color-accent)]" : "bg-black/12"
        } ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
        disabled={disabled}
        onClick={onToggle}
        role="switch"
        type="button"
      >
        <span
          className={`h-6 w-6 rounded-full bg-white shadow-[0_6px_16px_rgba(0,0,0,0.18)] transition ${
            checked ? "translate-x-7" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

function subscribeToCookieConsent(onStoreChange: () => void) {
  const handleStoreChange = () => onStoreChange();

  window.addEventListener("storage", handleStoreChange);
  window.addEventListener(COOKIE_CONSENT_UPDATED_EVENT, handleStoreChange);

  return () => {
    window.removeEventListener("storage", handleStoreChange);
    window.removeEventListener(COOKIE_CONSENT_UPDATED_EVENT, handleStoreChange);
  };
}

function getCookieConsentSnapshot() {
  return localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
}

function getCookieConsentServerSnapshot() {
  return undefined;
}

export function CookieConsent() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);
  const storedPreferencesRaw = useSyncExternalStore(
    subscribeToCookieConsent,
    getCookieConsentSnapshot,
    getCookieConsentServerSnapshot,
  );
  const storedPreferences = useMemo(
    () =>
      typeof storedPreferencesRaw === "undefined"
        ? undefined
        : parseCookiePreferences(storedPreferencesRaw),
    [storedPreferencesRaw],
  );

  const openSettings = useCallback(() => {
    setAnalyticsEnabled(storedPreferences?.analytics ?? false);
    setMarketingEnabled(storedPreferences?.marketing ?? false);
    setIsSettingsOpen(true);
  }, [storedPreferences]);

  useEffect(() => {
    const handleOpenSettings = () => openSettings();

    window.addEventListener(COOKIE_SETTINGS_EVENT, handleOpenSettings);

    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, handleOpenSettings);
  }, [openSettings]);

  useEffect(() => {
    document.body.classList.toggle("cookie-modal-open", isSettingsOpen);

    return () => document.body.classList.remove("cookie-modal-open");
  }, [isSettingsOpen]);

  useEffect(() => {
    if (!isSettingsOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSettingsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [isSettingsOpen]);

  const canRenderBanner = storedPreferences === null;

  const summary = useMemo(
    () =>
      analyticsEnabled || marketingEnabled
        ? "Používame aj voliteľné cookies pre meranie a marketing."
        : "Používame iba nevyhnutné cookies pre správne fungovanie stránky.",
    [analyticsEnabled, marketingEnabled],
  );

  const persistPreferences = (analytics: boolean, marketing: boolean) => {
    const next = createCookiePreferences({ analytics, marketing });

    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(COOKIE_CONSENT_UPDATED_EVENT));
    setIsSettingsOpen(false);
  };

  if (typeof storedPreferences === "undefined") {
    return null;
  }

  return (
    <>
      {canRenderBanner ? (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[80] px-3 pb-3 sm:px-6 sm:pb-6">
          <div className="cookie-banner-enter pointer-events-auto mx-auto w-full max-w-[1240px] rounded-[30px] border border-white/40 bg-white/84 p-5 shadow-[0_24px_70px_rgba(12,12,12,0.22)] backdrop-blur-[22px] sm:p-7">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-3xl">
                <span className="inline-flex rounded-full bg-[var(--color-accent)] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-black">
                  Cookies
                </span>
                <h2 className="mt-3 font-display text-[clamp(1.8rem,3vw,2.7rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-black">
                  Chcete si upraviť používanie cookies?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-black/70 sm:text-base">
                  Používame nevyhnutné cookies pre správne fungovanie webu. Voliteľné cookies nám pomáhajú merať
                  návštevnosť a zlepšovať obsah. Výber si môžete kedykoľvek zmeniť cez odkaz Cookies vo footeri.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap xl:justify-end">
                <button
                  className="inline-flex items-center justify-center rounded-full border border-black/12 px-5 py-3 text-sm font-bold text-black transition-colors hover:border-black hover:bg-black hover:text-white"
                  onClick={openSettings}
                  type="button"
                >
                  Nastavenia cookies
                </button>
                <button
                  className="inline-flex items-center justify-center rounded-full border border-black/12 px-5 py-3 text-sm font-bold text-black transition-colors hover:border-black hover:bg-black hover:text-white"
                  onClick={() => persistPreferences(false, false)}
                  type="button"
                >
                  Len nevyhnutné
                </button>
                <button
                  className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-extrabold text-black transition-transform hover:-translate-y-0.5"
                  onClick={() => persistPreferences(true, true)}
                  type="button"
                >
                  Prijať všetko
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {isSettingsOpen ? (
        <div className="fixed inset-0 z-[90] flex items-end justify-center p-3 sm:items-center sm:p-6">
          <button
            aria-label="Zatvoriť nastavenia cookies"
            className="cookie-overlay-enter absolute inset-0 bg-black/50"
            onClick={() => setIsSettingsOpen(false)}
            type="button"
          />

          <div className="cookie-dialog-enter relative z-10 w-full max-w-[920px] rounded-[32px] bg-white p-5 shadow-[0_32px_100px_rgba(7,7,7,0.28)] sm:p-8">
            <div className="flex flex-col gap-4 border-b border-black/8 pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl">
                <span className="inline-flex rounded-full bg-[var(--color-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-black/70">
                  Nastavenia cookies
                </span>
                <h2 className="mt-3 font-display text-[clamp(2rem,3vw,3.2rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-black">
                  Upravte si svoj výber
                </h2>
                <p className="mt-3 text-sm leading-6 text-black/66 sm:text-base">
                  {summary} Nevyhnutné cookies nechávame vždy zapnuté, aby stránka fungovala správne.
                </p>
              </div>

              <button
                aria-label="Zatvoriť"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-black transition-colors hover:border-black hover:bg-black hover:text-white"
                onClick={() => setIsSettingsOpen(false)}
                type="button"
              >
                <svg aria-hidden className="h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <path d="M6 6 18 18" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
                  <path d="M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
                </svg>
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <ToggleRow
                checked
                description="Základné cookies potrebné pre bezpečnosť, navigáciu a korektné zobrazenie webu."
                disabled
                label="Nevyhnutné cookies"
              />
              <ToggleRow
                checked={analyticsEnabled}
                description="Pomáhajú nám anonymne sledovať návštevnosť a pochopiť, ktoré stránky fungujú najlepšie."
                label="Analytické cookies"
                onToggle={() => setAnalyticsEnabled((current) => !current)}
              />
              <ToggleRow
                checked={marketingEnabled}
                description="Umožňujú lepšie cielenie obsahu a reklamy naprieč platformami tretích strán."
                label="Marketingové cookies"
                onToggle={() => setMarketingEnabled((current) => !current)}
              />
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-black/8 pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <p className="max-w-xl text-sm leading-6 text-black/58">
                Svoj výber si môžete kedykoľvek otvoriť a zmeniť cez odkaz Cookies vo footeri.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  className="inline-flex items-center justify-center rounded-full border border-black/12 px-5 py-3 text-sm font-bold text-black transition-colors hover:border-black hover:bg-black hover:text-white"
                  onClick={() => persistPreferences(false, false)}
                  type="button"
                >
                  Len nevyhnutné
                </button>
                <button
                  className="inline-flex items-center justify-center rounded-full border border-black/12 px-5 py-3 text-sm font-bold text-black transition-colors hover:border-black hover:bg-black hover:text-white"
                  onClick={() => persistPreferences(analyticsEnabled, marketingEnabled)}
                  type="button"
                >
                  Uložiť výber
                </button>
                <button
                  className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-extrabold text-black transition-transform hover:-translate-y-0.5"
                  onClick={() => persistPreferences(true, true)}
                  type="button"
                >
                  Prijať všetko
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
