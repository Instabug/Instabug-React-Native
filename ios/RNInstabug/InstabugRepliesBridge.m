//
//  InstabugRepliesBridge.m
//  RNInstabug
//
//  Created by Salma Ali on 7/30/19.
//  Copyright © 2019 instabug. All rights reserved.
//
//

#import "InstabugRepliesBridge.h"
#import <Instabug/IBGReplies.h>
#import <asl.h>
#import <React/RCTLog.h>
#import <os/log.h>
#import <Instabug/IBGTypes.h>
#import <React/RCTUIManager.h>

@implementation InstabugRepliesBridge

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"IBGOnNewReplyReceivedCallback"];
}

RCT_EXPORT_MODULE(IBGReplies)

RCT_EXPORT_METHOD(setEnabled:(BOOL) isEnabled) {
    IBGReplies.enabled = isEnabled;
}

RCT_EXPORT_METHOD(hasChats:(RCTResponseSenderBlock) callback) {
    BOOL hasChats = IBGReplies.hasChats;
    callback(@[@(hasChats)]);
    
}

RCT_EXPORT_METHOD(show) {
    [[NSRunLoop mainRunLoop] performSelector:@selector(show) target:[IBGReplies class] argument:nil order:0 modes:@[NSDefaultRunLoopMode]];
}

RCT_EXPORT_METHOD(setOnNewReplyReceivedHandler:(RCTResponseSenderBlock) callback) {
    if (callback != nil) {
        IBGReplies.didReceiveReplyHandler = ^{
            [self sendEventWithName:@"IBGOnNewReplyReceivedCallback" body:nil];
        };
    } else {
        IBGReplies.didReceiveReplyHandler = nil;
    }
    
}

RCT_EXPORT_METHOD(getUnreadRepliesCount:(RCTResponseSenderBlock)callBack) {
    callBack(@[@(IBGReplies.unreadRepliesCount)]);
}

RCT_EXPORT_METHOD(setInAppNotificationEnabled:(BOOL)isChatNotificationEnabled) {
    IBGReplies.inAppNotificationsEnabled = isChatNotificationEnabled;
}

RCT_EXPORT_METHOD(setPushNotificationsEnabled:(BOOL)isPushNotificationEnabled) {
    [IBGReplies setPushNotificationsEnabled:isPushNotificationEnabled];
}

@synthesize description;

@synthesize hash;

@synthesize superclass;

@end


