import { NativeInstabug } from '../native/NativeInstabug';
const constants = NativeInstabug.getConstants();
/**
 * @deprecated Pass a `LogLevel` to `debugLogsLevel` in `Instabug.init` instead.
 *
 * Verbosity level of the SDK debug logs. This has nothing to do with IBGLog,
 * and only affect the logs used to debug the SDK itself.
 */
export var sdkDebugLogsLevel;
(function (sdkDebugLogsLevel) {
    sdkDebugLogsLevel[sdkDebugLogsLevel["sdkDebugLogsLevelVerbose"] = constants.sdkDebugLogsLevelVerbose] = "sdkDebugLogsLevelVerbose";
    sdkDebugLogsLevel[sdkDebugLogsLevel["sdkDebugLogsLevelDebug"] = constants.sdkDebugLogsLevelDebug] = "sdkDebugLogsLevelDebug";
    sdkDebugLogsLevel[sdkDebugLogsLevel["sdkDebugLogsLevelError"] = constants.sdkDebugLogsLevelError] = "sdkDebugLogsLevelError";
    sdkDebugLogsLevel[sdkDebugLogsLevel["sdkDebugLogsLevelNone"] = constants.sdkDebugLogsLevelNone] = "sdkDebugLogsLevelNone";
})(sdkDebugLogsLevel || (sdkDebugLogsLevel = {}));
/**
 * @deprecated Pass a `LogLevel` to `debugLogsLevel` in `Instabug.init` instead.
 *
 * APM Log Level.
 */
export var logLevel;
(function (logLevel) {
    logLevel[logLevel["none"] = constants.logLevelNone] = "none";
    logLevel[logLevel["error"] = constants.logLevelError] = "error";
    logLevel[logLevel["warning"] = constants.logLevelWarning] = "warning";
    logLevel[logLevel["info"] = constants.logLevelInfo] = "info";
    logLevel[logLevel["debug"] = constants.logLevelDebug] = "debug";
    logLevel[logLevel["verbose"] = constants.logLevelVerbose] = "verbose";
})(logLevel || (logLevel = {}));
/**
 * @deprecated Use `InvocationEvent` instead.
 *
 * The event used to invoke the feedback form
 */
export var invocationEvent;
(function (invocationEvent) {
    invocationEvent[invocationEvent["none"] = constants.invocationEventNone] = "none";
    invocationEvent[invocationEvent["shake"] = constants.invocationEventShake] = "shake";
    invocationEvent[invocationEvent["screenshot"] = constants.invocationEventScreenshot] = "screenshot";
    invocationEvent[invocationEvent["twoFingersSwipe"] = constants.invocationEventTwoFingersSwipeLeft] = "twoFingersSwipe";
    invocationEvent[invocationEvent["floatingButton"] = constants.invocationEventFloatingButton] = "floatingButton";
})(invocationEvent || (invocationEvent = {}));
/**
 * @deprecated Use `InvocationOption` instead.
 *
 * Options added while invoking bug reporting.
 */
export var option;
(function (option) {
    option[option["emailFieldHidden"] = constants.optionEmailFieldHidden] = "emailFieldHidden";
    option[option["emailFieldOptional"] = constants.optionEmailFieldOptional] = "emailFieldOptional";
    option[option["commentFieldRequired"] = constants.optionCommentFieldRequired] = "commentFieldRequired";
    option[option["disablePostSendingDialog"] = constants.optionDisablePostSendingDialog] = "disablePostSendingDialog";
})(option || (option = {}));
/**
 * @deprecated Use `ColorTheme` instead.
 *
 * The color theme of the different UI elements
 */
export var colorTheme;
(function (colorTheme) {
    colorTheme[colorTheme["light"] = constants.colorThemeLight] = "light";
    colorTheme[colorTheme["dark"] = constants.colorThemeDark] = "dark";
})(colorTheme || (colorTheme = {}));
/**
 * @deprecated Use `FloatingButtonPosition` instead.
 *
 * Floating Button edges
 */
