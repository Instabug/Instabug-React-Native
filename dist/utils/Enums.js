import { NativeInstabug } from '../native/NativeInstabug';
const constants = NativeInstabug.getConstants();
/**
 * Verbosity level of the SDK debug logs. This has nothing to do with `Instabug.log`,
 * and only affect the logs used to debug the SDK itself.
 */
export var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["verbose"] = constants.sdkDebugLogsLevelVerbose] = "verbose";
    LogLevel[LogLevel["debug"] = constants.sdkDebugLogsLevelDebug] = "debug";
    LogLevel[LogLevel["error"] = constants.sdkDebugLogsLevelError] = "error";
    LogLevel[LogLevel["none"] = constants.sdkDebugLogsLevelNone] = "none";
})(LogLevel || (LogLevel = {}));
/**
 * The event used to invoke the feedback form.
 */
export var InvocationEvent;
(function (InvocationEvent) {
    InvocationEvent[InvocationEvent["none"] = constants.invocationEventNone] = "none";
    InvocationEvent[InvocationEvent["shake"] = constants.invocationEventShake] = "shake";
    InvocationEvent[InvocationEvent["screenshot"] = constants.invocationEventScreenshot] = "screenshot";
    InvocationEvent[InvocationEvent["twoFingersSwipe"] = constants.invocationEventTwoFingersSwipeLeft] = "twoFingersSwipe";
    InvocationEvent[InvocationEvent["floatingButton"] = constants.invocationEventFloatingButton] = "floatingButton";
})(InvocationEvent || (InvocationEvent = {}));
/**
 * The network interceptor to use.
 */
export var NetworkInterceptionMode;
(function (NetworkInterceptionMode) {
    NetworkInterceptionMode[NetworkInterceptionMode["javascript"] = 0] = "javascript";
    NetworkInterceptionMode[NetworkInterceptionMode["native"] = 1] = "native";
})(NetworkInterceptionMode || (NetworkInterceptionMode = {}));
/**
 * Options added while invoking bug reporting.
 */
export var InvocationOption;
(function (InvocationOption) {
    InvocationOption[InvocationOption["emailFieldHidden"] = constants.optionEmailFieldHidden] = "emailFieldHidden";
    InvocationOption[InvocationOption["emailFieldOptional"] = constants.optionEmailFieldOptional] = "emailFieldOptional";
    InvocationOption[InvocationOption["commentFieldRequired"] = constants.optionCommentFieldRequired] = "commentFieldRequired";
    InvocationOption[InvocationOption["disablePostSendingDialog"] = constants.optionDisablePostSendingDialog] = "disablePostSendingDialog";
})(InvocationOption || (InvocationOption = {}));
/**
 * The color theme of the different UI elements.
 */
export var ColorTheme;
(function (ColorTheme) {
    ColorTheme[ColorTheme["light"] = constants.colorThemeLight] = "light";
    ColorTheme[ColorTheme["dark"] = constants.colorThemeDark] = "dark";
})(ColorTheme || (ColorTheme = {}));
/**
 * Floating button positions.
 */
export var FloatingButtonPosition;
(function (FloatingButtonPosition) {
    FloatingButtonPosition[FloatingButtonPosition["left"] = constants.rectMinXEdge] = "left";
    FloatingButtonPosition[FloatingButtonPosition["right"] = constants.rectMaxXEdge] = "right";
})(FloatingButtonPosition || (FloatingButtonPosition = {}));
/**
 * Video recording button positions.
 */
export var RecordingButtonPosition;
(function (RecordingButtonPosition) {
    RecordingButtonPosition[RecordingButtonPosition["bottomRight"] = constants.bottomRight] = "bottomRight";
    RecordingButtonPosition[RecordingButtonPosition["topRight"] = constants.topRight] = "topRight";
    RecordingButtonPosition[RecordingButtonPosition["bottomLeft"] = constants.bottomLeft] = "bottomLeft";
    RecordingButtonPosition[RecordingButtonPosition["topLeft"] = constants.topLeft] = "topLeft";
})(RecordingButtonPosition || (RecordingButtonPosition = {}));
/**
 * The welcome message mode.
 */
