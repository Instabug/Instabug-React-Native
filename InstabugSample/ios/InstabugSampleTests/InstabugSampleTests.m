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

@protocol SurveysCPTestProtocol <NSObject>
/**
 * This protocol helps in correctly mapping Surveys mocked methods
 * when their method name matches another method in a different
 * module that differs in method signature.
 */
- (void)setEnabled:(BOOL)isEnabled;

@end

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
  
  [[[mock stub] classMethod] showSurveyWithToken:token];
  [self.instabugBridge showSurveyWithToken:token];
  [[[mock verify] classMethod] showSurveyWithToken:token];
}

- (void) testShowSurveyIfAvailable {
  id mock = OCMClassMock([IBGSurveys class]);
  
  OCMStub([mock showSurveyIfAvailable]);
  [self.instabugBridge showSurveysIfAvailable];
  OCMVerify([mock showSurveyIfAvailable]);
}

- (void) testAutoShowingSurveysEnabled {
  id mock = OCMClassMock([IBGSurveys class]);
  BOOL isEnabled = YES;
  
  OCMStub([mock setAutoShowingEnabled:isEnabled]);
  [self.instabugBridge setAutoShowingSurveysEnabled:isEnabled];
  OCMVerify([mock setAutoShowingEnabled:isEnabled]);
}

- (void) testSetThresholdForReshowingSurveyAfterDismiss {
  id mock = OCMClassMock([IBGSurveys class]);
  NSInteger sessionCount = 1;
  NSInteger daysCount = 2;
  
  OCMStub([mock setThresholdForReshowingSurveyAfterDismiss:sessionCount daysCount:daysCount]);
  [self.instabugBridge setThresholdForReshowingSurveyAfterDismiss:sessionCount daysCount:daysCount];
  OCMVerify([mock setThresholdForReshowingSurveyAfterDismiss:sessionCount daysCount:daysCount]);
}

- (void) testSetShouldShowSurveysWelcomeScreen {
  id mock = OCMClassMock([IBGSurveys class]);
  BOOL isEnabled = YES;
  
  OCMStub([mock setShouldShowWelcomeScreen:isEnabled]);
  [self.instabugBridge setShouldShowSurveysWelcomeScreen:isEnabled];
  OCMVerify([mock setShouldShowWelcomeScreen:isEnabled]);
}

- (void) testSetSurveysEnabled {
  id<SurveysCPTestProtocol> mock = OCMClassMock([IBGSurveys class]);
  BOOL isEnabled = YES;
  
  OCMStub([mock setEnabled:isEnabled]);
  [self.instabugBridge setSurveysEnabled:isEnabled];
  OCMVerify([mock setEnabled:isEnabled]);
}

- (void) testHasRespondedToSurveyWithToken {
  id mock = OCMClassMock([IBGSurveys class]);
  NSString *surveyToken = @"survey_token";
  XCTestExpectation *expectation = [self expectationWithDescription:@"Testing hasRespondedToSurveyWithToken callback"];
  RCTResponseSenderBlock callback = ^void(NSArray *response) {
    BOOL actualValue = [response[0] boolValue];
    XCTAssertTrue(actualValue);
    [expectation fulfill];
  };
  
  OCMStub([mock hasRespondedToSurveyWithToken:surveyToken]).andReturn(YES);
  [self.instabugBridge hasRespondedToSurveyWithToken:surveyToken callback:callback];
  OCMVerify([mock hasRespondedToSurveyWithToken:surveyToken]);
  [self waitForExpectationsWithTimeout:EXPECTATION_TIMEOUT handler:nil];
}

- (void) testGetAvailableSurveys {
  id mock = OCMClassMock([IBGSurveys class]);
  NSString *surveyToken = @"survey_token";
  RCTResponseSenderBlock callback = ^void(NSArray *response) {};
  
  OCMStub([mock availableSurveys]);
  [self.instabugBridge getAvailableSurveys:callback];
  OCMVerify([mock availableSurveys]);
  
}

- (void) testSetWillShowSurveyHandler {
  id partialMock = OCMPartialMock(self.instabugBridge);
  RCTResponseSenderBlock callback = ^(NSArray *response) {};
  [partialMock setWillShowSurveyHandler:callback];
  XCTAssertNotNil(IBGSurveys.willShowSurveyHandler);
  OCMStub([partialMock sendEventWithName:OCMOCK_ANY body:nil]);
  IBGSurveys.willShowSurveyHandler();
  OCMVerify([partialMock sendEventWithName:@"IBGWillShowSurvey" body:nil]);
}

- (void) testSetDidDismissSurveyHandler {
  id partialMock = OCMPartialMock(self.instabugBridge);
  RCTResponseSenderBlock callback = ^(NSArray *response) {};
  [partialMock setDidDismissSurveyHandler:callback];
  XCTAssertNotNil(IBGSurveys.didDismissSurveyHandler);
  OCMStub([partialMock sendEventWithName:OCMOCK_ANY body:nil]);
  IBGSurveys.didDismissSurveyHandler();
  OCMVerify([partialMock sendEventWithName:@"IBGDidDismissSurvey" body:nil]);
}

@end
