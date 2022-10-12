#import <XCTest/XCTest.h>
#import "Instabug/Instabug.h"
#import "InstabugCrashReporting.h"

@interface InstabugCrashReportingTests : XCTestCase
@property (nonatomic, retain) InstabugCrashReporting *bridge;
@end

@implementation InstabugCrashReportingTests

- (void)setUp {
  self.bridge = [[InstabugCrashReporting alloc] init];
}

- (void)testSetEnabled {
  [self.bridge setEnabled:<#(BOOL)#>:YES];
  XCTAssertTrue(IBGCrashReporting.enabled);

  [self.bridge setEnabled:NO];
  XCTAssertFalse(IBGCrashReporting.enabled);
}

@end
