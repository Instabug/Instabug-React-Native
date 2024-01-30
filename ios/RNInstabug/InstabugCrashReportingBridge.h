#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <Instabug/Instabug.h>

@interface InstabugCrashReportingBridge : RCTEventEmitter <RCTBridgeModule>

- (void)setEnabled:(BOOL)isEnabled;

- (void)sendJSCrash:(NSDictionary *)stackTrace;

- (void)sendHandledJSCrash:(NSDictionary *)stackTrace;

+ (void)sendUnHandledNSExceptionCrash:(NSException *)stackTrace :(NSDictionary *)userAttributes :(NSString *)groupingString :(IBGNonFatalLevel * )level;
+ (void)sendUnHandledNSErrorCrash:(NSError *)stackTrace :(NSDictionary *)userAttributes :(NSString *)groupingString :(IBGNonFatalLevel * )level;

@end
