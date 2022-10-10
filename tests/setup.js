import './mocks/mockNativeModules';
import './mocks/mockParseErrorStackLib';
import 'react-native/Libraries/Network/fetch';
import { Platform } from 'react-native';
import IBGEventEmitter from '../src/utils/IBGEventEmitter';
import XHR from 'xhr2';
import nock from 'nock';

global.XMLHttpRequest = XHR;

nock.disableNetConnect();

beforeEach(() => {
  Platform.constants = {};
  IBGEventEmitter.removeAllListeners();
});
