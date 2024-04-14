#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface CrashReportingExampleModule : RCTEventEmitter <RCTBridgeModule>

- (void)sendNativeNonFatal;
- (void)sendNativeFatalCrash;
- (void)sendFatalHang;
- (void)sendOOM;

@end
