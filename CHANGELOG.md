## 10.9.0 (2021-09-30)

* Bumps Instabug native SDKs to v10.9
* Fixes an issue with network header value formatting
* Replaces the defaults tool with PlistBuddy for reading plist files
* Enhances API documentation for TypeScript

## v10.8.1 (2021-08-25)

* Fixes a crash that occurs with network requests on slow network connectivity in v10.8
* Fixes an issue with parseErrorStack whose signature was changed on RN 0.64

## v10.8.0 (2021-08-04)

* Bumps Instabug native SDKs to v10.8
* Adds string keys for the discard attachment prompt dialog.
* Fixes Autolinking on iOS.

## v10.4.0 (2021-05-10)

* Migrates iOS to use XCFramework
* Bumps Instabug native SDKs to v10.4
* Fixes crashes related to the network request data not being parsed correctly
* Fixes issues related to the automatic sourcemap file upload on Android
* Adds missing TypeScript definitions
* Deprecates Instabug.setVideoRecordingFloatingButtonPosition in favor of BugReporting.setVideoRecordingFloatingButtonPosition
* Includes native fix which removes the usage of android:requestLegacyExternalStorage permission
* Various other bug fixes and improvements

## v10.0.0 (2021-02-16)

* Introduces Instabug’s new App Performance Monitoring (APM)
* Adds support for Push Notifications
* Bumps the minimum supported iOS version to iOS 10
* Various bug fixes and improvements

## v9.1.10 (2020-12-02)

* Fixes a crash caused by the network logger when the object passed is too large
* Adds source map upload script support for environment variables use inside Info.plist
* Fixes a crash when using `getUserAttribute` on an attribute that does not exist 
* Fixes a crash when calling `setSdkDebugLogsLevel` on Android 

## v9.1.9 (2020-10-01)

* Bumps Instabug native Android SDK to v9.1.8

## v9.1.8 (2020-09-16)

* Adds support for react-navigation v5
* Adds support for the Azerbaijani locale
* Bumps Instabug native SDKs to v9.1.7
* Fixes an issue with `onReportSubmitHandler` on iOS

## v9.1.7 (2020-08-10)

* Fixes missing typescript definitions

## v9.1.6 (2020-07-16)

* Fixes an issue that caused XHR Response not to be logged.
* Adds support for Repro Steps. Repro Steps list all of the actions an app user took before reporting a bug or crash, grouped by the screens they visited in your app.
* Bump Native SDKs to v9.1.6

## v9.1.1 (2020-04-06)

* Fixes an issue with the version name while uploading the sourcemap on Android.

## v9.1.0 (2020-03-19)

* Bump Native SDKs to v9.1
* Adds automatic sourcemap upload support for Hermes.

## v9.0.7 (2020-03-10)

* Bump iOS Native SDK to v9.0.12
* Enables MultiDex for android

## v9.0.6 (2020-01-29)

* Bump iOS Native SDK to v9.0.6


## v9.0.5 (2020-01-27)

* Bump iOS Native SDK to v9.0.4
* Bump Android Native SDK to v9.0.5

## v9.0.1 (2019-12-14)

* Updated iOS native SDK to v9.0.3

## v9.0.0 (2019-12-02)

* Updated native SDKs to v9.0
* Fixes Descrepencies in typescript definition file

## v8.7.3 (2019-11-14)

* Fixes `BugReporting.setViewHierarchyEnabled` crashing on iOS.

## v8.7.2 (2019-11-05)

* Fixes the automatic uploading of the source map files in some cases due to incorrect regex.
* Add a new string reportQuestion to replace the deprecated string startChats.
* Updates native SDKs

## v8.7.1 (2019-10-02)

* Updates native iOS SDK to v8.7.2
* Fixes `Warning: Require cycle` warnings.


## v8.7.0 (2019-09-19)

* Updates native SDKs to v8.7

## v8.6.4 (2019-09-13)

* Fixes an issue on Android that would result in a build error with the message `null is not an object (evaluating u.invocationEventNone)`

## v8.6.3 (2019-08-29)

* Updates native iOS SDK to v8.6.2

## v8.6.2 (2019-08-29)

* Updates native Android SDK to v8.6.2
* Fixes various bugs and improvements in automatic sourcemap upload scripts.

## v8.6.1 (2019-08-26)

* Introducing our new logo and branding. Meet the new Instabug: the platform for Real-Time Contextual Insights.
* Updates native SDK dependencies to 8.6.1.
* Adds the `enabled` key to `Instabug.reproStepsMode` enum to be able to use it with `Instabug.setReproStepsMode` API.

## v8.5.6 (2019-08-21)

* Fixes an issue that crashes the SDK when calling `Instabug.onReportSubmitHandler` on iOS.
* Fixes an issue with passing empty string value to `Instabug.setUserAttribute`.

## v8.5.5 (2019-08-17)

* Fixes an issue with the email validation when reporting a bug on Android.
* Fixes an issue with the crash reporting which prevented the report from being submitted on Android.

## v8.5.4 (2019-08-10)

* Hot Fixes an issue with `Instabug.setFloatingButtonEdge` and `Instabug.setEnabledAttachmentTypes` causing the app to crash.

## v8.5.3 (2019-08-08)

* Fixes hang/crash issues on iOS 9 devices
* Fixes string mappings for addVideoMessage and conversationsHeaderTitle in iOS.

## v8.5.2 (2019-08-04)

* Fixes an issue that would cause Android to throw ArrayIndexOutOfBoundsException.

## v8.5.1 (2019-07-22)

* Fixes an issue that would cause Instabug.framework to appear twice when using CocoaPods.
* Fixes a deadlock that would happen when `console.log` is called immediately after `startWithToken`.
* Fixes an issue that prevented app token from being detected correctly when uploading source map files.
* Fixes an issue that caused Android release builds to fail when building on a Windows machine.

## v8.5.0 (2019-07-11)

**⚠️ If you are using React Native 0.60, please follow our migration guide [here](https://github.com/Instabug/Instabug-React-Native/blob/master/README.md#updating-to-version-85)**

* Support for React Native 0.60
* Updates native iOS and Android SDKs to version 8.5

## v8.4.4 (2019-07-08)

* Fixes an issue that causes the sdk to crash when a network request has no headers.

## v8.4.3 (2019-07-03)

* Fixes an issue that caused Android release builds to fail when building on a Windows machine.
* Fixes an issue that caused apps to freeze when `onReportSubmitHandler` is called in certain cases.

## v8.4.2 (2019-06-19)

* Fixes valid email written but gets enter valid email error message on Android.

## v8.4.1 (2019-06-17)

* Fixes Surveys.getAvailableSurveys API not returning the list of surveys on iOS.
* Fixes typescript definition for the API Surveys.getAvailableSurveys.

## v8.4.0 (2019-06-11)

* Updates native iOS and Android SDKs to version 8.4.

## v8.3.4 (2019-06-06)

* Fixes build failure on iOS caused by IBGUserStepsModeEnable not found in SDK.

## v8.3.3 (2019-05-31)

* Fixes crash caused when calling the setReproStepsMode API with enum value enabled.
* Fixes wrong typescript definition for the setReportTypes API param.

## v8.3.2 (2019-05-23)

* Fixes an issue that causes release builds to fail on Windows

## v8.3.1 (2019-05-11)

* Hotfix captureJsErrors

 
## v8.3.0 (2019-05-11)

* Update native android and iOS versions to 8.3.0.
* Fixes Network logging crashes and immutability
* Added new OnReportSubmitHandler API
* Fixed linking script
* Api Name Changes
