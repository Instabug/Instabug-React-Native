//
//  IBGBugReporting.h
//  InstabugBugReporting
//
//  Created by Yousef Hamza on 5/17/18.
//  Copyright © 2018 Moataz. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <InstabugCore/InstabugCore.h>
#import <InstabugCore/IBGTypes.h>

NS_SWIFT_NAME(BugReporting)
@interface IBGBugReporting : NSObject

/**
 @brief Sets a block of code to be executed just before the SDK's UI is presented.
 
 @discussion This block is executed on the UI thread. Could be used for performing any UI changes before the SDK's UI
 is shown.
 */
@property(class, atomic, strong) void(^willInvokeHandler)(void);

/**
 @brief Sets a block of code to be executed right after the SDK's UI is dismissed.
 
 @discussion This block is executed on the UI thread. Could be used for performing any UI changes after the SDK's UI
 is dismissed.

 The block has the following parameters:
 
 - dismissType: How the SDK was dismissed.
 - reportType: Type of report that has been sent. Will be set to IBGReportTypeBug in case the SDK has been dismissed
 without selecting a report type, so you might need to check dismissType before reportType.
 
 @see IBGReportType, IBGDismissType
 */
@property(class, atomic, strong) void(^didDismissHandler)(IBGDismissType dismissType, IBGReportType reportType);

/**
 @brief Sets a block of code to be executed when a prompt option is selected
 
 @param didSelectPromptOptionHandler A block of code that gets executed when a prompt option is selected.
 
 The block has the following parameters:
 - prompOption: The option selected in prompt.
 */
@property(class, atomic, strong) void(^didSelectPromptOptionHandler)(IBGPromptOption promptOption);

/**
 @brief Sets the events that invoke the feedback form.
 
 @discussion Default is set by `startWithToken:invocationEvent:`.
 
 @see IBGInvocationEvent
 */
@property(class, atomic, assign) IBGInvocationEvent invocationEvents;

/**
 @brief Sets the threshold value of the shake gesture for iPhone/iPod Touch

 @discussion Default for iPhone is 2.5.
 */
@property(class, atomic, assign) CGFloat shakingThresholdForiPhone;

/**
 @brief Sets the threshold value of the shake gesture for iPad.
 
 @discussion Default for iPad is 0.6.
 */
@property(class, atomic, assign) CGFloat shakingThresholdForiPad;

/**
 @brief Sets the default edge at which the floating button will be shown. Different orientations are already handled.
 
 @discussion Default for `floatingButtonEdge` is `CGRectMaxXEdge`.
 */
@property(class, atomic, assign) CGRectEdge floatingButtonEdge;

/**
 @brief Sets the default offset from the top at which the floating button will be shown.
 
 @discussion Default for `floatingButtonOffsetFromTop` is 50
 */
@property(class, atomic, assign) CGFloat floatingButtonTopOffset;

/**
 @brief Sets whether attachments in bug reporting and in-app messaging are enabled.
 */
@property(class, atomic, assign) IBGAttachmentType enabledAttachmentTypes;

/**
 @brief Enables/disables prompt options when SDK is invoked.
 
 @discussion When only a single option is enabled, it become the default invocation mode.
 If all options are disabled, bug reporting becomes the default invocation mode.
 
 By default, all three options are enabled.
 */
@property(class, atomic, assign) IBGPromptOption promptOptions;

/**
 @brief Sets whether the extended bug report mode should be disabled, enabled with required fields or enabled with optional fields.
 
 @discussion This feature is disabled by default. When enabled, it adds more fields for your reporters to fill in. You can set whether the extra fields are required or optional.
 1. Expected Results.
 2. Actual Results.
 3. Steps to Reproduce.
 
 An enum to disable the extended bug report mode, enable it with required or with optional fields.
 */
@property(class, atomic, assign) IBGExtendedBugReportMode extendedBugReportMode;

/**
 @brief Use to specify different options that would affect how Instabug is shown and other aspects about the reporting experience.

 @discussion See IBGInvocationOptions.
 */
@property(class, atomic, assign) IBGBugReportingInvocationOption invocationOptions;

/**
 @brief Invokes the SDK manually with the default invocation mode.
 
 @discussion Shows a view that asks the user whether they want to start a chat, report a problem or suggest an improvement.
 */
+ (void)invoke;

/**
 @brief Invokes the SDK with a specific mode.
 
 @discussion Invokes the SDK and show a specific view with specified options, instead of showing a prompt for users to choose from.
 
 @see IBGInvocationMode
 @see IBGBugReportingInvocationOption
 */
+ (void)invokeWithMode:(IBGInvocationMode)invocationMode options:(IBGBugReportingInvocationOption)options;

/**
 @brief Dismisses any Instabug views that are currently being shown.
 */
+ (void)dismiss;


@end
