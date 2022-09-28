import { NativeModules } from 'react-native';
let { IBGAPM } = NativeModules;

export default class Trace {

    constructor(
        id,
        name,
        attributes,
    ) {
        this.id = id;
        this.name = name ? name : "";
        this.attributes = attributes ? attributes : {};
    }

    /**
     * Add an attribute with key and value to the Trace to be sent.
     * @param {string} key 
     * @param {string} value 
     */
    setAttribute(key, value) {
        IBGAPM.setExecutionTraceAttribute(this.id, key, value);
        this.attributes[key] = value;
    }

    /**
    * End Execution Trace
    */
    end() {
        IBGAPM.endExecutionTrace(this.id);
    }
}
