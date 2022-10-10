var xhr;
export default {
    open(method, url) {
        xhr = new global.XMLHttpRequest();
        xhr.open(method, url);
    },
    send(data) {
        xhr.send(data);
    },
    setRequestHeaders(headers) {
        for(i = 0; i < Object.keys(headers).length ; i++) {
            let key = Object.keys(headers)[i];
            xhr.setRequestHeader(key, headers[key]);
        }
    },
    setResponseType(type) {
        xhr.responseType = type;
    },
    mockHasError() {
        xhr._hasError = true;
    },
    mockXHRStatus(status) {
        xhr.status = status;
    },
    mockResponse(request, status = 200, body = 'ok', headers) {
        request.once().reply(status, body, headers);
    }
}