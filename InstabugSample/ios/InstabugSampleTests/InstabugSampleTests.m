/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <XCTest/XCTest.h>
#import "OCMock/OCMock.h"
#import "Instabug/Instabug.h"
#import "Instabug/IBGSurvey.h"
#import "InstabugReactBridge.h"

@interface InstabugSampleTests : XCTestCase
@property InstabugReactBridge *instabugBridge;
@end

@implementation InstabugSampleTests

- (void)setUp {
  // Put setup code here. This method is called before the invocation of each test method in the class.
  self.instabugBridge = [[InstabugReactBridge alloc] init];
}

- (void)testShowingSurveyWithToken {
  NSString *token = @"token";
  id mock = OCMClassMock([IBGSurveys class]);
  
  [[[mock stub] classMethod] showSurveyWithToken:token];
  [self.instabugBridge showSurveyWithToken:token];
  [[[mock verify] classMethod] showSurveyWithToken:token];
}

@end
