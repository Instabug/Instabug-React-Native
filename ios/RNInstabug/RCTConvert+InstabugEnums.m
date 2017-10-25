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
                                 @"surveyNoAnswerTitle": @(IBGStringSurveyNoAnswerTitle),
                                 @"surveyNoAnswerMessage": @(IBGStringSurveyNoAnswerMessage),
                                 @"surveySubmitTitle": @(IBGStringSurveySubmitTitle),
                                 @"videPressRecord": @(IBGStringVideoPressRecordTitle),
                                 @"collectingDataText": @(IBGStringCollectingDataText)
                                 }), IBGStringShakeHint, integerValue);
@end
