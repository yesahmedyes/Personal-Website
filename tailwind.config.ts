import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        serif: ["Lora", "serif"],
      },
      colors: {
        bgDark: "#0D0D0D",
        textGrayDark: "#CCCCCC",
        textGrayLight: "#7D7D7D",
      },
    },
  },
  plugins: [],
} satisfies Config;
