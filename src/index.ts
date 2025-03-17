// Models
import type { InstabugConfig } from './models/InstabugConfig';
import Report from './models/Report';
import Trace from './models/Trace';
import {
  createProactiveReportingConfig,
  type ProactiveReportingConfigOptions,
} from './models/ProactiveReportingConfigs';

// Modules
import * as APM from './modules/APM';
import * as BugReporting from './modules/BugReporting';
import * as CrashReporting from './modules/CrashReporting';
import * as FeatureRequests from './modules/FeatureRequests';
import * as Instabug from './modules/Instabug';
import * as NetworkLogger from './modules/NetworkLogger';
import type { NetworkData, NetworkDataObfuscationHandler } from './modules/NetworkLogger';
import * as Replies from './modules/Replies';
import type { Survey } from './modules/Surveys';
import * as Surveys from './modules/Surveys';
import * as SessionReplay from './modules/SessionReplay';
import type { SessionMetadata } from './models/SessionMetadata';

export * from './utils/Enums';
export {
  Report,
  Trace,
  ProactiveReportingConfigOptions,
  createProactiveReportingConfig,
  APM,
  BugReporting,
  CrashReporting,
  FeatureRequests,
  NetworkLogger,
  SessionReplay,
  Replies,
  Surveys,
};
export type { InstabugConfig, Survey, NetworkData, NetworkDataObfuscationHandler, SessionMetadata };

export default Instabug;
