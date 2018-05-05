/*
 File:       InstabugCore/IBGTypes.h
 
 Contains:   Enums and Constants for using Instabug's SDK.
 
 Copyright:  (c) 2013-2018 by Instabug, Inc., all rights reserved.
 
 Version:    7.12.5
 */

#import <UIKit/UIKit.h>

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
extern NSString * const kIBGSendButtonTitleStringName;
extern NSString * const kIBGCancelButtonTitleStringName;
extern NSString * const kIBGThankYouAlertTitleStringName;
extern NSString * const kIBGThankYouAlertMessageStringName;
extern NSString * const kIBGAudioStringName;
extern NSString * const kIBGScreenRecordingStringName;
extern NSString * const kIBGImageStringName;
extern NSString * const kIBGReachedMaximimNumberOfAttachmentsTitleStringName;
extern NSString * const kIBGReachedMaximimNumberOfAttachmentsMessageStringName;
extern NSString * const kIBGVideoRecordingFailureMessageStringName;
extern NSString * const kIBGSurveyEnterYourAnswerTextPlaceholder;
extern NSString * const kIBGSurveyNoAnswerTitle;
extern NSString * const kIBGSurveyNoAnswerMessage;
extern NSString * const kIBGVideoPressRecordTitle;
extern NSString * const kIBGCollectingDataText;
extern NSString * const kIBGLowDiskStorageTitle;
extern NSString * const kIBGLowDiskStorageMessage;
extern NSString * const kIBGInboundByLineMessage;
extern NSString * const kIBGExtraFieldIsRequiredText;
extern NSString * const kIBGExtraFieldMissingDataText;
extern NSString * const kIBGFeatureRequestsTitle;
extern NSString * const kIBGFeatureDetailsTitle;
extern NSString * const kIBGStringFeatureRequestsRefreshText;
extern NSString * const kIBGFeatureRequestErrorStateTitleLabel;
extern NSString * const kIBGFeatureRequestErrorStateDescriptionLabel;
extern NSString * const kIBGFeatureRequestSortingByRecentlyUpdatedText;
extern NSString * const kIBGFeatureRequestSortingByTopVotesText;
extern NSString * const kIBGStringFeatureRequestAllFeaturesText;
extern NSString * const kIBGAddNewFeatureRequestText;
extern NSString * const kIBGAddNewFeatureRequestToastText;
extern NSString * const kIBGAddNewFeatureRequestErrorToastText;
extern NSString * const kIBGAddNewFeatureRequestLoadingHUDTitle;
extern NSString * const kIBGAddNewFeatureRequestSuccessHUDTitle;
extern NSString * const kIBGAddNewFeatureRequestSuccessHUDMessage;
extern NSString * const kIBGAddNewFeatureRequestTryAgainText;
extern NSString * const kIBGAddNewFeatureRequestCancelPromptTitle;
extern NSString * const kIBGAddNewFeatureRequestCancelPromptYesAction;
extern NSString * const kIBGFeatureRequestInvalidEmailText;
extern NSString * const kIBGFeatureRequestTimelineEmptyText;
extern NSString * const kIBGFeatureRequestTimelineErrorDescriptionLabel;
extern NSString * const kIBGFeatureRequestStatusChangeText;
extern NSString * const kIBGFeatureRequestAddButtonText;
extern NSString * const kIBGFeatureRequestVoteWithCountText;
extern NSString * const kIBGFeatureRequestVoteText;
extern NSString * const kIBGFeatureRequestPostButtonText;
extern NSString * const kIBGFeatureRequestCommentsText;
extern NSString * const kIBGFeatureRequestAuthorText;
extern NSString * const kIBGFeatureRequestEmptyViewTitle;
extern NSString * const kIBGFeatureRequestAddYourIdeaText;
extern NSString * const kIBGFeatureRequestAnonymousText;
extern NSString * const kIBGFeatureRequestStatusPosted;
extern NSString * const kIBGFeatureRequestStatusPlanned;
extern NSString * const kIBGFeatureRequestStatusStarted;
extern NSString * const kIBGFeatureRequestStatusCompleted;
extern NSString * const kIBGFeatureRequestStatusMaybeLater;
extern NSString * const kIBGFeatureRequestStatusMoreText;
extern NSString * const kIBGFeatureRequestStatusLessText;
extern NSString * const kIBGFeatureRequestAddYourThoughtsText;
extern NSString * const kIBGEmailRequiredText;
extern NSString * const kIBGNameText;
extern NSString * const kIBGEmailText;
extern NSString * const kIBGTitleText;
extern NSString * const kIBGDescriptionText;
extern NSString * const kIBGStringFeatureRequestMyFeaturesText;
extern NSString * const kIBGSurveyIntroTitleText;
extern NSString * const kIBGSurveyIntroDescriptionText;
extern NSString * const kIBGSurveyIntroTakeSurveyButtonText;
extern NSString * const kIBGSurveyIntroDismissButtonText;
extern NSString * const kIBGSurveyThankYouTitleText;
extern NSString * const kIBGSurveyThankYouDescriptionText;
extern NSString * const kIBGSurveysNPSLeastLikelyStringName;
extern NSString * const kIBGSurveysNPSMostLikelyStringName;
extern NSString * const kIBGSurveyNextButtonTitle;
extern NSString * const kIBGSurveySubmitButtonTitle;
extern NSString * const kIBGSurveyAppStoreThankYouTitle;
extern NSString * const kIBGSurveyAppStoreButtonTitle;
extern NSString * const kIBGExpectedResultsStringName;
extern NSString * const kIBGActualResultsStringName;
extern NSString * const kIBGStepsToReproduceStringName;
extern NSString * const kIBGReplyButtonTitleStringName;

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
    IBGStringVideoPressRecordTitle,
    IBGStringCollectingDataText,
    IBGStringLowDiskStorageTitle,
    IBGStringLowDiskStorageMessage,
    IBGStringExtraFieldIsRequiredText,
    IBGStringExtraFieldMissingDataText,
    IBGStringFeatureRequestsTitle,
    IBGStringFeatureDetailsTitle,
    IBGStringFeatureRequestsRefreshText,
    IBGStringFeatureRequestSortingByRecentlyUpdatedText,
    IBGStringFeatureRequestSortingByTopVotesText,
    IBGStringFeatureRequestErrorStateTitleText,
    IBGStringFeatureRequestErrorStateDescriptionText,
    IBGStringFeatureRequestAllFeaturesText,
    IBGStringFeatureRequestMyFeaturesText,
    IBGStringAddNewFeatureRequestText,
    IBGStringAddNewFeatureRequestToastText,
    IBGStringAddNewFeatureRequestErrorToastText,
    IBGStringAddNewFeatureRequestLoadingHUDTitle,
    IBGStringAddNewFeatureRequestSuccessHUDTitle,
    IBGStringAddNewFeatureRequestSuccessHUDMessage,
    IBGStringAddNewFeatureRequestTryAgainText,
    IBGStringAddNewFeatureRequestCancelPromptTitle,
    IBGStringAddNewFeatureRequestCancelPromptYesAction,
    IBGStringFeatureRequestInvalidEmailText,
    IBGStringFeatureRequestStatusChangeText,
    IBGStringFeatureRequestAddButtonText,
    IBGStringFeatureRequestVoteWithCountText,
    IBGStringFeatureRequestVoteText,
    IBGStringFeatureRequestPostButtonText,
    IBGStringFeatureRequestCommentsText,
    IBGStringFeatureRequestAuthorText,
    IBGStringFeatureRequestEmptyViewTitle,
    IBGStringFeatureRequestAddYourIdeaText,
    IBGStringFeatureRequestAnonymousText,
    IBGStringFeatureRequestStatusPosted,
    IBGStringFeatureRequestStatusPlanned,
    IBGStringFeatureRequestStatusStarted,
    IBGStringFeatureRequestStatusCompleted,
    IBGStringFeatureRequestStatusMaybeLater,
    IBGFeatureRequestTimelineEmptyCommentText,
    IBGFeatureRequestTimelineErrorDescriptionText,
    IBGStringFeatureRequestStatusMoreText,
    IBGStringFeatureRequestStatusLessText,
    IBGStringFeatureRequestAddYourThoughtsText,
    IBGStringEmailRequiredText,
    IBGStringNameText,
    IBGStringEmailText,
    IBGStringTitleText,
    IBGStringDescriptionText,
    IBGStringSurveyIntroTitleText,
    IBGStringSurveyIntroDescriptionText,
    IBGStringSurveyIntroTakeSurveyButtonText,
    IBGStringSurveyIntroDismissButtonText,
    IBGStringSurveyThankYouTitleText,
    IBGStringSurveyThankYouDescriptionText,
    IBGExpectedResultsStringName,
    IBGActualResultsStringName,
    IBGStepsToReproduceStringName,
    IBGReplyButtonTitleStringName
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
 Instabug floating buttons positions.
 */
