import InstabugConstants from './InstabugConstants';
import { stringifyIfNotString, generateW3CHeader } from './InstabugUtils';

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
  };
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
      // According to the HTTP RFC, headers are case-insensitive, so we convert
      // them to lower-case to make accessing headers predictable.
      // This avoid issues like failing to get the Content-Type header for a request
      // because the header is set as 'Content-Type' instead of 'content-type'.
      const key = header.toLowerCase();
      network.requestHeaders[key] = stringifyIfNotString(value);
      originalXHRSetRequestHeader.apply(this, [header, value]);
    };

    XMLHttpRequest.prototype.send = function (data) {
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
      const w3cHeader = generateW3CHeader(cloneNetwork.startTime);
      const traceparent = generateW3CHeader(cloneNetwork.startTime);
      const tracestate = 'instabug=4942472d';
      console.log(traceparent, tracestate);
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
