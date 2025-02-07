import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"
import { PluginAPI } from "tailwindcss/types/config"

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}"
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
          default: '#212e37',
          medium: '#808080',
          soft: '#dedee2'
        },
        blue: {
          light: '#d2dcfc',
          default: '#6366f1'
        },
        black: '#0c1011'
      },
      boxShadow: {
        'input': '0 0 0 3px rgb(199, 210, 254)',
        'header': '0 1px 15px 3px rgba(0, 0, 0, 0.1)',
        'box': '0 0 15px 5px rgba(0, 0, 0, 0.1)',
        'box-hover': '0 0 15px 5px rgba(99, 102, 241, 1)'
      },
      animation: {
        'appear': 'appear 300ms ease-in'
      },
      keyframes: {
        appear: {
          'from': {opacity: '0'},
          'to': {opacity: '1'}
        }
      },
      transitionProperty: {
        'filter': 'filter'
      }
    },
  },
  darkMode: 'class',
  plugins: [
    plugin(({addVariant, addUtilities}: PluginAPI) => {
      addVariant("starting", "@starting-style")
      addUtilities({
        '.transition-discrete': {
          transitionBehavior: 'allow-discrete'
        }
      })
    })
  ],
  future: {
    hoverOnlyWhenSupported: true
  }
} satisfies Config;
