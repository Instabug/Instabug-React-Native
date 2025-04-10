import { Logger } from '../../src/utils/logger';
import { InstabugRNConfig } from '../../src/utils/config';
import { LogLevel } from '../../src/utils/Enums';

describe('Logger', () => {
  const originalLogLevel = InstabugRNConfig.debugLogsLevel;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    InstabugRNConfig.debugLogsLevel = originalLogLevel;
  });

  const testMessage = 'Test message';
  const testParams = ['param1', 123, { key: 'value' }];

  const consoleSpies = {
    error: jest.spyOn(console, 'error').mockImplementation(() => {}),
    info: jest.spyOn(console, 'info').mockImplementation(() => {}),
    log: jest.spyOn(console, 'log').mockImplementation(() => {}),
    warn: jest.spyOn(console, 'warn').mockImplementation(() => {}),
    trace: jest.spyOn(console, 'trace').mockImplementation(() => {}),
    debug: jest.spyOn(console, 'debug').mockImplementation(() => {}),
  };

  const allMethods = [
    { methodName: 'error', spy: consoleSpies.error, level: LogLevel.error },
    { methodName: 'info', spy: consoleSpies.info, level: LogLevel.verbose },
    { methodName: 'log', spy: consoleSpies.log, level: LogLevel.verbose },
    { methodName: 'warn', spy: consoleSpies.warn, level: LogLevel.debug },
    { methodName: 'trace', spy: consoleSpies.trace, level: LogLevel.debug },
    { methodName: 'debug', spy: consoleSpies.debug, level: LogLevel.debug },
  ];

  describe.each([LogLevel.none, LogLevel.error, LogLevel.debug, LogLevel.verbose])(
    'when log level is %s',
    (currentLevel) => {
      beforeEach(() => {
        InstabugRNConfig.debugLogsLevel = currentLevel;
      });

      it.each(allMethods)('should %s be logged properly', ({ methodName, spy, level }) => {
        (Logger[methodName as keyof typeof Logger] as (...args: any[]) => void)(
          testMessage,
          ...testParams,
        );

        const shouldLog = {
          [LogLevel.none]: false,
          [LogLevel.error]: level === LogLevel.error,
          [LogLevel.debug]: [LogLevel.error, LogLevel.debug].includes(level),
          [LogLevel.verbose]: true,
        }[currentLevel];

        if (shouldLog) {
          expect(spy).toHaveBeenCalledWith(testMessage, ...testParams);
        } else {
          expect(spy).not.toHaveBeenCalled();
        }
      });
    },
  );
});
