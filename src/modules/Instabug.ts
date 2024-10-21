//todo: remove all logs tagged with 'Andrew' in the file
import {
  AppState,
  type AppStateStatus,
  findNodeHandle,
  Platform,
  processColor,
} from 'react-native';

import type {
  NavigationContainerRefWithCurrent,
  NavigationState as NavigationStateV5,
} from '@react-navigation/native';
import type { ComponentDidAppearEvent } from 'react-native-navigation';
import type { NavigationAction, NavigationState as NavigationStateV4 } from 'react-navigation';

import type { InstabugConfig } from '../models/InstabugConfig';
import Report from '../models/Report';
import { emitter, NativeEvents, NativeInstabug } from '../native/NativeInstabug';
import {
  ColorTheme,
  Locale,
  LogLevel,
  NetworkInterceptionMode,
  ReproStepsMode,
  StringKey,
  WelcomeMessageMode,
} from '../utils/Enums';
import InstabugUtils, {
  setApmNetworkFlagsIfChanged,
  stringifyIfNotString,
} from '../utils/InstabugUtils';
import * as NetworkLogger from './NetworkLogger';
import { captureUnhandledRejections } from '../utils/UnhandledRejectionTracking';
import type { ReproConfig } from '../models/ReproConfig';
import type { FeatureFlag } from '../models/FeatureFlag';
import { addAppStateListener } from '../utils/AppStatesHandler';
import InstabugConstants from '../utils/InstabugConstants';
import { NativeNetworkLogger } from '../native/NativeNetworkLogger';

let _currentScreen: string | null = null;
let _lastScreen: string | null = null;
let _isFirstScreen = false;
const firstScreen = 'Initial Screen';
let _currentAppState = AppState.currentState;
let isNativeInterceptionFeatureEnabled = false; // Checks the value of "cp_native_interception_enabled" backend flag.
let hasAPMNetworkPlugin = false; // Android only: checks if the APM plugin is installed.
let shouldEnableNativeInterception = false; // Android: used to disable APM logging inside reportNetworkLog() -> NativeAPM.networkLogAndroid(), iOS: used to control native interception (true == enabled , false == disabled)

/**
 * Enables or disables Instabug functionality.
 * @param isEnabled A boolean to enable/disable Instabug.
 */
export const setEnabled = (isEnabled: boolean) => {
  NativeInstabug.setEnabled(isEnabled);
};

/**
 * Reports that the screen name been changed (Current View field on dashboard).
 * only for android.
 *
 * Normally reportScreenChange handles taking a screenshot for reproduction
 * steps and the Current View field on the dashboard. But we've faced issues
 * in android where we needed to separate them, that's why we only call it
 * for android.
 *
 * @param screenName string containing the screen name
 */
function reportCurrentViewForAndroid(screenName: string | null) {
  if (Platform.OS === 'android' && screenName != null) {
    NativeInstabug.reportCurrentViewChange(screenName);
  }
}

function _logFlags() {
  console.log(
    `Andrew: init -> {
     isNativeInterceptionFeatureEnabled: ${isNativeInterceptionFeatureEnabled},
     hasAPMNetworkPlugin: ${hasAPMNetworkPlugin},
     shouldEnableNativeInterception: ${shouldEnableNativeInterception}
    }`,
  );
}

/**
 * Initializes the SDK.
 * This is the main SDK method that does all the magic. This is the only
 * method that SHOULD be called.
 * Should be called in constructor of the AppRegistry component
 * @param config SDK configurations. See {@link InstabugConfig} for more info.
 */
export const init = async (config: InstabugConfig) => {
  // Initialize necessary variables
  isNativeInterceptionFeatureEnabled = await NativeNetworkLogger.isNativeInterceptionEnabled();
  if (Platform.OS === 'android') {
    hasAPMNetworkPlugin = await NativeNetworkLogger.hasAPMNetworkPlugin();
    shouldEnableNativeInterception =
      config.networkInterceptionMode === NetworkInterceptionMode.native;
  }

  // Add app state listener to handle background/foreground transitions
  addAppStateListener(async (nextAppState) => handleAppStateChange(nextAppState, config));

  //Set APM networking flags for the first time
  setApmNetworkFlagsIfChanged({
    isNativeInterceptionFeatureEnabled: isNativeInterceptionFeatureEnabled,
    hasAPMNetworkPlugin: hasAPMNetworkPlugin,
    shouldEnableNativeInterception: shouldEnableNativeInterception,
  });

  // Perform platform-specific checks and update interception mode
  handleNetworkInterceptionMode(config);

  // Log the current APM network flags and initialize Instabug
  _logFlags();

  // call Instabug native init method
  initializeNativeInstabug(config);

  // Set up error capturing and rejection handling
  InstabugUtils.captureJsErrors();
  captureUnhandledRejections();

  _isFirstScreen = true;
  _currentScreen = firstScreen;

  reportCurrentViewForAndroid(firstScreen);
  setTimeout(() => {
    if (_currentScreen === firstScreen) {
      NativeInstabug.reportScreenChange(firstScreen);
      _currentScreen = null;
    }
  }, 1000);
};

