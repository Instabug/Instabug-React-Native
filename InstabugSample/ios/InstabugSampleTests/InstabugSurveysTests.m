//
//  InstabugSurveysTests.m
//  InstabugSampleTests
//
//  Created by Salma Ali on 7/31/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <XCTest/XCTest.h>
#import "OCMock/OCMock.h"
#import "InstabugSurveysBridge.h"
#import <Instabug/IBGTypes.h>
#import "Instabug/Instabug.h"
#import "IBGConstants.h"

@interface InstabugSurveysTests : XCTestCase
@property (nonatomic, retain) InstabugSurveysBridge *instabugBridge;
@end

@protocol SurveysCPTestProtocol <NSObject>
/**
 * This protocol helps in correctly mapping Surveys mocked methods
 * when their method name matches another method in a different
 * module that differs in method signature.
 */
- (void)setEnabled:(BOOL)isEnabled;

@end

// typedef void (^AvailableSurveysWithCompletionBlock)(NSArray<IBGSurveys *> *availableSurveys);

@implementation InstabugSurveysTests

- (void)setUp {
  // Put setup code here. This method is called before the invocation of each test method in the class.
  self.instabugBridge = [[InstabugSurveysBridge alloc] init];
}

/*
 +------------------------------------------------------------------------+
 |                            Surveys Module                              |
 +------------------------------------------------------------------------+
 */

- (void)testShowingSurvey {
  id mock = OCMClassMock([IBGSurveys class]);
  NSString *token = @"token";
  
  OCMStub([mock showSurveyWithToken:token]);
  [self.instabugBridge showSurvey:token];
  OCMVerify([mock showSurveyWithToken:token]);
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
  [self.instabugBridge setAutoShowingEnabled:isEnabled];
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
  [self.instabugBridge setShouldShowWelcomeScreen:isEnabled];
  OCMVerify([mock setShouldShowWelcomeScreen:isEnabled]);
}

- (void) testSetSurveysEnabled {
  BOOL isEnabled = YES;
  
  [self.instabugBridge setEnabled:isEnabled];
  XCTAssertTrue(IBGSurveys.enabled);
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
  [self.instabugBridge hasRespondedToSurvey:surveyToken callback:callback];
  OCMVerify([mock hasRespondedToSurveyWithToken:surveyToken]);
  [self waitForExpectationsWithTimeout:EXPECTATION_TIMEOUT handler:nil];
}

// - (void) testGetAvailableSurveys {
//   id mock = OCMClassMock([IBGSurveys class]);
//   RCTResponseSenderBlock callback = ^void(NSArray *response) {};
//   AvailableSurveysWithCompletionBlock deeperCallback = ^(NSArray<IBGSurveys *> *availableSurveys) {};

//   OCMStub([mock availableSurveysWithCompletionHandler:deeperCallback]);
//   [self.instabugBridge getAvailableSurveys:callback];
//   OCMVerify([mock availableSurveysWithCompletionHandler:deeperCallback]);
// }

- (void) testSetWillShowSurveyHandler {
  id partialMock = OCMPartialMock(self.instabugBridge);
  RCTResponseSenderBlock callback = ^(NSArray *response) {};
  [partialMock setOnShowHandler:callback];
  XCTAssertNotNil(IBGSurveys.willShowSurveyHandler);
  OCMStub([partialMock sendEventWithName:OCMOCK_ANY body:nil]);
  IBGSurveys.willShowSurveyHandler();
  OCMVerify([partialMock sendEventWithName:@"IBGWillShowSurvey" body:nil]);
}

- (void) testSetDidDismissSurveyHandler {
  id partialMock = OCMPartialMock(self.instabugBridge);
  RCTResponseSenderBlock callback = ^(NSArray *response) {};
  [partialMock setOnDismissHandler:callback];
  XCTAssertNotNil(IBGSurveys.didDismissSurveyHandler);
  OCMStub([partialMock sendEventWithName:OCMOCK_ANY body:nil]);
  IBGSurveys.didDismissSurveyHandler();
  OCMVerify([partialMock sendEventWithName:@"IBGDidDismissSurvey" body:nil]);
}


- (void) testSetAppStoreURL {
  NSString *appStoreURL = @"http://test";
  
  [self.instabugBridge setAppStoreURL:appStoreURL];
  XCTAssertEqual(IBGSurveys.appStoreURL, appStoreURL);
}


@end

