#ifndef RNInstabug_h
#define RNInstabug_h

#import <Instabug/Instabug.h>

@interface RNInstabug : NSObject

+ (void)initWithToken:(NSString *)token invocationEvents:(IBGInvocationEvent)invocationEvents debugLogsLevel:(IBGSDKDebugLogsLevel)debugLogsLevel;
+ (void)initWithToken:(NSString *)token invocationEvents:(IBGInvocationEvent)invocationEvents;

@end

#endif /* RNInstabug_h */
