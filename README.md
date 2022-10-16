# Instabug for React Native

[![npm](https://img.shields.io/npm/v/instabug-reactnative.svg)](https://www.npmjs.com/package/instabug-reactnative)
[![npm](https://img.shields.io/npm/dt/instabug-reactnative.svg)](https://www.npmjs.com/package/instabug-reactnative)
[![npm](https://img.shields.io/npm/l/instabug-reactnative.svg)](https://github.com/Instabug/instabug-reactnative/blob/master/LICENSE)
[![Twitter](https://img.shields.io/badge/twitter-@Instabug-blue.svg)](https://twitter.com/Instabug)
[![Analytics](https://instabug-ga.appspot.com/UA-41982088-6/github/Instabug/instabug-reactnative?pixel)](https://instabug.com)

Instabug is an in-app feedback and bug reporting tool for mobile apps. With just a simple shake, your users or beta testers can [report bugs](https://instabug.com/bug-reporting) or send in-app feedback and the SDK will capture an environment snapshot of your user's device including all console logs, and [server-side network requests](https://instabug.com/network-logging) compiling all these details in one organised dashboard to help you debug and fix bugs faster.

Instabug also provides you with a [reliable crash reporter](https://instabug.com/crash-reporting) that automatically captures a detailed report of the running environment, the different threads’ states, [the steps to reproduce the crash](https://instabug.com/user-steps), and the network request logs. All the data is captured automatically with no need for breadcrumbs, and you can always [reply back to your users](https://instabug.com/in-app-chat) and they will receive your messages within the app.

For more info, visit [Instabug.com](https://www.instabug.com).

## Installation

1. In Terminal, navigate to your React Native directory and install the `instabug-reactnative` package:

   ```bash
   npm install instabug-reactnative
   ```

   Or if you prefer to use Yarn instead of npm:

   ```bash
   yarn add instabug-reactnative
   ```

2. CocoaPods on iOS needs this extra step:

   ```bash
   cd ios && pod install && cd ..
   ```

## Initializing Instabug

To start using Instabug, import it as follows, then initialize it in the `constructor` or `componentWillMount`. This line will let the SDK work with the default behavior. The SDK will be invoked when the device is shaken. You can customize this behavior through the APIs.

```javascript
import Instabug from 'instabug-reactnative';

Instabug.start('APP_TOKEN', [Instabug.invocationEvent.shake]);
```

_You can find your app token by selecting the SDK tab from your [**Instabug dashboard**](https://dashboard.instabug.com)._

> :warning: If you're updating the SDK from versions prior to v11, please check our [migration guide](https://docs.instabug.com/docs/react-native-migration-guide).

## Microphone and Photo Library Usage Description (iOS Only)

Instabug needs access to the microphone and photo library to be able to let users add audio and video attachments. Starting from iOS 10, apps that don’t provide a usage description for those 2 permissions would be rejected when submitted to the App Store.

For your app not to be rejected, you’ll need to add the following 2 keys to your app’s info.plist file with text explaining to the user why those permissions are needed:

- `NSMicrophoneUsageDescription`
- `NSPhotoLibraryUsageDescription`

If your app doesn’t already access the microphone or photo library, we recommend using a usage description like:

- "`<app name>` needs access to the microphone to be able to attach voice notes."
- "`<app name>` needs access to your photo library for you to be able to attach images."

**The permission alert for accessing the microphone/photo library will NOT appear unless users attempt to attach a voice note/photo while using Instabug.**

## Uploading Source Map Files for Crash Reports

For your app crashes to show up with a fully symbolicated stack trace, we will automatically generate the source map files and upload them to your dashboard on release build. To do so, we rely on your app token being explicitly added to `Instabug.start('YOUR_APP_TOKEN')` in JavaScript.

If your app token is defined as a constant, you can set an environment variable `INSTABUG_APP_TOKEN` to be used instead.
We also automatically read your `versionName` and `versionCode` to upload your sourcemap file. alternatively, can also set the environment variables `INSTABUG_APP_VERSION_NAME` and `INSTABUG_APP_VERSION_CODE` to be used instead.

To disable the automatic upload in android, you can set the following property your build.gradle:

```dart
ext {
    instabugUploadEnable = false;
}
```

## Network Logging

Instabug network logging is enabled by default. It intercepts any requests performed with `fetch` or `XMLHttpRequest` and attaches them to the report that will be sent to the dashboard. To disable network logs:

```javascript
import { NetworkLogger } from 'instabug-reactnative';
```

```javascript
NetworkLogger.setEnabled(false);
```

## Repro Steps

Instabug Repro Steps are enabled by default. It captures a screenshot of each screen the user navigates to. These screens are attached to the BugReport when sent.

We support the two most popular React Native navigation libraries:

- **[react-navigation](https://github.com/react-navigation/react-navigation)**

  - **v5**
    set the `onStateChange` to `Instabug.onStateChange` in your NavigationContainer as follows:

    ```javascript
    <NavigationContainer onStateChange={Instabug.onStateChange} />
    ```

  - **<=v4**
    set the `onNavigationStateChange` to `Instabug.onNavigationStateChange` in your App wrapper as follows:

    ```javascript
    export default () => <App onNavigationStateChange={Instabug.onNavigationStateChange} />;
    ```

- **[react-native-navigation](https://github.com/wix/react-native-navigation)**

  Register `Instabug.componentDidAppearListener` listener using:

  ```javascript
  Navigation.events().registerComponentDidAppearListener(Instabug.componentDidAppearListener);
  ```

Alternatively, you can report your screen changes manually using the following API

```javascript
Instabug.reportScreenChange('screenName');
```

You can disable Repro Steps using the following API:

```javascript
Instabug.setReproStepsMode(Instabug.reproStepsMode.disabled);
```

## Documentation

For more details about the supported APIs and how to use them, check our [**Documentation**](https://docs.instabug.com/docs/react-native-overview).
