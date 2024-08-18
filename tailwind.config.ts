import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Calibri", "sans-serif"],
        serif: ["Lora", "serif"],
      },
      colors: {
        bgDark: "#0F0F0F",
        bgDarkShade: "#111111",
        componentDark: "#1A1A1A",
        textGray: "#cccccc",
      },
    },
  },
  plugins: [],
} satisfies Config;
