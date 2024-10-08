/// <reference path="../../src/promise.d.ts" />

import tracking from 'promise/setimmediate/rejection-tracking';
import { captureUnhandledRejections } from '../../src/utils/UnhandledRejectionTracking';
import { mockHermesInternal } from '../mocks/mockHermesInternal';
import { mockDevMode } from '../mocks/mockDevMode';
import { mocked } from 'jest-mock';
import { NativeCrashReporting } from '../../src/native/NativeCrashReporting';

it('tracks Promise rejections when using Hermes', () => {
  const enablePromiseRejectionTracker = jest.fn();

  const mHermes = mockHermesInternal({
    hasPromise: () => true,
    enablePromiseRejectionTracker,
  });

  captureUnhandledRejections();

  expect(enablePromiseRejectionTracker).toBeCalledTimes(1);
  expect(enablePromiseRejectionTracker).toBeCalledWith({
    allRejections: true,
    onUnhandled: expect.any(Function),
  });

  mHermes.mockRestore();
});

it('tracks Promise rejections when using `promise` polyfill', () => {
  captureUnhandledRejections();

  expect(tracking.enable).toBeCalledTimes(1);
  expect(tracking.enable).toBeCalledWith({
    allRejections: true,
    onUnhandled: expect.any(Function),
  });
});

it('reports unhandled Promise rejections in release mode', () => {
  const mockDev = mockDevMode(false);
  const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

  const rejection = new Error('something went wrong');
  const id = 123;

  // Simulate an immediate unhandled promise rejection
  mocked(tracking.enable).mockImplementationOnce((options) => {
    options?.onUnhandled?.(id, rejection);
  });

  captureUnhandledRejections();

  expect(NativeCrashReporting.sendHandledJSCrash).toBeCalledTimes(1);

  mockDev.mockRestore();
  consoleWarnSpy.mockRestore();
});

it('does not report unhandled Promise rejections in dev mode', () => {
  const mockDev = mockDevMode(true);
  const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

  const id = 123;
  const rejection = new TypeError("Couldn't fetch data");

  // Simulate an immediate unhandled promise rejection
  mocked(tracking.enable).mockImplementationOnce((options) => {
    options?.onUnhandled?.(id, rejection);
  });

  captureUnhandledRejections();

  expect(NativeCrashReporting.sendHandledJSCrash).not.toBeCalled();

  mockDev.mockRestore();
  consoleWarnSpy.mockRestore();
});

it('does not report non-error unhandled Promise rejections', () => {
  const mockDev = mockDevMode(true);
  const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

  const id = 123;
  const rejection = 'something went wrong';

  // Simulate an immediate unhandled promise rejection
  mocked(tracking.enable).mockImplementationOnce((options) => {
    options?.onUnhandled?.(id, rejection);
  });

  captureUnhandledRejections();

  expect(NativeCrashReporting.sendHandledJSCrash).not.toBeCalled();

  mockDev.mockRestore();
  consoleWarnSpy.mockRestore();
});
