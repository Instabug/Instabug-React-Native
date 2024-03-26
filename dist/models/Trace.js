import { NativeAPM } from '../native/NativeAPM';
export default class Trace {
    id;
    name;
    attributes;
    constructor(id, name = '', attributes = {}) {
        this.id = id;
        this.name = name;
        this.attributes = attributes;
    }
    /**
     * Add an attribute with key and value to the Trace to be sent.
     * @param key
     * @param value
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
