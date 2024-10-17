
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNInstabugReactnativeNdkSpec.h"

@interface InstabugReactnativeNdk : NSObject <NativeInstabugReactnativeNdkSpec>
#else
#import <React/RCTBridgeModule.h>

@interface InstabugReactnativeNdk : NSObject <RCTBridgeModule>
#endif

@end
