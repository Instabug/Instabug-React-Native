import type { invocationEvent } from '../utils/ArgsRegistry';

export interface InstabugConfig {
  token: string;
  invocationEvents: invocationEvent[];
}
