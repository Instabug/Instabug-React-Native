import {
  NativeModules,
  NativeAppEventEmitter,
  DeviceEventEmitter,
  Platform,
  processColor
} from 'react-native';
let { Instabug } = NativeModules;
import { parseErrorStack, captureJsErrors } from './utils/InstabugUtils';
import BugReporting from './modules/BugReporting';
import Surveys from './modules/Surveys';
import FeatureRequests from './modules/FeatureRequests';
import Chats from './modules/Chats';
import Replies from './modules/Replies';
import CrashReporting from './modules/CrashReporting';

captureJsErrors();

/**
 * Instabug
 * @exports Instabug
 */
const InstabugModule = {
  /**
   * Starts the SDK.
   * This is the main SDK method that does all the magic. This is the only
   * method that SHOULD be called.
   * Should be called in constructor of the app registery component
   * @param {string} token The token that identifies the app, you can find
   * it on your dashboard.
   * @param {invocationEvent} invocationEvent The event that invokes
   * the SDK's UI.
   */
  startWithToken: function(token, invocationEvent) {
    if (Platform.OS === 'ios') Instabug.startWithToken(token, invocationEvent);
  },

  /**
   * Attaches user data to each report being sent.
   * Each call to this method overrides the user data to be attached.
   * Maximum size of the string is 1,000 characters.
   * @param {string} userData A string to be attached to each report, with a
   * maximum size of 1,000 characters.
   */
  setUserData: function(userData) {
    Instabug.setUserData(userData);
  },

  /**
   * @deprecated
   * Enable/Disable screen recording
   * @param {boolean} autoScreenRecordingEnabled boolean for enable/disable
   * screen recording on crash feature
   */
  setAutoScreenRecordingEnabled: function(autoScreenRecordingEnabled) {
    Instabug.setAutoScreenRecordingEnabled(autoScreenRecordingEnabled);
  },

  /**
   * @deprecated
   * Sets auto screen recording maximum duration
   *
   * @param autoScreenRecordingMaxDuration maximum duration of the screen recording video
   *                                       in seconds
   * The maximum duration is 30 seconds
   */
  setAutoScreenRecordingMaxDuration: function(autoScreenRecordingMaxDuration) {
    Instabug.setAutoScreenRecordingMaxDuration(autoScreenRecordingMaxDuration);
  },

  /**
   * Sets whether the SDK is tracking user steps or not.
   * Enabling user steps would give you an insight on the scenario a user has
   * performed before encountering a bug or a crash. User steps are attached
   * with each report being sent.
   * @param {boolean} isUserStepsEnabled A boolean to set user steps tracking
   * to being enabled or disabled.
   */
  setTrackUserSteps: function(isEnabled) {
    if (Platform.OS === 'ios') Instabug.setTrackUserSteps(isEnabled);
  },

  /**
   * Sets whether IBGLog should also print to Xcode's console log or not.
   * @param {boolean} printsToConsole A boolean to set whether printing to
   *                  Xcode's console is enabled or not.
   */
  setIBGLogPrintsToConsole: function(printsToConsole) {
    if (Platform.OS === 'ios')
      Instabug.setIBGLogPrintsToConsole(printsToConsole);
  },

  /**
   * @deprecated use {@link CrashReporting.setCrashReportingEnabled}
   * Report un-caught exceptions to Instabug dashboard
   * We don't send exceptions from __DEV__, since it's way too noisy!
   */
  setCrashReportingEnabled: function(enableCrashReporter) {
    Instabug.setCrashReportingEnabled(enableCrashReporter);
  },

  /**
   * Sets a block of code to be executed when a prompt option is selected.
   * @param {function} didSelectPromptOptionHandler - A block of code that
   *                  gets executed when a prompt option is selected.
   */
  setDidSelectPromptOptionHandler: function(didSelectPromptOptionHandler) {
    if (Platform.OS === 'ios') {
      Instabug.addListener('IBGDidSelectPromptOptionHandler');
      NativeAppEventEmitter.addListener(
        'IBGDidSelectPromptOptionHandler',
        function(payload) {
          didSelectPromptOptionHandler(payload['promptOption']);
        }
      );
    } else {
      DeviceEventEmitter.addListener(
        'IBGDidSelectPromptOptionHandler',
        function(payload) {
          didSelectPromptOptionHandler(payload.promptOption);
        }
      );
    }

    Instabug.didSelectPromptOptionHandler(didSelectPromptOptionHandler);
  },

  /**
   * The session profiler is enabled by default and it attaches to the bug and
   * crash reports the following information during the last 60 seconds before the report is sent.
   * @param {boolean} sessionProfilerEnabled - A boolean parameter to enable or disable the feature.
   *
   */
  setSessionProfilerEnabled: function(sessionProfilerEnabled) {
    Instabug.setSessionProfilerEnabled(sessionProfilerEnabled);
  },

  /**
   * @deprecated use {@link Replies.getUnreadRepliesCount}
   * Returns the number of unread messages the user currently has.
   * Use this method to get the number of unread messages the user
   * has, then possibly notify them about it with your own UI.
   * @param {messageCountCallback} messageCountCallback callback with argument
   * Notifications count, or -1 in case the SDK has not been initialized.
   */

  getUnreadMessagesCount: function(messageCountCallback) {
    Instabug.getUnreadMessagesCount(messageCountCallback);
  },

  /**
   * Enables/disables the use of push notifications in the SDK.
   * Defaults to YES.
   * @param {boolean} isPushNotificationEnabled A boolean to indicate whether push
   * notifications are enabled or disabled.
   */
  setPushNotificationsEnabled: function(isPushNotificationEnabled) {
    if (Platform.OS === 'ios')
      Instabug.setPushNotificationsEnabled(isPushNotificationEnabled);
  },

  /**
   * @deprecated use {@link BugReporting.setInvocationOptions}
   * Sets whether users are required to enter an email address or not when
   * sending reports.
   * Defaults to YES.
   * @param {boolean} isEmailFieldRequired A boolean to indicate whether email
   * field is required or not.
   * @param {actionTypes} actionTypes An enum that indicates which action
   *                                  types will have the isEmailFieldRequired
   */

  setEmailFieldRequiredForActions: function(isEmailFieldRequired, actionTypes) {
    Instabug.setEmailFieldRequiredForActions(isEmailFieldRequired, actionTypes);
  },

  /**
   * Sets the default edge and offset from the top at which the floating button
   * will be shown. Different orientations are already handled.
   * Default for `floatingButtonEdge` is `rectEdge.maxX`.
   * Default for `floatingButtonOffsetFromTop` is 50
   * @param {rectEdge} floatingButtonEdge `maxX` to show on the right,
   * or `minX` to show on the left.
   * @param {number} offsetFromTop floatingButtonOffsetFromTop Top offset for
   * floating button.
   */
  setFloatingButtonEdge: function(floatingButtonEdge, offsetFromTop) {
    if (Platform.OS === 'ios')
      Instabug.setFloatingButtonEdge(floatingButtonEdge, offsetFromTop);
  },

  /**
   * Sets the SDK's locale.
   * Use to change the SDK's UI to different language.
   * Defaults to the device's current locale.
   * @param {locale} locale A locale to set the SDK to.
   */
  setLocale: function(locale) {
    if (Platform.OS === 'ios') {
      Instabug.setLocale(locale);
    } else if (Platform.OS === 'android') {
      Instabug.changeLocale(locale);
    }
  },

  /**
   * Sets the color theme of the SDK's whole UI.
   * the SDK's UI to.
   * @param colorTheme
   */
  setColorTheme: function(colorTheme) {
    Instabug.setColorTheme(colorTheme);
  },

  /**
   * Sets the primary color of the SDK's UI.
   * Sets the color of UI elements indicating interactivity or call to action.
   * To use, import processColor and pass to it with argument the color hex
   * as argument.
   * @param {color} primaryColor A color to set the UI elements of the SDK to.
   */
  setPrimaryColor: function(primaryColor) {
    Instabug.setPrimaryColor(primaryColor);
  },

  /**
   * Appends a set of tags to previously added tags of reported feedback,
   * bug or crash.
   * @param {string[]} tags An array of tags to append to current tags.
   */
  appendTags: function(tags) {
    Instabug.appendTags(tags);
  },

  /**
   * Manually removes all tags of reported feedback, bug or crash.
   */
  resetTags: function() {
    Instabug.resetTags();
  },

  /**
   * Gets all tags of reported feedback, bug or crash.
   * @param {tagsCallback} tagsCallback callback with argument tags of reported feedback, bug or crash.
   */
  getTags: function(tagsCallback) {
    Instabug.getTags(tagsCallback);
  },

  /**
   * Overrides any of the strings shown in the SDK with custom ones.
   * Allows you to customize any of the strings shown to users in the SDK.
   * @param {string} string String value to override the default one.
   * @param {strings} key Key of string to override.
   */
  setStringToKey: function(string, key) {
    Instabug.setString(string, key);
  },

  /**
   * Sets whether attachments in bug reporting and in-app messaging are enabled or not.
   * @param {boolean} screenshot A boolean to enable or disable screenshot attachments.
   * @param {boolean} extraScreenshot A boolean to enable or disable extra
   * screenshot attachments.
   * @param {boolean} galleryImage A boolean to enable or disable gallery image
   * attachments. In iOS 10+,NSPhotoLibraryUsageDescription should be set in
   * info.plist to enable gallery image attachments.
   * @param {boolean} screenRecording A boolean to enable or disable screen recording attachments.
   */
  setEnabledAttachmentTypes: function(
    screenshot,
    extraScreenshot,
    galleryImage,
    screenRecording
  ) {
    Instabug.setEnabledAttachmentTypes(
      screenshot,
      extraScreenshot,
      galleryImage,
      screenRecording
    );
  },

  /**
   * Sets the default value of the user's email and hides the email field from the reporting UI
   * and set the user's name to be included with all reports.
   * It also reset the chats on device to that email and removes user attributes,
   * user data and completed surveys.
   * @param {string} email Email address to be set as the user's email.
   * @param {string} name Name of the user to be set.
   */
  identifyUserWithEmail: function(email, name) {
    if (Platform.OS == 'ios') {
      Instabug.identifyUserWithEmail(email, name);
    } else if ('android') {
      Instabug.identifyUser(name, email);
    }
  },

  /**
   * Sets the default value of the user's email to nil and show email field and remove user name
   * from all reports
   * It also reset the chats on device and removes user attributes, user data and completed surveys.
   */
  logOut: function() {
    Instabug.logOut();
  },

  /**
   * @deprecated Logs a user event that happens through the lifecycle of the application.
   * Logged user events are going to be sent with each report, as well as at the end of a session.
   * @param {string} name Event name.
   */
  logUserEventWithName: function(name) {
    Instabug.logUserEventWithName(name);
  },

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
  logVerbose: function(message) {
    if (!message) return;
    if (Platform.OS === 'android') {
      Instabug.log('v', message);
    } else {
      Instabug.logVerbose(message);
    }
  },

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
  logInfo: function(message) {
    if (!message) return;
    if (Platform.OS === 'android') {
      Instabug.log('i', message);
    } else {
      Instabug.logInfo(message);
    }
  },

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
  logDebug: function(message) {
    if (!message) return;
    if (Platform.OS === 'android') {
      Instabug.log('d', message);
    } else {
      Instabug.logDebug(message);
    }
  },

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
  logError: function(message) {
    if (!message) return;
    if (Platform.OS === 'android') {
      Instabug.log('e', message);
    } else {
      Instabug.logError(message);
    }
  },

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
  logWarn: function(message) {
    if (!message) return;
    if (Platform.OS === 'android') {
      Instabug.log('w', message);
    } else {
      Instabug.logWarn(message);
    }
  },

  /**
   * Clear all Instabug logs, console logs, network logs and user steps.
   */
  clearLogs: function() {
    Instabug.clearLogs();
  },

  /**
   * Sets whether user steps tracking is visual, non visual or disabled.
   * User Steps tracking is enabled by default if it's available
   * in your current plan.
   *
   * @param {reproStepsMode} reproStepsMode An enum to set user steps tracking
   * to be enabled, non visual or disabled.
   */
  setReproStepsMode: function(reproStepsMode) {
    Instabug.setReproStepsMode(reproStepsMode);
  },

  /**
   * Sets user attribute to overwrite it's value or create a new one if it doesn't exist.
   *
   * @param key   the attribute
   * @param value the value
   */
  setUserAttribute: function(key, value) {
    if (!key || !value || typeof key !== 'string' || typeof value !== 'string')
      throw new TypeError('Invalid param, Expected String');
    Instabug.setUserAttribute(key, value);
  },

  /**
     * Returns the user attribute associated with a given key.
     aKey
     * @param {string} key The attribute key as string
     * @param {function} userAttributeCallback callback with argument as the desired user attribute value
     */
  getUserAttribute: function(key, userAttributeCallback) {
    Instabug.getUserAttribute(key, userAttributeCallback);
  },

  /**
   * Removes user attribute if exists.
   *
   * @param key the attribute key as string
   * @see #setUserAttribute(String, String)
   */
  removeUserAttribute: function(key) {
    if (!key || typeof key !== 'string')
      throw new TypeError('Invalid param, Expected String');
    Instabug.removeUserAttribute(key);
  },

  /**
   * @summary Returns all user attributes.
   * @param {function} userAttributesCallback callback with argument A new dictionary containing
   * all the currently set user attributes, or an empty dictionary if no user attributes have been set.
   */
  getAllUserAttributes: function(userAttributesCallback) {
    Instabug.getAllUserAttributes(userAttributesCallback);
  },

  /**
   * Clears all user attributes if exists.
   */
  clearAllUserAttributes: function() {
    Instabug.clearAllUserAttributes();
  },

  /**
   * @deprecated use {@link Replies.setInAppNotificationsEnabled}
   * Enables/disables showing in-app notifications when the user receives a
   * new message.
   * @param {boolean} isChatNotificationEnabled A boolean to set whether
   * notifications are enabled or disabled.
   */

  setChatNotificationEnabled: function(isChatNotificationEnabled) {
    Instabug.setChatNotificationEnabled(isChatNotificationEnabled);
  },

  /**
   * @deprecated use {@link Replies.setOnNewReplyReceivedCallback}
   * Sets a block of code that gets executed when a new message is received.
   * @param {function} onNewMessageHandler - A callback that gets
   * executed when a new message is received.
   */

  setOnNewMessageHandler: function(onNewMessageHandler) {
    if (Platform.OS === 'ios') {
      Instabug.addListener('IBGonNewMessageHandler');
      NativeAppEventEmitter.addListener(
        'IBGonNewMessageHandler',
        onNewMessageHandler
      );
    } else {
      DeviceEventEmitter.addListener(
        'IBGonNewMessageHandler',
        onNewMessageHandler
      );
    }

    Instabug.setOnNewMessageHandler(onNewMessageHandler);
  },

  /**
   * @summary Enables/disables inspect view hierarchy when reporting a bug/feedback.
   * @param {boolean} viewHierarchyEnabled A boolean to set whether view hierarchy are enabled
   * or disabled.
   */
  setViewHierarchyEnabled: function(viewHierarchyEnabled) {
    Instabug.setViewHierarchyEnabled(viewHierarchyEnabled);
  },

  /**
   * @deprecated use {@link Surveys.setEnabled}
   * @summary Sets whether surveys are enabled or not.
   * If you disable surveys on the SDK but still have active surveys on your Instabug dashboard,
   * those surveys are still going to be sent to the device, but are not going to be
   * shown automatically.
   * To manually display any available surveys, call `Instabug.showSurveyIfAvailable()`.
   * Defaults to `true`.
   * @param {boolean} surveysEnabled A boolean to set whether Instabug Surveys is enabled or disabled.
   */

  setSurveysEnabled: function(surveysEnabled) {
    Instabug.setSurveysEnabled(surveysEnabled);
  },

  /**
   * Enable/Disable debug logs from Instabug SDK
   * Default state: disabled
   *
   * @param isDebugEnabled whether debug logs should be printed or not into LogCat
   */
  setDebugEnabled: function(isDebugEnabled) {
    if (Platform.OS === 'android') {
      Instabug.setDebugEnabled(isDebugEnabled);
    }
  },

  /**
   * Enables all Instabug functionality
   * It works on android only
   */
  enable: function() {
    if (Platform.OS === 'android') {
      Instabug.enable();
    }
  },

  /**
   * Disables all Instabug functionality
   * It works on android only
   */
  disable: function() {
    if (Platform.OS === 'android') {
      Instabug.disable();
    }
  },

  /**
   * @deprecated use {@link Replies.setInAppNotificationSound}
   * Set whether new in app notification received will play a small sound notification
   * or not (Default is {@code false})
   *
   * @param shouldPlaySound desired state of conversation sounds
   * @since 4.1.0
   */

  setEnableInAppNotificationSound: function(shouldPlaySound) {
    if (Platform.OS === 'android') {
      Instabug.setEnableInAppNotificationSound(shouldPlaySound);
    }
  },

  /**
   * @deprecated use {@link CrashReporting.reportJSException}
   * Send handled JS error object
   *
   * @param errorObject   Error object to be sent to Instabug's servers
   */

  reportJSException: function(errorObject) {
    let jsStackTrace = parseErrorStack(errorObject);
    var jsonObject = {
      message: errorObject.name + ' - ' + errorObject.message,
      os: Platform.OS,
      platform: 'react_native',
      exception: jsStackTrace
    };
    if (Platform.OS === 'android') {
      Instabug.sendHandledJSCrash(JSON.stringify(jsonObject));
    } else {
      Instabug.sendHandledJSCrash(jsonObject);
    }
  },

  /**
   * @summary Checks whether app is development/Beta testing OR live
   * Note: This API is iOS only
   * It returns in the callback false if in development or beta testing on Test Flight, and
   * true if app is live on the app store.
   * @param {function} runningLiveCallBack callback with argument as return value 'isLive'
   */
  isRunningLive: function(runningLiveCallBack) {
    if (Platform.OS === 'ios') {
      Instabug.isRunningLive(runningLiveCallBack);
    }
  },

  /**
   * Sets the default position at which the Instabug screen recording button will be shown.
   * Different orientations are already handled.
   * (Default for `position` is `bottomRight`)
   *
   * @param position is of type IBGPosition `topLeft` to show on the top left of screen,
   * or `bottomRight` to show on the bottom right of scrren.
   */
  setVideoRecordingFloatingButtonPosition: function(position) {
    Instabug.setVideoRecordingFloatingButtonPosition(position);
  },

  /**
   * Setting an option for all the surveys to show a welcome screen before
   * the user starts taking the survey.
   * @param shouldShowWelcomeScreen A boolean for setting whether the
   *                                welcome screen should show.
   *
   */
  setShouldShowSurveysWelcomeScreen: function(shouldShowWelcomeScreen) {
    Instabug.setShouldShowSurveysWelcomeScreen(shouldShowWelcomeScreen);
  },

  /**
   * Shows the welcome message in a specific mode.
   * @param welcomeMessageMode An enum to set the welcome message mode to
   *                           live, or beta.
   *
   */
  showWelcomeMessage: function(welcomeMessageMode) {
    Instabug.showWelcomeMessageWithMode(welcomeMessageMode);
  },

  /**
   * Sets the welcome message mode to live, beta or disabled.
   * @param welcomeMessageMode An enum to set the welcome message mode to
   *                           live, beta or disabled.
   *
   */
  setWelcomeMessageMode: function(welcomeMessageMode) {
    Instabug.setWelcomeMessageMode(welcomeMessageMode);
  },

  /**
   * Add file to be attached to the bug report.
   * @param {string} filePath
   * @param {string} fileName
   */
  addFileAttachment: function(filePath, fileName) {
    if (Platform.OS === 'android') {
      Instabug.setFileAttachment(filePath, fileName);
    } else {
      Instabug.setFileAttachment(filePath);
    }
  },

  /**
   * Shows default Instabug prompt.
   */
  show() {
    Instabug.show();
  },

  onReportSubmitHandler: function(preSendingHandler) {
    BugReporting.onReportSubmitHandler(preSendingHandler);
  },

  callPrivateApi: function(apiName, param) {
    Instabug.callPrivateApi(apiName, param);
  },

  /**
   * The event used to invoke the feedback form
   * @readonly
   * @enum {number}
   */
  invocationEvent: {
    none: Instabug.invocationEventNone,
    shake: Instabug.invocationEventShake,
    screenshot: Instabug.invocationEventScreenshot,
    twoFingersSwipe: Instabug.invocationEventTwoFingersSwipeLeft,
    floatingButton: Instabug.invocationEventFloatingButton
  },

  /**
   * The user steps option.
   * @readonly
   * @enum {number}
   */
  reproStepsMode: {
    enabled: Instabug.reproStepsEnabled,
    disabled: Instabug.reproStepsDisabled,
    enabledWithNoScreenshots: Instabug.reproStepsEnabledWithNoScreenshots
  },

  /**
   * Type of SDK dismiss
   * @readonly
   * @enum {number}
   */
  dismissType: {
    submit: Instabug.dismissTypeSubmit,
    cancel: Instabug.dismissTypeCancel,
    addAttachment: Instabug.dismissTypeAddAttachment
  },

  /**
   * Type of SDK dismiss
   * @readonly
   * @enum {number}
   */
  promptOption: {
    bug: Instabug.promptOptionBug,
    chat: Instabug.promptOptionChat,
    feedback: Instabug.promptOptionFeedback
  },

  /**
   * Type of report to be submit
   * @readonly
   * @enum {number}
   */
  reportType: {
    bug: Instabug.reportTypeBug,
    feedback: Instabug.reportTypeFeedback
  },

  /**
   *  The mode used upon invocating the SDK
   * @readonly
   * @enum {number}
   */
  invocationMode: {
    NA: Instabug.invocationModeNA,
    newBug: Instabug.invocationModeNewBug,
    newFeedback: Instabug.invocationModeNewFeedback,
    newChat: Instabug.invocationModeNewChat,
    chatsList: Instabug.invocationModeChatsList
  },

  /**
   *  The options used upon invocating the SDK
   * @readonly
   * @enum {number}
   */
  invocationOptions: {
    invocationOptionsEmailFieldHidden: Instabug.emailFieldHidden,
    invocationOptionsEmailFieldOptional: Instabug.emailFieldOptional,
    invocationOptionsCommentFieldRequired: Instabug.commentFieldRequired,
    invocationOptionsDisablePostSendingDialog: Instabug.disablePostSendingDialog
  },

  /**
   *  The extended bug report mode
   * @readonly
   * @enum {number}
   */
  extendedBugReportMode: {
    enabledWithRequiredFields: Instabug.enabledWithRequiredFields,
    enabledWithOptionalFields: Instabug.enabledWithOptionalFields,
    disabled: Instabug.disabled
  },

  /**
   * The supported locales
   * @readonly
   * @enum {number}
   */
  locale: {
    arabic: Instabug.localeArabic,
    chineseSimplified: Instabug.localeChineseSimplified,
    chineseTraditional: Instabug.localeChineseTraditional,
    czech: Instabug.localeCzech,
    danish: Instabug.localeDanish,
    dutch: Instabug.localeDutch,
    english: Instabug.localeEnglish,
    french: Instabug.localeFrench,
    german: Instabug.localeGerman,
    italian: Instabug.localeItalian,
    japanese: Instabug.localeJapanese,
    polish: Instabug.localePolish,
    portugueseBrazil: Instabug.localePortugueseBrazil,
    russian: Instabug.localeRussian,
    spanish: Instabug.localeSpanish,
    swedish: Instabug.localeSwedish,
    turkish: Instabug.localeTurkish,
    korean: Instabug.localeKorean
  },

  /**
   * The color theme of the different UI elements
   * @readonly
   * @enum {number}
   */
  colorTheme: {
    light: Instabug.colorThemeLight,
    dark: Instabug.colorThemeDark
  },

  /**
   * Rectangle edges
   * @readonly
   * @enum {number}
   */
  floatingButtonEdge: {
    left: Instabug.rectMinXEdge,
    right: Instabug.rectMaxXEdge
  },

  /**
   * Instabug floating buttons positions.
   * @readonly
   * @enum {number}
   */
  IBGPosition: {
    bottomRight: Instabug.bottomRight,
    topRight: Instabug.topRight,
    bottomLeft: Instabug.bottomLeft,
    topLeft: Instabug.topLeft
  },

  /**
   * The welcome message mode.
   * @readonly
   * @enum {number}
   */
  welcomeMessageMode: {
    live: Instabug.welcomeMessageModeLive,
    beta: Instabug.welcomeMessageModeBeta,
    disabled: Instabug.welcomeMessageModeDisabled
  },

  /**
   * Instabug action types.
   * @readonly
   * @enum {number}
   */
  actionTypes: {
    allActions: Instabug.allActions,
    reportBug: Instabug.reportBugAction,
    requestNewFeature: Instabug.requestNewFeature,
    addCommentToFeature: Instabug.addCommentToFeature
  },

  /**
   * Instabug strings
   * @readonly
   * @enum {number}
   */
  strings: {
    shakeHint: Instabug.shakeHint,
    swipeHint: Instabug.swipeHint,
    edgeSwipeStartHint: Instabug.edgeSwipeStartHint,
    startAlertText: Instabug.startAlertText,
    invalidEmailMessage: Instabug.invalidEmailMessage,
    invalidEmailTitle: Instabug.invalidEmailTitle,
    invalidCommentMessage: Instabug.invalidCommentMessage,
    invalidCommentTitle: Instabug.invalidCommentTitle,
    invocationHeader: Instabug.invocationHeader,
    talkToUs: Instabug.talkToUs,
    startChats: Instabug.startChats,
    reportBug: Instabug.reportBug,
    reportFeedback: Instabug.reportFeedback,
    emailFieldHint: Instabug.emailFieldHint,
    commentFieldHintForBugReport: Instabug.commentFieldHintForBugReport,
    commentFieldHintForFeedback: Instabug.commentFieldHintForFeedback,
    addVideoMessage: Instabug.addVideoMessage,
    addVoiceMessage: Instabug.addVoiceMessage,
    addImageFromGallery: Instabug.addImageFromGallery,
    addExtraScreenshot: Instabug.addExtraScreenshot,
    audioRecordingPermissionDeniedTitle:
      Instabug.audioRecordingPermissionDeniedTitle,
    audioRecordingPermissionDeniedMessage:
      Instabug.audioRecordingPermissionDeniedMessage,
    microphonePermissionAlertSettingsButtonText:
      Instabug.microphonePermissionAlertSettingsButtonTitle,
    recordingMessageToHoldText: Instabug.recordingMessageToHoldText,
    recordingMessageToReleaseText: Instabug.recordingMessageToReleaseText,
    conversationsHeaderTitle: Instabug.conversationsHeaderTitle,
    screenshotHeaderTitle: Instabug.screenshotHeaderTitle,
    chatsNoConversationsHeadlineText: Instabug.chatsNoConversationsHeadlineText,
    doneButtonText: Instabug.doneButtonText,
    okButtonText: Instabug.okButtonTitle,
    cancelButtonText: Instabug.cancelButtonTitle,
    thankYouText: Instabug.thankYouText,
    audio: Instabug.audio,
    video: Instabug.video,
    image: Instabug.image,
    chatsHeaderTitle: Instabug.chatsHeaderTitle,
    team: Instabug.team,
    messagesNotification: Instabug.messagesNotification,
    messagesNotificationAndOthers: Instabug.messagesNotificationAndOthers,
    conversationTextFieldHint: Instabug.conversationTextFieldHint,
    collectingDataText: Instabug.collectingDataText,
    thankYouAlertText: Instabug.thankYouAlertText,
    welcomeMessageBetaWelcomeStepTitle:
      Instabug.welcomeMessageBetaWelcomeStepTitle,
    welcomeMessageBetaWelcomeStepContent:
      Instabug.welcomeMessageBetaWelcomeStepContent,
    welcomeMessageBetaHowToReportStepTitle:
      Instabug.welcomeMessageBetaHowToReportStepTitle,
    welcomeMessageBetaHowToReportStepContent:
      Instabug.welcomeMessageBetaHowToReportStepContent,
    welcomeMessageBetaFinishStepTitle:
      Instabug.welcomeMessageBetaFinishStepTitle,
    welcomeMessageBetaFinishStepContent:
      Instabug.welcomeMessageBetaFinishStepContent,
    welcomeMessageLiveWelcomeStepTitle:
      Instabug.welcomeMessageLiveWelcomeStepTitle,
    welcomeMessageLiveWelcomeStepContent:
      Instabug.welcomeMessageLiveWelcomeStepContent,
    surveysCustomThanksTitle: Instabug.surveysCustomThanksTitle,
    surveysCustomThanksSubTitle: Instabug.surveysCustomThanksSubTitle,
    surveysStoreRatingThanksTitle: Instabug.surveysStoreRatingThanksTitle,
    surveysStoreRatingThanksSubtitle: Instabug.surveysStoreRatingThanksSubtitle
  }
};

export {
  BugReporting,
  Surveys,
  FeatureRequests,
  Chats,
  Replies,
  CrashReporting
}

export default InstabugModule;
