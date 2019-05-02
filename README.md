# Instabug for React Native

[![npm](https://img.shields.io/npm/v/instabug-reactnative.svg)](https://www.npmjs.com/package/instabug-reactnative)
[![npm](https://img.shields.io/npm/dt/instabug-reactnative.svg)](https://www.npmjs.com/package/instabug-reactnative)
[![npm](https://img.shields.io/npm/l/instabug-reactnative.svg)](https://github.com/Instabug/instabug-reactnative/blob/master/LICENSE)
[![Twitter](https://img.shields.io/badge/twitter-@Instabug-blue.svg)](https://twitter.com/Instabug)
[![Analytics](https://instabug-ga.appspot.com/UA-41982088-6/github/Instabug/instabug-reactnative?pixel)](https://instabug.com)


Upgrading? Check the [Upgrade Guide](#upgrade-guide) before bumping to a new major version.

Instabug is an in-app feedback and bug reporting tool for mobile apps. With just a simple shake, your users or beta testers can [report bugs](https://instabug.com/bug-reporting) or send in-app feedback and the SDK will capture an environment snapshot of your user's device including all console logs, [server-side network requests](https://instabug.com/network-logging) and bug reproduction steps compiling all these details in one organised dashboard to help you debug and fix bugs faster. 

Instabug also provides you with a [reliable crash reporter](https://instabug.com/crash-reporting) that automatically captures a detailed report of the running environment, the different threads’ states, [the steps to reproduce the crash](https://instabug.com/user-steps), and the network request logs. All the data is captured automatically with no need for breadcrumbs, and you can always [reply back to your users](https://instabug.com/in-app-chat) and they will receive your messages within the app.

For more info, visit [Instabug.com](https://www.instabug.com).

## Installation

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
1. To start using Instabug, import it into your `index.ios.js` and `index.android.js` file.

```javascript
import Instabug from 'instabug-reactnative';
```
2. Then initialize it in the `constructor` or `componentWillMount`. This line will let the Instabug SDK work with the default behavior. The SDK will be invoked when the device is shaken. You can customize this behavior through the APIs (You can skip this step if you are building an Android app only).

```javascript
Instabug.startWithToken('IOS_APP_TOKEN', [Instabug.invocationEvent.shake]);
```
3. Open `android/app/src/main/java/[...]/MainApplication.java`
   You should find the getPackages method looks like the following snippet. You just need to add your Android app token (You can skip this step if you are building an iOS app only). You can change the invocation event from here, simply by replacing the `"shake"` with any of the following `"button"`, `"none"`, `"screenshot"`, or `"swipe"`. You can change the primary color by replacing the `"#1D82DC"` with any colour of your choice.
   In the case that you are using the floating button as an invocation event, you can change the floating button edge and the floating button offset using the last two methods, by replacing `"left"` to `"right"`, and by changing the offset number.
```javascript
@Override
protected List<ReactPackage> getPackages() {
	return Arrays.<ReactPackage>asList(
	new MainReactPackage(),
	new RNInstabugReactnativePackage.Builder("YOUR_APP_TOKEN", MainApplication.this)
                            .setInvocationEvent("shake")
                            .setPrimaryColor("#1D82DC")
                            .setFloatingEdge("left")
                            .setFloatingButtonOffsetFromTop(250)
                            .build()
}
```
You can find your app token by selecting the SDK tab from your [**Instabug dashboard**](https://dashboard.instabug.com/app/sdk/).

## Upgrade Guide

### Upgrading from 1.x.x

When upgrading from version 1.x.x, please make sure you do the following steps:

1. Run
```bash
npm install instabug-reactnative
```
2. Open your Pod file and delete this line ```pod 'Instabug', '~> 7.0'```

3. Run this command from inside the ```ios``` directory inside your root project's directory
```bash
pod install
```

4. Run this command from your root project's directory. Make sure you have [**Ruby**](https://www.ruby-lang.org/en/documentation/installation/) and `xcodeproj` gem installed before running this last command. (You can skip installing Ruby if you're building an Android app only)

 ```bash
react-native link instabug-reactnative
```

### Upgrading in version 8

When doing an upgrade in these two cases, from 8.0.3 to 8.x or from an older version than 8.2.6 to 8.2.6 or higher, please make sure you do the following steps:

1. Unlink the project before upgrading to the new version
```bash
react-native unlink instabug-reactnative
```

2. Install the new version by running
```bash
npm install instabug-reactnative
```

3. Link the project by running
```bash
react-native link instabug-reactnative
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

For your app crashes to show up with a fully symbolicated stack trace, we will automatically generate the source map files and upload them to your dashboard on release build. To do so, we rely on your app token being explicitly added to `Instabug.startWithToken('YOUR_APP_TOKEN')` in JavaScript. 

If your app token is defined as a constant or you have different tokens for both iOS and Android apps, set the token as shown below.

1. In Android, go to the `build.gradle` file of the library and you will find below code, replace `YOUR_APP_TOKEN` with your app token from the dashboard.

```java
task upload_sourcemap(type: Exec) {
    environment "INSTABUG_APP_TOKEN", "YOUR_APP_TOKEN"
    commandLine 'sh', './upload_sourcemap.sh'
}
```

2. In iOS, go to the build phases of the project, you will find a build phase called `Upload Sourcemap`. Expand it you will find below lines of code, replace `YOUR_APP_TOKEN` with your token from the dashboard.

```bash
export INSTABUG_APP_TOKEN="YOUR_APP_TOKEN"
bash "../node_modules/instabug-reactnative/ios/upload_sourcemap.sh"
```

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
