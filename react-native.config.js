module.exports = {
  dependency: {
    platforms: {
      ios: {
        scriptPhases: [
          {
            name: '[instabug-reactnative] Upload Sourcemap',
            path: './ios/sourcemaps.sh',
            execution_position: 'after_compile',
          },
        ],
      },
      android: {},
    },
  },
};
