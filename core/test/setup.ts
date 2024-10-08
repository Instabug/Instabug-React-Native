import './mocks/mockNativeModules';
import './mocks/mockPromiseRejectionTracking';
import './mocks/mockParseErrorStackLib';

import { Platform } from 'react-native';
import 'react-native/Libraries/Network/fetch';

import nock from 'nock';
import XHR from 'xhr2';

global.XMLHttpRequest = XHR;

nock.disableNetConnect();

beforeEach(() => {
  jest.spyOn(Platform, 'constants', 'get').mockReturnValue({
    isTesting: true,
    reactNativeVersion: {
      major: 0,
      minor: 60,
      patch: 0,
    },
  });
});
