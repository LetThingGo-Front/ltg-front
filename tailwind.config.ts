import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "ltg-gradient-r":
          "linear-gradient(90deg, rgba(183, 183, 183, 0.1) 0%, rgba(225, 244, 82, 0.046) 100%)",
        "ltg-gradient-b":
          "linear-gradient(180deg, rgba(183, 183, 183, 0.1) 0%, rgba(225, 244, 82, 0.046) 100%)",
      },
      boxShadow: {
        ltg: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
      },
      fontSize: {
        xxxs: ["0.5rem", { lineHeight: "0.75rem" }],
        xxs: ["0.625rem", { lineHeight: "0.875rem" }],
      },
      colors: {
        green: {
          50: "#FBFDE7",
          100: "#F8FCD4",
          200: "#F0F9A9",
          300: "#E9F77E",
          400: "#E1F452",
          500: "#DAF127",
          600: "#C4DD0E",
          700: "#9EB10B",
          800: "#788609",
          900: "#515B06",
        },
        grey: {
          50: "#F2F2F2",
          100: "#E8E8E8",
          200: "#D1D1D1",
          300: "#BABABA",
          400: "#A3A3A3",
          500: "#8C8C8C",
          600: "#757575",
          700: "#5E5E5E",
          800: "#474747",
          900: "#303030",
        },
        blue: {
          50: "#E6F2FE",
          100: "#D2E8FE",
          200: "#A6D1FC",
          300: "#79BAFB",
          400: "#4DA3F9",
          500: "#208CF8",
          600: "#0775E4",
          700: "#065EB7",
          800: "#04478B",
          900: "#03305E",
        },
        red: {
          50: "#FFF0F5",
          100: "#FFD1DE",
          200: "#FFA3BD",
          300: "#FF759C",
          400: "#FF477B",
          500: "#FF1A5B",
          600: "#EB0042",
          700: "#BD0035",
          800: "#8F0028",
          900: "#61001B",
        },
      },
      padding: {
        "safe-top": "env(safe-area-inset-top)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
