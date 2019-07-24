//
//  InstabugReactBridge.h
//  instabugDemo
//
//  Created by Yousef Hamza on 9/29/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <Instabug/Instabug.h>
#import <Instabug/IBGBugReporting.h>
#import <Instabug/IBGCrashReporting.h>
#import <Instabug/IBGSurveys.h>
#import <Instabug/IBGLog.h>

@interface InstabugReactBridge : RCTEventEmitter <RCTBridgeModule>

/***********Surveys*****************/

- (void)showSurveyWithToken:(NSString *)surveyToken;

- (void)showSurveysIfAvailable;

- (void)setWillShowSurveyHandler:(RCTResponseSenderBlock)callBack;

- (void)setDidDismissSurveyHandler:(RCTResponseSenderBlock)callBack;

- (void)setAutoShowingSurveysEnabled:(BOOL)autoShowingSurveysEnabled;

- (void)setThresholdForReshowingSurveyAfterDismiss:(NSInteger)sessionCount daysCount:(NSInteger)daysCount;

- (void)setShouldShowSurveysWelcomeScreen:(BOOL)shouldShowWelcomeScreen;

- (void)hasRespondedToSurveyWithToken:(NSString *)surveyToken callback:(RCTResponseSenderBlock)callback;

- (void)getAvailableSurveys:(RCTResponseSenderBlock)callback;

- (void)setSurveysEnabled:(BOOL)surveysEnabled;

/***********Bug Reporting*****************/

- (void)setBugReportingEnabled:(BOOL) isEnabled;

- (void)setInvocationEvents:(NSArray*)invocationEventsArray;

- (void)invoke;

- (void)setInvocationOptions:(NSArray*)invocationOptionsArray;

- (void)invokeWithInvocationModeAndOptions:(IBGInvocationMode)invocationMode options:(NSArray*)options;

- (void)setPreInvocationHandler:(RCTResponseSenderBlock)callBack;

- (void)setPostInvocationHandler:(RCTResponseSenderBlock)callBack;

- (void)setPromptOptionsEnabled:(BOOL)chatEnabled feedback:(BOOL)bugReportEnabled chat:(BOOL)feedbackEnabled;

- (void)setShakingThresholdForiPhone:(double)iPhoneShakingThreshold;

- (void)setShakingThresholdForiPad:(double)iPadShakingThreshold;

- (void)setExtendedBugReportMode:(IBGExtendedBugReportMode)extendedBugReportMode;

- (void)setReportTypes:(NSArray*)types;

- (void)showBugReportingWithReportTypeAndOptions:(IBGBugReportingReportType) type: (NSArray*) options;

- (void)setAutoScreenRecordingEnabled:(BOOL) enabled;

- (void)setAutoScreenRecordingMaxDuration:(CGFloat) duration;

- (void)setViewHierarchyEnabled:(BOOL) viewHierarchyEnabled;

@end
