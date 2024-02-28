module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      transitionProperty: {
        "width": "width",
        "spacing": 'margin, padding',
      },
      maxWidth: {
        "8xl": "100rem",
      },
      colors: {
        'primary': '#FFCC4F',
        'c-black': '#2C2C2C',
        'c-black-2': '#383838',
        'c-black-3': '#404040',
      },
      screens: {
        "2xsmall": "320px",
        "xsmall": "512px",
        "small": "1024px",
        "medium": "1280px",
        "large": "1440px",
        "xlarge": "1680px",
        "2xlarge": "1920px",
      },
      fontFamily: {
        roboto: ['Roboto',],
        inter: ['Inter',],
        montserrat: ['Montserrat',],
        sans: [
          "var(--font-inter)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Montserrat",
          "Ubuntu",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
