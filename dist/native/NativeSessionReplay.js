import { NativeEventEmitter } from 'react-native';
import { NativeModules } from './NativePackage';
export const NativeSessionReplay = NativeModules.IBGSessionReplay;
export var NativeEvents;
(function (NativeEvents) {
    NativeEvents["SESSION_REPLAY_ON_SYNC_CALLBACK_INVOCATION"] = "IBGSessionReplayOnSyncCallback";
})(NativeEvents || (NativeEvents = {}));
export const emitter = new NativeEventEmitter(NativeSessionReplay);
