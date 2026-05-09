/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      colors: {
        moon: {
          black: "#050505",
          dark: "#0a0a0a",
          grey: "#1a1a1a",
          silver: "#c0c0c0",
          white: "#f0f0f0",

          // extra shades
          soft: "#f6f6f7",
          border: "#ececec",
          card: "#ffffff",
          darkcard: "#181818",
          darkborder: "#2a2a2a",
        },
      },

      fontFamily: {
        cinematic: ['"Bebas Neue"', "sans-serif"],
        body: ['"Inter"', "sans-serif"],
        syne: ['"Syne"', "sans-serif"],
        outfit: ['"Outfit"', "sans-serif"],
      },

      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.05)",
        dark: "0 10px 30px rgba(0,0,0,0.35)",
      },

      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },

      transitionDuration: {
        400: "400ms",
      },
    },
    
  },

  plugins: [],
};