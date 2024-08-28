import { NativeEventEmitter, type NativeModule } from 'react-native';

import { NativeModules } from './NativePackage';

export interface SessionReplayNativeModule extends NativeModule {
  setEnabled(isEnabled: boolean): void;
  setNetworkLogsEnabled(isEnabled: boolean): void;
  setInstabugLogsEnabled(isEnabled: boolean): void;
  setUserStepsEnabled(isEnabled: boolean): void;
  getSessionReplayLink(): Promise<string>;
  setSyncCallback(): Promise<void>;
  evaluateSync(shouldSync: boolean): void;
}

export const NativeSessionReplay = NativeModules.IBGSessionReplay;
export enum NativeEvents {
  SESSION_REPLAY_ON_SYNC_CALLBACK_INVOCATION = 'IBGSessionReplayOnSyncCallback',
}

export const emitter = new NativeEventEmitter(NativeSessionReplay);
