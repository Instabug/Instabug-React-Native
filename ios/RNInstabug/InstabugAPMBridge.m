

#import "InstabugAPMBridge.h"
#import <Instabug/IBGAPM.h>
#import <Instabug/IBGExecutionTrace.h>
#import <asl.h>
#import <React/RCTLog.h>
#import <os/log.h>
#import <Instabug/IBGTypes.h>
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

// This method is exporting a method
// named `ibgSleep` to be accessible from JavaScript side. When this method is
// called from JavaScript, it (sleeps) the current thread for 3 seconds.
RCT_EXPORT_METHOD(ibgSleep) {
    [NSThread sleepForTimeInterval:3.0f];
}

// Enables or disables APM.
//
// This function is exporting a method named
// `setEnabled` to be accessible from JavaScript side. When this method is
// called from JavaScript, it will set the `enabled` property of the `IBGAPM` class provided by the
// Instabug SDK to the value passed as the `isEnabled` parameter. This property controls whether the
// APM (Application Performance Monitoring) feature of Instabug is enabled or disabled based on the
// boolean value passed to it.
RCT_EXPORT_METHOD(setEnabled:(BOOL)isEnabled) {
    IBGAPM.enabled = isEnabled;
}

// This function is exporting a method named
// `setAppLaunchEnabled` to be accessible from JavaScript side. When this
// method is called from JavaScript, it will set the `coldAppLaunchEnabled` property of the `IBGAPM`
// class provided by the Instabug SDK to the value passed as the `isEnabled` parameter.
RCT_EXPORT_METHOD(setAppLaunchEnabled:(BOOL)isEnabled) {
    IBGAPM.coldAppLaunchEnabled = isEnabled;
}

// This function is exporting a method named `endAppLaunch` to be
// accessible from JavaScript side. When this method is called from
// JavaScript, it will invoke the `endAppLaunch` method from the `IBGAPM` class provided by the
// Instabug SDK. This method is used to signal the end of the app launch process.
RCT_EXPORT_METHOD(endAppLaunch) {
    [IBGAPM endAppLaunch];
}

// This function is exporting a method named
// `setAutoUITraceEnabled` to be accessible from JavaScript side. When this
// method is called from JavaScript, it will set the `autoUITraceEnabled` property of the `IBGAPM`
// class provided by the Instabug SDK to the value passed as the `isEnabled` parameter. This property
// controls whether automatic tracing of UI interactions is enabled or disabled within the SDK. By
// toggling this property, you can control whether the SDK captures data related to user interface
// performance and behavior automatically.
RCT_EXPORT_METHOD(setAutoUITraceEnabled:(BOOL)isEnabled) {
    IBGAPM.autoUITraceEnabled = isEnabled;
}

// This method `startExecutionTrace` is exporting a function to be accessible from JavaScript in a
// React Native application.
// Deprecated see [startFlow: (NSString *)name]
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

// This method is exporting a function to be accessible from JavaScript side.
// Deprecated see [setFlowAttribute:(NSString *)name :(NSString *)key :(NSString *_Nullable)value]
RCT_EXPORT_METHOD(setExecutionTraceAttribute:(NSString *)id :(NSString *)key :(NSString *)value) {
    IBGExecutionTrace *trace = [traces objectForKey:id];
    if (trace != nil) {
        [trace setAttributeWithKey:key value:value];
    }
}

// This function is exporting a method named
// `endExecutionTrace` to be accessible from JavaScript side.
// Deprecated see [endFlow: (NSString *)name]
RCT_EXPORT_METHOD(endExecutionTrace:(NSString *)id) {
    IBGExecutionTrace *trace = [traces objectForKey:id];
    if (trace != nil) {
        [trace end];
    }
}

// This function is exporting a method named
// `startFlow` to be accessible from JavaScript side. When this method is
// called from JavaScript, it will invoke the `startFlowWithName:` method from the `IBGAPM` class
// provided by the Instabug SDK. This method is used to start a flow trace with the specified name,
// allowing the SDK to capture and analyze the flow of execution within the application.
RCT_EXPORT_METHOD(startFlow: (NSString *)name) {
    [IBGAPM startFlowWithName:name];
}

// This function is exporting a method named `endFlow` to
// be accessible from JavaScript side. When this method is called from
// JavaScript, it will invoke the `endFlowWithName:` method from the `IBGAPM` class provided by the
// Instabug SDK. This method is used to end a flow trace with the specified name, allowing the SDK to
// capture and analyze the flow of execution within the application.
RCT_EXPORT_METHOD(endFlow: (NSString *)name) {
    [IBGAPM endFlowWithName:name];
}


// The function is exporting a method named `setFlowAttribute` to be accessible from
// JavaScript side. When this method is
// called from JavaScript, it will invoke the `setAttributeForFlowWithName:` method from the `IBGAPM` class
// provided by the Instabug SDK to set a user defined attribute for the currently active flow.
RCT_EXPORT_METHOD(setFlowAttribute:(NSString *)name :(NSString *)key :(NSString *_Nullable)value) {
    [IBGAPM setAttributeForFlowWithName:name key:key value:value];
}

// This function is exporting a method named
// `startUITrace` to be accessible from JavaScript side. When this method is
// called from JavaScript, it will invoke the `startUITraceWithName:` method from the `IBGAPM` class
// provided by the Instabug SDK to start a new UI trace.
RCT_EXPORT_METHOD(startUITrace:(NSString *)name) {
    [IBGAPM startUITraceWithName:name];
}

// This function is exporting a method named `endUITrace` to be
// accessible from JavaScript side. When this method is called from
// JavaScript, it will invoke the `endUITrace` method from the `IBGAPM` class provided by the Instabug
// SDK. This method is used to terminate the currently active UI trace.
RCT_EXPORT_METHOD(endUITrace) {
    [IBGAPM endUITrace];
}





@synthesize description;

@synthesize hash;

@synthesize superclass;

@end