/**
 * Handles app state changes and updates APM network flags if necessary.
 */
const handleAppStateChange = async (nextAppState: AppStateStatus, config: InstabugConfig) => {
  // Checks if  the app has come to the foreground
  if (['inactive', 'background'].includes(_currentAppState) && nextAppState === 'active') {
    // Update the APM network flags
    const updatedFlags = await fetchApmNetworkFlags();
    const isUpdated = setApmNetworkFlagsIfChanged(updatedFlags);

    if (isUpdated) {
      console.log('Andrew: APM network flags updated.');
      handleNetworkInterceptionMode(config);
      initializeNativeInstabug(config);
    }
    _logFlags();
    console.log('Andrew: App has come to the foreground!');
  }

  _currentAppState = nextAppState;
  console.log(`Andrew: Current AppState: ${_currentAppState}`);
};

/**
 * Fetches the current APM network flags.
 */
const fetchApmNetworkFlags = async () => {
  isNativeInterceptionFeatureEnabled = await NativeNetworkLogger.isNativeInterceptionEnabled();
  if (Platform.OS === 'android') {
    hasAPMNetworkPlugin = await NativeNetworkLogger.hasAPMNetworkPlugin();
  }

  return {
    isNativeInterceptionFeatureEnabled,
    hasAPMNetworkPlugin,
    shouldEnableNativeInterception,
  };
};

/**
 * Handles platform-specific checks and updates the network interception mode.
 */
const handleNetworkInterceptionMode = (config: InstabugConfig) => {
  // Default networkInterceptionMode to JavaScript if not set
  if (config.networkInterceptionMode == null) {
    config.networkInterceptionMode = NetworkInterceptionMode.javascript;
  }

  if (Platform.OS === 'android') {
    handleInterceptionModeForAndroid(config);
    config.networkInterceptionMode = NetworkInterceptionMode.javascript; // Need to enable JS interceptor in all scenarios for Bugs & Crashes network logs
  } else if (Platform.OS === 'ios') {
    handleInterceptionModeForIOS(config);
  }

  if (config.networkInterceptionMode === NetworkInterceptionMode.javascript) {
    NetworkLogger.setEnabled(true);
  }
};

/**
 * Handles the JS interception logic for Android.
 */
function handleAndroidJSInterception() {
  if (isNativeInterceptionFeatureEnabled && hasAPMNetworkPlugin) {
    shouldEnableNativeInterception = true;
    console.warn(
      InstabugConstants.IBG_APM_TAG + InstabugConstants.SWITCHED_TO_NATIVE_INTERCEPTION_MESSAGE,
    );
  }
}

/**
 * Handles the native interception logic for Android.
 */
function handleAndroidNativeInterception() {
  if (isNativeInterceptionFeatureEnabled) {
    shouldEnableNativeInterception = hasAPMNetworkPlugin;
    if (!hasAPMNetworkPlugin) {
      console.error(InstabugConstants.IBG_APM_TAG + InstabugConstants.PLUGIN_NOT_INSTALLED_MESSAGE);
    }
  } else {
    shouldEnableNativeInterception = false; // rollback to use JS interceptor for APM & Core.
    if (hasAPMNetworkPlugin) {
      console.error(
        InstabugConstants.IBG_APM_TAG + InstabugConstants.NATIVE_INTERCEPTION_DISABLED_MESSAGE,
      );
    } else {
      console.error(
        InstabugConstants.IBG_APM_TAG +
          InstabugConstants.PLUGIN_NOT_INSTALLED_AND_NATIVE_INTERCEPTION_DISABLED_MESSAGE,
      );
    }
  }
}

/**
 * Handles the interception mode logic for Android.
 * By deciding which interception mode should be enabled (Native or JavaScript).
 */
