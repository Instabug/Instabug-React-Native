module.exports = {
  dependency: {
    platforms: {
      ios: {
        scriptPhases: [
          {
            name: '[instabug-reactnative] Upload Sourcemap',
            path: './ios/upload_sourcemap.sh',
            execution_position: 'after_compile',
          },
        ],
      },
      android: {},
    },
  },
};
