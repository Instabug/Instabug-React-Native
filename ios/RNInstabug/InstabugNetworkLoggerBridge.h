#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <Instabug/IBGTypes.h>

typedef void (^ IBGURLRequestAsyncObfuscationCompletedHandler)(NSURLRequest * _Nonnull request);
typedef void (^IBGURLRequestResponseAsyncFilteringCompletedHandler)(BOOL keep);
@interface InstabugNtworkLoggerBridge : RCTEventEmitter <RCTBridgeModule>

@property NSMutableDictionary<NSString *, IBGURLRequestAsyncObfuscationCompletedHandler> * _Nonnull requestObfuscationCompletionDictionary;
@property NSMutableDictionary<NSString *, NetworkObfuscationCompletionBlock> * _Nonnull responseObfuscationCompletionDictionary;
@property NSMutableDictionary<NSString *, IBGURLRequestResponseAsyncFilteringCompletedHandler> * _Nonnull requestFilteringCompletionDictionary;
@property NSMutableDictionary<NSString *, IBGURLRequestResponseAsyncFilteringCompletedHandler> * _Nonnull responseFilteringCompletionDictionary;

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
