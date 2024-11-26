const { withXcodeProject } = require('@expo/config-plugins');

const BUILD_PHASE = 'PBXShellScriptBuildPhase';

function withIosPlugin(config) {
  return withXcodeProject(config, (xcodeConfig) => {
    const xcodeProject = xcodeConfig.modResults;

    const bundleReactNativePhase = xcodeProject.pbxItemByComment(
      'Bundle React Native code and images',
      BUILD_PHASE,
    );

    bundleReactNativePhase.shellScript = addSourceMapExport(bundleReactNativePhase.shellScript);

    return xcodeConfig;
  });
}

function addSourceMapExport(script) {
  const sourceMapFileExport =
    '"export SOURCEMAP_FILE=\\"$TMPDIR/$(md5 -qs \\"$CONFIGURATION_BUILD_DIR\\")-main.jsbundle.map\\"\\n';

  if (!script.includes(sourceMapFileExport)) {
    return sourceMapFileExport + script.substring(1);
  }

  return script;
}

module.exports = withIosPlugin;
