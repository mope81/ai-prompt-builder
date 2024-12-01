/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f5f8ff',
          100: '#ebf1ff',
          200: '#d6e4ff',
          300: '#b3ccff',
          400: '#809fff',
          500: '#4d73ff',
          600: '#1a46ff',
          700: '#0033ff',
          800: '#0029cc',
          900: '#001f99',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
