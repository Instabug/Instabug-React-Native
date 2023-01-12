//
//  InstabugBugReportingTests.m
//  InstabugSampleTests
//
//  Created by Salma Ali on 7/30/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <XCTest/XCTest.h>
#import "OCMock/OCMock.h"
#import "InstabugBugReportingBridge.h"
#import <Instabug/IBGTypes.h>
#import "Instabug/Instabug.h"
#import "IBGConstants.h"

@interface InstabugBugReportingTests : XCTestCase
@property (nonatomic, retain) InstabugBugReportingBridge *instabugBridge;
@end

@implementation InstabugBugReportingTests

- (void)setUp {
  // Put setup code here. This method is called before the invocation of each test method in the class.
  self.instabugBridge = [[InstabugBugReportingBridge alloc] init];
}

/*
 +------------------------------------------------------------------------+
 |                          Bug Reporting Module                          |
 +------------------------------------------------------------------------+
 */

- (void) testgivenBoolean$setBugReportingEnabled_whenQuery_thenShouldCallNativeApi {
  BOOL enabled = true;
  [self.instabugBridge setEnabled:enabled];
  XCTAssertTrue(IBGBugReporting.enabled);
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

- (void) testgivenOptions$setOptions_whenQuery_thenShouldCallNativeApiWithArgs {
  NSArray *invocationOptionsArr = [NSArray arrayWithObjects:  @(IBGBugReportingInvocationOptionEmailFieldHidden), nil];
  
  [self.instabugBridge setOptions:invocationOptionsArr];
  IBGBugReportingOption invocationOptions = 0;
  for (NSNumber *boxedValue in invocationOptionsArr) {
    invocationOptions |= [boxedValue intValue];
  }
  XCTAssertEqual(IBGBugReporting.bugReportingOptions, invocationOptions);
}

- (void) testgivenHandler$setOnInvokeHandler_whenQuery_thenShouldCallNativeApi {
  id partialMock = OCMPartialMock(self.instabugBridge);
  RCTResponseSenderBlock callback = ^(NSArray *response) {};
  [partialMock setOnInvokeHandler:callback];
  XCTAssertNotNil(IBGBugReporting.willInvokeHandler);
  OCMStub([partialMock sendEventWithName:@"IBGpreInvocationHandler" body:nil]);
  IBGBugReporting.willInvokeHandler();
  OCMVerify([partialMock sendEventWithName:@"IBGpreInvocationHandler" body:nil]);
}


- (void) testgivenHandlerCANCEL$setOnDismissHandler_whenQuery_thenShouldCallNativeApi {
  id partialMock = OCMPartialMock(self.instabugBridge);
  IBGDismissType dismissType = IBGDismissTypeCancel;
  IBGReportType reportType = IBGReportTypeBug;

  RCTResponseSenderBlock callback = ^(NSArray *response) {};
  [partialMock setOnDismissHandler:callback];
  XCTAssertNotNil(IBGBugReporting.didDismissHandler);
  NSDictionary *result = @{ @"dismissType": @(dismissType),
                            @"reportType": @(reportType)};

  OCMStub([partialMock sendEventWithName:@"IBGpostInvocationHandler" body:result]);
  IBGBugReporting.didDismissHandler(dismissType, reportType);
  OCMVerify([partialMock sendEventWithName:@"IBGpostInvocationHandler" body:result]);
}

- (void) testgivenHandlerSUBMIT$setOnDismissHandler_whenQuery_thenShouldCallNativeApi {
  id partialMock = OCMPartialMock(self.instabugBridge);
  IBGDismissType dismissType = IBGDismissTypeSubmit;
  IBGReportType reportType = IBGReportTypeFeedback;

  RCTResponseSenderBlock callback = ^(NSArray *response) {};
  [partialMock setOnDismissHandler:callback];
  XCTAssertNotNil(IBGBugReporting.didDismissHandler);
  NSDictionary *result = @{ @"dismissType": @(dismissType),
                            @"reportType": @(reportType)};

  OCMStub([partialMock sendEventWithName:@"IBGpostInvocationHandler" body:result]);
  IBGBugReporting.didDismissHandler(dismissType, reportType);
  OCMVerify([partialMock sendEventWithName:@"IBGpostInvocationHandler" body:result]);
}

- (void) testgivenHandlerADD_ATTACHMENT$setOnDismissHandler_whenQuery_thenShouldCallNativeApi {
  id partialMock = OCMPartialMock(self.instabugBridge);
  IBGDismissType dismissType = IBGDismissTypeAddAttachment;
  IBGReportType reportType = IBGReportTypeFeedback;

  RCTResponseSenderBlock callback = ^(NSArray *response) {};
  [partialMock setOnDismissHandler:callback];
  XCTAssertNotNil(IBGBugReporting.didDismissHandler);
  NSDictionary *result = @{ @"dismissType": @(dismissType),
                            @"reportType": @(reportType)};

  OCMStub([partialMock sendEventWithName:@"IBGpostInvocationHandler" body:result]);
  IBGBugReporting.didDismissHandler(dismissType, reportType);
  OCMVerify([partialMock sendEventWithName:@"IBGpostInvocationHandler" body:result]);
}

- (void) skip_testgivenDouble$setShakingThresholdForiPhone_whenQuery_thenShouldCallNativeApi {
  double threshold = 12;
  [self.instabugBridge setShakingThresholdForiPhone:threshold];
  XCTAssertEqual(IBGBugReporting.shakingThresholdForiPhone, threshold);
}

- (void) skip_testgivenDouble$setShakingThresholdForiPad_whenQuery_thenShouldCallNativeApi {
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
  [self.instabugBridge show:reportType options:options];
  
  XCTestExpectation *expectation = [self expectationWithDescription:@"Test ME PLX"];
  
  [[NSRunLoop mainRunLoop] performBlock:^{
    OCMVerify([mock showWithReportType:reportType options:parsedOptions]);
    [expectation fulfill];
  }];
  
  [self waitForExpectationsWithTimeout:EXPECTATION_TIMEOUT handler:nil];
}

- (void) testgivenBoolean$setAutoScreenRecordingEnabled_whenQuery_thenShouldCallNativeApi {
  BOOL enabled = true;
  [self.instabugBridge setAutoScreenRecordingEnabled:enabled];
  XCTAssertTrue(IBGBugReporting.autoScreenRecordingEnabled);
}

- (void) testgivenArgs$setAutoScreenRecordingDuration_whenQuery_thenShouldCallNativeApi {
  CGFloat duration = 12.3;
  [self.instabugBridge setAutoScreenRecordingDuration:duration];
  XCTAssertEqual(IBGBugReporting.autoScreenRecordingDuration, duration);
}

- (void) testgivenBoolean$setViewHierarchyEnabled_whenQuery_thenShouldCallNativeApi {
  BOOL enabled = true;
  [self.instabugBridge setViewHierarchyEnabled:enabled];
  XCTAssertTrue(IBGBugReporting.shouldCaptureViewHierarchy);
}

- (void) testSetDisclaimerText {
  id mock = OCMClassMock([IBGBugReporting class]);
  NSString *text = @"This is a disclaimer text!";

  OCMStub([mock setDisclaimerText:text]);
  [self.instabugBridge setDisclaimerText:text];
  OCMVerify([mock setDisclaimerText:text]);
}

- (void) testSetCommentMinimumCharacterCount {
  id mock = OCMClassMock([IBGBugReporting class]);
  NSNumber *limit = [NSNumber numberWithInt:20];
  NSArray *reportTypesArr = [NSArray arrayWithObjects: @(IBGReportTypeBug), nil];
  IBGBugReportingReportType reportTypes = 0;
  for (NSNumber *reportType in reportTypesArr) {
    reportTypes |= [reportType intValue];
  }
  OCMStub([mock setCommentMinimumCharacterCountForReportTypes:reportTypes withLimit:limit.intValue]);
  [self.instabugBridge setCommentMinimumCharacterCount:limit reportTypes:reportTypesArr];
  OCMVerify([mock setCommentMinimumCharacterCountForReportTypes:reportTypes withLimit:limit.intValue]);
}

@end

