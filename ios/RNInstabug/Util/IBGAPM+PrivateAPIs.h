//
//  IBGAPM+PrivateAPIs.h
//  Pods
//
//  Created by Instabug on 02/06/2024.
//

//#import "IBGAPM.h"

@interface IBGAPM (PrivateAPIs)

@property (class, atomic, assign) BOOL networkEnabled;
/// `w3ExternalTraceIDEnabled` will be only true if APM and network are enabled
@property (class, atomic, assign) BOOL w3ExternalTraceIDEnabled;
/// `w3ExternalGeneratedHeaderEnabled` will be only true if  APM, network and w3ExternalTraceIDEnabled are true
@property (class, atomic, assign) BOOL w3ExternalGeneratedHeaderEnabled;
/// `w3CaughtHeaderEnabled` will be only true if  APM, network and w3ExternalTraceIDEnabled are true
@property (class, atomic, assign) BOOL w3CaughtHeaderEnabled;

@end
