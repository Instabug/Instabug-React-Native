import InstabugConstants from './InstabugConstants';
import { generateW3CHeader } from './InstabugUtils';

import { FeatureFlags } from '../utils/FeatureFlags';

export type ProgressCallback = (totalBytesSent: number, totalBytesExpectedToSend: number) => void;
export type NetworkDataCallback = (data: NetworkData) => void;

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
  isW3cHeaderFound: boolean;
  partialId: number;
  networkStartTimeInSeconds: number;
  W3CgeneratedHeader: string;
  W3CCaughtHeader: string;
}

const XMLHttpRequest = global.XMLHttpRequest;
let originalXHROpen = XMLHttpRequest.prototype.open;
let originalXHRSend = XMLHttpRequest.prototype.send;
let originalXHRSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;

let onProgressCallback: ProgressCallback | null;
let onDoneCallback: NetworkDataCallback | null;
let isInterceptorEnabled = false;
let network: NetworkData;

const _reset = () => {
  network = {
    url: '',
    method: '',
    requestBody: '',
    requestBodySize: 0,
    responseBody: '',
    responseBodySize: 0,
    responseCode: 0,
    requestHeaders: {},
    responseHeaders: {},
    contentType: '',
    errorDomain: '',
    errorCode: 0,
    startTime: 0,
    duration: 0,
    gqlQueryName: '',
    serverErrorMessage: '',
    requestContentType: '',
    isW3cHeaderFound: false,
    partialId: 0,
    networkStartTimeInSeconds: 0,
    W3CgeneratedHeader: '',
    W3CCaughtHeader: '',
  };
};

const getFeatureFlags = async (networkData: NetworkData) => {
  const [w3c_external_trace_id_enabled, w3c_generated_header, w3c_caught_header] =
    await Promise.all([
      FeatureFlags.isW3ExternalTraceID(),
      FeatureFlags.isW3ExternalGeneratedHeader(),
      FeatureFlags.isW3CaughtHeader(),
    ]);

  return injectHeaders(networkData, {
    w3c_external_trace_id_enabled,
    w3c_generated_header,
    w3c_caught_header,
  });
};

export const injectHeaders = async (
  networkData: NetworkData,
  featureFlags: {
    w3c_external_trace_id_enabled: boolean;
    w3c_generated_header: boolean;
    w3c_caught_header: boolean;
  },
) => {
  const { w3c_external_trace_id_enabled, w3c_generated_header, w3c_caught_header } = featureFlags;

  if (!w3c_external_trace_id_enabled) {
    return;
  }

  const headerFound = networkData.requestHeaders.traceparent != null;

  networkData.isW3cHeaderFound = headerFound;
  const injectionMethodology = headerFound
    ? IdentifyCaughtHeader(networkData, w3c_caught_header)
    : injectGeneratedData(networkData, w3c_generated_header);
  return injectionMethodology;
};

const IdentifyCaughtHeader = async (networkData: NetworkData, w3c_caught_header: boolean) => {
  if (w3c_caught_header) {
    networkData.W3CCaughtHeader = networkData.requestHeaders.traceparent;
    return networkData.requestHeaders.traceparent;
  } else {
    return;
  }
};

const injectGeneratedData = async (networkData: NetworkData, w3c_generated_header: boolean) => {
  const { timestampInSeconds, partialId, w3cHeader } = generateW3CHeader(networkData.startTime);
  networkData.partialId = partialId;
  networkData.networkStartTimeInSeconds = timestampInSeconds;

  if (w3c_generated_header) {
    networkData.W3CgeneratedHeader = w3cHeader;
    return w3cHeader;
  } else {
    return;
  }
};

