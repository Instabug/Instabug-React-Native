import '../mocks/mockXhrNetworkInterceptor';
import '../mocks/mockInstabugUtils';

import waitForExpect from 'wait-for-expect';

import * as NetworkLogger from '../../src/modules/NetworkLogger';
import Interceptor from '../../src/utils/XhrNetworkInterceptor';
import { isContentTypeNotAllowed, reportNetworkLog } from '../../src/utils/InstabugUtils';
import InstabugConstants from '../../src/utils/InstabugConstants';
import * as Instabug from '../../src/modules/Instabug';
import { NativeNetworkLogger } from '../../src/native/NativeNetworkLogger';
import { InvocationEvent, LogLevel, NetworkInterceptionMode } from '../../src';
import { Platform } from 'react-native';

const clone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

describe('NetworkLogger Module', () => {
  const network: NetworkLogger.NetworkData = {
    id: '',
    url: 'https://api.instabug.com',
    requestBody: '',
    requestHeaders: { 'content-type': 'application/json' },
    method: 'GET',
    responseBody: '',
    responseCode: 200,
    responseHeaders: { 'content-type': 'application/json' },
    contentType: 'application/json',
    duration: 0,
    requestBodySize: 0,
    responseBodySize: 0,
    errorDomain: '',
    errorCode: 0,
    startTime: 0,
    serverErrorMessage: '',
    requestContentType: 'application/json',
  };

  beforeEach(() => {
    NetworkLogger.setNetworkDataObfuscationHandler(null);
    NetworkLogger.setRequestFilterExpression('false');
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

  it('should report the network log', () => {
    Interceptor.setOnDoneCallback = jest
      .fn()
      .mockImplementation((callback) => callback(clone(network)));

    NetworkLogger.setEnabled(true);

    expect(reportNetworkLog).toBeCalledTimes(1);
    expect(reportNetworkLog).toBeCalledWith(network);
  });

  it('should send log network when setNetworkDataObfuscationHandler is set', async () => {
    const randomString = '28930q938jqhd';
    Interceptor.setOnDoneCallback = jest
      .fn()
      .mockImplementation((callback) => callback(clone(network)));
    NetworkLogger.setNetworkDataObfuscationHandler((networkData) => {
      networkData.requestHeaders.token = randomString;
      return Promise.resolve(networkData);
    });
    NetworkLogger.setEnabled(true);

    await waitForExpect(() => {
      const newData = clone(network);
      newData.requestHeaders.token = randomString;
      expect(reportNetworkLog).toBeCalledWith(newData);
    });
  });

  it('should not break if network data obfuscation fails', async () => {
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
    expect(reportNetworkLog).not.toBeCalled();

    consoleSpy.mockRestore();
  });

  it('should not send log network when network data matches filter expression', async () => {
    Interceptor.setOnDoneCallback = jest
      .fn()
      .mockImplementation((callback) => callback(clone(network)));

    NetworkLogger.setRequestFilterExpression(
      "network.requestHeaders['content-type'] === 'application/json'",
    );
    NetworkLogger.setEnabled(true);

    expect(reportNetworkLog).not.toBeCalled();
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

  it('should omit request body if its content type is not allowed', () => {
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation();
    jest.mocked(isContentTypeNotAllowed).mockReturnValueOnce(true);

    const networkData = {
      ...network,
      requestBody: 'some request body',
    };

    Interceptor.setOnDoneCallback = jest
      .fn()
      .mockImplementation((callback) => callback(networkData));

    NetworkLogger.setEnabled(true);

    expect(reportNetworkLog).toHaveBeenCalledWith({
      ...networkData,
      requestBody: expect.stringContaining('omitted'),
    });

    expect(consoleWarn).toBeCalledTimes(1);

    consoleWarn.mockRestore();
  });

  it('should omit response body if its content type is not allowed', () => {
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation();
    jest.mocked(isContentTypeNotAllowed).mockReturnValueOnce(true);

    const networkData = {
      ...network,
      responseBody: 'some response body',
    };

    Interceptor.setOnDoneCallback = jest
      .fn()
      .mockImplementation((callback) => callback(networkData));

    NetworkLogger.setEnabled(true);

    expect(reportNetworkLog).toHaveBeenCalledWith({
      ...networkData,
      responseBody: expect.stringContaining('omitted'),
    });

    expect(consoleWarn).toBeCalledTimes(1);

    consoleWarn.mockRestore();
  });

  it('should omit request body if its size exceeds the maximum allowed size', () => {
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation();

    const networkData = {
      ...network,
      requestBodySize: InstabugConstants.MAX_NETWORK_BODY_SIZE_IN_BYTES + 1,
    };

    Interceptor.setOnDoneCallback = jest
      .fn()
      .mockImplementation((callback) => callback(networkData));

    NetworkLogger.setEnabled(true);

    expect(reportNetworkLog).toHaveBeenCalledWith({
      ...networkData,
      requestBody: InstabugConstants.MAX_REQUEST_BODY_SIZE_EXCEEDED_MESSAGE,
    });

    expect(consoleWarn).toBeCalledTimes(1);

    consoleWarn.mockRestore();
  });

  it('should not omit request body if its size does not exceed the maximum allowed size', () => {
    const networkData = {
      ...network,
      requestBodySize: InstabugConstants.MAX_NETWORK_BODY_SIZE_IN_BYTES,
    };

    Interceptor.setOnDoneCallback = jest
      .fn()
      .mockImplementation((callback) => callback(networkData));

    NetworkLogger.setEnabled(true);

    expect(reportNetworkLog).toHaveBeenCalledWith(networkData);
  });

  it('should omit response body if its size exceeds the maximum allowed size', () => {
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation();

    const networkData = {
      ...network,
      responseBodySize: InstabugConstants.MAX_NETWORK_BODY_SIZE_IN_BYTES + 1,
    };

    Interceptor.setOnDoneCallback = jest
      .fn()
      .mockImplementation((callback) => callback(networkData));

    NetworkLogger.setEnabled(true);

    expect(reportNetworkLog).toHaveBeenCalledWith({
      ...networkData,
      responseBody: InstabugConstants.MAX_RESPONSE_BODY_SIZE_EXCEEDED_MESSAGE,
    });

    expect(consoleWarn).toBeCalledTimes(1);

    consoleWarn.mockRestore();
  });

  it('should not omit response body if its size does not exceed the maximum allowed size', () => {
    const networkData = {
      ...network,
      responseBodySize: InstabugConstants.MAX_NETWORK_BODY_SIZE_IN_BYTES,
    };

    Interceptor.setOnDoneCallback = jest
      .fn()
      .mockImplementation((callback) => callback(networkData));

    NetworkLogger.setEnabled(true);

    expect(reportNetworkLog).toHaveBeenCalledWith(networkData);
  });

  it('Instabug.init should call NativeNetworkLogger.isNativeInterceptionEnabled and not call NativeNetworkLogger.hasAPMNetworkPlugin with iOS', async () => {
    Platform.OS = 'ios';
    const config = {
      token: 'some-token',
      invocationEvents: [InvocationEvent.floatingButton, InvocationEvent.shake],
      debugLogsLevel: LogLevel.debug,
      networkInterceptionMode: NetworkInterceptionMode.native,
      codePushVersion: '1.1.0',
    };
    await Instabug.init(config);

    expect(NativeNetworkLogger.isNativeInterceptionEnabled).toHaveBeenCalled();
    expect(NativeNetworkLogger.hasAPMNetworkPlugin).not.toHaveBeenCalled();
  });

  it('Instabug.init should call NativeNetworkLogger.isNativeInterceptionEnabled and NativeNetworkLogger.hasAPMNetworkPlugin with Android', async () => {
    Platform.OS = 'android';
    const config = {
      token: 'some-token',
      invocationEvents: [InvocationEvent.floatingButton, InvocationEvent.shake],
      debugLogsLevel: LogLevel.debug,
      networkInterceptionMode: NetworkInterceptionMode.native,
      codePushVersion: '1.1.0',
    };
    await Instabug.init(config);

    expect(NativeNetworkLogger.isNativeInterceptionEnabled).toHaveBeenCalled();
    expect(NativeNetworkLogger.hasAPMNetworkPlugin).toHaveBeenCalled();
  });
});
