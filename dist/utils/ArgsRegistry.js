import { NativeInstabug } from '../native';
/**
 * @deprecated Pass a `LogLevel` to `debugLogsLevel` in `Instabug.init` instead.
 *
 * Verbosity level of the SDK debug logs. This has nothing to do with IBGLog,
 * and only affect the logs used to debug the SDK itself.
 */
export var sdkDebugLogsLevel;
(function (sdkDebugLogsLevel) {
    sdkDebugLogsLevel[sdkDebugLogsLevel["sdkDebugLogsLevelVerbose"] = NativeInstabug.sdkDebugLogsLevelVerbose] = "sdkDebugLogsLevelVerbose";
    sdkDebugLogsLevel[sdkDebugLogsLevel["sdkDebugLogsLevelDebug"] = NativeInstabug.sdkDebugLogsLevelDebug] = "sdkDebugLogsLevelDebug";
    sdkDebugLogsLevel[sdkDebugLogsLevel["sdkDebugLogsLevelError"] = NativeInstabug.sdkDebugLogsLevelError] = "sdkDebugLogsLevelError";
    sdkDebugLogsLevel[sdkDebugLogsLevel["sdkDebugLogsLevelNone"] = NativeInstabug.sdkDebugLogsLevelNone] = "sdkDebugLogsLevelNone";
})(sdkDebugLogsLevel || (sdkDebugLogsLevel = {}));
/**
 * @deprecated Pass a `LogLevel` to `debugLogsLevel` in `Instabug.init` instead.
 *
 * APM Log Level.
 */
export var logLevel;
(function (logLevel) {
    logLevel[logLevel["none"] = NativeInstabug.logLevelNone] = "none";
    logLevel[logLevel["error"] = NativeInstabug.logLevelError] = "error";
    logLevel[logLevel["warning"] = NativeInstabug.logLevelWarning] = "warning";
    logLevel[logLevel["info"] = NativeInstabug.logLevelInfo] = "info";
    logLevel[logLevel["debug"] = NativeInstabug.logLevelDebug] = "debug";
    logLevel[logLevel["verbose"] = NativeInstabug.logLevelVerbose] = "verbose";
})(logLevel || (logLevel = {}));
/**
 * The event used to invoke the feedback form
 */
export var invocationEvent;
(function (invocationEvent) {
    invocationEvent[invocationEvent["none"] = NativeInstabug.invocationEventNone] = "none";
    invocationEvent[invocationEvent["shake"] = NativeInstabug.invocationEventShake] = "shake";
    invocationEvent[invocationEvent["screenshot"] = NativeInstabug.invocationEventScreenshot] = "screenshot";
    invocationEvent[invocationEvent["twoFingersSwipe"] = NativeInstabug.invocationEventTwoFingersSwipeLeft] = "twoFingersSwipe";
    invocationEvent[invocationEvent["floatingButton"] = NativeInstabug.invocationEventFloatingButton] = "floatingButton";
})(invocationEvent || (invocationEvent = {}));
/**
 * Options added while invoking bug reporting.
 */
export var option;
(function (option) {
    option[option["emailFieldHidden"] = NativeInstabug.optionEmailFieldHidden] = "emailFieldHidden";
    option[option["emailFieldOptional"] = NativeInstabug.optionEmailFieldOptional] = "emailFieldOptional";
    option[option["commentFieldRequired"] = NativeInstabug.optionCommentFieldRequired] = "commentFieldRequired";
    option[option["disablePostSendingDialog"] = NativeInstabug.optionDisablePostSendingDialog] = "disablePostSendingDialog";
})(option || (option = {}));
/**
 * The color theme of the different UI elements
 */
export var colorTheme;
(function (colorTheme) {
    colorTheme[colorTheme["light"] = NativeInstabug.colorThemeLight] = "light";
    colorTheme[colorTheme["dark"] = NativeInstabug.colorThemeDark] = "dark";
})(colorTheme || (colorTheme = {}));
/**
 * Floating Button edges
 */
