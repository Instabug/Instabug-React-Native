import CrashReporting from './modules/CrashReporting';
import Instabug from './modules/Instabug';
import NetworkLogger from './modules/NetworkLogger';
import Replies from './modules/Replies';
import Surveys from './modules/Surveys';

export { APM } from './modules/APM';
export { BugReporting } from './modules/BugReporting';
export { FeatureRequests } from './modules/FeatureRequests';

export { CrashReporting, NetworkLogger, Replies, Surveys };

export default Instabug;