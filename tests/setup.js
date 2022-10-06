import './mocks/mockNativeModules';
import './mocks/mockParseErrorStackLib';
import { Platform } from 'react-native';
import IBGEventEmitter from '../src/utils/IBGEventEmitter';
import XHR from 'xhr2';

global.XMLHttpRequest = XHR;

beforeEach(() => {
  Platform.constants = {};
  IBGEventEmitter.removeAllListeners();
});
