/*
 File:       Instabug/Instabug.h

 Contains:   API for using Instabug's SDK.

 Copyright:  (c) 2013-2018 by Instabug, Inc., all rights reserved.

 Version:    8.0.8
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
#import "UIView+Instabug.h"

/**
 This is the API for using Instabug's SDK. For more details about the SDK integration,
 please visit https://docs.instabug.com/docs/ios-integration
 */

NS_ASSUME_NONNULL_BEGIN

@interface Instabug : NSObject

/**
 @brief Sets whether the SDK is recording the screen or not.
 
 @discussion Enabling auto screen recording would give you an insight on the scenario a user has performed before encountering a bug or a crash. screen recording is attached with each report being sent.
 
 Auto screen recording is disabled by default.
 */
@property (class, atomic, assign) BOOL autoScreenRecordingEnabled;

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
@property (class, atomic, assign) CGFloat autoScreenRecordingDuration;

/**
 @brief Enables/disables inspect view hierarchy when reporting a bug/feedback.
 */
@property (class, atomic, assign) BOOL shouldCaptureViewHierarchy;

/**
 @brief Sets the primary color of the SDK's UI.
 
 @discussion Sets the color of UI elements indicating interactivity or call to action.
 */
@property (class, atomic, strong) UIColor *tintColor;

/**
 @brief Sets a block of code that gets executed when a new message is received.
 */
@property (class, atomic, strong) void (^didRecieveReplyHandler)(void);

/**
 @brief Sets a block of code to be executed before sending each report.
 
 @discussion This block is executed in the background before sending each report. Could be used for attaching logs
 and extra data to reports.
 
 @param willSendReportHandler A block of code that gets executed before sending each bug report.
 */
@property(class, atomic, strong) IBGReport*(^willSendReportHandler)(IBGReport *report);

/**
 @brief Enables/disables showing in-app notifications when the user receives a new message.
 */
@property (class, atomic, assign) BOOL replyNotificationsEnabled;

/**
 @brief Returns the number of unread messages the user currently has.
 
 @discussion Use this method to get the number of unread messages the user has, then possibly notify them about it with
 your own UI.
 
 @return Notifications count, or -1 incase the SDK has not been initialized.
 */
@property (class, atomic, assign, readonly) NSInteger unreadMessagesCount;


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

/// ------------------------
/// @name Push Notifications
/// ------------------------

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
+ (BOOL)didReceiveRemoteNotification:(NSDictionary *)userInfo;

#pragma mark - SDK Debugging

/// ------------------------
/// @name SDK Debugging
/// ------------------------

/**
 @brief Sets the verbosity level of logs used to debug the Instabug SDK itself.
 
 @discussion This API sets the verbosity level of logs used to debug The SDK. The defualt value in debug mode is IBGSDKDebugLogsLevelVerbose and in production is IBGSDKDebugLogsLevelError.
 */
@property (class, atomic, assign) IBGSDKDebugLogsLevel sdkDebugLogsLevel;

/*
 +------------------------------------------------------------------------+
 |                            Deprecated APIs                             |
 +------------------------------------------------------------------------+
 | The following section includes all deprecated APIs.                    |
 |                                                                        |
 | We've made a few changes to our APIs starting from version 8.0 to make |
 | them more intuitive and easily reachable.                              |
 |                                                                        |
 | While the APIs below still function, they will be completely removed   |
 | in a future release.                                                   |
 |                                                                        |
 | To adopt the new changes, please refer to our migration guide at:      |
 | https://docs.instabug.com/v1.0/docs/ios-migration-guide                |
 +------------------------------------------------------------------------+
*/

#define IBG_DEPRECATED_ATTRIBUTE DEPRECATED_MSG_ATTRIBUTE("See https://docs.instabug.com/v1.0/docs/ios-migration-guide for instructions on migrating to SDK v8.x APIs.")

