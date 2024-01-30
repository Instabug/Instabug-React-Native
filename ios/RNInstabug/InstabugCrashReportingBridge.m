#import "InstabugCrashReportingBridge.h"
#import <Instabug/IBGCrashReporting.h>
#import <Instabug/Instabug.h>

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
    dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_HIGH, 0ul);
    dispatch_async(queue, ^{
        SEL reportCrashWithStackTraceSEL = NSSelectorFromString(@"reportCrashWithStackTrace:handled:");
        if ([[Instabug class] respondsToSelector:reportCrashWithStackTraceSEL]) {
            [[Instabug class] performSelector:reportCrashWithStackTraceSEL withObject:stackTrace withObject:@(NO)];
        }
        resolve([NSNull null]);
    });
}

RCT_EXPORT_METHOD(sendHandledJSCrash:(NSDictionary *)stackTrace
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_HIGH, 0ul);
    dispatch_async(queue, ^{
        SEL reportCrashWithStackTraceSEL = NSSelectorFromString(@"reportCrashWithStackTrace:handled:");
        if ([[Instabug class] respondsToSelector:reportCrashWithStackTraceSEL]) {
            [[Instabug class] performSelector:reportCrashWithStackTraceSEL withObject:stackTrace withObject:@(YES)];
        }
        resolve([NSNull null]);
    });
}

+ (void)sendUnHandledNSExceptionCrash:(NSException *)stackTrace :(NSDictionary *)userAttributes :(NSString *)groupingString :(IBGNonFatalLevel *)level {
    IBGNonFatalException *nonFatalException = [IBGCrashReporting exception:stackTrace];
    if (userAttributes != nil)
        nonFatalException.userAttributes = userAttributes;
    if (groupingString != nil)
        nonFatalException.groupingString = groupingString;
    if (level != nil)
        nonFatalException.level = *(level);

    [nonFatalException report];
}




+ (void)sendUnHandledNSErrorCrash:(NSError *)stackTrace :(NSDictionary *)userAttributes :(NSString *)groupingString :(IBGNonFatalLevel * )level {
    IBGNonFatalError *nonFatalException = [IBGCrashReporting error:stackTrace];
    if (userAttributes != nil)
        nonFatalException.userAttributes = userAttributes;
    if (groupingString != nil)
        nonFatalException.groupingString = groupingString;
    if (level != nil)
        nonFatalException.level = *(level);
    nonFatalException.stackTraceMode = IBGNonFatalStackTraceModeFull;
    [nonFatalException report];
}


@synthesize description;

@synthesize hash;

@synthesize superclass;




@end


