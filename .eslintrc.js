/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: '@react-native-community',
  plugins: ['prettier', 'jest'],
  env: {
    node: true,
    browser: true,
    'jest/globals': true,
  },
  overrides: [
    {
      // Detox Overrides
      files: ['example/e2e/**.js'],
      globals: {
        device: false,
        waitFor: false,
        element: false,
        by: false,
      },
    },
  ],
  rules: {
    'prettier/prettier': 'error',
  },
};
