/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: "@react-native-community",
  plugins: ["prettier", "jest"],
  overrides: [
    {
      // Jest Overrides
      files: ["test/**"],
      env: {
        node: true,
        browser: true,
        "jest/globals": true,
      },
    },
    {
      // Detox Overrides
      files: ["examples/default/e2e/**.js"],
      env: {
        "jest/globals": true,
      },
      globals: {
        device: false,
        waitFor: false,
        element: false,
        by: false,
      },
    },
  ],
  rules: {
    "prettier/prettier": "error",
    "prefer-const": "error",
  },
};
