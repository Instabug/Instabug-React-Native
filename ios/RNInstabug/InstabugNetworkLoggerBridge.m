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

@implementation InstabugNtworkLoggerBridge


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

bool hasListeners = NO;



// Will be called when this module's first listener is added.
-(void)startObserving {
    hasListeners = YES;
    // Set up any upstream listeners or background tasks as necessary
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
    hasListeners = NO;
    // Remove upstream listeners, stop unnecessary background tasks
}

RCT_EXPORT_METHOD(isNativeInterceptionEnabled:(RCTPromiseResolveBlock)resolve :(RCTPromiseRejectBlock)reject) {
    resolve(@(IBGNetworkLogger.isNativeNetworkInterceptionFeatureEnabled));
}

RCT_EXPORT_METHOD(registerNetworkLogsListener: (NetworkListenerType) listenerType) {
    switch (listenerType) {
         case NetworkListenerTypeFiltering:
             NSLog(@"Andrew: Network logs filtering enabled");
             [self setupRequestFilteringHandler];
             break;
             
         case NetworkListenerTypeObfuscation:
             NSLog(@"Andrew: Network logs obfuscation enabled");
             [self setupRequestObfuscationHandler];
             break;
             
         case NetworkListenerTypeBoth:
             NSLog(@"Andrew: Both filtering and obfuscation enabled");
             [self setupRequestFilteringAndObfuscationHandler];
             break;
             
         default:
             NSLog(@"Andrew: Unknown NetworkListenerType");
             break;
     }
}
//RCT_EXPORT_METHOD(registerNetworkLogsListener) {
//    [IBGNetworkLogger setRequestAsyncObfuscationHandler:^(NSURLRequest * _Nonnull requestToBeObfuscated,
//                                                          void (^ _Nonnull completion)(NSURLRequest * _Nonnull)) {
//        NSString *callbackID = [[[NSUUID alloc] init] UUIDString];
//        self.requestObfuscationCompletionDictionary[callbackID] = completion;
//        
//        // Ensure the URL, HTTP body, and headers are in the correct format
//        NSString *urlString = requestToBeObfuscated.URL.absoluteString ?: @"";
//        NSString *bodyString = [[NSString alloc] initWithData:requestToBeObfuscated.HTTPBody encoding:NSUTF8StringEncoding] ?: @"";
//        NSDictionary *headerDict = requestToBeObfuscated.allHTTPHeaderFields ?: @{};
//        
//        // Create the dictionary to send
//        NSDictionary *dict = @{
//            @"callbackID": callbackID,
//            @"url": urlString,
//            @"requestBody": bodyString,
//            @"requestHeader": headerDict
//        };
//        
//        // Send the event
//        [self sendEventWithName:@"IBGNetworkLoggerHandler" body:dict];
//        
//    }];
//    
//    
//    [IBGNetworkLogger setResponseObfuscationHandler:^(NSData * _Nullable responseData, NSURLResponse * _Nonnull response, NetworkObfuscationCompletionBlock  _Nonnull completion) {
//        
//        NSString *callbackID = [[[NSUUID alloc] init] UUIDString];
//        self.responseObfuscationCompletionDictionary[callbackID] = completion;
//        
//        
//        // MARK: TODO: Convert Response To Dictionary & Pass it To React Native
//        
//    }];
//    
//    
//    
//    [IBGNetworkLogger setRequestFilteringHandler:^(NSURLRequest * _Nonnull request, void (^ _Nonnull completion)(BOOL)) {
//        
//        NSString *callbackID = [[[NSUUID alloc] init] UUIDString];
//        self.requestFilteringCompletionDictionary[callbackID] = completion;
//        
//        
//        // MARK: TODO: Convert Request To Dictionary & Pass it To React Native
//        
//    }];
//    
//    
//    [IBGNetworkLogger setResponseFilteringHandler:^(NSURLResponse * _Nonnull request, void (^ _Nonnull completion)(BOOL)) {
//        
//        NSString *callbackID = [[[NSUUID alloc] init] UUIDString];
//        self.responseFilteringCompletionDictionary[callbackID] = completion;
//        
//        
//        // MARK: TODO: Convert Request To Dictionary & Pass it To React Native
//        
//    }];
//    
//    
//    
//    
//}


RCT_EXPORT_METHOD(updateNetworkLogSnapshot:(NSString * _Nonnull)jsonString) {
    // Properly initialize the NSMutableURLRequest
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] init];

    // Convert jsonString to NSData
    NSData *data = [jsonString dataUsingEncoding:NSUTF8StringEncoding];

    // Parse the JSON into a dictionary
    NSError *error = nil;
    NSDictionary *dict = [NSJSONSerialization JSONObjectWithData:data options:0 error:&error];

    // Check for JSON parsing errors
    if (error) {
        NSLog(@"Failed to parse JSON: %@", error);
        return;
    }

    // Set the URL, HTTP body, and headers
    request.URL = [NSURL URLWithString:dict[@"url"]];
    request.HTTPBody = [dict[@"requestBody"] dataUsingEncoding:NSUTF8StringEncoding];

    // Ensure requestHeader is a dictionary
    if ([dict[@"requestHeader"] isKindOfClass:[NSDictionary class]]) {
        request.allHTTPHeaderFields = dict[@"requestHeader"];
    } else {
        NSLog(@"Invalid requestHeader format");
//        return;
    }

    // Ensure self.completion is not nil before calling it
    NSString *callbackID = dict[@"id"];
    if ([callbackID isKindOfClass:[NSString class]] && self.requestObfuscationCompletionDictionary[callbackID] != nil) {
        ((IBGURLRequestAsyncObfuscationCompletedHandler)self.requestObfuscationCompletionDictionary[callbackID])(request);
    } else {
        NSLog(@"Not Available Completion");
    }
