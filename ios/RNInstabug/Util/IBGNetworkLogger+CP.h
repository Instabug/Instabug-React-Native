#import <Instabug/Instabug.h>

NS_ASSUME_NONNULL_BEGIN

@interface IBGNetworkLogger (CP)

+ (void)disableAutomaticCapturingOfNetworkLogs;
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

@end

NS_ASSUME_NONNULL_END
