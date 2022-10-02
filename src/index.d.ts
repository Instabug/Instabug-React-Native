// Type definitions for instabug-reactnative 8.0
// Project: https://github.com/Instabug/instabug-reactnative#readme
// Definitions by: Aly Ezz <https://github.com/alyezz>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
export namespace CrashReporting {
  /**
   * Enables and disables everything related to crash reporting including intercepting
   * errors in the global error handler. It is enabled by default.
   * @param {boolean} isEnabled
   */
  function setEnabled(isEnabled: boolean): void;
  /**
   * Send handled JS error object
   *
   * @param errorObject Error object to be sent to Instabug's servers
   */
  function reportJSException(errorObject: object): void;
}

export namespace Replies {
  /**
   * Enables and disables everything related to receiving replies.
   * @param {boolean} isEnabled
   */
  function setEnabled(isEnabled: boolean): void;
  /**
   * Tells whether the user has chats already or not.
   * @param {function} callback - callback that is invoked if chats exist
   */
  function hasChats(callback: (previousChats: boolean) => void): void;
  /**
   * Manual invocation for replies.
   */
  function show(): void;

  /**
   * Sets a block of code that gets executed when a new message is received.
   * @param {function} onNewReplyReceivedHandler - A callback that gets
   * executed when a new message is received.
   */
  function setOnNewReplyReceivedHandler(
    onNewReplyReceivedHandler: () => void
  ): void;
  /**
   * Returns the number of unread messages the user currently has.
   * Use this method to get the number of unread messages the user
   * has, then possibly notify them about it with your own UI.
   * @param {messageCountCallback} messageCountCallback callback with argument
   * Notifications count, or -1 in case the SDK has not been initialized.
   */
  function getUnreadRepliesCount(
    messageCountCallback: (count: number) => void
  ): void;
  /**
   * Enables/disables showing in-app notifications when the user receives a
   * new message.
   * @param {boolean} inAppNotificationsEnabled A boolean to set whether
   * notifications are enabled or disabled.
   */
  function setInAppNotificationsEnabled(
    inAppNotificationsEnabled: boolean
  ): void;
  /**
   * Enables/disables the use of push notifications in the SDK.
   * Defaults to YES.
   * @param {boolean} isPushNotificationEnabled A boolean to indicate whether push
   * notifications are enabled or disabled.
   */
  function setPushNotificationsEnabled(
    isPushNotificationEnabled: boolean
  ): void;
  /**
   * Set whether new in app notification received will play a small sound notification
   * or not (Default is {@code false})
   * @android
   *
   * @param shouldPlaySound desired state of conversation sounds
   */
  function setInAppNotificationSound(shouldPlaySound: boolean): void;
  /**
   * Set the GCM registration token to Instabug
   *
   * @param token the GCM registration token
   */
  function setPushNotificationRegistrationTokenAndroid(token: string): void;
  /**
   * Show in-app Messaging's notifications
   *
   * @param data the data bundle related to Instabug
   */
  function showNotificationAndroid(data: object): void;
  /**
   * Set the push notification's icon that will be shown with Instabug notifications
   *
   * @param notificationIcon the notification icon resource ID
   */
  function setNotificationIconAndroid(notificationIcon: number): void;
  /**
   * Set a notification channel id to a notification channel that notifications
   * can be posted to.
   *
   * @param pushNotificationChannelId an id to a notification channel that notifications
   */
  function setPushNotificationChannelIdAndroid(pushNotificationChannelId: string): void;
  /**
   * Set whether new system notification received will play the default sound from
   * RingtoneManager or not (Default is {@code false})
   *
   * @param shouldPlaySound desired state of conversation sounds
   */
  function setSystemReplyNotificationSoundEnabledAndroid(shouldPlaySound: boolean): void;
}
export namespace Surveys {
  /**
   * @summary Sets whether surveys are enabled or not.
   * If you disable surveys on the SDK but still have active surveys on your Instabug dashboard,
   * those surveys are still going to be sent to the device, but are not going to be
   * shown automatically.
   * To manually display any available surveys, call `Instabug.showSurveyIfAvailable()`.
   * Defaults to `true`.
   * @param {boolean} isEnabled A boolean to set whether Instabug Surveys is enabled or disabled.
   */
  function setEnabled(isEnabled: boolean): void;
  /**
   * @summary Shows one of the surveys that were not shown before, that also have conditions
   * that match the current device/user.
   * Does nothing if there are no available surveys or if a survey has already been shown
   * in the current session.
   */
  function showSurveyIfAvailable(): void;

  /**
   * Returns an array containing the available surveys.
   * @param {availableSurveysCallback} availableSurveysCallback callback with
   * argument available surveys
   *
   */
  function getAvailableSurveys(
    availableSurveysCallback: (surveys: Survey[]) => void
  ): void;
  /**
   * Sets whether auto surveys showing are enabled or not.
   * @param autoShowingSurveysEnabled A boolean to indicate whether the
   *                                surveys auto showing are enabled or not.
   *
   */
  function setAutoShowingEnabled(autoShowingSurveysEnabled: boolean): void;

