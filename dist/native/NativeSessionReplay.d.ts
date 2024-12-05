import { NativeEventEmitter } from 'react-native';
import type { NativeModule } from 'react-native';
export interface SessionReplayNativeModule extends NativeModule {
    setEnabled(isEnabled: boolean): void;
    setNetworkLogsEnabled(isEnabled: boolean): void;
    setInstabugLogsEnabled(isEnabled: boolean): void;
    setUserStepsEnabled(isEnabled: boolean): void;
    getSessionReplayLink(): Promise<string>;
    setSyncCallback(): Promise<void>;
    evaluateSync(shouldSync: boolean): void;
}
export declare const NativeSessionReplay: SessionReplayNativeModule;
export declare enum NativeEvents {
    SESSION_REPLAY_ON_SYNC_CALLBACK_INVOCATION = "IBGSessionReplayOnSyncCallback"
}
export declare const emitter: NativeEventEmitter;
