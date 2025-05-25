import type { ConfigPlugin } from 'expo/config-plugins';
import { createRunOncePlugin } from 'expo/config-plugins';

import { withInstabugAndroid } from './withInstabugAndroid';
import { withInstabugIOS } from './withInstabugIOS';

export interface PluginProps {
  name?: string;
  forceUploadSourceMaps?: boolean;
  addMediaUploadBugReportingPermission?: boolean;
}

const instabugPackage = require('../../package.json') as {
  name: string;
  version: string;
};

const withInstabugPlugin: ConfigPlugin<PluginProps> = (config, props = {}) => {
  const { forceUploadSourceMaps = false, addMediaUploadBugReportingPermission = false } = props;

  const sharedProps = {
    ...props,
    name: instabugPackage.name,
    forceUploadSourceMaps,
    enableMediaUploadBugReporting,
  };

  let updatedConfig = config;

  // Android configuration (only if source maps are enabled)
  if (forceUploadSourceMaps) {
    try {
      updatedConfig = withInstabugAndroid(updatedConfig, sharedProps);
    } catch (err) {
      console.warn(
        '[Instabug] Failed to configure Android project:',
        (err as Error).message ?? err,
      );
    }
  }

  // iOS configuration
  try {
    updatedConfig = withInstabugIOS(updatedConfig, sharedProps);
  } catch (err) {
    console.warn('[Instabug] Failed to configure iOS project:', (err as Error).message ?? err);
  }

  return updatedConfig;
};

export const withInstabug = createRunOncePlugin(
  withInstabugPlugin,
  instabugPackage.name,
  instabugPackage.version,
);
