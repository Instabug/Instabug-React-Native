#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>


@interface InstabugNtworkLoggerBridge : RCTEventEmitter <RCTBridgeModule>
//@property NSMutableDictionary<NSString *, IBGURLRequestAsyncObfuscationCompletedHandler> *dictionary;
/*
 +------------------------------------------------------------------------+
 |                            NetworkLogger Module                        |
 +------------------------------------------------------------------------+
 */

- (void)isNativeInterceptionEnabled:(RCTPromiseResolveBlock)resolve :(RCTPromiseRejectBlock)reject;

- (void) registerNetworkLogsListener;

- (void) updateNetworkLogSnapshot: (NSString * _Nonnull)jsonString;

- (void) setNetworkLoggingRequestFilterPredicateIOS:(BOOL)value;
@end
