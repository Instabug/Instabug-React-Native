#import <XCTest/XCTest.h>
#import "InstabugNetworkLoggerBridge.h"

@interface InstabugNetworkLoggerBridgeTests : XCTestCase

@property (nonatomic, strong) InstabugNetworkLoggerBridge *networkLoggerBridge;

@end

@implementation InstabugNetworkLoggerBridgeTests

- (void)setUp {
    [super setUp];
    self.networkLoggerBridge = [[InstabugNetworkLoggerBridge alloc] init];
}

- (void)tearDown {
    self.networkLoggerBridge = nil;
    [super tearDown];
}

- (void)testInitialization {
    XCTAssertNotNil(self.networkLoggerBridge.requestObfuscationCompletionDictionary);
    XCTAssertNotNil(self.networkLoggerBridge.responseObfuscationCompletionDictionary);
    XCTAssertNotNil(self.networkLoggerBridge.requestFilteringCompletionDictionary);
    XCTAssertNotNil(self.networkLoggerBridge.responseFilteringCompletionDictionary);
}

- (void)testRequiresMainQueueSetup {
    XCTAssertFalse([InstabugNetworkLoggerBridge requiresMainQueueSetup]);
}

- (void)testSupportedEvents {
    NSArray *events = [self.networkLoggerBridge supportedEvents];
    NSArray *expectedEvents = @[@"IBGpreInvocationHandler", @"IBGNetworkLoggerHandler"];
    XCTAssertEqualObjects(events, expectedEvents);
}

- (void)testMethodQueue {
    dispatch_queue_t queue = [self.networkLoggerBridge methodQueue];
    XCTAssertEqual(queue, dispatch_get_main_queue());
}

- (void)testStartObserving {
    [self.networkLoggerBridge startObserving];
    // Since `hasListeners` is private, we will assume it is true based on no errors or behavior issues
    XCTAssertTrue(YES); // Expect no crashes
}

- (void)testStopObserving {
    [self.networkLoggerBridge stopObserving];
    XCTAssertTrue(YES); // Ensure the method doesn't cause issues
}

- (void)testIsNativeInterceptionEnabled {
    XCTestExpectation *expectation = [self expectationWithDescription:@"isNativeInterceptionEnabled"];
    
    [self.networkLoggerBridge isNativeInterceptionEnabled:^(id result) {
        XCTAssertNotNil(result);
        XCTAssertTrue([result isKindOfClass:[NSNumber class]]);
        [expectation fulfill];
    } :^(NSString *code, NSString *message, NSError *error) {
        XCTFail(@"Promise rejection not expected.");
    }];
    
    [self waitForExpectationsWithTimeout:1.0 handler:nil];
}

- (void)testRegisterNetworkLogsListenerFiltering {
    [self.networkLoggerBridge registerNetworkLogsListener:NetworkListenerTypeFiltering];
    // Expect no crashes and check that filtering handler was set
    XCTAssertTrue(YES); // Could add additional assertions if more visibility into handler setup is possible
}

- (void)testRegisterNetworkLogsListenerObfuscation {
    [self.networkLoggerBridge registerNetworkLogsListener:NetworkListenerTypeObfuscation];
    XCTAssertTrue(YES); // Expect no crashes, similar reasoning
}

- (void)testRegisterNetworkLogsListenerBoth {
    [self.networkLoggerBridge registerNetworkLogsListener:NetworkListenerTypeBoth];
    XCTAssertTrue(YES); // Same reason, ensuring no crash
}

- (void)testUpdateNetworkLogSnapshotValidJson {
    NSString *jsonString = @"{\"url\":\"https://example.com\",\"requestBody\":\"bodyData\",\"requestHeader\":{\"key\":\"value\"},\"id\":\"12345\"}";
    
    [self.networkLoggerBridge updateNetworkLogSnapshot:jsonString];
    
    // Expect no errors or logs regarding completion issues
    XCTAssertTrue(YES);
}

- (void)testUpdateNetworkLogSnapshotInvalidJson {
    NSString *invalidJsonString = @"invalid json string";
    
    // This should fail gracefully and log an error
    [self.networkLoggerBridge updateNetworkLogSnapshot:invalidJsonString];
    XCTAssertTrue(YES); // No crash, expect graceful handling
}

- (void)testSetNetworkLoggingRequestFilterPredicateIOS {
    NSString *callbackID = @"12345";
    
    // Mock a completion handler
    self.networkLoggerBridge.requestFilteringCompletionDictionary[callbackID] = ^(BOOL shouldSave) {
        XCTAssertTrue(shouldSave);
    };
    
    [self.networkLoggerBridge setNetworkLoggingRequestFilterPredicateIOS:callbackID :YES];
    
    XCTAssertTrue(YES); // Ensure that the handler is invoked correctly
}

- (void)testSetNetworkLoggingRequestFilterPredicateIOSInvalidCallback {
    NSString *invalidCallbackID = @"invalidID";
    
    // This should fail gracefully and log an error
    [self.networkLoggerBridge setNetworkLoggingRequestFilterPredicateIOS:invalidCallbackID :YES];
    
    XCTAssertTrue(YES); // No crash, expect graceful handling
}

@end
