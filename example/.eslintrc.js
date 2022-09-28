module.exports = {
  root: true,
  extends: '@react-native-community',
  overrides: [
    {
      files: ['__e2e__/**.js'],
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
