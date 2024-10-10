#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <Instabug/IBGTypes.h>

typedef void (^ IBGURLRequestAsyncObfuscationCompletedHandler)(NSURLRequest * _Nonnull request);
typedef void (^IBGURLRequestResponseAsyncFilteringCompletedHandler)(BOOL keep);

typedef NS_ENUM(NSInteger, NetworkListenerType) {
    NetworkListenerTypeFiltering,
    NetworkListenerTypeObfuscation,
    NetworkListenerTypeBoth
};

@interface InstabugNetworkLoggerBridge : RCTEventEmitter <RCTBridgeModule>

@property NSMutableDictionary<NSString *, IBGURLRequestAsyncObfuscationCompletedHandler> * _Nonnull requestObfuscationCompletionDictionary;
@property NSMutableDictionary<NSString *, NetworkObfuscationCompletionBlock> * _Nonnull responseObfuscationCompletionDictionary;
@property NSMutableDictionary<NSString *, IBGURLRequestResponseAsyncFilteringCompletedHandler> * _Nonnull requestFilteringCompletionDictionary;
@property NSMutableDictionary<NSString *, IBGURLRequestResponseAsyncFilteringCompletedHandler> * _Nonnull responseFilteringCompletionDictionary;

/*
 +------------------------------------------------------------------------+
 |                            NetworkLogger Module                        |
 +------------------------------------------------------------------------+
 */

- (void)isNativeInterceptionEnabled:(RCTPromiseResolveBlock _Nullable )resolve :(RCTPromiseRejectBlock _Nullable )reject;

- (void) registerNetworkLogsListener:(NetworkListenerType)listenerType;

//- (void) registerNetworkLogsListener;

- (void) updateNetworkLogSnapshot: (NSString * _Nonnull)jsonString;

- (void) setNetworkLoggingRequestFilterPredicateIOS:(NSString * _Nonnull) callbackID : (BOOL)value;
@end
