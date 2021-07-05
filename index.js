import {
  NativeModules,
  Platform,
  findNodeHandle,
  processColor
} from 'react-native';
let { Instabug } = NativeModules;
import IBGEventEmitter from './utils/IBGEventEmitter';
import InstabugUtils from './utils/InstabugUtils';
import InstabugConstants from './utils/InstabugConstants';
import Report from './models/Report';
import BugReporting from './modules/BugReporting';
import APM from './modules/APM';
import Surveys from './modules/Surveys';
import FeatureRequests from './modules/FeatureRequests';
import Chats from './modules/Chats';
import Replies from './modules/Replies';
import CrashReporting from './modules/CrashReporting';
import NetworkLogger from './modules/NetworkLogger';

InstabugUtils.captureJsErrors();
NetworkLogger.setEnabled(true);

var _currentScreen = null;
var _lastScreen = null;
var _isFirstScreen = false;
const firstScreen = "Initial Screen";
/**
 * Instabug
 * @exports Instabug
 */
const InstabugModule = {

  /* istanbul ignore next */
  /**
   * @deprecated use {@link Instabug.start}
   * Starts the SDK.
   * This is the main SDK method that does all the magic. This is the only
   * method that SHOULD be called.
   * Should be called in constructor of the app registery component
   * @param {string} token The token that identifies the app, you can find
   * it on your dashboard.
   * @param {invocationEvent} invocationEvent The event that invokes
   * the SDK's UI.
   */
  startWithToken(token, invocationEvent) {
    this.start(token, invocationEvent);
  },

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
  start: function (token, invocationEvent) {
    if (Platform.OS === 'ios') {
      Instabug.startWithToken(token, invocationEvent);
    }
    _isFirstScreen = true;
    _currentScreen = firstScreen;
    setTimeout(function () {
      if (_currentScreen == firstScreen) {
        Instabug.reportScreenChange(firstScreen);
        _currentScreen = null;
      }
    }, 1000);
  },

  /**
   * Attaches user data to each report being sent.
   * Each call to this method overrides the user data to be attached.
   * Maximum size of the string is 1,000 characters.
   * @param {string} userData A string to be attached to each report, with a
   * maximum size of 1,000 characters.
   */
  setUserData(userData) {
    Instabug.setUserData(userData);
  },

  /* istanbul ignore next */
  /**
   * @deprecated use {@link BugReporting.setAutoScreenRecordingEnabled}
   * Enable/Disable screen recording
   * @param {boolean} autoScreenRecordingEnabled boolean for enable/disable
   * screen recording on crash feature
   */
  setAutoScreenRecordingEnabled(autoScreenRecordingEnabled) {
    Instabug.setAutoScreenRecordingEnabled(autoScreenRecordingEnabled);
  },

  /* istanbul ignore next */
  /**
   * @deprecated use {@link BugReporting.setAutoScreenRecordingMaxDuration}
   * Sets auto screen recording maximum duration
   *
   * @param autoScreenRecordingMaxDuration maximum duration of the screen recording video
   *                                       in seconds
   * The maximum duration is 30 seconds
   */
  setAutoScreenRecordingMaxDuration(autoScreenRecordingMaxDuration) {
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
  setTrackUserSteps(isEnabled) {
    if (Platform.OS === 'ios') Instabug.setTrackUserSteps(isEnabled);
  },

  /**
   * Sets whether IBGLog should also print to Xcode's console log or not.
   * @param {boolean} printsToConsole A boolean to set whether printing to
   *                  Xcode's console is enabled or not.
   */
  setIBGLogPrintsToConsole(printsToConsole) {
    if (Platform.OS === 'ios')
      Instabug.setIBGLogPrintsToConsole(printsToConsole);
  },

  /* istanbul ignore next */
  /**
   * @deprecated use {@link CrashReporting.setEnabled}
   * Report un-caught exceptions to Instabug dashboard
   * We don't send exceptions from __DEV__, since it's way too noisy!
   */
  setCrashReportingEnabled(enableCrashReporter) {
    Instabug.setCrashReportingEnabled(enableCrashReporter);
  },

  /* istanbul ignore next */
  /**
   * @deprecated use {@link BugReporting.setDidSelectPromptOptionHandler}
   * Sets a block of code to be executed when a prompt option is selected.
   * @param {function} didSelectPromptOptionHandler - A block of code that
   *                  gets executed when a prompt option is selected.
   */
  setDidSelectPromptOptionHandler(didSelectPromptOptionHandler) {
    BugReporting.setDidSelectPromptOptionHandler(didSelectPromptOptionHandler);
  },

  /**
   * The session profiler is enabled by default and it attaches to the bug and
   * crash reports the following information during the last 60 seconds before the report is sent.
   * @param {boolean} sessionProfilerEnabled - A boolean parameter to enable or disable the feature.
   *
   */
  setSessionProfilerEnabled(sessionProfilerEnabled) {
    Instabug.setSessionProfilerEnabled(sessionProfilerEnabled);
  },

  /**
   * This API sets the verbosity level of logs used to debug The SDK. The defualt value in debug 
   * mode is sdkDebugLogsLevelVerbose and in production is sdkDebugLogsLevelError.
   * @param {sdkDebugLogsLevel} sdkDebugLogsLevel - The verbosity level of logs.
   *
   */
  setSdkDebugLogsLevel(sdkDebugLogsLevel) {
    if (Platform.OS === 'ios') {
      Instabug.setSdkDebugLogsLevel(sdkDebugLogsLevel);
    }
  },

  /* istanbul ignore next */
  /**
   * @deprecated use {@link Replies.getUnreadRepliesCount}
   * Returns the number of unread messages the user currently has.
   * Use this method to get the number of unread messages the user
   * has, then possibly notify them about it with your own UI.
   * @param {messageCountCallback} messageCountCallback callback with argument
   * Notifications count, or -1 in case the SDK has not been initialized.
   */

  getUnreadMessagesCount(messageCountCallback) {
    Instabug.getUnreadMessagesCount(messageCountCallback);
  },

  /**
   * @deprecated use {@link Replies.setPushNotificationsEnabled}
   * Enables/disables the use of push notifications in the SDK.
   * Defaults to YES.
   * @param {boolean} isPushNotificationEnabled A boolean to indicate whether push
   * notifications are enabled or disabled.
   */
  setPushNotificationsEnabled(isPushNotificationEnabled) {
    Replies.setPushNotificationsEnabled(isPushNotificationEnabled);
  },

  /* istanbul ignore next */
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

  setEmailFieldRequiredForActions(isEmailFieldRequired, actionTypes) {
    Instabug.setEmailFieldRequiredForActions(isEmailFieldRequired, actionTypes);
  },

  /**
   * @deprecated use {@link BugReporting.setFloatingButtonEdge}
   * Sets the default edge and offset from the top at which the floating button
   * will be shown. Different orientations are already handled.
   * Default for `floatingButtonEdge` is `rectEdge.maxX`.
   * Default for `floatingButtonOffsetFromTop` is 50
   * @param {rectEdge} floatingButtonEdge `maxX` to show on the right,
   * or `minX` to show on the left.
   * @param {number} offsetFromTop floatingButtonOffsetFromTop Top offset for
   * floating button.
   */
  setFloatingButtonEdge(floatingButtonEdge, offsetFromTop) {
    BugReporting.setFloatingButtonEdge(floatingButtonEdge, offsetFromTop);
  },

  /**
   * Sets the SDK's locale.
   * Use to change the SDK's UI to different language.
   * Defaults to the device's current locale.
   * @param {locale} locale A locale to set the SDK to.
   */
  setLocale(locale) {
    Instabug.setLocale(locale);
  },

  /**
   * Sets the color theme of the SDK's whole UI.
   * the SDK's UI to.
   * @param colorTheme
   */
  setColorTheme(colorTheme) {
    Instabug.setColorTheme(colorTheme);
  },

  /**
   * Sets the primary color of the SDK's UI.
   * Sets the color of UI elements indicating interactivity or call to action.
   * To use, import processColor and pass to it with argument the color hex
   * as argument.
   * @param {color} color A color to set the UI elements of the SDK to.
   */
  setPrimaryColor(color) {
    Instabug.setPrimaryColor(processColor(color));
  },

  /**
   * Appends a set of tags to previously added tags of reported feedback,
   * bug or crash.
   * @param {string[]} tags An array of tags to append to current tags.
   */
  appendTags(tags) {
    Instabug.appendTags(tags);
  },

  /**
   * Manually removes all tags of reported feedback, bug or crash.
   */
  resetTags() {
    Instabug.resetTags();
  },

  /**
   * Gets all tags of reported feedback, bug or crash.
   * @param {tagsCallback} tagsCallback callback with argument tags of reported feedback, bug or crash.
   */
  getTags(tagsCallback) {
    Instabug.getTags(tagsCallback);
  },

  /* istanbul ignore next */
  /**
   * @deprecated use {@link Instabug.setString}
   * Overrides any of the strings shown in the SDK with custom ones.
   * Allows you to customize any of the strings shown to users in the SDK.
   * @param {string} string String value to override the default one.
   * @param {strings} key Key of string to override.
   */
  setStringToKey(string, key) {
    this.setString(key, string);
  },

  /**
   * Overrides any of the strings shown in the SDK with custom ones.
   * Allows you to customize any of the strings shown to users in the SDK.
   * @param {string} string String value to override the default one.
   * @param {strings} key Key of string to override.
   */
  setString(key, string) {
    Instabug.setString(string, key);
  },

  /**
   * @deprecated use {@link BugReporting.setEnabledAttachmentTypes}
   * Sets whether attachments in bug reporting and in-app messaging are enabled or not.
   * @param {boolean} screenshot A boolean to enable or disable screenshot attachments.
   * @param {boolean} extraScreenshot A boolean to enable or disable extra
   * screenshot attachments.
   * @param {boolean} galleryImage A boolean to enable or disable gallery image
   * attachments. In iOS 10+,NSPhotoLibraryUsageDescription should be set in
   * info.plist to enable gallery image attachments.
   * @param {boolean} screenRecording A boolean to enable or disable screen recording attachments.
   */
  setEnabledAttachmentTypes(
    screenshot,
    extraScreenshot,
    galleryImage,
    screenRecording
  ) {
    BugReporting.setEnabledAttachmentTypes(
      screenshot,
      extraScreenshot,
      galleryImage,
      screenRecording
    );
  },

  /* istanbul ignore next */
  /**
   * @deprecated use {@link Instabug.identifyUser}
   * Sets the default value of the user's email and hides the email field from the reporting UI
   * and set the user's name to be included with all reports.
   * It also reset the chats on device to that email and removes user attributes,
   * user data and completed surveys.
   * @param {string} email Email address to be set as the user's email.
   * @param {string} name Name of the user to be set.
   */
  identifyUserWithEmail(email, name) {
    this.identifyUser(email, name);
  },

  /**
   * Sets the default value of the user's email and hides the email field from the reporting UI
   * and set the user's name to be included with all reports.
   * It also reset the chats on device to that email and removes user attributes,
   * user data and completed surveys.
   * @param {string} email Email address to be set as the user's email.
   * @param {string} name Name of the user to be set.
   */
  identifyUser(email, name) {
    Instabug.identifyUserWithEmail(email, name);
  },

  /**
   * Sets the default value of the user's email to nil and show email field and remove user name
   * from all reports
   * It also reset the chats on device and removes user attributes, user data and completed surveys.
   */
  logOut() {
    Instabug.logOut();
  },

  /* istanbul ignore next */
  /**
   * @deprecated use {@link Instabug.logUserEvent}
   * Logs a user event that happens through the lifecycle of the application.
   * Logged user events are going to be sent with each report, as well as at the end of a session.
   * @param {string} name Event name.
   */
  logUserEventWithName(name) {
    this.logUserEvent(name);
  },

  /**
   * Logs a user event that happens through the lifecycle of the application.
   * Logged user events are going to be sent with each report, as well as at the end of a session.
   * @param {string} name Event name.
   */
  logUserEvent(name) {
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
  logVerbose(message) {
    if (!message) return;
    Instabug.logVerbose(message);
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
  logInfo(message) {
    if (!message) return;
    Instabug.logInfo(message);
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
  logDebug(message) {
    if (!message) return;
    Instabug.logDebug(message);
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
  logError(message) {
    if (!message) return;
    Instabug.logError(message);
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
  logWarn(message) {
    if (!message) return;
    Instabug.logWarn(message);
  },

  /**
   * Clear all Instabug logs, console logs, network logs and user steps.
   */
  clearLogs() {
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
  setReproStepsMode(reproStepsMode) {
    Instabug.setReproStepsMode(reproStepsMode);
  },

  /**
   * Sets user attribute to overwrite it's value or create a new one if it doesn't exist.
   *
   * @param key   the attribute
   * @param value the value
   */
  setUserAttribute(key, value) {
    if (!key || typeof key !== 'string' || typeof value !== 'string')
      throw new TypeError('Invalid param, Expected String');
    Instabug.setUserAttribute(key, value);
  },

  /**
     * Returns the user attribute associated with a given key.
     aKey
     * @param {string} key The attribute key as string
     * @param {function} userAttributeCallback callback with argument as the desired user attribute value
     */
  getUserAttribute(key, userAttributeCallback) {
    Instabug.getUserAttribute(key, userAttributeCallback);
  },

  /**
   * Removes user attribute if exists.
   *
   * @param key the attribute key as string
   * @see #setUserAttribute(String, String)
   */
  removeUserAttribute(key) {
    if (!key || typeof key !== 'string')
      throw new TypeError('Invalid param, Expected String');
    Instabug.removeUserAttribute(key);
  },

  /**
   * @summary Returns all user attributes.
   * @param {function} userAttributesCallback callback with argument A new dictionary containing
   * all the currently set user attributes, or an empty dictionary if no user attributes have been set.
   */
  getAllUserAttributes(userAttributesCallback) {
    Instabug.getAllUserAttributes(userAttributesCallback);
  },

  /**
   * Clears all user attributes if exists.
   */
  clearAllUserAttributes() {
    Instabug.clearAllUserAttributes();
  },

  /* istanbul ignore next */
  /**
   * @deprecated use {@link Replies.setInAppNotificationsEnabled}
   * Enables/disables showing in-app notifications when the user receives a
   * new message.
   * @param {boolean} isChatNotificationEnabled A boolean to set whether
   * notifications are enabled or disabled.
   */

  setChatNotificationEnabled(isChatNotificationEnabled) {
    Instabug.setChatNotificationEnabled(isChatNotificationEnabled);
  },

  /* istanbul ignore next */
  /**
   * @deprecated use {@link Replies.setOnNewReplyReceivedCallback}
   * Sets a block of code that gets executed when a new message is received.
   * @param {function} onNewMessageHandler - A callback that gets
   * executed when a new message is received.
   */
  setOnNewMessageHandler(onNewMessageHandler) {
    Replies.setOnNewReplyReceivedHandler(onNewMessageHandler);
  },

  /* istanbul ignore next */
  /**
   * @deprecated use {@link BugReporting.setViewHierarchyEnabled}
   * @summary Enables/disables inspect view hierarchy when reporting a bug/feedback.
   * @param {boolean} viewHierarchyEnabled A boolean to set whether view hierarchy are enabled
   * or disabled.
   */
  setViewHierarchyEnabled(viewHierarchyEnabled) {
    Instabug.setViewHierarchyEnabled(viewHierarchyEnabled);
  },

  /* istanbul ignore next */
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

  setSurveysEnabled(surveysEnabled) {
    Instabug.setSurveysEnabled(surveysEnabled);
  },

  /**
   * Enable/Disable debug logs from Instabug SDK
   * Default state: disabled
   *
   * @param isDebugEnabled whether debug logs should be printed or not into LogCat
   */
  setDebugEnabled(isDebugEnabled) {
    if (Platform.OS === 'android') {
      Instabug.setDebugEnabled(isDebugEnabled);
    }
  },

  /**
   * Enables all Instabug functionality
   * It works on android only
   */
  enable() {
    if (Platform.OS === 'android') {
      Instabug.enable();
    }
  },

  /**
   * Disables all Instabug functionality
   * It works on android only
   */
  disable() {
    if (Platform.OS === 'android') {
      Instabug.disable();
    }
  },

  /* istanbul ignore next */
  /**
   * @deprecated use {@link Replies.setInAppNotificationSound}
   * Set whether new in app notification received will play a small sound notification
   * or not (Default is {@code false})
   *
   * @param shouldPlaySound desired state of conversation sounds
   * @since 4.1.0
   */

  setEnableInAppNotificationSound(shouldPlaySound) {
    if (Platform.OS === 'android') {
      Instabug.setEnableInAppNotificationSound(shouldPlaySound);
    }
  },

  /* istanbul ignore next */
  /**
   * @deprecated use {@link CrashReporting.reportJSException}
   * Send handled JS error object
   *
   * @param errorObject Error object to be sent to Instabug's servers
   */

  reportJSException(errorObject) {
    CrashReporting.reportJSException(errorObject);
  },

  /**
   * @summary Checks whether app is development/Beta testing OR live
   * Note: This API is iOS only
   * It returns in the callback false if in development or beta testing on Test Flight, and
   * true if app is live on the app store.
   * @param {function} runningLiveCallBack callback with argument as return value 'isLive'
   */
  isRunningLive(runningLiveCallBack) {
    if (Platform.OS === 'ios') {
      Instabug.isRunningLive(runningLiveCallBack);
    }
  },

  /* istanbul ignore next */
  /**
   * @deprecated use {@link BugReporting.setVideoRecordingFloatingButtonPosition}
   * Sets the default position at which the Instabug screen recording button will be shown.
   * Different orientations are already handled.
   * (Default for `position` is `bottomRight`)
   *
   * @param position is of type IBGPosition `topLeft` to show on the top left of screen,
   * or `bottomRight` to show on the bottom right of scrren.
   */
  setVideoRecordingFloatingButtonPosition(position) {
    BugReporting.setVideoRecordingFloatingButtonPosition(position);
  },

  /* istanbul ignore next */
  /**
   * @deprecated use {@link Surveys.setShouldShowWelcomeScreen}
   * Setting an option for all the surveys to show a welcome screen before
   * the user starts taking the survey.
   * @param shouldShowWelcomeScreen A boolean for setting whether the
   *                                welcome screen should show.
   *
   */
  setShouldShowSurveysWelcomeScreen(shouldShowWelcomeScreen) {
    Instabug.setShouldShowSurveysWelcomeScreen(shouldShowWelcomeScreen);
  },

  /**
   * Shows the welcome message in a specific mode.
   * @param welcomeMessageMode An enum to set the welcome message mode to
   *                           live, or beta.
   *
   */
  showWelcomeMessage(welcomeMessageMode) {
    Instabug.showWelcomeMessageWithMode(welcomeMessageMode);
  },

  /**
   * Sets the welcome message mode to live, beta or disabled.
   * @param welcomeMessageMode An enum to set the welcome message mode to
   *                           live, beta or disabled.
   *
   */
  setWelcomeMessageMode(welcomeMessageMode) {
    Instabug.setWelcomeMessageMode(welcomeMessageMode);
  },

  /**
   * Add file to be attached to the bug report.
   * @param {string} filePath
   * @param {string} fileName
   */
  addFileAttachment(filePath, fileName) {
    if (Platform.OS === 'android') {
      Instabug.setFileAttachment(filePath, fileName);
    } else {
      Instabug.setFileAttachment(filePath);
    }
  },

  /**
   * Hides component from screenshots, screen recordings and view hierarchy.
   * @param {Object} viewRef the ref of the component to hide
   */
  setPrivateView(viewRef) {
    const nativeTag = findNodeHandle(viewRef);
    if (Platform.OS === 'ios') {
      Instabug.hideView(nativeTag);
    } else {
      Instabug.hideView([nativeTag]);
    }
  },
  /**
   * Shows default Instabug prompt.
   */
  show() {
    Instabug.show();
  },

  onReportSubmitHandler(preSendingHandler) {
    if (preSendingHandler) {
      InstabugUtils.setOnReportHandler(true);
    } else {
      InstabugUtils.setOnReportHandler(false);
    }
    // send bug report
    IBGEventEmitter.addListener(Instabug, InstabugConstants.PRESENDING_HANDLER, (report) => {
      const { tags, consoleLogs, instabugLogs, userAttributes, fileAttachments } = report;
      const reportObj = new Report(tags, consoleLogs, instabugLogs, userAttributes, fileAttachments);
      preSendingHandler(reportObj);

    });

    // handled js crash
    if (Platform.OS === 'android') {
      IBGEventEmitter.addListener(Instabug, InstabugConstants.SEND_HANDLED_CRASH, async jsonObject => {
        try {
          let report = await Instabug.getReport();
          const { tags, consoleLogs, instabugLogs, userAttributes, fileAttachments } = report;
          const reportObj = new Report(tags, consoleLogs, instabugLogs, userAttributes, fileAttachments);
          preSendingHandler(reportObj);
          Instabug.sendHandledJSCrash(JSON.stringify(jsonObject));
        } catch (e) {
          console.error(e);
        }
      });
    }

    if (Platform.OS === 'android') {
      IBGEventEmitter.addListener(Instabug, InstabugConstants.SEND_UNHANDLED_CRASH, async (jsonObject) => {

        let report = await Instabug.getReport();
        const { tags, consoleLogs, instabugLogs, userAttributes, fileAttachments } = report;
        const reportObj = new Report(tags, consoleLogs, instabugLogs, userAttributes, fileAttachments);
        preSendingHandler(reportObj);
        Instabug.sendJSCrash(JSON.stringify(jsonObject));
      });
    }

    Instabug.setPreSendingHandler(preSendingHandler);
  },

  callPrivateApi(apiName, param) {
    Instabug.callPrivateApi(apiName, param);
  },

  onNavigationStateChange(prevState, currentState, action) {
    const currentScreen = InstabugUtils.getActiveRouteName(currentState);
    const prevScreen = InstabugUtils.getActiveRouteName(prevState);

    if (prevScreen !== currentScreen) {
      if (_currentScreen != null && _currentScreen != firstScreen) {
        Instabug.reportScreenChange(_currentScreen);
        _currentScreen = null;
      }
      _currentScreen = currentScreen;
      setTimeout(function () {
        if (_currentScreen == currentScreen) {
          Instabug.reportScreenChange(currentScreen);
          _currentScreen = null;
        }
      }, 1000);
    }
  },

  onStateChange(state) {
    const currentScreen = InstabugUtils.getFullRoute(state);
    if (_currentScreen != null && _currentScreen != firstScreen) {
      Instabug.reportScreenChange(_currentScreen);
      _currentScreen = null;
    }
    _currentScreen = currentScreen;
    setTimeout(function () {
      if (_currentScreen == currentScreen) {
        Instabug.reportScreenChange(currentScreen);
        _currentScreen = null;
      }
    }, 1000);
  },

  reportScreenChange(screenName) {
    Instabug.reportScreenChange(screenName);
  },

  componentDidAppearListener({ componentId, componentName, passProps }) {
    if (_isFirstScreen) {
      _lastScreen = componentName;
      _isFirstScreen = false;
      return;
    }
    if (_lastScreen != componentName) {
      Instabug.reportScreenChange(componentName);
      _lastScreen = componentName;
    }
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
   * Verbosity level of the SDK debug logs. This has nothing to do with IBGLog,
   * and only affect the logs used to debug the SDK itself.
   * @readonly
   * @enum {number}
   */
  sdkDebugLogsLevel: {
    sdkDebugLogsLevelVerbose: Instabug.sdkDebugLogsLevelVerbose,
    sdkDebugLogsLevelDebug: Instabug.sdkDebugLogsLevelDebug,
    sdkDebugLogsLevelError: Instabug.sdkDebugLogsLevelError,
    sdkDebugLogsLevelNone: Instabug.sdkDebugLogsLevelNone,
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
    azerbaijani: Instabug.localeAzerbaijani,
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
    startChats: Instabug.startChats,
    reportQuestion: Instabug.reportQuestion,
    reportBug: Instabug.reportBug,
    reportFeedback: Instabug.reportFeedback,
    emailFieldHint: Instabug.emailFieldHint,
    commentFieldHintForBugReport: Instabug.commentFieldHintForBugReport,
    commentFieldHintForFeedback: Instabug.commentFieldHintForFeedback,
    commentFieldHintForQuestion: Instabug.commentFieldHintForQuestion,
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
    /**
     * @deprecated use {@link Instabug.strings.conversationsHeaderTitle}
     */
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
    surveysStoreRatingThanksSubtitle: Instabug.surveysStoreRatingThanksSubtitle,
    reportBugDescription: Instabug.reportBugDescription,
    reportFeedbackDescription: Instabug.reportFeedbackDescription,
    reportQuestionDescription: Instabug.reportQuestionDescription,
    requestFeatureDescription: Instabug.requestFeatureDescription,
    discardAlertTitle: Instabug.discardAlertTitle,
    discardAlertMessage: Instabug.discardAlertMessage,
    discardAlertCancel: Instabug.discardAlertCancel,
    discardAlertAction: Instabug.discardAlertAction,
    addAttachmentButtonTitleStringName: Instabug.addAttachmentButtonTitleStringName
  },

};

export {
  BugReporting,
  Surveys,
  FeatureRequests,
  Chats,
  Replies,
  CrashReporting,
  NetworkLogger,
  APM,
};

export default InstabugModule;
