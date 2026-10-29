"use client";

import {
  CONSENT_CHANGE_EVENT,
  CONSENT_COOKIE,
  CONSENT_MAX_AGE_SECONDS,
  CONSENT_STORAGE_KEY,
  GOOGLE_ADS_ID,
  GOOGLE_CONSENT_DENIED,
  GOOGLE_CONSENT_GRANTED,
  TRACKING_COOKIE_NAMES,
  effectiveChoice,
  readChoiceFromCookie,
} from "../consent/consent.mjs";

export function globalPrivacyControlEnabled() {
  return typeof navigator !== "undefined" && navigator.globalPrivacyControl === true;
}

export function readStoredChoice() {
  if (typeof document === "undefined") return null;
  const fromCookie = readChoiceFromCookie(document.cookie);
  if (fromCookie) return fromCookie;
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return stored === "accepted" || stored === "rejected" ? stored : null;
  } catch {
    return null;
  }
}

export function currentChoice() {
  return effectiveChoice({
    stored: readStoredChoice(),
    globalPrivacyControl: globalPrivacyControlEnabled(),
  });
}

export function writeStoredChoice(choice) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${choice}; Path=/; Max-Age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // The cookie still records the choice when storage is blocked.
  }
}

function expireCookie(name, domain) {
  const domainAttr = domain ? `; Domain=${domain}` : "";
  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax${domainAttr}`;
}

export function clearTrackingStorage() {
  const host = window.location.hostname;
  const domains = new Set([host, `.${host}`]);
  if (host.endsWith("revphlo.com")) domains.add(".revphlo.com");
  for (const name of TRACKING_COOKIE_NAMES) {
    expireCookie(name);
    for (const domain of domains) expireCookie(name, domain);
  }
  try {
    window.localStorage.removeItem("_gcl_ls");
  } catch {
    // Ignore storage access errors.
  }
}

function updateGoogleConsent(granted) {
  if (typeof window.gtag !== "function") return;
  window.gtag("consent", "update", granted ? GOOGLE_CONSENT_GRANTED : GOOGLE_CONSENT_DENIED);
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

let optionalScriptsStarted = false;

export function loadOptionalScripts() {
  if (optionalScriptsStarted) return;
  if (currentChoice() !== "accepted") return;
  if (typeof window.gtag !== "function") return;
  optionalScriptsStarted = true;
  updateGoogleConsent(true);
  window.gtag("js", new Date());
  window.gtag("config", GOOGLE_ADS_ID);
  const gtagSrc = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
  loadScript(gtagSrc)
    .then(() => loadScript("/fprmain.js"))
    .then(() => loadScript("https://cdn.firstpromoter.com/fpr.js"))
    .catch(() => {
      optionalScriptsStarted = false;
    });
}

export function publishChoice(choice) {
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: choice }));
}

export function applyChoice(choice) {
  if (choice === "accepted") {
    loadOptionalScripts();
    return;
  }
  updateGoogleConsent(false);
  clearTrackingStorage();
}
