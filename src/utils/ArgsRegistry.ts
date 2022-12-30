import { NativeInstabug } from '../native';

/**
 * @deprecated Pass a `LogLevel` to `debugLogsLevel` in `Instabug.init` instead.
 *
 * Verbosity level of the SDK debug logs. This has nothing to do with IBGLog,
 * and only affect the logs used to debug the SDK itself.
 */
export enum sdkDebugLogsLevel {
  sdkDebugLogsLevelVerbose = NativeInstabug.sdkDebugLogsLevelVerbose,
  sdkDebugLogsLevelDebug = NativeInstabug.sdkDebugLogsLevelDebug,
  sdkDebugLogsLevelError = NativeInstabug.sdkDebugLogsLevelError,
  sdkDebugLogsLevelNone = NativeInstabug.sdkDebugLogsLevelNone,
}

/**
 * @deprecated Pass a `LogLevel` to `debugLogsLevel` in `Instabug.init` instead.
 *
 * APM Log Level.
 */
export enum logLevel {
  none = NativeInstabug.logLevelNone,
  error = NativeInstabug.logLevelError,
  warning = NativeInstabug.logLevelWarning,
  info = NativeInstabug.logLevelInfo,
  debug = NativeInstabug.logLevelDebug,
  verbose = NativeInstabug.logLevelVerbose,
}

/**
 * The event used to invoke the feedback form
 */
export enum invocationEvent {
  none = NativeInstabug.invocationEventNone,
  shake = NativeInstabug.invocationEventShake,
  screenshot = NativeInstabug.invocationEventScreenshot,
  twoFingersSwipe = NativeInstabug.invocationEventTwoFingersSwipeLeft,
  floatingButton = NativeInstabug.invocationEventFloatingButton,
}

/**
 * Options added while invoking bug reporting.
 */
export enum option {
  emailFieldHidden = NativeInstabug.optionEmailFieldHidden,
  emailFieldOptional = NativeInstabug.optionEmailFieldOptional,
  commentFieldRequired = NativeInstabug.optionCommentFieldRequired,
  disablePostSendingDialog = NativeInstabug.optionDisablePostSendingDialog,
}

/**
 * The color theme of the different UI elements
 */
export enum colorTheme {
  light = NativeInstabug.colorThemeLight,
  dark = NativeInstabug.colorThemeDark,
}

/**
 * Floating Button edges
 */
export enum floatingButtonEdge {
  left = NativeInstabug.rectMinXEdge,
  right = NativeInstabug.rectMaxXEdge,
}

/**
 * NativeInstabug floating buttons positions.
 */
export enum position {
  bottomRight = NativeInstabug.bottomRight,
  topRight = NativeInstabug.topRight,
  bottomLeft = NativeInstabug.bottomLeft,
  topLeft = NativeInstabug.topLeft,
}

/**
 * NativeInstabug floating buttons positions.
 */
export enum IBGPosition {
  bottomRight = NativeInstabug.bottomRight,
  topRight = NativeInstabug.topRight,
  bottomLeft = NativeInstabug.bottomLeft,
  topLeft = NativeInstabug.topLeft,
}

/**
 * The welcome message mode.
 */
export enum welcomeMessageMode {
  live = NativeInstabug.welcomeMessageModeLive,
  beta = NativeInstabug.welcomeMessageModeBeta,
  disabled = NativeInstabug.welcomeMessageModeDisabled,
}

/**
 * Type of the report either feedback or bug.
 */
export enum reportType {
  bug = NativeInstabug.bugReportingReportTypeBug,
  feedback = NativeInstabug.bugReportingReportTypeFeedback,
  question = NativeInstabug.bugReportingReportTypeQuestion,
}

/**
 * Type of SDK dismiss
 */
export enum dismissType {
  submit = NativeInstabug.dismissTypeSubmit,
  cancel = NativeInstabug.dismissTypeCancel,
  addAttachment = NativeInstabug.dismissTypeAddAttachment,
}

