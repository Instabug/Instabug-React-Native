#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <Instabug/IBGTypes.h>

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


@end


