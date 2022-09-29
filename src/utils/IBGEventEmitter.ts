import { NativeAppEventEmitter, DeviceEventEmitter, Platform } from 'react-native';
import type { NativeModule } from '../native';

export default {
  addListener: (
    nativeModule: NativeModule,
    eventName: string,
    callback: (data: any) => void,
  ) => {
    if (Platform.OS === 'ios') {
      nativeModule.addListener(eventName);
      NativeAppEventEmitter.addListener(eventName, callback);
    } else {
      DeviceEventEmitter.addListener(eventName, callback);
    }
  },
  emit: (eventName: string, ...eventParams: any[]) => {
    if (Platform.OS === 'ios') {
      NativeAppEventEmitter.emit(eventName, ...eventParams);
    } else {
      DeviceEventEmitter.emit(eventName, ...eventParams);
    }
  },
  removeAllListeners: () => {
    if (Platform.OS === 'ios') {
      NativeAppEventEmitter.removeAllListeners();
    } else {
      DeviceEventEmitter.removeAllListeners();
    }
  },
  getListeners: (eventName: string) => {
    if (Platform.OS === 'ios') {
      // @ts-ignore
      return NativeAppEventEmitter.listeners(eventName);
    } else {
      // @ts-ignore
      return DeviceEventEmitter.listeners(eventName);
    }
  },
};
