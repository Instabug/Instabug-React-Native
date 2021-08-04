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

2. CocoaPods on iOS needs this extra step:
    
    ```bash
    cd ios && pod install && cd ..
    ```

3.  **For React Native >= 0.60**, simply run the command:

    ```bash
    react-native add-instabug
    ```
    
    **For React Native < 0.60**, link the bridging files in the `instabug-reactnative` package:

    ```bash
    react-native link instabug-reactnative
    ```

## Initializing Instabug

 To start using Instabug, import it as follows.

```javascript
import Instabug from 'instabug-reactnative';
```
 * ### iOS
     Initialize it in the `constructor` or `componentWillMount`. This line will let the Instabug SDK work with the default behavior. The SDK will be invoked when the device is shaken. You can customize this behavior through the APIs.

    ```javascript
    Instabug.start('IOS_APP_TOKEN', [Instabug.invocationEvent.shake]);
    ```
 * ### Android
1. Open `android/app/src/main/java/[...]/MainApplication.java`
    * Make sure to import the package class:  
    `import com.instabug.reactlibrary.RNInstabugReactnativePackage;`
    * **For React Native >= 0.60**   
   Add the integration code to the `onCreate()` method like the below snippet. 

       ```java
        @Override
        public void onCreate() {
            super.onCreate();
            new RNInstabugReactnativePackage
                .Builder("APP_TOKEN", MainApplication.this)
                .setInvocationEvent("shake")
                .setPrimaryColor("#1D82DC")
                .setFloatingEdge("left")
                .setFloatingButtonOffsetFromTop(250)
                .build();
        }
      ```
    * **For React Native < 0.60**  
   You should find the `getPackages()` method looks like the below snippet. You just need to add your Android app token. 

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
            );
        }
        ```
    * You can change the invocation event from here, simply by replacing the `"shake"` with any of the following `"button"`, `"none"`, `"screenshot"`, or `"swipe"`. You can change the primary color by replacing the `"#1D82DC"` with any color of your choice.
   In the case that you are using the floating button as an invocation event, you can change the floating button edge and the floating button offset using the last two methods, by replacing `"left"` to `"right"`, and by changing the offset number. 
   
    You can find your app token by selecting the SDK tab from your [**Instabug dashboard**](https://dashboard.instabug.com/app/sdk/).

2. Make sure the following snippet is added to your project level `build.gradle`. This should be added automatically upon linking. If not, you can add it manually.
    ```dart
    allprojects {
    	repositories {
    	    maven {
    	        url "https://sdks.instabug.com/nexus/repository/instabug-cp"
    	    }
    	}
    }
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

  *  **[react-navigation](https://github.com/react-navigation/react-navigation)**

	  *  **v5**
		set the `onStateChange` to `Instabug.onStateChange` in your NavigationContainer as follows:

			```javascript
			<NavigationContainer
			onStateChange={  Instabug.onStateChange  }  />
			```

	 *  **<=v4**
		set the `onNavigationStateChange` to `Instabug.onNavigationStateChange` in your App wrapper as follows:

		```javascript
		export  default () => (
		<App
		onNavigationStateChange={  Instabug.onNavigationStateChange  }  />
		);
		```

  *  **[react-native-navigation](https://github.com/wix/react-native-navigation)**

		Register `Instabug.componentDidAppearListener` listener using:
		```javascript
		Navigation.events().registerComponentDidAppearListener( Instabug.componentDidAppearListener );
		```
		
Alternatively, you can report your screen changes manually using the following API
  
  ```javascript
Instabug.reportScreenChange('screenName');
```

You can disable Repro Steps using the following API:

```javascript
Instabug.setReproStepsMode(Instabug.reproStepsMode.disabled);
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

## Features that are not supported yet

- Push Notification Support for In-App Messaging
- [User Steps](https://help.instabug.com/en/articles/2515300-instabug-report-logs-user-steps).

## Documentation

For more details about the supported APIs and how to use them, check our [**Documentation**](https://docs.instabug.com/docs/react-native-overview).
