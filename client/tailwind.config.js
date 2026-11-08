/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        bgDark: '#08090b',
        gold: {
          300: '#FDE047',
          400: '#EAB308',
          500: '#D4AF37',
          600: '#B8860B',
        }
      }
    },
  },
  plugins: [],
}