/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0B0B0F',
        midnight: '#0F172A',
        neon: '#00F2FE',
        platinum: '#E2E8F0'
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'antigravity': 'float 8s ease-in-out infinite',
        'antigravity-slow': 'float 12s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-15px) rotate(2deg)' },
          '50%': { transform: 'translateY(-5px) rotate(-1deg)' },
          '75%': { transform: 'translateY(10px) rotate(1deg)' },
        }
      }
    },
  },
  plugins: [],
}
