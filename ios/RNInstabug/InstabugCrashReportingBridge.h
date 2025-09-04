#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <InstabugSDK/IBGBugReporting.h>
#import <InstabugSDK/IBGTypes.h>
#import <InstabugSDK/IBGCrashReporting.h>
#import <InstabugSDK/InstabugSDK.h>
#import "ArgsRegistry.h"

@interface InstabugCrashReportingBridge : RCTEventEmitter <RCTBridgeModule>

- (void)setEnabled:(BOOL) isEnabled;
- (void)sendJSCrash:(NSDictionary *_Nonnull )stackTrace resolver:(RCTPromiseResolveBlock _Nullable )resolve
           rejecter:(RCTPromiseRejectBlock _Nullable )reject;
- (void)sendHandledJSCrash:(NSDictionary *_Nonnull)stackTrace userAttributes:(nullable NSDictionary *)userAttributes fingerprint:(nullable NSString *)fingerprint nonFatalExceptionLevel:(IBGNonFatalLevel) nonFatalExceptionLevel resolver:(RCTPromiseResolveBlock _Nullable )resolve
                  rejecter:(RCTPromiseRejectBlock _Nullable )reject;

@end
