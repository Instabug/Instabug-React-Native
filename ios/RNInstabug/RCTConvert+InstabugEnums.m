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

RCT_ENUM_CONVERTER(IBGString, (@{
                                 @"shakeHint": @(IBGShakeHint),
                                 @"swipeHint": @(IBGSwipeHint),
                                 @"edgeSwipeStartHint": @(IBGEdgeSwipeStartHint),
                                 @"startAlertText": @(IBGStartAlertText),
                                 @"invalidEmailMessage": @(IBGInvalidEmailMessage),
                                 @"invalidEmailTitle": @(IBGInvalidEmailTitle),
                                 @"invalidCommentMessage": @(IBGInvalidCommentMessage),
                                 @"invalidCommentTitle": @(IBGInvalidCommentTitle),
                                 @"invocationHeader": @(IBGInvocationHeader),
                                 @"talkToUs": @(IBGTalkToUs),
                                 @"reportBug": @(IBGReportBug),
                                 @"reportFeedback": @(IBGReportFeedback),
                                 @"emailFieldHint": @(IBGEmailFieldHint),
                                 @"commentFieldHintForBugReport": @(IBGCommentFieldHintForBugReport),
                                 @"commentFieldHintForFeedback": @(IBGCommentFieldHintForFeedback),
                                 @"addVideoMessage": @(IBGAddVideoMessage),
                                 @"addVoiceMessage": @(IBGAddVoiceMessage),
                                 @"addImageFromGallery": @(IBGAddImageFromGallery),
                                 @"addExtraScreenshot": @(IBGAddExtraScreenshot),
                                 @"audioRecordingPermissionDeniedTitle": @(IBGAudioRecordingPermissionDeniedTitle),
                                 @"audioRecordingPermissionDeniedMessage": @(IBGAudioRecordingPermissionDeniedMessage),
                                 @"microphonePermissionAlertSettingsButtonText": @(IBGMicrophonePermissionAlertSettingsButtonText),
                                 @"recordingMessageToHoldText": @(IBGRecordingMessageToHoldText),
                                 @"recordingMessageToReleaseText": @(IBGRecordingMessageToReleaseText),
                                 @"conversationsHeaderTitle": @(IBGConversationsHeaderTitle),
                                 @"screenshotHeaderTitle": @(IBGScreenshotHeaderTitle),
                                 @"chatsNoConversationsHeadlineText": @(IBGChatsNoConversationsHeadlineText),
                                 @"doneButtonText": @(IBGDoneButtonText),
                                 @"okButtonText": @(IBGOkButtonText),
                                 @"cancelButtonText": @(IBGCancelButtonText),
                                 @"thankYouText": @(IBGThankYouText),
                                 @"audio": @(IBGAudio),
                                 @"video": @(IBGVideo),
                                 @"image": @(IBGImage)}), IBGShakeHint, integerValue);
@end