export var floatingButtonEdge;
(function (floatingButtonEdge) {
    floatingButtonEdge[floatingButtonEdge["left"] = constants.rectMinXEdge] = "left";
    floatingButtonEdge[floatingButtonEdge["right"] = constants.rectMaxXEdge] = "right";
})(floatingButtonEdge || (floatingButtonEdge = {}));
/**
 * @deprecated Use `RecordingButtonPosition` instead.
 *
 * constants floating buttons positions.
 */
export var position;
(function (position) {
    position[position["bottomRight"] = constants.bottomRight] = "bottomRight";
    position[position["topRight"] = constants.topRight] = "topRight";
    position[position["bottomLeft"] = constants.bottomLeft] = "bottomLeft";
    position[position["topLeft"] = constants.topLeft] = "topLeft";
})(position || (position = {}));
/**
 * @deprecated Use `RecordingButtonPosition` instead.
 *
 * constants floating buttons positions.
 */
export var IBGPosition;
(function (IBGPosition) {
    IBGPosition[IBGPosition["bottomRight"] = constants.bottomRight] = "bottomRight";
    IBGPosition[IBGPosition["topRight"] = constants.topRight] = "topRight";
    IBGPosition[IBGPosition["bottomLeft"] = constants.bottomLeft] = "bottomLeft";
    IBGPosition[IBGPosition["topLeft"] = constants.topLeft] = "topLeft";
})(IBGPosition || (IBGPosition = {}));
/**
 * @deprecated Use `WelcomeMessageMode` instead.
 *
 * The welcome message mode.
 */
export var welcomeMessageMode;
(function (welcomeMessageMode) {
    welcomeMessageMode[welcomeMessageMode["live"] = constants.welcomeMessageModeLive] = "live";
    welcomeMessageMode[welcomeMessageMode["beta"] = constants.welcomeMessageModeBeta] = "beta";
    welcomeMessageMode[welcomeMessageMode["disabled"] = constants.welcomeMessageModeDisabled] = "disabled";
})(welcomeMessageMode || (welcomeMessageMode = {}));
/**
 * @deprecated Use `ReportType` instead.
 *
 * Type of the report either feedback or bug.
 */
export var reportType;
(function (reportType) {
    reportType[reportType["bug"] = constants.bugReportingReportTypeBug] = "bug";
    reportType[reportType["feedback"] = constants.bugReportingReportTypeFeedback] = "feedback";
    reportType[reportType["question"] = constants.bugReportingReportTypeQuestion] = "question";
})(reportType || (reportType = {}));
/**
 * @deprecated Use `DismissType` instead.
 *
 * Type of SDK dismiss
 */
export var dismissType;
(function (dismissType) {
    dismissType[dismissType["submit"] = constants.dismissTypeSubmit] = "submit";
    dismissType[dismissType["cancel"] = constants.dismissTypeCancel] = "cancel";
    dismissType[dismissType["addAttachment"] = constants.dismissTypeAddAttachment] = "addAttachment";
})(dismissType || (dismissType = {}));
/**
 * @deprecated Use `ActionType` instead.
 *
 * constants action types.
 */
export var actionTypes;
(function (actionTypes) {
    actionTypes[actionTypes["allActions"] = constants.allActions] = "allActions";
    actionTypes[actionTypes["reportBug"] = constants.reportBugAction] = "reportBug";
    actionTypes[actionTypes["requestNewFeature"] = constants.requestNewFeature] = "requestNewFeature";
    actionTypes[actionTypes["addCommentToFeature"] = constants.addCommentToFeature] = "addCommentToFeature";
})(actionTypes || (actionTypes = {}));
/**
 * @deprecated Use `ExtendedBugReportMode` instead.
 *
 * The extended bug report mode
 */
