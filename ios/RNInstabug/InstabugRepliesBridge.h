//
//  InstabugRepliesBridge.h
//  RNInstabug
//
//  Created by Salma Ali on 7/30/19.
//  Copyright © 2019 instabug. All rights reserved.
//


#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <Instabug/IBGTypes.h>

@interface InstabugRepliesBridge : RCTEventEmitter <RCTBridgeModule>
/*
 +------------------------------------------------------------------------+
 |                            Replies Module                              |
 +------------------------------------------------------------------------+
 */

- (void)setEnabled:(BOOL) isEnabled;

- (void)hasChats:(RCTPromiseResolveBlock)resolve :(RCTPromiseRejectBlock)reject;

- (void)show;

- (void)setOnNewReplyReceivedHandler:(RCTResponseSenderBlock) callback;

- (void)getUnreadRepliesCount:(RCTPromiseResolveBlock)resolve :(RCTPromiseRejectBlock)reject;

- (void)setInAppNotificationEnabled:(BOOL)isChatNotificationEnabled;

- (void)setPushNotificationsEnabled:(BOOL)isPushNotificationEnabled;



@end


