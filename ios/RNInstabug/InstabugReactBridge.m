//
//  InstabugReactBridge.m
//  instabugDemo
//
//  Created by Yousef Hamza on 9/29/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "InstabugReactBridge.h"
#import <Instabug/Instabug.h>

@implementation InstabugReactBridge

RCT_EXPORT_MODULE(Instabug)

RCT_EXPORT_METHOD(startWithToken:(NSString *)token invocationEvent:(IBGInvocationEvent)invocationEvent) {
    [Instabug startWithToken:token invocationEvent:invocationEvent];
}

RCT_EXPORT_METHOD(invoke) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Instabug invoke];
    });
}

RCT_EXPORT_METHOD(invokeWithInvocationMode:(IBGInvocationMode)invocationMode) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Instabug invokeWithInvocationMode:invocationMode];
    });
}

RCT_EXPORT_METHOD(dismiss) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Instabug dismiss];
    });
}

RCT_EXPORT_METHOD(setFileAttachment:(NSString *)fileLocation) {
    [Instabug setFileAttachment:fileLocation];
}

RCT_EXPORT_METHOD(setUserData:(NSString *)userData) {
    [Instabug setUserData:userData];
}

RCT_EXPORT_METHOD(IBGLog:(NSString *)log) {
    [Instabug IBGLog:log];
}

RCT_EXPORT_METHOD(setUserStepsEnabled:(BOOL)isUserStepsEnabled) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Instabug setUserStepsEnabled:isUserStepsEnabled];
    });
}

RCT_EXPORT_METHOD(setPreSendingHandler:(RCTResponseSenderBlock)callBack) {
    if (callBack != nil) {
        [Instabug setPreSendingHandler:^{
            callBack(@[]);
        }];
    }
}

RCT_EXPORT_METHOD(setPreInvocationHandler:(RCTResponseSenderBlock)callBack) {
    if (callBack != nil) {
        [Instabug setPreInvocationHandler:^{
            callBack(@[]);
        }];
    }
}

RCT_EXPORT_METHOD(setPostInvocatioHandler:(RCTResponseSenderBlock)callBack) {
    if (callBack != nil) {
        [Instabug setPostInvocatioHandler:^(IBGDismissType dismissType, IBGReportType reportType) {
            callBack(@[@(dismissType), @(reportType)]);
        }];
    }
}

RCT_EXPORT_METHOD(showIntroMessage) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [Instabug showIntroMessage];
    });
}

RCT_EXPORT_METHOD(setUserEmail:(NSString *)userEmail) {
    [Instabug setUserEmail:userEmail];
}

RCT_EXPORT_METHOD(setUserName:(NSString *)userName) {
    [Instabug setUserName:userName];
}

RCT_EXPORT_METHOD(setWillSkipScreenshotAnnotation:(BOOL)willSkipScreenshot) {
    [Instabug setWillSkipScreenshotAnnotation:willSkipScreenshot];
}

RCT_EXPORT_METHOD(getUnreadMessagesCount:(RCTResponseSenderBlock)callBack) {
    callBack(@[@([Instabug getUnreadMessagesCount])]);
}

RCT_EXPORT_METHOD(setInvocationEvent:(IBGInvocationEvent)invocationEvent) {
    [Instabug setInvocationEvent:invocationEvent];
}

RCT_EXPORT_METHOD(setPushNotificationsEnabled:(BOOL)isPushNotificationEnabled) {
    [Instabug setPushNotificationsEnabled:isPushNotificationEnabled];
}

RCT_EXPORT_METHOD(setEmailFieldRequired:(BOOL)isEmailFieldRequired) {
    [Instabug setEmailFieldRequired:isEmailFieldRequired];
}

RCT_EXPORT_METHOD(setCommentFieldRequired:(BOOL)isCommentFieldRequired) {
    [Instabug setCommentFieldRequired:isCommentFieldRequired];
}

RCT_EXPORT_METHOD(setShakingThresholdForiPhone:(double)iPhoneShakingThreshold foriPad:(double)iPadShakingThreshold) {
    [Instabug setShakingThresholdForiPhone:iPhoneShakingThreshold foriPad:iPadShakingThreshold];
}

