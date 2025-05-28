#import <XCTest/XCTest.h>
#import "InstabugSDK/InstabugSDK.h"
#import "InstabugCrashReportingBridge.h"
#import "OCMock/OCMock.h"
#import "Util/IBGCrashReporting+CP.h"

@interface InstabugCrashReportingTests : XCTestCase
@property (nonatomic, retain) InstabugCrashReportingBridge *bridge;
@property (nonatomic, strong) id mCrashReporting;

@end

@implementation InstabugCrashReportingTests

- (void)setUp {
  self.bridge = [[InstabugCrashReportingBridge alloc] init];
  self.mCrashReporting = OCMClassMock([IBGCrashReporting class]);

}

- (void)testSetEnabled {

  [self.bridge setEnabled:NO];
  XCTAssertFalse(IBGCrashReporting.enabled);

  [self.bridge setEnabled:YES];
  XCTAssertTrue(IBGCrashReporting.enabled);

}

- (void)testSendJSCrash {
  NSDictionary *stackTrace = @{};

  XCTestExpectation *expectation = [self expectationWithDescription:@"Expected resolve to be called."];

  RCTPromiseResolveBlock resolve = ^(id result) {
    [expectation fulfill];
  };
  RCTPromiseRejectBlock reject = ^(NSString *code, NSString *message, NSError *error) {};

  [self.bridge sendJSCrash:stackTrace resolver:resolve rejecter:reject];

  [self waitForExpectations:@[expectation] timeout:1];
  OCMVerify([self.mCrashReporting cp_reportFatalCrashWithStackTrace:stackTrace]);
}

- (void)testSendNonFatalErrorJsonCrash {
  NSDictionary<NSString *,NSString * > *jsonCrash = @{};
  NSString *fingerPrint = @"fingerprint";
  RCTPromiseResolveBlock resolve = ^(id result) {};
  RCTPromiseRejectBlock reject = ^(NSString *code, NSString *message, NSError *error) {};
  NSDictionary *userAttributes = @{ @"key" : @"value",  };
  IBGNonFatalLevel ibgNonFatalLevel = IBGNonFatalLevelInfo;


  [self.bridge sendHandledJSCrash:jsonCrash userAttributes:userAttributes  fingerprint:fingerPrint nonFatalExceptionLevel:ibgNonFatalLevel resolver:resolve rejecter:reject];

    OCMVerify([self.mCrashReporting cp_reportNonFatalCrashWithStackTrace:jsonCrash
           level:IBGNonFatalLevelInfo
         groupingString:fingerPrint
        userAttributes:userAttributes
              ]);
}

@end
