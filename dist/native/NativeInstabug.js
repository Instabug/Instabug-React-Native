import { NativeEventEmitter } from 'react-native';
import { NativeModules } from './NativePackage';
export const NativeInstabug = NativeModules.Instabug;
export var NativeEvents;
(function (NativeEvents) {
    NativeEvents["PRESENDING_HANDLER"] = "IBGpreSendingHandler";
})(NativeEvents || (NativeEvents = {}));
export const emitter = new NativeEventEmitter(NativeInstabug);
