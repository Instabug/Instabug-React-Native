import { NativeInstabug } from '../native/NativeInstabug';

const constants = NativeInstabug.getConstants();

/**
 * @deprecated Pass a `LogLevel` to `debugLogsLevel` in `Instabug.init` instead.
 *
 * Verbosity level of the SDK debug logs. This has nothing to do with IBGLog,
 * and only affect the logs used to debug the SDK itself.
 */
export enum sdkDebugLogsLevel {
  sdkDebugLogsLevelVerbose = constants.sdkDebugLogsLevelVerbose,
  sdkDebugLogsLevelDebug = constants.sdkDebugLogsLevelDebug,
  sdkDebugLogsLevelError = constants.sdkDebugLogsLevelError,
  sdkDebugLogsLevelNone = constants.sdkDebugLogsLevelNone,
}

/**
 * @deprecated Pass a `LogLevel` to `debugLogsLevel` in `Instabug.init` instead.
 *
 * APM Log Level.
 */
export enum logLevel {
  none = constants.logLevelNone,
  error = constants.logLevelError,
  warning = constants.logLevelWarning,
  info = constants.logLevelInfo,
  debug = constants.logLevelDebug,
  verbose = constants.logLevelVerbose,
}

/**
 * @deprecated Use `InvocationEvent` instead.
 *
 * The event used to invoke the feedback form
 */
export enum invocationEvent {
  none = constants.invocationEventNone,
  shake = constants.invocationEventShake,
  screenshot = constants.invocationEventScreenshot,
  twoFingersSwipe = constants.invocationEventTwoFingersSwipeLeft,
  floatingButton = constants.invocationEventFloatingButton,
}

/**
 * @deprecated Use `InvocationOption` instead.
 *
 * Options added while invoking bug reporting.
 */
export enum option {
  emailFieldHidden = constants.optionEmailFieldHidden,
  emailFieldOptional = constants.optionEmailFieldOptional,
  commentFieldRequired = constants.optionCommentFieldRequired,
  disablePostSendingDialog = constants.optionDisablePostSendingDialog,
}

/**
 * @deprecated Use `ColorTheme` instead.
 *
 * The color theme of the different UI elements
 */
export enum colorTheme {
  light = constants.colorThemeLight,
  dark = constants.colorThemeDark,
}

/**
 * @deprecated Use `FloatingButtonPosition` instead.
 *
 * Floating Button edges
 */
export enum floatingButtonEdge {
  left = constants.rectMinXEdge,
  right = constants.rectMaxXEdge,
}

/**
 * @deprecated Use `RecordingButtonPosition` instead.
 *
 * constants floating buttons positions.
 */
export enum position {
  bottomRight = constants.bottomRight,
  topRight = constants.topRight,
  bottomLeft = constants.bottomLeft,
  topLeft = constants.topLeft,
}

/**
 * @deprecated Use `RecordingButtonPosition` instead.
 *
 * constants floating buttons positions.
 */
export enum IBGPosition {
  bottomRight = constants.bottomRight,
  topRight = constants.topRight,
  bottomLeft = constants.bottomLeft,
  topLeft = constants.topLeft,
}

/**
 * @deprecated Use `WelcomeMessageMode` instead.
 *
 * The welcome message mode.
 */
export enum welcomeMessageMode {
  live = constants.welcomeMessageModeLive,
  beta = constants.welcomeMessageModeBeta,
  disabled = constants.welcomeMessageModeDisabled,
}

/**
 * @deprecated Use `ReportType` instead.
 *
 * Type of the report either feedback or bug.
 */
export enum reportType {
  bug = constants.bugReportingReportTypeBug,
  feedback = constants.bugReportingReportTypeFeedback,
  question = constants.bugReportingReportTypeQuestion,
  other = constants.bugReportingReportTypeOther,
}

/**
 * @deprecated Use `DismissType` instead.
 *
 * Type of SDK dismiss
 */
export enum dismissType {
  submit = constants.dismissTypeSubmit,
  cancel = constants.dismissTypeCancel,
  addAttachment = constants.dismissTypeAddAttachment,
}

/**
 * @deprecated Use `ActionType` instead.
 *
 * constants action types.
 */
export enum actionTypes {
  allActions = constants.allActions,
  reportBug = constants.reportBugAction,
  requestNewFeature = constants.requestNewFeature,
  addCommentToFeature = constants.addCommentToFeature,
}

/**
 * @deprecated Use `ExtendedBugReportMode` instead.
 *
 * The extended bug report mode
 */
export enum extendedBugReportMode {
  enabledWithRequiredFields = constants.enabledWithRequiredFields,
  enabledWithOptionalFields = constants.enabledWithOptionalFields,
  disabled = constants.disabled,
}

/**
 * @deprecated Use `ReproStepsMode` instead.
 *
 * The user steps option.
 */
export enum reproStepsMode {
  enabled = constants.reproStepsEnabled,
  disabled = constants.reproStepsDisabled,
  enabledWithNoScreenshots = constants.reproStepsEnabledWithNoScreenshots,
}

/**
 * @deprecated Use `Locale` instead.
 *
 * The supported locales
 */
