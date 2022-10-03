import { NativeAPM } from '../native';

interface TraceAttributesMap {
  [key: string]: string;
}

export default class Trace {
  constructor(
    public readonly id: string,
    public readonly name: string = '',
    public readonly attributes: TraceAttributesMap = {},
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
