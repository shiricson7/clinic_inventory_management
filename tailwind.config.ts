import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg))",
        surface: "rgb(var(--surface))",
        ink: "rgb(var(--ink))",
        muted: "rgb(var(--muted))",
        accent: "rgb(var(--accent))",
        "accent-2": "rgb(var(--accent-2))",
        border: "rgb(var(--border))",
        soft: "rgb(var(--soft))",
        danger: "rgb(var(--danger))"
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 20px 50px rgba(15, 23, 42, 0.12)",
        lift: "0 12px 30px rgba(15, 23, 42, 0.16)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards"
      }
    }
  },
  plugins: []
};

export default config;
