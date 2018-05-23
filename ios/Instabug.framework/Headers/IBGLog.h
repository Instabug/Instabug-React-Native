//
//  IBGLog.h
//  InstabugI
//
//  Created by Yousef Hamza on 5/17/18.
//  Copyright © 2018 Moataz. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <InstabugCore/InstabugCore.h>

@interface IBGLog : NSObject

@property (class, atomic, assign) BOOL printsToConsole;

+ (void)log;
+ (void)logVerbose;
+ (void)logError;
+ (void)logInfo;
+ (void)logWarn;

@end
