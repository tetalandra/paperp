/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
            gold: {
                200: '#fde68a',
                300: '#fcd34d',
                400: '#fbbf24',
                500: '#f59e0b',
                600: '#d97706',
                700: '#b45309',
            }
        },
        fontFamily: {
            cursive: ['Great Vibes', 'cursive'],
            serif: ['Playfair Display', 'serif'],
            sans: ['Inter', 'sans-serif'],
        }
      },
    },
    plugins: [],
  }
