/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/*.jsx',
    './src/components/*.jsx',
    './index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        'pokemon': ['Pokemon']
      },
    },
  },
  plugins: [],
}

