'use strict';

const XMLHttpRequest = global.XMLHttpRequest;
const _xhrDefaultOpen = XMLHttpRequest.prototype.open;
const _xhrDefaultSend = XMLHttpRequest.prototype.send;
const _xhrDefaultSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;

let onProgressCallback;
let onDoneCallback;
let isInterceptorEnabled = false;
let loggedNetworkData;

const enableInterception = () => {
  isInterceptorEnabled = true;

  XMLHttpRequest.prototype.open = _xhrInterceptorOpen;
  XMLHttpRequest.prototype.send = _xhrInterceptorSend;
  XMLHttpRequest.prototype.setRequestHeader = _xhrInterceptorSetRequestHeader;
};

const disableInterception = () => {
  isInterceptorEnabled = false;
  onDoneCallback = null;
  onProgressCallback = null;

  XMLHttpRequest.prototype.open = _xhrDefaultOpen;
  XMLHttpRequest.prototype.send = _xhrDefaultSend;
  XMLHttpRequest.prototype.setRequestHeader = _xhrDefaultSetRequestHeader;
};

const setOnDoneCallback = (callback) => {
  onDoneCallback = callback;
};

const setOnProgressCallback = (callback) => {
  onProgressCallback = callback;
};

function _xhrInterceptorOpen(method, url) {
  _resetLoggedNetworkData();
  _logRequestMethod(loggedNetworkData, { method });
  _logRequestUrl(loggedNetworkData, { url });

  _xhrDefaultOpen.apply(this, arguments);
}

function _xhrInterceptorSetRequestHeader(header, value) {
  _logRequestHeader(loggedNetworkData, { header, value });

  _xhrDefaultSetRequestHeader.apply(this, arguments);
}

function _xhrInterceptorSend(data) {
  const loggedNetworkDataClone = JSON.parse(JSON.stringify(loggedNetworkData));
  _logRequestBody(loggedNetworkDataClone, data);
  
  if (this.addEventListener) {
    this.addEventListener(
      'readystatechange',
      async () => {
        if (!isInterceptorEnabled) {
          return;
        }

        if (this.readyState === this.HEADERS_RECEIVED) {
          _logResponseHeaders(loggedNetworkDataClone, this);
        } else if (this.readyState === this.DONE) {
          _logDuration(loggedNetworkDataClone);
          _logResponseCode(loggedNetworkDataClone, this);
          _logResponseBody(loggedNetworkDataClone, this);

          if (onDoneCallback) {
            onDoneCallback(loggedNetworkDataClone);
          }
        }
      }
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

  _logStartTime(loggedNetworkDataClone);

  _xhrDefaultSend.apply(this, arguments);
}

function _logRequestMethod(loggedNetworkData, { method }) {
  loggedNetworkData.method = method;
}

function _logRequestUrl(loggedNetworkData, { url }) {
  loggedNetworkData.url = url;
}

function _logRequestHeader(loggedNetworkData, { header, value }) {
  if (loggedNetworkData.requestHeaders === '') {
    loggedNetworkData.requestHeaders = {};
  }
  loggedNetworkData.requestHeaders[header] = value;
}

function _logRequestBody(loggedNetworkDataClone, data) {
  loggedNetworkDataClone.requestBody = data ? data : '';
}

function _logResponseHeaders(loggedNetworkDataClone, interceptedRequest) {
  const contentTypeString = interceptedRequest.getResponseHeader('Content-Type');
  if (contentTypeString) {
    loggedNetworkDataClone.contentType = contentTypeString.split(';')[0];
  }
    
  if (interceptedRequest.getAllResponseHeaders()) {
    const responseHeaders = interceptedRequest.getAllResponseHeaders().split('\r\n');
    const responseHeadersDictionary = {};
    responseHeaders.forEach(element => {
      const key = element.split(':')[0];
      const value = element.split(':')[1];
      responseHeadersDictionary[key] = value;
    });
    loggedNetworkDataClone.responseHeaders = responseHeadersDictionary;
  }
}

function _logStartTime(loggedNetworkDataClone) {
  loggedNetworkDataClone.start = Date.now();
}

function _logDuration(loggedNetworkDataClone) {
  loggedNetworkDataClone.duration = (Date.now() - loggedNetworkDataClone.start);
}

function _logResponseCode(loggedNetworkDataClone, interceptedRequest) {
  loggedNetworkDataClone.responseCode = interceptedRequest.status ? interceptedRequest.status : 0;
}

function _logResponseBody (loggedNetworkDataClone, interceptedRequest) {
  if (interceptedRequest.response) {
    if (interceptedRequest.responseType === 'blob') {
      const responseBody = await (new Response(interceptedRequest.response)).text();
      loggedNetworkDataClone.responseBody = responseBody;
    } else if (interceptedRequest.responseType === 'text') {
      loggedNetworkDataClone.responseBody = interceptedRequest.response;
    }
  }

  if (interceptedRequest._hasError) {
    loggedNetworkDataClone.requestBody = interceptedRequest._response;
  }
}

function _resetLoggedNetworkData() {
  loggedNetworkData = {
    method: '',
    url: '',
    requestHeaders: {},
    requestBody: '',
    responseHeaders: {},
    responseBody: '',
    responseCode: 0,
    contentType: '',
    duration: 0,
    start: 0
  };
}

module.exports = {
  enableInterception,
  disableInterception,
  setOnDoneCallback,
  setOnProgressCallback,
};
