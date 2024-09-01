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

- (void)init:(NSString *)token invocationEvents:(NSArray *)invocationEventsArray debugLogsLevel:(IBGSDKDebugLogsLevel)sdkDebugLogsLevel useNativeNetworkInterception:(BOOL)useNativeNetworkInterception codePushVersion:(NSString *)codePushVersion;

- (void)setCodePushVersion:(NSString *)version;

- (void)setUserData:(NSString *)userData;

- (void)setTrackUserSteps:(BOOL)isEnabled;

- (void)setSessionProfilerEnabled:(BOOL)sessionProfilerEnabled;

- (void)setLocale:(IBGLocale)locale;

- (void)setColorTheme:(IBGColorTheme)colorTheme;

- (void)setPrimaryColor:(UIColor *)color;

- (void)appendTags:(NSArray *)tags;

- (void)resetTags;

- (void)getTags:(RCTPromiseResolveBlock)resolve :(RCTPromiseRejectBlock)reject;

- (void)setString:(NSString *)value toKey:(NSString *)key;

- (void)identifyUser:(NSString *)email name:(NSString *)name userId:(nullable NSString *)userId;

- (void)logOut;

- (void)logUserEvent:(NSString *)name;

- (void)logVerbose:(NSString *)log;

- (void)setReproStepsConfig:(IBGUserStepsMode)bugMode:(IBGUserStepsMode)crashMode:(IBGUserStepsMode)sessionReplayMode;

- (void)setUserAttribute:(NSString *)key withValue:(NSString *)value;

- (void)getUserAttribute:(NSString *)key
                        :(RCTPromiseResolveBlock)resolve
                        :(RCTPromiseRejectBlock)reject;

- (void)removeUserAttribute:(NSString *)key;

- (void)getAllUserAttributes:(RCTPromiseResolveBlock)resolve
                            :(RCTPromiseRejectBlock)reject;

- (void)clearAllUserAttributes;

- (void)showWelcomeMessageWithMode:(IBGWelcomeMessageMode)welcomeMessageMode;

- (void)setWelcomeMessageMode:(IBGWelcomeMessageMode)welcomeMessageMode;

- (void)setFileAttachment:(NSString *)fileLocation;

- (void)show;

- (void) willRedirectToStore;


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

- (void)networkLogIOS:(NSString * _Nonnull)url
               method:(NSString * _Nonnull)method
          requestBody:(NSString * _Nonnull)requestBody
      requestBodySize:(double)requestBodySize
         responseBody:(NSString * _Nonnull)responseBody
     responseBodySize:(double)responseBodySize
         responseCode:(double)responseCode
       requestHeaders:(NSDictionary * _Nonnull)requestHeaders
      responseHeaders:(NSDictionary * _Nonnull)responseHeaders
          contentType:(NSString * _Nonnull)contentType
          errorDomain:(NSString * _Nullable)errorDomain
            errorCode:(double)errorCode
            startTime:(double)startTime
             duration:(double)duration
         gqlQueryName:(NSString * _Nullable)gqlQueryName
   serverErrorMessage:(NSString * _Nullable)serverErrorMessage;

- (void) setRequestObfuscationHandlerIOS: (NSString * _Nonnull)url;
- (void) registerNetworkLogsListener:(RCTResponseSenderBlock _Nullable )callBack;

- (void) setNetworkLoggingRequestFilterPredicateIOS: (NSString * _Nonnull)expression;

/*
 +------------------------------------------------------------------------+
 |                              Experiments                               |
 +------------------------------------------------------------------------+
 */

- (void)addExperiments:(NSArray *)experiments;
- (void)removeExperiments:(NSArray *)experiments;
- (void)clearAllExperiments;
- (void)addFeatureFlags:(NSDictionary *)featureFlagsMap;
- (void)removeFeatureFlags:(NSArray *)featureFlags;
- (void)removeAllFeatureFlags;
@end
