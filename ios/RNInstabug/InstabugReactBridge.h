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
#import <Instabug/IBGTypes.h>

@interface InstabugReactBridge : RCTEventEmitter <RCTBridgeModule>

/*
 +------------------------------------------------------------------------+
 |                            Instabug Module                             |
 +------------------------------------------------------------------------+
 */

- (void)startWithToken:(NSString *)token invocationEvents:(NSArray *)invocationEventsArray;

- (void)setUserData:(NSString *)userData;

- (void)setTrackUserSteps:(BOOL)isEnabled;

- (void)setSessionProfilerEnabled:(BOOL)sessionProfilerEnabled;

- (void)setPushNotificationsEnabled:(BOOL)isPushNotificationEnabled;

- (void)setLocale:(IBGLocale)locale;

- (void)setColorTheme:(IBGColorTheme)colorTheme;

- (void)setPrimaryColor:(UIColor *)color;

- (void)appendTags:(NSArray *)tags;

- (void)resetTags;

- (void)getTags:(RCTResponseSenderBlock)callBack;

- (void)setString:(NSString *)value toKey:(NSString *)key;

- (void)identifyUserWithEmail:(NSString *)email name:(NSString *)name;

- (void)logOut;

- (void)logUserEventWithName:(NSString *)name;

- (void)logVerbose:(NSString *)log;

- (void)setReproStepsMode:(IBGUserStepsMode)reproStepsMode;

- (void)setUserAttribute:(NSString *)key withValue:(NSString *)value;

- (void)getUserAttribute:(NSString *)key callback:(RCTResponseSenderBlock)callback;

- (void)removeUserAttribute:(NSString *)key;

- (void)getAllUserAttributes:(RCTResponseSenderBlock)callback;

- (void)clearAllUserAttributes;

- (void)setViewHierarchyEnabled:(BOOL)viewHierarchyEnabled;

- (void)showWelcomeMessageWithMode:(IBGWelcomeMessageMode)welcomeMessageMode;

- (void)setWelcomeMessageMode:(IBGWelcomeMessageMode)welcomeMessageMode;

- (void)setFileAttachment:(NSString *)fileLocation;

- (void)show;
/*
 +------------------------------------------------------------------------+
 |                            Surveys Module                             |
 +------------------------------------------------------------------------+
 */

- (void)showSurveyWithToken:(NSString *)surveyToken;

/*
 +------------------------------------------------------------------------+
 |                            BugReporting Module                         |
 +------------------------------------------------------------------------+
 */

- (void)setBugReportingEnabled:(BOOL)isEnabled;

- (void)setInvocationEvents:(NSArray *)invocationEventsArray;

- (void)invoke;

- (void)setInvocationOptions:(NSArray *)invocationOptionsArray;

- (void)invokeWithInvocationModeAndOptions:(IBGInvocationMode)invocationMode options:(NSArray *)options;

- (void)setPreInvocationHandler:(RCTResponseSenderBlock)callBack;

- (void)setPostInvocationHandler:(RCTResponseSenderBlock)callBack;

- (void)setPromptOptionsEnabled:(BOOL)chatEnabled feedback:(BOOL)bugReportEnabled chat:(BOOL)feedbackEnabled;

- (void)setShakingThresholdForiPhone:(double)iPhoneShakingThreshold;

- (void)setShakingThresholdForiPad:(double)iPadShakingThreshold;

- (void)setExtendedBugReportMode:(IBGExtendedBugReportMode)extendedBugReportMode;

- (void)setReportTypes:(NSArray *)types;

- (void)showBugReportingWithReportTypeAndOptions:(IBGBugReportingReportType)type options:(NSArray *)options;

- (void)setAutoScreenRecordingEnabled:(BOOL)enabled;

- (void)setAutoScreenRecordingMaxDuration:(CGFloat)duration;

- (void)setViewHirearchyEnabled:(BOOL)viewHirearchyEnabled;

/*
 +------------------------------------------------------------------------+
 |                        Crash Reporting Module                          |
 +------------------------------------------------------------------------+
 */

- (void)setCrashReportingEnabled:(BOOL)enabledCrashReporter;

/*
 +------------------------------------------------------------------------+
 |                             Chats Module                               |
 +------------------------------------------------------------------------+
 */

- (void)setChatsEnabled:(BOOL)isEnabled;
- (void)showChats;

/*
 +------------------------------------------------------------------------+
 |                              Log Module                                |
 +------------------------------------------------------------------------+
 */

- (void)setIBGLogPrintsToConsole:(BOOL)printsToConsole;
- (void)logVerbose:(NSString *)log;
- (void)logDebug:(NSString *)log;
- (void)logInfo:(NSString *)log;
- (void)logWarn:(NSString *)log;
- (void)logError:(NSString *)log;
- (void)clearLogs;


/*
 +------------------------------------------------------------------------+
 |                            Feature Requests Module                     |
 +------------------------------------------------------------------------+
 */

- (void)setEmailFieldRequiredForFeatureRequests:(BOOL)isEmailFieldRequired forAction:(NSArray *)actionTypesArray;

- (void)showFeatureRequests;

/*
 +------------------------------------------------------------------------+
 |                            Replies Module                              |
 +------------------------------------------------------------------------+
 */

- (void)setRepliesEnabled:(BOOL) isEnabled;

- (void)hasChats:(RCTResponseSenderBlock) callback;

- (void)showReplies;

- (void)setOnNewReplyReceivedCallback:(RCTResponseSenderBlock) callback;

- (void)getUnreadMessagesCount:(RCTResponseSenderBlock)callBack;

- (void)setChatNotificationEnabled:(BOOL)isChatNotificationEnabled;


@end
