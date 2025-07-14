/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <XCTest/XCTest.h>
#import "OCMock/OCMock.h"
#import "InstabugSDK/InstabugSDK.h"
#import "InstabugReactBridge.h"
#import <InstabugSDK/IBGTypes.h>
#import "IBGConstants.h"
#import "RNInstabug.h"
#import <RNInstabug/IBGNetworkLogger+CP.h>

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
@property (nonatomic, retain) id mRNInstabug;
@end

@implementation InstabugSampleTests


- (void)setUp {
  // Put setup code here. This method is called before the invocation of each test method in the class.
  self.instabugBridge = [[InstabugReactBridge alloc] init];
  self.mRNInstabug = OCMClassMock([RNInstabug class]);
}

/*
 +------------------------------------------------------------------------+
 |                            Instabug Module                             |
 +------------------------------------------------------------------------+
 */

- (void)testSetEnabled {
  id mock = OCMClassMock([Instabug class]);
  BOOL isEnabled = true;

  OCMStub([mock setEnabled:isEnabled]);
  [self.instabugBridge setEnabled:isEnabled];
  OCMVerify([mock setEnabled:isEnabled]);
}

- (void)testInit {
  id mock = OCMClassMock([Instabug class]);
  IBGInvocationEvent floatingButtonInvocationEvent = IBGInvocationEventFloatingButton;
  NSString *appToken = @"app_token";
  NSString *codePushVersion = @"1.0.0(1)";
  NSArray *invocationEvents = [NSArray arrayWithObjects:[NSNumber numberWithInteger:floatingButtonInvocationEvent], nil];
  NSDictionary *overAirVersion = @{
    @"service":@"expo",
    @"version":@"D0A12345-6789-4B3C-A123-4567ABCDEF01"
  };
  BOOL useNativeNetworkInterception = YES;
  IBGSDKDebugLogsLevel sdkDebugLogsLevel = IBGSDKDebugLogsLevelDebug;
  IBGOverAirType service = [ArgsRegistry.overAirServices[overAirVersion[@"service"]] intValue];

  OCMStub([mock setCodePushVersion:codePushVersion]);
  OCMStub([mock setOverAirVersion:overAirVersion[@"version"] withType:service]);

  [self.instabugBridge init:appToken invocationEvents:invocationEvents debugLogsLevel:sdkDebugLogsLevel useNativeNetworkInterception:useNativeNetworkInterception codePushVersion:codePushVersion overAirVersion:overAirVersion];
  OCMVerify([mock setCodePushVersion:codePushVersion]);
  
  OCMVerify([mock setOverAirVersion:overAirVersion[@"version"] withType:service]);
  
  OCMVerify([self.mRNInstabug initWithToken:appToken invocationEvents:floatingButtonInvocationEvent debugLogsLevel:sdkDebugLogsLevel useNativeNetworkInterception:useNativeNetworkInterception]);
}

- (void)test {
  id mock = OCMClassMock([Instabug class]);
  NSString *codePushVersion = @"123";

  [self.instabugBridge setCodePushVersion:codePushVersion];

  OCMVerify([mock setCodePushVersion:codePushVersion]);
}

