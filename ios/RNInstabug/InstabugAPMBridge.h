
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <InstabugSDK/IBGTypes.h>

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
- (void)startFlow:(NSString *)name;
- (void)endFlow:(NSString *)name;
- (void)setFlowAttribute:(NSString *)name :(NSString *)key :(NSString *_Nullable)value;
- (void)startUITrace:(NSString *)name;
- (void)endUITrace;

extern NSMutableDictionary *traces;

@end
