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
#import <Instabug/Instabug.h>
#import <Instabug/IBGBugReporting.h>
#import <Instabug/IBGCrashReporting.h>
#import <Instabug/IBGSurveys.h>
#import <Instabug/IBGLog.h>

@interface InstabugReactBridge : RCTEventEmitter <RCTBridgeModule>

- (void)showSurveyWithToken:(NSString *)surveyToken;


/***********Bug Reporting*****************/


- (void)setBugReportingEnabled:(BOOL) isEnabled;

- (void)setInvocationEvents:(NSArray*)invocationEventsArray;

- (void)invoke;

- (void)setInvocationOptions:(NSArray*)invocationOptionsArray;

- (void)invokeWithInvocationModeAndOptions:(IBGInvocationMode)invocationMode options:(NSArray*)options;

- (void)setPreInvocationHandler:(RCTResponseSenderBlock)callBack;
@end
