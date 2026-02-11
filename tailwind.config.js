/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sonar-bg': '#050806',
        'sonar-surface': '#0B1410',
        'sonar-accent': '#19C37D',
        'sonar-text': '#FFFFFF',
        'sonar-muted': '#B6C2BA',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
