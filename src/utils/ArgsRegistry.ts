import { NativeInstabug } from '../native';

const NativeConstants = NativeInstabug.getConstants();

/**
 * @deprecated Pass a `LogLevel` to `debugLogsLevel` in `Instabug.init` instead.
 *
 * Verbosity level of the SDK debug logs. This has nothing to do with IBGLog,
 * and only affect the logs used to debug the SDK itself.
 */
export enum sdkDebugLogsLevel {
  sdkDebugLogsLevelVerbose = NativeConstants.sdkDebugLogsLevelVerbose,
  sdkDebugLogsLevelDebug = NativeConstants.sdkDebugLogsLevelDebug,
  sdkDebugLogsLevelError = NativeConstants.sdkDebugLogsLevelError,
  sdkDebugLogsLevelNone = NativeConstants.sdkDebugLogsLevelNone,
}

/**
 * @deprecated Pass a `LogLevel` to `debugLogsLevel` in `Instabug.init` instead.
 *
 * APM Log Level.
 */
export enum logLevel {
  none = NativeConstants.logLevelNone,
  error = NativeConstants.logLevelError,
  warning = NativeConstants.logLevelWarning,
  info = NativeConstants.logLevelInfo,
  debug = NativeConstants.logLevelDebug,
  verbose = NativeConstants.logLevelVerbose,
}

/**
 * @deprecated Use `InvocationEvent` instead.
 *
 * The event used to invoke the feedback form
 */
export enum invocationEvent {
  none = NativeConstants.invocationEventNone,
  shake = NativeConstants.invocationEventShake,
  screenshot = NativeConstants.invocationEventScreenshot,
  twoFingersSwipe = NativeConstants.invocationEventTwoFingersSwipeLeft,
  floatingButton = NativeConstants.invocationEventFloatingButton,
}

/**
 * @deprecated Use `InvocationOption` instead.
 *
 * Options added while invoking bug reporting.
 */
export enum option {
  emailFieldHidden = NativeConstants.optionEmailFieldHidden,
  emailFieldOptional = NativeConstants.optionEmailFieldOptional,
  commentFieldRequired = NativeConstants.optionCommentFieldRequired,
  disablePostSendingDialog = NativeConstants.optionDisablePostSendingDialog,
}

/**
 * @deprecated Use `ColorTheme` instead.
 *
 * The color theme of the different UI elements
 */
export enum colorTheme {
  light = NativeConstants.colorThemeLight,
  dark = NativeConstants.colorThemeDark,
}

/**
 * @deprecated Use `FloatingButtonPosition` instead.
 *
 * Floating Button edges
 */
export enum floatingButtonEdge {
  left = NativeConstants.rectMinXEdge,
  right = NativeConstants.rectMaxXEdge,
}

/**
 * @deprecated Use `RecordingButtonPosition` instead.
 *
 * NativeConstants floating buttons positions.
 */
export enum position {
  bottomRight = NativeConstants.bottomRight,
  topRight = NativeConstants.topRight,
  bottomLeft = NativeConstants.bottomLeft,
  topLeft = NativeConstants.topLeft,
}

/**
 * @deprecated Use `RecordingButtonPosition` instead.
 *
 * NativeConstants floating buttons positions.
 */
export enum IBGPosition {
  bottomRight = NativeConstants.bottomRight,
  topRight = NativeConstants.topRight,
  bottomLeft = NativeConstants.bottomLeft,
  topLeft = NativeConstants.topLeft,
}

/**
 * @deprecated Use `WelcomeMessageMode` instead.
 *
 * The welcome message mode.
 */
export enum welcomeMessageMode {
  live = NativeConstants.welcomeMessageModeLive,
  beta = NativeConstants.welcomeMessageModeBeta,
  disabled = NativeConstants.welcomeMessageModeDisabled,
}

/**
 * @deprecated Use `ReportType` instead.
 *
 * Type of the report either feedback or bug.
 */
export enum reportType {
  bug = NativeConstants.bugReportingReportTypeBug,
  feedback = NativeConstants.bugReportingReportTypeFeedback,
  question = NativeConstants.bugReportingReportTypeQuestion,
}

