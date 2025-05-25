import type { ConfigPlugin } from 'expo/config-plugins';
import { withAppBuildGradle, withAndroidManifest } from 'expo/config-plugins';
import type { PluginProps } from './withInstabug';

export const withInstabugAndroid: ConfigPlugin<PluginProps> = (config, props) => {
  config = withAppBuildGradle(config, (configAndroid) => {
    const gradle = configAndroid.modResults;
    const packageName = props.name;

    if (!packageName) {
      console.warn('[Instabug] Missing "name" in plugin props. Skipping Android configuration.');
      return configAndroid;
    }

    if (gradle.language === 'groovy') {
      gradle.contents = injectGroovyScript(gradle.contents, packageName);
    } else if (gradle.language === 'kt') {
      gradle.contents = injectKotlinScript(gradle.contents, packageName);
    } else {
      throw new Error(
        '[Instabug] Unsupported Gradle language. Only Groovy and Kotlin DSL are supported.',
      );
    }

    return configAndroid;
  });

  // Inject the permission if requested
  if (props.addMediaUploadBugReportingPermission) {
    config = withAndroidManifest(config, (configAndroid) => {
      const manifest = configAndroid.modResults;

      const permissionName = 'android.permission.FOREGROUND_SERVICE_MEDIA_PROJECTION';
      const alreadyExists = manifest.manifest['uses-permission']?.some(
        (permission: any) => permission.$?.['android:name'] === permissionName,
      );

      if (!alreadyExists) {
        manifest.manifest['uses-permission'] = [
          ...(manifest.manifest['uses-permission'] || []),
          {
            $: {
              'android:name': permissionName,
            },
          },
        ];
      }

      return configAndroid;
    });
  }

  return config;
};

// --- Helper Functions ---

function injectGroovyScript(buildGradle: string, packageName: string): string {
  if (buildGradle.includes('sourcemaps.gradle')) {
    return buildGradle;
  }

  const androidBlockPattern = /^android\s*{/m;
  if (!androidBlockPattern.test(buildGradle)) {
    console.warn('[Instabug] Could not find "android {" block in Groovy build.gradle.');
    return buildGradle;
  }

  const script = `
def instabugPath = ["node", "--print", "require('path').dirname(require.resolve('${packageName}/package.json'))"]
    .execute()
    .text
    .trim()
apply from: new File(instabugPath, "android/sourcemaps.gradle")
`.trim();

  return buildGradle.replace(androidBlockPattern, `${script}\n\nandroid {`);
}

function injectKotlinScript(buildGradle: string, packageName: string): string {
  if (buildGradle.includes('sourcemaps.gradle')) {
    return buildGradle;
  }

  const androidBlockPattern = /^android\s*{/m;
  if (!androidBlockPattern.test(buildGradle)) {
    console.warn('[Instabug] Could not find "android {" block in Kotlin build.gradle.kts.');
    return buildGradle;
  }

  const script = `
val instabugPath = listOf("node", "--print", "require('path').dirname(require.resolve("${packageName}/package.json"))")
    .let { ProcessBuilder(it).start().inputStream.bufferedReader().readText().trim() }
apply(from = File(instabugPath, "android/sourcemaps.gradle"))
`.trim();

  return buildGradle.replace(androidBlockPattern, `${script}\n\nandroid {`);
}
