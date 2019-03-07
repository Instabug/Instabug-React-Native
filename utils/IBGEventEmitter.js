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
    }
};

export default IBGEventEmitter;