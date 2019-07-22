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

@interface InstabugReactBridge : RCTEventEmitter <RCTBridgeModule>

- (void)showSurveyWithToken:(NSString *)surveyToken;

@end
