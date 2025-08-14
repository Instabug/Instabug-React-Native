#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <InstabugSDK/IBGTypes.h>

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

- (BOOL)isNativeInterceptionEnabled;

- (void) registerNetworkLogsListener:(NetworkListenerType)listenerType;

- (void)updateNetworkLogSnapshot:(NSString * _Nonnull)url
                        callbackID:(NSString * _Nonnull)callbackID
                        requestBody:(NSString * _Nullable)requestBody
                        responseBody:(NSString * _Nullable)responseBody
                        responseCode:(double)responseCode
                        requestHeaders:(NSDictionary * _Nullable)requestHeaders
                        responseHeaders:(NSDictionary * _Nullable)responseHeaders;

- (void) setNetworkLoggingRequestFilterPredicateIOS:(NSString * _Nonnull) callbackID : (BOOL)value;

- (void)forceStartNetworkLoggingIOS;

- (void)forceStopNetworkLoggingIOS;
@end
