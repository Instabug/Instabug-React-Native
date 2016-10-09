//
//  RCTConvert+InstabugEnums.m
//  instabugDemo
//
//  Created by Yousef Hamza on 9/29/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "RCTConvert+InstabugEnums.h"
#import <Instabug/IBGEnums.h>

@implementation RCTConvert (InstabugEnums)

RCT_ENUM_CONVERTER(IBGInvocationEvent, (@{
                                          @"invocationEventNone": @(IBGInvocationEventNone),
                                          @"invocationEventShake": @(IBGInvocationEventShake),
                                          @"invocationEventScreenshot": @(IBGInvocationEventScreenshot),
                                          @"invocationEventTwoFingersSwipeLeft": @(IBGInvocationEventTwoFingersSwipeLeft),
                                          @"invocationEventRightEdgePan": @(IBGInvocationEventRightEdgePan),
                                          @"invocationEventFloatingButton": @(IBGInvocationEventFloatingButton)
                                          }), IBGInvocationEventNone, integerValue);

RCT_ENUM_CONVERTER(IBGInvocationMode, (@{
                                         @"invocationModeNA": @(IBGInvocationModeNA),
                                         @"invocationModeNewBug": @(IBGInvocationModeNewBug),
                                         @"invocationModeNewFeedbac": @(IBGInvocationModeNewFeedback),
                                         @"invocationModeNewChat": @(IBGInvocationModeNewChat),
                                         @"invocationModeChatsList": @(IBGInvocationModeChatsList)
                                         }), IBGInvocationModeNA, integerValue);

RCT_ENUM_CONVERTER(IBGDismissType, (@{
                                      @"dismissTypeSubmit": @(IBGDismissTypeSubmit),
                                      @"dismissTypeCancel": @(IBGDismissTypeCancel),
                                      @"dismissTypeAddAtttachment": @(IBGDismissTypeAddAttachment)
                                      }), IBGDismissTypeSubmit, integerValue)

RCT_ENUM_CONVERTER(IBGReportType, (@{
                                     @"reportTypeBug": @(IBGReportTypeBug),
                                     @"reportTypeFeedback": @(IBGReportTypeFeedback)
                                     }), IBGReportTypeBug, integerValue);

@end
