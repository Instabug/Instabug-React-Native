#import <asl.h>
#import <React/RCTLog.h>
#import <os/log.h>
#import <Instabug/IBGTypes.h>
#import <React/RCTUIManager.h>
#import <Instabug/IBGSessionReplay.h>
#import "InstabugSessionReplayBridge.h"

@implementation InstabugSessionReplayBridge

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

- (NSArray<NSString *> *)supportedEvents {
    return @[];
}

RCT_EXPORT_MODULE(IBGSessionReplay)

RCT_EXPORT_METHOD(setEnabled: (BOOL) isEnabled) {
    IBGSessionReplay.enabled = isEnabled;
}

RCT_EXPORT_METHOD(setNetworkLogsEnabled: (BOOL) isEnabled) {
    IBGSessionReplay.networkLogsEnabled = isEnabled;
}

RCT_EXPORT_METHOD(setInstabugLogsEnabled: (BOOL) isEnabled) {
    IBGSessionReplay.IBGLogsEnabled = isEnabled;
}

RCT_EXPORT_METHOD(setUserStepsEnabled: (BOOL) isEnabled) {
    IBGSessionReplay.userStepsEnabled = isEnabled;
}

@synthesize description;

@synthesize hash;

@synthesize superclass;

@end


