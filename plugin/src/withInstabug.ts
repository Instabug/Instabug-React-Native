import type { ConfigPlugin } from 'expo/config-plugins';
import { createRunOncePlugin } from 'expo/config-plugins';
import { withInstabugAndroid } from './withInstabugAndroid';
import { withInstabugIOS } from './withInstabugIOS';

export interface PluginProps {
  name?: string;
  enable?: boolean;
}

const withInstabugPlugin: ConfigPlugin<PluginProps> = (config, props) => {
  let cfg = config;
  if (props.enable === true) {
    try {
      cfg = withInstabugAndroid(cfg, {
        ...props,
        name: instabugPackage.name,
      });
    } catch (e) {
      console.warn(`There was a problem with configuring your native Android project: ${e}`);
    }
    try {
      cfg = withInstabugIOS(cfg, {
        ...props,
        name: instabugPackage.name,
      });
    } catch (e) {
      console.warn(`There was a problem with configuring your native iOS project: ${e}`);
    }
  }

  return cfg;
};

const instabugPackage: {
  name: string;
  version: string;
} = require('../../package.json');

const withInstabug = createRunOncePlugin(
  withInstabugPlugin,
  instabugPackage.name,
  instabugPackage.version,
);

export { withInstabug };
