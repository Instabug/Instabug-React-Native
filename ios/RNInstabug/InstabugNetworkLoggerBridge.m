//
//  InstabugNetworkLoggerBridge.m
//  RNInstabug
//
//  Created by Andrew Amin on 01/10/2024.
//
#import "InstabugNetworkLoggerBridge.h"
#import "Util/IBGNetworkLogger+CP.h"

#import <React/RCTLog.h>
#import <React/RCTConvert.h>

// Extend RCTConvert to handle NetworkListenerType enum conversion
@implementation RCTConvert (NetworkListenerType)

// The RCT_ENUM_CONVERTER macro handles the conversion between JS values (Int) and Objective-C enum values
RCT_ENUM_CONVERTER(NetworkListenerType, (@{
    @"filtering": @(NetworkListenerTypeFiltering),
    @"obfuscation": @(NetworkListenerTypeObfuscation),
    @"both": @(NetworkListenerTypeBoth)
}), NetworkListenerTypeFiltering, integerValue)

@end

@implementation InstabugNetworkLoggerBridge


- (instancetype)init {
    self = [super init];
    if (self) {
        _requestObfuscationCompletionDictionary = [[NSMutableDictionary alloc] init];
        _responseObfuscationCompletionDictionary = [[NSMutableDictionary alloc] init];
        _requestFilteringCompletionDictionary = [[NSMutableDictionary alloc] init];
        _responseFilteringCompletionDictionary = [[NSMutableDictionary alloc] init];
    }
    return self;
}

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

- (NSArray<NSString *> *)supportedEvents {
    return @[
        @"IBGpreInvocationHandler",
        @"IBGNetworkLoggerHandler"
    ];
}
RCT_EXPORT_MODULE(IBGNetworkLogger)

bool ibg_hasListeners = NO;



// Will be called when this module's first listener is added.
-(void)startObserving {
    ibg_hasListeners = YES;
    // Set up any upstream listeners or background tasks as necessary
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
    ibg_hasListeners = NO;
    // Remove upstream listeners, stop unnecessary background tasks
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isNativeInterceptionEnabled) {
    return @(IBGNetworkLogger.isNativeNetworkInterceptionFeatureEnabled);
}



RCT_EXPORT_METHOD(registerNetworkLogsListener: (NetworkListenerType) listenerType) {
    switch (listenerType) {
         case NetworkListenerTypeFiltering:
             [self setupRequestFilteringHandler];
             break;

         case NetworkListenerTypeObfuscation:
             [self setupRequestObfuscationHandler];
             break;

         case NetworkListenerTypeBoth:
            // The obfuscation handler sends additional data to the JavaScript side. If filtering is applied, the request will be ignored; otherwise, it will be obfuscated and saved in the database.
            [self setupRequestObfuscationHandler];
             break;

         default:
             NSLog(@"Unknown NetworkListenerType");
             break;
     }
}


RCT_EXPORT_METHOD(updateNetworkLogSnapshot:(NSString * _Nonnull)url
                  callbackID:(NSString * _Nonnull)callbackID
                  requestBody:(NSString * _Nullable)requestBody
                  responseBody:(NSString * _Nullable)responseBody
                  responseCode:(double)responseCode
                  requestHeaders:(NSDictionary * _Nullable)requestHeaders
                  responseHeaders:(NSDictionary * _Nullable)responseHeaders)
{
    // Validate and construct the URL
    NSURL *requestURL = [NSURL URLWithString:url];
    if (!requestURL) {
        NSLog(@"Invalid URL: %@", url);
        return;
    }

    // Initialize the NSMutableURLRequest
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:requestURL];

    // Set the HTTP body if provided
    if (requestBody && [requestBody isKindOfClass:[NSString class]]) {
        request.HTTPBody = [requestBody dataUsingEncoding:NSUTF8StringEncoding];
    }

    // Ensure requestHeaders is a valid dictionary before setting it
    if (requestHeaders && [requestHeaders isKindOfClass:[NSDictionary class]]) {
        request.allHTTPHeaderFields = requestHeaders;
    } else {
        NSLog(@"Invalid requestHeaders format, expected NSDictionary.");
    }

    // Ensure callbackID is valid and the completion handler exists
    IBGURLRequestAsyncObfuscationCompletedHandler completionHandler = self.requestObfuscationCompletionDictionary[callbackID];
    if (callbackID && [callbackID isKindOfClass:[NSString class]] && completionHandler) {
        // Call the completion handler with the constructed request
        completionHandler(request);
    } else {
        NSLog(@"CallbackID not found or completion handler is unavailable for CallbackID: %@", callbackID);
    }
}

RCT_EXPORT_METHOD(setNetworkLoggingRequestFilterPredicateIOS: (NSString * _Nonnull) callbackID : (BOOL)value ){

    if (self.requestFilteringCompletionDictionary[callbackID] != nil) {
        // ⬇️ YES == Request will be saved, NO == will be ignored
        ((IBGURLRequestResponseAsyncFilteringCompletedHandler)self.requestFilteringCompletionDictionary[callbackID])(value);
    } else {
        NSLog(@"Not Available Completion");
    }
}


#pragma mark - Helper Methods

// Set up the filtering handler
- (void)setupRequestFilteringHandler {
    [IBGNetworkLogger setCPRequestFilteringHandler:^(NSURLRequest * _Nonnull request, void (^ _Nonnull completion)(BOOL)) {
        NSString *callbackID = [[[NSUUID alloc] init] UUIDString];
        self.requestFilteringCompletionDictionary[callbackID] = completion;

        NSDictionary *dict = [self createNetworkRequestDictForRequest:request callbackID:callbackID];
        if(ibg_hasListeners){
            [self sendEventWithName:@"IBGNetworkLoggerHandler" body:dict];
        }

    }];
}

// Set up the obfuscation handler
- (void)setupRequestObfuscationHandler {
    [IBGNetworkLogger setCPRequestAsyncObfuscationHandler:^(NSURLRequest * _Nonnull request, void (^ _Nonnull completion)(NSURLRequest * _Nonnull)) {
        NSString *callbackID = [[[NSUUID alloc] init] UUIDString];
        self.requestObfuscationCompletionDictionary[callbackID] = completion;


        NSDictionary *dict = [self createNetworkRequestDictForRequest:request callbackID:callbackID];
        if (ibg_hasListeners) {
            [self sendEventWithName:@"IBGNetworkLoggerHandler" body:dict];
        }

    }];
}

// Helper to create a dictionary from the request and callbackID
- (NSDictionary *)createNetworkRequestDictForRequest:(NSURLRequest *)request callbackID:(NSString *)callbackID  {
    NSString *urlString = request.URL.absoluteString ?: @"";
    NSString *bodyString = [[NSString alloc] initWithData:request.HTTPBody encoding:NSUTF8StringEncoding] ?: @"";
    NSDictionary *headerDict = request.allHTTPHeaderFields ?: @{};

    return @{
        @"id": callbackID,
        @"url": urlString,
        @"requestBody": bodyString,
        @"requestHeader": headerDict
    };
}

RCT_EXPORT_METHOD(forceStartNetworkLoggingIOS) {
    [IBGNetworkLogger forceStartNetworkLogging];
}

RCT_EXPORT_METHOD(forceStopNetworkLoggingIOS) {
    [IBGNetworkLogger forceStopNetworkLogging];
}



@end
