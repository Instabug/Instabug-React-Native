import 'react-native';
import sinon from 'sinon';
import FakeRequest from '../jest/fakeNetworkRequest';

global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();

const url = 'http://api.instabug.com';
const method = 'GET';

describe('Network Interceptor', () => {

    let Interceptor;
    let server;
    let requests;

    beforeEach(function () {
        Interceptor = require('../utils/XhrNetworkInterceptor');
        server = sinon.useFakeXMLHttpRequest();
        requests = [];

        server.onCreate = function (xhr) {
            requests.push(xhr);
        };
    });

    afterEach(function () {
        server.restore();
    });

    it('should set network object on entering XMLHttpRequest.prototype.open', (done) => {

        Interceptor.enableInterception();
        Interceptor.setOnDoneCallback((network) => {
            expect(network.url).toEqual(url);
            expect(network.method).toEqual(method);
            done();

        })
        FakeRequest.open(method, url);
        FakeRequest.send();
        FakeRequest.mockResponse(requests[0]);

    });

    it('should set network object on calling setRequestHeader', (done) => {

        let requestHeaders = { 'Content-type': 'application/json', 'token': '9u4hiudhi3bf' };

        Interceptor.enableInterception();
        Interceptor.setOnDoneCallback((network) => {
            expect(network.requestHeaders).toEqual(requestHeaders);
            done();

        })
        FakeRequest.open(method, url);
        FakeRequest.setRequestHeaders(requestHeaders);
        FakeRequest.send();
        FakeRequest.mockResponse(requests[0]);
    });

    it('should set requestBody in network object', (done) => {

        const requestBody = { data: [{ item: 'first' }, { item: 'second' }] };
        Interceptor.enableInterception();
        Interceptor.setOnDoneCallback((network) => {
            expect(network.requestBody).toEqual(JSON.stringify(requestBody));
            done();
        })
        FakeRequest.open(method, url);
        FakeRequest.send(requestBody);
        FakeRequest.mockResponse(requests[0]);
    });

    it('should set contentType in network object on receiving response', (done) => {

        const headers = { 'Content-type': 'application/json' }
        Interceptor.enableInterception();
        Interceptor.setOnDoneCallback((network) => {
            expect(network.contentType).toEqual(headers['Content-type']);
            done();
        })
        FakeRequest.open(method, url);
        FakeRequest.send();
        FakeRequest.mockResponse(requests[0], headers);

    });

    it('should set responseHeaders in network object on receiving response', (done) => {

        const headers = { 'Content-type': 'application/json', 'Accept': 'text/html' }
        Interceptor.enableInterception();
        Interceptor.setOnDoneCallback((network) => {
            expect(network.responseHeaders['Content-type'].trim()).toEqual(headers['Content-type']);
            expect(network.responseHeaders['Accept'].trim()).toEqual(headers['Accept']);
            done();
        })
        FakeRequest.open(method, url);
        FakeRequest.send();
        FakeRequest.mockResponse(requests[0], headers);

    });

    it('should set responseHeaders in network object on receiving response', (done) => {

        const headers = { 'Content-type': 'application/json', 'Accept': 'text/html' }
        Interceptor.enableInterception();
        Interceptor.setOnDoneCallback((network) => {
            expect(network.responseHeaders['Content-type'].trim()).toEqual(headers['Content-type']);
            expect(network.responseHeaders['Accept'].trim()).toEqual(headers['Accept']);
            done();
        })
        FakeRequest.open(method, url);
        FakeRequest.send();
        FakeRequest.mockResponse(requests[0], headers);

    });

    it('should set responseCode in network object on receiving response', (done) => {

        const status = 200;
        Interceptor.enableInterception();
        Interceptor.setOnDoneCallback((network) => {
            expect(network.responseCode).toEqual(status);
            done();
        })
        FakeRequest.open(method, url);
        FakeRequest.send();
        FakeRequest.mockStatus(requests[0], status);
        FakeRequest.mockResponse(requests[0]);
    });

    it('should set responseBody in network object on receiving response', (done) => {

        const responseBody = { data: [{ item: 'first' }, { item: 'second' }] };
        Interceptor.enableInterception();
        Interceptor.setOnDoneCallback((network) => {
            expect(network.responseBody).toEqual(JSON.stringify(responseBody));
            done();
        })
        FakeRequest.open(method, url);
        FakeRequest.setResponseType('text')
        FakeRequest.send();
        FakeRequest.mockResponse(requests[0], null, JSON.stringify(responseBody));
    });

    it('should call onProgressCallback in network object on receiving response', (done) => {

        Interceptor.enableInterception();
        Interceptor.setOnProgressCallback((total, expectedToSend) => {
            expect(total).not.toBeNaN();
            expect(expectedToSend).not.toBeNaN();
            done()
        });

        FakeRequest.open(method, url);
        FakeRequest.send();
        FakeRequest.mockStatus(requests[0], 200);
        FakeRequest.mockResponse(requests[0]);
    });

    it('should set responseBody in network object on receiving response', () => {

        Interceptor.disableInterception();
        const callback = jest.fn();
        Interceptor.setOnDoneCallback(callback);
        FakeRequest.open(method, url);
        FakeRequest.send();
        FakeRequest.mockResponse(requests[0]);
        expect(callback).not.toHaveBeenCalled();
    });


});
