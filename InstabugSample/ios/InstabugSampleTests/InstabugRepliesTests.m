//
//  InstabugRepliesTests.m
//  InstabugSampleTests
//
//  Created by Salma Ali on 7/31/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <XCTest/XCTest.h>
#import "OCMock/OCMock.h"
#import "InstabugRepliesBridge.h"
#import <Instabug/IBGTypes.h>
#import "Instabug/Instabug.h"
#import "IBGConstants.h"

@interface InstabugRepliesTests : XCTestCase
@property (nonatomic, retain) InstabugRepliesBridge *instabugBridge;
@end

@implementation InstabugRepliesTests

- (void)setUp {
  // Put setup code here. This method is called before the invocation of each test method in the class.
  self.instabugBridge = [[InstabugRepliesBridge alloc] init];
}

/*
 +------------------------------------------------------------------------+
 |                              Replies module                            |
 +------------------------------------------------------------------------+
 */


- (void) testgivenBoolean$setEnabled_whenQuery_thenShouldCallNativeApi {
  BOOL enabled = false;
  [self.instabugBridge setEnabled:enabled];
  XCTAssertFalse(IBGReplies.enabled);
}

// Since there is no way to check the invocation of the block 'callback' inside the block, 'IBGReplies.enabled' is set to false
// and the value is checked after callback execution to verify.
- (void) testgivenCallback$hasChats_whenQuery_thenShouldCallNativeApi {
  IBGReplies.enabled = true;
  RCTResponseSenderBlock callback = ^(NSArray *response) { IBGReplies.enabled = false; };
  [self.instabugBridge hasChats:callback];
  XCTAssertFalse(IBGReplies.enabled);
}


- (void) testgiven$show_whenQuery_thenShouldCallNativeApi {
  id mock = OCMClassMock([IBGReplies class]);
  OCMStub([mock show]);
  [self.instabugBridge show];
  XCTestExpectation *expectation = [self expectationWithDescription:@"Test ME PLX"];
  
  [[NSRunLoop mainRunLoop] performBlock:^{
    OCMVerify([mock show]);
    [expectation fulfill];
  }];
  
  [self waitForExpectationsWithTimeout:EXPECTATION_TIMEOUT handler:nil];
}

- (void) testgivenOnNewReplyReceivedHandler$setOnNewReplyReceivedCallback_whenQuery_thenShouldCallNativeApi {
  id partialMock = OCMPartialMock(self.instabugBridge);
  RCTResponseSenderBlock callback = ^(NSArray *response) {};
  [partialMock setOnNewReplyReceivedHandler:callback];
  XCTAssertNotNil(IBGReplies.didReceiveReplyHandler);
  
  OCMStub([partialMock sendEventWithName:@"IBGOnNewReplyReceivedCallback" body:nil]);
  IBGReplies.didReceiveReplyHandler();
  OCMVerify([partialMock sendEventWithName:@"IBGOnNewReplyReceivedCallback" body:nil]);
}

- (void) testgivenCallback$getUnreadRepliesCount_whenQuery_thenShouldCallNativeApi {
  IBGReplies.enabled = true;
  RCTResponseSenderBlock callback = ^(NSArray *response) { IBGReplies.enabled = false; };
  [self.instabugBridge getUnreadRepliesCount:callback];
  XCTAssertFalse(IBGReplies.enabled);
}

- (void) testgivenBoolean$setInAppNotificationEnabled_whenQuery_thenShouldCallNativeApi {
  BOOL enabled = false;
  [self.instabugBridge setInAppNotificationEnabled:enabled];
  XCTAssertFalse(IBGReplies.inAppNotificationsEnabled);
}

- (void)testSetPushNotificationsEnabled {
  id mock = OCMClassMock([IBGReplies class]);
  BOOL isPushNotificationEnabled = true;
  
  OCMStub([mock setPushNotificationsEnabled:isPushNotificationEnabled]);
  [self.instabugBridge setPushNotificationsEnabled:isPushNotificationEnabled];
  OCMVerify([mock setPushNotificationsEnabled:isPushNotificationEnabled]);
}


@end

