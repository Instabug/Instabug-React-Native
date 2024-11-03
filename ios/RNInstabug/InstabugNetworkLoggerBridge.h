#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>


@interface InstabugNtworkLoggerBridge : RCTEventEmitter <RCTBridgeModule>

/*
 +------------------------------------------------------------------------+
 |                            NetworkLogger Module                        |
 +------------------------------------------------------------------------+
 */

- (void)isNativeInterceptionEnabled:(RCTPromiseResolveBlock)resolve :(RCTPromiseRejectBlock)reject;
- (void)forceStartNetworkLoggingIOS;
- (void)forceStopNetworkLoggingIOS;
@end
