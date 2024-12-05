export default class Trace {
    readonly id: string;
    readonly name: string;
    readonly attributes: Record<string, string>;
    constructor(id: string, name?: string, attributes?: Record<string, string>);
    /**
     * Adds an attribute with a specified key and value to the Trace to be sent.
     *
     * @param key - The key of the attribute.
     * @param value - The value of the attribute.
     *
     * @deprecated Please migrate to the App Flows APIs: {@link APM.startFlow}, {@link APM.endFlow}, and {@link APM.setFlowAttribute}.
     */
    setAttribute(key: string, value: string): void;
    /**
     * Ends the execution trace.
     *
     * @deprecated Please migrate to the App Flows APIs: {@link APM.startFlow}, {@link APM.endFlow}, and {@link APM.setFlowAttribute}.
     */
    end(): void;
}
