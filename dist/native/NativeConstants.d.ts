export type NativeConstants = NativeSdkDebugLogsLevel & NativeInvocationEvent & NativeInvocationOption & NativeColorTheme & NativeFloatingButtonPosition & NativeRecordingButtonPosition & NativeWelcomeMessageMode & NativeReportType & NativeDismissType & NativeActionType & NativeExtendedBugReportMode & NativeReproStepsMode & NativeLocale & NativeNonFatalErrorLevel & NativeStringKey;
interface NativeSdkDebugLogsLevel {
    sdkDebugLogsLevelVerbose: any;
    sdkDebugLogsLevelDebug: any;
    sdkDebugLogsLevelError: any;
    sdkDebugLogsLevelNone: any;
}
interface NativeInvocationEvent {
    invocationEventNone: any;
    invocationEventShake: any;
    invocationEventScreenshot: any;
    invocationEventTwoFingersSwipeLeft: any;
    invocationEventFloatingButton: any;
}
interface NativeInvocationOption {
    optionEmailFieldHidden: any;
    optionEmailFieldOptional: any;
    optionCommentFieldRequired: any;
    optionDisablePostSendingDialog: any;
}
interface NativeColorTheme {
    colorThemeLight: any;
    colorThemeDark: any;
}
interface NativeFloatingButtonPosition {
    rectMinXEdge: any;
    rectMaxXEdge: any;
}
interface NativeRecordingButtonPosition {
    bottomRight: any;
    topRight: any;
    bottomLeft: any;
    topLeft: any;
}
interface NativeWelcomeMessageMode {
    welcomeMessageModeLive: any;
    welcomeMessageModeBeta: any;
    welcomeMessageModeDisabled: any;
}
interface NativeReportType {
    bugReportingReportTypeBug: any;
    bugReportingReportTypeFeedback: any;
    bugReportingReportTypeQuestion: any;
}
interface NativeDismissType {
    dismissTypeSubmit: any;
    dismissTypeCancel: any;
    dismissTypeAddAttachment: any;
}
interface NativeActionType {
    allActions: any;
    reportBugAction: any;
    requestNewFeature: any;
    addCommentToFeature: any;
}
interface NativeExtendedBugReportMode {
    enabledWithRequiredFields: any;
    enabledWithOptionalFields: any;
    disabled: any;
}
interface NativeReproStepsMode {
    reproStepsEnabledWithNoScreenshots: any;
    reproStepsEnabled: any;
    reproStepsDisabled: any;
}
interface NativeNonFatalErrorLevel {
    nonFatalErrorLevelInfo: any;
    nonFatalErrorLevelError: any;
    nonFatalErrorLevelWarning: any;
    nonFatalErrorLevelCritical: any;
}
interface NativeLocale {
    localeArabic: any;
    localeAzerbaijani: any;
    localeChineseSimplified: any;
    localeChineseTraditional: any;
    localeCzech: any;
    localeDanish: any;
    localeDutch: any;
    localeEnglish: any;
    localeFrench: any;
    localeGerman: any;
    localeItalian: any;
    localeJapanese: any;
    localeKorean: any;
    localePolish: any;
    localePortugueseBrazil: any;
    localeRomanian: any;
    localeRussian: any;
    localeSpanish: any;
    localeSwedish: any;
    localeTurkish: any;
}
interface NativeStringKey {
    addAttachmentButtonTitleStringName: any;
    addExtraScreenshot: any;
    addImageFromGallery: any;
    addVideoMessage: any;
    addVoiceMessage: any;
    audio: any;
    audioRecordingPermissionDeniedMessage: any;
    audioRecordingPermissionDeniedTitle: any;
    cancelButtonTitle: any;
    collectingDataText: any;
    commentFieldHintForBugReport: any;
    commentFieldHintForFeedback: any;
    commentFieldHintForQuestion: any;
    conversationsHeaderTitle: any;
    conversationTextFieldHint: any;
    discardAlertStay: any;
    discardAlertDiscard: any;
    discardAlertMessage: any;
    discardAlertTitle: any;
    edgeSwipeStartHint: any;
    emailFieldHint: any;
    image: any;
    insufficientContentMessage: any;
    insufficientContentTitle: any;
    invalidEmailMessage: any;
    invalidEmailTitle: any;
    invocationHeader: any;
    messagesNotification: any;
    messagesNotificationAndOthers: any;
    microphonePermissionAlertSettingsButtonTitle: any;
    okButtonTitle: any;
    recordingMessageToHoldText: any;
    recordingMessageToReleaseText: any;
    reportBug: any;
    reportBugDescription: any;
    reportFeedback: any;
    reportFeedbackDescription: any;
    reportQuestion: any;
    reportQuestionDescription: any;
    reportReproStepsDisclaimerBody: any;
    reportReproStepsDisclaimerLink: any;
    reproStepsListDescription: any;
    reproStepsListEmptyStateDescription: any;
    reproStepsListHeader: any;
    reproStepsListItemNumberingTitle: any;
    reproStepsProgressDialogBody: any;
    requestFeatureDescription: any;
    screenRecording: any;
    screenshotHeaderTitle: any;
    shakeHint: any;
    startAlertText: any;
    surveysStoreRatingThanksSubtitle: any;
    surveysStoreRatingThanksTitle: any;
    swipeHint: any;
    team: any;
    thankYouAlertText: any;
    thankYouText: any;
    videoPressRecord: any;
    welcomeMessageBetaFinishStepContent: any;
    welcomeMessageBetaFinishStepTitle: any;
    welcomeMessageBetaHowToReportStepContent: any;
    welcomeMessageBetaHowToReportStepTitle: any;
    welcomeMessageBetaWelcomeStepContent: any;
    welcomeMessageBetaWelcomeStepTitle: any;
    welcomeMessageLiveWelcomeStepContent: any;
    welcomeMessageLiveWelcomeStepTitle: any;
}
export {};
