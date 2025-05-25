import type { ConfigPlugin, XcodeProject } from 'expo/config-plugins';
import { withXcodeProject, withInfoPlist } from 'expo/config-plugins';
import type { PluginProps } from './withInstabug';
import * as path from 'path';
import * as fs from 'fs';

const BUILD_PHASE = 'PBXShellScriptBuildPhase';
const PHASE_COMMENT = 'Bundle React Native code and images';
const INSTABUG_BUILD_PHASE = '[instabug-reactnative] Upload Sourcemap';

export const withInstabugIOS: ConfigPlugin<PluginProps> = (config, props) => {
  let updatedConfig = withXcodeProject(config, (configXcode) => {
    const xcodeProject = configXcode.modResults;
    const buildPhases = xcodeProject.hash.project.objects[BUILD_PHASE];

    if (!buildPhases) {
      console.warn('[Instabug] No build phases found in Xcode project.');
      return configXcode;
    }

    // Add Instabug build phase if not already present
    const hasInstabugPhase = Boolean(findBuildPhase(buildPhases, INSTABUG_BUILD_PHASE));

    if (!hasInstabugPhase && props.forceUploadSourceMaps) {
      addInstabugBuildPhase(xcodeProject, props.name);
    }

    // Patch bundle React Native phase with source map export
    const bundlePhase = xcodeProject.pbxItemByComment(PHASE_COMMENT, BUILD_PHASE);
    if (bundlePhase?.shellScript) {
      bundlePhase.shellScript = injectSourceMapExport(bundlePhase.shellScript);
    }

    return configXcode;
  });

  // Add media permissions to Info.plist if enabled
  if (props.addMediaUploadBugReportingPermission) {
    const instabugConfig = config.extra?.instabug ?? {};

    const microphonePermission =
      instabugConfig.microphonePermission || 'This app needs access to your microphone.';
    const photoLibraryPermission =
      instabugConfig.photoLibraryPermission || 'This app needs access to your photos.';

    updatedConfig = withInfoPlist(updatedConfig, (configXcode) => {
      const plist = configXcode.ios.infoPlist ?? {};

      if (!plist.NSMicrophoneUsageDescription) {
        plist.NSMicrophoneUsageDescription = microphonePermission;
      }

      if (!plist.NSPhotoLibraryUsageDescription) {
        plist.NSPhotoLibraryUsageDescription = photoLibraryPermission;
      }

      configXcode.ios.infoPlist = plist;
      return configXcode;
    });
  }

  return updatedConfig;
};

// Find a build phase by its clean name
function findBuildPhase(buildPhases: any, targetName: string): any | undefined {
  const target = targetName.toLowerCase().trim();
  return Object.values(buildPhases).find((phase: any) => {
    const rawName = phase?.name ?? '';
    const cleanName = rawName
      .toLowerCase()
      .replace('[cp-user] ', '')
      .replace(/^"+|"+$/g, '')
      .trim();
    return cleanName === target;
  });
}

// Inject Instabug shell script phase
function addInstabugBuildPhase(xcodeProject: XcodeProject, packageName: string): void {
  try {
    const packagePath = require.resolve(`${packageName}/package.json`);
    const sourcemapScriptPath = path.join(path.dirname(packagePath), 'ios/sourcemaps.sh');

    if (!fs.existsSync(sourcemapScriptPath)) {
      console.warn(`[Instabug] sourcemaps.sh not found at: ${sourcemapScriptPath}`);
      return;
    }

    xcodeProject.addBuildPhase([], BUILD_PHASE, INSTABUG_BUILD_PHASE, null, {
      shellPath: '/bin/sh',
      shellScript: `/bin/sh ${sourcemapScriptPath}`,
    });
  } catch (err) {
    console.warn(`[Instabug] Failed to resolve package path for "${packageName}":`, err);
  }
}

// Inject source map export line into the shell script
function injectSourceMapExport(script: string): string {
  const exportLine = 'export SOURCEMAP_FILE="$DERIVED_FILE_DIR/main.jsbundle.map"';
  const escapedLine = exportLine.replace(/\$/g, '\\$').replace(/"/g, '\\"');
  const injectedLine = `${escapedLine}\\n`;

  return script.includes(escapedLine) ? script : script.replace(/^"/, `"${injectedLine}`);
}
