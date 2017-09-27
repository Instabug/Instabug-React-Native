/*
 File:       Instabug/Instabug.h

 Contains:   API for using Instabug's SDK.

 Copyright:  (c) 2013-2017 by Instabug, Inc., all rights reserved.

 Version:    7.3.9
 */

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "IBGTypes.h"

/**
 This is the API for using Instabug's SDK. For more details about the SDK integration,
 please visit https://instabug.com/developers
 */

NS_ASSUME_NONNULL_BEGIN

@interface Instabug : NSObject

typedef void (^NetworkObfuscationCompletionBlock)(NSData *data, NSURLResponse *response);

/// ------------------------
/// @name SDK Initialization
/// ------------------------

/**
 @brief Starts the SDK.
 
 @discussion This is the main SDK method that does all the magic. This is the only method that SHOULD be called.
 Should be called at the end of `-[UIApplicationDelegate application:didFinishLaunchingWithOptions:]`.
 
 @param token The token that identifies the app, you can find it on your dashboard.
 @param invocationEvent The event that invokes the SDK's UI.
 
 @see IBGInvocationEvent
 */
+ (void)startWithToken:(NSString *)token invocationEvent:(IBGInvocationEvent)invocationEvent;

/// ---------------------------
/// @name SDK Manual Invocation
/// ---------------------------

/**
 @brief Invokes the SDK manually with the default invocation mode.
 
 @discussion Shows a view that asks the user whether they want to start a chat, report a problem or suggest an improvement.
 */
+ (void)invoke;

/**
 @brief Invokes the SDK with a specific mode.
 
 @discussion Invokes the SDK and show a specific view, instead of showing a prompt for users to choose from.
 
 @param invocationMode Specifies which mode the SDK is going to start with.
 
 @see IBGInvocationMode
 */
+ (void)invokeWithInvocationMode:(IBGInvocationMode)invocationMode;

/**
 @brief Dismisses any Instabug views that are currently being shown.
 */
+ (void)dismiss;

/// ----------------------
/// @name SDK Pro Features
/// ----------------------

/**
 @brief Attaches a file to each report being sent.
 
 @deprecated Use `addFileAttachmentWithURL:` instead.

 @discussion A new copy of the file at fileURL will be attached with each bug report being sent. The file is only copied
 at the time of sending the report, so you could safely call this API whenever the file is available on disk, and the copy
 attached to your bug reports will always contain that latest changes at the time of sending the report.
 
 Each call to this method overrides the file to be attached, and the file has to be available locally at the provided
 path when the report is being sent.
 
 @param fileLocation Path to a file that's going to be attached to each report.
 */
+ (void)setFileAttachment:(NSString *)fileLocation DEPRECATED_MSG_ATTRIBUTE("Use addFileAttachmentWithURL: instead.");

/**
 @brief Attaches a file to each report being sent.
 
 @deprecated Use `addFileAttachmentWithURL:` instead.

 @discussion A new copy of the file at fileURL will be attached with each bug report being sent. The file is only copied
 at the time of sending the report, so you could safely call this API whenever the file is available on disk, and the copy
 attached to your bug reports will always contain that latest changes at the time of sending the report.
 
 Each call to this method overrides the file to be attached, and the file has to be available locally at the provided 
 path when the report is being sent.
 
 @param fileURL Path to a file that's going to be attached to each report.
 */
+ (void)setFileAttachmentWithURL:(NSURL *)fileURL DEPRECATED_MSG_ATTRIBUTE("Use addFileAttachmentWithURL: instead.");


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
 @brief Attaches user data to each report being sent.
 
 @discussion Each call to this method overrides the user data to be attached.
 Maximum size of the string is 1,000 characters.
 
 @param userData A string to be attached to each report, with a maximum size of 1,000 characters.
 */
+ (void)setUserData:(NSString *)userData;

/**
 @brief Sets whether the SDK is tracking user steps or not.
 
 @discussion Enabling user steps would give you an insight on the scenario a user has performed before encountering a
 bug or a crash. User steps are attached with each report being sent.
 
 User Steps tracking is enabled by default if it's available in your current plan.
 
 @param isUserStepsEnabled A boolean to set user steps tracking to being enabled or disabled.
 */
+ (void)setUserStepsEnabled:(BOOL)isUserStepsEnabled;

/**
 @brief Sets whether to track and report crashes or not.
 
 @discussion When enabled, Instabug will automatically report crashes, which can be viewed later on from your dashboard.
 
 Crash reporting is enabled by default if it's available in your current plan.
 
 @param isReportingCrashes A boolean to set crash reporting to being enabled or disabled.
 */
+ (void)setCrashReportingEnabled:(BOOL)isReportingCrashes;

/**
 @brief Sets whether In-App Conversations button and notifications are displayed or not.
 
 @deprecated Starting from v6.0, use `setPromptOptionsEnabled:` instead.
 
 @discussion When In-App Conversations are disabled, push notifications are disabled as well.

 In-App Conversations is enabled by default if it's available in your current plan.

 @param isInAppConversationsEnabled A boolean to set In-App Conversations to being enabled or disabled.
 */
