/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'mobile': '320px',
        // => @media (min-width: 320px) { ... }
  
        'mobile-md': '375px',
        // => @media (min-width: 375px) { ... }
  
        'mobile-lp': '425px',
        // => @media (min-width: 767px) { ... }
  
        'tablet': '768px',
        // => @media (min-width: 768px) { ... }
  
        'tablet-lp': '1023px',
        // => @media (min-width: 1023px) { ... }
  
        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'desktop': '1440px',
        // => @media (min-width: 1440px) { ... }
      },
      boxShadow:{
        shape: '0px 8px 8px rgba(0, 0, 0, 0.1), 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 2px 2px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(0, 0, 0, 0.1), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.03), inset 0px 1px 0px rgba(255, 255, 255, 0.03)',
      },
      fontFamily:{
        sans: 'Inter',
      },
      backgroundImage: {
        pattern: 'url(/bg.png)'
      }
    },
  },
  plugins: [],
}