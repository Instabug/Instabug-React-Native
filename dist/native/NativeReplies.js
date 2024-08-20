import { NativeEventEmitter } from 'react-native';
import { NativeModules } from './NativePackage';
export const NativeReplies = NativeModules.IBGReplies;
export var NativeEvents;
(function (NativeEvents) {
    NativeEvents["ON_REPLY_RECEIVED_HANDLER"] = "IBGOnNewReplyReceivedCallback";
})(NativeEvents || (NativeEvents = {}));
export const emitter = new NativeEventEmitter(NativeReplies);
