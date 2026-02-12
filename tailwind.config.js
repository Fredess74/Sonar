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
        'sonar-accent': '#19C37D', // Neon Green
        'sonar-text': '#FFFFFF',
        'sonar-muted': '#B6C2BA',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 10px rgba(25, 195, 125, 0.5)',
        'neon-strong': '0 0 20px rgba(25, 195, 125, 0.8)',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(25, 195, 125, 0.2)' },
          '50%': { boxShadow: '0 0 20px rgba(25, 195, 125, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
