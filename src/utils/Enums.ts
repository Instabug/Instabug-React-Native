import { NativeInstabug } from '../native';

const NativeConstants = NativeInstabug.getConstants();

/**
 * Verbosity level of the SDK debug logs. This has nothing to do with `Instabug.log`,
 * and only affect the logs used to debug the SDK itself.
 */
export enum LogLevel {
  Verbose = NativeConstants.sdkDebugLogsLevelVerbose,
  Debug = NativeConstants.sdkDebugLogsLevelDebug,
  Error = NativeConstants.sdkDebugLogsLevelError,
  None = NativeConstants.sdkDebugLogsLevelNone,
}

/**
 * The event used to invoke the feedback form.
 */
export enum InvocationEvent {
  None = NativeConstants.invocationEventNone,
  Shake = NativeConstants.invocationEventShake,
  Screenshot = NativeConstants.invocationEventScreenshot,
  TwoFingersSwipe = NativeConstants.invocationEventTwoFingersSwipeLeft,
  FloatingButton = NativeConstants.invocationEventFloatingButton,
}

/**
 * Options added while invoking bug reporting.
 */
export enum InvocationOption {
  EmailFieldHidden = NativeConstants.optionEmailFieldHidden,
  EmailFieldOptional = NativeConstants.optionEmailFieldOptional,
  CommentFieldRequired = NativeConstants.optionCommentFieldRequired,
  DisablePostSendingDialog = NativeConstants.optionDisablePostSendingDialog,
}

/**
 * The color theme of the different UI elements.
 */
export enum ColorTheme {
  Light = NativeConstants.colorThemeLight,
  Dark = NativeConstants.colorThemeDark,
}

/**
 * Floating button positions.
 */
export enum FloatingButtonPosition {
  Left = NativeConstants.rectMinXEdge,
  Right = NativeConstants.rectMaxXEdge,
}

/**
 * Video recording button positions.
 */
export enum RecordingButtonPosition {
  BottomRight = NativeConstants.bottomRight,
  TopRight = NativeConstants.topRight,
  BottomLeft = NativeConstants.bottomLeft,
  TopLeft = NativeConstants.topLeft,
}

/**
 * The welcome message mode.
 */
export enum WelcomeMessageMode {
  Live = NativeConstants.welcomeMessageModeLive,
  Beta = NativeConstants.welcomeMessageModeBeta,
  Disabled = NativeConstants.welcomeMessageModeDisabled,
}

/**
 * Type of the report either feedback or bug.
 */
export enum ReportType {
  Bug = NativeConstants.bugReportingReportTypeBug,
  Feedback = NativeConstants.bugReportingReportTypeFeedback,
  Question = NativeConstants.bugReportingReportTypeQuestion,
}

/**
 * Type of SDK dismiss.
 */
export enum DismissType {
  Submit = NativeConstants.dismissTypeSubmit,
  Cancel = NativeConstants.dismissTypeCancel,
  AddAttachment = NativeConstants.dismissTypeAddAttachment,
}

/**
 * Types of possible actions inside Feature Requests.
 */
export enum ActionType {
  All = NativeConstants.allActions,
  ReportBug = NativeConstants.reportBugAction,
  RequestNewFeature = NativeConstants.requestNewFeature,
  AddCommentToFeature = NativeConstants.addCommentToFeature,
}

/**
 * The extended bug report mode.
 */
export enum ExtendedBugReportMode {
  EnabledWithRequiredFields = NativeConstants.enabledWithRequiredFields,
  EnabledWithOptionalFields = NativeConstants.enabledWithOptionalFields,
  Disabled = NativeConstants.disabled,
}

/**
 * The user steps option.
 */
export enum ReproStepsMode {
  EnabledWithNoScreenshots = NativeConstants.reproStepsEnabledWithNoScreenshots,
  Enabled = NativeConstants.reproStepsEnabled,
  Disabled = NativeConstants.reproStepsDisabled,
}

/**
 * Supported locales
 */
export enum Locale {
  Arabic = NativeConstants.localeArabic,
  Azerbaijani = NativeConstants.localeAzerbaijani,
  ChineseSimplified = NativeConstants.localeChineseSimplified,
  ChineseTraditional = NativeConstants.localeChineseTraditional,
  Czech = NativeConstants.localeCzech,
  Danish = NativeConstants.localeDanish,
  Dutch = NativeConstants.localeDutch,
  English = NativeConstants.localeEnglish,
  French = NativeConstants.localeFrench,
  German = NativeConstants.localeGerman,
  Italian = NativeConstants.localeItalian,
  Japanese = NativeConstants.localeJapanese,
  Korean = NativeConstants.localeKorean,
  Polish = NativeConstants.localePolish,
  PortugueseBrazil = NativeConstants.localePortugueseBrazil,
  Romanian = NativeConstants.localeRomanian,
  Russian = NativeConstants.localeRussian,
  Spanish = NativeConstants.localeSpanish,
  Swedish = NativeConstants.localeSwedish,
  Turkish = NativeConstants.localeTurkish,
}

/**
 * Overridable strings in Instabug's UI
 */
