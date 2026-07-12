import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm off-white paper base, ink text, single clay signature accent.
        paper: "#F4F1EA",
        panel: "#FBFAF6",
        ink: "#1A1815",
        graphite: "#57534B",
        mist: "#8A857A",
        hairline: "#D9D3C6",
        clay: {
          DEFAULT: "#B4573A",
          soft: "#C7715A",
          deep: "#8F4029",
          wash: "#EFE2DA",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        label: "0.22em",
        wordmark: "-0.02em",
      },
      maxWidth: {
        grid: "1240px",
      },
      borderRadius: {
        // Sharp Swiss personality — near-zero rounding.
        none: "0px",
        sm: "1px",
      },
      boxShadow: {
        raise: "0 1px 0 0 #D9D3C6",
      },
      fontSize: {
        kicker: ["0.72rem", { lineHeight: "1rem", letterSpacing: "0.22em" }],
      },
    },
  },
  plugins: [],
};

export default config;
