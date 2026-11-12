import type { Config } from "tailwindcss";
import { tokens } from "./src/styles/tokens";

const config: Config = {
  content: ["./src/components/**/*.{ts,tsx}", "./src/app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: tokens.colors,
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: tokens.fontSize,
      borderRadius: tokens.radius,
      boxShadow: tokens.shadow,
      maxWidth: { container: tokens.container.maxWidth },
      spacing: { header: tokens.header.height },
    },
  },
  plugins: [],
};
export default config;
