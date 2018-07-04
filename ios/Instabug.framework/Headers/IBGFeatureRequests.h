//
//  IBGFeatureRequests.h
//  Instabug
//
//  Created by Yousef Hamza on 5/17/18.
//  Copyright © 2018 Moataz. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <InstabugCore/InstabugCore.h>

NS_SWIFT_NAME(FeatureRequests)
@interface IBGFeatureRequests : NSObject
/**
 @brief Sets whether users are required to enter an email address or not when doing a certain action `IBGAction`.
 
 @discussion Defaults to YES.
 
 @param isEmailFieldRequired A boolean to indicate whether email field is required or not.
 @param actionType An enum that indicates which action types will have the isEmailFieldRequired.
 */
+ (void)setEmailFieldRequired:(BOOL)isEmailFieldRequired forAction:(IBGAction)actionType;

/**
 @brief Shows the UI for feature requests list
 */
+ (void)show;

@end