const handleInterceptionModeForAndroid = (config: InstabugConfig) => {
  const { networkInterceptionMode } = config;

  if (networkInterceptionMode === NetworkInterceptionMode.javascript) {
    handleAndroidJSInterception();
  } else {
    handleAndroidNativeInterception();
  }
};

/**
 * Handles the interception mode logic for iOS.
 * By deciding which interception mode should be enabled (Native or JavaScript).
 */
const handleInterceptionModeForIOS = (config: InstabugConfig) => {
  if (config.networkInterceptionMode === NetworkInterceptionMode.native) {
    if (isNativeInterceptionFeatureEnabled) {
      shouldEnableNativeInterception = true;
      NetworkLogger.setEnabled(false); // insure JS interceptor is disabled
    } else {
      shouldEnableNativeInterception = false;
      NetworkLogger.setEnabled(true); // rollback to JS interceptor
      console.error(
        InstabugConstants.IBG_APM_TAG + InstabugConstants.NATIVE_INTERCEPTION_DISABLED_MESSAGE,
      );
    }
  }
};

/**
 * Initializes Instabug with the given configuration.
 */
const initializeNativeInstabug = (config: InstabugConfig) => {
  console.log(
    `Andrew: initializeNativeInstabug -> NativeNetworkInterceptionMode ${
      shouldEnableNativeInterception &&
      config.networkInterceptionMode === NetworkInterceptionMode.native
    }`,
  );
  NativeInstabug.init(
    config.token,
    config.invocationEvents,
    config.debugLogsLevel ?? LogLevel.error,
    shouldEnableNativeInterception &&
      config.networkInterceptionMode === NetworkInterceptionMode.native,
    config.codePushVersion,
  );
};

/**
 * Sets the Code Push version to be sent with each report.
 * @param version the Code Push version.
 */
export const setCodePushVersion = (version: string) => {
  NativeInstabug.setCodePushVersion(version);
};

/**
 * Attaches user data to each report being sent.
 * Each call to this method overrides the user data to be attached.
 * Maximum size of the string is 1,000 characters.
 * @param data A string to be attached to each report, with a maximum size of 1,000 characters.
 */
export const setUserData = (data: string) => {
  NativeInstabug.setUserData(data);
};

/**
 * Sets whether the SDK is tracking user steps or not.
 * Enabling user steps would give you an insight on the scenario a user has
 * performed before encountering a bug or a crash. User steps are attached
 * with each report being sent.
 * @param isEnabled A boolean to set user steps tracking to being enabled or disabled.
 */
export const setTrackUserSteps = (isEnabled: boolean) => {
  if (Platform.OS === 'ios') {
    NativeInstabug.setTrackUserSteps(isEnabled);
  }
};

/**
 * Sets whether IBGLog should also print to Xcode's console log or not.
 * @param printsToConsole A boolean to set whether printing to
 * Xcode's console is enabled or not.
 */
export const setIBGLogPrintsToConsole = (printsToConsole: boolean) => {
  if (Platform.OS === 'ios') {
    NativeInstabug.setIBGLogPrintsToConsole(printsToConsole);
  }
};

/**
 * The session profiler is enabled by default and it attaches to the bug and
 * crash reports the following information during the last 60 seconds before the report is sent.
 * @param isEnabled A boolean parameter to enable or disable the feature.
 */
export const setSessionProfilerEnabled = (isEnabled: boolean) => {
  NativeInstabug.setSessionProfilerEnabled(isEnabled);
};

/**
 * Sets the SDK's locale.
 * Use to change the SDK's UI to different language.
 * Defaults to the device's current locale.
 * @param sdkLocale A locale to set the SDK to.
 */
export const setLocale = (sdkLocale: Locale) => {
  NativeInstabug.setLocale(sdkLocale);
};

/**
 * Sets the color theme of the SDK's whole UI.
 * @param sdkTheme
 */
export const setColorTheme = (sdkTheme: ColorTheme) => {
  NativeInstabug.setColorTheme(sdkTheme);
};

/**
 * Sets the primary color of the SDK's UI.
 * Sets the color of UI elements indicating interactivity or call to action.
 * To use, import processColor and pass to it with argument the color hex
 * as argument.
 * @param color A color to set the UI elements of the SDK to.
 */
export const setPrimaryColor = (color: string) => {
  NativeInstabug.setPrimaryColor(processColor(color));
};

/**
 * Appends a set of tags to previously added tags of reported feedback,
 * bug or crash.
 * @param tags An array of tags to append to current tags.
 */
export const appendTags = (tags: string[]) => {
  NativeInstabug.appendTags(tags);
};

