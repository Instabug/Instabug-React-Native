

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

RCT_EXPORT_METHOD(ibgSleep) {
    [NSThread sleepForTimeInterval:3.0f];
    // for (int i = 1; i <= 1000000; i++)
    // {
    //     double value = sqrt(i);

    //     printf("%@", [NSNumber numberWithDouble:value]);
    // }
    // [NSThread sleepForTimeInterval:3.0f];
}

RCT_EXPORT_METHOD(setEnabled:(BOOL)isEnabled) {
    IBGAPM.enabled = isEnabled;
}

RCT_EXPORT_METHOD(setAppLaunchEnabled:(BOOL)isEnabled) {
    IBGAPM.coldAppLaunchEnabled = isEnabled;
}

RCT_EXPORT_METHOD(endAppLaunch) {
    [IBGAPM endAppLaunch];
}

RCT_EXPORT_METHOD(setAutoUITraceEnabled:(BOOL)isEnabled) {
    IBGAPM.autoUITraceEnabled = isEnabled;
}

RCT_EXPORT_METHOD(startExecutionTrace:(NSString *)name :(NSString *)id
                                     :(RCTPromiseResolveBlock)resolve
                                     :(RCTPromiseRejectBlock)reject) {
    IBGExecutionTrace *trace = [IBGAPM startExecutionTraceWithName:name];
    if (trace != nil) {
        [traces setObject: trace forKey: id];
        resolve(id);
    } else {
        resolve([NSNull null]);
    }
}

RCT_EXPORT_METHOD(setExecutionTraceAttribute:(NSString *)id :(NSString *)key :(NSString *)value) {
    IBGExecutionTrace *trace = [traces objectForKey:id];
    if (trace != nil) {
        [trace setAttributeWithKey:key value:value];
    }
}

RCT_EXPORT_METHOD(endExecutionTrace:(NSString *)id) {
    IBGExecutionTrace *trace = [traces objectForKey:id];
    if (trace != nil) {
        [trace end];
    }
}

RCT_EXPORT_METHOD(startFlow: (NSString *)name) {
    [IBGAPM startFlowWithName:name];
}

RCT_EXPORT_METHOD(endFlow: (NSString *)name) {
    [IBGAPM endFlowWithName:name];
}


RCT_EXPORT_METHOD(setFlowAttribute:(NSString *)name :(NSString *)key :(NSString *_Nullable)value) {
    [IBGAPM setAttributeForFlowWithName:name key:key value:value];
}

RCT_EXPORT_METHOD(startUITrace:(NSString *)name) {
    [IBGAPM startUITraceWithName:name];
}

RCT_EXPORT_METHOD(endUITrace) {
    [IBGAPM endUITrace];
}

// Get first-time value of [cp_native_interception_enabled] flag
RCT_EXPORT_METHOD(isNativeInterceptionEnabled:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        // Assuming you want to return YES for now, wrapped in NSNumber
        resolve(@(YES));
    } @catch (NSError *error) {
        reject(@"error_code", @"An error occurred", error);
    }
}

@synthesize description;

@synthesize hash;

@synthesize superclass;

@end

