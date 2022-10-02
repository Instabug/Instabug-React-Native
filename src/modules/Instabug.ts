import { findNodeHandle, Platform, processColor } from 'react-native';
import { NativeInstabug } from '../native';
import Report, { UserAttributesMap } from '../models/Report';
import { ArgsRegistry } from '../utils/ArgsRegistry';
import IBGEventEmitter from '../utils/IBGEventEmitter';
import InstabugConstants from '../utils/InstabugConstants';
import InstabugUtils, { stringifyIfNotString } from '../utils/InstabugUtils';
import { NetworkLogger } from './NetworkLogger';
import type React from 'react';

export namespace Instabug {
  var _currentScreen: string | null = null;
  var _lastScreen: string | null = null;
  var _isFirstScreen = false;
  const firstScreen = 'Initial Screen';

  export import invocationEvent = ArgsRegistry.invocationEvent;
  export import reproStepsMode = ArgsRegistry.reproStepsMode;
  export import dismissType = ArgsRegistry.dismissType;
  export import sdkDebugLogsLevel = ArgsRegistry.sdkDebugLogsLevel;
  export import extendedBugReportMode = ArgsRegistry.extendedBugReportMode;
  export import locale = ArgsRegistry.locale;
  export import colorTheme = ArgsRegistry.colorTheme;
  export import floatingButtonEdge = ArgsRegistry.floatingButtonEdge;
  export import IBGPosition = ArgsRegistry.position;
  export import welcomeMessageMode = ArgsRegistry.welcomeMessageMode;
  export import actionTypes = ArgsRegistry.actionTypes;
  export import strings = ArgsRegistry.strings;

  /**
   * Starts the SDK.
   * This is the main SDK method that does all the magic. This is the only
   * method that SHOULD be called.
   * Should be called in constructor of the AppRegistry component
   * @param token The token that identifies the app, you can find it on your dashboard.
   * @param invocationEvent The event that invokes the SDK's UI.
   */
  export const start = (token: string, invocationEvents: Instabug.invocationEvent[]) => {
    InstabugUtils.captureJsErrors();
    NetworkLogger.setEnabled(true);

    NativeInstabug.start(token, invocationEvents);

    _isFirstScreen = true;
    _currentScreen = firstScreen;

    setTimeout(() => {
      if (_currentScreen == firstScreen) {
        NativeInstabug.reportScreenChange(firstScreen);
        _currentScreen = null;
      }
    }, 1000);
  };

  /**
   * Attaches user data to each report being sent.
   * Each call to this method overrides the user data to be attached.
   * Maximum size of the string is 1,000 characters.
   * @param userData A string to be attached to each report, with a
   * maximum size of 1,000 characters.
   */
  export const setUserData = (userData: string) => {
    NativeInstabug.setUserData(userData);
  };

  /**
   * Sets whether the SDK is tracking user steps or not.
   * Enabling user steps would give you an insight on the scenario a user has
   * performed before encountering a bug or a crash. User steps are attached
   * with each report being sent.
   * @param isUserStepsEnabled A boolean to set user steps tracking
   * to being enabled or disabled.
   */
  export const setTrackUserSteps = (isEnabled: boolean) => {
    if (Platform.OS === 'ios') NativeInstabug.setTrackUserSteps(isEnabled);
  };

  /**
   * Sets whether IBGLog should also print to Xcode's console log or not.
   * @param printsToConsole A boolean to set whether printing to
   *                  Xcode's console is enabled or not.
   */
  export const setIBGLogPrintsToConsole = (printsToConsole: boolean) => {
    if (Platform.OS === 'ios') NativeInstabug.setIBGLogPrintsToConsole(printsToConsole);
  };

  /**
   * The session profiler is enabled by default and it attaches to the bug and
   * crash reports the following information during the last 60 seconds before the report is sent.
   * @param sessionProfilerEnabled A boolean parameter to enable or disable the feature.
   */
  export const setSessionProfilerEnabled = (sessionProfilerEnabled: boolean) => {
    NativeInstabug.setSessionProfilerEnabled(sessionProfilerEnabled);
  };