export default {
  setOnDoneCallback(callback: NetworkDataCallback) {
    onDoneCallback = callback;
  },
  setOnProgressCallback(callback: ProgressCallback) {
    onProgressCallback = callback;
  },
  enableInterception() {
    // Prevents infinite calls to XMLHttpRequest.open when enabling interception multiple times
    if (isInterceptorEnabled) {
      return;
    }

    originalXHROpen = XMLHttpRequest.prototype.open;
    originalXHRSend = XMLHttpRequest.prototype.send;
    originalXHRSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;

    XMLHttpRequest.prototype.open = function (method, url, ...args) {
      _reset();
      network.url = url;
      network.method = method;
      originalXHROpen.apply(this, [method, url, ...args]);
    };

    XMLHttpRequest.prototype.setRequestHeader = function (header, value) {
      network.requestHeaders[header] = typeof value === 'string' ? value : JSON.stringify(value);
      originalXHRSetRequestHeader.apply(this, [header, value]);
    };

    XMLHttpRequest.prototype.send = async function (data) {
      const cloneNetwork = JSON.parse(JSON.stringify(network));
      cloneNetwork.requestBody = data ? data : '';

      if (typeof cloneNetwork.requestBody !== 'string') {
        cloneNetwork.requestBody = JSON.stringify(cloneNetwork.requestBody);
      }

      if (this.addEventListener) {
        this.addEventListener('readystatechange', async () => {
          if (!isInterceptorEnabled) {
            return;
          }
          if (this.readyState === this.HEADERS_RECEIVED) {
            const contentTypeString = this.getResponseHeader('Content-Type');
            if (contentTypeString) {
              cloneNetwork.contentType = contentTypeString.split(';')[0];
            }
            const responseBodySizeString = this.getResponseHeader('Content-Length');
            if (responseBodySizeString) {
              const responseBodySizeNumber = Number(responseBodySizeString);

              if (!isNaN(responseBodySizeNumber)) {
                cloneNetwork.responseBodySize = responseBodySizeNumber;
              }
            }

            if (this.getAllResponseHeaders()) {
              const responseHeaders = this.getAllResponseHeaders().split('\r\n');
              const responseHeadersDictionary: Record<string, string> = {};
              responseHeaders.forEach((element) => {
                const key = element.split(/:(.+)/)[0];
                const value = element.split(/:(.+)/)[1];
                responseHeadersDictionary[key] = value;
              });

              cloneNetwork.responseHeaders = responseHeadersDictionary;
            }

            if (cloneNetwork.requestHeaders['content-type']) {
              cloneNetwork.requestContentType =
                cloneNetwork.requestHeaders['content-type'].split(';')[0];
            }
          }

          if (this.readyState === this.DONE) {
            cloneNetwork.duration = Date.now() - cloneNetwork.startTime;
            if (this.status == null) {
              cloneNetwork.responseCode = 0;
            } else {
              cloneNetwork.responseCode = this.status;
            }

            // @ts-ignore
            if (this._hasError) {
              cloneNetwork.errorCode = 0;
              cloneNetwork.errorDomain = 'ClientError';

              // @ts-ignore
              const _response = this._response;
              cloneNetwork.requestBody =
                typeof _response === 'string' ? _response : JSON.stringify(_response);
              cloneNetwork.responseBody = null;
            }

            if (this.response) {
              if (this.responseType === 'blob') {
                const responseText = await new Response(this.response).text();
                cloneNetwork.responseBody = responseText;
              } else if (['text', '', 'json'].includes(this.responseType)) {
                cloneNetwork.responseBody = JSON.stringify(this.response);
              }
            }

            cloneNetwork.requestBodySize = cloneNetwork.requestBody.length;

            if (cloneNetwork.responseBodySize === 0 && cloneNetwork.responseBody) {
              cloneNetwork.responseBodySize = cloneNetwork.responseBody.length;
            }

            if (cloneNetwork.requestHeaders[InstabugConstants.GRAPHQL_HEADER]) {
              cloneNetwork.gqlQueryName =
                cloneNetwork.requestHeaders[InstabugConstants.GRAPHQL_HEADER];
              delete cloneNetwork.requestHeaders[InstabugConstants.GRAPHQL_HEADER];
              if (cloneNetwork.gqlQueryName === 'null') {
                cloneNetwork.gqlQueryName = '';
              }
              if (cloneNetwork.responseBody) {
                const responseObj = JSON.parse(cloneNetwork.responseBody);

                if (responseObj.errors) {
                  cloneNetwork.serverErrorMessage = 'GraphQLError';
                } else {
                  cloneNetwork.serverErrorMessage = '';
                }
              }
            } else {
              delete cloneNetwork.gqlQueryName;
            }

            if (onDoneCallback) {
              onDoneCallback(cloneNetwork);
            }
          }
        });

        const downloadUploadProgressCallback = (event: ProgressEvent) => {
          if (!isInterceptorEnabled) {
            return;
          }
          // check if will be able to compute progress
          if (event.lengthComputable && onProgressCallback) {
            const totalBytesSent = event.loaded;
            const totalBytesExpectedToSend = event.total - event.loaded;
            onProgressCallback(totalBytesSent, totalBytesExpectedToSend);
          }
        };
        this.addEventListener('progress', downloadUploadProgressCallback);
        this.upload.addEventListener('progress', downloadUploadProgressCallback);
      }

      cloneNetwork.startTime = Date.now();
      const traceparent = await getFeatureFlags(cloneNetwork);
      traceparent && this.setRequestHeader('Traceparent', traceparent);
      originalXHRSend.apply(this, [data]);
    };
    isInterceptorEnabled = true;
  },

  disableInterception() {
    isInterceptorEnabled = false;
    XMLHttpRequest.prototype.send = originalXHRSend;
    XMLHttpRequest.prototype.open = originalXHROpen;
    XMLHttpRequest.prototype.setRequestHeader = originalXHRSetRequestHeader;
    onDoneCallback = null;
    onProgressCallback = null;
  },
};
