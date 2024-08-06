import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        serif: ["Lora", "serif"],
      },
      colors: {
        darkBackground: "#111111",
        gray: "#9F9F9F"
      },
    },
  },
  plugins: [],
} satisfies Config;
