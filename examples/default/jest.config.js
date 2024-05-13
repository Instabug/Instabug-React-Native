module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '^react-native$': require.resolve('react-native'),
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|react-navigation-tabs' +
      '|react-native-splash-screen' +
      '|react-native-screens' +
      '|react-native-reanimated' +
      '|@instabug/instabug-reactnative-dream11' +
      ')/)',
  ],
};
