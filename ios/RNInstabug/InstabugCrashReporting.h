#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface InstabugCrashReporting : RCTEventEmitter <RCTBridgeModule>

- (void)setEnabled:(BOOL) isEnabled;
- (void)sendJSCrash:(NSDictionary *)stackTrace;
- (void)sendHandledJSCrash:(NSDictionary *)stackTrace;

@end
