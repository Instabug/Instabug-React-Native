#import <XCTest/XCTest.h>
#import "OCMock/OCMock.h"
#import "Instabug/Instabug.h"
#import "Instabug/IBGSurvey.h"
#import <Instabug/IBGTypes.h>
#import "RNInstabug.h"
#import "RNInstabug/Instabug+CP.h"
#import "RNInstabug/IBGNetworkLogger+CP.h"
#import "IBGConstants.h"

@interface RNInstabugTests : XCTestCase

@property (nonatomic, strong) id mInstabug;
@property (nonatomic, strong) id mIBGNetworkLogger;

@end

// Expose the `reset` API on RNInstabug to allow multiple calls to `initWithToken`.
@interface RNInstabug (Test)
+ (void)reset;
@end

@implementation RNInstabugTests

- (void)setUp {
  self.mInstabug = OCMClassMock([Instabug class]);
  self.mIBGNetworkLogger = OCMClassMock([IBGNetworkLogger class]);

  [RNInstabug reset];
}

- (void)testInitWithoutLogsLevel {
  NSString *token = @"app-token";
  IBGInvocationEvent invocationEvents = IBGInvocationEventFloatingButton | IBGInvocationEventShake;

  [RNInstabug initWithToken:token invocationEvents:invocationEvents];

  OCMVerify([self.mInstabug startWithToken:token invocationEvents:invocationEvents]);
  OCMVerify([self.mInstabug setCurrentPlatform:IBGPlatformReactNative]);
  OCMVerify([self.mIBGNetworkLogger disableAutomaticCapturingOfNetworkLogs]);
  OCMVerify([self.mIBGNetworkLogger setEnabled:YES]);
}

- (void)testInitWithLogsLevel {
  NSString *token = @"app-token";
  IBGInvocationEvent invocationEvents = IBGInvocationEventFloatingButton | IBGInvocationEventShake;
  IBGSDKDebugLogsLevel debugLogsLevel = IBGSDKDebugLogsLevelDebug;

  [RNInstabug initWithToken:token invocationEvents:invocationEvents debugLogsLevel:debugLogsLevel];

  OCMVerify([self.mInstabug startWithToken:token invocationEvents:invocationEvents]);
  OCMVerify([self.mInstabug setCurrentPlatform:IBGPlatformReactNative]);
  OCMVerify([self.mIBGNetworkLogger disableAutomaticCapturingOfNetworkLogs]);
  OCMVerify([self.mIBGNetworkLogger setEnabled:YES]);
}

- (void) testSetCodePushVersion {
  NSString *codePushVersion = @"1.0.0(1)";
  [RNInstabug setCodePushVersion:codePushVersion];
  OCMVerify([self.mInstabug setCodePushVersion:codePushVersion]);
}

@end
