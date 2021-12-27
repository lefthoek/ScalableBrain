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
  darkMode: "class",
  content: [
    "./public/**/*.html",
    "./src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}",
  ],
  theme: {
    colors: gradients,
    extend: {
      textColor: {
        skin: {
          base: withOpacityValue("--color-text-base"),
          inverted: withOpacityValue("--color-text-inverted"),
          muted: withOpacityValue("--color-text-muted"),
          "muted-inverted": withOpacityValue("--color-text-muted-inverted"),
          primary: withOpacityValue("--color-primary"),
          secondary: withOpacityValue("--color-secondary"),
          tertiary: withOpacityValue("--color-tertiary"),
        },
      },
      borderColor: {
        skin: {
          base: withOpacityValue("--color-fill"),
          primary: withOpacityValue("--color-primary"),
          secondary: withOpacityValue("--color-secondary"),
        },
      },
      backgroundColor: {
        skin: {
          base: withOpacityValue("--color-fill"),
          inverted: withOpacityValue("--color-fill-inverted"),
          primary: withOpacityValue("--color-primary"),
          secondary: withOpacityValue("--color-secondary"),
        },
      },
      fill: {
        skin: {
          base: withOpacityValue("--color-fill"),
          inverted: withOpacityValue("--color-fill-inverted"),
          muted: withOpacityValue("--color-fill-muted"),
          primary: withOpacityValue("--color-primary"),
          secondary: withOpacityValue("--color-secondary"),
          tertiary: withOpacityValue("--color-tertiary"),
        },
      },
      gradientColorStops: {
        skin: {
          base: withOpacityValue("--color-fill"),
          inverted: withOpacityValue("--color-fill-inverted"),
          primary: withOpacityValue("--color-primary"),
          secondary: withOpacityValue("--color-secondary"),
          tertiary: withOpacityValue("--color-tertiary"),
        },
      },
      fontFamily: {
        sans: ["GT Walsheim Pro", ...defaultTheme.fontFamily.sans],
        serif: ["GT Sectra Display", ...defaultTheme.fontFamily.serif],
        mono: ["IBM Plex Mono", ...defaultTheme.fontFamily.mono],
      },
    },
  },
};
