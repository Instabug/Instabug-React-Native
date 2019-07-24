//
//  InstabugReactBridge.h
//  instabugDemo
//
//  Created by Yousef Hamza on 9/29/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface InstabugReactBridge : RCTEventEmitter <RCTBridgeModule>

- (void)showSurveyWithToken:(NSString *)surveyToken;

- (void)showSurveysIfAvailable;

- (void)setWillShowSurveyHandler:(RCTResponseSenderBlock)callBack;

- (void)setDidDismissSurveyHandler:(RCTResponseSenderBlock)callBack;

- (void)setAutoShowingSurveysEnabled:(BOOL)autoShowingSurveysEnabled;

- (void)setThresholdForReshowingSurveyAfterDismiss:(NSInteger)sessionCount daysCount:(NSInteger)daysCount;

- (void)setShouldShowSurveysWelcomeScreen:(BOOL)shouldShowWelcomeScreen;

- (void)hasRespondedToSurveyWithToken:(NSString *)surveyToken callback:(RCTResponseSenderBlock)callback;

- (void)getAvailableSurveys:(RCTResponseSenderBlock)callback;

- (void)setSurveysEnabled:(BOOL)surveysEnabled;

@end
