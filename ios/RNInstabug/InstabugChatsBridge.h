//
//  InstabugChatsBridge.h
//  RNInstabug
//
//  Created by Salma Ali on 7/30/19.
//  Copyright © 2019 instabug. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <Instabug/IBGTypes.h>

@interface InstabugChatsBridge : RCTEventEmitter <RCTBridgeModule>
/*
 +------------------------------------------------------------------------+
 |                             Chats Module                               |
 +------------------------------------------------------------------------+
 */

- (void)setEnabled:(BOOL)isEnabled;
- (void)show;


@end

