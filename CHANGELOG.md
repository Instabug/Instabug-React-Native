# Changelog

## [11.9.1](https://github.com/Instabug/Instabug-React-Native/compare/v11.9.0...HEAD) (March 01, 2023)

### Changed

- Re-export `NetworkData` type ([#932](https://github.com/Instabug/Instabug-React-Native/pull/932)), closes [#930](https://github.com/Instabug/Instabug-React-Native/issues/930).

### Fixed

- Fix a TS compilation error due to a broken entry point path ([#931](https://github.com/Instabug/Instabug-React-Native/pull/931)), closes [#930](https://github.com/Instabug/Instabug-React-Native/issues/930).

## [11.9.0](https://github.com/Instabug/Instabug/Instabug-React-Native/compare/v11.6.0...v11.9.0) (February 20, 2023)

### Added

- Add the new `Instabug.init` API to start the SDK ([#867](https://github.com/Instabug/Instabug-React-Native/pull/867)) as follows:

  ```js
  Instabug.init({
    token: '<APP_TOKEN>',
    invocationEvents: [InvocationEvent.floatingButton],
    debugLogsLevel: LogLevel.verbose,
  });
  ```

- Add monorepo support for source maps automatic upload scripts ([#915](https://github.com/Instabug/Instabug-React-Native/pull/915)).
- Add gradle and ruby files to integrate native SDKs within exiting native apps ([#919](https://github.com/Instabug/Instabug-React-Native/pull/919)).

### Changed

- Bump Instabug Android SDK to v11.9.0 ([#926](https://github.com/Instabug/Instabug-React-Native/pull/926)). [See release notes](https://github.com/Instabug/Instabug-Android/releases/tag/v11.9.0).
- Bump Instabug iOS SDK to v11.9.0 ([#967](https://github.com/Instabug/Instabug-React-Native/pull/967)). [See release notes](https://github.com/Instabug/Instabug-iOS/releases/tag/11.9.0).
- Export native Android SDK using `api` instead of `implementation` ([#907](https://github.com/Instabug/Instabug-React-Native/pull/907)).

### Deprecated

- Deprecate all module-enums (e.g. `Instabug.invocationEvent`) in favour of standalone-enums (e.g. `InvocationEvent`) ([#914](https://github.com/Instabug/Instabug-React-Native/pull/914)).
- Deprecate `Instabug.start` in favour of `Instabug.init` ([#867](https://github.com/Instabug/Instabug-React-Native/pull/867)).
- Deprecate `Instabug.setDebugEnabled`, `Instabug.setSdkDebugLogsLevel`, and `APM.setLogLevel` in favour of `debugLogsLevel` property of `Instabug.init` ([#873](https://github.com/Instabug/Instabug-React-Native/pull/873)).
- Deprecate `Instabug.isRunningLive` API ([#892](https://github.com/Instabug/Instabug-React-Native/pull/892)).

### Fixed

- Fix external global error handlers not being called after initializing Instabug ([#886](https://github.com/Instabug/Instabug-React-Native/pull/886)).
- Fix `BugReporting.setDidSelectPromptOptionHandler` on iOS ([#920](https://github.com/Instabug/Instabug-React-Native/pull/920)).

## [11.6.0](https://github.com/Instabug/Instabug/Instabug-React-Native/compare/v11.5.1...v11.6.0) (December, 29, 2022)

### Added

- Add new string keys: `insufficientContentMessage` and `insufficientContentTitle` ([#840](https://github.com/Instabug/Instabug-React-Native/pull/840)).
- Add missing mapping for some existing keys if relevant to the other platform ([#840](https://github.com/Instabug/Instabug-React-Native/pull/840)).

### Changed

- Bump Instabug Android SDK to v11.7.0 ([#863](https://github.com/Instabug/Instabug-React-Native/pull/863)). [See release notes](https://github.com/Instabug/Instabug-Android/releases/tag/v11.7.0).
- Bump Instabug iOS SDK to v11.6.0 ([#864](https://github.com/Instabug/Instabug-React-Native/pull/864)). [See release notes](https://github.com/Instabug/Instabug-IOS/releases/tag/11.6.0).
- **BREAKING:** Remove the string key: `video` ([#840](https://github.com/Instabug/Instabug-React-Native/pull/840)).

### Deprecated

- Deprecate the legacy API `callPrivateApi` ([#866](https://github.com/Instabug/Instabug-React-Native/pull/866)).

## [11.5.1](https://github.com/Instabug/Instabug-React-Native/compare/v11.5.0...v11.5.1) (December 14, 2022)

### Deprecated

- Deprecate `CrashReporting.reportJSException` in favour of the new strongly-typed `CrashReporting.reportError` ([#852](https://github.com/Instabug/Instabug-React-Native/pull/852)).

### Fixed

- Fix `Survey` interface export causing a build error with certain babel versions ([#851](https://github.com/Instabug/Instabug-React-Native/pull/851)), closes [#845](https://github.com/Instabug/Instabug-React-Native/issues/845).

## [11.5.0](https://github.com/Instabug/Instabug-React-Native/compare/v11.3.0...v11.5.0) (November 28, 2022)

### Added

- Add first-class TypeScript support ([#783](https://github.com/Instabug/Instabug-React-Native/pull/783)).
- Add Romanian locale support ([#835](https://github.com/Instabug/Instabug-React-Native/pull/835)).
- Add `BugReporting.setDisclaimerText` API ([#830](https://github.com/Instabug/Instabug-React-Native/pull/830)).
- Add `BugReporting.setCommentMinimumCharacterCount` API ([#830](https://github.com/Instabug/Instabug-React-Native/pull/830)).

### Changed

- Bump Instabug Android SDK to v11.6.0 ([#832](https://github.com/Instabug/Instabug-React-Native/pull/832)). [See release notes](https://github.com/Instabug/Instabug-Android/releases/tag/v11.6.0).
- Bump Instabug iOS SDK to v11.5.0 ([#833](https://github.com/Instabug/Instabug-React-Native/pull/833)). [See release notes](https://github.com/Instabug/Instabug-IOS/releases/tag/11.5.0).

### Deprecated

- Deprecate `Instabug.enable` and `Instabug.disable` APIs in favour of a new API `Instabug.setEnabled`, which works on both platforms ([#830](https://github.com/Instabug/Instabug-React-Native/pull/830)).

### Fixed

- Fix a compilation error on Android projects without `buildToolsVersion` property set ([#812](https://github.com/Instabug/Instabug-React-Native/pull/812)), closes [#719](https://github.com/Instabug/Instabug-React-Native/issues/719).
- Fix an issue with Hermes source maps generation script on `react-native` versions prior to v0.65.0 ([#834](https://github.com/Instabug/Instabug-React-Native/pull/834)).

## [11.3.0](https://github.com/Instabug/Instabug-React-Native/compare/v11.2.0...v11.3.0) (October 11, 2022)

### Changed

- Bump Instabug Android SDK to v11.5.1 ([#789](https://github.com/Instabug/Instabug-React-Native/pull/789)). [See release notes](https://github.com/Instabug/Instabug-Android/releases/tag/v11.5.1).
- Bump Instabug iOS SDK to v11.3.0 ([#790](https://github.com/Instabug/Instabug-React-Native/pull/790)). [See release notes](https://github.com/Instabug/Instabug-IOS/releases/tag/11.3.0).
- Use CocoaPods for Instabug iOS SDK; resulting in huge improvement for the npm package size ([#639](https://github.com/Instabug/Instabug-React-Native/pull/639)).

### Fixed

- Fix a compilation error on projects with Java version prior to 8 ([#788](https://github.com/Instabug/Instabug-React-Native/pull/788)).

## [11.2.0](https://github.com/Instabug/Instabug-React-Native/compare/v11.0.2...v11.2.0) (September 19, 2022)

### Added

- Add `react-native` v0.69.0 support ([#748](https://github.com/Instabug/Instabug-React-Native/pull/748)), closes [#732](https://github.com/Instabug/Instabug-React-Native/issues/732).
- Add Hermes support for source maps automatic upload script on Android with `react-native` v0.69.0 ([#750](https://github.com/Instabug/Instabug-React-Native/pull/750)).
- Add support for iOS source maps automatic upload when Hermes is enabled ([#756](https://github.com/Instabug/Instabug-React-Native/pull/756)).

### Changed

- Bump Instabug Android SDK to v11.4.1 ([#775](https://github.com/Instabug/Instabug-React-Native/pull/775)). [See release notes](https://github.com/Instabug/Instabug-Android/releases/tag/v11.4.1).
- Bump Instabug iOS SDK to v11.2.0 ([#778](https://github.com/Instabug/Instabug-React-Native/pull/778)). [See release notes](https://github.com/Instabug/Instabug-IOS/releases/tag/11.2.0).
- Drop support for `react-native` versions prior to v0.60.0 ([#748](https://github.com/Instabug/Instabug-React-Native/pull/748)).
- Drop support for manual linking ([#748](https://github.com/Instabug/Instabug-React-Native/pull/748)).

### Fixed

- Fix an issue with Hermes source maps generation script causing JS crashes on Android not getting deobfuscated correctly ([#751](https://github.com/Instabug/Instabug-React-Native/pull/751)).

## [11.0.2](https://github.com/Instabug/Instabug-React-Native/compare/v11.0.1...v11.0.2) (July 20, 2022)

### Fixed

- Fix a crash that occurs when logging some failed network requests ([#735](https://github.com/Instabug/Instabug-React-Native/pull/735)), closes [#733](https://github.com/Instabug/Instabug-React-Native/issues/733).

## [11.0.1](https://github.com/Instabug/Instabug-React-Native/compare/v11.0.0...v11.0.1) (June 13, 2022)

### Fixed

- Fix an issue with network responses of type JSON not getting logged ([#710](https://github.com/Instabug/Instabug-React-Native/pull/710)).
- Fix an issue that may cause the android build to fail ([#722](https://github.com/Instabug/Instabug-React-Native/pull/722)).
- Fix an issue with iOS autolinking that causes the user local path to be referenced in Xcode ([#726](https://github.com/Instabug/Instabug-React-Native/pull/726)).

## [11.0.0](https://github.com/Instabug/Instabug-React-Native/compare/v10.13.0...v11.0.0) (June 07, 2022)

### Added

- Add the ability to initialize the Android SDK from JavaScript. Check the [migration guide][migration-v11] for more info ([#704](https://github.com/Instabug/Instabug-React-Native/pull/704)).
- Add the ability to opt out of iOS source maps auto upload through the `INSTABUG_SOURCEMAPS_UPLOAD_DISABLE` env variable ([#694](https://github.com/Instabug/Instabug-React-Native/pull/694)), closes [#643](https://github.com/Instabug/Instabug-React-Native/issues/643).
- Add dynamic entry file support through the `INSTABUG_ENTRY_FILE` env variable ([#674](https://github.com/Instabug/Instabug-React-Native/pull/674)).
- Add the string keys for Repro Steps ([#661](https://github.com/Instabug/Instabug-React-Native/pull/661)), closes [#659](https://github.com/Instabug/Instabug-React-Native/issues/659).

### Changed

- Bump Instabug Android SDK to v11.2.0 ([#709](https://github.com/Instabug/Instabug-React-Native/pull/709)). [See release notes](https://github.com/Instabug/Instabug-Android/releases/tag/v11.2.0).
- Bump Instabug iOS SDK to v11.0.2 ([#709](https://github.com/Instabug/Instabug-React-Native/pull/709)). [See release notes](https://github.com/Instabug/Instabug-IOS/releases/tag/11.0.2).
- Remove the deprecated APIs. Check the [migration guide][migration-v11] for more info ([#703](https://github.com/Instabug/Instabug-React-Native/pull/703)).
- **BREAKING:** Remove `Surveys.setThresholdForReshowingSurveyAfterDismiss` ([#709](https://github.com/Instabug/Instabug-React-Native/pull/709)).
- **BREAKING:** Remove the string keys: `surveysCustomThanksTitle` and `surveysCustomThanksSubtitle` ([#709](https://github.com/Instabug/Instabug-React-Native/pull/709)).
- **BREAKING:** Rename `BugReporting.setAutoScreenRecordingMaxDuration` to `BugReporting.setAutoScreenRecordingDurationIOS` to target iOS only ([#709](https://github.com/Instabug/Instabug-React-Native/pull/709)).

### Deprecated

- Deprecate `Instabug.setPrivateView` in favour of `Instabug.addPrivateView` and `Instabug.removePrivateView` ([#709](https://github.com/Instabug/Instabug-React-Native/pull/709)).

### Fixed

- Fix an issue with the `setRequestFilterExpression` not working with Hermes ([#705](https://github.com/Instabug/Instabug-React-Native/pull/705)).
- Fix an issue with the swipe invocation event not working on Android ([#690](https://github.com/Instabug/Instabug-React-Native/pull/690)).

[migration-v11]: https://docs.instabug.com/docs/react-native-migration-guide

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
