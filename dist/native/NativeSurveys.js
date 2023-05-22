import { NativeEventEmitter } from 'react-native';
import { NativeModules } from './NativePackage';
export const NativeSurveys = NativeModules.IBGSurveys;
export var NativeEvents;
(function (NativeEvents) {
    NativeEvents["WILL_SHOW_SURVEY_HANDLER"] = "IBGWillShowSurvey";
    NativeEvents["DID_DISMISS_SURVEY_HANDLER"] = "IBGDidDismissSurvey";
})(NativeEvents || (NativeEvents = {}));
export const emitter = new NativeEventEmitter(NativeSurveys);
