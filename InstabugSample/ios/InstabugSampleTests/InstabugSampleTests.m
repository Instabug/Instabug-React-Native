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
#import "IBGConstants.h"

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
