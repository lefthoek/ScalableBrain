const defaultTheme = require("tailwindcss/defaultTheme");
function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
}

const colorStops = ["40", "60", "80", "100", "DEFAULT"];
const colorNames = ["cipria", "midnight", "brightGreen", "skyBlue", "lobster"];

const createGradient = (baseKey, colorStops) => {
  const pairs = colorStops.map((colorStop) => {
    if (colorStop === "DEFAULT") {
      return ["DEFAULT", withOpacityValue(`--${baseKey}-100`)];
    }
    return [colorStop, withOpacityValue(`--${baseKey}-${colorStop}`)];
  });
  return Object.fromEntries(pairs);
};

const gradients = colorNames.reduce(
  (acc, colorName) => ({
    ...acc,
    [colorName]: createGradient(colorName, colorStops),
  }),
  {}
);

module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}",
  ],
  theme: {
    colors: gradients,
    extend: {
      fontFamily: {
        sans: ["GT Walsheim Pro", ...defaultTheme.fontFamily.sans],
        serif: ["GT Sectra Display", ...defaultTheme.fontFamily.serif],
        mono: ["IBM Plex Mono", ...defaultTheme.fontFamily.mono],
      },
    },
  },
};
