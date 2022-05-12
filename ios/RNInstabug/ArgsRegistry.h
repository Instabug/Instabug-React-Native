#import <Foundation/Foundation.h>
#import <Instabug/IBGTypes.h>

typedef NSDictionary<NSString*, NSNumber*> ArgsDictionary;

@interface ArgsRegistry : NSObject

+ (NSMutableDictionary *) getAll;

+ (ArgsDictionary *) sdkLogLevels;
+ (ArgsDictionary *) logLevels;
+ (ArgsDictionary *) invocationEvents;
+ (ArgsDictionary *) invocationModes __attribute__ ((deprecated));
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
+ (ArgsDictionary *) promptOptions __attribute__ ((deprecated));
+ (ArgsDictionary *) locales;
+ (NSDictionary<NSString *, NSString *> *) placeholders;

@end
