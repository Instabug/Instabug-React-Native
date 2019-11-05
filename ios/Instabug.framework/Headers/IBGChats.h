/*
 File:       Instabug/IBGChats.h
 
 Contains:   API for using Instabug's SDK.
 
 Copyright:  (c) 2013-2019 by Instabug, Inc., all rights reserved.
 
 Version:    8.7.3
 */

#import <Foundation/Foundation.h>


/*
 +--------------------------------------------------------------------------+
 |                            Deprecated APIs                               |
 +--------------------------------------------------------------------------+
 |  In this release, we’re improving the in-app communication experience.   |
 |  Now, your end user will have a unified experience while sending you     |
 |  a report independently from its type. Whether it is a bug, improvement, |
 |  or question, they’ll see the same experience.                           |
 |                                                                          |
 |  The Chats class and its methods have been deprecated, and while they    |
 |  still function, they will be completely removed in a future release.    |
 |  For more details about this API’s replacement, check the                |
 |  docs here:                                                              |
 |  https://docs.instabug.com/v8.6/docs/ios-sdk-8-6-migration-guide.        |
 |                                                                          |
 |  If you have any questions please reach out to us through                |
 |  contactus@instabug.com.                                                 |
 +--------------------------------------------------------------------------+
 */

NS_SWIFT_NAME(Chats)
@interface IBGChats : NSObject

/**
 @brief Acts as master switch for the In-app Chats.
 
 @discussion It's enabled by default. When disabled, the user can't start a new chat from the SDK, the “Ask a question” option is removed from Instabug Prompt Options, and the compose button is removed from the chats list. In addition, when disabled +showWithChatsList: won’t have an effect.
*/
@property (class, atomic, assign) BOOL enabled DEPRECATED_MSG_ATTRIBUTE("See https://docs.instabug.com/docs/ios-sdk-8-6-migration-guide#section-enabled for instructions on migrating to SDK v8.6 APIs.");

/**
 @method +show:
 @brief Shows the compose new chat view.
 
 @discussion In order to show the chats list, [IBGReplies show] should be used.
 */
+ (void)show DEPRECATED_MSG_ATTRIBUTE("See https://docs.instabug.com/docs/ios-sdk-8-6-migration-guide#section-show for instructions on migrating to SDK v8.6 APIs.");

@end