export enum StringKey {
  AddAttachmentButtonTitleStringName = NativeConstants.addAttachmentButtonTitleStringName,
  AddExtraScreenshot = NativeConstants.addExtraScreenshot,
  AddImageFromGallery = NativeConstants.addImageFromGallery,
  AddVideoMessage = NativeConstants.addVideoMessage,
  AddVoiceMessage = NativeConstants.addVoiceMessage,
  Audio = NativeConstants.audio,
  AudioRecordingPermissionDeniedMessage = NativeConstants.audioRecordingPermissionDeniedMessage,
  AudioRecordingPermissionDeniedTitle = NativeConstants.audioRecordingPermissionDeniedTitle,
  CancelButtonText = NativeConstants.cancelButtonTitle,
  CollectingDataText = NativeConstants.collectingDataText,
  CommentFieldHintForBugReport = NativeConstants.commentFieldHintForBugReport,
  CommentFieldHintForFeedback = NativeConstants.commentFieldHintForFeedback,
  CommentFieldHintForQuestion = NativeConstants.commentFieldHintForQuestion,
  ConversationsHeaderTitle = NativeConstants.conversationsHeaderTitle,
  ConversationTextFieldHint = NativeConstants.conversationTextFieldHint,
  DiscardAlertAction = NativeConstants.discardAlertAction,
  DiscardAlertCancel = NativeConstants.discardAlertCancel,
  DiscardAlertMessage = NativeConstants.discardAlertMessage,
  DiscardAlertTitle = NativeConstants.discardAlertTitle,
  EdgeSwipeStartHint = NativeConstants.edgeSwipeStartHint,
  EmailFieldHint = NativeConstants.emailFieldHint,
  Image = NativeConstants.image,
  InsufficientContentMessage = NativeConstants.insufficientContentMessage,
  InsufficientContentTitle = NativeConstants.insufficientContentTitle,
  InvalidCommentMessage = NativeConstants.invalidCommentMessage,
  InvalidCommentTitle = NativeConstants.invalidCommentTitle,
  InvalidEmailMessage = NativeConstants.invalidEmailMessage,
  InvalidEmailTitle = NativeConstants.invalidEmailTitle,
  InvocationHeader = NativeConstants.invocationHeader,
  MessagesNotification = NativeConstants.messagesNotification,
  MessagesNotificationAndOthers = NativeConstants.messagesNotificationAndOthers,
  MicrophonePermissionAlertSettingsButtonText = NativeConstants.microphonePermissionAlertSettingsButtonTitle,
  OkButtonText = NativeConstants.okButtonTitle,
  RecordingMessageToHoldText = NativeConstants.recordingMessageToHoldText,
  RecordingMessageToReleaseText = NativeConstants.recordingMessageToReleaseText,
  ReportBug = NativeConstants.reportBug,
  ReportBugDescription = NativeConstants.reportBugDescription,
  ReportFeedback = NativeConstants.reportFeedback,
  ReportFeedbackDescription = NativeConstants.reportFeedbackDescription,
  ReportQuestion = NativeConstants.reportQuestion,
  ReportQuestionDescription = NativeConstants.reportQuestionDescription,
  ReportReproStepsDisclaimerBody = NativeConstants.reportReproStepsDisclaimerBody,
  ReportReproStepsDisclaimerLink = NativeConstants.reportReproStepsDisclaimerLink,
  ReproStepsListDescription = NativeConstants.reproStepsListDescription,
  ReproStepsListEmptyStateDescription = NativeConstants.reproStepsListEmptyStateDescription,
  ReproStepsListHeader = NativeConstants.reproStepsListHeader,
  ReproStepsListItemTitle = NativeConstants.reproStepsListItemTitle,
  ReproStepsProgressDialogBody = NativeConstants.reproStepsProgressDialogBody,
  RequestFeatureDescription = NativeConstants.requestFeatureDescription,
  ScreenRecording = NativeConstants.screenRecording,
  ScreenshotHeaderTitle = NativeConstants.screenshotHeaderTitle,
  ShakeHint = NativeConstants.shakeHint,
  StartAlertText = NativeConstants.startAlertText,
  SurveysStoreRatingThanksSubtitle = NativeConstants.surveysStoreRatingThanksSubtitle,
  SurveysStoreRatingThanksTitle = NativeConstants.surveysStoreRatingThanksTitle,
  SwipeHint = NativeConstants.swipeHint,
  Team = NativeConstants.team,
  ThankYouAlertText = NativeConstants.thankYouAlertText,
  ThankYouText = NativeConstants.thankYouText,
  VideoPressRecord = NativeConstants.videoPressRecord,
  WelcomeMessageBetaFinishStepContent = NativeConstants.welcomeMessageBetaFinishStepContent,
  WelcomeMessageBetaFinishStepTitle = NativeConstants.welcomeMessageBetaFinishStepTitle,
  WelcomeMessageBetaHowToReportStepContent = NativeConstants.welcomeMessageBetaHowToReportStepContent,
  WelcomeMessageBetaHowToReportStepTitle = NativeConstants.welcomeMessageBetaHowToReportStepTitle,
  WelcomeMessageBetaWelcomeStepContent = NativeConstants.welcomeMessageBetaWelcomeStepContent,
  WelcomeMessageBetaWelcomeStepTitle = NativeConstants.welcomeMessageBetaWelcomeStepTitle,
  WelcomeMessageLiveWelcomeStepContent = NativeConstants.welcomeMessageLiveWelcomeStepContent,
  WelcomeMessageLiveWelcomeStepTitle = NativeConstants.welcomeMessageLiveWelcomeStepTitle,
}
