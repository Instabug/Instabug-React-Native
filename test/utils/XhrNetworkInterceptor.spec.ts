import FakeRequest from '../mocks/fakeNetworkRequest';

import nock from 'nock';
import waitForExpect from 'wait-for-expect';

import InstabugConstants from '../../src/utils/InstabugConstants';
import Interceptor, { injectHeaders } from '../../src/utils/XhrNetworkInterceptor';

const url = 'http://api.instabug.com';
const method = 'GET';

const request = nock(url).get('/');
const postRequest = nock(url).post('/');

describe('Network Interceptor', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it('should set network object on entering XMLHttpRequest.prototype.open', (done) => {
    Interceptor.enableInterception();
    Interceptor.setOnDoneCallback((network) => {
      expect(network.url).toEqual(url);
      expect(network.method).toEqual(method);
      done();
    });
    FakeRequest.mockResponse(request);
    FakeRequest.open(method, url);
    FakeRequest.send();
  });

  it('should keep patched XMLHttpRequest methods', () => {
    Interceptor.disableInterception();

    // Patch XMLHttpRequest.open
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const patchedCode = jest.fn();
    XMLHttpRequest.prototype.open = function (...args: Parameters<XMLHttpRequest['open']>) {
      patchedCode();
      originalXHROpen.apply(this, args);
    };

    // Enable and disable network interception to see if disabling network interception
    // keeps the patched XMLHttpRequest methods
    Interceptor.enableInterception();
    Interceptor.disableInterception();

    FakeRequest.open(method, url);

    expect(patchedCode).toHaveBeenCalledTimes(1);

    XMLHttpRequest.prototype.open = originalXHROpen;
  });

  it('should set network object on calling setRequestHeader', (done) => {
    const requestHeaders = { 'content-type': 'application/json', token: '9u4hiudhi3bf' };

    Interceptor.enableInterception();
    Interceptor.setOnDoneCallback((network) => {
      expect(network.requestHeaders).toEqual(requestHeaders);
      done();
    });
    FakeRequest.open(method, url);
    FakeRequest.mockResponse(request);
    FakeRequest.setRequestHeaders(requestHeaders);
    FakeRequest.send();
  });

  it('should stringify header value if not string on calling setRequestHeader', async () => {
    const requestHeaders = { id: 10 };
    const callback = jest.fn();

    Interceptor.enableInterception();
    Interceptor.setOnDoneCallback(callback);
    FakeRequest.open(method, url);
    FakeRequest.mockResponse(request);
    // @ts-ignore
    FakeRequest.setRequestHeaders(requestHeaders);
    FakeRequest.send();

    await waitForExpect(() => {
      expect(callback).toBeCalledWith(
        expect.objectContaining({
          requestHeaders: { id: '10' },
        }),
      );
    });
  });

  it('should set requestBody in network object', (done) => {
    const requestBody = JSON.stringify({ data: [{ item: 'first' }, { item: 'second' }] });
    Interceptor.enableInterception();
    Interceptor.setOnDoneCallback((network) => {
      expect(network.requestBody).toBe(requestBody);
      done();
    });
    FakeRequest.mockResponse(postRequest);
    FakeRequest.open('POST', url);
    FakeRequest.send(requestBody);
  });

  it('should stringify requestBody in network object', (done) => {
    const requestBody = Buffer.from('Instabug');
    Interceptor.enableInterception();
    Interceptor.setOnDoneCallback((network) => {
      expect(network.requestBody).toBe(JSON.stringify(requestBody));
      done();
    });
    FakeRequest.mockResponse(postRequest);
    FakeRequest.open('POST', url);
    FakeRequest.send(requestBody);
  });

  it('should set contentType in network object on receiving response', (done) => {
    const headers = { 'Content-type': 'application/json' };
    Interceptor.enableInterception();
    Interceptor.setOnDoneCallback((network) => {
      expect(network.contentType).toEqual(headers['Content-type']);
      done();
    });
    FakeRequest.mockResponse(request, 200, 'ok', headers);
    FakeRequest.open(method, url);
    FakeRequest.send();
  });

  it('should set responseHeaders in network object on receiving response', (done) => {
    const headers = {
      'Content-type': 'application/json',
      Accept: 'text/html',
      'Content-Length': 144,
    };
    Interceptor.enableInterception();
    Interceptor.setOnDoneCallback((network) => {
      expect(network.responseHeaders['content-type'].trim()).toEqual(headers['Content-type']);
      expect(network.responseHeaders.accept.trim()).toEqual(headers.Accept);
      done();
    });
    // @ts-ignore
    FakeRequest.mockResponse(request, 200, 'ok', headers);
    FakeRequest.open(method, url);
    FakeRequest.send();
  });

  it('should set responseCode in network object on receiving response', (done) => {
    const status = 200;
    Interceptor.enableInterception();
    Interceptor.setOnDoneCallback((network) => {
      expect(network.responseCode).toEqual(status);
      done();
    });
    FakeRequest.mockResponse(request, status);
    FakeRequest.open(method, url);
    FakeRequest.send();
  });

  it("should set network object's responseCode to 0 if status is null on receiving response", async () => {
    const callback = jest.fn();

    Interceptor.enableInterception();
    Interceptor.setOnDoneCallback(callback);
    FakeRequest.mockResponse(request);
    FakeRequest.open(method, 'https://non-existing-website.com');
    FakeRequest.mockXHRStatus(null);
    FakeRequest.send();

    await waitForExpect(() => {
      expect(callback).toBeCalledWith(expect.objectContaining({ responseCode: 0 }));
    });
  });

  it('should set responseBody in network object on receiving response', (done) => {
    const responseBody = { data: [{ item: 'first' }, { item: 'second' }] };
    Interceptor.enableInterception();
    Interceptor.setOnDoneCallback((network) => {
      expect(network.responseBody).toEqual(JSON.stringify(responseBody));
      done();
    });
    FakeRequest.open(method, url);
    FakeRequest.mockResponse(request, 200, JSON.stringify(responseBody));
    FakeRequest.setResponseType('json');
    FakeRequest.send();
  });

  it('should set blob responseBody in network object on receiving response', async () => {
    const callback = jest.fn();
    const responseBody = Buffer.from('blob-content');

    Interceptor.enableInterception();
    Interceptor.setOnDoneCallback(callback);
    FakeRequest.open(method, url);
    FakeRequest.mockResponse(request, 200, responseBody);
    FakeRequest.setResponseType('blob');
    FakeRequest.send();

    await waitForExpect(() => {
      expect(callback).toBeCalledWith(expect.objectContaining({ responseBody: 'blob-content' }));
    });
  });

  it('should call onProgressCallback in network object on receiving response', (done) => {
    Interceptor.enableInterception();
    Interceptor.setOnProgressCallback((total, expectedToSend) => {
      expect(total).not.toBeNaN();
      expect(expectedToSend).not.toBeNaN();
      done();
    });

    // @ts-ignore
    FakeRequest.mockResponse(request, 200, 'ok', { 'Content-Length': 100 });
    FakeRequest.open(method, url);
    FakeRequest.send();
  });

  it('should call onDoneCallback in network object on receiving response', () => {
    Interceptor.disableInterception();
    const callback = jest.fn();
    Interceptor.setOnDoneCallback(callback);
    FakeRequest.mockResponse(request);
    FakeRequest.open(method, url);
    FakeRequest.send();
    expect(callback).not.toHaveBeenCalled();
  });

  it('should set error details in network object on client error', async () => {
    const callback = jest.fn();

    Interceptor.enableInterception();
    Interceptor.setOnDoneCallback(callback);
    FakeRequest.mockResponse(request);
    FakeRequest.open(method, url);
    FakeRequest.mockHasError();
    FakeRequest.send();

    await waitForExpect(() => {
      expect(callback).toBeCalledWith(
        expect.objectContaining({
          errorDomain: 'ClientError',
          errorCode: 0,
          responseBody: null,
        }),
      );
    });
  });

  it('should set gqlQueryName in network object on receiving response', (done) => {
    const responseBody = { data: [{ item: 'first' }, { item: 'second' }] };
    const headers = {
      [InstabugConstants.GRAPHQL_HEADER]: InstabugConstants.GRAPHQL_HEADER,
    };

    Interceptor.enableInterception();
    Interceptor.setOnDoneCallback((network) => {
      expect(network.gqlQueryName).toEqual(headers[InstabugConstants.GRAPHQL_HEADER]);
      done();
    });
    FakeRequest.open(method, url);
    FakeRequest.mockResponse(request, 200, JSON.stringify(responseBody));
    FakeRequest.setRequestHeaders(headers);
    FakeRequest.send();
  });

  it('should set gqlQueryName in network object on receiving response with empty string', (done) => {
    const headers = {
      [InstabugConstants.GRAPHQL_HEADER]: 'null',
    };

    Interceptor.enableInterception();
    Interceptor.setOnDoneCallback((network) => {
      expect(network.gqlQueryName).toEqual('');
      done();
    });
    FakeRequest.open(method, url);
    FakeRequest.mockResponse(request);
    FakeRequest.setRequestHeaders(headers);
    FakeRequest.send();
  });

  it('should set serverErrorMessage in network object on receiving response', (done) => {
    const responseBody = { errors: [{ item: 'first' }, { item: 'second' }] };
    const headers = {
      [InstabugConstants.GRAPHQL_HEADER]: InstabugConstants.GRAPHQL_HEADER,
    };

    Interceptor.enableInterception();
    Interceptor.setOnDoneCallback((network) => {
      expect(network.serverErrorMessage).toEqual('GraphQLError');
      done();
    });
    FakeRequest.open(method, url);
    FakeRequest.setRequestHeaders(headers);
    FakeRequest.mockResponse(request, 200, JSON.stringify(responseBody));
    FakeRequest.setResponseType('json');
    FakeRequest.send();
  });
});

