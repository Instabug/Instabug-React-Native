import { DeviceEventEmitter, NativeAppEventEmitter, NativeModule, Platform } from 'react-native';

export default {
  addListener: (nativeModule: NativeModule, eventName: string, callback: (data: any) => void) => {
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
    // Dirty trick to get tests passing before the events migration
    if (Platform.OS === 'ios') {
      return { length: NativeAppEventEmitter.listenerCount(eventName) };
    } else {
      return { length: DeviceEventEmitter.listenerCount(eventName) };
    }
  },
};
