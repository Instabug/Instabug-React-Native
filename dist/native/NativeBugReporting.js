import { NativeEventEmitter } from 'react-native';
import { NativeModules } from './NativePackage';
export const NativeBugReporting = NativeModules.IBGBugReporting;
export var NativeEvents;
(function (NativeEvents) {
    NativeEvents["ON_INVOKE_HANDLER"] = "IBGpreInvocationHandler";
    NativeEvents["ON_DISMISS_HANDLER"] = "IBGpostInvocationHandler";
    NativeEvents["DID_SELECT_PROMPT_OPTION_HANDLER"] = "IBGDidSelectPromptOptionHandler";
})(NativeEvents || (NativeEvents = {}));
export const emitter = new NativeEventEmitter(NativeBugReporting);
