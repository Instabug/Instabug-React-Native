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
#import <Instabug/IBGTypes.h>

@protocol InstabugCPTestProtocol <NSObject>
/**
 * This protocol helps in correctly mapping Instabug mocked methods
 * when their method name matches another method in a different
 * module that differs in method signature.
 */
- (void)startWithToken:(NSString *)token invocationEvents:(IBGInvocationEvent)invocationEvents;
- (void)setLocale:(IBGLocale)locale;

@end

@protocol SurveysCPTestProtocol <NSObject>
/**
 * This protocol helps in correctly mapping Surveys mocked methods
 * when their method name matches another method in a different
 * module that differs in method signature.
 */
- (void)setEnabled:(BOOL)isEnabled;

@end

@interface InstabugSampleTests : XCTestCase
@property (nonatomic, retain) InstabugReactBridge *instabugBridge;
@end

@implementation InstabugSampleTests

NSTimeInterval EXPECTATION_TIMEOUT = 10;

- (void)setUp {
  // Put setup code here. This method is called before the invocation of each test method in the class.
  self.instabugBridge = [[InstabugReactBridge alloc] init];
}

/*
 +------------------------------------------------------------------------+
 |                            Instabug Module                             |
 +------------------------------------------------------------------------+
 */

- (void)testStartWithToken {
  id<InstabugCPTestProtocol> mock = OCMClassMock([Instabug class]);
  IBGInvocationEvent floatingButtonInvocationEvent = IBGInvocationEventFloatingButton;
  NSString *appToken = @"app_token";
  NSArray *invocationEvents = [NSArray arrayWithObjects:[NSNumber numberWithInteger:floatingButtonInvocationEvent], nil];
  XCTestExpectation *expectation = [self expectationWithDescription:@"Testing [Instabug startWithToken]"];
  
  OCMStub([mock startWithToken:appToken invocationEvents:floatingButtonInvocationEvent]);
  [self.instabugBridge startWithToken:appToken invocationEvents:invocationEvents];

  [[NSRunLoop mainRunLoop] performBlock:^{
    OCMVerify([mock startWithToken:appToken invocationEvents:floatingButtonInvocationEvent]);
    [expectation fulfill];
  }];

  [self waitForExpectationsWithTimeout:EXPECTATION_TIMEOUT handler:nil];
}

- (void)testSetUserData {
  id mock = OCMClassMock([Instabug class]);
  NSString *userData = @"user_data";
  
  OCMStub([mock setUserData:userData]);
  [self.instabugBridge setUserData:userData];
  OCMVerify([mock setUserData:userData]);
}

- (void)testSetTrackUserSteps {
  id mock = OCMClassMock([Instabug class]);
  BOOL isEnabled = true;
  
  OCMStub([mock setTrackUserSteps:isEnabled]);
  [self.instabugBridge setTrackUserSteps:isEnabled];
  OCMVerify([mock setTrackUserSteps:isEnabled]);
}

- (void)testSetSessionProfilerEnabled {
  id mock = OCMClassMock([Instabug class]);
  BOOL sessionProfilerEnabled = true;
  
  OCMStub([mock setSessionProfilerEnabled:sessionProfilerEnabled]);
  [self.instabugBridge setSessionProfilerEnabled:sessionProfilerEnabled];
  OCMVerify([mock setSessionProfilerEnabled:sessionProfilerEnabled]);
}

- (void)testSetPushNotificationsEnabled {
  id mock = OCMClassMock([Instabug class]);
  BOOL isPushNotificationEnabled = true;
  
  OCMStub([mock setPushNotificationsEnabled:isPushNotificationEnabled]);
  [self.instabugBridge setPushNotificationsEnabled:isPushNotificationEnabled];
  OCMVerify([mock setPushNotificationsEnabled:isPushNotificationEnabled]);
}

- (void)testSetLocale {
  id<InstabugCPTestProtocol> mock = OCMClassMock([Instabug class]);

  OCMStub([mock setLocale:IBGLocaleCzech]);
  [self.instabugBridge setLocale:IBGLocaleCzech];
  OCMVerify([mock setLocale:IBGLocaleCzech]);
}

