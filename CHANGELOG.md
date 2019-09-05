## v8.6.3 (2019-08-29)

* **⚠️ If you are using Android, please make sure to follow the migration guide [here](https://github.com/Instabug/Instabug-React-Native/blob/master/README.md#updating-to-version-863)**
* You can now initialize Instabug on Android by calling `Instabug.start` from Javascript, instead of calling the builder method from the application class.
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
