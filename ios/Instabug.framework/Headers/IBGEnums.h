//
//  IBGEnums.h
//  IBGSDK
//
//  Created by Instabug on 7/21/14.
//  Copyright (c) 2014 Instabug. All rights reserved.
//

//===========================================================================================================================================
//  Enums
//===========================================================================================================================================
/**
 *  The event used to invoke the feedback form
 */
typedef NS_ENUM(NSInteger, IBGInvocationEvent) {
    //  No event will be registered to show the feedback form, you'll need to code your own and call the method showFeedbackForm
    IBGInvocationEventNone,
    //  Shaking the device while in any screen to show the feedback form
    IBGInvocationEventShake,
    //  Taking a screenshot using the Home+Lock buttons while in any screen to show the feedback form, substituted with IBGInvocationEventShake on iOS 6.1.3 and earlier
    IBGInvocationEventScreenshot,
    //  Swiping two fingers left while in any screen to show the feedback form
    IBGInvocationEventTwoFingersSwipeLeft,
    //  Swiping one finger left from the right edge of the screen to show the feedback form, substituted with IBGInvocationEventTwoFingersSwipeLeft on iOS 6.1.3 and earlier
    IBGInvocationEventRightEdgePan,
    //  Shows a floating button on top of all views, when pressed it takes a screenshot
    IBGInvocationEventFloatingButton
};

/**
 *  The color theme of the different UI elements
 */
typedef NS_ENUM(NSInteger, IBGColorTheme) {
    IBGColorThemeLight,
    IBGColorThemeDark
};

/**
 *  The mode used upon invocating the SDK
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
 *  Type of report to be submit
 */
typedef NS_ENUM(NSInteger, IBGReportType) {
    IBGReportTypeBug,
    IBGReportTypeFeedback
};

/**
 *  Type of feedback to be submit
 */
__attribute__((deprecated))
typedef NS_ENUM(NSInteger, IBGFeedbackType) {
    IBGFeedbackTypeBug,
    IBGFeedbackTypeFeedback,
    IBGFeedbackTypeCrash
};

/**
 *  State of Issue after SDK dismiss
 */
__attribute__((deprecated))
typedef NS_ENUM(NSInteger, IBGIssueState) {
    // Issue is submitted
    IBGIssueSubmitted,
    // Issue is cancelled
    IBGIssueCancelled,
    // Issue is in progress, adding extra screenshot
    IBGIssueInProgress
};

/**
 *  Type of SDK dismiss
 */
typedef NS_ENUM(NSInteger, IBGDismissType) {
    // Dismissed after report submit
    IBGDismissTypeSubmit,
    // Dismissed via cancel
    IBGDismissTypeCancel,
    // Dismissed while taking screenshot
    IBGDismissTypeAddAttachment
};

/**
 *  The supported locales
 */
typedef NS_ENUM(NSInteger, IBGLocale) {
    IBGLocaleArabic,
    IBGLocaleChineseSimplified,
    IBGLocaleChineseTraditional,
    IBGLocaleCzech,
    IBGLocaleDanish,
    IBGLocaleEnglish,
    IBGLocaleFrench,
    IBGLocaleGerman,
    IBGLocaleItalian,
    IBGLocaleJapanese,
    IBGLocaleKorean,
    IBGLocalePolish,
    IBGLocalePortugueseBrazil,
    IBGLocaleRussian,
    IBGLocaleSpanish,
    IBGLocaleSwedish,
    IBGLocaleTurkish
};

/**
 *  Instabug strings
 */
typedef NS_ENUM(NSInteger, IBGString) {
    //"<Shake> your device to talk to us"
    IBGStringShakeHint,
    //"<Swipe with 2 fingers> to talk to us"
    IBGStringSwipeHint,
    //"<Swipe from the edge> to talk to us"
    IBGStringEdgeSwipeStartHint,
    //"We love to hear your feedback"
    IBGStringStartAlertText,
    //"Please enter a valid email"
    IBGStringInvalidEmailMessage,
    //"Invalid Email"
    IBGStringInvalidEmailTitle,
    //"Please enter a valid comment"
    IBGStringInvalidCommentMessage,
    //"Invalid Comment"
    IBGStringInvalidCommentTitle,
    //"Help & Feedback"
    IBGStringInvocationHeader,
    //"Talk to us"
    IBGStringTalkToUs,
    //"Report bug"
    IBGStringReportBug,
    //"Suggest an Improvement"
    IBGStringReportFeedback,
    //"Enter your Email"
    IBGStringEmailFieldHint,
    //"What went wrong?"
    IBGStringCommentFieldHintForBugReport,
    //"How can we improve?"
    IBGStringCommentFieldHintForFeedback,
    //"Record a Video Note"
    IBGStringAddVideoMessage,
    //"Record a Voice Note"
    IBGStringAddVoiceMessage,
    //"Select Image from Gallery"
    IBGStringAddImageFromGallery,
    //"Take a Screenshot"
    IBGStringAddExtraScreenshot,
    //"Microphone Access Denied"
    IBGStringAudioRecordingPermissionDeniedTitle,
    //"You can enable access in Privacy Settings"
    IBGStringAudioRecordingPermissionDeniedMessage,
    //"Settings"
    IBGStringMicrophonePermissionAlertSettingsButtonTitle,
    //Conversations
    IBGStringChatsHeaderTitle,
    //Team
    IBGStringTeam,
    //"Press and Hold to Record"
    IBGStringRecordingMessageToHoldText,
    //"Release to Attach"
    IBGStringRecordingMessageToReleaseText,
    //"%@ new messages from %@"
    IBGStringMessagesNotification,
    //%@ new messages from %@ and others
    IBGStringMessagesNotificationAndOthers,
    //"Draw on screenshot"
    IBGStringScreenshotHeaderTitle,
    //"No Conversations Yet"
    IBGStringChatsNoConversationsHeadlineText,
    //"Done"
    IBGStringDoneButtonTitle,
    //"OK"
    IBGStringOkButtonTitle,
    //"Cancel"
    IBGStringCancelButtonTitle,
    //"Thank you"
    IBGStringThankYouText,
    //"Audio"
    IBGStringAudio,
    //"Video"
    IBGStringVideo,
    //"Image"
    IBGStringImage
};
//===========================================================================================================================================