/**
 * Manually removes all tags of reported feedback, bug or crash.
 */
export const resetTags = () => {
  NativeInstabug.resetTags();
};

/**
 * Gets all tags of reported feedback, bug or crash.
 */
export const getTags = async (): Promise<string[] | null> => {
  const tags = await NativeInstabug.getTags();

  return tags;
};

/**
 * Overrides any of the strings shown in the SDK with custom ones.
 * Allows you to customize any of the strings shown to users in the SDK.
 * @param key Key of string to override.
 * @param string String value to override the default one.
 */
export const setString = (key: StringKey, string: string) => {
  // Suffix the repro steps list item numbering title with a # to unify the string key's
  // behavior between Android and iOS
  if (Platform.OS === 'android' && key === StringKey.reproStepsListItemNumberingTitle) {
    string = `${string} #`;
  }

  NativeInstabug.setString(string, key);
};

/**
 * Sets the default value of the user's email and ID and hides the email field from the reporting UI
 * and set the user's name to be included with all reports.
 * It also reset the chats on device to that email and removes user attributes,
 * user data and completed surveys.
 * @param email Email address to be set as the user's email.
 * @param name Name of the user to be set.
 * @param [id] ID of the user to be set.
 */
export const identifyUser = (email: string, name: string, id?: string) => {
  NativeInstabug.identifyUser(email, name, id);
};

/**
 * Sets the default value of the user's email to nil and show email field and remove user name
 * from all reports
 * It also reset the chats on device and removes user attributes, user data and completed surveys.
 */
export const logOut = () => {
  NativeInstabug.logOut();
};

/**
 * Logs a user event that happens through the lifecycle of the application.
 * Logged user events are going to be sent with each report, as well as at the end of a session.
 * @param name Event name.
 */
export const logUserEvent = (name: string) => {
  NativeInstabug.logUserEvent(name);
};

/**
 * Appends a log message to Instabug internal log.
 * These logs are then sent along the next uploaded report.
 * All log messages are timestamped.
 * Logs aren't cleared per single application run.
 * If you wish to reset the logs, use {@link clearLogs()}
 * Note: logs passed to this method are **NOT** printed to Logcat.
 *
 * @param message the message
 */
export const logVerbose = (message: string) => {
  if (!message) {
    return;
  }
  message = stringifyIfNotString(message);
  NativeInstabug.logVerbose(message);
};

/**
 * Appends a log message to Instabug internal log.
 * These logs are then sent along the next uploaded report.
 * All log messages are timestamped.
 * Logs aren't cleared per single application run.
 * If you wish to reset the logs, use {@link clearLogs()}
 * Note: logs passed to this method are **NOT** printed to Logcat.
 *
 * @param message the message
 */
export const logInfo = (message: string) => {
  if (!message) {
    return;
  }
  message = stringifyIfNotString(message);
  NativeInstabug.logInfo(message);
};

/**
 * Appends a log message to Instabug internal log.
 * These logs are then sent along the next uploaded report.
 * All log messages are timestamped.
 * Logs aren't cleared per single application run.
 * If you wish to reset the logs, use {@link clearLogs()}
 * Note: logs passed to this method are **NOT** printed to Logcat.
 *
 * @param message the message
 */
export const logDebug = (message: string) => {
  if (!message) {
    return;
  }
  message = stringifyIfNotString(message);
  NativeInstabug.logDebug(message);
};

/**
 * Appends a log message to Instabug internal log.
 * These logs are then sent along the next uploaded report.
 * All log messages are timestamped.
 * Logs aren't cleared per single application run.
 * If you wish to reset the logs, use {@link clearLogs()}
 * Note: logs passed to this method are **NOT** printed to Logcat.
 *
 * @param message the message
 */
export const logError = (message: string) => {
  if (!message) {
    return;
  }
  message = stringifyIfNotString(message);
  NativeInstabug.logError(message);
};

/**
 * Appends a log message to Instabug internal log.
 * These logs are then sent along the next uploaded report.
 * All log messages are timestamped.
 * Logs aren't cleared per single application run.
 * If you wish to reset the logs, use {@link clearLogs()}
 * Note: logs passed to this method are **NOT** printed to Logcat.
 *
 * @param message the message
 */
export const logWarn = (message: string) => {
  if (!message) {
    return;
  }
  message = stringifyIfNotString(message);
  NativeInstabug.logWarn(message);
};

/**
 * Clear all Instabug logs, console logs, network logs and user steps.
 */
