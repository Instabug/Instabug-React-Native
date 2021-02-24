/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import "react-native";
import { NativeModules } from "react-native";
import "../jest/mockAPM";
import APM from "../modules/APM";
import sinon from "sinon";

import IBGEventEmitter from "../utils/IBGEventEmitter";

describe("APM Module", () => {
  const setEnabled = sinon.spy(NativeModules.IBGAPM, "setEnabled");
  const setAppLaunchEnabled = sinon.spy(NativeModules.IBGAPM, "setAppLaunchEnabled");
  const setLogLevel = sinon.spy(NativeModules.IBGAPM, "setLogLevel");
  const setAutoUITraceEnabled = sinon.spy(NativeModules.IBGAPM, "setAutoUITraceEnabled");
  const startExecutionTrace = sinon.spy(NativeModules.IBGAPM, "startExecutionTrace");
  const setExecutionTraceAttribute = sinon.spy(NativeModules.IBGAPM, "setExecutionTraceAttribute");
  const endExecutionTrace = sinon.spy(NativeModules.IBGAPM, "endExecutionTrace");
  const startUITrace = sinon.spy(NativeModules.IBGAPM, "startUITrace");
  const endUITrace = sinon.spy(NativeModules.IBGAPM, "endUITrace");

  beforeEach(() => {
    IBGEventEmitter.removeAllListeners();
  });

  it("should call the native method setEnabled", () => {
    APM.setEnabled(true);

    expect(setEnabled.calledOnceWithExactly(true)).toBe(true);
  });

  it("should call the native method setAppLaunchEnabled", () => {
    APM.setAppLaunchEnabled(true);

    expect(setAppLaunchEnabled.calledOnceWithExactly(true)).toBe(true);
  });

  it("should call the native method setAutoUITraceEnabled", () => {
    APM.setAutoUITraceEnabled(true);

    expect(setAutoUITraceEnabled.calledOnceWithExactly(true)).toBe(true);
  });

  it("should call the native method setLogLevel", () => {
    APM.setLogLevel(APM.logLevel.verbose);

    expect(setLogLevel.calledOnceWithExactly(APM.logLevel.verbose)).toBe(true);
  });
  
  it("should call the native method startExecutionTrace", () => {
    APM.startExecutionTrace("trace");
    
    expect(startExecutionTrace.calledOnceWith("trace")).toBe(true);
  });
    
  it("should call the native method setExecutionTraceAttribute", () => {
    const trace = APM.startExecutionTrace("trace").then(() => {
      trace.setAttribute("key", "value");
      expect(setExecutionTraceAttribute.calledOnceWithExactly(expect.any(String), "key", "value")).toBe(true);
    });
  });
    
  it("should call the native method endExecutionTrace", () => {
    const trace = APM.startExecutionTrace("trace").then(() => {
      trace.end();
      expect(endExecutionTrace.calledOnceWithExactly(expect.any(String))).toBe(true);
    });
  });
    
  it("should call the native method startUITrace", () => {
    APM.startUITrace("uiTrace");

    expect(startUITrace.calledOnceWithExactly("uiTrace")).toBe(true);
  });

  it("should call the native method endUITrace", () => {
    APM.endUITrace();

    expect(endUITrace.calledOnceWithExactly()).toBe(true);
  });
});