export var extendedBugReportMode;
(function (extendedBugReportMode) {
    extendedBugReportMode[extendedBugReportMode["enabledWithRequiredFields"] = constants.enabledWithRequiredFields] = "enabledWithRequiredFields";
    extendedBugReportMode[extendedBugReportMode["enabledWithOptionalFields"] = constants.enabledWithOptionalFields] = "enabledWithOptionalFields";
    extendedBugReportMode[extendedBugReportMode["disabled"] = constants.disabled] = "disabled";
})(extendedBugReportMode || (extendedBugReportMode = {}));
/**
 * @deprecated Use `ReproStepsMode` instead.
 *
 * The user steps option.
 */
export var reproStepsMode;
(function (reproStepsMode) {
    reproStepsMode[reproStepsMode["enabled"] = constants.reproStepsEnabled] = "enabled";
    reproStepsMode[reproStepsMode["disabled"] = constants.reproStepsDisabled] = "disabled";
    reproStepsMode[reproStepsMode["enabledWithNoScreenshots"] = constants.reproStepsEnabledWithNoScreenshots] = "enabledWithNoScreenshots";
})(reproStepsMode || (reproStepsMode = {}));
/**
 * @deprecated Use `Locale` instead.
 *
 * The supported locales
 */
export var locale;
(function (locale) {
    locale[locale["arabic"] = constants.localeArabic] = "arabic";
    locale[locale["azerbaijani"] = constants.localeAzerbaijani] = "azerbaijani";
    locale[locale["chineseSimplified"] = constants.localeChineseSimplified] = "chineseSimplified";
    locale[locale["chineseTraditional"] = constants.localeChineseTraditional] = "chineseTraditional";
    locale[locale["czech"] = constants.localeCzech] = "czech";
    locale[locale["danish"] = constants.localeDanish] = "danish";
    locale[locale["dutch"] = constants.localeDutch] = "dutch";
    locale[locale["english"] = constants.localeEnglish] = "english";
    locale[locale["french"] = constants.localeFrench] = "french";
    locale[locale["german"] = constants.localeGerman] = "german";
    locale[locale["italian"] = constants.localeItalian] = "italian";
    locale[locale["japanese"] = constants.localeJapanese] = "japanese";
    locale[locale["korean"] = constants.localeKorean] = "korean";
    locale[locale["polish"] = constants.localePolish] = "polish";
    locale[locale["portugueseBrazil"] = constants.localePortugueseBrazil] = "portugueseBrazil";
    locale[locale["romanian"] = constants.localeRomanian] = "romanian";
    locale[locale["russian"] = constants.localeRussian] = "russian";
    locale[locale["spanish"] = constants.localeSpanish] = "spanish";
    locale[locale["swedish"] = constants.localeSwedish] = "swedish";
    locale[locale["turkish"] = constants.localeTurkish] = "turkish";
})(locale || (locale = {}));
/**
 * @deprecated Use `StringKey` instead.
 *
 * constants strings
 */
