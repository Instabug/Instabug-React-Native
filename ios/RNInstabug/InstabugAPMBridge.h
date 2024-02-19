
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <Instabug/IBGTypes.h>

@interface InstabugAPMBridge : RCTEventEmitter <RCTBridgeModule>
/*
 +------------------------------------------------------------------------+
 |                             APM Module                                 |
 +------------------------------------------------------------------------+
 */

- (void)setEnabled:(BOOL)isEnabled;
- (void)setAppLaunchEnabled:(BOOL)isEnabled;
- (void)endAppLaunch;
- (void)setAutoUITraceEnabled:(BOOL)isEnabled;
- (void)startExecutionTrace:(NSString *)name :(NSString *)id
                           :(RCTPromiseResolveBlock)resolve
                           :(RCTPromiseRejectBlock)reject DEPRECATED_MSG_ATTRIBUTE("Please use APM.startFlow instead.");
- (void)setExecutionTraceAttribute:(NSString *)id:(NSString *)key
                                  :(NSString *)value DEPRECATED_MSG_ATTRIBUTE("Please use APM.setTraceAttribute instead.");
- (void)endExecutionTrace:(NSString *)id  DEPRECATED_MSG_ATTRIBUTE("Please use APM.endFlow instead.");
- (void)startUITrace:(NSString *)name;
- (void)endUITrace;

extern NSMutableDictionary *traces;

@end