export var WelcomeMessageMode;
(function (WelcomeMessageMode) {
    WelcomeMessageMode[WelcomeMessageMode["live"] = constants.welcomeMessageModeLive] = "live";
    WelcomeMessageMode[WelcomeMessageMode["beta"] = constants.welcomeMessageModeBeta] = "beta";
    WelcomeMessageMode[WelcomeMessageMode["disabled"] = constants.welcomeMessageModeDisabled] = "disabled";
})(WelcomeMessageMode || (WelcomeMessageMode = {}));
/**
 * Type of the report either feedback or bug.
 */
export var ReportType;
(function (ReportType) {
    ReportType[ReportType["bug"] = constants.bugReportingReportTypeBug] = "bug";
    ReportType[ReportType["feedback"] = constants.bugReportingReportTypeFeedback] = "feedback";
    ReportType[ReportType["question"] = constants.bugReportingReportTypeQuestion] = "question";
})(ReportType || (ReportType = {}));
/**
 * Type of SDK dismiss.
 */
export var DismissType;
(function (DismissType) {
    DismissType[DismissType["submit"] = constants.dismissTypeSubmit] = "submit";
    DismissType[DismissType["cancel"] = constants.dismissTypeCancel] = "cancel";
    DismissType[DismissType["addAttachment"] = constants.dismissTypeAddAttachment] = "addAttachment";
})(DismissType || (DismissType = {}));
/**
 * Types of possible actions inside Feature Requests.
 */
export var ActionType;
(function (ActionType) {
    ActionType[ActionType["all"] = constants.allActions] = "all";
    ActionType[ActionType["reportBug"] = constants.reportBugAction] = "reportBug";
    ActionType[ActionType["requestNewFeature"] = constants.requestNewFeature] = "requestNewFeature";
    ActionType[ActionType["addCommentToFeature"] = constants.addCommentToFeature] = "addCommentToFeature";
})(ActionType || (ActionType = {}));
/**
 * The extended bug report mode.
 */
export var ExtendedBugReportMode;
(function (ExtendedBugReportMode) {
    ExtendedBugReportMode[ExtendedBugReportMode["enabledWithRequiredFields"] = constants.enabledWithRequiredFields] = "enabledWithRequiredFields";
    ExtendedBugReportMode[ExtendedBugReportMode["enabledWithOptionalFields"] = constants.enabledWithOptionalFields] = "enabledWithOptionalFields";
    ExtendedBugReportMode[ExtendedBugReportMode["disabled"] = constants.disabled] = "disabled";
})(ExtendedBugReportMode || (ExtendedBugReportMode = {}));
/**
 * The user steps option.
 */
export var ReproStepsMode;
(function (ReproStepsMode) {
    ReproStepsMode[ReproStepsMode["enabledWithNoScreenshots"] = constants.reproStepsEnabledWithNoScreenshots] = "enabledWithNoScreenshots";
    ReproStepsMode[ReproStepsMode["enabled"] = constants.reproStepsEnabled] = "enabled";
    ReproStepsMode[ReproStepsMode["disabled"] = constants.reproStepsDisabled] = "disabled";
})(ReproStepsMode || (ReproStepsMode = {}));
/**
 * Supported locales
 */
export var Locale;
(function (Locale) {
    Locale[Locale["english"] = constants.localeEnglish] = "english";
})(Locale || (Locale = {}));
/**
 * Overridable strings in Instabug's UI
 */
