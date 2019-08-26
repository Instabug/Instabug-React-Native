//
//  InstabugChatsBridge.m
//  RNInstabug
//
//  Created by Salma Ali on 7/30/19.
//  Copyright © 2019 instabug. All rights reserved.
//

#import "InstabugChatsBridge.h"
#import <Instabug/IBGChats.h>
#import <asl.h>
#import <React/RCTLog.h>
#import <os/log.h>
#import <Instabug/IBGTypes.h>
#import <React/RCTUIManager.h>

@implementation InstabugChatsBridge

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

RCT_EXPORT_MODULE(IBGChats)

RCT_EXPORT_METHOD(setEnabled:(BOOL)isEnabled) {
    IBGChats.enabled = isEnabled;
}

RCT_EXPORT_METHOD(show) {
    [[NSRunLoop mainRunLoop] performSelector:@selector(show) target:[IBGChats class] argument:nil order:0 modes:@[NSDefaultRunLoopMode]];
}

@synthesize description;

@synthesize hash;

@synthesize superclass;

@end

