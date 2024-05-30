/**
 * Verbosity level of the SDK debug logs. This has nothing to do with `Instabug.log`,
 * and only affect the logs used to debug the SDK itself.
 */
export declare enum LogLevel {
    verbose,
    debug,
    error,
    none
}
/**
 * The event used to invoke the feedback form.
 */
export declare enum InvocationEvent {
    none,
    shake,
    screenshot,
    twoFingersSwipe,
    floatingButton
}
/**
 * The network interceptor to use.
 */
export declare enum NetworkInterceptionMode {
    javascript = 0,
    native = 1
}
/**
 * Options added while invoking bug reporting.
 */
export declare enum InvocationOption {
    emailFieldHidden,
    emailFieldOptional,
    commentFieldRequired,
    disablePostSendingDialog
}
/**
 * The color theme of the different UI elements.
 */
export declare enum ColorTheme {
    light,
    dark
}
/**
 * Floating button positions.
 */
export declare enum FloatingButtonPosition {
    left,
    right
}
/**
 * Video recording button positions.
 */
export declare enum RecordingButtonPosition {
    bottomRight,
    topRight,
    bottomLeft,
    topLeft
}
/**
 * The welcome message mode.
 */
export declare enum WelcomeMessageMode {
    live,
    beta,
    disabled
}
/**
 * Type of the report either feedback or bug.
 */
export declare enum ReportType {
    bug,
    feedback,
    question
}
/**
 * Type of SDK dismiss.
 */
export declare enum DismissType {
    submit,
    cancel,
    addAttachment
}
/**
 * Types of possible actions inside Feature Requests.
 */
export declare enum ActionType {
    all,
    reportBug,
    requestNewFeature,
    addCommentToFeature
}
/**
 * The extended bug report mode.
 */
export declare enum ExtendedBugReportMode {
    enabledWithRequiredFields,
    enabledWithOptionalFields,
    disabled
}
/**
 * The user steps option.
 */
export declare enum ReproStepsMode {
    enabledWithNoScreenshots,
    enabled,
    disabled
}
/**
 * Supported locales
 */
export declare enum Locale {
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
 * Overridable strings in Instabug's UI
 */
export declare enum StringKey {
    addAttachmentButtonTitleStringName,
    addExtraScreenshot,
    addImageFromGallery,
    addVideoMessage,
    addVoiceMessage,
    audio,
    audioRecordingPermissionDeniedMessage,
    audioRecordingPermissionDeniedTitle,
    cancelButtonText,
    collectingDataText,
    commentFieldHintForBugReport,
    commentFieldHintForFeedback,
    commentFieldHintForQuestion,
    conversationsHeaderTitle,
    conversationTextFieldHint,
    discardAlertDiscard,
    discardAlertStay,
    discardAlertMessage,
    discardAlertTitle,
    edgeSwipeStartHint,
    emailFieldHint,
    image,
    insufficientContentMessage,
    /** iOS only */
    insufficientContentTitle,
    invalidEmailMessage,
    invalidEmailTitle,
    invocationHeader,
    messagesNotification,
    messagesNotificationAndOthers,
    microphonePermissionAlertSettingsButtonText,
    okButtonText,
    recordingMessageToHoldText,
    recordingMessageToReleaseText,
    reportBug,
    reportBugDescription,
    reportFeedback,
    reportFeedbackDescription,
    reportQuestion,
    reportQuestionDescription,
    reportReproStepsDisclaimerBody,
    reportReproStepsDisclaimerLink,
    reproStepsListDescription,
    reproStepsListEmptyStateDescription,
    reproStepsListHeader,
    reproStepsListItemNumberingTitle,
    reproStepsProgressDialogBody,
    requestFeatureDescription,
    screenRecording,
    screenshotHeaderTitle,
    shakeHint,
    startAlertText,
    surveysStoreRatingThanksSubtitle,
    surveysStoreRatingThanksTitle,
    swipeHint,
    team,
    thankYouAlertText,
    thankYouText,
    videoPressRecord,
    welcomeMessageBetaFinishStepContent,
    welcomeMessageBetaFinishStepTitle,
    welcomeMessageBetaHowToReportStepContent,
    welcomeMessageBetaHowToReportStepTitle,
    welcomeMessageBetaWelcomeStepContent,
    welcomeMessageBetaWelcomeStepTitle,
    welcomeMessageLiveWelcomeStepContent,
    welcomeMessageLiveWelcomeStepTitle
}
