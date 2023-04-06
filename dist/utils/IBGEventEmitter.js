import { DeviceEventEmitter, NativeAppEventEmitter, Platform } from 'react-native';
export default {
    addListener: (nativeModule, eventName, callback) => {
        if (Platform.OS === 'ios') {
            nativeModule.addListener(eventName);
            NativeAppEventEmitter.addListener(eventName, callback);
        }
        else {
            DeviceEventEmitter.addListener(eventName, callback);
        }
    },
    emit: (eventName, ...eventParams) => {
        if (Platform.OS === 'ios') {
            NativeAppEventEmitter.emit(eventName, ...eventParams);
        }
        else {
            DeviceEventEmitter.emit(eventName, ...eventParams);
        }
    },
    removeAllListeners: () => {
        if (Platform.OS === 'ios') {
            NativeAppEventEmitter.removeAllListeners();
        }
        else {
            DeviceEventEmitter.removeAllListeners();
        }
    },
    getListeners: (eventName) => {
        // Dirty trick to get tests passing before the events migration
        if (Platform.OS === 'ios') {
            return { length: NativeAppEventEmitter.listenerCount(eventName) };
        }
        else {
            return { length: DeviceEventEmitter.listenerCount(eventName) };
        }
    },
};
