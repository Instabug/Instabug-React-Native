import { NativeInstabug } from '../native/NativeInstabug';

const constants = NativeInstabug.getConstants();

/**
 * Verbosity level of the SDK debug logs. This has nothing to do with `Instabug.log`,
 * and only affect the logs used to debug the SDK itself.
 */
export enum LogLevel {
  verbose = constants.sdkDebugLogsLevelVerbose,
  debug = constants.sdkDebugLogsLevelDebug,
  error = constants.sdkDebugLogsLevelError,
  none = constants.sdkDebugLogsLevelNone,
}

/**
 * The event used to invoke the feedback form.
 */
export enum InvocationEvent {
  none = constants.invocationEventNone,
  shake = constants.invocationEventShake,
  screenshot = constants.invocationEventScreenshot,
  twoFingersSwipe = constants.invocationEventTwoFingersSwipeLeft,
  floatingButton = constants.invocationEventFloatingButton,
}

/**
 * Options added while invoking bug reporting.
 */
export enum InvocationOption {
  emailFieldHidden = constants.optionEmailFieldHidden,
  emailFieldOptional = constants.optionEmailFieldOptional,
  commentFieldRequired = constants.optionCommentFieldRequired,
  disablePostSendingDialog = constants.optionDisablePostSendingDialog,
}

/**
 * The color theme of the different UI elements.
 */
export enum ColorTheme {
  light = constants.colorThemeLight,
  dark = constants.colorThemeDark,
}

/**
 * Floating button positions.
 */
export enum FloatingButtonPosition {
  left = constants.rectMinXEdge,
  right = constants.rectMaxXEdge,
}

/**
 * Video recording button positions.
 */
export enum RecordingButtonPosition {
  bottomRight = constants.bottomRight,
  topRight = constants.topRight,
  bottomLeft = constants.bottomLeft,
  topLeft = constants.topLeft,
}

/**
 * The welcome message mode.
 */
export enum WelcomeMessageMode {
  live = constants.welcomeMessageModeLive,
  beta = constants.welcomeMessageModeBeta,
  disabled = constants.welcomeMessageModeDisabled,
}

/**
 * Type of the report either feedback or bug.
 */
export enum ReportType {
  bug = constants.bugReportingReportTypeBug,
  feedback = constants.bugReportingReportTypeFeedback,
  question = constants.bugReportingReportTypeQuestion,
}

/**
 * Type of SDK dismiss.
 */
export enum DismissType {
  submit = constants.dismissTypeSubmit,
  cancel = constants.dismissTypeCancel,
  addAttachment = constants.dismissTypeAddAttachment,
}

/**
 * Types of possible actions inside Feature Requests.
 */
export enum ActionType {
  all = constants.allActions,
  reportBug = constants.reportBugAction,
  requestNewFeature = constants.requestNewFeature,
  addCommentToFeature = constants.addCommentToFeature,
}

/**
 * The extended bug report mode.
 */
export enum ExtendedBugReportMode {
  enabledWithRequiredFields = constants.enabledWithRequiredFields,
  enabledWithOptionalFields = constants.enabledWithOptionalFields,
  disabled = constants.disabled,
}

/**
 * The user steps option.
 */
export enum ReproStepsMode {
  enabledWithNoScreenshots = constants.reproStepsEnabledWithNoScreenshots,
  enabled = constants.reproStepsEnabled,
  disabled = constants.reproStepsDisabled,
}

/**
 * Supported locales
 */
export enum Locale {
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
 * Overridable strings in Instabug's UI
 */
export enum StringKey {
  addAttachmentButtonTitleStringName = constants.addAttachmentButtonTitleStringName,
  addExtraScreenshot = constants.addExtraScreenshot,
  addImageFromGallery = constants.addImageFromGallery,
  addVideoMessage = constants.addVideoMessage,
  addVoiceMessage = constants.addVoiceMessage,
  audio = constants.audio,
  audioRecordingPermissionDeniedMessage = constants.audioRecordingPermissionDeniedMessage,
  audioRecordingPermissionDeniedTitle = constants.audioRecordingPermissionDeniedTitle,
  cancelButtonText = constants.cancelButtonTitle,
  collectingDataText = constants.collectingDataText,
  commentFieldHintForBugReport = constants.commentFieldHintForBugReport,
  commentFieldHintForFeedback = constants.commentFieldHintForFeedback,
  commentFieldHintForQuestion = constants.commentFieldHintForQuestion,
  conversationsHeaderTitle = constants.conversationsHeaderTitle,
  conversationTextFieldHint = constants.conversationTextFieldHint,
  discardAlertDiscard = constants.discardAlertDiscard,
  discardAlertStay = constants.discardAlertStay,
  discardAlertMessage = constants.discardAlertMessage,
  discardAlertTitle = constants.discardAlertTitle,
  edgeSwipeStartHint = constants.edgeSwipeStartHint,
  emailFieldHint = constants.emailFieldHint,
  image = constants.image,

