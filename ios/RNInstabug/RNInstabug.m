#import <Instabug/Instabug.h>
#import <React/RCTLog.h>
#import "RNInstabug.h"
#import "Util/IBGNetworkLogger+CP.h"
#import "Util/Instabug+CP.h"

@implementation RNInstabug

static BOOL didInit = NO;

+ (void)initWithToken:(NSString *)token invocationEvents:(IBGInvocationEvent)invocationEvents  {
    // Initialization is performed only once to avoid unexpected behavior.
    if (didInit) {
        NSLog(@"IBG-RN: Skipped iOS SDK re-initialization");
        return;
    }

    didInit = YES;

    [Instabug setCurrentPlatform:IBGPlatformReactNative];

    // Disable automatic network logging in the iOS SDK to avoid duplicate network logs coming
    // from both the iOS and React Native SDKs
    [IBGNetworkLogger disableAutomaticCapturingOfNetworkLogs];

    [Instabug startWithToken:token invocationEvents:invocationEvents];

    // Setup automatic capturing of JavaScript console logs
    RCTAddLogFunction(InstabugReactLogFunction);
    RCTSetLogThreshold(RCTLogLevelInfo);

    // Even though automatic network logging is disabled in the iOS SDK, the network logger itself
    // is still needed since network logs captured by the React Native SDK need to be logged through it
    IBGNetworkLogger.enabled = YES;

    // Temporarily disabling APM hot launches
    IBGAPM.hotAppLaunchEnabled = NO;
}

+ (void)initWithToken:(NSString *)token
     invocationEvents:(IBGInvocationEvent)invocationEvents
       debugLogsLevel:(IBGSDKDebugLogsLevel)debugLogsLevel {
    [self initWithToken:token invocationEvents:invocationEvents];
    [Instabug setSdkDebugLogsLevel:debugLogsLevel];
}

// Note: This function is used to bridge IBGNSLog with RCTLogFunction.
// This log function should not be used externally and is only an implementation detail.
void RNIBGLog(IBGLogLevel logLevel, NSString *format,  ...) {
    va_list arg_list;
    va_start(arg_list, format);
    IBGNSLogWithLevel(format, arg_list, logLevel);
    va_end(arg_list);
}

RCTLogFunction InstabugReactLogFunction = ^(RCTLogLevel level,
                                            __unused RCTLogSource source,
                                            NSString *fileName,
                                            NSNumber *lineNumber,
                                            NSString *message)
{
    NSString *formatString = @"Instabug - REACT LOG: %@";
    NSString *log = RCTFormatLog([NSDate date], level, fileName, lineNumber, message);

    switch(level) {
        case RCTLogLevelTrace:
            RNIBGLog(IBGLogLevelVerbose, formatString, log);
            break;
        case RCTLogLevelInfo:
            RNIBGLog(IBGLogLevelInfo, formatString, log);
            break;
        case RCTLogLevelWarning:
            RNIBGLog(IBGLogLevelWarning, formatString, log);
            break;
        case RCTLogLevelError:
            RNIBGLog(IBGLogLevelError, formatString, log);
            break;
        case RCTLogLevelFatal:
            RNIBGLog(IBGLogLevelError, formatString, log);
            break;
    }
};

@end