typedef NS_ENUM(NSInteger, IBGPosition) {
    IBGPositionBottomRight,
    IBGPositionTopRight,
    IBGPositionBottomLeft,
    IBGPositionTopLeft
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

/**
 The user steps option.
 */
typedef NS_ENUM(NSInteger, IBGUserStepsMode) {
    IBGUserStepsModeEnable,
    IBGUserStepsModeEnabledWithNoScreenshots,
    IBGUserStepsModeDisable
};

 /**
    The attachment types selected in Attachment action sheet.
 */
typedef NS_OPTIONS(NSInteger, IBGAttachmentType) {
    IBGAttachmentTypeScreenShot = 1 << 1,
    IBGAttachmentTypeExtraScreenShot = 1 << 2,
    IBGAttachmentTypeGalleryImage = 1 << 4,
    IBGAttachmentTypeScreenRecording = 1 << 6,
};

/**
 The extended bug report mode.
 */
typedef NS_ENUM(NSInteger, IBGExtendedBugReportMode) {
    IBGExtendedBugReportModeEnabledWithRequiredFields,
    IBGExtendedBugReportModeEnabledWithOptionalFields,
    IBGExtendedBugReportModeDisabled
};

typedef enum : NSUInteger {
    IBGActionAllActions = 1 << 0,
    IBGActionReportBug = 1 << 1,
    IBGActionRequestNewFeature = 1 << 2,
    IBGActionAddCommentToFeature = 1 << 3,
} IBGActionType;

@interface UIView (Instabug)

/**
 @brief Set this to true on any UIView to mark it as private.
 Doing this will exclude it from all screenshots, view hierarchy captures and screen recordings.
 */
@property (nonatomic, assign) BOOL instabug_privateView;

@end
