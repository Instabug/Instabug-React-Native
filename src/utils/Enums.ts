import { NativeInstabug } from '../native';

const NativeConstants = NativeInstabug.getConstants();

/**
 * Verbosity level of the SDK debug logs. This has nothing to do with `Instabug.log`,
 * and only affect the logs used to debug the SDK itself.
 */
export enum LogLevel {
  verbose = NativeConstants.sdkDebugLogsLevelVerbose,
  debug = NativeConstants.sdkDebugLogsLevelDebug,
  error = NativeConstants.sdkDebugLogsLevelError,
  none = NativeConstants.sdkDebugLogsLevelNone,
}

/**
 * The event used to invoke the feedback form.
 */
export enum InvocationEvent {
  none = NativeConstants.invocationEventNone,
  shake = NativeConstants.invocationEventShake,
  screenshot = NativeConstants.invocationEventScreenshot,
  twoFingersSwipe = NativeConstants.invocationEventTwoFingersSwipeLeft,
  floatingButton = NativeConstants.invocationEventFloatingButton,
}

/**
 * Options added while invoking bug reporting.
 */
export enum InvocationOption {
  emailFieldHidden = NativeConstants.optionEmailFieldHidden,
  emailFieldOptional = NativeConstants.optionEmailFieldOptional,
  commentFieldRequired = NativeConstants.optionCommentFieldRequired,
  disablePostSendingDialog = NativeConstants.optionDisablePostSendingDialog,
}

/**
 * The color theme of the different UI elements.
 */
export enum ColorTheme {
  light = NativeConstants.colorThemeLight,
  dark = NativeConstants.colorThemeDark,
}

/**
 * Floating button positions.
 */
export enum FloatingButtonPosition {
  left = NativeConstants.rectMinXEdge,
  right = NativeConstants.rectMaxXEdge,
}

/**
 * Video recording button positions.
 */
export enum RecordingButtonPosition {
  bottomRight = NativeConstants.bottomRight,
  topRight = NativeConstants.topRight,
  bottomLeft = NativeConstants.bottomLeft,
  topLeft = NativeConstants.topLeft,
}

/**
 * The welcome message mode.
 */
export enum WelcomeMessageMode {
  live = NativeConstants.welcomeMessageModeLive,
  beta = NativeConstants.welcomeMessageModeBeta,
  disabled = NativeConstants.welcomeMessageModeDisabled,
}

/**
 * Type of the report either feedback or bug.
 */
export enum ReportType {
  bug = NativeConstants.bugReportingReportTypeBug,
  feedback = NativeConstants.bugReportingReportTypeFeedback,
  question = NativeConstants.bugReportingReportTypeQuestion,
}

/**
 * Type of SDK dismiss.
 */
export enum DismissType {
  submit = NativeConstants.dismissTypeSubmit,
  cancel = NativeConstants.dismissTypeCancel,
  addAttachment = NativeConstants.dismissTypeAddAttachment,
}

/**
 * Types of possible actions inside Feature Requests.
 */
export enum ActionType {
  all = NativeConstants.allActions,
  reportBug = NativeConstants.reportBugAction,
  requestNewFeature = NativeConstants.requestNewFeature,
  addCommentToFeature = NativeConstants.addCommentToFeature,
}

/**
 * The extended bug report mode.
 */
export enum ExtendedBugReportMode {
  enabledWithRequiredFields = NativeConstants.enabledWithRequiredFields,
  enabledWithOptionalFields = NativeConstants.enabledWithOptionalFields,
  disabled = NativeConstants.disabled,
}

/**
 * The user steps option.
 */
export enum ReproStepsMode {
  enabledWithNoScreenshots = NativeConstants.reproStepsEnabledWithNoScreenshots,
  enabled = NativeConstants.reproStepsEnabled,
  disabled = NativeConstants.reproStepsDisabled,
}

/**
 * Supported locales
 */
