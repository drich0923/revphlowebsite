"use client";

import { useEffect, useId, useRef, useState } from "react";
import { OPEN_SETTINGS_EVENT } from "../consent/consent.mjs";
import {
  applyChoice,
  currentChoice,
  globalPrivacyControlEnabled,
  publishChoice,
  readStoredChoice,
  writeStoredChoice,
} from "./consent-storage";
import styles from "./consent.module.css";

export default function ConsentManager() {
  const titleId = useId();
  const rejectRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [gpc, setGpc] = useState(false);
  const [stored, setStored] = useState(null);

  useEffect(() => {
    const gpcOn = globalPrivacyControlEnabled();
    let storedChoice = readStoredChoice();
    if (gpcOn && storedChoice !== "rejected") {
      writeStoredChoice("rejected");
      storedChoice = "rejected";
    }
    const choice = currentChoice();
    setGpc(gpcOn);
    setStored(storedChoice);
    if (choice === "accepted" || choice === "rejected") applyChoice(choice);
    setOpen(choice === null);
    setReady(true);

    const openSettings = () => setOpen(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, openSettings);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    rejectRef.current?.focus();
    function onKeyDown(event) {
      if (event.key !== "Escape") return;
      const choice = currentChoice();
      if (choice === "accepted" || choice === "rejected") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function choose(next) {
    const gpcOn = globalPrivacyControlEnabled();
    const applied = gpcOn ? "rejected" : next;
    writeStoredChoice(applied);
    setGpc(gpcOn);
    setStored(applied);
    applyChoice(applied);
    publishChoice(applied);
    setOpen(false);
  }

  if (!ready || !open) return null;

  return (
    <div className={styles.backdrop}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <h2 id={titleId} className={styles.title}>Cookies on RevPhlo</h2>
        <p className={styles.body}>
          We store a cookie to remember this choice. If you accept, we load Google Ads
          (remarketing), FirstPromoter (affiliate measurement), the Vidalytics video player,
          and the Typeform booking form. Those tools can set their own cookies and recognize
          this browser across sites. Reject leaves them off.{" "}
          <a href="/cookie-policy">Cookie policy</a>
          {" · "}
          <a href="/privacy-policy#do-not-sell-or-share">Do not sell or share</a>
        </p>
        {gpc ? (
          <p className={styles.note}>
            Your browser sent a Global Privacy Control signal. RevPhlo treats that as Reject,
            so advertising and affiliate cookies stay off.
          </p>
        ) : null}
        {stored ? (
          <p className={styles.note}>
            Current choice: {gpc ? "Rejected (Global Privacy Control)" : stored === "accepted" ? "Accepted" : "Rejected"}.
          </p>
        ) : null}
        <div className={styles.actions}>
          <button
            ref={rejectRef}
            type="button"
            className={styles.choice}
            data-consent-choice="reject"
            onClick={() => choose("rejected")}
          >
            Reject
          </button>
          <button
            type="button"
            className={styles.choice}
            data-consent-choice="accept"
            disabled={gpc}
            onClick={() => choose("accepted")}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
