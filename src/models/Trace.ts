import { NativeAPM } from '../native';

interface TraceAttributesMap {
  [key: string]: string;
}

export default class Trace {
  id: string;
  name: string;
  attributes: TraceAttributesMap;

  constructor(id: string, name?: string, attributes?: TraceAttributesMap) {
    this.id = id;
    this.name = name ? name : '';
    this.attributes = attributes ? attributes : {};
  }

  /**
   * Add an attribute with key and value to the Trace to be sent.
   * @param {string} key
   * @param {string} value
   */
  setAttribute(key, value) {
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
