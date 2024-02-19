import { NativeAPM } from '../native/NativeAPM';
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as APM from '../modules/APM';

export default class Trace {
  constructor(
    public readonly id: string,
    public readonly name: string = '',
    public readonly attributes: Record<string, string> = {},
  ) {}

  /**
   * Adds an attribute with a specified key and value to the Trace to be sent.
   *
   * @param key - The key of the attribute.
   * @param value - The value of the attribute.
   *
   * @deprecated Please migrate to the App Flows APIs: {@link APM.startFlow}, {@link APM.endFlow}, and {@link APM.setFlowAttribute}.
   */
  setAttribute(key: string, value: string) {
    NativeAPM.setExecutionTraceAttribute(this.id, key, value);
    this.attributes[key] = value;
  }

  /**
   * Ends the execution trace.
   *
   * @deprecated Please migrate to the App Flows APIs: {@link APM.startFlow}, {@link APM.endFlow}, and {@link APM.setFlowAttribute}.
   */

  end() {
    NativeAPM.endExecutionTrace(this.id);
  }
}