export enum locale {
  arabic = constants.localeArabic,
  azerbaijani = constants.localeAzerbaijani,
  chineseSimplified = constants.localeChineseSimplified,
  chineseTraditional = constants.localeChineseTraditional,
  czech = constants.localeCzech,
  danish = constants.localeDanish,
  dutch = constants.localeDutch,
  english = constants.localeEnglish,
  french = constants.localeFrench,
  german = constants.localeGerman,
  italian = constants.localeItalian,
  japanese = constants.localeJapanese,
  korean = constants.localeKorean,
  polish = constants.localePolish,
  portugueseBrazil = constants.localePortugueseBrazil,
  romanian = constants.localeRomanian,
  russian = constants.localeRussian,
  spanish = constants.localeSpanish,
  swedish = constants.localeSwedish,
  turkish = constants.localeTurkish,
}

/**
 * @deprecated Use `StringKey` instead.
 *
 * constants strings
 */
export enum strings {
  shakeHint = constants.shakeHint,
  swipeHint = constants.swipeHint,
  edgeSwipeStartHint = constants.edgeSwipeStartHint,
  startAlertText = constants.startAlertText,
  invalidEmailMessage = constants.invalidEmailMessage,
  invalidEmailTitle = constants.invalidEmailTitle,
  invalidCommentMessage = constants.invalidCommentMessage,
  invalidCommentTitle = constants.invalidCommentTitle,
  invocationHeader = constants.invocationHeader,
  reportQuestion = constants.reportQuestion,
  reportBug = constants.reportBug,
  reportFeedback = constants.reportFeedback,
  emailFieldHint = constants.emailFieldHint,
  commentFieldHintForBugReport = constants.commentFieldHintForBugReport,
  commentFieldHintForFeedback = constants.commentFieldHintForFeedback,
  commentFieldHintForQuestion = constants.commentFieldHintForQuestion,
  videoPressRecord = constants.videoPressRecord,
  addVideoMessage = constants.addVideoMessage,
  addVoiceMessage = constants.addVoiceMessage,
  addImageFromGallery = constants.addImageFromGallery,
  addExtraScreenshot = constants.addExtraScreenshot,
  audioRecordingPermissionDeniedTitle = constants.audioRecordingPermissionDeniedTitle,
  audioRecordingPermissionDeniedMessage = constants.audioRecordingPermissionDeniedMessage,
  microphonePermissionAlertSettingsButtonText = constants.microphonePermissionAlertSettingsButtonTitle,
  recordingMessageToHoldText = constants.recordingMessageToHoldText,
  recordingMessageToReleaseText = constants.recordingMessageToReleaseText,
  conversationsHeaderTitle = constants.conversationsHeaderTitle,
  screenshotHeaderTitle = constants.screenshotHeaderTitle,
  okButtonText = constants.okButtonTitle,
  cancelButtonText = constants.cancelButtonTitle,
  thankYouText = constants.thankYouText,
  audio = constants.audio,
  image = constants.image,
  team = constants.team,
  messagesNotification = constants.messagesNotification,
  messagesNotificationAndOthers = constants.messagesNotificationAndOthers,
  conversationTextFieldHint = constants.conversationTextFieldHint,
  collectingDataText = constants.collectingDataText,
  thankYouAlertText = constants.thankYouAlertText,
  welcomeMessageBetaWelcomeStepTitle = constants.welcomeMessageBetaWelcomeStepTitle,
  welcomeMessageBetaWelcomeStepContent = constants.welcomeMessageBetaWelcomeStepContent,
  welcomeMessageBetaHowToReportStepTitle = constants.welcomeMessageBetaHowToReportStepTitle,
  welcomeMessageBetaHowToReportStepContent = constants.welcomeMessageBetaHowToReportStepContent,
  welcomeMessageBetaFinishStepTitle = constants.welcomeMessageBetaFinishStepTitle,
  welcomeMessageBetaFinishStepContent = constants.welcomeMessageBetaFinishStepContent,
  welcomeMessageLiveWelcomeStepTitle = constants.welcomeMessageLiveWelcomeStepTitle,
  welcomeMessageLiveWelcomeStepContent = constants.welcomeMessageLiveWelcomeStepContent,
  surveysStoreRatingThanksTitle = constants.surveysStoreRatingThanksTitle,
  surveysStoreRatingThanksSubtitle = constants.surveysStoreRatingThanksSubtitle,
  reportBugDescription = constants.reportBugDescription,
  reportFeedbackDescription = constants.reportFeedbackDescription,
  reportQuestionDescription = constants.reportQuestionDescription,
  requestFeatureDescription = constants.requestFeatureDescription,
  discardAlertTitle = constants.discardAlertTitle,
  discardAlertMessage = constants.discardAlertMessage,
  discardAlertCancel = constants.discardAlertCancel,
  discardAlertAction = constants.discardAlertAction,
  addAttachmentButtonTitleStringName = constants.addAttachmentButtonTitleStringName,
  reportReproStepsDisclaimerBody = constants.reportReproStepsDisclaimerBody,
  reportReproStepsDisclaimerLink = constants.reportReproStepsDisclaimerLink,
  reproStepsProgressDialogBody = constants.reproStepsProgressDialogBody,
  reproStepsListHeader = constants.reproStepsListHeader,
  reproStepsListDescription = constants.reproStepsListDescription,
  reproStepsListEmptyStateDescription = constants.reproStepsListEmptyStateDescription,
  reproStepsListItemTitle = constants.reproStepsListItemTitle,
  screenRecording = constants.screenRecording,
  insufficientContentMessage = constants.insufficientContentMessage,
  insufficientContentTitle = constants.insufficientContentTitle,
}
