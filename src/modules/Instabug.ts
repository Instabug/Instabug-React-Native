import { AppState, type AppStateStatus, findNodeHandle, Platform } from 'react-native';

import type {
  NavigationContainerRefWithCurrent,
  NavigationState as NavigationStateV5,
} from '@react-navigation/native';
import type { ComponentDidAppearEvent } from 'react-native-navigation';
import type { NavigationAction, NavigationState as NavigationStateV4 } from 'react-navigation';

import type { InstabugConfig } from '../models/InstabugConfig';
import Report from '../models/Report';
import { emitter, NativeEvents, NativeInstabug } from '../native/NativeInstabug';
import { registerFeatureFlagsListener } from '../utils/FeatureFlags';
import {
  AutoMaskingType,
  ColorTheme,
  Locale,
  LogLevel,
  NetworkInterceptionMode,
  ReproStepsMode,
  StringKey,
  WelcomeMessageMode,
} from '../utils/Enums';
import InstabugUtils, {
  checkNetworkRequestHandlers,
  resetNativeObfuscationListener,
  setApmNetworkFlagsIfChanged,
  stringifyIfNotString,
} from '../utils/InstabugUtils';
import * as NetworkLogger from './NetworkLogger';
import { captureUnhandledRejections } from '../utils/UnhandledRejectionTracking';
import type { ReproConfig } from '../models/ReproConfig';
import type { FeatureFlag } from '../models/FeatureFlag';
import { addAppStateListener } from '../utils/AppStatesHandler';
import { NativeNetworkLogger } from '../native/NativeNetworkLogger';
import InstabugConstants from '../utils/InstabugConstants';
import { InstabugRNConfig } from '../utils/config';
import { Logger } from '../utils/logger';
import type { OverAirUpdate } from '../models/OverAirUpdate';
import type { ThemeConfig } from '../models/ThemeConfig';

let _currentScreen: string | null = null;
let _lastScreen: string | null = null;
let _isFirstScreen = false;
const firstScreen = 'Initial Screen';
let _currentAppState = AppState.currentState;
let isNativeInterceptionFeatureEnabled = false; // Checks the value of "cp_native_interception_enabled" backend flag.
let hasAPMNetworkPlugin = false; // Android only: checks if the APM plugin is installed.
let shouldEnableNativeInterception = false; // For Android: used to disable APM logging inside reportNetworkLog() -> NativeAPM.networkLogAndroid(), For iOS: used to control native interception (true == enabled , false == disabled)

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

/**
 * Initializes the SDK.
 * This is the main SDK method that does all the magic. This is the only
 * method that SHOULD be called.
 * Should be called in constructor of the AppRegistry component
 * @param config SDK configurations. See {@link InstabugConfig} for more info.
 */
export const init = (config: InstabugConfig) => {
  if (Platform.OS === 'android') {
    // Add android feature flags listener for android
    registerFeatureFlagsListener();
    addOnFeatureUpdatedListener(config);
  } else {
    isNativeInterceptionFeatureEnabled = NativeNetworkLogger.isNativeInterceptionEnabled();

    // Add app state listener to handle background/foreground transitions
    addAppStateListener(async (nextAppState) => handleAppStateChange(nextAppState, config));

    handleNetworkInterceptionMode(config);

    //Set APM networking flags for the first time
    setApmNetworkFlagsIfChanged({
      isNativeInterceptionFeatureEnabled: isNativeInterceptionFeatureEnabled,
      hasAPMNetworkPlugin: hasAPMNetworkPlugin,
      shouldEnableNativeInterception: shouldEnableNativeInterception,
    });
  }

  // call Instabug native init method
  initializeNativeInstabug(config);

  // Set up error capturing and rejection handling
  InstabugUtils.captureJsErrors();
  captureUnhandledRejections();

  _isFirstScreen = true;
  _currentScreen = firstScreen;

  InstabugRNConfig.debugLogsLevel = config.debugLogsLevel ?? LogLevel.error;

  reportCurrentViewForAndroid(firstScreen);
  setTimeout(() => {
    if (_currentScreen === firstScreen) {
      NativeInstabug.reportScreenChange(firstScreen);
      _currentScreen = null;
    }
  }, 1000);
};

/**
 * Set Current App Variant.
 * @param appVariant the current App variant name
 */
export const setAppVariant = (appVariant: string) => {
  NativeInstabug.setAppVariant(appVariant);
};

/**
 * Handles app state changes and updates APM network flags if necessary.
 */
const handleAppStateChange = async (nextAppState: AppStateStatus, config: InstabugConfig) => {
  // Checks if  the app has come to the foreground
  if (['inactive', 'background'].includes(_currentAppState) && nextAppState === 'active') {
    const isUpdated = await fetchApmNetworkFlags();
    if (isUpdated) {
      refreshAPMNetworkConfigs(config);
    }
  }

  _currentAppState = nextAppState;
};

