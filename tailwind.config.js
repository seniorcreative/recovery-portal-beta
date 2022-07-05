// tailwind.config.js
// const colors = require('tailwindcss/colors')
  
module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      dropShadow: {
        'xl': '0px 8px 30px rgba(0, 0, 0, 0.18)',
        'lg': '2px 2px 6px 1px rgba(0,0,0,0.2)',
        'md': '0px 0px 0px 1px rgba(0,0,0,0.1)'
      },
      lineHeight: {
        'none': '0'
      },
      outline: {
        blue: '2px solid #424b78',
      }
    },
    container: {
      center: true,
      padding: '1rem',
    },
    colors: {
      blue: {
        light: '#424b78',
        DEFAULT: '#424b78',
        dark: '#424b78',
      },
      white: {
        light: '#ffffff',
        DEFAULT: '#ffffff',
        dark: '#ffffff',
      },      
      black: {
        light: '#000000',
        DEFAULT: '#000000',
        dark: '#000000',
      },
      gray: {
        light: '#f7f7f7',
        DEFAULT: '#f3f3f3',
        dark: '#bababa',
        'variant-1': '#ECECEC'
      },
      beige: {
        light: '#F5F3F0',
        DEFAULT: '#F5F3F0',
        dark: '#F5F3F0',
      },
      yellow: {
        light: '#fdb813',
        DEFAULT: '#fdb813',
        dark: '#fdb813',
      },
      green: {
        light: '#EDF8EF',
        DEFAULT: '#477B4C',
        dark: '#477B4C',
      }
    }
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
}
