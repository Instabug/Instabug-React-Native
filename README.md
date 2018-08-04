# Instabug for react native

[![npm](https://img.shields.io/npm/v/instabug-reactnative.svg)](https://www.npmjs.com/package/instabug-reactnative)
[![npm](https://img.shields.io/npm/dt/instabug-reactnative.svg)](https://www.npmjs.com/package/instabug-reactnative)
[![npm](https://img.shields.io/npm/l/instabug-reactnative.svg)](https://github.com/Instabug/instabug-reactnative/blob/master/LICENSE)
[![Twitter](https://img.shields.io/badge/twitter-@Instabug-blue.svg)](https://twitter.com/Instabug)
[![Analytics](https://instabug-ga.appspot.com/UA-41982088-6/github/Instabug/instabug-reactnative?pixel)](https://instabug.com)


Upgrading? Check the [Upgrade Guide](#upgrading-guide) before bumping to a new major version.

<img src="http://s3.amazonaws.com/instabug-assets/mockups/annotation.gif" width="25%"/> <img src="http://s3.amazonaws.com/instabug-assets/mockups/dashboard.gif" width="73%"/>

Instabug is a reliable [bug reporting and user feedback platform](https://instabug.com/bug-reporting) that empowers mobile-first companies to iterate faster and enhance their app quality.
Gather bug reports from your users and the Instabug SDK will automatically capture an environment snapshot of your user's device including all console logs, [server-side network requests](https://instabug.com/network-logging), [bug reproduction steps](https://instabug.com/user-steps) and more details that would help you debug and fix bugs faster.

For more info, visit [Instabug.com](https://www.instabug.com).

## Installation
This section explains how to install Instabug SDK into your React Native application.

1. Open the terminal and navigate to your React Native Directory. Then run the following command.

```bash
npm install instabug-reactnative
```
or

```bash
yarn add instabug-reactnative
```

2. Install [**Ruby**](https://www.ruby-lang.org/en/documentation/installation/). (You can skip this step if you're building for Android only)

3. Install `xcodeproj` gem by running the following command. (You can also skip this step if you're building for Android only)
```bash
gem install xcodeproj
```

4. Link the bridging files in the npm package to the ios project use the following command.
```bash
react-native link instabug-reactnative
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

## Upgrading guide

Version 2.0.0

- **removes dependency on Cocoapods** when installing Instabug
- **ensures consistency** between the React Native SDK, and the Native SDK

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

### Upgrading from 2.0.x and from 8.0.3

When upgrading from 2.0.x to 2.1.x or from 8.0.3 to 8.x, please make sure you do the following steps:

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

## Documentation
For more details about the supported APIs and how to use them, you can check our [**Documentation**](https://docs.instabug.com/docs/react-native-overview).


## Contact US
If you have any questions or feedback don't hesitate to get in touch. You can reach us at any time through **support@instabug.com**.



## License

This software is released under <a href="https://opensource.org/licenses/mit-license.php">MIT License</a>.

© 2017 Instabug. All rights reserved.
