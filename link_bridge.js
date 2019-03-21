const exec = require('child_process').exec;
exec("ruby ./node_modules/instabug-reactnative/link.rb || echo \"Ruby doesn't exist, if you're building this for Android only, then feel free to ignore this error, otherwise please install Ruby and run 'react-native link instabug-reactnative' again\"");
