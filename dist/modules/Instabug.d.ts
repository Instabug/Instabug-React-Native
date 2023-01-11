import type React from 'react';
import type { NavigationState as NavigationStateV5 } from '@react-navigation/native';
import type { ComponentDidAppearEvent } from 'react-native-navigation';
import type { NavigationAction, NavigationState as NavigationStateV4 } from 'react-navigation';
import type { InstabugConfig } from '../models/InstabugConfig';
import Report from '../models/Report';
import { IBGPosition, actionTypes, colorTheme, dismissType, extendedBugReportMode, floatingButtonEdge, invocationEvent, locale, reproStepsMode, sdkDebugLogsLevel, strings, welcomeMessageMode } from '../utils/ArgsRegistry';
export { invocationEvent, reproStepsMode, dismissType, sdkDebugLogsLevel, extendedBugReportMode, locale, colorTheme, floatingButtonEdge, IBGPosition, welcomeMessageMode, actionTypes, strings, };
/**
 * Enables or disables Instabug functionality.
 * @param isEnabled A boolean to enable/disable Instabug.
 */
export declare const setEnabled: (isEnabled: boolean) => void;
/**
 * @deprecated Use {@link init} instead.
 * Starts the SDK.
 * This is the main SDK method that does all the magic. This is the only
 * method that SHOULD be called.
 * Should be called in constructor of the AppRegistry component
 * @param token The token that identifies the app, you can find it on your dashboard.
 * @param invocationEvents The events that invokes the SDK's UI.
 */
export declare const start: (token: string, invocationEvents: invocationEvent[]) => void;
/**
 * Initializes the SDK.
 * This is the main SDK method that does all the magic. This is the only
 * method that SHOULD be called.
 * Should be called in constructor of the AppRegistry component
 * @param config SDK configurations. See {@link InstabugConfig} for more info.
 */
export declare const init: (config: InstabugConfig) => void;
/**
 * Attaches user data to each report being sent.
 * Each call to this method overrides the user data to be attached.
 * Maximum size of the string is 1,000 characters.
 * @param data A string to be attached to each report, with a maximum size of 1,000 characters.
 */
export declare const setUserData: (data: string) => void;
/**
 * Sets whether the SDK is tracking user steps or not.
 * Enabling user steps would give you an insight on the scenario a user has
 * performed before encountering a bug or a crash. User steps are attached
 * with each report being sent.
 * @param isEnabled A boolean to set user steps tracking to being enabled or disabled.
 */
export declare const setTrackUserSteps: (isEnabled: boolean) => void;
/**
 * Sets whether IBGLog should also print to Xcode's console log or not.
 * @param printsToConsole A boolean to set whether printing to
 * Xcode's console is enabled or not.
 */
export declare const setIBGLogPrintsToConsole: (printsToConsole: boolean) => void;
/**
 * The session profiler is enabled by default and it attaches to the bug and
 * crash reports the following information during the last 60 seconds before the report is sent.
 * @param isEnabled A boolean parameter to enable or disable the feature.
 */
export declare const setSessionProfilerEnabled: (isEnabled: boolean) => void;
/**
 * @deprecated Pass a {@link LogLevel} to debugLogsLevel in {@link init} instead. This will work on both Android and iOS.
 *
 * This API sets the verbosity level of logs used to debug The SDK. The default value in debug
 * mode is sdkDebugLogsLevelVerbose and in production is sdkDebugLogsLevelError.
 * @param level The verbosity level of logs.
 */
export declare const setSdkDebugLogsLevel: (level: sdkDebugLogsLevel) => void;
/**
 * Sets the SDK's locale.
 * Use to change the SDK's UI to different language.
 * Defaults to the device's current locale.
 * @param sdkLocale A locale to set the SDK to.
 */
export declare const setLocale: (sdkLocale: locale) => void;
/**
 * Sets the color theme of the SDK's whole UI.
 * @param sdkTheme
 */
export declare const setColorTheme: (sdkTheme: colorTheme) => void;
/**
 * Sets the primary color of the SDK's UI.
 * Sets the color of UI elements indicating interactivity or call to action.
 * To use, import processColor and pass to it with argument the color hex
 * as argument.
 * @param color A color to set the UI elements of the SDK to.
 */
export declare const setPrimaryColor: (color: string) => void;
/**
 * Appends a set of tags to previously added tags of reported feedback,
 * bug or crash.
 * @param tags An array of tags to append to current tags.
 */
export declare const appendTags: (tags: string[]) => void;
/**
 * Manually removes all tags of reported feedback, bug or crash.
 */
export declare const resetTags: () => void;
/**
 * Gets all tags of reported feedback, bug or crash.
 * @param callback callback with argument tags of reported feedback, bug or crash.
 */
export declare const getTags: (callback: (tags: string[]) => void) => void;
/**
 * Overrides any of the strings shown in the SDK with custom ones.
 * Allows you to customize any of the strings shown to users in the SDK.
 * @param key Key of string to override.
 * @param string String value to override the default one.
 */
export declare const setString: (key: strings, string: string) => void;
/**
 * Sets the default value of the user's email and hides the email field from the reporting UI
 * and set the user's name to be included with all reports.
 * It also reset the chats on device to that email and removes user attributes,
 * user data and completed surveys.
 * @param email Email address to be set as the user's email.
 * @param name Name of the user to be set.
 */
export declare const identifyUser: (email: string, name: string) => void;
/**
 * Sets the default value of the user's email to nil and show email field and remove user name
 * from all reports
 * It also reset the chats on device and removes user attributes, user data and completed surveys.
 */
