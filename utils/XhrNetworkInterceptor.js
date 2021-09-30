'use strict';

const XMLHttpRequest = global.XMLHttpRequest;
const originalXHROpen = XMLHttpRequest.prototype.open;
const originalXHRSend = XMLHttpRequest.prototype.send;
const originalXHRSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;

var onProgressCallback;
var onDoneCallback;
var isInterceptorEnabled = false;
var network;

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
  };
}

const XHRInterceptor = {
  setOnDoneCallback(callback) {
    onDoneCallback = callback;
  },
  setOnProgressCallback(callback) {
    onProgressCallback = callback;
  },
  enableInterception() {
    XMLHttpRequest.prototype.open = function(method, url) {
      _reset();
      network.url = url;
      network.method = method;
      originalXHROpen.apply(this, arguments);
    };

    XMLHttpRequest.prototype.setRequestHeader = function(header, value) {
      if (network.requestHeaders === '') {
        network.requestHeaders = {};
      }
      network.requestHeaders[header] = typeof value === 'string' ? value : JSON.stringify(value);
      originalXHRSetRequestHeader.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = function(data) {
      var cloneNetwork = JSON.parse(JSON.stringify(network));
      cloneNetwork.requestBody = data ? data : '';
      
      if (typeof cloneNetwork.requestBody !== "string") {
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

                if (!isNaN(responseBodySizeNumber)) cloneNetwork.responseBodySize = responseBodySizeNumber;
              }
                
              if (this.getAllResponseHeaders()) {
                const responseHeaders = this.getAllResponseHeaders().split('\r\n');
                const responseHeadersDictionary = {};
                responseHeaders.forEach(element => {
                  const key = element.split(/:(.+)/)[0];
                  const value = element.split(/:(.+)/)[1];
                  responseHeadersDictionary[key] = value;
                });
                cloneNetwork.responseHeaders = responseHeadersDictionary;
              }
            }
            if (this.readyState === this.DONE) {
              cloneNetwork.duration = (Date.now() - cloneNetwork.startTime);
              if (this.status == null) {
                cloneNetwork.responseCode = 0;
              } else {
                cloneNetwork.responseCode = this.status;
              }
              
              if (this.response) {
                if (this.responseType === 'blob') {
                  var responseText = await (new Response(this.response)).text();
                  cloneNetwork.responseBody = responseText;
                } else if (this.responseType === 'text' || this.responseType === '') {
                  cloneNetwork.responseBody = this.response;
                }
              }

              if (this._hasError) {
                cloneNetwork.errorCode = 0;
                cloneNetwork.errorDomain = 'ClientError';

                cloneNetwork.requestBody = typeof this._response === "string" ? this._response : JSON.stringify(this._response);
                cloneNetwork.responseBody = null;
              }
              if (onDoneCallback) {
                onDoneCallback(cloneNetwork);
              }
            }
          },
          false
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
  }
};

module.exports = XHRInterceptor;
