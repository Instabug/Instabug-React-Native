const package = require('package.json');
const exec = require('child_process').exec;
require('./link_gradle');
exec(`ruby ./node_modules/${package.name}/link.rb || echo \"Ruby doesn't exist, if you're building this for Android only, then feel free to ignore this error, otherwise please install Ruby and run 'react-native link ${package.name}' again\"`);
