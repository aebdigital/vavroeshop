export const COOKIE_CONSENT_STORAGE_KEY = "vavrostav-cookie-consent";
export const COOKIE_SETTINGS_EVENT = "vavrostav:open-cookie-settings";
export const COOKIE_CONSENT_UPDATED_EVENT = "vavrostav:cookie-consent-updated";
export const COOKIE_CONSENT_VERSION = 1;

export type CookiePreferences = {
  analytics: boolean;
  marketing: boolean;
  necessary: true;
  savedAt: string;
  version: number;
};

export function createCookiePreferences(
  overrides: Partial<Pick<CookiePreferences, "analytics" | "marketing">> = {},
): CookiePreferences {
  return {
    analytics: overrides.analytics ?? false,
    marketing: overrides.marketing ?? false,
    necessary: true,
    savedAt: new Date().toISOString(),
    version: COOKIE_CONSENT_VERSION,
  };
}

export function parseCookiePreferences(raw: string | null): CookiePreferences | null {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.marketing !== "boolean"
    ) {
      return null;
    }

    return {
      analytics: parsed.analytics,
      marketing: parsed.marketing,
      necessary: true,
      savedAt: typeof parsed.savedAt === "string" ? parsed.savedAt : new Date().toISOString(),
      version: typeof parsed.version === "number" ? parsed.version : COOKIE_CONSENT_VERSION,
    };
  } catch {
    return null;
  }
}
