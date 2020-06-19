'use strict';

const INITIAL_LOG_ATTRS = {
  method: '',
  url: '',
  requestHeaders: {},
};

const COMPLEMENTARY_LOG_ATTRS = {
  requestBody: '',
  responseHeaders: {},
  responseBody: '',
  responseCode: 0,
  contentType: '',
  duration: 0,
  start: 0
};

let initialLoggedData = {};

return {
  resetInitialLoggedData,
  logRequestMethod,
  logRequestUrl,
  logRequestHeader,
  createNetworkLogInstance,
};

function resetInitialLoggedData() {
  initialLoggedData = { ...INITIAL_LOG_ATTRS };
}

function logRequestMethod({ method }) {
  initialLoggedData.method = method;
}

function logRequestUrl({ url }) {
  initialLoggedData.url = url;
}

function logRequestHeader({ header, value }) {
  if (!initialLoggedData.requestHeaders) {
    initialLoggedData.requestHeaders = {};
  }
  initialLoggedData.requestHeaders[header] = value;
}

function createNetworkLogInstance() {
  let networkLogInstance = {
    ...JSON.parse(JSON.stringify(initialLoggedData)),
    ...COMPLEMENTARY_LOG_ATTRS,
  };

  return {
    logRequestBody: _logRequestBody.bind(networkLogInstance),
    logResponseHeaders: _logResponseHeaders.bind(networkLogInstance),
    logStartTime: _logStartTime.bind(networkLogInstance),
    logDuration: _logDuration.bind(networkLogInstance),
    logResponseCode: _logResponseCode.bind(networkLogInstance),
    logResponseBody: _logResponseBody.bind(networkLogInstance),
  };
}


function _logRequestBody(requestBody) {
  const networkLogInstance = this;
  networkLogInstance.requestBody = requestBody ? requestBody : '';
}

function _logResponseHeaders(interceptedRequest) {
  const networkLogInstance = this;
  const contentTypeString = interceptedRequest.getResponseHeader('Content-Type');

  if (contentTypeString) {
    networkLogInstance.contentType = contentTypeString.split(';')[0];
  }
    
  if (interceptedRequest.getAllResponseHeaders()) {
    const responseHeaders = interceptedRequest.getAllResponseHeaders().split('\r\n');
    const responseHeadersDictionary = {};

    responseHeaders.forEach(element => {
      const key = element.split(':')[0];
      const value = element.split(':')[1];
      responseHeadersDictionary[key] = value;
    });

    networkLogInstance.responseHeaders = responseHeadersDictionary;
  }
}

function _logStartTime() {
  const networkLogInstance = this;
  networkLogInstance.start = Date.now();
}

function _logDuration() {
  const networkLogInstance = this;
  networkLogInstance.duration = (Date.now() - networkLogInstance.start);
}

function _logResponseCode(interceptedRequest) {
  const networkLogInstance = this;
  networkLogInstance.responseCode = interceptedRequest.status ? interceptedRequest.status : 0;
}

function _logResponseBody (interceptedRequest) {
  const networkLogInstance = this;

  if (interceptedRequest.response) {
    if (interceptedRequest.responseType === 'blob') {
      const responseBody = await (new Response(interceptedRequest.response)).text();
      networkLogInstance.responseBody = responseBody;
    } else if (interceptedRequest.responseType === 'text') {
      networkLogInstance.responseBody = interceptedRequest.response;
    }
  }

  if (interceptedRequest._hasError) {
    networkLogInstance.requestBody = interceptedRequest._response;
  }
}
