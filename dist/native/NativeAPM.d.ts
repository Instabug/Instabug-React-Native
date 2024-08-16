import type { NativeModule } from 'react-native';
export interface ApmNativeModule extends NativeModule {
    setEnabled(isEnabled: boolean): void;
    networkLogAndroid(requestStartTime: number, requestDuration: number, requestHeaders: string, requestBody: string, requestBodySize: number, requestMethod: string, requestUrl: string, requestContentType: string, responseHeaders: string, responseBody: string | null, responseBodySize: number, statusCode: number, responseContentType: string, errorDomain: string, gqlQueryName?: string, serverErrorMessage?: string): void;
    setAppLaunchEnabled(isEnabled: boolean): void;
    endAppLaunch(): void;
    startExecutionTrace(name: string, timestamp: string): Promise<string | null>;
    setExecutionTraceAttribute(id: string, key: string, value: string): void;
    endExecutionTrace(id: string): void;
    startFlow(name: string): void;
    endFlow(name: string): void;
    setFlowAttribute(name: string, key: string, value?: string | null): void;
    setAutoUITraceEnabled(isEnabled: boolean): void;
    startUITrace(name: string): void;
    endUITrace(): void;
    ibgSleep(): void;
}
export declare const NativeAPM: ApmNativeModule;
