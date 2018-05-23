//
//  IBGBugReporting.h
//  InstabugBugReporting
//
//  Created by Yousef Hamza on 5/17/18.
//  Copyright © 2018 Moataz. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <InstabugCore/InstabugCore.h>
#import "IBGReport.h"

@interface IBGBugReporting : NSObject

@property(class, atomic, strong) void(^willInvokeHandler)(void);
@property(class, atomic, strong) void(^didDismissHandler)(IBGDismissType dismissType, IBGReportType reportType);
@property(class, atomic, strong) void(^willSendReportHandler)(IBGReport *report);
@property(class, atomic, strong) void(^didSelectPromptOptionHandler)(IBGPromptOption promptOption);

@property(class, atomic, assign) BOOL introMessageEnabled;
@property(class, atomic, assign) IBGInvocationEvent invocationEvents;
@property(class, atomic, assign) CGFloat shakingThresholdForiPhone;
@property(class, atomic, assign) CGFloat shakingThresholdForiPad;
@property(class, atomic, assign) CGRectEdge floatingButtonEdge;
@property(class, atomic, assign) CGFloat floatingButtonTopOffset;
@property(class, atomic, assign) IBGAttachmentType enabledAttachmentTypes;
@property(class, atomic, assign) IBGPromptOption promptOptions;
@property(class, atomic, assign) IBGExtendedBugReportMode extendedBugReportMode;

/**
 @brief Invokes the SDK manually with the default invocation mode.
 
 @discussion Shows a view that asks the user whether they want to start a chat, report a problem or suggest an improvement.
 */
+ (void)invoke;

+ (void)invokeWithOptions:(IBGBugReportingInvocationOption)options;

/**
 @brief Dismisses any Instabug views that are currently being shown.
 */
+ (void)dismiss;

/**
 @brief Present a view that educates the user on how to invoke the SDK with the currently set invocation event.
 
 @discussion Does nothing if invocation event is set to anything other than IBGInvocationEventShake or IBGInvocationEventScreenshot.
 */
+ (void)showIntroMessage;


@end
