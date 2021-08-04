//
//  InstabugReactBridge.m
//  instabugDemo
//
//  Created by Yousef Hamza on 9/29/16.

#import "InstabugReactBridge.h"
#import <Instabug/Instabug.h>
#import <Instabug/IBGBugReporting.h>
#import <Instabug/IBGCrashReporting.h>
#import <Instabug/IBGSurveys.h>
#import <Instabug/IBGLog.h>
#import <Instabug/IBGAPM.h>
#import <asl.h>
#import <React/RCTLog.h>
#import <os/log.h>
#import <Instabug/IBGTypes.h>
#import <React/RCTUIManager.h>

@interface Instabug (PrivateWillSendAPI)
+ (void)setWillSendReportHandler_private:(void(^)(IBGReport *report, void(^reportCompletionHandler)(IBGReport *)))willSendReportHandler_private;
@end

@implementation InstabugReactBridge

- (NSArray<NSString *> *)supportedEvents {
    return @[
             @"IBGpreSendingHandler",
             @"IBGSendHandledJSCrash",
             @"IBGSendUnhandledJSCrash",
             @"IBGSetNetworkDataObfuscationHandler",
             ];
}

RCT_EXPORT_MODULE(Instabug)

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(startWithToken:(NSString *)token invocationEvents:(NSArray*)invocationEventsArray) {
     SEL setPrivateApiSEL = NSSelectorFromString(@"setCurrentPlatform:");
    if ([[Instabug class] respondsToSelector:setPrivateApiSEL]) {
        NSInteger *platform = IBGPlatformReactNative;
        NSInvocation *inv = [NSInvocation invocationWithMethodSignature:[[Instabug class] methodSignatureForSelector:setPrivateApiSEL]];
        [inv setSelector:setPrivateApiSEL];
        [inv setTarget:[Instabug class]];
        [inv setArgument:&(platform) atIndex:2];
        [inv invoke];
    }
    IBGInvocationEvent invocationEvents = 0;
    NSLog(@"invocation events: %ld",(long)invocationEvents);
    for (NSNumber *boxedValue in invocationEventsArray) {
        invocationEvents |= [boxedValue intValue];
    }
    [Instabug startWithToken:token invocationEvents:invocationEvents];
    
    RCTAddLogFunction(InstabugReactLogFunction);
    RCTSetLogThreshold(RCTLogLevelInfo);
    
    IBGNetworkLogger.enabled = YES;

    // Temporarily disabling APM hot launches
    IBGAPM.hotAppLaunchEnabled = NO;
}

RCT_EXPORT_METHOD(callPrivateApi:(NSString *)apiName apiParam: (NSString *) param) {
    SEL setPrivateApiSEL = NSSelectorFromString([apiName stringByAppendingString:@":"]);
    if ([[Instabug class] respondsToSelector:setPrivateApiSEL]) {
        if (param == nil) {
            [[Instabug class] performSelector:setPrivateApiSEL];
        } else {
            [[Instabug class] performSelector:setPrivateApiSEL withObject:param];
            
        }
    }
}

RCT_EXPORT_METHOD(setReproStepsMode:(IBGUserStepsMode)reproStepsMode) {
    [Instabug setReproStepsMode:reproStepsMode];
}

RCT_EXPORT_METHOD(setFileAttachment:(NSString *)fileLocation) {
    NSURL *url = [NSURL URLWithString:fileLocation];
    [Instabug addFileAttachmentWithURL:url];
}

RCT_EXPORT_METHOD(sendJSCrash:(NSDictionary *)stackTrace) {
    dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_HIGH, 0ul);
    dispatch_async(queue, ^{
        SEL reportCrashWithStackTraceSEL = NSSelectorFromString(@"reportCrashWithStackTrace:handled:");
        if ([[Instabug class] respondsToSelector:reportCrashWithStackTraceSEL]) {
            [[Instabug class] performSelector:reportCrashWithStackTraceSEL withObject:stackTrace withObject:@(NO)];
        }
    });
}

RCT_EXPORT_METHOD(sendHandledJSCrash:(NSDictionary *)stackTrace) {
    dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_HIGH, 0ul);
    dispatch_async(queue, ^{
        SEL reportCrashWithStackTraceSEL = NSSelectorFromString(@"reportCrashWithStackTrace:handled:");
        if ([[Instabug class] respondsToSelector:reportCrashWithStackTraceSEL]) {
            [[Instabug class] performSelector:reportCrashWithStackTraceSEL withObject:stackTrace withObject:@(YES)];
        }
    });
}

