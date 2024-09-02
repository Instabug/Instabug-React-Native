#import <Instabug/Instabug.h>
#import <React/RCTLog.h>
#import "RNInstabug.h"
#import "Util/IBGNetworkLogger+CP.h"
#import "Util/Instabug+CP.h"
#import "CPNetworkLoggingObserverDelegateImp.h"

@implementation RNInstabug

static BOOL didInit = NO;

/// Resets `didInit` allowing re-initialization, it should not be added to the header file and is there for testing purposes.
+ (void)reset {
    didInit = NO;
}

+ (void)initWithToken:(NSString *)token
     invocationEvents:(IBGInvocationEvent)invocationEvents
useNativeNetworkInterception:(BOOL)useNativeNetworkInterception {

    didInit = YES;

    [Instabug setCurrentPlatform:IBGPlatformReactNative];

    if (!useNativeNetworkInterception) {
        // Disable automatic network logging in the iOS SDK to avoid duplicate network logs coming
        // from both the iOS and React Native SDKs
        [IBGNetworkLogger disableAutomaticCapturingOfNetworkLogs];
    }

    [Instabug startWithToken:token invocationEvents:invocationEvents];

    // Setup automatic capturing of JavaScript console logs
    RCTAddLogFunction(InstabugReactLogFunction);
    RCTSetLogThreshold(RCTLogLevelInfo);

    // Even though automatic network logging is disabled in the iOS SDK, the network logger itself
    // is still needed since network logs captured by the React Native SDK need to be logged through it
    IBGNetworkLogger.enabled = YES;

    // Temporarily disabling APM hot launches
    IBGAPM.hotAppLaunchEnabled = NO;
    
//    [CPNetworkLoggingObserver sharedInstance].delegate = [[CPNetworkLoggingObserverDelegateImp alloc] init];
}

+ (void)initWithToken:(NSString *)token invocationEvents:(IBGInvocationEvent)invocationEvents {
    [self initWithToken:token invocationEvents:invocationEvents useNativeNetworkInterception:NO];
}

+ (void)initWithToken:(NSString *)token invocationEvents:(IBGInvocationEvent)invocationEvents debugLogsLevel:(IBGSDKDebugLogsLevel)debugLogsLevel useNativeNetworkInterception:(BOOL)useNativeNetworkInterception {
    [Instabug setSdkDebugLogsLevel:debugLogsLevel];
    [self initWithToken:token invocationEvents:invocationEvents useNativeNetworkInterception:useNativeNetworkInterception];
}

+ (void)initWithToken:(NSString *)token
     invocationEvents:(IBGInvocationEvent)invocationEvents
       debugLogsLevel:(IBGSDKDebugLogsLevel)debugLogsLevel {
    [Instabug setSdkDebugLogsLevel:debugLogsLevel];
    [self initWithToken:token invocationEvents:invocationEvents];
}

+ (void)setCodePushVersion:(NSString *)codePushVersion {
    [Instabug setCodePushVersion:codePushVersion];
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