+ (void)startWithToken:(NSString *)token invocationEvent:(IBGInvocationEvent)invocationEvent IBG_DEPRECATED_ATTRIBUTE;
+ (void)invoke IBG_DEPRECATED_ATTRIBUTE;
+ (void)invokeWithInvocationMode:(IBGInvocationMode)invocationMode IBG_DEPRECATED_ATTRIBUTE;
+ (void)dismiss IBG_DEPRECATED_ATTRIBUTE;
+ (void)setFileAttachment:(NSString *)fileLocation IBG_DEPRECATED_ATTRIBUTE;
+ (void)setFileAttachmentWithURL:(NSURL *)fileURL IBG_DEPRECATED_ATTRIBUTE;
+ (void)setUserStepsEnabled:(BOOL)isUserStepsEnabled IBG_DEPRECATED_ATTRIBUTE;
+ (void)setCrashReportingEnabled:(BOOL)isReportingCrashes IBG_DEPRECATED_ATTRIBUTE;
+ (void)setInAppConversationsEnabled:(BOOL)isInAppConversationsEnabled IBG_DEPRECATED_ATTRIBUTE;
+ (void)setPreSendingBlock:(void (^)(void))preSendingBlock IBG_DEPRECATED_ATTRIBUTE;
+ (void)setPreSendingHandler:(void (^)(void))preSendingHandler IBG_DEPRECATED_ATTRIBUTE;
+ (void)setPreInvocationBlock:(void (^)(void))preInvocationBlock IBG_DEPRECATED_ATTRIBUTE;
+ (void)setPreInvocationHandler:(void (^)(void))preInvocationHandler IBG_DEPRECATED_ATTRIBUTE;
+ (void)setPostInvocationBlock:(void (^)(IBGIssueState issueState, IBGFeedbackType feedbackType))postInvocationBlock IBG_DEPRECATED_ATTRIBUTE;
+ (void)setPostInvocationHandler:(void (^)(IBGDismissType dismissType, IBGReportType reportType))postInvocationHandler IBG_DEPRECATED_ATTRIBUTE;
+ (void)setDidSelectPromptOptionHandler:(void (^)(IBGPromptOption promptOption))didSelectPromptOptionHandler IBG_DEPRECATED_ATTRIBUTE;
+ (void)showIntroMessage IBG_DEPRECATED_ATTRIBUTE;
+ (void)setWillTakeScreenshot:(BOOL)willTakeScreenshot IBG_DEPRECATED_ATTRIBUTE;
+ (void)setUserEmail:(NSString *)userEmail IBG_DEPRECATED_ATTRIBUTE;
+ (void)setUserName:(NSString *)userName IBG_DEPRECATED_ATTRIBUTE;
+ (void)setShowEmailField:(BOOL)isShowingEmailField IBG_DEPRECATED_ATTRIBUTE;
+ (void)setWillShowScreenshotView:(BOOL)willShowScreenshotView IBG_DEPRECATED_ATTRIBUTE;
+ (void)setWillSkipScreenshotAnnotation:(BOOL)willSkipScreenShot IBG_DEPRECATED_ATTRIBUTE;
+ (NSInteger)getUnreadMessagesCount IBG_DEPRECATED_ATTRIBUTE;
+ (void)setInvocationEvent:(IBGInvocationEvent)invocationEvent IBG_DEPRECATED_ATTRIBUTE;
+ (void)setDefaultInvocationMode:(IBGInvocationMode)invocationMode IBG_DEPRECATED_ATTRIBUTE;
+ (void)setEmailFieldRequired:(BOOL)isEmailFieldRequired IBG_DEPRECATED_ATTRIBUTE;
+ (void)setCommentFieldRequired:(BOOL)isCommentFieldRequired IBG_DEPRECATED_ATTRIBUTE;
+ (void)setShakingThresholdForiPhone:(double)iPhoneShakingThreshold foriPad:(double)iPadShakingThreshold IBG_DEPRECATED_ATTRIBUTE;
+ (void)setFloatingButtonEdge:(CGRectEdge)floatingButtonEdge withTopOffset:(double)floatingButtonOffsetFromTop IBG_DEPRECATED_ATTRIBUTE;
+ (void)setVideoRecordingFloatingButtonPosition:(IBGPosition)position IBG_DEPRECATED_ATTRIBUTE;
+ (void)setIntroMessageEnabled:(BOOL)isIntroMessageEnabled IBG_DEPRECATED_ATTRIBUTE;
+ (void)setPostSendingDialogEnabled:(BOOL)isPostSendingDialogEnabled IBG_DEPRECATED_ATTRIBUTE;
+ (void)setPrimaryColor:(UIColor *)color IBG_DEPRECATED_ATTRIBUTE;
+ (void)setScreenshotCapturingBlock:(UIImage *(^)(void))screenshotCapturingBlock IBG_DEPRECATED_ATTRIBUTE;
+ (void)addTags:(NSString *)tag, ... NS_REQUIRES_NIL_TERMINATION IBG_DEPRECATED_ATTRIBUTE;
+ (void)addTags:(NSString *)tag withArguments:(va_list)arguments IBG_DEPRECATED_ATTRIBUTE;
+ (void)setString:(NSString*)value toKey:(IBGString)key IBG_DEPRECATED_ATTRIBUTE;
+ (void)setAttachmentTypesEnabledScreenShot:(BOOL)screenShot extraScreenShot:(BOOL)extraScreenShot galleryImage:(BOOL)galleryImage voiceNote:(BOOL)voiceNote screenRecording:(BOOL)screenRecording IBG_DEPRECATED_ATTRIBUTE;
+ (void)setEnabledAttachmentTypes:(IBGAttachmentType)attachmentTypes IBG_DEPRECATED_ATTRIBUTE;
+ (void)setChatNotificationEnabled:(BOOL)chatNotificationEnabled IBG_DEPRECATED_ATTRIBUTE;
+ (void)setOnNewMessageHandler:(void (^)(void))onNewMessageHandler IBG_DEPRECATED_ATTRIBUTE;
+ (void)setPromptOptionsEnabledWithBug:(BOOL)bugReportEnabled feedback:(BOOL)feedbackEnabled chat:(BOOL)chatEnabled IBG_DEPRECATED_ATTRIBUTE;
+ (void)setReportCategoriesWithTitles:(NSArray<NSString *> *)titles iconNames:(nullable NSArray<NSString *> *)names IBG_DEPRECATED_ATTRIBUTE;
+ (void)addExtraReportFieldWithTitle:(NSString *)title required:(BOOL)required IBG_DEPRECATED_ATTRIBUTE;
+ (void)removeExtraReportFields IBG_DEPRECATED_ATTRIBUTE;
+ (void)setExtendedBugReportMode:(IBGExtendedBugReportMode)extendedBugReportMode IBG_DEPRECATED_ATTRIBUTE;
+ (void)setViewHierarchyEnabled:(BOOL)viewHierarchyEnabled IBG_DEPRECATED_ATTRIBUTE;
+ (void)setEmailFieldRequired:(BOOL)isEmailFieldRequired forAction:(IBGAction)actionType IBG_DEPRECATED_ATTRIBUTE;
+ (void)reportException:(NSException *)exception IBG_DEPRECATED_ATTRIBUTE;
+ (void)reportError:(NSError *)error IBG_DEPRECATED_ATTRIBUTE;
+ (void)invokeConversations IBG_DEPRECATED_ATTRIBUTE;
+ (BOOL)isInstabugNotification:(NSDictionary *)notification IBG_DEPRECATED_ATTRIBUTE;
+ (void)logUserEventWithName:(NSString *)name params:(nullable NSDictionary *)params IBG_DEPRECATED_ATTRIBUTE;
+ (void)IBGLog:(NSString *)log IBG_DEPRECATED_ATTRIBUTE;
+ (void)logVerbose:(NSString *)log IBG_DEPRECATED_ATTRIBUTE;
+ (void)logDebug:(NSString *)log IBG_DEPRECATED_ATTRIBUTE;
+ (void)logInfo:(NSString *)log IBG_DEPRECATED_ATTRIBUTE;
+ (void)logWarn:(NSString *)log IBG_DEPRECATED_ATTRIBUTE;
+ (void)logError:(NSString *)log IBG_DEPRECATED_ATTRIBUTE;
+ (void)setIBGLogPrintsToConsole:(BOOL)enabled IBG_DEPRECATED_ATTRIBUTE;
+ (void)clearAllLogs IBG_DEPRECATED_ATTRIBUTE;
+ (void)showFeatureRequests IBG_DEPRECATED_ATTRIBUTE;
+ (void)setNetworkLoggingEnabled:(BOOL)isNetworkLoggingEnabled IBG_DEPRECATED_ATTRIBUTE;
+ (void)setNetworkLoggingFilterPredicate:(NSPredicate *)filterPredicate IBG_DEPRECATED_ATTRIBUTE;
+ (void)setNetworkLoggingRequestFilterPredicate:(nullable NSPredicate *)requestFilterPredicate responseFilterPredicate:(nullable NSPredicate *)responseFilterPredicate IBG_DEPRECATED_ATTRIBUTE;
+ (void)enableLoggingForURLSessionConfiguration:(NSURLSessionConfiguration *)URLSessionConfiguration IBG_DEPRECATED_ATTRIBUTE;
+ (void)logHTTPBody:(NSData *)body forRequest:(NSMutableURLRequest *)request IBG_DEPRECATED_ATTRIBUTE;
+ (void)setNetworkLoggingURLObfuscationHandler:(nonnull NSURL * (^)(NSURL * _Nonnull url))obfuscationHandler IBG_DEPRECATED_ATTRIBUTE;
+ (void)setNetworkLogRequestObfuscationHandler:(nonnull NSURLRequest * (^)(NSURLRequest * _Nonnull request))obfuscationHandler IBG_DEPRECATED_ATTRIBUTE;
+ (void)setNetworkLogResponseObfuscationHandler:(void (^)(NSData * _Nullable responseData, NSURLResponse * _Nonnull response, NetworkObfuscationCompletionBlock returnBlock))obfuscationHandler IBG_DEPRECATED_ATTRIBUTE;
+ (void)setProgressHandlerForRequestURL:(nonnull NSURL *)URL progressHandler:(nonnull void (^)(NSURLSessionTask *task, int64_t bytesSent, int64_t totalBytesSent, int64_t totalBytesExpectedToSend))requestProgressHandler IBG_DEPRECATED_ATTRIBUTE;
+ (void)setCanAuthenticateAgainstProtectionSpaceHandler:(BOOL(^)(NSURLProtectionSpace *protectionSpace))protectionSpaceHandler IBG_DEPRECATED_ATTRIBUTE;
+ (void)setDidReceiveAuthenticationChallengeHandler:(NSURLCredential* (^)(NSURLAuthenticationChallenge *challenge))reciveChallengeHandler IBG_DEPRECATED_ATTRIBUTE;
+ (void)setAutoShowingSurveysEnabled:(BOOL)autoShowingSurveysEnabled IBG_DEPRECATED_ATTRIBUTE;
+ (void)setSurveysEnabled:(BOOL)surveysEnabled IBG_DEPRECATED_ATTRIBUTE;
+ (void)showSurveyIfAvailable IBG_DEPRECATED_ATTRIBUTE;
+ (BOOL)hasAvailableSurveys IBG_DEPRECATED_ATTRIBUTE;
+ (void)setWillShowSurveyHandler:(void (^)(void))willShowSurveyHandler IBG_DEPRECATED_ATTRIBUTE;
+ (void)setDidDismissSurveyHandler:(void (^)(void))didShowSurveyHandler IBG_DEPRECATED_ATTRIBUTE;
+ (void)showSurveyWithToken:(NSString *)surveyToken IBG_DEPRECATED_ATTRIBUTE;
+ (BOOL)hasRespondedToSurveyWithToken:(NSString *)surveyToken IBG_DEPRECATED_ATTRIBUTE;
+ (void)setThresholdForReshowingSurveyAfterDismiss:(NSInteger)sessionCount daysCount:(NSInteger)daysCount IBG_DEPRECATED_ATTRIBUTE;
+ (void)setShouldShowSurveysWelcomeScreen:(BOOL)shouldShowWelcomeScreen IBG_DEPRECATED_ATTRIBUTE;

@end


NS_ASSUME_NONNULL_END
