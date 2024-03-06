/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: '@react-native-community',
  plugins: ['prettier', 'jest', 'jsdoc'],
  overrides: [
    {
      // Jest Overrides
      files: ['test/**'],
      env: {
        node: true,
        browser: true,
        'jest/globals': true,
      },
    },
    {
      // Detox Overrides
      files: ['examples/default/e2e/**.js'],
      env: {
        'jest/globals': true,
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
    'jsdoc/no-undefined-types': 'warn',
    'prettier/prettier': 'error',
    'prefer-const': 'error',
  },
};