/**
 * NativeInstabug action types.
 */
export enum actionTypes {
  allActions = NativeInstabug.allActions,
  reportBug = NativeInstabug.reportBugAction,
  requestNewFeature = NativeInstabug.requestNewFeature,
  addCommentToFeature = NativeInstabug.addCommentToFeature,
}

/**
 * The extended bug report mode
 */
export enum extendedBugReportMode {
  enabledWithRequiredFields = NativeInstabug.enabledWithRequiredFields,
  enabledWithOptionalFields = NativeInstabug.enabledWithOptionalFields,
  disabled = NativeInstabug.disabled,
}

/**
 * The user steps option.
 */
export enum reproStepsMode {
  enabled = NativeInstabug.reproStepsEnabled,
  disabled = NativeInstabug.reproStepsDisabled,
  enabledWithNoScreenshots = NativeInstabug.reproStepsEnabledWithNoScreenshots,
}

/**
 * The supported locales
 */
export enum locale {
  arabic = NativeInstabug.localeArabic,
  azerbaijani = NativeInstabug.localeAzerbaijani,
  chineseSimplified = NativeInstabug.localeChineseSimplified,
  chineseTraditional = NativeInstabug.localeChineseTraditional,
  czech = NativeInstabug.localeCzech,
  danish = NativeInstabug.localeDanish,
  dutch = NativeInstabug.localeDutch,
  english = NativeInstabug.localeEnglish,
  french = NativeInstabug.localeFrench,
  german = NativeInstabug.localeGerman,
  italian = NativeInstabug.localeItalian,
  japanese = NativeInstabug.localeJapanese,
  korean = NativeInstabug.localeKorean,
  polish = NativeInstabug.localePolish,
  portugueseBrazil = NativeInstabug.localePortugueseBrazil,
  romanian = NativeInstabug.localeRomanian,
  russian = NativeInstabug.localeRussian,
  spanish = NativeInstabug.localeSpanish,
  swedish = NativeInstabug.localeSwedish,
  turkish = NativeInstabug.localeTurkish,
}

/**
 * NativeInstabug strings
 */
