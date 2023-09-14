import type React from 'react';
import { Platform, findNodeHandle, processColor } from 'react-native';

import type { NavigationState as NavigationStateV5 } from '@react-navigation/native';
import type { ComponentDidAppearEvent } from 'react-native-navigation';
import type { NavigationAction, NavigationState as NavigationStateV4 } from 'react-navigation';

import type { InstabugConfig } from '../models/InstabugConfig';
import Report from '../models/Report';
import { NativeEvents, NativeInstabug, emitter } from '../native/NativeInstabug';
import {
  ColorTheme,
  Locale,
  LogLevel,
  ReproStepsMode,
  StringKey,
  WelcomeMessageMode,
} from '../utils/Enums';
import InstabugUtils, {
  invokeDeprecatedCallback,
  stringifyIfNotString,
} from '../utils/InstabugUtils';
import * as NetworkLogger from './NetworkLogger';
import { captureUnhandledRejections } from '../utils/UnhandledRejectionTracking';
import type { ReproConfig } from '../models/ReproConfig';

let _currentScreen: string | null = null;
let _lastScreen: string | null = null;
let _isFirstScreen = false;
const firstScreen = 'Initial Screen';

/**
 * Enables or disables Instabug functionality.
 * @param isEnabled A boolean to enable/disable Instabug.
 */
export const setEnabled = (isEnabled: boolean) => {
  NativeInstabug.setEnabled(isEnabled);
};

/**
 * Initializes the SDK.
 * This is the main SDK method that does all the magic. This is the only
 * method that SHOULD be called.
 * Should be called in constructor of the AppRegistry component
 * @param config SDK configurations. See {@link InstabugConfig} for more info.
 */
export const init = (config: InstabugConfig) => {
  InstabugUtils.captureJsErrors();
  captureUnhandledRejections();
  NetworkLogger.setEnabled(true);

  NativeInstabug.init(
    config.token,
    config.invocationEvents,
    config.debugLogsLevel ?? LogLevel.error,
  );

  _isFirstScreen = true;
  _currentScreen = firstScreen;

  setTimeout(() => {
    if (_currentScreen === firstScreen) {
      NativeInstabug.reportScreenChange(firstScreen);
      _currentScreen = null;
    }
  }, 1000);
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
 * @param callback DEPRECATED: callback with argument tags of reported feedback, bug or crash.
 */
export const getTags = async (callback?: (tags: string[]) => void): Promise<string[] | null> => {
  const tags = await NativeInstabug.getTags();

  invokeDeprecatedCallback(callback, tags);

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
 * Sets the default value of the user's email and hides the email field from the reporting UI
 * and set the user's name to be included with all reports.
 * It also reset the chats on device to that email and removes user attributes,
 * user data and completed surveys.
 * @param email Email address to be set as the user's email.
 * @param name Name of the user to be set.
 */
export const identifyUser = (email: string, name: string) => {
  NativeInstabug.identifyUser(email, name);
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
 * @deprecated Use {@link setReproStepsConfig} instead.
 *
 * Sets whether user steps tracking is visual, non visual or disabled.
 * User Steps tracking is enabled by default if it's available
 * in your current plan.
 *
 * @param mode An enum to set user steps tracking to be enabled, non visual or disabled.
 */
export const setReproStepsMode = (mode: ReproStepsMode) => {
  NativeInstabug.setReproStepsMode(mode);
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
 * });
 * ```
 */
export const setReproStepsConfig = (config: ReproConfig) => {
  let bug = config.bug ?? ReproStepsMode.enabled;
  let crash = config.crash ?? ReproStepsMode.enabledWithNoScreenshots;

  if (config.all != null) {
    bug = config.all;
    crash = config.all;
  }

  // There's an issue with crashes repro steps with screenshots in the iOS SDK
  // at the moment, so we'll map enabled with screenshots to enabled with no
  // screenshots to avoid storing the images on disk if it's not needed until
  // this issue is fixed in a future version.
  if (Platform.OS === 'ios' && crash === ReproStepsMode.enabled) {
    /* istanbul ignore next */
    crash = ReproStepsMode.enabledWithNoScreenshots;
  }

  NativeInstabug.setReproStepsConfig(bug, crash);
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
 * @param callback DEPRECATED: callback with argument as the desired user attribute value
 */
export const getUserAttribute = async (
  key: string,
  callback?: (attribute: string) => void,
): Promise<string | null> => {
  const attribute = await NativeInstabug.getUserAttribute(key);

  invokeDeprecatedCallback(callback, attribute);

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
 * @param callback DEPRECATED: callback with argument A new dictionary containing all the currently
 * set user attributes, or an empty dictionary if no user attributes have been set.
 */
export const getAllUserAttributes = async (
  callback?: (attributes: Record<string, string>) => void,
): Promise<Record<string, string>> => {
  const attributes = await NativeInstabug.getAllUserAttributes();

  invokeDeprecatedCallback(callback, attributes);

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

export const reportScreenChange = (screenName: string) => {
  NativeInstabug.reportScreenChange(screenName);
};

/**
 * Add experiments to next report.
 * @param experiments An array of experiments to add to the next report.
 */
export const addExperiments = (experiments: string[]) => {
  NativeInstabug.addExperiments(experiments);
};

/**
 * Remove experiments from next report.
 * @param experiments An array of experiments to remove from the next report.
 */
export const removeExperiments = (experiments: string[]) => {
  NativeInstabug.removeExperiments(experiments);
};

/**
 * Clear all experiments
 */
export const clearAllExperiments = () => {
  NativeInstabug.clearAllExperiments();
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