+ (void)setInAppConversationsEnabled:(BOOL)isInAppConversationsEnabled DEPRECATED_MSG_ATTRIBUTE("Starting from v6.0, use setPromptOptionsEnabled: instead.");

/**
 @brief Sets a block of code to be executed before sending each report.
 
 @deprecated Starting from v6.0, use `setPreSendingHandler:` instead.
 
 @discussion This block is executed in the background before sending each report. Could be useful for attaching logs
 and extra data to reports.
 
 @param preSendingBlock A block of code that gets executed before sending each bug report.
 */
+ (void)setPreSendingBlock:(void (^)(void))preSendingBlock DEPRECATED_MSG_ATTRIBUTE("Starting from v6.0, use setPreSendingHandler: instead.");

/**
 @brief Sets a block of code to be executed before sending each report.

 @discussion This block is executed in the background before sending each report. Could be used for attaching logs
 and extra data to reports.
 
 @param preSendingHandler A block of code that gets executed before sending each bug report.
 */
+ (void)setPreSendingHandler:(void (^)(void))preSendingHandler;

/**
 @brief Sets a block of code to be executed just before the SDK's UI is presented.
 
 @deprecated Starting from v6.0, use `setPreInvocationHandler:` instead.
 
 @discussion This block is executed on the UI thread. Could be used for performing any UI changes before the SDK's UI 
 is shown.

 @param preInvocationBlock A block of code that gets executed before presenting the SDK's UI.
 */
+ (void)setPreInvocationBlock:(void (^)(void))preInvocationBlock DEPRECATED_MSG_ATTRIBUTE("Starting from v6.0, use setPreInvocationHandler: instead.");

/**
 @brief Sets a block of code to be executed just before the SDK's UI is presented.
 
 @discussion This block is executed on the UI thread. Could be used for performing any UI changes before the SDK's UI
 is shown.
 
 @param preInvocationHandler A block of code that gets executed before presenting the SDK's UI.
 */
+ (void)setPreInvocationHandler:(void (^)(void))preInvocationHandler;

/**
 @brief Sets a block of code to be executed right after the SDK's UI is dismissed.
 
 @deprecated Starting from v6.0, use `setPostInvocationHandler:` instead.
 
 @discussion This block is executed on the UI thread. Could be used for performing any UI changes after the SDK's UI
 is dismissed.
 
 @param postInvocationBlock A block of code that gets executed after the SDK's UI is dismissed.
 
 The block has the following parameters:
 
 - issueState: The state of the issue after the SDK has been dismissed. Indicates whether the issues has been submitted,
 cancelled, or still in progress.
 - feedbackType: Type of feedback that has been sent. Will be set to IBGFeedbackTypeBug in case the SDK has been 
 dismissed without selecting a report type, so you might need to check issueState before feedbackType.
 
 @see IBGIssueState, IBGFeedbackType
 */
+ (void)setPostInvocationBlock:(void (^)(IBGIssueState issueState, IBGFeedbackType feedbackType))postInvocationBlock DEPRECATED_MSG_ATTRIBUTE("Starting from v6.0, use setPostInvocationHandler: instead.");

/**
 @brief Sets a block of code to be executed right after the SDK's UI is dismissed.
 
 @discussion This block is executed on the UI thread. Could be used for performing any UI changes after the SDK's UI
 is dismissed.
 
 @param postInvocationHandler A block of code that gets executed after the SDK's UI is dismissed.
 
 The block has the following parameters:
 
 - dismissType: How the SDK was dismissed.
 - reportType: Type of report that has been sent. Will be set to IBGReportTypeBug in case the SDK has been dismissed
 without selecting a report type, so you might need to check dismissType before reportType.
 
 @see IBGReportType, IBGDismissType
 */
+ (void)setPostInvocationHandler:(void (^)(IBGDismissType dismissType, IBGReportType reportType))postInvocationHandler;

/**
 @brief Sets a block of code to be executed when a prompt option is selected

 @param didSelectPromptOptionHandler A block of code that gets executed when a prompt option is selected.
 
 The block has the following parameters:
 - prompOption: The option selected in prompt.
*/
+ (void)setDidSelectPromptOptionHandler:(void (^)(IBGPromptOption promptOption))didSelectPromptOptionHandler;

/**
 @brief Present a view that educates the user on how to invoke the SDK with the currently set invocation event.
 
 @discussion Does nothing if invocation event is set to anything other than IBGInvocationEventShake or IBGInvocationEventScreenshot.
 */
+ (void)showIntroMessage;

/**
 @brief Enables/disables the attachment of an initial screenshot when reporting a bug/improvement.
 
 @deprecated Starting from v6.0, use 
 `setAttachmentTypesEnabledScreenShot:extraScreenShot:galleryImage:voiceNote:screenRecording:` instead.
 
 @param willTakeScreenshot A boolean to set whether attachment of an initial screenshot is enabled or disabled.
 */
+ (void)setWillTakeScreenshot:(BOOL)willTakeScreenshot DEPRECATED_MSG_ATTRIBUTE("Starting from v6.0, use setAttachmentTypesEnabledScreenShot:extraScreenShot:galleryImage:voiceNote:screenRecording: instead.");

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
 @brief Sets the default value of the user's email and hides the email field from the reporting UI.

 @discussion Defaults to an empty string.

 @param userEmail An email address to be set as the user's email.
 */
