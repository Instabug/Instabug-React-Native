/*
 File:       Instabug/IBGCrashReporting.h
 
 Contains:   API for using Instabug's SDK.
 
 Copyright:  (c) 2013-2019 by Instabug, Inc., all rights reserved.
 
 Version:    10.9.2
 */

#import <Foundation/Foundation.h>

NS_SWIFT_NAME(CrashReporting)
@interface IBGCrashReporting : NSObject

/**
 @brief Enable/Disable crash reporting.
 
 Crash reporting is enabled by default. If you need to disable it, It's recommended to call it before startWithToken.
 */
@property (class, atomic, assign) BOOL enabled;

/**
 @brief Enable/Disable out of memory crash reporting.
 
 Out of memory crash reporting is enabled by default. OOM will be disabled if crash reporting is disabled.
 */
@property (class, atomic, assign) BOOL OOMEnabled;

/**
 @brief Enable/Disable unhandled crash reporting.
 
 Unhandled crash reporting is enabled by default. If you need to disable it, you need to call it before startWithToken, And It will disable OOM as well.
 */
@property (class, atomic, assign) BOOL unhandledEnabled;

/**
 @brief Report an exception manually.
 
 @param exception Exception to be reported.
 */
+ (void)reportException:(NSException *)exception;

/**
 @brief Report an error manually.
 
 @param error error to be reported.
 */
+ (void)reportError:(NSError *)error;

/**
 @brief Report an exception manually with user attributes will be sent with this exception only.
 @discussion The limit for user attributes sent with an exception is 100 elements; if this limit is exceeded we will only select 100 elements. Also, the characters limit for a user attribute's key and value is 90 characters; keys and values exceeding this limit will be trimmed.
 @param exception Exception to be reported.
 @param userAttributes user attributes to be attached with the report.
 */
+ (void)reportException:(NSException *)exception withUserAttributes:(NSDictionary <NSString *, NSString *>*)userAttributes;

/**
 @brief Report an error manually with user attributes will be sent with this exception only.
 @discussion The limit for user attributes sent with an error is 100 elements; if this limit is exceeded we will only select 100 elements. Also, the characters limit for a user attribute's key and value is 90 characters; keys and values exceeding this limit will be trimmed.

 @param error error to be reported.
 @param userAttributes user attributes to be attached with the report.
 */
+ (void)reportError:(NSError *)error withUserAttributes:(NSDictionary <NSString *, NSString *>*)userAttributes;

@end
