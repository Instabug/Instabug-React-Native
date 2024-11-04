const path = require('path');
const escape = require('escape-string-regexp');
const { mergeConfig, getDefaultConfig } = require('@react-native/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const root = path.resolve(__dirname, '../..');
const pkg = require(path.join(root, 'package.json'));
const peerDependencies = Object.keys(pkg.peerDependencies);
const modules = [...peerDependencies, '@babel/runtime'];

const config = {
  watchFolders: [root],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    blacklistRE: exclusionList(
      modules.map((m) => new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`)),
    ),
    extraNodeModules: modules.reduce((acc, name) => {
      acc[name] = path.join(__dirname, 'node_modules', name);
      return acc;
    }, {}),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