+ (void)setUserEmail:(NSString *)userEmail DEPRECATED_MSG_ATTRIBUTE("Use identifyUserWithEmail:Name: instead.");

/**
 @brief Sets the default value of the user's name to be included with all reports.
 
 @discussion Defaults to an empty string.

 @param userName Name of the user to be set.
 */
+ (void)setUserName:(NSString *)userName DEPRECATED_MSG_ATTRIBUTE("Use identifyUserWithEmail:Name: instead.");

/**
 @brief Shows/Hides email field.

 @discussion Defaults to show email field.

 @param isShowingEmailField YES to show the email field, NO to hide it.
 */
+ (void)setShowEmailField:(BOOL)isShowingEmailField;

/**
 @brief Enables/disables screenshot view when reporting a bug/improvement.
 
 @deprecated Starting from v6.0, use `setWillSkipScreenshotAnnotation:` instead.
 
 @discussion By default, screenshot view is shown when reporting a bug, but not when sending feedback.
 
 @param willShowScreenshotView A boolean to set whether screenshot view is shown or not. Passing YES will show
 screenshot view for both feedback and bug reporting, while passing NO will disable it for both.
 */
+ (void)setWillShowScreenshotView:(BOOL)willShowScreenshotView DEPRECATED_MSG_ATTRIBUTE("Starting from v6.0, use setWillSkipScreenshotAnnotation: instead.");

/**
 @brief Enables/disables screenshot view when reporting a bug/improvement.
 
 @discussion By default, screenshot view is shown when reporting a bug, but not when sending feedback.
 
 @param willSkipScreenShot A boolean to set whether screenshot view is shown or not. Passing YES will show
 screenshot view for both feedback and bug reporting, while passing NO will disable it for both.
 */
+ (void)setWillSkipScreenshotAnnotation:(BOOL)willSkipScreenShot;

/**
 @brief Returns the number of unread messages the user currently has.
 
 @discussion Use this method to get the number of unread messages the user has, then possibly notify them about it with
 your own UI.
 
 @return Notifications count, or -1 incase the SDK has not been initialized.
 */
+ (NSInteger)getUnreadMessagesCount;

/// ------------------
/// @name SDK Settings
/// ------------------

/**
 @brief Sets the event that invoke the feedback form.

 @discussion Default is set by `startWithToken:invocationEvent:`.
 
 @param invocationEvent Event that invokes the feedback form.
 
 @see IBGInvocationEvent
 */
+ (void)setInvocationEvent:(IBGInvocationEvent)invocationEvent;

/**
 @brief Sets the default SDK invocation mode.
 
 @deprecated Starting from v6.0, use `setPromptOptionsEnabledWithBug:feedback:chat:` instead.

 @discussion Defaults to IBGInvocationModeNA.
 
 @param invocationMode A mode that's used to invoke the SDK.
 
 @see IBGInvocationMode
 */
+ (void)setDefaultInvocationMode:(IBGInvocationMode)invocationMode DEPRECATED_MSG_ATTRIBUTE("Starting from v6.0, use setPromptOptionsEnabledWithBug:feedback:chat: instead");

/**
 @brief Enables/disables the use of push notifications in the SDK.

 @discussion In order to enable push notifications, implement 
 `-[UIApplicationDelegate application:didRegisterForRemoteNotificationsWithDeviceToken:]` and either
 `-[UIApplicationDelegate application:didReceiveRemoteNotification]` or
 `-[UIApplicationDelegate application:didReceiveRemoteNotification:fetchCompletionHandler:]`.
 
 Defaults to YES.
 
 @param isPushNotificationsEnabled A boolean to indicate whether push notifications are enabled or disabled.
 */
+ (void)setPushNotificationsEnabled:(BOOL)isPushNotificationsEnabled;

/**
 @brief Sets whether users are required to enter an email address or not when sending reports.

 @discussion Defaults to YES.

 @param isEmailFieldRequired A boolean to indicate whether email field is required or not.
 */
+ (void)setEmailFieldRequired:(BOOL)isEmailFieldRequired;

/**
 @brief Sets whether users are required to enter a comment or not when sending reports.
 
 @discussion Defaults to NO.
 
 @param isCommentFieldRequired A boolean to indicate whether comment field is required or not.
 */
+ (void)setCommentFieldRequired:(BOOL)isCommentFieldRequired;

/**
 @brief Sets the threshold value of the shake gesture for iPhone/iPod Touch and iPad.
 
 @discussion Default for iPhone is 2.5.
 Default for iPad is 0.6.
 
 @param iPhoneShakingThreshold Threshold for iPhone.
 @param iPadShakingThreshold Threshold for iPad.
 */
+ (void)setShakingThresholdForiPhone:(double)iPhoneShakingThreshold foriPad:(double)iPadShakingThreshold;

