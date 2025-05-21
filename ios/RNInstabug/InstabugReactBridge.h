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
#import <InstabugSDK/InstabugSDK.h>
#import <InstabugSDK/IBGBugReporting.h>
#import <InstabugSDK/IBGCrashReporting.h>
#import <InstabugSDK/IBGLog.h>
#import <InstabugSDK/IBGTypes.h>
#import "ArgsRegistry.h"

@interface InstabugReactBridge : RCTEventEmitter <RCTBridgeModule>

/*
 +------------------------------------------------------------------------+
 |                            Instabug Module                             |
 +------------------------------------------------------------------------+
 */

- (void)setEnabled:(BOOL)isEnabled;

- (void)init:(NSString *)token invocationEvents:(NSArray *)invocationEventsArray debugLogsLevel:(IBGSDKDebugLogsLevel)sdkDebugLogsLevel useNativeNetworkInterception:(BOOL)useNativeNetworkInterception codePushVersion:(NSString *)codePushVersion overAirVersion:(NSDictionary *)overAirVersion;

- (void)setCodePushVersion:(NSString *)version;

- (void)setOverAirVersion:(NSDictionary *)overAirVersion;

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
- (void)isW3ExternalTraceIDEnabled:(RCTPromiseResolveBlock)resolve :(RCTPromiseRejectBlock)reject;
- (void)isW3ExternalGeneratedHeaderEnabled:(RCTPromiseResolveBlock)resolve :(RCTPromiseRejectBlock)reject;
- (void)isW3CaughtHeaderEnabled:(RCTPromiseResolveBlock)resolve :(RCTPromiseRejectBlock)reject;
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
   serverErrorMessage:(NSString * _Nullable)serverErrorMessage
w3cExternalTraceAttributes:(NSDictionary * _Nullable)w3cExternalTraceAttributes;

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
- (void)setNetworkLogBodyEnabled:(BOOL)isEnabled;
- (void)enableAutoMasking:(NSArray *)autoMaskingTypes;

@end
