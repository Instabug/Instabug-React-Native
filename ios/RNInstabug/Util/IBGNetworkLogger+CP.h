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
          serverErrorMessage:(NSString * _Nullable)serverErrorMessage;

@end

NS_ASSUME_NONNULL_END
