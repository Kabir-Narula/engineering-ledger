import type { Config } from "tailwindcss";

/**
 * Bespoke design tokens. Every color the UI uses is defined as an OKLCH
 * custom property in globals.css and mapped here under a semantic name —
 * no default Tailwind palette colors are used anywhere in the design.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "var(--paper)",
          raised: "var(--paper-raised)",
          sunken: "var(--paper-sunken)",
        },
        ink: {
          DEFAULT: "var(--ink)",
          soft: "var(--ink-soft)",
          faint: "var(--ink-faint)",
        },
        copper: {
          DEFAULT: "var(--copper)",
          soft: "var(--copper-soft)",
          faint: "var(--copper-faint)",
        },
        mineral: "var(--mineral)",
        editor: {
          DEFAULT: "var(--editor)",
          raised: "var(--editor-raised)",
          sunken: "var(--editor-sunken)",
          ink: "var(--editor-ink)",
          soft: "var(--editor-soft)",
          faint: "var(--editor-faint)",
        },
      },
      borderColor: {
        hairline: "var(--hairline)",
        "hairline-strong": "var(--hairline-strong)",
        "editor-line": "var(--editor-line)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        ledger: "0.14em",
      },
      maxWidth: {
        measure: "68ch",
      },
      transitionTimingFunction: {
        ledger: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
