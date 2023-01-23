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
  IBGEventEmitter.removeAllListeners();
  Platform.constants = {
    isTesting: true,
    reactNativeVersion: {
      major: 0,
      minor: 60,
      patch: 0,
    },
  };
});
