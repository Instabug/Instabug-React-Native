#import <XCTest/XCTest.h>
#import "Instabug/Instabug.h"
#import "CrashReportingExampleModule.h"

@interface InstabugCrashReportingTests : XCTestCase
@property (nonatomic, retain) CrashReportingExampleModule *bridge;
@end

@implementation InstabugCrashReportingTests

- (void)setUp {
  self.bridge = [[CrashReportingExampleModule alloc] init];
}

- (void)testSetEnabled {
  [self.bridge setEnabled:YES];
  XCTAssertTrue(IBGCrashReporting.enabled);

  [self.bridge setEnabled:NO];
  XCTAssertFalse(IBGCrashReporting.enabled);
}

@end
