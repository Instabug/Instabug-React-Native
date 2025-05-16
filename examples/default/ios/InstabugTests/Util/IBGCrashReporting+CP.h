#import <InstabugSDK/InstabugSDK.h>


@interface IBGCrashReporting (CP)

+ (void)cp_reportFatalCrashWithStackTrace:(NSDictionary*)stackTrace;

+ (void)cp_reportNonFatalCrashWithStackTrace:(NSDictionary*)stackTrace
                                       level:(IBGNonFatalLevel)level
                              groupingString:(NSString *)groupingString
                              userAttributes:(NSDictionary<NSString *, NSString*> *)userAttributes;
@end

