//
//  InstabugNetworkLoggerBridge.m
//  RNInstabug
//
//  Created by Andrew Amin on 01/10/2024.
//
#import "InstabugNetworkLoggerBridge.h"
#import "Util/IBGNetworkLogger+CP.h"


@implementation InstabugNtworkLoggerBridge
//@property NSMutableDictionary<NSString *, IBGURLRequestAsyncObfuscationCompletedHandler> *dictionary;



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

//RCT_EXPORT_METHOD(registerNetworkLogsListener){
//
//    [IBGNetworkLogger setRequestAsyncObfuscationHandler:^(NSURLRequest *requestToBeObfuscated, IBGURLRequestAsyncObfuscationCompletedHandler completion) {
//
//        NSString *tempId = [[[NSUUID alloc] init] UUIDString];
//        self.dictionary[tempId] = completion;
//
//           // Ensure the URL, HTTP body, and headers are in the correct format
//           NSString *urlString = requestToBeObfuscated.URL.absoluteString ?: @"";
//           NSString *bodyString = [[NSString alloc] initWithData:requestToBeObfuscated.HTTPBody encoding:NSUTF8StringEncoding] ?: @"";
//           NSDictionary *headerDict = requestToBeObfuscated.allHTTPHeaderFields ?: @{};
//
//        // Create the dictionary to send
//        NSDictionary *dict = @{
//            @"tempId": tempId,
//            @"url": urlString,
//            @"requestBody": bodyString,
//            @"requestHeader": headerDict
//        };
//
//        // Send the event
//        [self sendEventWithName:@"IBGNetworkLoggerHandler" body:dict];
//
//    }];
//}


//RCT_EXPORT_METHOD(updateNetworkLogSnapshot:(NSString * _Nonnull)jsonString) {
//    // Properly initialize the NSMutableURLRequest
//    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] init];
//
//    // Convert jsonString to NSData
//    NSData *data = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
//
//    // Parse the JSON into a dictionary
//    NSError *error = nil;
//    NSDictionary *dict = [NSJSONSerialization JSONObjectWithData:data options:0 error:&error];
//
//    // Check for JSON parsing errors
//    if (error) {
//        NSLog(@"Failed to parse JSON: %@", error);
//        return;
//    }
//
//    // Set the URL, HTTP body, and headers
//    request.URL = [NSURL URLWithString:dict[@"url"]];
//    request.HTTPBody = [dict[@"requestBody"] dataUsingEncoding:NSUTF8StringEncoding];
//
//    // Ensure requestHeader is a dictionary
//    if ([dict[@"requestHeader"] isKindOfClass:[NSDictionary class]]) {
//        request.allHTTPHeaderFields = dict[@"requestHeader"];
//    } else {
//        NSLog(@"Invalid requestHeader format");
////        return;
//    }
//
//    // Ensure self.completion is not nil before calling it
//    NSString *tempId = dict[@"tempId"];
//    if ([tempId isKindOfClass:[NSString class]] && self.dictionary[tempId] != nil) {
//        ((IBGURLRequestObfuscationHandler)self.dictionary[tempId])(request);
//    } else {
//        NSLog(@"Not Available Completion");
//    }
//}

RCT_EXPORT_METHOD(setNetworkLoggingRequestFilterPredicateIOS: (BOOL)value){

    NSPredicate *requestPredicate = [NSPredicate predicateWithValue:(value) ? YES : NO];

    [IBGNetworkLogger setNetworkLoggingRequestFilterPredicate:requestPredicate responseFilterPredicate:nil];
}

@end
