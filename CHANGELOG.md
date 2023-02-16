## Unreleased

- Bumps Instabug Android SDK to [11.8.0][11.8.0-and].
- Bumps Instabug iOS SDK to [11.7.0][11.7.0-ios].
- Adds the new `Instabug.init` API to start the SDK as follows:
  ```js
  Instabug.init({
    token: '<APP_TOKEN>',
    invocationEvents: [InvocationEvent.floatingButton],
    debugLogsLevel: LogLevel.verbose,
  });
  ```
- Adds monorepo support for source maps automatic upload scripts.
- Deprecates all module-enums (e.g. `Instabug.invocationEvent`) in favour of standalone-enums (e.g. `InvocationEvent`). See [#914](https://github.com/Instabug/Instabug-React-Native/pull/914) for more info and the detailed list of Enums.
- Deprecates `Instabug.start` in favour of `Instabug.init`.
- Deprecates `Instabug.setDebugEnabled`, `Instabug.setSdkDebugLogsLevel`, and `APM.setLogLevel` in favour of `debugLogsLevel` property of `Instabug.init`.
- Deprecates `Instabug.isRunningLive` API.
- Fixes global error handler not being called.
- Exports native Android SDK.

[11.8.0-and]: https://github.com/Instabug/Instabug-Android/releases/tag/v11.8.0
[11.7.0-ios]: https://github.com/Instabug/Instabug-IOS/releases/tag/11.7.0

## [11.6.0] - 2022-12-29

- Bumps Instabug Android SDK to [11.7.0][11.7.0-and].
- Bumps Instabug iOS SDK to [11.6.0][11.6.0-ios].
- Adds new string keys: `insufficientContentMessage` and `insufficientContentTitle`.
- Adds missing mapping for some existing keys if relevant to the other platform.
- Removes the string key: `video`
- Deprecates the legacy API `callPrivateApi`

[11.6.0]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v11.6.0
[11.7.0-and]: https://github.com/Instabug/Instabug-Android/releases/tag/v11.7.0
[11.6.0-ios]: https://github.com/Instabug/Instabug-IOS/releases/tag/11.6.0

## [11.5.1] - 2022-12-14

- Deprecates `CrashReporting.reportJSException` in favour of the new strongly-typed `CrashReporting.reportError`.
- Fixes `Survey` interface export causing a build error with certain babel versions.

[11.5.1]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v11.5.1

## [11.5.0] - 2022-11-28

- Bumps Instabug Android SDK to [11.6.0][11.6.0-and].
- Bumps Instabug iOS SDK to [11.5.0][11.5.0-ios].
- Adds first-class TypeScript support.
- Adds Romanian locale support.
- Adds `BugReporting.setDisclaimerText` API.
- Adds `BugReporting.setCommentMinimumCharacterCount` API
- Deprecates `Instabug.enable` and `Instabug.disable` APIs in favour of a new API `Instabug.setEnabled`, which works on both platforms.
- Fixes a compilation error on Android projects without `buildToolsVersion` property set.
- Fixes an issue with Hermes source maps generation script on `react-native` versions prior to v0.65.0.

[11.5.0]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v11.5.0
[11.6.0-and]: https://github.com/Instabug/Instabug-Android/releases/tag/v11.6.0
[11.5.0-ios]: https://github.com/Instabug/Instabug-IOS/releases/tag/11.5.0

## [11.3.0] - 2022-10-11

- Bumps Instabug Android SDK to [11.5.1][11.5.1-and].
- Bumps Instabug iOS SDK to [11.3.0][11.3.0-ios].
- Uses CocoaPods for Instabug iOS SDK; resulting in huge improvement for the npm package size.
- Fixes a compilation error on projects with Java version prior to 8.

[11.3.0]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v11.3.0
[11.5.1-and]: https://github.com/Instabug/Instabug-Android/releases/tag/v11.5.1
[11.3.0-ios]: https://github.com/Instabug/Instabug-IOS/releases/tag/11.3.0

## [11.2.0] - 2022-09-19

- Bumps Instabug Android SDK to [11.4.1][11.4.1-and].
- Bumps Instabug iOS SDK to [11.2.0][11.2.0-ios].
- Drops support for `react-native` versions prior to v0.60.0.
- Drops support for manual linking.
- Adds `react-native` v0.69.0 support.
- Adds Hermes support for source maps automatic upload script on Android with `react-native` v0.69.0.
- Adds support for iOS source maps automatic upload when Hermes is enabled.
- Fixes an issue with Hermes source maps generation script causing JS crashes on Android not getting deobfuscated correctly.

[11.2.0]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v11.2.0
[11.4.1-and]: https://github.com/Instabug/Instabug-Android/releases/tag/v11.4.1
[11.2.0-ios]: https://github.com/Instabug/Instabug-IOS/releases/tag/11.2.0

## [11.0.2] - 2022-07-20

- Fixes a crash that occurs when logging some failed network requests.

[11.0.2]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v11.0.2

## [11.0.1] - 2022-06-13

- Fixes an issue with network responses of type JSON not getting logged.
- Fixes an issue that may cause the android build to fail.
- Fixes an issue with iOS autolinking that causes the user local path to be referenced in Xcode.

[11.0.1]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v11.0.1

## [11.0.0] - 2022-06-07

- Bumps Instabug Android SDK to [11.2.0][11.2.0-and].
- Bumps Instabug iOS SDK to [11.0.2][11.0.2-ios].
- Adds the ability to initialize the Android SDK from JavaScript. Check the [migration guide][migration-v11] for more info.
- Adds the ability to opt out of iOS source maps auto upload through the `INSTABUG_SOURCEMAPS_UPLOAD_DISABLE` env variable.
- Adds dynamic entry file support through the `INSTABUG_ENTRY_FILE` env variable.
- Adds the string keys for Repro Steps.
- Deprecates `Instabug.setPrivateView` in favour of `Instabug.addPrivateView` and `Instabug.removePrivateView`.
- Removes the deprecated APIs. Check the [migration guide][migration-v11] for more info.
- Removes `Surveys.setThresholdForReshowingSurveyAfterDismiss`.
- Removes the string keys: `surveysCustomThanksTitle` and `surveysCustomThanksSubtitle`.
- Renames `BugReporting.setAutoScreenRecordingMaxDuration` to `BugReporting.setAutoScreenRecordingDurationIOS` to target iOS only.
- Fixes an issue with the `setRequestFilterExpression` not working with Hermes.
- Fixes an issue with the swipe invocation event not working on Android.

[11.0.0]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v11.0.0
[11.2.0-and]: https://github.com/Instabug/Instabug-Android/releases/tag/v11.2.0
[11.0.2-ios]: https://github.com/Instabug/Instabug-IOS/releases/tag/11.0.2
[migration-v11]: https://docs.instabug.com/docs/react-native-migration-guide

## [10.13.0] - 2022-03-17

- Bumps Instabug Android SDK to [10.13.0][10.13.0-and].
- Bumps Instabug iOS SDK to [10.11.9][10.11.9-ios].
- Adds Instabug Experiments APIs.
- Adds defensive type checking in Instabug logging APIs.
- Adapts the strict requirement of newer Expo versions to use the React header with the iOS import statements.
- Fixes an issue with GraphQL requests not being grouped correctly.
- Excludes unnecessary files from the published npm package.

[10.13.0]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v10.13.0
[10.13.0-and]: https://github.com/Instabug/Instabug-Android/releases/tag/v10.13.0
[10.11.9-ios]: https://github.com/Instabug/Instabug-IOS/releases/tag/10.11.9

## [10.11.0] - 2021-12-23

- Bumps Instabug Android SDK to [10.11.0][10.11.0-and].
- Bumps Instabug iOS SDK to [10.11.0][10.11.0-ios].
- Adds GraphQL support for APM network traces with proper grouping.
- Adds `APM.endAppLaunch` API.
- Fixes an issue with iOS sourcemap upload that causes the build to fail.

[10.11.0]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v10.11.0
[10.11.0-and]: https://github.com/Instabug/Instabug-Android/releases/tag/v10.11.0
[10.11.0-ios]: https://github.com/Instabug/Instabug-IOS/releases/tag/10.11.0

## [10.9.1] - 2021-10-13

- Bumps Instabug Android SDK to [10.9.1][10.9.1-and].
- Bumps Instabug iOS SDK to [10.9.3][10.9.3-ios].
- Fixes an issue with network requests not getting logged on iOS.

[10.9.1]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v10.9.1
[10.9.1-and]: https://github.com/Instabug/Instabug-Android/releases/tag/10.9.1
[10.9.3-ios]: https://github.com/Instabug/Instabug-IOS/releases/tag/10.9.3

## [10.9.0] - 2021-09-30

- Bumps Instabug Android SDK to [10.9.0][10.9.0-and].
- Bumps Instabug iOS SDK to [10.9.0][10.9.0-ios].
- Fixes an issue with network header value formatting.
- Replaces the defaults tool with `PlistBuddy` for reading Plist files.
- Improves TypeScript definitions.

[10.9.0]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v10.9.0
[10.9.0-and]: https://github.com/Instabug/Instabug-Android/releases/tag/10.9.0
[10.9.0-ios]: https://github.com/Instabug/Instabug-IOS/releases/tag/10.9.0

## [10.8.1] - 2021-08-25

- Fixes a crash that occurs with network requests on slow network connectivity.
- Fixes an issue with `parseErrorStack` whose signature was changed in `react-native` v0.64.0.

[10.8.1]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v10.8.1

## [10.8.0] - 2021-08-04

- Bumps Instabug Android SDK to [10.8.0][10.8.0-and].
- Bumps Instabug iOS SDK to [10.8.0][10.8.0-ios].
- Adds string keys for the discard attachment prompt dialog.
- Fixes Autolinking on iOS.

[10.8.0]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v10.8.0
[10.8.0-and]: https://github.com/Instabug/Instabug-Android/releases/tag/10.8.0
[10.8.0-ios]: https://github.com/Instabug/Instabug-IOS/releases/tag/10.8.0

## [10.4.0] - 2021-05-10

- Bumps Instabug Android SDK to [10.4.0][10.4.0-and].
- Bumps Instabug iOS SDK to [10.4.0][10.4.0-ios].
- Migrates iOS to use `XCFramework`.
- Adds missing TypeScript definitions.
- Deprecates `Instabug.setVideoRecordingFloatingButtonPosition` in favour of `BugReporting.setVideoRecordingFloatingButtonPosition`.
- Removes the usage of `android:requestLegacyExternalStorage` permission.
- Fixes crashes related to the network request data not being parsed correctly.
- Fixes issues related to the automatic source maps file upload on Android.
- Fixes various bugs.

[10.4.0]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v10.4.0
[10.4.0-and]: https://github.com/Instabug/Instabug-Android/releases/tag/10.4.0
[10.4.0-ios]: https://github.com/Instabug/Instabug-IOS/releases/tag/10.4.0

## [10.0.0] - 2021-02-16

- Introduces Instabug’s new App Performance Monitoring (APM). 🎉
- Bumps Instabug Android SDK to [10.1.1][10.1.1-and].
- Bumps Instabug iOS SDK to [10.1.2][10.1.2-ios].
- Drops support for iOS versions less than iOS 10.
- Adds support for Push Notifications.
- Fixes various bugs.

[10.0.0]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v10.0.0
[10.1.1-and]: https://github.com/Instabug/Instabug-Android/releases/tag/10.1.1
[10.1.2-ios]: https://github.com/Instabug/Instabug-IOS/releases/tag/10.1.2

## [9.1.10] - 2020-12-02

- Adds source map upload script support for environment variables use inside `Info.plist`.
- Fixes a crash caused by the network logger when the object passed is too large.
- Fixes a crash when using `getUserAttribute` on an attribute that does not exist.
- Fixes a crash when calling `setSdkDebugLogsLevel` on Android.

[9.1.10]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v9.1.10

## [9.1.9] - 2020-10-01

- Bumps Instabug Android SDK to [9.1.8][9.1.8-and].

[9.1.9]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v9.1.9
[9.1.8-and]: https://github.com/Instabug/Instabug-Android/releases/tag/9.1.8

## [9.1.8] - 2020-09-16

- Bumps Instabug Android SDK to [9.1.7][9.1.7-and].
- Bumps Instabug iOS SDK to [9.1.7][9.1.7-ios].
- Adds support for `react-navigation` v5.
- Adds support for the Azerbaijani locale.
- Fixes an issue with `onReportSubmitHandler` on iOS.

[9.1.8]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v9.1.8
[9.1.7-and]: https://github.com/Instabug/Instabug-Android/releases/tag/9.1.7
[9.1.7-ios]: https://github.com/Instabug/Instabug-IOS/releases/tag/9.1.7

## [9.1.7] - 2020-08-10

- Fixes missing TypeScript definitions.

[9.1.7]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v9.1.7

## [9.1.6] - 2020-07-16

- Bumps Instabug Android SDK to [9.1.6][9.1.6-and].
- Bumps Instabug iOS SDK to [9.1.6][9.1.6-ios].
- Adds support for Repro Steps. Repro Steps list all of the actions an app user took before reporting a bug or crash, grouped by the screens they visited in your app.
- Fixes an issue that caused XHR Response not to be logged.

[9.1.6]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v9.1.6
[9.1.6-and]: https://github.com/Instabug/Instabug-Android/releases/tag/9.1.6
[9.1.6-ios]: https://github.com/Instabug/Instabug-IOS/releases/tag/9.1.6

## [9.1.1] - 2020-04-06

- Fixes an issue with the version name while uploading the source maps on Android.

## [9.1.0] - 2020-03-19

- Bumps Instabug Android SDK to [9.1.0][9.1.0-and].
- Bumps Instabug iOS SDK to [9.1.0][9.1.0-ios].
- Adds automatic source maps upload support for Hermes.

[9.1.0]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v9.1.0
[9.1.0-and]: https://github.com/Instabug/Instabug-Android/releases/tag/9.1.0
[9.1.0-ios]: https://github.com/Instabug/Instabug-IOS/releases/tag/9.1

## [9.0.7] - 2020-03-10

- Bumps Instabug iOS SDK to [9.0.12][9.0.12-ios].
- Enables MultiDex for android.

[9.0.7]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v9.0.7
[9.0.12-ios]: https://github.com/Instabug/Instabug-IOS/releases/tag/9.0.12

## [9.0.6] - 2020-01-29

- Bumps Instabug iOS SDK to [9.0.6][9.0.6-ios].

[9.0.6]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v9.0.6
[9.0.6-ios]: https://github.com/Instabug/Instabug-IOS/releases/tag/9.0.6

## [9.0.5] - 2020-01-27

- Bumps Instabug Android SDK to [9.0.5][9.0.5-and].
- Bumps Instabug iOS SDK to [9.0.4][9.0.4-ios].

[9.0.5]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v9.0.5
[9.0.5-and]: https://github.com/Instabug/Instabug-Android/releases/tag/9.0.5
[9.0.4-ios]: https://github.com/Instabug/Instabug-IOS/releases/tag/9.0.4

## [9.0.1] - 2019-12-14

- Bumps Instabug iOS SDK to [9.0.3][9.0.3-ios].

[9.0.1]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v9.0.1
[9.0.3-ios]: https://github.com/Instabug/Instabug-IOS/releases/tag/9.0.3

## [9.0.0] - 2019-12-02

- Bumps Instabug Android SDK to [9.0.0][9.0.0-and].
- Bumps Instabug iOS SDK to [9.0.0][9.0.0-ios].
- Fixes discrepancies in TypeScript definition file.

[9.0.0]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v9.0.0
[9.0.0-and]: https://github.com/Instabug/Instabug-Android/releases/tag/9.0.1
[9.0.0-ios]: https://github.com/Instabug/Instabug-IOS/releases/tag/9.0

## [8.7.3] - 2019-11-14

- Fixes `BugReporting.setViewHierarchyEnabled` crashing on iOS.

[8.7.3]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v8.7.3

## [8.7.2] - 2019-11-05

- Bumps Instabug Android SDK to [8.7.2][8.7.2-and].
- Bumps Instabug iOS SDK to [8.7.3][8.7.3-ios].
- Fixes the automatic uploading of the source maps files in some cases due to incorrect regex.
- Adds a new string `reportQuestion` to replace the deprecated string `startChats`.

[8.7.2]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v8.7.2
[8.7.2-and]: https://github.com/Instabug/Instabug-Android/releases/tag/8.7.2
[8.7.3-ios]: https://github.com/Instabug/Instabug-IOS/releases/tag/8.7.3

## [8.7.1] - 2019-10-02

- Bumps Instabug iOS SDK to [8.7.2][8.7.2-ios].
- Fixes `Warning: Require cycle` warnings.

[8.7.1]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v8.7.1
[8.7.2-ios]: https://github.com/Instabug/Instabug-IOS/releases/tag/8.7.2

## [8.7.0] - 2019-09-19

- Bumps Instabug Android SDK to [8.7.0][8.7.0-and].
- Bumps Instabug iOS SDK to [8.7.0][8.7.0-ios].

[8.7.0]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v8.7.0
[8.7.0-and]: https://github.com/Instabug/Instabug-Android/releases/tag/8.7.0
[8.7.0-ios]: https://github.com/Instabug/Instabug-IOS/releases/tag/8.7

## [8.6.4] - 2019-09-13

- Fixes an issue on Android that would result in a build error with the message: `null is not an object (evaluating u.invocationEventNone)`.

[8.6.4]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v8.6.4

## [8.6.3] - 2019-08-29

- Bumps Instabug iOS SDK to [8.6.2][8.6.2-ios].

[8.6.3]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v8.6.3
[8.6.2-ios]: https://github.com/Instabug/Instabug-IOS/releases/tag/8.6.2

## [8.6.2] - 2019-08-29

- Bumps Instabug Android SDK to [8.6.2][8.6.2-and].
- Fixes various bugs and improvements in automatic source maps upload scripts.

[8.6.2]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v8.6.2
[8.6.2-and]: https://github.com/Instabug/Instabug-Android/releases/tag/8.6.2

## [8.6.1] - 2019-08-26

- Introduces our new logo and branding. Meet the new Instabug: the platform for Real-Time Contextual Insights. 🎉
- Bumps Instabug Android SDK to [8.6.1][8.6.1-and].
- Bumps Instabug iOS SDK to [8.6.1][8.6.1-ios].
- Adds the `enabled` key to `Instabug.reproStepsMode` enum to be able to use it with `Instabug.setReproStepsMode` API.

[8.6.1]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v8.6.1
[8.6.1-and]: https://github.com/Instabug/Instabug-Android/releases/tag/8.6.1
[8.6.1-ios]: https://github.com/Instabug/Instabug-IOS/releases/tag/8.6.1

## [8.5.6] - 2019-08-21

- Fixes an issue that crashes the SDK when calling `Instabug.onReportSubmitHandler` on iOS.
- Fixes an issue with passing empty string value to `Instabug.setUserAttribute`.

[8.5.6]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v8.5.6

## [8.5.5] - 2019-08-17

- Fixes an issue with the email validation when reporting a bug on Android.
- Fixes an issue with the crash reporting which prevented the report from being submitted on Android.

[8.5.5]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v8.5.5

## [8.5.4] - 2019-08-10

- Fixes an issue with `Instabug.setFloatingButtonEdge` and `Instabug.setEnabledAttachmentTypes` causing the app to crash.

[8.5.4]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v8.5.4

## [8.5.3] - 2019-08-08

- Fixes hang/crash issues on iOS 9 devices.
- Fixes string mappings for `addVideoMessage` and `conversationsHeaderTitle` in iOS.

[8.5.3]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v8.5.3

## [8.5.2] - 2019-08-04

- Fixes an issue that would cause Android to throw `ArrayIndexOutOfBoundsException`.

[8.5.2]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v8.5.2

## [8.5.1] - 2019-07-22

- Fixes an issue that would cause `Instabug.framework` to appear twice when using CocoaPods.
- Fixes a deadlock that would happen when `console.log` is called immediately after `startWithToken`.
- Fixes an issue that prevented app token from being detected correctly when uploading source maps files.
- Fixes an issue that caused Android release builds to fail when building on a Windows machine.

[8.5.1]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v8.5.1

## [8.5.0] - 2019-07-11

- Bumps Instabug Android SDK to [8.5.0][8.5.0-and].
- Bumps Instabug iOS SDK to [8.5.0][8.5.0-ios].
- Adds support for `react-native` v0.60.0.

[8.5.0]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v8.5.0
[8.5.0-and]: https://github.com/Instabug/Instabug-Android/releases/tag/8.5.0
[8.5.0-ios]: https://github.com/Instabug/Instabug-IOS/releases/tag/8.5

## [8.4.4] - 2019-07-08

- Fixes an issue that causes the sdk to crash when a network request has no headers.

[8.4.4]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v8.4.4

## [8.4.3] - 2019-07-03

- Fixes an issue that caused Android release builds to fail when building on a Windows machine.
- Fixes an issue that caused apps to freeze when `onReportSubmitHandler` is called in certain cases.

[8.4.3]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v8.4.3

## [8.4.2] - 2019-06-19

- Fixes valid email written but gets "Enter valid email" error message on Android.

[8.4.2]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v8.4.2

## [8.4.1] - 2019-06-17

- Fixes `Surveys.getAvailableSurveys` not returning the list of surveys on iOS.
- Fixes TypeScript definition for `Surveys.getAvailableSurveys`.

[8.4.1]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v8.4.1

## [8.4.0] - 2019-06-11

- Bumps Instabug Android SDK to [8.4.0][8.4.0-and].
- Bumps Instabug iOS SDK to [8.4.0][8.4.0-ios].

[8.4.0]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v8.4.0
[8.4.0-and]: https://github.com/Instabug/Instabug-Android/releases/tag/8.4.0
[8.4.0-ios]: https://github.com/Instabug/Instabug-IOS/releases/tag/8.4

## [8.3.4] - 2019-06-06

- Fixes build failure on iOS caused by `IBGUserStepsModeEnable` not found in SDK.

[8.3.4]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v8.3.4

## [8.3.3] - 2019-05-31

- Fixes crash caused when calling the `setReproStepsMode` with enum value `enabled`.
- Fixes wrong TypeScript definition for the `setReportTypes` parameters.

[8.3.3]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v8.3.3

## [8.3.2] - 2019-05-23

- Fixes an issue that caused release builds to fail on Windows.

[8.3.2]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v8.3.2

## [8.3.1] - 2019-05-11

- Fixes an issue with `captureJsErrors`.

[8.3.1]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v8.3.1

## [8.3.0] - 2019-05-11

- Bumps Instabug Android SDK to [8.3.0][8.3.0-and].
- Bumps Instabug iOS SDK to [8.3.0][8.3.0-ios].
- Adds new `OnReportSubmitHandler` API.
- Changes some API names.
- Fixes Network logging crashes and immutability.
- Fixes linking script.

[8.3.0]: https://github.com/Instabug/Instabug-React-Native/releases/tag/v8.3.0
[8.3.0-and]: https://github.com/Instabug/Instabug-Android/releases/tag/8.3.0
[8.3.0-ios]: https://github.com/Instabug/Instabug-IOS/releases/tag/8.3
