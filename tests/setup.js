import './mocks/mockNativeModules';
import './mocks/mockParseErrorStackLib';

import { Platform } from 'react-native';
import 'react-native/Libraries/Network/fetch';

import nock from 'nock';
import XHR from 'xhr2';

import IBGEventEmitter from '../src/utils/IBGEventEmitter';

global.XMLHttpRequest = XHR;

nock.disableNetConnect();

beforeEach(() => {
  Platform.constants = {};
  IBGEventEmitter.removeAllListeners();
});
