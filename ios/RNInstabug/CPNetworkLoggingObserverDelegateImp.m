//
//  CPNetworkLoggingObserverDelegateImp.m
//  InstabugI
//
//  Created by Eyad on 29/08/2024.
//  Copyright © 2024 Instabug. All rights reserved.
//

#import "CPNetworkLoggingObserverDelegateImp.h"

@implementation CPNetworkLoggingObserverDelegateImp

- (void)obfuscateRequestV3:(NSURLRequest * _Nonnull)request {
    // Call React Native Code Here
    // This will get called whenever a new request is made
    
    NSDictionary *dict = @{ @"url" : request.URL, @"requestBody" : request.HTTPBody, @"requestHeader" : request.allHTTPHeaderFields };
    [self sendEventWithName:@"IBGNetworkLoggerHandler" body:dict];
}

@end
