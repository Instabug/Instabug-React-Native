import '../mocks/mockXhrNetworkInterceptor';

import { Platform } from 'react-native';

import waitForExpect from 'wait-for-expect';

import * as NetworkLogger from '../../src/modules/NetworkLogger';
import { NativeAPM } from '../../src/native/NativeAPM';
import { NativeInstabug } from '../../src/native/NativeInstabug';
import IBGEventEmitter from '../../src/utils/IBGEventEmitter';
import IBGConstants from '../../src/utils/InstabugConstants';
import Interceptor from '../../src/utils/XhrNetworkInterceptor';

const clone = (obj: any) => {
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
    // @ts-ignore
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
    Interceptor.setOnDoneCallback = jest
      .fn()
      .mockImplementation((callback) => callback(clone(network)));
    NetworkLogger.setEnabled(true);

    expect(NativeInstabug.networkLog).toBeCalledTimes(1);
    expect(NativeInstabug.networkLog).toBeCalledWith(network);
  });

  it('should send log network when Platform is android', () => {
    Platform.OS = 'android';
    Interceptor.setOnDoneCallback = jest
      .fn()
      .mockImplementation((callback) => callback(clone(network)));
    NetworkLogger.setEnabled(true);

    expect(NativeInstabug.networkLog).toBeCalledWith(JSON.stringify(network));
    expect(NativeAPM.networkLog).toBeCalledWith(JSON.stringify(network));
  });

  it('should not break if it fails to stringify to JSON on network log if platform is android', () => {
    Platform.OS = 'android';

    // Avoid the console.error to clutter the test log
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Make a circular object, this should make JSON.stringify fail
    const networkResult = clone(network);
    networkResult.responseBody = {};
    networkResult.responseBody.result = { body: networkResult.responseBody };

    Interceptor.setOnDoneCallback = jest
      .fn()
      .mockImplementation((callback) => callback(networkResult));

    expect(() => NetworkLogger.setEnabled(true)).not.toThrow();
    expect(NativeInstabug.networkLog).not.toBeCalled();
    expect(NativeAPM.networkLog).not.toBeCalled();

    consoleSpy.mockRestore();
  });

  it('should send log network when setNetworkDataObfuscationHandler is set and Platform is ios', async () => {
    Platform.OS = 'ios';
    const randomString = '28930q938jqhd';
    Interceptor.setOnDoneCallback = jest
      .fn()
      .mockImplementation((callback) => callback(clone(network)));
    NetworkLogger.setNetworkDataObfuscationHandler((networkData) => {
      networkData.requestHeaders.token = randomString;
      return Promise.resolve(networkData);
    });
    NetworkLogger.setEnabled(true);

    expect(
      IBGEventEmitter.getListeners(IBGConstants.NETWORK_DATA_OBFUSCATION_HANDLER_EVENT).length,
    ).toEqual(1);
    await waitForExpect(() => {
      const newData = clone(network);
      newData.requestHeaders.token = randomString;
      expect(NativeInstabug.networkLog).toBeCalledWith(newData);
    });
  });

  it('should send log network when setNetworkDataObfuscationHandler is set and Platform is android', async () => {
    Platform.OS = 'android';
    const randomString = '28930q938jqhd';
    Interceptor.setOnDoneCallback = jest
      .fn()
      .mockImplementation((callback) => callback(clone(network)));
    NetworkLogger.setNetworkDataObfuscationHandler((networkData) => {
      networkData.requestHeaders.token = randomString;
      return Promise.resolve(networkData);
    });
    NetworkLogger.setEnabled(true);

    expect(
      IBGEventEmitter.getListeners(IBGConstants.NETWORK_DATA_OBFUSCATION_HANDLER_EVENT).length,
    ).toEqual(1);
    await waitForExpect(() => {
      const newData = clone(network);
      newData.requestHeaders.token = randomString;
      expect(NativeInstabug.networkLog).toBeCalledWith(JSON.stringify(newData));
      expect(NativeAPM.networkLog).toBeCalledWith(JSON.stringify(newData));
    });
  });

  it('should not break if network data obfuscation fails when platform is android', async () => {
    Platform.OS = 'android';

    // Avoid the console.error to clutter the test log
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Make a circular object, this should make JSON.stringify fail
    const handler = jest.fn(() => {
      throw new Error('Data obfuscation failed');
    });

    Interceptor.setOnDoneCallback = jest
      .fn()
      .mockImplementation((callback) => callback(clone(network)));
    NetworkLogger.setNetworkDataObfuscationHandler(handler);

    expect(() => NetworkLogger.setEnabled(true)).not.toThrow();
    expect(NativeInstabug.networkLog).not.toBeCalled();
    expect(NativeAPM.networkLog).not.toBeCalled();

    consoleSpy.mockRestore();
  });

  it('should not send log network when network data matches filter expression', async () => {
    Interceptor.setOnDoneCallback = jest
      .fn()
      .mockImplementation((callback) => callback(clone(network)));

    NetworkLogger.setRequestFilterExpression(
      "network.requestHeaders['Content-type'] === 'application/json'",
    );
    NetworkLogger.setEnabled(true);

    expect(NativeInstabug.networkLog).not.toBeCalled();
    expect(NativeAPM.networkLog).not.toBeCalled();
  });

  it('should test that operationSetContext at apollo handler called', async () => {
    const operation = {
      setContext: jest.fn((callback) => callback({})),
      operationName: 'operationName',
    };
    const forward = jest.fn();

    // @ts-ignore
    NetworkLogger.apolloLinkRequestHandler(operation, forward);
    expect(operation.setContext).toBeCalledTimes(1);
  });

  it('should not break if apollo handler throws an error', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const operation = {
      setContext: jest.fn(() => {
        throw new Error('Failed to set context');
      }),
    };
    const forward = jest.fn();

    // @ts-ignore
    expect(() => NetworkLogger.apolloLinkRequestHandler(operation, forward)).not.toThrow();
    expect(operation.setContext).toBeCalled();

    consoleSpy.mockRestore();
  });
});
