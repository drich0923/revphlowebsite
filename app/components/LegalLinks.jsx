"use client";

import CookieSettingsLink from "./CookieSettingsLink";

export default function LegalLinks({ style, showDoNotSell = false }) {
  const linkStyle = { fontSize: 13, color: "#4B5563", textDecoration: "none", ...style };
  const buttonStyle = {
    ...linkStyle,
    background: "none",
    border: 0,
    padding: 0,
    cursor: "pointer",
    font: "inherit",
  };

  return (
    <>
      <a href="/privacy-policy" style={linkStyle}>Privacy Policy</a>
      <a href="/terms-of-service" style={linkStyle}>Terms of Service</a>
      <a href="/cookie-policy" style={linkStyle}>Cookie Policy</a>
      {showDoNotSell ? (
        <a href="/privacy-policy#do-not-sell-or-share" style={linkStyle}>
          Do Not Sell or Share My Personal Information
        </a>
      ) : null}
      <CookieSettingsLink style={buttonStyle} />
    </>
  );
}
