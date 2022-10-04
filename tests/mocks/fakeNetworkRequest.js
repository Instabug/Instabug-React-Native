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
    mockStatus(request, status) {
        request.setStatus(status);
    },
    mockResponse(request, headers, body) {
        request.setResponseHeaders(headers ? headers : '');
        request.setResponseBody(body ? body : '');
    }
}