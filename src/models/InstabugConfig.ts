import type { invocationEvent } from '../utils/ArgsRegistry';
import type { LogLevel } from '../utils/Enums';

export interface InstabugConfig {
  token: string;
  invocationEvents: invocationEvent[];
  debugLogsLevel?: LogLevel;
}
