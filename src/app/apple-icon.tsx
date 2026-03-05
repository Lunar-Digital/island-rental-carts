import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Apple touch icon (home screen) — matches the header logo: lime background, dark "IRC" text.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#a3e635",
          borderRadius: "24px",
        }}
      >
        <span
          style={{
            color: "#022c22",
            fontSize: "72px",
            fontWeight: 900,
            letterSpacing: "-2px",
          }}
        >
          IRC
        </span>
      </div>
    ),
    { ...size }
  );
}
