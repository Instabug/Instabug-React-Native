import {
  NativeModules,
  NativeAppEventEmitter,
  DeviceEventEmitter,
  Platform
} from 'react-native';
let { Instabug } = NativeModules;
import InstabugUtils from './utils/InstabugUtils.js';
import BugReporting from './modules/BugReporting.js';
import Surveys from './modules/Surveys.js';
import FeatureRequests from './modules/FeatureRequests.js';

InstabugUtils.captureJsErrors();

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
   * @deprecated Use {@link BugReporting.invoke()} instead.
   * Invokes the SDK manually with the default invocation mode.
   * Shows a view that asks the user whether they want to start a chat, report
   * a problem or suggest an improvement.
   */
  invoke: function() {
    Instabug.invoke();
  },

  /**
   * @deprecated Use {@link BugReporting.invokeWithInvocationModeAndOptions} instead.
   * Invokes the SDK with a specific mode.
   * Invokes the SDK and show a specific view, instead of showing a prompt for
   * users to choose from.
   * @param {invocationMode} invocationMode Specifies which mode the
   * SDK is going to start with.
   */
  invokeWithInvocationMode: function(invocationMode) {
    Instabug.invokeWithInvocationMode(invocationMode);
  },

  /**
   * @deprecated Use {@link BugReporting.dismiss() instead}
   * Dismisses any Instabug views that are currently being shown.
   */
  dismiss: function() {
    Instabug.dismiss();
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
   * Enable/Disable screen recording
   * @param {boolean} autoScreenRecordingEnabled boolean for enable/disable
   * screen recording on crash feature
   */
  setAutoScreenRecordingEnabled: function(autoScreenRecordingEnabled) {
    Instabug.setAutoScreenRecordingEnabled(autoScreenRecordingEnabled);
  },

  /**
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
   * Adds custom logs that will be sent with each report.
   * @param {string} log Message to be logged.
   */
  IBGLog: function(log) {
    Instabug.IBGLog(log);
  },

  /**
   * Sets whether the SDK is tracking user steps or not.
   * Enabling user steps would give you an insight on the scenario a user has
   * performed before encountering a bug or a crash. User steps are attached
   * with each report being sent.
   * @param {boolean} isUserStepsEnabled A boolean to set user steps tracking
   * to being enabled or disabled.
   */
  setUserStepsEnabled: function(isUserStepsEnabled) {
    if (Platform.OS === 'ios') Instabug.setUserStepsEnabled(isUserStepsEnabled);
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
   * Report un-caught exceptions to Instabug dashboard
   * We don't send exceptions from __DEV__, since it's way too noisy!
   */
  setCrashReportingEnabled: function(enableCrashReporter) {
    Instabug.setCrashReportingEnabled(enableCrashReporter);
  },

  /**
   * @deprecated Use {@link BugReporting.onReportSubmitHandler} instead.
   * Sets a block of code to be executed before sending each report.
   * This block is executed in the background before sending each report. Could
   * be used for attaching logs and extra data to reports.
   * @param {function} preSendingHandler - A callback that gets executed before sending each bug
   * report.
   */
  setPreSendingHandler: function(preSendingHandler) {
    if (Platform.OS === 'ios') {
      Instabug.addListener('IBGpreSendingHandler');
      NativeAppEventEmitter.addListener(
        'IBGpreSendingHandler',
        preSendingHandler
      );
    } else {
      DeviceEventEmitter.addListener('IBGpreSendingHandler', preSendingHandler);
    }

    Instabug.setPreSendingHandler(preSendingHandler);
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
   * @deprecated
   * Shows survey with a specific token.
   * Does nothing if there are no available surveys with that specific token.
   * Answered and cancelled surveys won't show up again.
   * @param {string} surveyToken - A String with a survey token.
   *
   */
  showSurveyWithToken: function(surveyToken) {
    Instabug.showSurveyWithToken(surveyToken);
  },

  /**
   * @deprecated
   * Returns true if the survey with a specific token was answered before.
   * Will return false if the token does not exist or if the survey was not answered before.
   * @param {string} surveyToken - A String with a survey token.
   * @param {function} surveyTokenCallback callback with argument as the desired value of the whether
   * the survey has been responded to or not.
   *
   */
  hasRespondedToSurveyWithToken: function(surveyToken, surveyTokenCallback) {
    Instabug.hasRespondedToSurveyWithToken(surveyToken, surveyTokenCallback);
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
   * @deprecated Use {@link BugReporting.onInvokeHandler} instead
   * Sets a block of code to be executed just before the SDK's UI is presented.
   * This block is executed on the UI thread. Could be used for performing any
   * UI changes before the SDK's UI is shown.
   * @param {function} preInvocationHandler - A callback that gets executed before invoking the SDK
   */
  setPreInvocationHandler: function(preInvocationHandler) {
    if (Platform.OS === 'ios') {
      Instabug.addListener('IBGpreInvocationHandler');
      NativeAppEventEmitter.addListener(
        'IBGpreInvocationHandler',
        preInvocationHandler
      );
    } else {
      DeviceEventEmitter.addListener(
        'IBGpreInvocationHandler',
        preInvocationHandler
      );
    }

    Instabug.setPreInvocationHandler(preInvocationHandler);
  },

  /**
   * @deprecated {@link BugReporting.onSDKDismissedHandler} instead
   * Sets a block of code to be executed right after the SDK's UI is dismissed.
   * This block is executed on the UI thread. Could be used for performing any
   * UI changes after the SDK's UI is dismissed.
   * @param {function} postInvocationHandler - A callback to get executed after
   * dismissing the SDK.
   */
  setPostInvocationHandler: function(postInvocationHandler) {
    if (Platform.OS === 'ios') {
      Instabug.addListener('IBGpostInvocationHandler');
      NativeAppEventEmitter.addListener('IBGpostInvocationHandler', function(
        payload
      ) {
        postInvocationHandler(payload['dismissType'], payload['reportType']);
      });
    } else {
      DeviceEventEmitter.addListener('IBGpostInvocationHandler', function(
        payload
      ) {
        postInvocationHandler(payload.dismissType, payload.reportType);
      });
    }

    Instabug.setPostInvocationHandler(postInvocationHandler);
  },

  /**
   * @deprecated Present a view that educates the user on how to invoke the SDK with the
   * currently set invocation event.
   */
  showIntroMessage: function() {
    Instabug.showIntroMessage();
  },

  /**
   * Sets the default value of the user's email and hides the email field
   * from the reporting UI.
   * Defaults to an empty string.
   * @param {string} userEmail An email address to be set as the user's email.
   */
  setUserEmail: function(userEmail) {
    Instabug.setUserEmail(userEmail);
  },

  /**
   * Sets the default value of the user's name to be included with all reports.
   * Defaults to an empty string.
   * @param {string} userName Name of the user to be set.
   */
  setUserName: function(userName) {
    Instabug.setUserName(userName);
  },

  /**
   * @deprecated Enables/disables screenshot view when reporting a bug/improvement.
   * By default, screenshot view is shown when reporting a bug, but not when
   * sending feedback.
   * @param {boolean} willSkipScreenshotAnnotation sets whether screenshot view is
   * shown or not. Passing YES will show screenshot view for both feedback and
   * bug reporting, while passing NO will disable it for both.
   */
  setWillSkipScreenshotAnnotation: function(willSkipScreenshotAnnotation) {
    Instabug.setWillSkipScreenshotAnnotation(willSkipScreenshotAnnotation);
  },

  /**
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
   * @deprecated Use {@link setInvocationEvents} instead.
   * Sets the event that invoke the feedback form.
   * Default is set by `Instabug.startWithToken`.
   * @param {invocationEvent} invocationEvent Event that invokes the
   * feedback form.
   */
  setInvocationEvent: function(invocationEvent) {
    Instabug.setInvocationEvent(invocationEvent);
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
   * @deprecated Sets whether users are required to enter an email address or not when
   * sending reports.
   * Defaults to YES.
   * @param {boolean} isEmailFieldRequired A boolean to indicate whether email
   * field is required or not.
   */
  setEmailFieldRequired: function(isEmailFieldRequired) {
    Instabug.setEmailFieldRequired(isEmailFieldRequired);
  },

  /**
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
   * @deprecated Sets whether users are required to enter a comment or not when sending reports.
   * Defaults to NO.
   * @param {boolean} isCommentFieldRequired A boolean to indicate whether comment
   * field is required or not.
   */
  setCommentFieldRequired: function(isCommentFieldRequired) {
    Instabug.setCommentFieldRequired(isCommentFieldRequired);
  },

  /**
   * @deprecated since version 2.3.0. Use {@link setShakingThresholdForiPhone}
   * and {@link setShakingThresholdForiPad} instead.
   * Sets the threshold value of the shake gesture for iPhone/iPod Touch and iPad.
   * Default for iPhone is 2.5.
   * Default for iPad is 0.6.
   * @param {number} iPhoneShakingThreshold Threshold for iPhone.
   * @param {number} iPadShakingThreshold Threshold for iPad.
   */
  setShakingThresholdForIPhone: function(
    iPhoneShakingThreshold,
    iPadShakingThreshold
  ) {
    if (Platform.OS === 'ios')
      Instabug.setShakingThresholdForIPhone(
        iPhoneShakingThreshold,
        iPadShakingThreshold
      );
  },

  /**
   * @deprecated
   * Sets the threshold value of the shake gesture for iPhone/iPod Touch
   * Default for iPhone is 2.5.
   * @param {number} iPhoneShakingThreshold Threshold for iPhone.
   */
  setShakingThresholdForiPhone: function(iPhoneShakingThreshold) {
    if (Platform.OS === 'ios')
      Instabug.setShakingThresholdForiPhone(iPhoneShakingThreshold);
  },

  /**
   * @deprecated
   * Sets the threshold value of the shake gesture for iPad.
   * Default for iPad is 0.6.
   * @param {number} iPadShakingThreshold Threshold for iPad.
   */
  setShakingThresholdForiPad: function(iPadShakingThreshold) {
    if (Platform.OS === 'ios')
      Instabug.setShakingThresholdForiPad(iPadShakingThreshold);
  },

  /**
   * @deprecated
   * Sets the threshold value of the shake gesture for android devices.
   * Default for android is an integer value equals 350.
   * you could increase the shaking difficulty level by
   * increasing the `350` value and vice versa
   * @param {number} androidThreshold Threshold for android devices.
   */
  setShakingThresholdForAndroid: function(androidThreshold) {
    if (Platform.OS === 'android')
      Instabug.setShakingThresholdForAndroid(androidThreshold);
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
   * @deprecated Sets whether the intro message that gets shown on launching the app is
   * enabled or not.
   * Defaults to YES.
   * @param {boolean} isIntroMessageEnabled A boolean to indicate whether the
   * intro message is enabled or not.
   */
  setIntroMessageEnabled: function(isIntroMessageEnabled) {
    Instabug.setIntroMessageEnabled(isIntroMessageEnabled);
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
    if (Platform.OS == 'ios') {
      Instabug.setPrimaryColor(primaryColor);
    }
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
   * @deprecated since version 2.3.0. Use {@link setEnabledAttachmentTypes} instead.
   * Sets whether attachments in bug reporting and in-app messaging are enabled or not.
   * @param {boolean} screenshot A boolean to enable or disable screenshot attachments.
   * @param {boolean} extraScreenshot A boolean to enable or disable extra
   * screenshot attachments.
   * @param {boolean} galleryImage A boolean to enable or disable gallery image
   * attachments. In iOS 10+,NSPhotoLibraryUsageDescription should be set in
   * info.plist to enable gallery image attachments.
   * @param {boolean} voiceNote A boolean to enable or disable voice note attachments.
   * In iOS 10+, NSMicrophoneUsageDescription should be set in info.plist to enable
   * voiceNote attachments.
   * @param {boolean} screenRecording A boolean to enable or disable screen recording attachments.
   */

  setAttachmentTypesEnabled: function(
    screenshot,
    extraScreenshot,
    galleryImage,
    voiceNote,
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
   * Enables/disables showing in-app notifications when the user receives a
   * new message.
   * @param {boolean} isChatNotificationEnabled A boolean to set whether
   * notifications are enabled or disabled.
   */
  setChatNotificationEnabled: function(isChatNotificationEnabled) {
    Instabug.setChatNotificationEnabled(isChatNotificationEnabled);
  },

  /**
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
   * Checks if a notification is from Instabug.
   * If you are using push notifications, use this method to check whether an
   * incoming notification is from Instabug or not. If this method returns YES,
   * you should call didReceiveRemoteNotification: to let the Instabug handle
   * the notification. Otherwise, handle the notification on your own.
   * @param {Object} dict Notification's userInfo
   * @param {function} isInstabugNotificationCallback callback with
   * argument isInstabugNotification
   */
  isInstabugNotification: function(dict, isInstabugNotificationCallback) {
    if (Platform.OS === 'ios')
      Instabug.isInstabugNotification(dict, isInstabugNotificationCallback);
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
   * @deprecated since version 2.7.0, you can now add categories from the dashboard.
   * Sets an array of report categories to be shown for users to select from before reporting a
   * bug or sending feedback.
   * Use this method to give users a list of choices of categories their bug report or feedback
   * might be related to. Selected category will be shown as a tag on your dashboard.
   * @param {Array} titles titles to be shown in the list.
   */
  setReportCategories: function(...titles) {
    if (Platform.OS == 'ios') {
      Instabug.setReportCategories(titles, null);
    } else if (Platform.OS == 'android') {
      Instabug.setReportCategories(titles);
    }
  },

  /**
   * @deprecated
   * Sets whether the extended bug report mode should be disabled, enabled with
   * required fields or enabled with optional fields.
   * @param {extendedBugReportMode} extendedBugReportMode An enum to disable
   *                                the extended bug report mode, enable it
   *                                with required or with optional fields.
   */
  setExtendedBugReportMode: function(extendedBugReportMode) {
    Instabug.setExtendedBugReportMode(extendedBugReportMode);
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
   * Logs a user event that happens through the lifecycle of the application.
   * Logged user events are going to be sent with each report, as well as at the end of a session.
   * @param {string} name Event name.
   * @param {Object} params An optional dictionary or parameters to be associated with the event.
   */
  logUserEventWithNameAndParams: function(name, params) {
    Instabug.logUserEventWithNameAndParams(name, params);
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
   * @summary Enables/disables inspect view hierarchy when reporting a bug/feedback.
   * @param {boolean} viewHierarchyEnabled A boolean to set whether view hierarchy are enabled
   * or disabled.
   */
  setViewHierarchyEnabled: function(viewHierarchyEnabled) {
    Instabug.setViewHierarchyEnabled(viewHierarchyEnabled);
  },

  /**
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
   * @deprecated
   * @summary Shows one of the surveys that were not shown before, that also have conditions
   * that match the current device/user.
   * Does nothing if there are no available surveys or if a survey has already been shown
   * in the current session.
   */
  showSurveysIfAvailable: function() {
    Instabug.showSurveysIfAvailable();
  },

  /**
   * @deprecated
   * @summary Sets a block of code to be executed just before the survey's UI is presented.
   * This block is executed on the UI thread. Could be used for performing any UI changes before
   * the survey's UI is shown.
   * @param {function} willShowSurveyHandler - A block of code that gets executed before
   * presenting the survey's UI.
   */
  setWillShowSurveyHandler: function(willShowSurveyHandler) {
    if (Platform.OS === 'ios') {
      Instabug.addListener('IBGWillShowSurvey');
      NativeAppEventEmitter.addListener(
        'IBGWillShowSurvey',
        willShowSurveyHandler
      );
    } else {
      DeviceEventEmitter.addListener(
        'IBGWillShowSurvey',
        willShowSurveyHandler
      );
    }

    Instabug.setWillShowSurveyHandler(willShowSurveyHandler);
  },

  /**
   * @deprecated
   * @summary Sets a block of code to be executed right after the survey's UI is dismissed.
   * This block is executed on the UI thread. Could be used for performing any UI
   * changes after the survey's UI is dismissed.
   * @param {function} didDismissSurveyHandler - A block of code that gets executed after
   * the survey's UI is dismissed.
   */
  setDidDismissSurveyHandler: function(didDismissSurveyHandler) {
    if (Platform.OS === 'ios') {
      Instabug.addListener('IBGDidDismissSurvey');
      NativeAppEventEmitter.addListener(
        'IBGDidDismissSurvey',
        didDismissSurveyHandler
      );
    } else {
      DeviceEventEmitter.addListener(
        'IBGDidDismissSurvey',
        didDismissSurveyHandler
      );
    }

    Instabug.setDidDismissSurveyHandler(didDismissSurveyHandler);
  },

  /**
   * @deprecated
   * Enable/Disable prompt options when SDK invoked. When only a single option is enabled it
   * becomes the default
   * invocation option that SDK gets invoked with and prompt options screen will not show. When
   * none is enabled, Bug
   * reporting becomes the default invocation option.
   *
   * @param  {boolean} chat      whether Talk to us is enable or not
   * @param  {boolean} bug       whether Report a Problem is enable or not
   * @param  {boolean} feedback  whether General Feedback  is enable or not
   * */
  setPromptOptionsEnabled: function(chat, bug, feedback) {
    Instabug.setPromptOptionsEnabled(chat, bug, feedback);
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
   * @deprecated
   *
   * @param enabled true to show success dialog after submitting a bug report
   *
   */
  setSuccessDialogEnabled: function(enabled) {
    Instabug.setSuccessDialogEnabled(enabled);
  },

  /**
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
   * Send handled JS error object
   *
   * @param errorObject   Error object to be sent to Instabug's servers
   */
  reportJSException: function(errorObject) {
    let jsStackTrace = InstabugUtils.parseErrorStack(errorObject);
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
   * @deprecated
   * Sets a threshold for numbers of sessions and another for number of days
   * required before a survey, that has been dismissed once, would show again.
   * @param {number} sessionCount Number of sessions required to be
   *                initialized before a dismissed survey can be shown again.
   * @param {number} daysCount Number of days required to pass before a
   *                dismissed survey can be shown again.
   */
  setThresholdForReshowingSurveyAfterDismiss: function(
    sessionCount,
    daysCount
  ) {
    Instabug.setThresholdForReshowingSurveyAfterDismiss(
      sessionCount,
      daysCount
    );
  },

  /**
   * @deprecated
   * Sets whether auto surveys showing are enabled or not.
   * @param autoShowingSurveysEnabled A boolean to indicate whether the
   *                                surveys auto showing are enabled or not.
   *
   */
  setAutoShowingSurveysEnabled: function(autoShowingSurveysEnabled) {
    Instabug.setAutoShowingSurveysEnabled(autoShowingSurveysEnabled);
  },

  /**
   * @deprecated
   * Shows the UI for feature requests list
   *
   */
  showFeatureRequests: function() {
    Instabug.showFeatureRequests();
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
      Instabug.welcomeMessageLiveWelcomeStepContent
  }
};

InstabugModule.BugReporting = BugReporting;
InstabugModule.Surveys = Surveys;
InstabugModule.FeatureRequests = FeatureRequests;

module.exports = InstabugModule;
