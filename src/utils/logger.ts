import { InstabugRNConfig } from './config';
import { LogLevel } from './Enums';

export class Logger {
  private static shouldLog(level: LogLevel): boolean {
    const currentLevel = InstabugRNConfig.debugLogsLevel;

    // Return true if the current log level is equal to or more verbose than the requested level
    const logLevelHierarchy: Record<LogLevel, number> = {
      [LogLevel.verbose]: 3,
      [LogLevel.debug]: 2,
      [LogLevel.error]: 1,
      [LogLevel.none]: 0,
    };

    return logLevelHierarchy[currentLevel] >= logLevelHierarchy[level];
  }

  // General logging method that takes a logging function as an argument
  private static logMessage(
    level: LogLevel,
    logMethod: (...args: any[]) => void,
    message?: any,
    ...optionalParams: any[]
  ): void {
    if (this.shouldLog(level)) {
      logMethod(message, ...optionalParams);
    }
  }

  static error(message?: any, ...optionalParams: any[]) {
    this.logMessage(LogLevel.error, console.error, message, ...optionalParams); // Pass console.error for errors
  }

  static info(message?: any, ...optionalParams: any[]) {
    this.logMessage(LogLevel.verbose, console.info, message, ...optionalParams); // Pass console.info for info
  }

  static log(message?: any, ...optionalParams: any[]) {
    this.logMessage(LogLevel.verbose, console.log, message, ...optionalParams); // Default log method
  }

  static warn(message?: any, ...optionalParams: any[]) {
    this.logMessage(LogLevel.debug, console.warn, message, ...optionalParams); // Use console.warn for debug
  }

  static trace(message?: any, ...optionalParams: any[]) {
    this.logMessage(LogLevel.debug, console.trace, message, ...optionalParams); // Use console.trace for debugging
  }

  static debug(message?: any, ...optionalParams: any[]) {
    this.logMessage(LogLevel.debug, console.debug, message, ...optionalParams); // Use console.debug for debug logs
  }
}
