"use client";

import { OPEN_SETTINGS_EVENT } from "../consent/consent.mjs";

export default function CookieSettingsLink({ className, style, children = "Cookie settings" }) {
  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}
    >
      {children}
    </button>
  );
}