export declare const logOut: () => void;
/**
 * Logs a user event that happens through the lifecycle of the application.
 * Logged user events are going to be sent with each report, as well as at the end of a session.
 * @param name Event name.
 */
export declare const logUserEvent: (name: string) => void;
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
export declare const logVerbose: (message: string) => void;
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
export declare const logInfo: (message: string) => void;
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
export declare const logDebug: (message: string) => void;
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
export declare const logError: (message: string) => void;
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
export declare const logWarn: (message: string) => void;
/**
 * Clear all Instabug logs, console logs, network logs and user steps.
 */
export declare const clearLogs: () => void;
/**
 * Sets whether user steps tracking is visual, non visual or disabled.
 * User Steps tracking is enabled by default if it's available
 * in your current plan.
 *
 * @param mode An enum to set user steps tracking to be enabled, non visual or disabled.
 */
export declare const setReproStepsMode: (mode: reproStepsMode) => void;
/**
 * Sets user attribute to overwrite it's value or create a new one if it doesn't exist.
 *
 * @param key the attribute
 * @param value the value
 */
export declare const setUserAttribute: (key: string, value: string) => void;
/**
 * Returns the user attribute associated with a given key.
 * @param key The attribute key as string
 * @param callback callback with argument as the desired user attribute value
 */
export declare const getUserAttribute: (key: string, callback: (attribute: string) => void) => void;
/**
 * Removes user attribute if exists.
 *
 * @param key the attribute key as string
 * @see {@link setUserAttribute}
 */
export declare const removeUserAttribute: (key: string) => void;
/**
 * Returns all user attributes.
 * @param callback callback with argument A new dictionary containing all the currently
 * set user attributes, or an empty dictionary if no user attributes have been set.
 */
export declare const getAllUserAttributes: (callback: (attributes: Record<string, string>) => void) => void;
/**
 * Clears all user attributes if exists.
 */
export declare const clearAllUserAttributes: () => void;
/**
 * @deprecated Pass a {@link LogLevel} to debugLogsLevel in {@link init} instead. This will work on both Android and iOS.
 *
 * Enable/Disable debug logs from Instabug SDK
 * Default state: disabled
 *
 * @param isEnabled whether debug logs should be printed or not into LogCat
 */
export declare const setDebugEnabled: (isEnabled: boolean) => void;
/**
 * @deprecated Use {@link setEnabled} instead. This will work on both Android and iOS.
 *
 * Enables all Instabug functionality
 * It works on android only
 */
export declare const enable: () => void;
/**
 * @deprecated Use {@link setEnabled} instead. This will work on both Android and iOS.
 *
 * Disables all Instabug functionality
 * It works on android only
 */
export declare const disable: () => void;
/**
 * Checks whether app is development/Beta testing OR live
 * Note: This API is iOS only
 * It returns in the callback false if in development or beta testing on Test Flight, and
 * true if app is live on the app store.
 * @param callback callback with argument as return value 'isLive'
 */
export declare const isRunningLive: (callback: (isLive: boolean) => void) => void;
/**
 * Shows the welcome message in a specific mode.
 * @param mode An enum to set the welcome message mode to live, or beta.
 */
export declare const showWelcomeMessage: (mode: welcomeMessageMode) => void;
/**
 * Sets the welcome message mode to live, beta or disabled.
 * @param mode An enum to set the welcome message mode to live, beta or disabled.
 */
export declare const setWelcomeMessageMode: (mode: welcomeMessageMode) => void;
/**
 * Add file to be attached to the bug report.
 * @param filePath
 * @param fileName
 */
export declare const addFileAttachment: (filePath: string, fileName: string) => void;
/**
 * @deprecated Use {@link addPrivateView} instead.
 *
 * Hides component from screenshots, screen recordings and view hierarchy.
 * @param viewRef the ref of the component to hide
 */
export declare const setPrivateView: (viewRef: number | React.Component | React.ComponentClass) => void;
/**
 * Hides component from screenshots, screen recordings and view hierarchy.
 * @param viewRef the ref of the component to hide
 */
export declare const addPrivateView: (viewRef: number | React.Component | React.ComponentClass) => void;
/**
 * Removes component from the set of hidden views. The component will show again in
 * screenshots, screen recordings and view hierarchy.
 * @param viewRef the ref of the component to remove from hidden views
 */
export declare const removePrivateView: (viewRef: number | React.Component | React.ComponentClass) => void;
/**
 * Shows default Instabug prompt.
 */
export declare const show: () => void;
export declare const onReportSubmitHandler: (handler?: ((report: Report) => void) | undefined) => void;
/**
 * @deprecated Legacy API that will be removed in future releases.
 */
export declare const callPrivateApi: (apiName: string, param: any[]) => void;
export declare const onNavigationStateChange: (prevState: NavigationStateV4, currentState: NavigationStateV4, _action: NavigationAction) => void;
export declare const onStateChange: (state?: NavigationStateV5) => void;
export declare const reportScreenChange: (screenName: string) => void;
/**
 * Add experiments to next report.
 * @param experiments An array of experiments to add to the next report.
 */
export declare const addExperiments: (experiments: string[]) => void;
/**
 * Remove experiments from next report.
 * @param experiments An array of experiments to remove from the next report.
 */
export declare const removeExperiments: (experiments: string[]) => void;
/**
 * Clear all experiments
 */
export declare const clearAllExperiments: () => void;
export declare const componentDidAppearListener: (event: ComponentDidAppearEvent) => void;
