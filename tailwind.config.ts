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
        bgDark: "#070707",
        bgLessDark: "#151515",
        textWhite: "#DDDDDD",
        textLightGray: "#BBBBBB",
        textDarkGray: "#444444",
        textBlack: "#222222",
      },
    },
  },
  plugins: [],
} satisfies Config;
