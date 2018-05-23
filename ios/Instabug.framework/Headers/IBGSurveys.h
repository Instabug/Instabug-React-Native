//
//  IBGSurveys.h
//  Instabug
//
//  Created by Yousef Hamza on 5/17/18.
//  Copyright © 2018 Moataz. All rights reserved.
//

#import <Foundation/Foundation.h>

@class IBGSurvey;

@interface IBGSurveys : NSObject

@property (class, atomic, assign) BOOL enabled;
@property (class, atomic, assign) BOOL autoShowingEnabled;
@property (class, atomic, readonly, strong) NSArray<IBGSurvey *> *availableSurveys;
@property (class, atomic, strong) void(^willShowSurveyHandler)(void);
@property (class, atomic, strong) void(^didDismissSurveyHandler)(void);

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
 
 @param sessionCount : Number of sessions required to be initialized before a dismissed survey can be shown again.
 @param daysCount : Number of days required to pass before a dismissed survey can be shown again.
 */
+ (void)setThresholdForReshowingSurveyAfterDismiss:(NSInteger)sessionCount daysCount:(NSInteger)daysCount;

/**
 @brief Returns true if the survey with a specific token was answered before .
 
 @discussion Will return false if the token does not exist or if the survey was not answered before.
 
 @param surveyToken A String with a survey token.
 */
+ (BOOL)hasRespondedToSurveyWithToken:(NSString *)surveyToken;


@end
