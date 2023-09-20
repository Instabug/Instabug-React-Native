import type { NativeModule, Platform } from 'react-native';
import type { StackFrame } from 'react-native/Libraries/Core/Devtools/parseErrorStack';
export interface CrashData {
    message: string;
    e_message: string;
    e_name: string;
    os: (typeof Platform)['OS'];
    platform: 'react_native';
    exception: StackFrame[];
}
export interface CrashReportingNativeModule extends NativeModule {
    setEnabled(isEnabled: boolean): void;
    sendJSCrash(data: CrashData | string): void;
    sendHandledJSCrash(data: CrashData | string): void;
}
export declare const NativeCrashReporting: CrashReportingNativeModule;
