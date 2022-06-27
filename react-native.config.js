const path = require('path');

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
