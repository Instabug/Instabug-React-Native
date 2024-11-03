import { NativeModules } from './NativePackage';
import { NativeEventEmitter, type NativeModule } from 'react-native';

export enum NetworkListenerType {
  filtering = 'filtering',
  obfuscation = 'obfuscation',
  both = 'both',
}

export interface NetworkLoggerNativeModule extends NativeModule {
  isNativeInterceptionEnabled(): Promise<boolean>;

  registerNetworkLogsListener(type?: NetworkListenerType): void;

  updateNetworkLogSnapshot(networkData: string): void;

  hasAPMNetworkPlugin(): Promise<boolean>; // Android only

  setNetworkLoggingRequestFilterPredicateIOS(id: string, value: boolean): void; // iOS only

  forceStartNetworkLoggingIOS(): void; // iOS only;

  forceStopNetworkLoggingIOS(): void; // iOS only;
}

export const NativeNetworkLogger = NativeModules.IBGNetworkLogger;

export enum NativeNetworkLoggerEvent {
  NETWORK_LOGGER_HANDLER = 'IBGNetworkLoggerHandler',
}

export const NetworkLoggerEmitter = new NativeEventEmitter(NativeNetworkLogger);
