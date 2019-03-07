//
//  IBGChats.h
//  InstabugChats
//
//  Created by Hassaan El-Garem on 11/25/18.
//  Copyright © 2018 Moataz. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_SWIFT_NAME(Chats)
@interface IBGChats : NSObject

/**
 @brief Acts as master switch for the In-app Chats.
 
 @discussion It's enabled by default. When disabled, the user can't start a new chat from the SDK, the “Ask a question” option is removed from Instabug Prompt Options, and the compose button is removed from the chats list. In addition, when disabled +showWithChatsList: won’t have an effect.
*/
@property (class, atomic, assign) BOOL enabled;

/**
 @method +show:
 @brief Shows the compose new chat view.
 
 @discussion In order to show the chats list, [IBGReplies show] should be used.
 */
+ (void)show;

@end
