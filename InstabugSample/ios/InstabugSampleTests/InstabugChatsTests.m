//
//  InstabugChatsTests.m
//  InstabugSampleTests
//
//  Created by Salma Ali on 7/31/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <XCTest/XCTest.h>
#import "OCMock/OCMock.h"
#import "InstabugChatsBridge.h"
#import <Instabug/IBGTypes.h>
#import "Instabug/Instabug.h"
#import "IBGConstants.h"

@interface InstabugChatsTests : XCTestCase
@property (nonatomic, retain) InstabugChatsBridge *instabugBridge;
@end

@implementation InstabugChatsTests

- (void)setUp {
  // Put setup code here. This method is called before the invocation of each test method in the class.
  self.instabugBridge = [[InstabugChatsBridge alloc] init];
}

/*
 +------------------------------------------------------------------------+
 |                             Chats Module                               |
 +------------------------------------------------------------------------+
 */

- (void)testSetEnabled {
  
  [self.instabugBridge setEnabled:YES];
  XCTAssertTrue(IBGChats.enabled);
  
  [self.instabugBridge setEnabled:NO];
  XCTAssertFalse(IBGChats.enabled);
}

- (void)testShow {
  id mock = OCMClassMock([IBGChats class]);
  XCTestExpectation *expectation = [self expectationWithDescription:@"Testing [IBGChats showChats]"];
  
  OCMStub([mock show]);
  [self.instabugBridge show];
  
  [[NSRunLoop mainRunLoop] performBlock:^{
    OCMVerify([mock show]);
    [expectation fulfill];
  }];
  
  [self waitForExpectationsWithTimeout:EXPECTATION_TIMEOUT handler:nil];
}


@end

