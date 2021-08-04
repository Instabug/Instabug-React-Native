module.exports = {
  dependency: {
    platforms: {
      ios: {
        scriptPhases: [
          {
            name: '[instabug-reactnative] Upload Sourcemap',
            script: 'bash "../node_modules/instabug-reactnative/ios/upload_sourcemap.sh"',
            execution_position: 'after_compile',
          },
        ],
      },
      android: {
      },
    },
    hooks: {
      postlink: 'node node_modules/instabug-reactnative/link_bridge.js'
    },
  },
  commands: [
    {
      name: 'add-instabug',
      func: () => {
                    require('./link_gradle');
                  },
    },
    {
      name: 'remove-instabug',
      func: () => {
                    require('./unlink_gradle');
                  },
    },
  ],
};