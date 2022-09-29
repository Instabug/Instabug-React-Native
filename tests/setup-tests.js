import './mocks/mockNativeModules';
import IBGEventEmitter from '../src/utils/IBGEventEmitter';
import sinon from 'sinon';

global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();

beforeEach(() => {
  IBGEventEmitter.removeAllListeners();
});
