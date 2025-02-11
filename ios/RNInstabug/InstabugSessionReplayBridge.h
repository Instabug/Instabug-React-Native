#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <Instabug/IBGTypes.h>
#import <Instabug/IBGSessionReplay.h>

@interface InstabugSessionReplayBridge : RCTEventEmitter <RCTBridgeModule>
/*
 +------------------------------------------------------------------------+
 |                            Session Replay Module                       |
 +------------------------------------------------------------------------+
 */

- (void)setEnabled:(BOOL)isEnabled;

- (void)setInstabugLogsEnabled:(BOOL)isEnabled;

- (void)setNetworkLogsEnabled:(BOOL)isEnabled;

- (void)setUserStepsEnabled:(BOOL)isEnabled;

- (void)getSessionReplayLink:(RCTPromiseResolveBlock)resolve :(RCTPromiseRejectBlock)reject;

- (void)setSyncCallback;

- (void)evaluateSync:(BOOL)result;

@property (atomic, copy) SessionEvaluationCompletion sessionEvaluationCompletion;

@end