export var floatingButtonEdge;
(function (floatingButtonEdge) {
    floatingButtonEdge[floatingButtonEdge["left"] = NativeInstabug.rectMinXEdge] = "left";
    floatingButtonEdge[floatingButtonEdge["right"] = NativeInstabug.rectMaxXEdge] = "right";
})(floatingButtonEdge || (floatingButtonEdge = {}));
/**
 * NativeInstabug floating buttons positions.
 */
export var position;
(function (position) {
    position[position["bottomRight"] = NativeInstabug.bottomRight] = "bottomRight";
    position[position["topRight"] = NativeInstabug.topRight] = "topRight";
    position[position["bottomLeft"] = NativeInstabug.bottomLeft] = "bottomLeft";
    position[position["topLeft"] = NativeInstabug.topLeft] = "topLeft";
})(position || (position = {}));
/**
 * NativeInstabug floating buttons positions.
 */
export var IBGPosition;
(function (IBGPosition) {
    IBGPosition[IBGPosition["bottomRight"] = NativeInstabug.bottomRight] = "bottomRight";
    IBGPosition[IBGPosition["topRight"] = NativeInstabug.topRight] = "topRight";
    IBGPosition[IBGPosition["bottomLeft"] = NativeInstabug.bottomLeft] = "bottomLeft";
    IBGPosition[IBGPosition["topLeft"] = NativeInstabug.topLeft] = "topLeft";
})(IBGPosition || (IBGPosition = {}));
/**
 * The welcome message mode.
 */
export var welcomeMessageMode;
(function (welcomeMessageMode) {
    welcomeMessageMode[welcomeMessageMode["live"] = NativeInstabug.welcomeMessageModeLive] = "live";
    welcomeMessageMode[welcomeMessageMode["beta"] = NativeInstabug.welcomeMessageModeBeta] = "beta";
    welcomeMessageMode[welcomeMessageMode["disabled"] = NativeInstabug.welcomeMessageModeDisabled] = "disabled";
})(welcomeMessageMode || (welcomeMessageMode = {}));
/**
 * Type of the report either feedback or bug.
 */
export var reportType;
(function (reportType) {
    reportType[reportType["bug"] = NativeInstabug.bugReportingReportTypeBug] = "bug";
    reportType[reportType["feedback"] = NativeInstabug.bugReportingReportTypeFeedback] = "feedback";
    reportType[reportType["question"] = NativeInstabug.bugReportingReportTypeQuestion] = "question";
})(reportType || (reportType = {}));
/**
 * Type of SDK dismiss
 */
export var dismissType;
(function (dismissType) {
    dismissType[dismissType["submit"] = NativeInstabug.dismissTypeSubmit] = "submit";
    dismissType[dismissType["cancel"] = NativeInstabug.dismissTypeCancel] = "cancel";
    dismissType[dismissType["addAttachment"] = NativeInstabug.dismissTypeAddAttachment] = "addAttachment";
})(dismissType || (dismissType = {}));
/**
 * NativeInstabug action types.
 */
export var actionTypes;
(function (actionTypes) {
    actionTypes[actionTypes["allActions"] = NativeInstabug.allActions] = "allActions";
    actionTypes[actionTypes["reportBug"] = NativeInstabug.reportBugAction] = "reportBug";
    actionTypes[actionTypes["requestNewFeature"] = NativeInstabug.requestNewFeature] = "requestNewFeature";
    actionTypes[actionTypes["addCommentToFeature"] = NativeInstabug.addCommentToFeature] = "addCommentToFeature";
})(actionTypes || (actionTypes = {}));
/**
 * The extended bug report mode
 */
export var extendedBugReportMode;
(function (extendedBugReportMode) {
    extendedBugReportMode[extendedBugReportMode["enabledWithRequiredFields"] = NativeInstabug.enabledWithRequiredFields] = "enabledWithRequiredFields";
    extendedBugReportMode[extendedBugReportMode["enabledWithOptionalFields"] = NativeInstabug.enabledWithOptionalFields] = "enabledWithOptionalFields";
    extendedBugReportMode[extendedBugReportMode["disabled"] = NativeInstabug.disabled] = "disabled";
})(extendedBugReportMode || (extendedBugReportMode = {}));
/**
 * The user steps option.
 */
