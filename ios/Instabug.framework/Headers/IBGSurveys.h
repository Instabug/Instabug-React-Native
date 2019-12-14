/*
 File:       Instabug/IBGSurveys.h
 
 Contains:   API for using Instabug's SDK.
 
 Copyright:  (c) 2013-2019 by Instabug, Inc., all rights reserved.
 
 Version:    9.0.3
 */

#import <Foundation/Foundation.h>
#import "IBGSurvey.h"

NS_SWIFT_NAME(Surveys)
@interface IBGSurveys : NSObject

@property (class, atomic, assign) BOOL enabled;
/**
 @brief Sets whether auto surveys showing are enabled or not.
 
 @discussion If you disable surveys auto showing on the SDK but still have active surveys on your Instabug dashboard, those surveys are still going to be sent to the device, but are not going to be shown automatically.
 
 To manually display any available surveys, call `+ [Instabug showSurveyIfAvailable]`.
 
 Defaults to YES.
 */
@property (class, atomic, assign) BOOL autoShowingEnabled;

/**
 @brief Returns array of available surveys that match the current device/user asynchronous.
 */
+ (void)availableSurveysWithCompletionHandler:(void (^)(NSArray<IBGSurvey *> * validSurveys))completionHandler;

/**
 @brief Sets a block of code to be executed just before the survey's UI is presented.
 
 @discussion This block is executed on the UI thread. Could be used for performing any UI changes before the survey's UI
 is shown.
 */
@property (class, atomic, strong) void(^willShowSurveyHandler)(void);

/**
 @brief Sets a block of code to be executed right after the survey's UI is dismissed.
 
 @discussion This block is executed on the UI thread. Could be used for performing any UI changes after the survey's UI
 is dismissed.
 */
@property (class, atomic, strong) void(^didDismissSurveyHandler)(void);

/**
 @brief Setting an option for all the surveys to show a welcome screen before the user starts taking the survey.
 
 @discussion By enabling this option, any survey that appears to the user will have a welcome screen with a title, subtitle
 and a button that if clicked, will take the user to the survey. All the strings in the welcome screen have a default value
 and localized. They can also be modified using the strings API. The default value of this option is false.
 */
@property (class, atomic, assign) BOOL shouldShowWelcomeScreen;

/**
 @brief Shows one of the surveys that were not shown before, that also have conditions that match the current device/user.
 
 @discussion Does nothing if there are no available surveys.
 */
+ (void)showSurveyIfAvailable;

/**
 @brief Shows Survey with a specific token.
 
 @discussion Does nothing if there are no available surveys with that specific token. Answered and canceled surveys won't show up again.
 
 @param surveyToken A String with a survey token.
 */
+ (void)showSurveyWithToken:(NSString *)surveyToken;


/**
 @brief Sets a threshold for numbers of sessions and another for number of days required before a survey, that has been dismissed once, would show again.
 
 @discussion When a survey that has been shown to the user gets dismissed once, it will not reappear to the user unless a certain number of sessions have started AND a certain number of days have passed since the user first dismissed the survey. Note that if a survey is dismissed for a second time, it will not show again, in other words, it will be set to `canceled`. This applies to both surveys with and without tokens.

 Please note that this overrides the dashboard configuration for reshowing if called.
 
 @param sessionCount : Number of sessions required to be initialized before a dismissed survey can be shown again.
 @param daysCount : Number of days required to pass before a dismissed survey can be shown again.
 */
+ (void)setThresholdForReshowingSurveyAfterDismiss:(NSInteger)sessionCount daysCount:(NSInteger)daysCount DEPRECATED_MSG_ATTRIBUTE("Reshowing the survey can now be controlled from the dashboard for any new survey you create.");

/**
 @brief Returns true if the survey with a specific token was answered before .
 
 @discussion Will return false if the token does not exist or if the survey was not answered before.
 
 @param surveyToken A String with a survey token.
 */
+ (BOOL)hasRespondedToSurveyWithToken:(NSString *)surveyToken;


@end
