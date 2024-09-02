//
//  CPNetworkLoggingObserverDelegateImp.h
//  InstabugI
//
//  Created by Eyad on 29/08/2024.
//  Copyright © 2024 Instabug. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import "CPNetworkLoggingObserver.h"
#import <React/RCTEventEmitter.h>

NS_ASSUME_NONNULL_BEGIN

@interface CPNetworkLoggingObserverDelegateImp : RCTEventEmitter <RCTBridgeModule, CPNetworkLoggingObserverDelegate>

@end

NS_ASSUME_NONNULL_END
