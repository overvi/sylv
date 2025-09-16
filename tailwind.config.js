/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: ["./*.html"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "4.5625rem",
      },
    },
    fontFamily: {
      inter: ['"Inter"'],
      roboto: ['"Roboto"'],
      hand: ['"JustAnotherHand"'],
      yekan: ["yekan"],
    },
    screens: {
      xs: "480px",
      sm: "640px", // 480px
      md: "768px", // 640px
      lg: "1024px", // 768px
      xl: "1280px", // 1024px
      "2xl": "1536px", // 1280px
      "3xl": "1920px", // 1536px
    },
    extend: {
      colors: {
        "main-color": "var(--main-color)",
        "neutral-150": "rgb(240,240,240)",
        "neutral-450": "#7D7D7D",
        "red-base": "#BA003E",
        "red-hover": "#E15E8A",
        "slateblue-base": "#2C2C43",
        "slateblue-hover": "#6C6C9F",
        "orange-base": "#F5A038",
        "orange-hover": "#FEBD6E",
        "green-base": "#01936F",
        "green-hover": "#7DB2A5",
        mintcream: "#EEF6F4",
      },
      spacing: {
        "2xl": "100px",
      },
      fontSize: {
        "1xl": [
          "1.375rem",
          {
            lineHeight: "1.875rem",
          },
        ],
        "4.5xl": [
          "2.5rem",
          {
            lineHeight: "2.94rem",
          },
        ],
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("grandchild", "& > * > *");
      addVariant("childhover", "& > *:hover");
      addVariant("childmarker", "& > *::marker");
    },
  ],
};
