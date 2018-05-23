//
//  RCTConvert+InstabugEnums.m
//  instabugDemo
//
//  Created by Yousef Hamza on 9/29/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "RCTConvert+InstabugEnums.h"
#import <InstabugCore/IBGTypes.h>

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
                                         @"invocationOptionNewBug": @(IBGBugReportingInvocationOptionNewBug),
                                         @"invocationOptionNewFeedback": @(IBGBugReportingInvocationOptionNewFeedback),
                                         @"invocationOptionNewChat": @(IBGBugReportingInvocationOptionNewChat),
                                         @"invocationOptionsChatsList": @(IBGBugReportingInvocationOptionChatsList),
                                         @"invocationOptionsEmailFieldHidden": @(IBGBugReportingInvocationOptionEmailFieldHidden),
                                         @"invocationOptionsEmailFieldOptional": @(IBGBugReportingInvocationOptionEmailFieldOptional),
                                         @"invocationOptionsCommentFieldRequired": @(IBGBugReportingInvocationOptionCommentFieldRequired),
                                         @"invocationOptionsDisablePostSendingDialog": @(IBGBugReportingInvocationOptionDisablePostSendingDialog)
                                         }), IBGInvocationModeNA, integerValue);

RCT_ENUM_CONVERTER(IBGDismissType, (@{
                                      @"dismissTypeSubmit": @(IBGDismissTypeSubmit),
                                      @"dismissTypeCancel": @(IBGDismissTypeCancel),
                                      @"dismissTypeAddAtttachment": @(IBGDismissTypeAddAttachment)
                                      }), IBGDismissTypeSubmit, integerValue)

RCT_ENUM_CONVERTER(IBGUserStepsMode, (@{
                                      @"reproStepsEnabled": @(IBGUserStepsModeEnable),
                                      @"reproStepsDisabled": @(IBGUserStepsModeDisable),
                                      @"reproStepsEnabledWithNoScreenshots": @(IBGUserStepsModeEnabledWithNoScreenshots)
                                      }), IBGUserStepsModeEnable, integerValue)

RCT_ENUM_CONVERTER(IBGExtendedBugReportMode, (@{
                                      @"enabledWithRequiredFields": @(IBGExtendedBugReportModeEnabledWithRequiredFields),
                                      @"enabledWithOptionalFields": @(IBGExtendedBugReportModeEnabledWithOptionalFields),
                                      @"disabled": @(IBGExtendedBugReportModeDisabled)
                                      }), IBGExtendedBugReportModeDisabled, integerValue)


RCT_ENUM_CONVERTER(IBGReportType, (@{
                                     @"reportTypeBug": @(IBGReportTypeBug),
                                     @"reportTypeFeedback": @(IBGReportTypeFeedback)
                                     }), IBGReportTypeBug, integerValue);

RCT_ENUM_CONVERTER(CGRectEdge, (@{
                                  @"rectMinXEdge": @(CGRectMinXEdge),
                                  @"rectMinYEdge": @(CGRectMinYEdge),
                                  @"rectMaxXEdge": @(CGRectMaxXEdge),
                                  @"rectMaxYEdge": @(CGRectMaxYEdge)
                                  }), CGRectMinXEdge, unsignedIntegerValue);

RCT_ENUM_CONVERTER(IBGLocale, (@{
                                 @"localeArabic": @(IBGLocaleArabic),
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


RCT_ENUM_CONVERTER(IBGActionType, (@{
                                    @"allActions": @(IBGActionAllActions),
                                    @"reportBug": @(IBGActionReportBug),
                                    @"requestNewFeature": @(IBGActionRequestNewFeature),
                                    @"addCommentToFeature": @(IBGActionAddCommentToFeature)
                                  }), IBGActionAllActions, integerValue);

RCT_ENUM_CONVERTER(IBGString, (@{
                                 @"shakeHint": @(IBGStringShakeHint),
                                 @"swipeHint": @(IBGStringSwipeHint),
                                 @"edgeSwipeStartHint": @(IBGStringEdgeSwipeStartHint),
                                 @"startAlertText": @(IBGStringStartAlertText),
                                 @"invalidEmailMessage": @(IBGStringInvalidEmailMessage),
                                 @"invalidEmailTitle": @(IBGStringInvalidEmailTitle),
                                 @"invalidCommentMessage": @(IBGStringInvalidCommentMessage),
                                 @"invalidCommentTitle": @(IBGStringInvalidCommentTitle),
                                 @"invocationHeader": @(IBGStringInvocationHeader),
                                 @"talkToUs": @(IBGStringTalkToUs),
                                 @"reportBug": @(IBGStringReportBug),
                                 @"reportFeedback": @(IBGStringReportFeedback),
                                 @"emailFieldHint": @(IBGStringEmailFieldHint),
                                 @"commentFieldHintForBugReport": @(IBGStringCommentFieldHintForBugReport),
                                 @"commentFieldHintForFeedback": @(IBGStringCommentFieldHintForFeedback),
                                 @"addScreenRecordingMessage": @(IBGStringAddScreenRecordingMessage),
                                 @"addVoiceMessage": @(IBGStringAddVoiceMessage),
                                 @"addImageFromGallery": @(IBGStringAddImageFromGallery),
                                 @"addExtraScreenshot": @(IBGStringAddExtraScreenshot),
                                 @"audioRecordingPermissionDeniedTitle": @(IBGStringAudioRecordingPermissionDeniedTitle),
                                 @"audioRecordingPermissionDeniedMessage": @(IBGStringAudioRecordingPermissionDeniedMessage),
                                 @"microphonePermissionAlertSettingsButtonTitle": @(IBGStringMicrophonePermissionAlertSettingsButtonTitle),
                                 @"chatsHeaderTitle": @(IBGStringChatsHeaderTitle),
                                 @"team": @(IBGStringTeam),
                                 @"recordingMessageToHoldText": @(IBGStringRecordingMessageToHoldText),
                                 @"recordingMessageToReleaseText": @(IBGStringRecordingMessageToReleaseText),
                                 @"messagesNotification": @(IBGStringMessagesNotification),
                                 @"messagesNotificationAndOthers": @(IBGStringMessagesNotificationAndOthers),
                                 @"screenshotHeaderTitle": @(IBGStringScreenshotHeaderTitle),
                                 @"okButtonTitle": @(IBGStringOkButtonTitle),
                                 @"cancelButtonTitle": @(IBGStringCancelButtonTitle),
                                 @"thankYouText": @(IBGStringThankYouText),
                                 @"audio": @(IBGStringAudio),
                                 @"screenRecording": @(IBGStringScreenRecording),
                                 @"image": @(IBGStringImage),
                                 @"surveyEnterYourAnswer": @(IBGStringSurveyEnterYourAnswerPlaceholder),
                                 @"videPressRecord": @(IBGStringVideoPressRecordTitle),
                                 @"collectingDataText": @(IBGStringCollectingDataText),
                                 @"thankYouAlertText": @(IBGStringThankYouAlertText)
                                 }), IBGStringShakeHint, integerValue);
@end