describe('Network Interceptor W3C Headers', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it('should attach generated header if all flags are enabled on no header found', (done) => {
    const featureFlags = {
      w3c_external_trace_id_enabled: true,
      w3c_generated_header: true,
      w3c_caught_header: true,
    };
    Interceptor.enableInterception();
    Interceptor.setOnDoneCallback(async (network) => {
      const W3Cheader = await injectHeaders(network, featureFlags);
      expect(W3Cheader).toEqual(network.W3CgeneratedHeader);
      expect(network.isW3cHeaderFound).toBe(false);
      expect(network.partialId).not.toBe(null);
      expect(network.networkStartTimeInSeconds).toEqual(Math.floor(network.startTime / 1000));
      expect(network.W3CgeneratedHeader).toHaveLength(55);
      expect(network.W3CCaughtHeader).toBe(null);
    });
    done();
    FakeRequest.mockResponse(request);
    FakeRequest.open(method, url);
    FakeRequest.send();
  });
  it('should attach generated header if key flag & generated header flags are enabled on no header found', (done) => {
    const featureFlags = {
      w3c_external_trace_id_enabled: true,
      w3c_generated_header: true,
      w3c_caught_header: false,
    };

    Interceptor.enableInterception();
    Interceptor.setOnDoneCallback(async (network) => {
      const W3Cheader = await injectHeaders(network, featureFlags);
      expect(W3Cheader).toEqual(network.W3CgeneratedHeader);
      expect(network.isW3cHeaderFound).toBe(false);
      expect(network.partialId).not.toBe(null);
      expect(network.networkStartTimeInSeconds).toEqual(Math.floor(network.startTime / 1000));
      expect(network.W3CgeneratedHeader).toHaveLength(55);
      expect(network.W3CCaughtHeader).toBe(null);
    });
    done();
    FakeRequest.mockResponse(request);
    FakeRequest.open(method, url);
    FakeRequest.send();
  });

  it('should not attach headers when key flag is disabled & generated, caught header flags are enabled', (done) => {
    const featureFlags = {
      w3c_external_trace_id_enabled: false,
      w3c_generated_header: true,
      w3c_caught_header: true,
    };
    Interceptor.enableInterception();
    Interceptor.setOnDoneCallback(async (network) => {
      const W3Cheader = await injectHeaders(network, featureFlags);
      expect(W3Cheader).toBeUndefined();
      expect(network.isW3cHeaderFound).toBe(null);
      expect(network.partialId).toBe(null);
      expect(network.networkStartTimeInSeconds).toBe(null);
      expect(network.W3CgeneratedHeader).toBe(null);
      expect(network.W3CCaughtHeader).toBe(null);
    });
    done();
    FakeRequest.mockResponse(request);
    FakeRequest.open(method, url);
    FakeRequest.send();
  });
  it('should not attach headers when all feature flags are disabled', (done) => {
    const featureFlags = {
      w3c_external_trace_id_enabled: false,
      w3c_generated_header: false,
      w3c_caught_header: false,
    };
    Interceptor.enableInterception();
    Interceptor.setOnDoneCallback(async (network) => {
      const W3Cheader = await injectHeaders(network, featureFlags);
      expect(W3Cheader).toBeUndefined();
      expect(network.isW3cHeaderFound).toBe(false);
      expect(network.partialId).toBe(0);
      expect(network.networkStartTimeInSeconds).toBe(0);
      expect(network.W3CgeneratedHeader).toBe('');
      expect(network.W3CCaughtHeader).toBe('');

      done();
    });
    FakeRequest.mockResponse(request);
    FakeRequest.open(method, url);
    FakeRequest.send();
  });
  it('should not attach headers when key & caught header flags are disabled and generated header flag is enabled', (done) => {
    const featureFlags = {
      w3c_external_trace_id_enabled: false,
      w3c_generated_header: true,
      w3c_caught_header: false,
    };
    Interceptor.enableInterception();
    Interceptor.setOnDoneCallback(async (network) => {
      const W3Cheader = await injectHeaders(network, featureFlags);
      expect(W3Cheader).toBeUndefined();
      expect(network.isW3cHeaderFound).toBe(false);
      expect(network.partialId).toBe(0);
      expect(network.networkStartTimeInSeconds).toBe(0);
      expect(network.W3CgeneratedHeader).toBe('');
      expect(network.W3CCaughtHeader).toBe('');

      done();
    });
    FakeRequest.mockResponse(request);
    FakeRequest.open(method, url);
    FakeRequest.send();
  });
  it('should not attach headers when key & generated header flags are disabled and caught header flag is enabled', (done) => {
    const featureFlags = {
      w3c_external_trace_id_enabled: false,
      w3c_generated_header: false,
      w3c_caught_header: true,
    };
    Interceptor.enableInterception();
    Interceptor.setOnDoneCallback(async (network) => {
      const W3Cheader = await injectHeaders(network, featureFlags);
      expect(W3Cheader).toBeUndefined();
      expect(network.isW3cHeaderFound).toBe(false);
      expect(network.partialId).toBe(0);
      expect(network.networkStartTimeInSeconds).toBe(0);
      expect(network.W3CgeneratedHeader).toBe('');
      expect(network.W3CCaughtHeader).toBe('');
      done();
    });
    FakeRequest.mockResponse(request);
    FakeRequest.open(method, url);
    FakeRequest.send();
  });
  it('should not attach headers when key flag is enabled & generated, caught header flags are disabled on header found', (done) => {
    const featureFlags = {
      w3c_external_trace_id_enabled: true,
      w3c_generated_header: false,
      w3c_caught_header: false,
    };
    Interceptor.enableInterception();
    Interceptor.setOnDoneCallback(async (network) => {
      network.requestHeaders.traceparent = 'caught traceparent header';
      const W3Cheader = await injectHeaders(network, featureFlags);
      expect(W3Cheader).toBeUndefined();
      expect(network.isW3cHeaderFound).toEqual(true);
      expect(network.partialId).toBe(0);
      expect(network.networkStartTimeInSeconds).toBe(0);
      expect(network.W3CgeneratedHeader).toBe('');
      expect(network.W3CCaughtHeader).toBe('');
      done();
    });
    FakeRequest.mockResponse(request);
    FakeRequest.open(method, url);
    FakeRequest.send();
  });

  it('should attach caught header if all flags are enabled ', (done) => {
    const featureFlags = {
      w3c_external_trace_id_enabled: true,
      w3c_generated_header: true,
      w3c_caught_header: true,
    };
    Interceptor.enableInterception();
    Interceptor.setOnDoneCallback(async (network) => {
      network.requestHeaders.traceparent = 'caught traceparent header';
      const W3Cheader = await injectHeaders(network, featureFlags);
      expect(W3Cheader).toEqual(network.requestHeaders.traceparent);
      expect(network.isW3cHeaderFound).toBe(true);
      expect(network.partialId).toBe(0);
      expect(network.networkStartTimeInSeconds).toBe(0);
      expect(network.W3CgeneratedHeader).toBe('');
      expect(network.W3CCaughtHeader).toBe('caught traceparent header');

      done();
    });
    FakeRequest.mockResponse(request);
    FakeRequest.open(method, url);
    FakeRequest.send();
  });
  it('should attach caught header if key & caught header flags are enabled and generated header flag is disabled', (done) => {
    const featureFlags = {
      w3c_external_trace_id_enabled: true,
      w3c_generated_header: false,
      w3c_caught_header: true,
    };
    Interceptor.enableInterception();
    Interceptor.setOnDoneCallback(async (network) => {
      network.requestHeaders.traceparent = 'caught traceparent header';
      const W3Cheader = await injectHeaders(network, featureFlags);
      expect(W3Cheader).toEqual(network.requestHeaders.traceparent);
      expect(network.partialId).toBe(0);
      expect(network.networkStartTimeInSeconds).toBe(0);
      expect(network.W3CgeneratedHeader).toBe('');
      expect(network.W3CCaughtHeader).toBe('caught traceparent header');
      expect(network.isW3cHeaderFound).toBe(true);

      done();
    });
    FakeRequest.mockResponse(request);
    FakeRequest.open(method, url);
    FakeRequest.send();
  });
});
