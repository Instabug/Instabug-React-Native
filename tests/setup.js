import './mocks/mockNativeModules';
import { Platform } from 'react-native';
import IBGEventEmitter from '../src/utils/IBGEventEmitter';
import sinon from 'sinon';

// For some reason `Platform.constants` might be undefined,
// if so, we initialize it to an empty object.
if (!Platform.constants) {
  Platform.constants = {};
}

global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();

beforeEach(() => {
  IBGEventEmitter.removeAllListeners();
});
