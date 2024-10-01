import { NativeModules } from './NativePackage';
import { NativeEventEmitter, type NativeModule } from 'react-native';

export interface NetworkLoggerNativeModule extends NativeModule {
  // Network logging Flags //
  isNativeInterceptionEnabled(): Promise<boolean>;
  isAPMNetworkEnabled(): Promise<boolean>;
  hasAPMNetworkPlugin(): Promise<boolean>;

  // registerNetworkLogsListener(): void;
  // updateNetworkLogSnapshot(networkData: string): void;
  // setNetworkLoggingRequestFilterPredicateIOS(value: boolean): void;
}

export const NativeNetworkLogger = NativeModules.IBGNetworkLogger;

export enum NativeNetworkLoggerEvent {
  NETWORK_LOGGER_HANDLER = 'IBGNetworkLoggerHandler',
}

export const NetworkLoggerEmitter = new NativeEventEmitter(NativeNetworkLogger);
