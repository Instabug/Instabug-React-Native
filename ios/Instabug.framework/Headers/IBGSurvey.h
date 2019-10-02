/*
 File:       Instabug/IBGSurvey.h
 
 Contains:   API for using Instabug's SDK.
 
 Copyright:  (c) 2013-2019 by Instabug, Inc., all rights reserved.
 
 Version:    8.7.2
 */

#import <Foundation/Foundation.h>

@interface IBGSurvey : NSObject

@property (nonatomic, readonly) NSString *title;

- (void)show;

@end
