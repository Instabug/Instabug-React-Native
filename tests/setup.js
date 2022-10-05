import './mocks/mockNativeModules';
import { Platform } from 'react-native';
import IBGEventEmitter from '../src/utils/IBGEventEmitter';
import XHR from 'xhr2';

global.XMLHttpRequest = XHR;

// For some reason `Platform.constants` might be undefined,
// if so, we initialize it to an empty object.
if (!Platform.constants) {
  Platform.constants = {};
}

beforeEach(() => {
  IBGEventEmitter.removeAllListeners();
});
