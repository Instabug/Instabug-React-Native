//
//  IBGTypes.h
//  Instabug
//
//  Copyright:  (c) 2013-2016 by Instabug, Inc., all rights reserved.
//

#import <Foundation/Foundation.h>

/// ------------------------------
/// @name User-facing Strings Keys
/// ------------------------------

// Predefined keys to be used to override any of the user-facing strings in the SDK. See + [Instabug setValue:forStringWithKey]

extern NSString * const kIBGStartAlertTextStringName;
extern NSString * const kIBGShakeStartAlertTextStringName;
extern NSString * const kIBGTwoFingerSwipeStartAlertTextStringName;
extern NSString * const kIBGEdgeSwipeStartAlertTextStringName;
extern NSString * const kIBGScreenshotStartAlertTextStringName;
extern NSString * const kIBGInvalidEmailMessageStringName;
extern NSString * const kIBGInvalidEmailTitleStringName;
extern NSString * const kIBGInvalidCommentMessageStringName;
extern NSString * const kIBGInvalidCommentTitleStringName;
extern NSString * const kIBGInvocationTitleStringName;
extern NSString * const kIBGTalkToUsStringName;
extern NSString * const kIBGReportBugStringName;
extern NSString * const kIBGReportFeedbackStringName;
extern NSString * const kIBGEmailFieldPlaceholderStringName;
extern NSString * const kIBGCommentFieldPlaceholderForBugReportStringName;
extern NSString * const kIBGCommentFieldPlaceholderForFeedbackStringName;
extern NSString * const kIBGChatReplyFieldPlaceholderStringName;
extern NSString * const kIBGAddScreenRecordingMessageStringName;
extern NSString * const kIBGAddVoiceMessageStringName;
extern NSString * const kIBGAddImageFromGalleryStringName;
extern NSString * const kIBGAddExtraScreenshotStringName;
extern NSString * const kIBGAudioRecordingPermissionDeniedTitleStringName;
extern NSString * const kIBGAudioRecordingPermissionDeniedMessageStringName;
extern NSString * const kIBGScreenRecordingPermissionDeniedMessageStringName;
extern NSString * const kIBGMicrophonePermissionAlertSettingsButtonTitleStringName;
extern NSString * const kIBGMicrophonePermissionAlertLaterButtonTitleStringName;
extern NSString * const kIBGChatsTitleStringName;
extern NSString * const kIBGTeamStringName;
extern NSString * const kIBGRecordingMessageToHoldTextStringName;
extern NSString * const kIBGRecordingMessageToReleaseTextStringName;
extern NSString * const kIBGMessagesNotificationTitleSingleMessageStringName;
extern NSString * const kIBGMessagesNotificationTitleMultipleMessagesStringName;
extern NSString * const kIBGScreenshotTitleStringName;
extern NSString * const kIBGOkButtonTitleStringName;
extern NSString * const kIBGCancelButtonTitleStringName;
extern NSString * const kIBGThankYouAlertTitleStringName;
extern NSString * const kIBGThankYouAlertMessageStringName;
extern NSString * const kIBGAudioStringName;
extern NSString * const kIBGScreenRecordingStringName;
extern NSString * const kIBGImageStringName;
extern NSString * const kIBGReachedMaximimNumberOfAttachmentsTitleStringName;
extern NSString * const kIBGReachedMaximimNumberOfAttachmentsMessageStringName;
extern NSString * const kIBGSurveyEnterYourAnswerTextPlaceholder;
extern NSString * const kIBGSurveyNoAnswerTitle;
extern NSString * const kIBGSurveyNoAnswerMessage;
extern NSString * const kIBGSurveySubmitTitle;
extern NSString * const kIBGVideoPressRecordTitle;
extern NSString * const kIBGLowDiskStorageTitle;
extern NSString * const kIBGLowDiskStorageMessage;
extern NSString * const kIBGCollectingDataText;
extern NSString * const kIBGExtraFieldIsRequiredText;
extern NSString * const kIBGExtraFieldMissingDataText;

/// -----------
/// @name Enums
/// -----------

/**
 The event used to invoke the feedback form.
 */
typedef NS_ENUM(NSInteger, IBGInvocationEvent) {
    /** No event will be registered to show the feedback form, you'll need to code your own and call the method showFeedbackForm. */
    IBGInvocationEventNone,
    /** Shaking the device while in any screen to show the feedback form. */
    IBGInvocationEventShake,
    /** Taking a screenshot using the Home+Lock buttons while in any screen to show the feedback form. */
    IBGInvocationEventScreenshot,
    /** Swiping two fingers left while in any screen to show the feedback form. */
    IBGInvocationEventTwoFingersSwipeLeft,
    /** Swiping one finger left from the right edge of the screen to show the feedback form, substituted with IBGInvocationEventTwoFingersSwipeLeft on iOS 6.1.3 and earlier. */
    IBGInvocationEventRightEdgePan,
    /**  Shows a floating button on top of all views, when pressed it takes a screenshot. */
    IBGInvocationEventFloatingButton
};

/**
 The color theme of the different UI elements.
 */
typedef NS_ENUM(NSInteger, IBGColorTheme) {
    IBGColorThemeLight,
    IBGColorThemeDark
};

/**
 The mode used upon invocating the SDK.
 */
typedef NS_ENUM(NSInteger, IBGInvocationMode) {
    IBGInvocationModeNA,
    IBGInvocationModeBugReporter __attribute__((deprecated)),
    IBGInvocationModeFeedbackSender __attribute__((deprecated)),
    IBGInvocationModeNewBug,
    IBGInvocationModeNewFeedback,
    IBGInvocationModeNewChat,
    IBGInvocationModeChatsList
};

/**
 Type of report to be submitted.
 */
