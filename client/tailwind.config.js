/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6948e0",
        "primary-content": "#ffffff",
        "primary-dark": "#4923d1",
        "primary-light": "#8d74e7",

        secondary: "#e04873",
        "secondary-content": "#ffffff",
        "secondary-dark": "#d12355",
        "secondary-light": "#e77494",

        background: "#efeff1",
        foreground: "#fbfbfb",
        border: "#dedde2",

        copy: "#252329",
        "copy-light": "#625e6e",
        "copy-lighter": "#878495",

        success: "#48e048",
        warning: "#e0e048",
        error: "#e04848",

        "success-content": "#062306",
        "warning-content": "#232306",
        "error-content": "#ffffff",
      },
    },
  },
  plugins: [],
};
