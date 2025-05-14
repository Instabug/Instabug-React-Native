import type { ConfigPlugin, XcodeProject } from 'expo/config-plugins';
import { withXcodeProject } from 'expo/config-plugins';
import type { PluginProps } from './withInstabug';

const BUILD_PHASE = 'PBXShellScriptBuildPhase';
const PHASE_COMMENT = 'Bundle React Native code and images';

export const withInstabugIOS: ConfigPlugin<PluginProps> = (config, props) => {
  return withXcodeProject(config, (config) => {
    const xcodeProject: XcodeProject = config.modResults;

    const shellScriptPath = `"$NODE_BINARY" --print "require('path').dirname(require.resolve('${props.name}/package.json')) + '/ios/sourcemaps.sh''"`;

    // Add custom Instabug build phase if not already present
    const instabugPhase = xcodeProject.pbxItemByComment(
      '[instabug-reactnative] Upload Sourcemap',
      BUILD_PHASE,
    );

    if (!instabugPhase) {
      xcodeProject.addBuildPhase([], BUILD_PHASE, '[instabug-reactnative] Upload Sourcemap', null, {
        shellPath: '/bin/sh',
        shellScript: `/bin/sh ${shellScriptPath}`,
      });
    }

    const bundleReactNativePhase = xcodeProject.pbxItemByComment(PHASE_COMMENT, BUILD_PHASE);

    if (bundleReactNativePhase?.shellScript) {
      bundleReactNativePhase.shellScript = addSourceMapExport(bundleReactNativePhase.shellScript);
    }

    return config;
  });
};

function addSourceMapExport(script: string): string {
  const exportLine = 'export SOURCEMAP_FILE="$DERIVED_FILE_DIR/main.jsbundle.map"';
  const escapedLine = exportLine.replace(/\$/g, '\\$').replace(/"/g, '\\"');

  const injectedLine = `${escapedLine}\\n`;

  if (script.includes(escapedLine)) {
    return script;
  }

  return script.replace(/^"/, `"${injectedLine}`);
}