/**
 * @deprecated Use `DismissType` instead.
 *
 * Type of SDK dismiss
 */
export enum dismissType {
  submit = NativeConstants.dismissTypeSubmit,
  cancel = NativeConstants.dismissTypeCancel,
  addAttachment = NativeConstants.dismissTypeAddAttachment,
}

/**
 * @deprecated Use `ActionType` instead.
 *
 * NativeConstants action types.
 */
export enum actionTypes {
  allActions = NativeConstants.allActions,
  reportBug = NativeConstants.reportBugAction,
  requestNewFeature = NativeConstants.requestNewFeature,
  addCommentToFeature = NativeConstants.addCommentToFeature,
}

/**
 * @deprecated Use `ExtendedBugReportMode` instead.
 *
 * The extended bug report mode
 */
export enum extendedBugReportMode {
  enabledWithRequiredFields = NativeConstants.enabledWithRequiredFields,
  enabledWithOptionalFields = NativeConstants.enabledWithOptionalFields,
  disabled = NativeConstants.disabled,
}

/**
 * @deprecated Use `ReproStepsMode` instead.
 *
 * The user steps option.
 */
export enum reproStepsMode {
  enabled = NativeConstants.reproStepsEnabled,
  disabled = NativeConstants.reproStepsDisabled,
  enabledWithNoScreenshots = NativeConstants.reproStepsEnabledWithNoScreenshots,
}

/**
 * @deprecated Use `Locale` instead.
 *
 * The supported locales
 */
export enum locale {
  arabic = NativeConstants.localeArabic,
  azerbaijani = NativeConstants.localeAzerbaijani,
  chineseSimplified = NativeConstants.localeChineseSimplified,
  chineseTraditional = NativeConstants.localeChineseTraditional,
  czech = NativeConstants.localeCzech,
  danish = NativeConstants.localeDanish,
  dutch = NativeConstants.localeDutch,
  english = NativeConstants.localeEnglish,
  french = NativeConstants.localeFrench,
  german = NativeConstants.localeGerman,
  italian = NativeConstants.localeItalian,
  japanese = NativeConstants.localeJapanese,
  korean = NativeConstants.localeKorean,
  polish = NativeConstants.localePolish,
  portugueseBrazil = NativeConstants.localePortugueseBrazil,
  romanian = NativeConstants.localeRomanian,
  russian = NativeConstants.localeRussian,
  spanish = NativeConstants.localeSpanish,
  swedish = NativeConstants.localeSwedish,
  turkish = NativeConstants.localeTurkish,
}

/**
 * @deprecated Use `StringKey` instead.
 *
 * NativeConstants strings
 */