export var reproStepsMode;
(function (reproStepsMode) {
    reproStepsMode[reproStepsMode["enabled"] = NativeInstabug.reproStepsEnabled] = "enabled";
    reproStepsMode[reproStepsMode["disabled"] = NativeInstabug.reproStepsDisabled] = "disabled";
    reproStepsMode[reproStepsMode["enabledWithNoScreenshots"] = NativeInstabug.reproStepsEnabledWithNoScreenshots] = "enabledWithNoScreenshots";
})(reproStepsMode || (reproStepsMode = {}));
/**
 * The supported locales
 */
export var locale;
(function (locale) {
    locale[locale["arabic"] = NativeInstabug.localeArabic] = "arabic";
    locale[locale["azerbaijani"] = NativeInstabug.localeAzerbaijani] = "azerbaijani";
    locale[locale["chineseSimplified"] = NativeInstabug.localeChineseSimplified] = "chineseSimplified";
    locale[locale["chineseTraditional"] = NativeInstabug.localeChineseTraditional] = "chineseTraditional";
    locale[locale["czech"] = NativeInstabug.localeCzech] = "czech";
    locale[locale["danish"] = NativeInstabug.localeDanish] = "danish";
    locale[locale["dutch"] = NativeInstabug.localeDutch] = "dutch";
    locale[locale["english"] = NativeInstabug.localeEnglish] = "english";
    locale[locale["french"] = NativeInstabug.localeFrench] = "french";
    locale[locale["german"] = NativeInstabug.localeGerman] = "german";
    locale[locale["italian"] = NativeInstabug.localeItalian] = "italian";
    locale[locale["japanese"] = NativeInstabug.localeJapanese] = "japanese";
    locale[locale["korean"] = NativeInstabug.localeKorean] = "korean";
    locale[locale["polish"] = NativeInstabug.localePolish] = "polish";
    locale[locale["portugueseBrazil"] = NativeInstabug.localePortugueseBrazil] = "portugueseBrazil";
    locale[locale["romanian"] = NativeInstabug.localeRomanian] = "romanian";
    locale[locale["russian"] = NativeInstabug.localeRussian] = "russian";
    locale[locale["spanish"] = NativeInstabug.localeSpanish] = "spanish";
    locale[locale["swedish"] = NativeInstabug.localeSwedish] = "swedish";
    locale[locale["turkish"] = NativeInstabug.localeTurkish] = "turkish";
})(locale || (locale = {}));
/**
 * NativeInstabug strings
 */
