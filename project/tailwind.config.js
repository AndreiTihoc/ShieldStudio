/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00FFFF',
        'neon-magenta': '#FF00FF',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'neon': '0 0 15px rgba(255, 255, 255, 0.1)',
        'neon-hover': '0 0 30px rgba(255, 255, 255, 0.2)',
      },
    },
  },
  plugins: [],
};