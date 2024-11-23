#import "InstabugCrashReportingBridge.h"
#import "Util/IBGCrashReporting+CP.h"


@implementation InstabugCrashReportingBridge

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

- (NSArray<NSString *> *)supportedEvents {
    return @[
        @"IBGSendHandledJSCrash",
        @"IBGSendUnhandledJSCrash",
    ];
}

RCT_EXPORT_MODULE(IBGCrashReporting)

RCT_EXPORT_METHOD(setEnabled: (BOOL) isEnabled) {
    IBGCrashReporting.enabled = isEnabled;
}

RCT_EXPORT_METHOD(sendJSCrash:(NSDictionary *)stackTrace
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0ul);
    dispatch_async(queue, ^{
        [IBGCrashReporting cp_reportFatalCrashWithStackTrace:stackTrace];
        resolve([NSNull null]);
    });
}

RCT_EXPORT_METHOD(sendHandledJSCrash:(NSDictionary *)stackTrace
                  userAttributes:(nullable NSDictionary *)userAttributes fingerprint:(nullable NSString *)fingerprint nonFatalExceptionLevel:(IBGNonFatalLevel)nonFatalExceptionLevel
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_HIGH, 0ul);
    dispatch_async(queue, ^{
        [IBGCrashReporting cp_reportNonFatalCrashWithStackTrace:stackTrace level:nonFatalExceptionLevel groupingString:fingerprint userAttributes:userAttributes];

        resolve([NSNull null]);
    });

}
@synthesize description;

@synthesize hash;

@synthesize superclass;

@end


