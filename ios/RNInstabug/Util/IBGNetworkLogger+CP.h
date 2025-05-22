#import <InstabugSDK/InstabugSDK.h>

NS_ASSUME_NONNULL_BEGIN

@interface IBGNetworkLogger (CP)

@property (class, atomic, assign) BOOL w3ExternalTraceIDEnabled;
@property (class, atomic, assign) BOOL w3ExternalGeneratedHeaderEnabled;
@property (class, atomic, assign) BOOL w3CaughtHeaderEnabled;

@property (class, atomic, assign) BOOL isNativeNetworkInterceptionFeatureEnabled;

+ (void)disableAutomaticCapturingOfNetworkLogs;
+ (void)addNetworkLogWithUrl:(NSString *_Nonnull)url
                      method:(NSString *_Nonnull)method
                 requestBody:(NSString *_Nonnull)request
             requestBodySize:(int64_t)requestBodySize
                responseBody:(NSString *_Nonnull)response
            responseBodySize:(int64_t)responseBodySize
                responseCode:(int32_t)code
              requestHeaders:(NSDictionary *_Nonnull)requestHeaders
             responseHeaders:(NSDictionary *_Nonnull)responseHeaders
                 contentType:(NSString *_Nonnull)contentType
                 errorDomain:(NSString *_Nullable)errorDomain
                   errorCode:(int32_t)errorCode
                   startTime:(int64_t)startTime
                    duration:(int64_t) duration
                gqlQueryName:(NSString * _Nullable)gqlQueryName
          serverErrorMessage:(NSString * _Nullable)serverErrorMessage
               isW3cCaughted:(NSNumber * _Nullable)isW3cCaughted
                   partialID:(NSNumber * _Nullable)partialID
                   timestamp:(NSNumber * _Nullable)timestamp
     generatedW3CTraceparent:(NSString * _Nullable)generatedW3CTraceparent
      caughtedW3CTraceparent:(NSString * _Nullable)caughtedW3CTraceparent;

+ (void)addNetworkLogWithUrl:(NSString *)url
                      method:(NSString *)method
                 requestBody:(NSString *)request
             requestBodySize:(int64_t)requestBodySize
                responseBody:(NSString *)response
            responseBodySize:(int64_t)responseBodySize
                responseCode:(int32_t)code
              requestHeaders:(NSDictionary *)requestHeaders
             responseHeaders:(NSDictionary *)responseHeaders
                 contentType:(NSString *)contentType
                 errorDomain:(NSString *)errorDomain
                   errorCode:(int32_t)errorCode
                   startTime:(int64_t)startTime
                    duration:(int64_t) duration
                gqlQueryName:(NSString * _Nullable)gqlQueryName
          serverErrorMessage:(NSString * _Nullable)serverErrorMessage
               isW3cCaughted:(NSNumber * _Nullable)isW3cCaughted
                   partialID:(NSNumber * _Nullable)partialID
                   timestamp:(NSNumber * _Nullable)timestamp
     generatedW3CTraceparent:(NSString * _Nullable)generatedW3CTraceparent
      caughtedW3CTraceparent:(NSString * _Nullable)caughtedW3CTraceparent;

+ (void)forceStartNetworkLogging;
+ (void)forceStopNetworkLogging;

+ (void)setCPRequestAsyncObfuscationHandler:(void (^)(NSURLRequest * requestToBeObfuscated, void (^ completion)(NSURLRequest * obfuscatedRequest)))asyncObfuscationHandler;
+ (void)setCPRequestFilteringHandler:(void (^)(NSURLRequest * request, void (^completion)(BOOL keep)))requestFilteringHandler;
+ (void)setCPResponseFilteringHandler:(void (^)(NSURLResponse * response, void (^comppletion)(BOOL keep)))responseFilteringHandler;

@end

NS_ASSUME_NONNULL_END
