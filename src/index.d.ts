// Type definitions for instabug-reactnative 8.0
// Project: https://github.com/Instabug/instabug-reactnative#readme
// Definitions by: Aly Ezz <https://github.com/alyezz>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

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
