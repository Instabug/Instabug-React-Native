//
//  InstabugFeatureRequestsTests.m
//  InstabugSampleTests
//
//  Created by Salma Ali on 7/31/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <XCTest/XCTest.h>
#import "OCMock/OCMock.h"
#import "InstabugFeatureRequestsBridge.h"
#import <Instabug/IBGTypes.h>
#import "Instabug/Instabug.h"
#import "IBGConstants.h"

@interface InstabugFeatureRequestsTests : XCTestCase
@property (nonatomic, retain) InstabugFeatureRequestsBridge *instabugBridge;
@end

@implementation InstabugFeatureRequestsTests

- (void)setUp {
  // Put setup code here. This method is called before the invocation of each test method in the class.
  self.instabugBridge = [[InstabugFeatureRequestsBridge alloc] init];
}

/*
 +------------------------------------------------------------------------+
 |                              Feature Requets Module                    |
 +------------------------------------------------------------------------+
 */

- (void) testgivenArgs$setEmailFieldRequiredForFeatureRequests_whenQuery_thenShouldCallNativeApi {
  id mock = OCMClassMock([IBGFeatureRequests class]);
  BOOL required = true;
  NSArray *actionTypesArray = [NSArray arrayWithObjects:  @(IBGActionReportBug), nil];
  IBGAction actionTypes = 0;
  for (NSNumber *boxedValue in actionTypesArray) {
    actionTypes |= [boxedValue intValue];
  }
  OCMStub([mock setEmailFieldRequired:required forAction:actionTypes]);
  [self.instabugBridge setEmailFieldRequiredForFeatureRequests:required forAction:actionTypesArray];
  OCMVerify([mock setEmailFieldRequired:required forAction:actionTypes]);
}

- (void) testgive$show_whenQuery_thenShouldCallNativeApi {
  id mock = OCMClassMock([IBGFeatureRequests class]);
  OCMStub([mock show]);
  [self.instabugBridge show];
  XCTestExpectation *expectation = [self expectationWithDescription:@"Test ME PLX"];
  
  [[NSRunLoop mainRunLoop] performBlock:^{
    OCMVerify([mock show]);
    [expectation fulfill];
  }];
  
  [self waitForExpectationsWithTimeout:EXPECTATION_TIMEOUT handler:nil];
}

- (void) testgivenBoolean$setEnabled_whenQuery_thenShouldCallNativeApi {
  BOOL enabled = false;
  [self.instabugBridge setEnabled:enabled];
  XCTAssertFalse(IBGFeatureRequests.enabled);
}


@end