//    
//    
//    // MARK: Might need to moved this into another method.
//    NSURLResponse *response; // Must be initialized from React Native Objects
//    NSData *responseData; // Must be initialized from React Native Objects
//    if ([callbackID isKindOfClass:[NSString class]] && self.responseObfuscationCompletionDictionary[callbackID] != nil) {
//        
//        ((NetworkObfuscationCompletionBlock)self.responseObfuscationCompletionDictionary[callbackID])(responseData, response);
//    } else {
//        NSLog(@"Not Available Completion");
//    }
//    
//    
//    
//    if ([callbackID isKindOfClass:[NSString class]] && self.responseFilteringCompletionDictionary[callbackID] != nil) {
//        // ⬇️ YES == Response will be saved, NO == will be ignored
//        ((IBGURLRequestResponseAsyncFilteringCompletedHandler)self.responseFilteringCompletionDictionary[callbackID])(YES); 
//    } else {
//        NSLog(@"Not Available Completion");
//    }
//    
//    if ([callbackID isKindOfClass:[NSString class]] && self.requestFilteringCompletionDictionary[callbackID] != nil) {
//        // ⬇️ YES == Request will be saved, NO == will be ignored
//        ((IBGURLRequestResponseAsyncFilteringCompletedHandler)self.requestFilteringCompletionDictionary[callbackID])(YES); 
//    } else {
//        NSLog(@"Not Available Completion");
//    }
    
}

RCT_EXPORT_METHOD(setNetworkLoggingRequestFilterPredicateIOS: (NSString * _Nonnull) callbackID : (BOOL)value ){

//    NSPredicate *requestPredicate = [NSPredicate predicateWithValue:(value) ? YES : NO];
    
    
    if ([callbackID isKindOfClass:[NSString class]] && self.requestFilteringCompletionDictionary[callbackID] != nil) {
        // ⬇️ YES == Request will be saved, NO == will be ignored
        ((IBGURLRequestResponseAsyncFilteringCompletedHandler)self.requestFilteringCompletionDictionary[callbackID])(YES);
    } else {
        NSLog(@"Not Available Completion");
    }
    

//    [IBGNetworkLogger setNetworkLoggingRequetFilterPredicate:requestPredicate responseFilterPredicate:nil];
}


#pragma mark - Helper Methods

// Set up the filtering handler
- (void)setupRequestFilteringHandler {
    [IBGNetworkLogger setRequestFilteringHandler:^(NSURLRequest * _Nonnull request, void (^ _Nonnull completion)(BOOL)) {
        NSString *callbackID = [[[NSUUID alloc] init] UUIDString];
        self.requestFilteringCompletionDictionary[callbackID] = completion;
        
        NSDictionary *dict = [self createNetworkRequestDictForRequest:request callbackID:callbackID];
        if(hasListeners){
            [self sendEventWithName:@"IBGNetworkLoggerHandler" body:dict];
        }

    }];
}

// Set up the obfuscation handler
- (void)setupRequestObfuscationHandler {
    [IBGNetworkLogger setRequestAsyncObfuscationHandler:^(NSURLRequest * _Nonnull request, void (^ _Nonnull completion)(NSURLRequest * _Nonnull)) {
        NSString *callbackID = [[[NSUUID alloc] init] UUIDString];
        self.requestObfuscationCompletionDictionary[callbackID] = completion;
        
        
        NSDictionary *dict = [self createNetworkRequestDictForRequest:request callbackID:callbackID];
        if (hasListeners) {
            [self sendEventWithName:@"IBGNetworkLoggerHandler" body:dict];
        }
        
    }];
}

// Set up the obfuscation handler
- (void)setupRequestFilteringAndObfuscationHandler {
    
    NSString *callbackID = [[[NSUUID alloc] init] UUIDString];
    
    [IBGNetworkLogger setRequestAsyncObfuscationHandler:^(NSURLRequest * _Nonnull request, void (^ _Nonnull completion)(NSURLRequest * _Nonnull)) {
        self.requestObfuscationCompletionDictionary[callbackID] = completion;
    }];
    
    [IBGNetworkLogger setRequestAsyncObfuscationHandler:^(NSURLRequest * _Nonnull request, void (^ _Nonnull completion)(NSURLRequest * _Nonnull)) {
        self.requestObfuscationCompletionDictionary[callbackID] = completion;
        
        NSDictionary *dict = [self createNetworkRequestDictForRequest:request callbackID:callbackID];
        if(hasListeners){
            [self sendEventWithName:@"IBGNetworkLoggerHandler" body:dict];
        }
        
    }];
}

// Helper to create a dictionary from the request and callbackID
- (NSDictionary *)createNetworkRequestDictForRequest:(NSURLRequest *)request callbackID:(NSString *)callbackID {
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

@end
