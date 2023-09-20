import type { NativeModule } from 'react-native';
import type { logLevel } from '../utils/ArgsRegistry';
export interface ApmNativeModule extends NativeModule {
    setEnabled(isEnabled: boolean): void;
    networkLog(data: string): void;
    setAppLaunchEnabled(isEnabled: boolean): void;
    endAppLaunch(): void;
    startExecutionTrace(name: string, timestamp: string): Promise<string | null>;
    setExecutionTraceAttribute(id: string, key: string, value: string): void;
    endExecutionTrace(id: string): void;
    setAutoUITraceEnabled(isEnabled: boolean): void;
    startUITrace(name: string): void;
    endUITrace(): void;
    ibgSleep(): void;
    /** @deprecated */
    setLogLevel(level: logLevel): void;
}
export declare const NativeAPM: ApmNativeModule;
