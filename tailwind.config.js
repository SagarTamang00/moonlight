/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        moon: {
          black: '#050505',
          dark: '#0a0a0a',
          grey: '#1a1a1a',
          silver: '#c0c0c0',
          white: '#f0f0f0',
        }
      },
      fontFamily: {
        cinematic: ['"Bebas Neue"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}