/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './app/**/*.{js,ts,jsx,tsx}', // If using the /app directory
    ],
    theme: {
      extend: {
  transformOrigin: {
    '3d-center': 'center',
  },
  perspective: {
    none: 'none',
    1000: '1000px',
  },
  transform: ['group-hover'],
}

    },
    plugins: [],
  }
  