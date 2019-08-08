import { NativeAppEventEmitter, DeviceEventEmitter, NativeModules, Platform } from 'react-native';
let { Instabug } = NativeModules;

const IBGEventEmitter = {
    addListener: (eventName, callback) => {
        if (Platform.OS === 'ios') {
            Instabug.addListener(eventName);
            NativeAppEventEmitter.addListener(eventName, callback);
          } else {
            DeviceEventEmitter.addListener(eventName, callback);
          }
    },
    emit: (eventName, eventParams) => {
        if (Platform.OS === 'ios') {
            NativeAppEventEmitter.emit(eventName, eventParams);
        } else {
            DeviceEventEmitter.emit(eventName, eventParams);
        }
    },
    removeAllListeners: () => {
        if (Platform.OS === 'ios') {
            NativeAppEventEmitter.removeAllListeners()
        } else {
            DeviceEventEmitter.removeAllListeners();
        }
    },
    getListeners: (eventName) => {
        if (Platform.OS === 'ios') {
            return NativeAppEventEmitter.listeners(eventName)
        } else {
            return DeviceEventEmitter.listeners(eventName);
        }
    } 
};

export default IBGEventEmitter;