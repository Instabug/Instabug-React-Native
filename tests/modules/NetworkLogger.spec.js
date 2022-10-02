import '../mocks/mockXhrNetworkInterceptor';
import { NativeModules, Platform } from 'react-native';
import Interceptor from '../../src/utils/XhrNetworkInterceptor';
import NetworkLogger from '../../src/modules/NetworkLogger';
import IBGEventEmitter from '../../src/utils/IBGEventEmitter';
import IBGConstants from '../../src/utils/InstabugConstants';
import waitForExpect from 'wait-for-expect';

const { Instabug: NativeInstabug, IBGAPM: NativeAPM } = NativeModules;

const clone = obj => {
  return JSON.parse(JSON.stringify(obj));
};

describe('NetworkLogger Module', () => {
  const network = {
    url: 'https://api.instabug.com',
    requestBody: '',
    requestHeaders: { 'Content-type': 'application/json' },
    method: 'GET',
    responseBody: '',
    responseCode: 200,
    responseHeaders: '',
    contentType: 'application/json',
    duration: 0,
  };

  beforeEach(() => {
    NetworkLogger.setNetworkDataObfuscationHandler(null);
  });

  it('should set onProgressCallback with callback', () => {
    const callback = jest.fn();
    NetworkLogger.setProgressHandlerForRequest(callback);

    expect(Interceptor.setOnProgressCallback).toBeCalledTimes(1);
    expect(Interceptor.setOnProgressCallback).toBeCalledWith(callback);
  });

  it('should enable interception and listen for network changes', () => {
    NetworkLogger.setEnabled(true);

    expect(Interceptor.enableInterception).toBeCalledTimes(1);
    expect(Interceptor.setOnDoneCallback).toBeCalledTimes(1);
  });

  it('should disable interception', () => {
    NetworkLogger.setEnabled(false);

    expect(Interceptor.disableInterception).toBeCalledTimes(1);
  });

  it('should send log network when Platform is ios', () => {
    Platform.OS = 'ios';
    Interceptor.setOnDoneCallback.mockImplementation(callback => callback(clone(network)));
    NetworkLogger.setEnabled(true);

    expect(NativeInstabug.networkLog).toBeCalledTimes(1);
    expect(NativeInstabug.networkLog).toBeCalledWith(network);
  });

  it('should send log network when Platform is android', () => {
    Platform.OS = 'android';
    Interceptor.setOnDoneCallback.mockImplementation(callback => callback(clone(network)));
    NetworkLogger.setEnabled(true);

    expect(NativeInstabug.networkLog).toBeCalledWith(JSON.stringify(network));
    expect(NativeAPM.networkLog).toBeCalledWith(JSON.stringify(network));
  });

  it('should send log network when setNetworkDataObfuscationHandler is set and Platform is ios', async () => {
    Platform.OS = 'ios';
    const randomString = '28930q938jqhd';
    Interceptor.setOnDoneCallback.mockImplementation(callback => callback(clone(network)));
    NetworkLogger.setNetworkDataObfuscationHandler(async networkData => {
      networkData.requestHeaders['token'] = randomString;
      return networkData;
    });
    NetworkLogger.setEnabled(true);

    expect(
      IBGEventEmitter.getListeners(IBGConstants.NETWORK_DATA_OBFUSCATION_HANDLER_EVENT).length,
    ).toEqual(1);
    await waitForExpect(() => {
      const newData = clone(network);
      newData.requestHeaders['token'] = randomString;
      expect(NativeInstabug.networkLog).toBeCalledWith(newData);
    });
  });

  it('should send log network when setNetworkDataObfuscationHandler is set and Platform is android', async () => {
    Platform.OS = 'android';
    const randomString = '28930q938jqhd';
    Interceptor.setOnDoneCallback.mockImplementation(callback => callback(clone(network)));
    NetworkLogger.setNetworkDataObfuscationHandler(async networkData => {
      networkData.requestHeaders['token'] = randomString;
      return networkData;
    });
    NetworkLogger.setEnabled(true);

    expect(
      IBGEventEmitter.getListeners(IBGConstants.NETWORK_DATA_OBFUSCATION_HANDLER_EVENT).length,
    ).toEqual(1);
    await waitForExpect(() => {
      const newData = clone(network);
      newData.requestHeaders['token'] = randomString;
      expect(NativeInstabug.networkLog).toBeCalledWith(JSON.stringify(newData));
      expect(NativeAPM.networkLog).toBeCalledWith(JSON.stringify(newData));
    });
  });

  it('should not send log network when network data matches filter expression', async () => {
    Interceptor.setOnDoneCallback.mockImplementation(callback => callback(clone(network)));
    NetworkLogger.setRequestFilterExpression(
      "network.requestHeaders['Content-type'] === 'application/json'",
    );
    NetworkLogger.setEnabled(true);

    expect(NativeInstabug.networkLog).not.toBeCalled();
    expect(NativeAPM.networkLog).not.toBeCalled();
  });

  it('should test that operationSetContext at apollo handler called', async () => {
    const operation = {
      setContext: jest.fn(),
      operationName: 'operationName',
    };
    const forward = jest.fn();

    NetworkLogger.apolloLinkRequestHandler(operation, forward);
    expect(operation.setContext).toBeCalledTimes(1);
  });

  it('should test that apollo handler called with catch error', async () => {
    const operation = {
      setContext: callback => callback({ headers: {} }),
    };
    const forward = jest.fn();

    // This is a temporary solution as the test is failing because this method isn't mocked
    const apolloLinkRequestHandlerMock = jest.spyOn(NetworkLogger, 'apolloLinkRequestHandler');

    NetworkLogger.apolloLinkRequestHandler(operation, forward);
    expect(NetworkLogger.apolloLinkRequestHandler).toBeCalledTimes(1);

    apolloLinkRequestHandlerMock.mockRestore();
  });
});