- (void)testSetColorTheme {
  id mock = OCMClassMock([Instabug class]);
  IBGColorTheme colorTheme = IBGColorThemeLight;
  XCTestExpectation *expectation = [self expectationWithDescription:@"Testing [Instabug setColorTheme]"];

  OCMStub([mock setColorTheme:colorTheme]);
  [self.instabugBridge setColorTheme:colorTheme];

  [[NSRunLoop mainRunLoop] performBlock:^{
    OCMVerify([mock setColorTheme:colorTheme]);
    [expectation fulfill];
  }];

  [self waitForExpectationsWithTimeout:EXPECTATION_TIMEOUT handler:nil];
}

- (void)testSetPrimaryColor {
  UIColor *color = [UIColor whiteColor];
  XCTestExpectation *expectation = [self expectationWithDescription:@"Testing [Instabug setPrimaryColor]"];

  [self.instabugBridge setPrimaryColor:color];
  [[NSRunLoop mainRunLoop] performBlock:^{
    XCTAssertEqualObjects(Instabug.tintColor, color);
    [expectation fulfill];
  }];
  
  [self waitForExpectationsWithTimeout:EXPECTATION_TIMEOUT handler:nil];
}

- (void)testAppendTags {
  id mock = OCMClassMock([Instabug class]);
  NSArray *tags = @[@"tag1", @"tag2"];

  OCMStub([mock appendTags:tags]);
  [self.instabugBridge appendTags:tags];
  OCMVerify([mock appendTags:tags]);
}

- (void)testResetTags {
  id mock = OCMClassMock([Instabug class]);
  
  OCMStub([mock resetTags]);
  [self.instabugBridge resetTags];
  OCMVerify([mock resetTags]);
}

- (void)testGetTags {
  id mock = OCMClassMock([Instabug class]);
  RCTResponseSenderBlock callbackBlock = ^void(NSArray *response) {};
  NSDictionary *dictionary = @{ @"someKey" : @"someValue" };

  OCMStub([mock getTags]).andReturn(dictionary);
  [self.instabugBridge getTags:callbackBlock];
  OCMVerify([mock getTags]);
}

- (void)testSetString {
  id mock = OCMClassMock([Instabug class]);
  NSString *value = @"string_value";
  NSString *key = @"KEY";

  OCMStub([mock setValue:value forStringWithKey:key]);
  [self.instabugBridge setString:value toKey:key];
  OCMVerify([mock setValue:value forStringWithKey:key]);
}

- (void)testIdentifyUserWithEmail {
  id mock = OCMClassMock([Instabug class]);
  NSString *email = @"em@il.com";
  NSString *name = @"this is my name";
  
  OCMStub([mock identifyUserWithEmail:email name:name]);
  [self.instabugBridge identifyUserWithEmail:email name:name];
  OCMVerify([mock identifyUserWithEmail:email name:name]);
}

- (void)testLogOut {
  id mock = OCMClassMock([Instabug class]);
  
  OCMStub([mock logOut]);
  [self.instabugBridge logOut];
  OCMVerify([mock logOut]);
}

- (void)testLogUserEventWithName {
  id mock = OCMClassMock([Instabug class]);
  NSString *name = @"event name";
  
  OCMStub([mock logUserEventWithName:name]);
  [self.instabugBridge logUserEventWithName:name];
  OCMVerify([mock logUserEventWithName:name]);
}

- (void)testSetReproStepsMode {
  id mock = OCMClassMock([Instabug class]);
  IBGUserStepsMode reproStepsMode = IBGUserStepsModeEnabledWithNoScreenshots;
  
  OCMStub([mock setReproStepsMode:reproStepsMode]);
  [self.instabugBridge setReproStepsMode:reproStepsMode];
  OCMVerify([mock setReproStepsMode:reproStepsMode]);
}

- (void)testSetUserAttribute {
  id mock = OCMClassMock([Instabug class]);
  NSString *key = @"key";
  NSString *value = @"value";

  OCMStub([mock setUserAttribute:value withKey:key]);
  [self.instabugBridge setUserAttribute:key withValue:value];
  OCMVerify([mock setUserAttribute:value withKey:key]);
}

- (void)testGetUserAttribute {
  id mock = OCMClassMock([Instabug class]);
  NSString *key = @"someKey";
  RCTResponseSenderBlock callbackBlock = ^void(NSArray *response) {};

  OCMStub([mock userAttributeForKey:key]).andReturn(@"someValue");
  [self.instabugBridge getUserAttribute:key callback:callbackBlock];
  OCMVerify([mock userAttributeForKey:key]);
}

