
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

- (void)setLogLevel:(IBGLogLevel)_logLevel;
- (void)setEnabled:(BOOL)isEnabled;
- (void)setAppLaunchEnabled:(BOOL)isEnabled;
- (void)setAutoUITraceEnabled:(BOOL)isEnabled;
- (void)startExecutionTrace:(NSString *)name:(NSString *)id
                           :(RCTResponseSenderBlock)callBack;
- (void)setExecutionTraceAttribute:(NSString *)id:(NSString *)key
                                  :(NSString *)value;
- (void)endExecutionTrace:(NSString *)id;
- (void)startUITrace:(NSString *)name;
- (void)endUITrace;

extern NSMutableDictionary *traces;

@end
