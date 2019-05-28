/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import { NativeModules, Platform } from 'react-native';
import '../jest/mockXhrNetworkInterceotor';
import sinon from 'sinon';
import Interceptor from '../utils/XhrNetworkInterceptor';
import NetworkLogger from '../modules/NetworkLogger';
import IBGEventEmitter from '../utils/IBGEventEmitter';
import IBGConstants from '../utils/InstabugConstants';
import waitForExpect from 'wait-for-expect';

jest.mock('NativeModules', () => {
    return {
        Instabug: {
            networkLog: jest.fn(),
            addListener: jest.fn()
        },
    };
});

const clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}

describe('NetworkLogger Module', () => {

    const setOnDoneCallback = sinon.spy(Interceptor, 'setOnDoneCallback');
    const setOnProgressCallback = sinon.spy(Interceptor, 'setOnProgressCallback');
    const enableInterception = sinon.spy(Interceptor, 'enableInterception');
    const disableInterception = sinon.spy(Interceptor, 'disableInterception');
    const networkLog = sinon.spy(NativeModules.Instabug, 'networkLog');

    const network = {
        url: 'https://api.instabug.com',
        requestBody: '',
        requestHeaders: { 'Content-type': 'application/json'},
        method: 'GET',
        responseBody: '',
        responseCode: 200,
        responseHeaders: '',
        contentType: 'application/json',
        duration: 0
      };

    beforeEach(() => {
        setOnDoneCallback.resetHistory();
        disableInterception.resetHistory();
        enableInterception.resetHistory();
        networkLog.resetHistory();
        IBGEventEmitter.removeAllListeners();
        NetworkLogger.setNetworkDataObfuscationHandler(null);
    });

    it('should set onProgressCallback with callback', () => {

        const callback = jest.fn();
        NetworkLogger.setProgressHandlerForRequest(callback);

        expect(setOnProgressCallback.calledOnceWithExactly(callback)).toBe(true);

    });

    it('should enable interception and listen for network changes', () => {

        NetworkLogger.setEnabled(true);

        expect(enableInterception.calledOnce).toBe(true);
        expect(setOnDoneCallback.calledOnce).toBe(true);

    });

    it('should disable interception', () => {

        NetworkLogger.setEnabled(false);

        expect(disableInterception.calledOnce).toBe(true);

    });

    it('should send log network when Platform is ios', () => {

        Platform.OS = 'ios';
        Interceptor.setOnDoneCallback.mockImplementation((callback) => callback(clone(network)));
        NetworkLogger.setEnabled(true);

        expect(networkLog.calledOnceWithExactly(network)).toBe(true);

    });

    it('should send log network when Platform is android', () => {

        Platform.OS = 'android';
        Interceptor.setOnDoneCallback.mockImplementation((callback) => callback(clone(network)));
        NetworkLogger.setEnabled(true);

        expect(networkLog.calledOnceWithExactly(JSON.stringify(network))).toBe(true);

    });

    it('should send log network when setNetworkDataObfuscationHandler is set and Platform is ios', async () => {

        Platform.OS = 'ios';
        const randomString = '28930q938jqhd';
        Interceptor.setOnDoneCallback.mockImplementation((callback) => callback(clone(network)));
        NetworkLogger.setNetworkDataObfuscationHandler(async (networkData) => {
            networkData.requestHeaders['token'] = randomString;
            return networkData;
        })
        NetworkLogger.setEnabled(true);

        expect(IBGEventEmitter.getListeners(IBGConstants.NETWORK_DATA_OBFUSCATION_HANDLER_EVENT).length).toEqual(1);
        await waitForExpect(() => {
            const newData = clone(network);
            newData.requestHeaders['token'] = randomString;
            expect(networkLog.calledOnceWithExactly(newData)).toBe(true);
        });

    });

    it('should send log network when setNetworkDataObfuscationHandler is set and Platform is android', async () => {

        Platform.OS = 'android';
        const randomString = '28930q938jqhd';
        Interceptor.setOnDoneCallback.mockImplementation((callback) => callback(clone(network)));
        NetworkLogger.setNetworkDataObfuscationHandler(async (networkData) => {
            networkData.requestHeaders['token'] = randomString;
            return networkData;
        })
        NetworkLogger.setEnabled(true);

        expect(IBGEventEmitter.getListeners(IBGConstants.NETWORK_DATA_OBFUSCATION_HANDLER_EVENT).length).toEqual(1);
        await waitForExpect(() => {
            const newData = clone(network);
            newData.requestHeaders['token'] = randomString;
            expect(networkLog.calledOnceWithExactly(JSON.stringify(newData))).toBe(true);
        });

    });

    it('should not send log network when network data matches filter expression', async () => {

        Interceptor.setOnDoneCallback.mockImplementation((callback) => callback(clone(network)));
        NetworkLogger.setRequestFilterExpression('network.requestHeaders[\'Content-type\'] === \'application/json\'');
        NetworkLogger.setEnabled(true);

        expect(networkLog.notCalled).toBe(true);

    });


});