/**
 * Fetches the current APM network flags.
 */
const fetchApmNetworkFlags = async () => {
  let isUpdated = false;
  const newNativeInterceptionFeatureEnabled = NativeNetworkLogger.isNativeInterceptionEnabled();
  if (isNativeInterceptionFeatureEnabled !== newNativeInterceptionFeatureEnabled) {
    isNativeInterceptionFeatureEnabled = newNativeInterceptionFeatureEnabled;
    isUpdated = true;
  }
  if (Platform.OS === 'android') {
    const newHasAPMNetworkPlugin = await NativeNetworkLogger.hasAPMNetworkPlugin();
    if (hasAPMNetworkPlugin !== newHasAPMNetworkPlugin) {
      hasAPMNetworkPlugin = newHasAPMNetworkPlugin;
      isUpdated = true;
    }
  }
  return isUpdated;
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
    //enable | disable native obfuscation and filtering synchronously
    NetworkLogger.setNativeInterceptionEnabled(shouldEnableNativeInterception);
  }

  if (config.networkInterceptionMode === NetworkInterceptionMode.javascript) {
    NetworkLogger.setEnabled(true);
  }
};

/**
 * Handles the network interception logic for Android if the user set
 * network interception mode with [NetworkInterceptionMode.javascript].
 */
function handleAndroidJSInterception() {
  if (isNativeInterceptionFeatureEnabled && hasAPMNetworkPlugin) {
    shouldEnableNativeInterception = true;
    Logger.warn(
      InstabugConstants.IBG_APM_TAG + InstabugConstants.SWITCHED_TO_NATIVE_INTERCEPTION_MESSAGE,
    );
  }
}

/**
 * Handles the network interception logic for Android if the user set
 * network interception mode with [NetworkInterceptionMode.native].
 */
function handleAndroidNativeInterception() {
  if (isNativeInterceptionFeatureEnabled) {
    shouldEnableNativeInterception = hasAPMNetworkPlugin;
    if (!hasAPMNetworkPlugin) {
      Logger.error(InstabugConstants.IBG_APM_TAG + InstabugConstants.PLUGIN_NOT_INSTALLED_MESSAGE);
    }
  } else {
    shouldEnableNativeInterception = false; // rollback to use JS interceptor for APM & Core.
    Logger.error(
      InstabugConstants.IBG_APM_TAG + InstabugConstants.NATIVE_INTERCEPTION_DISABLED_MESSAGE,
    );
  }
}

/**
 * Control either to enable or disable the native interception for iOS after the init method is called.
 */
function handleIOSNativeInterception(config: InstabugConfig) {
  if (
    shouldEnableNativeInterception &&
    config.networkInterceptionMode === NetworkInterceptionMode.native
  ) {
    NativeNetworkLogger.forceStartNetworkLoggingIOS(); // Enable native iOS automatic network logging.
  } else {
    NativeNetworkLogger.forceStopNetworkLoggingIOS(); // Disable native iOS automatic network logging.
  }
}

/**
 * Handles the network interception mode logic for Android.
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
      Logger.error(
        InstabugConstants.IBG_APM_TAG + InstabugConstants.NATIVE_INTERCEPTION_DISABLED_MESSAGE,
      );
    }
  }
};

/**
 * Initializes Instabug with the given configuration.
 */
const initializeNativeInstabug = (config: InstabugConfig) => {
  NativeInstabug.init(
    config.token,
    config.invocationEvents,
    config.debugLogsLevel ?? LogLevel.error,
    shouldEnableNativeInterception &&
      config.networkInterceptionMode === NetworkInterceptionMode.native,
    config.codePushVersion,
    config.appVariant,
    config.ignoreAndroidSecureFlag != null
      ? {
          ignoreAndroidSecureFlag: config.ignoreAndroidSecureFlag,
        }
      : undefined,
    config.overAirVersion,
  );
};

/**
 * Refresh the APM network configurations.
 */
function refreshAPMNetworkConfigs(config: InstabugConfig, forceRefreshIOS: boolean = true) {
  handleNetworkInterceptionMode(config);
  if (Platform.OS === 'ios' && forceRefreshIOS) {
    handleIOSNativeInterception(config);
  }
  setApmNetworkFlagsIfChanged({
    isNativeInterceptionFeatureEnabled,
    hasAPMNetworkPlugin,
    shouldEnableNativeInterception,
  });
  if (shouldEnableNativeInterception) {
    checkNetworkRequestHandlers();
  } else {
    // remove any attached [NativeNetworkLogger] Listeners if exists, to avoid memory leaks.
    resetNativeObfuscationListener();
  }
}

