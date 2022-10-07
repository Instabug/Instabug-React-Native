/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: '@react-native-community',
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
