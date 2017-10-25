//
//  InstabugReactBridge.m
//  instabugDemo
//
//  Created by Yousef Hamza on 9/29/16.

#import "InstabugReactBridge.h"
#import <Instabug/Instabug.h>
#import <asl.h>
#import <React/RCTLog.h>
#import <os/log.h>

@implementation InstabugReactBridge

- (NSArray<NSString *> *)supportedEvents {
    return @[
             @"IBGpreSendingHandler",
             @"IBGpreInvocationHandler",
             @"IBGpostInvocationHandler",
             @"IBGonNewMessageHandler",
             @"IBGWillShowSurvey",
             @"IBGDidDismissSurvey"
             ];
}

RCT_EXPORT_MODULE(Instabug)

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(startWithToken:(NSString *)token invocationEvent:(IBGInvocationEvent)invocationEvent) {
    [Instabug startWithToken:token invocationEvent:invocationEvent];
    RCTAddLogFunction(InstabugReactLogFunction);
    RCTSetLogThreshold(RCTLogLevelInfo);
    [Instabug setCrashReportingEnabled:NO];
    [Instabug setNetworkLoggingEnabled:NO];
}

RCT_EXPORT_METHOD(invoke) {
    [Instabug invoke];
}

RCT_EXPORT_METHOD(invokeWithInvocationMode:(IBGInvocationMode)invocationMode) {
    [Instabug invokeWithInvocationMode:invocationMode];
}

RCT_EXPORT_METHOD(dismiss) {
    [Instabug dismiss];
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
    [Instabug setUserStepsEnabled:isUserStepsEnabled];
}

RCT_EXPORT_METHOD(setPreSendingHandler:(RCTResponseSenderBlock)callBack) {
    if (callBack != nil) {
        [Instabug setPreSendingHandler:^{
            [self sendEventWithName:@"IBGpreSendingHandler" body:nil];
        }];
    } else {
        [Instabug setPreSendingHandler:nil];
    }
}

RCT_EXPORT_METHOD(setPreInvocationHandler:(RCTResponseSenderBlock)callBack) {
    if (callBack != nil) {
        [Instabug setPreInvocationHandler:^{
            [self sendEventWithName:@"IBGpreInvocationHandler" body:nil];
        }];
    } else {
        [Instabug setPreInvocationHandler:nil];
    }
}

RCT_EXPORT_METHOD(setPostInvocationHandler:(RCTResponseSenderBlock)callBack) {
    if (callBack != nil) {
        [Instabug setPostInvocationHandler:^(IBGDismissType dismissType, IBGReportType reportType) {
            [self sendEventWithName:@"IBGpostInvocationHandler" body:@{
                                                                       @"dismissType": @(dismissType),
                                                                       @"reportType": @(reportType)
                                                                       }];
        }];
    } else {
        [Instabug setPostInvocationHandler:nil];
    }
}

