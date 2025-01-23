import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '480px',
      'tablet': '640px',
      'md': '768px',
      'laptop': '1024px',
      'desktop': '1280px'
    },
    container: {
      center: true,
      screens: {
        DEFAULT: '100%',
        xl: '1280px',
        '2xl': '1440px'
      }
    },
    extend: {
      colors: {
        white: {
          light: '#ffffff',
          default: '#fafafa',
          dark: '#eef7fe'
        },
        grey: {
          light: '#2b3743',
          default: '#212e37'
        },
        black: '#0c1011'
      },
    },
  },
  darkMode: 'class',
  plugins: [],
} satisfies Config;
