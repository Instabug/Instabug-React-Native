#import "ArgsRegistry.h"

@implementation ArgsRegistry

+ (NSMutableDictionary *) getAll {
    NSMutableDictionary *all = [[NSMutableDictionary alloc] init];

    [all addEntriesFromDictionary:ArgsRegistry.sdkLogLevels];
    [all addEntriesFromDictionary:ArgsRegistry.invocationEvents];
    [all addEntriesFromDictionary:ArgsRegistry.invocationOptions];
    [all addEntriesFromDictionary:ArgsRegistry.colorThemes];
    [all addEntriesFromDictionary:ArgsRegistry.floatingButtonEdges];
    [all addEntriesFromDictionary:ArgsRegistry.recordButtonPositions];
    [all addEntriesFromDictionary:ArgsRegistry.welcomeMessageStates];
    [all addEntriesFromDictionary:ArgsRegistry.reportTypes];
    [all addEntriesFromDictionary:ArgsRegistry.dismissTypes];
    [all addEntriesFromDictionary:ArgsRegistry.actionTypes];
    [all addEntriesFromDictionary:ArgsRegistry.extendedBugReportStates];
    [all addEntriesFromDictionary:ArgsRegistry.reproStates];
    [all addEntriesFromDictionary:ArgsRegistry.locales];
    [all addEntriesFromDictionary:ArgsRegistry.placeholders];

    return all;
}

+ (ArgsDictionary *) sdkLogLevels {
    return @{
        @"sdkDebugLogsLevelVerbose": @(IBGSDKDebugLogsLevelVerbose),
        @"sdkDebugLogsLevelDebug": @(IBGSDKDebugLogsLevelDebug),
        @"sdkDebugLogsLevelError": @(IBGSDKDebugLogsLevelError),
        @"sdkDebugLogsLevelNone": @(IBGSDKDebugLogsLevelNone),
    };
}

+ (ArgsDictionary *) invocationEvents {
    return@{
        @"invocationEventNone": @(IBGInvocationEventNone),
        @"invocationEventShake": @(IBGInvocationEventShake),
        @"invocationEventScreenshot": @(IBGInvocationEventScreenshot),
        @"invocationEventTwoFingersSwipeLeft": @(IBGInvocationEventTwoFingersSwipeLeft),
        @"invocationEventRightEdgePan": @(IBGInvocationEventRightEdgePan),
        @"invocationEventFloatingButton": @(IBGInvocationEventFloatingButton)
    };
}

+ (ArgsDictionary *) invocationOptions {
    return @{
        @"optionEmailFieldHidden": @(IBGBugReportingOptionEmailFieldHidden),
        @"optionEmailFieldOptional": @(IBGBugReportingOptionEmailFieldOptional),
        @"optionCommentFieldRequired": @(IBGBugReportingOptionCommentFieldRequired),
        @"optionDisablePostSendingDialog": @(IBGBugReportingOptionDisablePostSendingDialog),

        // Deprecated
        @"emailFieldHidden": @(IBGBugReportingInvocationOptionEmailFieldHidden),
        @"emailFieldOptional": @(IBGBugReportingInvocationOptionEmailFieldOptional),
        @"commentFieldRequired": @(IBGBugReportingInvocationOptionCommentFieldRequired),
        @"disablePostSendingDialog": @(IBGBugReportingInvocationOptionDisablePostSendingDialog),
    };
}

+ (ArgsDictionary *) colorThemes {
    return @{
        @"colorThemeLight": @(IBGColorThemeLight),
        @"colorThemeDark": @(IBGColorThemeDark),
    };
}

+ (ArgsDictionary *) floatingButtonEdges {
    return @{
        @"rectMinXEdge": @(CGRectMinXEdge),
        @"rectMinYEdge": @(CGRectMinYEdge),
        @"rectMaxXEdge": @(CGRectMaxXEdge),
        @"rectMaxYEdge": @(CGRectMaxYEdge),
    };
}

+ (ArgsDictionary *) recordButtonPositions {
    return @{
        @"topLeft": @(IBGPositionTopLeft),
        @"topRight": @(IBGPositionTopRight),
        @"bottomLeft": @(IBGPositionBottomLeft),
        @"bottomRight": @(IBGPositionBottomRight),
    };
}

+ (ArgsDictionary *) welcomeMessageStates {
    return @{
        @"welcomeMessageModeLive": @(IBGWelcomeMessageModeLive),
        @"welcomeMessageModeBeta": @(IBGWelcomeMessageModeBeta),
        @"welcomeMessageModeDisabled": @(IBGWelcomeMessageModeDisabled),
    };
}