/**
 @brief Sets the default edge and offset from the top at which the floating button will be shown. Different orientations
 are already handled.
 
 @discussion Default for `floatingButtonEdge` is `CGRectMaxXEdge`.
 Default for `floatingButtonOffsetFromTop` is 50
 
 @param floatingButtonEdge `CGRectMaxXEdge` to show on the right, or `CGRectMinXEdge` to show on the left.
 @param floatingButtonOffsetFromTop Top offset for floating button.
 */
+ (void)setFloatingButtonEdge:(CGRectEdge)floatingButtonEdge withTopOffset:(double)floatingButtonOffsetFromTop;

/**
 @brief Sets the SDK's locale.
 
 @discussion Use to change the SDK's UI to different language.
 Defaults to the device's current locale.
 
 @param locale A locale to set the SDK to.
 
 @see IBGLocale
 */
+ (void)setLocale:(IBGLocale)locale;

/**
 @brief Sets whether the intro message that gets shown on launching the app is enabled or not.

 @discussion Defaults to YES.
 
 @param isIntroMessageEnabled A boolean to indicate whether the intro message is enabled or not.
 */
+ (void)setIntroMessageEnabled:(BOOL)isIntroMessageEnabled;

/**
 @brief Sets whether to show a "Thank You" dialog after a bug report is sent or not.
 
 @discussion Defaults to YES.
 
 @param isPostSendingDialogEnabled A boolean to indicate whether the dialog is enabled or not.
 */
+ (void)setPostSendingDialogEnabled:(BOOL)isPostSendingDialogEnabled;

/**
 @brief Sets the color theme of the SDK's whole UI.

 @param colorTheme An `IBGColorTheme` to set the SDK's UI to.
 
 @see IBGColorTheme
 */
+ (void)setColorTheme:(IBGColorTheme)colorTheme;

/**
 @brief Sets the primary color of the SDK's UI.
 
 @discussion Sets the color of UI elements indicating interactivity or call to action.

 @param color A color to set the UI elements of the SDK to.
 */
+ (void)setPrimaryColor:(UIColor *)color;

/**
 @brief Sets a block of code that is used to capture a screenshot.
 
 @deprecated Starting from v6.0, use `setScreenshotCapturingHandler:` instead.
 
 @discussion Should only be used if your app uses OpenGL.
 
 @param screenshotCapturingBlock A block of code that's going to be used to capture screenshots.
 */
+ (void)setScreenshotCapturingBlock:(UIImage *(^)(void))screenshotCapturingBlock DEPRECATED_MSG_ATTRIBUTE("Starting from v6.0, use setScreenshotCapturingHandler: instead.");

/**
 @brief Sets a block of code that is used to capture a screenshot.
 
 @discussion Should only be used if your app uses OpenGL.
 
 @param screenshotCapturingHandler A block of code that's going to be used to capture screenshots.
 */
+ (void)setScreenshotCapturingHandler:(UIImage *(^)(void))screenshotCapturingHandler;

/**
 @brief Appends a set of tags to previously added tags of reported feedback, bug or crash.
 
 @deprecated Starting from v6.0, use `appendTags:` instead.
 
 @param tag A set of tags.
 @param ... ...
 */
+ (void)addTags:(NSString *)tag, ... NS_REQUIRES_NIL_TERMINATION DEPRECATED_MSG_ATTRIBUTE("Starting from v6.0, use appendTags: instead.");

/**
 @brief Appends a set of tags to previously added tags of reported feedback, bug or crash.
 
 @deprecated Starting from v6.0, use `appendTags:` instead.
 
 @discussion This method is identical to `+ [Instabug addtags:]`, but is meant to be used from Swift.
 
 To use this method from Swift, you will need to add the following code to the class that's going to call it.
 
 ```
 func addTags(str: String, _ arguments: CVarArgType...) -> Void {
    return withVaList(arguments) { Instabug.addTags(str, withArguments :$0) }
 }
 ```
 And then call addTags("tag 1", "tag 2", "tag 3").
 
 @param tag tag
 @param arguments arguments
 */
+ (void)addTags:(NSString *)tag withArguments:(va_list)arguments DEPRECATED_MSG_ATTRIBUTE("Starting from v6.0, use appendTags: instead.");

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
 
 @deprecated Use `setValue:forStringWithKey:` instead.
 
 @discussion Allows you to customize any of the strings shown to users in the SDK.
 
 @param value String value to override the default one.
 @param key Key of string to override.
 
 @see IBGString
 */
+ (void)setString:(NSString*)value toKey:(IBGString)key DEPRECATED_MSG_ATTRIBUTE("Use setValue:forStringWithKey: instead.");

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
 @brief Sets whether attachments in bug reporting and in-app messaging are enabled or not.
 
 @param screenShot A boolean to enable or disable screenshot attachments.
 @param extraScreenShot A boolean to enable or disable extra screenshot attachments.
 @param galleryImage A boolean to enable or disable gallery image attachments. In iOS 10+, NSPhotoLibraryUsageDescription should be set in info.plist to enable gallery image attachments.
 @param voiceNote A boolean to enable or disable voice note attachments. In iOS 10+, NSMicrophoneUsageDescription should be set in info.plist to enable voiceNote attachments.
 @param screenRecording A boolean to enable or disable screen recording attachments.
 */
