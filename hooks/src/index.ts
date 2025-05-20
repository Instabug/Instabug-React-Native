import { getConfig, ProjectConfig } from '@expo/config';

const postPublish = async ({ iosSourceMap, androidSourceMap, projectRoot }) => {
  try {
    const appConfig: ProjectConfig = getConfig(projectRoot);
    const appVersion = appConfig?.exp?.version;
    const androidAppVersionCode = appConfig?.exp?.android?.versionCode?.toString();
    const iosAppVersionCode = appConfig?.exp?.ios?.buildNumber?.toString();

    console.log(androidAppVersionCode);
    console.log(appVersion);
    console.log(iosAppVersionCode);
    console.log(iosSourceMap);
    console.log(androidSourceMap);
    console.log(projectRoot);

    //   const sourceMapConfig = config && config.sourceMapUploader ? config.sourceMapUploader : {};
    //   if (sourceMapConfig.disabled !== true) {
    //     await uploadSourcemaps(
    //       apiKey,
    //       iosManifest,
    //       iosBundle,
    //       iosSourceMap,
    //       androidManifest,
    //       androidBundle,
    //       androidSourceMap,
    //       projectRoot,
    //       sourceMapConfig.endpoint,
    //     );
    //   }
  } catch (e) {
    console.error('Failed to upload source maps:');
  }
};

export default postPublish;
