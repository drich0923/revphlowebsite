// app/og-image/route.jsx
// ============================================================
// This generates a dynamic OG image at /og-image
// Next.js will serve this as a PNG when shared on social media.
//
// ALTERNATIVE: If you prefer a static image, design a 1200x630px
// PNG in Figma/Canva and save it as /public/og-image.png
// ============================================================

import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#0F1117",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.15,
            backgroundImage:
              "radial-gradient(circle, #3361FF 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Blue accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "#3361FF",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            padding: "0 60px",
          }}
        >
          {/* Logo text */}
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "#3361FF",
              letterSpacing: -1,
            }}
          >
            RevPhlo
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#FFFFFF",
              textAlign: "center",
              lineHeight: 1.15,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            Stop Managing Your Sales Team Blind
          </div>

          {/* Subheadline */}
          <div
            style={{
              fontSize: 24,
              color: "#9CA3AF",
              textAlign: "center",
              lineHeight: 1.5,
              maxWidth: 700,
            }}
          >
            AI post-call notes · Revenue attribution · Live leaderboards ·
            Payment matching
          </div>

          {/* Pill tags */}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 16,
            }}
          >
            {["GoHighLevel", "Stripe", "Fathom", "Zoom", "Slack"].map(
              (tool) => (
                <div
                  key={tool}
                  style={{
                    padding: "8px 20px",
                    borderRadius: 100,
                    background: "rgba(51,97,255,0.12)",
                    border: "1px solid rgba(51,97,255,0.25)",
                    color: "#5B82FF",
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  {tool}
                </div>
              )
            )}
          </div>
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            fontSize: 18,
            color: "#4B5563",
            fontWeight: 500,
          }}
        >
          revphlo.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