+ (void)setAttachmentTypesEnabledScreenShot:(BOOL)screenShot
                            extraScreenShot:(BOOL)extraScreenShot
                               galleryImage:(BOOL)galleryImage
                                  voiceNote:(BOOL)voiceNote
                            screenRecording:(BOOL)screenRecording;

/**
 @brief Enables/disables showing in-app notifications when the user receives a new message.
 
 @param chatNotificationEnabled A boolean to set whether notifications are enabled or disabled.
 */
+ (void)setChatNotificationEnabled:(BOOL)chatNotificationEnabled;

/**
 @brief Sets a block of code that gets executed when a new message is received.

 @param onNewMessageHandler A block of code that gets executed when a new message is received.
 */
+ (void)setOnNewMessageHandler:(void (^)(void))onNewMessageHandler;

/**
 @brief Enables/disables prompt options when SDK is invoked.
 
 @discussion When only a single option is enabled, it become the default invocation mode. 
 If all options are disabled, bug reporting becomes the default invocation mode.
 
 By default, all three options are enabled.
 
 @param bugReportEnabled A boolean to indicate whether bug reports are enabled or disabled.
 @param feedbackEnabled A boolean to indicate whether feedback is enabled or disabled.
 @param chatEnabled A boolean to indicate whether chat is enabled or disabled.
 */
+ (void)setPromptOptionsEnabledWithBug:(BOOL)bugReportEnabled feedback:(BOOL)feedbackEnabled chat:(BOOL)chatEnabled;

/**
 @brief Sets an array of report categories to be shown for users to select from before reporting a bug or sending 
 feedback.
 
 @discussion Use this method to give users a list of choices of categories their bug report or feedback might be related
 to. Selected category will be shown as a tag on your dashboard.

 @param titles Array of titles to be shown in the list.
 @param names Array of names of icons to be shown along with titles. Use the same names you would use
 with `+ [UIImage imageNamed:]`.
 */
+ (void)setReportCategoriesWithTitles:(NSArray<NSString *> *)titles iconNames:(nullable NSArray<NSString *> *)names;

/**
 @brief Sets an array of report categories to be shown for users to select from before reporting a bug or sending
 feedback.
 
 @discussion Use this method to give users a form after reporting a bug to be filled and sent inside description.
 
 @param title extra field key.
 @param required determine whether this field is required or not.
 */
+ (void)addExtraReportFieldWithTitle:(NSString *)title required:(BOOL)required;

/**
 @brief Remove all extra fields.
 
 @discussion Use this method to remove all added extra fields.
  */
+ (void)removeExtraReportFields;

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

/**
 @brief Enables/disables inspect view hierarchy when reporting a bug/feedback.
 
 @param viewHierarchyEnabled A boolean to set whether view hierarchy are enabled or disabled.
 */
+ (void)setViewHierarchyEnabled:(BOOL)viewHierarchyEnabled;

/// -------------------
/// @name SDK Reporting
/// -------------------

/**
 @brief Report an exception manually.
 
 @param exception Exception to be reported.
 */
+ (void)reportException:(NSException *)exception;

/**
 @brief Report an error manually.
 
 @param error error to be reported.
 */
+ (void)reportError:(NSError *)error;

/// --------------------------
/// @name In-App Conversations
/// --------------------------

/**
 @brief Invokes the SDK and shows the conversations view.
 
 @deprecated Starting from v6.0, use `invokeWithInvocationMode:` instead.
 */
+ (void)invokeConversations DEPRECATED_MSG_ATTRIBUTE("Starting from v6.0, use invokeWithInvocationMode: instead.");

/// ------------------------
/// @name Push Notifications
/// ------------------------

/**
 @brief Checks if a notification is from Instabug.
 
 @discussion If you are using push notifications, use this method to check whether an incoming notification is from
 Instabug or not. If this method returns YES, you should call didReceiveRemoteNotification: to let the Instabug handle
 the notification. Otherwise, handle the notification on your own.
 
 @param notification userInfo dictionary received in `-[UIApplicationDelegate application:didReceiveRemoteNotification:]`.
 
 @return YES if notification is from Instabug.
 */
+ (BOOL)isInstabugNotification:(NSDictionary *)notification;

/**
 @brief Use this method to set Apple Push Notification token to enable receiving Instabug push notifications.
 
 @discussion You should call this method after receiving token in 
 `-[UIApplicationDelegate didRegisterForRemoteNotificationsWithDeviceToken:]` and pass received token.
 
 @param deviceToken Device token received in `-[UIApplicationDelegate didRegisterForRemoteNotificationsWithDeviceToken:]`
 */
+ (void)didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken;

/**
 @brief Call this method and pass the notification's userInfo dictionary to allow Instabug to handle its remote notifications.
 
 @discussion Instabug will check if notification is from Instabug's servers and only handle it if it is.
 You should call this method in -[UIApplicationDelegate application:didReceiveRemoteNotification:] and pass received userInfo
 dictionary, or `-[UIApplicationDelegate application:didFinishLaunchingWithOptions:]` and pass
 `[launchOptions objectForKey:UIApplicationLaunchOptionsRemoteNotificationKey]`.
 
 @param userInfo userInfo dictionary from `-[UIApplicationDelegate application:didReceiveRemoteNotification:]` or
 `[launchOptions objectForKey:UIApplicationLaunchOptionsRemoteNotificationKey]` from
 `-[UIApplicationDelegate application:didFinishLaunchingWithOptions:]`.
 */
