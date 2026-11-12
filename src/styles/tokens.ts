/**
 * STO Ukraine design tokens - the single place for brand colours, type scale,
 * radii and shadows. Consumed by tailwind.config.ts.
 *
 * Palette follows the STO logo: ink black (#231F20), signal yellow (#FDD313)
 * and white. Yellow is a fill colour only - never use it for text on white.
 */
type FontSize = [string, { lineHeight?: string; letterSpacing?: string; fontWeight?: string }];

export const tokens = {
  colors: {
    brand: {
      DEFAULT: "#FDD313", // logo yellow
      hover: "#F2C400",
      soft: "#FFF6C7",
    },
    ink: {
      DEFAULT: "#231F20", // logo black
      soft: "#4A4546",
      muted: "#716C6D",
      deep: "#171415",
    },
    sand: {
      DEFAULT: "#F6F5F2",
      dark: "#ECEAE5",
    },
    line: {
      DEFAULT: "#E5E2DC",
      strong: "#CFCAC2",
      dark: "#3A3536",
    },
    danger: "#B42318",
    success: "#1F7A4D",
  },
  fontSize: <Record<string, FontSize>>{
    eyebrow: ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.12em", fontWeight: "700" }],
    h1: ["clamp(2.125rem, 1.4rem + 3vw, 3.75rem)", { lineHeight: "1.06", letterSpacing: "-0.025em", fontWeight: "800" }],
    h2: ["clamp(1.625rem, 1.25rem + 1.5vw, 2.5rem)", { lineHeight: "1.12", letterSpacing: "-0.02em", fontWeight: "800" }],
    h3: ["clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "700" }],
    lead: ["clamp(1rem, 0.95rem + 0.25vw, 1.125rem)", { lineHeight: "1.65" }],
    body: ["0.9375rem", { lineHeight: "1.7" }],
    small: ["0.8125rem", { lineHeight: "1.55" }],
  },
  radius: {
    card: "6px",
    button: "4px",
    chip: "999px",
  },
  shadow: {
    card: "0 1px 2px rgba(35, 31, 32, 0.05), 0 12px 32px -16px rgba(35, 31, 32, 0.22)",
    "card-hover": "0 2px 4px rgba(35, 31, 32, 0.06), 0 22px 44px -18px rgba(35, 31, 32, 0.32)",
    popup: "0 24px 64px -12px rgba(23, 20, 21, 0.45)",
  },
  container: { maxWidth: "1240px" },
  header: { height: "4.5rem" },
};