/**
 * Add Android Listener for native feature flags changes.
 */
function addOnFeatureUpdatedListener(config: InstabugConfig) {
  emitter.addListener(NativeEvents.IBG_ON_FEATURES_UPDATED_CALLBACK, (flags) => {
    const { cpNativeInterceptionEnabled, hasAPMPlugin } = flags;
    isNativeInterceptionFeatureEnabled = cpNativeInterceptionEnabled;
    hasAPMNetworkPlugin = hasAPMPlugin;
    shouldEnableNativeInterception =
      config.networkInterceptionMode === NetworkInterceptionMode.native;
    refreshAPMNetworkConfigs(config);
  });
  NativeInstabug.setOnFeaturesUpdatedListener();
}

/**
 * Sets the Code Push version to be sent with each report.
 * @param version the Code Push version.
 *
 * @deprecated Use {@link setOverAirVersion} instead.
 */
export const setCodePushVersion = (version: string) => {
  NativeInstabug.setCodePushVersion(version);
};

/**
 * Sets over air update version to be sent with each report.
 * @param version the OTA version.
 *
 */
export const setOverAirVersion = (OTAserviceVersion: OverAirUpdate) => {
  NativeInstabug.setOverAirVersion(OTAserviceVersion);
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
 * @deprecated Please migrate to the new UI customization API: {@link setTheme}
 */
export const setPrimaryColor = (color: string) => {
  NativeInstabug.setTheme({ primaryColor: color });
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
    Logger.error(InstabugConstants.SET_USER_ATTRIBUTES_ERROR_TYPE_MESSAGE);
    return;
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
    Logger.error(InstabugConstants.REMOVE_USER_ATTRIBUTES_ERROR_TYPE_MESSAGE);

    return;
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

/**
 * This API has be called when changing the default Metro server port (8081) to exclude the DEV URL from network logging.
 */
export const setMetroDevServerPort = (port: number) => {
  InstabugRNConfig.metroDevServerPort = port.toString();
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

/**
 * Sets listener to feature flag changes
 * @param handler A callback that gets the update value of the flag
 */
export const _registerFeatureFlagsChangeListener = (
  handler: (payload: {
    isW3ExternalTraceIDEnabled: boolean;
    isW3ExternalGeneratedHeaderEnabled: boolean;
    isW3CaughtHeaderEnabled: boolean;
    networkBodyLimit: number;
  }) => void,
) => {
  emitter.addListener(NativeEvents.ON_FEATURE_FLAGS_CHANGE, (payload) => {
    handler(payload);
  });
  NativeInstabug.registerFeatureFlagsChangeListener();
};

/**
 * Sets the auto mask screenshots types.
 * @param autoMaskingTypes The masking type to be applied.
 */
export const enableAutoMasking = (autoMaskingTypes: AutoMaskingType[]) => {
  NativeInstabug.enableAutoMasking(autoMaskingTypes);
};

/**
 * Sets a custom theme for Instabug UI elements.
 *
 * This method provides comprehensive theming support. It will automatically use IBGTheme
 * if available in the SDK version, otherwise falls back to individual theming methods.
 *
 * @param theme - Configuration object containing theme properties
 *
 * @example
 * ```typescript
 * // Basic usage with primary color (always supported)
 * Instabug.setTheme({
 *   primaryColor: '#FF6B6B'
 * });
 *
 * // Comprehensive theming (uses IBGTheme when available)
 * Instabug.setTheme({
 *   primaryColor: '#FF6B6B',
 *   secondaryTextColor: '#666666',
 *   primaryTextColor: '#333333',
 *   titleTextColor: '#000000',
 *   backgroundColor: '#FFFFFF',
 *   primaryTextStyle: 'bold',
 *   secondaryTextStyle: 'normal',
 *   titleTextStyle: 'bold',
 *   ctaTextStyle: 'bold',
 *   primaryFontPath: '/data/user/0/com.yourapp/files/fonts/YourFont.ttf',
 *   secondaryFontPath: '/data/user/0/com.yourapp/files/fonts/YourFont.ttf',
 *   ctaTextType: '/data/user/0/com.yourapp/files/fonts/YourFont.ttf',
 *   primaryFontAsset: 'fonts/YourFont.ttf',
 *   secondaryFontAsset: 'fonts/YourFont.ttf'
 * });
 * ```
 */
export const setTheme = (theme: ThemeConfig) => {
  NativeInstabug.setTheme(theme);
};
/**
 * Enables or disables displaying in full-screen mode, hiding the status and navigation bars.
 * @param isEnabled A boolean to enable/disable setFullscreen.
 */
export const setFullscreen = (isEnabled: boolean) => {
  if (Platform.OS === 'android') {
    NativeInstabug.setFullscreen(isEnabled);
  }
};
