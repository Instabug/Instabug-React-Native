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
#import <asl.h>
#import <React/RCTLog.h>
#import <os/log.h>
#import <Instabug/IBGTypes.h>

@implementation InstabugReactBridge

- (NSArray<NSString *> *)supportedEvents {
    return @[
             @"IBGpreSendingHandler",
             @"IBGpreInvocationHandler",
             @"IBGpostInvocationHandler",
             @"IBGonNewMessageHandler",
             @"IBGWillShowSurvey",
             @"IBGDidDismissSurvey",
             @"IBGDidSelectPromptOptionHandler",
             @"IBGOnNewReplyReceivedCallback"
             ];
}

RCT_EXPORT_MODULE(Instabug)

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(startWithToken:(NSString *)token invocationEvents:(NSArray*)invocationEventsArray) {
    IBGInvocationEvent invocationEvents = 0;
    NSLog(@"invocation events: %ld",(long)invocationEvents);
    for (NSNumber *boxedValue in invocationEventsArray) {
        invocationEvents |= [boxedValue intValue];
    }
    [Instabug startWithToken:token invocationEvents:invocationEvents];
    RCTAddLogFunction(InstabugReactLogFunction);
    RCTSetLogThreshold(RCTLogLevelInfo);
    IBGNetworkLogger.enabled = NO;
    SEL setCrossPlatformSEL = NSSelectorFromString(@"setCrossPlatform:");
    if ([[Instabug class] respondsToSelector:setCrossPlatformSEL]) {
        [[Instabug class] performSelector:setCrossPlatformSEL withObject:@(true)];
    }
    
    [self setBaseUrlForDeprecationLogs];
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

RCT_EXPORT_METHOD(invoke) {
    [IBGBugReporting invoke];
}

RCT_EXPORT_METHOD(invokeWithInvocationModeAndOptions:(IBGInvocationMode)invocationMode options:(NSArray*)options) {
    IBGBugReportingInvocationOption invocationOptions = 0;
    for (NSNumber *boxedValue in options) {
        invocationOptions |= [boxedValue intValue];
    }
    [IBGBugReporting invokeWithMode:invocationMode options:invocationOptions];
}

RCT_EXPORT_METHOD(setReproStepsMode:(IBGUserStepsMode)reproStepsMode) {
    [Instabug setReproStepsMode:reproStepsMode];
}

RCT_EXPORT_METHOD(setFileAttachment:(NSString *)fileLocation) {
    NSURL *url = [NSURL URLWithString:fileLocation];
    [Instabug addFileAttachmentWithURL:url];
}

RCT_EXPORT_METHOD(sendJSCrash:(NSDictionary *)stackTrace) {
    SEL reportCrashWithStackTraceSEL = NSSelectorFromString(@"reportCrashWithStackTrace:handled:");
    if ([[Instabug class] respondsToSelector:reportCrashWithStackTraceSEL]) {
        [[Instabug class] performSelector:reportCrashWithStackTraceSEL withObject:stackTrace withObject:@(false)];
    }
}

RCT_EXPORT_METHOD(sendHandledJSCrash:(NSDictionary *)stackTrace) {
    SEL reportCrashWithStackTraceSEL = NSSelectorFromString(@"reportCrashWithStackTrace:handled:");
    if ([[Instabug class] respondsToSelector:reportCrashWithStackTraceSEL]) {
        [[Instabug class] performSelector:reportCrashWithStackTraceSEL withObject:stackTrace withObject:@(true)];
    }
}

RCT_EXPORT_METHOD(setUserData:(NSString *)userData) {
    [Instabug setUserData:userData];
}

RCT_EXPORT_METHOD(showSurveyWithToken:(NSString *)surveyToken) {
    [IBGSurveys showSurveyWithToken:surveyToken];
}

RCT_EXPORT_METHOD(hasRespondedToSurveyWithToken:(NSString *)surveyToken callback:(RCTResponseSenderBlock)callback) {
    callback(@[@([IBGSurveys hasRespondedToSurveyWithToken:surveyToken])]);
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

RCT_EXPORT_METHOD(setAutoScreenRecordingEnabled:(BOOL)enabled) {
    Instabug.autoScreenRecordingEnabled = enabled;
}

RCT_EXPORT_METHOD(setAutoScreenRecordingMaxDuration:(CGFloat)duration) {
    Instabug.autoScreenRecordingDuration = duration;
}

RCT_EXPORT_METHOD(setPreSendingHandler:(RCTResponseSenderBlock)callBack) {
    if (callBack != nil) {
        Instabug.willSendReportHandler = ^(IBGReport* report){
            NSArray *tagsArray = report.tags;
            NSArray *instabugLogs= report.instabugLogs;
            NSArray *consoleLogs= report.consoleLogs;
            NSDictionary *userAttributes= report.userAttributes;
            NSArray *fileAttachments= report.fileLocations;
            NSDictionary *dict = @{ @"tagsArray" : tagsArray, @"instabugLogs" : instabugLogs, @"consoleLogs" : consoleLogs,       @"userAttributes" : userAttributes, @"fileAttachments" : fileAttachments};
            [self sendEventWithName:@"IBGpreSendingHandler" body:dict];
            return report;
        };
    } else {
        Instabug.willSendReportHandler = nil;
    }
}

RCT_EXPORT_METHOD(setPreInvocationHandler:(RCTResponseSenderBlock)callBack) {
    if (callBack != nil) {
        IBGBugReporting.willInvokeHandler = ^{
            [self sendEventWithName:@"IBGpreInvocationHandler" body:nil];
        };
    } else {
        IBGBugReporting.willInvokeHandler = nil;
    }
}

RCT_EXPORT_METHOD(setPostInvocationHandler:(RCTResponseSenderBlock)callBack) {
    if (callBack != nil) {
        IBGBugReporting.didDismissHandler = ^(IBGDismissType dismissType, IBGReportType reportType) {
            NSLog(@"Dismiss Type: %ld",(long)dismissType);
            NSLog(@"Report Type: %ld",(long)reportType);
            
            //parse dismiss type enum
            NSString* dismissTypeString;
            if (dismissType == IBGDismissTypeCancel) {
                dismissTypeString = @"CANCEL";
            } else if (dismissType == IBGDismissTypeSubmit) {
                dismissTypeString = @"SUBMIT";
            } else if (dismissType == IBGDismissTypeAddAttachment) {
                dismissTypeString = @"ADD_ATTACHMENT";
            }
            
            //parse report type enum
            NSString* reportTypeString;
            if (reportType == IBGReportTypeBug) {
                reportTypeString = @"bug";
            } else if (reportType == IBGReportTypeFeedback) {
                reportTypeString = @"feedback";
            } else {
                reportTypeString = @"other";
            }
            NSDictionary *result = @{ @"dismissType": dismissTypeString,
                                     @"reportType": reportTypeString};
            [self sendEventWithName:@"IBGpostInvocationHandler" body: result];
        };
    } else {
        IBGBugReporting.didDismissHandler = nil;
    }
}

RCT_EXPORT_METHOD(didSelectPromptOptionHandler:(RCTResponseSenderBlock)callBack) {
    if (callBack != nil) {
        
        IBGBugReporting.didSelectPromptOptionHandler = ^(IBGPromptOption promptOption) {
            
            NSString *promptOptionString;
            if (promptOption == IBGPromptOptionBug) {
                promptOptionString = @"bug";
            } else if (promptOption == IBGReportTypeFeedback) {
                promptOptionString = @"feedback";
            } else if (promptOption == IBGPromptOptionChat) {
                promptOptionString = @"chat";
            } else {
                promptOptionString = @"none";
            }
            
            [self sendEventWithName:@"IBGDidSelectPromptOptionHandler" body:@{
                                                                       @"promptOption": promptOptionString
                                                                       }];
        };
    } else {
        IBGBugReporting.didSelectPromptOptionHandler = nil;
    }
}

RCT_EXPORT_METHOD(getUnreadMessagesCount:(RCTResponseSenderBlock)callBack) {
    callBack(@[@(IBGReplies.unreadRepliesCount)]);
}

RCT_EXPORT_METHOD(setInvocationEvents:(NSArray*)invocationEventsArray) {
    IBGInvocationEvent invocationEvents = 0;
    for (NSNumber *boxedValue in invocationEventsArray) {
        invocationEvents |= [boxedValue intValue];
    }
    IBGBugReporting.invocationEvents = invocationEvents;
}

RCT_EXPORT_METHOD(setInvocationOptions:(NSArray*)invocationOptionsArray) {
    IBGBugReportingInvocationOption invocationOptions = 0;
    
    for (NSNumber *boxedValue in invocationOptionsArray) {
        invocationOptions |= [boxedValue intValue];
    }
    
    IBGBugReporting.invocationOptions = invocationOptions;
}

RCT_EXPORT_METHOD(setPushNotificationsEnabled:(BOOL)isPushNotificationEnabled) {
    [Instabug setPushNotificationsEnabled:isPushNotificationEnabled];
}

RCT_EXPORT_METHOD(setShakingThresholdForIPhone:(double)iPhoneShakingThreshold forIPad:(double)iPadShakingThreshold) {
    [IBGBugReporting setShakingThresholdForiPhone:iPhoneShakingThreshold];
    [IBGBugReporting setShakingThresholdForiPad:iPadShakingThreshold];
}

RCT_EXPORT_METHOD(setShakingThresholdForiPhone:(double)iPhoneShakingThreshold) {
    IBGBugReporting.shakingThresholdForiPhone = iPhoneShakingThreshold;
}

RCT_EXPORT_METHOD(setShakingThresholdForiPad:(double)iPadShakingThreshold) {
    IBGBugReporting.shakingThresholdForiPad = iPadShakingThreshold;
}

RCT_EXPORT_METHOD(setFloatingButtonEdge:(CGRectEdge)floatingButtonEdge withTopOffset:(double)floatingButtonOffsetFromTop) {
    IBGBugReporting.floatingButtonEdge = floatingButtonEdge;
    IBGBugReporting.floatingButtonTopOffset = floatingButtonOffsetFromTop;
}

RCT_EXPORT_METHOD(setLocale:(IBGLocale)locale) {
    [Instabug setLocale:locale];
}

RCT_EXPORT_METHOD(setExtendedBugReportMode:(IBGExtendedBugReportMode)extendedBugReportMode) {
    IBGBugReporting.extendedBugReportMode = extendedBugReportMode;
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

RCT_EXPORT_METHOD(setEnabledAttachmentTypes:(BOOL)screenShot
                    extraScreenShot:(BOOL)extraScreenShot
                    galleryImage:(BOOL)galleryImage
                    screenRecording:(BOOL)screenRecording) {
     IBGAttachmentType attachmentTypes = 0;
     if(screenShot) {
         attachmentTypes = IBGAttachmentTypeScreenShot;
     }
     if(extraScreenShot) {
         attachmentTypes |= IBGAttachmentTypeExtraScreenShot;
     }
     if(galleryImage) {
         attachmentTypes |= IBGAttachmentTypeGalleryImage;
     }
     if(screenRecording) {
         attachmentTypes |= IBGAttachmentTypeScreenRecording;
     }

     IBGBugReporting.enabledAttachmentTypes = attachmentTypes;
  }

RCT_EXPORT_METHOD(setChatNotificationEnabled:(BOOL)isChatNotificationEnabled) {
    IBGReplies.inAppNotificationsEnabled = isChatNotificationEnabled;
}

RCT_EXPORT_METHOD(setOnNewMessageHandler:(RCTResponseSenderBlock)callBack) {
    if (callBack != nil) {
        IBGReplies.didReceiveReplyHandler= ^{
            [self sendEventWithName:@"IBGonNewMessageHandler" body:nil];
        };
    } else {
        IBGReplies.didReceiveReplyHandler = nil;
    }
}

RCT_EXPORT_METHOD(setPromptOptionsEnabled:(BOOL)chatEnabled
                  feedback:(BOOL)bugReportEnabled
                  chat:(BOOL)feedbackEnabled) {
    IBGPromptOption promptOption = IBGPromptOptionNone;
    if (chatEnabled) {
        promptOption |= IBGPromptOptionChat;
    }
    if (bugReportEnabled) {
        promptOption |= IBGPromptOptionBug;
    }
    if (feedbackEnabled) {
        promptOption |= IBGPromptOptionFeedback;
    }
    
    [IBGBugReporting setPromptOptions:promptOption];
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
    Instabug.shouldCaptureViewHierarchy = viewHierarchyEnabled;
}

RCT_EXPORT_METHOD(getAvailableSurveys:(RCTResponseSenderBlock)callback) {
    callback(@[[IBGSurveys availableSurveys]]);
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

RCT_EXPORT_METHOD(setSurveysEnabled:(BOOL)surveysEnabled) {
    IBGSurveys.enabled = surveysEnabled;
}

RCT_EXPORT_METHOD(showSurveysIfAvailable) {
    [IBGSurveys showSurveyIfAvailable];
}

RCT_EXPORT_METHOD(setWillShowSurveyHandler:(RCTResponseSenderBlock)callBack) {
    if (callBack != nil) {
        IBGSurveys.willShowSurveyHandler = ^{
            [self sendEventWithName:@"IBGWillShowSurvey" body:nil];
        };
    } else {
        IBGSurveys.willShowSurveyHandler = nil;
    }
}

RCT_EXPORT_METHOD(setDidDismissSurveyHandler:(RCTResponseSenderBlock)callBack) {
    if (callBack != nil) {
        IBGSurveys.didDismissSurveyHandler = ^{
            [self sendEventWithName:@"IBGDidDismissSurvey" body:nil];
        };
    } else {
        IBGSurveys.didDismissSurveyHandler = nil;
    }
}

RCT_EXPORT_METHOD(setViewHirearchyEnabled:(BOOL)viewHirearchyEnabled) {
    Instabug.shouldCaptureViewHierarchy = viewHirearchyEnabled;
}

RCT_EXPORT_METHOD(setAutoShowingSurveysEnabled:(BOOL)autoShowingSurveysEnabled) {
    IBGSurveys.autoShowingEnabled = autoShowingSurveysEnabled;
}

RCT_EXPORT_METHOD(setVideoRecordingFloatingButtonPosition:(IBGPosition)position) {
//    IBGBugReporting.videoRecordingFloatingButtonPosition = position;
}

RCT_EXPORT_METHOD(setThresholdForReshowingSurveyAfterDismiss:(NSInteger)sessionCount daysCount:(NSInteger)daysCount) {
    [IBGSurveys setThresholdForReshowingSurveyAfterDismiss:sessionCount daysCount:daysCount];
}

RCT_EXPORT_METHOD(setSessionProfilerEnabled:(BOOL)sessionProfilerEnabled) {
    [Instabug setSessionProfilerEnabled:sessionProfilerEnabled];
}

RCT_EXPORT_METHOD(showFeatureRequests) {
    [IBGFeatureRequests show];
}

RCT_EXPORT_METHOD(setShouldShowSurveysWelcomeScreen:(BOOL)shouldShowWelcomeScreen) {
    IBGSurveys.shouldShowWelcomeScreen = shouldShowWelcomeScreen;
}

RCT_EXPORT_METHOD(setEmailFieldRequiredForActions:(BOOL)isEmailFieldRequired
                 forAction:(NSArray *)actionTypesArray) {
    IBGAction actionTypes = 0;
    
    for (NSNumber *boxedValue in actionTypesArray) {
         actionTypes |= [boxedValue intValue];
    }

     [IBGFeatureRequests setEmailFieldRequired:isEmailFieldRequired forAction:actionTypes];
  }

RCT_EXPORT_METHOD(showWelcomeMessageWithMode:(IBGWelcomeMessageMode)welcomeMessageMode) {
    [Instabug showWelcomeMessageWithMode:welcomeMessageMode];
}

RCT_EXPORT_METHOD(setWelcomeMessageMode:(IBGWelcomeMessageMode)welcomeMessageMode) {
    [Instabug setWelcomeMessageMode:welcomeMessageMode];
}

RCT_EXPORT_METHOD(setEmailFieldRequiredForFeatureRequests:(BOOL)isEmailFieldRequired
                  forAction:(NSArray *)actionTypesArray) {
    IBGAction actionTypes = 0;
    
    for (NSNumber *boxedValue in actionTypesArray) {
        actionTypes |= [boxedValue intValue];
    }
    
    [IBGFeatureRequests setEmailFieldRequired:isEmailFieldRequired forAction:actionTypes];
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

RCT_EXPORT_METHOD(show) {
    [Instabug show];
}

RCT_EXPORT_METHOD(setReportTypes:(NSArray*) types ) {
    IBGBugReportingReportType reportTypes = 0;
    for (NSNumber *boxedValue in types) {
        reportTypes |= [boxedValue intValue];
    }
    [IBGBugReporting setPromptOptionsEnabledReportTypes: reportTypes];
}

RCT_EXPORT_METHOD(setBugReportingEnabled:(BOOL) isEnabled) {
    IBGBugReporting.enabled = isEnabled;
}

RCT_EXPORT_METHOD(showBugReportingWithReportTypeAndOptions:(IBGBugReportingReportType) type: (NSArray*) options) {
    IBGBugReportingOption parsedOptions = 0;
    for (NSNumber *boxedValue in options) {
        parsedOptions |= [boxedValue intValue];
    }
    [IBGBugReporting showWithReportType:type options:parsedOptions];
}

RCT_EXPORT_METHOD(setChatsEnabled:(BOOL)isEnabled) {
    IBGChats.enabled = isEnabled;
}

RCT_EXPORT_METHOD(showChats) {
    [IBGChats show];
}

RCT_EXPORT_METHOD(setRepliesEnabled:(BOOL) isEnabled) {
    IBGReplies.enabled = isEnabled;
}

RCT_EXPORT_METHOD(hasChats:(RCTResponseSenderBlock) callback) {
    BOOL hasChats = IBGReplies.hasChats;
    callback(@[@(hasChats)]);

}

RCT_EXPORT_METHOD(showReplies) {
    [IBGReplies show];
}
    
RCT_EXPORT_METHOD(setOnNewReplyReceivedCallback:(RCTResponseSenderBlock) callback) {
    if (callback != nil) {
        IBGReplies.didReceiveReplyHandler = ^{
            [self sendEventWithName:@"IBGOnNewReplyReceivedCallback" body:nil];
        };
    } else {
        IBGReplies.didReceiveReplyHandler = nil;
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

              @"reportTypeBug": @(IBGReportTypeBug),
              @"reportTypeFeedback": @(IBGReportTypeFeedback),
              
              @"optionEmailFieldHidden": @(IBGBugReportingOptionEmailFieldHidden),
              @"optionEmailFieldOptional": @(IBGBugReportingOptionEmailFieldOptional),
              @"optionCommentFieldRequired": @(IBGBugReportingOptionCommentFieldRequired),
              @"optionDisablePostSendingDialog": @(IBGBugReportingOptionDisablePostSendingDialog),
              
              @"bugReportingReportTypeBug": @(IBGBugReportingReportTypeBug),
              @"bugReportingReportTypeFeedback": @(IBGBugReportingReportTypeFeedback),

              @"rectMinXEdge": @(CGRectMinXEdge),
              @"rectMinYEdge": @(CGRectMinYEdge),
              @"rectMaxXEdge": @(CGRectMaxXEdge),
              @"rectMaxYEdge": @(CGRectMaxYEdge),

              @"bottomRight": @(IBGPositionBottomRight),
              @"topRight": @(IBGPositionTopRight),
              @"bottomLeft": @(IBGPositionBottomLeft),
              @"topLeft": @(IBGPositionTopLeft),

              @"allActions": @(IBGActionAllActions),
              @"reportBugAction": @(IBGActionReportBug),
              @"requestNewFeature": @(IBGActionRequestNewFeature),
              @"addCommentToFeature": @(IBGActionAddCommentToFeature),

              @"localeArabic": @(IBGLocaleArabic),
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
              @"talkToUs": kIBGTalkToUsStringName,
              @"startChats": kIBGAskAQuestionStringName,
              @"reportBug": kIBGReportBugStringName,
              @"reportFeedback": kIBGReportFeedbackStringName,
              @"emailFieldHint": kIBGEmailFieldPlaceholderStringName,
              @"commentFieldHintForBugReport": kIBGCommentFieldPlaceholderForBugReportStringName,
              @"commentFieldHintForFeedback": kIBGCommentFieldPlaceholderForFeedbackStringName,
              @"addScreenRecordingMessage": kIBGAddScreenRecordingMessageStringName,
              @"addVoiceMessage": kIBGAddVoiceMessageStringName,
              @"addImageFromGallery": kIBGAddImageFromGalleryStringName,
              @"addExtraScreenshot": kIBGAddExtraScreenshotStringName,
              @"audioRecordingPermissionDeniedTitle": kIBGAudioRecordingPermissionDeniedTitleStringName,
              @"audioRecordingPermissionDeniedMessage": kIBGAudioRecordingPermissionDeniedMessageStringName,
              @"microphonePermissionAlertSettingsButtonTitle": kIBGMicrophonePermissionAlertSettingsButtonTitleStringName,
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
              @"surveysStoreRatingThanksSubtitle": kIBGStoreRatingThankYouDescriptionText
              
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