+ (void)didReceiveRemoteNotification:(NSDictionary *)userInfo;

/**
 @brief Logs a user event that happens through the lifecycle of the application.
 
 @discussion Logged user events are going to be sent with each report, as well as at the end of a session.
 
 @param name Event name.
 */
+ (void)logUserEventWithName:(NSString *)name;

/**
 @brief Logs a user event that happens through the lifecycle of the application.
 
 @discussion Logged user events are going to be sent with each report, as well as at the end of a session.
 
 @param name Event name.
 @param params An optional dictionary or parameters to be associated with the event. Make sure it's JSON serializable.
 */
+ (void)logUserEventWithName:(NSString *)name params:(nullable NSDictionary *)params;

#pragma mark - IBGLog

/**
 @brief Adds custom logs that will be sent with each report.
 
 @discussion Can be used in a similar fashion to NSLog. Logs are added with the debug log level.
 For usage in Swift, see `Instabug.ibgLog()`.
 
 @param format Format string.
 @param ... Optional varargs arguments.
 */
OBJC_EXTERN void IBGLog(NSString *format, ...) NS_FORMAT_FUNCTION(1, 2);

/**
 @brief Adds custom logs with the verbose log level. Logs will be sent with each report.
 
 @discussion Can be used in a similar fashion to NSLog. For usage in Swift, see `Instabug.logVerbose()`.
 
 @param format Format string.
 @param ... Optional varargs arguments.
 */
OBJC_EXTERN void IBGLogVerbose(NSString *format, ...) NS_FORMAT_FUNCTION(1, 2);

/**
 @brief Adds custom logs with the debug log level. Logs will be sent with each report.
 
 @discussion Can be used in a similar fashion to NSLog. For usage in Swift, see `Instabug.logDebug()`.
 
 @param format Format string.
 @param ... Optional varargs arguments.
 */
OBJC_EXTERN void IBGLogDebug(NSString *format, ...) NS_FORMAT_FUNCTION(1, 2);

/**
 @brief Adds custom logs with the info log level. Logs will be sent with each report.
 
 @discussion Can be used in a similar fashion to NSLog. For usage in Swift, see `Instabug.logInfo()`.
 
 @param format Format string.
 @param ... Optional varargs arguments.
 */
OBJC_EXTERN void IBGLogInfo(NSString *format, ...) NS_FORMAT_FUNCTION(1, 2);

/**
 @brief Adds custom logs with the warn log level. Logs will be sent with each report.
 
 @discussion Can be used in a similar fashion to NSLog. For usage in Swift, see `Instabug.logWarn()`.
 
 @param format Format string.
 @param ... Optional varargs arguments.
 */
OBJC_EXTERN void IBGLogWarn(NSString *format, ...) NS_FORMAT_FUNCTION(1, 2);

/**
 @brief Adds custom logs with the error log level. Logs will be sent with each report.
 
 @discussion Can be used in a similar fashion to NSLog. For usage in Swift, see `Instabug.logError()`.
 
 @param format Format string.
 @param ... Optional varargs arguments.
 */
OBJC_EXTERN void IBGLogError(NSString *format, ...) NS_FORMAT_FUNCTION(1, 2);

/**
 @brief Used to reroute all your NSLogs to Instabug to be able to automatically include them with reports.
 
 @discussion For details on how to reroute your NSLogs to Instabug, see https://docs.instabug.com/docs/ios-logging
 
 @param format Format string.
 @param args Arguments list.
 */
OBJC_EXTERN void IBGNSLog(NSString *format, va_list args) DEPRECATED_MSG_ATTRIBUTE("Use IBGNSLogWithLevel instead");

/**
 @brief Used to reroute all your NSLogs to Instabug with their log level to be able to automatically include them with reports.
 
 @discussion For details on how to reroute your NSLogs to Instabug, see https://docs.instabug.com/docs/ios-logging
 
 @param format Format string.
 @param args Arguments list.
 @param logLevel log level.
 */
OBJC_EXTERN void IBGNSLogWithLevel(NSString *format, va_list args, IBGLogLevel logLevel);

/**
 @brief Adds custom logs that will be sent with each report. Logs are added with the debug log level.
 
 @param log Message to be logged.
 */
+ (void)IBGLog:(NSString *)log;

/**
 @brief Adds custom logs with the verbose log level. Logs will be sent with each report.
 
 @param log Message to be logged.
 */
+ (void)logVerbose:(NSString *)log;

/**
 @brief Adds custom logs with the debug log level. Logs will be sent with each report.
 
 @param log Message to be logged.
 */
+ (void)logDebug:(NSString *)log;

/**
 @brief Adds custom logs with the info log level. Logs will be sent with each report.
 
 @param log Message to be logged.
 */
+ (void)logInfo:(NSString *)log;

