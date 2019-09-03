# Instabug for React Native

[![npm](https://img.shields.io/npm/v/instabug-reactnative.svg)](https://www.npmjs.com/package/instabug-reactnative)
[![npm](https://img.shields.io/npm/dt/instabug-reactnative.svg)](https://www.npmjs.com/package/instabug-reactnative)
[![npm](https://img.shields.io/npm/l/instabug-reactnative.svg)](https://github.com/Instabug/instabug-reactnative/blob/master/LICENSE)
[![Twitter](https://img.shields.io/badge/twitter-@Instabug-blue.svg)](https://twitter.com/Instabug)
[![Analytics](https://instabug-ga.appspot.com/UA-41982088-6/github/Instabug/instabug-reactnative?pixel)](https://instabug.com)

Instabug is an in-app feedback and bug reporting tool for mobile apps. With just a simple shake, your users or beta testers can [report bugs](https://instabug.com/bug-reporting) or send in-app feedback and the SDK will capture an environment snapshot of your user's device including all console logs, [server-side network requests](https://instabug.com/network-logging) and bug reproduction steps compiling all these details in one organised dashboard to help you debug and fix bugs faster. 

Instabug also provides you with a [reliable crash reporter](https://instabug.com/crash-reporting) that automatically captures a detailed report of the running environment, the different threads’ states, [the steps to reproduce the crash](https://instabug.com/user-steps), and the network request logs. All the data is captured automatically with no need for breadcrumbs, and you can always [reply back to your users](https://instabug.com/in-app-chat) and they will receive your messages within the app.

For more info, visit [Instabug.com](https://www.instabug.com).

## Installation

Updating to a new version? Check the [Update Guide](#update-guide) before bumping to a new major version.

### Using react-native CLI

1. In Terminal, navigate to your React Native directory and install the `instabug-reactnative` package:

```bash
npm install instabug-reactnative
```

Or if you prefer to use Yarn instead of npm:

```bash
yarn add instabug-reactnative
```

2. For projects that build for iOS, install `xcodeproj` gem:

```bash
gem install xcodeproj
```

3. Finally, link the bridging files in the `instabug-reactnative` package:


```bash
react-native link instabug-reactnative
```

### Using CocoaPods (iOS only)

Alternatively, for iOS you can use [CocoaPods](https://cocoapods.org/) for managing dependencies. 

1. In Terminal, navigate to your React Native directory and install the `instabug-reactnative` package:

```bash
npm install instabug-reactnative
```

2. Add the following to your `Podfile`:

```ruby
pod 'instabug-reactnative', :path => '../node_modules/instabug-reactnative'
pod 'React', :path => '../node_modules/react-native', :subspecs => [
  'Core',
  'CxxBridge',
  'DevSupport'
]

# Required React native dependencies
pod 'yoga', :path => '../node_modules/react-native/ReactCommon/yoga'
pod 'DoubleConversion', :podspec => '../node_modules/react-native/third-party-podspecs/DoubleConversion.podspec'
pod 'glog', :podspec => '../node_modules/react-native/third-party-podspecs/GLog.podspec'
pod 'Folly', :podspec => '../node_modules/react-native/third-party-podspecs/Folly.podspec'

# To make sure that archiving works correctly in Xcode, React has to be 
# removed from the Pods project as it's already included in the main project.
post_install do |installer|
   installer.pods_project.targets.each do |target|
      if target.name == "React"
         target.remove_from_project
      end
   end
end
```

3. Install `instabug-reactnative`:

```bash
pod install
```

## Using Instabug
1. To start using Instabug, import it into your `index.js` file.

```javascript
import Instabug from 'instabug-reactnative';
```
2. Then initialize it in the `constructor` or `componentWillMount`. This line will let the Instabug SDK work with the default behavior. The SDK will be invoked when the device is shaken. You can customize this behavior through the APIs.

```javascript
Instabug.startWithToken('APP_TOKEN', [Instabug.invocationEvent.shake]);
```
You can find your app token by selecting the SDK tab from your [**Instabug dashboard**](https://dashboard.instabug.com/app/sdk/).

3. Make sure the following snippet is added to your project level `build.gradle`. This should be added automatically upon linking. If not, you can add it manually.
```dart
allprojects {
	repositories {
	    maven {
	        url "https://sdks.instabug.com/nexus/repository/instabug-cp"
	    }
	}
}
```
## Update Guide
### Updating to versions 8.0-8.4.x

When updating to version 8.0 through 8.4.x, you'll need to perform the steps below.

1. Unlink Instabug
```bash
react-native unlink instabug-reactnative
```

2. Install the new version of Instabug
```bash
npm install instabug-reactnative
```

3. Link Instabug
```bash
react-native link instabug-reactnative
```

### Updating to version 8.5

_Only for apps using React Native >= 0.60. If you're using a lower version, you don't need to perform any extra steps when updating._

Version 8.5 adds support for React Native 0.60. To use Instabug 8.5 with React Native 0.60, you'll need to perform the following steps.

1. Unlink Instabug
```bash
react-native unlink instabug-reactnative
```

2. Install the new version of Instabug
```bash
npm install instabug-reactnative
```

3. Add Instabug to your project
```bash
react-native add-instabug
```

## Microphone and Photo Library Usage Description (iOS Only)

Instabug needs access to the microphone and photo library to be able to let users add audio and video attachments. Starting from iOS 10, apps that don’t provide a usage description for those 2 permissions would be rejected when submitted to the App Store.

For your app not to be rejected, you’ll need to add the following 2 keys to your app’s info.plist file with text explaining to the user why those permissions are needed:

* `NSMicrophoneUsageDescription`
* `NSPhotoLibraryUsageDescription`

If your app doesn’t already access the microphone or photo library, we recommend using a usage description like:

* "`<app name>` needs access to the microphone to be able to attach voice notes."
* "`<app name>` needs access to your photo library for you to be able to attach images."

**The permission alert for accessing the microphone/photo library will NOT appear unless users attempt to attach a voice note/photo while using Instabug.**


## Uploading Source Map Files for Crash Reports

For your app crashes to show up with a fully symbolicated stack trace, we will automatically generate the source map files and upload them to your dashboard on release build. To do so, we rely on your app token being explicitly added to `Instabug.start('YOUR_APP_TOKEN')` in JavaScript. 

If your app token is defined as a constant, you can set an environment variable `INSTABUG_APP_TOKEN` to be used instead.

## Network Logging

Instabug network logging is enabled by default. It intercepts any requests performed with `fetch` or `XMLHttpRequest` and attaches them to the report that will be sent to the dashboard. To disable network logs:

```javascript
import { NetworkLogger } from 'instabug-reactnative';
```

```javascript
NetworkLogger.setEnabled(false);
```

## Documentation

For more details about the supported APIs and how to use them, check our [**Documentation**](https://docs.instabug.com/docs/react-native-overview).
