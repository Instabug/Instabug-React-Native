// Type definitions for instabug-reactnative 8.0
// Project: https://github.com/Instabug/instabug-reactnative#readme
// Definitions by: Aly Ezz <https://github.com/alyezz>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export namespace BugReporting {
  function setEnabled(isEnabled: boolean): void;
  function setInvocationEvents(invocationEvents: invocationEvent[]): void;
  function setInvocationOptions(invocationOptions: invocationOptions[]): void;
  function setOptions(options: invocationOptions[]): void;
  function onInvokeHandler(handler: () => void): void;
  function onSDKDismissedHandler(
    handler: (dismiss: dismissType, report: reportType) => void
  ): void;
  function setDidSelectPromptOptionHandler(
    didSelectPromptOptionHandler: () => void
  ): void;
  function setFloatingButtonEdge(
    floatingButtonEdge: number,
    offsetFromTop: number
  ): void;
  function setEnabledAttachmentTypes(
    screenshot: boolean,
    extraScreenshot: boolean,
    galleryImage: boolean,
    screenRecording: boolean
  ): void;
  function setShakingThresholdForiPhone(iPhoneShakingThreshold: number): void;
  function setShakingThresholdForiPad(iPadShakingThreshold: number): void;
  function setShakingThresholdForAndroid(androidThreshold: number): void;
  function setExtendedBugReportMode(
    extendedBugReportMode: extendedBugReportMode
  ): void;
  function setReportTypes(types: reportType[]): void;
  function showWithOptions(type: reportType, options: option[]): void;
  function show(type: reportType, options: option[]): void;
  function setAutoScreenRecordingEnabled(autoScreenRecordingEnabled: boolean): void;
  function setAutoScreenRecordingMaxDuration(
    autoScreenRecordingMaxDuration: number
  ): void;
  function setViewHierarchyEnabled(viewHierarchyEnabled: boolean): void;
  function setVideoRecordingFloatingButtonPosition(
    position: BugReporting.position
  ): void;
  enum invocationEvent {
    none,
    shake,
    screenshot,
    twoFingersSwipe,
    floatingButton
  }
  enum invocationOptions {
    emailFieldHidden,
    emailFieldOptional,
    commentFieldRequired,
    disablePostSendingDialog
  }
  enum extendedBugReportMode {
    enabledWithRequiredFields,
    enabledWithOptionalFields,
    disabled
  }
  enum reportType {
    bug,
    feedback,
    question
  }
  enum option {
    emailFieldHidden,
    emailFieldOptional,
    commentFieldRequired,
    disablePostSendingDialog
  }
  enum position {
    bottomRight,
    topRight,
    bottomLeft,
    topLeft
  }
}
export namespace Chats {
  function setEnabled(isEnabled: boolean): void;
  function show(): void;
}
export namespace CrashReporting {
  function setEnabled(isEnabled: boolean): void;
  function reportJSException(errorObject: object): void;
}
export namespace FeatureRequests {
  function setEmailFieldRequired(
    isEmailFieldRequired: boolean,
    actionTypes: actionTypes[]
  ): void;
  function setEnabled(isEnabled: boolean): void;
  function show(): void;
  enum actionTypes {
    requestNewFeature,
    addCommentToFeature
  }
}
export namespace Replies {
  function setEnabled(isEnabled: boolean): void;
  function hasChats(callback: (previousChats: boolean) => void): void;
  function show(): void;
  function setOnNewReplyReceivedCallback(
    onNewReplyReceivedCallback: () => void
  ): void;
  function setOnNewReplyReceivedHandler(
    onNewReplyReceivedHandler: () => void
  ): void;
  function getUnreadRepliesCount(
    messageCountCallback: (count: number) => void
  ): void;
  function setInAppNotificationsEnabled(
    inAppNotificationsEnabled: boolean
  ): void;
  function setPushNotificationsEnabled(
    isPushNotificationEnabled: boolean
  ): void;
  function setInAppNotificationSound(shouldPlaySound: boolean): void;
  function setPushNotificationRegistrationTokenAndroid(token: string): void;
  function showNotificationAndroid(data: object): void;
  function setNotificationIconAndroid(notificationIcon: number): void;
  function setPushNotificationChannelIdAndroid(pushNotificationChannelId: string): void;
  function setSystemReplyNotificationSoundEnabledAndroid(shouldPlaySound: boolean): void;
}
export namespace Surveys {
  function setEnabled(isEnabled: boolean): void;
  function showSurveyIfAvailable(): void;
  function setThresholdForReshowingSurveyAfterDismiss(
    sessionCount: number,
    daysCount: number
  ): void;
  function getAvailableSurveys(
    availableSurveysCallback: (surveys: Survey[]) => void
  ): void;
  function setAutoShowingEnabled(autoShowingSurveysEnabled: boolean): void;
  function onShowCallback(willShowSurveyHandler: () => void): void;
  function setOnShowHandler(onShowHandler: () => void): void;
  function onDismissCallback(didDismissSurveyHandler: () => void): void;
  function setOnDismissHandler(onDismissHandler: () => void): void;
  function showSurvey(surveyToken: string): void;
  function hasRespondedToSurvey(
    surveyToken: string,
    surveyTokenCallback: (hasResponded: boolean) => void
  ): void;
  function setShouldShowWelcomeScreen(shouldShowWelcomeScreen: boolean): void;
  function setAppStoreURL(appStoreURL: string): void;
}
export namespace NetworkLogger {
  function setEnabled(isEnabled: boolean): void;
  function setNetworkDataObfuscationHandler(handler: (networkData: any) => any): void;
  function setRequestFilterExpression(expression: string): void;
  function setProgressHandlerForRequest(handler: () => void): void;
}
export class Trace {
  constructor(id: string, name?: string, attributes?: object);
  setAttribute(key: string, value: string): void;
  end(): void;
}
export namespace APM {
  function setEnabled(isEnabled: boolean): void;
  function setAppLaunchEnabled(isEnabled: boolean): void;
  function setNetworkEnabledIOS(isEnabled: boolean): void;
  function setAutoUITraceEnabled(isEnabled: boolean): void;
  function startExecutionTrace(name: string): Trace;
  function startUITrace(name: string): void;
  function endUITrace(): void;
  function setLogLevel(logLevel: logLevel): void;
  enum logLevel {
    none,
    error,
    warning,
    info,
    debug,
    verbose,
  }
}
export function startWithToken(
  token: string,
  invocationEvent: invocationEvent[]
): void;
export function start(token: string, invocationEvent: invocationEvent[]): void;
export function setUserData(userData: string): void;
export function setAutoScreenRecordingEnabled(
  autoScreenRecordingEnabled: boolean
): void;
export function setAutoScreenRecordingMaxDuration(
  autoScreenRecordingMaxDuration: number
): void;
export function setTrackUserSteps(isEnabled: boolean): void;
export function setIBGLogPrintsToConsole(printsToConsole: boolean): void;
export function setCrashReportingEnabled(enableCrashReporter: boolean): void;
export function setDidSelectPromptOptionHandler(
  didSelectPromptOptionHandler: () => void
): void;
export function setSessionProfilerEnabled(
  sessionProfilerEnabled: boolean
): void;
export function setSdkDebugLogsLevel(
  sdkDebugLogsLevel: sdkDebugLogsLevel
): void;
export function getUnreadMessagesCount(
  messageCountCallback: (count: number) => void
): void;
export function setPushNotificationsEnabled(
  isPushNotificationEnabled: boolean
): void;
export function setEmailFieldRequiredForActions(
  isEmailFieldRequired: boolean,
  actionTypes: actionTypes
): void;
export function setFloatingButtonEdge(
  floatingButtonEdge: number,
  offsetFromTop: number
): void;
export function setLocale(locale: locale): void;
export function setColorTheme(colorTheme: colorTheme): void;
export function setPrimaryColor(color: string): void;
export function appendTags(tags: string[]): void;
export function resetTags(): void;
export function getTags(tagsCallback: () => void): void;
export function setStringToKey(string: string, key: strings): void;
export function setString(key: strings, string: string): void;
export function setEnabledAttachmentTypes(
  screenshot: boolean,
  extraScreenshot: boolean,
  galleryImage: boolean,
  screenRecording: boolean
): void;
export function identifyUserWithEmail(email: string, name: string): void;
export function identifyUser(email: string, name: string): void;
export function logOut(): void;
export function logUserEventWithName(name: string): void;
export function logUserEvent(name: string): void;
export function logVerbose(message: string): void;
export function logInfo(message: string): void;
export function logDebug(message: string): void;
export function logError(message: string): void;
export function logWarn(message: string): void;
export function clearLogs(): void;
export function setReproStepsMode(reproStepsMode: reproStepsMode): void;
export function setUserAttribute(key: string, value: string): void;
export function getUserAttribute(
  key: string,
  userAttributeCallback: () => void
): void;
export function removeUserAttribute(key: string): void;
export function getAllUserAttributes(userAttributesCallback: () => void): void;
export function clearAllUserAttributes(): void;
export function setChatNotificationEnabled(
  isChatNotificationEnabled: boolean
): void;
export function setOnNewMessageHandler(onNewMessageHandler: () => void): void;
export function setViewHierarchyEnabled(viewHierarchyEnabled: boolean): void;
export function setSurveysEnabled(surveysEnabled: boolean): void;
export function setDebugEnabled(isDebugEnabled: boolean): void;
export function enable(): void;
export function disable(): void;
export function setEnableInAppNotificationSound(shouldPlaySound: boolean): void;
export function reportJSException(errorObject: object): void;
export function isRunningLive(runningLiveCallBack: () => void): void;
export function setVideoRecordingFloatingButtonPosition(
  position: IBGPosition
): void;
export function setShouldShowSurveysWelcomeScreen(
  shouldShowWelcomeScreen: boolean
): void;
export function showWelcomeMessage(
  welcomeMessageMode: welcomeMessageMode
): void;
export function setWelcomeMessageMode(
  welcomeMessageMode: welcomeMessageMode
): void;
export function addFileAttachment(filePath: string, fileName: string): void;
export function setPrivateView(viewRef: object): void;
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
export function componentDidAppearListener(componentObj:
  { componentId: any, componentName: any, passProps: any }
): void;
export enum invocationEvent {
  none,
  shake,
  screenshot,
  twoFingersSwipe,
  floatingButton
}
export enum reproStepsMode {
  enabled,
  disabled,
  enabledWithNoScreenshots
}
export enum dismissType {
  submit,
  cancel,
  addAttachment
}
export enum invocationOptions {
  invocationOptionsEmailFieldHidden,
  invocationOptionsEmailFieldOptional,
  invocationOptionsCommentFieldRequired,
  invocationOptionsDisablePostSendingDialog
}
export enum sdkDebugLogsLevel {
  sdkDebugLogsLevelVerbose,
  sdkDebugLogsLevelDebug,
  sdkDebugLogsLevelError,
  sdkDebugLogsLevelNone,
}
export enum extendedBugReportMode {
  enabledWithRequiredFields,
  enabledWithOptionalFields,
  disabled
}
export enum locale {
  arabic,
  azerbaijani,
  chineseSimplified,
  chineseTraditional,
  czech,
  danish,
  dutch,
  english,
  french,
  german,
  italian,
  japanese,
  polish,
  portugueseBrazil,
  russian,
  spanish,
  swedish,
  turkish,
  korean
}
export enum colorTheme {
  light,
  dark
}
export enum floatingButtonEdge {
  left,
  right
}
export enum IBGPosition {
  bottomRight,
  topRight,
  bottomLeft,
  topLeft
}
export enum welcomeMessageMode {
  live,
  beta,
  disabled
}
export enum actionTypes {
  allActions,
  reportBug,
  requestNewFeature,
  addCommentToFeature
}
export enum strings {
  shakeHint,
  swipeHint,
  edgeSwipeStartHint,
  startAlertText,
  invalidEmailMessage,
  invalidEmailTitle,
  invalidCommentMessage,
  invalidCommentTitle,
  invocationHeader,
  startChats,
  reportQuestion,
  reportBug,
  reportFeedback,
  emailFieldHint,
  commentFieldHintForBugReport,
  commentFieldHintForFeedback,
  commentFieldHintForQuestion,
  addVideoMessage,
  addVoiceMessage,
  addImageFromGallery,
  addExtraScreenshot,
  audioRecordingPermissionDeniedTitle,
  audioRecordingPermissionDeniedMessage,
  microphonePermissionAlertSettingsButtonText,
  recordingMessageToHoldText,
  recordingMessageToReleaseText,
  conversationsHeaderTitle,
  screenshotHeaderTitle,
  chatsNoConversationsHeadlineText,
  doneButtonText,
  okButtonText,
  cancelButtonText,
  thankYouText,
  audio,
  video,
  image,
  chatsHeaderTitle,
  team,
  messagesNotification,
  messagesNotificationAndOthers,
  conversationTextFieldHint,
  collectingDataText,
  thankYouAlertText,
  welcomeMessageBetaWelcomeStepTitle,
  welcomeMessageBetaWelcomeStepContent,
  welcomeMessageBetaHowToReportStepTitle,
  welcomeMessageBetaHowToReportStepContent,
  welcomeMessageBetaFinishStepTitle,
  welcomeMessageBetaFinishStepContent,
  welcomeMessageLiveWelcomeStepTitle,
  welcomeMessageLiveWelcomeStepContent,
  surveysCustomThanksTitle,
  surveysCustomThanksSubTitle,
  surveysStoreRatingThanksTitle,
  surveysStoreRatingThanksSubtitle,
  reportBugDescription,
  reportFeedbackDescription,
  reportQuestionDescription,
  requestFeatureDescription
}

interface Report {
  logDebug(log: string): void;
  logVerbose(log: string): void;
  logWarn(log: string): void;
  logError(log: string): void;
  logInfo(log: string): void;
  appendTag(tag: string): void;
  appendConsoleLog(consoleLog: string): void;
  setUserAttribute(key: string, value: string): void;
  addFileAttachmentWithUrl(url: string, filename: string): void;
  addFileAttachmentWithData(data: string, filename: string): void;
}

interface Survey {
  title: string;
}