RCT_EXPORT_METHOD(setUserData:(NSString *)userData) {
    [Instabug setUserData:userData];
}

RCT_EXPORT_METHOD(setTrackUserSteps:(BOOL)isEnabled) {
    [Instabug setTrackUserSteps:isEnabled];
}

RCT_EXPORT_METHOD(setCrashReportingEnabled:(BOOL)enabledCrashReporter) {
    if(enabledCrashReporter) {
        IBGCrashReporting.enabled = YES;
    } else {
        IBGCrashReporting.enabled = NO;
    }
}

IBGReport *currentReport = nil;
RCT_EXPORT_METHOD(setPreSendingHandler:(RCTResponseSenderBlock)callBack) {
    if (callBack != nil) {
        Instabug.willSendReportHandler = ^IBGReport * _Nonnull(IBGReport * _Nonnull report) {
            NSArray *tagsArray = report.tags;
            NSArray *instabugLogs= report.instabugLogs;
            NSArray *consoleLogs= report.consoleLogs;
            NSDictionary *userAttributes= report.userAttributes;
            NSArray *fileAttachments= report.fileLocations;
            NSDictionary *dict = @{ @"tagsArray" : tagsArray, @"instabugLogs" : instabugLogs, @"consoleLogs" : consoleLogs,       @"userAttributes" : userAttributes, @"fileAttachments" : fileAttachments};
            [self sendEventWithName:@"IBGpreSendingHandler" body:dict];

            currentReport = report;
            return report;
        };
    } else {
        Instabug.willSendReportHandler = nil;
    }
}

RCT_EXPORT_METHOD(appendTagToReport:(NSString*) tag) {
    if (currentReport != nil) {
        [currentReport appendTag:tag];
    }
}

RCT_EXPORT_METHOD(appendConsoleLogToReport:(NSString*) consoleLog) {
    if (currentReport != nil) {
        [currentReport appendToConsoleLogs:consoleLog];
    }
}

RCT_EXPORT_METHOD(setUserAttributeToReport:(NSString*) key:(NSString*) value) {
    if (currentReport != nil) {
        [currentReport setUserAttribute:value withKey:key];
    }
}

RCT_EXPORT_METHOD(logDebugToReport:(NSString*) log) {
    if (currentReport != nil) {
        [currentReport logDebug:log];
    }
}

RCT_EXPORT_METHOD(logVerboseToReport:(NSString*) log) {
    if (currentReport != nil) {
        [currentReport logVerbose:log];
    }
}

RCT_EXPORT_METHOD(logWarnToReport:(NSString*) log) {
    if (currentReport != nil) {
        [currentReport logWarn:log];
    }
}

RCT_EXPORT_METHOD(logErrorToReport:(NSString*) log) {
    if (currentReport != nil) {
        [currentReport logError:log];
    }
}

RCT_EXPORT_METHOD(logInfoToReport:(NSString*) log) {
    if (currentReport != nil) {
        [currentReport logInfo:log];
    }
}

RCT_EXPORT_METHOD(addFileAttachmentWithURLToReport:(NSString*) urlString) {
    if (currentReport != nil) {
        NSURL *url = [NSURL URLWithString:urlString];
        [currentReport addFileAttachmentWithURL:url];
    }
}

RCT_EXPORT_METHOD(addFileAttachmentWithDataToReport:(NSString*) dataString) {
    if (currentReport != nil) {
        NSData* data = [dataString dataUsingEncoding:NSUTF8StringEncoding];
        [currentReport addFileAttachmentWithData:data];
    }
}

RCT_EXPORT_METHOD(setSdkDebugLogsLevel:(IBGSDKDebugLogsLevel)sdkDebugLogsLevel) {
    [Instabug setSdkDebugLogsLevel:sdkDebugLogsLevel];
}

RCT_EXPORT_METHOD(setLocale:(IBGLocale)locale) {
    [Instabug setLocale:locale];
}

RCT_EXPORT_METHOD(setColorTheme:(IBGColorTheme)colorTheme) {
        [Instabug setColorTheme:colorTheme];
}