typedef NS_ENUM(NSInteger, IBGReportType) {
    IBGReportTypeBug,
    IBGReportTypeFeedback
};

/**
 Type of feedback to be submitted.
 */
__attribute__((deprecated))
typedef NS_ENUM(NSInteger, IBGFeedbackType) {
    IBGFeedbackTypeBug,
    IBGFeedbackTypeFeedback,
    IBGFeedbackTypeCrash
};

/**
 State of Issue after SDK dismiss.
 */
__attribute__((deprecated))
typedef NS_ENUM(NSInteger, IBGIssueState) {
    /** Issue is submitted */
    IBGIssueSubmitted,
    /** Issue is cancelled */
    IBGIssueCancelled,
    /** Issue is in progress, adding extra screenshot */
    IBGIssueInProgress
};

/**
 Type of SDK dismiss.
 */
typedef NS_ENUM(NSInteger, IBGDismissType) {
    /** Dismissed after report submit */
    IBGDismissTypeSubmit,
    /** Dismissed via cancel */
    IBGDismissTypeCancel,
    /** Dismissed while taking screenshot */
    IBGDismissTypeAddAttachment
};

/**
 Supported locales.
 */
typedef NS_ENUM(NSInteger, IBGLocale) {
    IBGLocaleArabic,
    IBGLocaleChineseSimplified,
    IBGLocaleChineseTaiwan,
    IBGLocaleChineseTraditional,
    IBGLocaleCzech,
    IBGLocaleDanish,
    IBGLocaleDutch,
    IBGLocaleEnglish,
    IBGLocaleFrench,
    IBGLocaleGerman,
    IBGLocaleItalian,
    IBGLocaleJapanese,
    IBGLocaleKorean,
    IBGLocaleNorwegian,
    IBGLocalePolish,
    IBGLocalePortugese,
    IBGLocalePortugueseBrazil,
    IBGLocaleRussian,
    IBGLocaleSlovak,
    IBGLocaleSpanish,
    IBGLocaleSwedish,
    IBGLocaleTurkish
};

/**
 Verbosity level of the SDK debug logs. This has nothing to do with IBGLog, and only affect the logs used to debug the
 SDK itself.
 
 Defaults to IBGSDKDebugLogsLevelError. Make sure you only use IBGSDKDebugLogsLevelError or IBGSDKDebugLogsLevelNone in
 production builds.
 */
typedef NS_ENUM(NSInteger, IBGSDKDebugLogsLevel) {
    IBGSDKDebugLogsLevelVerbose,
    IBGSDKDebugLogsLevelDebug,
    IBGSDKDebugLogsLevelError,
    IBGSDKDebugLogsLevelNone
};

/**
 Keys for publicly-facing strings in the SDK.
 Deprecated. Use NSString constants like IBGShakeStartAlertTextStringName and IBGEmailFieldPlaceholderStringName instead.
 */
typedef NS_ENUM(NSInteger, IBGString) {
    IBGStringShakeHint,
    IBGStringSwipeHint,
    IBGStringEdgeSwipeStartHint,
    IBGStringStartAlertText,
    IBGStringInvalidEmailMessage,
    IBGStringInvalidEmailTitle,
    IBGStringInvalidCommentMessage,
    IBGStringInvalidCommentTitle,
    IBGStringInvocationHeader,
    IBGStringTalkToUs,
    IBGStringReportBug,
    IBGStringReportFeedback,
    IBGStringEmailFieldHint,
    IBGStringCommentFieldHintForBugReport,
    IBGStringCommentFieldHintForFeedback,
    IBGStringAddScreenRecordingMessage,
    IBGStringAddVoiceMessage,
    IBGStringAddImageFromGallery,
    IBGStringAddExtraScreenshot,
    IBGStringAudioRecordingPermissionDeniedTitle,
    IBGStringAudioRecordingPermissionDeniedMessage,
    IBGStringScreenRecordingPermissionDeniedMessage,
    IBGStringMicrophonePermissionAlertSettingsButtonTitle,
    IBGStringMicrophonePermissionAlertLaterButtonTitle,
    IBGStringChatsHeaderTitle,
    IBGStringTeam,
    IBGStringRecordingMessageToHoldText,
    IBGStringRecordingMessageToReleaseText,
    IBGStringMessagesNotification,
    IBGStringMessagesNotificationAndOthers,
    IBGStringScreenshotHeaderTitle,
    IBGStringOkButtonTitle,
    IBGStringCancelButtonTitle,
    IBGStringThankYouText,
    IBGStringThankYouAlertText,
    IBGStringAudio,
    IBGStringScreenRecording,
    IBGStringImage,
    IBGStringSurveyEnterYourAnswerPlaceholder,
    kIBGStringSurveyNoAnswerTitle,
    kIBGStringSurveyNoAnswerMessage,
    kIBGStringSurveySubmitTitle,
    kIBGStringVideoPressRecordTitle,
    kIBGStringLowDiskStorageTitle,
    kIBGStringLowDiskStorageMessage,
    kIBGStringCollectingDataText,
    kIBGStringExtraFieldIsRequiredText,
    kIBGStringExtraFieldMissingDataText
};

/**
 The prompt option selected in Instabug prompt.
 */
typedef NS_ENUM(NSInteger, IBGPromptOption) {
    IBGPromptOptionChat,
    IBGPromptOptionBug,
    IBGPromptOptionFeedback
};

/**
 The Conosle Log Level.
 */
typedef NS_ENUM(NSInteger, IBGLogLevel) {
    IBGLogLevelDefault,
    IBGLogLevelTrace,
    IBGLogLevelInfo,
    IBGLogLevelWarning,
    IBGLogLevelError,
    IBGLogLevelFatal
};

