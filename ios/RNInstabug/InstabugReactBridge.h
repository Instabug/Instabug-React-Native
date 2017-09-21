//
//  InstabugReactBridge.h
//  instabugDemo
//
//  Created by Yousef Hamza on 9/29/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#if __has_include(<React/RCTBridgeModule.h>)
  #import <React/RCTBridgeModule.h>
  #import <React/RCTEventEmitter.h>
#else
  #import "RCTBridgeModule.h"
  #import "RCTEventEmitter.h"
#endif  

@interface InstabugReactBridge : RCTEventEmitter <RCTBridgeModule>

@end