RCT_EXPORT_METHOD(showIntroMessage) {
    [Instabug showIntroMessage];
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

RCT_EXPORT_METHOD(setShakingThresholdForIPhone:(double)iPhoneShakingThreshold forIPad:(double)iPadShakingThreshold) {
    [Instabug setShakingThresholdForiPhone:iPadShakingThreshold
                                   foriPad:iPadShakingThreshold];
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
    if (callBack != nil) {
        [Instabug setOnNewMessageHandler:^{
            [self sendEventWithName:@"IBGonNewMessageHandler" body:nil];
        }];
    } else {
        [Instabug setOnNewMessageHandler:nil];
    }
}

RCT_EXPORT_METHOD(setPromptOptionsEnabled:(BOOL)chatEnabled
                  feedback:(BOOL)bugReportEnabled
                  chat:(BOOL)feedbackEnabled) {
    [Instabug setPromptOptionsEnabledWithBug:bugReportEnabled
                                    feedback:feedbackEnabled
                                        chat:chatEnabled];
}

RCT_EXPORT_METHOD(isInstabugNotification:(NSDictionary *)notification callback:(RCTResponseSenderBlock)callBack) {
    callBack(@[@([Instabug isInstabugNotification:notification])]);
}

RCT_EXPORT_METHOD(addFileAttachment:(NSString *)fileURLString) {
    [Instabug addFileAttachmentWithURL:[NSURL URLWithString:fileURLString]];
}

RCT_EXPORT_METHOD(clearFileAttachments) {
    [Instabug clearFileAttachments];
}

RCT_EXPORT_METHOD(setShowEmailField:(BOOL)shouldShowEmailField) {
    [Instabug setShowEmailField:shouldShowEmailField];
}

RCT_EXPORT_METHOD(identifyUserWithEmail:(NSString *)email name:(NSString *)name) {
    [Instabug identifyUserWithEmail:email name:name];
}

RCT_EXPORT_METHOD(logOut) {
    [Instabug logOut];
}

RCT_EXPORT_METHOD(setSuccessDialogEnabled:(BOOL)isPostSendingDialogEnabled) {
    [Instabug setPostSendingDialogEnabled:isPostSendingDialogEnabled];
}

RCT_EXPORT_METHOD(setReportCategories:(NSArray<NSString *> *)titles iconNames:(NSArray<NSString *> *)names) {
    [Instabug setReportCategoriesWithTitles:titles iconNames:names];
}

RCT_EXPORT_METHOD(setUserAttribute:(NSString *)key withValue:(NSString *)value) {
    [Instabug setUserAttribute:value withKey:key];
}

RCT_EXPORT_METHOD(getUserAttribute:(NSString *)key callback:(RCTResponseSenderBlock)callback) {
    callback(@[[Instabug userAttributeForKey:key]]);
}

RCT_EXPORT_METHOD(removeUserAttribute:(NSString *)key) {
    [Instabug removeUserAttributeForKey:key];
}

RCT_EXPORT_METHOD(getAllUserAttributes:(RCTResponseSenderBlock)callback) {
    callback(@[[Instabug userAttributes]]);
}

RCT_EXPORT_METHOD(clearAllUserAttributes) {
    for (NSString *key in [Instabug userAttributes].allKeys) {
        [Instabug removeUserAttributeForKey:key];
    }
}

RCT_EXPORT_METHOD(setViewHierarchyEnabled:(BOOL)viewHierarchyEnabled) {
    [Instabug setViewHierarchyEnabled:viewHierarchyEnabled];
}

RCT_EXPORT_METHOD(logUserEventWithName:(NSString *)name) {
    [Instabug logUserEventWithName:name];
}

RCT_EXPORT_METHOD(logUserEventWithNameAndParams:(NSString *)name params:(nullable NSDictionary *)params) {
    [Instabug logUserEventWithName:name params:params];
}

RCT_EXPORT_METHOD(log:(NSString *)log) {
    [Instabug IBGLog:log];
}

RCT_EXPORT_METHOD(logVerbose:(NSString *)log) {
    [Instabug logVerbose:log];
}

RCT_EXPORT_METHOD(logDebug:(NSString *)log) {
    [Instabug logDebug:log];
}

RCT_EXPORT_METHOD(logInfo:(NSString *)log) {
    [Instabug logInfo:log];
}

RCT_EXPORT_METHOD(logWarn:(NSString *)log) {
    [Instabug logWarn:log];
}

RCT_EXPORT_METHOD(logError:(NSString *)log) {
    [Instabug logError:log];
}

RCT_EXPORT_METHOD(setSurveysEnabled:(BOOL)surveysEnabled) {
    [Instabug setSurveysEnabled:surveysEnabled];
}

RCT_EXPORT_METHOD(showSurveysIfAvailable) {
    [Instabug showSurveyIfAvailable];
}

RCT_EXPORT_METHOD(setWillShowSurveyHandler:(RCTResponseSenderBlock)callBack) {
    if (callBack != nil) {
        [Instabug setWillShowSurveyHandler:^{
            [self sendEventWithName:@"IBGWillShowSurvey" body:nil];
        }];
    } else {
        [Instabug setWillShowSurveyHandler:nil];
    }
}

RCT_EXPORT_METHOD(setDidDismissSurveyHandler:(RCTResponseSenderBlock)callBack) {
    if (callBack != nil) {
        [Instabug setDidDismissSurveyHandler:^{
            [self sendEventWithName:@"IBGDidDismissSurvey" body:nil];
        }];
    } else {
        [Instabug setDidDismissSurveyHandler:nil];
    }
}

RCT_EXPORT_METHOD(setViewHirearchyEnabled:(BOOL)viewHirearchyEnabled) {
    [Instabug setViewHierarchyEnabled:viewHirearchyEnabled];
}

RCT_EXPORT_METHOD(isRunningLive:(RCTResponseSenderBlock)callback) {
  BOOL result = NO;
#if TARGET_OS_SIMULATOR
    result = NO;
#else
    BOOL isRunningTestFlightBeta = [[[[NSBundle mainBundle] appStoreReceiptURL] lastPathComponent] isEqualToString:@"sandboxReceipt"];
    BOOL hasEmbeddedMobileProvision = !![[NSBundle mainBundle] pathForResource:@"embedded" ofType:@"mobileprovision"];
    if (isRunningTestFlightBeta || hasEmbeddedMobileProvision)
    {
        result = NO;
    }
    result = YES;
#endif
    callback(@[[NSNumber numberWithBool:result]]);
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
              @"invocationModeNewFeedback": @(IBGInvocationModeNewFeedback),
              @"invocationModeNewChat": @(IBGInvocationModeNewChat),
              @"invocationModeChatsList": @(IBGInvocationModeChatsList),

              @"dismissTypeSubmit": @(IBGDismissTypeSubmit),
              @"dismissTypeCancel": @(IBGDismissTypeCancel),
              @"dismissTypeAddAtttachment": @(IBGDismissTypeAddAttachment),

              @"reportTypeBug": @(IBGReportTypeBug),
              @"reportTypeFeedback": @(IBGReportTypeFeedback),

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
              @"addScreenRecordingMessage": @(IBGStringAddScreenRecordingMessage),
              @"addVoiceMessage": @(IBGStringAddVoiceMessage),
              @"addImageFromGallery": @(IBGStringAddImageFromGallery),
              @"addExtraScreenshot": @(IBGStringAddExtraScreenshot),
              @"audioRecordingPermissionDeniedTitle": @(IBGStringAudioRecordingPermissionDeniedTitle),
              @"audioRecordingPermissionDeniedMessage": @(IBGStringAudioRecordingPermissionDeniedMessage),
              @"microphonePermissionAlertSettingsButtonTitle": @(IBGStringMicrophonePermissionAlertSettingsButtonTitle),
              @"chatsHeaderTitle": @(IBGStringChatsHeaderTitle),
              @"team": @(IBGStringTeam),
              @"recordingMessageToHoldText": @(IBGStringRecordingMessageToHoldText),
              @"recordingMessageToReleaseText": @(IBGStringRecordingMessageToReleaseText),
              @"messagesNotification": @(IBGStringMessagesNotification),
              @"messagesNotificationAndOthers": @(IBGStringMessagesNotificationAndOthers),
              @"screenshotHeaderTitle": @(IBGStringScreenshotHeaderTitle),
              @"okButtonTitle": @(IBGStringOkButtonTitle),
              @"cancelButtonTitle": @(IBGStringCancelButtonTitle),
              @"thankYouText": @(IBGStringThankYouText),
              @"audio": @(IBGStringAudio),
              @"screenRecording": @(IBGStringScreenRecording),
              @"image": @(IBGStringImage),
              @"surveyEnterYourAnswer": @(IBGStringSurveyEnterYourAnswerPlaceholder),
              @"surveyNoAnswerTitle": @(IBGStringSurveyNoAnswerTitle),
              @"surveyNoAnswerMessage": @(IBGStringSurveyNoAnswerMessage),
              @"surveySubmitTitle": @(IBGStringSurveySubmitTitle),
              @"videPressRecord": @(IBGStringVideoPressRecordTitle),
              @"collectingDataText": @(IBGStringCollectingDataText)
              };
};

