
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
- (void)setUIHangEnabled:(BOOL)isEnabled;
- (void)startTrace:(NSString *)name:(NSString *)id;
- (void)setTraceAttribute:(NSString *)id:(NSString *)key
                         :(NSString *)value;
- (void)endTrace:(NSString *)id;
- (void)startUITrace:(NSString *)name;
- (void)endUITrace;

extern NSMutableDictionary *traces;

@end
