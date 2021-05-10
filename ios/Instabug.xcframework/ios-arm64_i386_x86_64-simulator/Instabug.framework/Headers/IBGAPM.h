/*
 File:       Instabug/IBGAPM.h
 
 Contains:   API for using Instabug's SDK.
 
 Copyright:  (c) 2013-2020 by Instabug, Inc., all rights reserved.
 
 Version:    10.4.4
 */

#import <Foundation/Foundation.h>
#import "IBGTypes.h"

@class IBGExecutionTrace;

NS_ASSUME_NONNULL_BEGIN

NS_SWIFT_NAME(APM)
/// Instabug APM
@interface IBGAPM : NSObject

/// Disables/Enables APM.
///
/// Defaults to true if APM is included in your Instabug account's plan.
@property (class, atomic, assign) BOOL enabled;

/// Disables/Enables App Launch tracking.
///
/// Defaults to true if APM is enabled. If APM is disabled, App Launch time will not be captured.
@property (class, atomic, assign) BOOL appLaunchEnabled;

/// Disables/Enables Automatic UI Traces.
///
/// Defaults to true if APM is enabled. If APM is disabled, no Automatic UI Traces will be captured.
@property (class, atomic, assign) BOOL autoUITraceEnabled;

/// Creates and starts a new Execution Trace with the given name.
///
/// Creates and starts an Execution trace with the specified name, returns nil in case APM is disabled.
///
/// Multiple traces can start in parallel, including those with identical names.
///
/// If the Execution Trace is not ended, it will be discarded.
///
/// Execution Trace name cannot exceed 150 characters otherwise it's trimmed, leading and trailing whitespaces are also ignored.
///
/// This API is thread safe.
///
/// @param name Execution Trace name.
+ (IBGExecutionTrace *_Nullable)startExecutionTraceWithName:(NSString *)name;

/// Starts a Custom UI Trace with the given name.
///
/// Starts a Custom UI Trace with the specified name. If APM is disabled, Custom UI Traces are not captured.
///
/// Custom UI Traces cannot run in parallel, one must be ended before the other is started.
///
/// Custom UI Trace name cannot exceed 150 characters otherwise it's trimmed, leading and trailing whitespaces are also ignored.
///
/// This API should be called from the main thread.
///
/// @param name Custom UI Trace name.
+ (void)startUITraceWithName:(NSString *)name;

/// Ends the current running Custom UI Trace.
+ (void)endUITrace;

/// Sets the printed logs priority. Filter to one of the following levels.
///
/// Sets the printed logs priority. Filter to one of the following levels:
///
/// - IBGLogLevelNone disables all APM SDK console logs.
///
/// - IBGLogLevelError prints errors only, we use this level to let you know if something goes wrong.
///
/// - IBGLogLevelWarning displays warnings that will not necessarily lead to errors but should be addressed nonetheless.
///
/// - IBGLogLevelInfo (default) logs information that we think is useful without being too verbose.
///
/// - IBGLogLevelDebug use this in case you are debugging an issue. Not recommended for production use.
///
/// - IBGLogLevelVerbose use this only if IBGLogLevelDEBUG was not enough and you need more visibility
/// on what is going on under the hood.
///
/// Similar to the IBGLogLevelDebug level, this is not meant to be used on production environments.
///
/// Each log level will also include logs from all the levels above it. For instance,
/// IBGLogLevelInfo will include IBGLogLevelInfo logs as well as IBGLogLevelWarning
/// and IBGLogLevelError logs.
@property (class, atomic, assign) IBGLogLevel logLevel;

@end

NS_ASSUME_NONNULL_END
