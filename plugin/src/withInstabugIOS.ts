import type { ConfigPlugin, XcodeProject } from 'expo/config-plugins';
import { withXcodeProject } from 'expo/config-plugins';
import type { PluginProps } from './withInstabug';
import * as path from 'path';
import * as fs from 'fs';

const BUILD_PHASE = 'PBXShellScriptBuildPhase';
const PHASE_COMMENT = 'Bundle React Native code and images';
const INSTABUG_BUILD_PHASE = '[instabug-reactnative] Upload Sourcemap';

export const withInstabugIOS: ConfigPlugin<PluginProps> = (config, props) => {
  return withXcodeProject(config, (configXcode) => {
    const xcodeProject: XcodeProject = configXcode.modResults;
    const buildPhases = xcodeProject.hash.project.objects[BUILD_PHASE];

    if (!buildPhases) {
      console.warn('[Instabug] No build phases found in Xcode project.');
      return configXcode;
    }

    const findPhaseByName = (targetName: string) => {
      return Object.entries(buildPhases).find(([, phase]: any) => {
        const rawName = phase?.name ?? '';
        const cleanName = rawName
          .toLowerCase()
          .replace('[cp-user] ', '')
          .replace(/^"+|"+$/g, '')
          .trim();
        const target = targetName.toLowerCase().trim();
        return cleanName === target;
      })?.[1];
    };

    // Add Instabug build phase if not present
    const instabugPhase = findPhaseByName(INSTABUG_BUILD_PHASE);

    if (instabugPhase == null && props.enable) {
      const packagePath = require.resolve(`${props.name}/package.json`);
      const packageDir = path.dirname(packagePath);
      const sourcemapsPath = path.join(packageDir, 'ios/sourcemaps.sh');

      if (fs.existsSync(sourcemapsPath)) {
        xcodeProject.addBuildPhase([], BUILD_PHASE, INSTABUG_BUILD_PHASE, null, {
          shellPath: '/bin/sh',
          shellScript: '/bin/sh ' + sourcemapsPath,
        });
      } else {
        console.warn(`Could not find sourcemaps.sh at path: ${sourcemapsPath}`);
      }
    }

    const bundleReactNativePhase = xcodeProject.pbxItemByComment(PHASE_COMMENT, BUILD_PHASE);

    if (bundleReactNativePhase?.shellScript) {
      bundleReactNativePhase.shellScript = addSourceMapExport(bundleReactNativePhase.shellScript);
    }

    return configXcode;
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
