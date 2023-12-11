#ifndef RNInstabug_h
#define RNInstabug_h

#import <Instabug/Instabug.h>

@interface RNInstabug : NSObject

+ (void)initWithToken:(NSString *)token invocationEvents:(IBGInvocationEvent)invocationEvents debugLogsLevel:(IBGSDKDebugLogsLevel)debugLogsLevel;
+ (void)initWithToken:(NSString *)token invocationEvents:(IBGInvocationEvent)invocationEvents;

/**
 @brief Set codePush version before starting the SDK.
 
 @discussion Sets Code Push version to be used for all reports.
 should be called from `-[UIApplicationDelegate application:didFinishLaunchingWithOptions:]`
 and before `startWithToken`.
 
 @param codePushVersion the Code Push version to be used for all reports.
 */
+ (void)setCodePushVersion:(NSString *)codePushVersion;

@end

#endif /* RNInstabug_h */
