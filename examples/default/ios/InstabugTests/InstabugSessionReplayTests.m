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
      BOOL expectedValue = YES;
      
      XCTestExpectation *completionExpectation = [self expectationWithDescription:@"Completion block should be called with the expected value"];
      
      __block BOOL actualValue = NO;
      
      OCMExpect([self.mSessionReplay setSyncCallbackWithHandler:[OCMArg checkWithBlock:^BOOL(id obj) {
          
          void (^completionBlock)(BOOL) = ^(BOOL boolean) {
            actualValue = boolean;
            [completionExpectation fulfill];
            XCTAssertEqual(actualValue, expectedValue);
        };
        
        self.bridge.sessionEvaluationCompletion = completionBlock;
        
          return YES;
      }]]);
      
      [self.bridge setSyncCallback];
      [self.bridge evaluateSync:expectedValue];
            
      [self waitForExpectationsWithTimeout:1 handler:nil];
      OCMVerifyAll(self.mSessionReplay);
  }


@end
