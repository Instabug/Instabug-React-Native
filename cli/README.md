### Instabug React Native CLI

A command-line interface to help integrate and operate the Instabug React Native SDK.

- **Docs**: [Integrating Instabug for React Native](https://docs.instabug.com/docs/react-native-integration)

### Command overview

- `init`: Initialize the SDK with basic instrumentation
- `upload-sourcemaps`: Upload JavaScript sourcemaps
- `upload-so-files`: Upload Android NDK `.so` symbols
- `--help`: Show help (for root or any subcommand)
- `--version`: Show CLI version

### Expo support

- **Managed**: Supported starting from this CLI version. The `init` command detects Expo (by `app.json`) and will:

  - Inject Instabug initialization into `App.(js|tsx)` if present, or fall back to `index.(js|tsx)`
  - Append `instabug-reactnative/expo-plugin` to `expo.plugins` in `app.json`
  - Ensure `expo-build-properties` plugin is present with `ios.deploymentTarget = 15.1`
  - Skip CocoaPods (native code is generated during `expo prebuild` / EAS builds)

- **Bare / Prebuild**: Works the same as React Native after `expo prebuild`.

- Example:

```bash
npx instabug init --token YOUR_APP_TOKEN --entry App.tsx
# Then, if you need native projects locally
npx expo prebuild
```

#### Expo managed quick start

```bash
# 1) Initialize Instabug (adds plugin entries and injects init code)
npx instabug init --token YOUR_APP_TOKEN --entry App.tsx

# 2) Ensure build properties plugin is installed in your project
npm i -D expo-build-properties

# 3) Run on iOS (set CI to auto-accept alternate port if 8081 is busy)
CI=1 npx expo start --ios
```

- Notes:
  - If another RN/EAS dev server is using port 8081, Expo may prompt to use a new port. Use `CI=1` to auto-accept in non-interactive sessions.
  - For native builds (EAS or prebuild), the iOS deployment target will be enforced at 15.1 via `expo-build-properties`.
  - You do not need to run `pod install` for Expo managed; native code is handled by Expo during build.

### Installation

- If your app already depends on `instabug-reactnative`, you can use the CLI via `npx`:

```bash
npx instabug --help
```

- When developing this repo locally, you can invoke the built CLI directly:

```bash
node bin/index.js --help
```

### Commands

#### init

Initialize the Instabug React Native SDK in your project with basic instrumentation.

```bash
# Using npx (project dependency)
npx instabug init --token YOUR_APP_TOKEN \
  --invocation-events shake,screenshot \
  --debug-logs-level error \
  --code-push-version v10 \
  --network-interception-mode javascript

# From this repo after build
node bin/index.js init --token YOUR_APP_TOKEN
```

- **Options**

  - `-t, --token <value>`: Your app token. Env: `INSTABUG_APP_TOKEN`. Required
  - `-e, --entry <path>`: Entry file path (auto-detected if omitted)
  - `--invocation-events <list>`: Comma-separated `InvocationEvent` values: `none, shake, screenshot, twoFingersSwipe, floatingButton`
  - `--debug-logs-level <level>`: `verbose | debug | error | none`
  - `--code-push-version <value>`: CodePush version label
  - `--ignore-android-secure-flag`: Allow screenshots even if secure flag is set (Android)
  - `--network-interception-mode <mode>`: `javascript | native`
  - `--npm` / `--yarn`: Force package manager (auto-detected by default)
  - `--no-pods`: Skip running `pod install` on iOS
  - `--silent`: Reduce logging and avoid exiting the process on errors

- **What it does**
  - Installs `instabug-reactnative`
  - Optionally runs `cd ios && pod install` if an iOS project exists
  - Injects the following into your entry file (e.g., `index.js`):

```javascript
import Instabug, { InvocationEvent } from 'instabug-reactnative';

Instabug.init({
  token: 'YOUR_APP_TOKEN',
  invocationEvents: [InvocationEvent.shake],
});
```

- **Notes**
  - iOS may require updating your Podfile platform, for example: `platform :ios, '13.0'`
  - For attachments on iOS, add `NSMicrophoneUsageDescription` and `NSPhotoLibraryUsageDescription` to `Info.plist` per the docs

#### upload-sourcemaps

Upload JavaScript source maps to Instabug for crash symbolication/deobfuscation.

```bash
npx instabug upload-sourcemaps \
  --platform ios \
  --file ./path/to/main.jsbundle.map \
  --token $INSTABUG_APP_TOKEN \
  --name 1.0.0 \
  --code 100
```

- **Options**

  - `-p, --platform <value>`: `ios` or `android`. Required
  - `-f, --file <path>`: Path to source map file. Required
  - `-t, --token <value>`: App token. Env: `INSTABUG_APP_TOKEN`. Required
  - `-n, --name <value>`: App version name. Env: `INSTABUG_APP_VERSION_NAME`. Required
  - `-c, --code <value>`: App version code. Env: `INSTABUG_APP_VERSION_CODE`. Required
  - `-l, --label <value>`: CodePush label (optional). Env: `INSTABUG_APP_VERSION_LABEL`

- **Examples**
  - iOS bundle and upload sourcemap:

```bash
react-native bundle \
  --platform ios \
  --dev false \
  --entry-file index.js \
  --bundle-output ios/main.jsbundle \
  --sourcemap-output ios/main.jsbundle.map

npx instabug upload-sourcemaps \
  --platform ios \
  --file ios/main.jsbundle.map \
  --token $INSTABUG_APP_TOKEN \
  --name 1.0.0 \
  --code 1
```

- Android bundle and upload sourcemap:

```bash
react-native bundle \
  --platform android \
  --dev false \
  --entry-file index.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --sourcemap-output android/app/src/main/assets/index.android.bundle.map

npx instabug upload-sourcemaps \
  --platform android \
  --file android/app/src/main/assets/index.android.bundle.map \
  --token $INSTABUG_APP_TOKEN \
  --name 1.0.0 \
  --code 1
```

#### upload-so-files

Upload Android NDK `.so` symbol files for native crash symbolication.

```bash
npx instabug upload-so-files \
  --arch arm64-v8a \
  --file ./symbols.zip \
  --api_key YOUR_ANDROID_API_KEY \
  --token $INSTABUG_APP_TOKEN \
  --name 1.0.0
```

- **Options**

  - `--arch <value>`: One of `x86`, `x86_64`, `arm64-v8a`, `armeabi-v7a`. Required
  - `-f, --file <path>`: Path to zipped `.so` files. Required
  - `--api_key <value>`: Your Android API key. Required
  - `-t, --token <value>`: App token. Env: `INSTABUG_APP_TOKEN`. Required
  - `-n, --name <value>`: App version name. Env: `INSTABUG_APP_VERSION_NAME`. Required

- **Tips**
  - Typical locations for NDK libs: `android/app/build/intermediates/merged_native_libs/<buildType>/out/lib/*/*.so`
  - Zip the contents preserving folder structure before uploading

#### help and version

- Show root help:

```bash
npx instabug --help
```

- Show subcommand help (example):

```bash
npx instabug upload-sourcemaps --help
```

- Print CLI version:

```bash
npx instabug --version
```

### Troubleshooting

- iOS CocoaPods errors about Instabug version:

  - Run `pod install --repo-update`
  - Ensure `platform :ios, '13.0'` (or higher, per the SDK requirements)

- Yarn workspace issues when initializing a new RN app:
  - Prefer `--skip-install` then run `npm i` inside the app folder

### Environment variables

- `INSTABUG_APP_TOKEN`
- `INSTABUG_APP_VERSION_NAME`
- `INSTABUG_APP_VERSION_CODE`
- `INSTABUG_APP_VERSION_LABEL`

### Reference

- React Native integration guide: [Instabug Docs](https://docs.instabug.com/docs/react-native-integration)
