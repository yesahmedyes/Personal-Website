import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        // sans: ["Manrope", "sans-serif"],
        serif: ["Lora", "serif"],
      },
      colors: {
        bgDark: "#000000",
        textWhite: "#DDDDDD",
        textGray: "#AAAAAA",
        textBlack: "#222222",
      },
    },
  },
  plugins: [],
} satisfies Config;
