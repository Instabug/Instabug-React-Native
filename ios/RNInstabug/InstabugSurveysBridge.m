//
//  InstabugSurveysBridge.m
//  RNInstabug
//
//  Created by Salma Ali on 7/30/19.
//  Copyright © 2019 instabug. All rights reserved.
//

#import "InstabugSurveysBridge.h"
#import <Instabug/IBGSurveys.h>
#import <asl.h>
#import <React/RCTLog.h>
#import <os/log.h>
#import <Instabug/IBGTypes.h>
#import <React/RCTUIManager.h>

@implementation InstabugSurveysBridge

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

- (NSArray<NSString *> *)supportedEvents {
    return @[
             @"IBGWillShowSurvey",
             @"IBGDidDismissSurvey"
             ];
}

RCT_EXPORT_MODULE(IBGSurveys)

RCT_EXPORT_METHOD(showSurvey:(NSString *)surveyToken) {
    [IBGSurveys showSurveyWithToken:surveyToken];
}

RCT_EXPORT_METHOD(hasRespondedToSurvey:(NSString *)surveyToken callback:(RCTResponseSenderBlock)callback) {
    callback(@[@([IBGSurveys hasRespondedToSurveyWithToken:surveyToken])]);
}

RCT_EXPORT_METHOD(getAvailableSurveys:(RCTResponseSenderBlock)callback) {
    [IBGSurveys availableSurveysWithCompletionHandler:^(NSArray<IBGSurvey *> *availableSurveys) {
        NSMutableArray<NSDictionary*>* mappedSurveys = [[NSMutableArray alloc] init];
        for (IBGSurvey* survey in availableSurveys) {
            [mappedSurveys addObject:@{@"title": survey.title }];
        }
        callback(@[mappedSurveys]);
    }];
}

RCT_EXPORT_METHOD(setEnabled:(BOOL)surveysEnabled) {
    IBGSurveys.enabled = surveysEnabled;
}

RCT_EXPORT_METHOD(showSurveysIfAvailable) {
    [IBGSurveys showSurveyIfAvailable];
}

RCT_EXPORT_METHOD(setOnShowHandler:(RCTResponseSenderBlock)callBack) {
    if (callBack != nil) {
        IBGSurveys.willShowSurveyHandler = ^{
            [self sendEventWithName:@"IBGWillShowSurvey" body:nil];
        };
    } else {
        IBGSurveys.willShowSurveyHandler = nil;
    }
}

RCT_EXPORT_METHOD(setOnDismissHandler:(RCTResponseSenderBlock)callBack) {
    if (callBack != nil) {
        IBGSurveys.didDismissSurveyHandler = ^{
            [self sendEventWithName:@"IBGDidDismissSurvey" body:nil];
        };
    } else {
        IBGSurveys.didDismissSurveyHandler = nil;
    }
}

RCT_EXPORT_METHOD(setAutoShowingEnabled:(BOOL)autoShowingSurveysEnabled) {
    IBGSurveys.autoShowingEnabled = autoShowingSurveysEnabled;
}

RCT_EXPORT_METHOD(setThresholdForReshowingSurveyAfterDismiss:(NSInteger)sessionCount daysCount:(NSInteger)daysCount) {
    [IBGSurveys setThresholdForReshowingSurveyAfterDismiss:sessionCount daysCount:daysCount];
}

RCT_EXPORT_METHOD(setShouldShowWelcomeScreen:(BOOL)shouldShowWelcomeScreen) {
    IBGSurveys.shouldShowWelcomeScreen = shouldShowWelcomeScreen;
}

RCT_EXPORT_METHOD(setAppStoreURL:(NSString *)appStoreURL) {
    IBGSurveys.appStoreURL = appStoreURL;
}

@synthesize description;

@synthesize hash;

@synthesize superclass;

@end



