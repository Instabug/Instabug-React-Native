module.exports = {
  root: true,
  extends: '@react-native-community',
  overrides: [
    {
      files: ['e2e/**.js'],
      env: { jest: true },
      globals: {
        device: false,
        waitFor: false,
        element: false,
        by: false,
      },
    },
  ],
};
