//
//  InstabugFeatureRequestsBridge.h
//  RNInstabug
//
//  Created by Salma Ali on 7/30/19.
//  Copyright © 2019 instabug. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <Instabug/IBGTypes.h>

@interface InstabugFeatureRequestsBridge : RCTEventEmitter <RCTBridgeModule>
/*
 +------------------------------------------------------------------------+
 |                            Feature Requests Module                     |
 +------------------------------------------------------------------------+
 */

- (void)setEmailFieldRequiredForFeatureRequests:(BOOL)isEmailFieldRequired forAction:(NSArray *)actionTypesArray;

- (void)show;

- (void)setEnabled:(BOOL) isEnabled;


@end


