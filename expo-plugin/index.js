// Minimal Expo config plugin for Instabug React Native
// This currently acts as a no-op because deployment target is enforced via expo-build-properties
// Added to ensure Expo can resolve the plugin during managed workflows and prebuild

/** @type {import('@expo/config-plugins').ConfigPlugin} */
function withInstabug(config) {
  return config;
}

module.exports = withInstabug;
