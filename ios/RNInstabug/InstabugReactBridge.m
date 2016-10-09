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
    [Instabug setCrashReportingEnabled:NO];
    [Instabug setPushNotificationsEnabled:NO];
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

RCT_EXPORT_METHOD(getUnReadMessageCount:(RCTResponseSenderBlock)callBack) {
    callBack(@[@([Instabug getUnreadMessagesCount])]);
}

RCT_EXPORT_METHOD(setInvocationEvent:(IBGInvocationEvent)invocationEvent) {
    [Instabug setInvocationEvent:invocationEvent];
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
            @"invocationModeChatsList": @(IBGInvocationModeChatsList)
            };
};

@end
