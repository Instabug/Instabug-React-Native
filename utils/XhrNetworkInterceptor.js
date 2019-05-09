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
    requestBody: '',
    requestHeaders: '',
    method: '',
    responseBody: '',
    responseCode: 0,
    responseHeaders: '',
    contentType: '',
    duration: 0,
    start: 0
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
      network.requestHeaders[header] = value;
      originalXHRSetRequestHeader.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = function(data) {
      var cloneNetwork = JSON.parse(JSON.stringify(network));
      cloneNetwork.requestBody = data ? data : '';

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

              
              if (this.getAllResponseHeaders()) {
                const responseHeaders = this.getAllResponseHeaders().split('\r\n');
                const responseHeadersDictionary = {};
                responseHeaders.forEach(element => {
                  const key = element.split(':')[0];
                  const value = element.split(':')[1];
                  responseHeadersDictionary[key] = value;
                });
                cloneNetwork.responseHeaders = responseHeadersDictionary;
              }
              
              
            }
            if (this.readyState === this.DONE) {
              cloneNetwork.duration = (Date.now() - cloneNetwork.start);
              if (this.status == null) {
                cloneNetwork.responseCode = 0;
              } else {
                cloneNetwork.responseCode = this.status;
              }
              
              if (this.response) {
                if (this.responseType === 'blob') {
                  var responseText = await (new Response(this.response)).text();
                  cloneNetwork.responseBody = responseText;
                } else if (this.responseType === 'text') {
                  cloneNetwork.responseBody = this.response;
                }
              }

              if (this._hasError) {
                cloneNetwork.requestBody = this._response;
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

      cloneNetwork.start = Date.now();
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
