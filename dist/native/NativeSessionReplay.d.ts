import type { NativeModule } from 'react-native';
export interface SessionReplayNativeModule extends NativeModule {
    setEnabled(isEnabled: boolean): void;
    setNetworkLogsEnabled(isEnabled: boolean): void;
    setInstabugLogsEnabled(isEnabled: boolean): void;
    setUserStepsEnabled(isEnabled: boolean): void;
    getSessionReplayLink(): Promise<string>;
}
export declare const NativeSessionReplay: SessionReplayNativeModule;
