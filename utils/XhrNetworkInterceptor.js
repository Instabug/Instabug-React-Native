'use strict';

import NetworkLogManager from './NetworkLogManager';

const XMLHttpRequest = global.XMLHttpRequest;
const _xhrDefaultOpen = XMLHttpRequest.prototype.open;
const _xhrDefaultSend = XMLHttpRequest.prototype.send;
const _xhrDefaultSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;

let onProgressCallback;
let onDoneCallback;
let isInterceptorEnabled = false;

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
  NetworkLogManager.resetLoggedNetworkData();
  NetworkLogManager.logRequestMethod({ method });
  NetworkLogManager.logRequestUrl({ url });

  _xhrDefaultOpen.apply(this, arguments);
}

function _xhrInterceptorSetRequestHeader(header, value) {
  NetworkLogManager.logRequestHeader({ header, value });

  _xhrDefaultSetRequestHeader.apply(this, arguments);
}

function _xhrInterceptorSend(data) {
  const networkLogInstance = NetworkLogManager.createNetworkLogInstance();
  console.log('intercepted request', this);
  
  if (this.addEventListener) {
    this.addEventListener(
      'readystatechange',
      async () => {
        if (!isInterceptorEnabled) {
          return;
        }

        if (this.readyState === this.HEADERS_RECEIVED) {
          networkLogInstance.logResponseHeaders(this);
        } else if (this.readyState === this.DONE) {
          networkLogInstance.logDuration();
          networkLogInstance.logResponseCode(this);
          networkLogInstance.logResponseBody(this);

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

  networkLogInstance.logRequestBody(data);
  networkLogInstance.logStartTime();

  _xhrDefaultSend.apply(this, arguments);
}

module.exports = {
  enableInterception,
  disableInterception,
  setOnDoneCallback,
  setOnProgressCallback,
};
