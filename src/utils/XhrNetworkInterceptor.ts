import InstabugConstants from './InstabugConstants';

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
const originalXHROpen = XMLHttpRequest.prototype.open;
const originalXHRSend = XMLHttpRequest.prototype.send;
const originalXHRSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;

var onProgressCallback: ProgressCallback | null;
var onDoneCallback: NetworkDataCallback | null;
var isInterceptorEnabled = false;
var network: NetworkData;

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
    XMLHttpRequest.prototype.open = function (method, url) {
      _reset();
      network.url = url;
      network.method = method;
      // @ts-ignore
      originalXHROpen.apply(this, arguments);
    };

    XMLHttpRequest.prototype.setRequestHeader = function (header, value) {
      // @ts-ignore
      if (network.requestHeaders === '') {
        network.requestHeaders = {};
      }
      network.requestHeaders[header] = typeof value === 'string' ? value : JSON.stringify(value);
      // @ts-ignore
      originalXHRSetRequestHeader.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = function (data) {
      var cloneNetwork = JSON.parse(JSON.stringify(network));
      cloneNetwork.requestBody = data ? data : '';

      if (typeof cloneNetwork.requestBody !== 'string') {
        cloneNetwork.requestBody = JSON.stringify(cloneNetwork.requestBody);
      }

      if (this.addEventListener) {
        this.addEventListener(
          'readystatechange',
          async () => {
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

                if (!isNaN(responseBodySizeNumber))
                  cloneNetwork.responseBodySize = responseBodySizeNumber;
              }

              if (this.getAllResponseHeaders()) {
                const responseHeaders = this.getAllResponseHeaders().split('\r\n');
                const responseHeadersDictionary = {};
                responseHeaders.forEach(element => {
                  const key = element.split(/:(.+)/)[0];
                  const value = element.split(/:(.+)/)[1];
                  // @ts-ignore
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
                  var responseText = await new Response(this.response).text();
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
                  let responseObj = JSON.parse(cloneNetwork.responseBody);

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
          },
          // @ts-ignore
          false,
        );

        const downloadUploadProgressCallback = event => {
          if (!isInterceptorEnabled) {
            return;
          }
          // check if will be able to compute progress
          if (event.lengthComputable && onProgressCallback) {
            let totalBytesSent = event.loaded;
            let totalBytesExpectedToSend = event.total - event.loaded;
            onProgressCallback(totalBytesSent, totalBytesExpectedToSend);
          }
        };
        this.addEventListener('progress', downloadUploadProgressCallback);
        this.upload.addEventListener('progress', downloadUploadProgressCallback);
      }

      cloneNetwork.startTime = Date.now();
      // @ts-ignore
      originalXHRSend.apply(this, arguments);
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