/**
 @brief Adds custom logs with the warn log level. Logs will be sent with each report.
 
 @param log Message to be logged.
 */
+ (void)logWarn:(NSString *)log;

/**
 @brief Adds custom logs with the error log level. Logs will be sent with each report.
 
 @param log Message to be logged.
 */
+ (void)logError:(NSString *)log;

/**
 @brief Sets whether IBGLog should also print to Xcode's console log or not.
 
 @discussion Defaults to YES.
 
 @param enabled A boolean to set whether printing to Xcode's console is enabled or not.
 */
+ (void)setIBGLogPrintsToConsole:(BOOL)enabled;

/**
 @brief Clear all Logs.
 
 @discussion Clear all Instabug logs, console logs, network logs and user steps.
 
 */
+ (void)clearAllLogs;

#pragma mark - Network Logging

/**
 @brief Sets whether to log network requests or not.
 
 @discussion When enabled, Instabug will automtically log all network requests and responses. Logs are attached to
 each report being sent and are available on your Instabug dashboard.
 
 Networking logging is enabled by default if it's available in your current plan.
 
 @param isNetworkLoggingEnabled A boolean to set network logging to be enabled to disabled.
 */
+ (void)setNetworkLoggingEnabled:(BOOL)isNetworkLoggingEnabled;

/**
 @brief Specify an NSPredicate to be used to omit certain requests from being logged.
 
 @deprecated Use `setNetworkLoggingRequestFilterPredicate:responseFilterPredicate:` instead.
 
 @discussion Predicate will be matched against an `NSURLRequest`. This can be used to filter out requests to a specific
 domain for example.
 
 @param filterPredicate An NSPredicate to match against an NSURLRequest. Matching requests will be omitted.
 */
+ (void)setNetworkLoggingFilterPredicate:(NSPredicate *)filterPredicate DEPRECATED_MSG_ATTRIBUTE("Use setNetworkLoggingRequestFilterPredicate:responseFilterPredicate: instead.");

/**
 @brief Specify NSPredicates to be used to omit certain network requests from being logged based on their request or
 response objects.
 
 @discussion `requestFilterPredicate` will be matched against an `NSURLRequest`. It can be used to filter out requests 
 to a specific domain for example.
 
 `responseFilterPredicate` will be matched against an `NSHTTPURLResponse`. It can be used to filter out responses that 
 match specific status codes.
 
 If both predicates are specified, `requestFilterPredicate` is evaluated first, if it matches, the request is omitted
 from logging without evaluating `responseFilterPredicate`.
 
 @param requestFilterPredicate An NSPredicate to match against an NSURLRequest. Matching requests will be omitted.
 @param responseFilterPredicate An NSPredicate to match against an NSHTTPURLResponse. Matching responses will be omitted.
 */
+ (void)setNetworkLoggingRequestFilterPredicate:(nullable NSPredicate *)requestFilterPredicate responseFilterPredicate:(nullable NSPredicate *)responseFilterPredicate;

/**
 @brief Enable logging for network requests and responses on a custom NSURLSessionConfiguration.
 
 @discussion Logging for network requests and responses may not work if you're using a custom `NSURLSession` object.
 If this is the case, call this method passing in your custom NSURLSessions's configuration to enable logging for it.
 
 @param URLSessionConfiguration The NSURLSessionConfiguration of your custom NSURLSession.
 */
+ (void)enableLoggingForURLSessionConfiguration:(NSURLSessionConfiguration *)URLSessionConfiguration;

/**
 @brief Set HTTP body of a POST request to be included in network logs.
 @deprecated Now body of a POST request is captured automatcailly you don't have to log it manually
 @discussion Due to a bug in Foundation, it's not possible to retrieve the body of POST requests automatically. Use
 this method to include the body of your POST requests in network logs.
 
 If you'd like to exclude or obfuscate user sensitive data in the request body, this is also the place to do it.
 
 @param body Body data of a POST request.
 @param request The POST request that is being sent.
 */
+ (void)logHTTPBody:(NSData *)body forRequest:(NSMutableURLRequest *)request DEPRECATED_MSG_ATTRIBUTE("Request body is now captured automatically");

/**
 @brief Use to obfuscate a URL that's going to be included in network logs.
 
 @discussion Use this method if you make requests that include user sensitive data in the URL (like authentication tokens
 for example), and you'd like to hide those from your network logs. 
 
 The provided block will be called for every request. You should do whatever processing you need to do on the URL inside
 that block, then return a URL to be included in network logs.

 @param obfuscationHandler A block that obfuscates the passed URL and returns it.
 */
+ (void)setNetworkLoggingURLObfuscationHandler:(nonnull NSURL * (^)(NSURL * _Nonnull url))obfuscationHandler DEPRECATED_MSG_ATTRIBUTE("Use setNetworkLogRequestObfuscationHandler: instead");

/**
 @brief Use to obfuscate a request that's going to be included in network logs.
 
 @discussion Use this method if you want to make any modifications to requests before it is added to the network log.
 This won't be applied to already filtered requests
 
 Note that thsese changes doesn't affect the actual request.
 
 The provided block will be called for every request. You should do whatever processing you need to do on the request inside
 that block, then return a request to be included in network logs.
 
 This method usage overrides modifications made by `setNetworkLoggingURLObfuscationHandler:`.
 
 @param obfuscationHandler A block that takes a request and returns a new modified one to be logged..
 */
