/** @type {import('tailwindcss').Config} */
/* eslint-env node*/
module.exports = {
  content: ["./index.html",
            "./src/**/*.{vue,js,ts,jsx,tsx}" ],
  theme: {
    extend: {
      // colors: {
      //   'button': {
      //     DEFAULT: '#6366f1', // indigo-500
      //     'hover': '#4f46e5', // indigo-600
      //     'active': '#4338ca', // indigo-700
      //   },
      //   'button-text': {
      //     DEFAULT: '#ffffff', // white
      //     'hover': '#fef08a', // yellow-200
      //     'active': '#fde047', // yellow-300
      //   },
      // },
      // boxShadow: {
      //   'button': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      //   'button-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      // },
    },
  },
  // variants: {
  //   extend: {
  //     backgroundColor: ['active'],
  //     textColor: ['active'],
  //     transform: ['hover', 'active'],
  //   },
  // },
  plugins: [],
}

// tailwind.config.js
