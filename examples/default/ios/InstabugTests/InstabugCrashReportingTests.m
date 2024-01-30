#import <XCTest/XCTest.h>
#import "Instabug/Instabug.h"
#import "InstabugCrashReportingBridge.h"

@interface InstabugCrashReportingTests : XCTestCase
@property (nonatomic, retain) InstabugCrashReportingBridge *bridge;
@end

@implementation InstabugCrashReportingTests

- (void)setUp {
  self.bridge = [[InstabugCrashReportingBridge alloc] init];
}

- (void)testSetEnabled {
  [self.bridge setEnabled:YES];
  XCTAssertTrue(IBGCrashReporting.enabled);

  [self.bridge setEnabled:NO];
  XCTAssertFalse(IBGCrashReporting.enabled);
}

- (void)testSendUnHandledCrash {
  NSException *exception2 = [NSException exceptionWithName:@"some_exception" reason:@"Exception reason" userInfo:nil];

  [self.bridge sendUnHandledCrash:exception2 :nil :nil :nil];
  XCTAssertTrue([IBGCrashReporting exception:exception2]);
}


@end
