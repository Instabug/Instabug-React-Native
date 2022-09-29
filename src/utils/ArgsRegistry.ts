import { Instabug } from 'src/native';

export namespace ArgsRegistry {
  /**
   * Verbosity level of the SDK debug logs. This has nothing to do with IBGLog,
   * and only affect the logs used to debug the SDK itself.
   */
  export enum sdkDebugLogsLevel {
    sdkDebugLogsLevelVerbose = Instabug.sdkDebugLogsLevelVerbose,
    sdkDebugLogsLevelDebug = Instabug.sdkDebugLogsLevelDebug,
    sdkDebugLogsLevelError = Instabug.sdkDebugLogsLevelError,
    sdkDebugLogsLevelNone = Instabug.sdkDebugLogsLevelNone,
  }

  /**
   * APM Log Level.
   */
  export enum logLevel {
    none = Instabug.logLevelNone,
    error = Instabug.logLevelError,
    warning = Instabug.logLevelWarning,
    info = Instabug.logLevelInfo,
    debug = Instabug.logLevelDebug,
    verbose = Instabug.logLevelVerbose,
  }

  /**
   * The event used to invoke the feedback form
   */
  export enum invocationEvent {
    none = Instabug.invocationEventNone,
    shake = Instabug.invocationEventShake,
    screenshot = Instabug.invocationEventScreenshot,
    twoFingersSwipe = Instabug.invocationEventTwoFingersSwipeLeft,
    floatingButton = Instabug.invocationEventFloatingButton,
  }

  /**
   * Options added while invoking bug reporting.
   */
  export enum option {
    emailFieldHidden = Instabug.optionEmailFieldHidden,
    emailFieldOptional = Instabug.optionEmailFieldOptional,
    commentFieldRequired = Instabug.optionCommentFieldRequired,
    disablePostSendingDialog = Instabug.optionDisablePostSendingDialog,
  }

  /**
   * The color theme of the different UI elements
   */
  export enum colorTheme {
    light = Instabug.colorThemeLight,
    dark = Instabug.colorThemeDark,
  }

  /**
   * Floating Button edges
   */
  export enum floatingButtonEdge {
    left = Instabug.rectMinXEdge,
    right = Instabug.rectMaxXEdge,
  }

  /**
   * Instabug floating buttons positions.
   */
  export enum position {
    bottomRight = Instabug.bottomRight,
    topRight = Instabug.topRight,
    bottomLeft = Instabug.bottomLeft,
    topLeft = Instabug.topLeft,
  }

  /**
   * Instabug floating buttons positions.
   */
  export enum IBGPosition {
    bottomRight = Instabug.bottomRight,
    topRight = Instabug.topRight,
    bottomLeft = Instabug.bottomLeft,
    topLeft = Instabug.topLeft,
  }

  /**
   * The welcome message mode.
   */
  export enum welcomeMessageMode {
    live = Instabug.welcomeMessageModeLive,
    beta = Instabug.welcomeMessageModeBeta,
    disabled = Instabug.welcomeMessageModeDisabled,
  }

  /**
   * Type of the report either feedback or bug.
   */
  export enum reportType {
    bug = Instabug.bugReportingReportTypeBug,
    feedback = Instabug.bugReportingReportTypeFeedback,
    question = Instabug.bugReportingReportTypeQuestion,
  }

  /**
   * Type of SDK dismiss
   */
  export enum dismissType {
    submit = Instabug.dismissTypeSubmit,
    cancel = Instabug.dismissTypeCancel,
    addAttachment = Instabug.dismissTypeAddAttachment,
  }

  /**
   * Instabug action types.
   */
  export enum actionTypes {
    allActions = Instabug.allActions,
    reportBug = Instabug.reportBugAction,
    requestNewFeature = Instabug.requestNewFeature,
    addCommentToFeature = Instabug.addCommentToFeature,
  }

  /**
   * The extended bug report mode
   */
  export enum extendedBugReportMode {
    enabledWithRequiredFields = Instabug.enabledWithRequiredFields,
    enabledWithOptionalFields = Instabug.enabledWithOptionalFields,
    disabled = Instabug.disabled,
  }

  /**
   * The user steps option.
   */
  export enum reproStepsMode {
    enabled = Instabug.reproStepsEnabled,
    disabled = Instabug.reproStepsDisabled,
    enabledWithNoScreenshots = Instabug.reproStepsEnabledWithNoScreenshots,
  }

  /**
   * The supported locales
   */
  export enum locale {
    arabic = Instabug.localeArabic,
    azerbaijani = Instabug.localeAzerbaijani,
    chineseSimplified = Instabug.localeChineseSimplified,
    chineseTraditional = Instabug.localeChineseTraditional,
    czech = Instabug.localeCzech,
    danish = Instabug.localeDanish,
    dutch = Instabug.localeDutch,
    english = Instabug.localeEnglish,
    french = Instabug.localeFrench,
    german = Instabug.localeGerman,
    italian = Instabug.localeItalian,
    japanese = Instabug.localeJapanese,
    polish = Instabug.localePolish,
    portugueseBrazil = Instabug.localePortugueseBrazil,
    russian = Instabug.localeRussian,
    spanish = Instabug.localeSpanish,
    swedish = Instabug.localeSwedish,
    turkish = Instabug.localeTurkish,
    korean = Instabug.localeKorean,
  }