- (void)testSetOverAirVersion {
  id mock = OCMClassMock([Instabug class]);
  NSDictionary *overAirVersion = @{
    @"service":@"expo",
    @"version":@"D0A12345-6789-4B3C-A123-4567ABCDEF01"
  };

  [self.instabugBridge setOverAirVersion:overAirVersion];
  
  IBGOverAirType service = [ArgsRegistry.overAirServices[overAirVersion[@"service"]] intValue];
  
  OCMVerify([mock setOverAirVersion:overAirVersion[@"version"] withType:service]);
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
  RCTPromiseResolveBlock resolve = ^(id result) {};
  RCTPromiseRejectBlock reject = ^(NSString *code, NSString *message, NSError *error) {};
  NSDictionary *dictionary = @{ @"someKey" : @"someValue" };

  OCMStub([mock getTags]).andReturn(dictionary);
  [self.instabugBridge getTags:resolve :reject];
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

- (void)testIdentifyUser {
  id mock = OCMClassMock([Instabug class]);
  NSString *email = @"em@il.com";
  NSString *name = @"this is my name";

  OCMStub([mock identifyUserWithEmail:email name:name]);
  [self.instabugBridge identifyUser:email name:name userId:nil];
  OCMVerify([mock identifyUserWithID:nil email:email name:name]);
}

- (void)testIdentifyUserWithID {
  id mock = OCMClassMock([Instabug class]);
  NSString *email = @"em@il.com";
  NSString *name = @"this is my name";
  NSString *userId = @"this is my id";

  OCMStub([mock identifyUserWithID:userId email:email name:name]);
  [self.instabugBridge identifyUser:email name:name userId:userId];
  OCMVerify([mock identifyUserWithID:userId email:email name:name]);
}

- (void)testLogOut {
  id mock = OCMClassMock([Instabug class]);

  OCMStub([mock logOut]);
  [self.instabugBridge logOut];
  OCMVerify([mock logOut]);
}

- (void)testLogUserEvent {
  id mock = OCMClassMock([Instabug class]);
  NSString *name = @"event name";

  OCMStub([mock logUserEventWithName:name]);
  [self.instabugBridge logUserEvent:name];
  OCMVerify([mock logUserEventWithName:name]);
}

- (void)testSetReproStepsConfig {
  id mock = OCMClassMock([Instabug class]);
  IBGUserStepsMode bugMode = IBGUserStepsModeDisable;
  IBGUserStepsMode crashMode = IBGUserStepsModeEnable;
  IBGUserStepsMode sessionReplayMode = IBGUserStepsModeEnabledWithNoScreenshots;

  [self.instabugBridge setReproStepsConfig:bugMode :crashMode :sessionReplayMode];

  OCMVerify([mock setReproStepsFor:IBGIssueTypeBug withMode:bugMode]);
  OCMVerify([mock setReproStepsFor:IBGIssueTypeCrash withMode:crashMode]);
 OCMVerify([mock setReproStepsFor:IBGIssueTypeSessionReplay withMode:sessionReplayMode]);
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
  RCTPromiseResolveBlock resolve = ^(id result) {};
  RCTPromiseRejectBlock reject = ^(NSString *code, NSString *message, NSError *error) {};

  OCMStub([mock userAttributeForKey:key]).andReturn(@"someValue");
  [self.instabugBridge getUserAttribute:key :resolve :reject];
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
  RCTPromiseResolveBlock resolve = ^(id result) {};
  RCTPromiseRejectBlock reject = ^(NSString *code, NSString *message, NSError *error) {};
  NSDictionary *dictionary = @{ @"someKey" : @"someValue" };

  OCMStub([mock userAttributes]).andReturn(dictionary);
  [self.instabugBridge getAllUserAttributes:resolve :reject];
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

- (void)testNetworkLogIOS {
  id mIBGNetworkLogger = OCMClassMock([IBGNetworkLogger class]);

  NSString *url = @"https://api.instabug.com";
  NSString *method = @"GET";
  NSString *requestBody = @"requestBody";
  double requestBodySize = 10;
  NSString *responseBody = @"responseBody";
  double responseBodySize = 15;
  double responseCode = 200;
  NSDictionary *requestHeaders = @{ @"accept": @"application/json" };
  NSDictionary *responseHeaders = @{ @"cache-control": @"no-store" };
  NSString *contentType = @"application/json";
  double errorCode = 0;
  NSString *errorDomain = nil;
  double startTime = 1719847101199;
  double duration = 150;
  NSString *gqlQueryName = nil;
  NSString *serverErrorMessage = nil;
  NSDictionary* w3cExternalTraceAttributes = nil;
  NSNumber *isW3cCaughted = nil;
  NSNumber *partialID = nil;
  NSNumber *timestamp= nil;
  NSString *generatedW3CTraceparent= nil;
  NSString *caughtedW3CTraceparent= nil;
  [self.instabugBridge networkLogIOS:url
                              method:method
                         requestBody:requestBody
                     requestBodySize:requestBodySize
                        responseBody:responseBody
                    responseBodySize:responseBodySize
                        responseCode:responseCode
                      requestHeaders:requestHeaders
                     responseHeaders:responseHeaders
                         contentType:contentType
                         errorDomain:errorDomain
                           errorCode:errorCode
                           startTime:startTime
                            duration:duration
                        gqlQueryName:gqlQueryName
                  serverErrorMessage:serverErrorMessage
                 w3cExternalTraceAttributes:w3cExternalTraceAttributes

                  ];

  OCMVerify([mIBGNetworkLogger addNetworkLogWithUrl:url
                                            method:method
                                       requestBody:requestBody
                                   requestBodySize:requestBodySize
                                      responseBody:responseBody
                                  responseBodySize:responseBodySize
                                      responseCode:responseCode
                                    requestHeaders:requestHeaders
                                   responseHeaders:responseHeaders
                                       contentType:contentType
                                       errorDomain:errorDomain
                                         errorCode:errorCode
                                         startTime:startTime * 1000
                                          duration:duration * 1000
                                      gqlQueryName:gqlQueryName
                                serverErrorMessage:serverErrorMessage
                                    isW3cCaughted:isW3cCaughted
                                   partialID:partialID
                                    timestamp:timestamp
                                  generatedW3CTraceparent:generatedW3CTraceparent
                               caughtedW3CTraceparent:caughtedW3CTraceparent
                                ]);
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


- (void)testWillRedirectToStore {

    id mock = OCMClassMock([Instabug class]);

    [self.instabugBridge willRedirectToStore];

    OCMVerify([mock willRedirectToAppStore]);

    [mock stopMocking];
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

- (void)testAddExperiments {
  id mock = OCMClassMock([Instabug class]);
  NSArray *experiments = @[@"exp1", @"exp2"];

  OCMStub([mock addExperiments:experiments]);
  [self.instabugBridge addExperiments:experiments];
  OCMVerify([mock addExperiments:experiments]);
}

- (void)testRemoveExperiments {
  id mock = OCMClassMock([Instabug class]);
  NSArray *experiments = @[@"exp1", @"exp2"];

  OCMStub([mock removeExperiments:experiments]);
  [self.instabugBridge removeExperiments:experiments];
  OCMVerify([mock removeExperiments:experiments]);
}

- (void)testClearAllExperiments {
  id mock = OCMClassMock([Instabug class]);
  OCMStub([mock clearAllExperiments]);
  [self.instabugBridge clearAllExperiments];
  OCMVerify([mock clearAllExperiments]);
}

- (void)testAddFeatureFlags {
  id mock = OCMClassMock([Instabug class]);
  NSDictionary *featureFlagsMap = @{ @"key13" : @"value1", @"key2" : @"value2"};

  OCMStub([mock addFeatureFlags :[OCMArg any]]);
  [self.instabugBridge addFeatureFlags:featureFlagsMap];
  OCMVerify([mock addFeatureFlags: [OCMArg checkWithBlock:^(id value) {
    NSArray<IBGFeatureFlag *> *featureFlags = value;
    NSString* firstFeatureFlagName = [featureFlags objectAtIndex:0 ].name;
    NSString* firstFeatureFlagKey = [[featureFlagsMap allKeys] objectAtIndex:0] ;
    if([ firstFeatureFlagKey isEqualToString: firstFeatureFlagName]){
      return YES;
    }
    return  NO;
  }]]);
}

- (void)testRemoveFeatureFlags {
  id mock = OCMClassMock([Instabug class]);
  NSArray *featureFlags = @[@"exp1", @"exp2"];
  [self.instabugBridge removeFeatureFlags:featureFlags];
     OCMVerify([mock removeFeatureFlags: [OCMArg checkWithBlock:^(id value) {
        NSArray<IBGFeatureFlag *> *featureFlagsObJ = value;
        NSString* firstFeatureFlagName = [featureFlagsObJ objectAtIndex:0 ].name;
        NSString* firstFeatureFlagKey = [featureFlags firstObject] ;
        if([ firstFeatureFlagKey isEqualToString: firstFeatureFlagName]){
          return YES;
        }
        return  NO;
      }]]);
}

- (void)testRemoveAllFeatureFlags {
  id mock = OCMClassMock([Instabug class]);
  OCMStub([mock removeAllFeatureFlags]);
  [self.instabugBridge removeAllFeatureFlags];
  OCMVerify([mock removeAllFeatureFlags]);
}


- (void) testIsW3ExternalTraceIDEnabled {
    id mock = OCMClassMock([IBGNetworkLogger class]);
    NSNumber *expectedValue = @(YES);

    OCMStub([mock w3ExternalTraceIDEnabled]).andReturn([expectedValue boolValue]);

    XCTestExpectation *expectation = [self expectationWithDescription:@"Call completion handler"];
    RCTPromiseResolveBlock resolve = ^(NSNumber *result) {
        XCTAssertEqualObjects(result, expectedValue);
        [expectation fulfill];
    };

    [self.instabugBridge isW3ExternalTraceIDEnabled:resolve :nil];

    [self waitForExpectationsWithTimeout:1.0 handler:nil];

    OCMVerify([mock w3ExternalTraceIDEnabled]);
}

- (void) testIsW3ExternalGeneratedHeaderEnabled {
    id mock = OCMClassMock([IBGNetworkLogger class]);
    NSNumber *expectedValue = @(YES);

    OCMStub([mock w3ExternalGeneratedHeaderEnabled]).andReturn([expectedValue boolValue]);

    XCTestExpectation *expectation = [self expectationWithDescription:@"Call completion handler"];
    RCTPromiseResolveBlock resolve = ^(NSNumber *result) {
        XCTAssertEqualObjects(result, expectedValue);
        [expectation fulfill];
    };

    [self.instabugBridge isW3ExternalGeneratedHeaderEnabled:resolve :nil];

    [self waitForExpectationsWithTimeout:1.0 handler:nil];

    OCMVerify([mock w3ExternalGeneratedHeaderEnabled]);
}

- (void) testIsW3CaughtHeaderEnabled {
    id mock = OCMClassMock([IBGNetworkLogger class]);
    NSNumber *expectedValue = @(YES);

    OCMStub([mock w3CaughtHeaderEnabled]).andReturn([expectedValue boolValue]);

    XCTestExpectation *expectation = [self expectationWithDescription:@"Call completion handler"];
    RCTPromiseResolveBlock resolve = ^(NSNumber *result) {
        XCTAssertEqualObjects(result, expectedValue);
        [expectation fulfill];
    };

    [self.instabugBridge isW3CaughtHeaderEnabled:resolve :nil];

    [self waitForExpectationsWithTimeout:1.0 handler:nil];

    OCMVerify([mock w3CaughtHeaderEnabled]);
}

- (void)testEnableAutoMasking {
    id mock = OCMClassMock([Instabug class]);
     
    NSArray *autoMaskingTypes = [NSArray arrayWithObjects:
         [NSNumber numberWithInteger:IBGAutoMaskScreenshotOptionLabels],
         [NSNumber numberWithInteger:IBGAutoMaskScreenshotOptionTextInputs],
         [NSNumber numberWithInteger:IBGAutoMaskScreenshotOptionMedia],
         [NSNumber numberWithInteger:IBGAutoMaskScreenshotOptionMaskNothing],
         nil];
     
     OCMStub([mock setAutoMaskScreenshots:IBGAutoMaskScreenshotOptionLabels | IBGAutoMaskScreenshotOptionTextInputs | IBGAutoMaskScreenshotOptionMedia | IBGAutoMaskScreenshotOptionMaskNothing]);
     
     [self.instabugBridge enableAutoMasking:autoMaskingTypes];
 
     OCMVerify([mock setAutoMaskScreenshots:IBGAutoMaskScreenshotOptionLabels | IBGAutoMaskScreenshotOptionTextInputs | IBGAutoMaskScreenshotOptionMedia | IBGAutoMaskScreenshotOptionMaskNothing]);
}

- (void)testSetNetworkLogBodyEnabled {
    id mock = OCMClassMock([IBGNetworkLogger class]);
    BOOL isEnabled = YES;

    OCMStub([mock setLogBodyEnabled:isEnabled]);
    [self.instabugBridge setNetworkLogBodyEnabled:isEnabled];
    OCMVerify([mock setLogBodyEnabled:isEnabled]);
}

- (void)testGetNetworkBodyMaxSize {
    id mock = OCMClassMock([IBGNetworkLogger class]);
    double expectedValue = 10240.0;

    OCMStub([mock getNetworkBodyMaxSize]).andReturn(expectedValue);

    XCTestExpectation *expectation = [self expectationWithDescription:@"Call resolve block"];
    RCTPromiseResolveBlock resolve = ^(NSNumber *result) {
        XCTAssertEqual(result.doubleValue, expectedValue);
        [expectation fulfill];
    };

    [self.instabugBridge getNetworkBodyMaxSize:resolve :nil];
    [self waitForExpectationsWithTimeout:1.0 handler:nil];

    OCMVerify(ClassMethod([mock getNetworkBodyMaxSize]));
}


@end
