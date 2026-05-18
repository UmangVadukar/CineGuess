/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        cinema: {
          gold: '#f5c518',
          red: '#e50914',
          dark: '#0a0a0f',
          panel: '#14141f',
          border: '#2a2a3a',
        },
      },
      boxShadow: {
        glow: '0 0 40px rgba(245, 197, 24, 0.25)',
      },
    },
  },
  plugins: [],
}
