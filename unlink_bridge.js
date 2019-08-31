const exec = require('child_process').exec;
require('./unlink_gradle');
exec("ruby ./node_modules/instabug-reactnative/unlink.rb || echo \"Ruby doesn't exist, if you're building this for Android only, then feel free to ignore this error, otherwise please install Ruby and run 'react-native link instabug-reactnative' again\"");
