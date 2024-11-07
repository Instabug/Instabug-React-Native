#import "MainViewController.h"
#import <React/RCTRootView.h>
#import <Instabug/Instabug.h>
#import <Instabug/IBGCrashReporting.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTBridge.h>
#import <CodePush/CodePush.h>

@interface MainViewController () <RCTBridgeDelegate>
@property (nonatomic, strong) RCTBridge *bridge;
@end

@implementation MainViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:nil];
}

- (IBAction)startReactNative:(UIButton *)sender {
    RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:self.bridge
                                                    moduleName:@"HybridSampleApp"
                                             initialProperties:nil];
    
    UIViewController *vc = [[UIViewController alloc] init];
    vc.view = rootView;
    [self presentViewController:vc animated:YES completion:nil];
}

// This will now be called by the bridge
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
    NSLog(@"sourceURLForBridge called!"); // This will now print
#if DEBUG
    return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
    return [CodePush bundleURL];
#endif
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
- (IBAction)sendGraphQLRequest:(UIButton *)sender {
    NSString *urlString = @"https://countries.trevorblades.com/graphql";
    NSURL *url = [NSURL URLWithString:urlString];
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:url];
    
    request.HTTPMethod = @"POST";
    [request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
    [request setValue:@"GetCountry" forHTTPHeaderField:@"ibg-graphql-header"];
    
    NSDictionary *queryDict = @{
        @"query": @"query GetCountry { country(code: \"EG\") { emoji name } }"
    };
    
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:queryDict
                                                      options:0
                                                        error:&error];
    if (error) {
        NSLog(@"JSON Serialization Error: %@", error);
        return;
    }
    
    request.HTTPBody = jsonData;
    
    NSURLSession *session = [NSURLSession sharedSession];
    NSURLSessionDataTask *task = [session dataTaskWithRequest:request
                                          completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
        if (error) {
            NSLog(@"Error: %@", error);
            return;
        }
        
        NSError *jsonError;
        NSDictionary *jsonResponse = [NSJSONSerialization JSONObjectWithData:data
                                                                   options:0
                                                                     error:&jsonError];
        if (jsonError) {
            NSLog(@"JSON Parsing Error: %@", jsonError);
            return;
        }
        
        dispatch_async(dispatch_get_main_queue(), ^{
            NSLog(@"Response: %@", jsonResponse[@"data"]);
        });
    }];
    
    [task resume];
}
@end