+ (void)setNetworkLogRequestObfuscationHandler:(nonnull NSURLRequest * (^)(NSURLRequest * _Nonnull request))obfuscationHandler;

/**
 @brief Use to obfuscate a request's response that's going to be included in network logs.
 
 @discussion Use this method if you want to make any modifications to a request's respone and its data before it's 
 added to network logs.
 
 The provided block will be called for every response. You should do whatever processing you need to do on the response
 and data inside that block, then return response and data to be included in network logs. Changes you make to the 
 response and its data only affect network logs, not the actual response.
 
 @param obfuscationHandler A block that takes the original response, its data and a return block as parameters. The 
 return block should be called with the modified data and response.
 */
+ (void)setNetworkLogResponseObfuscationHandler:(void (^)(NSData * _Nullable responseData, NSURLResponse * _Nonnull response, NetworkObfuscationCompletionBlock returnBlock))obfuscationHandler;

/**
 @brief Use to get callbacks about progress of sending body content of a particular request when networking logging is
 enabled.
 
 @discussion The provided block will get periodical callbacks about the progress of sending the body content of a request.
  
 @param URL URL which will be attached with requestProgressHandler.
 @param requestProgressHandler A block that will be called for the requestURL when SDK intercept that request.

 */
+ (void)setProgressHandlerForRequestURL:(nonnull NSURL *)URL
                        progressHandler:(nonnull void (^)(NSURLSessionTask *task, int64_t bytesSent, int64_t totalBytesSent, int64_t totalBytesExpectedToSend))requestProgressHandler;

/**
 @brief Used to ask whether your app is prepared to handle a particular authentication challenge. Can be called on any thread.
 
 @discussion Set this block if your app implements SSL pinning and you have network logging enabled.
 
 @param protectionSpaceHandler A block that takes the protection space for the authentication challenge and should return
 true or false.
 */
+ (void)setCanAuthenticateAgainstProtectionSpaceHandler:(BOOL(^)(NSURLProtectionSpace *protectionSpace))protectionSpaceHandler;

/**
 @brief Used to process an authentication challenge and return an NSURLCredential object.
 
 @discussion Set this block if your app implements SSL pinning and you have network logging enabled.
 
 @param reciveChallengeHandler A block that takes the authentication challenge and returns NSURLCredential.
 */
+ (void)setDidReceiveAuthenticationChallengeHandler:(NSURLCredential* (^)(NSURLAuthenticationChallenge *challenge))reciveChallengeHandler;

#pragma mark - Surveys

/**
 @brief Sets whether auto surveys showing are enabled or not.
 
 @discussion If you disable surveys auto showing on the SDK but still have active surveys on your Instabug dashboard, those surveys are still going to be sent to the device, but are not going to be shown automatically.
 
 To manually display any available surveys, call `+ [Instabug showSurveyIfAvailable]`.
 
 Defaults to NO.
 
 @param autoShowingSurveysEnabled A boolean to indicate whether the surveys auto showing are enabled or not.
 */
+ (void)setAutoShowingSurveysEnabled:(BOOL)autoShowingSurveysEnabled;

/**
 @brief Sets whether surveys are enabled or not.
 
 @discussion  if you disable surveys feature. all survey's methods won't perform untile this flage is enabled again.
 
 Defaults to YES.
 
 @param surveysEnabled A boolean to indicate whether the survey feature is enabled or not.
 */
+ (void)setSurveysEnabled:(BOOL)surveysEnabled;

/**
 @brief Shows one of the surveys that were not shown before, that also have conditions that match the current device/user.
 
 @discussion Does nothing if there are no available surveys.
 */
+ (void)showSurveyIfAvailable;

/**
 @brief Returns true if there are any surveys that match the current device/user.
 */
+ (BOOL)hasAvailableSurveys;

/**
 @brief Sets a block of code to be executed just before the survey's UI is presented.
 
 @discussion This block is executed on the UI thread. Could be used for performing any UI changes before the survey's UI
 is shown.
 
 @param willShowSurveyHandler A block of code that gets executed before presenting the survey's UI.
 */
+ (void)setWillShowSurveyHandler:(void (^)(void))willShowSurveyHandler;

/**
 @brief Sets a block of code to be executed right after the survey's UI is dismissed.
 
 @discussion This block is executed on the UI thread. Could be used for performing any UI changes after the survey's UI
 is dismissed.
 
 @param didShowSurveyHandler A block of code that gets executed after the survey's UI is dismissed.
 */
+ (void)setDidDismissSurveyHandler:(void (^)(void))didShowSurveyHandler;

#pragma mark - SDK Debugging

/**
 @brief Sets the verbosity level of logs used to debug the Instabug SDK itself.

 @param level Logs verbosity level.
 */
+ (void)setSDKDebugLogsLevel:(IBGSDKDebugLogsLevel)level;

@end
NS_ASSUME_NONNULL_END