RCT_EXPORT_METHOD(setPrimaryColor:(UIColor *)color) {
        Instabug.tintColor = color;
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

RCT_EXPORT_METHOD(setString:(NSString*)value toKey:(NSString*)key) {
    [Instabug setValue:value forStringWithKey:key];
}

RCT_EXPORT_METHOD(addFileAttachment:(NSString *)fileURLString) {
    [Instabug addFileAttachmentWithURL:[NSURL URLWithString:fileURLString]];
}

RCT_EXPORT_METHOD(clearFileAttachments) {
    [Instabug clearFileAttachments];
}

RCT_EXPORT_METHOD(identifyUserWithEmail:(NSString *)email name:(NSString *)name) {
    [Instabug identifyUserWithEmail:email name:name];
}

RCT_EXPORT_METHOD(logOut) {
    [Instabug logOut];
}

RCT_EXPORT_METHOD(setUserAttribute:(NSString *)key withValue:(NSString *)value) {
    [Instabug setUserAttribute:value withKey:key];
}

RCT_EXPORT_METHOD(getUserAttribute:(NSString *)key callback:(RCTResponseSenderBlock)callback) {
    @try {
    callback(@[[Instabug userAttributeForKey:key]]);
    } @catch (NSException *exception) {
        callback(@[[NSNull null]]);
    }
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
    Instabug.shouldCaptureViewHierarchy = viewHierarchyEnabled;
}

RCT_EXPORT_METHOD(logUserEventWithName:(NSString *)name) {
    [Instabug logUserEventWithName:name];
}

RCT_EXPORT_METHOD(setIBGLogPrintsToConsole:(BOOL) printsToConsole) {
    IBGLog.printsToConsole = printsToConsole;
}

RCT_EXPORT_METHOD(logVerbose:(NSString *)log) {
    [IBGLog logVerbose:log];
}

RCT_EXPORT_METHOD(logDebug:(NSString *)log) {
    [IBGLog logDebug:log];
}

RCT_EXPORT_METHOD(logInfo:(NSString *)log) {
    [IBGLog logInfo:log];
}

RCT_EXPORT_METHOD(logWarn:(NSString *)log) {
    [IBGLog logWarn:log];
}

RCT_EXPORT_METHOD(logError:(NSString *)log) {
    [IBGLog logError:log];
}

RCT_EXPORT_METHOD(clearLogs) {
    [IBGLog clearAllLogs];
}

RCT_EXPORT_METHOD(setSessionProfilerEnabled:(BOOL)sessionProfilerEnabled) {
    [Instabug setSessionProfilerEnabled:sessionProfilerEnabled];
}

RCT_EXPORT_METHOD(showWelcomeMessageWithMode:(IBGWelcomeMessageMode)welcomeMessageMode) {
    [Instabug showWelcomeMessageWithMode:welcomeMessageMode];
}

RCT_EXPORT_METHOD(setWelcomeMessageMode:(IBGWelcomeMessageMode)welcomeMessageMode) {
    [Instabug setWelcomeMessageMode:welcomeMessageMode];
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
    } else {
        result = YES;
    }
#endif
    callback(@[[NSNumber numberWithBool:result]]);
}

RCT_EXPORT_METHOD(setNetworkLoggingEnabled:(BOOL)isEnabled) {
    if(isEnabled) {
        IBGNetworkLogger.enabled = YES;
    } else {
        IBGNetworkLogger.enabled = NO;
    }
}

RCT_EXPORT_METHOD(networkLog:(NSDictionary *) networkData) {
    NSString* url = networkData[@"url"];
    NSString* method = networkData[@"method"];
    NSString* requestBody = networkData[@"requestBody"];
    int64_t requestBodySize = [networkData[@"requestBodySize"] integerValue];
    NSString* responseBody = nil;
    if (networkData[@"responseBody"] != [NSNull null]) {
        responseBody = networkData[@"responseBody"];
    }
    int64_t responseBodySize = [networkData[@"responseBodySize"] integerValue];
    int32_t responseCode = [networkData[@"responseCode"] integerValue];
    NSDictionary* requestHeaders = @{};
    if([networkData[@"requestHeaders"] isKindOfClass:[NSDictionary class]]){
        requestHeaders = networkData[@"requestHeaders"];
    }
    NSDictionary* responseHeaders = @{};
    if([networkData[@"responseHeaders"] isKindOfClass:[NSDictionary class]]){
        responseHeaders = networkData[@"responseHeaders"];
    }
    NSString* contentType = networkData[@"contentType"];
    NSString* errorDomain = networkData[@"errorDomain"];
    int32_t errorCode = [networkData[@"errorCode"] integerValue];
    int64_t startTime = [networkData[@"startTime"] integerValue] * 1000;
    int64_t duration = [networkData[@"duration"] doubleValue] * 1000;
    
    SEL networkLogSEL = NSSelectorFromString(@"addNetworkLogWithUrl:method:requestBody:requestBodySize:responseBody:responseBodySize:responseCode:requestHeaders:responseHeaders:contentType:errorDomain:errorCode:startTime:duration:");
    
    if([[IBGNetworkLogger class] respondsToSelector:networkLogSEL]) {
        NSInvocation *inv = [NSInvocation invocationWithMethodSignature:[[IBGNetworkLogger class] methodSignatureForSelector:networkLogSEL]];
        [inv setSelector:networkLogSEL];
        [inv setTarget:[IBGNetworkLogger class]];
        
        [inv setArgument:&(url) atIndex:2];
        [inv setArgument:&(method) atIndex:3];
        [inv setArgument:&(requestBody) atIndex:4];
        [inv setArgument:&(requestBodySize) atIndex:5];
        [inv setArgument:&(responseBody) atIndex:6];
        [inv setArgument:&(responseBodySize) atIndex:7];
        [inv setArgument:&(responseCode) atIndex:8];
        [inv setArgument:&(requestHeaders) atIndex:9];
        [inv setArgument:&(responseHeaders) atIndex:10];
        [inv setArgument:&(contentType) atIndex:11];
        [inv setArgument:&(errorDomain) atIndex:12];
        [inv setArgument:&(errorCode) atIndex:13];
        [inv setArgument:&(startTime) atIndex:14];
        [inv setArgument:&(duration) atIndex:15];
        
        [inv invoke];
    }
}

