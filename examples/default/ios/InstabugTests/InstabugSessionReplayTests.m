#import <XCTest/XCTest.h>
#import "OCMock/OCMock.h"
#import "InstabugSessionReplayBridge.h"
#import <Instabug/IBGTypes.h>
#import "Instabug/Instabug.h"
#import "IBGConstants.h"

@interface InstabugSessionReplayTests : XCTestCase

@property (nonatomic, strong) id mSessionReplay;
@property (nonatomic, strong) InstabugSessionReplayBridge *bridge;

@end

@implementation InstabugSessionReplayTests


- (void)setUp {
  self.mSessionReplay = OCMClassMock([IBGSessionReplay class]);
  self.bridge = [[InstabugSessionReplayBridge alloc] init];
}

- (void)testSetEnabled {
  BOOL enabled = NO;

  [self.bridge setEnabled:enabled];

  OCMVerify([self.mSessionReplay setEnabled:enabled]);
}

- (void)testSetInstabugLogsEnabled {
  BOOL enabled = NO;

  [self.bridge setInstabugLogsEnabled:enabled];

  OCMVerify([self.mSessionReplay setIBGLogsEnabled:enabled]);
}

- (void)testSetNetworkLogsEnabled {
  BOOL enabled = NO;

  [self.bridge setNetworkLogsEnabled:enabled];

  OCMVerify([self.mSessionReplay setNetworkLogsEnabled:enabled]);
}

- (void)testSetUserStepsEnabled {
  BOOL enabled = NO;

  [self.bridge setUserStepsEnabled:enabled];

  OCMVerify([self.mSessionReplay setUserStepsEnabled:enabled]);
}

- (void)testGetSessionReplayLink {
    NSString *link = @"link";
    XCTestExpectation *expectation = [self expectationWithDescription:@"Call completion handler"];

    RCTPromiseResolveBlock resolve = ^(NSString *result) {
        [expectation fulfill];
        XCTAssertEqualObjects(result, link);
    };

    RCTPromiseRejectBlock reject = ^(NSString *code, NSString *message, NSError *error) {
    };
    OCMStub([self.mSessionReplay sessionReplayLink]).andReturn(link);
    [self.bridge getSessionReplayLink:resolve :reject];
    OCMVerify([self.mSessionReplay sessionReplayLink]);
    [self waitForExpectations:@[expectation] timeout:5.0];
}

- (void)testSetSyncCallback {
    id mockMetadata = OCMClassMock([IBGSessionMetadata class]);
    id mockNetworkLog = OCMClassMock([IBGSessionMetadataNetworkLogs class]);
    id partialMock = OCMPartialMock(self.bridge);

    XCTestExpectation *completionExpectation = [self expectationWithDescription:@"Completion block should be called with the expected value"];

    BOOL expectedValue = YES;
    __block BOOL actualValue = NO;

    OCMStub([mockNetworkLog url]).andReturn(@"http://example.com");
    OCMStub([mockNetworkLog statusCode]).andReturn(200);

    OCMStub([mockMetadata device]).andReturn(@"ipohne");
    OCMStub([mockMetadata os]).andReturn(@"ios");
    OCMStub([mockMetadata appVersion]).andReturn(@"13.4.1");
    OCMStub([mockMetadata sessionDuration]).andReturn(20);
    OCMStub([mockMetadata hasLinkToAppReview]).andReturn(NO);
    OCMStub([mockMetadata launchType]).andReturn(LaunchTypeCold);
    OCMStub([mockMetadata launchDuration]).andReturn(20);
    OCMStub([mockMetadata bugsCount]).andReturn(10);
    OCMStub([mockMetadata fatalCrashCount]).andReturn(10);
    OCMStub([mockMetadata oomCrashCount]).andReturn(10);
    OCMStub([mockMetadata networkLogs]).andReturn(@[mockNetworkLog]);

    SessionEvaluationCompletion sessionEvaluationCompletion = ^(BOOL shouldSync) {
        actualValue = shouldSync;
        [completionExpectation fulfill];
    };
                                  
    OCMStub([partialMock sendEventWithName:@"IBGSessionReplayOnSyncCallback" body:OCMArg.any]).andDo(^(NSInvocation *invocation) {
        [self.bridge evaluateSync:expectedValue];
    });
    
    OCMStub([self.mSessionReplay setSyncCallbackWithHandler:[OCMArg checkWithBlock: ^BOOL(void(^handler)(IBGSessionMetadata *metadataObject, SessionEvaluationCompletion completion)) {
        handler(mockMetadata, sessionEvaluationCompletion);
        return YES;
    }]]);
    
    [self.bridge setSyncCallback];
    [self waitForExpectationsWithTimeout:1 handler:nil];
    
    OCMVerify([partialMock sendEventWithName:@"IBGSessionReplayOnSyncCallback" body:OCMArg.any]);
    OCMVerifyAll(self.mSessionReplay);
    XCTAssertEqual(actualValue, expectedValue);
  }


@end