export var strings;
(function (strings) {
    strings[strings["shakeHint"] = constants.shakeHint] = "shakeHint";
    strings[strings["swipeHint"] = constants.swipeHint] = "swipeHint";
    strings[strings["edgeSwipeStartHint"] = constants.edgeSwipeStartHint] = "edgeSwipeStartHint";
    strings[strings["startAlertText"] = constants.startAlertText] = "startAlertText";
    strings[strings["invalidEmailMessage"] = constants.invalidEmailMessage] = "invalidEmailMessage";
    strings[strings["invalidEmailTitle"] = constants.invalidEmailTitle] = "invalidEmailTitle";
    strings[strings["invalidCommentMessage"] = constants.invalidCommentMessage] = "invalidCommentMessage";
    strings[strings["invalidCommentTitle"] = constants.invalidCommentTitle] = "invalidCommentTitle";
    strings[strings["invocationHeader"] = constants.invocationHeader] = "invocationHeader";
    strings[strings["reportQuestion"] = constants.reportQuestion] = "reportQuestion";
    strings[strings["reportBug"] = constants.reportBug] = "reportBug";
    strings[strings["reportFeedback"] = constants.reportFeedback] = "reportFeedback";
    strings[strings["emailFieldHint"] = constants.emailFieldHint] = "emailFieldHint";
    strings[strings["commentFieldHintForBugReport"] = constants.commentFieldHintForBugReport] = "commentFieldHintForBugReport";
    strings[strings["commentFieldHintForFeedback"] = constants.commentFieldHintForFeedback] = "commentFieldHintForFeedback";
    strings[strings["commentFieldHintForQuestion"] = constants.commentFieldHintForQuestion] = "commentFieldHintForQuestion";
    strings[strings["videoPressRecord"] = constants.videoPressRecord] = "videoPressRecord";
    strings[strings["addVideoMessage"] = constants.addVideoMessage] = "addVideoMessage";
    strings[strings["addVoiceMessage"] = constants.addVoiceMessage] = "addVoiceMessage";
    strings[strings["addImageFromGallery"] = constants.addImageFromGallery] = "addImageFromGallery";
    strings[strings["addExtraScreenshot"] = constants.addExtraScreenshot] = "addExtraScreenshot";
    strings[strings["audioRecordingPermissionDeniedTitle"] = constants.audioRecordingPermissionDeniedTitle] = "audioRecordingPermissionDeniedTitle";
    strings[strings["audioRecordingPermissionDeniedMessage"] = constants.audioRecordingPermissionDeniedMessage] = "audioRecordingPermissionDeniedMessage";
    strings[strings["microphonePermissionAlertSettingsButtonText"] = constants.microphonePermissionAlertSettingsButtonTitle] = "microphonePermissionAlertSettingsButtonText";
    strings[strings["recordingMessageToHoldText"] = constants.recordingMessageToHoldText] = "recordingMessageToHoldText";
    strings[strings["recordingMessageToReleaseText"] = constants.recordingMessageToReleaseText] = "recordingMessageToReleaseText";
    strings[strings["conversationsHeaderTitle"] = constants.conversationsHeaderTitle] = "conversationsHeaderTitle";
    strings[strings["screenshotHeaderTitle"] = constants.screenshotHeaderTitle] = "screenshotHeaderTitle";
    strings[strings["okButtonText"] = constants.okButtonTitle] = "okButtonText";
    strings[strings["cancelButtonText"] = constants.cancelButtonTitle] = "cancelButtonText";
    strings[strings["thankYouText"] = constants.thankYouText] = "thankYouText";
    strings[strings["audio"] = constants.audio] = "audio";
    strings[strings["image"] = constants.image] = "image";
    strings[strings["team"] = constants.team] = "team";
    strings[strings["messagesNotification"] = constants.messagesNotification] = "messagesNotification";
    strings[strings["messagesNotificationAndOthers"] = constants.messagesNotificationAndOthers] = "messagesNotificationAndOthers";
    strings[strings["conversationTextFieldHint"] = constants.conversationTextFieldHint] = "conversationTextFieldHint";
    strings[strings["collectingDataText"] = constants.collectingDataText] = "collectingDataText";
    strings[strings["thankYouAlertText"] = constants.thankYouAlertText] = "thankYouAlertText";
    strings[strings["welcomeMessageBetaWelcomeStepTitle"] = constants.welcomeMessageBetaWelcomeStepTitle] = "welcomeMessageBetaWelcomeStepTitle";
    strings[strings["welcomeMessageBetaWelcomeStepContent"] = constants.welcomeMessageBetaWelcomeStepContent] = "welcomeMessageBetaWelcomeStepContent";
    strings[strings["welcomeMessageBetaHowToReportStepTitle"] = constants.welcomeMessageBetaHowToReportStepTitle] = "welcomeMessageBetaHowToReportStepTitle";
    strings[strings["welcomeMessageBetaHowToReportStepContent"] = constants.welcomeMessageBetaHowToReportStepContent] = "welcomeMessageBetaHowToReportStepContent";
    strings[strings["welcomeMessageBetaFinishStepTitle"] = constants.welcomeMessageBetaFinishStepTitle] = "welcomeMessageBetaFinishStepTitle";
    strings[strings["welcomeMessageBetaFinishStepContent"] = constants.welcomeMessageBetaFinishStepContent] = "welcomeMessageBetaFinishStepContent";
    strings[strings["welcomeMessageLiveWelcomeStepTitle"] = constants.welcomeMessageLiveWelcomeStepTitle] = "welcomeMessageLiveWelcomeStepTitle";
    strings[strings["welcomeMessageLiveWelcomeStepContent"] = constants.welcomeMessageLiveWelcomeStepContent] = "welcomeMessageLiveWelcomeStepContent";
    strings[strings["surveysStoreRatingThanksTitle"] = constants.surveysStoreRatingThanksTitle] = "surveysStoreRatingThanksTitle";
    strings[strings["surveysStoreRatingThanksSubtitle"] = constants.surveysStoreRatingThanksSubtitle] = "surveysStoreRatingThanksSubtitle";
    strings[strings["reportBugDescription"] = constants.reportBugDescription] = "reportBugDescription";
    strings[strings["reportFeedbackDescription"] = constants.reportFeedbackDescription] = "reportFeedbackDescription";
    strings[strings["reportQuestionDescription"] = constants.reportQuestionDescription] = "reportQuestionDescription";
    strings[strings["requestFeatureDescription"] = constants.requestFeatureDescription] = "requestFeatureDescription";
    strings[strings["discardAlertTitle"] = constants.discardAlertTitle] = "discardAlertTitle";
    strings[strings["discardAlertMessage"] = constants.discardAlertMessage] = "discardAlertMessage";
    /** @deprecated Use {@link discardAlertStay} and {@link discardAlertDiscard} instead */
    strings[strings["discardAlertCancel"] = constants.discardAlertCancel] = "discardAlertCancel";
    /** @deprecated Use {@link discardAlertStay} and {@link discardAlertDiscard} instead */
    strings[strings["discardAlertAction"] = constants.discardAlertAction] = "discardAlertAction";
    strings[strings["discardAlertDiscard"] = constants.discardAlertDiscard] = "discardAlertDiscard";
    strings[strings["discardAlertStay"] = constants.discardAlertStay] = "discardAlertStay";
    strings[strings["addAttachmentButtonTitleStringName"] = constants.addAttachmentButtonTitleStringName] = "addAttachmentButtonTitleStringName";
    strings[strings["reportReproStepsDisclaimerBody"] = constants.reportReproStepsDisclaimerBody] = "reportReproStepsDisclaimerBody";
    strings[strings["reportReproStepsDisclaimerLink"] = constants.reportReproStepsDisclaimerLink] = "reportReproStepsDisclaimerLink";
    strings[strings["reproStepsProgressDialogBody"] = constants.reproStepsProgressDialogBody] = "reproStepsProgressDialogBody";
    strings[strings["reproStepsListHeader"] = constants.reproStepsListHeader] = "reproStepsListHeader";
    strings[strings["reproStepsListDescription"] = constants.reproStepsListDescription] = "reproStepsListDescription";
    strings[strings["reproStepsListEmptyStateDescription"] = constants.reproStepsListEmptyStateDescription] = "reproStepsListEmptyStateDescription";
    strings[strings["reproStepsListItemTitle"] = constants.reproStepsListItemTitle] = "reproStepsListItemTitle";
    strings[strings["screenRecording"] = constants.screenRecording] = "screenRecording";
    strings[strings["insufficientContentMessage"] = constants.insufficientContentMessage] = "insufficientContentMessage";
    strings[strings["insufficientContentTitle"] = constants.insufficientContentTitle] = "insufficientContentTitle";
})(strings || (strings = {}));