RCT_EXPORT_METHOD(setFloatingButtonEdge:(CGRectEdge)floatingButtonEdge withTopOffset:(double)floatingButtonOffsetFromTop) {
    [Instabug setFloatingButtonEdge:floatingButtonEdge withTopOffset:floatingButtonOffsetFromTop];
}

RCT_EXPORT_METHOD(setLocale:(IBGLocale)locale) {
    [Instabug setLocale:locale];
}

RCT_EXPORT_METHOD(setIntroMessageEnabled:(BOOL)isIntroMessageEnabled) {
    [Instabug setIntroMessageEnabled:isIntroMessageEnabled];
}

RCT_EXPORT_METHOD(setColorTheme:(IBGColorTheme)colorTheme) {
    [Instabug setColorTheme:colorTheme];
}

RCT_EXPORT_METHOD(setPrimaryColor:(UIColor *)color) {
    [Instabug setPrimaryColor:color];
}

RCT_EXPORT_METHOD(appendTags:(NSArray *)tags) {
    [Instabug appendTags:tags];
}

RCT_EXPORT_METHOD(resetTags) {
    [Instabug resetTags];
}

RCT_EXPORT_METHOD(getTags:(RCTResponseSenderBlock)callBack) {
    callBack(@[[Instabug getTags]]);
}

RCT_EXPORT_METHOD(setString:(NSString*)value toKey:(IBGString)key) {
    [Instabug setString:value toKey:key];
}

RCT_EXPORT_METHOD(setAttachmentTypesEnabled:(BOOL)screenShot
                  extraScreenShot:(BOOL)extraScreenShot
                  galleryImage:(BOOL)galleryImage
                  voiceNote:(BOOL)voiceNote
                  screenRecording:(BOOL)screenRecording) {
    [Instabug setAttachmentTypesEnabledScreenShot:screenShot
                                  extraScreenShot:extraScreenShot
                                     galleryImage:galleryImage
                                        voiceNote:voiceNote
                                  screenRecording:screenRecording];
}

RCT_EXPORT_METHOD(setChatNotificationEnabled:(BOOL)isChatNotificationEnabled) {
    [Instabug setChatNotificationEnabled:isChatNotificationEnabled];
}

RCT_EXPORT_METHOD(setOnNewMessageHandler:(RCTResponseSenderBlock)callBack) {
    [Instabug setOnNewMessageHandler:callBack];
}

RCT_EXPORT_METHOD(setPromptOptions:(BOOL)bugReportEnabled
                  feedback:(BOOL)feedbackEnabled
                  chat:(BOOL)chatEnabled) {
    [Instabug setPromptOptionsEnabledWithBug:bugReportEnabled
                                    feedback:feedbackEnabled
                                        chat:chatEnabled];
}

RCT_EXPORT_METHOD(isInstabugNotification:(NSDictionary *)notification callback:(RCTResponseSenderBlock)callBack) {
    callBack(@[@([Instabug isInstabugNotification:notification])]);
}

