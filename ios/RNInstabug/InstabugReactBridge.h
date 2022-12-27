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
#import "ArgsRegistry.h"

@interface InstabugReactBridge : RCTEventEmitter <RCTBridgeModule>

/*
 +------------------------------------------------------------------------+
 |                            Instabug Module                             |
 +------------------------------------------------------------------------+
 */

- (void)setEnabled:(BOOL)isEnabled;

- (void)start:(NSString *)token invocationEvents:(NSArray *)invocationEventsArray;

- (void)init:(NSString *)token invocationEvents:(NSArray *)invocationEventsArray;

- (void)setUserData:(NSString *)userData;

- (void)setTrackUserSteps:(BOOL)isEnabled;

- (void)setSessionProfilerEnabled:(BOOL)sessionProfilerEnabled;

- (void)setSdkDebugLogsLevel:(IBGSDKDebugLogsLevel)sdkDebugLogsLevel;

- (void)setLocale:(IBGLocale)locale;

- (void)setColorTheme:(IBGColorTheme)colorTheme;

- (void)setPrimaryColor:(UIColor *)color;

- (void)appendTags:(NSArray *)tags;

- (void)resetTags;

- (void)getTags:(RCTResponseSenderBlock)callBack;

- (void)setString:(NSString *)value toKey:(NSString *)key;

- (void)identifyUser:(NSString *)email name:(NSString *)name;

- (void)logOut;

- (void)logUserEvent:(NSString *)name;

- (void)logVerbose:(NSString *)log;

- (void)setReproStepsMode:(IBGUserStepsMode)reproStepsMode;

- (void)setUserAttribute:(NSString *)key withValue:(NSString *)value;

- (void)getUserAttribute:(NSString *)key callback:(RCTResponseSenderBlock)callback;

- (void)removeUserAttribute:(NSString *)key;

- (void)getAllUserAttributes:(RCTResponseSenderBlock)callback;

- (void)clearAllUserAttributes;

- (void)showWelcomeMessageWithMode:(IBGWelcomeMessageMode)welcomeMessageMode;

- (void)setWelcomeMessageMode:(IBGWelcomeMessageMode)welcomeMessageMode;

- (void)setFileAttachment:(NSString *)fileLocation;

- (void)show;


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
 |                           Network Logging                              |
 +------------------------------------------------------------------------+
 */

- (void)setNetworkLoggingEnabled:(BOOL)isEnabled;

/*
 +------------------------------------------------------------------------+
 |                              Experiments                               |
 +------------------------------------------------------------------------+
 */

- (void)addExperiments:(NSArray *)experiments;
- (void)removeExperiments:(NSArray *)experiments;
- (void)clearAllExperiments;

@end
