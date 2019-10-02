/*
 File:       Instabug/Instabug.h

 Contains:   API for using Instabug's SDK.

 Copyright:  (c) 2013-2019 by Instabug, Inc., all rights reserved.

 Version:    8.7.2
 */

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "InstabugCore.h"
#import "IBGNetworkLogger.h"
#import "IBGReport.h"
#import "IBGLog.h"
#import "IBGBugReporting.h"
#import "IBGCrashReporting.h"
#import "IBGSurveys.h"
#import "IBGFeatureRequests.h"
#import "IBGChats.h"
#import "IBGReplies.h"
#import "UIView+Instabug.h"

/**
 This is the API for using Instabug's SDK. For more details about the SDK integration,
 please visit https://docs.instabug.com/docs/ios-integration
 */

NS_ASSUME_NONNULL_BEGIN

@interface Instabug : NSObject

/**
 @brief Sets whether the session profiler is enabled or disabled.
 
 @discussion The session profiler is enabled by default and it attaches to the bug and crash reports the following information during the last 60 seconds before the report is sent.
 1. CPU load.
 2. Dispatch queues latency.
 3. Memory usage.
 4. Storage usage.
 5. Connectivity.
 6. Battery percentage and state.
 7. Orientation.
 */
@property (class, atomic, assign) BOOL sessionProfilerEnabled;

/**
 @brief Sets maximum auto screen recording video duration.
 
 @discussion sets maximum auto screen recording video duration with max value 30 seconds and min value greater than 1 sec.
 */
@property (class, atomic, assign) CGFloat autoScreenRecordingDuration DEPRECATED_MSG_ATTRIBUTE("'autoScreenRecordingDuration' is deprecated: first deprecated in SDK 8.2.3 - autoScreenRecordingDuration is deprecated. Use IBGBugReporting.autoScreenRecordingDuration instead.");

/**
 @brief Enables/disables inspect view hierarchy when reporting a bug/feedback.
 */
@property (class, atomic, assign) BOOL shouldCaptureViewHierarchy DEPRECATED_MSG_ATTRIBUTE("'shouldCaptureViewHierarchy' is deprecated: first deprecated in SDK 8.2.3 - shouldCaptureViewHierarchy is deprecated. Use IBGBugReporting.shouldCaptureViewHierarchy instead.");

/**
 @brief Sets the primary color of the SDK's UI.
 
 @discussion Sets the color of UI elements indicating interactivity or call to action.
 */
@property (class, atomic, strong) UIColor *tintColor;

/**
 @brief Sets a block of code to be executed before sending each report.
 
 @discussion This block is executed in the background before sending each report. Could be used for attaching logs
 and extra data to reports.
 
 @param willSendReportHandler A block of code that gets executed before sending each bug report.
 */
@property(class, atomic, strong) IBGReport*(^willSendReportHandler)(IBGReport *report);

/**
 @brief Sets whether the SDK is tracking user steps or not.
 
 @discussion Enabling user steps would give you an insight on the scenario a user has performed before encountering a
 bug or a crash. User steps are attached with each report being sent.
 
 User Steps tracking is enabled by default if it's available in your current plan.
 */
@property (class, atomic, assign) BOOL trackUserSteps;

/**
 @brief Sets whether user steps tracking is visual, non visual or disabled.
 
 @discussion Enabling user steps would give you an insight on the scenario a user has performed before encountering a
 bug or a crash. User steps are attached with each report being sent.
 
 User Steps tracking is enabled by default if it's available in your current plan.
 */
@property (class, atomic, assign) IBGUserStepsMode reproStepsMode;


/**
 @brief Sets the welcome message mode to live, beta or disabled.
 
 @discussion By default, the welcome message live mode is enabled. It appears automatically after 10 seconds from the user's first session. You can change it to the beta mode or disable it.
 The live mode consists of one step to inform the users how to report a bug or feedback. The beta mode consists of three steps to welcome your testers on board, inform them how to report a bug or feedback and to motivate them to always be on the latest app version. Please note, the into message appears only if the invocation event isn't set to none.
 */
@property (class, atomic, assign) IBGWelcomeMessageMode welcomeMessageMode;

/**
 @brief Sets a block of code to be executed when a welcome message is dismissed
 
 @param didDismissWelcomeMessageHandler A block of code that gets executed when a welcome message is dismissed.
 
 */
@property(class, atomic, strong) void(^didDismissWelcomeMessageHandler)(void);

/**
 @brief Attaches user data to each report being sent.
 
 @discussion Each call to this method overrides the user data to be attached.
 Maximum size of the string is 1,000 characters.
 */
@property (class, atomic, strong) NSString *userData;


/**
 @brief Starts the SDK.
 
 @discussion This is the main SDK method that does all the magic. This is the only method that SHOULD be called.
 Should be called at the end of `-[UIApplicationDelegate application:didFinishLaunchingWithOptions:]`.
 
 @param token The token that identifies the app, you can find it on your dashboard.
 @param invocationEvents One or more event that invokes the SDK's UI.
 
 @see IBGInvocationEvent
 */
+ (void)startWithToken:(NSString *)token invocationEvents:(IBGInvocationEvent)invocationEvents;

/**
 @brief Shows Instabug Prompt Options.
 
 @discussion By default, it contains Report a problem, Suggest an improvement, Ask a question, and a button that navigates to the chats list. To control which options should be enabled, see IBGBugReporting.enabled, IBGChats.enabled, and  IBGReplies.enabled.
 */
+ (void)show;