+ (ArgsDictionary *) reportTypes {
    return @{
        @"bugReportingReportTypeBug": @(IBGBugReportingReportTypeBug),
        @"bugReportingReportTypeFeedback": @(IBGBugReportingReportTypeFeedback),
        @"bugReportingReportTypeQuestion": @(IBGBugReportingReportTypeQuestion),
    };
}

+ (ArgsDictionary *) dismissTypes {
    return @{
        @"dismissTypeSubmit": @(IBGDismissTypeSubmit),
        @"dismissTypeCancel": @(IBGDismissTypeCancel),
        @"dismissTypeAddAttachment": @(IBGDismissTypeAddAttachment),
    };
}

+ (ArgsDictionary *) actionTypes {
    return @{
        @"allActions": @(IBGActionAllActions),
        @"reportBugAction": @(IBGActionReportBug), // Deprecated
        @"requestNewFeature": @(IBGActionRequestNewFeature),
        @"addCommentToFeature": @(IBGActionAddCommentToFeature),
    };
}

+ (ArgsDictionary *) extendedBugReportStates {
    return @{
        @"enabledWithRequiredFields": @(IBGExtendedBugReportModeEnabledWithRequiredFields),
        @"enabledWithOptionalFields": @(IBGExtendedBugReportModeEnabledWithOptionalFields),
        @"disabled": @(IBGExtendedBugReportModeDisabled),
    };
}

+ (ArgsDictionary *) reproStates {
    return @{
        @"reproStepsEnabled": @(IBGUserStepsModeEnable),
        @"reproStepsDisabled": @(IBGUserStepsModeDisable),
        @"reproStepsEnabledWithNoScreenshots": @(IBGUserStepsModeEnabledWithNoScreenshots),
    };
}

+ (ArgsDictionary *) locales {
    return @{
        @"localeArabic": @(IBGLocaleArabic),
        @"localeAzerbaijani": @(IBGLocaleAzerbaijani),
        @"localeChineseSimplified": @(IBGLocaleChineseSimplified),
        @"localeChineseTraditional": @(IBGLocaleChineseTraditional),
        @"localeCzech": @(IBGLocaleCzech),
        @"localeDanish": @(IBGLocaleDanish),
        @"localeDutch": @(IBGLocaleDutch),
        @"localeEnglish": @(IBGLocaleEnglish),
        @"localeFrench": @(IBGLocaleFrench),
        @"localeGerman": @(IBGLocaleGerman),
        @"localeItalian": @(IBGLocaleItalian),
        @"localeJapanese": @(IBGLocaleJapanese),
        @"localeKorean": @(IBGLocaleKorean),
        @"localePolish": @(IBGLocalePolish),
        @"localePortugueseBrazil": @(IBGLocalePortugueseBrazil),
        @"localeRomanian": @(IBGLocaleRomanian),
        @"localeRussian": @(IBGLocaleRussian),
        @"localeSpanish": @(IBGLocaleSpanish),
        @"localeSwedish": @(IBGLocaleSwedish),
        @"localeTurkish": @(IBGLocaleTurkish),
    };
}

