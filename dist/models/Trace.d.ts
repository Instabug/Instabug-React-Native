export default class Trace {
    readonly id: string;
    readonly name: string;
    readonly attributes: Record<string, string>;
    constructor(id: string, name?: string, attributes?: Record<string, string>);
    /**
     * Add an attribute with key and value to the Trace to be sent.
     * @param key
     * @param value
     */
    setAttribute(key: string, value: string): void;
    /**
     * End Execution Trace
     */
    end(): void;
}