+ (BOOL)iOSVersionIsLessThan:(NSString *)iOSVersion {
    return [iOSVersion compare:[UIDevice currentDevice].systemVersion options:NSNumericSearch] == NSOrderedDescending;
};

// Note: This function is used to bridge IBGNSLog with RCTLogFunction.
// This log function should not be used externally and is only an implementation detail.
void RNIBGLog(IBGLogLevel logLevel, NSString *format,  ...) {
    va_list arg_list;
    va_start(arg_list, format);
    IBGNSLogWithLevel(format, arg_list, logLevel);
    va_end(arg_list);
}

RCTLogFunction InstabugReactLogFunction = ^(
                                               RCTLogLevel level,
                                               __unused RCTLogSource source,
                                               NSString *fileName,
                                               NSNumber *lineNumber,
                                               NSString *message
                                               )
{
    NSString *formatString = @"Instabug - REACT LOG: %@";
    NSString *log = RCTFormatLog([NSDate date], level, fileName, lineNumber, message);

    switch(level) {
        case RCTLogLevelTrace:
            RNIBGLog(IBGLogLevelTrace, formatString, log);
            break;
        case RCTLogLevelInfo:
            RNIBGLog(IBGLogLevelInfo, formatString, log);
            break;
        case RCTLogLevelWarning:
            RNIBGLog(IBGLogLevelWarning, formatString, log);
            break;
        case RCTLogLevelError:
            RNIBGLog(IBGLogLevelError, formatString, log);
            break;
        case RCTLogLevelFatal:
            RNIBGLog(IBGLogLevelFatal, formatString, log);
            break;
    }
};


@end
