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
     * Adds an attribute with a specified key and value to the Trace to be sent.
     *
     * @param key - The key of the attribute.
     * @param value - The value of the attribute.
     *
     * @deprecated Please migrate to the App Flows APIs: {@link APM.startFlow}, {@link APM.endFlow}, and {@link APM.setFlowAttribute}.
     */
    setAttribute(key, value) {
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
