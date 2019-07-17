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


/***********Bug Reporting*****************/

- (void) testgivenBoolean$setBugReportingEnabled_whenQuery_thenShouldCallNativeApi {
  BOOL enabled = false;
  [self.instabugBridge setBugReportingEnabled:enabled];
  XCTAssertFalse(IBGBugReporting.enabled);
}

- (void) testgivenInvocationEvent$setInvocationEvents_whenQuery_thenShouldCallNativeApiWithArgs {
  NSArray *invocationEventsArr;
  invocationEventsArr = [NSArray arrayWithObjects:  @(IBGInvocationEventScreenshot), nil];
  
  [self.instabugBridge setInvocationEvents:invocationEventsArr];
  IBGInvocationEvent invocationEvents = 0;
  for (NSNumber *boxedValue in invocationEventsArr) {
    invocationEvents |= [boxedValue intValue];
  }
  XCTAssertEqual(IBGBugReporting.invocationEvents, invocationEvents);
}

- (void)testgiven$invoke_whenQuery_thenShouldCallNativeApi {
  id mock = OCMClassMock([IBGBugReporting class]);
  
  [[[mock stub] classMethod] invoke];
  [self.instabugBridge invoke];
  double delayInSeconds = 2.0;
  dispatch_time_t popTime = dispatch_time(DISPATCH_TIME_NOW, delayInSeconds * NSEC_PER_SEC);
  dispatch_after(popTime, dispatch_get_main_queue(), ^(void){
     [[[mock verify] classMethod] invoke];
  });
}

- (void) testgivenOptions$setInvocationOptions_whenQuery_thenShouldCallNativeApiWithArgs {
  NSArray *invocationOptionsArr;
  invocationOptionsArr = [NSArray arrayWithObjects:  @(IBGBugReportingInvocationOptionEmailFieldHidden), nil];
  
  [self.instabugBridge setInvocationOptions:invocationOptionsArr];
  IBGBugReportingInvocationOption invocationOptions = 0;
  for (NSNumber *boxedValue in invocationOptionsArr) {
    invocationOptions |= [boxedValue intValue];
  }
  XCTAssertEqual(IBGBugReporting.invocationOptions, invocationOptions);
}

- (void) testgivenInvocationModeAndOptiond$invokeWithModeOptions_whenQuery_thenShouldCallNativeApiWithArgs {
  NSArray *invocationOptionsArr;
  invocationOptionsArr = [NSArray arrayWithObjects:  @(IBGBugReportingInvocationOptionEmailFieldHidden), nil];
  IBGBugReportingInvocationOption invocationOptions = 0;
  for (NSNumber *boxedValue in invocationOptionsArr) {
    invocationOptions |= [boxedValue intValue];
  }
  IBGInvocationMode invocationMode = IBGInvocationModeNewBug;
  id mock = OCMClassMock([IBGBugReporting class]);
  
  [[[mock stub] classMethod] invokeWithMode:invocationMode options:invocationOptions];
  [self.instabugBridge invokeWithInvocationModeAndOptions:invocationMode options:invocationOptionsArr];
  double delayInSeconds = 2.0;
  dispatch_time_t popTime = dispatch_time(DISPATCH_TIME_NOW, delayInSeconds * NSEC_PER_SEC);
  dispatch_after(popTime, dispatch_get_main_queue(), ^(void){
    [[[mock verify] classMethod] invokeWithMode:invocationMode options:invocationOptions];
  });
}


- (void) test {
  [self.instabugBridge setPreInvocationHandler:nil];
  XCTAssertEqual(IBGBugReporting.willInvokeHandler, nil);
}



@end