  /**
   * @summary Sets a block of code to be executed just before the survey's UI is presented.
   * This block is executed on the UI thread. Could be used for performing any UI changes before
   * the survey's UI is shown.
   * @param {function} onShowHandler - A block of code that gets executed before
   * presenting the survey's UI.
   */
  function setOnShowHandler(onShowHandler: () => void): void;

  /**
   * @summary Sets a block of code to be executed right after the survey's UI is dismissed.
   * This block is executed on the UI thread. Could be used for performing any UI
   * changes after the survey's UI is dismissed.
   * @param {function} onDismissHandler - A block of code that gets executed after
   * the survey's UI is dismissed.
   */
  function setOnDismissHandler(onDismissHandler: () => void): void;
  /**
   * Shows survey with a specific token.
   * Does nothing if there are no available surveys with that specific token.
   * Answered and cancelled surveys won't show up again.
   * @param {string} surveyToken - A String with a survey token.
   *
   */
  function showSurvey(surveyToken: string): void;
  /**
   * Returns true if the survey with a specific token was answered before.
   * Will return false if the token does not exist or if the survey was not answered before.
   * @param {string} surveyToken - A String with a survey token.
   * @param {function} surveyTokenCallback callback with argument as the desired value of the whether
   * the survey has been responded to or not.
   *
   */
  function hasRespondedToSurvey(
    surveyToken: string,
    surveyTokenCallback: (hasResponded: boolean) => void
  ): void;
  /**
   * Setting an option for all the surveys to show a welcome screen before
   * the user starts taking the survey.
   * @param shouldShowWelcomeScreen A boolean for setting whether the
   *                                welcome screen should show.
   *
   */
  function setShouldShowWelcomeScreen(shouldShowWelcomeScreen: boolean): void;
  /**
   * iOS Only
   * @summary Sets url for the published iOS app on AppStore, You can redirect
   * NPS Surveys or AppRating Surveys to AppStore to let users rate your app on AppStore itself.
   * @param {String} appStoreURL A String url for the published iOS app on AppStore
   */
  function setAppStoreURL(appStoreURL: string): void;
}
export namespace NetworkLogger {
  /**
   * Sets whether network logs should be sent with bug reports.
   * It is enabled by default.
   * @param {boolean} isEnabled
   */
  function setEnabled(isEnabled: boolean): void;
  /**
   * Obfuscates any response data.
   * @param {function} handler
   */
  function setNetworkDataObfuscationHandler(handler: (networkData: any) => any): void;
  /**
   * Omit requests from being logged based on either their request or response details
   * @param {string} expression
   */
  function setRequestFilterExpression(expression: string): void;
  /**
   * Returns progress in terms of totalBytesSent and totalBytesExpectedToSend a network request.
   * @param {function} handler
   */
  function setProgressHandlerForRequest(handler: () => void): void;
  /**
   * Apollo Link Request Handler to track network log for graphQL using apollo
   * @param {any} operation 
   * @param {any} forward 
   */
  function apolloLinkRequestHandler(operation: any, forward: any):any;
}
export class Trace {
  constructor(id: string, name?: string, attributes?: object);
  /**
   * Add an attribute with key and value to the Trace to be sent.
   * @param {string} key 
   * @param {string} value 
   */
  setAttribute(key: string, value: string): void;
  /**
    * End Execution Trace
    */
  end(): void;
}

/**
 * Starts the SDK.
 * This is the main SDK method that does all the magic. This is the only
 * method that SHOULD be called.
 * Should be called in constructor of the AppRegistry component
 * @param {string} token The token that identifies the app, you can find
 * it on your dashboard.
 * @param {invocationEvent} invocationEvent The event that invokes
 * the SDK's UI.
 */
export function start(token: string, invocationEvent: invocationEvent[]): void;
/**
 * Attaches user data to each report being sent.
 * Each call to this method overrides the user data to be attached.
 * Maximum size of the string is 1,000 characters.
 * @param {string} userData A string to be attached to each report, with a
 * maximum size of 1,000 characters.
 */
export function setUserData(userData: string): void;

/**
 * Sets whether the SDK is tracking user steps or not.
 * Enabling user steps would give you an insight on the scenario a user has
 * performed before encountering a bug or a crash. User steps are attached
 * with each report being sent.
 * @param {boolean} isEnabled A boolean to set user steps tracking
 * to being enabled or disabled.
 */
export function setTrackUserSteps(isEnabled: boolean): void;
/**
 * Sets whether IBGLog should also print to Xcode's console log or not.
 * @param {boolean} printsToConsole A boolean to set whether printing to
 *                  Xcode's console is enabled or not.
 */
