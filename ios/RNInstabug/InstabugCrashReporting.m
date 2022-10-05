#import "InstabugCrashReporting.h"
#import <Instabug/IBGCrashReporting.h>
#import <Instabug/Instabug.h>

@implementation InstabugCrashReporting

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

RCT_EXPORT_METHOD(sendJSCrash:(NSDictionary *)stackTrace) {
    dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_HIGH, 0ul);
    dispatch_async(queue, ^{
        SEL reportCrashWithStackTraceSEL = NSSelectorFromString(@"reportCrashWithStackTrace:handled:");
        if ([[Instabug class] respondsToSelector:reportCrashWithStackTraceSEL]) {
            [[Instabug class] performSelector:reportCrashWithStackTraceSEL withObject:stackTrace withObject:@(NO)];
        }
    });
}

RCT_EXPORT_METHOD(sendHandledJSCrash:(NSDictionary *)stackTrace) {
    dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_HIGH, 0ul);
    dispatch_async(queue, ^{
        SEL reportCrashWithStackTraceSEL = NSSelectorFromString(@"reportCrashWithStackTrace:handled:");
        if ([[Instabug class] respondsToSelector:reportCrashWithStackTraceSEL]) {
            [[Instabug class] performSelector:reportCrashWithStackTraceSEL withObject:stackTrace withObject:@(YES)];
        }
    });
}


@synthesize description;

@synthesize hash;

@synthesize superclass;

@end


