export declare type ProgressCallback = (totalBytesSent: number, totalBytesExpectedToSend: number) => void;
export declare type NetworkDataCallback = (data: NetworkData) => void;
export interface NetworkData {
    url: string;
    method: string;
    requestBody: string;
    requestBodySize: number;
    responseBody: string | null;
    responseBodySize: number;
    responseCode: number;
    requestHeaders: Record<string, string>;
    responseHeaders: Record<string, string>;
    contentType: string;
    errorDomain: string;
    errorCode: number;
    startTime: number;
    duration: number;
    gqlQueryName?: string;
    serverErrorMessage: string;
    requestContentType: string;
}
declare const _default: {
    setOnDoneCallback(callback: NetworkDataCallback): void;
    setOnProgressCallback(callback: ProgressCallback): void;
    enableInterception(): void;
    disableInterception(): void;
};
export default _default;
