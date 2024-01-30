#import <XCTest/XCTest.h>
#import <OCMock.h>
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

- (void)testSendUnHandledNSExceptionCrash {
  NSException *exception = [NSException exceptionWithName:@"some_exception" reason:@"Exception reason" userInfo:nil];

  id mock = OCMClassMock([IBGCrashReporting class]);
  [InstabugCrashReportingBridge sendUnHandledNSExceptionCrash:exception :nil :nil :nil];
  OCMVerify([mock exception:exception]);

}

- (void)testSendUnHandledNSErrorCrash {
  NSError *error = [[NSError alloc] initWithDomain:@"Domain" code:0 userInfo:nil];
  id mock = OCMClassMock([IBGCrashReporting class]);
  [InstabugCrashReportingBridge sendUnHandledNSErrorCrash:error :nil :nil :nil];
  OCMVerify([mock error:error]);

}


@end
