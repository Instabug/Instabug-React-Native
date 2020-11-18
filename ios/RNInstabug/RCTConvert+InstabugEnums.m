//
//  RCTConvert+InstabugEnums.m
//  instabugDemo
//
//  Created by Yousef Hamza on 9/29/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "RCTConvert+InstabugEnums.h"
#import <Instabug/IBGTypes.h>

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
                                         @"invocationModeNewFeedback": @(IBGInvocationModeNewFeedback),
                                         @"invocationModeNewChat": @(IBGInvocationModeNewChat),
                                         @"invocationModeChatsList": @(IBGInvocationModeChatsList)
                                         }), IBGInvocationModeNA, integerValue);

RCT_ENUM_CONVERTER(IBGBugReportingInvocationOption, (@{
                                         @"invocationOptionsEmailFieldHidden": @(IBGBugReportingInvocationOptionEmailFieldHidden),
                                         @"invocationOptionsEmailFieldOptional": @(IBGBugReportingInvocationOptionEmailFieldOptional),
                                         @"invocationOptionsCommentFieldRequired": @(IBGBugReportingInvocationOptionCommentFieldRequired),
                                         @"invocationOptionsDisablePostSendingDialog": @(IBGBugReportingInvocationOptionDisablePostSendingDialog)
                                         }), 0, integerValue);

RCT_ENUM_CONVERTER(IBGDismissType, (@{
                                      @"dismissTypeSubmit": @(IBGDismissTypeSubmit),
                                      @"dismissTypeCancel": @(IBGDismissTypeCancel),
                                      @"dismissTypeAddAtttachment": @(IBGDismissTypeAddAttachment)
                                      }), IBGDismissTypeSubmit, integerValue)

RCT_ENUM_CONVERTER(IBGUserStepsMode, (@{
                                      @"reproStepsEnabled": @(IBGUserStepsModeEnable),
                                      @"reproStepsDisabled": @(IBGUserStepsModeDisable),
                                      @"reproStepsEnabledWithNoScreenshots": @(IBGUserStepsModeEnabledWithNoScreenshots)
                                      }), IBGUserStepsModeEnabledWithNoScreenshots, integerValue)

RCT_ENUM_CONVERTER(IBGSDKDebugLogsLevel, (@{
                                      @"sdkDebugLogsLevelVerbose": @(IBGSDKDebugLogsLevelVerbose),
                                      @"sdkDebugLogsLevelDebug": @(IBGSDKDebugLogsLevelDebug),
                                      @"sdkDebugLogsLevelError": @(IBGSDKDebugLogsLevelError),
                                      @"sdkDebugLogsLevelNone": @(IBGSDKDebugLogsLevelNone),
                                      }), IBGSDKDebugLogsLevelError, integerValue)

RCT_ENUM_CONVERTER(IBGExtendedBugReportMode, (@{
                                      @"enabledWithRequiredFields": @(IBGExtendedBugReportModeEnabledWithRequiredFields),
                                      @"enabledWithOptionalFields": @(IBGExtendedBugReportModeEnabledWithOptionalFields),
                                      @"disabled": @(IBGExtendedBugReportModeDisabled)
                                      }), IBGExtendedBugReportModeDisabled, integerValue)

RCT_ENUM_CONVERTER(CGRectEdge, (@{
                                  @"rectMinXEdge": @(CGRectMinXEdge),
                                  @"rectMinYEdge": @(CGRectMinYEdge),
                                  @"rectMaxXEdge": @(CGRectMaxXEdge),
                                  @"rectMaxYEdge": @(CGRectMaxYEdge)
                                  }), CGRectMinXEdge, unsignedIntegerValue);

