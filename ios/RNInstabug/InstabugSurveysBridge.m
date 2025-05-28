//
//  InstabugSurveysBridge.m
//  RNInstabug
//
//  Created by Salma Ali on 7/30/19.
//  Copyright © 2019 instabug. All rights reserved.
//

#import "InstabugSurveysBridge.h"
#import <InstabugSDK/IBGSurveys.h>
#import <asl.h>
#import <React/RCTLog.h>
#import <os/log.h>
#import <InstabugSDK/IBGTypes.h>
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

RCT_EXPORT_METHOD(hasRespondedToSurvey:(NSString *)surveyToken :(RCTPromiseResolveBlock)resolve :(RCTPromiseRejectBlock)reject) {
    [IBGSurveys hasRespondedToSurveyWithToken:surveyToken
                            completionHandler:^(BOOL hasResponded) {
        resolve(@(hasResponded));
    }];
}

RCT_EXPORT_METHOD(getAvailableSurveys:(RCTPromiseResolveBlock)resolve :(RCTPromiseRejectBlock)reject) {
    [IBGSurveys availableSurveysWithCompletionHandler:^(NSArray<IBGSurvey *> *availableSurveys) {
        NSMutableArray<NSDictionary*>* mappedSurveys = [[NSMutableArray alloc] init];
        for (IBGSurvey* survey in availableSurveys) {
            [mappedSurveys addObject:@{@"title": survey.title }];
        }
        resolve(mappedSurveys);
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
        IBGSurveys.willShowSurveyHandler = ^{};
    }
}

RCT_EXPORT_METHOD(setOnDismissHandler:(RCTResponseSenderBlock)callBack) {
    if (callBack != nil) {
        IBGSurveys.didDismissSurveyHandler = ^{
            [self sendEventWithName:@"IBGDidDismissSurvey" body:nil];
        };
    } else {
        IBGSurveys.didDismissSurveyHandler = ^{};
    }
}

RCT_EXPORT_METHOD(setAutoShowingEnabled:(BOOL)autoShowingSurveysEnabled) {
    IBGSurveys.autoShowingEnabled = autoShowingSurveysEnabled;
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