export const clearLogs = () => {
  NativeInstabug.clearLogs();
};

/**
 * Sets the repro steps mode for bugs and crashes.
 *
 * @param config The repro steps config.
 *
 * @example
 * ```js
 * Instabug.setReproStepsConfig({
 *   bug: ReproStepsMode.enabled,
 *   crash: ReproStepsMode.disabled,
 *   sessionReplay: ReproStepsMode.enabled,
 * });
 * ```
 */
export const setReproStepsConfig = (config: ReproConfig) => {
  let bug = config.bug ?? ReproStepsMode.enabled;
  let crash = config.crash ?? ReproStepsMode.enabledWithNoScreenshots;
  let sessionReplay = config.sessionReplay ?? ReproStepsMode.enabled;

  if (config.all != null) {
    bug = config.all;
    crash = config.all;
    sessionReplay = config.all;
  }

  NativeInstabug.setReproStepsConfig(bug, crash, sessionReplay);
};

/**
 * Sets user attribute to overwrite it's value or create a new one if it doesn't exist.
 *
 * @param key the attribute
 * @param value the value
 */
export const setUserAttribute = (key: string, value: string) => {
  if (!key || typeof key !== 'string' || typeof value !== 'string') {
    throw new TypeError('Invalid param, Expected String');
  }
  NativeInstabug.setUserAttribute(key, value);
};

/**
 * Returns the user attribute associated with a given key.
 * @param key The attribute key as string
 */
export const getUserAttribute = async (key: string): Promise<string | null> => {
  const attribute = await NativeInstabug.getUserAttribute(key);

  return attribute;
};

/**
 * Removes user attribute if exists.
 *
 * @param key the attribute key as string
 * @see {@link setUserAttribute}
 */
export const removeUserAttribute = (key: string) => {
  if (!key || typeof key !== 'string') {
    throw new TypeError('Invalid param, Expected String');
  }
  NativeInstabug.removeUserAttribute(key);
};

/**
 * Returns all user attributes.
 * set user attributes, or an empty dictionary if no user attributes have been set.
 */
export const getAllUserAttributes = async (): Promise<Record<string, string>> => {
  const attributes = await NativeInstabug.getAllUserAttributes();

  return attributes;
};

/**
 * Clears all user attributes if exists.
 */
export const clearAllUserAttributes = () => {
  NativeInstabug.clearAllUserAttributes();
};

/**
 * Shows the welcome message in a specific mode.
 * @param mode An enum to set the welcome message mode to live, or beta.
 */
export const showWelcomeMessage = (mode: WelcomeMessageMode) => {
  NativeInstabug.showWelcomeMessageWithMode(mode);
};

/**
 * Sets the welcome message mode to live, beta or disabled.
 * @param mode An enum to set the welcome message mode to live, beta or disabled.
 */
export const setWelcomeMessageMode = (mode: WelcomeMessageMode) => {
  NativeInstabug.setWelcomeMessageMode(mode);
};

/**
 * Add file to be attached to the bug report.
 * @param filePath
 * @param fileName
 */
export const addFileAttachment = (filePath: string, fileName: string) => {
  if (Platform.OS === 'android') {
    NativeInstabug.setFileAttachment(filePath, fileName);
  } else {
    NativeInstabug.setFileAttachment(filePath);
  }
};

/**
 * Hides component from screenshots, screen recordings and view hierarchy.
 * @param viewRef the ref of the component to hide
 */
export const addPrivateView = (viewRef: number | React.Component | React.ComponentClass) => {
  const nativeTag = findNodeHandle(viewRef);
  NativeInstabug.addPrivateView(nativeTag);
};

/**
 * Removes component from the set of hidden views. The component will show again in
 * screenshots, screen recordings and view hierarchy.
 * @param viewRef the ref of the component to remove from hidden views
 */
export const removePrivateView = (viewRef: number | React.Component | React.ComponentClass) => {
  const nativeTag = findNodeHandle(viewRef);
  NativeInstabug.removePrivateView(nativeTag);
};

/**
 * Shows default Instabug prompt.
 */
export const show = () => {
  NativeInstabug.show();
};

export const onReportSubmitHandler = (handler?: (report: Report) => void) => {
  emitter.addListener(NativeEvents.PRESENDING_HANDLER, (report) => {
    const { tags, consoleLogs, instabugLogs, userAttributes, fileAttachments } = report;
    const reportObj = new Report(tags, consoleLogs, instabugLogs, userAttributes, fileAttachments);
    handler && handler(reportObj);
  });

  NativeInstabug.setPreSendingHandler(handler);
};

