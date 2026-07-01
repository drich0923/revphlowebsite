"use client";
import { useEffect, useRef, useState } from "react";

const EMBED_ID = "vidalytics_embed_qY0sZQMIwMDYGr3T";
const BASE_URL = "https://fast.vidalytics.com/embeds/Xbxuo1Sw/qY0sZQMIwMDYGr3T/";

export default function Vsl() {
  const [posterGone, setPosterGone] = useState(false);
  const injected = useRef(false);
  const embedRef = useRef(null);
  const scriptRef = useRef(null);

  useEffect(() => {
    return () => {
      if (scriptRef.current) scriptRef.current.remove();
    };
  }, []);

  const inject = () => {
    if (injected.current) return;
    injected.current = true;

    // Fade the poster once the player actually mounts (iframe/video appears);
    // 4s timeout is the fallback so there is never a dead state.
    const target = embedRef.current;
    const done = () => setPosterGone(true);
    const timeout = setTimeout(done, 4000);
    if (target) {
      const mo = new MutationObserver(() => {
        if (target.querySelector("iframe, video")) {
          clearTimeout(timeout);
          mo.disconnect();
          done();
        }
      });
      mo.observe(target, { childList: true, subtree: true });
    }

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

  return (
    <section className="vsl" id="vsl">
      <div className="container">
        <div className="protocol protocol--center" data-reveal>
          <span className="protocol__index">02</span>
          <span className="protocol__eyebrow">See It In Action</span>
          <span className="protocol__tick" aria-hidden="true" />
        </div>
        <h2 className="h2 vsl__h2" data-reveal>
          3 minutes to see what
          <br />
          you&rsquo;ve been missing
        </h2>
        <p className="vsl__body" data-reveal>
          Watch how RevPhlo replaces broken reporting with real-time sales intelligence &mdash; from
          connect to dashboard.
        </p>
        <div className="vsl__player" data-reveal>
          <div id={EMBED_ID} ref={embedRef} className="vsl__embed" />
          <button
            className={`vsl__poster ${posterGone ? "vsl__poster--gone" : ""}`}
            aria-label="Play the 3-minute demo video"
            aria-hidden={posterGone}
            tabIndex={posterGone ? -1 : 0}
            onPointerOver={inject}
            onClick={inject}
          >
            <span className="vsl__play">
              <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
                <path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" />
              </svg>
            </span>
            <span className="vsl__duration">03:00</span>
          </button>
        </div>
      </div>
    </section>
  );
}
