// @ts-ignore
import fs from 'fs';
// @ts-ignore
import path from 'path';
import { spawnSync } from 'child_process';

export interface InitOptions {
  token: string;
  entry?: string;
  npm?: boolean;
  yarn?: boolean;
  pods?: boolean; // commander will map --no-pods to pods=false
  silent?: boolean;

  // Instabug.init config options
  invocationEvents?: string; // comma-separated
  debugLogsLevel?: 'verbose' | 'debug' | 'error' | 'none';
  codePushVersion?: string;
  ignoreAndroidSecureFlag?: boolean;
  networkInterceptionMode?: 'javascript' | 'native';
}

export const initInstabug = async (opts: InitOptions): Promise<boolean> => {
  const projectRoot = process.cwd();

  const isExpo = isExpoManagedProject(projectRoot);
  const packageManager = resolvePackageManager(projectRoot, opts);
  const entryFilePath = resolveEntryFile(projectRoot, opts.entry, isExpo);

  const installed = installSdk(projectRoot, packageManager, opts.silent);
  if (!installed) {
    return false;
  }

  // For Expo managed projects, skip pods. Native code is generated during prebuild/EAS build.
  const podInstalled = isExpo ? true : maybeInstallPods(projectRoot, opts.pods, opts.silent);
  if (!podInstalled) {
    return false;
  }

  if (isExpo) {
    const configured = configureExpoPlugins(projectRoot, opts.silent);
    if (!configured) {
      return false;
    }
  }

  const instrumented = injectInitialization(entryFilePath, opts, opts.silent);
  if (!instrumented) {
    return false;
  }

  if (!opts.silent) {
    console.log('Instabug React Native SDK initialized successfully.');
    console.log('Documentation: https://docs.instabug.com/docs/react-native-integration');
  }

  return true;
};

const resolvePackageManager = (
  projectRoot: string,
  opts: Pick<InitOptions, 'npm' | 'yarn'>,
): 'npm' | 'yarn' => {
  if (opts.npm) {
    return 'npm';
  }
  if (opts.yarn) {
    return 'yarn';
  }

  const hasYarnLock = fs.existsSync(path.join(projectRoot, 'yarn.lock'));
  return hasYarnLock ? 'yarn' : 'npm';
};

const resolveEntryFile = (
  projectRoot: string,
  customEntry?: string,
  preferAppFile?: boolean,
): string => {
  if (customEntry) {
    const absolute = path.isAbsolute(customEntry)
      ? customEntry
      : path.join(projectRoot, customEntry);
    if (!fs.existsSync(absolute)) {
      throw new Error(`Entry file not found at ${absolute}`);
    }
    return absolute;
  }

  const appCandidates = [
    path.join(projectRoot, 'App.tsx'),
    path.join(projectRoot, 'App.ts'),
    path.join(projectRoot, 'App.jsx'),
    path.join(projectRoot, 'App.js'),
  ];

  const indexCandidates = [
    path.join(projectRoot, 'index.js'),
    path.join(projectRoot, 'index.ts'),
    path.join(projectRoot, 'index.tsx'),
    path.join(projectRoot, 'src', 'index.js'),
    path.join(projectRoot, 'src', 'index.ts'),
    path.join(projectRoot, 'src', 'index.tsx'),
  ];

  const candidates = preferAppFile
    ? [...appCandidates, ...indexCandidates]
    : [...indexCandidates, ...appCandidates];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  throw new Error('Could not detect an entry file. Pass a path with --entry (e.g., index.js).');
};

const installSdk = (
  projectRoot: string,
  packageManager: 'npm' | 'yarn',
  silent?: boolean,
): boolean => {
  const args =
    packageManager === 'yarn'
      ? ['add', 'instabug-reactnative']
      : ['install', 'instabug-reactnative'];

  if (!silent) {
    console.log(`Installing instabug-reactnative using ${packageManager}...`);
  }

  const result = spawnSync(packageManager, args, { stdio: 'inherit', cwd: projectRoot });
  return result.status === 0;
};

const maybeInstallPods = (
  projectRoot: string,
  pods: boolean | undefined,
  silent?: boolean,
): boolean => {
  // Default is true unless explicitly disabled via --no-pods
  const shouldRunPods = pods !== false;
  const iosDir = path.join(projectRoot, 'ios');
  const podfile = path.join(iosDir, 'Podfile');

  if (!shouldRunPods || !fs.existsSync(iosDir) || !fs.existsSync(podfile)) {
    return true;
  }

  if (!silent) {
    console.log('Running pod install in ios directory...');
  }

  const result = spawnSync('bash', ['-lc', 'cd ios && pod install'], {
    stdio: 'inherit',
    cwd: projectRoot,
  });

  return result.status === 0;
};

