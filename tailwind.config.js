module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "custom-gray": "#171717",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
