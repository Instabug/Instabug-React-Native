import nock from 'nock';
import waitForExpect from 'wait-for-expect';
import FakeRequest from '../mocks/fakeNetworkRequest';
import InstabugConstants from '../../src/utils/InstabugConstants';
import Interceptor from '../../src/utils/XhrNetworkInterceptor';

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
    const responseBody = new Buffer.from('blob-content');

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
    const headers = {};
    headers[InstabugConstants.GRAPHQL_HEADER] = InstabugConstants.GRAPHQL_HEADER;
    const responseBody = { data: [{ item: 'first' }, { item: 'second' }] };
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
    const headers = {};
    headers[InstabugConstants.GRAPHQL_HEADER] = 'null';
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
    const headers = {};
    headers[InstabugConstants.GRAPHQL_HEADER] = InstabugConstants.GRAPHQL_HEADER;
    const responseBody = { errors: [{ item: 'first' }, { item: 'second' }] };
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