export var strings;
(function (strings) {
    strings[strings["shakeHint"] = NativeInstabug.shakeHint] = "shakeHint";
    strings[strings["swipeHint"] = NativeInstabug.swipeHint] = "swipeHint";
    strings[strings["edgeSwipeStartHint"] = NativeInstabug.edgeSwipeStartHint] = "edgeSwipeStartHint";
    strings[strings["startAlertText"] = NativeInstabug.startAlertText] = "startAlertText";
    strings[strings["invalidEmailMessage"] = NativeInstabug.invalidEmailMessage] = "invalidEmailMessage";
    strings[strings["invalidEmailTitle"] = NativeInstabug.invalidEmailTitle] = "invalidEmailTitle";
    strings[strings["invalidCommentMessage"] = NativeInstabug.invalidCommentMessage] = "invalidCommentMessage";
    strings[strings["invalidCommentTitle"] = NativeInstabug.invalidCommentTitle] = "invalidCommentTitle";
    strings[strings["invocationHeader"] = NativeInstabug.invocationHeader] = "invocationHeader";
    strings[strings["reportQuestion"] = NativeInstabug.reportQuestion] = "reportQuestion";
    strings[strings["reportBug"] = NativeInstabug.reportBug] = "reportBug";
    strings[strings["reportFeedback"] = NativeInstabug.reportFeedback] = "reportFeedback";
    strings[strings["emailFieldHint"] = NativeInstabug.emailFieldHint] = "emailFieldHint";
    strings[strings["commentFieldHintForBugReport"] = NativeInstabug.commentFieldHintForBugReport] = "commentFieldHintForBugReport";
    strings[strings["commentFieldHintForFeedback"] = NativeInstabug.commentFieldHintForFeedback] = "commentFieldHintForFeedback";
    strings[strings["commentFieldHintForQuestion"] = NativeInstabug.commentFieldHintForQuestion] = "commentFieldHintForQuestion";
    strings[strings["videoPressRecord"] = NativeInstabug.videoPressRecord] = "videoPressRecord";
    strings[strings["addVideoMessage"] = NativeInstabug.addVideoMessage] = "addVideoMessage";
    strings[strings["addVoiceMessage"] = NativeInstabug.addVoiceMessage] = "addVoiceMessage";
    strings[strings["addImageFromGallery"] = NativeInstabug.addImageFromGallery] = "addImageFromGallery";
    strings[strings["addExtraScreenshot"] = NativeInstabug.addExtraScreenshot] = "addExtraScreenshot";
    strings[strings["audioRecordingPermissionDeniedTitle"] = NativeInstabug.audioRecordingPermissionDeniedTitle] = "audioRecordingPermissionDeniedTitle";
    strings[strings["audioRecordingPermissionDeniedMessage"] = NativeInstabug.audioRecordingPermissionDeniedMessage] = "audioRecordingPermissionDeniedMessage";
    strings[strings["microphonePermissionAlertSettingsButtonText"] = NativeInstabug.microphonePermissionAlertSettingsButtonTitle] = "microphonePermissionAlertSettingsButtonText";
    strings[strings["recordingMessageToHoldText"] = NativeInstabug.recordingMessageToHoldText] = "recordingMessageToHoldText";
    strings[strings["recordingMessageToReleaseText"] = NativeInstabug.recordingMessageToReleaseText] = "recordingMessageToReleaseText";
    strings[strings["conversationsHeaderTitle"] = NativeInstabug.conversationsHeaderTitle] = "conversationsHeaderTitle";
    strings[strings["screenshotHeaderTitle"] = NativeInstabug.screenshotHeaderTitle] = "screenshotHeaderTitle";
    strings[strings["okButtonText"] = NativeInstabug.okButtonTitle] = "okButtonText";
    strings[strings["cancelButtonText"] = NativeInstabug.cancelButtonTitle] = "cancelButtonText";
    strings[strings["thankYouText"] = NativeInstabug.thankYouText] = "thankYouText";
    strings[strings["audio"] = NativeInstabug.audio] = "audio";
    strings[strings["image"] = NativeInstabug.image] = "image";
    strings[strings["team"] = NativeInstabug.team] = "team";
    strings[strings["messagesNotification"] = NativeInstabug.messagesNotification] = "messagesNotification";
    strings[strings["messagesNotificationAndOthers"] = NativeInstabug.messagesNotificationAndOthers] = "messagesNotificationAndOthers";
    strings[strings["conversationTextFieldHint"] = NativeInstabug.conversationTextFieldHint] = "conversationTextFieldHint";
    strings[strings["collectingDataText"] = NativeInstabug.collectingDataText] = "collectingDataText";
    strings[strings["thankYouAlertText"] = NativeInstabug.thankYouAlertText] = "thankYouAlertText";
    strings[strings["welcomeMessageBetaWelcomeStepTitle"] = NativeInstabug.welcomeMessageBetaWelcomeStepTitle] = "welcomeMessageBetaWelcomeStepTitle";
    strings[strings["welcomeMessageBetaWelcomeStepContent"] = NativeInstabug.welcomeMessageBetaWelcomeStepContent] = "welcomeMessageBetaWelcomeStepContent";
    strings[strings["welcomeMessageBetaHowToReportStepTitle"] = NativeInstabug.welcomeMessageBetaHowToReportStepTitle] = "welcomeMessageBetaHowToReportStepTitle";
    strings[strings["welcomeMessageBetaHowToReportStepContent"] = NativeInstabug.welcomeMessageBetaHowToReportStepContent] = "welcomeMessageBetaHowToReportStepContent";
    strings[strings["welcomeMessageBetaFinishStepTitle"] = NativeInstabug.welcomeMessageBetaFinishStepTitle] = "welcomeMessageBetaFinishStepTitle";
    strings[strings["welcomeMessageBetaFinishStepContent"] = NativeInstabug.welcomeMessageBetaFinishStepContent] = "welcomeMessageBetaFinishStepContent";
    strings[strings["welcomeMessageLiveWelcomeStepTitle"] = NativeInstabug.welcomeMessageLiveWelcomeStepTitle] = "welcomeMessageLiveWelcomeStepTitle";
    strings[strings["welcomeMessageLiveWelcomeStepContent"] = NativeInstabug.welcomeMessageLiveWelcomeStepContent] = "welcomeMessageLiveWelcomeStepContent";
    strings[strings["surveysStoreRatingThanksTitle"] = NativeInstabug.surveysStoreRatingThanksTitle] = "surveysStoreRatingThanksTitle";
    strings[strings["surveysStoreRatingThanksSubtitle"] = NativeInstabug.surveysStoreRatingThanksSubtitle] = "surveysStoreRatingThanksSubtitle";
    strings[strings["reportBugDescription"] = NativeInstabug.reportBugDescription] = "reportBugDescription";
    strings[strings["reportFeedbackDescription"] = NativeInstabug.reportFeedbackDescription] = "reportFeedbackDescription";
    strings[strings["reportQuestionDescription"] = NativeInstabug.reportQuestionDescription] = "reportQuestionDescription";
    strings[strings["requestFeatureDescription"] = NativeInstabug.requestFeatureDescription] = "requestFeatureDescription";
    strings[strings["discardAlertTitle"] = NativeInstabug.discardAlertTitle] = "discardAlertTitle";
    strings[strings["discardAlertMessage"] = NativeInstabug.discardAlertMessage] = "discardAlertMessage";
    strings[strings["discardAlertCancel"] = NativeInstabug.discardAlertCancel] = "discardAlertCancel";
    strings[strings["discardAlertAction"] = NativeInstabug.discardAlertAction] = "discardAlertAction";
    strings[strings["addAttachmentButtonTitleStringName"] = NativeInstabug.addAttachmentButtonTitleStringName] = "addAttachmentButtonTitleStringName";
    strings[strings["reportReproStepsDisclaimerBody"] = NativeInstabug.reportReproStepsDisclaimerBody] = "reportReproStepsDisclaimerBody";
    strings[strings["reportReproStepsDisclaimerLink"] = NativeInstabug.reportReproStepsDisclaimerLink] = "reportReproStepsDisclaimerLink";
    strings[strings["reproStepsProgressDialogBody"] = NativeInstabug.reproStepsProgressDialogBody] = "reproStepsProgressDialogBody";
    strings[strings["reproStepsListHeader"] = NativeInstabug.reproStepsListHeader] = "reproStepsListHeader";
    strings[strings["reproStepsListDescription"] = NativeInstabug.reproStepsListDescription] = "reproStepsListDescription";
    strings[strings["reproStepsListEmptyStateDescription"] = NativeInstabug.reproStepsListEmptyStateDescription] = "reproStepsListEmptyStateDescription";
    strings[strings["reproStepsListItemTitle"] = NativeInstabug.reproStepsListItemTitle] = "reproStepsListItemTitle";
    strings[strings["screenRecording"] = NativeInstabug.screenRecording] = "screenRecording";
    strings[strings["insufficientContentMessage"] = NativeInstabug.insufficientContentMessage] = "insufficientContentMessage";
    strings[strings["insufficientContentTitle"] = NativeInstabug.insufficientContentTitle] = "insufficientContentTitle";
})(strings || (strings = {}));
