import { NativeInstabug } from '../native';
export var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Verbose"] = NativeInstabug.sdkDebugLogsLevelVerbose] = "Verbose";
    LogLevel[LogLevel["Debug"] = NativeInstabug.sdkDebugLogsLevelDebug] = "Debug";
    LogLevel[LogLevel["Error"] = NativeInstabug.sdkDebugLogsLevelError] = "Error";
    LogLevel[LogLevel["None"] = NativeInstabug.sdkDebugLogsLevelNone] = "None";
})(LogLevel || (LogLevel = {}));
