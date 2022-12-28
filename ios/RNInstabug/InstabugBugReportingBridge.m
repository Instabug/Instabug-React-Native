//
//  InstabugBugReportingBridge.m
//  RNInstabug
//
//  Created by Salma Ali on 7/30/19.
//  Copyright © 2019 instabug. All rights reserved.
//

#import "InstabugBugReportingBridge.h"
#import <Instabug/IBGBugReporting.h>
#import <asl.h>
#import <React/RCTLog.h>
#import <os/log.h>
#import <Instabug/IBGTypes.h>
#import <React/RCTUIManager.h>

@implementation InstabugBugReportingBridge

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

- (NSArray<NSString *> *)supportedEvents {
    return @[
             @"IBGpreInvocationHandler",
             @"IBGpostInvocationHandler",
             @"IBGDidSelectPromptOptionHandler",
             ];
}

RCT_EXPORT_MODULE(IBGBugReporting)

RCT_EXPORT_METHOD(setEnabled:(BOOL) isEnabled) {
    IBGBugReporting.enabled = isEnabled;
}

RCT_EXPORT_METHOD(setAutoScreenRecordingEnabled:(BOOL)enabled) {
    IBGBugReporting.autoScreenRecordingEnabled = enabled;
}

RCT_EXPORT_METHOD(setAutoScreenRecordingDuration:(CGFloat)duration) {
    IBGBugReporting.autoScreenRecordingDuration = duration;
}

RCT_EXPORT_METHOD(setOnInvokeHandler:(RCTResponseSenderBlock)callBack) {
    if (callBack != nil) {
        IBGBugReporting.willInvokeHandler = ^{
            [self sendEventWithName:@"IBGpreInvocationHandler" body:nil];
        };
    } else {
        IBGBugReporting.willInvokeHandler = nil;
    }
}

RCT_EXPORT_METHOD(setOnSDKDismissedHandler:(RCTResponseSenderBlock)callBack) {
    if (callBack != nil) {
        IBGBugReporting.didDismissHandler = ^(IBGDismissType dismissType, IBGReportType reportType) {
            // Unlinke Android, we do NOT need to map the iOS Enums to their JS constant names.
            // This is because the JS Enums are mapped to the actual values of the
            // iOS Enums (NSInteger), not strings as it's implemented on Android.
            NSDictionary *result = @{
                @"dismissType": @(dismissType),
                @"reportType": @(reportType)
            };

            [self sendEventWithName:@"IBGpostInvocationHandler" body: result];
        };
    } else {
        IBGBugReporting.didDismissHandler = nil;
    }
}

RCT_EXPORT_METHOD(setDidSelectPromptOptionHandler:(RCTResponseSenderBlock)callBack) {
    if (callBack != nil) {
        
        IBGBugReporting.didSelectPromptOptionHandler = ^(IBGPromptOption promptOption) {
            
            NSString *promptOptionString;
            if (promptOption == IBGPromptOptionBug) {
                promptOptionString = @"bug";
            } else if (promptOption == IBGReportTypeFeedback) {
                promptOptionString = @"feedback";
            } else if (promptOption == IBGPromptOptionChat) {
                promptOptionString = @"chat";
            } else {
                promptOptionString = @"none";
            }
            
            [self sendEventWithName:@"IBGDidSelectPromptOptionHandler" body:@{
                                                                              @"promptOption": promptOptionString
                                                                              }];
        };
    } else {
        IBGBugReporting.didSelectPromptOptionHandler = nil;
    }
}

RCT_EXPORT_METHOD(setInvocationEvents:(NSArray*)invocationEventsArray) {
    IBGInvocationEvent invocationEvents = 0;
    for (NSNumber *boxedValue in invocationEventsArray) {
        invocationEvents |= [boxedValue intValue];
    }
    IBGBugReporting.invocationEvents = invocationEvents;
}

RCT_EXPORT_METHOD(setOptions:(NSArray*)invocationOptionsArray) {
    IBGBugReportingOption invocationOptions = 0;
    
    for (NSNumber *boxedValue in invocationOptionsArray) {
        invocationOptions |= [boxedValue intValue];
    }
    
    IBGBugReporting.bugReportingOptions = invocationOptions;
}

