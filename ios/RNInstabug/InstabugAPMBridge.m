

#import "InstabugAPMBridge.h"
#import <Instabug/IBGAPM.h>
#import <Instabug/IBGExecutionTrace.h>
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

RCT_EXPORT_METHOD(setAutoUITraceEnabled:(BOOL)isEnabled) {
    IBGAPM.autoUITraceEnabled = isEnabled;
}

RCT_EXPORT_METHOD(startExecutionTrace:(NSString *)name :(NSString *)id) {
    IBGExecutionTrace *trace = [IBGAPM startExecutionTraceWithName:name];
    [traces setObject: trace forKey: id];
}

RCT_EXPORT_METHOD(setExecutionTraceAttribute:(NSString *)id :(NSString *)key :(NSString *)value) {
    IBGExecutionTrace *trace = [traces objectForKey:id];
    [trace setAttributeWithKey:key value:value];
}

RCT_EXPORT_METHOD(endExecutionTrace:(NSString *)id) {
    IBGExecutionTrace *trace = [traces objectForKey:id];
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

