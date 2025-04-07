#import <Foundation/Foundation.h>
#import <Instabug/IBGTypes.h>
#import <Instabug/Instabug.h>

typedef NSDictionary<NSString*, NSNumber*> ArgsDictionary;

@interface ArgsRegistry : NSObject

+ (NSMutableDictionary *) getAll;

+ (ArgsDictionary *) sdkLogLevels;
+ (ArgsDictionary *) invocationEvents;
+ (ArgsDictionary *) invocationOptions;
+ (ArgsDictionary *) colorThemes;
+ (ArgsDictionary *) floatingButtonEdges;
+ (ArgsDictionary *) recordButtonPositions;
+ (ArgsDictionary *) welcomeMessageStates;
+ (ArgsDictionary *) reportTypes;
+ (ArgsDictionary *) dismissTypes;
+ (ArgsDictionary *) actionTypes;
+ (ArgsDictionary *) extendedBugReportStates;
+ (ArgsDictionary *) reproStates;
+ (ArgsDictionary *) locales;
+ (ArgsDictionary *)nonFatalExceptionLevel;
+ (ArgsDictionary *) launchType;

+ (NSDictionary<NSString *, NSString *> *) placeholders;
+ (ArgsDictionary *)autoMaskingTypes;

@end
