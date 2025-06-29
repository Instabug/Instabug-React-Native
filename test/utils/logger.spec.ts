import { InstabugRNConfig } from '../../src/utils/config';
import { LogLevel } from '../../src';
import { Logger } from '../../src/utils/logger';

describe('Logger', () => {
  const consoleMethods = {
    error: jest.spyOn(console, 'error').mockImplementation(() => {}),
    info: jest.spyOn(console, 'info').mockImplementation(() => {}),
    log: jest.spyOn(console, 'log').mockImplementation(() => {}),
    warn: jest.spyOn(console, 'warn').mockImplementation(() => {}),
    trace: jest.spyOn(console, 'trace').mockImplementation(() => {}),
    debug: jest.spyOn(console, 'debug').mockImplementation(() => {}),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const allLevels: LogLevel[] = [LogLevel.none, LogLevel.error, LogLevel.debug, LogLevel.verbose];

  it.each(allLevels)('should respect logging level: %s', (level) => {
    InstabugRNConfig.debugLogsLevel = level;

    Logger.error('error');
    Logger.info('info');
    Logger.log('log');
    Logger.warn('warn');
    Logger.trace('trace');
    Logger.debug('debug');

    const logLevelHierarchy: Record<LogLevel, number> = {
      [LogLevel.verbose]: 3,
      [LogLevel.debug]: 2,
      [LogLevel.error]: 1,
      [LogLevel.none]: 0,
    };

    const current = logLevelHierarchy[level];

    expect(consoleMethods.error).toHaveBeenCalledTimes(current >= 1 ? 1 : 0);
    expect(consoleMethods.info).toHaveBeenCalledTimes(current >= 3 ? 1 : 0);
    expect(consoleMethods.log).toHaveBeenCalledTimes(current >= 3 ? 1 : 0);
    expect(consoleMethods.warn).toHaveBeenCalledTimes(current >= 2 ? 1 : 0);
    expect(consoleMethods.trace).toHaveBeenCalledTimes(current >= 2 ? 1 : 0);
    expect(consoleMethods.debug).toHaveBeenCalledTimes(current >= 2 ? 1 : 0);
  });

  it('passes message and params correctly', () => {
    InstabugRNConfig.debugLogsLevel = LogLevel.verbose;

    Logger.log('test message', 'extra', 123);

    expect(consoleMethods.log).toHaveBeenCalledWith('test message', 'extra', 123);
  });
});