export const onNavigationStateChange = (
  prevState: NavigationStateV4,
  currentState: NavigationStateV4,
  _action: NavigationAction,
) => {
  const currentScreen = InstabugUtils.getActiveRouteName(currentState);
  const prevScreen = InstabugUtils.getActiveRouteName(prevState);

  if (prevScreen !== currentScreen) {
    reportCurrentViewForAndroid(currentScreen);
    if (_currentScreen != null && _currentScreen !== firstScreen) {
      NativeInstabug.reportScreenChange(_currentScreen);
      _currentScreen = null;
    }
    _currentScreen = currentScreen;
    setTimeout(() => {
      if (currentScreen && _currentScreen === currentScreen) {
        NativeInstabug.reportScreenChange(currentScreen);
        _currentScreen = null;
      }
    }, 1000);
  }
};

export const onStateChange = (state?: NavigationStateV5) => {
  if (!state) {
    return;
  }

  const currentScreen = InstabugUtils.getFullRoute(state);
  reportCurrentViewForAndroid(currentScreen);
  if (_currentScreen !== null && _currentScreen !== firstScreen) {
    NativeInstabug.reportScreenChange(_currentScreen);
    _currentScreen = null;
  }

  _currentScreen = currentScreen;
  setTimeout(() => {
    if (_currentScreen === currentScreen) {
      NativeInstabug.reportScreenChange(currentScreen);
      _currentScreen = null;
    }
  }, 1000);
};

/**
 * Sets a listener for screen change
 *  @param navigationRef a refrence of a navigation container
 *
 */
export const setNavigationListener = (
  navigationRef: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>,
) => {
  return navigationRef.addListener('state', () => {
    onStateChange(navigationRef.getRootState());
  });
};

export const reportScreenChange = (screenName: string) => {
  NativeInstabug.reportScreenChange(screenName);
};

/**
 * Add experiments to next report.
 * @param experiments An array of experiments to add to the next report.
 *
 * @deprecated Please migrate to the new Feature Flags APIs: {@link addFeatureFlags}.
 */
export const addExperiments = (experiments: string[]) => {
  NativeInstabug.addExperiments(experiments);
};

/**
 * Remove experiments from next report.
 * @param experiments An array of experiments to remove from the next report.
 *
 * @deprecated Please migrate to the new Feature Flags APIs: {@link removeFeatureFlags}.
 */
export const removeExperiments = (experiments: string[]) => {
  NativeInstabug.removeExperiments(experiments);
};

/**
 * Clear all experiments
 *
 * @deprecated Please migrate to the new Feature Flags APIs: {@link removeAllFeatureFlags}.
 */
export const clearAllExperiments = () => {
  NativeInstabug.clearAllExperiments();
};

/**
 * Add feature flags to the next report.
 * @param featureFlags An array of feature flags to add to the next report.
 */
export const addFeatureFlags = (featureFlags: FeatureFlag[]) => {
  const entries = featureFlags.map((item) => [item.name, item.variant || '']);
  const flags = Object.fromEntries(entries);
  NativeInstabug.addFeatureFlags(flags);
};

/**
 * Add a feature flag to the to next report.
 */
export const addFeatureFlag = (featureFlag: FeatureFlag) => {
  addFeatureFlags([featureFlag]);
};

/**
 * Remove feature flags from the next report.
 * @param featureFlags An array of  feature flags to remove from the next report.
 */
export const removeFeatureFlags = (featureFlags: string[]) => {
  NativeInstabug.removeFeatureFlags(featureFlags);
};

/**
 * Remove a feature flag from the next report.
 * @param name the name of the feature flag to remove from the next report.
 */
export const removeFeatureFlag = (name: string) => {
  removeFeatureFlags([name]);
};

/**
 * Clear all feature flags
 */
export const removeAllFeatureFlags = () => {
  NativeInstabug.removeAllFeatureFlags();
};

/**
 * This API has to be call when using custom app rating prompt
 */
export const willRedirectToStore = () => {
  NativeInstabug.willRedirectToStore();
};

export const componentDidAppearListener = (event: ComponentDidAppearEvent) => {
  if (_isFirstScreen) {
    _lastScreen = event.componentName;
    _isFirstScreen = false;
    return;
  }
  if (_lastScreen !== event.componentName) {
    NativeInstabug.reportScreenChange(event.componentName);
    _lastScreen = event.componentName;
  }
};
