#import "MainViewController.h"
#import <React/RCTRootView.h>
#import <Instabug/Instabug.h>
#import <Instabug/IBGCrashReporting.h>
@interface MainViewController ()

@end

@implementation MainViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}
- (IBAction)startReactNative:(UIButton *)sender {
    NSURL *jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.bundle?platform=ios"];

    RCTRootView *rootView =
          [[RCTRootView alloc] initWithBundleURL: jsCodeLocation
                                      moduleName: @"HybridSampleApp"
                               initialProperties:nil
launchOptions: nil];
        UIViewController *vc = [[UIViewController alloc] init];
        vc.view = rootView;
        [self presentViewController:vc animated:YES completion:nil];
}

- (IBAction)throwHandled:(UIButton *)sender {
    NSException *exception = [NSException exceptionWithName:@"Objective-C Handled Exception"
                                                     reason:@"no reason"
                                                   userInfo:nil];
    IBGNonFatalException *nonFatalException = [IBGCrashReporting exception:exception];
    
    if (nonFatalException) {
        nonFatalException.userAttributes = @{ @"hello" : @"world" };
        nonFatalException.groupingString = @"com.service.method.some_exception";
        [nonFatalException report];
    }
}

- (IBAction)throwUnhandled:(UIButton *)sender {
    NSLog(@"Unhandled Crash button pressed");
}

// Add this helper method to get the top most view controller
- (UIViewController *)topMostViewController {
    UIViewController *topViewController = [UIApplication sharedApplication].keyWindow.rootViewController;
    while (topViewController.presentedViewController) {
        topViewController = topViewController.presentedViewController;
    }
    return topViewController;
}
@end
