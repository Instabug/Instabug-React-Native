#import "CrashReportingExampleModule.h"
#import <Instabug/IBGCrashReporting.h>
#import <Instabug/Instabug.h>

@interface CrashReportingExampleModule()
@property (nonatomic, strong) NSMutableArray *oomBelly;
@property (nonatomic, strong) dispatch_queue_t serialQueue;
@end

@implementation CrashReportingExampleModule

- (instancetype)init {
    self = [super init];
    if (self) {
        self.serialQueue = dispatch_queue_create("QUEUE>SERIAL", DISPATCH_QUEUE_SERIAL);
    }
    return self;
}

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}


- (void)oomCrash {
    dispatch_async(self.serialQueue, ^{
        self.oomBelly = [NSMutableArray array];
        [UIApplication.sharedApplication beginBackgroundTaskWithName:@"OOM Crash" expirationHandler:nil];
        while (true) {
            unsigned long dinnerLength = 1024 * 1024 * 10;
            char *dinner = malloc(sizeof(char) * dinnerLength);
            for (int i=0; i < dinnerLength; i++)
            {
                //write to each byte ensure that the memory pages are actually allocated
                dinner[i] = '0';
            }
            NSData *plate = [NSData dataWithBytesNoCopy:dinner length:dinnerLength freeWhenDone:YES];
            [self.oomBelly addObject:plate];
        }
    });
}

RCT_EXPORT_MODULE(CrashReportingExampleModule)


RCT_EXPORT_METHOD(sendNativeNonFatal) {
    IBGNonFatalException *nonFatalException = [IBGCrashReporting exception:[NSException exceptionWithName:@"native Handled NS Exception" reason:@"Test iOS Handled Crash" userInfo:@{@"Key": @"Value"}]];

    [nonFatalException report];
}

RCT_EXPORT_METHOD(sendNativeFatalCrash) {
    NSException *exception = [NSException exceptionWithName:@"native Unhandled NS Exception" reason:@"Test iOS Unhandled Crash" userInfo:nil];
    @throw exception;
}
RCT_EXPORT_METHOD(sendFatalHang) {
    [NSThread sleepForTimeInterval:3.0f];
}

RCT_EXPORT_METHOD(sendOOM) {
    [self oomCrash];
}

@synthesize description;

@synthesize hash;

@synthesize superclass;

@end