/**
 @brief Add file to attached files with each report being sent.

 @discussion A new copy of the file at fileURL will be attached with each bug report being sent. The file is only copied
 at the time of sending the report, so you could safely call this API whenever the file is available on disk, and the copy
 attached to your bug reports will always contain that latest changes at the time of sending the report.

 Each call to this method adds the file to the files attached, until a maximum of 3 then it overrides the first file. 
 The file has to be available locally at the provided path when the report is being sent.

 @param fileURL Path to a file that's going to be attached to each report.
 */
+ (void)addFileAttachmentWithURL:(NSURL *)fileURL;


/**
 @brief Add a set of data as a file attachment to be sent with each report.
 
 @discussion The data will be written to a file and will be attached with each report.
 
 Each call to this method adds this set of data as a file attachment, until a maximum of 3 then it overrides the first data.
 
 @param data NSData to be added as a file attachment with each report.
 */
+(void)addFileAttachmentWithData:(NSData *)data;

/**
 @brief Clear list of files to be attached with each report.

 @discussion This method doesn't delete any files from the file system. It will just removes them for the list of files
 to be attached with each report.
 */
+ (void)clearFileAttachments;

/**
 @brief Shows the welcome message in a specific mode.

 @discussion By default, the welcome message live mode is enabled. It appears automatically after 10 seconds from the user's first session. You can show it manually in a specific mode through this API.
 The live mode consists of one step to inform the users how to report a bug or feedback. The beta mode consists of three steps to welcome your testers on board, inform them how to report a bug or feedback and to motivate them to always be on the latest app version. Please note, the into message appears only if the invocation event isn't set to none.
 
 @param welcomeMessageMode An enum to set the welcome message mode to live, beta or disabled.
 */
+ (void)showWelcomeMessageWithMode:(IBGWelcomeMessageMode)welcomeMessageMode;


/**
 @brief Sets the user email and name for all sent reports.
 
 @param email Email address to be set as the user's email.
 @param name Name of the user to be set.
 */
+ (void)identifyUserWithEmail:(NSString *)email name:(nullable NSString *)name;

/**
 @brief Resets the value of the user's email and name, previously set using `+ [Instabug identifyUserWithEmail:name:]`.
 
 @discussion This method also resets all chats currently on the device and removes any set user attributes.
 */
+ (void)logOut;

/**
 @brief Sets the SDK's locale.
 
 @discussion Use to change the SDK's UI to different language.
 Defaults to the device's current locale.
 
 @param locale A locale to set the SDK to.
 
 @see IBGLocale
 */
+ (void)setLocale:(IBGLocale)locale;

/**
 @brief Sets the color theme of the SDK's whole UI.

 @param colorTheme An `IBGColorTheme` to set the SDK's UI to.
 
 @see IBGColorTheme
 */
+ (void)setColorTheme:(IBGColorTheme)colorTheme;

/**
 @brief Sets a block of code that is used to capture a screenshot.
 
 @discussion Should only be used if your app uses OpenGL.
 
 @param screenshotCapturingHandler A block of code that's going to be used to capture screenshots.
 */
+ (void)setScreenshotCapturingHandler:(UIImage *(^)(void))screenshotCapturingHandler;

/**
 @brief Appends a set of tags to previously added tags of reported feedback, bug or crash.

 @param tags An array of tags to append to current tags.
*/
+ (void)appendTags:(NSArray<NSString *> *)tags;

/**
 @brief Manually removes all tags of reported feedback, bug or crash.
 */
+ (void)resetTags;

/**
 @brief Gets all tags of reported feedback, bug or crash.
 
 @return An array of tags.
 */
+ (NSArray *)getTags;

/**
 @brief Overrides any of the strings shown in the SDK with custom ones.
 
 @discussion Allows you to customize any of the strings shown to users in the SDK.
 
 @param value String value to override the default one.
 @param key Key of string to override. Use predefined keys like IBGShakeStartAlertTextStringName, 
 IBGEmailFieldPlaceholderStringName, etc.
 
 @see IBGTypes
 */
+ (void)setValue:(NSString *)value forStringWithKey:(NSString *)key;

/**
 @brief Set custom user attributes that are going to be sent with each feedback, bug or crash.
 
 @param value User attribute value.
 @param key User attribute key.
 */
+ (void)setUserAttribute:(NSString *)value withKey:(NSString *)key;

/**
 @brief Returns the user attribute associated with a given key.

 @param key The key for which to return the corresponding value..
 
 @return The value associated with aKey, or nil if no value is associated with aKey.
 */
+ (nullable NSString *)userAttributeForKey:(NSString *)key;

/**
 @brief Removes a given key and its associated value from user attributes.
 
 Does nothing if aKey does not exist.
 
 @param key The key to remove.
 */
+ (void)removeUserAttributeForKey:(NSString *)key;

/**
 @brief Returns all user attributes.
 
 @return A new dictionary containing all the currently set user attributes, or an empty dictionary if no user attributes have been set.
 */
+ (nullable NSDictionary *)userAttributes;

/// -------------------
/// @name SDK Reporting
/// -------------------

/**
 @brief Logs a user event that happens through the lifecycle of the application.
 
 @discussion Logged user events are going to be sent with each report, as well as at the end of a session.
 
 @param name Event name.
 */
+ (void)logUserEventWithName:(NSString *)name;

#pragma mark - SDK Debugging

/// ------------------------
/// @name SDK Debugging
/// ------------------------

/**
 @brief Sets the verbosity level of logs used to debug the Instabug SDK itself.
 
 @discussion This API sets the verbosity level of logs used to debug The SDK. The defualt value in debug mode is IBGSDKDebugLogsLevelVerbose and in production is IBGSDKDebugLogsLevelError.
 */
@property (class, atomic, assign) IBGSDKDebugLogsLevel sdkDebugLogsLevel;

@end


NS_ASSUME_NONNULL_END