  insufficientContentMessage = constants.insufficientContentMessage,
  /** iOS only */
  insufficientContentTitle = constants.insufficientContentTitle,
  /** @deprecated Use {@link insufficientContentMessage} instead. */
  invalidCommentMessage = constants.invalidCommentMessage,
  /** @deprecated Use {@link insufficientContentTitle} instead. */
  invalidCommentTitle = constants.invalidCommentTitle,

  invalidEmailMessage = constants.invalidEmailMessage,
  invalidEmailTitle = constants.invalidEmailTitle,
  invocationHeader = constants.invocationHeader,
  messagesNotification = constants.messagesNotification,
  messagesNotificationAndOthers = constants.messagesNotificationAndOthers,
  microphonePermissionAlertSettingsButtonText = constants.microphonePermissionAlertSettingsButtonTitle,
  okButtonText = constants.okButtonTitle,
  recordingMessageToHoldText = constants.recordingMessageToHoldText,
  recordingMessageToReleaseText = constants.recordingMessageToReleaseText,
  reportBug = constants.reportBug,
  reportBugDescription = constants.reportBugDescription,
  reportFeedback = constants.reportFeedback,
  reportFeedbackDescription = constants.reportFeedbackDescription,
  reportQuestion = constants.reportQuestion,
  reportQuestionDescription = constants.reportQuestionDescription,
  reportReproStepsDisclaimerBody = constants.reportReproStepsDisclaimerBody,
  reportReproStepsDisclaimerLink = constants.reportReproStepsDisclaimerLink,
  reproStepsListDescription = constants.reproStepsListDescription,
  reproStepsListEmptyStateDescription = constants.reproStepsListEmptyStateDescription,
  reproStepsListHeader = constants.reproStepsListHeader,
  reproStepsListItemNumberingTitle = constants.reproStepsListItemNumberingTitle,
  reproStepsProgressDialogBody = constants.reproStepsProgressDialogBody,
  requestFeatureDescription = constants.requestFeatureDescription,
  screenRecording = constants.screenRecording,
  screenshotHeaderTitle = constants.screenshotHeaderTitle,
  shakeHint = constants.shakeHint,
  startAlertText = constants.startAlertText,
  surveysStoreRatingThanksSubtitle = constants.surveysStoreRatingThanksSubtitle,
  surveysStoreRatingThanksTitle = constants.surveysStoreRatingThanksTitle,
  swipeHint = constants.swipeHint,
  team = constants.team,
  thankYouAlertText = constants.thankYouAlertText,
  thankYouText = constants.thankYouText,
  videoPressRecord = constants.videoPressRecord,
  welcomeMessageBetaFinishStepContent = constants.welcomeMessageBetaFinishStepContent,
  welcomeMessageBetaFinishStepTitle = constants.welcomeMessageBetaFinishStepTitle,
  welcomeMessageBetaHowToReportStepContent = constants.welcomeMessageBetaHowToReportStepContent,
  welcomeMessageBetaHowToReportStepTitle = constants.welcomeMessageBetaHowToReportStepTitle,
  welcomeMessageBetaWelcomeStepContent = constants.welcomeMessageBetaWelcomeStepContent,
  welcomeMessageBetaWelcomeStepTitle = constants.welcomeMessageBetaWelcomeStepTitle,
  welcomeMessageLiveWelcomeStepContent = constants.welcomeMessageLiveWelcomeStepContent,
  welcomeMessageLiveWelcomeStepTitle = constants.welcomeMessageLiveWelcomeStepTitle,
}
