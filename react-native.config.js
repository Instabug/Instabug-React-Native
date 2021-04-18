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
                    const exec = require('child_process').exec;
                    require('./link_gradle');
                    exec("ruby ./node_modules/instabug-reactnative/autolink.rb || echo \"Ruby doesn't exist, if you're building this for Android only, then feel free to ignore this error, otherwise please install Ruby and run 'react-native link instabug-reactnative' again\"");
                  },
    },
    {
      name: 'remove-instabug',
      func: () => {
                    const exec = require('child_process').exec;
                    require('./unlink_gradle');
                    exec("ruby ./node_modules/instabug-reactnative/autounlink.rb || echo \"Ruby doesn't exist, if you're building this for Android only, then feel free to ignore this error, otherwise please install Ruby and run 'react-native link instabug-reactnative' again\"");
                  },
    },
  ],
};