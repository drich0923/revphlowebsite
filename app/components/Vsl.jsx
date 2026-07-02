"use client";
import { useEffect, useRef, useState } from "react";

const EMBED_ID = "vidalytics_embed_qY0sZQMIwMDYGr3T";
const BASE_URL = "https://fast.vidalytics.com/embeds/Xbxuo1Sw/qY0sZQMIwMDYGr3T/";

// Hero VSL facade: hovering the poster only preloads the Vidalytics script;
// the poster is revealed away only after a real click AND only once an
// iframe/video has actually mounted — if the embed host is blocked, the
// play button stays (no dead black box).
export default function VslPlayer() {
  const [posterGone, setPosterGone] = useState(false);
  const injected = useRef(false);
  const armed = useRef(false);
  const embedRef = useRef(null);
  const posterRef = useRef(null);
  const posterHadFocus = useRef(false);
  const scriptRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (scriptRef.current) scriptRef.current.remove();
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (posterGone && posterHadFocus.current) embedRef.current?.focus();
  }, [posterGone]);

  const reveal = () => {
    posterHadFocus.current = document.activeElement === posterRef.current;
    setPosterGone(true);
  };

  const maybeReveal = () => {
    if (!armed.current) return;
    const target = embedRef.current;
    if (target && target.querySelector("iframe, video")) {
      reveal();
      return;
    }
    if (target && !observerRef.current) {
      const mo = new MutationObserver(() => {
        if (armed.current && target.querySelector("iframe, video")) {
          mo.disconnect();
          observerRef.current = null;
          reveal();
        }
      });
      mo.observe(target, { childList: true, subtree: true });
      observerRef.current = mo;
    }
  };

  const inject = () => {
    if (injected.current) return;
    injected.current = true;
    const s = document.createElement("script");
    s.innerHTML = `(function (v, i, d, a, l, y, t, c, s) {
      y='_'+d.toLowerCase();c=d+'L';if(!v[d]){v[d]={}}if(!v[c]){v[c]={}}if(!v[y]){v[y]={}}var vl='Loader',vli=v[y][vl],vsl=v[c][vl + 'Script'],vlf=v[c][vl + 'Loaded'],ve='Embed';
      if (!vsl) { vsl = function (u, cb) { if (t) { cb(); return; } s = i.createElement("script"); s.type = "text/javascript"; s.async = 1; s.src = u;
      if (s.readyState) { s.onreadystatechange = function () { if (s.readyState === "loaded" || s.readyState == "complete") { s.onreadystatechange = null; vlf = 1; cb(); } }; } else { s.onload = function () { vlf = 1; cb(); }; }
      i.getElementsByTagName("head")[0].appendChild(s); }; }
      vsl(l + 'loader.min.js', function () { if (!vli) { var vlc = v[c][vl]; vli = new vlc(); } vli.loadScript(l + 'player.min.js', function () { var vec = v[d][ve]; t = new vec(); t.run(a); }); });
    })(window, document, 'Vidalytics', '${EMBED_ID}', '${BASE_URL}');`;
    document.body.appendChild(s);
    scriptRef.current = s;
  };

  const onPlayClick = () => {
    armed.current = true;
    inject();
    maybeReveal();
  };

  return (
    <div className="vsl__player" id="vsl">
      <div id={EMBED_ID} ref={embedRef} className="vsl__embed" tabIndex={-1} />
      <button
        ref={posterRef}
        className={`vsl__poster ${posterGone ? "vsl__poster--gone" : ""}`}
        aria-label="Play the 3-minute demo video"
        aria-hidden={posterGone}
        tabIndex={posterGone ? -1 : 0}
        onPointerOver={inject}
        onClick={onPlayClick}
      >
        <span className="vsl__play">
          <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
            <path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" />
          </svg>
        </span>
        <span className="vsl__duration">03:00</span>
      </button>
    </div>
  );
}