export enum strings {
  shakeHint = NativeConstants.shakeHint,
  swipeHint = NativeConstants.swipeHint,
  edgeSwipeStartHint = NativeConstants.edgeSwipeStartHint,
  startAlertText = NativeConstants.startAlertText,
  invalidEmailMessage = NativeConstants.invalidEmailMessage,
  invalidEmailTitle = NativeConstants.invalidEmailTitle,
  invalidCommentMessage = NativeConstants.invalidCommentMessage,
  invalidCommentTitle = NativeConstants.invalidCommentTitle,
  invocationHeader = NativeConstants.invocationHeader,
  reportQuestion = NativeConstants.reportQuestion,
  reportBug = NativeConstants.reportBug,
  reportFeedback = NativeConstants.reportFeedback,
  emailFieldHint = NativeConstants.emailFieldHint,
  commentFieldHintForBugReport = NativeConstants.commentFieldHintForBugReport,
  commentFieldHintForFeedback = NativeConstants.commentFieldHintForFeedback,
  commentFieldHintForQuestion = NativeConstants.commentFieldHintForQuestion,
  videoPressRecord = NativeConstants.videoPressRecord,
  addVideoMessage = NativeConstants.addVideoMessage,
  addVoiceMessage = NativeConstants.addVoiceMessage,
  addImageFromGallery = NativeConstants.addImageFromGallery,
  addExtraScreenshot = NativeConstants.addExtraScreenshot,
  audioRecordingPermissionDeniedTitle = NativeConstants.audioRecordingPermissionDeniedTitle,
  audioRecordingPermissionDeniedMessage = NativeConstants.audioRecordingPermissionDeniedMessage,
  microphonePermissionAlertSettingsButtonText = NativeConstants.microphonePermissionAlertSettingsButtonTitle,
  recordingMessageToHoldText = NativeConstants.recordingMessageToHoldText,
  recordingMessageToReleaseText = NativeConstants.recordingMessageToReleaseText,
  conversationsHeaderTitle = NativeConstants.conversationsHeaderTitle,
  screenshotHeaderTitle = NativeConstants.screenshotHeaderTitle,
  okButtonText = NativeConstants.okButtonTitle,
  cancelButtonText = NativeConstants.cancelButtonTitle,
  thankYouText = NativeConstants.thankYouText,
  audio = NativeConstants.audio,
  image = NativeConstants.image,
  team = NativeConstants.team,
  messagesNotification = NativeConstants.messagesNotification,
  messagesNotificationAndOthers = NativeConstants.messagesNotificationAndOthers,
  conversationTextFieldHint = NativeConstants.conversationTextFieldHint,
  collectingDataText = NativeConstants.collectingDataText,
  thankYouAlertText = NativeConstants.thankYouAlertText,
  welcomeMessageBetaWelcomeStepTitle = NativeConstants.welcomeMessageBetaWelcomeStepTitle,
  welcomeMessageBetaWelcomeStepContent = NativeConstants.welcomeMessageBetaWelcomeStepContent,
  welcomeMessageBetaHowToReportStepTitle = NativeConstants.welcomeMessageBetaHowToReportStepTitle,
  welcomeMessageBetaHowToReportStepContent = NativeConstants.welcomeMessageBetaHowToReportStepContent,
  welcomeMessageBetaFinishStepTitle = NativeConstants.welcomeMessageBetaFinishStepTitle,
  welcomeMessageBetaFinishStepContent = NativeConstants.welcomeMessageBetaFinishStepContent,
  welcomeMessageLiveWelcomeStepTitle = NativeConstants.welcomeMessageLiveWelcomeStepTitle,
  welcomeMessageLiveWelcomeStepContent = NativeConstants.welcomeMessageLiveWelcomeStepContent,
  surveysStoreRatingThanksTitle = NativeConstants.surveysStoreRatingThanksTitle,
  surveysStoreRatingThanksSubtitle = NativeConstants.surveysStoreRatingThanksSubtitle,
  reportBugDescription = NativeConstants.reportBugDescription,
  reportFeedbackDescription = NativeConstants.reportFeedbackDescription,
  reportQuestionDescription = NativeConstants.reportQuestionDescription,
  requestFeatureDescription = NativeConstants.requestFeatureDescription,
  discardAlertTitle = NativeConstants.discardAlertTitle,
  discardAlertMessage = NativeConstants.discardAlertMessage,
  discardAlertCancel = NativeConstants.discardAlertCancel,
  discardAlertAction = NativeConstants.discardAlertAction,
  addAttachmentButtonTitleStringName = NativeConstants.addAttachmentButtonTitleStringName,
  reportReproStepsDisclaimerBody = NativeConstants.reportReproStepsDisclaimerBody,
  reportReproStepsDisclaimerLink = NativeConstants.reportReproStepsDisclaimerLink,
  reproStepsProgressDialogBody = NativeConstants.reproStepsProgressDialogBody,
  reproStepsListHeader = NativeConstants.reproStepsListHeader,
  reproStepsListDescription = NativeConstants.reproStepsListDescription,
  reproStepsListEmptyStateDescription = NativeConstants.reproStepsListEmptyStateDescription,
  reproStepsListItemTitle = NativeConstants.reproStepsListItemTitle,
  screenRecording = NativeConstants.screenRecording,
  insufficientContentMessage = NativeConstants.insufficientContentMessage,
  insufficientContentTitle = NativeConstants.insufficientContentTitle,
}