export var StringKey;
(function (StringKey) {
    StringKey[StringKey["addAttachmentButtonTitleStringName"] = constants.addAttachmentButtonTitleStringName] = "addAttachmentButtonTitleStringName";
    StringKey[StringKey["addExtraScreenshot"] = constants.addExtraScreenshot] = "addExtraScreenshot";
    StringKey[StringKey["addImageFromGallery"] = constants.addImageFromGallery] = "addImageFromGallery";
    StringKey[StringKey["addVideoMessage"] = constants.addVideoMessage] = "addVideoMessage";
    StringKey[StringKey["addVoiceMessage"] = constants.addVoiceMessage] = "addVoiceMessage";
    StringKey[StringKey["audio"] = constants.audio] = "audio";
    StringKey[StringKey["audioRecordingPermissionDeniedMessage"] = constants.audioRecordingPermissionDeniedMessage] = "audioRecordingPermissionDeniedMessage";
    StringKey[StringKey["audioRecordingPermissionDeniedTitle"] = constants.audioRecordingPermissionDeniedTitle] = "audioRecordingPermissionDeniedTitle";
    StringKey[StringKey["cancelButtonText"] = constants.cancelButtonTitle] = "cancelButtonText";
    StringKey[StringKey["collectingDataText"] = constants.collectingDataText] = "collectingDataText";
    StringKey[StringKey["commentFieldHintForBugReport"] = constants.commentFieldHintForBugReport] = "commentFieldHintForBugReport";
    StringKey[StringKey["commentFieldHintForFeedback"] = constants.commentFieldHintForFeedback] = "commentFieldHintForFeedback";
    StringKey[StringKey["commentFieldHintForQuestion"] = constants.commentFieldHintForQuestion] = "commentFieldHintForQuestion";
    StringKey[StringKey["conversationsHeaderTitle"] = constants.conversationsHeaderTitle] = "conversationsHeaderTitle";
    StringKey[StringKey["conversationTextFieldHint"] = constants.conversationTextFieldHint] = "conversationTextFieldHint";
    StringKey[StringKey["discardAlertDiscard"] = constants.discardAlertDiscard] = "discardAlertDiscard";
    StringKey[StringKey["discardAlertStay"] = constants.discardAlertStay] = "discardAlertStay";
    StringKey[StringKey["discardAlertMessage"] = constants.discardAlertMessage] = "discardAlertMessage";
    StringKey[StringKey["discardAlertTitle"] = constants.discardAlertTitle] = "discardAlertTitle";
    StringKey[StringKey["edgeSwipeStartHint"] = constants.edgeSwipeStartHint] = "edgeSwipeStartHint";
    StringKey[StringKey["emailFieldHint"] = constants.emailFieldHint] = "emailFieldHint";
    StringKey[StringKey["image"] = constants.image] = "image";
    StringKey[StringKey["insufficientContentMessage"] = constants.insufficientContentMessage] = "insufficientContentMessage";
    /** iOS only */
    StringKey[StringKey["insufficientContentTitle"] = constants.insufficientContentTitle] = "insufficientContentTitle";
    StringKey[StringKey["invalidEmailMessage"] = constants.invalidEmailMessage] = "invalidEmailMessage";
    StringKey[StringKey["invalidEmailTitle"] = constants.invalidEmailTitle] = "invalidEmailTitle";
    StringKey[StringKey["invocationHeader"] = constants.invocationHeader] = "invocationHeader";
    StringKey[StringKey["messagesNotification"] = constants.messagesNotification] = "messagesNotification";
    StringKey[StringKey["messagesNotificationAndOthers"] = constants.messagesNotificationAndOthers] = "messagesNotificationAndOthers";
    StringKey[StringKey["microphonePermissionAlertSettingsButtonText"] = constants.microphonePermissionAlertSettingsButtonTitle] = "microphonePermissionAlertSettingsButtonText";
    StringKey[StringKey["okButtonText"] = constants.okButtonTitle] = "okButtonText";
    StringKey[StringKey["recordingMessageToHoldText"] = constants.recordingMessageToHoldText] = "recordingMessageToHoldText";
    StringKey[StringKey["recordingMessageToReleaseText"] = constants.recordingMessageToReleaseText] = "recordingMessageToReleaseText";
    StringKey[StringKey["reportBug"] = constants.reportBug] = "reportBug";
    StringKey[StringKey["reportBugDescription"] = constants.reportBugDescription] = "reportBugDescription";
    StringKey[StringKey["reportFeedback"] = constants.reportFeedback] = "reportFeedback";
    StringKey[StringKey["reportFeedbackDescription"] = constants.reportFeedbackDescription] = "reportFeedbackDescription";
    StringKey[StringKey["reportQuestion"] = constants.reportQuestion] = "reportQuestion";
    StringKey[StringKey["reportQuestionDescription"] = constants.reportQuestionDescription] = "reportQuestionDescription";
    StringKey[StringKey["reportReproStepsDisclaimerBody"] = constants.reportReproStepsDisclaimerBody] = "reportReproStepsDisclaimerBody";
    StringKey[StringKey["reportReproStepsDisclaimerLink"] = constants.reportReproStepsDisclaimerLink] = "reportReproStepsDisclaimerLink";
    StringKey[StringKey["reproStepsListDescription"] = constants.reproStepsListDescription] = "reproStepsListDescription";
    StringKey[StringKey["reproStepsListEmptyStateDescription"] = constants.reproStepsListEmptyStateDescription] = "reproStepsListEmptyStateDescription";
    StringKey[StringKey["reproStepsListHeader"] = constants.reproStepsListHeader] = "reproStepsListHeader";
    StringKey[StringKey["reproStepsListItemNumberingTitle"] = constants.reproStepsListItemNumberingTitle] = "reproStepsListItemNumberingTitle";
    StringKey[StringKey["reproStepsProgressDialogBody"] = constants.reproStepsProgressDialogBody] = "reproStepsProgressDialogBody";
    StringKey[StringKey["requestFeatureDescription"] = constants.requestFeatureDescription] = "requestFeatureDescription";
    StringKey[StringKey["screenRecording"] = constants.screenRecording] = "screenRecording";
    StringKey[StringKey["screenshotHeaderTitle"] = constants.screenshotHeaderTitle] = "screenshotHeaderTitle";
    StringKey[StringKey["shakeHint"] = constants.shakeHint] = "shakeHint";
    StringKey[StringKey["startAlertText"] = constants.startAlertText] = "startAlertText";
    StringKey[StringKey["surveysStoreRatingThanksSubtitle"] = constants.surveysStoreRatingThanksSubtitle] = "surveysStoreRatingThanksSubtitle";
    StringKey[StringKey["surveysStoreRatingThanksTitle"] = constants.surveysStoreRatingThanksTitle] = "surveysStoreRatingThanksTitle";
    StringKey[StringKey["swipeHint"] = constants.swipeHint] = "swipeHint";
    StringKey[StringKey["team"] = constants.team] = "team";
    StringKey[StringKey["thankYouAlertText"] = constants.thankYouAlertText] = "thankYouAlertText";
    StringKey[StringKey["thankYouText"] = constants.thankYouText] = "thankYouText";
    StringKey[StringKey["videoPressRecord"] = constants.videoPressRecord] = "videoPressRecord";
    StringKey[StringKey["welcomeMessageBetaFinishStepContent"] = constants.welcomeMessageBetaFinishStepContent] = "welcomeMessageBetaFinishStepContent";
    StringKey[StringKey["welcomeMessageBetaFinishStepTitle"] = constants.welcomeMessageBetaFinishStepTitle] = "welcomeMessageBetaFinishStepTitle";
    StringKey[StringKey["welcomeMessageBetaHowToReportStepContent"] = constants.welcomeMessageBetaHowToReportStepContent] = "welcomeMessageBetaHowToReportStepContent";
    StringKey[StringKey["welcomeMessageBetaHowToReportStepTitle"] = constants.welcomeMessageBetaHowToReportStepTitle] = "welcomeMessageBetaHowToReportStepTitle";
    StringKey[StringKey["welcomeMessageBetaWelcomeStepContent"] = constants.welcomeMessageBetaWelcomeStepContent] = "welcomeMessageBetaWelcomeStepContent";
    StringKey[StringKey["welcomeMessageBetaWelcomeStepTitle"] = constants.welcomeMessageBetaWelcomeStepTitle] = "welcomeMessageBetaWelcomeStepTitle";
    StringKey[StringKey["welcomeMessageLiveWelcomeStepContent"] = constants.welcomeMessageLiveWelcomeStepContent] = "welcomeMessageLiveWelcomeStepContent";
    StringKey[StringKey["welcomeMessageLiveWelcomeStepTitle"] = constants.welcomeMessageLiveWelcomeStepTitle] = "welcomeMessageLiveWelcomeStepTitle";
})(StringKey || (StringKey = {}));
