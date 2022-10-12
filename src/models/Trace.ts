import { NativeAPM } from '../native';

export default class Trace {
  constructor(
    public readonly id: string,
    public readonly name: string = '',
    public readonly attributes: Record<string, string> = {},
  ) {}

  /**
   * Add an attribute with key and value to the Trace to be sent.
   * @param key
   * @param value
   */
  setAttribute(key: string, value: string) {
    NativeAPM.setExecutionTraceAttribute(this.id, key, value);
    this.attributes[key] = value;
  }

  /**
   * End Execution Trace
   */
  end() {
    NativeAPM.endExecutionTrace(this.id);
  }
}
