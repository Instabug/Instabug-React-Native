

#import "InstabugAPMBridge.h"
#import <Instabug/IBGAPM.h>
#import <Instabug/IBGTrace.h>
#import <asl.h>
#import <React/RCTLog.h>
#import <os/log.h>
#import <Instabug/IBGTypes.h>
#import <React/RCTUIManager.h>

@implementation InstabugAPMBridge

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

RCT_EXPORT_MODULE(IBGAPM)

NSMutableDictionary *traces;

- (id) init
{
    self = [super init];
    traces = [[NSMutableDictionary alloc] init];
    return self;
}

RCT_EXPORT_METHOD(setEnabled:(BOOL)isEnabled) {
    IBGAPM.enabled = isEnabled;
}

RCT_EXPORT_METHOD(setAppLaunchEnabled:(BOOL)isEnabled) {
    IBGAPM.appLaunchEnabled = isEnabled;
}

RCT_EXPORT_METHOD(setUIHangEnabled:(BOOL)isEnabled) {
    IBGAPM.UIHangEnabled = isEnabled;
}

RCT_EXPORT_METHOD(startTrace:(NSString *)name :(NSString *)id) {
    IBGTrace *trace = [IBGAPM startTraceWithName:name];
    [traces setObject: trace forKey: id];
}

RCT_EXPORT_METHOD(setTraceAttribute:(NSString *)id :(NSString *)key :(NSString *)value) {
    IBGTrace *trace = [traces objectForKey:id];
    [trace setAttributeWithKey:key value:value];
}

RCT_EXPORT_METHOD(endTrace:(NSString *)id) {
    IBGTrace *trace = [traces objectForKey:id];
    [trace end];
}

RCT_EXPORT_METHOD(startUITrace:(NSString *)name) {
    [IBGAPM startUITraceWithName:name];
}

RCT_EXPORT_METHOD(endUITrace) {
    [IBGAPM endUITrace];
}


@synthesize description;

@synthesize hash;

@synthesize superclass;

@end

