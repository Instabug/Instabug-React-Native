//
//  InstabugNetworkLoggerBridge.m
//  RNInstabug
//
//  Created by Andrew Amin on 01/10/2024.
//
#import "InstabugNetworkLoggerBridge.h"
#import "Util/IBGNetworkLogger+CP.h"

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

RCT_EXPORT_METHOD(registerNetworkLogsListener) {
    
    [IBGNetworkLogger setRequestAsyncObfuscationHandler:^(NSURLRequest * _Nonnull requestToBeObfuscated,
                                                          void (^ _Nonnull completion)(NSURLRequest * _Nonnull)) {
        NSString *tempId = [[[NSUUID alloc] init] UUIDString];
        self.requestObfuscationCompletionDictionary[tempId] = completion;
        
        // Ensure the URL, HTTP body, and headers are in the correct format
        NSString *urlString = requestToBeObfuscated.URL.absoluteString ?: @"";
        NSString *bodyString = [[NSString alloc] initWithData:requestToBeObfuscated.HTTPBody encoding:NSUTF8StringEncoding] ?: @"";
        NSDictionary *headerDict = requestToBeObfuscated.allHTTPHeaderFields ?: @{};
        
        // Create the dictionary to send
        NSDictionary *dict = @{
            @"tempId": tempId,
            @"url": urlString,
            @"requestBody": bodyString,
            @"requestHeader": headerDict
        };
        
        // Send the event
        [self sendEventWithName:@"IBGNetworkLoggerHandler" body:dict];
        
    }];
    
    
    [IBGNetworkLogger setResponseObfuscationHandler:^(NSData * _Nullable responseData, NSURLResponse * _Nonnull response, NetworkObfuscationCompletionBlock  _Nonnull completion) {
        
        NSString *tempId = [[[NSUUID alloc] init] UUIDString];
        self.responseObfuscationCompletionDictionary[tempId] = completion;
        
        
        // MARK: TODO: Convert Response To Dictionary & Pass it To React Native
        
    }];
    
    
    
    [IBGNetworkLogger setRequestFilteringHandler:^(NSURLRequest * _Nonnull request, void (^ _Nonnull completion)(BOOL)) {
        
        NSString *tempId = [[[NSUUID alloc] init] UUIDString];
        self.requestFilteringCompletionDictionary[tempId] = completion;
        
        
        // MARK: TODO: Convert Request To Dictionary & Pass it To React Native
        
    }];
    
    
    [IBGNetworkLogger setResponseFilteringHandler:^(NSURLResponse * _Nonnull request, void (^ _Nonnull completion)(BOOL)) {
        
        NSString *tempId = [[[NSUUID alloc] init] UUIDString];
        self.responseFilteringCompletionDictionary[tempId] = completion;
        
        
        // MARK: TODO: Convert Request To Dictionary & Pass it To React Native
        
    }];
    
    
    
    
}


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
    NSString *tempId = dict[@"tempId"];
    if ([tempId isKindOfClass:[NSString class]] && self.requestObfuscationCompletionDictionary[tempId] != nil) {
        ((IBGURLRequestAsyncObfuscationCompletedHandler)self.requestObfuscationCompletionDictionary[tempId])(request);
    } else {
        NSLog(@"Not Available Completion");
    }
    
    
    // MARK: Might need to moved this into another method.
    NSURLResponse *response; // Must be initialized from React Native Objects
    NSData *responseData; // Must be initialized from React Native Objects
    if ([tempId isKindOfClass:[NSString class]] && self.responseObfuscationCompletionDictionary[tempId] != nil) {
        
        ((NetworkObfuscationCompletionBlock)self.responseObfuscationCompletionDictionary[tempId])(responseData, response);
    } else {
        NSLog(@"Not Available Completion");
    }
    
    
    
    if ([tempId isKindOfClass:[NSString class]] && self.responseFilteringCompletionDictionary[tempId] != nil) {
        // ⬇️ YES == Response will be saved, NO == will be ignored
        ((IBGURLRequestResponseAsyncFilteringCompletedHandler)self.responseFilteringCompletionDictionary[tempId])(YES); 
    } else {
        NSLog(@"Not Available Completion");
    }
    
    if ([tempId isKindOfClass:[NSString class]] && self.requestFilteringCompletionDictionary[tempId] != nil) {
        // ⬇️ YES == Request will be saved, NO == will be ignored
        ((IBGURLRequestResponseAsyncFilteringCompletedHandler)self.requestFilteringCompletionDictionary[tempId])(YES); 
    } else {
        NSLog(@"Not Available Completion");
    }
    
}

RCT_EXPORT_METHOD(setNetworkLoggingRequestFilterPredicateIOS: (BOOL)value){

    NSPredicate *requestPredicate = [NSPredicate predicateWithValue:(value) ? YES : NO];

    [IBGNetworkLogger setNetworkLoggingRequestFilterPredicate:requestPredicate responseFilterPredicate:nil];
}

@end
