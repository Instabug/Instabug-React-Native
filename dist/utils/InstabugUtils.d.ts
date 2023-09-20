import { ExtendedError, StackFrame } from 'react-native/Libraries/Core/Devtools/parseErrorStack';
import type { NavigationState as NavigationStateV5, PartialState } from '@react-navigation/native';
import type { NavigationState as NavigationStateV4 } from 'react-navigation';
import type { CrashData } from '../native/NativeCrashReporting';
export declare const parseErrorStack: (error: ExtendedError) => StackFrame[];
export declare const getActiveRouteName: (navigationState: NavigationStateV4) => string | null;
declare function getFullRoute(state: NavigationStateV5 | PartialState<NavigationStateV5>): string;
export declare const getStackTrace: (e: ExtendedError) => StackFrame[];
export declare const captureJsErrors: () => void;
export declare const stringifyIfNotString: (input: unknown) => string;
export declare const invokeDeprecatedCallback: <T>(callback?: ((arg: T) => void) | undefined, arg?: T | null | undefined) => void;
/**
 * Sends crash report to Instabug's servers based on @param sendFunction
 *
 * @param error Error object to be sent to Instabug's servers
 * @param remoteSenderCallback Function to send the crash report to Instabug's servers
 *
 * @example
 * `sendCrashReport(error, NativeCrashReporting.sendHandledJSCrash);`
 * or
 * `sendCrashReport(error, NativeCrashReporting.sendJSCrash);`
 *
 */
export declare function sendCrashReport(error: ExtendedError, remoteSenderCallback: (json: CrashData | string) => void): void;
declare const _default: {
    parseErrorStack: (error: ExtendedError) => StackFrame[];
    captureJsErrors: () => void;
    getActiveRouteName: (navigationState: NavigationStateV4) => string | null;
    getFullRoute: typeof getFullRoute;
    getStackTrace: (e: ExtendedError) => StackFrame[];
    stringifyIfNotString: (input: unknown) => string;
    invokeDeprecatedCallback: <T>(callback?: ((arg: T) => void) | undefined, arg?: T | null | undefined) => void;
    sendCrashReport: typeof sendCrashReport;
};
export default _default;
