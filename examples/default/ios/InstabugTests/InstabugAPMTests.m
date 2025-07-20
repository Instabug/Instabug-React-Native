//
//  InstabugAPMTests.m
//  InstabugSampleTests
//
//  Created by Ali Abdelfattah on 12/12/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <XCTest/XCTest.h>
#import "OCMock/OCMock.h"
#import "InstabugAPMBridge.h"
#import <InstabugSDK/IBGTypes.h>
#import <InstabugSDK/IBGAPM.h>
#import "InstabugSDK/InstabugSDK.h"
#import "IBGConstants.h"
#import "RNInstabug/IBGAPM+PrivateAPIs.h"

@interface InstabugAPMTests : XCTestCase
@property (nonatomic, retain) InstabugAPMBridge *instabugBridge;
@end

@protocol APMCPTestProtocol <NSObject>
/**
 * This protocol helps in correctly mapping APM mocked methods
 * when their method name matches another method in a different
 * module that differs in method signature.
 */
- (void)setEnabled:(BOOL)isEnabled;

@end

@protocol ExecutionTraceCPTestProtocol <NSObject>
/**
 * This protocol helps in correctly mapping IBGExecutionTrace mocked methods
 * when their method name matches another method in a different
 * module that differs in method signature.
 */
- (void)end;
@end

@implementation InstabugAPMTests

- (void)setUp {
    // Put setup code here. This method is called before the invocation of each test method in the class.
    self.instabugBridge = [[InstabugAPMBridge alloc] init];
}

/*
+------------------------------------------------------------------------+
|                            APM Module                              |
+------------------------------------------------------------------------+
*/

- (void) testSetAPMEnabled {
  id mock = OCMClassMock([IBGAPM class]);
  BOOL isEnabled = YES;

  OCMStub([mock setEnabled:isEnabled]);
  [self.instabugBridge setEnabled:isEnabled];
  OCMVerify([mock setEnabled:isEnabled]);
}

- (void) testSetAppLaunchEnabled {
  id mock = OCMClassMock([IBGAPM class]);
  BOOL isEnabled = YES;

  OCMStub([mock setColdAppLaunchEnabled:isEnabled]);
  [self.instabugBridge setAppLaunchEnabled:isEnabled];
  OCMVerify([mock setColdAppLaunchEnabled:isEnabled]);
}

- (void) testEndAppLaunch {
  id mock = OCMClassMock([IBGAPM class]);

  OCMStub([mock endAppLaunch]);
  [self.instabugBridge endAppLaunch];
  OCMVerify([mock endAppLaunch]);
}

- (void) testSetAutoUITraceEnabled {
  id mock = OCMClassMock([IBGAPM class]);
  BOOL isEnabled = YES;

  OCMStub([mock setAutoUITraceEnabled:isEnabled]);
  [self.instabugBridge setAutoUITraceEnabled:isEnabled];
  OCMVerify([mock setAutoUITraceEnabled:isEnabled]);
}


- (void) testStartFlow {
  id mock = OCMClassMock([IBGAPM class]);
  NSString* appFlowName = @"APP_Flow_1";

  [self.instabugBridge startFlow:appFlowName];
  OCMVerify([mock startFlowWithName:appFlowName]);
}

- (void) testEndFlow {
  id mock = OCMClassMock([IBGAPM class]);
  NSString* appFlowName = @"APP_Flow_1";

  [self.instabugBridge endFlow:appFlowName];
  OCMVerify([mock endFlowWithName:appFlowName]);
}

- (void) testSetFlowAttribute {
  id mock = OCMClassMock([IBGAPM class]);
  NSString* appFlowName = @"APP_Flow_1";
  NSString* attributeKey = @"Attribute_Key_1";
  NSString* attributeValue = @"Attribute_Value_1";

  [self.instabugBridge setFlowAttribute:appFlowName :attributeKey :attributeValue];
  OCMVerify([mock setAttributeForFlowWithName:appFlowName key:attributeKey value:attributeValue]);
}

- (void) testStartUITrace {
  id mock = OCMClassMock([IBGAPM class]);
  NSString* traceName = @"UITrace_1";

  OCMStub([mock startUITraceWithName:traceName]);
  [self.instabugBridge startUITrace:traceName];
  OCMVerify([mock startUITraceWithName:traceName]);
}

- (void) testEndUITrace {
  id mock = OCMClassMock([IBGAPM class]);

  OCMStub([mock endUITrace]);
  [self.instabugBridge endUITrace];
  OCMVerify([mock endUITrace]);
}
//
//- (void) testSetScreenRenderEnabled {
//  id mock = OCMClassMock([IBGAPM class]);
//  BOOL isEnabled = YES;
//
//  OCMStub([mock enabled:isEnabled]);
//  [self.instabugBridge setScreenRenderEnabled:isEnabled];
//  OCMVerify([mock setScreenRenderEnabled:isEnabled]);
//}

- (void) testSetScreenRenderEnabled {
    id mock = OCMClassMock([IBGAPM class]);
    NSNumber *isEnabled = @1;

    [self.instabugBridge setScreenRenderEnabled:isEnabled];

    OCMVerify([mock setScreenRenderingEnabled:YES]);
}

- (void) testSetScreenRenderDisabled {
    id mock = OCMClassMock([IBGAPM class]);
    NSNumber *isEnabled = @0;

    [self.instabugBridge setScreenRenderEnabled:isEnabled];

    OCMVerify([mock setScreenRenderingEnabled:NO]);
}

@end