  /**
   * Instabug strings
   */
  export enum strings {
    shakeHint = Instabug.shakeHint,
    swipeHint = Instabug.swipeHint,
    edgeSwipeStartHint = Instabug.edgeSwipeStartHint,
    startAlertText = Instabug.startAlertText,
    invalidEmailMessage = Instabug.invalidEmailMessage,
    invalidEmailTitle = Instabug.invalidEmailTitle,
    invalidCommentMessage = Instabug.invalidCommentMessage,
    invalidCommentTitle = Instabug.invalidCommentTitle,
    invocationHeader = Instabug.invocationHeader,
    reportQuestion = Instabug.reportQuestion,
    reportBug = Instabug.reportBug,
    reportFeedback = Instabug.reportFeedback,
    emailFieldHint = Instabug.emailFieldHint,
    commentFieldHintForBugReport = Instabug.commentFieldHintForBugReport,
    commentFieldHintForFeedback = Instabug.commentFieldHintForFeedback,
    commentFieldHintForQuestion = Instabug.commentFieldHintForQuestion,
    videoPressRecord = Instabug.videoPressRecord,
    addVideoMessage = Instabug.addVideoMessage,
    addVoiceMessage = Instabug.addVoiceMessage,
    addImageFromGallery = Instabug.addImageFromGallery,
    addExtraScreenshot = Instabug.addExtraScreenshot,
    audioRecordingPermissionDeniedTitle = Instabug.audioRecordingPermissionDeniedTitle,
    audioRecordingPermissionDeniedMessage = Instabug.audioRecordingPermissionDeniedMessage,
    microphonePermissionAlertSettingsButtonText = Instabug.microphonePermissionAlertSettingsButtonTitle,
    recordingMessageToHoldText = Instabug.recordingMessageToHoldText,
    recordingMessageToReleaseText = Instabug.recordingMessageToReleaseText,
    conversationsHeaderTitle = Instabug.conversationsHeaderTitle,
    screenshotHeaderTitle = Instabug.screenshotHeaderTitle,
    okButtonText = Instabug.okButtonTitle,
    cancelButtonText = Instabug.cancelButtonTitle,
    thankYouText = Instabug.thankYouText,
    audio = Instabug.audio,
    video = Instabug.video,
    image = Instabug.image,
    team = Instabug.team,
    messagesNotification = Instabug.messagesNotification,
    messagesNotificationAndOthers = Instabug.messagesNotificationAndOthers,
    conversationTextFieldHint = Instabug.conversationTextFieldHint,
    collectingDataText = Instabug.collectingDataText,
    thankYouAlertText = Instabug.thankYouAlertText,
    welcomeMessageBetaWelcomeStepTitle = Instabug.welcomeMessageBetaWelcomeStepTitle,
    welcomeMessageBetaWelcomeStepContent = Instabug.welcomeMessageBetaWelcomeStepContent,
    welcomeMessageBetaHowToReportStepTitle = Instabug.welcomeMessageBetaHowToReportStepTitle,
    welcomeMessageBetaHowToReportStepContent = Instabug.welcomeMessageBetaHowToReportStepContent,
    welcomeMessageBetaFinishStepTitle = Instabug.welcomeMessageBetaFinishStepTitle,
    welcomeMessageBetaFinishStepContent = Instabug.welcomeMessageBetaFinishStepContent,
    welcomeMessageLiveWelcomeStepTitle = Instabug.welcomeMessageLiveWelcomeStepTitle,
    welcomeMessageLiveWelcomeStepContent = Instabug.welcomeMessageLiveWelcomeStepContent,
    surveysStoreRatingThanksTitle = Instabug.surveysStoreRatingThanksTitle,
    surveysStoreRatingThanksSubtitle = Instabug.surveysStoreRatingThanksSubtitle,
    reportBugDescription = Instabug.reportBugDescription,
    reportFeedbackDescription = Instabug.reportFeedbackDescription,
    reportQuestionDescription = Instabug.reportQuestionDescription,
    requestFeatureDescription = Instabug.requestFeatureDescription,
    discardAlertTitle = Instabug.discardAlertTitle,
    discardAlertMessage = Instabug.discardAlertMessage,
    discardAlertCancel = Instabug.discardAlertCancel,
    discardAlertAction = Instabug.discardAlertAction,
    addAttachmentButtonTitleStringName = Instabug.addAttachmentButtonTitleStringName,
    reportReproStepsDisclaimerBody = Instabug.reportReproStepsDisclaimerBody,
    reportReproStepsDisclaimerLink = Instabug.reportReproStepsDisclaimerLink,
    reproStepsProgressDialogBody = Instabug.reproStepsProgressDialogBody,
    reproStepsListHeader = Instabug.reproStepsListHeader,
    reproStepsListDescription = Instabug.reproStepsListDescription,
    reproStepsListEmptyStateDescription = Instabug.reproStepsListEmptyStateDescription,
    reproStepsListItemTitle = Instabug.reproStepsListItemTitle,
  }
}
