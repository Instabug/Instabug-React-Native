//
//  InstabugSurveysBridge.h
//  RNInstabug
//
//  Created by Salma Ali on 7/30/19.
//  Copyright © 2019 instabug. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <Instabug/IBGTypes.h>

@interface InstabugSurveysBridge : RCTEventEmitter <RCTBridgeModule>
/*
 +------------------------------------------------------------------------+
 |                            Surveys Module                             |
 +------------------------------------------------------------------------+
 */

- (void)showSurvey:(NSString *)surveyToken;

- (void)showSurveysIfAvailable;

- (void)setOnShowHandler:(RCTResponseSenderBlock)callBack;

- (void)setOnDismissHandler:(RCTResponseSenderBlock)callBack;

- (void)setAutoShowingEnabled:(BOOL)autoShowingSurveysEnabled;

- (void)setShouldShowWelcomeScreen:(BOOL)shouldShowWelcomeScreen;

- (void)hasRespondedToSurvey:(NSString *)surveyToken
                            :(RCTPromiseResolveBlock)resolve
                            :(RCTPromiseRejectBlock)reject;

- (void)getAvailableSurveys:(RCTPromiseResolveBlock)resolve :(RCTPromiseRejectBlock)reject;

- (void)setEnabled:(BOOL)surveysEnabled;

- (void)setAppStoreURL:(NSString *)appStoreURL;


@end


