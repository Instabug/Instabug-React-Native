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
#import <Instabug/IBGTypes.h>
#import <Instabug/IBGAPM.h>
#import "Instabug/Instabug.h"
#import "IBGConstants.h"

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

- (void) testStartExecutionTrace {
  id mock = OCMClassMock([IBGAPM class]);
  NSString* traceName = @"Trace_1";
  NSString* traceKey = @"1";
  RCTPromiseResolveBlock resolve = ^(id result) {};
  RCTPromiseRejectBlock reject = ^(NSString *code, NSString *message, NSError *error) {};

  OCMStub([mock startExecutionTraceWithName:traceName]);
  [self.instabugBridge startExecutionTrace:traceName :traceKey :resolve :reject];
  OCMVerify([mock startExecutionTraceWithName:traceName]);
}

- (void) testSetExecutionTraceAttribute {
  NSString* traceName = @"Trace_1";
  NSString* traceId = @"Id_1";
  NSString* traceKey = @"Key_1";
  NSString* traceValue = @"1";
  RCTPromiseResolveBlock resolve = ^(id result) {};
  RCTPromiseRejectBlock reject = ^(NSString *code, NSString *message, NSError *error) {};
  IBGExecutionTrace * trace = [IBGExecutionTrace alloc];
  id mock = OCMClassMock([IBGAPM class]);
  id traceMock = OCMPartialMock(trace);

  OCMStub([mock startExecutionTraceWithName:traceName]).andReturn(trace);
  [self.instabugBridge startExecutionTrace:traceName :traceId :resolve :reject];

  OCMStub([traceMock setAttributeWithKey:traceKey value:traceValue]);
  [self.instabugBridge setExecutionTraceAttribute:traceId :traceKey :traceValue];
  OCMVerify([traceMock setAttributeWithKey:traceKey value:traceValue]);
}

- (void) testEndExecutionTrace {
  NSString* traceName = @"Trace_1";
  NSString* traceId = @"Id_1";
  RCTPromiseResolveBlock resolve = ^(id result) {};
  RCTPromiseRejectBlock reject = ^(NSString *code, NSString *message, NSError *error) {};
  IBGExecutionTrace * trace = [IBGExecutionTrace alloc];
  id apmMock = OCMClassMock([IBGAPM class]);
  id<ExecutionTraceCPTestProtocol> traceMock = OCMPartialMock(trace);

  OCMStub([apmMock startExecutionTraceWithName:traceName]).andReturn(trace);
  [self.instabugBridge startExecutionTrace:traceName :traceId :resolve :reject];

  OCMStub([traceMock end]);
  [self.instabugBridge endExecutionTrace:traceId];
  OCMVerify([traceMock end]);
}

- (void) testStartFlow {
  id mock = OCMClassMock([IBGAPM class]);
  NSString* appFlowName = @"APP_Flow_1";

  OCMStub([mock startFlowWithName:appFlowName]);
  [self.instabugBridge startFlow:appFlowName];
  OCMVerify([mock startFlowWithName:appFlowName]);
}

- (void) testEndFlow {
  id mock = OCMClassMock([IBGAPM class]);
  NSString* appFlowName = @"APP_Flow_1";

  OCMStub([mock endFlowWithName:appFlowName]);
  [self.instabugBridge endFlow:appFlowName];
  OCMVerify([mock endFlowWithName:appFlowName]);
}

- (void) testSetFlowAttribute {
  id mock = OCMClassMock([IBGAPM class]);
  NSString* appFlowName = @"APP_Flow_1";
  NSString* attributeKey = @"Attribute_Key_1";
  NSString* attributeValue = @"Attribute_Value_1";

  OCMStub([mock setAttributeForFlowWithName:appFlowName key:attributeKey value:attributeValue]);
  [self.instabugBridge setFlowAttribute:appFlowName :attributeKey :attributeValue];
  OCMVerify([mock setAttributeForFlowWithName:appFlowName key:attributeKey value:flowAttributeValue]);
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

@end
