//
//  IBGCrashReporting.h
//  InstabugCrashReporting
//
//  Created by Yousef Hamza on 5/17/18.
//  Copyright © 2018 Moataz. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_SWIFT_NAME(CrashReporting)
@interface IBGCrashReporting : NSObject

@property (class, atomic, assign) BOOL enabled;

/**
 @brief Report an exception manually.
 
 @param exception Exception to be reported.
 */
+ (void)reportException:(NSException *)exception;

/**
 @brief Report an error manually.
 
 @param error error to be reported.
 */
+ (void)reportError:(NSError *)error;

@end