export function setIBGLogPrintsToConsole(printsToConsole: boolean): void;

/**
 * The session profiler is enabled by default and it attaches to the bug and
 * crash reports the following information during the last 60 seconds before the report is sent.
 * @param {boolean} sessionProfilerEnabled - A boolean parameter to enable or disable the feature.
 *
 */
export function setSessionProfilerEnabled(
  sessionProfilerEnabled: boolean
): void;
/**
 * This API sets the verbosity level of logs used to debug The SDK. The defualt value in debug 
 * mode is sdkDebugLogsLevelVerbose and in production is sdkDebugLogsLevelError.
 * @param {sdkDebugLogsLevel} sdkDebugLogsLevel - The verbosity level of logs.
 *
 */
export function setSdkDebugLogsLevel(
  sdkDebugLogsLevel: sdkDebugLogsLevel
): void;

/**
 * Sets the SDK's locale.
 * Use to change the SDK's UI to different language.
 * Defaults to the device's current locale.
 * @param {locale} locale A locale to set the SDK to.
 */
export function setLocale(locale: locale): void;
/**
 * Sets the color theme of the SDK's whole UI.
 * the SDK's UI to.
 * @param colorTheme
 */
export function setColorTheme(colorTheme: colorTheme): void;
/**
 * Sets the primary color of the SDK's UI.
 * Sets the color of UI elements indicating interactivity or call to action.
 * To use, import processColor and pass to it with argument the color hex
 * as argument.
 * @param {color} color A color to set the UI elements of the SDK to.
 */
export function setPrimaryColor(color: string): void;
/**
 * Appends a set of tags to previously added tags of reported feedback,
 * bug or crash.
 * @param {string[]} tags An array of tags to append to current tags.
 */
export function appendTags(tags: string[]): void;
/**
 * Manually removes all tags of reported feedback, bug or crash.
 */
export function resetTags(): void;
/**
 * Gets all tags of reported feedback, bug or crash.
 * @param {tagsCallback} tagsCallback callback with argument tags of reported feedback, bug or crash.
 */
export function getTags(tagsCallback: () => void): void;

/**
 * Overrides any of the strings shown in the SDK with custom ones.
 * Allows you to customize any of the strings shown to users in the SDK.
 * @param {string} string String value to override the default one.
 * @param {strings} key Key of string to override.
 */
export function setString(key: strings, string: string): void;

/**
 * Sets the default value of the user's email and hides the email field from the reporting UI
 * and set the user's name to be included with all reports.
 * It also reset the chats on device to that email and removes user attributes,
 * user data and completed surveys.
 * @param {string} email Email address to be set as the user's email.
 * @param {string} name Name of the user to be set.
 */
export function identifyUser(email: string, name: string): void;
/**
 * Sets the default value of the user's email to nil and show email field and remove user name
 * from all reports
 * It also reset the chats on device and removes user attributes, user data and completed surveys.
 */
export function logOut(): void;

/**
 * Logs a user event that happens through the lifecycle of the application.
 * Logged user events are going to be sent with each report, as well as at the end of a session.
 * @param {string} name Event name.
 */
export function logUserEvent(name: string): void;
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
 * @param message    the message
 */
export function logVerbose(message: string): void;
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
 * @param message    the message
 */
export function logInfo(message: string): void;
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
 * @param message    the message
 */
export function logDebug(message: string): void;
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
 * @param message    the message
 */
export function logError(message: string): void;
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
 * @param message    the message
 */
export function logWarn(message: string): void;
/**
 * Clear all Instabug logs, console logs, network logs and user steps.
 */
export function clearLogs(): void;
/**
 * Sets whether user steps tracking is visual, non visual or disabled.
 * User Steps tracking is enabled by default if it's available
 * in your current plan.
 *
 * @param {reproStepsMode} reproStepsMode An enum to set user steps tracking
 * to be enabled, non visual or disabled.
 */
export function setReproStepsMode(reproStepsMode: reproStepsMode): void;
/**
 * Sets user attribute to overwrite it's value or create a new one if it doesn't exist.
 *
 * @param key   the attribute
 * @param value the value
 */
export function setUserAttribute(key: string, value: string): void;
/**
 * Returns the user attribute associated with a given key.
 aKey
  * @param {string} key The attribute key as string
  * @param {function} userAttributeCallback callback with argument as the desired user attribute value
  */
export function getUserAttribute(
  key: string,
  userAttributeCallback: () => void
): void;
/**
 * Removes user attribute if exists.
 *
 * @param key the attribute key as string
 * @see #setUserAttribute(String, String)
 */
export function removeUserAttribute(key: string): void;
/**
 * @summary Returns all user attributes.
 * @param {function} userAttributesCallback callback with argument A new dictionary containing
 * all the currently set user attributes, or an empty dictionary if no user attributes have been set.
 */