  /**
   * This API sets the verbosity level of logs used to debug The SDK. The default value in debug
   * mode is sdkDebugLogsLevelVerbose and in production is sdkDebugLogsLevelError.
   * @param sdkDebugLogsLevel - The verbosity level of logs.
   */
  export const setSdkDebugLogsLevel = (sdkDebugLogsLevel: Instabug.sdkDebugLogsLevel) => {
    if (Platform.OS === 'ios') {
      NativeInstabug.setSdkDebugLogsLevel(sdkDebugLogsLevel);
    }
  };

  /**
   * Sets the SDK's locale.
   * Use to change the SDK's UI to different language.
   * Defaults to the device's current locale.
   * @param locale A locale to set the SDK to.
   */
  export const setLocale = (locale: Instabug.locale) => {
    NativeInstabug.setLocale(locale);
  };

  /**
   * Sets the color theme of the SDK's whole UI.
   * the SDK's UI to.
   * @param colorTheme
   */
  export const setColorTheme = (colorTheme: Instabug.colorTheme) => {
    NativeInstabug.setColorTheme(colorTheme);
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
   * @param callback callback with argument tags of reported feedback, bug or crash.
   */
  export const getTags = (callback: (tags: string[]) => void) => {
    NativeInstabug.getTags(callback);
  };

  /**
   * Overrides any of the strings shown in the SDK with custom ones.
   * Allows you to customize any of the strings shown to users in the SDK.
   * @param string String value to override the default one.
   * @param key Key of string to override.
   */
  export const setString = (key: Instabug.strings, string: string) => {
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
   * Appends a log message to Instabug internal log
   * <p>
   * These logs are then sent along the next uploaded report.
   * All log messages are timestamped <br/>
   * Logs aren't cleared per single application run.
   * If you wish to reset the logs,
   * use {@link #clearLogs()} ()}
   * </p>
   * Note: logs passed to this method are <b>NOT</b> printed to Logcat
   *
   * @param message the message
   */
  export const logVerbose = (message: string) => {
    if (!message) return;
    message = stringifyIfNotString(message);
    NativeInstabug.logVerbose(message);
  };

  /**
   * Appends a log message to Instabug internal log
   * <p>
   * These logs are then sent along the next uploaded report.
   * All log messages are timestamped <br/>
   * Logs aren't cleared per single application run.
   * If you wish to reset the logs,
   * use {@link #clearLogs()} ()}
   * </p>
   * Note: logs passed to this method are <b>NOT</b> printed to Logcat
   * @param message the message
   */
  export const logInfo = (message: string) => {
    if (!message) return;
    message = stringifyIfNotString(message);
    NativeInstabug.logInfo(message);
  };

  /**
   * Appends a log message to Instabug internal log
   * <p>
   * These logs are then sent along the next uploaded report.
   * All log messages are timestamped <br/>
   * Logs aren't cleared per single application run.
   * If you wish to reset the logs,
   * use {@link #clearLogs()} ()}
   * </p>
   * Note: logs passed to this method are <b>NOT</b> printed to Logcat
   *
   * @param message the message
   */
  export const logDebug = (message: string) => {
    if (!message) return;
    message = stringifyIfNotString(message);
    NativeInstabug.logDebug(message);
  };

  /**
   * Appends a log message to Instabug internal log
   * <p>
   * These logs are then sent along the next uploaded report.
   * All log messages are timestamped <br/>
   * Logs aren't cleared per single application run.
   * If you wish to reset the logs,
   * use {@link #clearLogs()} ()}
   * </p>
   * Note: logs passed to this method are <b>NOT</b> printed to Logcat
   *
   * @param message the message
   */
  export const logError = (message: string) => {
    if (!message) return;
    message = stringifyIfNotString(message);
    NativeInstabug.logError(message);
  };

  /**
   * Appends a log message to Instabug internal log
   * <p>
   * These logs are then sent along the next uploaded report.
   * All log messages are timestamped <br/>
   * Logs aren't cleared per single application run.
   * If you wish to reset the logs,
   * use {@link #clearLogs()} ()}
   * </p>
   * Note: logs passed to this method are <b>NOT</b> printed to Logcat
   *
   * @param message the message
   */
  export const logWarn = (message: string) => {
    if (!message) return;
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
   * Sets whether user steps tracking is visual, non visual or disabled.
   * User Steps tracking is enabled by default if it's available
   * in your current plan.
   *
   * @param reproStepsMode An enum to set user steps tracking
   * to be enabled, non visual or disabled.
   */
  export const setReproStepsMode = (reproStepsMode: Instabug.reproStepsMode) => {
    NativeInstabug.setReproStepsMode(reproStepsMode);
  };

  /**
   * Sets user attribute to overwrite it's value or create a new one if it doesn't exist.
   *
   * @param key   the attribute
   * @param value the value
   */
  export const setUserAttribute = (key: string, value: string) => {
    if (!key || typeof key !== 'string' || typeof value !== 'string')
      throw new TypeError('Invalid param, Expected String');
    NativeInstabug.setUserAttribute(key, value);
  };

  /**
   * Returns the user attribute associated with a given key.
   * @param key The attribute key as string
   * @param userAttributeCallback callback with argument as the desired user attribute value
   */
  export const getUserAttribute = (
    key: string,
    userAttributeCallback: (attribute: string) => void,
  ) => {
    NativeInstabug.getUserAttribute(key, userAttributeCallback);
  };

  /**
   * Removes user attribute if exists.
   *
   * @param key the attribute key as string
   * @see #setUserAttribute(String, String)
   */
  export const removeUserAttribute = (key: string) => {
    if (!key || typeof key !== 'string') throw new TypeError('Invalid param, Expected String');
    NativeInstabug.removeUserAttribute(key);
  };

  /**
   * @summary Returns all user attributes.
   * @param userAttributesCallback callback with argument A new dictionary containing
   * all the currently set user attributes, or an empty dictionary if no user attributes have been set.
   */
  export const getAllUserAttributes = (
    userAttributesCallback: (attributes: UserAttributesMap) => void,
  ) => {
    NativeInstabug.getAllUserAttributes(userAttributesCallback);
  };

  /**
   * Clears all user attributes if exists.
   */
  export const clearAllUserAttributes = () => {
    NativeInstabug.clearAllUserAttributes();
  };

  /**
   * Enable/Disable debug logs from Instabug SDK
   * Default state: disabled
   *
   * @param isDebugEnabled whether debug logs should be printed or not into LogCat
   */
  export const setDebugEnabled = (isDebugEnabled: boolean) => {
    if (Platform.OS === 'android') {
      NativeInstabug.setDebugEnabled(isDebugEnabled);
    }
  };

  /**
   * Enables all Instabug functionality
   * It works on android only
   */
  export const enable = () => {
    if (Platform.OS === 'android') {
      NativeInstabug.enable();
    }
  };

  /**
   * Disables all Instabug functionality
   * It works on android only
   */
  export const disable = () => {
    if (Platform.OS === 'android') {
      NativeInstabug.disable();
    }
  };

  /**
   * @summary Checks whether app is development/Beta testing OR live
   * Note: This API is iOS only
   * It returns in the callback false if in development or beta testing on Test Flight, and
   * true if app is live on the app store.
   * @param runningLiveCallBack callback with argument as return value 'isLive'
   */
  export const isRunningLive = (runningLiveCallBack: (isLive: boolean) => void) => {
    if (Platform.OS === 'ios') {
      NativeInstabug.isRunningLive(runningLiveCallBack);
    }
  };

  /**
   * Shows the welcome message in a specific mode.
   * @param welcomeMessageMode An enum to set the welcome message mode to live, or beta.
   */
  export const showWelcomeMessage = (welcomeMessageMode: Instabug.welcomeMessageMode) => {
    NativeInstabug.showWelcomeMessageWithMode(welcomeMessageMode);
  };

  /**
   * Sets the welcome message mode to live, beta or disabled.
   * @param welcomeMessageMode An enum to set the welcome message mode to live, beta or disabled.
   */
  export const setWelcomeMessageMode = (welcomeMessageMode: Instabug.welcomeMessageMode) => {
    NativeInstabug.setWelcomeMessageMode(welcomeMessageMode);
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
   * @deprecated Use {@link Instabug.addPrivateView} instead. 
   * 
   * Hides component from screenshots, screen recordings and view hierarchy.
   * @param viewRef the ref of the component to hide
   */
  export const setPrivateView = (viewRef: number | React.Component | React.ComponentClass) => {
    addPrivateView(viewRef);
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

  export const onReportSubmitHandler = (preSendingHandler: (report: Report) => void) => {
    InstabugUtils.setOnReportHandler(true);

    // send bug report
    IBGEventEmitter.addListener(NativeInstabug, InstabugConstants.PRESENDING_HANDLER, report => {
      const { tags, consoleLogs, instabugLogs, userAttributes, fileAttachments } = report;
      const reportObj = new Report(tags, consoleLogs, instabugLogs, userAttributes, fileAttachments);
      preSendingHandler(reportObj);

    });

    // handled js crash
    if (Platform.OS === 'android') {
      IBGEventEmitter.addListener(
        NativeInstabug,
        InstabugConstants.SEND_HANDLED_CRASH,
        async jsonObject => {
          try {
            let report = await NativeInstabug.getReport();
            const { tags, consoleLogs, instabugLogs, userAttributes, fileAttachments } = report;
            const reportObj = new Report(
              tags,
              consoleLogs,
              instabugLogs,
              userAttributes,
              fileAttachments,
            );
            preSendingHandler(reportObj);
            NativeInstabug.sendHandledJSCrash(JSON.stringify(jsonObject));
          } catch (e) {
            console.error(e);
          }
        },
      );
    }

    if (Platform.OS === 'android') {
      IBGEventEmitter.addListener(
        NativeInstabug,
        InstabugConstants.SEND_UNHANDLED_CRASH,
        async jsonObject => {
          let report = await NativeInstabug.getReport();
          const { tags, consoleLogs, instabugLogs, userAttributes, fileAttachments } = report;
          const reportObj = new Report(tags, consoleLogs, instabugLogs, userAttributes, fileAttachments);
          preSendingHandler(reportObj);
          NativeInstabug.sendJSCrash(JSON.stringify(jsonObject));
        },
      );
    }

    NativeInstabug.setPreSendingHandler(preSendingHandler);
  };

  export const callPrivateApi = (apiName: string, param: any[]) => {
    NativeInstabug.callPrivateApi(apiName, param);
  };

  export const onNavigationStateChange = (prevState: any, currentState: any, action?: any) => {
    const currentScreen = InstabugUtils.getActiveRouteName(currentState);
    const prevScreen = InstabugUtils.getActiveRouteName(prevState);

    if (prevScreen !== currentScreen) {
      if (_currentScreen != null && _currentScreen != firstScreen) {
        NativeInstabug.reportScreenChange(_currentScreen);
        _currentScreen = null;
      }
      _currentScreen = currentScreen;
      setTimeout(() => {
        if (_currentScreen == currentScreen) {
          NativeInstabug.reportScreenChange(currentScreen);
          _currentScreen = null;
        }
      }, 1000);
    }
  };

  export const onStateChange = (state: any) => {
    const currentScreen = InstabugUtils.getFullRoute(state);
    if (_currentScreen != null && _currentScreen != firstScreen) {
      NativeInstabug.reportScreenChange(_currentScreen);
      _currentScreen = null;
    }
    _currentScreen = currentScreen;
    setTimeout(() => {
      if (_currentScreen == currentScreen) {
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

  export const componentDidAppearListener = ({ componentId, componentName, passProps }) => {
    if (_isFirstScreen) {
      _lastScreen = componentName;
      _isFirstScreen = false;
      return;
    }
    if (_lastScreen != componentName) {
      NativeInstabug.reportScreenChange(componentName);
      _lastScreen = componentName;
    }
  };
}
