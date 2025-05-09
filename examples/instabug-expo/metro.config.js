const path = require('path');
const escape = require('escape-string-regexp');
const { getDefaultConfig } = require('@expo/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

// Monorepo root (go up 2 levels from example app)
const root = path.resolve(__dirname, '../..');

// Load peer dependencies from package.json
const pkg = require(path.join(root, 'package.json'));
const peerDependencies = Object.keys(pkg.peerDependencies || {});

// Modules to blacklist from root node_modules
const modules = [...peerDependencies, '@babel/runtime', 'promise'];

// Get Expo's default config
const config = getDefaultConfig(__dirname);

// Add root folder to be watched
config.watchFolders = [root];

// Enable source maps explicitly
config.transformer = {
  ...config.transformer,
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
  sourceMap: true,
  // Note: this URL/path is mostly for debugging tools. You can customize if needed.
  sourceMapUrl: 'index.bundle.map',
};

// Customize resolver
config.resolver.blacklistRE = exclusionList(
  modules.map((m) => new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`)),
);

config.resolver.extraNodeModules = modules.reduce((acc, name) => {
  acc[name] = path.join(__dirname, 'node_modules', name);
  return acc;
}, {});

module.exports = config;
