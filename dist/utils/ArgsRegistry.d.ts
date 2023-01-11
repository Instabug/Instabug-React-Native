/**
 * @deprecated Pass a `LogLevel` to `debugLogsLevel` in `Instabug.init` instead.
 *
 * Verbosity level of the SDK debug logs. This has nothing to do with IBGLog,
 * and only affect the logs used to debug the SDK itself.
 */
export declare enum sdkDebugLogsLevel {
    sdkDebugLogsLevelVerbose,
    sdkDebugLogsLevelDebug,
    sdkDebugLogsLevelError,
    sdkDebugLogsLevelNone
}
/**
 * @deprecated Pass a `LogLevel` to `debugLogsLevel` in `Instabug.init` instead.
 *
 * APM Log Level.
 */
export declare enum logLevel {
    none,
    error,
    warning,
    info,
    debug,
    verbose
}
/**
 * The event used to invoke the feedback form
 */
export declare enum invocationEvent {
    none,
    shake,
    screenshot,
    twoFingersSwipe,
    floatingButton
}
/**
 * Options added while invoking bug reporting.
 */
export declare enum option {
    emailFieldHidden,
    emailFieldOptional,
    commentFieldRequired,
    disablePostSendingDialog
}
/**
 * The color theme of the different UI elements
 */
export declare enum colorTheme {
    light,
    dark
}
/**
 * Floating Button edges
 */
export declare enum floatingButtonEdge {
    left,
    right
}
/**
 * NativeInstabug floating buttons positions.
 */
export declare enum position {
    bottomRight,
    topRight,
    bottomLeft,
    topLeft
}
/**
 * NativeInstabug floating buttons positions.
 */
export declare enum IBGPosition {
    bottomRight,
    topRight,
    bottomLeft,
    topLeft
}
/**
 * The welcome message mode.
 */
export declare enum welcomeMessageMode {
    live,
    beta,
    disabled
}
/**
 * Type of the report either feedback or bug.
 */
export declare enum reportType {
    bug,
    feedback,
    question
}
/**
 * Type of SDK dismiss
 */
export declare enum dismissType {
    submit,
    cancel,
    addAttachment
}
/**
 * NativeInstabug action types.
 */
export declare enum actionTypes {
    allActions,
    reportBug,
    requestNewFeature,
    addCommentToFeature
}
/**
 * The extended bug report mode
 */
export declare enum extendedBugReportMode {
    enabledWithRequiredFields,
    enabledWithOptionalFields,
    disabled
}
/**
 * The user steps option.
 */
export declare enum reproStepsMode {
    enabled,
    disabled,
    enabledWithNoScreenshots
}
/**
 * The supported locales
 */
export declare enum locale {
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
    korean,
    polish,
    portugueseBrazil,
    romanian,
    russian,
    spanish,
    swedish,
    turkish
}
/**
 * NativeInstabug strings
 */
export declare enum strings {
    shakeHint,
    swipeHint,
    edgeSwipeStartHint,
    startAlertText,
    invalidEmailMessage,
    invalidEmailTitle,
    invalidCommentMessage,
    invalidCommentTitle,
    invocationHeader,
    reportQuestion,
    reportBug,
    reportFeedback,
    emailFieldHint,
    commentFieldHintForBugReport,
    commentFieldHintForFeedback,
    commentFieldHintForQuestion,
    videoPressRecord,
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
    okButtonText,
    cancelButtonText,
    thankYouText,
    audio,
    image,
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
    surveysStoreRatingThanksTitle,
    surveysStoreRatingThanksSubtitle,
    reportBugDescription,
    reportFeedbackDescription,
    reportQuestionDescription,
    requestFeatureDescription,
    discardAlertTitle,
    discardAlertMessage,
    discardAlertCancel,
    discardAlertAction,
    addAttachmentButtonTitleStringName,
    reportReproStepsDisclaimerBody,
    reportReproStepsDisclaimerLink,
    reproStepsProgressDialogBody,
    reproStepsListHeader,
    reproStepsListDescription,
    reproStepsListEmptyStateDescription,
    reproStepsListItemTitle,
    screenRecording,
    insufficientContentMessage,
    insufficientContentTitle
}
