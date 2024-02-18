# Changelog


## [Unreleased](https://github.com/Instabug/Instabug-React-Native/compare/v12.7.1...dev)

### Added

- Add support for enable NDK crashes on Android ([#1132](https://github.com/Instabug/Instabug-React-Native/pull/1132))

## [12.7.1](https://github.com/Instabug/Instabug-React-Native/compare/v12.7.0...v12.7.1) (February 15, 2024)

### Changed

- Bump Instabug Android SDK to v12.7.1 ([#1134](https://github.com/Instabug/Instabug-React-Native/pull/1134)). [See release notes](https://github.com/Instabug/android/releases/tag/v12.7.1).

## [12.7.0](https://github.com/Instabug/Instabug-React-Native/compare/v12.6.0...v12.7.0) (February 10, 2024)

### Added

- Support user identification using ID ([#1115](https://github.com/Instabug/Instabug-React-Native/pull/1115)).
- Add support for user steps on Android ([#1109](https://github.com/Instabug/Instabug-React-Native/pull/1109)).

### Changed

- Bump Instabug iOS SDK to v12.7.0 ([#1125](https://github.com/Instabug/Instabug-React-Native/pull/1125)). [See release notes](https://github.com/instabug/instabug-ios/releases/tag/12.7.0).
- Bump Instabug Android SDK to v12.7.0 ([#1126](https://github.com/Instabug/Instabug-React-Native/pull/1126)). [See release notes](https://github.com/Instabug/android/releases/tag/v12.7.0).

### Fixed

- Fix an Android `NullPointerException` crash in private views APIs ([#1121](https://github.com/Instabug/Instabug-React-Native/pull/1121)), closes [#514](https://github.com/Instabug/Instabug-React-Native/issues/514).

## [12.6.0](https://github.com/Instabug/Instabug-React-Native/compare/v12.5.0...v12.6.0) (January 14, 2024)

### Changed

- Bump Instabug iOS SDK to v12.6.0 ([#1095](https://github.com/Instabug/Instabug-React-Native/pull/1095)). [See release notes](https://github.com/instabug/instabug-ios/releases/tag/12.6.0).
- Bump Instabug Android SDK to v12.6.0 ([#1096](https://github.com/Instabug/Instabug-React-Native/pull/1096)). [See release notes](https://github.com/Instabug/android/releases/tag/v12.6.0).

### Added

- Add support for code push ([#1079](https://github.com/Instabug/Instabug-React-Native/pull/1079)).

## [12.5.0](https://github.com/Instabug/Instabug-React-Native/compare/v12.4.0...v12.5.0) (January 9, 2024)

### Changed

- Bump Instabug iOS SDK to v12.5.0 ([#1085](https://github.com/Instabug/Instabug-React-Native/pull/1085)). [See release notes](https://github.com/instabug/instabug-ios/releases/tag/12.5.0).
- Bump Instabug Android SDK to v12.5.1 ([#1088](https://github.com/Instabug/Instabug-React-Native/pull/1085)). See release notes for [v12.5.0](https://github.com/Instabug/android/releases/tag/v12.5.0) and [v12.5.1](https://github.com/Instabug/android/releases/tag/v12.5.1).

### Fixed

- Fix a delay issue in reporting the 'Current View' that resulted in displaying outdated values ([#1080](https://github.com/Instabug/Instabug-React-Native/pull/1080)).

## [12.4.0](https://github.com/Instabug/Instabug-React-Native/compare/v12.2.0...v12.4.0) (December 7, 2023)

### Changed

- Bump Instabug iOS SDK to v12.4.0 ([#1074](https://github.com/Instabug/Instabug-React-Native/pull/1074)). See release notes for [v12.3.0](https://github.com/instabug/instabug-ios/releases/tag/12.3.0) and [v12.4.0](https://github.com/instabug/instabug-ios/releases/tag/12.4.0).
- Bump Instabug Android SDK to v12.4.1 ([#1076](https://github.com/Instabug/Instabug-React-Native/pull/1076)). See release notes for [v12.3.0](https://github.com/Instabug/android/releases/tag/v12.3.0), [v12.3.1](https://github.com/Instabug/android/releases/tag/v12.3.1), [v12.4.0](https://github.com/Instabug/android/releases/tag/v12.4.0) and [v12.4.1](https://github.com/Instabug/android/releases/tag/v12.4.1).

### Fixed

- Fix an issue with `Instabug.init` on Android causing the app to crash while trying to get the current `Application` instance through the current activity which can be `null` in some cases by utilizing the React context instead ([#1069](https://github.com/Instabug/Instabug-React-Native/pull/1069)).
- Fix an issue with unhandled JavaScript crashes not getting linked with the current session causing inaccurate session metrics ([#1071](https://github.com/Instabug/Instabug-React-Native/pull/1071)).

## [12.2.0](https://github.com/Instabug/Instabug-React-Native/compare/v12.1.0...v12.2.0) (November 14, 2023)

### Added

- Add an iOS-side init API which allows capturing crashes that happen early in the app lifecycle and before the JavaScript code has started ([#1056](https://github.com/Instabug/Instabug-React-Native/pull/1056)).

### Changed

- Bump Instabug iOS SDK to v12.2.0 ([#1053](https://github.com/Instabug/Instabug-React-Native/pull/1053)). [See release notes](https://github.com/instabug/instabug-ios/releases/tag/12.2.0).
- Bump Instabug Android SDK to v12.2.0 ([#1052](https://github.com/Instabug/Instabug-React-Native/pull/1052)). [See release notes](https://github.com/Instabug/android/releases/tag/v12.2.0).

### Fixed

- Fix an issue with Android Gradle Plugin namespace support required for React Native 0.73 and backward compatibility with previous versions ([#1044](https://github.com/Instabug/Instabug-React-Native/pull/1044)).
- Fix an issue with unhandled JavaScript crashes being reported as native iOS crashes ([#1054](https://github.com/Instabug/Instabug-React-Native/pull/1054))
- Re-enable screenshot capturing for Crash Reporting and Session Replay by removing redundant mapping ([#1055](https://github.com/Instabug/Instabug-React-Native/pull/1055)).

## [12.1.0](https://github.com/Instabug/Instabug-React-Native/compare/v11.14.0...v12.1.0) (October 3, 2023)

### Added

- Add support for Session Replay, which includes capturing session details, visual reproduction of sessions as well as support for user steps, network and Instabug logs. ([#1034](https://github.com/Instabug/Instabug-React-Native/pull/1034)).

### Changed

- **BREAKING** Remove deprecated APIs ([#1027](https://github.com/Instabug/Instabug-React-Native/pull/1027)). See migration guide for more details.
- Bump Instabug iOS SDK to v12.1.0 ([#1031](https://github.com/Instabug/Instabug-React-Native/pull/1031)). See release notes for [v12.0.0](https://github.com/instabug/instabug-ios/releases/tag/12.0.0) and [v12.1.0](https://github.com/instabug/instabug-ios/releases/tag/12.1.0).
- Bump Instabug Android SDK to v12.1.0 ([#1032](https://github.com/Instabug/Instabug-React-Native/pull/1032)). See release notes for [v12.0.0](https://github.com/Instabug/Instabug-Android/releases/tag/v12.0.0), [v12.0.1](https://github.com/Instabug/Instabug-Android/releases/tag/v12.0.1) and [v12.1.0](https://github.com/Instabug/Instabug-Android/releases/tag/v12.1.0).

## [11.14.0](https://github.com/Instabug/Instabug-React-Native/compare/v11.13.0...11.14.0) (September 15, 2023)

### Added

- Add support for automatic capturing of unhandled Promise rejection crashes ([#1014](https://github.com/Instabug/Instabug-React-Native/pull/1014)).
- Add new strings (`StringKey.discardAlertStay` and `StringKey.discardAlertDiscard`) for overriding the discard alert buttons for consistency between iOS and Android ([#1001](https://github.com/Instabug/Instabug-React-Native/pull/1001)).
- Add a new string (`StringKey.reproStepsListItemNumberingTitle`) for overriding the repro steps list item (screen) title for consistency between iOS and Android ([#1002](https://github.com/Instabug/Instabug-React-Native/pull/1002)).
- Add support for RN version 0.73 by updating the `build.gradle` file with the `namespace` ([#1004](https://github.com/Instabug/Instabug-React-Native/pull/1004))
- Add native-side init API which can be used to catch and report startup crashes on android. ([#1012](https://github.com/Instabug/Instabug-React-Native/pull/1012))
- Add the new repro steps configuration API `Instabug.setReproStepsConfig` ([#1024](https://github.com/Instabug/Instabug-React-Native/pull/1024)).

### Changed

- Bump Instabug iOS SDK to v11.14.0 ([#1020](https://github.com/Instabug/Instabug-React-Native/pull/1020)). [See release notes](https://github.com/Instabug/Instabug-iOS/releases/tag/11.14.0).
- Bump Instabug Android SDK to v11.14.0 ([#1019](https://github.com/Instabug/Instabug-React-Native/pull/1019)). [See release notes](https://github.com/Instabug/Instabug-Android/releases/tag/v11.14.0).

### Deprecated

- Deprecate the old `StringKey.discardAlertCancel` and `StringKey.discardAlertAction` string keys for overriding the discard alert buttons as they had inconsistent behavior between iOS and Android ([#1001](https://github.com/Instabug/Instabug-React-Native/pull/1001)).
- Deprecate the old `StringKey.reproStepsListItemTitle` string key for overriding the repro steps list item (screen) title as it had inconsistent behavior between iOS and Android ([#1002](https://github.com/Instabug/Instabug-React-Native/pull/1002)).
- Deprecate `Instabug.setReproStepsMode` in favor of the new `Instabug.setReproStepsConfig` ([#1024](https://github.com/Instabug/Instabug-React-Native/pull/1024)).
- Deprecate the old `StringKey.invalidCommentMessage` and `StringKey.invalidCommentTitle` in favor of `StringKey.insufficientContentMessage` and `StringKey.insufficientContentTitle` ([#1026](https://github.com/Instabug/Instabug-React-Native/pull/1026)).

## [11.13.0](https://github.com/Instabug/Instabug-React-Native/compare/v11.12.0...v11.13.0) (July 10, 2023)

### Changed

- Bump Instabug iOS SDK to v11.13.3 ([#997](https://github.com/Instabug/Instabug-React-Native/pull/997)). [See release notes](https://github.com/Instabug/Instabug-iOS/releases/tag/11.13.3).
- Bump Instabug Android SDK to v11.13.0 ([#996](https://github.com/Instabug/Instabug-React-Native/pull/996)). [See release notes](https://github.com/Instabug/Instabug-Android/releases/tag/v11.13.0).

### Fixed

- Fix an issue with the Android sourcemaps upload Gradle task getting recreated when both `bundleReleaseJsAndAssets` and `createBundleReleaseJsAndAssets` tasks exist in the same Android project ([#991](https://github.com/Instabug/Instabug-React-Native/pull/991)), closes [#989](https://github.com/Instabug/Instabug-React-Native/issues/989).
- Fix an issue with JaCoCo gradle plugin replacing the `enabled` method with `required` prop to prevent gradle scripts breaking on version `0.72` ([#995](https://github.com/Instabug/Instabug-React-Native/pull/995)), closes [#994](https://github.com/Instabug/Instabug-React-Native/issues/994).

## [11.12.0](https://github.com/Instabug/Instabug-React-Native/compare/v11.10.0...11.12.0) (May 30, 2023)

### Changed

- Bump Instabug Android SDK to v11.12.0 ([#985](https://github.com/Instabug/Instabug-React-Native/pull/985)). [See release notes](https://github.com/Instabug/Instabug-Android/releases/tag/v11.12.0).
- Bump Instabug iOS SDK to v11.12.0 ([#986](https://github.com/Instabug/Instabug-React-Native/pull/986)). [See release notes](https://github.com/Instabug/Instabug-iOS/releases/tag/11.12.0).

### Deprecated

- Deprecate `instabugUploadEnable` gradle property to disable Android sourcemaps auto upload in favor of `INSTABUG_SOURCEMAPS_UPLOAD_DISABLE` env variable ([#983](https://github.com/Instabug/Instabug-React-Native/pull/983)).

### Fixed

- Fix an issue with unhandled JavaScript crashes being reported as native Android crashes ([#980](https://github.com/Instabug/Instabug-React-Native/pull/980)).
- Fix an issue with the Android sourcemaps upload script, causing the build to fail on older versions of Gradle ([#970](https://github.com/Instabug/Instabug-React-Native/pull/970)), closes [#969](https://github.com/Instabug/Instabug-React-Native/issues/969).
- Fix an issue with the Android sourcemaps upload script, causing the build to fail when using product flavors ([#975](https://github.com/Instabug/Instabug-React-Native/pull/975)), closes [#974](https://github.com/Instabug/Instabug-React-Native/issues/974).
- Fix an issue with the network interceptor reverting the user's changes to `XMLHttpRequest` after disabling network logging ([#984](https://github.com/Instabug/Instabug-React-Native/pull/984)), closes [#981](https://github.com/Instabug/Instabug-React-Native/issues/981).

## [11.10.0](https://github.com/Instabug/Instabug-React-Native/compare/v11.9.1...11.10.0) (April 20, 2023)

### Added

- Add support for Android automatic source map file upload on Windows; this requires setting the `INSTABUG_APP_TOKEN` environment variable ([#938](https://github.com/Instabug/Instabug-React-Native/pull/938)).

### Changed

- Bump Instabug Android SDK to v11.11.0 ([#963](https://github.com/Instabug/Instabug-React-Native/pull/963)). [See release notes](https://github.com/Instabug/Instabug-Android/releases/tag/v11.11.0).
- Bump Instabug iOS SDK to v11.10.1 ([#964](https://github.com/Instabug/Instabug-React-Native/pull/964)). [See release notes](https://github.com/Instabug/Instabug-iOS/releases/tag/11.10.1).
- Return a `Promise` from the below APIs ([#948](https://github.com/Instabug/Instabug-React-Native/pull/948)):

  - `Instabug.getTags`
  - `Instabug.getUserAttribute`
  - `Instabug.getAllUserAttributes`
  - `Replies.hasChats`
  - `Replies.getUnreadRepliesCount`
  - `Surveys.getAvailableSurveys`
  - `Surveys.hasRespondedToSurvey`

  You should not pass it a callback but use the returned `Promise` as follows:

  ```js
  const tags = await Instabug.getTags();
  ```

- Improve release variant's build time on Android, by using the react-native-generated source map file, instead of generating it within our scripts ([#938](https://github.com/Instabug/Instabug-React-Native/pull/938)).
- Improve debug variant's build time on iOS, by disabling automatic source map file uploads ([#942](https://github.com/Instabug/Instabug-React-Native/pull/942)).

### Deprecated

- Deprecate the callback parameter in the aforementioned methods ([#948](https://github.com/Instabug/Instabug-React-Native/pull/948)).

## [11.9.1](https://github.com/Instabug/Instabug-React-Native/compare/v11.9.0...v11.9.1) (March 01, 2023)

### Changed

- Re-export `NetworkData` type ([#932](https://github.com/Instabug/Instabug-React-Native/pull/932)), closes [#930](https://github.com/Instabug/Instabug-React-Native/issues/930).

### Fixed

- Fix a TS compilation error due to a broken entry point path ([#931](https://github.com/Instabug/Instabug-React-Native/pull/931)), closes [#930](https://github.com/Instabug/Instabug-React-Native/issues/930).

## 11.9.0 (2023-02-20)

- Bumps Instabug Android SDK to v11.9.0.
- Bumps Instabug iOS SDK to v11.9.0.
- Adds the new `Instabug.init` API to start the SDK as follows:
  ```js
  Instabug.init({
    token: '<APP_TOKEN>',
    invocationEvents: [InvocationEvent.floatingButton],
    debugLogsLevel: LogLevel.verbose,
  });
  ```
- Adds monorepo support for source maps automatic upload scripts.
- Adds gradle and ruby files to integrate native SDKs within exiting native apps. See [#919](https://github.com/Instabug/Instabug-React-Native/pull/919) for more info.
- Deprecates all module-enums (e.g. `Instabug.invocationEvent`) in favour of standalone-enums (e.g. `InvocationEvent`). See [#914](https://github.com/Instabug/Instabug-React-Native/pull/914) for more info and the detailed list of Enums.
- Deprecates `Instabug.start` in favour of `Instabug.init`.
- Deprecates `Instabug.setDebugEnabled`, `Instabug.setSdkDebugLogsLevel`, and `APM.setLogLevel` in favour of `debugLogsLevel` property of `Instabug.init`.
- Deprecates `Instabug.isRunningLive` API.
- Fixes external global error handlers not being called after initializing Instabug.
- Fixes `BugReporting.setDidSelectPromptOptionHandler` on iOS.
- Exports native Android SDK using `api` instead of `implementation`.

## 11.6.0 (2022-12-29)

- Bumps Instabug Android SDK to v11.7.0
- Bumps Instabug iOS SDK to v11.6.0
- Adds new string keys: insufficientContentMessage and insufficientContentTitle
- Adds missing mapping for some existing keys if relevant to the other platform
- Removes the string key: video
- Deprecates the legacy API callPrivateApi

## 11.5.1 (2022-12-14)

- Deprecates CrashReporting.reportJSException in favour of a new strongly typed API: CrashReporting.reportError
- Fixes Survey interface export causing a build error with certain babel versions

## 11.5.0 (2022-11-28)

- Bumps Instabug Android SDK to v11.6.0
- Bumps Instabug iOS SDK to v11.5.0
- Adds first-class TypeScript support
- Adds Romanian locale support
- Adds BugReporting.setDisclaimerText API
- Adds BugReporting.setCommentMinimumCharacterCount API
- Deprecates Instabug.enable and Instabug.disable APIs in favour of a new API Instabug.setEnabled, which works on both platforms
- Fixes a compilation error on Android projects without buildToolsVersion property set
- Fixes an issue with Hermes source maps generation script on React Native versions prior to 0.65.0

## 11.3.0 (2022-10-11)

- Bumps Instabug Android SDK to v11.5.1
- Bumps Instabug iOS SDK to v11.3.0
- Uses Cocoapods for Instabug iOS SDK
- Fixes a compilation error on projects with Java version prior to 8.

## 11.2.0 (2022-09-19)

- Bumps Instabug Android SDK to v11.4.1
- Bumps Instabug iOS SDK to v11.2.0
- React Native 0.69 support
- Bumps the minimum supported React Native version to 0.60.0
- Drops manual linking support
- Adjusts source maps auto upload script on Android to support the bundled Hermes in React Native v0.69
- Fixes an issue with Hermes source maps generation script causing JS crashes on Android not getting deobfuscated correctly
- Adds support for iOS source maps auto upload when Hermes is enabled

## 11.0.2 (2022-07-20)

- Fixes a crash that occurs when logging some failed network requests

## 11.0.1 (2022-06-13)

- Fixes an issue with network responses of type JSON not getting logged
- Fixes an issue that may cause the android build to fail
- Fixes an issue with iOS autolinking that causes the user local path to be referenced in xcode

## 11.0.0 (2022-06-07)

- Bumps Instabug native SDKs to v11
- Adds the ability to initialize the Android SDK from JavaScript. Check the migration guide referenced in our docs
- Adds the ability to opt out of iOS source maps auto upload through the INSTABUG_SOURCEMAPS_UPLOAD_DISABLE env variable
- Adds dynamic entry file support through the INSTABUG_ENTRY_FILE env variable
- Adds the string keys for Repro Steps
- Adds the new APIs: Instabug.addPrivateView and Instabug.removePrivateView
- Deprecates Instabug.setPrivateView in favor of the newly introduced APIs
- Removes the deprecated APIs. Check the migration guide referenced in our docs
- Removes Surveys.setThresholdForReshowingSurveyAfterDismiss
- Removes the string keys: surveysCustomThanksTitle and surveysCustomThanksSubtitle
- Renames BugReporting.setAutoScreenRecordingMaxDuration to BugReporting.setAutoScreenRecordingDurationIOS to target iOS only
- Fixes an issue with the setRequestFilterExpression API not working with Hermes
- Fixes an issue with the swipe invocation event not working on Android

## 10.13.0 (2022-03-17)

- Adds Instabug Experiments APIs
- Adds defensive type checking in Instabug logging APIs
- Bumps Instabug iOS SDK to v10.11.9
- Bumps Instabug Android SDK to v10.13.0
- Adapts the strict requirement of newer Expo versions to use the React header with the iOS import statements
- Fixes an issue with GraphQL requests not being grouped correctly
- Excludes unnecessary files from the published npm package

## 10.11.0 (2021-12-23)

- Adds GraphQL support for APM network traces with proper grouping
- Adds APM.endAppLaunch API
- Bumps Instabug native SDKs to v10.11
- Fixes an issue with iOS sourcemap upload that causes the build to fail

## 10.9.1 (2021-10-13)

- Bumps Instabug Android SDK to v10.9.1
- Bumps Instabug iOS SDK to v10.9.3
- Fixes an issue with network requests not getting logged in v10.9.0 on iOS

## 10.9.0 (2021-09-30)

- Bumps Instabug native SDKs to v10.9
- Fixes an issue with network header value formatting
- Replaces the defaults tool with PlistBuddy for reading plist files
- Enhances API documentation for TypeScript

## v10.8.1 (2021-08-25)

- Fixes a crash that occurs with network requests on slow network connectivity in v10.8
- Fixes an issue with parseErrorStack whose signature was changed on RN 0.64

## v10.8.0 (2021-08-04)

- Bumps Instabug native SDKs to v10.8
- Adds string keys for the discard attachment prompt dialog.
- Fixes Autolinking on iOS.

## v10.4.0 (2021-05-10)

- Migrates iOS to use XCFramework
- Bumps Instabug native SDKs to v10.4
- Fixes crashes related to the network request data not being parsed correctly
- Fixes issues related to the automatic sourcemap file upload on Android
- Adds missing TypeScript definitions
- Deprecates Instabug.setVideoRecordingFloatingButtonPosition in favor of BugReporting.setVideoRecordingFloatingButtonPosition
- Includes native fix which removes the usage of android:requestLegacyExternalStorage permission
- Various other bug fixes and improvements

## v10.0.0 (2021-02-16)

- Introduces Instabug’s new App Performance Monitoring (APM)
- Adds support for Push Notifications
- Bumps the minimum supported iOS version to iOS 10
- Various bug fixes and improvements

## v9.1.10 (2020-12-02)

- Fixes a crash caused by the network logger when the object passed is too large
- Adds source map upload script support for environment variables use inside Info.plist
- Fixes a crash when using `getUserAttribute` on an attribute that does not exist
- Fixes a crash when calling `setSdkDebugLogsLevel` on Android

## v9.1.9 (2020-10-01)

- Bumps Instabug native Android SDK to v9.1.8

## v9.1.8 (2020-09-16)

- Adds support for react-navigation v5
- Adds support for the Azerbaijani locale
- Bumps Instabug native SDKs to v9.1.7
- Fixes an issue with `onReportSubmitHandler` on iOS

## v9.1.7 (2020-08-10)

- Fixes missing typescript definitions

## v9.1.6 (2020-07-16)

- Fixes an issue that caused XHR Response not to be logged.
- Adds support for Repro Steps. Repro Steps list all of the actions an app user took before reporting a bug or crash, grouped by the screens they visited in your app.
- Bump Native SDKs to v9.1.6

## v9.1.1 (2020-04-06)

- Fixes an issue with the version name while uploading the sourcemap on Android.

## v9.1.0 (2020-03-19)

- Bump Native SDKs to v9.1
- Adds automatic sourcemap upload support for Hermes.

## v9.0.7 (2020-03-10)

- Bump iOS Native SDK to v9.0.12
- Enables MultiDex for android

## v9.0.6 (2020-01-29)

- Bump iOS Native SDK to v9.0.6

## v9.0.5 (2020-01-27)

- Bump iOS Native SDK to v9.0.4
- Bump Android Native SDK to v9.0.5

## v9.0.1 (2019-12-14)

- Updated iOS native SDK to v9.0.3

## v9.0.0 (2019-12-02)

- Updated native SDKs to v9.0
- Fixes Descrepencies in typescript definition file

## v8.7.3 (2019-11-14)

- Fixes `BugReporting.setViewHierarchyEnabled` crashing on iOS.

## v8.7.2 (2019-11-05)

- Fixes the automatic uploading of the source map files in some cases due to incorrect regex.
- Add a new string reportQuestion to replace the deprecated string startChats.
- Updates native SDKs

## v8.7.1 (2019-10-02)

- Updates native iOS SDK to v8.7.2
- Fixes `Warning: Require cycle` warnings.

## v8.7.0 (2019-09-19)

- Updates native SDKs to v8.7

## v8.6.4 (2019-09-13)

- Fixes an issue on Android that would result in a build error with the message `null is not an object (evaluating u.invocationEventNone)`

## v8.6.3 (2019-08-29)

- Updates native iOS SDK to v8.6.2

## v8.6.2 (2019-08-29)

- Updates native Android SDK to v8.6.2
- Fixes various bugs and improvements in automatic sourcemap upload scripts.

## v8.6.1 (2019-08-26)

- Introducing our new logo and branding. Meet the new Instabug: the platform for Real-Time Contextual Insights.
- Updates native SDK dependencies to 8.6.1.
- Adds the `enabled` key to `Instabug.reproStepsMode` enum to be able to use it with `Instabug.setReproStepsMode` API.

## v8.5.6 (2019-08-21)

- Fixes an issue that crashes the SDK when calling `Instabug.onReportSubmitHandler` on iOS.
- Fixes an issue with passing empty string value to `Instabug.setUserAttribute`.

## v8.5.5 (2019-08-17)

- Fixes an issue with the email validation when reporting a bug on Android.
- Fixes an issue with the crash reporting which prevented the report from being submitted on Android.

## v8.5.4 (2019-08-10)

- Hot Fixes an issue with `Instabug.setFloatingButtonEdge` and `Instabug.setEnabledAttachmentTypes` causing the app to crash.

## v8.5.3 (2019-08-08)

- Fixes hang/crash issues on iOS 9 devices
- Fixes string mappings for addVideoMessage and conversationsHeaderTitle in iOS.

## v8.5.2 (2019-08-04)

- Fixes an issue that would cause Android to throw ArrayIndexOutOfBoundsException.

## v8.5.1 (2019-07-22)

- Fixes an issue that would cause Instabug.framework to appear twice when using CocoaPods.
- Fixes a deadlock that would happen when `console.log` is called immediately after `startWithToken`.
- Fixes an issue that prevented app token from being detected correctly when uploading source map files.
- Fixes an issue that caused Android release builds to fail when building on a Windows machine.

## v8.5.0 (2019-07-11)

**⚠️ If you are using React Native 0.60, please follow our migration guide [here](https://github.com/Instabug/Instabug-React-Native/blob/master/README.md#updating-to-version-85)**

- Support for React Native 0.60
- Updates native iOS and Android SDKs to version 8.5

## v8.4.4 (2019-07-08)

- Fixes an issue that causes the sdk to crash when a network request has no headers.

## v8.4.3 (2019-07-03)

- Fixes an issue that caused Android release builds to fail when building on a Windows machine.
- Fixes an issue that caused apps to freeze when `onReportSubmitHandler` is called in certain cases.

## v8.4.2 (2019-06-19)

- Fixes valid email written but gets enter valid email error message on Android.

## v8.4.1 (2019-06-17)

- Fixes Surveys.getAvailableSurveys API not returning the list of surveys on iOS.
- Fixes typescript definition for the API Surveys.getAvailableSurveys.

## v8.4.0 (2019-06-11)

- Updates native iOS and Android SDKs to version 8.4.

## v8.3.4 (2019-06-06)

- Fixes build failure on iOS caused by IBGUserStepsModeEnable not found in SDK.

## v8.3.3 (2019-05-31)

- Fixes crash caused when calling the setReproStepsMode API with enum value enabled.
- Fixes wrong typescript definition for the setReportTypes API param.

## v8.3.2 (2019-05-23)

- Fixes an issue that causes release builds to fail on Windows

## v8.3.1 (2019-05-11)

- Hotfix captureJsErrors

## v8.3.0 (2019-05-11)

- Update native android and iOS versions to 8.3.0.
- Fixes Network logging crashes and immutability
- Added new OnReportSubmitHandler API
- Fixed linking script
- Api Name Changes
