

#import "InstabugAPMBridge.h"
#import <InstabugSDK/IBGAPM.h>
#import <InstabugSDK/IBGExecutionTrace.h>
#import <asl.h>
#import <React/RCTLog.h>
#import <os/log.h>
#import <InstabugSDK/IBGTypes.h>
#import <React/RCTUIManager.h>
#import "Util/IBGAPM+PrivateAPIs.h"

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

// Pauses the current thread for 3 seconds.
RCT_EXPORT_METHOD(ibgSleep) {
    [NSThread sleepForTimeInterval:3.0f];
}

// Enables or disables APM.
RCT_EXPORT_METHOD(setEnabled:(BOOL)isEnabled) {
    IBGAPM.enabled = isEnabled;
}

// Determines either coldAppLaunch is enabled or not.
RCT_EXPORT_METHOD(setAppLaunchEnabled:(BOOL)isEnabled) {
    IBGAPM.coldAppLaunchEnabled = isEnabled;
}

// This method is used to signal the end of the app launch process.
RCT_EXPORT_METHOD(endAppLaunch) {
    [IBGAPM endAppLaunch];
}

// Controls whether automatic tracing of UI interactions is enabled or disabled within the SDK.
RCT_EXPORT_METHOD(setAutoUITraceEnabled:(BOOL)isEnabled) {
    IBGAPM.autoUITraceEnabled = isEnabled;
}

// Starts a flow trace with the specified `name`,
// allowing the SDK to capture and analyze the flow of execution within the application.
RCT_EXPORT_METHOD(startFlow: (NSString *)name) {
    [IBGAPM startFlowWithName:name];
}

// Ends a flow with the specified `name`.
RCT_EXPORT_METHOD(endFlow: (NSString *)name) {
    [IBGAPM endFlowWithName:name];
}


// Sets a user defined attribute for the currently active flow.
RCT_EXPORT_METHOD(setFlowAttribute:(NSString *)name :(NSString *)key :(NSString *_Nullable)value) {
    [IBGAPM setAttributeForFlowWithName:name key:key value:value];
}

// Starts a new `UITrace` with the provided `name` parameter,
// allowing the SDK to capture and analyze the UI components within the application.
RCT_EXPORT_METHOD(startUITrace:(NSString *)name) {
    [IBGAPM startUITraceWithName:name];
}

// Terminates the currently active UI trace.
RCT_EXPORT_METHOD(endUITrace) {
    [IBGAPM endUITrace];
}

// Enables or disables screen render.
RCT_EXPORT_METHOD(setScreenRenderingEnabled:(BOOL)isEnabled) {
    IBGAPM.screenRenderingEnabled = isEnabled;
}




@synthesize description;

@synthesize hash;

@synthesize superclass;

@end