export function getAllUserAttributes(userAttributesCallback: () => void): void;
/**
 * Clears all user attributes if exists.
 */
export function clearAllUserAttributes(): void;

/**
 * Enable/Disable debug logs from Instabug SDK
 * Default state: disabled
 *
 * @param isDebugEnabled whether debug logs should be printed or not into LogCat
 */
export function setDebugEnabled(isDebugEnabled: boolean): void;
/**
 * Enables all Instabug functionality
 * It works on android only
 */
export function enable(): void;
/**
 * Disables all Instabug functionality
 * It works on android only
 */
export function disable(): void;

/**
 * @summary Checks whether app is development/Beta testing OR live
 * Note: This API is iOS only
 * It returns in the callback false if in development or beta testing on Test Flight, and
 * true if app is live on the app store.
 * @param {function} runningLiveCallBack callback with argument as return value 'isLive'
 */
export function isRunningLive(runningLiveCallBack: (isLive: boolean) => void): void;

/**
 * Shows the welcome message in a specific mode.
 * @param welcomeMessageMode An enum to set the welcome message mode to
 *                           live, or beta.
 *
 */
export function showWelcomeMessage(
  welcomeMessageMode: welcomeMessageMode
): void;
/**
 * Sets the welcome message mode to live, beta or disabled.
 * @param welcomeMessageMode An enum to set the welcome message mode to
 *                           live, beta or disabled.
 *
 */
export function setWelcomeMessageMode(
  welcomeMessageMode: welcomeMessageMode
): void;
/**
 * Add file to be attached to the bug report.
 * @param {string} filePath
 * @param {string} fileName
 */
export function addFileAttachment(filePath: string, fileName: string): void;

/**
 * @deprecated Use {@link Instabug.addPrivateView} instead. 
 * 
 * Hides component from screenshots, screen recordings and view hierarchy.
 * @param {Object} viewRef the ref of the component to hide
 */
export function setPrivateView(viewRef: object): void;

/**
 * Hides component from screenshots, screen recordings and view hierarchy.
 * @param {Object} viewRef the ref of the component to hide
 */
export function addPrivateView(viewRef: object): void;

/**
 * Removes component from the set of hidden views. The component will show again in 
 * screenshots, screen recordings and view hierarchy.
 * @param {Object} viewRef the ref of the component to remove from hidden views
 */
export function removePrivateView(viewRef: object): void;

/**
 * Shows default Instabug prompt.
 */
export function show(): void;
export function onReportSubmitHandler(
  preSendingHandler: (presendingHandler: Report) => void
): void;
export function callPrivateApi(apiName: string, param: any): void;
export function onNavigationStateChange(
  prevState: any,
  currentState: any,
  action: any
): void;
export function onStateChange(
  state: any
): void;
export function reportScreenChange(
  screenName: string
): void;

/**
   * Add experiments to next report.
   * @param {string[]} experiments An array of experiments to add to the next report.
   */
export function addExperiments(experiments:string[]): void;

/**
 * Remove experiments from next report.
 * @param {string[]} experiments An array of experiments to remove from the next report.
 */
export function removeExperiments(experiments: string[]): void;

/**
 * Clear all experiments
 */
export function clearAllExperiments(): void;

export function componentDidAppearListener(componentObj:
  { componentId: any, componentName: any, passProps: any }
): void;

interface Report {
  /**
   * Attach debug log to the report to be sent.
   * @param {string} log 
   */
  logDebug(log: string): void;
  /**
   * Attach verbose log to the report to be sent.
   * @param {string} log 
   */
  logVerbose(log: string): void;
  /**
   * Attach warn log to the report to be sent.
   * @param {string} log 
   */
  logWarn(log: string): void;
  /**
   * Attach error log to the report to be sent.
   * @param {string} log 
   */
  logError(log: string): void;
  /**
   * Attach info log to the report to be sent.
   * @param {string} log 
   */
  logInfo(log: string): void;
  /**
   * Append a tag to the report to be sent.
   * @param {string} tag 
   */
  appendTag(tag: string): void;
  /**
   * Append a console log to the report to be sent.
   * @param {string} consoleLog 
   */
  appendConsoleLog(consoleLog: string): void;
  /**
   * Add a user attribute with key and value to the report to be sent.
   * @param {string} key 
   * @param {string} value 
   */
  setUserAttribute(key: string, value: string): void;
  /**
   * Attach a file to the report to be sent.
   * @param {string} url 
   * @param {string} fileName 
   */
  addFileAttachmentWithUrl(url: string, filename: string): void;
  /**
   * Attach a file to the report to be sent.
   * @param {string} data 
   * @param {string} fileName 
   */
  addFileAttachmentWithData(data: string, filename: string): void;
}

interface Survey {
  title: string;
}
