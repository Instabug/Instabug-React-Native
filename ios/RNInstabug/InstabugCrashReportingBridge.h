#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <Instabug/Instabug.h>

@interface InstabugCrashReportingBridge : RCTEventEmitter <RCTBridgeModule>

- (void)setEnabled:(BOOL)isEnabled;

- (void)sendJSCrash:(NSDictionary *)stackTrace;

- (void)sendHandledJSCrash:(NSDictionary *)stackTrace;

- (void)sendUnHandledCrash:(NSException *)stackTrace :(NSDictionary *)userAttributes :(NSString *)fingerprint :(IBGNonFatalLevel)level;

@end
