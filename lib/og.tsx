import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

const CHARCOAL = "#20242c";
const CHARCOAL_RAISED = "#262b34";
const AMBER = "#e3a857";
const TEAL = "#4fa6a0";
const PAPER = "#f1ede3";
const MUTED = "#a7a49b";

export function buildOgImage({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: CHARCOAL,
        padding: "72px 84px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: 14,
            height: 14,
            background: AMBER,
            marginRight: 16,
          }}
        />
        <div
          style={{
            color: AMBER,
            fontSize: 26,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div
          style={{
            color: PAPER,
            fontSize: title.length > 46 ? 62 : 76,
            fontWeight: 700,
            lineHeight: 1.12,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        {description && (
          <div
            style={{
              color: MUTED,
              fontSize: 30,
              lineHeight: 1.4,
              maxWidth: 920,
            }}
          >
            {description}
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: TEAL,
            fontSize: 24,
          }}
        >
          start.fastorial.dev
        </div>
        <div
          style={{
            display: "flex",
            width: 220,
            height: 6,
            background: CHARCOAL_RAISED,
          }}
        >
          <div
            style={{ width: "62%", height: "100%", background: AMBER, display: "flex" }}
          />
        </div>
      </div>
    </div>,
    { ...OG_SIZE },
  );
}
