//
//  UIView+Instabug.h
//  InstabugUtilities
//
//  Created by Aly Yakan on 7/17/18.
//  Copyright © 2018 Moataz. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UIView (Instabug)

/**
 @brief Set this to true on any UIView to mark it as private.
 Doing this will exclude it from all screenshots, view hierarchy captures and screen recordings.
 */
@property (nonatomic, assign) BOOL instabug_privateView;

@end
