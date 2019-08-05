//
//  InstabugBugReportingBridge.h
//  RNInstabug
//
//  Created by Salma Ali on 7/30/19.
//  Copyright © 2019 instabug. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <Instabug/IBGTypes.h>
#import <Instabug/IBGBugReporting.h>

@interface InstabugBugReportingBridge : RCTEventEmitter <RCTBridgeModule>
/*
 +------------------------------------------------------------------------+
 |                            BugReporting Module                         |
 +------------------------------------------------------------------------+
 */

- (void)setEnabled:(BOOL)isEnabled;

- (void)setInvocationEvents:(NSArray *)invocationEventsArray;

- (void)invoke;

- (void)setOptions:(NSArray *)optionsArray;

- (void)invokeWithInvocationModeAndOptions:(IBGInvocationMode)invocationMode options:(NSArray *)options;

- (void)setOnInvokeHandler:(RCTResponseSenderBlock)callBack;

- (void)setOnSDKDismissedHandler:(RCTResponseSenderBlock)callBack;

- (void)setPromptOptionsEnabled:(BOOL)chatEnabled feedback:(BOOL)bugReportEnabled chat:(BOOL)feedbackEnabled;

- (void)setShakingThresholdForiPhone:(double)iPhoneShakingThreshold;

- (void)setShakingThresholdForiPad:(double)iPadShakingThreshold;

- (void)setExtendedBugReportMode:(IBGExtendedBugReportMode)extendedBugReportMode;

- (void)setReportTypes:(NSArray *)types;

- (void)show:(IBGBugReportingReportType)type options:(NSArray *)options;

- (void)setAutoScreenRecordingEnabled:(BOOL)enabled;

- (void)setAutoScreenRecordingMaxDuration:(CGFloat)duration;

- (void)setViewHirearchyEnabled:(BOOL)viewHirearchyEnabled;

@end
