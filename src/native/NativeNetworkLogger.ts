import { NativeModules } from './NativePackage';
import { NativeEventEmitter, type NativeModule } from 'react-native';

export interface NetworkLoggerNativeModule extends NativeModule {
  isNativeInterceptionEnabled(): Promise<boolean>;
  // Android only
  isAPMNetworkEnabled(): Promise<boolean>;
  // Android only
  hasAPMNetworkPlugin(): Promise<boolean>;

  registerNetworkLogsListener(): void;

  updateNetworkLogSnapshot(networkData: string): void;
  // iOS only
  setNetworkLoggingRequestFilterPredicateIOS(value: boolean): void;
}

export const NativeNetworkLogger = NativeModules.IBGNetworkLogger;

export enum NativeNetworkLoggerEvent {
  NETWORK_LOGGER_HANDLER = 'IBGNetworkLoggerHandler',
}

export const NetworkLoggerEmitter = new NativeEventEmitter(NativeNetworkLogger);
