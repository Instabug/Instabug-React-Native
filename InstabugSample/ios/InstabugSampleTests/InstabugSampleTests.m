/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <XCTest/XCTest.h>
#import "OCMock/OCMock.h"
#import "InstabugReactBridge.h"

@interface InstabugSampleTests : XCTestCase
  @property InstabugReactBridge *instabugBridge;
@end

@implementation InstabugSampleTests

- (void)setUp {
  // Put setup code here. This method is called before the invocation of each test method in the class.
  self.instabugBridge = [[InstabugReactBridge alloc] init];
}

@end
