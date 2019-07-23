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

NSTimeInterval EXPECTATION_TIMEOUT = 10;

- (void)setUp {
  // Put setup code here. This method is called before the invocation of each test method in the class.
  self.instabugBridge = [[InstabugReactBridge alloc] init];
}

- (void)testShowingSurveyWithToken {
  NSString *token = @"token";
  id mock = OCMClassMock([IBGSurveys class]);
  
  OCMStub([mock showSurveyWithToken:token]);
  [self.instabugBridge showSurveyWithToken:token];
  OCMVerify([mock showSurveyWithToken:token]);
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
  
  OCMStub([mock invoke]);
  [self.instabugBridge invoke];
  XCTestExpectation *expectation = [self expectationWithDescription:@"Test ME PLX"];
  
  [[NSRunLoop mainRunLoop] performBlock:^{
    OCMVerify([mock invoke]);
    [expectation fulfill];
  }];
  
  [self waitForExpectationsWithTimeout:EXPECTATION_TIMEOUT handler:nil];
}

- (void) testgivenOptions$setInvocationOptions_whenQuery_thenShouldCallNativeApiWithArgs {
  NSArray *invocationOptionsArr = [NSArray arrayWithObjects:  @(IBGBugReportingInvocationOptionEmailFieldHidden), nil];
  
  [self.instabugBridge setInvocationOptions:invocationOptionsArr];
  IBGBugReportingInvocationOption invocationOptions = 0;
  for (NSNumber *boxedValue in invocationOptionsArr) {
    invocationOptions |= [boxedValue intValue];
  }
  XCTAssertEqual(IBGBugReporting.invocationOptions, invocationOptions);
}

- (void) testgivenInvocationModeAndOptiond$invokeWithModeOptions_whenQuery_thenShouldCallNativeApiWithArgs {
  NSArray *invocationOptionsArr = [NSArray arrayWithObjects:  @(IBGBugReportingInvocationOptionEmailFieldHidden), nil];
  IBGBugReportingInvocationOption invocationOptions = 0;
  for (NSNumber *boxedValue in invocationOptionsArr) {
    invocationOptions |= [boxedValue intValue];
  }
  IBGInvocationMode invocationMode = IBGInvocationModeNewBug;
  id mock = OCMClassMock([IBGBugReporting class]);
  OCMStub([mock invokeWithMode:invocationMode options:invocationOptions]);
  [self.instabugBridge invokeWithInvocationModeAndOptions:invocationMode options:invocationOptionsArr];
  XCTestExpectation *expectation = [self expectationWithDescription:@"Test ME PLX"];
  
  [[NSRunLoop mainRunLoop] performBlock:^{
    OCMVerify([mock invokeWithMode:invocationMode options:invocationOptions]);
    [expectation fulfill];
  }];
  
  [self waitForExpectationsWithTimeout:EXPECTATION_TIMEOUT handler:nil];
}

- (void) testgivenPreInvocationHandler$setPreInvocationHandler_whenQuery_thenShouldCallNativeApi {
  id partialMock = OCMPartialMock(self.instabugBridge);
  RCTResponseSenderBlock callback = ^(NSArray *response) {};
  [partialMock setPreInvocationHandler:callback];
  XCTAssertNotNil(IBGBugReporting.willInvokeHandler);
  OCMStub([partialMock sendEventWithName:@"IBGpreInvocationHandler" body:nil]);
  IBGBugReporting.willInvokeHandler();
  OCMVerify([partialMock sendEventWithName:@"IBGpreInvocationHandler" body:nil]);
}


- (void) testgivenPostInvocationHandlerCANCEL$setPostInvocationHandler_whenQuery_thenShouldCallNativeApi {
  id partialMock = OCMPartialMock(self.instabugBridge);
  RCTResponseSenderBlock callback = ^(NSArray *response) {};
  [partialMock setPostInvocationHandler:callback];
  XCTAssertNotNil(IBGBugReporting.didDismissHandler);
  NSDictionary *result = @{ @"dismissType": @"CANCEL",
                            @"reportType": @"bug"};
  OCMStub([partialMock sendEventWithName:@"IBGpostInvocationHandler" body:result]);
  IBGBugReporting.didDismissHandler(IBGDismissTypeCancel,IBGReportTypeBug);
  OCMVerify([partialMock sendEventWithName:@"IBGpostInvocationHandler" body:result]);
}

- (void) testgivenPostInvocationHandlerSUBMIT$setPostInvocationHandler_whenQuery_thenShouldCallNativeApi {
  id partialMock = OCMPartialMock(self.instabugBridge);
  RCTResponseSenderBlock callback = ^(NSArray *response) {};
  [partialMock setPostInvocationHandler:callback];
  XCTAssertNotNil(IBGBugReporting.didDismissHandler);
  
  NSDictionary *result = @{ @"dismissType": @"SUBMIT",
                             @"reportType": @"feedback"};
  OCMStub([partialMock sendEventWithName:@"IBGpostInvocationHandler" body:result]);
  IBGBugReporting.didDismissHandler(IBGDismissTypeSubmit,IBGReportTypeFeedback);
  OCMVerify([partialMock sendEventWithName:@"IBGpostInvocationHandler" body:result]);
}

