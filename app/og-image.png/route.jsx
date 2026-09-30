import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Generate once at build time so crawlers receive a fast, public PNG.
export const dynamic = "force-static";

export async function GET() {
  const logo = await readFile(join(process.cwd(), "public", "logo.png"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "58px 68px",
          background: "#0a0b0f",
          color: "#f4f5f7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <img src={`data:image/png;base64,${logo.toString("base64")}`} width={256} height={78} alt="RevPhlo" />
          <div style={{ display: "flex", fontSize: 21, color: "#a7aebb" }}>BUILT FOR HIGH-TICKET SALES TEAMS</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 12 }}>
          <div style={{ display: "flex", fontSize: 70, fontWeight: 700, lineHeight: 1.12, letterSpacing: -2 }}>
            Post-booking
          </div>
          <div style={{ display: "flex", fontSize: 70, fontWeight: 700, lineHeight: 1.12, letterSpacing: -2, color: "#93acff" }}>
            sales intelligence.
          </div>
          <div style={{ display: "flex", marginTop: 25, fontSize: 28, color: "#a7aebb" }}>
            Every call. Every dollar. One dashboard.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #2b303c", paddingTop: 27 }}>
          <div style={{ display: "flex", gap: 28, fontSize: 21, color: "#d1d6e0" }}>
            <span>AI call notes</span>
            <span style={{ color: "#3361ff" }}>•</span>
            <span>Revenue attribution</span>
            <span style={{ color: "#3361ff" }}>•</span>
            <span>Live leaderboards</span>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#93acff" }}>revphlo.com</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
