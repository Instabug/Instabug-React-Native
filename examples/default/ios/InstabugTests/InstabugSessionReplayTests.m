#import <XCTest/XCTest.h>
#import "OCMock/OCMock.h"
#import "InstabugSessionReplayBridge.h"
#import <Instabug/IBGTypes.h>
#import "Instabug/Instabug.h"
#import "IBGConstants.h"

@interface InstabugSessionReplayTests : XCTestCase
@property (nonatomic, retain) InstabugSessionReplayBridge *instabugBridge;
@end

@implementation InstabugSessionReplayTests

- (void)setUp {
  // Put setup code here. This method is called before the invocation of each test method in the class.
  self.instabugBridge = [[InstabugSessionReplayBridge alloc] init];
}

/*
 +------------------------------------------------------------------------+
 |                              Session Replay Module                     |
 +------------------------------------------------------------------------+
 */

- (void)testSetEnabled {
  BOOL enabled = NO;
  [self.instabugBridge setEnabled:enabled];
  XCTAssertFalse(IBGSessionReplay.enabled);
}

- (void)testSetInstabugLogsEnabled {
  BOOL enabled = NO;

  [self.instabugBridge setInstabugLogsEnabled:enabled];

  XCTAssertFalse(IBGSessionReplay.IBGLogsEnabled);
}

- (void)testSetNetworkLogsEnabled {
  BOOL enabled = NO;

  [self.instabugBridge setNetworkLogsEnabledIsEnabled:isEnabled];

  XCTAssertFalse(IBGSessionReplay.networkLogsEnabled);
}

- (void)testSetUserStepsEnabled {
  BOOL enabled = NO;

  [self.instabugBridge setUserStepsEnabledIsEnabled:isEnabled];

  XCTAssertFalse(IBGSessionReplay.userStepsEnabled);
}


@end

