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
    return @[
        @"IBGSessionReplayOnSyncCallback",
    ];
}

RCT_EXPORT_MODULE(IBGSessionReplay)

RCT_EXPORT_METHOD(setEnabled:(BOOL)isEnabled) {
    IBGSessionReplay.enabled = isEnabled;
}

RCT_EXPORT_METHOD(setNetworkLogsEnabled:(BOOL)isEnabled) {
    IBGSessionReplay.networkLogsEnabled = isEnabled;
}

RCT_EXPORT_METHOD(setInstabugLogsEnabled:(BOOL)isEnabled) {
    IBGSessionReplay.IBGLogsEnabled = isEnabled;
}

RCT_EXPORT_METHOD(setUserStepsEnabled:(BOOL)isEnabled) {
    IBGSessionReplay.userStepsEnabled = isEnabled;
}

RCT_EXPORT_METHOD(getSessionReplayLink:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock)reject) {
    NSString *link = IBGSessionReplay.sessionReplayLink;
    resolve(link);
}

RCT_EXPORT_METHOD(setSyncCallback)
{
    [IBGSessionReplay setSyncCallbackWithHandler:^(IBGSessionMetadata * _Nonnull metadataObject, SessionEvaluationCompletion  _Nonnull completion) {
        [self sendEventWithName:@"IBGSessionReplayOnSyncCallback"
                           body:@{ @"appVersion":metadataObject.appVersion,
                                   @"OS": metadataObject.os,
                                   @"device": metadataObject.device,
                                   @"sessionDurationInSeconds":@(metadataObject.sessionDuration),
                                   @"hasLinkToAppReview":@(metadataObject.hasLinkToAppReview),
                                   @"launchType":@(metadataObject.launchType),
                                   @"launchDuration":@(metadataObject.launchDuration),
                                   @"bugsCount":@(metadataObject.bugsCount),
                                   @"fatalCrashCount":@(metadataObject.fatalCrashCount),
                                   @"oomCrashCount":@(metadataObject.oomCrashCount),
                                   @"networkLogs":metadataObject.networkLogs
                                
                                }];
        
        self.sessionEvaluationCompletion = completion;}];
}

RCT_EXPORT_METHOD(evaluateSync:(BOOL)result)
{
    if (self.sessionEvaluationCompletion) {
        self.sessionEvaluationCompletion(result);
    }
}


@synthesize description;

@synthesize hash;

@synthesize superclass;

@end