- (void) testgivenPostInvocationHandlerADD_ATTACHMENT$setPostInvocationHandler_whenQuery_thenShouldCallNativeApi {
  id partialMock = OCMPartialMock(self.instabugBridge);
  RCTResponseSenderBlock callback = ^(NSArray *response) {};
  [partialMock setPostInvocationHandler:callback];
  XCTAssertNotNil(IBGBugReporting.didDismissHandler);
  NSDictionary *result = @{ @"dismissType": @"ADD_ATTACHMENT",
                             @"reportType": @"feedback"};
  OCMStub([partialMock sendEventWithName:@"IBGpostInvocationHandler" body:result]);
  IBGBugReporting.didDismissHandler(IBGDismissTypeAddAttachment,IBGReportTypeFeedback);
  OCMVerify([partialMock sendEventWithName:@"IBGpostInvocationHandler" body:result]);
}

- (void) testgivenBooleans$setPromptOptionsEnabled_whenQuery_thenShouldCallNativeApi {
  id mock = OCMClassMock([IBGBugReporting class]);
  BOOL enabled = true;
  IBGPromptOption promptOption = IBGPromptOptionNone + IBGPromptOptionChat + IBGPromptOptionBug + IBGPromptOptionFeedback;
  OCMStub([mock setPromptOptions:promptOption]);
  [self.instabugBridge setPromptOptionsEnabled:enabled feedback:enabled chat:enabled];
  OCMVerify([mock setPromptOptions:promptOption]);
}

- (void) testgivenDouble$setShakingThresholdForiPhone_whenQuery_thenShouldCallNativeApi {
  double threshold = 12;
  [self.instabugBridge setShakingThresholdForiPhone:threshold];
  XCTAssertEqual(IBGBugReporting.shakingThresholdForiPhone, threshold);
}

- (void) testgivenDouble$setShakingThresholdForiPad_whenQuery_thenShouldCallNativeApi {
  double threshold = 12;
  [self.instabugBridge setShakingThresholdForiPad:threshold];
  XCTAssertEqual(IBGBugReporting.shakingThresholdForiPad, threshold);
}

- (void) testgivenExtendedBugReportMode$setExtendedBugReportMode_whenQuery_thenShouldCallNativeApi {
  IBGExtendedBugReportMode extendedBugReportMode = IBGExtendedBugReportModeEnabledWithOptionalFields;
  [self.instabugBridge setExtendedBugReportMode:extendedBugReportMode];
  XCTAssertEqual(IBGBugReporting.extendedBugReportMode, extendedBugReportMode);
}

- (void) testgivenArray$setReportTypes_whenQuery_thenShouldCallNativeApi {
  id mock = OCMClassMock([IBGBugReporting class]);
  NSArray *reportTypesArr = [NSArray arrayWithObjects:  @(IBGReportTypeBug), nil];
  IBGBugReportingReportType reportTypes = 0;
  for (NSNumber *boxedValue in reportTypesArr) {
    reportTypes |= [boxedValue intValue];
  }
  OCMStub([mock setPromptOptionsEnabledReportTypes:reportTypes]);
  [self.instabugBridge setReportTypes:reportTypesArr];
  OCMVerify([mock setPromptOptionsEnabledReportTypes:reportTypes]);
}


- (void) testgivenArgs$showBugReportingWithReportTypeAndOptions_whenQuery_thenShouldCallNativeApi {
  id mock = OCMClassMock([IBGBugReporting class]);
  IBGBugReportingReportType reportType = IBGBugReportingReportTypeBug;
  NSArray *options = [NSArray arrayWithObjects:  @(IBGBugReportingOptionEmailFieldOptional), nil];
  IBGBugReportingOption parsedOptions = 0;
  for (NSNumber *boxedValue in options) {
    parsedOptions |= [boxedValue intValue];
  }
  OCMStub([mock showWithReportType:reportType options:parsedOptions]);
  [self.instabugBridge showBugReportingWithReportTypeAndOptions:reportType :options];
  
  XCTestExpectation *expectation = [self expectationWithDescription:@"Test ME PLX"];
  
  [[NSRunLoop mainRunLoop] performBlock:^{
    OCMVerify([mock showWithReportType:reportType options:parsedOptions]);
    [expectation fulfill];
  }];
  
  [self waitForExpectationsWithTimeout:EXPECTATION_TIMEOUT handler:nil];
}

- (void) testgivenBoolean$setAutoScreenRecordingEnabled_whenQuery_thenShouldCallNativeApi {
  BOOL enabled = false;
  [self.instabugBridge setAutoScreenRecordingEnabled:enabled];
  XCTAssertFalse(IBGBugReporting.autoScreenRecordingEnabled);
}

- (void) testgivenArgs$setAutoScreenRecordingMaxDuration_whenQuery_thenShouldCallNativeApi {
  CGFloat duration = 12.3;
  [self.instabugBridge setAutoScreenRecordingMaxDuration:duration];
  XCTAssertEqual(IBGBugReporting.autoScreenRecordingDuration, duration);
}

- (void) testgivenBoolean$setViewHierarchyEnabled_whenQuery_thenShouldCallNativeApi {
  BOOL enabled = false;
  [self.instabugBridge setViewHierarchyEnabled:enabled];
  XCTAssertFalse(IBGBugReporting.shouldCaptureViewHierarchy);
}


@end
