export const CONSENT_COOKIE = "revphlo_consent";
export const CONSENT_STORAGE_KEY = "revphlo_consent";
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;
export const OPEN_SETTINGS_EVENT = "revphlo:open-cookie-settings";
export const CONSENT_CHANGE_EVENT = "revphlo:consent-change";

export const GOOGLE_ADS_ID = "AW-17985869159";

// Google Consent Mode v2. Every storage signal starts denied, including
// security_storage. The tag library is not downloaded until Accept.
export const GOOGLE_CONSENT_DENIED = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  functionality_storage: "denied",
  personalization_storage: "denied",
  security_storage: "denied",
};

export const GOOGLE_CONSENT_GRANTED = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
  functionality_storage: "granted",
  personalization_storage: "granted",
  security_storage: "granted",
};

export const TRACKING_COOKIE_NAMES = [
  "_gcl_au",
  "_gcl_aw",
  "_gcl_dc",
  "_gcl_gs",
  "_gcl_gb",
  "_fprom_tid",
  "_fprom_ref",
  "_fprom_utms",
  "vidalytics_uid",
];

export function consentDefaultSnippet() {
  const payload = { ...GOOGLE_CONSENT_DENIED, wait_for_update: 500 };
  return `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',${JSON.stringify(payload)});gtag('set','ads_data_redaction',true);gtag('set','url_passthrough',true);`;
}

export function normalizeChoice(value) {
  return value === "accepted" || value === "rejected" ? value : null;
}

export function readChoiceFromCookie(cookieString) {
  if (typeof cookieString !== "string" || !cookieString) return null;
  for (const part of cookieString.split(";")) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    const name = part.slice(0, eq).trim();
    if (name !== CONSENT_COOKIE) continue;
    let raw = part.slice(eq + 1).trim();
    try {
      raw = decodeURIComponent(raw);
    } catch {
      // Keep the raw value when it is not encoded.
    }
    return normalizeChoice(raw);
  }
  return null;
}

export function effectiveChoice({ stored = null, globalPrivacyControl = false } = {}) {
  if (globalPrivacyControl) return "rejected";
  return normalizeChoice(stored);
}

export function shouldLoadOptionalScripts(choice) {
  return choice === "accepted";
}
