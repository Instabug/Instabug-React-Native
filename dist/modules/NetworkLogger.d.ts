import type { RequestHandler } from '@apollo/client';
import { NetworkData, ProgressCallback } from '../utils/XhrNetworkInterceptor';
export type { NetworkData };
export type NetworkDataObfuscationHandler = (data: NetworkData) => Promise<NetworkData>;
/**
 * Sets whether network logs should be sent with bug reports.
 * It is enabled by default.
 * @param isEnabled
 */
export declare const setEnabled: (isEnabled: boolean) => void;
/**
 * Obfuscates any response data.
 * @param handler
 */
export declare const setNetworkDataObfuscationHandler: (handler?: NetworkDataObfuscationHandler | null | undefined) => void;
/**
 * Omit requests from being logged based on either their request or response details
 * @param expression
 */
export declare const setRequestFilterExpression: (expression: string) => void;
/**
 * Returns progress in terms of totalBytesSent and totalBytesExpectedToSend a network request.
 * @param handler
 */
export declare const setProgressHandlerForRequest: (handler: ProgressCallback) => void;
export declare const apolloLinkRequestHandler: RequestHandler;
