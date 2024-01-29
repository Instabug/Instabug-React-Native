#import <Instabug/Instabug.h>
#import <Instabug/IBGTypes.h>

NS_ASSUME_NONNULL_BEGIN

@interface Instabug (CP)

+ (void)setCurrentPlatform:(IBGPlatform)platform;
+ (void)setWillSendNetworkDiagnosticsHandler:(void (^_Nullable)(NSString*, NSInteger, NSInteger))willSendNetworkDiagnosticsHandler;
@end

NS_ASSUME_NONNULL_END
