module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [
    {
      env: {
        jest: true,
      },
      files: ["**/__tests__/**/*.[jt]s", "**/?(*.)+(spec|test).[jt]s"],
      extends: ["plugin:jest/recommended"],
      rules: {
        "import/no-extraneous-dependencies": [
          "off",
          { devDependencies: ["**/?(*.)+(spec|test).[jt]s"] },
        ],
      },
    },
  ],
  ignorePatterns: ["**/*.js", "node_modules", ".turbo", "dist", "coverage"],
};