export enum strings {
  shakeHint = NativeInstabug.shakeHint,
  swipeHint = NativeInstabug.swipeHint,
  edgeSwipeStartHint = NativeInstabug.edgeSwipeStartHint,
  startAlertText = NativeInstabug.startAlertText,
  invalidEmailMessage = NativeInstabug.invalidEmailMessage,
  invalidEmailTitle = NativeInstabug.invalidEmailTitle,
  invalidCommentMessage = NativeInstabug.invalidCommentMessage,
  invalidCommentTitle = NativeInstabug.invalidCommentTitle,
  invocationHeader = NativeInstabug.invocationHeader,
  reportQuestion = NativeInstabug.reportQuestion,
  reportBug = NativeInstabug.reportBug,
  reportFeedback = NativeInstabug.reportFeedback,
  emailFieldHint = NativeInstabug.emailFieldHint,
  commentFieldHintForBugReport = NativeInstabug.commentFieldHintForBugReport,
  commentFieldHintForFeedback = NativeInstabug.commentFieldHintForFeedback,
  commentFieldHintForQuestion = NativeInstabug.commentFieldHintForQuestion,
  videoPressRecord = NativeInstabug.videoPressRecord,
  addVideoMessage = NativeInstabug.addVideoMessage,
  addVoiceMessage = NativeInstabug.addVoiceMessage,
  addImageFromGallery = NativeInstabug.addImageFromGallery,
  addExtraScreenshot = NativeInstabug.addExtraScreenshot,
  audioRecordingPermissionDeniedTitle = NativeInstabug.audioRecordingPermissionDeniedTitle,
  audioRecordingPermissionDeniedMessage = NativeInstabug.audioRecordingPermissionDeniedMessage,
  microphonePermissionAlertSettingsButtonText = NativeInstabug.microphonePermissionAlertSettingsButtonTitle,
  recordingMessageToHoldText = NativeInstabug.recordingMessageToHoldText,
  recordingMessageToReleaseText = NativeInstabug.recordingMessageToReleaseText,
  conversationsHeaderTitle = NativeInstabug.conversationsHeaderTitle,
  screenshotHeaderTitle = NativeInstabug.screenshotHeaderTitle,
  okButtonText = NativeInstabug.okButtonTitle,
  cancelButtonText = NativeInstabug.cancelButtonTitle,
  thankYouText = NativeInstabug.thankYouText,
  audio = NativeInstabug.audio,
  image = NativeInstabug.image,
  team = NativeInstabug.team,
  messagesNotification = NativeInstabug.messagesNotification,
  messagesNotificationAndOthers = NativeInstabug.messagesNotificationAndOthers,
  conversationTextFieldHint = NativeInstabug.conversationTextFieldHint,
  collectingDataText = NativeInstabug.collectingDataText,
  thankYouAlertText = NativeInstabug.thankYouAlertText,
  welcomeMessageBetaWelcomeStepTitle = NativeInstabug.welcomeMessageBetaWelcomeStepTitle,
  welcomeMessageBetaWelcomeStepContent = NativeInstabug.welcomeMessageBetaWelcomeStepContent,
  welcomeMessageBetaHowToReportStepTitle = NativeInstabug.welcomeMessageBetaHowToReportStepTitle,
  welcomeMessageBetaHowToReportStepContent = NativeInstabug.welcomeMessageBetaHowToReportStepContent,
  welcomeMessageBetaFinishStepTitle = NativeInstabug.welcomeMessageBetaFinishStepTitle,
  welcomeMessageBetaFinishStepContent = NativeInstabug.welcomeMessageBetaFinishStepContent,
  welcomeMessageLiveWelcomeStepTitle = NativeInstabug.welcomeMessageLiveWelcomeStepTitle,
  welcomeMessageLiveWelcomeStepContent = NativeInstabug.welcomeMessageLiveWelcomeStepContent,
  surveysStoreRatingThanksTitle = NativeInstabug.surveysStoreRatingThanksTitle,
  surveysStoreRatingThanksSubtitle = NativeInstabug.surveysStoreRatingThanksSubtitle,
  reportBugDescription = NativeInstabug.reportBugDescription,
  reportFeedbackDescription = NativeInstabug.reportFeedbackDescription,
  reportQuestionDescription = NativeInstabug.reportQuestionDescription,
  requestFeatureDescription = NativeInstabug.requestFeatureDescription,
  discardAlertTitle = NativeInstabug.discardAlertTitle,
  discardAlertMessage = NativeInstabug.discardAlertMessage,
  discardAlertCancel = NativeInstabug.discardAlertCancel,
  discardAlertAction = NativeInstabug.discardAlertAction,
  addAttachmentButtonTitleStringName = NativeInstabug.addAttachmentButtonTitleStringName,
  reportReproStepsDisclaimerBody = NativeInstabug.reportReproStepsDisclaimerBody,
  reportReproStepsDisclaimerLink = NativeInstabug.reportReproStepsDisclaimerLink,
  reproStepsProgressDialogBody = NativeInstabug.reproStepsProgressDialogBody,
  reproStepsListHeader = NativeInstabug.reproStepsListHeader,
  reproStepsListDescription = NativeInstabug.reproStepsListDescription,
  reproStepsListEmptyStateDescription = NativeInstabug.reproStepsListEmptyStateDescription,
  reproStepsListItemTitle = NativeInstabug.reproStepsListItemTitle,
  screenRecording = NativeInstabug.screenRecording,
  insufficientContentMessage = NativeInstabug.insufficientContentMessage,
  insufficientContentTitle = NativeInstabug.insufficientContentTitle,
}
