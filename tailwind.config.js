/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";
import fromPlugin from "@tailwindcss/forms";
export default {
  content: ["./index.html", "./src/**/*", "./src/component/**/*"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        urbanist: ["Urbanist", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      width: {
        66: "66%",
        88: "88%",
        70: "70%",
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "28px",
        "4xl": "32px",
        "5xl": "48px",
      },
      colors: {
        darkblack: {
          300: "#747681",
          400: "#2A313C",
          500: "#23262B",
          600: "#1D1E24",
          700: "#151515",
        },
        success: {
          50: "#D9FBE6",
          100: "#B7FFD1",
          200: "#4ADE80",
          300: "#22C55E",
          400: "#16A34A",
        },
        warning: {
          100: "#FDE047",
          200: "#FACC15",
          300: "#EAB308",
        },
        error: {
          50: "#FCDEDE",
          100: "#FF7171",
          200: "#FF4747",
          300: "#DD3333",
        },
        bgray: {
          50: "#FAFAFA",
          100: "#F7FAFC",
          200: "#EDF2F7",
          300: "#E2E8F0",
          400: "#CBD5E0",
          500: "#A0AEC0",
          600: "#718096",
          700: "#4A5568",
          800: "#2D3748",
          900: "#1A202C",
        },
        orange: "#FF784B",
        bamber: {
          50: "#FFFBEB",
          100: "#FFC837",
          500: "#F6A723",
        },
        purple: "#936DFF",
        primaryNew: "#B7FFD1",
        primary: "#22C55E",
        primaryBase: "#22C55E",
        portage: "#936DFF",
        basicInterface: "#04091E",
        basicInterface2: "#F5F5F5",
        basicInterface3: "#747681",
        basicWhite: "#747681",
        lightGray: "#F3F7F8",
        alertsWarningLight: "#FDE047",
        alertsWarningBase: "#FACC15",
        stockColor: "#CBCBCB",
        "primary-new": "#B7FFD1",
        alertsErrorBase: "#FF4747",
        gray: {
          50: "#FAFAFA",
          200: "#EDF2F7",
          300: "#E2E8F0",
          600: "#718096",
          800: "#232B38",
          700: "#2A313C",
          900: "#1A202C",
        },
        othersTeal: "#2DD4BF",
        othersOrange: "#FF784B",
        basicSecondary: "#1A202C",
        secondary: {
          100: "#F2F6FF",
          200: "#D8E3F8",
          300: "#74787B",
          400: "#363B46",
        },
      },
      lineHeight: {
        "extra-loose": "44.8px",
        "big-loose": "140%",
        130: "130%",
        150: "150%",
        160: "160%",
        175: "175%",
        180: "180%",
        200: "200%",
        220: "220%",
      },
      letterSpacing: {
        tight: "-0.96px",
        40: "-0.4px",
      },
      borderRadius: {
        20: "20px",
      },
    },
  },
  plugins: [
    fromPlugin,
    plugin(function ({ addVariant }) {
      addVariant("current", "&.active");
    }),
  ],
}