RCT_EXPORT_METHOD(setFloatingButtonEdge:(CGRectEdge)floatingButtonEdge withTopOffset:(double)floatingButtonOffsetFromTop) {
    IBGBugReporting.floatingButtonEdge = floatingButtonEdge;
    IBGBugReporting.floatingButtonTopOffset = floatingButtonOffsetFromTop;
}

RCT_EXPORT_METHOD(setExtendedBugReportMode:(IBGExtendedBugReportMode)extendedBugReportMode) {
    IBGBugReporting.extendedBugReportMode = extendedBugReportMode;
}

RCT_EXPORT_METHOD(setEnabledAttachmentTypes:(BOOL)screenShot
                  extraScreenShot:(BOOL)extraScreenShot
                  galleryImage:(BOOL)galleryImage
                  screenRecording:(BOOL)screenRecording) {
    IBGAttachmentType attachmentTypes = 0;
    if(screenShot) {
        attachmentTypes = IBGAttachmentTypeScreenShot;
    }
    if(extraScreenShot) {
        attachmentTypes |= IBGAttachmentTypeExtraScreenShot;
    }
    if(galleryImage) {
        attachmentTypes |= IBGAttachmentTypeGalleryImage;
    }
    if(screenRecording) {
        attachmentTypes |= IBGAttachmentTypeScreenRecording;
    }
    
    IBGBugReporting.enabledAttachmentTypes = attachmentTypes;
}

RCT_EXPORT_METHOD(setViewHierarchyEnabled:(BOOL)viewHirearchyEnabled) {
    IBGBugReporting.shouldCaptureViewHierarchy = viewHirearchyEnabled;
}

RCT_EXPORT_METHOD(setVideoRecordingFloatingButtonPosition:(IBGPosition)position) {
    IBGBugReporting.videoRecordingFloatingButtonPosition = position;
}

RCT_EXPORT_METHOD(setReportTypes:(NSArray*) types ) {
    IBGBugReportingReportType reportTypes = 0;
    for (NSNumber *boxedValue in types) {
        reportTypes |= [boxedValue intValue];
    }
    [IBGBugReporting setPromptOptionsEnabledReportTypes: reportTypes];
}

RCT_EXPORT_METHOD(show:(IBGBugReportingReportType)type options:(NSArray*) options) {
    IBGBugReportingOption parsedOptions = 0;
    for (NSNumber *boxedValue in options) {
        parsedOptions |= [boxedValue intValue];
    }
    NSArray* args = @[@(type), @(parsedOptions)];
    [[NSRunLoop mainRunLoop] performSelector:@selector(showBugReportingWithReportTypeAndOptionsHelper:) target:self argument:args order:0 modes:@[NSDefaultRunLoopMode]];
}

- (void) showBugReportingWithReportTypeAndOptionsHelper:(NSArray*)args {
    IBGBugReportingReportType parsedreportType = [args[0] intValue];
    IBGBugReportingOption parsedOptions = [args[1] intValue];
    [IBGBugReporting showWithReportType:parsedreportType options:parsedOptions];
}

RCT_EXPORT_METHOD(setShakingThresholdForiPhone:(double)iPhoneShakingThreshold) {
    IBGBugReporting.shakingThresholdForiPhone = iPhoneShakingThreshold;
}

RCT_EXPORT_METHOD(setShakingThresholdForiPad:(double)iPadShakingThreshold) {
    IBGBugReporting.shakingThresholdForiPad = iPadShakingThreshold;
}

RCT_EXPORT_METHOD(setDisclaimerText:(NSString*)text) {
   [IBGBugReporting setDisclaimerText:text];
}

RCT_EXPORT_METHOD(setCommentMinimumCharacterCount:(nonnull NSNumber *)limit reportTypes:(NSArray *)reportTypes) {
    IBGBugReportingReportType parsedReportTypes = 0;

    if (![reportTypes count]) {
        parsedReportTypes = @(IBGBugReportingReportTypeBug).integerValue | @(IBGBugReportingReportTypeFeedback).integerValue | @(IBGBugReportingReportTypeQuestion).integerValue;
    }
    else {
        for (NSNumber *reportType in reportTypes) {
            parsedReportTypes |= [reportType intValue];
        }
    }

   [IBGBugReporting setCommentMinimumCharacterCountForReportTypes:parsedReportTypes withLimit:limit.intValue];
}

@synthesize description;

@synthesize hash;

@synthesize superclass;

@end