const injectInitialization = (
  entryFilePath: string,
  opts: InitOptions,
  silent?: boolean,
): boolean => {
  const original = fs.readFileSync(entryFilePath, 'utf8');

  if (
    original.includes("from 'instabug-reactnative'") ||
    original.includes('instabug-reactnative')
  ) {
    if (!silent) {
      console.log(
        'Instabug appears to be already referenced in the entry file. Skipping injection.',
      );
    }
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isTS = entryFilePath.endsWith('.ts') || entryFilePath.endsWith('.tsx');
  const importLine = "import Instabug, { InvocationEvent } from 'instabug-reactnative';\n";
  const configLines: string[] = [];
  configLines.push(`token: '${opts.token}',`);

  const events = parseInvocationEvents(opts.invocationEvents);
  if (events.length > 0) {
    configLines.push(
      `invocationEvents: [${events.map((e) => `InvocationEvent.${e}`).join(', ')}],`,
    );
  } else {
    configLines.push('invocationEvents: [InvocationEvent.shake],');
  }

  if (opts.debugLogsLevel) {
    configLines.push(`debugLogsLevel: '${opts.debugLogsLevel}',`);
  }
  if (opts.codePushVersion) {
    configLines.push(`codePushVersion: '${opts.codePushVersion}',`);
  }
  if (typeof opts.ignoreAndroidSecureFlag === 'boolean' && opts.ignoreAndroidSecureFlag) {
    configLines.push('ignoreAndroidSecureFlag: true,');
  }
  if (opts.networkInterceptionMode) {
    configLines.push(`networkInterceptionMode: '${opts.networkInterceptionMode}',`);
  }

  const initBlock = `\nInstabug.init({\n  ${configLines.join('\n  ')}\n});\n`;

  const hasUseStrict = original.startsWith("'use strict'") || original.startsWith('"use strict"');
  const insertion = hasUseStrict
    ? original.replace(/(['\"]use strict['\"];?\s*)/, `$1\n${importLine}`)
    : importLine + original;
  const withInit = insertion + initBlock;

  fs.writeFileSync(entryFilePath, withInit, 'utf8');

  if (!silent) {
    console.log(
      `Injected Instabug initialization into ${path.relative(process.cwd(), entryFilePath)}`,
    );
  }
  return true;
};

const isExpoManagedProject = (projectRoot: string): boolean => {
  const appJsonPath = path.join(projectRoot, 'app.json');
  if (!fs.existsSync(appJsonPath)) {
    return false;
  }

  try {
    const content = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
    return content && typeof content === 'object' && content.expo != null;
  } catch {
    return false;
  }
};

const configureExpoPlugins = (projectRoot: string, silent?: boolean): boolean => {
  const appJsonPath = path.join(projectRoot, 'app.json');
  try {
    const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8')) as Record<string, any>;
    if (!appJson.expo) {
      return false;
    }

    const expoConfig = appJson.expo as Record<string, any>;
    const plugins: any[] = Array.isArray(expoConfig.plugins) ? [...expoConfig.plugins] : [];

    const hasInstabugPlugin = plugins.some((p) => {
      if (typeof p === 'string') {
        return p === 'instabug-reactnative/expo-plugin';
      }
      return Array.isArray(p) && p[0] === 'instabug-reactnative/expo-plugin';
    });

    if (!hasInstabugPlugin) {
      plugins.push('instabug-reactnative/expo-plugin');
    }

    let updatedBuildProps = false;
    const minExpoIosTarget = '15.1';
    const idx = plugins.findIndex((p) => Array.isArray(p) && p[0] === 'expo-build-properties');
    if (idx === -1) {
      plugins.push([
        'expo-build-properties',
        {
          ios: { deploymentTarget: minExpoIosTarget },
        },
      ]);
      updatedBuildProps = true;
    } else {
      const [, cfg] = plugins[idx] as [string, any];
      const current = cfg?.ios?.deploymentTarget as string | undefined;
      if (!current || compareIosVersions(current, minExpoIosTarget) < 0) {
        plugins[idx] = [
          'expo-build-properties',
          {
            ...cfg,
            ios: { ...(cfg?.ios ?? {}), deploymentTarget: minExpoIosTarget },
          },
        ];
        updatedBuildProps = true;
      }
    }

    expoConfig.plugins = plugins;
    appJson.expo = expoConfig;

    fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2) + '\n', 'utf8');

    if (!silent) {
      console.log(
        `Configured Expo plugins: instabug-reactnative/expo-plugin and expo-build-properties${
          updatedBuildProps ? ' (ios.deploymentTarget >= 15.1)' : ''
        }`,
      );
    }

    return true;
  } catch (e) {
    if (!silent) {
      console.error('Failed to configure Expo plugins in app.json:', e);
    }
    return false;
  }
};

const parseInvocationEvents = (
  list?: string,
): Array<'none' | 'shake' | 'screenshot' | 'twoFingersSwipe' | 'floatingButton'> => {
  if (!list) {
    return [];
  }
  return list
    .split(',')
    .map((s) => s.trim())
    .filter((s): s is 'none' | 'shake' | 'screenshot' | 'twoFingersSwipe' | 'floatingButton' =>
      ['none', 'shake', 'screenshot', 'twoFingersSwipe', 'floatingButton'].includes(s as any),
    );
};

const compareIosVersions = (a: string, b: string): number => {
  const pa = a.split('.').map((n) => parseInt(n, 10));
  const pb = b.split('.').map((n) => parseInt(n, 10));
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const va = pa[i] ?? 0;
    const vb = pb[i] ?? 0;
    if (va < vb) {
      return -1;
    }
    if (va > vb) {
      return 1;
    }
  }
  return 0;
};
