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
 * @deprecated Use `InvocationEvent` instead.
 *
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
 * @deprecated Use `InvocationOption` instead.
 *
 * Options added while invoking bug reporting.
 */
export declare enum option {
    emailFieldHidden,
    emailFieldOptional,
    commentFieldRequired,
    disablePostSendingDialog
}
/**
 * @deprecated Use `ColorTheme` instead.
 *
 * The color theme of the different UI elements
 */
export declare enum colorTheme {
    light,
    dark
}
/**
 * @deprecated Use `FloatingButtonPosition` instead.
 *
 * Floating Button edges
 */
export declare enum floatingButtonEdge {
    left,
    right
}
/**
 * @deprecated Use `RecordingButtonPosition` instead.
 *
 * constants floating buttons positions.
 */
export declare enum position {
    bottomRight,
    topRight,
    bottomLeft,
    topLeft
}
/**
 * @deprecated Use `RecordingButtonPosition` instead.
 *
 * constants floating buttons positions.
 */
export declare enum IBGPosition {
    bottomRight,
    topRight,
    bottomLeft,
    topLeft
}
/**
 * @deprecated Use `WelcomeMessageMode` instead.
 *
 * The welcome message mode.
 */
export declare enum welcomeMessageMode {
    live,
    beta,
    disabled
}
/**
 * @deprecated Use `ReportType` instead.
 *
 * Type of the report either feedback or bug.
 */
export declare enum reportType {
    bug,
    feedback,
    question
}
/**
 * @deprecated Use `DismissType` instead.
 *
 * Type of SDK dismiss
 */
export declare enum dismissType {
    submit,
    cancel,
    addAttachment
}
/**
 * @deprecated Use `ActionType` instead.
 *
 * constants action types.
 */
export declare enum actionTypes {
    allActions,
    reportBug,
    requestNewFeature,
    addCommentToFeature
}
/**
 * @deprecated Use `ExtendedBugReportMode` instead.
 *
 * The extended bug report mode
 */
export declare enum extendedBugReportMode {
    enabledWithRequiredFields,
    enabledWithOptionalFields,
    disabled
}
/**
 * @deprecated Use `ReproStepsMode` instead.
 *
 * The user steps option.
 */
export declare enum reproStepsMode {
    enabled,
    disabled,
    enabledWithNoScreenshots
}
/**
 * @deprecated Use `Locale` instead.
 *
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
 * @deprecated Use `StringKey` instead.
 *
 * constants strings
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
    /** @deprecated Use {@link discardAlertStay} and {@link discardAlertDiscard} instead */
    discardAlertCancel,
    /** @deprecated Use {@link discardAlertStay} and {@link discardAlertDiscard} instead */
    discardAlertAction,
    discardAlertDiscard,
    discardAlertStay,
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