export enum Locale {
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
 * Overridable strings in Instabug's UI
 */
export enum StringKey {
  addAttachmentButtonTitleStringName = NativeConstants.addAttachmentButtonTitleStringName,
  addExtraScreenshot = NativeConstants.addExtraScreenshot,
  addImageFromGallery = NativeConstants.addImageFromGallery,
  addVideoMessage = NativeConstants.addVideoMessage,
  addVoiceMessage = NativeConstants.addVoiceMessage,
  audio = NativeConstants.audio,
  audioRecordingPermissionDeniedMessage = NativeConstants.audioRecordingPermissionDeniedMessage,
  audioRecordingPermissionDeniedTitle = NativeConstants.audioRecordingPermissionDeniedTitle,
  cancelButtonText = NativeConstants.cancelButtonTitle,
  collectingDataText = NativeConstants.collectingDataText,
  commentFieldHintForBugReport = NativeConstants.commentFieldHintForBugReport,
  commentFieldHintForFeedback = NativeConstants.commentFieldHintForFeedback,
  commentFieldHintForQuestion = NativeConstants.commentFieldHintForQuestion,
  conversationsHeaderTitle = NativeConstants.conversationsHeaderTitle,
  conversationTextFieldHint = NativeConstants.conversationTextFieldHint,
  discardAlertAction = NativeConstants.discardAlertAction,
  discardAlertCancel = NativeConstants.discardAlertCancel,
  discardAlertMessage = NativeConstants.discardAlertMessage,
  discardAlertTitle = NativeConstants.discardAlertTitle,
  edgeSwipeStartHint = NativeConstants.edgeSwipeStartHint,
  emailFieldHint = NativeConstants.emailFieldHint,
  image = NativeConstants.image,
  insufficientContentMessage = NativeConstants.insufficientContentMessage,
  insufficientContentTitle = NativeConstants.insufficientContentTitle,
  invalidCommentMessage = NativeConstants.invalidCommentMessage,
  invalidCommentTitle = NativeConstants.invalidCommentTitle,
  invalidEmailMessage = NativeConstants.invalidEmailMessage,
  invalidEmailTitle = NativeConstants.invalidEmailTitle,
  invocationHeader = NativeConstants.invocationHeader,
  messagesNotification = NativeConstants.messagesNotification,
  messagesNotificationAndOthers = NativeConstants.messagesNotificationAndOthers,
  microphonePermissionAlertSettingsButtonText = NativeConstants.microphonePermissionAlertSettingsButtonTitle,
  okButtonText = NativeConstants.okButtonTitle,
  recordingMessageToHoldText = NativeConstants.recordingMessageToHoldText,
  recordingMessageToReleaseText = NativeConstants.recordingMessageToReleaseText,
  reportBug = NativeConstants.reportBug,
  reportBugDescription = NativeConstants.reportBugDescription,
  reportFeedback = NativeConstants.reportFeedback,
  reportFeedbackDescription = NativeConstants.reportFeedbackDescription,
  reportQuestion = NativeConstants.reportQuestion,
  reportQuestionDescription = NativeConstants.reportQuestionDescription,
  reportReproStepsDisclaimerBody = NativeConstants.reportReproStepsDisclaimerBody,
  reportReproStepsDisclaimerLink = NativeConstants.reportReproStepsDisclaimerLink,
  reproStepsListDescription = NativeConstants.reproStepsListDescription,
  reproStepsListEmptyStateDescription = NativeConstants.reproStepsListEmptyStateDescription,
  reproStepsListHeader = NativeConstants.reproStepsListHeader,
  reproStepsListItemTitle = NativeConstants.reproStepsListItemTitle,
  reproStepsProgressDialogBody = NativeConstants.reproStepsProgressDialogBody,
  requestFeatureDescription = NativeConstants.requestFeatureDescription,
  screenRecording = NativeConstants.screenRecording,
  screenshotHeaderTitle = NativeConstants.screenshotHeaderTitle,
  shakeHint = NativeConstants.shakeHint,
  startAlertText = NativeConstants.startAlertText,
  surveysStoreRatingThanksSubtitle = NativeConstants.surveysStoreRatingThanksSubtitle,
  surveysStoreRatingThanksTitle = NativeConstants.surveysStoreRatingThanksTitle,
  swipeHint = NativeConstants.swipeHint,
  team = NativeConstants.team,
  thankYouAlertText = NativeConstants.thankYouAlertText,
  thankYouText = NativeConstants.thankYouText,
  videoPressRecord = NativeConstants.videoPressRecord,
  welcomeMessageBetaFinishStepContent = NativeConstants.welcomeMessageBetaFinishStepContent,
  welcomeMessageBetaFinishStepTitle = NativeConstants.welcomeMessageBetaFinishStepTitle,
  welcomeMessageBetaHowToReportStepContent = NativeConstants.welcomeMessageBetaHowToReportStepContent,
  welcomeMessageBetaHowToReportStepTitle = NativeConstants.welcomeMessageBetaHowToReportStepTitle,
  welcomeMessageBetaWelcomeStepContent = NativeConstants.welcomeMessageBetaWelcomeStepContent,
  welcomeMessageBetaWelcomeStepTitle = NativeConstants.welcomeMessageBetaWelcomeStepTitle,
  welcomeMessageLiveWelcomeStepContent = NativeConstants.welcomeMessageLiveWelcomeStepContent,
  welcomeMessageLiveWelcomeStepTitle = NativeConstants.welcomeMessageLiveWelcomeStepTitle,
}
