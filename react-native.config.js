module.exports = {
  dependency: {
    platforms: {
      ios: {},
      android: {
            packageInstance: "\t\tnew RNInstabugReactnativePackage.Builder(\"1f07a266ad0fb6e0e08d5427f09ad082\",this.getApplication())\n\t\t\t\t\t\t\t.setInvocationEvent(\"shake\")\n\t\t\t\t\t\t\t.setPrimaryColor(\"#1D82DC\")\n\t\t\t\t\t\t\t.setFloatingEdge(\"left\")\n\t\t\t\t\t\t\t.setFloatingButtonOffsetFromTop(250)\n\t\t\t\t\t\t\t.build()"
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