- (void)testRemoveUserAttribute {
  id mock = OCMClassMock([Instabug class]);
  NSString *key = @"someKey";
  
  OCMStub([mock removeUserAttributeForKey:key]);
  [self.instabugBridge removeUserAttribute:key];
  OCMVerify([mock removeUserAttributeForKey:key]);
}

- (void)testGetAllUserAttributes {
  id mock = OCMClassMock([Instabug class]);
  RCTResponseSenderBlock callbackBlock = ^void(NSArray *response) {};
  NSDictionary *dictionary = @{ @"someKey" : @"someValue" };
  
  OCMStub([mock userAttributes]).andReturn(dictionary);
  [self.instabugBridge getAllUserAttributes:callbackBlock];
  OCMVerify([mock userAttributes]);
}

- (void)testClearAllUserAttributes {
  id mock = OCMClassMock([Instabug class]);
  NSString *key = @"someKey";
  NSDictionary *dictionary = @{ @"someKey" : @"someValue" };

  OCMStub([mock userAttributes]).andReturn(dictionary);
  OCMStub([mock removeUserAttributeForKey:key]);
  [self.instabugBridge clearAllUserAttributes];
  OCMVerify([mock removeUserAttributeForKey:key]);
}

- (void)testSetViewHierarchyEnabled {
  BOOL enabled = true;
  [self.instabugBridge setViewHierarchyEnabled:enabled];
  XCTAssertTrue(Instabug.shouldCaptureViewHierarchy);
}

- (void)testShowWelcomeMessageWithMode {
  id mock = OCMClassMock([Instabug class]);
  IBGWelcomeMessageMode welcomeMessageMode = IBGWelcomeMessageModeBeta;
  
  OCMStub([mock showWelcomeMessageWithMode:welcomeMessageMode]);
  [self.instabugBridge showWelcomeMessageWithMode:welcomeMessageMode];
  OCMVerify([mock showWelcomeMessageWithMode:welcomeMessageMode]);
}

- (void)testSetWelcomeMessageMode {
  id mock = OCMClassMock([Instabug class]);
  IBGWelcomeMessageMode welcomeMessageMode = IBGWelcomeMessageModeBeta;
  
  OCMStub([mock setWelcomeMessageMode:welcomeMessageMode]);
  [self.instabugBridge setWelcomeMessageMode:welcomeMessageMode];
  OCMVerify([mock setWelcomeMessageMode:welcomeMessageMode]);
}

- (void)testSetFileAttachment {
  id mock = OCMClassMock([Instabug class]);
  NSString *fileLocation = @"test";
  NSURL *url = [NSURL URLWithString:fileLocation];
  
  OCMStub([mock addFileAttachmentWithURL:url]);
  [self.instabugBridge setFileAttachment:fileLocation];
  OCMVerify([mock addFileAttachmentWithURL:url]);
}

- (void)testShow {
  id mock = OCMClassMock([Instabug class]);

  OCMStub([mock show]);
  [self.instabugBridge show];

  XCTestExpectation *expectation = [self expectationWithDescription:@"Testing [Instabug show]"];

  [[NSRunLoop mainRunLoop] performBlock:^{
    OCMVerify([mock show]);
    [expectation fulfill];
  }];
  
  [self waitForExpectationsWithTimeout:EXPECTATION_TIMEOUT handler:nil];
}

/*
 +------------------------------------------------------------------------+
 |                            Surveys Module                              |
 +------------------------------------------------------------------------+
 */