+ (NSDictionary<NSString *, NSString *> *) placeholders {
    return @{
        @"shakeHint": kIBGShakeStartAlertTextStringName,
        @"swipeHint": kIBGTwoFingerSwipeStartAlertTextStringName,
        @"edgeSwipeStartHint": kIBGEdgeSwipeStartAlertTextStringName,
        @"startAlertText": kIBGStartAlertTextStringName,
        @"invalidEmailMessage": kIBGInvalidEmailMessageStringName,
        @"invalidEmailTitle": kIBGInvalidEmailTitleStringName,

        // Deprecated
        @"invalidCommentMessage": kIBGInvalidCommentMessageStringName,
        // Deprecated
        @"invalidCommentTitle": kIBGInvalidCommentTitleStringName,

        @"invocationHeader": kIBGInvocationTitleStringName,
        @"reportQuestion": kIBGAskAQuestionStringName,
        @"reportBug": kIBGReportBugStringName,
        @"reportFeedback": kIBGReportFeedbackStringName,
        @"emailFieldHint": kIBGEmailFieldPlaceholderStringName,
        @"commentFieldHintForBugReport": kIBGCommentFieldPlaceholderForBugReportStringName,
        @"commentFieldHintForFeedback": kIBGCommentFieldPlaceholderForFeedbackStringName,
        @"commentFieldHintForQuestion": kIBGCommentFieldPlaceholderForQuestionStringName,
        @"addVideoMessage": kIBGAddScreenRecordingMessageStringName,
        @"addVoiceMessage": kIBGAddVoiceMessageStringName,
        @"addImageFromGallery": kIBGAddImageFromGalleryStringName,
        @"addExtraScreenshot": kIBGAddExtraScreenshotStringName,
        @"audioRecordingPermissionDeniedTitle": kIBGAudioRecordingPermissionDeniedTitleStringName,
        @"audioRecordingPermissionDeniedMessage": kIBGAudioRecordingPermissionDeniedMessageStringName,
        @"microphonePermissionAlertSettingsButtonTitle": kIBGMicrophonePermissionAlertSettingsButtonTitleStringName,
        @"conversationsHeaderTitle": kIBGChatsTitleStringName,
        @"chatsHeaderTitle": kIBGChatsTitleStringName,
        @"team": kIBGTeamStringName,
        @"recordingMessageToHoldText": kIBGRecordingMessageToHoldTextStringName,
        @"recordingMessageToReleaseText": kIBGRecordingMessageToReleaseTextStringName,
        @"messagesNotification": kIBGMessagesNotificationTitleSingleMessageStringName,
        @"messagesNotificationAndOthers": kIBGMessagesNotificationTitleMultipleMessagesStringName,
        @"screenshotHeaderTitle": kIBGScreenshotTitleStringName,
        @"okButtonTitle": kIBGOkButtonTitleStringName,
        @"cancelButtonTitle": kIBGCancelButtonTitleStringName,
        @"thankYouText": kIBGThankYouAlertTitleStringName,
        @"audio": kIBGAudioStringName,
        @"screenRecording": kIBGScreenRecordingStringName,
        @"image": kIBGImageStringName,
        @"surveyEnterYourAnswer": kIBGSurveyEnterYourAnswerTextPlaceholder,
        @"videoPressRecord": kIBGVideoPressRecordTitle,
        @"collectingDataText": kIBGCollectingDataText,
        @"thankYouAlertText": kIBGThankYouAlertMessageStringName,

        @"welcomeMessageBetaWelcomeStepTitle": kIBGBetaWelcomeMessageWelcomeStepTitle,
        @"welcomeMessageBetaWelcomeStepContent": kIBGBetaWelcomeMessageWelcomeStepContent,
        @"welcomeMessageBetaHowToReportStepTitle": kIBGBetaWelcomeMessageHowToReportStepTitle,
        @"welcomeMessageBetaHowToReportStepContent": kIBGBetaWelcomeMessageHowToReportStepContent,
        @"welcomeMessageBetaFinishStepTitle": kIBGBetaWelcomeMessageFinishStepTitle,
        @"welcomeMessageBetaFinishStepContent": kIBGBetaWelcomeMessageFinishStepContent,
        @"welcomeMessageLiveWelcomeStepTitle": kIBGLiveWelcomeMessageTitle,
        @"welcomeMessageLiveWelcomeStepContent": kIBGLiveWelcomeMessageContent,

        @"surveysStoreRatingThanksTitle": kIBGStoreRatingThankYouTitleText,
        @"surveysStoreRatingThanksSubtitle": kIBGStoreRatingThankYouDescriptionText,

        @"reportBugDescription": kIBGReportBugDescriptionStringName,
        @"reportFeedbackDescription": kIBGReportFeedbackDescriptionStringName,
        @"reportQuestionDescription": kIBGReportQuestionDescriptionStringName,
        @"requestFeatureDescription": kIBGRequestFeatureDescriptionStringName,

        @"discardAlertTitle": kIBGDiscardAlertTitle,
        @"discardAlertMessage": kIBGDiscardAlertMessage,
        @"discardAlertDiscard": kIBGDiscardAlertCancel,
        @"discardAlertStay": kIBGDiscardAlertAction,
        @"addAttachmentButtonTitleStringName": kIBGAddAttachmentButtonTitleStringName,

        @"reportReproStepsDisclaimerBody": kIBGReproStepsDisclaimerBody,
        @"reportReproStepsDisclaimerLink": kIBGReproStepsDisclaimerLink,
        @"reproStepsProgressDialogBody": kIBGProgressViewTitle,
        @"reproStepsListHeader": kIBGReproStepsListTitle,
        @"reproStepsListDescription": kIBGReproStepsListHeader,
        @"reproStepsListEmptyStateDescription": kIBGReproStepsListEmptyStateLabel,
        @"reproStepsListItemNumberingTitle": kIBGReproStepsListItemName,
        @"conversationTextFieldHint": kIBGChatReplyFieldPlaceholderStringName,
        @"insufficientContentTitle" : kIBGInsufficientContentTitleStringName,
        @"insufficientContentMessage" : kIBGInsufficientContentMessageStringName,
    };
}

@end