RCT_EXPORT_METHOD(hideView: (nonnull NSNumber *)reactTag) {
    UIView* view = [self.bridge.uiManager viewForReactTag:reactTag];
    view.instabug_privateView = true;
    
}

RCT_EXPORT_METHOD(show) {
    [[NSRunLoop mainRunLoop] performSelector:@selector(show) target:[Instabug class] argument:nil order:0 modes:@[NSDefaultRunLoopMode]];
}

RCT_EXPORT_METHOD(reportScreenChange:(NSString *)screenName) {
    SEL setPrivateApiSEL = NSSelectorFromString(@"logViewDidAppearEvent:");
    if ([[Instabug class] respondsToSelector:setPrivateApiSEL]) {
        NSInvocation *inv = [NSInvocation invocationWithMethodSignature:[[Instabug class] methodSignatureForSelector:setPrivateApiSEL]];
        [inv setSelector:setPrivateApiSEL];
        [inv setTarget:[Instabug class]];
        [inv setArgument:&(screenName) atIndex:2];
        [inv invoke];
    }
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
              
              @"reproStepsEnabled": @(IBGUserStepsModeEnable),
              @"reproStepsDisabled": @(IBGUserStepsModeDisable),
              @"reproStepsEnabledWithNoScreenshots": @(IBGUserStepsModeEnabledWithNoScreenshots),
              
              @"optionEmailFieldHidden": @(IBGBugReportingOptionEmailFieldHidden),
              @"optionEmailFieldOptional": @(IBGBugReportingOptionEmailFieldOptional),
              @"optionCommentFieldRequired": @(IBGBugReportingOptionCommentFieldRequired),
              @"optionDisablePostSendingDialog": @(IBGBugReportingOptionDisablePostSendingDialog),
              
              @"bugReportingReportTypeBug": @(IBGBugReportingReportTypeBug),
              @"bugReportingReportTypeFeedback": @(IBGBugReportingReportTypeFeedback),
              @"bugReportingReportTypeQuestion": @(IBGBugReportingReportTypeQuestion),
              
              @"rectMinXEdge": @(CGRectMinXEdge),
              @"rectMinYEdge": @(CGRectMinYEdge),
              @"rectMaxXEdge": @(CGRectMaxXEdge),
              @"rectMaxYEdge": @(CGRectMaxYEdge),
              
              @"bottomRight": @(IBGPositionBottomRight),
              @"topRight": @(IBGPositionTopRight),
              @"bottomLeft": @(IBGPositionBottomLeft),
              @"topLeft": @(IBGPositionTopLeft),
              
              @"logLevelNone": @(IBGLogLevelNone),
              @"logLevelError": @(IBGLogLevelError),
              @"logLevelWarning": @(IBGLogLevelWarning),
              @"logLevelInfo": @(IBGLogLevelInfo),
              @"logLevelDebug": @(IBGLogLevelDebug),
              @"logLevelVerbose": @(IBGLogLevelVerbose),
              
              @"allActions": @(IBGActionAllActions),
              @"reportBugAction": @(IBGActionReportBug),
              @"requestNewFeature": @(IBGActionRequestNewFeature),
              @"addCommentToFeature": @(IBGActionAddCommentToFeature),
              
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
              @"localeRussian": @(IBGLocaleRussian),
              @"localeSpanish": @(IBGLocaleSpanish),
              @"localeSwedish": @(IBGLocaleSwedish),
              @"localeTurkish": @(IBGLocaleTurkish),
              
              @"sdkDebugLogsLevelVerbose": @(IBGSDKDebugLogsLevelVerbose),
              @"sdkDebugLogsLevelDebug": @(IBGSDKDebugLogsLevelDebug),
              @"sdkDebugLogsLevelError": @(IBGSDKDebugLogsLevelError),
              @"sdkDebugLogsLevelNone": @(IBGSDKDebugLogsLevelNone),


              @"emailFieldHidden": @(IBGBugReportingInvocationOptionEmailFieldHidden),
              @"emailFieldOptional": @(IBGBugReportingInvocationOptionEmailFieldOptional),
              @"commentFieldRequired": @(IBGBugReportingInvocationOptionCommentFieldRequired),
              @"disablePostSendingDialog": @(IBGBugReportingInvocationOptionDisablePostSendingDialog),
              
              @"colorThemeLight": @(IBGColorThemeLight),
              @"colorThemeDark": @(IBGColorThemeDark),
              
              @"enabledWithRequiredFields": @(IBGExtendedBugReportModeEnabledWithRequiredFields),
              @"enabledWithOptionalFields": @(IBGExtendedBugReportModeEnabledWithOptionalFields),
              @"disabled": @(IBGExtendedBugReportModeDisabled),
              
              @"welcomeMessageModeLive": @(IBGWelcomeMessageModeLive),
              @"welcomeMessageModeBeta": @(IBGWelcomeMessageModeBeta),
              @"welcomeMessageModeDisabled": @(IBGWelcomeMessageModeDisabled),
              
              @"shakeHint": kIBGShakeStartAlertTextStringName,
              @"swipeHint": kIBGTwoFingerSwipeStartAlertTextStringName,
              @"edgeSwipeStartHint": kIBGEdgeSwipeStartAlertTextStringName,
              @"startAlertText": kIBGStartAlertTextStringName,
              @"invalidEmailMessage": kIBGInvalidEmailMessageStringName,
              @"invalidEmailTitle": kIBGInvalidEmailTitleStringName,
              @"invalidCommentMessage": kIBGInvalidCommentMessageStringName,
              @"invalidCommentTitle": kIBGInvalidCommentTitleStringName,
              @"invocationHeader": kIBGInvocationTitleStringName,
              //@"talkToUs": kIBGTalkToUsStringName,
              @"startChats": kIBGAskAQuestionStringName,
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
              @"videPressRecord": kIBGVideoPressRecordTitle,
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
              
              @"surveysCustomThanksTitle": kIBGCustomSurveyThankYouTitleText,
              @"surveysCustomThanksSubtitle": kIBGCustomSurveyThankYouDescriptionText,
              
              @"surveysStoreRatingThanksTitle": kIBGStoreRatingThankYouTitleText,
              @"surveysStoreRatingThanksSubtitle": kIBGStoreRatingThankYouDescriptionText,

              @"reportBugDescription": kIBGReportBugDescriptionStringName,
              @"reportFeedbackDescription": kIBGReportFeedbackDescriptionStringName,
              @"reportQuestionDescription": kIBGReportQuestionDescriptionStringName,
              @"requestFeatureDescription": kIBGRequestFeatureDescriptionStringName,
              
              @"discardAlertTitle": kIBGDiscardAlertTitle,
              @"discardAlertMessage": kIBGDiscardAlertMessage,
              @"discardAlertCancel": kIBGDiscardAlertCancel,
              @"discardAlertAction": kIBGDiscardAlertAction,
              @"addAttachmentButtonTitleStringName": kIBGAddAttachmentButtonTitleStringName
            };
};

- (void) setBaseUrlForDeprecationLogs {
    SEL setCurrentPlatformSEL = NSSelectorFromString(@"setCurrentPlatform:");
    if([[Instabug class] respondsToSelector:setCurrentPlatformSEL]) {
        NSInvocation *inv = [NSInvocation invocationWithMethodSignature:[[Instabug class] methodSignatureForSelector:setCurrentPlatformSEL]];
        [inv setSelector:setCurrentPlatformSEL];
        [inv setTarget:[Instabug class]];
        IBGPlatform platform = IBGPlatformReactNative;
        [inv setArgument:&(platform) atIndex:2];
        
        [inv invoke];
    }
}

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

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
