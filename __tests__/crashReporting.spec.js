/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import { NativeModules, Platform } from 'react-native';
import '../jest/mockXhrNetworkInterceotor';
import '../jest/mockInstabugUtils';
import sinon from 'sinon';
import CrashReporting from '../modules/CrashReporting';
import InstabugUtils from '../utils/InstabugUtils';
import Instabug from '../';
import IBGEventEmitter from '../utils/IBGEventEmitter';
import IBGConstants from '../utils/InstabugConstants';

jest.mock('NativeModules', () => {
    return {
        Instabug: {
            setCrashReportingEnabled: jest.fn(),
            sendHandledJSCrash: jest.fn()
        },
    };
});

describe('CrashReporting Module', () => {

    const setCrashReportingEnabled = sinon.spy(NativeModules.Instabug, 'setCrashReportingEnabled');
    const sendHandledJSCrash = sinon.spy(NativeModules.Instabug, 'sendHandledJSCrash');

    beforeEach(() => {
        sendHandledJSCrash.resetHistory();
        IBGEventEmitter.removeAllListeners();
    });

    it('should call the native method setCrashReportingEnabled', () => {

        CrashReporting.setEnabled(true);

        expect(setCrashReportingEnabled.calledOnceWithExactly(true)).toBe(true);

    });

    it('should call the native method sendHandledJSCrash when platform is ios', () => {

        Platform.OS = 'ios';
        const errorObject = { name: 'TypeError', message: 'Invalid type' };
        CrashReporting.reportJSException(errorObject);

        const expectedObject = {
            message: 'TypeError - Invalid type',
            os: 'ios',
            platform: 'react_native',
            exception: 'javascriptStackTrace'
        }

        expect(sendHandledJSCrash.calledOnceWithExactly(expectedObject)).toBe(true);

    });

    it('should call the native method sendHandledJSCrash when platform is android', () => {

        Platform.OS = 'android';
        const errorObject = { name: 'TypeError', message: 'Invalid type' };
        CrashReporting.reportJSException(errorObject);

        const expectedObject = {
            message: 'TypeError - Invalid type',
            os: 'android',
            platform: 'react_native',
            exception: 'javascriptStackTrace'
        }

        expect(sendHandledJSCrash.calledOnceWithExactly(JSON.stringify(expectedObject))).toBe(true);

    });

    //TODO: finish this
    it('should emit event IBGSendHandledJSCrash with the error object when platform is android', (done) => {

        Platform.OS = 'android';
        InstabugUtils.isOnReportHandlerSet.mockImplementation(() => true);

        const errorObject = { name: 'TypeError', message: 'Invalid type' };
        const expectedObject = {
            message: 'TypeError - Invalid type',
            os: 'android',
            platform: 'react_native',
            exception: 'javascriptStackTrace'
        }
        
        IBGEventEmitter.addListener(NativeModules.Instabug, IBGConstants.SEND_HANDLED_CRASH, (actualObject) => {
            expect(actualObject).toEqual(expectedObject);
            done();
        });

        CrashReporting.reportJSException(errorObject);

    });


});
