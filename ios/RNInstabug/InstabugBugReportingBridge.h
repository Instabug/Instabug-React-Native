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

- (void)setOptions:(NSArray *)optionsArray;

- (void)setFloatingButtonEdge:(CGRectEdge)floatingButtonEdge withTopOffset:(double)floatingButtonOffsetFromTop;

- (void)setOnInvokeHandler:(RCTResponseSenderBlock)callBack;

- (void)setOnSDKDismissedHandler:(RCTResponseSenderBlock)callBack;

- (void)setShakingThresholdForiPhone:(double)iPhoneShakingThreshold;

- (void)setShakingThresholdForiPad:(double)iPadShakingThreshold;

- (void)setExtendedBugReportMode:(IBGExtendedBugReportMode)extendedBugReportMode;

- (void)setReportTypes:(NSArray *)types;

- (void)show:(IBGBugReportingReportType)type options:(NSArray *)options;

- (void)setAutoScreenRecordingEnabled:(BOOL)enabled;

- (void)setAutoScreenRecordingDuration:(CGFloat)duration;

- (void)setViewHierarchyEnabled:(BOOL)viewHirearchyEnabled;

- (void)setDisclaimerText:(NSString *)text;

- (void)setCommentMinimumCharacterCount:(NSNumber *)limit reportTypes:(NSArray *)reportTypes;

- (void)addUserConsent:(NSString *)key
                  description:(NSString *)description
                    mandatory:(BOOL)mandatory
                      checked:(BOOL)checked
                   actionType:(NSNumber *)actionType;

@end