- (void)testShowingSurveyWithToken {
  id mock = OCMClassMock([IBGSurveys class]);
  NSString *token = @"token";
  
  OCMStub([mock showSurveyWithToken:token]);
  [self.instabugBridge showSurveyWithToken:token];
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

/*
 +------------------------------------------------------------------------+
 |                          Bug Reporting Module                          |
 +------------------------------------------------------------------------+
 */

- (void) testgivenBoolean$setBugReportingEnabled_whenQuery_thenShouldCallNativeApi {
  BOOL enabled = true;
  [self.instabugBridge setBugReportingEnabled:enabled];
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
  [self.instabugBridge showBugReportingWithReportTypeAndOptions:reportType options:options];
  
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

- (void) testgivenArgs$setAutoScreenRecordingMaxDuration_whenQuery_thenShouldCallNativeApi {
  CGFloat duration = 12.3;
  [self.instabugBridge setAutoScreenRecordingMaxDuration:duration];
  XCTAssertEqual(IBGBugReporting.autoScreenRecordingDuration, duration);
}

- (void) testgivenBoolean$setViewHierarchyEnabled_whenQuery_thenShouldCallNativeApi {
  BOOL enabled = true;
  [self.instabugBridge setViewHirearchyEnabled:enabled];
  XCTAssertTrue(IBGBugReporting.shouldCaptureViewHierarchy);
}

/*
 +------------------------------------------------------------------------+
 |                              Feature Requets Module                    |
 +------------------------------------------------------------------------+
 */

- (void) testgivenArgs$setEmailFieldRequiredForFeatureRequests_whenQuery_thenShouldCallNativeApi {
  id mock = OCMClassMock([IBGFeatureRequests class]);
  BOOL required = true;
  NSArray *actionTypesArray = [NSArray arrayWithObjects:  @(IBGActionReportBug), nil];
  IBGAction actionTypes = 0;
  for (NSNumber *boxedValue in actionTypesArray) {
    actionTypes |= [boxedValue intValue];
  }
  OCMStub([mock setEmailFieldRequired:required forAction:actionTypes]);
  [self.instabugBridge setEmailFieldRequiredForFeatureRequests:required forAction:actionTypesArray];
  OCMVerify([mock setEmailFieldRequired:required forAction:actionTypes]);
}

- (void) testgive$showFeatureRequests_whenQuery_thenShouldCallNativeApi {
  id mock = OCMClassMock([IBGFeatureRequests class]);
  OCMStub([mock show]);
  [self.instabugBridge showFeatureRequests];
  XCTestExpectation *expectation = [self expectationWithDescription:@"Test ME PLX"];
  
  [[NSRunLoop mainRunLoop] performBlock:^{
    OCMVerify([mock show]);
    [expectation fulfill];
  }];
  
  [self waitForExpectationsWithTimeout:EXPECTATION_TIMEOUT handler:nil];
}
/*
 +------------------------------------------------------------------------+
 |                        Crash Reporting Module                          |
 +------------------------------------------------------------------------+
 */

- (void)testSetCrashReportingEnabled {
  id mock = OCMClassMock([Instabug class]);

  [self.instabugBridge setCrashReportingEnabled:YES];
  XCTAssertTrue(IBGCrashReporting.enabled);

  [self.instabugBridge setCrashReportingEnabled:NO];
  XCTAssertFalse(IBGCrashReporting.enabled);
}

/*
 +------------------------------------------------------------------------+
 |                             Chats Module                               |
 +------------------------------------------------------------------------+
 */

- (void)testSetChatsEnabled {
  id mock = OCMClassMock([Instabug class]);
  
  [self.instabugBridge setChatsEnabled:YES];
  XCTAssertTrue(IBGChats.enabled);
  
  [self.instabugBridge setChatsEnabled:NO];
  XCTAssertFalse(IBGChats.enabled);
}

- (void)testShowChats {
  id mock = OCMClassMock([IBGChats class]);
  XCTestExpectation *expectation = [self expectationWithDescription:@"Testing [IBGChats showChats]"];

  OCMStub([mock show]);
  [self.instabugBridge showChats];
  
  [[NSRunLoop mainRunLoop] performBlock:^{
    OCMVerify([mock show]);
    [expectation fulfill];
  }];
  
  [self waitForExpectationsWithTimeout:EXPECTATION_TIMEOUT handler:nil];
}


/*
 +------------------------------------------------------------------------+
 |                              Replies module                            |
 +------------------------------------------------------------------------+
 */


- (void) testgivenBoolean$setRepliesEnabled_whenQuery_thenShouldCallNativeApi {
  BOOL enabled = false;
  [self.instabugBridge setRepliesEnabled:enabled];
  XCTAssertFalse(IBGReplies.enabled);
}

// Since there is no way to check the invocation of the block 'callback' inside the block, 'IBGReplies.enabled' is set to false
// and the value is checked after callback execution to verify.
- (void) testgivenCallback$hasChats_whenQuery_thenShouldCallNativeApi {
  IBGReplies.enabled = true;
  RCTResponseSenderBlock callback = ^(NSArray *response) { IBGReplies.enabled = false; };
  [self.instabugBridge hasChats:callback];
  XCTAssertFalse(IBGReplies.enabled);
}


- (void) testgive$showReplies_whenQuery_thenShouldCallNativeApi {
  id mock = OCMClassMock([IBGReplies class]);
  OCMStub([mock show]);
  [self.instabugBridge showReplies];
  XCTestExpectation *expectation = [self expectationWithDescription:@"Test ME PLX"];
  
  [[NSRunLoop mainRunLoop] performBlock:^{
    OCMVerify([mock show]);
    [expectation fulfill];
  }];
  
  [self waitForExpectationsWithTimeout:EXPECTATION_TIMEOUT handler:nil];
}

- (void) testgivenOnNewReplyReceivedCallback$setOnNewReplyReceivedCallback_whenQuery_thenShouldCallNativeApi {
  id partialMock = OCMPartialMock(self.instabugBridge);
  RCTResponseSenderBlock callback = ^(NSArray *response) {};
  [partialMock setOnNewReplyReceivedCallback:callback];
  XCTAssertNotNil(IBGReplies.didReceiveReplyHandler);
 
  OCMStub([partialMock sendEventWithName:@"IBGOnNewReplyReceivedCallback" body:nil]);
  IBGReplies.didReceiveReplyHandler();
  OCMVerify([partialMock sendEventWithName:@"IBGOnNewReplyReceivedCallback" body:nil]);
}

- (void) testgivenCallback$getUnreadMessagesCount_whenQuery_thenShouldCallNativeApi {
  IBGReplies.enabled = true;
  RCTResponseSenderBlock callback = ^(NSArray *response) { IBGReplies.enabled = false; };
  [self.instabugBridge getUnreadMessagesCount:callback];
  XCTAssertFalse(IBGReplies.enabled);
}

- (void) testgivenBoolean$setChatNotificationEnabled_whenQuery_thenShouldCallNativeApi {
  BOOL enabled = false;
  [self.instabugBridge setChatNotificationEnabled:enabled];
  XCTAssertFalse(IBGReplies.inAppNotificationsEnabled);
}
/*
 +------------------------------------------------------------------------+
 |                              Log Module                                |
 +------------------------------------------------------------------------+
 */

- (void)testSetIBGLogPrintsToConsole {
  [self.instabugBridge setIBGLogPrintsToConsole:YES];
  XCTAssertTrue(IBGLog.printsToConsole);
}

- (void)testLogVerbose {
  id mock = OCMClassMock([IBGLog class]);
  NSString *log = @"some log";
  
  OCMStub([mock logVerbose:log]);
  [self.instabugBridge logVerbose:log];
  OCMVerify([mock logVerbose:log]);
}

- (void)testLogDebug {
  id mock = OCMClassMock([IBGLog class]);
  NSString *log = @"some log";
  
  OCMStub([mock logDebug:log]);
  [self.instabugBridge logDebug:log];
  OCMVerify([mock logDebug:log]);
}

- (void)testLogInfo {
  id mock = OCMClassMock([IBGLog class]);
  NSString *log = @"some log";
  
  OCMStub([mock logInfo:log]);
  [self.instabugBridge logInfo:log];
  OCMVerify([mock logInfo:log]);
}

- (void)testLogWarn {
  id mock = OCMClassMock([IBGLog class]);
  NSString *log = @"some log";
  
  OCMStub([mock logWarn:log]);
  [self.instabugBridge logWarn:log];
  OCMVerify([mock logWarn:log]);
}

- (void)testLogError {
  id mock = OCMClassMock([IBGLog class]);
  NSString *log = @"some log";
  
  OCMStub([mock logError:log]);
  [self.instabugBridge logError:log];
  OCMVerify([mock logError:log]);
}

- (void)testClearLogs {
  id mock = OCMClassMock([IBGLog class]);
  
  OCMStub([mock clearAllLogs]);
  [self.instabugBridge clearLogs];
  OCMVerify([mock clearAllLogs]);
}

@end
