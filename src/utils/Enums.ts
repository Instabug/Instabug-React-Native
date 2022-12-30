import { NativeInstabug } from '../native';

export enum LogLevel {
  Verbose = NativeInstabug.sdkDebugLogsLevelVerbose,
  Debug = NativeInstabug.sdkDebugLogsLevelDebug,
  Error = NativeInstabug.sdkDebugLogsLevelError,
  None = NativeInstabug.sdkDebugLogsLevelNone,
}
