import { ImageResponse } from "next/og";

export const alt =
  "Sulamith Richter — Software, die Prozesse vereinfacht.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#080B14",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Spotlight links – violett */}
        <div
          style={{
            position: "absolute",
            top: -160,
            left: -200,
            width: 760,
            height: 640,
            background:
              "radial-gradient(ellipse, rgba(99,60,220,0.5) 0%, rgba(99,60,220,0) 70%)",
          }}
        />
        {/* Spotlight rechts – blau */}
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -160,
            width: 640,
            height: 560,
            background:
              "radial-gradient(ellipse, rgba(59,130,246,0.32) 0%, rgba(59,130,246,0) 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "rgba(255,255,255,0.45)",
            letterSpacing: 4,
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          Web-Apps · KI-Integration · Automatisierung
        </div>

        <div
          style={{
            fontSize: 104,
            fontWeight: 700,
            lineHeight: 1.05,
            marginTop: 28,
            letterSpacing: -3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Software, die</span>
          <span
            style={{
              backgroundImage:
                "linear-gradient(135deg, #a78bfa 0%, #818cf8 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Prozesse vereinfacht.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 64,
          }}
        >
          <div
            style={{
              fontSize: 34,
              fontWeight: 600,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            Sulamith Richter
          </div>
          <div
            style={{
              fontSize: 24,
              color: "rgba(255,255,255,0.4)",
              fontWeight: 500,
            }}
          >
            sulamithrichter.ch
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