- (NSDictionary *)constantsToExport
{
    return @{ @"invocationEventNone" : @(IBGInvocationEventNone),
              @"invocationEventShake" : @(IBGInvocationEventShake),
              @"invocationEventScreenshot" : @(IBGInvocationEventScreenshot),
              @"invocationEventTwoFingersSwipeLeft": @(IBGInvocationEventTwoFingersSwipeLeft),
              @"invocationEventRightEdgePan": @(IBGInvocationEventRightEdgePan),
              @"invocationEventFloatingButton": @(IBGInvocationEventFloatingButton),
              
              @"invocationModeNA": @(IBGInvocationModeNA),
              @"invocationModeNewBug": @(IBGInvocationModeNewBug),
              @"invocationModeNewFeedbac": @(IBGInvocationModeNewFeedback),
              @"invocationModeNewChat": @(IBGInvocationModeNewChat),
              @"invocationModeChatsList": @(IBGInvocationModeChatsList),
              
              @"rectMinXEdge": @(CGRectMinXEdge),
              @"rectMinYEdge": @(CGRectMinYEdge),
              @"rectMaxXEdge": @(CGRectMaxXEdge),
              @"rectMaxYEdge": @(CGRectMaxYEdge),
              
              @"localeArabic": @(IBGLocaleArabic),
              @"localeChineseSimplified": @(IBGLocaleChineseSimplified),
              @"localeChineseTraditional": @(IBGLocaleChineseTraditional),
              @"localeCzech": @(IBGLocaleCzech),
              @"localeDanish": @(IBGLocaleDanish),
              @"localeEnglish": @(IBGLocaleEnglish),
              @"localeFrench": @(IBGLocaleFrench),
              @"localeGerman": @(IBGLocaleGerman),
              @"localeItalian": @(IBGLocaleItalian),
              @"localeJapanese": @(IBGLocaleJapanese),
              @"localeKorean": @(IBGLocaleKorean),
              @"localePolish": @(IBGLocalePolish),
              @"localePortugueseBrazil": @(IBGLocalePortugueseBrazil),
              @"localeRussian": @(IBGLocaleRussian),
              @"localeSpanish": @(IBGLocaleSpanish),
              @"localeSwedish": @(IBGLocaleSwedish),
              @"localeTurkish": @(IBGLocaleTurkish),
              
              @"colorThemeLight": @(IBGColorThemeLight),
              @"colorThemeDark": @(IBGColorThemeDark),
              
              @"shakeHint": @(IBGStringShakeHint),
              @"swipeHint": @(IBGStringSwipeHint),
              @"edgeSwipeStartHint": @(IBGStringEdgeSwipeStartHint),
              @"startAlertText": @(IBGStringStartAlertText),
              @"invalidEmailMessage": @(IBGStringInvalidEmailMessage),
              @"invalidEmailTitle": @(IBGStringInvalidEmailTitle),
              @"invalidCommentMessage": @(IBGStringInvalidCommentMessage),
              @"invalidCommentTitle": @(IBGStringInvalidCommentTitle),
              @"invocationHeader": @(IBGStringInvocationHeader),
              @"talkToUs": @(IBGStringTalkToUs),
              @"reportBug": @(IBGStringReportBug),
              @"reportFeedback": @(IBGStringReportFeedback),
              @"emailFieldHint": @(IBGStringEmailFieldHint),
              @"commentFieldHintForBugReport": @(IBGStringCommentFieldHintForBugReport),
              @"commentFieldHintForFeedback": @(IBGStringCommentFieldHintForFeedback),
              @"addVideoMessage": @(IBGStringAddVideoMessage),
              @"addVoiceMessage": @(IBGStringAddVoiceMessage),
              @"addImageFromGallery": @(IBGStringAddImageFromGallery),
              @"addExtraScreenshot": @(IBGStringAddExtraScreenshot),
              @"audioRecordingPermissionDeniedTitle": @(IBGStringAudioRecordingPermissionDeniedTitle),
              @"audioRecordingPermissionDeniedMessage": @(IBGStringAudioRecordingPermissionDeniedMessage),
              @"microphonePermissionAlertSettingsButtonText": @(IBGStringMicrophonePermissionAlertSettingsButtonTitle),
              @"recordingMessageToHoldText": @(IBGStringRecordingMessageToHoldText),
              @"recordingMessageToReleaseText": @(IBGStringRecordingMessageToReleaseText),
              @"conversationsHeaderTitle": @(IBGStringChatsNoConversationsHeadlineText),
              @"screenshotHeaderTitle": @(IBGStringScreenshotHeaderTitle),
              @"chatsNoConversationsHeadlineText": @(IBGStringChatsNoConversationsHeadlineText),
              @"doneButtonText": @(IBGStringDoneButtonTitle),
              @"okButtonText": @(IBGStringOkButtonTitle),
              @"cancelButtonText": @(IBGStringCancelButtonTitle),
              @"thankYouText": @(IBGStringThankYouText),
              @"audio": @(IBGStringAudio),
              @"video": @(IBGStringVideo),
              @"image": @(IBGStringImage),
              @"chatsHeaderTitle": @(IBGStringChatsHeaderTitle),
              @"team": @(IBGStringTeam),
              @"messageNotification": @(IBGStringMessagesNotification),
              @"messagesNotifiactionAndOthers": @(IBGStringMessagesNotificationAndOthers)
              };
};

@end
