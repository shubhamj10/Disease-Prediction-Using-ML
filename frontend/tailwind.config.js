/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize:{
        'custom': '1.2rem',
      },
      fontFamily:{
        'inter-tight': ['"Inter Tight"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}