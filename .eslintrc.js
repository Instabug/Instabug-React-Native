/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: '@react-native-community',
  plugins: ['prettier', 'jest'],
  overrides: [
    {
      // Test Overrides (jest/detox)
      files: ['tests/**', 'example/e2e/**.js'],
      env: {
        node: true,
        browser: true,
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
    'prettier/prettier': 'error',
    'prefer-const': 'error',
  },
};