RCT_ENUM_CONVERTER(IBGLocale, (@{
                                 @"localeArabic": @(IBGLocaleArabic),
                                 @"localeAzerbaijani": @(IBGLocaleAzerbaijani),
                                 @"localeChineseSimplified": @(IBGLocaleChineseSimplified),
                                 @"localeChineseTraditional": @(IBGLocaleChineseTraditional),
                                 @"localeCzech": @(IBGLocaleCzech),
                                 @"localeDanish": @(IBGLocaleDanish),
                                 @"localeDutch": @(IBGLocaleDutch),
                                 @"localeEnglish": @(IBGLocaleEnglish),
                                 @"localeFrench": @(IBGLocaleFrench),
                                 @"localeGerman": @(IBGLocaleGerman),
                                 @"localeItalian": @(IBGLocaleItalian),
                                 @"localeJapanese": @(IBGLocaleJapanese),
                                 @"localeKorean": @(IBGLocaleKorean),
                                 @"localePolish": @(IBGLocalePolish),
                                 @"localePortugueseBrazil": @(IBGLocalePortugueseBrazil),
                                 @"localeRussian": @(IBGLocaleRussian),
                                 @"localeSpanish": @(IBGLocaleSpanish),
                                 @"localeSwedish": @(IBGLocaleSwedish),
                                 @"localeTurkish": @(IBGLocaleTurkish)
                                 }), IBGLocaleEnglish, integerValue);

RCT_ENUM_CONVERTER(IBGColorTheme, (@{
                                     @"colorThemeLight": @(IBGColorThemeLight),
                                     @"colorThemeDark": @(IBGColorThemeDark)
                                     }), IBGColorThemeLight, integerValue);

RCT_ENUM_CONVERTER(IBGPosition, (@{
                                    @"bottomRight": @(IBGPositionBottomRight),
                                    @"topRight": @(IBGPositionTopRight),
                                    @"bottomLeft": @(IBGPositionBottomLeft),
                                    @"topLeft": @(IBGPositionTopLeft)
                                    }), IBGPositionBottomRight, integerValue);

RCT_ENUM_CONVERTER(IBGLogLevel, (@{
                                    @"logLevelNone": @(IBGLogLevelNone),
                                    @"logLevelError": @(IBGLogLevelError),
                                    @"logLevelWarning": @(IBGLogLevelWarning),
                                    @"logLevelInfo": @(IBGLogLevelInfo),
                                    @"logLevelDebug": @(IBGLogLevelDebug),
                                    @"logLevelVerbose": @(IBGLogLevelVerbose)
                                    }), IBGLogLevelInfo, integerValue);

RCT_ENUM_CONVERTER(IBGWelcomeMessageMode, (@{
                                    @"welcomeMessageModeLive": @(IBGWelcomeMessageModeLive),
                                    @"welcomeMessageModeBeta": @(IBGWelcomeMessageModeBeta),
                                    @"welcomeMessageModeDisabled": @(IBGWelcomeMessageModeDisabled)
                                    }), IBGWelcomeMessageModeLive, integerValue);


RCT_ENUM_CONVERTER(IBGAction, (@{
                                    @"allActions": @(IBGActionAllActions),
                                    @"reportBug": @(IBGActionReportBug),
                                    @"requestNewFeature": @(IBGActionRequestNewFeature),
                                    @"addCommentToFeature": @(IBGActionAddCommentToFeature)
                                  }), IBGActionAllActions, integerValue);

RCT_ENUM_CONVERTER(IBGBugReportingReportType, (@{
                                 @"bugReportingReportTypeBug": @(IBGBugReportingReportTypeBug),
                                 @"bugReportingReportTypeFeedback": @(IBGBugReportingReportTypeFeedback),
                                 @"bugReportingReportTypeQuestion": @(IBGBugReportingReportTypeQuestion)
                                 }), IBGBugReportingReportTypeBug, integerValue);

RCT_ENUM_CONVERTER(IBGBugReportingOption, (@{
                                               @"optionEmailFieldHidden": @(IBGBugReportingOptionEmailFieldHidden),
                                               @"optionEmailFieldOptional": @(IBGBugReportingOptionEmailFieldOptional),
                                               @"optionCommentFieldRequired": @(IBGBugReportingOptionCommentFieldRequired),
                                               @"optionDisablePostSendingDialog": @(IBGBugReportingOptionDisablePostSendingDialog)
                                               }), IBGBugReportingOptionNone, integerValue);


@end
