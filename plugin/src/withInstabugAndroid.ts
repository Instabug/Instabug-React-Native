import type { ConfigPlugin } from 'expo/config-plugins';
import { withAppBuildGradle } from 'expo/config-plugins';
import type { PluginProps } from './withInstabug';

export const withInstabugAndroid: ConfigPlugin<PluginProps> = (config, props) => {
  return withAppBuildGradle(config, (configAndroid) => {
    if (configAndroid.modResults.language === 'groovy') {
      configAndroid.modResults.contents = modifyAppGradleFile(
        configAndroid.modResults.contents,
        props.name!,
      );
    } else {
      throw new Error('Cannot configure Instabug because the build.gradle is not groovy');
    }
    return configAndroid;
  });
};

export function modifyAppGradleFile(buildGradle: string, name: string): string {
  if (buildGradle.includes('sourcemaps.gradle')) {
    return buildGradle;
  }

  const pattern = /^android {/m;

  if (!buildGradle.match(pattern)) {
    console.warn('Cannot configure Instabug');
    return buildGradle;
  }

  console.log(name);

  const resolveInstabugReactNativePathGroovy = `
def instabugPath = ["node", "--print", "require('path').dirname(require.resolve('${name}/package.json'))"]
    .execute()
    .text
    .trim()
apply from: new File(instabugPath, "android/sourcemaps.gradle")
`.trim();

  return buildGradle.replace(
    pattern,
    (match) => `${resolveInstabugReactNativePathGroovy}\n\n${match}`,
  );
}
