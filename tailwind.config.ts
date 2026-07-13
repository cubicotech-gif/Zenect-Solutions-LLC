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
        // Palette drawn from the Zenect wordmark (navy + teal) in an
        // AliMed-style commerce language: white surfaces, a royal-blue brand,
        // a teal accent from the handshake mark, and a warm gold call-to-action.
        paper: "#FFFFFF",
        panel: "#F4F8FC",
        navy: "#0A2A5E",
        ink: "#12283F",
        graphite: "#45586E",
        mist: "#8496A8",
        hairline: "#E2E9F1",
        brand: {
          DEFAULT: "#0B57C2",
          deep: "#0942A0",
          soft: "#3F86E0",
        },
        teal: {
          DEFAULT: "#14AEC6",
          deep: "#0E8CA0",
          soft: "#6FD0DE",
        },
        gold: {
          DEFAULT: "#F6B40A",
          deep: "#DE9E00",
        },
        sky: "#E6F2FC",
        skyline: "#CFE4F7",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      letterSpacing: {
        label: "0.12em",
        wordmark: "-0.01em",
      },
      maxWidth: {
        grid: "1280px",
      },
      borderRadius: {
        // Soft, friendly commerce personality.
        sm: "0.375rem",
        DEFAULT: "0.625rem",
        lg: "0.875rem",
        xl: "1.125rem",
        "2xl": "1.5rem",
        full: "9999px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,42,94,0.04), 0 8px 24px rgba(10,42,94,0.06)",
        lift: "0 4px 10px rgba(10,42,94,0.08), 0 18px 40px rgba(10,42,94,0.12)",
        pill: "0 6px 16px rgba(11,87,194,0.28)",
      },
      fontSize: {
        kicker: ["0.72rem", { lineHeight: "1rem", letterSpacing: "0.12em" }],
      },
      backgroundImage: {
        "brand-sweep":
          "linear-gradient(135deg, #0A2A5E 0%, #0B57C2 55%, #0E8CA0 120%)",
        "teal-sweep": "linear-gradient(135deg, #0E8CA0 0%, #14AEC6 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
