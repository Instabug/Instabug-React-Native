/// <reference types="react-native" />
import { ExtendedError, StackFrame } from 'react-native/Libraries/Core/Devtools/parseErrorStack';
import type { NavigationState as NavigationStateV5, PartialState } from '@react-navigation/native';
import type { NavigationState as NavigationStateV4 } from 'react-navigation';
export declare const parseErrorStack: (error: ExtendedError) => StackFrame[];
export declare const isOnReportHandlerSet: () => boolean;
export declare const setOnReportHandler: (flag: boolean) => void;
export declare const getActiveRouteName: (navigationState: NavigationStateV4) => string | null;
declare function getFullRoute(state: NavigationStateV5 | PartialState<NavigationStateV5>): string;
export declare const getStackTrace: (e: ExtendedError) => StackFrame[];
export declare const captureJsErrors: () => void;
export declare const stringifyIfNotString: (input: unknown) => string;
declare const _default: {
    parseErrorStack: (error: ExtendedError) => StackFrame[];
    captureJsErrors: () => void;
    setOnReportHandler: (flag: boolean) => void;
    isOnReportHandlerSet: () => boolean;
    getActiveRouteName: (navigationState: NavigationStateV4) => string | null;
    getFullRoute: typeof getFullRoute;
    getStackTrace: (e: ExtendedError) => StackFrame[];
    stringifyIfNotString: (input: unknown) => string;
};
export default _default;
